const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

const AppController = {
  getStatus(req, res) {
    const redisStatus = redisClient.isAlive();
    const dbStatus = dbClient.isAlive();

    res.status(200).json({ redis: redisStatus, db: dbStatus });
  },

  getStats(req, res) {
    const usersCount = dbClient.nbUsers();
    const filesCount = dbClient.nbFiles();

    res.status(200).json({ users: usersCount, files: filesCount });
  },
};

module.exports = AppController;
