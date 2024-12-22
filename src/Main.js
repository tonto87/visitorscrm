import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AppPaths } from "./constants/appPaths";

import UsersAdd from "./components/Pages/Users/UsersAdd";
import UsersAll from "./components/Pages/Users/UsersAll";
import UsersEdit from "./components/Pages/Users/UsersEdit";

import OfficerAdd from "./components/Pages/Officers/OfficerAdd";
import OfficerAll from "./components/Pages/Officers/OfficerAll";
import OfficerEdit from "./components/Pages/Officers/OfficerEdit";

import Dashboard from "./components/dashboard";
import Sidebar from "./components/Sidebar";
import Header from "./components/header";

import OfficesAdd from "./components/Pages/Offices/OfficeAdd";
import OfficesAll from "./components/Pages/Offices/OfficeAll";
import OfficeEdit from "./components/Pages/Offices/OfficeEdit";

import DepartmentEdit from "./components/Pages/Departments/DepartmentEdit";
import DepartmentsAdd from "./components/Pages/Departments/DepartmentsAdd";
import DepartmentsAll from "./components/Pages/Departments/DepartmentsAll";

import VisitorAdd from "./components/Pages/Visitors/VisitorsAdd";
import VisitorAll from "./components/Pages/Visitors/VisitorsAll";
import VisitorEdit from "./components/Pages/Visitors/VisitorsEdit";
import ComplaintsAll from "./components/Pages/Visitors/Complaints/ComplaintsAll";
import ComplaintsPage from "./components/Pages/Visitors/Complaints/ComplaintsPage";
import VisitorsView from "./components/Pages/Visitors/VisitorsView";

import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/Pages/Errors/404Error";

import Profile from "./components/Pages/Profile/Profie";
import { isAdmin } from "@helpers/userHelpers";

function Main() {
  const [isCollapsedSideBar, setIsCollapsedSideBar] = useState(false);

  return (
    <div className="app">
      {isAdmin() && (
        <Sidebar
          isCollapsed={isCollapsedSideBar}
          onToggleCollapse={setIsCollapsedSideBar}
        />
      )}
      <div
        className={`main ${isCollapsedSideBar ? "main--partial" : ""} ${isAdmin() ? "" : "main--full"}`}
      >
        <Header
          isCollapsedSideBar={isCollapsedSideBar}
          isSidebarHidden={!isAdmin()}
        />
        <div className="content">
          <Routes>
            <Route path={AppPaths.dashboard} element={<Dashboard />} />
            <Route
              path={AppPaths.departments.add}
              element={<ProtectedRoute element={<DepartmentsAdd />} />}
            />
            <Route
              path={AppPaths.departments.all}
              element={<ProtectedRoute element={<DepartmentsAll />} />}
            />
            <Route
              path={AppPaths.departments.edit}
              element={<ProtectedRoute element={<DepartmentEdit />} />}
            />
            <Route
              path={AppPaths.offices.add}
              element={<ProtectedRoute element={<OfficesAdd />} />}
            />
            <Route
              path={AppPaths.offices.all}
              element={<ProtectedRoute element={<OfficesAll />} />}
            />
            <Route
              path={AppPaths.offices.edit}
              element={<ProtectedRoute element={<OfficeEdit />} />}
            />
            <Route path={AppPaths.visitors.add} element={<VisitorAdd />} />
            <Route path={AppPaths.visitors.all} element={<VisitorAll />} />
            <Route path={AppPaths.visitors.edit} element={<VisitorEdit />} />
            <Route path={AppPaths.visitors.view} element={<VisitorsView />} />
            <Route
              path={AppPaths.visitors.complaint}
              element={<ProtectedRoute element={<ComplaintsAll />} />}
            />
            <Route
              path={AppPaths.visitors.complaintspage}
              element={<ComplaintsPage />}
            />

            <Route
              path={AppPaths.users.add}
              element={<ProtectedRoute element={<UsersAdd />} />}
            />
            <Route
              path={AppPaths.users.all}
              element={<ProtectedRoute element={<UsersAll />} />}
            />
            <Route
              path={AppPaths.users.edit}
              element={<ProtectedRoute element={<UsersEdit />} />}
            />

            <Route
              path={AppPaths.officers.add}
              element={<ProtectedRoute element={<OfficerAdd />} />}
            />
            <Route
              path={AppPaths.officers.all}
              element={<ProtectedRoute element={<OfficerAll />} />}
            />
            <Route
              path={AppPaths.officers.edit}
              element={<ProtectedRoute element={<OfficerEdit />} />}
            />

            <Route path={AppPaths.profile} element={<Profile />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Main;
