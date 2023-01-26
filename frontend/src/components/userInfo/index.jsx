import { Avatar } from "@mui/material";
import { Box } from "@mui/system";
import { useAuth } from "../../state/context/AuthContext";

const UserInfo = ({ userName, email }) => {
  const { user } = useAuth();
  return (
    <Box sx={{ display: "flex", alignItems: "center", my: 4 }}>
      <Avatar sx={{ height: 100, width: 100, mr: 3 }} alt="User" />
      <Box>
        <h3>{user?.fullname}</h3>
        <p>{user?.email}</p>
      </Box>
    </Box>
  );
};

export default UserInfo;
