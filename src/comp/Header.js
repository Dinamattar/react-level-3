import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

const Header = () => {
  const [user] = useAuthState(auth);

  const { theme, changeTheme } = useContext(DataContext);


  return (
    <div className='myheader'>
      <header className="hide-when-mobile dina">
        <NavLink to="/">    <h1>React Course</h1>
        </NavLink>
        <button className="th" onClick={() => changeTheme(theme === "ligth" ? "dark" : "ligth")}>
          {theme}
        </button>
        <ul className="flex">

          {user && <li className="main-list">
            <NavLink className="main-link" to="/About">

              About
            </NavLink >

          </li>}



          {user && <li className="main-list">
            <NavLink className="main-link" to="/profile">

              Profile
            </NavLink >

          </li>}


          {!user && <li className="main-list">
            <NavLink className="main-link" to="/Signup">
              Sign Up
            </NavLink >


          </li>}

          {!user && <li className="main-list">
            <NavLink className="main-link" to="/Signin">
              Sign In
            </NavLink >


          </li>}
          {user && <li className="main-list" onClick={() => {
            signOut(auth).then(() => {
              // Sign-out successful.
              console.log("sign out")
            }).catch((error) => {
              // An error happened.
              console.log("dont sign out")
            });
          }}>
            <NavLink className="main-link" to="/Signin">
              Sign Out
            </NavLink >


          </li>}



        </ul>
      </header>



      {/* <header className="show-when-mobile">
        <h1>React Course</h1>
        <label className="absolute" htmlFor="burger">
          <i className="fas fa-bars" />
        </label>
        <input id="burger" type="checkbox" />
        <div className="show-on-click">
          <div className="main-div">
            <label htmlFor="html">
              HTML <i className="fas fa-plus" />{" "}
            </label>
            <input id="html" type="checkbox" />
            <ul className="sub-div">
              <li>
                <NavLink to="/html">Full Course</NavLink>
              </li>
              <li>
                <NavLink to="/html">Crash Course</NavLink>
              </li>
              <li>
                <NavLink to="/html">learn in 1h</NavLink>
              </li>
            </ul>
          </div>
          <div className="main-div">
            <label htmlFor="css">
              CSS <i className="fas fa-plus" />{" "}
            </label>
            <input id="css" type="checkbox" />
            <ul className="sub-div">
              <li>
                <NavLink to="/css">Full Course</NavLink>
              </li>
              <li>
                <NavLink to="/css">CSS Examples</NavLink>
              </li>
              <li>
                <label className="mini-projects" htmlFor="mini">
                  mini projects <i className="fas fa-plus" />
                </label>
                <input id="mini" type="checkbox" />
                <ul className="sub-sub-div">
                  <li>
                    <NavLink to="/css">project 1</NavLink>
                  </li>
                  <li>
                    <NavLink to="/css">project 2</NavLink>
                  </li>
                  <li>
                    <NavLink to="/css">project 3</NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="main-div">
            <label htmlFor="js">
              JavaScript <i className="fas fa-plus" />{" "}
            </label>
            <input id="js" type="checkbox" />
            <ul className="sub-div">
              <li>
                < NavLink to="/javascript">coming soon🔥</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </header> */}
    </div>
  );
};
export default Header;

