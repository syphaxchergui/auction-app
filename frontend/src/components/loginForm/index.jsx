import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { useState } from "react";
import "./styles.css";
import { validateEmail } from "../../utils/helpers";
import { useAuth } from "../../state/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { PRIMARY } from "../../constant/colors";

const LoginForm = () => {
  const { loading, actions, error: authError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = (formData) => {
    const errors = {
      email: "",
      password: "",
    };
    let hasErrors = false;
    if (formData.email.length === 0) {
      errors["email"] = "Email is required";
      hasErrors = true;
    } else if (!validateEmail(formData.email)) {
      errors["email"] = "Must be a valid email";
      hasErrors = true;
    }
    if (formData.password.length === 0) {
      (errors["password"] = "Password is required"), (hasErrors = true);
    }
    return { hasErrors, errors };
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { hasErrors, errors } = validateForm({ email, password });
    if (hasErrors) {
      setFormErrors(errors);
      return;
    }

    // Async Call to login the user
    actions?.loginWithEmailAndPassword({
      email: email,
      password: password,
    });
  };

  return (
    <div className="l-section-tf">
      <>
        <TextField
          fullWidth
          error={formErrors.email !== ""}
          helperText={formErrors.email}
          margin="dense"
          type={"email"}
          id="input-email"
          label="Email"
          placeholder="your-email@abc.xyz"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <FormControl
          error={formErrors.password !== ""}
          margin="dense"
          fullWidth
          variant="outlined"
        >
          <InputLabel htmlFor="input-password">Password</InputLabel>
          <OutlinedInput
            id="input-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <FormHelperText id="input-password-helper">
            {formErrors.password}
          </FormHelperText>
        </FormControl>
      </>
      {authError ? (
        <p
          style={{
            width: 200,
            textAlign: "center",
            textTransform: "capitalize",
            color: PRIMARY,
          }}
        >
          {authError}
        </p>
      ) : null}

      <LoadingButton
        sx={{ marginTop: "4em", height: 46 }}
        variant="contained"
        fullWidth
        loading={loading}
        onClick={handleSubmit}
        disableElevation
      >
        Login
      </LoadingButton>
    </div>
  );
};

export default LoginForm;
