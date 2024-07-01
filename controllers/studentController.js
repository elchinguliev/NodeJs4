const fs = require("fs");


let students = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/students.json`)
);

exports.checkId=(req,res,next,val)=>{

    let id=1*val;
    let index=students.findIndex(a=>a.id==id)
    console.log(id);
    if(index==-1){
        return res.status(404).json({
            status:"fail",
            message:"Invalid ID"
        });
    }
    next();
}

exports.checkBody=(req,res,next)=>{

    console.log(req.body)
    console.log(req.body.score)
    console.log(req.body.name)
    if(!(req.body.name) || !(req.body.score)){
        return res.status(404).json({
            status:"fail",
            message:"body does not contain name and score"
        });
    }
    next();
}


exports.getAllStudents = (req, res) => {
    res.status(200).json({
        status: "success",
        count: students.length,
        requestAt: req.requestTime,
        data: {
            students,
        },
    });
};

exports.createStudent = (req, res) => {
    const newId = students[students.length - 1].id + 1;
    const newStudent = Object.assign({ id: newId }, req.body);
    students.push(newStudent);
    fs.writeFile(
        `${__dirname}/../dev-data/data/students.json`,
        JSON.stringify(students),
        (err) => {
            res.status(201).json({
                status: "success",
                requestAt: req.requestTime,
                data: {
                    student: newStudent,
                },
            });
        }
    );
};

exports.getStudent = (req, res) => {
    let params = req.params;
    let id = 1 * params["id"];
    let student = students.find((s) => s.id == id);

    if (student) {
        res.status(200).json({
            status: "succes",
            requestAt: req.requestTime,
            data: {
                student,
            },
        });
        return;
    }
    res.status(404).json({
        status: "fail",
        message: "Invalid ID",
        requestAt: req.requestTime,
    });
};

exports.deleteStudent = (req, res) => {
    let params = req.params;
    let id = parseInt(params["id"], 10);
    let deletedstudent = students.find((s) => s.id == id);
    if (!deletedstudent) {
        res.status(404).json({
            status: "fail",
            message: "Invalid ID",
        });
        return;
    }

    students = students.filter((s) => s.id !== deletedstudent.id);

    fs.writeFile(
        `${__dirname}/../dev-data/data/students.json`,
        JSON.stringify(students),
        (err) => {
            res.status(204).json({
                status: "success",
                requestAt: req.requestTime,
            });
        }
    );
};

exports.updateStudent = (req, res) => {
    let params = req.params;
    let id = 1 * params["id"];
    const studentIndex = students.findIndex((s) => s.id === id);
    const updatedFields = req.body;
    if (studentIndex === -1) {
        return res.status(404).json({
            status: "fail",
            message: "Student not found",
        });
    }

    students[studentIndex] = { ...students[studentIndex], ...updatedFields };


    fs.writeFile(
        `${__dirname}/../dev-data/data/students.json`,
        JSON.stringify(students),
        (err) => {
            if (err) {
                return res.status(500).json({
                    status: "error",
                    message: "Failed to update student",
                });
            }
            res.status(200).json({
                status: "success",
                message: "Student updated successfully",
                data: {
                    student: students[studentIndex],
                },
            });
        }
    );

};

