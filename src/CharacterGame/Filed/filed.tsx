import React, { ReactElement, useEffect, useRef, useState } from "react";
import * as s from "./styles";

const Filed: React.FC = (): ReactElement => {
  class Filed {
    ctx: CanvasRenderingContext2D;
    filedMargin: number;
    randNum: number;
    x: number;
    y: number;
    filedCreateTime: number;
    constructor() {
      this.filedMargin = 80;
      this.x = 0;
      this.y = 0;
      this.filedCreateTime = 10;
    }
  }
  const f = new Filed();
  const canvas = useRef();
  const cv: HTMLCanvasElement = canvas.current;
  const [load, setLoad] = useState<boolean>(false);
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));
  if (cv !== undefined) {
    f.ctx = cv.getContext("2d");
  }

  function rand(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {}, [load]);

  useEffect(() => {
    setLoad(!load);
  }, []);

  return (
    <>
      <s.Container
        style={{
          marginTop: "14%",
          marginLeft: "22%",
        }}
      >
        <canvas ref={canvas} style={{ marginTop: "8%" }} />
      </s.Container>
    </>
  );
};

export default React.memo(Filed);
