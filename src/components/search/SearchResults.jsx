import React, { useEffect, useState } from "react";
import "./SearchResults.scss"; // optional, for styles
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SearchResults = () => {
  const [courses, setCourses] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("q");
  const handleMouseMove = (e, index) => {
    const card = document.getElementById(`card-${index}`);
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    card.style.boxShadow = `${x * 0.05}px ${y * 0.05}px 20px #970747`;
  };

  const handleMouseLeave = (index) => {
    const card = document.getElementById(`card-${index}`);
    card.style.boxShadow = `0 2px 6px rgba(0, 0, 0, 0.1)`; // reset
  };

  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/courses/${id}`);
  };


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
      <div className="card-grid">
        {courses.map((course, index) => (
          <div
            key={index}
            id={`card-${index}`}
            className="card"
            onClick={() => handleCardClick(course.id)}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <img src={course.thumbnailURL} alt={course.name} />
            <div className="overlay">ნახე სილაბუსი</div>
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
