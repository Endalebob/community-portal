import React, { useEffect, useState } from "react";
import InputField from "../auth/InputField";
import Button from "../common/Button";
import ProgressIndicator from "../common/ProgressIndicator";
import { AiOutlineCheck } from "react-icons/ai";
import Editor from "../common/TextEditor";
import { useEditResourceMutation } from "<@>/store/resource/resource-api";
import IResource from "<@>/types/resources/resourcesType";

interface EditResourcesProps {
  onClose: () => void;
  resource: IResource;
}

const EditResources: React.FC<EditResourcesProps> = ({
  onClose,
  resource: { id, title, content, topicId },
}) => {
  const [resource, setResource] = useState({
    id: id,
    title: title,
    content: content,
    topicId: topicId,
  });
  const [resourceError, setResourceError] = useState({
    title: "",
    content: "",
  });
  const handleChange = (e: any) => {
    setResource({ ...resource, [e.target.name]: e.target.value });
  };

  let [editResource, { data, isSuccess, isError, isLoading, error }] =
    useEditResourceMutation();

  const editError = error as any;
  const validResource = () => {
    if (resource.title != "" && resource.content != "") {
      setResourceError({
        title: "",
        content: "",
      });
      editResource(resource);
    } else
      setResourceError({
        title: resource.title ? "" : "Please insert Resource title",
        content: resource.content ? "" : "Please add Resource content",
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
      <p className="font-bold text-lg">Edit resource</p>
      <div>
        {error &&
          editError.data?.error?.map((err: any, index: number) => {
            return <p className="text-xs text-red-500">{err.errorMessage}</p>;
          })}{" "}
        {error && !editError.data && (
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
          className=" bg-secondary !text-gray-800 font-medium "
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
            label="Update"
          ></Button>
        )}
      </div>
    </div>
  );
};

export default EditResources;