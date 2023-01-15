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
  const { viewType } = useUser();

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
      <HomeToolBox isAdmin={isAdmin(user.role)} />

      {isAdmin(user.role) ? (
        <ItemsList items={data} />
      ) : viewType === "LIST" ? (
        <ItemsList items={data} />
      ) : (
        <ItemsGrid items={data} />
      )}
    </div>
  );
};

export default Home;
