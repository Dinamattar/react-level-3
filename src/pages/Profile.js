import React from 'react'
import Header from '../comp/Header'
import Footer from '../comp/Footer'
import { Helmet } from 'react-helmet-async'
import { useEffect } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebase/config";
import { useNavigate } from "react-router";
import Moment from 'react-moment';
import { deleteUser} from "firebase/auth";
export default function Profile() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }
    if (!user.emailVerified) {
      navigate("/");

    }
  },);

  const deleteAccount = () => {
    deleteUser(user).then(() => {
              console.log("user delete")

            }).catch((error) => {
              console.log(error.message)
              
            }
            )
  }
  

  if (loading) {
    return (
      <div>
        <Header />
        <main >        <p className='load'>Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }


  if (user) {
    if (user.emailVerified) {
      return (<div>
        <Helmet>
          <title>Profile Page</title>
        </Helmet>
        <Header />
        <main className='profile'>
          <h6 className='profile-data'>Email :{user.email} </h6>
          <h6 className='profile-data'>User Name : {user.displayName}</h6>
          {/* <h6 className='profile-data'> Last Sign-in :{user.metadata.lastSignInTime} </h6> */}

          <h6 className='profile-data'> Last Sign-in :<Moment className='profile-data' fromNow date={user.metadata.lastSignInTime} /> </h6>

          {/* <h6 className='profile-data'>Account Created : {user.metadata.creationTime } </h6> */}

          <h6 className='profile-data'>Account Created : <Moment className='profile-data' fromNow date={user.metadata.creationTime} /></h6>

          <button onClick={() => {
            deleteAccount();
          }
          } className='delete'>Delete Account</button>
          {/* <Moment fromnow date={user.metadata.lastSignInTime}/> */}
        </main>

        <Footer />
      </div>)
    }
    return (<div>
      <Helmet>
        <title>Profile Page</title>
      </Helmet>
      <Header />
      <main className='profile'>
        <h6 className='profile-data'>Email :{user.email} </h6>
        <h6 className='profile-data'>User Name : {user.displayName}</h6>
        {/* <h6 className='profile-data'> Last Sign-in :{user.metadata.lastSignInTime} </h6> */}

        <h6 className='profile-data'> Last Sign-in :<Moment className='profile-data' fromNow date={user.metadata.lastSignInTime} /> </h6>

        {/* <h6 className='profile-data'>Account Created : {user.metadata.creationTime } </h6> */}

        <h6 className='profile-data'>Account Created : <Moment className='profile-data' fromNow date={user.metadata.creationTime} /></h6>

        <button className='delete'>Delete Account</button>
        {/* <Moment fromnow date={user.metadata.lastSignInTime}/> */}
      </main>

      <Footer />
    </div>)
  }

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
}
