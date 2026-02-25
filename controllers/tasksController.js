const db = require('../db');

exports.getTasks = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM tasks');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createTask = async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Title je povinný' });
    }

    try {
        const [result] = await db.execute(
            'INSERT INTO tasks (title) VALUES (?)',
            [title]
        );

        res.status(201).json({
            id: result.insertId,
            title,
            completed: 0
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    try {
        await db.execute(
            'UPDATE tasks SET completed = ? WHERE id = ?',
            [completed, id]
        );

        res.json({ message: 'Task updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        await db.execute(
            'DELETE FROM tasks WHERE id = ?',
            [id]
        );

        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};