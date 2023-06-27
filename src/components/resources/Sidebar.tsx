import React from "react";
import { FaBook } from "react-icons/fa";

interface Chapter {
  id: string;
  name: string;
  details: string;
}

interface ResourceData {
  [key: string]: Chapter[];
}

interface SidebarProps {
  resources: ResourceData;
  onChapterClick: (resourceName: string, chapterId: string) => void;
  onResourceClick: (resourceName: string) => void;
  selectedResource: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  resources,
  onChapterClick,
  onResourceClick,
  selectedResource,
}) => {
  return (
    <div className="h-screen bg-white shadow-lg rounded-lg py-5 px-10 max-w-sm">
      {Object.entries(resources).map(([resourceName, chapters]) => (
        <div key={resourceName}>
          <h1
            onClick={() => onResourceClick(resourceName)}
            className="text-xl font-bold mb-4"
          >
            {resourceName}
          </h1>

          {selectedResource === resourceName && (
            <ul className="ml-4 flex flex-col gap-1">
              {chapters.map((chapter) => (
                <div className="flex items-center">
                  <FaBook className="mr-2 fill-gray-600 hover:fill-gray-800" />

                  <li
                    key={chapter.id}
                    onClick={() => onChapterClick(resourceName, chapter.id)}
                    className="cursor-pointer text-gray-600 hover:text-gray-800"
                  >
                    {chapter.name}
                  </li>
                </div>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
