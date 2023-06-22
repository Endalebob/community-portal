import { useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";
import { useWindowWidth } from "./WindowWidth";
import { AiOutlineClose } from "react-icons/ai";
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0  bg-opacity-50 bg-gray-900 z-50 flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div
        ref={modalRef}
        className="bg-primarybg m-2 p-4 rounded-lg shadow-lg max-h-[80%] overflow-auto"
      >
        <div className="w-full flex justify-end">
          <AiOutlineClose
            onClick={() => {
              onClose();
            }}
            className=" rounded-full shrink-0 mt-1 hover:bg-secondary  p-1 w-7 h-7 border"
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
