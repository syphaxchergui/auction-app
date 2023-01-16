import ItemDetails from "../../components/itemDetails";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import UserBid from "../../components/userBids";
import { useNotifications } from "../../state/context/NotificationContext";
import { useEffect, useState } from "react";
import Loading from "../loading";
import ApiMiddleware from "../../core/API";
import {
  PRIMARY_LIGHT_1,
  PRIMARY_LIGHT_2,
  PRIMARY_LIGHT_3,
} from "../../constant/colors";
import { useAuth } from "../../state/context/AuthContext";

const ItemPage = () => {
  const params = useParams();
  const { actions: notify } = useNotifications();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const result = await ApiMiddleware.get(
        `/items/${params?.slug}?userId=${user?.id}`
      );
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
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link to="/" style={{ textDecoration: "none", color: PRIMARY_LIGHT_1 }}>
          Items
        </Link>
        <Typography color="text.primary">{data?.item?.title}</Typography>
      </Breadcrumbs>

      <ItemDetails
        item={data?.item}
        autobidding={data?.autobidding}
        maxBid={data?.maxBid || { amount: "--" }}
      />

      <UserBid itemId={data?.item?._id} isAdmin={false} />
    </>
  );
};

export default ItemPage;
