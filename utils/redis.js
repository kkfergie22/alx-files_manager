const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (err) => console.log(err));
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return this.client.get(key);
  }

  async set(key, value, duration) {
    return this.client.set(key, value, duration);
  }

  async del(key) {
    return this.client.del(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
