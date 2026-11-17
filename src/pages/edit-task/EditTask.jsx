/* eslint-disable react/jsx-no-undef */
import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "../../comp/Header";
import Footer from "../../comp/Footer";
import "./EditTask.css";
import { auth } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import TitleSection from "./TitleSection";
import SubTaskEditSection from "./SubTaskEditSection";
import BottonSection from "./BottonSection";

const EditTask = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <div>
        <Header />
        <main>
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
    return (
      <div>
        <Helmet>
          <title>Edit Task page</title>
        </Helmet>
        <Header />
        <div className="edit-task">
          {/* title */}
          <TitleSection user={user} />
          {/* sub-tasks section */}
          <SubTaskEditSection user={user} />
          {/* add more BTN && delete BIN */}
          <BottonSection user={user} />
        </div>
        <Footer />
      </div>
    );
  }
};

export default EditTask;
