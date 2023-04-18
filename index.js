// Import express. Supported by Node.js, lets us include modules in our project.
let express = require('express');

// Import a local .js file
// let my_module = require('./localfile.js')

// Instantiate express application
let app = express();

// Importing local mongoose code.
const dataBase = require('./dataBase.js');

// function display()
// {
//     dataBase.Accounts.find()
//         .then(function (accounts){
//             console.log(accounts[0]);
//             console.log(accounts.length)
//         })
// }

//display();

// app.listen(app.get('port'), function () {
//     console.log(`Listening for requests on port ${app.get('port')}.`);
// });

// Setup a static server for all files in /public
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

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
    const accounts = await dataBase.Accounts.find();
    const exists = accounts.some(function(element) {
        return element.Username === email  && element.Password === password;
    });
    return exists;
}

app.post('/signUp', async function (request, response) {
    let email = request.body.email;
    let password = request.body.password;
    const exists = await userExists(email,password);
    if(exists == true)
    {
        response.sendFile(__dirname + '/public/index.html');
    }
    else
    {
        response.render('login', {
            title: 'Sign up',
            errorMessage: "Incorrect email or password. Try again.",
            route: '/processLogin'
        });
    }
});


// Use environment variable specified at command line, or if none provided, 3000 default
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
    console.log(`Listening on port ${app.get('port')}`);
});