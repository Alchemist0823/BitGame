var request = require("request");

function check(req, res){
    res.json(req.body.exp);
}

module.exports = {
    check: check
};