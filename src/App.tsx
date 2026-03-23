import { useState, useEffect } from 'react';

interface TodoItem {
  title: string;
  checked: boolean;
}

function App() {
  const [todo, setTodo] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // 1. Initialize the list state with data from localStorage if available
  const [list, setList] = useState<TodoItem[]>(() => {
    const storedList = localStorage.getItem('todoList');
    return storedList ? JSON.parse(storedList) : [];
  });

  // 2. Sync the list state with localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(list));
  }, [list]); 

  const addList = () => {
    if (!todo.trim()) return;
    setList([...list, { title: todo.trim(), checked: false }]);
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

  const filteredList = list.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div style={{ padding: '20px' }}>
      <h1>Todo List</h1>

      <div className='search-box'>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search todo items..."
        />
      </div>

      <hr />

      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        onKeyDown={(e) => e.key == 'Enter' && addList()}
        placeholder="Enter a todo item"
      />

      <button onClick={addList}>Add</button>

      <hr />
      
      {list.length === 0 && <p>No items in the list.</p>}

      {filteredList.length === 0 && list.length > 0 && <p>No items match your search.</p>}

      {/* Display the list of todo items */}
      <ul>
        {filteredList.map((item, index) => (
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