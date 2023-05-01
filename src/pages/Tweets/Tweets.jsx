import { useCallback, useEffect, useMemo, useState } from "react";
import { CardItem } from "../../components/CardItem/CardItem";
import axios from "axios";
import { List, LoadMore, Message } from "./Tweets.styled";
import { useDispatch, useSelector } from "react-redux";
import { getFilters, getUsers } from "../../redux/selectors";
import { addUsers } from "../../redux/users/usersSlice";

import { getFollowingUsers } from "../../helpers/function";
import { DropDownMenu } from "../../components/DropDownMenu/DropDownMenu";

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
  const endUserIndex = useMemo(() => (currentPage - 1) * 3 + 3, [currentPage]);

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
    setUsersOnPage(usersList.slice(0, endUserIndex));
  }, [endUserIndex, usersList]);

  useEffect(() => {
    localStorage.setItem("currentPage", JSON.stringify(currentPage));
  }, [currentPage]);

  return (
    <main>
      {followingUsers.length > 0 && !error && !loading && (
        <>
          <DropDownMenu
            handleDropdownMenu={handleDropdownMenu}
            isOpen={openMenu}
          />
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
