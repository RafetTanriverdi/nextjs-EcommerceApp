import { Amplify } from "aws-amplify";
import awsmobile from "../../aws-exports";
import { checkUserAuthentication } from "../../utils/AuthUtils";
import { GetServerSideProps } from "next";

Amplify.configure(awsmobile);

interface ProfileProps {
  user: {
    username: string;
  };
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  return <div>Profile {user ? user.username : "No user logged in"}</div>;
};


export default Profile;
