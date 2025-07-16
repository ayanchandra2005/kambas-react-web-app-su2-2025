import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";

export default function Dashboard() {
  return (
    <div id="wd-dashboard"> 
     <h1 id="wd-dashboard-title">Dashboard</h1> <hr /> 
     <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr /> 
     <div id="wd-dashboard-courses"> 
      <Row xs={1} md={4} className="g-4"> 

       <Col className="wd-dashboard-course" style={{ width: "300px" }}> 
        <Card> 
         <Link to="/Kambaz/Courses/1234/Home" className="wd-dashboard-course-link text-decoration-none text-dark"> 
          <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160}/> 
          <Card.Body> 
           <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1234 React JS</Card.Title> 
           <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
            Full Stack software developer</Card.Text> 
           <Button variant="primary">Go</Button> 
          </Card.Body> 
         </Link> 
        </Card> 
       </Col> 

       <Col className="wd-dashboard-course" style={{ width: "300px" }}> 
        <Card> 
         <Link to="/Kambaz/Courses/2345/Home" className="wd-dashboard-course-link text-decoration-none text-dark"> 
          <Card.Img variant="top" src="/images/node.jpg" width="100%" height={160}/> 
          <Card.Body> 
           <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS2345 Node.js</Card.Title> 
           <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
            Server-Side Development</Card.Text> 
           <Button variant="primary">Go</Button> 
          </Card.Body> 
         </Link> 
        </Card> 
       </Col> 

       <Col className="wd-dashboard-course" style={{ width: "300px" }}> 
        <Card> 
         <Link to="/Kambaz/Courses/3456/Home" className="wd-dashboard-course-link text-decoration-none text-dark"> 
          <Card.Img variant="top" src="/images/mongodb.jpg" width="100%" height={160}/> 
          <Card.Body> 
           <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS3456 MongoDB</Card.Title> 
           <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
            Database Design and Integration</Card.Text> 
           <Button variant="primary">Go</Button> 
          </Card.Body> 
         </Link> 
        </Card> 
       </Col> 

       <Col className="wd-dashboard-course" style={{ width: "300px" }}> 
        <Card> 
         <Link to="/Kambaz/Courses/4567/Home" className="wd-dashboard-course-link text-decoration-none text-dark"> 
          <Card.Img variant="top" src="/images/html.jpg" width="100%" height={160}/> 
          <Card.Body> 
           <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS4567 HTML & CSS</Card.Title> 
           <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
            Building Web Pages</Card.Text> 
           <Button variant="primary">Go</Button> 
          </Card.Body> 
         </Link> 
        </Card> 
       </Col> 

       <Col className="wd-dashboard-course" style={{ width: "300px" }}> 
        <Card> 
         <Link to="/Kambaz/Courses/5678/Home" className="wd-dashboard-course-link text-decoration-none text-dark"> 
          <Card.Img variant="top" src="/images/javascript.jpg" width="100%" height={160}/> 
          <Card.Body> 
           <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS5678 JavaScript</Card.Title> 
           <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
            Dynamic Web Interaction</Card.Text> 
           <Button variant="primary">Go</Button> 
          </Card.Body> 
         </Link> 
        </Card> 
       </Col> 

       <Col className="wd-dashboard-course" style={{ width: "300px" }}> 
        <Card> 
         <Link to="/Kambaz/Courses/6789/Home" className="wd-dashboard-course-link text-decoration-none text-dark"> 
          <Card.Img variant="top" src="/images/typescript.jpg" width="100%" height={160}/> 
          <Card.Body> 
           <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS6789 TypeScript</Card.Title> 
           <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
            Typed JavaScript Development</Card.Text> 
           <Button variant="primary">Go</Button> 
          </Card.Body> 
         </Link> 
        </Card> 
       </Col> 

       <Col className="wd-dashboard-course" style={{ width: "300px" }}> 
        <Card> 
         <Link to="/Kambaz/Courses/7890/Home" className="wd-dashboard-course-link text-decoration-none text-dark"> 
          <Card.Img variant="top" src="/images/redux.jpg" width="100%" height={160}/> 
          <Card.Body> 
           <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS7890 Redux</Card.Title> 
           <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
            State Management with React</Card.Text> 
           <Button variant="primary">Go</Button> 
          </Card.Body> 
         </Link> 
        </Card> 
       </Col> 

      </Row> 
     </div> 
    </div>
  );
}