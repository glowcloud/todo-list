/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Popover,
} from "@mui/material";
import { FilterAlt } from "@mui/icons-material";
import { useState } from "react";

const FiltersPopover = ({
  handleFilterClick,
  priorities,
  priorityFilters,
  setPriorityFilters,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ mt: 3, mx: { xs: 2, md: 17, lg: 27, xl: 47 } }}>
      <IconButton onClick={handlePopoverOpen}>
        <FilterAlt />
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
        <FormGroup>
          {priorities.map((priority) => (
            <FormControlLabel
              key={priority.id}
              control={
                <Checkbox checked={priorityFilters.includes(priority.id)} />
              }
              label={priority.name}
              sx={{ mx: 2, my: 1, color: priority.color }}
              onClick={() => handleFilterClick(priority.id)}
            />
          ))}
        </FormGroup>
        <Button
          variant="outlined"
          sx={{ mx: 1, mb: 1 }}
          onClick={() => setPriorityFilters([])}
        >
          Clear filters
        </Button>
      </Popover>
    </Box>
  );
};

export default FiltersPopover;
