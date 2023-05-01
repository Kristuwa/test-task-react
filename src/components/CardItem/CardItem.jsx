import { useCallback, useMemo } from "react";
import {
  CardContainer,
  Image,
  ImageBackground,
  Text,
  Button,
  Logo,
} from "./CardItem.styled";
import logo from "../../img/logo.svg";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/users/usersSlice";

export const CardItem = ({ following, avatar, tweets, followersCount, id }) => {
  const dispatch = useDispatch();

  const handleClickFollow = useCallback(() => {
    dispatch(updateUser(id));
  }, [dispatch, id]);

  const followersString = useMemo(() => {
    if (followersCount < 1000) {
      return followersCount.toString();
    } else {
      return `${followersCount.toString().slice(0, -3)},${followersCount
        .toString()
        .slice(-3)}`;
    }
  }, [followersCount]);

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
      <Button
        type="button"
        state={following}
        onClick={() => handleClickFollow(id)}
      >
        {following ? "Following" : "Follow"}
      </Button>
    </CardContainer>
  );
};
