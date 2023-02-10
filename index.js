import express from "express";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();
import roomRouter from "./routes/room.route.js";

const app = express();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

const client = new MongoClient(MONGO_URL); // phone dial
// top-level await
await client.connect(); // call button
console.log("Mongo is connected ✌️😊");

app.get("/", function (request, response) {
    response.send("🙋‍♂️, 🌏 🎊✨🤩");
  });

app.use(express.json());
app.use("/",roomRouter);

app.listen(PORT, () => console.log("server started on port : ",PORT));

export { client }