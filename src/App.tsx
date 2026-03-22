import { useState } from 'react';

function App() {
  const [todo, setTodo] = useState<string>("");
  const [list, setList] = useState<string[]>([]);

  const addList = () => {
    if (!todo.trim()) return;
    setList([...list, todo]);
    setTodo("");
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Todo List</h1>
      
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        onKeyDown={(e) => e.key == 'Enter' && addList()}
        placeholder="Enter a todo item"
      />
      
      <button onClick={addList}>Add</button>
      
      <ul>
        {list.map((item, index) => (
          <li key={index} style={{ marginBottom: '8px;' }}>
            {item}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;