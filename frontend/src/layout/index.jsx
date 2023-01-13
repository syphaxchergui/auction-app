import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import CustomAppBar from "../components/MyAppBar";

const Layout = () => {
  return (
    <>
      <CustomAppBar />
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
