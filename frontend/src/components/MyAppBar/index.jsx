import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { ListItemIcon, ListItemText } from "@mui/material";
import { Person, Settings } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../state/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { PRIMARY, PRIMARY_LIGHT_1 } from "../../constant/colors";
import { isAdmin } from "../../utils/security";

function CustomAppBar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user, actions } = useAuth();
  const navigate = useNavigate();

  const goToSettings = () => {
    navigate("/settings", { replace: true });
    handleCloseUserMenu();
  };

  const goToProfile = () => {
    navigate("/profile", { replace: true });
    handleCloseUserMenu();
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        borderBottomWidth: 2,
        borderStyle: "solid",
        borderColor: "#f0f0f0",
        mb: 4,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link
            style={{
              flexGrow: 1,
              textDecoration: "none",
              color: PRIMARY,
            }}
            to="/"
          >
            <h2>⚡BID</h2>
          </Link>

          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <p>{user.fullname}</p>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {isAdmin(user?.role) ? null : (
                <div>
                  <MenuItem onClick={goToProfile}>
                    <ListItemIcon>
                      <Person fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Profile</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={goToSettings}>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Settings</ListItemText>
                  </MenuItem>
                </div>
              )}
              <MenuItem onClick={actions?.logout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default CustomAppBar;
