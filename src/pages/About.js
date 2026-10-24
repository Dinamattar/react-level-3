import React from 'react'
import Header from '../comp/Header'
import Footer from '../comp/Footer'
import { Helmet } from 'react-helmet-async'
import { useEffect } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebase/config";
import { useNavigate } from "react-router";

export default function About() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();


  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }
    if (!user.emailVerified) {
      navigate("/");

    }
  });

  if (loading) {
    return (
      <div>
        <Header />
        <main>
          {" "}
          <p className="load">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (user) {
    if (user.emailVerified) {
      return (
        <div>
          <Helmet>
            <title>About Page</title>
          </Helmet>
          <Header />
          <main>
            <p>Welcome : {user.displayName} <span>🧡</span></p>
          </main>
          <Footer />
        </div>
      );

    }


  }


}
