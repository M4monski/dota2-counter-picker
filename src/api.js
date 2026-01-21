export const fetchHeroes = async () => {
  const response = await fetch('https://api.opendota.com/api/heroes');
  const data = await response.json();
  return data;
};

export const fetchHeroCounters = async (heroId) => {
  const response = await fetch(
    `https://api.opendota.com/api/heroes/${heroId}/matchups`,
  );
  const data = await response.json();
  return data;
};

export const fetchHeroWinrate = async () => {
  const response = await fetch(`https://api.opendota.com/api/heroStats/`);
  const data = await response.json();
  return data;
};
