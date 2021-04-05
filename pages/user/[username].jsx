import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cookies from 'next-cookies';
import parseCookies from 'utils/parseCookies';

import Header from 'containers/Header';
import Dashboard from 'containers/Dashboard';
import Four0Four from 'containers/Four0Four';

/**
 * /user/username123
 */

function UserDashboard(props) { 

  console.log('profile image, ', props.profileImage)

  return (
    <>
      <Header 
        loggedIn={props.loggedIn}
        loginDropdown={props.loginDropdown}
        loginRoute={props.loginRoute}
        notification={props.notification}
        notification={props.notification}
        username={props.username}
        email={props.email}
        notification={props.notification}
        image={props.image}
        URL={props.URL}
      />

      { (props.send404)
      ? <Four0Four thingCannotFind={'User'} /> 

      : <Dashboard 
          loggedIn={props.loggedIn}
          username={props.username}
          user_id={props.user_id}
          profileImage={props.profileImage}
          profileUsername={props.profileUsername}
          numFollowers={props.numFollowers}
          numFollowing={props.numFollowing}
          followingUser={props.followingUser}
        />
      }
    </>
  );
};

export default UserDashboard;
 
/**
 * Fetch all SSR (user specific) props
 * Begin by declaring all props' default values
 * Depending on what cookies we have and the access token validation,
 * populate the app with specific data
 */

export async function getServerSideProps(context) {

  // Determine the url based on the environment
  const URL = (() => {
    switch(process.env.NODE_ENV) {
      case 'development':
        return 'http://localhost:3000'
      case 'production':
        return 'https://oscarexpert.com'
    };
  })();

  /* Get the profile username from the slug */
  const profileUsername = context.req.url.slice(6);

  /* Default values for all props */
  const props = { 
    loggedIn: false,
    loginDropdown: false,
    loginRoute: '/',
    notification: '',
    notification: '',
    username: '',
    email: '',
    image: '/PROFILE.png',
    user_id: false,
    notification: false,
    profileImage: '/PROFILE.png',
    profileUsername: profileUsername,
    send404: false,
    followingUser: false,
    URL: URL,
  };

  /* Handle cookies */

  const c = cookies(context); // for getting cookies

  if (c.sent_verification) { // cookie exists after you sign up but NOT after you authenticate email
    const username = c.sent_verification.split('*$%&')[0]
    const email = c.sent_verification.split('*$%&')[1]
    props.email = email;
    props.username = username;
    props.notification = 'please verify email';
  };

  if (c.authenticated) { // cookie exists after you authenticate email
    const username = c.authenticated;
    props.loginRoute = '/login';
    props.loginDropdown = true;
    props.username = username;
    props.notification = 'Email verified. Please enter your password.';
  };

  if (c.reset_password) { // cookie exists after you reset password
    const email = c.reset_password;
    props.loginRoute = '/resetPassword';
    props.loginDropdown = true;
    props.email = email;
    props.notification = `Please enter a new password for ${email}.`;
  };

  /**
   * This is basically what logs you in.
   * If access token exists, verify it. 
   * If verified, populate the page with appropriate user data
   */

  if (c.access_token) { // cookie exists when you are logged in
    const payload = { access_token: c.access_token };
    /* Request to verify token and get data no the user */
    await axios.post(`${URL}/api/auth`, payload)
      .then(res => {
        /* If token is verified, set props accordingly */
        if (res.data.loggedIn) {
          props.loggedIn = true;
          props.username = res.data.username;
          if (res.data.image) props.image = res.data.image;
        };  
        /* sets cookies on client (HAVE to do this inside getServerSideProps) */
        parseCookies(res.data.cookieArray, context);
      })
      .catch(err => {
        console.log('something went wrong while verifying access token', err);
      })
  };

  /* Fetch the data for the user whose profile we're visiting */
  await axios.post(`${URL}/api/user/dashboard`, { profileUsername })
    .then(res => {
      console.log('here')
      /* If not a real profile, throw 404 */
      if (res.data.send404) return props.send404 = true;
      /* If token is verified, set props accordingly */
      if (res.data.profileImage) props.profileImage = res.data.profileImage;
      props.numFollowers = res.data.numFollowers;
      props.numFollowing = res.data.numFollowing;
    })
    .catch(err => {
      console.log('something went wrong fetching data for user dashboard', err);
    })

  /* If this is not our profile, determine if we are following them */
  let username = props.username;
  if (username !== profileUsername) {
    await axios.post(`${URL}/api/followers/determineFollowing`, { username, profileUsername })
      .then(res => {
        props.followingUser = res.data.followingUser;
      })
      .catch(err => {
        if (err) console.log('something went wrong fetching followers', err);
      })
  };

  /* Return the final props object */
  return { props };
} 
