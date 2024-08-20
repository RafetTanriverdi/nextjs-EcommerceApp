import { Amplify } from "aws-amplify";
import awsmobile from "../../aws-exports";
import { checkUserAuthentication } from "../../utils/AuthUtils";
import { GetServerSideProps } from "next";

Amplify.configure(awsmobile, { ssr: true });

interface ProfileProps {
  user: {
    username: string;
  };
}

const profile = ({ user }: ProfileProps) => {
  return <div>Profile {user ? user.username : "No user logged in"}</div>;
};

export default profile;
