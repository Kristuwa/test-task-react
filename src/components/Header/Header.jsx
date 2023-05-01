import { Link, Logo, Navigate } from "./Header.styled";
import logo from "../../img/logo.svg";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <Navigate>
        <NavLink to="/" end>
          <Logo>
            <img src={logo} alt="logo" width={76} height={22} />
          </Logo>
        </NavLink>
        <div>
          <Link to="/" end>
            Home
          </Link>
          <Link to="/tweets">Tweets</Link>
        </div>
      </Navigate>
    </header>
  );
};
