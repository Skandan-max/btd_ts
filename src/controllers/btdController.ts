import {Person} from '../interface/person';
import { Request, Response } from 'express';
import MyModel from '../models/MyModel'
require("dotenv").config();


export const getData = async (req:Request, res:Response):Promise<void>=> {
  await MyModel.find()
    .then((data:Person[]) => {
      res.render("btd", { data });
    })
    .catch((err:Error) => {
      res.status(500).send("Error retrieving data");
    });
};

export const addData = async(req:Request, res:Response):Promise<void>=> {
  const { name, date } = req.body;
  const newDocument = new MyModel({ name, date }) ;

  await newDocument.save()
    .then((savedDocument:Person) => {
      res.json({ message: "btd added successfully", document: savedDocument });
    })
    .catch((err:Error) => {
      res.status(500).json({ error: "Failed to add btd to db" });
    });
};

export const find = async(req:Request, res:Response):Promise<void> => {
  const nametofind=req.query.name as string;
    await MyModel.find({ name: nametofind })
      .then((doc:Person) => {
        return res.send(`dob found: ${doc.date}`);
      })
      .catch((err:Error) => {
        console.error(err);
      });
};

export const updateBtd = async(req:Request, res:Response):Promise<void> => {
    const nametoupd = req.query.name as string;
    const newDate = req.query.newDate as string;

    await MyModel.findOneAndUpdate(
      { name: nametoupd },
      { date: newDate },
      { new: true }
    ).then((updatedUser:Person) => {
        console.log(updatedUser);
      })
      .catch((err:Error) => {
        console.error(err);
      });
  
};

export const closestBtd = async(req:Request, res:Response):Promise<void> => {
    let today:Date = new Date();
    let people = await MyModel.find({});
    let difference:number[] = [];
    let dateToCheck:Date;
    for (let i = 0; i < people.length; i++){
      dateToCheck=people[i].date;
      difference[i] = ((dateToCheck.getTime()- today.getTime()) / (1000 * 60 * 60 * 24))%365 as number;
    }
    const closestBtd = Math.min(...difference.map(Math.abs));
    const k = difference.map(Math.abs).indexOf(closestBtd);
    res.send("nearest birthday is in " +closestBtd + "days and it is "+people[k]+"'s birthday");
};

export const deleteBtd = async (req:Request, res:Response) :Promise<void>=> {
 const nametodel=req.query.name as string;
    await MyModel.findOneAndDelete({ name: nametodel })
      .then((updatedUser:Person) => {
        console.log("deleted person and his dob from db");
      })
      .catch((err:Error) => {
        console.error(err);
      });
  };
