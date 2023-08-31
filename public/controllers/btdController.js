var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import MyModel from '../models/MyModel';
require("dotenv").config();
export const getData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield MyModel.find()
        .then((data) => {
        res.render("btd", { data });
    })
        .catch((err) => {
        res.status(500).send("Error retrieving data");
    });
});
export const addData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, date } = req.body;
    const newDocument = new MyModel({ name, date });
    yield newDocument.save()
        .then((savedDocument) => {
        res.json({ message: "btd added successfully", document: savedDocument });
    })
        .catch((err) => {
        res.status(500).json({ error: "Failed to add btd to db" });
    });
});
export const find = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nametofind = req.query.name;
    yield MyModel.find({ name: nametofind })
        .then((doc) => {
        return res.send(`dob found: ${doc.date}`);
    })
        .catch((err) => {
        console.error(err);
    });
});
export const updateBtd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nametoupd = req.query.name;
    const newDate = req.query.newDate;
    yield MyModel.findOneAndUpdate({ name: nametoupd }, { date: newDate }, { new: true }).then((updatedUser) => {
        console.log(updatedUser);
    })
        .catch((err) => {
        console.error(err);
    });
});
export const closestBtd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let today = new Date();
    let people = yield MyModel.find({});
    let difference = [];
    let dateToCheck;
    for (let i = 0; i < people.length; i++) {
        dateToCheck = people[i].date;
        difference[i] = ((dateToCheck.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) % 365;
    }
    const closestBtd = Math.min(...difference.map(Math.abs));
    const k = difference.map(Math.abs).indexOf(closestBtd);
    res.send("nearest birthday is in " + closestBtd + "days and it is " + people[k] + "'s birthday");
});
export const deleteBtd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nametodel = req.query.name;
    yield MyModel.findOneAndDelete({ name: nametodel })
        .then((updatedUser) => {
        console.log("deleted person and his dob from db");
    })
        .catch((err) => {
        console.error(err);
    });
});
