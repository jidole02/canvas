import { SampleProvider } from "./CharacterGame/context";
import { Character, Hudle } from "./CharacterGame/index";
import { useState } from "react";

function App() {
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

export default App;
