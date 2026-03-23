import { useState } from 'react';

interface TodoItem {
  title: string;
  checked: boolean;
}

function App() {
  const [todo, setTodo] = useState<string>("");
  const [list, setList] = useState<TodoItem[]>([]);

  const addList = () => {
    if (!todo.trim()) return;
    setList([...list, { title: todo, checked: false }]);
    setTodo("");
  }

  const removeItem = (index: number) => {
    setList(list.filter((_, i) => i !== index));
  }

  const removeAll = () => {
    setList([]);
  }

  const toggleChecked = (index: number) => {
    setList(list.map((item, i) => 
      i === index ? { ...item, checked: !item.checked } : item
    ));
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
      

      {list.length === 0 && <p>No items in the list.</p>}

      {/* Display the list of todo items */}
      <ul>
        {list.map((item, index) => (
          <li key={index} style={{ marginBottom: '8px;', listStyle: 'none'}}>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => toggleChecked(index)}
            />
            <span style={{ textDecoration: item.checked ? 'line-through' : 'none' }}>
              {item.title}
            </span>
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