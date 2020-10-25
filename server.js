const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const dotenvSafe = require('dotenv-safe');
const cors = require('cors');

const PORT = process.env.port || 3000;

dotenvSafe.config();

const authService = require('./src/services/auth-service');
const indexRoute = require('./src/routes/index-routes');
const eventRoutes = require('./src/routes/event-routes');
const authRoutes = require('./src/routes/auth-routes');

mongoose.connect(
  'mongodb://Rafael12345:1234@cluster0-shard-00-00-7a7r3.mongodb.net:27017,cluster0-shard-00-01-7a7r3.mongodb.net:27017,cluster0-shard-00-02-7a7r3.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/v1', indexRoute);
app.use('/v1/auth', authRoutes);
app.use('/v1/events', authService, eventRoutes);

app.listen(PORT, () => {
  console.log('================');
  console.log('SERVER ON');
  console.log('================');
});
