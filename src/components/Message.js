import { Grid } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { formatRelative } from "date-fns";

export default function Message({
  text = "",
  createdAt = null,
  displayName = "",
  photoURL = "",
  uid = "",
}) {
  console.log(createdAt);
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
    <StyledMessage>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="flex-start"
          spacing={2}
        >
          <Grid item>
            <p>{displayName}</p>
          </Grid>
          <Grid item>
            <StyledImg src={photoURL} alt="" width="40" height="40" />
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-start"
            spacing={2}
          >
            <Grid item>
              <p>{text}</p>
            </Grid>
            <Grid item>{/* <p>{formatDate(createdAt.seconds)}</p> */}</Grid>
          </Grid>
        </Grid>
      </Grid>
    </StyledMessage>
  );
}

const StyledImg = styled.img`
  border-radius: 50%;
`;

const StyledMessage = styled.div`
  background-image: ${(props) => props.theme.primary};
  padding: 20px;
  height: 60px;
  border-radius: 25px;
`;
