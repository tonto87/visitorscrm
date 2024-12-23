import React, { useEffect } from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { AppPaths } from "../../constants/appPaths";
// import { isUser } from "../../helpers/userHelpers";
import LogoutButton from "../LogoutButton";
import { logout } from "../../api/authApi";
// import NotificationBell from "../Notifications/NotificationBell";
import { FaUserCircle } from "react-icons/fa";
import "./header.scss";
import { useDispatch } from "react-redux";
import { fetchReports } from "api/reportApi";

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

  // const handleDownload = async () => {
  //   try {
  //     const resp = await fetchReports(); // Fetch the data (which should include the file content, ideally as a blob or binary string)
  //     const blob = new Blob([resp], {
  //       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //     });
  //     console.log(blob.size, blob.type);

  //     const filename = "reports.xlsx";

  //     // Create a URL from the Blob
  //     const url = URL.createObjectURL(blob);

  //     // Create an anchor tag and trigger download
  //     const downloadLink = document.createElement("a");
  //     downloadLink.href = url;
  //     downloadLink.download = filename;
  //     document.body.appendChild(downloadLink);
  //     downloadLink.click();

  //     // Cleanup
  //     URL.revokeObjectURL(url);
  //     document.body.removeChild(downloadLink);
  //   } catch (error) {
  //     console.error("Error downloading the file:", error);
  //   }
  // };

  return (
    <div
      className={`header ${isCollapsedSideBar ? "header--partial" : ""} ${isSidebarHidden ? "header--full" : ""}`}
      ref={ref}
    >
      <Navbar className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href={AppPaths.dashboard}>Access Control</Navbar.Brand>
          {/* <Button onClick={handleDownload} variant="primary">
            Download
          </Button> */}
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
