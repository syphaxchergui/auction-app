import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";

const initialState = {
  user: null,
  token: null,
  loading: false,
  loggedin: undefined,
  error: "",
};

const AuthContext = React.createContext(initialState);

// Provider should be applied at the top level
export const AuthProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const [storedToken, storeToken] = useToken("_token");

  useEffect(() => {
    if (!state.loggedin) storeToken({ user: undefined, token: undefined });
    else storeToken({ user: state.user, token: state.token });

    console.log(state);
  }, [state.loggedin]);

  // useEffect(() => {
  //   if (state.loggedin) storeToken({ user: state.user, token: state.token });
  //   else storeToken(undefined);
  // }, [state.loggedin]);

  useEffect(() => {
    if (storedToken?.user == undefined && storedToken?.token == undefined)
      setState({ ...state, loggedin: false, error: "" });
    else setState({ ...storedToken, loggedin: true, error: "" });
  }, []);

  // Actions

  const loginWithEmailAndPassword = async ({ email, password }) => {
    setState({
      ...state,
      loading: true,
    });
    try {
      const data = {
        user: {
          userName: "user 1",
          email: email,
          role: "ADMIN",
        },
        token: "asdghjdsafkjkjfdhjhjflkjdsahj",
      };
      setState({
        ...state,
        ...data,
        loading: false,
        loggedin: true,
      });
    } catch (err) {
      setState({
        ...state,
        loading: false,
        loggedin: false,
        error: err.message,
      });
    }
  };

  const logout = async (token) => {
    setState({
      ...state,
      loading: true,
    });
    try {
      const data = {
        user: null,
        token: null,
      };
      setState({ ...state, ...data, loading: false, loggedin: false });
    } catch (err) {
      setState({ ...state, loading: false, error: err.message });
    }
  };
  const authToken = () => `Bearer ${state.token}`;
  return (
    <AuthContext.Provider
      value={{
        ...state,
        actions: {
          loginWithEmailAndPassword,
          logout,
          authToken,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/// Hook to be able to access this context
export const useAuth = () => React.useContext(AuthContext);
