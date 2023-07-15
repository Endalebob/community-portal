import { useAppSelector } from "<@>/store/hooks";
import {
  useDeleteResourceMutation,
  useGetResourceByIdQuery,
} from "<@>/store/resource/resource-api";
import IResourceTopic from "<@>/types/resources/resourceListType";
import IResource from "<@>/types/resources/resourcesType";
import React, { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Modal from "../common/Modal";
import ProgressIndicator from "../common/ProgressIndicator";
import { createMarkup } from "../common/TextEditor";
import EditResources from "./EditResource";
import { FiDelete, FiEdit, FiTrash, FiTrash2 } from "react-icons/fi";
import { MdDelete, MdEdit } from "react-icons/md";
import "react-quill/dist/quill.bubble.css";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface ResourceProps {
  selectedChapter: number;
  selectedResource: number;
  resources: IResourceTopic[];
}

const Resource: React.FC<ResourceProps> = ({
  selectedChapter,
  resources,
  selectedResource,
}) => {
  const [chapter, setChapter] = useState<IResource>([] as unknown as IResource);
  const [deleteResource, setDeleteResource] = useState(false);
  const [editResource, setEditResource] = useState(false);
  const { role } = useAppSelector((state) => state.auth);
  const show = role === "HeadOfEducation" ? true : false;
  let {
    currentData,
    isFetching,
    data = [],
    isSuccess,
    isLoading,
    isError,
  } = useGetResourceByIdQuery(selectedChapter);

  let [
    deleteTopic,
    {
      isError: isDeleteError,
      isSuccess: isdeleteSuccess,
      error: deleteError,
      isLoading: isdeleteloading,
    },
  ] = useDeleteResourceMutation();

  const handleDeleteTopic = async () => {
    deleteTopic(selectedChapter);
    selectedChapter = -1;
  };

  useEffect(() => {
    if (isdeleteSuccess) {
      setDeleteResource(false);
      setChapter([] as unknown as IResource);
    }
  }, [isdeleteSuccess, deleteError, isDeleteError]);

  useEffect(() => {
    if (isSuccess && data.value) {
      const chapter = data.value as unknown as IResource;
      setChapter(chapter);
    }
  }, [data, isSuccess]);

  if (!currentData && isFetching) {
    return (
      <div className="w-full p-4  animate-pulse flex flex-col gap-16">
        <div className="flex flex-col w-full gap-2">
          <div className="w-[80%] h-4 bg-slate-200 rounded-sm"></div>
          <div className="w-[30%] h-4 bg-slate-200 rounded-sm"></div>
        </div>

        <div className=" flex flex-col w-full gap-12">
          <div className="flex w-full flex-col gap-4 rounded">
            <div className="h-4 bg-slate-200 w-1/4 "></div>
            <div className="h-4 bg-slate-200 w-1/2"></div>
            <div className="h-4 bg-slate-200 w-3/4"></div>
            <div className="h-4 bg-slate-200 w-1/3"></div>
            <div className="h-4 bg-slate-200 w-3/4"></div>
            <div className="h-4 bg-slate-200 w-1/2"></div>
            <div className="h-4 bg-slate-200 w-1/4"></div>
          </div>
          <div className="w-1/3 h-56 rounded-md bg-slate-200"></div>
          <div className="flex w-full flex-col gap-4 rounded">
            <div className="h-4 bg-slate-200 w-1/4 "></div>
            <div className="h-4 bg-slate-200 w-1/2"></div>
            <div className="h-4 bg-slate-200 w-3/4"></div>
            <div className="h-4 bg-slate-200 w-3/4"></div>
            <div className="h-4 bg-slate-200 w-3/4"></div>
            <div className="h-4 bg-slate-200 w-1/2"></div>
            <div className="h-4 bg-slate-200 w-1/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return <p>resource deleted</p>;
  }
  return (
    <div className="flex gap-3 w-full p-6">
      <div className=" w-full">
        {chapter ? (
          <div className="flex-col items-center justify-center w-full">
            <h1 className="text-2xl font-bold mb-4">{chapter.title}</h1>
            {/* <div dangerouslySetInnerHTML={createMarkup(chapter.content)} /> */}
            <ReactQuill
              value={chapter.content}
              readOnly={true}
              theme="bubble"
            />
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
            resource={{
              id: selectedChapter,
              title: chapter.title,
              content: chapter.content,
              topicId: selectedResource,
            }}
          />
        </Modal>
      )}
      {deleteResource && (
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
      )}
      {selectedChapter !== 0 && show && (
        <div className="flex w-full justify-end gap-4">
          <div>
            <button
              onClick={() => setEditResource(true)}
              className="flex items-center rounded-full justify-center"
            >
              <MdEdit size={24} />
            </button>
          </div>
          <div>
            <button
              onClick={() => setDeleteResource(true)}
              className="flex items-center rounded-full justify-center "
            >
              <MdDelete size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resource;