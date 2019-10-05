const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
const server = app.listen(8000);
const io = require('socket.io')(server);
io.on('connection', function (socket) {
    socket.on('posting_form', function (data) {
        var news=""
        if (data.news == "on")
            news = "Yes"
        else
            news = "No"
        msg = "name: " + data.name + ", email: "+data.email +", location: "+data.location +", language: "+data.language+", comments: "+data.comments+", news: "+news;
        console.log(msg);
        socket.emit('updated_message', { msg: msg});
        var num = Math.floor(Math.random() * (1000 - 1)) + 1;
        socket.emit('random_number', { num: num });
    });
});
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');