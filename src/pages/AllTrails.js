import axios from "axios";
import { Pagination } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AllTrails() {
  const [trail, setTrail] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [maxPage, setMaxPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  const transitionStyles = {
    transition: "all 0.3s ease-in-out",
  };

  useEffect(() => {
    axios
      .get("/trails/all")
      .then((response) => {
        setTrail(response.data);
        updateMaxPage(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await axios.get("/search", {
          params: { q: searchQuery },
        });

        const searchResults = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        setResults(searchResults);
        updateMaxPage(searchResults);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    handleSearch();
  }, [searchQuery]);

  const updateMaxPage = (data) => {
    setMaxPage(Math.min(Math.ceil(data.length / itemsPerPage), 100));
  };

  const truncateDescription = (description) => {
    if (description && description.length > 255) {
      return `${description.substring(0, 255)}...`;
    }
    return description;
  };

  const displayedTrails = searchQuery ? results : trail;
  const displayedTrailsArray = Array.isArray(displayedTrails)
    ? displayedTrails
    : [];

  const paginatedTrails = displayedTrailsArray
    .map((trail) => ({
      ...trail,
      description: truncateDescription(trail.description),
    }))
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen">
      <div
        className="flex flex-col items-center mt-10 px-4 md:px-0 "
        style={transitionStyles}
      >
        <div className="relative m-10">
          <input
            type="text"
            placeholder="Sök vandringsleder..."
            className="bg-gray-200 text-gray-800 placeholder-gray-500 w-full rounded-lg py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex justify-center w-full ">
          <div
            className={`flex justify-center w-full ${
              Array.isArray(paginatedTrails) && paginatedTrails.length === 1
                ? ""
                : "grid md:grid-cols-3 grid-cols-1"
            } gap-40 place-items-stretch max-w-screen-xl`}
          >
            {Array.isArray(paginatedTrails) &&
              paginatedTrails.map((trail) => (
                <Link to={`/trails/${trail.id}`} key={trail.id}>
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
                            trail.description && trail.description.length > 255
                              ? `${trail.description.substring(0, 255)}...`
                              : trail.description || "",
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
        <nav className="mt-10">
          <Pagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            showIcons
            totalPages={maxPage}
          />
        </nav>
      </div>
    </div>
  );
}

export default AllTrails;
