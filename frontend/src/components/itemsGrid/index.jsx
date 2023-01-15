import { Grid, Pagination } from "@mui/material";
import { Box } from "@mui/system";
import Item from "../item";

const ItemsGrid = ({ items }) => {
  return (
    <Box>
      {items?.length > 0 ? (
        <Grid container spacing={2}>
          {items?.map((item) => (
            <Grid key={item?._id} item xs={12} sm={6} md={3} lg={12 / 5}>
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
    </Box>
  );
};

export default ItemsGrid;
