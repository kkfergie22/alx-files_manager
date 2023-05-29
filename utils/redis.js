const redis = require('redis');
const promisfy = require('util').promisify;

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (err) => console.log(err));
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    const value = await promisfy(this.client.get).bind(this.client)(key);
    return value;
  }

  async set(key, value, duration) {
    await promisfy(this.client.set).bind(this.client)(key, value);
    await promisfy(this.client.expire).bind(this.client)(key, duration);
  }

  async del(key) {
    await promisfy(this.client.del).bind(this.client)(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
