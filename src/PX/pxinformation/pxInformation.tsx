import { FC, ReactElement, useRef, useState, useEffect } from "react";
import { PxClass } from "../classInterface/class";
import Img from "../../Assets/pxImg.jpg";

export const PxInformatino: FC = (): ReactElement => {
  const canvas = useRef();
  const drawCanvas = useRef();
  const img: CanvasImageSource = new Image();
  const cv: HTMLCanvasElement = canvas.current;
  const cv2:HTMLCanvasElement = drawCanvas.current;
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
    const imgData = p.ctx?.getImageData(0, 0, cv.width, cv.height);
    if (imgData) {
      const data = imgData.data;
    }
    for(let i =0;i<255;i++){
        for(let j=0;j<255;j++){
            var pixel = p.ctx?.getImageData(i,j,1,1);
            if(pixel){
                const data = pixel?.data;
/*                 console.log(data[0],data[1],data[2]) */
                p.dctx.fillStyle = `rgb(${data[0]},${data[1]},${data[2]})`
                p.dctx.fillRect(i,j,1,1);
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
