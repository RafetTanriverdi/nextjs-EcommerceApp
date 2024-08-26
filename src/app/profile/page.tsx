import { Amplify } from "aws-amplify";
import awsmobile from "../../aws-exports";

Amplify.configure(awsmobile);

const profile = () => {
  return <div>Profile </div>;
};

export default profile;
