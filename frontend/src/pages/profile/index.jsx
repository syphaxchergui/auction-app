import AllMyBids from "../../components/allMyBids";
import UserInfo from "../../components/userInfo";

const Profile = () => {
  return (
    <>
      <h1>Profile</h1>
      <UserInfo userName="User 1" email="user1@gmail.com" />
      <AllMyBids />
    </>
  );
};

export default Profile;
