import Button from "<@>/components/common/Button";
import ProgressIndicator from "<@>/components/common/ProgressIndicator";
import { AiOutlineExclamation } from "react-icons/ai";
import { useApplyMutation } from "<@>/store/journey/journey-api";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { BiCheck } from "react-icons/bi";
import { GoArrowUpRight } from "react-icons/go";

const index: React.FC = () => {
  const [
    apply,
    {
      data,
      isLoading: isApplying,
      isError: applyError,
      isSuccess: applySuccess,
      error,
    },
  ] = useApplyMutation();
  const router = useRouter();
  useEffect(() => {
    if (!isApplying) {
      apply({});
    }
  }, []);
  const applicationError = error as any;
  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <div className="flex rounded-md shadow-md  flex-col w-96 h-76 items-center justify-center gap-8 p-4">
        <div className="flex flex-col items-center justify-center gap-2">
          {isApplying ? (
            <ProgressIndicator color="green-600" size={10} />
          ) : applySuccess ? (
            <div className="flex shrink-0 rounded-full w-12 h-12 items-center justify-center bg-green-600">
              <BiCheck className="w-full h-full text-white" />
            </div>
          ) : (
            <div className="flex shrink-0 rounded-full w-12 h-12 items-center justify-center bg-red-500">
              <AiOutlineExclamation className="w-full h-full text-white" />
            </div>
          )}

          <p className="text-xl font-bold">
            {isApplying
              ? "Applying ..."
              : applySuccess
              ? "Application Successful"
              : "Application Failed"}
          </p>
          <p className="opacity-70">
            {isApplying
              ? ""
              : applySuccess
              ? "You have successfully joined the waitlist."
              : applyError && applicationError?.data?.message}
          </p>
        </div>
        <div className="w-full flex justify-center">
          <Button
            onClick={() => router.push("/journey")}
            label="Go to home"
            endIcon={<GoArrowUpRight />}
          />
        </div>
      </div>
    </div>
  );
};

export default index;
