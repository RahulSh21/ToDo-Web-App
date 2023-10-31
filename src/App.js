import { useEffect, useState } from 'react';
import './App.css';
import {db} from "./firebase"
import { addDoc, collection, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore"; 

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [edit, setEdit] = useState('');
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const todoList = [];
    getDocs(collection(db, "todos"))
      .then((querySnapshot) => {

        querySnapshot.forEach((doc) => {
          todoList.push({
            ...doc.data(),
            id: doc.id
          })
        });

        setTodos(todoList)
      })

  }, [loading])

  const handleSave = async (e) => {
    e.preventDefault();

    if (!title) {
      alert("Title is required");
      return
    }

    if (!description) {
      alert("Description is required");
      return
    }

    if (todos.find((todo) => todo.title === title)) {
      alert(`Title ${title} already exists`)
      return
    }

    setLoading(true);
    if (edit) {
      try {
        await setDoc(doc(db, "todos", edit), {
          title,
          description
        })

        resetForm()
        alert(`Todo updated!`)
      } catch (error) {
        alert("Unable edit");
      } finally {
        setLoading(false);
      }

      return
    }

    try {
      await addDoc(collection(db, "todos"), {
        title,
        description
      });

      resetForm()
      alert("Todo saved!")
    } catch (error) {
      console.log(error);
      alert("Error in saving todo");
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id, title) => {
    try {
      await deleteDoc(doc(db, "todos", id));

      // remove from state too
      setTodos(prev => prev.filter(todo => id !== todo.id))

      alert(`Todo ${title} deleted!`)
    } catch (error) {
      console.log(error);
      alert("Unable to delete")
    }
  }

  const resetForm = () => {
    setDescription('')
    setTitle('')
    setEdit('')
  }

  return (
    <div className='container'>
      <h1 className='mb-5 mt-5 text-center'>Todo list App</h1>

      <form onSubmit={handleSave}>
        <div className="mb-3">
          <label className="form-label"><h3>Title</h3></label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="form-control" id="title" placeholder="Type your todo item"/>
        </div>
        <div className="mb-3">
          <label className="form-label"><h3>Description</h3></label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} className="form-control" id="description" rows="3" placeholder='Type description'></textarea>
        </div>
        <div className="d-grid gap-2 mb-3">
          {
            loading ? (
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <button className="btn btn-primary" type="submit">Save</button>
            )
          }
        </div>
        </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col"><h4>#</h4></th>
            <th scope="col"><h4>Title</h4></th>
            <th scope="col"><h4>Description</h4></th>
            <th scope="col"><h4>Action</h4></th>
          </tr>
        </thead>
        <tbody>
          {todos?.length > 0 && todos.map((todo, index) => (
            <tr key={todo.id}>
              <td>{index+1}</td>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>
                <button className='btn btn-sm btn-danger' onClick={() => handleDelete(todo.id, todo.title)}><i className='fa-solid fa-trash'></i></button>
                <button className='btn btn-sm btn-warning' style={{marginLeft: '10px'}} onClick={() => {
                  setEdit(todo.id)
                  setDescription(todo.description)
                  setTitle(todo.title)
                }}><i className='fa-solid fa-pencil'></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
