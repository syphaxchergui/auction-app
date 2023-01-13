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

const primaryTheme = createTheme({
  palette: {
    primary: {
      main: PRIMARY,
    },
    secondary: {
      main: "#000",
    },
  },
  shadows: "none",
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
  <BrowserRouter>
    <ThemeProvider theme={primaryTheme}>
      <AuthProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);