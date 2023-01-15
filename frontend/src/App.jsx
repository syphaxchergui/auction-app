import {
  BrowserRouter,
  redirect,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Login from "./pages/auth/login";
import { isUserRoleAuthorized } from "./utils/security";
import Home from "./pages/home";
import ItemPage from "./pages/itemPage";
import NotFound from "./pages/notFound";
import Layout from "./layout";
import { AuthProvider, useAuth } from "./state/context/AuthContext.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { PRIMARY } from "./constant/colors";
import { UserProvider } from "./state/context/UserContext";
import NotificationProvider from "./state/context/NotificationContext";
import { CssBaseline } from "@mui/material";
import ItemPageAdmin from "./pages/itemPageAdmin";
import NewItem from "./pages/newItem";

const primaryTheme = createTheme({
  palette: {
    primary: {
      main: PRIMARY,
    },
  },
});

function isMustLoginFirst({ loggedin, userRole }) {
  return loggedin === false || !isUserRoleAuthorized(userRole);
}

const App = () => {
  const { loggedin, user } = useAuth();

  const mustLogin = isMustLoginFirst({
    loggedin: loggedin,
    userRole: user?.role,
  });

  if (mustLogin) return <Login />;

  if (user?.role === "ADMIN")
    return (
      <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/items/:slug" element={<ItemPageAdmin />} />
          <Route path="/new-item" element={<NewItem />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    );

  return (
    <Routes>
      <Route exact path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/items/:slug" element={<ItemPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default () => (
  <ThemeProvider theme={primaryTheme}>
    <BrowserRouter>
      <NotificationProvider>
        <AuthProvider>
          <UserProvider>
            <CssBaseline />
            <App />
          </UserProvider>
        </AuthProvider>
      </NotificationProvider>
    </BrowserRouter>
  </ThemeProvider>
);
