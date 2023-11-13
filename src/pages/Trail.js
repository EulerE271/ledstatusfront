import React, { useEffect, useState } from "react";
import axios from "axios";
import Description from "../components/trail/Description";
import Comments from "../components/trail/Comments";
import Comment from "../components/trail/Comment";
import { useParams } from "react-router-dom";
import Weather from "../components/data/Weather";
import LoadingIndicator from "../components/data/Loading";
import RatingBanner from "../components/rating/RatingBanner";
import StageDetails from "../components/data/StageDetails";
import Map from "../components/map/Map";
import TrailList from "../components/Buttons/TrailList";
import Modalbutton from "../components/Buttons/Modalbutton";
import Modal from "../components/Modals/Modal";

function Trail() {
  const { trailId } = useParams();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState("");
  const [comments, setComments] = useState([]);
  const [subtrails, setSubtrails] = useState([]);
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState([]);
  const [isMapExpanded, setIsMapExpanded] = useState(true);
  const [startCoordinates, setStartCoordinates] = useState("");
  const [endCoordinates, setEndCoordinates] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`/trails/${trailId}`)
      .then((response) => {
        setEndCoordinates(response.data.end_coordinates);
        setStartCoordinates(response.data.start_coordinates);
        const trailData = response.data;
        setName(trailData.name);
        setDesc(trailData.description);
        setResponse(response.data);
        setLocation(trailData.start_coordinates);

        if (trailData.subtrails && trailData.subtrails.length > 0) {
          setSubtrails(trailData.subtrails);
        } else if (trailData.stages && trailData.stages.length > 0) {
          setStages(trailData.stages);
        }
      })
      .finally(() => {
        setLoading(false);
      });

    axios
      .get(`/trails/${trailId}/comments`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching comments: ", error);
      });
  }, [trailId]);

  const handleNewComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
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
                  list={subtrails.length > 0 ? subtrails : stages}
                  type={subtrails.length > 0 ? "subtrails" : "stages"}
                  trailId={trailId}
                />
              </div>
              <Modalbutton
                input={subtrails}
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
              list={subtrails.length > 0 ? subtrails : stages}
              type={subtrails.length > 0 ? "subtrails" : "stages"}
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
                    level={"trail"}
                    timeUnit={"dagar"}
                    distance={response.distance}
                    minTime={response.time_low}
                    maxTime={response.time_max}
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

export default Trail;
