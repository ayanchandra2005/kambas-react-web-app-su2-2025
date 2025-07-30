import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { Button, ListGroup } from "react-bootstrap";

export default function TodoItem({ todo }: { todo: any }) {
  const dispatch = useDispatch();

  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center">
      {todo.title}
      <div className="d-flex gap-2">
        <Button
          variant="primary"
          onClick={() => dispatch(setTodo(todo))}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          onClick={() => dispatch(deleteTodo(todo.id))}
        >
          Delete
        </Button>
      </div>
    </ListGroup.Item>
  );
}