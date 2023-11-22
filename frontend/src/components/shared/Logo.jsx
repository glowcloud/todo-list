import { Box } from "@mui/material";
import logo from "../../assets/logo.png";

const Logo = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" my={2}>
      <Box component="img" src={logo} alt="Logo" width={180} />
    </Box>
  );
};

export default Logo;
