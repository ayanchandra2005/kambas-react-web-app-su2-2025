import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { useSelector } from "react-redux";

export default function LessonControlButtons({
  moduleId,
  deleteModule,
  editModule,
  saveModule,
}: {
  moduleId: string;
  deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void;
  saveModule?: (moduleId: string) => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  return (
    <div className="float-end">
      {isFaculty && (
        <>
          <FaPencil
            onClick={() => editModule(moduleId)}
            className="text-primary me-3"
          />
          <FaTrash
            className="text-danger me-2 mb-1"
            onClick={() => deleteModule(moduleId)}
          />
          {saveModule && (
            <GreenCheckmark onClick={() => saveModule(moduleId)} />
          )}
        </>
      )}
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
