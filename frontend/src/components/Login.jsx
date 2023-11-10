import { Box, Button, TextField, Typography, Link } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const { handleSignIn } = useAuth();

  const handleClick = () => {
    if (email && password && isEmail()) {
      if (isLogin) {
        // logic for login here
      } else {
        // logic for sign up here
      }
      const newUser = { email, password, id: "test" };
      handleSignIn(newUser);
      setEmail("");
      setPassword("");
      setError(false);
    } else {
      setError(true);
    }
  };

  const isEmail = () => {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(email);
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
      <TextField
        label="Email"
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        fullWidth
        required
        error={error && (!email || !isEmail())}
        helperText={
          error && !email
            ? "Email is required."
            : error && !isEmail()
            ? "Incorrect email."
            : ""
        }
      />
      <TextField
        label="Password"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        fullWidth
        required
        error={error && !password}
        helperText={error && !password ? "Password is required." : ""}
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
