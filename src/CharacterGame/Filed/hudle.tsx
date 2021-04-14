import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import { SetState } from "../context";
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
  const setState = SetState();
  const canvas = useRef();
  const cv: HTMLCanvasElement = canvas.current;
  const [load, setLoad] = useState<boolean>(false);
  if (cv !== undefined) {
    f.ctx = cv.getContext("2d");
    f.ctx.fillStyle = "black";
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
        f.ctx.clearRect(x + i + 1, y, f.squerSize, f.squerSize);
      }
    }
  }

  function RandOb(ran: number) {
    let x = 0;
    if (cv !== undefined) {
      /* 첫번째 랜덤 선인장 */
      if (ran === 1) {
        var a = setInterval(() => {
          /* 선인장 왼쪽 없에기 */
          x++;
          setState({type:'OB_PLACE',obx:x});
          f.ctx.clearRect(0,0,cv.width,cv.height);
          /* 선인장 왼쪽 가지 */
          Line(280 - x, f.squerSize * 2, 1);
          for (let j = 3; j < 18; j++) {
            Line(275 - x, f.squerSize * j, 8);
          }
          Line(260 - x, f.squerSize * 7, 1);
          Line(260 - x, f.squerSize * 8, 6);
          Line(260 - x, f.squerSize * 9, 6);
          Line(260 - x, f.squerSize * 10, 6);
          Line(260 - x, f.squerSize * 11, 10);
          Line(265 - x, f.squerSize * 11, 10);
          Line(265 - x, f.squerSize * 12, 10);
          Line(285 - x, f.squerSize * 11, 7);
          Line(285 - x, f.squerSize * 10, 10);
          Line(290 - x, f.squerSize * 9, 8);
          Line(295 - x, f.squerSize * 8, 3);
          if (x > 300) clearInterval(a);
        }, 3);
      }
    }
  }

  useEffect(() => {
    RandOb(1);
    setInterval(() => {
      RandOb(1);
    }, 1500); 
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
        <canvas ref={canvas} />
      </s.Container>
    </>
  );
};
