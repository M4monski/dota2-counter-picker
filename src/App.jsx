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
  const [searchQuery, setSearchQuery] = useState('');

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

  const getWinrateColor = (winrate) => {
    if (typeof winrate === 'string' && winrate.includes('%')) {
      const val = parseFloat(winrate);
      return val >= 50 ? 'text-green-400' : 'text-red-400';
    }
    return 'text-gray-400';
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-slate-800 to-gray-900 text-white font-sans selection:bg-red-500 selection:text-white">
        <img
          src={dogImage}
          alt="THE DOG"
          className="w-16 h-16 rounded-full border-2 border-red-500 fixed top-5 left-5 shadow-lg z-50 hover:scale-110 transition-transform duration-300"
        />

        {/* Upper content */}
        <div className="pt-10 pb-6 w-full text-center space-y-2">
          <h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-red-500 to-orange-400 drop-shadow-sm">
            Dota 2 Counter Picker
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Select your team's heroes to discover their counter picks and items.
            <span className="block text-xs text-gray-600 mt-1 italic">
              "kay yawa sila"
            </span>
          </p>
        </div>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row justify-center m-auto gap-8 w-[90%] max-w-7xl pb-10">
          {/* Hero Selection */}
          <div className="flex-1 bg-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-700 shadow-xl overflow-hidden flex flex-col h-[75vh]">
            {/* Input area */}
            <div className="p-6 border-b border-gray-700 bg-gray-800/80">
              <div
                className={`bg-gray-900 rounded-xl w-full px-4 py-3 flex items-center gap-3 border transition-all duration-300
                  ${isFocused ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'border-gray-700 hover:border-gray-600'}`}
              >
                <i
                  className={`fa-solid fa-magnifying-glass ${isFocused ? 'text-red-500' : 'text-gray-500'}`}
                ></i>
                <input
                  type="text"
                  className="w-full bg-transparent text-gray-200 placeholder:text-gray-600 focus:outline-none text-lg"
                  placeholder="Search heroes..."
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <i
                  className="fa-solid fa-xmark text-gray-500 hover:text-red-400 transition-colors text-xs hover:cursor-pointer"
                  onClick={() => setSearchQuery('')}
                ></i>
              </div>
            </div>

            {/* Hero Picks Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {heroes
                .filter((hero) =>
                  hero.localized_name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()),
                )
                .map((hero) => (
                  <button
                    id="hero"
                    key={hero.id}
                    className="w-full group flex items-center justify-between p-3 rounded-xl bg-gray-700/30 hover:bg-gray-700 hover:shadow-md border border-transparent hover:border-gray-600 transition-all duration-200 text-left"
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
                    <span className="font-medium text-gray-200 group-hover:text-white transition-colors">
                      {hero.localized_name}
                    </span>
                    <span
                      className={`text-sm font-mono font-bold ${getWinrateColor(getHeroWinrate(hero.id))}`}
                    >
                      {getHeroWinrate(hero.id)}
                    </span>
                  </button>
                ))}
            </div>
          </div>

          {/* Selected Heroes and Counter Picks */}
          <div className="flex-1 flex flex-col gap-6 h-[75vh]">
            {/* Selected Heroes */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-3xl border border-gray-700 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-100 flex items-center gap-2">
                  <i className="fa-solid fa-users text-red-500"></i> Your Team
                </h2>
                <span className="text-xs font-mono text-gray-500 bg-gray-900 px-2 py-1 rounded-md border border-gray-800">
                  {selectedHeroes.length} / 5
                </span>
              </div>

              <div className="min-h-[100px] flex flex-wrap gap-3">
                {selectedHeroes.length === 0 ? (
                  <div className="w-full h-24 border-2 border-dashed border-gray-700 rounded-xl flex items-center justify-center text-gray-600 text-sm">
                    Select heroes from the list
                  </div>
                ) : (
                  selectedHeroes.map((selectedHero) => (
                    <button
                      key={selectedHero}
                      className="h-1/2 flex items-center gap-2 pl-3 pr-2 py-2 rounded-lg border border-gray-600 bg-gray-700/50 hover:bg-red-500/20 transition-all group animate-fadeIn"
                      onClick={() => {
                        setSelectedHeroes(
                          selectedHeroes.filter(
                            (hero) => hero !== selectedHero,
                          ),
                        );
                      }}
                    >
                      <span className="font-medium text-sm">
                        {selectedHero}
                      </span>
                      <i className="fa-solid fa-xmark text-gray-500 group-hover:text-red-400 transition-colors text-xs "></i>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Counter Picks Content */}
            <div className="flex-1 bg-gray-800/50 backdrop-blur-sm p-6 rounded-3xl border border-gray-700 shadow-xl flex flex-col">
              <h2 className="text-xl font-bold text-gray-100 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-chart-simple text-blue-500"></i>{' '}
                Counter Analysis
              </h2>
              <div className="flex-1 border-2 border-dashed border-gray-700/50 rounded-xl flex flex-col items-center justify-center text-gray-500 gap-3">
                <i className="fa-solid fa-chart-pie text-4xl opacity-20"></i>
                <p>Analysis will appear here...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
