// ProfileView.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profileView.css";
import Nav from "../home/sidebar";
import SidebarMobile from "../home/sidebarMobile";

export function ProfileView() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [disorderData, setDisorderData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          " https://upbeat-8f6t.onrender.com/profile/user_details",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          
          setUserData(data);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data :", error);
      }
    };

    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          " https://upbeat-8f6t.onrender.com/profile/profile_details",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        } else {
          console.error("Failed to fetch profile data");
        }
      } catch (error) {
        console.error("Error fetching profile data :", error);
      }
    };
    const fetchDisorderData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          " https://upbeat-8f6t.onrender.com/mental_health/mental_health",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setDisorderData(data);
        } else {
          console.error("Failed to fetch disorder data");
        }
      } catch (error) {
        console.error("Error fetching disorder data :", error);
      }
    };
    
    fetchUserData();
    fetchProfileData();
    fetchDisorderData();
  }, []);
console.log(disorderData[0])
  return (
    <>
      <Nav />
      <SidebarMobile />
      <div className="profile-container">
        <Nav />
        <h1 className="profile-header">Profile</h1>
        <div className="profile-section">
          <h3>User Details</h3>
          <div className="profile-details">
            <p>
              <strong>Name : </strong> {userData && userData.username}
            </p>
            <p>
              <strong>Email : </strong> {userData && userData.email}
            </p>
            <p>
              <strong>Phone Number : </strong>
              {userData && userData.phone_number}
            </p>
            <p>
              <strong>DOB : </strong>{profileData && profileData.profile.dob}
            </p>
            <p>
              <strong>Gender : </strong>{profileData && profileData.profile.gender}
            </p>
            <p>
              <strong>Report frequency :</strong> {profileData && profileData.profile.appointment_frequency}
            </p>
            <p>
              <strong>Disorder (Might not be accurate) :</strong> {disorderData && disorderData[0].prediction}
            </p>
            {/* Add more profile details as needed */}
          </div>
        </div>
        <div className="profile-section">
          <h3>Doctor Details</h3>
          <div className="profile-details">
            <p>
              <strong>Name :</strong> {profileData && profileData.doctor.name}
            </p>
            <p>
              <strong>Email :</strong> {profileData && profileData.doctor.email}
            </p>
            <p>
              <strong>Phone Number :</strong> {profileData && profileData.doctor.phone_number}
            </p>
            <p>
              <strong>Clinic or hospital Name :</strong> {profileData && profileData.doctor.clinic_or_hospital_name}
            </p>
            {/* Add more doctor details as needed */}
          </div>
        </div>
        <div className="profile-section">
          <h3>Emergency contact details</h3>
          <div className="profile-details">
            <p>
              <strong>Name :</strong> {profileData && profileData.emergency_contact.contact_name}
            </p>
            <p>
              <strong>Relationship : </strong>{profileData && profileData.emergency_contact.contact_relationship}
            </p>
            <p>
              <strong>Phone Number :</strong> {profileData && profileData.emergency_contact.contact_phone_number}
            </p>
            {/* Add more doctor details as needed */}
          </div>
        </div>
      </div>
    </>
  );
}

