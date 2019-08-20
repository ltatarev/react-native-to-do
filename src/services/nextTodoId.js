function nextTodoId(todos) {
  return todos.length === undefined ? 0 : todos.length;
}

export default nextTodoId;
