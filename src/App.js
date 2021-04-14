import React, { useState } from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "./GlobalStyles";
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
        {user ? (
          <StyledButton onClick={signOut}>Sign Out</StyledButton>
        ) : (
          <StyledButton onClick={signInWithGoogle}>Sign In</StyledButton>
        )}

        <StyledThemeButton onClick={changeTheme}>
          <Brightness4Icon style={{ fontSize: 50 }} />
        </StyledThemeButton>

        {user && <MessageBox {...user} />}
        <GlobalStyle />
      </StyledApp>
    </ThemeProvider>
  );
}

const StyledApp = styled.div`
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.fontColor};
  height: 100vh;
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
  align-items: center;
  display: flex;
`;
