import {
  ImageBackground,
  Logo,
} from "../../components/CardItem/CardItem.styled";
import {
  ContainerHome,
  Title,
  BottomText,
  ImageAvatar,
  CardContainer,
} from "./Home.styled";
import logo from "../../img/logo.svg";
import boy from "../../img/boy.png";
import boy2x from "../../img/boy@2x.png";

const Home = () => {
  return (
    <main>
      <ContainerHome>
        <CardContainer>
          <Logo>
            <img src={logo} alt="logo" width={76} height={22} />
          </Logo>

          <ImageBackground>
            <ImageAvatar>
              <source
                srcSet={`${boy} 768w, ${boy2x} 1536w`}
                media="(min-width: 768px)"
                sizes="(min-width: 768px) 768px"
              />
              <img src={boy} alt="avatar" width={80} height={80} />
            </ImageAvatar>
          </ImageBackground>
          <Title>Welcome to our app</Title>
          <BottomText>This is tweets.</BottomText>
        </CardContainer>
      </ContainerHome>
    </main>
  );
};

export default Home;
