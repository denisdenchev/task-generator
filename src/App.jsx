import React from "react";
import styles from "./App.module.scss";
import { useState, useEffect } from "react";
import { firestore } from "./firebase.js";
import {
  Button,
  Row,
  Container,
  Col,
  Form,
  Navbar,
  Nav,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [tasks, setTasks] = useState([]);

  const [yourGoal, updateGoal] = useState("");
  const [startDate, updateStartDate] = useState("");
  const [endDate, updateEndDate] = useState("");
  const [uploadImage, updateImage] = useState("");
  const [updateTask, setUpdateTask] = useState("");

  useEffect(() => {
    // first load up page...
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    firestore
      .collection("Tasks")
      .get()
      .then((data) => {
        setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addToDb = () => {
    firestore
      .collection("Tasks")
      .add({
        name: yourGoal,
        start: startDate,
        due: endDate,
        image: uploadImage,
      })
      .then(() => {
        fetchTodos();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteFromDb = (id) => {
    firestore
      .collection("Tasks")
      .doc(id)
      .delete()
      .then(() => {
        fetchTodos();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateTodo = (id) => {
    firestore
      .collection("Tasks")
      .doc(id)
      .set({ name: updateTask })
      .then(() => {
        fetchTodos();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          Hello, let's keep track of your tasks!
        </Navbar.Brand>
        <Nav.Link href="">Login</Nav.Link>
        <Nav.Link eventKey={2} href="">
          Logout
        </Nav.Link>
      </Navbar>
      <Container>
        <Row>
          <Col>
            <h2 className={styles.heading}>Note your tasks, don't forget!</h2>
            <Form>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Control
                  placeholder="What to do?"
                  type="text"
                  value={yourGoal}
                  onChange={(event) => updateGoal(event.target.value)}
                />
                <Form.Control
                  placeholder="When to start?"
                  type="text"
                  value={startDate}
                  onChange={(event) => updateStartDate(event.target.value)}
                />
                <Form.Control
                  placeholder="When to finish?"
                  type="text"
                  value={endDate}
                  onChange={(event) => updateEndDate(event.target.value)}
                />
                <Form.Control
                  placeholder="Please insert an image URL!"
                  type="text"
                  value={uploadImage}
                  onChange={(event) => updateImage(event.target.value)}
                />
              </Form.Group>
              <div class="col text-center">
                <Button variant="primary" onClick={addToDb}>
                  Create Task
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col></Col>
        </Row>
      </Container>

      <section className={styles.test}>
        {tasks.map((task) => (
          <div className={styles.inside} key={task.id}>
            {/* <p>{task.id}</p> */}
            <p>
              Name of the task: <h2> {task.name} </h2>
            </p>
            <p>
              Start date: <h2> {task.start} </h2>
            </p>
            <p>
              Finish date: <h2> {task.due} </h2>
            </p>
            <img src={task.image} />
            <div>
              <Button
                className="text-white m-4"
                variant="success"
                onClick={() => deleteFromDb(task.id)}
              >
                Task finished - Delete
              </Button>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};
export default App;
