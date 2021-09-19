import mongoose from 'mongoose';

const Connection = async () => {
    const URL = 'mongodb+srv://user:user@cluster0.f4t21.mongodb.net/MERN?retryWrites=true&w=majority'
    try{
    await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });
    console.log('Database Connected Succesfully');
    } catch(error) {
        console.log('Error: ', error.message);
    }

};

export default Connection;