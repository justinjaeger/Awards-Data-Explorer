import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoginContainer from 'components/LoginContainer';
import Modal from 'components/wrappers/Modal';
import Notification from 'components/Notification';

export default function App(props) { 

  const { URL } = props;

  // User info
  const [username, setUsername] = useState(props.username);
  const [email, setEmail] = useState(props.email);
  const [image,] = useState(props.image);
  // Profile Dropdown
  const [profileDropdown, setProfileDropdown] = useState(false);
  // Login Container
  const [loggedIn, setLoggedIn] = useState(props.loggedIn);
  const [loginDropdown, setLoginDropdown] = useState(props.loginDropdown);
  const [loginRoute, setLoginRoute] = useState(props.loginRoute);
  // Notification
  const [notification, setNotification] = useState(props.notification);
  // Login Links
  const [resendEmailLink, setResendEmailLink] = useState(false);
  const [reEnterEmailLink, setReEnterEmailLink] = useState(false);
  const [changeEmailLink, setChangeEmailLink] = useState(false);

  // LOG IN
  function login(userData) {
    console.log('logging user in with this data: ', userData)
    setUsername(userData.username);
    setLoggedIn(true);
    setLoginDropdown(false);
    setLoginRoute('/blank');
    setNotification('');
    window.location.reload();
  };

  // LOG OUT
  function logout() {
    axios.get('/api/login/logout')
    .then(res => {
      if (res.data.error) return setNotification(res.data.error);
      setLoggedIn(false);
      setUsername('');
      window.location.reload();
    })
    .catch(err => {
      console.log('err, could not log out', err.response);
    })
  };

  // X OUT
  function xOut() {
    setLoginDropdown(false);
    setNotification('');
  };

  // REROUTE (has to be its own function cause error messages need to be deleted)
  function redirect(entry) {
    setLoginRoute(entry);
    setNotification('');
    setResendEmailLink(false);
    setReEnterEmailLink(false);
    setChangeEmailLink(false);
    setLoginDropdown(true);
  };

  function toggleLoginDropdown(route) {
    // Displays login dropdown and sets route
    setLoginDropdown(true);
    setLoginRoute(route);
    setNotification('');
  };

  // When you click "Incorrect Email?"
  function deleteUserAndSignUpAgain() {
    // Delete the user by email
    axios.post('/api/signup/deleteUser', { email })
    .then(res => {
      if (res.data.error) return setNotification(res.data.error);
      redirect('/signup');
      setUsername(username);
      setNotification(res.data.message);
      setLoginDropdown(true);
    })
    .catch(err => {
      // gtting an error here
      console.log('err in notification.jsx', err.response);
    })
  };

  // If specific notification, render this notification:
  if (notification === 'please verify email') setNotification([
    <div>Please verify the email sent to: {email}. </div>,
    <button 
        id="notif-click-here"
        onClick={deleteUserAndSignUpAgain}
        > Incorrect Email?
    </button>
  ]);

  const space = <span>&nbsp;</span>;

  return (
    <>

      {notification && 
      <Notification setNotification={setNotification} >
        {notification}
      </Notification> 
      }

      <div id="Header">
      
        <div id="header-left">
          <a href={`${URL}`} className="home-button" >Home</a>
        </div>

        <div id="header-right">
          {!loggedIn &&
          <>
              <div id="left-header-margin"></div>
              <button onClick={() => toggleLoginDropdown('/login')} className="header-button" >Log In</button>
              <button onClick={() => toggleLoginDropdown('/signup')} className="header-button">Sign Up</button>
              <div id="right-header-margin"></div>
            </>
          }

          {loggedIn &&
            <>
              <div id="header-message">Welcome,{space}<a href={`${URL}/user/${username}`} className="header-button" >{username}</a></div>
              <button 
                onMouseEnter={() => setProfileDropdown(!profileDropdown)} 
                onClick={() => setProfileDropdown(true)} 
                className="header-button">
                <img className="profile-image-xsm header-profile-pic" src={image} ></img>
              </button>
        
              { profileDropdown && 
                <div id="profile-dropdown" onMouseLeave={() => setProfileDropdown(false)}>
                  <a className="profile-dropdown-button no-underline" href={`${URL}/user/${username}`} >My Profile</a>
                  <button className="profile-dropdown-button" onClick={logout} >Log Out</button>
                </div>
              }
            </>
          }
        </div>

        { loginDropdown && 
          <Modal 
            setModal={setLoginDropdown} 
            size={
                loginRoute==='login' ? "200px" : "350px"
              }
          >
            <LoginContainer
              loggedIn={loggedIn} setLoggedIn={setLoggedIn}
              route={loginRoute} setRoute={redirect}
              username={username} setUsername={setUsername}
              email={email} setEmail={setEmail}
              setNotification={setNotification}
              resendEmailLink={resendEmailLink} setResendEmailLink={setResendEmailLink}
              reEnterEmailLink={reEnterEmailLink} setReEnterEmailLink={setReEnterEmailLink}
              changeEmailLink={changeEmailLink} setChangeEmailLink={setChangeEmailLink}
              setLoginDropdown={setLoginDropdown}
              xOut={xOut}
              login={login}
            />
          </Modal>
        }
      </div>
    </>
  );
}
