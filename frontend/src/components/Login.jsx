import { Box, Button, TextField, Typography, Link } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const { handleSignIn } = useAuth();

  const handleClick = () => {
    if (isLogin) {
      // logic for login here
    } else {
      // logic for sign up here
    }
    const newUser = { email, password, id: "test" };
    handleSignIn(newUser);
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
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        fullWidth
        required
      />
      <TextField
        label="Password"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        fullWidth
        required
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
