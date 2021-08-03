require('dotenv/config');
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const password = 'admin';
const securePass = bcrypt.hashSync(password);
const coucou = 'admin'
const email = 'admin@admin.com'

const newAdmin = {
  name: coucou,
  email,
  password: securePass,
  isAdmin: true,
  following: [],
  role: 'ADMIN',
};

connection();

async function connection() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    await User.deleteMany({ role: 'ADMIN' });

    const admin = await User.create(newAdmin);
    console.log('admin created: ', admin);
    mongoose.connection.close();
  } catch (e) {
    console.error(e);
  }
}
