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

const buttons = ["Show all", "Follow", "Following"];

function MainPage() {
  const [users, setUsers] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(() => {
    const storage = JSON.parse(localStorage.getItem("currentPage"));
    if (storage === null) {
      return 1;
    }
    return Number(storage);
  });

  const startUserIndex = useMemo(() => (currentPage - 1) * 3, [currentPage]);
  const endUserIndex = useMemo(() => startUserIndex + 3, [startUserIndex]);

  const [userList, setUsersList] = useState(() => {
    const storage = JSON.parse(localStorage.getItem("followingUsers"));

    if (storage === null) {
      return users.slice(0, 3);
    } else {
      return storage;
    }
  });

  const [openMenu, setOpenMenu] = useState(false);
  const [select, setSelect] = useState("Show all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log("userList", userList);

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

  const handleDropdownMenu = useCallback(() => {
    setOpenMenu((prevPage) => !prevPage);
  }, []);

  useEffect(() => {
    localStorage.setItem("currentPage", JSON.stringify(currentPage));
  }, [currentPage]);

  useEffect(() => {
    if (currentPage >= 1) {
      const newList = users.slice(startUserIndex, endUserIndex);
      setUsersList((prevState) => {
        const filteredList = prevState.filter(
          (item) => !newList.some((newItem) => newItem.id === item.id)
        );
        const combinedList = [...filteredList, ...newList];
        const isSameState =
          JSON.stringify(combinedList.map((item) => item.id)) ===
          JSON.stringify(prevState.map((item) => item.id));
        return isSameState ? prevState : combinedList;
      });
    }
  }, [endUserIndex, startUserIndex, users, setUsersList, currentPage]);

  const filterList = useMemo(() => {
    if (select === "Following") {
      return userList.filter((item) => item.following === true);
    } else if (select === "Follow") {
      return userList.filter((item) => item.following === false);
    } else {
      return userList;
    }
  }, [select, userList]);

  console.log(filterList);

  return (
    <>
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
                      setSelect(button);
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
      {users.length > 0 && !error && !loading && (
        <>
          <List>
            {filterList.length > 0 &&
              filterList.map(({ id, user, avatar, tweets, followers }) => (
                <CardItem
                  key={id}
                  user={user}
                  avatar={avatar}
                  tweets={tweets}
                  followers={followers}
                  id={id}
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
