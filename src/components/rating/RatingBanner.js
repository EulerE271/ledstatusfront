import axios from "axios";
import React, { useEffect, useState } from "react";
import { Rating } from "flowbite-react";
import { useParams } from "react-router-dom";
import LoadingIndicator from "../data/Loading";
import ErrorComponent from "../data/Error";

function RatingBanner() {
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState([]);
  const [error, setError] = useState("");
  const [averageRating, setAverageRating] = useState(0)

  const { trailId } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/trails/${trailId}/rating`)
      .then((response) => {
        setRating(response.data);
        setAverageRating(response.data.averageRating)
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [trailId]);

  return (
    <div className="mx-4 my-6 p-6 bg-white rounded-xl shadow-lg max-w-5xl mx-auto flex justify-between items-center">
      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <ErrorComponent error={error} />
      ) : (
        <>
          <div className="flex flex-col md:flex-row">
            <p className="text-lg font-semibold">
              <Rating>
                <Rating.Star />
                <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                  {Math.round(averageRating * 100) / 100}
                </p>
                <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
                <a
                  className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
                  href="#"
                >
                  <p>av {rating.ratingCount} betyg</p>
                </a>
              </Rating>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default RatingBanner;
