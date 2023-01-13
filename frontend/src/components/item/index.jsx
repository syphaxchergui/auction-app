import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PRIMARY_LIGHT_1 } from "../../constant/colors";
import "./styles.css";

const Item = () => {
  const navigate = useNavigate();
  const slug = "test-product";
  const goToDetails = () => {
    navigate(`/items/${slug}`);
  };
  return (
    <Box className="item-container">
      <img
        className="item-img"
        src={
          "https://cdn.pixabay.com/photo/2022/11/14/20/14/compass-7592447_960_720.jpg"
        }
      />
      <Box className="item-bottom-container">
        <div style={{ flexGrow: 1 }}>
          <h4>Product no1</h4>
          <p>Min bid: 3$</p>
        </div>
        <h1 style={{ color: PRIMARY_LIGHT_1, margin: 0 }}>12$</h1>
      </Box>
      <Button
        sx={{ mt: 2, mb: 0.75 }}
        fullWidth
        variant="contained"
        onClick={goToDetails}
      >
        Bid now
      </Button>
    </Box>
  );
};

export default Item;
