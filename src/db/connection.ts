import mongoose from 'mongoose';

const connectDb = () => {
  return mongoose.connect('mongodb://mongo:27017/parking-system').then(() => { 
    console.log('connected to database');
  }).catch(function(err) {
    console.log(err);
  });
};

export default connectDb;