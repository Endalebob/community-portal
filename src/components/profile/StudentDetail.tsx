import { RootState } from "<@>/store";
import { useSelector } from "react-redux";
import { CiLocationOn } from "react-icons/ci";
import Link from "next/link";

const StudentDetail = () => {
  const applicant = useSelector((state: RootState) => state.user.user);

  return (
    <div className=" bg-white col-span-3 p-2 md:p-7">
      <div className="flex justify-end items-center font-light">
        <CiLocationOn className="mr-4" />
        Addis Ababa, Ethiopia
      </div>
      <div className="px-4 py-6 my-0.5 shadow-sm justify-between  text-gray-500 ">
        <h2 className="font-bold text-xl capitalize mb-3">
          {applicant.fullName}
        </h2>
        <p className="">
          {applicant.shortBio ||
            "Hello, I am Daniel. Self-driven, diligent, inquisitive, and eager to develop personally and professionally. Graduate in software engineering from Addis Ababa University. Devoted software developer with passion for elegant solutions and a sharp eye for detail who relished working on challenging projects and with poeple from various backgrounds."}
        </p>
      </div>
      <div className="py-4 px-4">
        <div className="flex w-full font-medium text-gray-700 py-2 space-x-10 items-center">
          <h3 className="whitespace-nowrap">Personal Info</h3>
          <div className="w-full">
            <hr />
          </div>
        </div>

        {/* Basic Info */}
        <div className="my-6">
          <div className="flex w-full font-medium text-gray-700 py-2 items-center space-x-10 justify-between">
            <h3 className="whitespace-nowrap uppercase font-light">
              Basic Info
            </h3>
            <div className="w-full">
              <hr />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 lg:grid-cols-6 ">
            <div className="col-span-1 grid-rows-4 grid-cols-1 space-y-5">
              <p className="">Full Name: </p>
              <p className="">Phone number:</p>
              <p className="">Email: </p>
              <p className="">Country: </p>
            </div>

            <div className="col-span-1 grid-rows-4 grid-cols-1 space-y-5">
              <span className="block text-gray-500">
                {applicant?.fullName || "unknown"}
              </span>

              <span className="block text-gray-500">
                {" "}
                {applicant?.phoneNumber}{" "}
              </span>

              <span className="block text-gray-500">
                {applicant?.email || "unknown"}
              </span>

              <span className="block text-gray-500">
                {applicant?.country || "unknown"}
              </span>
            </div>
          </div>
        </div>

        {/* Work and Education */}

        <div className="my-6">
          <div className="flex w-full font-medium text-gray-700 py-2 items-center space-x-10 justify-between">
            <h3 className="whitespace-nowrap uppercase font-light">
              Work and Education
            </h3>
            <div className="w-full">
              <hr />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 lg:grid-cols-6 ">
            <div className="col-span-1 grid-rows-4 grid-cols-1 space-y-5">
              <p className="">Education Institute: </p>
              <p className="">Department::</p>
              <p className="">Graduation Year: </p>
              <p className="">CV: </p>
            </div>

            <div className="col-span-1 grid-rows-4 grid-cols-1 space-y-5">
              <span className="block text-gray-500">
                {applicant?.university || "unknown"}
              </span>

              <span className="block text-gray-500">
                {applicant?.department}
              </span>

              <span className="block text-gray-500">
                {applicant?.graduationYear || "unknown"}
              </span>

              <span className="block text-gray-500">
                {applicant.cvLink && (
                  <Link href={applicant.cvLink!} className="">
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