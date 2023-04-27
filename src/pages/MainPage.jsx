import { useCallback, useEffect, useMemo, useState } from "react";
import { CardItem } from "../components/CardItem/CardItem";

import axios from "axios";
import { List, LoadMore } from "./MainPage.styled";

function MainPage() {
  const [users, setUsers] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [userList, setUsersList] = useState([]);

  useEffect(() => {
    const BASE_URL = "https://644a5975a8370fb3214bd036.mockapi.io/api/v1/users";

    const getUsers = async () => {
      try {
        const result = await axios.get(BASE_URL);
        const { data } = result;
        setUsers(data);
        const totalPages = Math.ceil(data.length / 3);
        setPages(totalPages);
      } catch (error) {
        console.error(error);
      }
    };

    getUsers();
  }, []);

  const handleLoadMore = useCallback(() => {
    setCurrentPage((prevPage) => prevPage + 1);
  }, []);

  const startUserIndex = useMemo(() => (currentPage - 1) * 3, [currentPage]);
  const endUserIndex = useMemo(() => startUserIndex + 3, [startUserIndex]);

  useEffect(() => {
    const newList = users.slice(startUserIndex, endUserIndex);
    setUsersList((prevState) => [...prevState, ...newList]);
  }, [endUserIndex, startUserIndex, users]);

  return (
    <>
      {users.length > 0 && (
        <>
          <List>
            {userList.map(({ id, user, avatar, tweets, followers }) => (
              <CardItem
                key={id}
                user={user}
                avatar={avatar}
                tweets={tweets}
                followers={followers}
              />
            ))}
          </List>
          {pages > 1 && currentPage < pages && (
            <LoadMore type="button" onClick={handleLoadMore}>
              Load More
            </LoadMore>
          )}
        </>
      )}
    </>
  );
}

export default MainPage;
