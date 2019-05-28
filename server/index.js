const express = require('express');
var bodyParser = require('body-parser')

var data = [
  {
    id : "969061AB",
    name: "drashti",
    age: 24,
    hobbey: "sleeping'"
  },
  {
    id : "123",
    name: "Digant",
    age: 26,
    hobbey: "coding'"
  }
];

const app = express();

const port = 8000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/person/:id', function (req, res) {
  console.log('req.query',req.params.id)
  console.log('data',data[req.query.id])

  const person = data.find(function(ele) {
    if (ele.id === req.params.id) {
      return ele;
    }
  });

  // const person = data.find(ele => ele.id === req.params.id);
  console.log('person: ', person)
  if(!person) {
    res.status(400).send({error: 'Person with given id not registered yet.'});
  } else {
    res.send(person)
  }
});

app.get('/persons', (req, res) => {
  res.send({ data: data });
})

function guidGenerator() {
  var S4 = function() {
     return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };
  return (S4());
}

app.get('/', (req, res) => {
  res.send('Hi This is a Home Page')
})

app.post('/person',(req,res) => {
  console.log('req.body',req.body);

  if(!req.body.name){
    res.status(400).send({ error: 'Name is required to add person.'});
  } else {
    const newPerson = {
      ...req.body,
      id: guidGenerator()
    }
    console.log('new Person: ', newPerson);
    data.unshift(newPerson);
    res.send(newPerson);
  }  
});


app.listen(port, () => {
  console.log('Server is running on port', port);
})

