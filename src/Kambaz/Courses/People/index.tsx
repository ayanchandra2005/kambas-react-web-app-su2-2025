import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PeopleTable from "./Table";           
import * as courseClient from "../client";    

export default function People() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    if (!cid) return;
    (async () => {
      const list = await courseClient.findUsersForCourse(cid);
      setUsers(list);
    })();
  }, [cid]);

  return (
    <div id="wd-course-people">
      <h3>People</h3>
      <PeopleTable users={users} />
    </div>
  );
}