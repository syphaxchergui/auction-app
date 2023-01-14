import { LoadingButton } from "@mui/lab";
import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { useNavigate } from "react-router-dom";
import ApiMiddleware from "../../core/API";
import { useAuth } from "../../state/context/AuthContext";
import { useNotifications } from "../../state/context/NotificationContext";

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

const ItemDetails = ({ item, maxBid }) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    amount: "",
  });
  const { user } = useAuth();
  const { actions: notify } = useNotifications();
  const navigate = useNavigate();

  const validateForm = (formData) => {
    const errors = {
      amount: "",
    };
    let hasErrors = false;
    if (formData.amount.length === 0) {
      errors["amount"] = "Amount is required";
      hasErrors = true;
    }

    return { hasErrors, errors };
  };

  const submitBid = async () => {
    const { hasErrors, errors } = validateForm({ amount });
    if (hasErrors) {
      setFormErrors(errors);
      return;
    }

    try {
      setLoading(true);
      const result = await ApiMiddleware.post("/bids", {
        userId: user?.id,
        itemId: item?._id,
        amount,
      });
      if (result.data.success) {
        notify.success(result?.data?.message);

        setTimeout(() => navigate(0), 1000);
      } else {
        notify.error(result?.data?.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notify.error(error?.response?.data?.message || error.message);
    }
  };
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
                <span className="item-d-bid-dollar">$ </span>
                {maxBid}
              </h1>
            </Grid>
            {/* <Grid item xs={6}>
              {" "}
              <p className="item-d-subtitle">Your last bid</p>
              <h1 className="item-d-bid">
                <span className="item-d-bid-dollar">$ </span>-
              </h1>
            </Grid> */}
          </Grid>
        </div>
        <div className="item-d-bottom-section">
          <TextField
            fullWidth
            helperText={formErrors.amount}
            error={formErrors.amount !== ""}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            size="midium"
            placeholder={`Min bid: $${item?.minBid}`}
          />
          <LoadingButton
            loading={loading}
            disableElevation
            sx={{ width: 200, ml: 2, height: 56 }}
            variant="contained"
            onClick={submitBid}
          >
            Place Bid
          </LoadingButton>
        </div>
      </Grid>
    </Grid>
  );
};

export default ItemDetails;
