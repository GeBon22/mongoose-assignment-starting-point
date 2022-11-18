import styled from "styled-components";

const Layout = ({ children }) => {
  return (
    <>
      <StyledHeading>Navigation</StyledHeading>
      {children}
      <footer>
        <p>Footer</p>
      </footer>
    </>
  );
};

const StyledHeading = styled.h1`
  color: red;
`;

export default Layout;
