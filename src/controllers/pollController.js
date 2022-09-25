import db from "../db.js";
import dayjs from "dayjs";

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