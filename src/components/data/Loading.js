import React from 'react'

function LoadingIndicator() {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner p-5 rounded-full border-2 border-t-2 border-blue-500 animate-spin"></div>
      </div>
    );
  }

export default LoadingIndicator
  