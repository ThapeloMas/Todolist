const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

// Initialize SQLite database
const db = new sqlite3.Database('./todos.db');

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, taskName TEXT, description TEXT, priority TEXT)"
  );
});

// Route to handle root URL
app.get('/', (req, res) => {
  res.send('Welcome to the To-Do List API please go to http://localhost:5000/todos');
});

// Get all todos
app.get('/todos', (req, res) => {
  db.all("SELECT * FROM todos", [], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json(rows);
  });
});

// Create a new todo
app.post('/todos', (req, res) => {
  const { taskName, description, priority } = req.body;
  db.run(`INSERT INTO todos (taskName, description, priority) VALUES (?, ?, ?)`,
    [taskName, description, priority],
    function(err) {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.json({
        id: this.lastID,
        taskName,
        description,
        priority
      });
    }
  );
});

// Update a todo
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { taskName, description, priority } = req.body;
  db.run(`UPDATE todos SET taskName = ?, description = ?, priority = ? WHERE id = ?`,
    [taskName, description, priority, id],
    function(err) {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.json({ id, taskName, description, priority });
    }
  );
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM todos WHERE id = ?`,
    id,
    function(err) {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.json({ message: 'Deleted' });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
