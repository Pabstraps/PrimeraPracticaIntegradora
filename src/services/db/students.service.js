import studentsModel from "./models/students.js";

export default class StudentService {
    constructor() { 
        console.log("Working students with Database persistence in mongodb");
    }

    getAll = async () => {
        let students = await studentsModel.find();
        return students.map(student=>student.toObject());
    }
    save = async (student) => {
        let result = await studentsModel.create(student);
        return result;
    }

    delete = async (courseId) => {
        let result = await studentsModel.findByIdAndDelete(courseId);
        return result;
    }

    update = async (courseId, updatedData) => {
        let result = await studentsModel.findByIdAndUpdate(courseId, updatedData, { new: true });
        return result;
    }
}



