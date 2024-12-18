import React, { useEffect } from "react";
import { Navbar, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { AppPaths } from "../../constants/appPaths";
// import { isUser } from "../../helpers/userHelpers";
import LogoutButton from "../LogoutButton";
import { logout } from "../../api/authApi";
// import NotificationBell from "../Notifications/NotificationBell";
import { FaUserCircle } from "react-icons/fa";
import "./header.scss";
import { useDispatch } from "react-redux";

const ref = React.createRef();
const Header = ({ isCollapsedSideBar, isSidebarHidden }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const header = ref.current;
    const placeholder = document.createElement("div");

    const updateHeaderSticky = () => {
      if (
        document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50
      ) {
        placeholder.style.height = `${header.offsetHeight}px`;
        header.parentNode.insertBefore(placeholder, header);
        header.classList.add("header--sticky");
      } else {
        placeholder.style.height = "0";
        if (placeholder.parentNode) {
          placeholder.parentNode.removeChild(placeholder);
        }
        header.classList.remove("header--sticky");
      }
    };

    window.addEventListener("scroll", updateHeaderSticky);
    return () => {
      window.removeEventListener("scroll", updateHeaderSticky);
    };
  }, []);

  const handleLogout = async () => {
    await logout(dispatch);
    window.localStorage.removeItem("token");
    navigate(AppPaths.login);
  };

  return (
    <div
      className={`header ${isCollapsedSideBar ? "header--partial" : ""} ${isSidebarHidden ? "header--full" : ""}`}
      ref={ref}
    >
      <Navbar className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href={AppPaths.dashboard}>Access Control</Navbar.Brand>
          <Navbar.Toggle />

          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className="d-flex gap-4 flex-row">
              {/* {!isUser() && <NotificationBell />} */}
              <Link
                to={AppPaths.profile}
                className="profile-header-profile-link"
              >
                <FaUserCircle size={28} color="#000" />
              </Link>
              <LogoutButton onClick={handleLogout} />
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
