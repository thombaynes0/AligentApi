import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import routes from './routes/dates';

const router: Express = express();

//Morgan Logging
router.use(morgan('dev'));
//Parses Request
router.use(express.urlencoded({ extended: false }));
//Parses Json
router.use(express.json());

//Api Setup
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

//Routes
router.use('/', routes);

//Error handling
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

//Create Server
const httpServer = http.createServer(router);
const PORT: any = 6061;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));