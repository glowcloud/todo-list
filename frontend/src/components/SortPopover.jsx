import {
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  IconButton,
  Popover,
} from "@mui/material";
import { SortOutlined } from "@mui/icons-material";
import { useState } from "react";

const SortPopover = ({ sortType, setSortType }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box >
      <IconButton onClick={handlePopoverOpen}>
        <SortOutlined />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{
          textAlign: "center",
        }}
      >
        <FormControl sx={{ width: 500 }}>
          <InputLabel>Sort</InputLabel>
          <Select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="priority">Priority</MenuItem>
            <MenuItem value="date">Date</MenuItem>
          </Select>
        </FormControl>
      </Popover>
    </Box>
  );
};

export default SortPopover;
