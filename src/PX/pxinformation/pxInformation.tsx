import { FC, ReactElement, useRef, useState, useEffect } from "react";
import { PxClass } from "../classInterface/class";
import Img from "../../Assets/pxImg.jpg";

export const PxInformatino: FC = (): ReactElement => {
  const canvas = useRef();
  const drawCanvas = useRef();
  const img: CanvasImageSource = new Image();
  const cv: HTMLCanvasElement = canvas.current;
  const cv2: HTMLCanvasElement = drawCanvas.current;
  const p = new PxClass();
  const [load, setLoad] = useState<boolean>(false);
  img.src = Img;
  if (cv !== undefined) {
    p.ctx = cv.getContext("2d");
    p.dctx = cv2.getContext("2d");
  }
  useEffect(() => {
    draw();
  }, [load]);
  useEffect(() => {
    let i = 0;
    var interval = setInterval(() => {
      setLoad(!load);
      i++;
      if (i > 3) clearInterval(interval);
    }, 100);
  }, []);
  function draw() {
    p.ctx?.drawImage(img, 0, 0);
    for (let i = 0; i < p.MAX_SIZE; i++) {
      for (let j = 0; j < p.MAX_SIZE; j++) {
          /* 조금씩 색상 추출해오는 느낌 */
        if (i % p.PX_SIZE === 0 && j % p.PX_SIZE === 0) {
          var pixel = p.ctx?.getImageData(i, j, 1, 1);
          if (pixel) {
            const data = pixel.data;
            if (data) {
              p.dctx.fillStyle = `rgb(${data[0]},${data[1]},${data[2]})`
              p.dctx.fillRect(i, j, p.PX_SIZE, p.PX_SIZE);
            }
          }
        }
      }
    }
  }
  return (
    <>
      <canvas ref={canvas} style={{ width: "500px" }}></canvas>
      <canvas ref={drawCanvas}></canvas>
    </>
  );
};
