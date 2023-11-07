import {
  CalendarMonth,
  PieChart,
  ListOutlined,
  PriorityHigh,
} from "@mui/icons-material";
import { Badge, Box, IconButton } from "@mui/material";

const SwitchViewButtons = ({ setCurrentView, badgeContent }) => {
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
      <IconButton onClick={() => setCurrentView("overdue")}>
        <Badge badgeContent={badgeContent} color="error">
          <PriorityHigh />
        </Badge>
      </IconButton>
    </Box>
  );
};

export default SwitchViewButtons;
