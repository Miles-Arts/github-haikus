const express = require('express');
const { extractRandomHaikus } = require('./utils/helpers');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
    try {
        const emojis = ["🤖", "🖥️", "💻", "📱", "⌨️", "🖱️", "🧠", "📡", "🌐", "🔌", "⚙️", "🔋", "🔐", "🎮", "🔗"]
        ; // Lista de emojis
        const haikus = await extractRandomHaikus('./utils/haikus.json', 1); // Extrae 5 haikus aleatorios

        // Asigna un emoji aleatorio a cada haiku
        haikus.forEach(haiku => {
            haiku.emoji = emojis[Math.floor(Math.random() * emojis.length)];
        });

        res.render('index', { haikus });
    } catch (err) {
        console.error('Error procesando el archivo de texto:', err);
        res.status(500).send('Error procesando el archivo de texto');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});