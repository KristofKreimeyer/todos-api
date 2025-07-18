import Todo from '../models/todoModel.js';

 export const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        console.error('Fehler beim Abrufen der Todos:', error);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
 };

 export const createTodo = async (req,res) => {
    try {
        const newTodo = new Todo({
            title: req.body.title,
            completed: req.body.completed || false
        });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        console.error('Fehler beim Erstellen eines Todos:', error);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
};

export const updateTodo = async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        todo.title = req.body.title || todo.title;
        todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
        await todo.save();
        res.json(todo);
    } catch (error) {
        console.error('Fehler beim Aktualisieren eines Todos:', error);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
};


export const deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Fehler beim Löschen eines Todos:', error);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
};

export default getAllTodos;