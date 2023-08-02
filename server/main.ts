import express, {Response} from 'express'
import cors from 'cors'
import sqlite3 from "sqlite3"
import * as path from "path";
import {ReadingEntry, ReadingsResponse} from "./responses/readings";
import {MeterEntry, MetersResponse} from "./responses/meters";

sqlite3.verbose()

const app = express()
const port = 3000

app.use(cors())

const db = new sqlite3.Database(path.join(__dirname, './db.sqlite'))

function respondWith (res: Response, object: ReadingsResponse | MetersResponse) {
    if (!object.success) res.status(400)
    res.send(object)
}

function handleError (res: Response, err: Error) {
    respondWith(res, {
        success: false,
        message: err.message
    })
}

app.get('/meters', (req, res) => {
    db.all('SELECT * FROM meter', (err, result: MeterEntry[]) => {
        if (err) {
            handleError(res, err)
            return
        }

        respondWith(res, {
            success: true,
            data: result
        })
    })
})

app.get('/meters/:meterId', (req, res) => {
    const meterId = req.params['meterId']
    db.all('SELECT meter_id, rainfall, created_at FROM reading WHERE meter_id = (?)', [meterId], (err, result: ReadingEntry[]) => {
        if (err) {
            handleError(res, err)
            return
        }

        respondWith(res, {
            success: true,
            data: result
        })
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})