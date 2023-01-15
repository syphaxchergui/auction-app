import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ItemForm from "../../components/itemForm";
import { PRIMARY_LIGHT_1 } from "../../constant/colors";

const EditItem = () => {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link to="/" style={{ textDecoration: "none", color: PRIMARY_LIGHT_1 }}>
          Items
        </Link>
        <Typography color="text.primary">Edit Item</Typography>
      </Breadcrumbs>

      <h1>Edit Item</h1>
      <ItemForm isEditing={true} />
    </>
  );
};

export default EditItem;
