// import React, { useEffect, useState, useCallback } from "react";
// import toast, { Toaster } from "react-hot-toast";

// const NotificationContext = React.createContext();

// export default function NotificationProvider({ children }) {
//   const success = (body) => toast.success(body);
//   const error = (body) => toast.error(body);
//   const info = (body) => toast.success(body);

//   return (
//     <NotificationContext.Provider
//       value={{
//         actions: {
//           error,
//           success,
//           info,
//         },
//       }}
//     >
//       {children}
//     </NotificationContext.Provider>
//   );
// }

// export const useNotifications = () => React.useContext(NotificationContext);

import React, { useEffect, useState, useCallback } from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
// import { useSnackbar } from "notistack";

const NotificationContext = React.createContext();

export default function NotificationProvider({ children }) {
  //   const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState({
    open: false,
    body: "",
  });

  const success = (body) => {
    setState({ open: true, body });
    //enqueueSnackbar(body, { variant: "success" });
  };
  const error = (body) => {
    setState({ open: true, body });
    //enqueueSnackbar(body, { variant: "error" });
  };
  const info = (body) => {
    setState({ open: true, body });
    //enqueueSnackbar(body);
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <NotificationContext.Provider
      value={{
        ...state,
        actions: {
          error,
          success,
          info,
        },
      }}
    >
      {children}
      <Snackbar
        open={state.open}
        autoHideDuration={4000}
        onClose={handleClose}
        message={state.body}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => React.useContext(NotificationContext);
