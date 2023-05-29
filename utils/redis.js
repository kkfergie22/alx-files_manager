const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (err) => console.log(err));
  }

  isAlive() {
    if (this.client.connected) {
      return true;
    } else {
      return false;
    }
  }

  async get(key) {
    return await this.client.get(key);
  }

  async set(key, value, duration) {
    return await this.client.set(key, value, duration);
  }

  async del(key) {
    return await this.client.del(key);
  }
}

const redisClient = new RedisClient();

modules.exports = redisClient;
