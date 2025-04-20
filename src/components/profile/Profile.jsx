import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.scss';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Enrolled');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error("No token found in localStorage");
      setLoading(false);
      return;
    }

    axios.get('http://localhost:8080/user/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setProfile(response.data);
      })
      .catch(error => {
        console.error("Error fetching profile:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (activeTab === 'Enrolled') {
      const token = localStorage.getItem('token');
      if (!token) return;

      axios.get('http://localhost:8080/user/courses', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          setCourses(response.data);
        })
        .catch(error => {
          console.error("Error fetching courses:", error);
        });
    }
  }, [activeTab]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  if (loading) return <div className="profile-wrapper">Loading...</div>;
  if (!profile) return <div className="profile-wrapper">Profile not found.</div>;

  return (
    <div className="profile-wrapper">
      <div className="header-gradient" />
      <div className='content-wrapper'>
        <img
          src={profile.photoUrl || '/default-avatar.png'}
          alt="Profile"
          className="profile-image"
        />
        <div className="profile-card">

          <div className='photo-wrapper'>
            <div className="profile-info">
              <div className="name-line">
                <h2>{profile.firstName} {profile.lastName}</h2>
                <span className="badge">
                  {{
                    STUDENT: "სტუდენტი",
                    LECTURER: "ლექტორი",
                    ADMIN: "ადმინი"
                  }[profile.role] || profile.role}
                </span>
              </div>
              <p className="subtitle">{profile.email}</p>

              <div className="buttons">
                <button className="follow-btn">Follow</button>
                <button className="contact-btn">Get in touch</button>
              </div>

              <div className="stats">
                <div>
                  <strong>{profile.enrolledCourses?.length ?? 0}</strong>
                  <div>Courses</div>
                </div>
                <div>
                  <strong>132</strong>
                  <div>Following</div>
                </div>
                <div>
                  <strong>548</strong>
                  <div>Likes</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>


      <div className="tabs">
        <div
          className={`tab ${activeTab === 'Enrolled' ? 'active' : ''}`}
          onClick={() => handleTabClick('Enrolled')}
        >
          Enrolled
        </div>
        <div
          className={`tab ${activeTab === 'Progress' ? 'active' : ''}`}
          onClick={() => handleTabClick('Progress')}
        >
          Progress
        </div>
        <div
          className={`tab ${activeTab === 'Likes' ? 'active' : ''}`}
          onClick={() => handleTabClick('Likes')}
        >
          Likes
        </div>
        <div
          className={`tab ${activeTab === 'About' ? 'active' : ''}`}
          onClick={() => handleTabClick('About')}
        >
          About
        </div>
      </div>

      {activeTab === 'Enrolled' && (
        <div className="courses">
          {courses.length > 0 ? (
            <div className="course-cards">
              {courses.map((course, index) => (
                <div key={index} className="course-card">
                  <h3>{course.name}</h3>
                  <p>{course.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No enrolled courses.</p>
          )}
        </div>
      )}

      {activeTab === 'Progress' && (
        <div className="progress">
          <p>Progress content goes here.</p>
        </div>
      )}

      {activeTab === 'Likes' && (
        <div className="likes">
          <p>Likes content goes here.</p>
        </div>
      )}

      {activeTab === 'About' && (
        <div className="about">
          <p>About content goes here.</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
