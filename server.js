const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport=require('passport');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const app = express();
const http = require('http').createServer(app);
const io=require('socket.io')(http)



const port = process.env.PORT || 5000;
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.use(passport.initialize());
mongoose.set('useFindAndModify', false);

require('./middleware/passport')(passport);

//DB config
const db = require('./config/keys').mongoURI;

//MongoDB connect
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));


//use routes
app.use('/api/user', require('./routes/usersRoute'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}








http.listen(port, () => {
  console.log('server is running on port: ' + port);
})


