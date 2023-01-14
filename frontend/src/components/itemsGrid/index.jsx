import { Grid, Pagination } from "@mui/material";
import { Box } from "@mui/system";
import Item from "../item";

const ItemsGrid = ({ items }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {items.length > 0 ? (
        <Grid container spacing={2}>
          {items?.map((item) => (
            <Grid item xs={12} sm={6} md={3}>
              <Item
                id={item?._id}
                slug={item?.slug}
                title={item?.title}
                minBid={item?.minBid}
                image={item?.image}
              />
            </Grid>
          ))}
        </Grid>
      ) : null}
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
