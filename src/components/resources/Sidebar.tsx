import Resource from "<@>/components/resources/Resource";
import IResourceTopic from "<@>/types/resources/resourceListType";
import React, { useEffect, useState } from "react";
import { FaBook } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { MdAdd, MdMenu } from "react-icons/md";
import { useGetResourcesQuery } from "<@>/store/resource/resource-api";
import Modal from "../common/Modal";
import CreateResources from "./CreateResource";
import EditResources from "./EditResource";
import CreateTopic from "./CreateTopic";

const SideBar: React.FC = () => {
  const [selectedResource, setSelectedResource] = useState<number>(0);
  const [selectedChapter, setSelectedChapter] = useState<number>(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [resources, setResources] = useState<IResourceTopic[]>([]);
  const { data = [], isSuccess, isLoading } = useGetResourcesQuery("");
  const [createResource, setCreateResouce] = useState(false);
  const [editResource, setEditResouce] = useState(false);
  const [createTopic, setCreateTopic] = useState(false);
  useEffect(() => {
    if (isSuccess && data.value) {
      const resource = data.value as unknown as IResourceTopic[];
      setResources(resource);
    }
  }, [data, isSuccess]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleChapterClick = (resourceId: number, chapterId: number) => {
    setSelectedResource(resourceId);
    setSelectedChapter(chapterId);
  };

  const handleResourceClick = (resourceId: number) => {
    setSelectedResource(resourceId);
    setSelectedChapter(0);
  };
  const handleToggleMenu = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen items-start">
      {!isSidebarOpen && (
        <button className="text-2xl px-5 py-1" onClick={handleToggleMenu}>
          <MdMenu size={30} />
        </button>
      )}
      <div
        className={`flex flex-col w-400px md:w-1/4 h-full bg-gray-100 shadow-xl border-r-2 mr-5 ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      >
        {createResource && (
          <Modal onClose={() => setCreateResouce(false)}>
            <CreateResources
              onClose={() => setCreateResouce(false)}
              topicId={selectedResource}
            />
          </Modal>
        )}

        {createTopic && (
          <Modal onClose={() => setCreateTopic(false)}>
            <CreateTopic onClose={() => setCreateTopic(false)} />
          </Modal>
        )}

        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold">Resources</h1>
          <button className="text-2xl" onClick={handleToggleMenu}>
            <MdMenu />
          </button>
        </div>
        <div className="flex flex-col">
          {resources.map((resource) => (
            <div key={resource.id} className="flex flex-col">
              <div
                onClick={() => handleResourceClick(resource.id)}
                className={`flex items-cent rounded-md justify-between px-4 py-2 cursor-pointer ${
                  selectedResource === resource.id
                    ? "text-primary"
                    : "text-gray-700"
                }`}
              >
                <h1 className="font-semibold text-xl w-full">
                  {resource.title.length > 30
                    ? resource.title.substring(0, 30) + "..."
                    : resource.title}
                </h1>
              </div>
              {selectedResource === resource.id &&
                resource.resources.map((chapter) => (
                  <div className="flex items-center ml-10">
                    <BsFillJournalBookmarkFill />
                    <div
                      key={chapter.id}
                      onClick={() =>
                        handleChapterClick(resource.id, chapter.id)
                      }
                      className={`flex items-center justify-between px-4 py-2 cursor-pointer ${
                        selectedChapter === chapter.id
                          ? "text-primary"
                          : "text-gray-500"
                      }`}
                    >
                      <h1 className="">
                        {chapter.title.length > 30
                          ? chapter.title.substring(0, 30) + "..."
                          : chapter.title}
                      </h1>
                    </div>
                  </div>
                ))}
              {selectedResource === resource.id && (
                <div className="flex items-center ml-10">
                  <button
                    onClick={() => setCreateResouce(true)}
                    className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md"
                  >
                    <MdAdd className="mr-2 text-white" />
                    Add Chapter
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="ml-5 my-20">
          <button
            onClick={() => setCreateTopic(true)}
            className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md"
          >
            <MdAdd className="mr-2" />
            Add Topic
          </button>
        </div>
      </div>
      <div className="flex flex-col w-full h-full">
        <Resource selectedChapter={selectedChapter} resources={resources} />
      </div>
    </div>
  );
};

export default SideBar;
