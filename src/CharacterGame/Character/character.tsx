import { FC, ReactElement, useEffect, useRef, useState } from "react";
import { GetState } from "../context";

export const Character: FC = (): ReactElement => {
  class Character {
    ctx: CanvasRenderingContext2D;
    squerSize: number;
    margin: number;
    jumpBool: boolean;
    y: number;
    // 클래스 생성시 초기화
    constructor() {
      this.jumpBool = false;
      this.squerSize = 3;
      this.margin = 30;
      this.y = 0;
    }
  }
  const c = new Character();
  const canvas = useRef();
  const cv: HTMLCanvasElement = canvas.current;
  const [load, setload] = useState<boolean>(false);
  const [jumpHeight, setJumpHeight] = useState<number>(15);
  const [jumpBool, setJumpBool] = useState<boolean>(false);
  const obx = GetState();

  /* 라인 그리기 */
  function Line(x: number, y: number, cnt: number) {
    for (let i = 0; i < cnt; i++) {
      if (cv !== undefined) {
        c.ctx = cv.getContext("2d");
        c.ctx.fillStyle = "black";
        c.ctx.clearRect(
          c.margin + c.squerSize * 3,
          c.squerSize * 4,
          c.squerSize,
          c.squerSize
        ); // 캐릭터 눈알
        c.ctx.fillRect(c.margin + x + i, y, c.squerSize, c.squerSize);
      }
    }
  }

  /* 몸통 그려주고 */
  function BodyDraw() {
    const size = c.squerSize;
    if (c.ctx !== undefined) {
      c.ctx.clearRect(0, 0, cv.width, cv.height);
    }
    for (let j = 3; j < 8; j++) Line(3, size * j, size * 8);
    Line(size * 2, size * 2, size * 5);
    Line(size * 0.6, size * 8, size * 4);
    Line(size * 0.6, size * 9, size * 6);
    Line(size * 0.4, size * 10, size * 3);
    Line(-size * 0.6, size * 11, size * 4);
    Line(-size * 1.6, size * 12, size * 5);
    Line(-size * 2.6, size * 12, size * 8);
    Line(size * 5.2, size * 13, size / 6);
    Line(-size * 3.6, size * 13, size * 7);
    Line(-size * 4.6, size * 14, size * 8);
    Line(-size * 5.6, size * 15, size * 9);
    Line(-size * 4.6, size * 16, size * 7);
    Line(-size * 3.6, size * 17, size * 6);
    Line(-size * 2.6, size * 18, size * 5);
    Line(-size * 3.6, size * 19, size * 5.1);
    /* 꼬리쪽 */
    Line(-size * 8.6, size * 10, size / 3);
    Line(-size * 8.6, size * 11, size * 1);
    Line(-size * 8.6, size * 12, size * 2);
    Line(-size * 8.6, size * 13, size * 5);
    Line(-size * 8.6, size * 14, size * 4);
    Line(-size * 7.6, size * 15, size * 4);
    Line(-size * 6.6, size * 16, size * 4);
    Line(-size * 5.6, size * 17, size * 4);
    Line(-size * 4.6, size * 18, size * 4);
  }

  /* 만약 장애물 왔는데 점프 안하고 있으면 */
  if (obx.obx === 240 && !jumpBool) {
    alert("game over");
  } /* alert('게임오바')  */

  /* 다리 왔다리 갔다리 */
  function draw(): void {
    const size = c.squerSize;
    let i = 0;
    var interval = setInterval(() => {
      i++;
      if (localStorage.getItem("bool") === "true") {
        clearInterval(interval);
      }
      if (i % 2 == 0) {
        BodyDraw();
        Line(-size * 3.6, size * 20, size);
        Line(size * 0.4, size * 20, size);
        Line(size * 0.4, size * 21, size);
        Line(size * 0.4, size * 22, size);
        Line(size * 0.4, size * 23, size * 2);
        Line(-size * 2.6, size * 21, size * 1);
      } else {
        BodyDraw();
        Line(size * 0.6, size * 20, size);
        Line(-size * 2.6, size * 20, size);
        Line(-size * 2.6, size * 21, size);
        Line(-size * 2.6, size * 22, size);
        Line(-size * 2.6, size * 23, size * 2);
        Line(size, size * 21, size * 1);
      }
    }, 100);
  }

  useEffect(() => {
    draw();
    localStorage.setItem("bool", "true");
  }, [load]);
  /* 첨에 실행 */

  useEffect(() => {
    setload(!load);
    // 캔버스 한번 리렌더링 해줘야됨
  }, []);
  /* 점프 이벤트 */
  window.onkeypress = (e) => {
    let i = 0;
    if (e.keyCode === 32) {
      if (jumpBool) {
        return;
      }
      setJumpBool(true);
      // 점프시 멈추게
      localStorage.setItem("bool", "true");
      var interval = setInterval(() => {
        if (i < 41) {
          c.y++;
        } else {
          c.y--;
        }
        i++;
        if (i > 80) clearInterval(interval);
      }, 10);
      if (jumpHeight !== 15) {
        return;
      }
      setJumpHeight(8);
      setTimeout(() => {
        setJumpBool(false);
        // 점프시에 멈추는거 해제
        localStorage.setItem("bool", "false");
      }, 800);
      setTimeout(() => {
        draw(); // 점프 끝나면 다시 다리 구르도록
      }, 700); // 내려오는거보다 약간 빠른게 적당
      setTimeout(() => {
        setJumpHeight(15);
      }, 400);
    }
  };
  return (
    <>
      <canvas
        ref={canvas}
        style={{
          marginTop: `${jumpHeight}%`,
          transition: "0.4s",
          position: "absolute",
          zIndex: 5,
          marginLeft: "23%",
        }}
      />
    </>
  );
};
