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
import Model from "../../pages/shared/Model";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  console.log(user);

  const sendEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      // Email verification sent!
      // ...
      console.log("we send you an  email to verify your account");
    });
  };

  const [showModel, setShowModel] = useState(false);
  const resetPassword = (eo) => {
    eo.preventDefault();
    setShowModel(true);
  };
  const closeModel = () => {
    setShowModel(false);
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
            <section className="all-task flex mtt">
              <article dir="auto" className="one-task">
                <Link to="/EditTask">
                  <h2>New Task</h2>
                  <ul>
                    <li>Sub Task</li>
                    <li>Sub Task</li>
                  </ul>
                  <p className="time">A day ago</p>
                </Link>
              </article>

              <article dir="auto" className="one-task">
                <Link to="/EditTask">
                  <h2>New Task</h2>
                  <ul>
                    <li>Sub Task</li>
                    <li>Sub Task</li>
                  </ul>
                  <p className="time">A day ago</p>
                </Link>
              </article>

              <article dir="auto" className="one-task">
                <Link to="/EditTask">
                  <h2>تاسك جديد</h2>
                  <ul>
                    <li>تاسك 1</li>
                    <li>تاسك 2</li>
                  </ul>
                  <p className="time">A day ago</p>
                </Link>
              </article>
            </section>

            {/* Add new task */}
            <section className="mt add-task-btn">
              <button
                onClick={() => {
                  setShowModel(true);
                }}
              >
                Add New Task <i className="fas fa-plus"></i>{" "}
              </button>
            </section>
            {showModel && (
              <Model closeModel={closeModel}>
                <div className="task-model">
                  <div className="task-model-inner">
                    <input required placeholder="Add Title" type="text" />
                    
                    <div className="details-row flex">
                      <input placeholder="Details : " type="text" />
                      <button className="add-btn">Add</button>
                    </div>
                    
                    <button className="submit-btn">Submit</button>
                  </div>
                </div>
              </Model>
            )}
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
