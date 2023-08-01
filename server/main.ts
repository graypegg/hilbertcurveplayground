import express from 'express'
import sqlite3 from "sqlite3"
import * as path from "path";
const app = express()
const port = 3000

const db = new sqlite3.Database(path.join(__dirname, './db.sqlite'))

let total = 0

db.serialize(() => {
    db.each("SELECT count(*) as count FROM precipitation", (err, row) => {
        if (err) process.exit(1)
        total = (row as {count: number}).count
    });
});

app.get('/rain/:segment', (req, res) => {
    if (total === 0) {
        res.json({
            error: true
        })
    }

    if (total > 100) {
        res.status(400)
        res.json({
            error: true
        })
    }

    db.serialize(() => {
        db.each("SELECT * FROM precipitation OFFSET ", (err, row) => {
            res.send(row)
        });
    });

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

process.on('SIGTERM', () => {
    db.close()
    console.log('Killed')
})