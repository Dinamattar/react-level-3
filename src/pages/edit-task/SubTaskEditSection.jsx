import React, { useState } from "react";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/config";
import Moment from "react-moment";

const SubTaskEditSection = ({
  user,
  StringId,
  completeCheckbox,
  trashIcon,
}) => {
  const [value, loading, error] = useDocument(doc(db, user.uid, StringId));
  const [showAddNewTask, setShowAddNewTask] = useState(false);
 const [subTask, setSubTask] = useState("");

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

  if (value) {
    return (
      <section className="sub-task mtt">
        <div className="parent-time">
          <p className="time">
            <Moment className="profile-data" fromNow date={value.data().id} />
          </p>
          <div>
            <input
              onChange={async (eo) => {
                completeCheckbox(eo);
              }}
              checked={value.data().complete}
              id="checkbox"
              type="checkbox"
            />
            <label htmlFor="checkbox"> Completed </label>
          </div>
        </div>

        <ul>
          {value.data().details.map((item) => {
            return (
              <li key={item} className="card-task flex">
                <p>{item}</p>
                <i
                  onClick={() => {
                    trashIcon(item);
                  }}
                  className="fa-solid fa-trash"
                ></i>
              </li>
            );
          })}
        </ul>
        {showAddNewTask && (
          <div className="add-new-task flex">
            <input onChange={(eo) => {
              setSubTask(eo.target.value)
            }
            } className="add-task" />
            <button  onClick={async() => {
               await updateDoc(doc(db,user.uid,StringId),{
                      details:arrayUnion(subTask),
                    })
                    setSubTask("")
            }
            } className="add">Add</button>
            <button
              onClick={() => {
                setShowAddNewTask(false);
              }}
              className="cancel"
            >
              Cancle
            </button>
          </div>
        )}
        <div className="center mtt">
          <button
            onClick={() => {
              setShowAddNewTask(true);
            }}
            className="add-more-btn"
          >
            Add More <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </section>
    );
  }
};

export default SubTaskEditSection;
