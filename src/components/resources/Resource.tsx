import { useDeleteResourceMutation, useDeleteTopicMutation, useGetResourceByIdQuery } from "<@>/store/resource/resource-api";
import IResourceTopic from "<@>/types/resources/resourceListType";
import IResource from "<@>/types/resources/resourcesType";
import React, { use, useEffect, useState } from "react";
import { createMarkup } from "../common/TextEditor";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import EditResources from "./EditResource";
import Modal from "../common/Modal";
import ProgressIndicator from "../common/ProgressIndicator";

interface ResourceProps {
  selectedChapter: number;
  selectedResource: number;
  resources: IResourceTopic[];
}

const Resource: React.FC<ResourceProps> = ({ selectedChapter, resources, selectedResource }) => {
  const [chapter, setChapter] = useState<IResource>([] as unknown as IResource);
  const [deleteResource, setDeleteResource] = useState(false);
  const [editResource, setEditResource] = useState(false);
  let {
    data = [],
    isSuccess,
    isLoading,
  } = useGetResourceByIdQuery(selectedChapter);

  let [
    deleteTopic,
    {
      isError: isDeleteError,
      isSuccess: isdeleteSuccess,
      error: deleteError,
      isLoading: isdeleteloading,
    },
  ] =  useDeleteResourceMutation();

  const handleDeleteTopic = async () => {
    deleteTopic(selectedChapter);
  };

  useEffect(() => {
    if (isdeleteSuccess) {
      setDeleteResource(false);
      setChapter([] as unknown as IResource);
    }
  }
  , [isdeleteSuccess, deleteError, isDeleteError]);

  useEffect(() => {
    if (isSuccess && data.value) {
      const chapter = data.value as unknown as IResource;
      setChapter(chapter);
    }
  }, [data, isSuccess]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex gap-3 w-full">
    <div className=" max-w-4xl mt-5">
      {chapter ? (
        <div className="flex-col items-center justify-center w-full">
          <h1 className="text-2xl font-bold mb-4">{chapter.title}</h1>
          <div dangerouslySetInnerHTML={createMarkup(chapter.content)} />
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4">{resources[0].title}</h1>
          <p>{resources[0].resources[0].title}</p>
        </div>
      )}
    </div>
    {editResource && (
          <Modal onClose={() => setEditResource(false)}>
            <EditResources
              onClose={() => setEditResource(false)}
              resource={{ id:selectedChapter, title: chapter.title, content: chapter.content, topicId: selectedResource }}
            />
          </Modal>
        )}
        {
          deleteResource && (
            <Modal onClose={() => setDeleteResource(false)}>
              <div className="flex flex-col items-center justify-center gap-4">
                <p className="text-lg font-bold">Are you sure?</p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setDeleteResource(false)}
                    className="bg-primary text-white rounded-md px-4 py-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteTopic}
                    className="bg-primary text-white rounded-md px-4 py-2"
                  >
                    {isdeleteloading ? (
                <ProgressIndicator size={5} color="white" />
              ) : (
                "Delete"
              )}
                  </button>

                </div>
              </div>
            </Modal>
          )

        }
    {selectedChapter !== 0 && (<div className="flex flex-col w-full items-end gap-2 mt-5 mr-10">
      <div>
        <button onClick={() => setEditResource(true)}
                    className="flex items-center rounded-full justify-center p-2 mt-5 bg-primary text-white"
                  >
          <AiFillEdit className="text-white" />
        </button>
      </div>
      <div>
        <button onClick={() => setDeleteResource(true)}
                    className="flex items-center rounded-full justify-center p-2 mt-5 bg-black text-blue-500"
                  >

        <AiFillDelete className="text-white" />
        </button>
      </div>
      </div>)}
    </div>
  );
};

export default Resource;
