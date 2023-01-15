import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Image, Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useNotifications } from "../../state/context/NotificationContext";
import ApiMiddleware from "../../core/API";
import { useNavigate } from "react-router-dom";

const ItemForm = () => {
  const [date, setDate] = useState(new Date());
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    minimumBid: 1,
  });

  const [formErrors, setFormErrors] = useState({
    title: "",
    description: "",
    minimumBid: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const { actions: notify } = useNotifications();
  const navigate = useNavigate();

  const handleChangeDate = (newValue) => {
    setDate(newValue);
  };

  const validateForm = (formData) => {
    const errors = {
      title: "",
      description: "",
      minimumBid: "",
    };
    let hasErrors = false;
    if (formData.title.length === 0) {
      errors["title"] = "title is required";
      hasErrors = true;
    }

    if (formData.description.length === 0) {
      (errors["description"] = "Description is required"), (hasErrors = true);
    }

    if (formData.minimumBid.length === 0) {
      (errors["minimumBid"] = "Minimum Bid is required"), (hasErrors = true);
    } else if (isNaN(formData.minimumBid)) {
      (errors["minimumBid"] = "Minimum Bid must be valide number"),
        (hasErrors = true);
    } else if (formData.minimumBid < 1) {
      (errors["minimumBid"] = "Minimum Bid must be > 0"), (hasErrors = true);
    }
    return { hasErrors, errors };
  };

  const submitItem = async (event) => {
    event.preventDefault();

    const { hasErrors, errors } = validateForm(formData);
    if (hasErrors) {
      setFormErrors(errors);
      return;
    }

    try {
      let data = new FormData();
      data.append("title", formData["title"]);
      data.append("description", formData["description"]);
      data.append("expirationDate", date);
      data.append("minBid", formData["minimumBid"]);
      data.append("image", selectedFile);
      setLoading(true);
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      const result = await ApiMiddleware.post("/items", data, config);
      if (result.data?.success) {
        notify.success(result.data?.message);
        navigate("/");
      } else {
        notify.error(result.data?.message);
      }
    } catch (error) {
      notify.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box component={"form"} sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          value={formData["title"]}
          error={formErrors["title"] !== ""}
          helperText={formErrors["title"]}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          label="Title"
          margin="normal"
        />
        <TextField
          value={formData["description"]}
          error={formErrors["description"] !== ""}
          helperText={formErrors["description"]}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          label="Description"
          margin="normal"
          multiline
          minRows={3}
        />
        <TextField
          value={formData["minimumBid"]}
          error={formErrors["minimumBid"] !== ""}
          helperText={formErrors["minimumBid"]}
          onChange={(e) =>
            setFormData({ ...formData, minimumBid: e.target.value })
          }
          label="Minimum bid $"
          margin="normal"
        />
        <DateTimePicker
          minDate={new Date()}
          label="Close date"
          value={date}
          onChange={handleChangeDate}
          renderInput={(params) => <TextField margin="normal" {...params} />}
        />
        <Button
          disableElevation
          component="label"
          variant="outlined"
          fullWidth
          sx={{ mt: 1 }}
          size="large"
          startIcon={<Image />}
        >
          Upload image {selectedFile?.name}
          <input
            type="file"
            defaultValue={selectedFile}
            onChange={(e) => setSelectedFile(e.target.files[0])}
            hidden
            accept="image/*"
          />
        </Button>
        <LoadingButton
          disableElevation
          type="submit"
          variant="contained"
          fullWidth
          loading={loading}
          onClick={submitItem}
          sx={{ my: 4 }}
          size="large"
          startIcon={<Save />}
        >
          Add Item
        </LoadingButton>
      </Box>
    </LocalizationProvider>
  );
};

export default ItemForm;
