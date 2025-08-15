import { useState, useEffect } from "react";
import { FormControl, ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ModulesControls from "../Modules/ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import {
  setModules,
  addModule,
  deleteModule, // reducer action
  editModule,
  updateModule,
} from "./reducer";
import * as coursesClient from "../client";
import * as modulesClient from "./client";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();

  const saveModule = async (module: any) => {
    await modulesClient.updateModule(module);
    dispatch(updateModule(module));
  };

  // ✅ unified delete handler: notify server, then update UI
  const deleteModuleHandler = async (moduleId: string) => {
    await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };

  const fetchModules = async () => {
    if (!cid) return;
    const mods = await coursesClient.findModulesForCourse(cid as string);
    dispatch(setModules(mods));
  };
  useEffect(() => {
    fetchModules();
  }, [cid]);

  const createModuleForCourse = async () => {
    if (!cid || !moduleName.trim()) return;
    const newModule = await coursesClient.createModuleForCourse(cid, {
      name: moduleName.trim(),
      course: cid,
    });
    dispatch(addModule(newModule));
    setModuleName("");
  };

  return (
    <div>
      <ModulesControls
        setModuleName={setModuleName}
        moduleName={moduleName}
        addModule={createModuleForCourse}
      />
      <br /><br /><br /><br />
      <ListGroup className="rounded-0" id="wd-modules">
        {modules.map((module: any) => (
          <ListGroup.Item
            key={module._id}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              {!module.editing && module.name}
              {module.editing && (
                <FormControl
                  className="w-50 d-inline-block"
                  onChange={(e) =>
                    dispatch(updateModule({ ...module, name: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      saveModule({ ...module, editing: false });
                    }
                  }}
                  defaultValue={module.name}
                />
              )}
              {/* ✅ use the handler, not the reducer action */}
              <LessonControlButtons
                moduleId={module._id}
                deleteModule={deleteModuleHandler}
                editModule={(moduleId) => dispatch(editModule(moduleId))}
              />
            </div>

            {module.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: any) => (
                  <ListGroup.Item key={lesson._id} className="wd-lesson p-3 ps-1">
                    <BsGripVertical className="me-2 fs-3" /> {lesson.name}
                    {/* If this control is meant for LESSONS, pass lesson delete/edit handlers here.
                        If not needed, you can remove this block entirely. */}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}