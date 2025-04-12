const express = require('express');
const extractRandomHaikus = require('./utils/readPDF');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
    try {
        // Obtén un fragmento aleatorio del archivo de texto
        const haikus = await extractRandomHaikus('./utils/pruebe.txt');

        // Renderiza la plantilla EJS con el fragmento extraído
        res.render('index', { haikus: haikus.map(text => ({ text, image: 'default.jpg' })) });
    } catch (err) {
        console.error('Error procesando el archivo de texto:', err);
        res.status(500).send('Error procesando el archivo de texto');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});