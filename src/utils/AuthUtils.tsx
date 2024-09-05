// auth.ts
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getCurrentUser } from 'aws-amplify/auth';

interface AuthenticatedProps {
  user: {
    username: string;
    [key: string]: any;
  };
}

export async function checkUserAuthentication(
  context: GetServerSidePropsContext,
  redirectUrl: string = '/auth/login'
): Promise<GetServerSidePropsResult<AuthenticatedProps>> {
  try {
    const user = await getCurrentUser();
    return {
      props: {
        user,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: redirectUrl,
        permanent: false,
      },
    };
  }
}
