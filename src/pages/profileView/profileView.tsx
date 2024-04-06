import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function ProfileView() {
  const navigate = useNavigate(); // Access navigate function for navigation
  const [userData, setUserData] = useState<any>(null); // Initialize userData as null
const [profileData, setProfileData] = useState<any>(null); // Initialize profileData as null

useEffect(() => {
  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      // Fetch user data from backend API
      const response = await fetch("http://13.233.127.190:8080/profile/user_details", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Replace with your access token
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        // If response is successful, parse and set user data
        const data = await response.json();
        setUserData(data);
        console.log("User data:", data);
      } else {
        // If response is not successful, handle error
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Function to fetch profile data
  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("token");
      // Fetch profile data from backend API
      const response = await fetch("http://13.233.127.190:8080/profile/profile_details", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Replace with your access token
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        // If response is successful, parse and set profile data
        const data = await response.json();
        setProfileData(data);
        console.log("Profile data:", data);
      } else {
        // If response is not successful, handle error
        console.error("Failed to fetch profile data");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  // Call the fetchUserData function
  fetchUserData();

  // Call the fetchProfileData function
  fetchProfileData();
}, []);


  {/* Render profile details */}
  // {profileData && (
  //   <div>
  //     <p>Name: {profileData.name}</p>
  //     <p>Email: {profileData.email}</p>
  //     {/* Add more profile details as needed */}
  //   </div>
  // )}
  return (
    <div>
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
    </div>
  );
}
