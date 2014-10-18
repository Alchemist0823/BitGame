/**
 * Created by Alchemist on 2014/10/17.
 */

var userData;
var fs = require('fs');

function readAllUserData() {
    userData = JSON.parse(fs.readFileSync('userdata.json', 'utf8'));
}

function getUserData(uid) {
    return userData[uid];
}

function addNewUser(uid) {
    if (!getUserData(uid)) {
        userData[uid] = {"username": uid, "prob": {}};
    }
}

function writeAllUserData() {
    fs.writeFile('userdata.json',JSON.stringify(userData), function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("JSON saved to userdata.json");
        }
    });
}

module.exports = {
    readAllUserData: readAllUserData,
    getUserData: getUserData,
    addNewUser: addNewUser,
    writeAllUserData: writeAllUserData
};

