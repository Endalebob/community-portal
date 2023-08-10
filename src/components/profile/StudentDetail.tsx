import Link from "next/link";
import { RootState } from "<@>/store";
import { useAppSelector } from "<@>/store/hooks";

const StudentDetail = () => {
  const applicant = useAppSelector((state: RootState) => state.user.user);

  return (
    <div className=" bg-white md:col-span-3 xl:col-span-4 p-2 md:p-7 shadow-md h-full rounded-md">
      <div className="px-4 py-2 justify-between">
        <h2 className="font-medium text-xl capitalize mb-3">
          {applicant?.fullName}
        </h2>
        <p className="">{applicant?.shortBio || ""}</p>
      </div>
      <div className="py-4 px-4 gap-6 flex flex-col">
        {/* Basic Info */}
        <div>
          <div className="flex w-full font-medium text-gray-700 py-2 items-center space-x-10 justify-between">
            <h3 className="whitespace-nowrap">Basic Info</h3>
            <div className="w-full">
              <hr />
            </div>
          </div>
          <div className="mt-4 flex gap-4 ">
            <div className="col-span-1 grid-rows-4 grid-cols-1 space-y-5">
              <p className="whitespace-nowrap">Full Name: </p>
              <p className="whitespace-nowrap">Phone number:</p>
              <p className="whitespace-nowrap">Email: </p>
              <p className="whitespace-nowrap">Country: </p>
            </div>

            <div className="col-span-1 grid-rows-4 grid-cols-1 space-y-5">
              <span className="block text-gray-500">
                {applicant?.fullName || "-"}
              </span>

              <span className="block text-gray-500">
                {applicant?.phoneNumber || "-"}
              </span>

              <span className="block text-gray-500">
                {applicant?.email || "-"}
              </span>

              <span className="block text-gray-500">
                {applicant?.country || "-"}
              </span>
            </div>
          </div>
        </div>

        {/* Work and Education */}
        <div>
          <div className="flex w-full font-medium text-gray-700 py-2 items-center space-x-10 justify-between">
            <h3 className="whitespace-nowrap">Work and Education</h3>
            <div className="w-full">
              <hr />
            </div>
          </div>
          <div className="mt-4 flex gap-6">
            <div className="col-span-1 space-y-5">
              <p className="whitespace-nowrap">Education Institute: </p>
              <p className="whitespace-nowrap">Department:</p>
              <p className="whitespace-nowrap">Graduation Year: </p>
              <p className="whitespace-nowrap">CV: </p>
            </div>
            <div className="col-span-1 space-y-5">
              <span className="block text-gray-500">
                {applicant?.university || "-"}
              </span>

              <span className="block text-gray-500">
                {applicant?.department || "-"}
              </span>

              <span className="block text-gray-500">
                {applicant?.graduationYear || "-"}
              </span>

              <span className="block text-gray-500">
                {applicant?.cv && (
                  <Link href={applicant?.cv} className="text-primary">
                    Link
                  </Link>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
