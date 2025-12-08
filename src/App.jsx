import { useState } from 'react';
import meepoImage from '/MEEPO.jpg';
import dogImage from '/DOG.jpg';
import './App.css';

function App() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <div>
        <img src={dogImage} alt="THE DOG" className="w-20 fixed top-5 left-5" />
        {/* Upper content */}
        <div className="p-4 w-full">
          <h1 className="text-3xl font-bold ">Dota 2 Counter picker</h1>

          <h2>Find the best counter picks for the enemy team kay yawa sila</h2>
        </div>
        {/* Input area */}
        <div className={`p-4 w-full flex justify-center `}>
          <div
            className={`bg-gray-800 rounded-2xl w-1/5 p-2 flex items-center
              ${isFocused ? 'outline-gray-500 outline-2' : ''}`}
            onClick={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              className="w-full p-1 placeholder:text-gray-500 active: outline-none"
              placeholder="Search hero..."
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
