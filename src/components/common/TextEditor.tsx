import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

export const createMarkup = (html: string) => {
  return { __html: html };
};
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

interface EditorProps {
  value: string;
  setValue: (_value: string) => void;
}
const Editor: React.FC<EditorProps> = ({ value, setValue }) => {
  return (
    <ReactQuill
      modules={modules}
      theme="snow"
      value={value}
      onChange={setValue}
      placeholder="Content goes here..."
    />
  );
};

export default Editor;
