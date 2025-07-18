 let todos = [
    { id: 1, title: 'Todo 1', completed: false },
    { id: 2, title: 'Todo 2', completed: true },
    { id: 3, title: 'Todo 3', completed: false }
 ];

 export const getAllTodos = (req, res) => {
    res.json(todos);
 };

 export const createTodo = (req,res) => {
    const newTodo = {
        id : todos.length + 1,
        title: req.body.title,
        completed: req.body.completed || false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
};

export const updateTodo = (req, res) => {
    const { id} = req.params;
    const todo = todos.find(t => t.id === parseInt(id));
    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    const updatedTodo = {
        id: todo.id,
        title: req.body.title || todo.title,
        completed: req.body.completed !== undefined ? req.body.completed : todo.completed
    };
    todos = todos.map(t => (t.id === todo.id ? updatedTodo : t));
    res.json(updatedTodo);
};

export const deleteTodo = (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex(t => t.id === parseInt(id));
    if (todoIndex === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    todos.splice(todoIndex, 1);
    res.status(204).send();
};

export default getAllTodos;