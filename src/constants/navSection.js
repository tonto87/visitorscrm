import React from "react";
import {
  FaBuilding,
  FaChartBar,
  FaFileAlt,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { AppPaths } from "./appPaths";

const sections = [
  {
    title: "navigation.officesDepartments",
    departments: [
      {
        title: "navigation.offices",
        icon: <FaChartBar />,
        items: [
          { label: "navigation.all", path: AppPaths.offices.all },
          { label: "navigation.add", path: AppPaths.offices.add },
        ],
      },
      {
        title: "navigation.departments",
        icon: <FaBuilding />,
        items: [
          { label: "navigation.all", path: AppPaths.departments.all },
          { label: "navigation.add", path: AppPaths.departments.add },
        ],
      },
    ],
  },
  {
    title: "navigation.visitors",
    departments: [
      {
        title: "navigation.visitors",
        icon: <FaUser />,
        items: [
          { label: "navigation.all", path: AppPaths.visitors.all },
          { label: "navigation.add", path: AppPaths.visitors.add },
          { label: "navigation.report", path: AppPaths.visitors.complaint },
        ],
      },
    ],
  },
  {
    title: "navigation.users",
    departments: [
      {
        title: "navigation.users",
        icon: <FaUsers />,
        items: [
          { label: "navigation.all", path: AppPaths.users.all },
          { label: "navigation.add", path: AppPaths.users.add },
        ],
      },
      {
        title: "navigation.officers",
        icon: <FaUsers />,
        items: [
          { label: "navigation.all", path: AppPaths.officers.all },
          { label: "navigation.add", path: AppPaths.officers.add },
        ],
      },
    ],
  },
  {
    title: "navigation.reports",
    departments: [
      {
        title: "navigation.reports",
        icon: <FaFileAlt />,
        items: [
          { label: "navigation.reports", path: AppPaths.reports.reports },
        ],
      },
    ],
  },
];

export default sections;
