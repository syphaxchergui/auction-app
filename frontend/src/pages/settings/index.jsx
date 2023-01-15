import { Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiMiddleware from "../../core/API";
import { useAuth } from "../../state/context/AuthContext";
import { useNotifications } from "../../state/context/NotificationContext";
import Loading from "../loading";

const Settings = () => {
  const [data, setData] = useState({
    maxBidAmount: "",
    alertBid: "",
  });
  const [formErrors, setFormErrors] = useState({
    maxBidAmount: "",
    alertBid: "",
  });
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const { user } = useAuth();
  const { actions: notify } = useNotifications();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const result = await ApiMiddleware.get(`user-params/${user?.id}`);
      if (result?.data?.success) {
        setData({
          maxBidAmount: result?.data?.userParams?.maxBidAmount,
          alertBid: result?.data?.userParams?.alertBid,
        });
        setIsEditing(true);
      } else {
        notify.error(result?.data?.message);
      }
      setLoading(false);
    } catch (err) {
      if (err?.response?.status === 404) {
        setIsEditing(false);
      }
      setLoading(false);
    }
  };

  const validateForm = (formData) => {
    const errors = {
      maxBidAmount: "",
      alertBid: "",
    };
    let hasErrors = false;
    if (formData.maxBidAmount.length === 0) {
      errors["maxBidAmount"] = "Maximum bid amount is required";
      hasErrors = true;
    } else if (isNaN(formData.maxBidAmount)) {
      errors["maxBidAmount"] = "Maximum bid amount must be a number";
      hasErrors = true;
    } else if (formData.maxBidAmount < 0) {
      errors["maxBidAmount"] = "Maximum bid amount must be >= than 0 $";
      hasErrors = true;
    }

    if (formData.alertBid.length === 0) {
      (errors["alertBid"] = "Alert Bid % is required"), (hasErrors = true);
    } else if (isNaN(formData.alertBid)) {
      (errors["alertBid"] = "Alert Bid % is must be a number"),
        (hasErrors = true);
    } else if (formData.alertBid < 0 || formData.alertBid > 100) {
      (errors["alertBid"] = "Alert Bid % is must be a between 1% and 100%"),
        (hasErrors = true);
    }

    return { hasErrors, errors };
  };

  const createUserParams = async () => {
    try {
      setSubmitLoading(true);
      const result = await ApiMiddleware.post(`user-params`, {
        ...data,
        userId: user?.id,
      });
      if (result?.data?.success) {
        notify.success(result?.data?.message);
        setTimeout(() => navigate(0), 1000);
      } else {
        notify.error(result?.data?.message);
      }
      setSubmitLoading(false);
    } catch (error) {
      notify.error(error?.response?.data?.message || error.message);
      setSubmitLoading(false);
    }
  };

  const updateUserParams = async () => {
    try {
      setSubmitLoading(true);
      const result = await ApiMiddleware.put(`user-params/${user?.id}`, {
        ...data,
      });
      if (result?.data?.success) {
        notify.success(result?.data?.message);
        setTimeout(() => navigate(0), 1000);
      } else {
        notify.error(result?.data?.message);
      }
      setSubmitLoading(false);
    } catch (error) {
      notify.error(error?.response?.data?.message || error.message);
      setSubmitLoading(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const { hasErrors, errors } = validateForm(data);
    if (hasErrors) {
      setFormErrors(errors);
      return;
    }

    if (!isEditing) createUserParams();
    else updateUserParams();
  };

  if (loading) return <Loading />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 620,
      }}
    >
      <h1>Settings</h1>

      <TextField
        value={data?.maxBidAmount}
        helperText={formErrors["maxBidAmount"]}
        margin="normal"
        label="Maximum bid amount"
        onChange={(e) => {
          setData({ ...data, maxBidAmount: e.target.value });
          setIsChanged(true);
        }}
      />
      <p style={{ marginBottom: 24 }}>
        This maximum amount will be split between all items where you have
        activated auto-bidding.
      </p>
      <TextField
        value={data?.alertBid}
        helperText={formErrors["alertBid"]}
        margin="normal"
        label="Bid Alert %"
        onChange={(e) => {
          setData({ ...data, alertBid: e.target.value });
          setIsChanged(true);
        }}
      />
      <LoadingButton
        sx={{ mt: 4, mb: 1 }}
        disabled={!isChanged}
        loading={submitLoading}
        size="large"
        disableElevation
        onClick={onSubmit}
        variant="contained"
        startIcon={<Save />}
      >
        Save settings
      </LoadingButton>
    </Box>
  );
};

export default Settings;
