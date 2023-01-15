import { Avatar, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../state/context/AuthContext";
import { isAdmin } from "../../utils/security";
import { Delete, Edit, KeyboardReturn, SearchSharp } from "@mui/icons-material";
import ApiMiddleware from "../../core/API";
import { useEffect, useState } from "react";
import { useNotifications } from "../../state/context/NotificationContext";
import { LoadingButton } from "@mui/lab";
import Loading from "../loading";

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

const Search = () => {
  const { user } = useAuth();
  const { actions: notify } = useNotifications();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [newSearch, setNewSearch] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  const navigate = useNavigate();

  useEffect(() => {
    getData(query);
  }, []);

  const getData = async (q) => {
    try {
      setLoading(true);
      const result = await ApiMiddleware.get(`/items/search?q=${q}`);
      if (result.data?.success) {
        setItems(result?.data?.items);
      } else {
        notify?.error(result?.data?.message);
        setItems([]);
      }
      setLoading(false);
    } catch (err) {
      notify?.error(err?.response?.data?.message || err.message);
      setLoading(false);
      setItems([]);
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <h2>Search results for "{query}"</h2>
      <Button
        disableElevation
        sx={{ mt: 2 }}
        variant={"outlined"}
        startIcon={<KeyboardReturn />}
        onClick={() => navigate("/")}
      >
        Go Back
      </Button>
      {items?.length > 0 ? (
        <TableContainer sx={{ my: 4 }} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Item</TableCell>
                <TableCell>Min Bid&nbsp;($)</TableCell>
                <TableCell>Close Date</TableCell>
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
                    <ListToolBox
                      isAdmin={isAdmin(user?.role)}
                      slug={row?.slug}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <TableContainer sx={{ my: 4 }} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Item</TableCell>
                <TableCell>Min Bid&nbsp;($)</TableCell>
                <TableCell>Close Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>No records found</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default Search;
