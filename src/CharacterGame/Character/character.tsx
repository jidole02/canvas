import { FC, ReactElement, useEffect, useRef, useState } from "react";

export const Character: FC = (): ReactElement => {
  class Character {
    ctx: CanvasRenderingContext2D;
    squerSize: number;
    margin: number;
    constructor() {
      this.squerSize = 5;
      this.margin = 100;
    }
  }
  const c = new Character();
  const canvas = useRef();
  const cv: HTMLCanvasElement = canvas.current;
  const [load, setload] = useState<boolean>(false);
  function Line(x: number, y: number, cnt: number) {
    for (let i = 0; i < cnt; i++) {
      if (cv !== undefined) {
        c.ctx = cv.getContext("2d");
        c.ctx.clearRect(
          c.margin + c.squerSize * 4,
          c.squerSize * 4,
          c.squerSize,
          c.squerSize
        );
        c.ctx.fillRect(c.margin + x + i, y, c.squerSize, c.squerSize);
      }
    }
  }
  function BodyDraw() {
    const size = c.squerSize;
    if(c.ctx !== undefined) c.ctx.clearRect(0, 0, cv.width, cv.height);
    for (let j = 3; j < 8; j++) {
      Line(3, size * j, size * 8);
    }
    Line(10, size * 2, size * 5);
    Line(3, size * 8, size * 4);
    Line(3, size * 9, size * 6);
    Line(2, size * 10, size * 3);
    Line(-3, size * 11, size * 4);
    Line(-8, size * 12, size * 5);
    Line(-13, size * 12, size * 8);
    Line(-18, size * 13, size * 7);
    Line(-23, size * 14, size * 8);
    Line(-28, size * 15, size * 9);
    Line(-23, size * 16, size * 7);
    Line(-18, size * 17, size * 6);
    Line(-13, size * 18, size * 5);
  }
  function draw(): void {
    const size = c.squerSize;
    let i = 0;
    setInterval(() => {
      i++;
      if (i % 2 == 0) {
        BodyDraw();
        Line(-13, size * 19, size);
        Line(7, size * 19, size);
        Line(7, size * 20, size);
        Line(7, size * 21, size);
        Line(7, size * 22, size * 2);
        Line(-8, size * 20, size * 1);
      } else {
        BodyDraw();
        Line(8, size * 19, size);
        Line(-8, size * 19, size);
        Line(-8, size * 20, size);
        Line(-8, size * 21, size);
        Line(-8, size * 22, size * 2);
        Line(10, size * 20, size * 1);
      }
    }, 100);
  }
  useEffect(() => {
    draw();
  }, [load]);
  useEffect(() => {
    setload(!load); // 캔버스 한번 리렌더링 해줘야됨
  }, []);
  return (
    <>
      <canvas
        ref={canvas}
        style={{ marginTop: "100px", marginLeft: "100px" }}
      />
    </>
  );
};