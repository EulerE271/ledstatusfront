import React, { useState } from "react";

function Modalbutton({ input, onClick }) { // Destructure the new onClick prop

    return (
        <div className="md:hidden">
            <button
                className="mb-2 bg-white text-black  rounded-lg p-4"
                onClick={onClick} // use the passed down onClick function
            >
                Välj en {input && input.length > 0 ? "delsträcka" : "etapp"}
            </button>
        </div>
    );
}

export default Modalbutton;

