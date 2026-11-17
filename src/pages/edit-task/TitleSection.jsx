import React from "react";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/config";

const TitleSection = ({ user }) => {
  const [value, loading, error] = useCollection(collection(db, user.uid));

  if (loading) {
    return (
      <main>
        <p className="load">Loading...</p>
      </main>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }


  return (
    <section className="title center">
      <h1>
        <input value={"New Task"} className="title-input center" type="text" />
        <i className="fa-regular fa-pen-to-square"></i>
      </h1>
    </section>
  );
};

export default TitleSection;
