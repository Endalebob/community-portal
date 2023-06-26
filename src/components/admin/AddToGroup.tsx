import {
  useAddMembersToGroupMutation,
  useGetGroupsQuery,
} from "<@>/store/admin/group-api";
import { useState } from "react";
import Loading from "../common/Loading";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface AddToGroupProps {
  selectedApplicants: string[];
  setShowModal: (show: boolean) => void;
}

const AddToGroup: React.FC<AddToGroupProps> = ({
  selectedApplicants,
  setShowModal,
}) => {
  const [selectedGroup, setSelectedGroup] = useState("");
  const { data, isLoading, error } = useGetGroupsQuery();
  const [
    addMembersToGroup,
    { isLoading: isAddingMember, error: addingMemberError },
  ] = useAddMembersToGroupMutation();

  const handleMoveToGroup = async () => {
    await addMembersToGroup({
      groupId: selectedGroup,
      members: selectedApplicants,
    });

    setShowModal(false);
  };

  return (
    <div className="w-[60vw] md:w-[35vw] m-2 rounded-lg">
      {isLoading ? (
        <Loading />
      ) : error ? (
        <p>error</p>
      ) : (
        <div>
          <h3 className="font-semibold text-xl text-gray-800">
            Move selected {selectedApplicants.length} to group
          </h3>
          <select
            className="border outline-none my-6 w-full text-gray-700 focus:border-gray-300 border-gray-100 max-w-sm rounded-md p-2"
            id="group"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
          >
            <option value="">Select Group</option>
            {data?.value.map((group) => (
              <option
                disabled={
                  group.capacity - group.membersCount <
                  selectedApplicants.length
                }
                value={group.id}
              >
                {group.name} ( {group.capacity - group.membersCount} Remaining
                seat )
              </option>
            ))}
          </select>
          <div className="text-end">
            <button
              onClick={handleMoveToGroup}
              className="bg-primary text-white p-2 rounded"
            >
              {isAddingMember ? (
                <div className="flex items-center justify-between space-x-2">
                  <AiOutlineLoading3Quarters className="animate-spin" />
                  <p>Moving</p>
                </div>
              ) : (
                <p>Move</p>
              )}
            </button>
            {addingMemberError && (
              <p className="text-red-400 text-sm">
                Error occured while adding to the group
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddToGroup;
