import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Pagination from "<@>/components/admin/Pagination";
import StudentDetail from "<@>/components/admin/StudentDetail";
import WaitListCard from "<@>/components/admin/WaitListCard";
import FetchingError from "<@>/components/common/FetchingError";
import Loading from "<@>/components/common/Loading";
import Modal from "<@>/components/common/Modal";
import AddToGroup from "<@>/components/admin/AddToGroup";
import { useApplicantsWaitlistQuery } from "<@>/store/admin/applicant-api";

const WaitList: React.FC = () => {
  const [params, setParams] = useState({
    pageNumber: 1,
    searchTerm: "",
    pageSize: 10,
  });

  const [userDetailId, setUserDetailId] = useState<string>("");

  const {
    currentData: data,
    isFetching,
    error,
  } = useApplicantsWaitlistQuery(params);

  const applicants = data?.value.items || [];
  const totalCount = data?.value.totalCount || 0;

  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectedApplicants, setSelectedApplicants] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleSelect = (applicantId: string) => {
    if (selectedApplicants.includes(applicantId)) {
      setSelectedApplicants((prevApplicants) =>
        prevApplicants.filter((id) => id !== applicantId)
      );
    } else {
      setSelectedApplicants((prevApplicants) => [
        ...prevApplicants,
        applicantId,
      ]);
    }
  };

  const handleAddToGroup = () => {
    setShowModal(true);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedApplicants([]);
    } else {
      const allApplicantIds = applicants.map((applicant) => applicant.userId);
      setSelectedApplicants(allApplicantIds);
    }
    setSelectAll((prevSelectAll) => !prevSelectAll);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm: string = event.target.value;
    setParams({ ...params, searchTerm });
  };

  const onPageChange = (pageNumber: number) => {
    setParams({ ...params, pageNumber });
  };

  const getUserById = (userId: string) => {
    setUserDetailId(userId);
  };

  return (
    <section className="grid sm:grid-cols-12 grid-cols-1">
      <div className="col-span-4 border-r border-r-gray-100 overflow-y-scroll max-h-screen waitlist-card-scroll">
        <div className="flex items-center justify-between space-x-4 sticky px-6 py-4 top-0 bg-white">
          <h2 className="text-lg font-medium text-gray-700">Members</h2>
          <div className="flex items-center border border-gray-200 rounded-md px-3 py-2">
            <span className="text-gray-400 mr-2">
              <FaSearch />
            </span>
            <input
              type="text"
              id="email"
              className="w-full focus:outline-none"
              placeholder="Search"
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="mb-6 h-[70vh] flex flex-col">
          <div className="text-sm flex items-center text-gray-700 bg-gray-100 justify-between p-4 px-6">
            <div className="flex items-center justify-between space-x-2">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="accent-primary"
              />
              <h4>Name</h4>
              {selectedApplicants.length > 0 && (
                <button
                  onClick={handleAddToGroup}
                  className="text-gray-500 hover:text-gray-800 underline"
                >
                  Add To Group ({selectedApplicants.length})
                </button>
              )}
            </div>
            <h4>Application Date</h4>
          </div>

          {isFetching ? (
            <Loading />
          ) : error ? (
            <FetchingError />
          ) : (
            applicants.map((applicant, index) => (
              <WaitListCard
                key={index}
                applicant={applicant}
                selected={selectedApplicants.includes(applicant.userId)}
                onSelect={() => handleSelect(applicant.userId)}
                getUserById={() => getUserById(applicant.userId)}
              />
            ))
          )}

          <div className="mt-auto">
            <Pagination
              onPageChange={onPageChange}
              currentPage={params.pageNumber || 1}
              totalCount={totalCount}
              pageSize={params.pageSize || 10}
            />
          </div>
        </div>
      </div>

      <div className="col-span-8 overflow-y-scroll max-h-screen waitlist-card-scroll">
        {userDetailId ? (
          <StudentDetail userId={userDetailId} />
        ) : (
          <div className="flex py-10 items-center text-gray-500 space-x-2 justify-center">
            Click on a user to view details
          </div>
        )}
      </div>
      {showModal && (
        <Modal
          children={
            <AddToGroup
              setShowModal={setShowModal}
              selectedApplicants={selectedApplicants}
              setSelectedApplicants = {setSelectedApplicants}
            />
          }
          onClose={() => setShowModal(false)}
        />
      )}
    </section>
  );
};

export default WaitList;
