import styled from "styled-components";

export const Container = styled.div`
  width: 50%;
  margin: auto;
  border: 1px solid black;
  border-radius: 10px;
  padding: 20px;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const Header = styled.h1`
  text-align: center;
  margin-bottom: 10px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;

  input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #cccccc;
  }

  input[type="submit"] {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #cccccc;
    cursor: pointer;
  }

  p[role="alert"] {
    color: red;
    border: 1px solid red;
    padding: 10px;
    background: #fdede8;
    border-radius: 5px;
  }
`;

export const Loader = styled.div`
  margintop: 10px;
  width: 20px;
  aspect-ratio: 4;
  background: radial-gradient(circle closest-side, #000 90%, #0000) 0 /
    calc(100% / 3) 100% space;
  clip-path: inset(0 100% 0 0);
  animation: l1 1s steps(4) infinite;
  @keyframes l1 {
    to {
      clip-path: inset(0 -34% 0 0);
    }
  }
`;
