import { useGetResourceByIdQuery } from "<@>/store/resources/resources-api";
import IResourceTopic from "<@>/types/resources/resourceListType";
import IResource from "<@>/types/resources/resourcesType";
import React, { useEffect, useState } from "react";

interface ResourceProps {
  selectedChapter: number;
  resources: IResourceTopic[];
}

const Resource: React.FC<ResourceProps> = ({ selectedChapter, resources }) => {
  console.log(selectedChapter);
  const [chapter, setChapter] = useState<IResource>([] as unknown as IResource);
  const {
    data = [],
    isSuccess,
    isLoading,
  } = useGetResourceByIdQuery(selectedChapter);

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
    <div className="w-full">
      {chapter ? (
        <div className="flex-col items-center justify-center w-full">
          <h1 className="text-2xl font-bold mb-4">{chapter.title}</h1>
          <p>{chapter.content}</p>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4">{resources[0].title}</h1>
          <p>{resources[0].resources[0].title}</p>
        </div>
      )}
    </div>
  );
};

export default Resource;
