import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rating, Star } from "../rating/Rating";
import { Rating as FlowbiteRating } from "flowbite-react";

function Comments({ onNewComment }) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const { trailId, subtrailId, stageId } = useParams();

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!rating) {
      alert("Please select a rating");
      return;
    }

    try {
      const response = await axios.post("/comments/create", {
        username: name,
        trailId: trailId,
        subtrailId: subtrailId,
        stageId: stageId,
        comment: comment,
        rating: rating,
      });

      // Check if the comment is successfully saved
      if (response.data.success) {
        // Notify the parent component of the new comment
        onNewComment(response.data.comment);
        setName("");
        setComment("");
      } else {
        console.error("Error posting comment: ", response.data.message);
      }
    } catch (err) {
      console.error("Error posting comment: ", err);
    }
  };

  return (
    <div className="flex flex-col bg-white p-6 mt-5 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-5">Lämna en kommentar</h2>
      <form onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Namn
        </label>
        <input
          className="bg-gray-100 rounded-lg w-full p-3 mb-4 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          type="text"
          value={name}
          onChange={handleNameChange}
        />

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Betyg
          </label>
          <div className="flex items-center">
            <Rating initialRating={rating} onRatingChange={handleRatingChange}>
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </Rating>
            <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              {rating} av 5
            </p>
          </div>
        </div>

        <label className="block text-sm font-medium text-gray-700 mb-2">
          Kommentar
        </label>
        <textarea
          className="bg-gray-100 rounded-lg w-full p-3 mb-4 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          rows="5"
          value={comment}
          onChange={handleCommentChange}
        />

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          type="submit"
        >
          Skicka
        </button>
      </form>
    </div>
  );
}

export default Comments;
