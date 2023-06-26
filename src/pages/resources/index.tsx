import Resource from '<@>/components/resources/Resource';
import Sidebar from '<@>/components/resources/Sidebar';
import React, { useState } from 'react';
import { MdMenu } from 'react-icons/md';

interface Chapter {
  id: string;
  name: string;
  details: string;
}

interface ResourceData {
  [key: string]: Chapter[];
}

const ResourcePage: React.FC = () => {
  const [selectedResource, setSelectedResource] = useState<string>('Introduction to Python course hello everyone');
  const [selectedChapter, setSelectedChapter] = useState<string>('ch1');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const resources: ResourceData = {
    'Introduction to Python course hello everyone': [
      {
        id: 'ch1',
        name: 'Chapter 1',
        details: 'Chapter 1 details',
      },
      {
        id: 'ch2',
        name: 'Chapter 2',
        details: 'Chapter 2 details',
      },
    ],
    'Intro to Stack': [
      {
        id: 'ch3',
        name: 'Chapter 3',
        details: 'Chapter 3 details',
      },
      {
        id: 'ch4',
        name: 'Chapter 4',
        details: 'Chapter 4 details',
      },
    ],
  };

  const handleChapterClick = (resourceName: string, chapterId: string) => {
    setSelectedResource(resourceName);
    setSelectedChapter(chapterId);
  };

  const handleResourceClick = (resourceName: string) => {
    setSelectedResource(resourceName);
    setSelectedChapter('');
  };
  const handleToggleMenu = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
    
    <div className="flex flex-col">
        <div onClick={handleToggleMenu} className="flex px-10 pt-5 gap-2 items-center font-bold text-blue-600">
        <MdMenu size={30} />
        {isSidebarOpen ? 'Hide Menu' : 'Menu'}
      </div>
        {
      isSidebarOpen &&(
      <Sidebar resources={resources} onChapterClick={handleChapterClick} onResourceClick={handleResourceClick} selectedResource={selectedResource} />
      )}
      </div>
      <div className="w-3/4 p-8">
        {selectedResource ? (
          <Resource selectedChapter={selectedChapter} resources={resources[selectedResource]} />
        ) : (
          <p className="text-center">Select a resource and chapter from the sidebar</p>
        )}
        
      </div>
      

    </div>
  );

};

export default ResourcePage;
