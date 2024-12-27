// // import React from 'react'

// import { useState } from "react";


// const TodoForm = ({onAddTodo}) => {
//       const [inputValue, setInputValue] = useState('')

//   const handleinputValue = (value) => {
//     setInputValue(value);
//   };

//   const handleFormSubmit = (event)=>{
//     event.preventDefault();
//     onAddTodo();
//      // setinput value as empty
//      setInputValue('');

//   }
//   return (
//    <>
//     <section className="form">
//              <form onSubmit={handleFormSubmit}>
//                <div>
//                  <input type="text" className="todo-input" autoComplete="off" placeholder="enter you task" value={inputValue} onChange={e => handleinputValue(e.target.value)} />
//                </div>
//                <div>
//                  <button type="submit" className="todo-btn">
//                    Add task
//                  </button>
//                </div>
//              </form>
//            </section>
//    </>
//   )
// }

// export default TodoForm