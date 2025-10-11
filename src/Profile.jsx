import React from "react";
import profilePic from "./assets/LinkedIn.jpg";

const Profile = () => (
  <div className="flex flex-col items-center mt-4">
    <img
      src={profilePic}
      alt="Profile"
      className="rounded-full w-32 h-32 object-cover border-4 border-gray-300 shadow-lg"
    />
  <h2 className="mt-4 text-xl font-semibold">Prarthana Suresh Kumar</h2>
  </div>
);

export default Profile;
