import LoginForm from "../../components/loginForm";
import { PRIMARY_LIGHT_3 } from "../../constant/colors";
import "./styles.css";
const Login = () => {
  return (
    <div className="l-bg" style={{ backgroundColor: PRIMARY_LIGHT_3 }}>
      <div className="l-containter">
        <h2 className="l-title">Bid Flash ⚡</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
