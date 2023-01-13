import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import "./styles.css";

const ItemDetails = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <img
          className="item-d-img"
          src={
            "https://cdn.pixabay.com/photo/2022/11/14/20/14/compass-7592447_960_720.jpg"
          }
        />
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1 className="item-d-title">Product 1</h1>
          <p className="item-d-subtitle">Description</p>
          <p className="item-d-description">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur
            soluta eos illo autem reiciendis ea? Repellat molestiae nisi et
            velit impedit dolores temporibus a obcaecati, eaque dicta sed
            dignissimos
          </p>
          <div className="item-d-time-container">
            <p className="item-d-subtitle-time">Time remaining</p>
            <h1 className="item-d-time"> 0d 1h 23m 45s</h1>
          </div>
          <Grid container>
            <Grid item xs={6}>
              {" "}
              <p className="item-d-subtitle">Highest bid</p>
              <h1 className="item-d-bid">
                <span className="item-d-bid-dollar">$ </span>350
              </h1>
            </Grid>
            <Grid item xs={6}>
              {" "}
              <p className="item-d-subtitle">Your last bid</p>
              <h1 className="item-d-bid">
                <span className="item-d-bid-dollar">$ </span>-
              </h1>
            </Grid>
          </Grid>
        </div>
        <div className="item-d-bottom-section">
          <TextField fullWidth size="midium" placeholder="Min bid: $ 12" />
          <Button sx={{ width: 200, ml: 2, height: 56 }} variant="contained">
            Place Bid
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default ItemDetails;
