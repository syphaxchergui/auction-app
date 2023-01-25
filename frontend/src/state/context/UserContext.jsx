import React, { useState, useEffect } from "react";

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
  socket: null,
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

  function setSocket(socket) {
    setState({ ...state, socket: socket });
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
          setSocket,
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

/// Hook to be able to access this context
export const useUser = () => React.useContext(UserContext);
