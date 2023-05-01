import React from 'react';
const App = () => {

  const [aktivitas, setAktivitas] = React.useState('');
  const [todos, setTodos] = React.useState([]);
  const [edit, setEdit] = React.useState({})
  const [message, setmessage] = React.useState('')
  const generateId = () => {
    return Date.now();
  }
  const saveTodoHundler = (e) => {
    e.preventDefault();

    if (!aktivitas) {
      return setmessage('nama aktivitas tidak boleh kosong')
    }
    setmessage('')

    if(edit.id) {
      const updateTodo = {
        ...edit,
        aktivitas,
      }

      const indexEditTodo = todos.findIndex((todo) => {
        return todo.id === edit.id
      })

      const updateTodos = [...todos]
      updateTodos[indexEditTodo] = updateTodo;

      setTodos(updateTodos)
      return cancelEditHundler();
    }

    setTodos([
      ...todos,
      {
        id: generateId(),
        aktivitas: aktivitas,
        done: false,
      },
  ]);
    setAktivitas('')
  }

  const deleteTodoHundler = (todoId) => {
    const filterTodos = todos.filter((todo) => {
      return todo.id !== todoId;
    })
    setTodos(filterTodos)
    if(edit.id) cancelEditHundler()
  }

  const editTodoHundler = (todo) => {
    setAktivitas(todo.aktivitas)
    setEdit(todo)
  }

  const cancelEditHundler = () => {
    console.log('cancel edit')
    setEdit({});
    setAktivitas('');
  }

  const doneTodoHundler = (todo) => {
    const updateTodo = {
      ...todo,
      done: todo.done ? false : true,
    }
    const indexEditTodo = todos.findIndex((curuntTodo) => {
      return curuntTodo.id === todo.id
    })

    const updateTodos = [...todos]
    updateTodos[indexEditTodo] = updateTodo;

    setTodos(updateTodos)
    console.log(updateTodo)
  }


 return (
  <>
  <h1>Simple Todos</h1>
  {message && <div style={{color: 'red'}}>{message}</div>}
  <form onSubmit={saveTodoHundler}>
    <input
    type="text"
    placeholder='Nama aktivitas'
    value={aktivitas}
    onChange={(todo) => {
      setAktivitas(todo.target.value)
    }}/>
    <button type='submit'>{edit.id ? 'Simpan perubahan' : 'Tambah'}</button>
    {edit.id && <button onClick={cancelEditHundler}>batal edit</button>}
  </form>
  {todos.length > 0 ? (
    <ul>
      {todos.map((todo) => {
        return (
          <li key={todo.id}>
            <input 
            type="checkbox" 
            checked={todo.done}
            onChange={doneTodoHundler.bind(this, todo)}/>
            {todo.aktivitas}({todo.done ? (<i>selesai</i>) : (<i>belum selesai</i>)})
            <button onClick={editTodoHundler.bind(this, todo)}>edit</button>
            <button onClick={deleteTodoHundler.bind(this, todo.id)}>hapus</button>
          </li> 
        )
      })}
    </ul>
  ) : (
    <p><i>Todo masih kosong</i></p>
  )}
  
  </>
 );
}
export default App;