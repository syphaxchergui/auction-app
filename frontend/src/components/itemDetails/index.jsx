import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";

import "./styles.css";

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <span>Bid finished</span>;
  } else {
    // Render a countdown
    return (
      <span>
        {days}d {hours}h {minutes}m {seconds}s
      </span>
    );
  }
};

const ItemDetails = ({ item }) => {
  return (
    <Grid container columnSpacing={5}>
      <Grid item xs={12} md={5}>
        <img className="item-d-img" alt={item?.title} src={item?.image} />
      </Grid>

      <Grid
        item
        xs={12}
        md={7}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div className="item-d-time-container">
            <p className="item-d-subtitle-time">Time remaining</p>
            {/* <h1 className="item-d-time"> 0d 1h 23m 45s</h1> */}
            <h1 className="item-d-time">
              <Countdown
                renderer={renderer}
                date={new Date(new Date(item?.expirationDate))}
              />
            </h1>
            <p className="item-d-time-finish">
              Finish date {new Date(item?.expirationDate).toLocaleString()}
            </p>
          </div>
          <h1 className="item-d-title">{item?.title}</h1>
          <p className="item-d-subtitle">Description</p>
          <p className="item-d-description">{item?.description}</p>

          <Grid container>
            <Grid item xs={6}>
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
          <TextField
            fullWidth
            size="midium"
            placeholder={`Min bid: $${item?.minBid}`}
          />
          <Button
            disableElevation
            sx={{ width: 200, ml: 2, height: 56 }}
            variant="contained"
          >
            Place Bid
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default ItemDetails;
