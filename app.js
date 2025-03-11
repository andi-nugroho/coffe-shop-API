import express from "express";
import bodyParser from 'body-parser';
import database from './database/database.js'
import router from './routes/auth.js';
import Router from "./routes/product.js";

// dotenv
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT;

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Sepertinya ada yang salah')
})

// bodyParser for middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', router);
app.use('/api', Router)

// Sinkron database
database.sync().then(() => {
    console.log("Database synced");
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`)
    });
})
.catch((err) => {
    console.error('Error sync DB:', err)
})
