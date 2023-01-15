import { Delete, Edit } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { useNavigate } from "react-router-dom";
import ApiMiddleware from "../../core/API";
import { useAuth } from "../../state/context/AuthContext";
import { useNotifications } from "../../state/context/NotificationContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import "./styles.css";

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <span>Bid closed</span>;
  } else {
    // Render a countdown
    return (
      <span>
        {days}d {hours}h {minutes}m {seconds}s
      </span>
    );
  }
};

const ItemDetailsAdmin = ({ item, maxBid }) => {
  const navigate = useNavigate();
  const { actions: notify } = useNotifications();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  const goToEdit = () => {
    navigate(`/edit-item`, { state: { slug: item?.slug } });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteItem = async (slug) => {
    try {
      setLoading(true);
      const result = await ApiMiddleware.delete(`/items/${slug}`);
      if (result.data.success) {
        notify.success(result?.data?.message);
        handleClose();
        navigate("/");
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
        <img className="item-da-img" alt={item?.title} src={item?.image} />
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
          <div className="item-da-time-container">
            <p className="item-da-subtitle-time">Time remaining</p>
            {/* <h1 className="item-da-time"> 0d 1h 23m 45s</h1> */}
            <h1 className="item-da-time">
              <Countdown
                renderer={renderer}
                date={new Date(new Date(item?.expirationDate))}
              />
            </h1>
            <p className="item-da-time-finish">
              Close date {new Date(item?.expirationDate).toLocaleString()}
            </p>
          </div>
          <h1 className="item-da-title">{item?.title}</h1>
          <p className="item-da-subtitle">Description</p>
          <p className="item-da-description">{item?.description}</p>

          <Grid container>
            <Grid item xs={6}>
              <p className="item-da-subtitle">Highest bid</p>
              <h1 className="item-da-bid">
                <span className="item-da-bid-dollar">$ </span>
                {maxBid?.amount}
              </h1>
            </Grid>
            {/* <Grid item xs={6}>
              {" "}
              <p className="item-da-subtitle">Your last bid</p>
              <h1 className="item-da-bid">
                <span className="item-da-bid-dollar">$ </span>-
              </h1>
            </Grid> */}
          </Grid>
        </div>
        <div className="item-da-bottom-section">
          <Button
            fullWidth
            disableElevation
            variant="contained"
            onClick={goToEdit}
            startIcon={<Edit />}
          >
            Edit
          </Button>
          <LoadingButton
            fullWidth
            disableElevation
            onClick={handleClickOpen}
            variant="outlined"
            startIcon={<Delete />}
          >
            Delete
          </LoadingButton>
        </div>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete the item ?"}
        </DialogTitle>

        <DialogActions>
          <Button disableElevation onClick={handleClose} variant={"outlined"}>
            No
          </Button>
          <LoadingButton
            disableElevation
            loading={loading}
            onClick={() => deleteItem(item?.slug)}
            variant={"contained"}
            autoFocus
          >
            Yes, delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default ItemDetailsAdmin;
