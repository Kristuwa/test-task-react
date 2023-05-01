import {
  Button,
  ButtonsContainer,
  DropDownContainer,
} from "./DropDownMenu.styled";
import { setFilter } from "../../redux/filter/filtersSlice";
import { useDispatch, useSelector } from "react-redux";
import { getFilters } from "../../redux/selectors";

const buttons = ["Show all", "Follow", "Following"];

export const DropDownMenu = ({ handleDropdownMenu, isOpen }) => {
  const select = useSelector(getFilters);
  const dispatch = useDispatch();

  return (
    <ButtonsContainer>
      <p>Filter :</p>
      <Button active="active" type="button" onClick={handleDropdownMenu}>
        {select}
      </Button>
      {isOpen && (
        <DropDownContainer>
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
        </DropDownContainer>
      )}
    </ButtonsContainer>
  );
};
