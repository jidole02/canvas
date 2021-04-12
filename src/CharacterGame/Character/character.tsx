import { FC, ReactElement, useEffect, useRef, useState } from "react";

export const Character: FC = (): ReactElement => {
  class Character {
    ctx: CanvasRenderingContext2D;
  }
  const c = new Character();
  const canvas = useRef();
  const cv: HTMLCanvasElement = canvas.current;
  const [load, setload] = useState<boolean>(false);
  function draw(x: number, y: number): void {
    if (cv !== undefined) {
      c.ctx = cv.getContext("2d");
      for (let j: number = 0; j < 5; j++) {
        for (let i: number = 0; i < 5; i++) {
          c.ctx.fillRect(j * 10 + j * 2 + x, i * 10 + i * 2 + y, 7, 7);
        }
      }
    }
  }
  useEffect(() => {
    let i = 0;
    var interval = setInterval(() => {
      i++;
      if (c.ctx !== undefined) {
        c.ctx.clearRect(0, 0, cv.width, cv.height); // 초기화
      }
      draw(i, i);
      if (i === 100) {
        clearInterval(interval);
      }
    }, 10);
  }, [load]);
  useEffect(() => {
    setload(!load); // 캔버스 한번 리렌더링 해줘야됨
  }, []);
  return (
    <>
      <canvas ref={canvas} style={{ transition: "3s" }} />
    </>
  );
};
