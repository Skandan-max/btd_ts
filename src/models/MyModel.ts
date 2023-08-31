import mongoose, { Model, Schema } from 'mongoose';
import {Person} from '../interface/person';

const mySchema:Schema<Person> = new mongoose.Schema({
    name: {
      type: String,
      unique: true,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
});

const MyModel = mongoose.model("MyModel", mySchema);

export default MyModel;