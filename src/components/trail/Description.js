import React from "react";

function Description({name, desc}) {
  return (
    <div className="">
      <div className="bg-white p-4 m-3 rounded-lg w-full">
        <h2 className="text-4xl font-semibold mb-4">{name}</h2>
        <p className="" dangerouslySetInnerHTML={{ __html: desc }}></p>
      </div>
    </div>
  );
}
export default Description;
