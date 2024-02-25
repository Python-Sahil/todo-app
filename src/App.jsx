import React,{useEffect, useState} from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";


const App = () => {
  //UseState 
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] =  useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  //Function for different clicks
  const handleAddToDo = ()=>{
    let newTodoItem = {
      title:newTitle,
      description :newDescription
    }
    
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setAllTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
    setNewTitle("");
    setNewDescription("");
  };

  const handleDeleteTodo = (index)=>{
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setAllTodos(reducedTodo)
  }
  const handleComplete = (index)=>{
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth()+1;
    let yyyy = now .getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + "-" + mm +"-"+ yyyy + " at " + h + ":" + m +":"+ s;

    let filteredItem = {
      ...allTodos[index],
      completedOn:completedOn
    }

    let updateCompletedArr = [...completedTodos];
    updateCompletedArr.push(filteredItem);
    setCompletedTodos(updateCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos', JSON.stringify(updateCompletedArr));
  }

  const handleCompletedDeleteTodo = (index)=>{
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo)
  }
//UseEffect for rendering 

  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
    if(savedTodo){
      setAllTodos(savedTodo);
    }
    if(savedCompletedTodo){
      setCompletedTodos(savedCompletedTodo);
    }
  },[])

  return (
    <div className='App'>
      <h1>My Todos</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title:</label>
            <input type="text" value = {newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="What's the task title?" />
            </div>
          <div className='todo-input-item'>
            <label>Description:</label>
            <input type="text " value = {newDescription} onChange={(e)=>setNewDescription(e.target.value)}placeholder="What's the task description?" />
            </div>
         

          <div className='todo-input-item'>
            <button type='button' onClick ={handleAddToDo}className='primaryBtn'>Add</button>
          </div>
        </div>
        <div className='btn-area'>
          <button className={`secondaryBtn ${isCompleteScreen===false &&'active'}`} onClick={()=>{setIsCompleteScreen(false)}}>Todo</button>
          <button className={`secondaryBtn ${isCompleteScreen===true &&'active'}`} onClick={()=>{setIsCompleteScreen(true)}}>Completed</button>
        </div>
        <div className='todo-list'>
         {isCompleteScreen === false && allTodos.map((item,index)=>{
          return(
            <div className='todo-list-item' key={index}>
            <div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          </div>
        
        <div>
        <MdDeleteOutline onClick={handleDeleteTodo} className='delete-icon' title='Delete?'/>
        <BsCheckLg className='check-icon'onClick={()=>handleComplete(index)} title='Complete?' />
        </div>
        </div>
          );
         })}

         {isCompleteScreen === true && completedTodos.map((item,index)=>{
          return(
            <div className='todo-list-item' key={index}>
            <div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p><small>Completed on: {item.completedOn}</small></p>
          </div>
        
        <div>
        <MdDeleteOutline onClick={handleCompletedDeleteTodo} className='delete-icon' title='Delete?'/>
        </div>
        </div>
          )
         })}
        </div>
      </div>
      
    </div>
  )
}

export default App