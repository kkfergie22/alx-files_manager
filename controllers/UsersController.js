const sha1 = require('sha1');
const dbClient = require('../utils/db');

class UsersController {
  static async postNew(request, response) {
    const { email, password } = request.body;
    if (!email) return response.status(400).json({ error: 'Missing email' });
    if (!password) return response.status(400).json({ error: 'Missing password' });

    const existingUser = await dbClient.nbUsers(email);
    if (existingUser) return response.status(400).json({ error: 'Already exist' });

    const hashedPassword = sha1(password);
    const user = await dbClient.createUser(email, hashedPassword);

    await user.save();

    return response.status(201).json({ status: 'OK' });
  }
}

module.exports = UsersController;
