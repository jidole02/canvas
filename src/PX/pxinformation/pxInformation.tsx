import { FC, ReactElement, useRef, useState, useEffect } from "react";
import { PxClass } from "../classInterface/class";

export const PxInformatino: FC = (): ReactElement => {
  const canvas = useRef();
  const drawCanvas = useRef();
  const img: CanvasImageSource = new Image();
  const cv: HTMLCanvasElement = canvas.current;
  const cv2: HTMLCanvasElement = drawCanvas.current;
  const p = new PxClass();
  const inp = document.getElementById("inp");
  const [load, setLoad] = useState<boolean>(false);
  const [src, setSrc] = useState<any>(null);
  img.src = src;
  if (cv !== undefined) {
    p.ctx = cv.getContext("2d");
    p.dctx = cv2.getContext("2d");
  }
  /* 로드되면 */
  useEffect(() => {
    if (src !== null) {
      draw();
    }
  }, [load, src]);
  /* 스테이트 변환으로 로드 */
  useEffect(() => {
    let i = 0;
    var interval = setInterval(() => {
      setLoad(!load);
      i++;
      if (i > 3) clearInterval(interval);
    }, 100);
  }, [src]);
  /* 이미지 가로 세로 구하고, px로 변환 */
  const h: number = img.height;
  const w: number = img.width;
  function draw() {
    console.log("sdfsdf");
    /* 여기 300으로 해야 꽉참 */
    p.ctx?.drawImage(img, 0, 0, 300, (300 * h) / w);
    for (let i = 0; i < p.MAX_SIZE; i++) {
      for (let j = 0; j < p.MAX_SIZE; j++) {
        /* 조금씩 색상 추출해오는 느낌 */
        if (i % p.PX_SIZE === 0 && j % p.PX_SIZE === 0) {
          var pixel = p.ctx?.getImageData(i, j, 1, 1);
          if (pixel) {
            const data = pixel.data;
            if (data) {
              p.dctx.fillStyle = `rgb(${data[0]},${data[1]},${data[2]})`;
              p.dctx.fillRect(i, j, p.PX_SIZE, p.PX_SIZE);
            }
          }
        }
      }
    }
  }
  /* 이미지 업로드 해서 src 가져오는 곳 */
  if (inp) {
    inp.onchange = function () {
      console.log(this);
      getSrc(this);
    };
  }
  function getSrc(input: any) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        setSrc(e.target.result); //
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  return (
    <>
      <canvas ref={canvas} style={{display:"none"}}></canvas>
      <canvas ref={drawCanvas} style={{ width: "30%" }}></canvas>
      <input type="file" id="inp" />
    </>
  );
};
