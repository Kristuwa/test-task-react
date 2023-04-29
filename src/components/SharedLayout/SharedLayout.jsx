import { NavLink, Outlet } from "react-router-dom";
import { Container, Header, Logo, Link, Navigate } from "./SharedLayout.styled";
import logo from "../../img/logo.svg";
import { Suspense } from "react";

export const SharedLayout = () => {
  return (
    <Container>
      <Header>
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
      </Header>
      <Suspense fallback={<div>Loading page...</div>}>
        <Outlet />
      </Suspense>
    </Container>
  );
};
