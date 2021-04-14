import React, { useEffect, useState } from "react";
import styled from "styled-components";

import firebase from "firebase/app";
import "firebase/firestore";
import Message from "./Message";

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

  return (
    <StyledMessageBox>
      {messages.map((message, i) => (
        <Message key={i} {...message} />
      ))}
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

const StyledMessageBox = styled.div`
  height: 200px;
  width: 100px;
`;

const StyledForm = styled.form`
  input {
  }
`;