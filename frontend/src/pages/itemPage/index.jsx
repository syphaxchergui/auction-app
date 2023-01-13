import ItemDetails from "../../components/itemDetails";
import "./styles.css";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import UserBid from "../../components/userBids";

const ItemPage = () => {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link to="/">Items</Link>
        <Typography color="text.primary">Product no1</Typography>
      </Breadcrumbs>

      <ItemDetails />

      <UserBid />
    </>
  );
};

export default ItemPage;
