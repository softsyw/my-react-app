import { useState } from 'react';

function App() {
  const [todo, setTodo] = useState<string>("");
  const [list, setList] = useState<string[]>([]);

  const addList = () => {
    if (!todo.trim()) return;
    setList([...list, todo]);
    setTodo("");
  }

  const removeItem = (index: number) => {
    setList(list.filter((_, i) => i !== index));
  }

  const removeAll = () => {
    setList([]);
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
            <button onClick={() => removeItem(index)} style={{ marginLeft: '8px' }}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <button onClick={removeAll} style={{ marginTop: '20px' }}> Remove All</button>

    </div>
  );
}

export default App;