import styled from "styled-components";

export const List = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
`;

export const LoadMore = styled.button`
  display: block;
  width: 216px;
  height: 50px;
  font-family: inherit;
  font-weight: 600;
  font-size: 18px;
  line-height: 1.2;
  text-transform: uppercase;
  margin-left: auto;
  margin-right: auto;

  color: ${(props) => props.theme.color.secondaryColor};
  background-color: ${(props) => props.theme.color.bgBtn};
  box-shadow: 0px 3.43693px 3.43693px rgba(0, 0, 0, 0.25);
  border-radius: 10.3108px;

  transition: background-color 250ms linear;

  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.color.accentColor};
  }
`;

export const Message = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 1.2;
  margin-top: 150px;
  text-align: center;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 20px;
  gap: 10px;
  position: relative;
`;

export const DropDownMenu = styled.ul`
  position: absolute;
  top: 30px;
  right: 0;
  background-color: ${(props) => props.theme.color.bgBtn};
  box-shadow: 0px 3.43693px 3.43693px rgba(0, 0, 0, 0.25);
  border-radius: 10.3108px;
  z-index: 2;
`;

export const Button = styled.button`
  display: block;
  width: 120px;
  height: 30px;
  font-family: inherit;
  font-weight: 500;
  font-size: 18px;
  line-height: 1.2;

  color: ${(props) => props.theme.color.secondaryColor};
  background-color: ${(props) =>
    props.active ? props.theme.color.bgBtn : "transparent"};
  box-shadow: ${(props) =>
    props.active ? "0px 3.43693px 3.43693px rgba(0, 0, 0, 0.25)" : "none"};
  border: ${(props) =>
    props.active ? "2px solid rgba(0, 0, 0, 0.5)" : "none"};
  border-radius: 10.3108px;

  transition: background-color 250ms linear;

  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.color.accentColor};
  }
`;
