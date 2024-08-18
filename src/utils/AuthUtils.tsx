import { getCurrentUser } from "aws-amplify/auth";
import { GetServerSidePropsContext } from "next";

export const withAuth = async (context: GetServerSidePropsContext) => {
  try {
    const user = await getCurrentUser();
    return {
      props: {
        user: {
          username: user.username,
        },
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};
