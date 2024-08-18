import { Amplify } from "aws-amplify";
import awsmobile from "../../aws-exports";
import { GetServerSideProps } from "next";
import { withAuth } from "../../utils/AuthUtils";

Amplify.configure(awsmobile);

interface ProfileProps {
    user: {
      username: string;
    };
  }


const Profile:React.FC<ProfileProps> = ({ user }) => {


  return <div>Profile {user ? user.username : "No user logged in"}</div>;
};


export default Profile;
