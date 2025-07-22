import Math, { add, subtract, multiply, divide } from "./Math";
import * as Mathematica from "./Math";

export default function DestructuringImports() {
  return (
    <div id="wd-destructuring-imports">
      <h2>Destructuring Imports</h2>
      <table className="table table-sm">
        <thead>
          <tr>
            <th>Math</th>
            <th>Mathematica</th>
            <th>Functions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Math.add(2, 3) = {Math.add(2, 3)}</td>
            <td>Mathematica.add(2, 3) = {Mathematica.add(2, 3)}</td>
            <td>add(2, 3) = {add(2, 3)}</td>
          </tr>
          <tr>
            <td>Math.subtract(5, 1) = {Math.subtract(5, 1)}</td>
            <td>Mathematica.subtract(5, 1) = {Mathematica.subtract(5, 1)}</td>
            <td>subtract(5, 1) = {subtract(5, 1)}</td>
          </tr>
          <tr>
            <td>Math.multiply(3, 4) = {Math.multiply(3, 4)}</td>
            <td>Mathematica.multiply(3, 4) = {Mathematica.multiply(3, 4)}</td>
            <td>multiply(3, 4) = {multiply(3, 4)}</td>
          </tr>
          <tr>
            <td>Math.divide(8, 2) = {Math.divide(8, 2)}</td>
            <td>Mathematica.divide(8, 2) = {Mathematica.divide(8, 2)}</td>
            <td>divide(8, 2) = {divide(8, 2)}</td>
          </tr>
        </tbody>
      </table>
      <hr />
    </div>
  );
}