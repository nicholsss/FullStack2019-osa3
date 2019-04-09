require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var morgan = require("morgan");
const cors = require('cors')
const Person = require('./models/person')
app.use(express.static('build'))


app.use(cors())
app.use(bodyParser.json());
app.use(morgan(':method :url :status :res[content.lenght] - : response-time ms :all'))
/*morgan.token("type", function(req, res) {
  return req.body["application/json"];
});
*/
morgan.token('all',  (req, res)  => {
  return req.method === "POST" ? JSON.stringify(req.body) : undefined
})

app.use(morgan("tiny"));

let persons = [
 
];

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON()))
  })
})

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});
app.delete("/api/persons/:id", (request, response,next) => {
  Person.findByIdAndRemove(request.params._id)
    .then(result => {
      response.status(204).end();
      
    })
    .catch(error => next(error));
});

app.get("/info", (request, response) => {
  response.send(
    `Puhelinluettelossa ${persons.length} henkilön tiedot <br> ${new Date()}`
  );
});

/*const generateId =()=> {
    id = notes
}
*/
app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Use name and number"
    });
  } else if (persons.map(person => person.name).includes(body.name)) {
    return response.status(400).json({
      error: "name must be unique"
    });
  }

  const person = new Person( {
   
    name: body.name,
    number: body.number
  });
  person.save().then(savedPerson => {
    response.json(savedPerson.toJSON())
  })
  /*
  persons = persons.concat(person);
  response.json(person);
  */
});

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
