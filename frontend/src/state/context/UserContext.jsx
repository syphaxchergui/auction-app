import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const VIEW_TYPES = ["GRID", "LIST"];

const initialState = {
  pagination: {
    currentPage: 1,
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

  const { loggedin } = useAuth();

  //   const getUsers = async ({ page, limit }, filters) => {
  //     setState({ ...state, loading: true });
  //     try {
  //       const { data: User, count } = await UserServiceInstance.fetchUsers(
  //         {
  //           page,
  //           limit,
  //         },
  //         filters,
  //       );
  //       setState({
  //         ...state,
  //         selectedCount: 0,
  //         User: User.map((app) => ({ data: app, selected: false })),
  //         pagination: {
  //           ...state.pagination,
  //           total: count,
  //         },
  //         loading: false,
  //         lastUpdated: new Date(),
  //         error: null,
  //       });
  //     } catch (err) {
  //       setState({ ...state, loading: false, error: err.message });
  //     }
  //   };

  const setPage = (newPage) => {
    setState({
      ...state,
      pagination: { ...state.pagination, currentPage: newPage },
    });
  };

  const nextPage = () => setPage(state.pagination.currentPage + 1);

  const previousPage = () => setPage(state.pagination.currentPage - 1);

  //   useEffect(() => {
  //     if (loggedin) getUsers({ page: 1, limit: state.pagination.limit }, filters);
  //   }, [loggedin]);

  //pagination
  //   useEffect(() => {
  //     if (!state.loading)
  //       getUsers({ page: state.pagination.currentPage, limit: state.pagination.limit }, filters);
  //   }, [state.pagination.currentPage, state.pagination.limit]);

  //token upadte

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
