import { Box, Button, TextField, Typography, Link } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { isEmail } from "../utils/generalUtils";
import Logo from "../components/shared/Logo";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [resError, setResError] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const { handleSignIn, handleSignUp } = useAuth();

  const handleClick = async () => {
    if (email && password && isEmail(email)) {
      let res;
      if (isLogin) {
        res = await handleSignIn(email, password);
      } else {
        res = await handleSignUp(email, password);
      }
      setResError(!res);
      setEmail("");
      setPassword("");
    } else {
      setError(true);
    }
  };

  const handleChangeEmail = (e) => {
    if (resError) {
      setResError(false);
    }
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    if (resError) {
      setResError(false);
    }
    setPassword(e.target.value);
  };

  return (
    <Box
      component="form"
      textAlign="center"
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: { xs: "90%", sm: "80%", md: "50%", lg: "35%", xl: "25%" },
      }}
    >
      <Logo />
      <TextField
        label="Email"
        value={email}
        type="email"
        onChange={handleChangeEmail}
        margin="normal"
        fullWidth
        required
        error={resError || (error && (!email || !isEmail(email)))}
        helperText={
          resError
            ? "Incorrect credentials."
            : error && !email
            ? "Email is required."
            : error && !isEmail(email)
            ? "Incorrect email."
            : ""
        }
      />
      <TextField
        label="Password"
        value={password}
        type="password"
        onChange={handleChangePassword}
        margin="normal"
        fullWidth
        required
        error={resError || (error && !password)}
        helperText={
          resError
            ? "Incorrect credentials."
            : error && !password
            ? "Password is required."
            : ""
        }
      />
      <Button
        variant="outlined"
        sx={{
          mt: 2,
        }}
        onClick={handleClick}
      >
        {isLogin ? "Sign in" : "Sign up"}
      </Button>
      <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
        <Typography
          component={Link}
          align="center"
          onClick={() => setIsLogin((prevIsLogin) => !prevIsLogin)}
          sx={{
            "&:hover": { cursor: "pointer" },
          }}
        >
          {isLogin
            ? "Click here to create an account"
            : "Already have an account?"}
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
