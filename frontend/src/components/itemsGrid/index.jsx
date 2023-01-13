import { Grid, Pagination } from "@mui/material";
import { Box } from "@mui/system";
import Item from "../item";

const ItemsGrid = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Item />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Item />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Item />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Item />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Item />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Item />
        </Grid>
      </Grid>
      <Pagination
        sx={{ my: 6 }}
        count={10}
        variant="outlined"
        color="primary"
        size="large"
      />
    </Box>
  );
};

export default ItemsGrid;
