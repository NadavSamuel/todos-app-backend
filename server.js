const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()
const http = require('http').createServer(app);
// Express App Config
app.use(cookieParser())
app.use(bodyParser.json());
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    console.log('req.headers.origin, ',req.headers.origin)

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    // Pass to next layer of middleware
    next();
});
const sess = {
    secret: 'keyboard cat',
    resave: false,
    signed: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: false },
}
const dev = process.env.NODE_ENV !== 'production';
if (!dev) {
    app.set('trust proxy', 1); // sets req.hostname, req.ip
    // sess.cookie.secure = true; // sets cookie over HTTPS only
    sess.cookie.domain = `https://todos-next-js.vercel.app `// sets domain for production env
    sess.cookie.sameSite = 'none'
}
app.use(session(sess))


const corsOptions = {
    origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000', 'https://todos-next-js.vercel.app'],
    credentials: true
};
app.use(cors(corsOptions));

const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const todoRoutes = require('./api/todo/todo.routes')


// routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/todo', todoRoutes)

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

const logger = require('./services/logger.service')
const port = process.env.PORT || 3030;
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
});
