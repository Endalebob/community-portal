import { useRouter } from "next/router";
import { useEffect } from "react";

interface Props {
  [key: string]: any;
}

export const withAuth = (WrappedComponent: React.FC<Props>) => {
  return (props: Props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/auth/signin");
      }
    }, []);
    return <WrappedComponent {...props} />;
  };
};
