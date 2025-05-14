import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const initialState = {
  isLoggedin: false,
  userData: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, isLoggedin: true, userData: action.payload };
    case "logout":
      return { ...state, isLoggedin: false, userData: null };
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
  const [{ isLoggedin, userData }, dispatch] = useReducer(reducer, initialState);
   function login(email, password) {    
    if(email === FAKE_USER.email && password === FAKE_USER.password) {
        dispatch({type: "login", payload: FAKE_USER});
    } else {
      console.log("incorrect login");
      
    }
  }

  function logout() {
    dispatch({type: "logout"});
    console.log("logout");
    
  }

  return (
    <AuthContext.Provider value={{login, logout, isLoggedin, userData}}>
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
