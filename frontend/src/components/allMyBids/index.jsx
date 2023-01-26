import { Avatar, Box, Button, MenuItem, Select } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { PRIMARY_LIGHT_1 } from "../../constant/colors";
import { useEffect, useState } from "react";
import Loading from "../../pages/loading";
import ApiMiddleware from "../../core/API";
import { useNotifications } from "../../state/context/NotificationContext";
import { useAuth } from "../../state/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";
import { Receipt } from "@mui/icons-material";

const ActionsToolBox = ({ slug, status, id }) => {
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate(`/items/${slug}`);
  };
  const goToBill = () => {
    navigate(`/bill/${id}`);
  };

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Button onClick={goToDetails} disableElevation variant="contained">
        Details
      </Button>
      {status === "won" ? (
        <Button
          startIcon={<Receipt />}
          onClick={goToBill}
          disableElevation
          variant="outlined"
        >
          Bill
        </Button>
      ) : null}
    </Box>
  );
};

const StatusChip = ({ status }) => {
  let color;
  let label;
  switch (status) {
    case "won":
      color = "success";
      label = "Won";
      break;
    case "in_progress":
      color = "warning";
      label = "In progress";
      break;
    case "lost":
      color = "error";
      label = "Lost";
      break;

    default:
      return null;
  }

  return (
    <Chip
      sx={{ width: 95 }}
      size="small"
      color={color}
      label={label}
      variant="outlined"
    />
  );
};
const AllMyBids = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [status, setStatus] = useState("all");
  const { actions: notify } = useNotifications();
  const { user } = useAuth();

  useEffect(() => {
    getDate();
  }, []);

  const getDate = async () => {
    try {
      setLoading(true);

      let url = `/bids/all/${user?.id}`;
      const result = await ApiMiddleware.get(url);
      if (result.data?.success) {
        setData(result?.data?.items);
        setFilteredData(result?.data?.items);
      } else {
        notify?.error(result?.data?.message);
      }
      setLoading(false);
    } catch (err) {
      notify?.error(err?.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  const filterData = (status) => {
    if (status === "all") setFilteredData(data);
    else
      setFilteredData(
        data.filter((item) => {
          if (item.status === status) return item;
        })
      );
  };

  if (loading) return <Loading />;

  return (
    <Box sx={{ mt: 8 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <h2>My bids</h2>
        <Select
          size="small"
          sx={{ width: 200 }}
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            filterData(e.target.value);
          }}
        >
          <MenuItem value={"all"}>All</MenuItem>
          <MenuItem value={"in_progress"}>In Progress</MenuItem>
          <MenuItem value={"won"}>Won</MenuItem>
          <MenuItem value={"lost"}>Lost</MenuItem>
        </Select>
      </Box>

      <TableContainer sx={{ my: 4 }} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Your last bid</TableCell>
              <TableCell>Highest bid</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.length < 1 ? (
              <TableRow>
                <TableCell>No Bids for now</TableCell>
              </TableRow>
            ) : (
              filteredData?.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Avatar alt={row?.title} src={row?.image} />
                  </TableCell>
                  <TableCell>{row?.title}</TableCell>
                  <TableCell>
                    ${row?.userLatestBid} at{" "}
                    {new Date(row?.userLatestBidDate).toLocaleString()}
                  </TableCell>
                  <TableCell>${row?.highestBid}</TableCell>
                  <TableCell>
                    <StatusChip status={row?.status} />
                  </TableCell>
                  <TableCell width={250}>
                    <ActionsToolBox
                      slug={row?.slug}
                      status={row?.status}
                      id={row?._id}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AllMyBids;
