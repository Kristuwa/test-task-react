import { useState } from "react";
import {
  CardContainer,
  Image,
  ImageBackground,
  Text,
  Button,
  Logo,
} from "./CardItem.styled";
import logo from "../../img/logo.svg";

export const CardItem = ({ tweets, avatar, followers }) => {
  const [following, setFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(followers);

  const handleClickFollow = () => {
    setFollowing((prevState) => !prevState);
    if (!following) {
      setFollowersCount((prevState) => Number(prevState) + 1);
    } else {
      setFollowersCount((prevState) => Number(prevState) - 1);
    }
  };

  let followersString;
  if (followersCount < 1000) {
    followersString = followersCount;
  } else {
    followersString = `${followersCount
      .toString()
      .slice(0, -3)},${followersCount.toString().slice(-3)}`;
  }

  return (
    <CardContainer>
      <Logo>
        <img src={logo} alt="logo" width={76} height={22} />
      </Logo>
      <ImageBackground>
        <Image src={avatar} alt="photo" width={80} height={80} />
      </ImageBackground>
      <Text top="top">{tweets} tweets</Text>
      <Text>{followersString} Followers</Text>
      <Button type="button" state={following} onClick={handleClickFollow}>
        {following ? "Following" : "Follow"}
      </Button>
    </CardContainer>
  );
};
