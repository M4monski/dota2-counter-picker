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

export const fetchHeroStats = async () => {
  const response = await fetch(`https://api.opendota.com/api/heroStats/`);
  const data = await response.json();
  return data;
};

export const fetchTotalMatches = async () => {
  const sql = 'SELECT max(match_id) as total FROM matches';
  const encodedSql = encodeURIComponent(sql);
  const url = 'https://api.opendota.com/api/explorer?sql=' + encodedSql;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.rows[0].total;
  } catch (error) {
    console.error('Error fetching total matches:', error);
    return 0;
  }
};
