import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CourseDetail.scss"; // create this if needed

const CourseDetail = () => {
  const { id } = useParams(); // courseId from URL
  const [course, setCourse] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {

        const res = await axios.get(`http://localhost:8080/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        setError("Couldn't fetch course details.");
        console.error("Course fetch error:", err);
      }
    };

    fetchCourse();
  }, [id]);

  if (error) return <div className="course-detail-error">{error}</div>;
  if (!course) return <div className="course-detail-loading">Loading...</div>;
  return (
    <div className="course-detail">
      <img src={course.thumbnailURL} alt={course.name} className="thumbnail" />
      <h1>{course.name}</h1>
      <p>{course.description}</p>
      <p><strong>Price:</strong> ${course.price}</p>
      <p><strong>Instructor:</strong> {course.instructorEmail}</p>

      <h3>Lessons:</h3>
      <ul>
        {course.lessonTitles.map((title, index) => (
          <li key={index}>{title}</li>
        ))}
      </ul>
    </div>
  );
};

export default CourseDetail;
