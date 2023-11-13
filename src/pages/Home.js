import React, { useEffect, useState } from "react";
import hero from "../utils/images/hero.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [trailData, setTrailData] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get("/search", {
        params: { q: query },
      });
      setResults(response.data);
      setShowDropdown(true);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleResultSelect = (trailId) => {
    setShowDropdown(false);
    navigate(`/trails/${trailId}`);
  };

  const navigateToSearchResultsPage = () => {
    navigate("/search-results", {
      state: { results: results.data, query: query },
    });
  };

  useEffect(() => {
    axios.get("/trails").then((response) => {
      // Convert the object into an array of trails
      const trailsArray = Object.values(response.data);
      setTrailData(trailsArray);
    });
  }, []);
  const limitedTrailData = trailData.slice(0, 3);
  const url = "https://ledstatus.se/images/jamtland2.jpeg";

  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      <div className="relative overflow-hidden">
        <img className="object-cover h-[50vh] w-full" src={url} alt="Hero" />
        <div
          className="absolute top-0 left-0 w-full h-full bg-black opacity-50"
          style={{ zIndex: 1 }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white text-center">
          <div className="text-4xl font-bold p-4">
            <h1 className="text-center mb-6">
              Sök bland dina favorit vandringsleder
            </h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Sök efter din favoritled"
                className="bg-gray-200 text-gray-800 placeholder-gray-500 w-full rounded-lg py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  handleSearch();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    navigateToSearchResultsPage();
                  }
                }}
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>

              {showDropdown && (
                <div className="absolute z-10 mt-2 bg-white border border-gray-300 rounded shadow-md w-full">
                  {results.data.map((trail) => (
                    <div
                      key={trail.id}
                      className="px-4 py-2 cursor-pointer hover:bg-blue-100 text-black text-lg"
                      onClick={() => handleResultSelect(trail.id)}
                    >
                      {trail.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        {Array.isArray(results) &&
          results.map((trail) => (
            <div className="text-black" key={trail.id}>
              {trail.name}
            </div>
          ))}
      </div>

      <div className="text-center mt-12">
        <h2 className="text-4xl font-bold">Populärt</h2>
      </div>

      <div className="flex justify-center mt-10">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-40 place-items-stretch m-5">
          {limitedTrailData.map((trail, index) => (
            <a href={`/trails/${trail.id}`} key={index}>
              <div className="flex flex-col max-w-sm rounded overflow-hidden shadow-lg h-full">
                <img
                  className="w-full h-56 object-cover"
                  src={trail.img}
                  alt={trail.name}
                />
                <div className="flex-1 px-6 py-4">
                  <div className="font-bold text-xl mb-2">{trail.name}</div>
                  <p
                    className="text-gray-700 text-base overflow-y-hidden max-h-60"
                    dangerouslySetInnerHTML={{
                      __html:
                        trail.description.length > 255
                          ? `${trail.description.substring(0, 255)}...`
                          : trail.description,
                    }}
                  />
                </div>
                <div className="px-6 pt-4 pb-2">
                  {trail.tags.split(",").map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    >
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
