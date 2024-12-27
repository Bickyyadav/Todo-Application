// import React from 'react'
import { useEffect, useState } from 'react';
import './Todo.css';
import { FaCheck } from 'react-icons/fa6';
import { MdDeleteForever } from 'react-icons/md';

const todokey = 'reactTodo';

const Todo = () => {
  const [inputValue, setInputValue] = useState('');
  //---------------------- const [task, setTask] = useState([]);
  //-----------------------we have comment upper one becuase we have to get the data from the localstorage also so we use second method

  const getlocalStorage = () => {
    const rowdata = localStorage.getItem(todokey);
    console.log('Raw data from localStorage:', rowdata);
    // if there is no data then return empty array  for the first time we will get empty array
    //  --------we will get the data in string formate so we use this to again in
     return rowdata ? JSON.parse(rowdata) : [];
  };

  const [task, setTask] = useState(() => getlocalStorage());
  const [Datetime, setDatetime] = useState('');

  const handleinputValue = value => {
    setInputValue(value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    const trimmedValue = inputValue.trim();
    // for empty box donot add anythings
    if (!inputValue) return;
    // if elemnet is already present then do not add and return the nothings
    if (task.includes(trimmedValue)) {
      setInputValue('');
      alert('Task already added');
      return;
    }

    setTask(prev => [...prev, inputValue]);
    // setinput value as empty
    setInputValue('');
  };

  //date and time
  const getDatetime = () => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString();
    const formattedTime = now.toLocaleTimeString();

    setDatetime(`${formattedDate} - ${formattedTime}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // why we have stored the setinterval in the variable because when we consol the value it rendert always after 1 sec so we have to use useeffect hooks
      getDatetime();
    });

    return () => clearInterval(interval);
  }, []);

  //handle todo function delete  this value is the arguments and this handleTodo(curElem) is the
  const handleTodo = value => {
    const updateTask = task.filter(curEleme => curEleme !== value);
    setTask(updateTask);
  };

  //all delete
  const handleClearALl = () => {
    setTask([]);
  };

  //adding data to localstorage
  // reactTodo is the name of the localstorage and task must be in string so we use the JSON.stringify
  useEffect(() => {
    localStorage.setItem(todokey, JSON.stringify(task));
  }, [task]);

  return (
    <>
      <section className="todo-container">
        <header>
          <h1>Todo List</h1>
          <h2 className="date-time">
            {/* {formattedDate} - {formattedTime} */}
            {Datetime}
          </h2>
        </header>
        <section className="form">
          <form onSubmit={handleFormSubmit}>
            <div>
              <input type="text" className="todo-input" autoComplete="off" placeholder="enter you task" value={inputValue} onChange={e => handleinputValue(e.target.value)} />
            </div>
            <div>
              <button type="submit" className="todo-btn">
                Add task
              </button>
            </div>
          </form>
        </section>
        <section className="myUnOrdList">
          <ul>
            {(task || []).map((curEleme, index) => {
              return (
                <li key={index} className="todo-item">
                  <span>{curEleme}</span>
                  <button className="check-btn">
                    <FaCheck />
                  </button>
                  <button className="delete-btn" onClick={() => handleTodo(curEleme)}>
                    <MdDeleteForever />
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
        <section>
          <button className="clear-btn" onClick={handleClearALl}>
            Clear All
          </button>
        </section>
      </section>
    </>
  );
};

export default Todo;
