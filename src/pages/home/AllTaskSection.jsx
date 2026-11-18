import React from "react";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/config";
import { Link } from "react-router-dom";
import Moment from 'react-moment';

const AllTaskSection = ({ user }) => {
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
if(value){
  return (
    <section className="all-task flex mtt">
    {value.docs.map((item) => {
      return( 
     <div>
         <article key={item.data().id} dir="auto" className="one-task">
           <Link to={`/EditTask/${item.data().id}`}>
             <h2>{item.data().title}</h2>
             <ul>
             {item.data().details.map((item,index) => {
               if(index < 2){
               return(
                   <li key={item}>{item}</li>
               )}else{
                   return false 
               } 
             }
             )} 
             </ul>
             <p className="time"><Moment className='profile-data' fromNow date={item.data().id} /></p>
           </Link>
         </article>
        
     </div>
      
      )
    }
    )}
    </section>
  );}
};

export default AllTaskSection;
