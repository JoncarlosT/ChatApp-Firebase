import React, { useState } from "react";
import styled from "styled-components";

//IMPORT THEMES
import { ThemeProvider } from "styled-components";
import { DarkTheme, LightTheme } from "./GlobalStyles";

//IMPORT FROM MATERIALUI
import Brightness4Icon from "@material-ui/icons/Brightness4";

// IMPORT FOR FIREBASE
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "./firebase";

//IMPORT COMPONENTS
import MessageBox from "./components/MessageBox";

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
        <SideBar>
          {user ? (
            <StyledButton onClick={signOut}>Sign Out</StyledButton>
          ) : (
            <StyledButton onClick={signInWithGoogle}>Sign In</StyledButton>
          )}
          <ThemeButton onClick={changeTheme}>
            <Brightness4Icon style={{ fontSize: 50 }} />
          </ThemeButton>
        </SideBar>
        <StyledBody>{user && <MessageBox {...user} />}</StyledBody>
      </StyledApp>
    </ThemeProvider>
  );
}

//STYLED COMPONENTS
const StyledBody = styled.div``;

const StyledApp = styled.div`
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.fontColor};
  height: 100vh;
`;

const SideBar = styled.div`
  background-color: #111;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  width: 300px;
  left: 0px;
  position: fixed;
`;

const StyledButton = styled.button`
  background-image: ${(props) => props.theme.primary};
  border: none;
  cursor: pointer;
  font-size: 2rem;
  padding: 10px;
  border-radius: 10px;
  width: 200px;
`;

const ThemeButton = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  background-image: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.fontColor};
  padding: 10px;
  padding-bottom: 8px;
  border-radius: 100%;
`;
