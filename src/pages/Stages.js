import React, { useEffect, useState } from "react";
import axios from "axios";
import hero from "../utils/images/hero.jpg";
import Description from "../components/trail/Description";
import Comments from "../components/trail/Comments";
import Comment from "../components/trail/Comment";
import { useParams } from "react-router-dom";
import Weather from "../components/data/Weather";
import LoadingIndicator from "../components/data/Loading";
import ErrorComponent from "../components/data/Error";
import RatingBanner from "../components/rating/RatingBanner";
import StageDetails from "../components/data/StageDetails";
import Map from "../components/map/Map";

function Stages() {
  const { trailId, stageId } = useParams();

  const [coordinates, setCoordinates] = useState("");
  const [isMapExpanded, setIsMapExpanded] = useState(true);
  const [nameStart, setNameStart] = useState("");
  const [nameEnd, setNameEnd] = useState("");
  const [desc, setDesc] = useState("");
  const [level, setLevel] = useState("");
  const [rating, setRating] = useState("");
  const [location, setLocation] = useState("");
  const [comments, setComments] = useState([]);
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true); // Loading State
  const [error, setError] = useState(null); // Error State
  const [response, setResponse] = useState([]);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`/trails/${trailId}/stages/${stageId}`)
      .then((response) => {
        setCoordinates(response.data.start_coordinates);
        const stageData = response.data;
        setNameStart(stageData.start);
        setNameEnd(stageData.end);
        setDesc(stageData.description);
        setLevel(stageData.level);
        setRating(stageData.rating);
        setLocation(stageData.start_coordinates);
        setResponse(stageData);
        if (stageData.stages && stageData.stages.length > 0) {
          setStages(stageData.stages);
        }
      })
      .catch(setError)
      .finally(() => setLoading(false));

    axios
      .get(`/trails/${trailId}/stages/${stageId}/comments`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching comments: ", error);
      });
  }, [trailId, stageId]);

  const handleNewComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const name = nameStart + "-" + nameEnd;

  return (
    <div className="min-h-screen bg-gray-100">
      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <ErrorComponent error={error} />
      ) : (
        <>
          <div className="relative overflow-hidden">
            <img
              className="object-cover w-full h-full"
              src={response.img}
              alt={`Stage ${name}`}
            />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-4">
              <div className="text-white text-5xl md:text-7xl font-extrabold mb-4 p-3 shadow-text">
                {name}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                {stages.map((stage, index) => (
                  <div
                    key={index}
                    className="block p-4 bg-white bg-opacity-80 rounded shadow-lg transition-transform transform hover:scale-105"
                  >
                    <h3 className="text-black font-semibold">
                      {stage.start} - {stage.end}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
            <button
              className="absolute bottom-8 right-8 bg-white p-2 rounded-lg"
              onClick={() => setIsMapExpanded(!isMapExpanded)}
            >
              {isMapExpanded ? "Göm karta" : "Visa karta"}
            </button>
          </div>

          <RatingBanner />

          {isMapExpanded && (
            <div className="flex-grow p-6 mt-6 bg-white rounded-xl shadow-lg mx-4 md:mx-auto max-w-5xl">
              <Map start_coordinates={coordinates} />
            </div>
          )}

          <div className="flex-grow p-6 mt-6 bg-white rounded-xl shadow-lg mx-4 md:mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Description name={name} desc={desc} />
              </div>

              <div className="bg-gray-200 shadow-inner p-6 rounded-lg">
                <Weather location={location} />
              </div>

              <div className="p-6 rounded-lg bg-gray-200 shadow-inner">
                <div className="mt-3">
                  <StageDetails
                    timeUnit={"timmar"}
                    distance={response.distance}
                    minTime={response.min_time}
                    maxTime={response.max_time}
                    cabin={response.cabin}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 mt-6 mx-4 bg-white rounded-xl shadow-lg max-w-5xl mx-auto">
            <Comments onNewComment={handleNewComment} />
            <Comment comments={comments} />
          </div>
        </>
      )}
    </div>
  );
}

export default Stages;
