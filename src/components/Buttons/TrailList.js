import { Link } from "react-router-dom";
import React from "react";

function TrailList({ list, type, trailId }) {
  return (
    <>
      {list.map((item, index) => (
        <Link
          to={`/trails/${trailId}/${type}/${item.id}`}
          key={index}
          className="block p-6 bg-white bg-opacity-90 rounded-xl md:mt-0 mt-10 shadow-md transition-transform transform hover:scale-105"
        >
          <h3 className="text-gray-700 font-semibold text-lg">
            {item.start_name
              ? `${item.start_name} - ${item.end_name}`
              : `${item.start} - ${item.end}`}
          </h3>
        </Link>
      ))}
    </>
  );
}

export default TrailList;