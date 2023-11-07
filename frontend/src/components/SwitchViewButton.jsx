import { CalendarMonth, PieChart, ListAltOutlined, ListOutlined } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

const SwitchViewButton = ({ currentView, setCurrentView }) => {
  return (
    <Box textAlign="center" mt={4}>
      <IconButton onClick={() => setCurrentView("calendar")}>
        <CalendarMonth />
      </IconButton>
      <IconButton onClick={() => setCurrentView("summary")}>
        <PieChart />
      </IconButton>
      <IconButton onClick={() => setCurrentView("list")}>
        <ListOutlined />
      </IconButton>
    </Box>
  );
};

export default SwitchViewButton;
