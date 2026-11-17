import React from "react";
import Header from "../../comp/Header";
import Footer from "../../comp/Footer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { sendEmailVerification } from "firebase/auth";
import "./Home.css";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import HomeModel from "./HomeModel";
import AllTaskSection from "./AllTaskSection";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  
  // console.log(typeof(new Date().getTime()))
  // console.log(user);

  const sendEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      // Email verification sent!
      // ...
      console.log("we send you an  email to verify your account");
    });
  };

  const [showModel, setShowModel] = useState(false);
  const [array, setArray] = useState([]);
  const [subTask, setSubTask] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [showMassageSuccess, setShowMassageSuccess] = useState(false);

  // function of model
  const addBTN = (eo) => {
    eo.preventDefault();
    if(!array.includes(subTask)){
      array.push(subTask);
}
    console.log(array);
    setSubTask("");
  };

  const modelShow = (eo) => {
    eo.preventDefault();
    setShowModel(true);
  };
  const closeModel = () => {
    setShowModel(false);
  };
  const titleInput = (eo) => {
    setTaskTitle(eo.target.value);
  };

  const detailsInput = (eo) => {
    setSubTask(eo.target.value);
  };

  const submitBTN = async (eo) => {
    eo.preventDefault();
    setShowLoading(true);
    const taskID = new Date().getTime();
    await setDoc(doc(db, user.uid, `${taskID}`), {
      title: taskTitle,
      details: array,
      id: taskID,
    });
    setTaskTitle("");
    setArray([]);
    setShowLoading(false);
    setShowModel(false);
    setShowMassageSuccess(true);

    setTimeout(() => {
      setShowMassageSuccess(false);
    }, 3000);
  };

  if (loading) {
    return (
      <div>
        <Header />
        <main>
          {" "}
          <p className="load">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (user) {
    if (user.emailVerified) {
      return (
        <div>
          <Helmet>
            <title>Home page</title>
          </Helmet>
          <Header />
          <main className="home">
            {/* Option(fitered data) */}
            <section className="parent-of-btns mtt flex">
              <button>Oldest First</button>
              <button>Newest First</button>

              <select id="browers">
                <option value="aa">All Tasks</option>
                <option value="aa">Completed</option>
                <option value="aa">Not Completed</option>
              </select>
            </section>
   {/* show all task */}
           <AllTaskSection user={user}/>
            {/* Add new task */}
            <section className="mt add-task-btn">
              <button
                onClick={(eo) => {
                  modelShow(eo);
                }}
              >
                Add New Task <i className="fas fa-plus"></i>{" "}
              </button>
            </section>
            {showModel && (
             <HomeModel
             closeModel={closeModel}
             addBTN={addBTN}
             submitBTN={submitBTN}
             titleInput={titleInput}
             detailsInput={detailsInput}
             taskTitle={taskTitle}
             subTask={subTask}
             array={array}
             showLoading={showLoading}
             />
            )}
            <p
              style={{ right: showMassageSuccess ? "15vw" : "-100vw" }}
              className="task_massage"
            >
              Task added successfully
              <i className="fa-solid fa-circle-check"></i>
            </p>
          </main>
          <Footer />
        </div>
      );
    }

    if (!user.emailVerified) {
      return (
        <div>
          <Helmet>
            <title>Home page</title>
          </Helmet>
          <Header />
          <main>
            <p>
              {" "}
              Welcome : {user.displayName} <span>🧡</span>
            </p>
            <p> Please verify your email to continue</p>
            <button
              className="delete"
              onClick={() => {
                sendEmail();
              }}
            >
              Send Email
            </button>
          </main>
          <Footer />
        </div>
      );
    }
  }
  if (!user) {
    return (
      <div>
        <Header />
        <main>
          <p className="please">
            Please{" "}
            <Link style={{ fontSize: "30px" }} to="/Signin">
              Sign in
            </Link>{" "}
            to continue <span>🧡</span>{" "}
          </p>
        </main>
        <Footer />
      </div>
    );
  }
}
