import { Router, Routes, Route, Link } from "react-router-dom";

const demo = () => {
  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<Link to="/home">Home</Link>} />{" "} */}
        <Route path="/home" />
      </Routes>

      <h1>Hello, world!</h1>
    </div>
  );
};

export default demo;
