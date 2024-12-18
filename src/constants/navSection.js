import React from "react";
import {
  FaBuilding,
  FaChartBar,
  FaUser,
  FaUsers,
  FaUserTimes,
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
      {
        title: "navigation.personaNonGrata",
        icon: <FaUserTimes />,
        items: [
          { label: "navigation.all", path: AppPaths.persona.all },
          { label: "navigation.add", path: AppPaths.persona.add },
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
    ],
  },
];

export default sections;
