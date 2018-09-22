const users = {};

const headers = {
  'Content-Type': 'application/json',
};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, headers);
  response.end();
};

const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  respondJSON(request, response, 200, responseJSON);
};

const getUsersMeta = (request, response) => {
  respondJSONMeta(request, response, 200);
};

const addUser = (request, response, body) => {
  const responseJSON = {
    message: 'Name and age required',
  };

  // validate
  if (!body.name || !body.age) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201; // created

  if (users[body.name]) { // does it already exist?
    responseCode = 204; // updated
  } else {
    users[body.name] = {};
  }

  // key it based on name
  users[body.name].name = body.name;
  users[body.name].age = body.age;

  if (responseCode === 201) {
    responseJSON.message = 'Created successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  // can't send back data in a 204
  return respondJSONMeta(request, response, responseCode);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) => {
  respondJSONMeta(request, response, 404);
};

module.exports = {
  getUsers,
  getUsersMeta,
  addUser,
  notFound,
  notFoundMeta,
};
