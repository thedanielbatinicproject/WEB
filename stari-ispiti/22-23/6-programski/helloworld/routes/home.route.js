const express = require('express');
const router = express.Router();
const todoManager = require("../todo-manager.js")

// GET /home
router.get('/', (req, res) => {
  res.render('home');
});


router.get('/todos', (req, res) => {
  const allTodos = todoManager.returnTodos();
  const myTodos = allTodos.filter(todo => todo.userId === req.session.userId);
  res.json({ allTodos, myTodos });
});

router.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const allTodos = todoManager.returnTodos();
  const todo = allTodos.find(t => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }
  if (todo.userId !== req.session.userId) {
    return res.status(403).json({ error: "Not allowed" });
  }
  todoManager.removeTodo(id);
  res.json({ success: true });
});


module.exports = router;
