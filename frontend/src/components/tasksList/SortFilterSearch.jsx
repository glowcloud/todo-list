import { Box } from "@mui/material";
import FiltersPopover from "./FiltersPopover";
import Search from "./Search";
import SortPopover from "./SortPopover";

const SortFilterSearch = ({
  sortType,
  setSortType,
  search,
  setSearch,
  handleFilterClick,
  priorityFilters,
  setPriorityFilters,
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ mb: 2 }}
      flexDirection={{ xs: "column", sm: "row" }}
    >
      <Box display="flex" alignItems="center" justifyContent="center">
        <SortPopover sortType={sortType} setSortType={setSortType} />
        <FiltersPopover
          handleFilterClick={handleFilterClick}
          priorityFilters={priorityFilters}
          setPriorityFilters={setPriorityFilters}
        />
      </Box>
      <Search search={search} setSearch={setSearch} />
    </Box>
  );
};

export default SortFilterSearch;
