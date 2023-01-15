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

const UserBid = ({ itemId, isAdmin }) => {
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

      let url = isAdmin ? `/bids/${itemId}` : `/bids/${user?.id}/${itemId}`;
      const result = await ApiMiddleware.get(url);
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
      {isAdmin ? <h1>Item Bids</h1> : <h1>Your Bids</h1>}
      <TableContainer sx={{ my: 4 }} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {isAdmin ? <TableCell>User</TableCell> : null}
              <TableCell>Amount&nbsp;($)</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {isAdmin ? <TableCell>{row.userId}</TableCell> : null}
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
