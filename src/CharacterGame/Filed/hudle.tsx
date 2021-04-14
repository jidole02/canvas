import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import * as s from "./styles";

export const Hudle: React.FC = (): ReactElement => {
  class Filed {
    ctx: CanvasRenderingContext2D;
    squerSize: number;
    constructor() {
      this.squerSize = 4;
    }
  }
  const f = new Filed();
  const canvas = useRef();
  const cv: HTMLCanvasElement = canvas.current;
  const [load, setLoad] = useState<boolean>(false);
  if (cv !== undefined) {
    f.ctx = cv.getContext("2d");
    f.ctx.fillStyle = "gray";
  }

  function rand(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function Line(x: number, y: number, lim: number) {
    if (cv !== undefined) {
      for (let i = 0; i < lim; i++) {
        f.ctx.fillRect(x + i, y, f.squerSize, f.squerSize);
      }
    }
  }

  function ClearLine(x: number, y: number, lim: number) {
    if (cv !== undefined) {
      for (let i = 0; i < lim; i++) {
        f.ctx.clearRect(x + i, y, f.squerSize, f.squerSize);
      }
    }
  }

  function RandOb(ran: number) {
    let x = 0;
    if (cv !== undefined) {
        /* 첫번째 랜덤 선인장 */
      if (ran === 1) {
        var a = setInterval(() => {
          /* x++; */
 /*          for (let j = 0; j < 12; j++) {
            ClearLine(281 - x, f.squerSize * j, 10);
          } */
          Line(280 - x, f.squerSize * 1, 1);
          for(let j =2;j<15;j++){
            Line(275 - x, f.squerSize * j, 10);
          }
          if (x > 300) clearInterval(a);
        }, 3);
      }
      if (ran === 2) {
        var a = setInterval(() => {
          /* x++; */
          for (let j = 5; j < 12; j++) {
            ClearLine(201 - x, f.squerSize * j, 10);
          }
          for (let j = 5; j < 12; j++) {
            Line(200 - x, f.squerSize * j, 10);
          }
          if (x > 300) clearInterval(a);
        }, 3);
      }
    }
  }

  useEffect(() => {
      RandOb(1)
/*     setInterval(() => {
      RandOb(1);
    }, 2000); */
  }, [load]);

  useEffect(() => {
    setLoad(!load);
  }, []);

  return (
    <>
      <s.Container
        style={{
          marginTop: "15%",
          marginLeft: "22%",
        }}
      >
        <canvas ref={canvas}/>
      </s.Container>
    </>
  );
};
