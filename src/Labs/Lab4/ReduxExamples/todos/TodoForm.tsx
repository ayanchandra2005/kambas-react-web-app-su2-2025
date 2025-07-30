import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { Button, ListGroup, InputGroup, FormControl } from "react-bootstrap";

export default function TodoForm() {
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();

  return (
    <ListGroup.Item className="d-flex align-items-center gap-2">
      <InputGroup className="flex-grow-1">
        <FormControl
          value={todo.title}
          onChange={(e) =>
            dispatch(setTodo({ ...todo, title: e.target.value }))
          }
          placeholder="Enter todo"
        />
      </InputGroup>
      <Button
        variant="warning"
        id="wd-update-todo-click"
        onClick={() => dispatch(updateTodo(todo))}
      >
        Update
      </Button>
      <Button
        variant="success"
        id="wd-add-todo-click"
        onClick={() => dispatch(addTodo(todo))}
      >
        Add
      </Button>
    </ListGroup.Item>
  );
}