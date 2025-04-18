import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

    const navigate = useNavigate();

    const handleButtonClick = async () => {
        const token = localStorage.getItem("token");
        console.log(token);

        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/product/checkout",
                {
                    courseId: id,
                    paymentMethodType: "CARD" // default
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("Checkout response:", response.data);
            window.location.href = response.data.sessionUrl; // redirect to Stripe checkout page

        } catch (error) {
            console.error("Checkout failed:", error);
            if (error.response.status === 403) {
                alert(error.response.data.message || "ეს კურსი უკვე შეძენილი გაქვთ");
            } else {
                alert("შეცდომა მოხდა გადახდაზე გადასვლისას.");
            }
        }
    };



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
            <button onClick={handleButtonClick}>ვირჩევ ამ კურსს</button>
        </div>
    );
};

export default CourseDetail;
