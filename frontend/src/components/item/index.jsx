import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PRIMARY_LIGHT_1 } from "../../constant/colors";
import "./styles.css";

const Item = ({ id, slug, title, minBid, image }) => {
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate(`/items/${slug}`);
  };
  return (
    <Box className="item-container">
      <img className="item-img" src={image} />
      <Box className="item-bottom-container">
        <div
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          <h4>
            {title}
            {title}
            {title}
          </h4>
          <p>Min bid: ${minBid}</p>
        </div>
        {/* <h1 style={{ color: PRIMARY_LIGHT_1, margin: 0 }}>${minBid}</h1> */}
      </Box>
      <Button
        disableElevation
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
