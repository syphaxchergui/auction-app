import { Avatar, Button, Grid, Pagination } from "@mui/material";
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

const ListToolBox = ({ isAdmin, slug }) => {
  let detailsText = isAdmin ? "Details" : "Bid Now";
  const navigate = useNavigate();

  const goToDetails = (slug) => {
    navigate(`/items/${slug}`);
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
          onClick={() => goToDetails(slug)}
          startIcon={<Edit />}
        >
          Edit
        </Button>
      ) : null}
      {isAdmin ? (
        <Button
          disableElevation
          variant="outlined"
          onClick={() => goToDetails(slug)}
          startIcon={<Delete />}
        >
          Delete
        </Button>
      ) : null}
    </div>
  );
};

const ItemsList = ({ items }) => {
  const { user } = useAuth();

  return (
    <TableContainer sx={{ my: 4 }} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Item</TableCell>
            <TableCell>Min Bid&nbsp;($)</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items?.map((row) => (
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
