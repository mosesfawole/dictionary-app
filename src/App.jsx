import { useState } from "react";
import Header from "./components/Header";
function App(props) {
  const { selectedFont } = props;
  console.log(selectedFont);
  return (
    <div
      className={`App font-${selectedFont} md:max-w-[800px] m-auto p-20 px-16`}
    >
      <Header />
    </div>
  );
}

export default App;
