const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, 'public')));

app.get(['/', '/home'], (req, res) => {
    res.sendFile(path.join(__dirname, 'index.htm'));
});

app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, 'info', 'menu.htm'));
});

app.get('/order', (req, res) => {
    res.sendFile(path.join(__dirname, 'info', 'order.htm'));
});

// Route รับค่าพารามิเตอร์แบบ Dynamic
app.get('/item/:name/price/:price', (req, res) => {
    const { name, price } = req.params;
    res.send(`
        <html>
        <head>
            <link rel="stylesheet" href="/css/style.css">
        </head>
        <body>
            <h1>Menu Item: ${name}</h1>
            <h2>Price: ${price} Baht</h2>
            <br>
            <a href="/menu" class="btn">Back to Menu</a>
        </body>
        </html>
    `);
});

app.use((req, res) => {
    res.status(404).send('<h1>404 PAGE NOT FOUND</h1>');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});