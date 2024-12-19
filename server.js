require('dotenv').config()
const session = require('express-session')
const express = require('express')
const bodyParser = require('body-parser');
const path = require('path')
const axios = require('axios');
const { createRecord, readRecord, readAllRecords, updateRecord, deleteRecord } = require('./server/controller/crud.js');

//
const { log } = require('console');
const { exit } = require('process');
const app = express()

app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}))
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/*+json' }))
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

app.get('/', function (req, res) {
    res.render("login", { message: "Welcome to your personal" });
})

app.post('/', function (req, res) {
    res.redirect('/mainpage')
})

app.get('/mainpage', function (req, res) {
    if (req.session.loggedIn) {
        res.render("mainpage");
    } else {
        res.send("hata");
    }
})

// Read All - Tüm kayıtları oku
app.get('/users', async (req, res) => {
    try {
        const users = await readAllRecords('users');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Create - Yeni kayıt ekle
// app.post('/users', async (req, res) => {
//     try {
//         const result = await createRecord('users', req.body);
//         res.status(201).json({ success: true, id: result.insertId });
//     } catch (err) {
//         res.status(500).json({ success: false, error: err.message });
//     }
// });

// Read - Belirli bir kayıt oku
// app.get('/users/:id', async (req, res) => {
//     try {
//         const user = await readRecord('users', req.params.id);
//         res.status(200).json(user);
//     } catch (err) {
//         res.status(500).json({ success: false, error: err.message });
//     }
// });

//signin
app.post('/users/signin', async (req, res) => {
    try {
        const { username, password, mail } = req.body;
        // Check if both username and password are provided
        if (!username || !password || !mail) {
            return res.status(400).send('Username and password and mail are required.');
        }
        const result = await createRecord('users', req.body);
        res.status(201).json({ success: true, id: result.insertId });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }


});

//login
app.post('/users/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        // Check if both username and password are provided
        if (!username || !password) {
            return res.status(400).send('Username and password are required.');
        }

        const user = await readRecord('users', username);

        if (user && user.password == password) {
            req.session.loggedIn = true;
            res.redirect("/mainpage")
            // console.log("giriş başarılı");
            // res.render('/mainpage')
        } else {
            res.render("login", { message: "Invalid password or user not exist" });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});


app.post('/users/logout', async (req, res) => {
    try {
        req.session.loggedIn = false;
        res.redirect('/');
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// forgot password 
app.put('/users/forgotPassword', async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await updateRecord('users', username, password);
        res.status(200).json({ success: true, affectedRows: result.affectedRows });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
})



const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

// Initiates the Google Login flow
app.get('/auth/google', (req, res) => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email&prompt=select_account`;
    res.redirect(url);
});

// Callback URL for handling the Google Login response
app.get('/auth/google/callback', async (req, res) => {
    const { code } = req.query;
    req.session.loggedIn = true;
    try {
        // Exchange authorization code for access token
        const { data } = await axios.post('https://oauth2.googleapis.com/token', {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code,
            redirect_uri: REDIRECT_URI,
            grant_type: 'authorization_code',
        });

        // const { access_token, id_token } = data;

        // // Use access_token or id_token to fetch user profile
        // const { data: profile } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
        //     headers: { Authorization: `Bearer ${access_token}` },
        // });

        // Code to handle user authentication and retrieval using the profile data

        res.redirect('/mainpage');
    } catch (error) {
        console.error('Error:', error.response.data.error);
        res.redirect('/');
    }
});

app.listen(port = 3000, () => {
    console.log(`Example app listening on port ${port}`)
})

