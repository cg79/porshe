const ROUTES = {
  COMPANY_CREATE: "/companies/company-create",
  COMPANIES: "/companies",
  SIGN_IN: "/signin",
  OVERVIEW: "/overview",
  SUPPORT: "/support",
  PROFILE: "/profile",
  CHANGE_PASSWORD: "/changepassword",
  LOGIN_VERIFICATION: "/loginverification",
  RESET_PASSWORD: "/resetpassword",
  FORGOT_PASSWORD: "/forgotpassword",
  KPI: "/kpi",
};

const LOADING_SVG =
  "data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==";

const TEXT_STYLE = {
  width: "20rem",
  minWidth: "300px",
  "& label.Mui-focused": {
    color: "#D3D3D3",
  },
  "& .MuiInputBase-input": {
    color: "#d3d3d3",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#fff",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#D3D3D3",
    },
    "&:hover fieldset": {
      borderColor: "#D3D3D3",
    },
    "& .Mui-focused fieldset": {
      borderColor: "#D3D3D3",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#d3d3d3",
    fontSize: "14px",
  },
};

const BUTTON_STYLE = {
  color: "#fff",
  backgroundColor: "#3B5160",
  borderRadius: "75px",
  width: "250px",
  height: "45px",
  "&:hover": {
    backgroundColor: "#346180",
  },
  ":disabled": {
    color: "#999999",
    background: "#e6e6e6",
    border: "solid 2px transparent",
  },
};

const VERTICAL_DISTANCE = { marginTop: "24px" };

export { ROUTES, LOADING_SVG, TEXT_STYLE, BUTTON_STYLE, VERTICAL_DISTANCE };
