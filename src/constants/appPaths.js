export const AppPaths = {
  dashboard: "/",
  login: "/login",
  logout: "/logout",

  offices: {
    all: "/offices",
    add: "/offices/add",
    edit: "/offices/edit/:id",
  },

  departments: {
    all: "/departments/list",
    add: "/departments/add",
    edit: "/departments/edit/:id",
  },

  users: {
    all: "/users",
    add: "/users/add",
    edit: "/users/edit/:id",
  },

  officers: {
    all: "/officers",
    add: "/officers/add",
    edit: "/officers/edit/:id",
  },

  applications: {
    add: "/applications/add",
    all: "/applications",
    complaint: "/applications/report",
    edit: "/applications/edit/:id",
    view: "/applications/view/:id",
    complaintspage: "/applications/complaints/:id",
  },

  errors: {
    notfound: "/404",
    forbidden: "/403",
  },
  reports: "/reports",
  profile: "/profile",
};
