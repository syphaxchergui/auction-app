import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiMiddleware from "../../core/API";
import useToken from "../../hooks/useToken";
import { useNotifications } from "./NotificationContext";

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
  const { actions: notify } = useNotifications();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.loggedin) storeToken({ user: undefined, token: undefined });
    else storeToken({ user: state.user, token: state.token });
  }, [state.loggedin]);

  useLayoutEffect(() => {
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
      const result = await ApiMiddleware.post("/auth/login", {
        email,
        password,
      });

      if (result.data.success) {
        setState({
          ...state,
          user: result.data.user,
          token: result.data.token,
          loading: false,
          loggedin: true,
          error: "",
        });
      } else {
        notify?.error(result.data.message);
        setState({
          ...state,
          loading: false,
          loggedin: false,
          error: result.data.message,
        });
      }
    } catch (err) {
      // console.log(err);
      setState({
        ...state,
        loading: false,
        loggedin: false,
        error: err?.response?.data?.message || err.message,
      });
      notify?.error(err?.response?.data?.message || err.message);
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
      navigate("/");
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
