import { useCallback, useEffect, useMemo, useState } from "react";
import { CardItem } from "../components/CardItem/CardItem";
import axios from "axios";
import {
  List,
  LoadMore,
  Message,
  ButtonsContainer,
  DropDownMenu,
  Button,
} from "./Tweets.styled";
import { useDispatch, useSelector } from "react-redux";
import { getFilters, getUsers } from "../redux/selectors";
import { addUsers } from "../redux/users/usersSlice";
import { setFilter } from "../redux/filter/filtersSlice";
import { getFollowingUsers } from "../helpers/function";

const buttons = ["Show all", "Follow", "Following"];

function Tweets() {
  const [currentPage, setCurrentPage] = useState(() => {
    const storage = JSON.parse(localStorage.getItem("currentPage"));
    return storage === null ? 1 : Number(storage);
  });
  const [openMenu, setOpenMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const usersList = useSelector(getUsers);
  const select = useSelector(getFilters);
  const totalPages = Math.ceil(usersList.length / 3);

  const startUserIndex = useMemo(() => (currentPage - 1) * 3, [currentPage]);
  const endUserIndex = useMemo(() => startUserIndex + 3, [startUserIndex]);

  const [usersOnPage, setUsersOnPage] = useState(
    usersList.slice(0, endUserIndex)
  );

  const followingUsers = getFollowingUsers(usersOnPage, select);

  useEffect(() => {
    const BASE_URL = "https://644a5975a8370fb3214bd036.mockapi.io/api/v1/users";

    const getUsers = async () => {
      setLoading(true);
      try {
        const result = await axios.get(BASE_URL);
        const { data } = result;

        const newData = data.map((item) => ({
          id: item.id,
          avatar: item.avatar,
          tweets: item.tweets,
          following: false,
          followersCount: item.followers,
        }));
        dispatch(addUsers(newData));

        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };
    if (usersList.length === 0) {
      getUsers();
    }
  }, [dispatch, usersList]);

  const handleLoadMore = useCallback(() => {
    setCurrentPage((prevPage) => prevPage + 1);
  }, []);

  const handleDropdownMenu = useCallback(() => {
    setOpenMenu((prevPage) => !prevPage);
  }, []);

  useEffect(() => {
    const newList = usersList.slice(startUserIndex, endUserIndex);

    setUsersOnPage((prevState) => {
      const filteredList = prevState.filter(
        (item) => !newList.some((newItem) => newItem.id === item.id)
      );

      const combinedList = [...filteredList, ...newList];

      const isSameState =
        JSON.stringify(
          combinedList.map((item) => item.id && item.following)
        ) ===
        JSON.stringify(prevState.map((item) => item.id && item.following));

      return isSameState ? prevState : combinedList;
    });
  }, [usersList, startUserIndex, endUserIndex]);

  useEffect(() => {
    localStorage.setItem("currentPage", JSON.stringify(currentPage));
  }, [currentPage]);

  return (
    <main>
      <ButtonsContainer>
        <p>Filter :</p>
        <Button active="active" type="button" onClick={handleDropdownMenu}>
          {select}
        </Button>
        {openMenu && (
          <DropDownMenu>
            {buttons.map((button) => {
              return (
                <li key={button}>
                  <Button
                    type="button"
                    onClick={() => {
                      handleDropdownMenu();
                      dispatch(setFilter(button));
                    }}
                  >
                    {button}
                  </Button>
                </li>
              );
            })}
          </DropDownMenu>
        )}
      </ButtonsContainer>
      {followingUsers.length > 0 && !error && !loading && (
        <>
          <List>
            {followingUsers.map(
              ({ id, following, avatar, tweets, followersCount }) => (
                <CardItem
                  key={id}
                  avatar={avatar}
                  tweets={tweets}
                  following={following}
                  followersCount={followersCount}
                  id={id}
                />
              )
            )}
          </List>
          {totalPages > 1 && currentPage < totalPages && (
            <LoadMore type="button" onClick={handleLoadMore}>
              Load More
            </LoadMore>
          )}
        </>
      )}
      {!error && loading && <Message>Loading....</Message>}
      {error && !loading && <Message>{error}</Message>}
    </main>
  );
}

export default Tweets;
