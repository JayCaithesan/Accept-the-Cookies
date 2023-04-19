const mongoose = require('mongoose');

// Connect to our local DB:portnumber/database-name
mongoose.connect('mongodb://127.0.0.1:27017/AcceptTheCookies');

// Alias (neater varname to work with)
let Schema = mongoose.Schema;


// Create Schema instance for accounts in our AcceptTheCookies DB
let accountsSchema = new Schema({
    Email: String,
    Password: String,
    Username: String
}, {
    collection: 'Accounts',
    versionKey: false  // disable version key
});

// Here we export our module (node.js) to make it available in a different file (index.js)
module.exports.Accounts = mongoose.model('accounts', accountsSchema);
