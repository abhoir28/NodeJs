var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors);
app.use(express.json());


app.get('/',  (req, res) => {

    console.log("Get Called ...");

    res.send("Welcome To Rockstar Research Lab");

});


app.post('/',  (req, res) => {

    console.log("Post Called ...");

    console.log(JSON.stringify(req.body));

    var json1 = req.body;

    res.send({
        "msg": "ok"
    });

});

var server = app.listen(9000, () => {

    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});