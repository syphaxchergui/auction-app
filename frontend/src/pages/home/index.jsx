import { Button } from "@mui/material";
import HomeToolBox from "../../components/homeToolBox";
import ItemsGrid from "../../components/itemsGrid";
import { useAuth } from "../../state/context/AuthContext";
import "./styles.css";

const Home = () => {
  const { actions } = useAuth();
  return (
    <div>
      <HomeToolBox />
      <ItemsGrid />
    </div>
  );
};

export default Home;
