import { CheckCircle, CheckCircleOutline } from "@mui/icons-material";
import { Card, Icon } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Loading from "../loading";
import { useNotifications } from "../../state/context/NotificationContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ApiMiddleware from "../../core/API";

const Bill = () => {
  const params = useParams();
  const { actions: notify } = useNotifications();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const result = await ApiMiddleware.get(`/items/id/${params?.id}`);
      if (result.data?.success) {
        setData(result?.data);
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

  if (!data) return <h1>Error !</h1>;
  return (
    <Card
      elevation={5}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        minWidth: 500,
        minHeight: 600,
        margin: "auto",
        px: 3,
        py: 6,
      }}
    >
      <p style={{ fontSize: 100, margin: 0 }}>
        <CheckCircleOutline sx={{ m: 0 }} color="success" fontSize="inherit" />
      </p>
      <h1 style={{ margin: 0 }}>🎊Congratulations🎊</h1>
      <hr style={{ width: "100%", marginTop: 24, marginBottom: 40 }}></hr>
      <h1 style={{ textAlign: "center", backgroundColor: "#fff" }}>
        Your bill
      </h1>
      <p>Client: {data?.maxBid?.lastBidder}</p>
      <TableContainer sx={{ my: 4 }} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Bid Date</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{data?.item?.title}</TableCell>

              <TableCell>
                {new Date(data?.maxBid?.createdAt).toLocaleString()}
              </TableCell>
              <TableCell width={100}> ${data?.maxBid?.amount}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default Bill;
