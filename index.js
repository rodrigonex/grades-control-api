import express from "express";
import gradesRouter from "./routers/grade.js";
import { promises as fs } from "fs";

global.fileName = "grades.json";

const app = express();
app.use(express.json());
app.use("/grade", gradesRouter);

app.listen(3001, async () => {
  try {
    await fs.readFile(global.fileName);
    console.log("Api started");
  } catch (err) {
    console.log("Deu erro.");
  }
});
