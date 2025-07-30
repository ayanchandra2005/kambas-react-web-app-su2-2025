const hello = () => {
  alert("Hello World!");
};
const lifeIs = (good: string) => {
  alert(`Life is ${good}`);
};
export default function ClickEvent() {
  return (
    <div id="wd-click-event">
      <h2>Click Event</h2>
      <button className="btn btn-primary rounded-pill me-2" onClick={hello} id="wd-hello-world-click">
        Hello World!
      </button>
      <button className="btn btn-success rounded-pill me-2" onClick={() => lifeIs("Good!")}
              id="wd-life-is-good-click">
        Life is Good!
      </button>
      <button className="btn btn-danger rounded-pill" onClick={() => {
                hello();
                lifeIs("Great!");
              }} id="wd-life-is-great-click">
        Life is Great!
      </button>
      <hr/>
    </div>
);}
