const jwt = require('jsonwebtoken');
const User = require('../models/user');

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  }
  next();
};

const userExtractor = async (request, response, next) => {
  if (request.token) {
    const { token } = request;
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' });
      }
      const user = await User.findById(decodedToken.id).populate('mangas.manga');
      request.user = user;
    } catch {
      response.status(401).json({ error: 'token missing or invalid' });
    }
  }
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

module.exports = {
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
};
