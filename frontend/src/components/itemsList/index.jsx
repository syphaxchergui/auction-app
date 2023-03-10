import {
  Avatar,
  Button,
  Grid,
  Pagination,
  TableSortLabel,
} from "@mui/material";
import { Box } from "@mui/system";
import Item from "../item";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../state/context/AuthContext";
import { isAdmin } from "../../utils/security";
import { Delete, Edit } from "@mui/icons-material";
import ApiMiddleware from "../../core/API";
import { useState } from "react";
import { useNotifications } from "../../state/context/NotificationContext";
import { LoadingButton } from "@mui/lab";

const ListToolBox = ({ isAdmin, slug }) => {
  let detailsText = isAdmin ? "Details" : "Bid Now";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { actions: notify } = useNotifications();

  const goToDetails = (slug) => {
    navigate(`/items/${slug}`);
  };

  const goToEdit = (slug) => {
    navigate(`/edit-item`, { state: { slug } });
  };

  const deleteItem = async (slug) => {
    try {
      setLoading(true);
      const result = await ApiMiddleware.delete(`/items/${slug}`);
      if (result.data.success) {
        notify.success(result?.data?.message);

        setTimeout(() => navigate(0), 1000);
      } else {
        notify.error(result?.data?.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notify.error(error?.response?.data?.message || error.message);
    }
  };
  return (
    <div style={{ display: "flex", gap: 10 }}>
      <Button
        disableElevation
        variant="contained"
        onClick={() => goToDetails(slug)}
      >
        {detailsText}
      </Button>
      {isAdmin ? (
        <Button
          variant="outlined"
          disableElevation
          onClick={() => goToEdit(slug)}
          startIcon={<Edit />}
        >
          Edit
        </Button>
      ) : null}
      {isAdmin ? (
        <LoadingButton
          disableElevation
          loading={loading}
          variant="outlined"
          onClick={() => deleteItem(slug)}
          startIcon={<Delete />}
        >
          Delete
        </LoadingButton>
      ) : null}
    </div>
  );
};

const ItemsList = ({ items }) => {
  const { user } = useAuth();
  const [order, setOrder] = useState("");

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const handleSort = () => {
    if (order === "asc") {
      setOrder("desc");
    } else {
      setOrder("asc");
    }
  };
  return (
    <TableContainer sx={{ my: 4 }} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Item</TableCell>
            <TableCell>
              <TableSortLabel
                active={order !== ""}
                direction={order !== "" ? order : "asc"}
                onClick={handleSort}
              >
                Min Bid&nbsp;($)
              </TableSortLabel>
            </TableCell>
            <TableCell>Close Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(order !== ""
            ? stableSort(items, getComparator(order, "minBid"))
            : items
          )?.map((row) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <Avatar alt={row.title} src={row.image} />
              </TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row?.minBid}</TableCell>
              <TableCell>
                {new Date(row?.expirationDate).toLocaleString()}
              </TableCell>
              <TableCell>
                <ListToolBox isAdmin={isAdmin(user?.role)} slug={row?.slug} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemsList;
