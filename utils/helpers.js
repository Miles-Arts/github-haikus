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

module.exports = { extractRandomHaikus };