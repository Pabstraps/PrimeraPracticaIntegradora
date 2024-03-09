import { Router } from 'express';
//import del service para Courses.
//import CourseService from '../services/filesystem/courses.service.js';
import CourseService from '../services/db/courses.service.js';

const router = Router();
const coursesService = new CourseService();

router.get('/',async(req,res)=>{
    try {
        let courses = await coursesService.getAll();
        res.send(courses);
    } catch (error) {
        console.error(error);
        res.status(500).send({error:  error, message: "No se pudo obtener los cursos."});
    }
})

router.post('/',async(req,res)=>{
    try {
        let result = await coursesService.save(req.body);
        res.status(201).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({error:  error, message: "No se pudo guardar el curso."});
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const courseId = req.params.id;
        const result = await coursesService.delete(courseId);
        if (result) {
            res.status(200).send({ message: "Curso eliminado exitosamente." });
        } else {
            res.status(404).send({ message: "Curso no encontrado." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "Error al eliminar el curso." });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const courseId = req.params.id;
        const updatedCourseData = req.body;
        const result = await coursesService.update(courseId, updatedCourseData);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send({ message: "Curso no encontrado." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "Error al actualizar el curso." });
    }
});

export default router;