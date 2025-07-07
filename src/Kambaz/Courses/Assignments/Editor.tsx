export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" value="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" defaultValue={100} />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group">
              <option>ASSIGNMENTS</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <td>
            <select id="wd-display-grade-as">
              <option>Percentage</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
              <option>Online</option>
            </select>
            <br />
            <label>Online Entry Options</label>
            <br />
            <label>
              <input id="wd-text-entry" type="checkbox" /> Text Entry
            </label>
            <br />
            <label>
              <input id="wd-website-url" type="checkbox" /> Website URL
            </label>
            <br />
            <label>
              <input id="wd-media-recordings" type="checkbox" /> Media
              Recordings
            </label>
            <br />
            <label>
              <input id="wd-student-annotation" type="checkbox" /> Student
              Annotation
            </label>
            <br />
            <label>
              <input id="wd-file-upload" type="checkbox" /> File Uploads
            </label>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign-to">Assign | Assign to</label>
          </td>
          <td>
            <input id="wd-assign-to" defaultValue="Everyone" />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-due-date">Due</label>
          </td>
          <td>
            <input id="wd-due-date" type="date" defaultValue="2025-07-07" />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-available-from">Available from</label>
          </td>
          <td>
            <input
              id="wd-available-from"
              type="date"
              defaultValue="2025-07-07"
            />
            <label htmlFor="wd-available-until"> Until </label>
            <input
              id="wd-available-until"
              type="date"
              defaultValue="2025-07-08"
            />
          </td>
        </tr>
      </table>
      <br />
      <button>Cancel</button>
      <button>Save</button>
    </div>
  );
}
