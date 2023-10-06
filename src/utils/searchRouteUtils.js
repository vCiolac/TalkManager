const filterByName = (data, query) => {
  const lowerQ = query.toLowerCase();
  return data.filter((talker) => talker.name.toLowerCase().includes(lowerQ));
};

const filterByRate = (data, query) => {
  const rate = Number(query);
  return data.filter((talker) => talker.talk.rate === rate);
};

const filterByDate = (data, query) => data.filter((talker) => talker.talk.watchedAt === query);

module.exports = { filterByName, filterByRate, filterByDate };