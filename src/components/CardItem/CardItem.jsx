import { useEffect, useMemo, useState } from "react";
import {
  CardContainer,
  Image,
  ImageBackground,
  Text,
  Button,
  Logo,
} from "./CardItem.styled";
import logo from "../../img/logo.svg";

export const CardItem = ({ tweets, avatar, followers, id }) => {
  const [following, setFollowing] = useState(() => {
    const storage = JSON.parse(localStorage.getItem("followingUsers"));
    if (storage === null) {
      return false;
    }
    const user = storage.find((item) => item.id === id);
    return user ? user.following : false;
  });

  const [followersCount, setFollowersCount] = useState(() => {
    const storage = JSON.parse(localStorage.getItem("followingUsers"));
    if (storage === null) {
      return followers;
    }
    const user = storage.find((item) => item.id === id);
    return user ? Number(user.followersCount) : followers;
  });

  const handleClickFollow = () => {
    setFollowing((prevState) => !prevState);
    if (!following) {
      setFollowersCount((prevState) => Number(prevState) + 1);
    } else {
      setFollowersCount((prevState) => Number(prevState) - 1);
    }
  };

  const followersString = useMemo(() => {
    if (followersCount < 1000) {
      return followersCount.toString();
    } else {
      return `${followersCount.toString().slice(0, -3)},${followersCount
        .toString()
        .slice(-3)}`;
    }
  }, [followersCount]);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("followingUsers"));
    if (storage === null) {
      localStorage.setItem(
        `followingUsers`,
        JSON.stringify([{ id, following, followersCount, tweets, avatar }])
      );
    } else {
      const index = storage.findIndex((item) => item.id === id);
      if (index === -1) {
        storage.push({ id, following, followersCount, tweets, avatar });
      } else {
        storage.splice(index, 1, {
          id,
          following,
          followersCount,
          tweets,
          avatar,
        });
      }

      localStorage.setItem(`followingUsers`, JSON.stringify(storage));
    }
  }, [followersCount, following, tweets, avatar, id]);

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
