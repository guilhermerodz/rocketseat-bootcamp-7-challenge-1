# #01 Bootcamp Challenge
NodeJS Express Application as RocketSeat Challenge from GoStack Bootcamp.

This application is used to store projects and their tasks.

## Routes

- `POST /projects`: Receives `id` and `title` fields inside the request body in order to register a new project: `{ id: "1", title: 'New project', tasks: [] }`;

- `GET /projects`: Lists all projects and their tasks.

- `PUT /projects/:id`: Changes only the project `title` for specified project `id` passed as a route parameter.

- `DELETE /projects/:id`: Deletes the project with the specified `id`.

- `POST /projects/:id/tasks`: Receives `title` field and stores a new task into the `project.tasks` array, found in the project with the specified `id` passed as a route parameter;

### Example

Calling `POST /projects` passing `{ id: 1, title: 'New project' }`, and calling `POST /projects/1/tasks` passing `{ title: 'New task' }`, the `projects` array should be like that:

```js
[
  {
    id: "1",
    title: 'New project',
    tasks: ['New task']
  }
]
```
