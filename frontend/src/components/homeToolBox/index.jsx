import { Add, GridView, Search, ViewList } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useUser } from "../../state/context/UserContext";
import "./styles.css";
const HomeToolBox = ({ isAdmin }) => {
  const { viewType, actions } = useUser();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const goToNewItem = () => {
    navigate("/new-item", { replace: true });
  };

  const goToSearchScreen = () => {
    navigate(`/search?query=${search}`, { replace: true });
  };

  return (
    <div className="htb-container">
      <div style={{ marginBottom: 12 }}>
        <TextField
          id="search-iput"
          size="small"
          placeholder="Search..."
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
          type="search"
        />
        <IconButton onClick={goToSearchScreen} sx={{ ml: 1 }}>
          <Search color="primary" />
        </IconButton>
      </div>
      {isAdmin ? (
        <Button
          disableElevation
          variant="contained"
          startIcon={<Add />}
          onClick={goToNewItem}
        >
          Add Item
        </Button>
      ) : (
        <div>
          <IconButton
            disabled={viewType === "GRID"}
            sx={{ ml: 1 }}
            onClick={() => {
              actions.setViewType("GRID");
            }}
          >
            <GridView />
          </IconButton>
          <IconButton
            disabled={viewType === "LIST"}
            sx={{ ml: 0 }}
            onClick={() => {
              actions.setViewType("LIST");
            }}
          >
            <ViewList />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default HomeToolBox;
