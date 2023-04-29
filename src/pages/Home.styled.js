import styled from "styled-components";

import bg from "../img/bg.png";
import bg2x from "../img/bg@2x.png";

export const ContainerHome = styled.section`
  padding: 30px 15px;
`;

export const Title = styled.h1`
  margin-bottom: 30px;
  text-align: center;
  font-weight: 500;
  font-size: 36px;
  line-height: 1.2;
  text-transform: uppercase;
`;

export const BottomText = styled.p`
  font-weight: 400;
  font-size: 20px;
  line-height: 1.2;
  text-align: center;
`;

export const ImageAvatar = styled.picture`
  position: absolute;
  top: -36px;
  left: 150px;
`;

export const CardContainer = styled.div`
  width: 380px;
  height: 460px;
  padding: 20px 0 36px;
  margin-left: auto;
  margin-right: auto;

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
