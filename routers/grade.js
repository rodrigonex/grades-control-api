import express from "express";
import { promises as fs } from "fs";

const router = express.Router();

const { readFile, writeFile } = fs;

// Question first
router.post("/", async (req, res) => {
  try {
    let grade = req.body;

    const data = JSON.parse(await readFile(global.fileName));

    const newDate = new Date();
    grade = {
      id: data.nextId++,
      student: grade.student,
      subject: grade.subject,
      type: grade.type,
      value: grade.value,
      timestamp: grade.newDate,
    };

    data.grades.push(grade);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(grade);
  } catch (err) {
    res.send(err);
  }
});

//Question second
router.put("/:id", async (req, res) => {
    try {
      let grade = req.body;
  
      if (!grade.student || !grade.subject || !grade.type || !grade.value) {
        throw new Error(
          "Os campos student, subject, type e value são obrigatorios."
        );
      }
  
      if (req.params.id === -1) {
        throw new Error("Registro não encontrado.");
      }
  
      const data = JSON.parse(await readFile(global.fileName));
      const searchindex = data.grades.findIndex(
        (search) => search.id === parseInt(req.params.id)
      );
  
      data.grades[searchindex].student = grade.student;
      data.grades[searchindex].subject = grade.subject;
      data.grades[searchindex].type = grade.type;
      data.grades[searchindex].value = grade.value;
  
      await writeFile(global.fileName, JSON.stringify(data, null, 2));
  
      res.send(grade);
    } catch (err) {
      res.send(err);
    }
  });

  // Question third
router.delete("/:id", async (req, res) => {
    try {
      const data = JSON.parse(await readFile(global.fileName));
      data.grades = data.grades.filter(
        (grade) => grade.id !== parseInt(req.params.id)
      );
  
      await writeFile(global.fileName, JSON.stringify(data, null, 2));
  
      res.end(`Delete /grade/id ${req.params.id}`);
    } catch (err) {
      res.send(err);
    }
  });

// Question fourth
router.get("/:id", async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    let grade = data.grades.find(
      (grade) => grade.id == parseInt(req.params.id)
    );

    res.send(grade);
  } catch (err) {
    res.send(err);
  }
});

// Question fifth
router.get("/", async (req, res) => {
    try{
        let students = req.body;

        const data = JSON.parse(await readFile(global.fileName));
        data.grades = data.grades.filter(
            (student) => student.student == students.student 
        );
        data.grades = data.grades.filter(
            (subject) => subject.subject == students.subject     
        );

        const totalPoints = data.grades.reduce((acumulador, current) => {
            return current.value + acumulador;
        }, 0)
           
        res.send(`A nota do(a) ${students.student } foi ${totalPoints}`)
    }catch (err){
        res.send(err)
    }
});

router.get("/", async (req, res) => {
    try{
        let subject = req.body;

        const data = JSON.parse(await readFile(global.fileName));
        const subjectValue = data.grades.filter(
            (student) => student.subject == students.subject 
        );
        const typeValue = data.grades.filter(
            (subject) => subject.type == students.type     
        );

        const totalPointsSubject = subjectValue.reduce((acumulador, current) => {
            return current.value + acumulador;
        }, 0);

        const totalPointsSubType = typeValue.reduce((acumulador, current) => {
            return current.value + acumulador;
        }, 0);

        const media = (totalPointsSubject + totalPointsSubType) / (subjectValue.lenght + typeValue.lenght)
           
        res.send(`A media das grades ${subject.subject } e ${subject.type } foi ${media}`)
    }catch (err){
        res.send(err)
    }
});





export default router;
