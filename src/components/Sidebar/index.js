import React, { useMemo, useState } from "react";
import { Navbar, Nav, Offcanvas, Collapse } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  FaChevronDown,
  FaChevronRight,
  FaArrowLeft,
  FaArrowRight,
  FaHome,
  FaBars,
} from "react-icons/fa";
import { NavLink, useLocation, Link, useNavigate } from "react-router-dom";
import sections from "../../constants/navSection";
import LogoutButton from "../LogoutButton";
import "./Sidebar.scss";
import { AppPaths } from "../../constants/appPaths";
import { logout } from "../../api/authApi";
import { useDispatch } from "react-redux";

const Sidebar = ({ isCollapsed, onToggleCollapse }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [activeHover, setActiveHover] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState({});
  const [isMouseOn, setIsMouseOn] = useState(false);

  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleSubmenu = (sectionIndex, departmentIndex) => {
    setOpenSubmenu((prev) => ({
      [`${sectionIndex}-${departmentIndex}`]:
        !prev[`${sectionIndex}-${departmentIndex}`],
    }));
  };

  const hideSidebar = useMemo(() => {
    return isCollapsed && !isMouseOn;
  }, [isCollapsed, isMouseOn]);

  const handleLogout = async () => {
    await logout(dispatch);
    window.localStorage.removeItem("token");
    navigate(AppPaths.login);
  };

  return (
    <div className="sidebar-fixed">
      <div className={`sidebar-header ${hideSidebar ? "collapsed" : ""}`}>
        <button
          onClick={() => onToggleCollapse(!isCollapsed)}
          className="btn btn-secondary btn-sm mb-3 collapse-button"
        >
          {isCollapsed ? <FaArrowRight /> : <FaArrowLeft />}
        </button>
      </div>
      <div
        className="sidebar"
        onMouseLeave={() => setIsMouseOn(false)}
        onMouseOver={() => setIsMouseOn(true)}
      >
        <Navbar
          bg="dark"
          variant="dark"
          expand="lg"
          className="d-lg-none w-100"
        >
          <Navbar.Brand
            href={AppPaths.dashboard}
            className="fw-bold text-white cursor-pointer"
          >
            <FaHome /> {t("navigation.dashboard")}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />
        </Navbar>

        <Offcanvas
          show={show}
          onHide={handleClose}
          className="sidebar-bg text-white"
          placement="start"
          icon={<FaBars />}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">
              {sections.map((section, index) => (
                <SidebarSection
                  key={section.title}
                  section={section}
                  sectionIndex={index}
                  openSubmenu={openSubmenu}
                  toggleSubmenu={toggleSubmenu}
                />
              ))}
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>

        <div
          className={`d-none sidebar-content d-lg-flex flex-column position-relative bg-dark text-white vh-100s 
        ${hideSidebar ? "collapsed-sidebar" : ""}
        `}
          style={{
            width: hideSidebar ? "80px" : "250px",
          }}
        >
          {!hideSidebar && (
            <Navbar.Brand
              as={Link}
              to={AppPaths.dashboard}
              className="fw-bold text-white cursor-pointer mb-3 ms-2"
            >
              <FaHome /> {t("navigation.dashboard")}
            </Navbar.Brand>
          )}
          <Nav className="flex-column">
            {sections.map((section, index) => (
              <SidebarSection
                key={section.title}
                section={section}
                sectionIndex={index}
                isCollapsed={hideSidebar}
                activeHover={activeHover}
                setActiveHover={setActiveHover}
                openSubmenu={openSubmenu}
                toggleSubmenu={toggleSubmenu}
              />
            ))}
          </Nav>
          <LogoutButton
            text={hideSidebar ? null : t("general.logout")}
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};

const SidebarSection = ({
  section,
  sectionIndex,
  isCollapsed,
  setActiveHover,
  openSubmenu,
  toggleSubmenu,
  handleClose,
}) => {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const departments = Array.isArray(section.departments)
    ? section.departments
    : [];

  return (
    <div
      className="position-relative sidebar-section"
      onMouseEnter={() => isCollapsed && setActiveHover(section.title)}
      onMouseLeave={() => isCollapsed && setActiveHover(null)}
    >
      <Nav.Link
        className={`text-white d-flex align-items-center justify-content-between active-section`}
      >
        <div className="d-flex align-items-center">
          {!isCollapsed && t(section.title)}
        </div>
      </Nav.Link>

      <Collapse in={true}>
        <div className="sidebar-collapse-submenu">
          {departments.map((department, departmentIndex) => (
            <div key={department.title}>
              <Nav.Link
                className={`${
                  !isCollapsed &&
                  openSubmenu[`${sectionIndex}-${departmentIndex}`]
                    ? "active"
                    : ""
                } text-white d-flex justify-content-${
                  isCollapsed ? "center" : "between"
                } align-items-center`}
                onClick={() => toggleSubmenu(sectionIndex, departmentIndex)}
              >
                {department.icon}
                {!isCollapsed && t(department.title)}
                {!isCollapsed &&
                  (openSubmenu[`${sectionIndex}-${departmentIndex}`] ? (
                    <FaChevronDown className={`ms-auto`} />
                  ) : (
                    <FaChevronRight className={`ms-auto`} />
                  ))}
              </Nav.Link>
              <Collapse
                in={
                  !isCollapsed &&
                  openSubmenu[`${sectionIndex}-${departmentIndex}`]
                }
              >
                <div onClick={handleClose}>
                  {department.items.map((item) => (
                    <NavLink
                      key={item.label}
                      to={item.path}
                      className={({ isActive }) =>
                        `text-white text-decoration-none d-block py-1 sidebar-link ${pathname === item.path ? "active" : ""}`
                      }
                    >
                      <FaArrowRight />
                      <h4> {t(item.label)}</h4>
                    </NavLink>
                  ))}
                </div>
              </Collapse>
            </div>
          ))}
        </div>
      </Collapse>
    </div>
  );
};

export default Sidebar;
