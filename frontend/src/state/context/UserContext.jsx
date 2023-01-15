import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const VIEW_TYPES = ["GRID", "LIST"];

const initialState = {
  pagination: {
    currentPage: 0,
    limit: 10,
    total: 0,
  },
  selectedCount: 0,
  loading: true,
  selectedUserIndex: 0,
  error: "",
  viewType: "GRID",
};

const UserContext = React.createContext(initialState);

// Provider should be applied at the top level
export const UserProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const setPage = (newPage) => {
    setState({
      ...state,
      pagination: { ...state.pagination, currentPage: newPage },
    });
  };

  const nextPage = () => setPage(state.pagination.currentPage + 1);

  const previousPage = () => setPage(state.pagination.currentPage - 1);

  const setLoading = async (loadingStatus) => {
    setState({ ...state, loading: loadingStatus });
  };

  function setViewType(type) {
    setState({ ...state, viewType: type });
  }
  return (
    <UserContext.Provider
      value={{
        ...state,
        actions: {
          setPage,
          nextPage,
          previousPage,
          setLoading,
          setViewType,
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

/// Hook to be able to access this context
export const useUser = () => React.useContext(UserContext);
