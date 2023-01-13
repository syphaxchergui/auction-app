import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { ListItemIcon, ListItemText } from "@mui/material";
import { Person3 } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../state/context/AuthContext";

function CustomAppBar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { actions } = useAuth();

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
      sx={{
        borderBottomWidth: 2,
        borderStyle: "solid",
        borderColor: "#f0f0f0",
        mb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <h2 style={{ flexGrow: 1 }}>⚡BID</h2>

          <Box sx={{ flexGrow: 0 }}>
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
              <MenuItem onClick={handleCloseUserMenu}>
                <ListItemIcon>
                  <Person3 fontSize="small" />
                </ListItemIcon>
                <ListItemText>My Profile</ListItemText>
              </MenuItem>
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
