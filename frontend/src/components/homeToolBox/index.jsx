import { Search } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import "./styles.css";
const HomeToolBox = () => {
  return (
    <div className="htb-container">
      <div>
        <TextField id="search-iput" size="small" placeholder="Search..." />
        <IconButton sx={{ ml: 1 }}>
          <Search color="primary" />
        </IconButton>
      </div>
      {/* <div>
        <IconButton
          disabled={viewType === "LIST"}
          sx={{ ml: 0 }}
          onClick={() => actions.setViewType("LIST")}
        >
          <ViewList />
        </IconButton>
        <IconButton
          disabled={viewType === "GRID"}
          sx={{ ml: 1 }}
          onClick={() => actions.setViewType("GRID")}
        >
          <GridView />
        </IconButton>
      </div> */}
    </div>
  );
};

export default HomeToolBox;
