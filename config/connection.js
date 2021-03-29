const mongoose = require('mongoose');

module.exports = {
  mongoose,
  connect: () => {
    mongoose.Promise = Promise;
    mongoose.connect('mongodb+srv://wchallenge-user:6g7ezVwBPsWiLvdC@cluster0.7kkwv.mongodb.net/wchallengedb?retryWrites=true', { useNewUrlParser: true, useUnifiedTopology: true });
  },
  disconnect: done => {
    mongoose.disconnect(done);
  }
}
