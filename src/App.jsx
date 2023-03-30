import { useState } from "react";
import Header from "./components/Header";
import Results from "./components/Results";
function App(props) {
  const { selectedFont } = props;
  console.log(selectedFont);
  return (
    <div
      className={`App font-${selectedFont} md:max-w-[800px] m-auto p-4 md:p-20 md:px-16`}
    >
      <Header />
      <Results />
    </div>
  );
}

export default App;
