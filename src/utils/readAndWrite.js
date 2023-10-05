const fs = require('fs/promises');

const readFile = async () => {
  try {
    const data = await fs.readFile('src/talker.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    const err = new Error('Error opening file');
    err.statusCode = 500;
    throw err;
  }
};

const writeFile = async (data) => {
  try {
    await fs.writeFile('src/talker.json', JSON.stringify(data));
  } catch (error) {
    const err = new Error('Error writing file');
    err.statusCode = 500;
    throw err;
  }
};

module.exports = {
  readFile,
  writeFile,
};