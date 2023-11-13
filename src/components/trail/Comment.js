import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CommentRating } from "../rating/CommentRating";
import { Pagination } from 'flowbite-react';

function Comment({ comments }) {

  function formatDate(dateString) {
    const date = new Date(dateString);
    if (!isNaN(date)) {
      return date.toLocaleString();
    }
    return "Date not available";
  }

  const sortedComments = comments.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  const commentsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(comments.length / commentsPerPage);

  
  // Paginated comments
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = sortedComments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  // Page change handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Total page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(comments.length / commentsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-col bg-white p-6 mt-10 rounded-lg shadow-md mb-10">
      <h2 className="text-xl font-bold mb-5">Kommentarer</h2>
      {currentComments.length === 0 && (
        <p>Inga kommentarer ännu. Bli den första att kommentera.</p>
      )}
      {currentComments.map((commentData, index) => (
        <div key={index} className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-1">{commentData.username}</h3>
          <h5 className="text-xs text-gray-500 mb-2">
            {formatDate(commentData.created_at)}
          </h5>
          <h5 className="text-xs text-gray-500 mb-2">
            {commentData.stage_name ||
              commentData.subtrail_name ||
              commentData.trail_name}
          </h5>
          <h5 className="text-xs text-gray-500 mb-2">
            <CommentRating value={Math.round(commentData.rating * 10) / 10} />
          </h5>
          <p className="font-light text-gray-700 mb-6">{commentData.comment}</p>
        </div>
      ))}
      <nav className="mt-8">
        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          showIcons
          totalPages={totalPages}
        />
      </nav>
    </div>
  );
}

export default Comment;
