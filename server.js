const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const foods=require('./food.json');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/favicon.ico', (req, res) => {
    res.sendFile(__dirname + '/img/favicon.ico');
});

app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + '/style.css');
});

app.get('/client.js', (req, res) => {
    res.sendFile(__dirname + '/client.js');
});

app.get("/food.json",(req,res)=>{
            res.json(foods);
        })

app.get('/img', (req, res) => {
    const food = req.query.food;
    res.sendFile(__dirname + '/img/' + food +'.png');
});

app.get('/check-answer/:food/:selectedAnswer', (req,res)=> {
 const selectedAnswer = req.params.selectedAnswer;
 const foodName = req.params.food;
 const food = foods.find(item => item.nom == foodName)
 if(!food) {
 return res.status(404).json({ message: 'food not found'});
       }
 const correctAnswer= food.categorie;
 if(selectedAnswer==correctAnswer) {
   message =  'Correct answer!';
 } else {
   message = 'Incorrect Answer! Try again';
   }
 res.json({ message: message });
})

app.get('/congratulations.html', (req, res) => {
    res.sendFile(__dirname + '/congratulations.html');
});

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});
