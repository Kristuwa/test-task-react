import styled from "styled-components";
import bg from "../../img/bg.png";
import bg2x from "../../img/bg@2x.png";

export const CardContainer = styled.li`
  width: 380px;
  height: 460px;
  padding: 20px 0 36px;

  background: url(${bg}),
    linear-gradient(114.99deg, #471ca9 -0.99%, #5736a3 54.28%, #4b2a99 78.99%);

  background-position: left 36px top 28px, 100%;
  background-repeat: no-repeat;
  background-size: 308px 168px, 100%;
  box-shadow: -2.5777px 6.87386px 20.6216px rgba(0, 0, 0, 0.23);
  border-radius: 20px;

  @media (min-device-pixel-ratio: 2),
    (-webkit-min-device-pixel-ratio: 2),
    (min-resolution: 192dpi),
    (min-resolution: 2dppx) {
    background: url(${bg2x}),
      linear-gradient(114.99deg, #471ca9 -0.99%, #5736a3 54.28%, #4b2a99 78.99%);
  }
`;

export const Logo = styled.div`
  padding: 0 20px;
  margin-bottom: 136px;
`;

export const Image = styled.img`
  border-radius: 40px;
  position: absolute;
  top: -36px;
  left: 150px;
  border: 8px solid #ebd8ff;
  box-shadow: 0px 3.43693px 3.43693px rgba(0, 0, 0, 0.06),
    inset 0px -1.71846px 3.43693px #ae7be3, inset 0px 3.43693px 2.5777px #fbf8ff;
`;

export const ImageBackground = styled.div`
  width: 380px;
  height: 8px;
  position: relative;
  margin-bottom: 62px;

  background-color: #ebd8ff;
  box-shadow: 0px 3.43693px 3.43693px rgba(0, 0, 0, 0.06),
    inset 0px -1.71846px 3.43693px #ae7be3, inset 0px 3.43693px 2.5777px #fbf8ff;
`;

export const Text = styled.p`
  font-weight: 500;
  font-size: 20px;
  line-height: 1.2;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: ${(props) => (props.top === "top" ? "16px" : "26px")};
`;

export const Button = styled.button`
  display: block;
  width: 196px;
  height: 50px;
  font-family: inherit;
  font-weight: 600;
  font-size: 18px;
  line-height: 1.2;
  text-transform: uppercase;
  margin-left: auto;
  margin-right: auto;

  color: ${(props) => props.theme.color.secondaryColor};
  background-color: ${(props) =>
    props.state ? props.theme.color.accentColor : props.theme.color.bgBtn};
  box-shadow: 0px 3.43693px 3.43693px rgba(0, 0, 0, 0.25);
  border-radius: 10.3108px;

  transition: background-color 250ms linear;

  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.color.accentColor};
  }
`;
