import { LOGIN_ADMIN, REGISTER_ADMIN, AUTH_ADMIN } from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_ADMIN:
      return { ...state, loginSuccess: action.payload };

    case REGISTER_ADMIN:
      return { ...state, register: action.payload };

    case AUTH_ADMIN:
      return { ...state, adminData: action.payload };

    default:
      return state;
  }
}
