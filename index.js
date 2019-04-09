require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
app.use(express.static("build"));

app.use(cors());
app.use(bodyParser.json());
app.use(
  morgan(":method :url :status :res[content.lenght] - : response-time ms :all")
);
console.log();
/*morgan.token("type", function(req, res) {
  return req.body["application/json"];
});
*/
morgan.token("all", (req, res) => {
  return req.method === "POST" ? JSON.stringify(req.body) : undefined;
});
app.use(morgan("tiny"));

let persons = [];

app.get("/api/persons", (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON()));
  });
});
app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number
  };
  console.log(person);
  Person.findByIdAndUpdate(request.params.id, person, { new: true })

    .then(updatedPerson => {
      response.json(updatedPerson.toJSON);
    })
    .catch(error => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    response.json(person.toJSON());
  });
  /*
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
  */
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

app.get("/info", (request, response) => {
  Person.find({}).then(result => {
    response.send(`Puhelinluettelossa ${result.length} henkilön tiedot <br> ${new Date()}`)
  });
 
});

/*const generateId =()=> {
    id = notes
}
*/
app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  if (body.name === "" || body.number === "") {
    return response.status(400).json({
      error: "Use name and number"
      // .catch(error => next(error))
    });
  } else if (persons.map(person => person.name).includes(body.name)) {
    console.log("nimet", person.name);
    return response.status(400).json({
      error: "name unique"
      //.catch(error => next(error))
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number
  });
  person.save().then(savedPerson => {
    response.json(savedPerson.toJSON());
  });
  /*
  persons = persons.concat(person);
  response.json(person);
  */
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// olemattomien osoitteiden käsittely
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError" && error.kind == "ObjectId") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
