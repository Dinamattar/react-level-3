import React from 'react';
import './Model.css'
const Model = ({closeModel , children}) => {
    return (
        <div className="parent-of-model">
          <form className={`model`}>
          <div
            onClick={() => {
                closeModel();
            }}
            className="close"
          >
            X
          </div>
          {children} 
        </form>
        </div>
    );
}

export default Model;
