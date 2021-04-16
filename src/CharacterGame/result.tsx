import { SampleProvider } from "./context";
import { Character, Hudle } from "./index";
import { useState } from "react";

export default function CharterGameResult() {
  const [load, setLoad] = useState<boolean>(false);
  window.onkeydown = function (e) {
    if (e.keyCode === 32) {
      setLoad(true);
    }
  };
  return (
    <SampleProvider>
      {load && <Hudle />}
      <Character />
    </SampleProvider>
  );
}