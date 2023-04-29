import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 16px;
`;

export const Header = styled.header``;

export const Navigate = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 0;
  margin-bottom: 16px;
  border-bottom: 1px solid black;
`;

export const Logo = styled.p`
  background: linear-gradient(
    114.99deg,
    #471ca9 -0.99%,
    #5736a3 54.28%,
    #4b2a99 78.99%
  );
  padding: 10px 15px;
  width: 106px;
  height: 42px;
  border-radius: 15px;
`;

export const Link = styled(NavLink)`
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  color: ${(props) => props.theme.color.secondaryColor};

  font-weight: 500;

  &.active {
    color: ${(props) => props.theme.color.primaryColor};
    background: linear-gradient(
      114.99deg,
      #471ca9 -0.99%,
      #5736a3 54.28%,
      #4b2a99 78.99%
    );
  }
`;
