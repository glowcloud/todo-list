import { Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = ({ search, setSearch }) => {
  const handleSubmt = (e) => {
    e.preventDefault();
  };

  return (
    <Box component="form" autoComplete="off" onSubmit={handleSubmt}>
      <TextField
        id="search"
        label="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default Search;
