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

import ApplicationAdd from "./components/Pages/Applications/ApplicationAdd";
import ApplicationAll from "./components/Pages/Applications/ApplicationAll";
import ApplicationEdit from "./components/Pages/Applications/ApplicationEdit";
import ComplaintsAll from "./components/Pages/Applications/Complaints/ComplaintsAll";
import ComplaintsPage from "./components/Pages/Applications/Complaints/ComplaintsPage";
import ApplicationsView from "./components/Pages/Applications/ApplicationView";

import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/Pages/Errors/404Error";

import Profile from "./components/Pages/Profile/Profie";
import { isAdmin } from "@helpers/userHelpers";
import Reports from "@components/Pages/Reports/Reports";

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
            <Route
              path={AppPaths.applications.add}
              element={<ApplicationAdd />}
            />
            <Route
              path={AppPaths.applications.all}
              element={<ApplicationAll />}
            />
            <Route
              path={AppPaths.applications.edit}
              element={<ApplicationEdit />}
            />
            <Route
              path={AppPaths.applications.view}
              element={<ApplicationsView />}
            />
            <Route
              path={AppPaths.applications.complaint}
              element={<ProtectedRoute element={<ComplaintsAll />} />}
            />
            <Route
              path={AppPaths.applications.complaintspage}
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
            <Route
              path={AppPaths.reports}
              element={<ProtectedRoute element={<Reports />} />}
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
