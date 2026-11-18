import React from "react";
import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/config";


const TitleSection = ({ user , StringId,titleInput}) => {
  const [value, loading, error] = useDocument(doc(db, user.uid,StringId));

 
   
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

if(value){
  return (
    <section className="title center">
      <h1>
        <input onChange={async(eo) => {
          titleInput(eo)
        }
        }
        defaultValue={value.data().title} className="title-input center" type="text" />
        <i className="fa-regular fa-pen-to-square"></i>
      </h1>
    </section>
  );}
};

export default TitleSection;
