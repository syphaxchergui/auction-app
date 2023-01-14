import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import HomeToolBox from "../../components/homeToolBox";
import ItemsGrid from "../../components/itemsGrid";
import ApiMiddleware from "../../core/API";
import { useAuth } from "../../state/context/AuthContext";
import { useNotifications } from "../../state/context/NotificationContext";
import Loading from "../loading";
import "./styles.css";

const Home = () => {
  const { actions } = useAuth();
  const { actions: notify } = useNotifications();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const result = await ApiMiddleware.get("/items");
      if (result.data?.success) {
        setData(result?.data?.items);
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
    <div>
      <HomeToolBox />
      <ItemsGrid items={data} />
    </div>
  );
};

export default Home;
