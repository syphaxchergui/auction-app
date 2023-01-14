import { Box } from "@mui/material";
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

function createData(id, amount, date) {
  return { id, amount, date };
}

const rows = [
  createData(1233, 29, new Date().toLocaleString()),
  createData(1453, 14, new Date().toLocaleString()),
  createData(4333, 12, new Date().toLocaleString()),
  createData(1333, 10, new Date().toLocaleString()),
];

const UserBid = ({ itemId }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { actions: notify } = useNotifications();
  const { user } = useAuth();

  useEffect(() => {
    getDate();
  }, []);

  const getDate = async () => {
    try {
      setLoading(true);
      const result = await ApiMiddleware.get(`/bids/${user?.id}/${itemId}`);
      if (result.data?.success) {
        setData(result?.data?.bids);
      } else {
        notify?.error(result?.data?.message);
      }
      setLoading(false);
    } catch (err) {
      notify?.error(err?.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  if (data.length < 1) return null;
  return (
    <Box sx={{ mt: 4 }}>
      <h1>Your Bids</h1>
      <TableContainer sx={{ my: 4 }} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Amount&nbsp;($)</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.amount}</TableCell>
                <TableCell>
                  {new Date(row?.createdAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserBid;
