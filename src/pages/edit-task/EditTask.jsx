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
import { useParams } from "react-router-dom";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
const EditTask = () => {
  const [user, loading, error] = useAuthState(auth);
 
  let {StringId} = useParams();

  // 1) title function
  const titleInput = async(eo) => {
    await updateDoc(doc(db,user.uid,StringId),{
            title: eo.target.value, 
          });
  }

  // 2) subTask function
const completeCheckbox = async(eo) => {
   if(eo.target.value){
              await updateDoc(doc(db,user.uid,StringId),{
                complete:true
              } );
            }else{
              await updateDoc(doc(db,user.uid,StringId),{
                complete:false
              } );
            }
}

const trashIcon = async(item) => {
  await updateDoc(doc(db,user.uid,StringId),{
              details:arrayRemove(item),
            })
}


  // 3) button function

const addBtn = async(eo) => {
 
        
}
const deleteBtn = async(eo) => {
   await updateDoc(doc(db,user.uid,StringId),{
              // details:arrayRemove(item),
            })
}
 
if(loading) {
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
          <TitleSection user={user} StringId={StringId} 
          titleInput={titleInput} />
          {/* sub-tasks section */}
          <SubTaskEditSection user={user} StringId={StringId} completeCheckbox={completeCheckbox} trashIcon={trashIcon} />
          {/* add more BTN && delete BIN */}
          <BottonSection user={user} StringId={StringId}  addBtn={addBtn} deleteBtn={deleteBtn} />
        </div>
        <Footer />
      </div>
    );
  }
};

export default EditTask;
