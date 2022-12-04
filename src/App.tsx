import React from "react";
import "./index.css";
import { RegisterServer } from "./pages/RegisterServer";

function App() {
  return (
    <div className="bg-gradient-to-r from-[#141E30] to-[#243B55] h-screen w-full flex justify-center">
      {/*<RegisterServer />*/}
      <div
        className="w-1/4 h-1/2 bg-white bg-opacity-20 
      backdrop-blur-lg rounded drop-shadow-lg mt-12 
      border border-white min-w-fit flex flex-col items-center"
      >
        <h1 className={"text-2xl"}>Anmeldung</h1>
        <div>
          <input className={"w-80 h-8 ml-4 mr-4"}></input>
          <input className={"w-80 h-8 ml-4 mr-4"}></input>
        </div>
      </div>
    </div>
  );
}

export default App;
