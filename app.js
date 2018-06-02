const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const exJwt = require('express-jwt');


const app = express();

//use  - middleware for checking cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
})

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

//initilise express jwt middleware

const jwtMW = exJwt({
    secret: 'keyboard cat 4 ever'
});

//mock user db
let users = [
    {
        id: 1,
        username: 'test',
        password: 'asdf123'
    },
    {
        id: 2,
        username: 'test2',
        password: 'asdf12345'
    }
];

//Login route

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    for (let user of users) {
        if (username === user.username && password === user.password) {
            let token = jwt.sign({ id: user.id, username: user.username }, 'keyboard cat 4 ever', { expiresIn: 129600 });
            res.json({ success: true, err: null, token });
            break;
        }
        else {
            res.status(401).json({
                success: false,
                token: null,
                err: 'username or password incorrect'
            })
        }
    }
});

app.get('/', jwtMW, (req, res) => {
    res.send('You are authenticated');
});

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.send(401).json(err);
    }
    else {
        next(err);
    }
});
const PORT = 3000;
app.listen(PORT, () => {
console.log(`listening on ${PORT}`);
});
