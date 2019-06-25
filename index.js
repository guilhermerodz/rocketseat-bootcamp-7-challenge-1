const express = require('express');

const app = express();

// Objects
let numberOfRequests = 0;
const projects = [];

// Util
const getProjectIndexById = id =>
  projects.findIndex(p => p.id.toString() === id.toString());

// Middlewares
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Number of requests: ${++numberOfRequests}`);

  next();
});

function checkHasBodyField(...fields) {
  return function(req, res, next) {
    for (field of fields)
      if (!req.body[field])
        return res
          .status(400)
          .json({ error: `Field is required ('${field}')` });
    return next();
  };
}

function checkProjectExists(req, res, next) {
  const index = getProjectIndexById(req.params.id);

  if (index < 0) return res.status(400).json({ error: 'ID does not exists' });

  req.projectIndex = index;

  return next();
}

// Routes
app.get('/projects', (req, res) => {
  return res.json(projects);
});

app.post('/projects', checkHasBodyField('title', 'id'), (req, res, next) => {
  const { id, title } = req.body;
  const index = getProjectIndexById(id);

  if (index > -1) return res.status(400).json({ error: 'ID already exists' });

  // Inserts a new task in the specified project
  projects.push({ id, title, tasks: [] });

  return res.json(projects);
});

app.post(
  '/projects/:id/tasks',
  checkProjectExists,
  checkHasBodyField('title'),
  (req, res, next) => {
    projects[req.projectIndex].tasks.push(req.body.title);

    return res.json(projects);
  }
);

app.put(
  '/projects/:id',
  checkProjectExists,
  checkHasBodyField('title'),
  (req, res) => {
    projects[req.projectIndex].title = req.body.title;

    return res.json(projects);
  }
);

app.delete('/projects/:id', checkProjectExists, (req, res) => {
  projects.splice(req.projectIndex, 1);

  return res.send();
});

app.listen(3000);
