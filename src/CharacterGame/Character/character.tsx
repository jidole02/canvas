import { FC, ReactElement, useEffect, useRef, useState } from "react";

export const Character: FC = (): ReactElement => {
  const canvas = useRef();
  const cv: HTMLCanvasElement = canvas.current;
  const [load, setload] = useState<boolean>(false);
  if (cv !== undefined) {
    const ctx: CanvasRenderingContext2D = cv.getContext("2d");
    for (let j: number = 0; j < 5; j++) {
      for (let i: number = 0; i < 5; i++) {
        ctx.fillRect(j * 10 + j * 2, i * 10 + i * 2, 7, 7);
      }
    }
  }
  useEffect(() => {
    setload(!load);
  }, []);
  return (
    <>
      <canvas ref={canvas}/>
    </>
  );
};
