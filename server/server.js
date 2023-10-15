import express from 'express'
import cors from 'cors'
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';

const app = express();

/** Middlewares  */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'))
app.disable('x-powered-by'); //lees hackers know about our stack

const port = 8080;

/** HTTP GET Request  */
app.get('/', (req, res) => {
    res.status(201).json('Home Get Request')
});


/** API Routes */
app.use('/api', router);

/** Start Server only when there's valid database connnection */
connect().then(()=>{
    try {
        app.listen(port, ()=>{
            console.log(`Server connected to http://localhost:${port}`)
        })
    } catch (error) {
        console.log('Cannot connect to the server')
    }
}).catch(error => {
    console.log('Invalid database connection...!')
})
