import React, { useEffect, useState } from "react";
import "./SearchResults.scss"; // optional, for styles
import axios from "axios";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const [courses, setCourses] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("q");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:8080/courses/search", {
          params: { name: searchTerm },
        });
        setCourses(res.data);
      } catch (err) {
        console.error("Search fetch failed", err);
      }
    };

    if (searchTerm) {
      fetchCourses();
    }
  }, [searchTerm]);

  return (
    <div className="search-results">
      <h2>Results for "{searchTerm}"</h2>
      <div className="card-grid">
        {courses.map((course, index) => (
          <div key={index} className="card">
            <img src={course.thumbnailURL} alt={course.name} />
            <div className="card-content">
              <h3>{course.name}</h3>
              <p>{course.description}</p>
              <p><strong>Price:</strong> ${course.price}</p>
              <p><strong>Instructor:</strong> {course.instructorEmail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
