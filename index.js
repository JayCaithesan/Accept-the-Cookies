// Import express. Supported by Node.js, lets us include modules in our project.
let express = require('express');

// Session tracking module
let session = require('express-session');

// generate random session id
const { v4: uuidv4 } = require('uuid');

// Instantiate express application
let app = express();

// Importing local mongoose code.
const dataBase = require('./dataBase.js');

// Setup a static server for all files in /public
app.use(express.static('public'));
// access to post: middleware handler
app.use(express.urlencoded({extended: false}));

app.use(session({
    // Generate our session ID
    // genid: () => '12345',
    genid: () => uuidv4(),
    // Should we keep saving this file?
    resave: false,
    // Should I save parameters in the session dictionary?
    saveUninitialized: false,
    
    // Needed to sign our session ID.
    secret: 'AcceptTheCookies'
}));

app.set('views', __dirname + '/public/views');
app.set('view engine', 'pug');

// Serve a static HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/login', function (request, response) {
    response.render('login', {
        title: 'Login',
        errorMessage: 'Adjust height text.',
        route: '/login'
    });
});

// async function to check if user exists
async function userExists(email,password) {
    let index = 0;
    const accounts = await dataBase.Accounts.find();
    const exists = accounts.some(function(element) {
        return (element.Email === email  && element.Password === password);
    });
    return exists;
}

// find index by email
async function findIndexByEmail(email) {
    const accounts = await dataBase.Accounts.find();
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].Email === email) {
        return i;
      }
    }
    return -1;
}

let currentEmail = "";

// sign in page
app.post('/signIn', async function (request, response) {
    let email = request.body.email;
    currentEmail = email;
    let password = request.body.password;
    const exists = await userExists(email,password);
    if(exists == true) // check if email exist and password is correct
    {
        request.session.email = email;
        response.sendFile(__dirname + '/public/accessIndex.html');
    }
    else // else display error message
    {
        response.render('login', {
            title: 'Sign in',
            errorMessage: "Incorrect email or password. Try again.",
            route: '/processLogin'
        });
    }
});

// access account info page
app.get('/accountInfo', async function (request, response) {
    // check if the user has a current session on landing
    const accounts = await dataBase.Accounts.find();
    // see if variable currentEmail == "" then return to login page, else do ...
    if(currentEmail.length == "")
    {
        response.render('login', {
            title: 'Login',
            errorMessage: 'Adjust height text.',
            route: '/login'
        });
    }
    else
    {
        // check if email not exist in database return to login page, else do ...
        const accIndex = await findIndexByEmail(currentEmail);
        if(accIndex == -1)
        {
            response.render('login', {
                title: 'Login',
                errorMessage: 'Adjust height text.',
                route: '/login'
            });
        }
        else
        {
            // check if user has logged in access page, else return to login
            if(request.session.email)
            {
                response.render('accountInfo', {
                    title: 'Account',
                    email: accounts[accIndex].Email,
                    username: accounts[accIndex].Username
                });
            }
            else
            {
                response.render('login', {
                    title: 'Login',
                    errorMessage: 'Adjust height text.',
                    route: '/login'
                });
            }
        }
    }

});



// account info update
app.post('/accessAccountInfoUpdated', async function (request, response) {
    const accounts = await dataBase.Accounts.find();
    if(request.session.email)
    {
        let username = request.body.username;
        let password = request.body.password;
        let confirmPassword = request.body.confirmPassword;
        const accIndex = await findIndexByEmail(currentEmail);

        // check if index == -1: something wrong return to login page, else do ...
        if(accIndex == -1)
        {
            response.render('login', {
                title: 'Login',
                errorMessage: 'Adjust height text.',
                route: '/login'
            });
        }
        else
        {
            // if only username changed
            if(username != accounts[accIndex].Username && (password == "" && confirmPassword == ""))
            {
                await dataBase.Accounts.updateOne(
                    { $set: { Username: username} }
                );
            }
            // only update password
            else if(username == accounts[accIndex].Username && (password != '' && confirmPassword != ''))
            {
                await dataBase.Accounts.updateOne(
                    { $set: { Password: password} }
                );
            }
            // else update both
            else if(username != accounts[accIndex].Username && (password != '' && confirmPassword != ''))
            {
                await dataBase.Accounts.updateOne(
                    { $set: { username: username, password: password } }
                );
            }
        }
        
        // Redirect the user to the account information page
        response.redirect('/accountInfo');
    }
    else
    {
        response.render('login', {
            title: 'Login',
            errorMessage: 'Adjust height text.',
            route: '/login'
        });
    }

});

app.get('/logout', (request, response) => {
    // delete information from the session
    request.session.email = '';
    response.sendFile(__dirname + '/public/index.html');
});


// Use environment variable specified at command line, or if none provided, 3000 default
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
    console.log(`Listening on port ${app.get('port')}`);
});