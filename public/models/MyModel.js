import mongoose from 'mongoose';
const mySchema = new mongoose.Schema({
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
