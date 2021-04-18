import { FC, ReactElement, useRef, useState, useEffect } from "react";
import { PxClass } from "../classInterface/class";
import Img from "../../Assets/pxImg.jpg";

export const PxInformatino: FC = (): ReactElement => {
  const canvas = useRef();
  const img: CanvasImageSource = new Image();
  const cv: HTMLCanvasElement = canvas.current;
  const p = new PxClass();
  const [load, setLoad] = useState<boolean>(false);
  img.src = Img;
  if (cv !== undefined) {
    p.ctx = cv.getContext("2d");
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
      console.log(data);
    }
  }
  return (
    <>
      <canvas ref={canvas} style={{ width: "500px" }}></canvas>
    </>
  );
};
