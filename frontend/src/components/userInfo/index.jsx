import { Avatar } from "@mui/material";
import { Box } from "@mui/system";

const UserInfo = ({ userName, email }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", my: 4 }}>
      <Avatar sx={{ height: 100, width: 100, mr: 3 }} alt="User" />
      <Box>
        <h3>{userName}</h3>
        <p>{email}</p>
      </Box>
    </Box>
  );
};

export default UserInfo;
