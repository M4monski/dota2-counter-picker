import { useState, useEffect } from 'react';
import meepoImage from '/MEEPO.jpg';
import dogImage from '/DOG.jpg';
import { fetchHeroes } from './api';
import './App.css';

function App() {
  const [isFocused, setIsFocused] = useState(false);
  const [heroes, setHeroes] = useState([]);
  const [selectedHeroes, setSelectedHeroes] = useState([]);
  const [counterPicks, setCounterPicks] = useState([]);

  useEffect(() => {
    const loadHeroes = async () => {
      const data = await fetchHeroes();
      setHeroes(data);
      console.log('Heroes Loaded', data);
    };
    loadHeroes();
  }, []);

  return (
    <>
      <div>
        <img src={dogImage} alt="THE DOG" className="w-20 fixed top-5 left-5" />
        {/* Upper content */}
        <div className="p-4 w-full">
          <h1 className="text-3xl font-bold ">Dota Counter picker</h1>
          <h2>
            Select your team's heroes to discover their counter picks and items
            kay yawa sila
          </h2>
        </div>

        {/* Main content */}
        <div className="flex justify-center m-4 gap-4">
          {/* Hero Picks */}
          <div className="container">
            <h1>Your Team</h1>
            {/* Input area */}
            <search>
              <div className={`p-4 w-full flex justify-center `}>
                <div
                  className={`bg-gray-800 rounded-2xl w-full p-2 flex items-center
              ${isFocused ? 'outline-gray-500 outline-2' : ''}`}
                  onClick={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <input
                    type="text"
                    className="w-full p-1 placeholder:text-gray-500 active: outline-none"
                    placeholder="Search heroes..."
                  />
                </div>
              </div>
            </search>

            {/* Hero Picks Content */}
            <div className="grid grid-cols-5 gap-4">
              {heroes.map((hero) => (
                <div key={hero.id} className="hero-item">
                  <button>
                    <h3>{hero.localized_name}</h3>
                    <p>{hero.primary_attr}</p>
                    <p>{hero.attack_type}</p>
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* Counter Picks */}
          <div className="container">
            <h1>Counter Analysis</h1>
            {/* Counters Picks Content */}
            <div className=""></div>
          </div>
        </div>

        {/* Footer */}
      </div>
    </>
  );
}

export default App;
