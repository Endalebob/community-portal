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
import Error from "../common/Error";

const SideBar: React.FC = () => {
  const [selectedResource, setSelectedResource] = useState<number>();
  const [expand, setExpand] = useState<boolean>(false);
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

  const handleChapterClick = (resourceId: number, chapterId: number) => {
    setSelectedResource(resourceId);
    setSelectedChapter(chapterId);
  };

  const handleResourceClick = (resourceId: number) => {
    if (selectedResource !== resourceId) {
      setExpand(true);
    } else {
      setExpand(!expand);
    }
    setSelectedResource(resourceId);
  };
  const handleToggleMenu = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen w-full items-start">
      {!isSidebarOpen && (
        <button className="text-2xl px-5 py-1" onClick={handleToggleMenu}>
          <MdMenu size={30} />
        </button>
      )}
      <div
        className={`flex flex-col min-w-[200px] md:w-1/4 min-h-screen bg-gray-100 shadow-xl border-r-2 mr-5 ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      >
        {createResource && (
          <Modal onClose={() => setCreateResouce(false)}>
            <CreateResources
              onClose={() => setCreateResouce(false)}
              topicId={selectedResource!}
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

        {isLoading ? (
          <div className="flex flex-col animate-pulse p-4 gap-16">
            <div className="flex flex-col gap-4">
              <div className="w-[60%] h-4 bg-gray-200 rounded-sm"></div>
              <div className="w-[80%] h-4 bg-gray-200 rounded-sm"></div>
              <div className="w-[50%] h-4 bg-gray-200 rounded-sm"></div>
              <div className="w-[100%] h-4 bg-gray-200 rounded-sm"></div>
              <div className="w-[80%] h-4 bg-gray-200 rounded-sm"></div>
              <div className="w-[50%] h-4 bg-gray-200 rounded-sm"></div>
            </div>

            <div className="w-[50%] h-12 bg-gray-200 rounded-sm"></div>
          </div>
        ) : isSuccess ? (
          <>
            <div className="flex flex-col">
              {resources.map((resource) => (
                <div key={resource.id} className="flex flex-col">
                  <div
                    onClick={() => handleResourceClick(resource.id)}
                    className={`flex items-cent rounded-md justify-between px-4 py-2 cursor-pointer ${
                      selectedResource === resource.id
                        ? "text-primary"
                        : "text-black"
                    }`}
                  >
                    <h1 className="font-bold  w-full">
                      {resource.title.length > 30
                        ? resource.title.substring(0, 30) + "..."
                        : resource.title}
                    </h1>
                  </div>
                  {expand &&
                    selectedResource === resource.id &&
                    resource.resources.map((chapter) => (
                      <div className="flex items-center ml-10">
                        <p>
                          <BsFillJournalBookmarkFill />
                        </p>

                        <div
                          key={chapter.id}
                          onClick={() =>
                            handleChapterClick(resource.id, chapter.id)
                          }
                          className={`flex items-center justify-between pl-2 pr-4 py-2 cursor-pointer ${
                            selectedChapter === chapter.id
                              ? "text-primary"
                              : "text-gray-700"
                          }`}
                        >
                          <h1 className="">
                            {chapter.title.length > 25
                              ? chapter.title.substring(0, 25) + "..."
                              : chapter.title}
                          </h1>
                        </div>
                      </div>
                    ))}
                  {expand && selectedResource === resource.id && (
                    <div className="flex items-center ml-10">
                      <button
                        onClick={() => setCreateResouce(true)}
                        className="flex items-center rounded-full justify-center p-2 mt-5 bg-primary text-white"
                      >
                        <MdAdd className=" text-white" />
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
          </>
        ) : (
          <Error message="Error occurred while fetching resources" />
        )}
      </div>
      <div className="flex flex-col w-full h-full">
        {selectedChapter && selectedResource ? (
          <Resource
            selectedChapter={selectedChapter}
            resources={resources}
            selectedResource={selectedResource}
          />
        ) : (
          <div className="max-w-3xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">
              Welcome to Our Resource Page
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Designed to empower students like you with a wealth of knowledge
              and tools to support your learning journey.
            </p>

            <p className="text-lg text-gray-700 mb-4">
              Explore our extensive collection of resources, conveniently
              categorized into different subjects, to find exactly what you
              need. Whether you're seeking study guides, tutorials, practice
              exercises, or informative articles, our resource page offers a
              wide array of materials to cater to your specific learning
              preferences.
            </p>

            <p className="text-lg text-gray-700 mb-4">
              Each topic section is meticulously crafted to provide a rich and
              engaging learning experience. From mathematics and science to
              literature and history, our resources cover a broad spectrum of
              academic disciplines. Delve into in-depth articles that explain
              complex concepts, access interactive learning modules that bring
              abstract ideas to life, or find recommended external resources to
              expand your knowledge even further.
            </p>

            <p className="text-lg text-gray-700 mb-4">
              We understand that different students have different learning
              styles, which is why our resource page includes a diverse range of
              content formats. Visual learners can benefit from infographics and
              videos, while text-based resources are available for those who
              prefer reading and textual explanations. Our goal is to
              accommodate various learning preferences and ensure that every
              student can find resources that resonate with their unique way of
              absorbing information.
            </p>

            <p className="text-lg text-gray-700 mb-4">
              Whether you're looking to reinforce your understanding of a
              particular subject, preparing for exams, or simply expanding your
              knowledge beyond the classroom, our resource page is your go-to
              destination. We continually update and add new resources to keep
              up with the evolving educational landscape, ensuring that you have
              access to the latest and most relevant materials.
            </p>

            <p className="text-lg text-gray-700">
              Visit our resource page and embark on an enriching learning
              adventure. Empower yourself with the knowledge and tools needed to
              excel academically and reach your full potential. The world of
              learning awaits you, and our resource page is here to guide you
              every step of the way.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
