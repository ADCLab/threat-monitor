const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 5000;

// Enable CORS for all origins
app.use(cors());

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

const db = new sqlite3.Database('./rankedComments.db', (err) => {
	if (err) {
		console.error('Error opening database', err);
	} else {
		db.run(`CREATE TABLE IF NOT EXISTS rankedComments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uid INTEGER NOT NULL,
      text TEXT NOT NULL,
      rank INTEGER NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
			if (err) {
				console.error('Error creating table', err);
			}
		});
	}
});

app.post('/api/recordRank', (req, res) => {
	const { uid, text, rank } = req.body;
	if (uid === undefined || text === undefined || rank === undefined) {
		return res.status(400).json({ error: "Missing fields" });
	}
	const stmt = db.prepare('INSERT INTO rankedComments (uid, text, rank) VALUES (?, ?, ?)');
	stmt.run(uid, text, rank, function(err) {
		if (err) {
			return res.status(500).json({ error: 'Failed to insert record' });
		}
		res.json({ success: true, id: this.lastID });
	});
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

