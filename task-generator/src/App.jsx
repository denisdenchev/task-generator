import React, { useState, useEffect } from "react";
// import styles from "./App.module.scss";

// import Button from "./components/Button/Button";
// import SearchBar from "./components/SearchBar";
// import Counter from "./components/Counter";

import { firestore } from "./firebase.js";

// import {
//   faCoffee,
//   faCheckSquare,
//   faDog
// } from "@fortawesome/free-solid-svg-icons";
// import { library } from "@fortawesome/fontawesome-svg-core";

// library.add(faCoffee, faCheckSquare, faDog);

const App = () => {
  const [todoItems, setTodoItems] = useState([]);

  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    // first load up page...
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    firestore
      .collection("Tasks")
      .doc("todos")
      .get()
      .then(doc => {
        const retrievedItems = doc.data().todos;
        setTodoItems(retrievedItems);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const addToDb = () => {
    const newItems = [...todoItems, newItem.toLowerCase()];

    const newDoc = {
      items: newItems
    };

    firestore
      .collection("Tasks")
      .doc("todos")
      .set(newDoc)
      .then(() => {
        fetchTodos();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteFromDb = item => {
    const newArray = [...todoItems];
    const position = newArray.indexOf(item);
    newArray.splice(position, 1);

    const newDoc = {
      items: newArray
    };

    firestore
      .collection("Tasks")
      .doc("todos")
      .set(newDoc)
      .then(() => {
        fetchTodos();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getItemJsx = () => {
    return todoItems.map(item => (
      <>
        <p>{item}</p>
        <button onClick={() => deleteFromDb(item)}>Delete</button>
      </>
    ));
  };

  const addNewDoc = () => {
    const userId = "todos";

    const newDoc = {
      TaskCreated: "20.03.2020",
      GoalDate: "30.03.2020",
      ImageForProof:
        "https://www.rd.com/wp-content/uploads/2018/05/13-Secrets-of-People-Who-Always-Have-a-Clean-House-9.jpg"
    };

    firestore
      .collection("Tasks")
      .doc(userId)
      .set(newDoc)
      .then(() => {
        fetchTodos();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteDoc = () => {
    const userId = "todos";

    firestore
      .collection("Tasks")
      .doc(userId)
      .delete()
      .then(() => {
        fetchTodos();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <button onClick={addNewDoc}>Add new Doc</button>
      <button onClick={deleteDoc}>Delete new Doc</button>

      <input
        type="text"
        placeholder="Todo item..."
        onInput={event => setNewItem(event.target.value)}
      />
      <button onClick={addToDb}>Submit</button>
      {getItemJsx()}
    </>
  );
};

export default App;
