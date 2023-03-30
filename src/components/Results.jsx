import React, { useState } from "react";
import Search from "../assets/icon-search.svg";
import Play from "../assets/icon-play.svg";
import Axios from "axios";
const Results = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    Axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
        setError("");
        setSearchTerm("");
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        setError({
          emoji: "😕",
          title: "No Definitions Found",
          message: `Sorry pal, we couldn't find definitions for the word (${searchTerm}) you were looking for.`,
          resolution:
            "You can try the search again at later time or head to the web instead.",
        });
      });
  };

  const playAudio = (audio) => {
    let audioElement = new Audio(audio);
    audioElement.play();
  };

  return (
    <div className="mt-10">
      <div className="">
        <form onSubmit={handleSubmit} className="search flex relative">
          <input
            className="h-16 w-full text-xl font-bold  p-4 text-[#2d2d2d] rounded-2xl outline-1 outline-[#a445ed] bg-[#f4f4f4]"
            placeholder="Search for any word ..."
            type="text"
            value={searchTerm}
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
          {loading && <div className="">Loading ...</div>}

          {!loading && error && (
            <div className="error">
              <p>{error.emoji}</p>
              <h2>{error.title}</h2>
              <p>{error.message}</p>
              <p>{error.resolution}</p>
            </div>
          )}
          {data.slice(0, 1).map((result, index) => {
            return (
              <div className="" key={index}>
                <div className="header flex justify-center items-center ">
                  <div className="flex-1">
                    <h2 className="font-bold md:text-8xl md:leading-[7.7rem]">
                      {result.word}
                    </h2>
                  </div>
                  <div key={index} className="flex gap-4">
                    {result.phonetics.map(
                      (phonetic, index) =>
                        phonetic.audio && (
                          <button>
                            <img
                              className="cursor-pointer"
                              key={index}
                              src={Play}
                              alt="play-icon"
                              onClick={() => playAudio(phonetic.audio)}
                            />
                          </button>
                        )
                    )}
                  </div>

                  <h4>{result.phonetic}</h4>
                </div>
                <div className="main">
                  {result.meanings.slice(0, 2).map((meaning, index) => {
                    return (
                      <div className="" key={index}>
                        <div className="speech">
                          <p className="md:text-4xl text-2xl font-bold italic">
                            {meaning.partOfSpeech}
                          </p>
                          <div className="line"></div>
                        </div>
                        <div className="definitions">
                          <h4 className="text-[#757575]  text-xl ">Meaning</h4>
                        </div>
                        {meaning.definitions
                          .slice(0, 3)
                          .map((definition, index) => {
                            return (
                              <div className="" key={index}>
                                <ul className="list-disc ">
                                  <li className="text-xl text-[#2d2d2d]">
                                    {definition.definition}
                                  </li>
                                </ul>
                                {definition.example && (
                                  <div className="example">
                                    <p className="text-[2rem] leading-8">
                                      "{definition.example}"
                                    </p>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        <div className="synonyms">
                          {meaning.synonyms && meaning.synonyms.length > 0 && (
                            <span>
                              <h4 className="text-2gitxl leading-8">
                                {" "}
                                Synonyms
                              </h4>
                              :
                              <a className="text-2xl leading-8 text-[#a445ed]">
                                {meaning.synonyms.join(", ")}
                              </a>
                            </span>
                          )}

                          {meaning.antonyms && meaning.antonyms.length > 0 && (
                            <span>
                              <h4>Antonyms</h4>: {meaning.antonyms.join(", ")}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Results;
