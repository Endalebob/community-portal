import React, { useEffect, useState } from "react";
import InputField from "../auth/InputField";
import Button from "../common/Button";
import ProgressIndicator from "../common/ProgressIndicator";
import { AiOutlineCheck } from "react-icons/ai";
import Editor from "../common/TextEditor";
import {
  useCreateResourceMutation,
  useGetResourcesQuery,
} from "<@>/store/resource/resource-api";

interface CreateResourcesProps {
  onClose: () => void;
  topicId: number;
}

const CreateResources: React.FC<CreateResourcesProps> = ({
  onClose,
  topicId,
}) => {
  const [resource, setResource] = useState({
    title: "",
    content: "",
    topicId: topicId,
  });
  const [resourceError, setResourceError] = useState({
    title: "",
    content: "",
  });
  const handleChange = (e: any) => {
    setResource({ ...resource, [e.target.name]: e.target.value });
  };

  let [createResource, { data, isSuccess, isError, isLoading, error }] =
    useCreateResourceMutation();

  const createError = error as any;
  const validResource = () => {
    if (resource.title != "" && resource.content != "") {
      setResourceError({
        title: "",
        content: "",
      });
      createResource(resource);
    } else
      setResourceError({
        title: resource.title ? "" : "Please insert Resource title",
        content: resource.content ? "" : "please add Resource content",
      });
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isSuccess) {
      intervalId = setInterval(onClose, 1000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isSuccess]);

  return (
    <div className="w-full h-full p-2 flex flex-col gap-2">
      <p className="font-bold text-lg">Create new Resource</p>
      <p className="text-sm opacity-30">
        Add new Resource to the system and easily get everyone up to speed.
      </p>

      <div>
        {error &&
          createError.data?.error?.map((err: any, index: number) => {
            return <p className="text-xs text-red-500">{err.errorMessage}</p>;
          })}{" "}
        {error && !createError.data && (
          <p className="text-xs text-red-500">Unknown Error</p>
        )}
      </div>

      <form className="flex flex-col gap-2">
        <InputField
          label=""
          name="title"
          placeholder="Title"
          type="text"
          value={resource.title}
          onChange={handleChange}
        />
        <p className="text-xs text-red-500">
          {resourceError.title !== "" && resourceError.title}
        </p>

        <Editor
          value={resource.content}
          setValue={(value: string) =>
            setResource({ ...resource, content: value })
          }
        />
        <p className="text-xs text-red-500">
          {resourceError.content !== "" && resourceError.content}
        </p>
      </form>

      <div className="flex justify-end gap-2">
        <Button
          onClick={() => onClose()}
          className=" bg-secondary text-gray-800 font-medium "
          label="Cancel"
        ></Button>

        {isLoading ? (
          <Button
            startIcon={<ProgressIndicator size={5}></ProgressIndicator>}
            label=""
          ></Button>
        ) : isError ? (
          <Button
            onClick={() => validResource()}
            className="font-medium"
            label="Retry"
          ></Button>
        ) : isSuccess ? (
          <Button
            startIcon={<AiOutlineCheck></AiOutlineCheck>}
            label=""
          ></Button>
        ) : (
          <Button
            onClick={() => validResource()}
            className="font-medium"
            label="Create"
          ></Button>
        )}
      </div>
    </div>
  );
};

export default CreateResources;
