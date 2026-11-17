import React from 'react';
import Model from "../../pages/shared/Model";

const HomeModel = ({closeModel,titleInput,detailsInput,addBTN,submitBTN
    ,taskTitle ,array,subTask,showLoading
}) => {
    return (
         <Model closeModel={closeModel}>
                <div className="task-model">
                  <div className="task-model-inner">
                    <input
                      onChange={(eo) => {
                        titleInput(eo);
                      }}
                      required
                      placeholder="Add Title"
                      type="text"
                      value={taskTitle}
                    />

                    <div className="details-row flex">
                      <input
                        onChange={(eo) => {
                          detailsInput(eo);
                        }}
                        placeholder="Details : "
                        type="text"
                        value={subTask}
                      />
                      <button
                        onClick={(eo) => {
                          addBTN(eo);
                        }}
                        className="add-btn"
                      >
                        Add
                      </button>
                    </div>
                    <ul>
                      {array.map((item) => (
                        <li style={{color: 'black'}} key={item}>{item}</li>
                      ))}
                    </ul>

                    <button
                      onClick={async (eo) => {
                        submitBTN(eo);
                      }}
                      className="submit-btn"
                    >
                      {/* Submit */}
                      {showLoading ? (
                        <div className="my-spinner"></div>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </div>
              </Model>
    );
}

export default HomeModel;
