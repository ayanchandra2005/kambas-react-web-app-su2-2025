import { useState } from "react";
import { FormControl } from "react-bootstrap";
const HTTP_SERVER = import.meta.env.VITE_HTTP_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;

  const [module, setModule] = useState({
    id: "mod101",
    name: "Web Fundamentals",
    description: "Covers HTML, CSS, JS basics",
    course: "CS2025",
  });

  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      <h4>Modifying Properties</h4>
      <a
        id="wd-update-assignment-title"
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
      >
        Update Title{" "}
      </a>
      <FormControl
        className="w-75"
        id="wd-assignment-title"
        defaultValue={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      <hr />

      <h4>Retrieving Objects</h4>
      <a
        id="wd-retrieve-assignments"
        className="btn btn-primary"
        href={`${HTTP_SERVER}/lab5/assignment`}
      >
        Get Assignment
      </a>
      <hr />
      <h4>Retrieving Properties</h4>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-primary"
        href={`${HTTP_SERVER}/lab5/assignment/title`}
      >
        Get Title
      </a>
      <hr />

      <h4>Module Object</h4>
      <a
        id="wd-get-module"
        className="btn btn-success me-2"
        href={`${HTTP_SERVER}/lab5/module`}
      >
        Get Module
      </a>
      <a
        id="wd-get-module-name"
        className="btn btn-success"
        href={`${HTTP_SERVER}/lab5/module/name`}
      >
        Get Module Name
      </a>
      <hr />

      <h4>Modifying Module</h4>
      <FormControl
        className="w-75 mb-2"
        id="wd-module-name"
        defaultValue={module.name}
        onChange={(e) => setModule({ ...module, name: e.target.value })}
      />
      <a
        id="wd-update-module-name"
        className="btn btn-warning"
        href={`${MODULE_API_URL}/name/${module.name}`}
      >
        Update Module Name
      </a>
      <hr />

      <h4>On Your Own: Assignment Score</h4>
      <FormControl
        className="w-75 mb-2"
        type="number"
        id="wd-assignment-score"
        defaultValue={assignment.score}
        onChange={(e) =>
          setAssignment({ ...assignment, score: parseInt(e.target.value) })
        }
      />
      <a
        id="wd-update-assignment-score"
        className="btn btn-success mb-3"
        href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
      >
        Update Score
      </a>
      <hr />

      <h4>On Your Own: Assignment Completed Status</h4>
      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          id="wd-assignment-completed"
          checked={assignment.completed}
          onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })
          }
        />
        <label className="form-check-label" htmlFor="wd-assignment-completed">
          Completed
        </label>
      </div>
      <a
        id="wd-update-assignment-completed"
        className="btn btn-info mb-3"
        href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
      >
        Update Completed Status
      </a>
      <hr />

      <h4>On Your Own: Update Module Description</h4>
      <FormControl
        className="w-75 mb-2"
        id="wd-module-description"
        defaultValue={module.name}
        onChange={(e) => setModule({ ...module, description: e.target.value })}
      />
      <a
        id="wd-update-module-description"
        className="btn btn-warning"
        href={`${HTTP_SERVER}/lab5/module/description/${module.description}`}
      >
        Update Module Description
      </a>
      <hr />
    </div>
  );
}
