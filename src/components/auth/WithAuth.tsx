import { useRouter } from "next/router";
import { useEffect } from "react";

interface Props {
  [key: string]: any;
}

export const withAuth = (WrappedComponent: React.FC<Props>) => {
  return (props: Props) => {
    const router = useRouter();

    useEffect(() => {
      const role = localStorage.getItem("role");

      if (role === "admin") {
        router.push("/admin/dashboard");
      } else if (role === "Student") {
        router.push("/journey");
      }
    }, []);
    return <WrappedComponent {...props} />;
  };
};
