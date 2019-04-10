if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
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

/*morgan.token("type", function(req, res) {
  return req.body["application/json"];
  clog dsd
});
*/
morgan.token("all", (req,) => {
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
 
  Person.findByIdAndUpdate(request.params.id, person, { new: true })

    .then(updatedPerson => {
      response.json(updatedPerson.toJSON);
    })
    .catch(error => next(error));
});

app.get("/api/persons/:id", (request, response,) => {
  Person.findById(request.params.id).then(person => {
    response.json(person.toJSON());
  });

});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

app.get("/info", (request, response) => {
  Person.find({}).then(result => {
    response.send(`Puhelinluettelossa ${result.length} henkilön tiedot <br> ${new Date()}`)
  });
 
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  if (body.name === "" || body.number === "") {
    return response.status(400).json({
      error: "Use name and number"
      // .catch(error => next(error))
    });
  } else if (persons.map(person => person.name).includes(body.name)) {
    //console.log("nimet", person.name);
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
  })
    .catch(error => next(error))
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
  //console.error(error.message);

  if (error.name === "CastError" && error.kind == "ObjectId") {
    return response.status(400).send({ error: "malformatted id" });
  }else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  //console.log(`Server running on port ${PORT}`);
});
