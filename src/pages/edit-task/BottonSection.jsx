import React from "react";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/config";

const BottonSection = ({ user }) => {
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
    <section className="center mtt">
      <button className="add-more-btn">
        Add More <i className="fa-solid fa-plus"></i>
      </button>
      <div>
        <button className="delete mtt">Delete Task</button>
      </div>
    </section>
  );
};

export default BottonSection;
