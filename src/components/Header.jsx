import React, { useState } from "react";
import Logo from "../assets/logo.svg";
import Moon from "../assets/moon.svg";
import ArrowDown from "../assets/icon-arrow-down.svg";
import ArrowUp from "../assets/icon-arrow-up.svg";
const Header = () => {
  const [selectedFont, setSelectedFont] = useState("Sans-serif");
  const [modal, setModal] = useState(true);

  return (
    <div>
      <div className="header flex">
        <div className="logo flex-1">
          <img src={Logo} alt="logo" />
        </div>
        <div className="rest flex gap-4 items-center justify-center">
          <div className="fonts relative">
            <div className="font-bold flex capitalize gap-4">
              {selectedFont}
              <img
                onClick={() => {
                  setModal(!modal);
                }}
                className={`${
                  modal ? "rotate-180  " : ""
                } cursor-pointer transition-all`}
                src={modal ? ArrowUp : ArrowDown}
                alt="down-arrow"
              />
            </div>

            <div
              className={`${
                modal
                  ? "absolute  flex flex-col justify-center gap-2 font-bold z-10 right-4 top-8 w-48 h-32 p-4 bg-white shadow-2xl rounded-xl "
                  : "hidden"
              }  `}
            >
              <p
                onClick={() => setSelectedFont("sans-serif")}
                className="cursor-pointer font-sans-serif"
              >
                Sans-Serif
              </p>
              <p
                onClick={() => setSelectedFont("serif")}
                className="cursor-pointer font-serif"
              >
                Serif
              </p>
              <p
                onClick={() => setSelectedFont("mono")}
                className="cursor-pointer font-mono"
              >
                Mono
              </p>
            </div>
          </div>
          {/* seperator */}
          <div className="seperator h-10 border"></div>
          <div className="theme"></div>
          <div className="moon">
            <img src={Moon} alt="moon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
