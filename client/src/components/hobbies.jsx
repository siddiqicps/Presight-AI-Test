// HobbiesList.jsx
import React from 'react';

const HobbiesList = ({ hobbies }) => {
  return (
    <div>
      {hobbies && hobbies.slice(0,2).map((hobby, index) => (
        <span className="bg-gray-200 border px-3 py-1.5 rounded-lg text-sm">{hobby}</span>
      ))}
      {hobbies.length > 2 && (<span className="bg-gray-200 border px-3 py-1.5 rounded-lg text-sm">+{(hobbies.length - 2)}</span>)}
    </div>
  );
};

export default HobbiesList;
