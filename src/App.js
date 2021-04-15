import React, { useState } from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";

import { DarkTheme, LightTheme } from "./GlobalStyles";

import Brightness4Icon from "@material-ui/icons/Brightness4";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import MessageBox from "./components/MessageBox";
import { Grid } from "@material-ui/core";

firebase.initializeApp({
  apiKey: "AIzaSyBsN7j9R_2lzH1r8FQhKeAyJpUfGd0KHSo",
  authDomain: "chatapp-bcaba.firebaseapp.com",
  projectId: "chatapp-bcaba",
  storageBucket: "chatapp-bcaba.appspot.com",
  messagingSenderId: "837688916956",
  appId: "1:837688916956:web:160b61c6d654d8758eed19",
  measurementId: "G-H6QZ3M995J",
});

// const auth = firebase.auth();
// const firestore = firebase.firestore();
// const analytics = firebase.analytics();

export default function App() {
  //DARK MODE
  const [darkMode, setDarkMode] = useState(false);

  const changeTheme = () => {
    setDarkMode(!darkMode);
  };

  //USER AUTH
  const [user] = useAuthState(firebase.auth());

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();

    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (err) {
      console.error(err);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ThemeProvider theme={darkMode ? DarkTheme : LightTheme}>
      <StyledApp>
        <aside>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={5}
          >
            <Grid item>
              {user ? (
                <StyledButton onClick={signOut}>Sign Out</StyledButton>
              ) : (
                <StyledButton onClick={signInWithGoogle}>Sign In</StyledButton>
              )}
            </Grid>
            <Grid item>
              <StyledThemeButton onClick={changeTheme}>
                <Brightness4Icon style={{ fontSize: 50 }} />
              </StyledThemeButton>
            </Grid>
          </Grid>
        </aside>
        <StyledBody>{user && <MessageBox {...user} />}</StyledBody>
      </StyledApp>
    </ThemeProvider>
  );
}

const StyledBody = styled.div`
  margin-left: 300px; /* Same as the width of the sidebar */
  padding: 0px 10px;
`;

const StyledApp = styled.div`
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.fontColor};
  height: 100vh;

  aside {
    height: 100%; /* Full-height: remove this if you want "auto" height */
    width: 300px; /* Set the width of the sidebar */
    position: fixed; /* Fixed Sidebar (stay in place on scroll) */
    z-index: 1; /* Stay on top */
    top: 0; /* Stay at the top */
    left: 0;
    background-color: #111; /* Black */
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 20px;
  }
`;

const StyledButton = styled.button`
  background-image: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.fontColor};
  border: none;
  cursor: pointer;
  font-size: 2rem;
  padding: 10px;
  border-radius: 10px;
`;

const StyledThemeButton = styled.button`
  background-image: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.fontColor};
  border: none;
  border-radius: 100%;
  cursor: pointer;
  font-size: 2rem;
  padding: 10px;
  display: flex;
`;
