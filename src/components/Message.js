import { Grid } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { formatRelative } from "date-fns";
import firebase from "firebase/app";
import "firebase/auth";

export default function Message({
  text = "",
  createdAt = null,
  displayName = "",
  photoURL = "",
  uid = "",
}) {
  const currentUser = firebase.auth().currentUser;

  const formatDate = (date) => {
    let formattedDate = "";
    if (date) {
      formattedDate = formatRelative(date, new Date());
      // Uppercase the first letter
      formattedDate =
        formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
    return formattedDate;
  };

  return (
    <>
      {currentUser.displayName === displayName ? (
        <UserMessage>
          <StyledImg src={photoURL} alt="" width="40" height="40" />

          <div>
            <p>{displayName}</p>

            <Text>{text}</Text>
          </div>
        </UserMessage>
      ) : (
        <ReceivedMessage>
          <StyledImg src={photoURL} alt="" width="40" height="40" />
          <div>
            <p>{displayName}</p>

            <Text>{text}</Text>
          </div>
        </ReceivedMessage>
      )}
    </>
  );
}

const Text = styled.p`
  background-image: ${(props) => props.theme.primary};
  padding: 15px;
  border-radius: 25px;
`;

const StyledImg = styled.img`
  border-radius: 50%;
`;

const ReceivedMessage = styled.div`
  margin: 20px;
  display: flex;
  align-items: flex-end;
  left: 20px;
  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 10px;
  }
`;

const UserMessage = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
  margin: 20px;
  div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-right: 10px;
  }
`;
