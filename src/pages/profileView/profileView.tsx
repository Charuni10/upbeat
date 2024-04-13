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
          console.log("yes")
          const data = await response.json();
          setProfileData(data);
        } else {
          console.error("Failed to fetch profile data");
        }
      } catch (error) {
        console.error("Error fetching profile data :", error);
      }
    };
    fetchUserData();
    fetchProfileData();
  }, []);
console.log(userData,profileData)
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
              <strong>Name :</strong> {profileData && profileData.name}
            </p>
            <p>
              <strong>Email :</strong> {profileData && profileData.email}
            </p>
            <p>
              <strong>Phone Number :</strong>{" "}
              {profileData && profileData.phone_number}
            </p>
            <p>
              <strong>DOB :</strong>
            </p>
            <p>
              <strong>Gender :</strong>
            </p>
            <p>
              <strong>Report frequency :</strong>
            </p>
            {/* Add more profile details as needed */}
          </div>
        </div>
        <div className="profile-section">
          <h3>Doctor Details</h3>
          <div className="profile-details">
            <p>
              <strong>Name :</strong> {profileData && profileData.doctorName}
            </p>
            <p>
              <strong>Email :</strong> {profileData && profileData.doctorEmail}
            </p>
            <p>
              <strong>Phone Number :</strong>
            </p>
            <p>
              <strong>Clinic or hospital Name :</strong>
            </p>
            {/* Add more doctor details as needed */}
          </div>
        </div>
        <div className="profile-section">
          <h3>Emergency contact details</h3>
          <div className="profile-details">
            <p>
              <strong>Name :</strong> {profileData && profileData.doctorName}
            </p>
            <p>
              <strong>Relationship : </strong>
              {profileData && profileData.doctorEmail}
            </p>
            <p>
              <strong>Phone Number :</strong>
            </p>
            {/* Add more doctor details as needed */}
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* <div>
      <h1>Profile</h1>
    <p>Name</p>
    <p>Email</p>
    <p>Phone Number</p>
    <p>DOB</p>
    <p>Gender</p>
    <p>Report frequency</p>
    <h1>Doctor details</h1>
    <p>Name</p>
    <p>Email</p>
    <p>Phone Number</p>
    <p>Clinic or hospital name</p>
    <h1>Emergency contact details</h1>
    <p>Name</p>
    <p>Relationship</p>
    <p>Phone Number</p>
    </div> */
}
