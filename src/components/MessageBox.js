import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

//IMPORT FIREBASE
import firebase from "../firebase";

//IMPORT COMPONENTS
import Message from "./Message";

export default function MessageBox({ uid, displayName, photoURL }) {
  //GETTING CURRENT USER
  const currentUser = firebase.auth().currentUser;

  //GET MESSAGES FROM FIREBASE
  const [messages, setMessages] = useState([]);
  const db = firebase.firestore();
  const messageRef = db.collection("messages").orderBy("createdAt").limit(100);

  const getMessages = () => {
    messageRef.onSnapshot((querySnapShot) => {
      const mess = [];
      querySnapShot.forEach((doc) => {
        mess.push(doc.data());
      });
      setMessages(mess);
    });
  };

  useEffect(() => {
    getMessages();
  }, [uid]);

  //SENDING NEW USER MESSAGE TO FIREBASE
  const [newMessage, setnewMessage] = useState("");

  const bottomMessage = useRef();

  const sendNewMessage = async (e) => {
    e.preventDefault();

    if (newMessage) {
      await db.collection("messages").add({
        text: newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        displayName,
        photoURL,
      });
    }

    setnewMessage("");

    bottomMessage.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <StyledMessageBox>
      {/* HANDLE USER MESSAGES AND RECIVED MESSAGE  */}
      <MessageWrapper
        theme={
          currentUser.displayName === displayName
            ? 'alignItems: "flex-end"'
            : 'alignItems: "flex-start"'
        }
      >
        {messages.map((message, i) => (
          <Message key={i} {...message} />
        ))}
        <BottomMessage ref={bottomMessage} />
      </MessageWrapper>
      <StyledForm onSubmit={sendNewMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setnewMessage(e.target.value)}
          placeholder="Type your message here..."
        />
      </StyledForm>
    </StyledMessageBox>
  );
}

//STYLED COMPONENTS

const BottomMessage = styled.span``;

const MessageWrapper = styled.div`
  /* overflow: auto; */
  overflow-x: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.theme.alignItems};
`;

const StyledMessageBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 300px;
  height: 100vh;
  right: 10px;
  align-items: flex-end;
`;

const StyledForm = styled.form`
  input {
    outline: none;
    border: 0;
    width: 500px;
    float: left;
    padding: 8px;
    border-radius: 25px;
    padding: 20px;
    margin: 0px 20px 20px;
  }
`;
