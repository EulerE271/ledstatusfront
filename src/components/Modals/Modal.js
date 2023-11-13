import React, { useEffect } from "react";

function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    const mapContainer = document.querySelector(".leaflet-container");

    if (mapContainer) {
      if (isOpen) {
        mapContainer.style.visibility = "hidden";
      } else {
        mapContainer.style.visibility = "visible";
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-1000 overflow-y-auto bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg w-11/12 md:w-3/4 p-5 overflow-y-auto max-h-full shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-2 z-50"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
