import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "../../comp/Header";
import Footer from "../../comp/Footer";
import "./EditTask.css";

const EditTask = () => {
  return (
    <div>
      <Helmet>
        <title>Edit Task page</title>
      </Helmet>
      <Header />
      <div className="edit-task">
        {/* title */}
        <section className="title center">
          <h1>
            <input
              value={"New Task"}
              className="title-input center"
              type="text"
            />
            <i className="fa-regular fa-pen-to-square"></i>
          </h1>
        </section>

        {/* sub-tasks section */}
        <section className="sub-task mtt">
          <div className="parent-time">
            <p className="time">Created : 6 days ago</p>
            <div>
              <input id="checkbox" type="checkbox" />
              <label htmlFor="checkbox"> Completed </label>
            </div>
          </div>

          <ul>
            <li className="card-task flex">
              <p>Sub Task</p>
              <i className="fa-solid fa-trash"></i>
            </li>
            <li className="card-task flex">
              <p>Sub Task</p>
              <i className="fa-solid fa-trash"></i>
            </li>
          </ul>
        </section>

        {/* add more BTN && delete BIN */}
        <section className="center mtt">
          <button className="add-more-btn">
            Add More <i className="fa-solid fa-plus"></i>
          </button>
          <div>
            <button className="delete mtt">Delete Task</button>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default EditTask;
