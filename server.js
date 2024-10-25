const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const eventsFilePath = path.join(__dirname, 'events.json');

app.get('/events', (req, res) => {
  fs.readFile(eventsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading events file');
    }
    res.send(JSON.parse(data));
  });
});

app.post('/events', (req, res) => {
  const newEvent = req.body;
  fs.readFile(eventsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading events file');
    }
    const events = JSON.parse(data);
    newEvent.id = (events.length + 1).toString();
    events.push(newEvent);
    fs.writeFile(eventsFilePath, JSON.stringify(events, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error writing events file');
      }
      res.status(201).send(newEvent);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});