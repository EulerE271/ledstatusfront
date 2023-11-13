import React from 'react'

function ErrorComponent({ error }) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-4">
          <h1 className="text-2xl font-semibold mb-2">Oj! Något gick tokigt!</h1>
          <p className="text-gray-700 mb-4">Vi kunde inte ladda datan. Försök igen senare</p>
          <details className="text-sm">
            <summary className="font-semibold text-red-500 cursor-pointer">Detaljer</summary>
            <p>{error.toString()}</p>
          </details>
        </div>
      </div>
    );
  }
  

export default ErrorComponent