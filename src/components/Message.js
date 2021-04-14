import React from "react";
import styled from "styled-components";

export default function Message({ text, createdAt }) {
  return (
    <StyledMessage>
      <h1>{text}</h1>
    </StyledMessage>
  );
}

const StyledMessage = styled.div``;
