const mongoose = require('mongoose');
const Schema = mongoose.Schema;



// sets a schema for the username/password

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: {type: String, required: true},
  age: { type: Number, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  sex: { type: String, required: true },
  goal: { type: Number, required: true },
  data: [
    {
      date: { type: Date, required: true },
      weight: { type: Number, required: true },
    }
  ]
});

// stats: [ statsSchema ]

// const User = mongoose.model('user', statsSchema)

// sets a schema for the user stats

// const statsSchema = new Schema({
//   height: Number,
//   weight: { type: Number, required: true },
//   sex: { type: String, required: true },
//   targetWeight: { type: Number, required: true }
// });

// const Stats = mongoose.model('stats', statsSchema);


// create potential schema for progress / goal tracking

module.exports = mongoose.model('user', userSchema);
// {
//   User,
//   Stats,
// }