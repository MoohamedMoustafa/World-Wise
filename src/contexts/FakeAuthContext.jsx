import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const initialState = {
  isLogedin: false,
  userData: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, isLogedin: true, userData: action.payload };
    case "logout":
      return { ...state, isLogedin: false, userData: null };
    default:
      throw new Error("unKnown action type in AuthContextProvider");
  }
}
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
export default function AuthContextProvider({ children }) {
  const [{ isLogedin, userData }, dispatch] = useReducer(reducer, initialState);
  function login(email, password) {
    if(email === FAKE_USER.email && password === FAKE_USER.password) {
        dispatch({type: "login", payload: FAKE_USER});
        
    }
  }

  function logout() {
    dispatch({type: "logout"});
  }

  return (
    <AuthContext.Provider value={(login, logout, isLogedin, userData)}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuthContext was used outside AuthContextProvider");
  return context;
}
