import { SampleProvider } from "./CharacterGame/context";
import { Character, Hudle } from "./CharacterGame/index";

function App() {
  return (
    <SampleProvider>
      <Hudle />
      <Character />
    </SampleProvider>
  );
}

export default App;
