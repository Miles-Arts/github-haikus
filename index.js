const express = require('express');
const { extractRandomHaikus, getRandomOctocat } = require('./utils/helpers');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
    try {
        const haikus = await extractRandomHaikus('./utils/haikus_mona.json', 1);
        const octocat = await getRandomOctocat('./utils/haikus_mona.json');

        res.render('index', { haikus, octocat });
    } catch (err) {
        console.error('Error processing the file:', err);
        res.status(500).send('Error processing the file');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});