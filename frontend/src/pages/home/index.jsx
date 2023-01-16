import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import HomeToolBox from "../../components/homeToolBox";
import ItemsGrid from "../../components/itemsGrid";
import ItemsList from "../../components/itemsList";
import ApiMiddleware from "../../core/API";
import { useAuth } from "../../state/context/AuthContext";
import { useNotifications } from "../../state/context/NotificationContext";
import { useUser } from "../../state/context/UserContext";
import { isAdmin } from "../../utils/security";
import Loading from "../loading";
import "./styles.css";

const Home = () => {
  const { user } = useAuth();
  const { actions: notify } = useNotifications();
  const { viewType, pagination, actions } = useUser();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, [pagination]);

  const getData = async () => {
    try {
      setLoading(true);
      const result = await ApiMiddleware.get(
        `/items?page=${pagination.currentPage}&limit=${pagination.limit}`
      );
      if (result.data?.success) {
        setData(result?.data);
        //console.log(result.data);
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

  return (
    <>
      <HomeToolBox isAdmin={isAdmin(user.role)} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {isAdmin(user.role) || viewType === "LIST" ? (
          <ItemsList items={data?.items} />
        ) : (
          <ItemsGrid items={data?.items} />
        )}
        <Pagination
          sx={{ my: 6, alignSelf: "center" }}
          count={Math.ceil(data?.pages)}
          onChange={(e, page) => {
            actions.setPage(page - 1);
          }}
          page={pagination.currentPage + 1}
          variant="outlined"
          color="primary"
          size="large"
        />
      </div>
    </>
  );
};

export default Home;
