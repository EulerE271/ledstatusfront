import React, { useEffect, useState } from "react";
import axios from "axios";
import hero from "../utils/images/hero.jpg";
import Description from "../components/trail/Description";
import Comments from "../components/trail/Comments";
import Comment from "../components/trail/Comment";
import { Link, useParams } from "react-router-dom";
import Weather from "../components/data/Weather";
import ErrorComponent from "../components/data/Error";
import LoadingIndicator from "../components/data/Loading";
import RatingBanner from "../components/rating/RatingBanner";
import StageDetails from "../components/data/StageDetails";
import Map from "../components/map/Map";
import Modalbutton from "../components/Buttons/Modalbutton";
import Modal from "../components/Modals/Modal";
import TrailList from "../components/Buttons/TrailList";

function SubTrail() {
  const { trailId, subtrailId } = useParams();

  const [isMapExpanded, setIsMapExpanded] = useState(true);
  const [nameStart, setNameStart] = useState("");
  const [nameEnd, setNameEnd] = useState("");
  const [desc, setDesc] = useState("");
  const [level, setLevel] = useState("");
  const [rating, setRating] = useState("");
  const [location, setLocation] = useState("");
  const [comments, setComments] = useState([]);
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [response, setResponse] = useState("");
  const [startCoordinates, setStartCoordinates] = useState("");
  const [endCoordinates, setEndCoordinates] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`/trails/${trailId}/subtrails/${subtrailId}`)
      .then((response) => {
        setEndCoordinates(response.data.end_coordinates);
        setStartCoordinates(response.data.start_coordinates);
        const subTrailData = response.data;
        setNameStart(subTrailData.start_name);
        setNameEnd(subTrailData.end_name);
        setDesc(subTrailData.description);
        setLevel(subTrailData.level);
        setRating(subTrailData.rating);
        setLocation(subTrailData.start_coordinates);
        setResponse(response.data);

        if (subTrailData.stages && subTrailData.stages.length > 0) {
          setStages(subTrailData.stages);
        }
        // More logic for handling subTrailData if needed
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });

    axios
      .get(`/trails/${trailId}/subtrails/${subtrailId}/comments`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching comments: ", error);
      });
  }, [trailId, subtrailId]);

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
          {/* Hero Section */}
          <div className="relative overflow-hidden">
            <img
              className="object-cover w-full h-full"
              src={response.img}
              alt="hiker in the mountains"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-4">
              <div className="text-white text-5xl md:text-7xl font-extrabold mb-4 p-3 shadow-text">
                {name}
              </div>
              <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl p-4">
                <TrailList
                  list={stages.length > 0 ? stages : stages}
                  type={stages.length > 0 ? "stages" : "stages"}
                  trailId={trailId}
                />
              </div>
              <Modalbutton
                input={stages}
                onClick={() => setModalOpen(true)}
              />
            </div>
            <button
              className="absolute bottom-8 right-8 bg-white p-2 rounded-lg"
              onClick={() => setIsMapExpanded(!isMapExpanded)}
            >
              {isMapExpanded ? "Göm karta" : "Visa karta"}
            </button>
          </div>

          <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <TrailList
              list={stages.length > 0 ? stages : ""}
              type={stages.length > 0 ? "stages" : "stages"}
              trailId={trailId}
            />
          </Modal>

          <RatingBanner />

          {isMapExpanded && (
            <div className="flex-grow p-6 mt-6 bg-white rounded-xl shadow-lg mx-4 md:mx-auto max-w-5xl">
              <Map
                start_coordinates={startCoordinates}
                end_coordinates={endCoordinates}
              />
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
                    level={"subtrail"}
                    timeUnit={"dagar"}
                    distance={response.distance}
                    minTime={response.min_time}
                    maxTime={response.max_time}
                    cabin={response.cabin}
                    avgMin={response.avg_distance_min}
                    avgMax={response.avg_distance_max}
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

export default SubTrail;
