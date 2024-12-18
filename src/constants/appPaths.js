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

  visitors: {
    add: "/visitors/add",
    all: "/visitors",
    complaint: "/visitors/report",
    edit: "/visitors/edit/:id",
    view: "/visitors/view/:id",
    complaintspage: "/visitors/complaints/:id",
  },

  persona: {
    add: "/persona/add",
    all: "/persona",
  },

  errors: {
    notfound: "/404",
    forbidden: "/403",
  },

  profile: "/profile",
};
