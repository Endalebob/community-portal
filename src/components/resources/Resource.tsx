import React from 'react';

interface Chapter {
  id: string;
  name: string;
  details: string;
}

interface ResourceProps {
  selectedChapter: string;
  resources: Chapter[];
}

const Resource: React.FC<ResourceProps> = ({
  selectedChapter,
  resources,
}) => {
  const selectedResource = resources.find((chapter) => chapter.id === selectedChapter);

  return (
    <div>
      {selectedResource ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">{selectedResource.name}</h1>
          <p>{selectedResource.details}</p>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4">{resources[0].name}</h1>
          <p>{resources[0].details}</p>
        </div>
      )}
    </div>
  );
};

export default Resource;
