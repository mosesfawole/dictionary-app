import React, { useState } from "react";
import Search from "../assets/icon-search.svg";
import Play from "../assets/icon-play.svg";
import Axios from "axios";
const Results = () => {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [isPlay, setIsPlay] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/hello`)
      .then((response) => {
        setError("");
        console.log(response.data[0]);
        setData(response.data[0]);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const playAudio = () => {
    let audio = new Audio(data.phonetics[0].audio);
    audio.play();
  };

  return (
    <div className="mt-10">
      <div className="">
        <form onSubmit={handleSubmit} className="search flex relative">
          <input
            className="h-16 w-full text-xl font-bold  p-4 text-[#2d2d2d] rounded-2xl outline-1 outline-[#a445ed] bg-[#f4f4f4]"
            placeholder="Search for any word ..."
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img
            onClick={handleSubmit}
            className="cursor-pointer absolute right-6 top-6"
            src={Search}
            alt="search"
          />
        </form>
        <div className="result">
          {error}
          {data && (
            <div className="">
              <div className="top">
                <h1 className="text-6xl font-bold"> {data.word}</h1>
                <p>{data.phonetics[1].text}</p>

                <button onClick={playAudio}>
                  <img src={Play} alt="play" />
                </button>
              </div>

              <div className="">
                <div></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
