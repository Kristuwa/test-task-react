import { useCallback, useEffect, useMemo, useState } from "react";
import { CardItem } from "../components/CardItem/CardItem";

import axios from "axios";
import { List, LoadMore, Message } from "./Tweets.styled";

function MainPage() {
  const [users, setUsers] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [userList, setUsersList] = useState(users.slice(0, 3));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const BASE_URL = "https://644a5975a8370fb3214bd036.mockapi.io/api/v1/users";

    const getUsers = async () => {
      setLoading(true);
      try {
        const result = await axios.get(BASE_URL);
        const { data } = result;
        setUsers(data);
        const totalPages = Math.ceil(data.length / 3);
        setPages(totalPages);
        setLoading(false);
        setUsersList([]);
      } catch (error) {
        setLoading(false);
        setError(error.message);
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
    if (currentPage >= 1) {
      const newList = users.slice(startUserIndex, endUserIndex);
      setUsersList((prevState) => [...prevState, ...newList]);
    }
  }, [endUserIndex, startUserIndex, users, setUsersList, currentPage]);

  return (
    <>
      {users.length > 0 && !error && !loading && (
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
      {!error && loading && <Message>Loading....</Message>}
      {error && !loading && <Message>{error}</Message>}
    </>
  );
}

export default MainPage;
