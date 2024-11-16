import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  DashBoard,
  AddStudent,
  Student,
  StudentsDetails,
  SelectedStudent,
  Course,
} from "./components/index";

function App() {
  return (
 
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<DashBoard />}>
              <Route index path="/" element={<Student />} />
              <Route exact path="/add-student" element={<AddStudent />} />
              <Route exact path="/students/" element={<Student />} />
              <Route exact path="/students/:id" element={<StudentsDetails />} />
              <Route
                exact
                path="/selected-student"
                element={<SelectedStudent />}
              />
              <Route exact path="/course/:id" element={<Course />} />
            </Route>
          </Routes>
        </Router>
      </div>
 
  );
}

export default App;
