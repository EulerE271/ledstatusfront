import React from "react";
import { Link, useLocation } from "react-router-dom";

const SearchResultsPage = () => {
  const location = useLocation();
  const results = location.state?.results || [];
  const query = location.state?.query || "";
  console.log("Query:", query);

  return (
    <div className="flex flex-col items-center mt-10 px-4 md:px-0">
      {" "}
      <h1 className="text-xl md:text-3xl mb-8">Resultat för "{query}"</h1>{" "}
      <div className="flex justify-center w-full">
        <div
          className={`flex justify-center w-full ${
            results.length === 1 ? "" : "grid md:grid-cols-3 grid-cols-1"
          } gap-40 place-items-stretch max-w-screen-xl`}
        >
          {results.map((trail, index) => (
            <Link to={`/trails/${trail.id}`} key={index}>
              <div className="flex flex-col max-w-sm rounded overflow-hidden shadow-lg h-full">
                <img
                  className="w-full h-56 object-cover"
                  src={trail.img}
                  alt={trail.name}
                />
                <div className="flex-1 px-4 md:px-6 py-4">
                  <div className="font-bold text-lg md:text-xl mb-2">
                    {trail.name}
                  </div>
                  <p
                    className="text-gray-700 text-sm md:text-base overflow-y-hidden max-h-60"
                    dangerouslySetInnerHTML={{
                      __html:
                        trail.description.length > 255
                          ? `${trail.description.substring(0, 255)}...`
                          : trail.description,
                    }}
                  />
                </div>
                <button className="m-4 border rounded-lg text-white bg-blue-500 p-2">
                  Besök
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
