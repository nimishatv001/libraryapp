const express = require('express');
const app = express()
const path = require('path')

const port = process.env.port || 8080

const authRoute = require('./routes/auth-route')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')
mongoose.connect(
"mongodb+srv://courseapp:nimi1234@test.uc0rxut.mongodb.net/newbook?",
(err) =>{
    if(err){
        console.log("Db not connecting")
    }else{
        console.log("db connected");
    }
}
);

app.use(express.static('./dist/frontend'));

app.use(bodyParser.urlencoded({ extended: false}))

app.use(bodyParser.json())
app.use(cors())

app.use('/auth', authRoute);


app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/frontend/index.html'));
});

app.get('/', (req, res) => {
    res.send("No World")
})

app.listen(port, () => {
    console.log("server is connected:", port)
})