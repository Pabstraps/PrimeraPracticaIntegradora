import { Router } from 'express';
//import del service para Students. (Se puede probar con el service del file system o el de mongoose)
//import StudentService from '../services/filesystem/students.service.js';
import StudentService from '../services/db/students.service.js';


const router = Router();
const studentService = new StudentService();

router.get('/',async(req,res)=>{
    try {
        let students = await studentService.getAll();
        res.send(students);
    } catch (error) {
        console.error(error);
        res.status(500).send({error:  error, message: "No se pudo obtener los estudiantes."});
    }
    
})

router.post('/',async(req,res)=>{
    try {
        let result = await studentService.save(req.body);
        res.status(201).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({error:  error, message: "No se pudo guardar el estudiante."});
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const courseId = req.params.id;
        const result = await studentService.delete(courseId);
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
        const updatedCourse = req.body;
        const result = await studentService.update(courseId, updatedCourse);
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