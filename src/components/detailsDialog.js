import React from "react";

const DetailsDialog = ({ pet, onClose }) => {
  //fetch again
  return (
    <div className="bg-white w-96 p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-bold mb-4">Pet Details</h2>
      <div className="flex">
        <div className="w-1/2">
          <p>Name: {pet.name}</p>
          <p>Description: {pet.description}</p>
        </div>
        <div className="w-1/2">
          <img
            alt="Sorry, there isn't photograph for this pet"
            width={"256px"}
            height={"256px"}
            className="rounded-lg"
            src={`http://localhost:8080/pet/${pet.id}/image`}
          />
        </div>
      </div>
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg"
      >
        Close
      </button>
    </div>
  );
};

export default DetailsDialog;
