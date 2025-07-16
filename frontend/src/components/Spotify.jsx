import React from "react";
import styled from "styled-components";

export default function Spotify() {
  return (
    <Container>
      <h1>Welcome to your Spotify Clone</h1>
      <p>You are successfully logged in!</p>
    </Container>
  );
}

const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  place-items: center;
  background-color: #121212;
  color: white;
  height: 100vh;
`;
