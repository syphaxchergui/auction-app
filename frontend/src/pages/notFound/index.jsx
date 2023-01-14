import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <h1 style={{ marginBottom: "0.5em", fontSize: "10em" }}>404</h1>
      <p style={{ marginBottom: "1em", fontSize: "2em" }}>Page not found</p>

      <Button
        variant="contained"
        sx={{ width: 300, mt: 2 }}
        disableElevation
        onClick={() => navigate("/")}
      >
        Go back
      </Button>
    </Box>
  );
};

export default NotFound;
