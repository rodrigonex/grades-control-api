import express, { Router } from "express";
import { promises as fs } from "fs";

const router = express.Router();

const { readFile, writeFile } = fs;

router.post("/", async (req, res) => {
    try{
        let grade = req.body;

        const data = JSON.parse(await readFile(global.fileName));

        const newDate = new Date()
        grade = {
            id: data.nextId++,
            student: grade.student,
            subject: grade.subject,
            type: grade.type,
            value: grade.value,
            timestamp: grade.newDate 
        };

        data.grades.push(grade);

        await writeFile(global.fileName, JSON.stringify(data, null, 2));

        res.send(grade);

    }catch(err){
        res.send(err);
    }
})

export default Router