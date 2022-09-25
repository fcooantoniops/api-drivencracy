import db from "../db.js";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";

export async function createPoll(req, res){
    let poll = req.body;
    const expireDate = dayjs().add(30, "day").format("YYYY-MM-DD HH:mm");

    if(!poll.expireAt || poll.expireAt === ""){
        poll = {
            ...poll,
            expireAt: expireDate,
        };
    }

    try{
        await db.collection("polls").insertOne(poll);
        res.sendStatus(201);
    } catch {
        console.error(error.message);
        res.sendStatus(500);
    }
}

export async function listPools(req, res) {
    try {
      const pools = await db.collection("pools").find({}).toArray();
      res.send(pools);
    } catch (error) {
      console.error(error.message);
      res.sendStatus(500);
    }
}

export async function listPoolChoices(req, res) {
    const { id } = req.params;
  
    try {
      const pool = await db
        .collection("pools")
        .findOne({ _id: new ObjectId(id) });
      if (!pool) {
        return res.sendStatus(404);
      }
  
      const poolChoices = await db
        .collection("choices")
        .find({ poolId: new ObjectId(id) })
        .toArray();
      return res.send(poolChoices);
    } catch (error) {
      console.error(error.message);
      res.sendStatus(500);
    }
  }