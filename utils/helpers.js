const fs = require('fs').promises;

async function extractRandomHaikus(filePath, count = 1) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const haikus = JSON.parse(data);

    if (!Array.isArray(haikus)) throw new Error('El archivo no contiene un array de haikus.');

    // Mezcla y selecciona un número aleatorio de haikus
    return haikus.sort(() => 0.5 - Math.random()).slice(0, count);
  } catch (err) {
    throw new Error(`Error leyendo o procesando el archivo: ${err.message}`);
  }
}

async function getRandomOctocat(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const octocats = JSON.parse(data);
    const randomIndex = Math.floor(Math.random() * octocats.length);
    return octocats[randomIndex];
  } catch (err) {
    console.error('Error reading or parsing the file:', err);
    throw err;
  }
}

module.exports = {
  extractRandomHaikus,
  getRandomOctocat
};