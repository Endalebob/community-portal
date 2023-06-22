import { Island_Moments } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
interface Props {
  [key: string]: any;
}
export const withStudentAuth = (WrappedComponent: React.FC<Props>) => {
  return (props: Props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      const role = localStorage.getItem("role");
      if (role !== "Student") {
        router.push("/auth/signin");
      } else setIsLoading(false);
    }, []);

    if (isLoading) {
      return <div></div>;
    }
    return <WrappedComponent {...props} />;
  };
};
