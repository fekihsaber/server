const express = require('express');
const path = require('path');
const app = express();
const port = 3000;


const workingHoursMiddleware = (req, res, next) => {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    const hourOfDay = currentDate.getHours();

    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 23) {
        next();
    } else {
        res.sendFile(path.join(publicPath, 'error.html'));
    }
};

const publicPath = path.join(process.cwd(), 'public');

app.use(express.static(publicPath));

app.use(workingHoursMiddleware); 

app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'home.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(publicPath, 'services.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(publicPath, 'contact.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
