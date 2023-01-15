import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ItemForm from "../../components/itemForm";
import { PRIMARY_LIGHT_1 } from "../../constant/colors";

const NewItem = () => {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link to="/" style={{ textDecoration: "none", color: PRIMARY_LIGHT_1 }}>
          Items
        </Link>
        <Typography color="text.primary">New Item</Typography>
      </Breadcrumbs>

      <h1>Create a new Item</h1>
      <ItemForm />
    </>
  );
};

export default NewItem;
