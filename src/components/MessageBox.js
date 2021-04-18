import React, { useEffect, useState } from "react";
import styled from "styled-components";

import firebase from "firebase/app";
import "firebase/firestore";
import Message from "./Message";
import { Grid } from "@material-ui/core";

export default function MessageBox({ uid, displayName, photoURL }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setnewMessage] = useState("");

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

  const sendNewMessage = async (e) => {
    e.preventDefault();

    if (newMessage) {
      db.collection("messages").add({
        text: newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        displayName,
        photoURL,
      });
    }

    setnewMessage("");
  };

  const right = {
    alignItems: "flex-start",
  };

  const currentUser = firebase.auth().currentUser;

  return (
    <StyledMessageBox>
      <MessageWrapper
        theme={currentUser.displayName === displayName ? "" : right}
      >
        {messages.map((message, i) => (
          <Message key={i} {...message} />
        ))}
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

const MessageWrapper = styled.div`
  overflow: scroll;
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
