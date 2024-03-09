import {coursesModel} from "./models/courses.js";

export default class StudentService {
    constructor() { 
        console.log("Working courses with Database persistence in mongodb");
    }

    getAll = async () => {
        let courses = await coursesModel.find();
        return courses.map(course=>course.toObject());
    }
    save = async (course) => {
        let result = await coursesModel.create(course);
        return result;
    }
    delete = async (courseId) => {
        let result = await coursesModel.findByIdAndDelete(courseId);
        return result;
    }
    update = async (courseId, updatedData) => {
        let result = await coursesModel.findByIdAndUpdate(courseId, updatedData, { new: true });
        return result;
    }
}
