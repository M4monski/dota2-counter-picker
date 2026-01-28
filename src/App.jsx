import { useState, useEffect } from 'react';
import meepoImage from '/MEEPO.jpg';
import dogImage from '/DOG.jpg';
import { fetchHeroes, fetchHeroCounters, fetchHeroWinrate } from './api';
import './App.css';

function App() {
  const [isFocused, setIsFocused] = useState(false);
  const [heroes, setHeroes] = useState([]);

  const [heroWinrates, setHeroWinrates] = useState([]);
  const [selectedHeroes, setSelectedHeroes] = useState([]);
  const [counterPicks, setCounterPicks] = useState([]);

  useEffect(() => {
    const loadHeroes = async () => {
      const data = await fetchHeroes();
      setHeroes(data);
      console.log('Heroes Loaded', data);

      try {
        const winrates = await fetchHeroWinrate();
        setHeroWinrates(winrates);
        console.log('Hero Winrates Loaded', winrates);
      } catch (error) {
        console.error('Error loading winrates:', error);
      }
    };
    loadHeroes();
  }, []);

  const getHeroWinrate = (heroId) => {
    if (heroWinrates && heroWinrates.length > 0) {
      const heroData = heroWinrates[heroId - 1]; // Adjust for zero-based index

      if (!heroData) {
        return 'N/A';
      }

      const rank5Winrate =
        ((heroData['5_win'] + heroData['6_win']) /
          (heroData['5_pick'] + heroData['6_pick'])) *
        100;
      return rank5Winrate.toFixed(2) + '%';
    }
    return 'loading results...';
  };

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
        <div className="flex justify-center m-auto gap-4 w-4/5">
          {/* Hero Selection */}
          <div className="container w-1/2 ">
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
            <div className="grid gap-4 overflow-y-scroll h-[62vh]">
              {heroes.map((hero) => (
                <div key={hero.id} className="">
                  <button
                    className="max-w-md lg:w-md md:w-2xs text-blue-50"
                    onClick={() => {
                      if (
                        selectedHeroes.includes(hero.localized_name) ||
                        selectedHeroes.length >= 5
                      ) {
                        return;
                      }
                      setSelectedHeroes([
                        ...selectedHeroes,
                        hero.localized_name,
                      ]);
                    }}
                  >
                    <h3>
                      {hero.localized_name} {getHeroWinrate(hero.id)}
                    </h3>
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* Selected Heroes and Counter Picks */}
          <div className="container h-1/2 ">
            {/* Selected Heroes */}
            <div className="bg-gray-600 p-2 py-4 mb-6 w-full rounded-2xl">
              <h1>Your Team</h1>
              <div className="flex justify-center gap-4 flex-wrap ">
                {selectedHeroes.map((selectedHero) => (
                  <button
                    key={selectedHero}
                    className="max-w-md w-2xs text-blue-50 bg-gray-800 p-2"
                    onClick={() => {
                      setSelectedHeroes(
                        selectedHeroes.filter((hero) => hero !== selectedHero),
                      );
                    }}
                  >
                    <h2>{selectedHero}</h2>
                  </button>
                ))}
              </div>
            </div>

            {/* Counter Picks Content */}
            <h1>Counter Analysis</h1>
            <div className=""></div>
          </div>
        </div>

        {/* Footer */}
      </div>
    </>
  );
}

export default App;
