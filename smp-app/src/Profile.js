import React, { useState, useEffect } from "react";
import EditProfileComponent from "./EditProfileComponent";
import "./Profile.css";

const Profile = ({ user, onUpdateUser }) => {
  // Local state for the current user’s data.
  const [localUser, setLocalUser] = useState(user);
  const [showEdit, setShowEdit] = useState(false);

  // When the user prop changes, update the local copy.
  useEffect(() => {
    setLocalUser(user);
  }, [user]);

  const handleEditClick = () => {
    setShowEdit(true);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
  };

  // This function will be passed to EditProfileComponent.
  // It updates the local state and calls the parent's onUpdateUser callback.
  const handleSaveProfile = (updatedUser) => {
    setLocalUser(updatedUser);
    if (onUpdateUser) {
      onUpdateUser(updatedUser);
    }
  };

  if (!localUser) {
    return <div className="profile-container">No user data available.</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image-wrapper">
          <img src={localUser.profileImage} alt="Profile" className="profile-image" />
        </div>
        <div className="profile-details">
          <h2 className="profile-name">{localUser.name}</h2>
          <p className="profile-username">@{localUser.username}</p>
          <p className="profile-bio">{localUser.bio}</p>
          <div className="profile-stats">
            <div>
              <strong>{localUser.posts.length}</strong> Posts
            </div>
            <div>
              <strong>1.5k</strong> Followers
            </div>
            <div>
              <strong>350</strong> Following
            </div>
          </div>
          <button onClick={handleEditClick} className="edit-profile-button">
            Edit Profile
          </button>
        </div>
      </div>

      <div className="post-grid">
        {localUser.posts.map((post, index) => (
          <div className="post-item" key={index}>
            <img src={post} alt={`Post ${index + 1}`} className="post-image" />
          </div>
        ))}
      </div>

      {showEdit && (
        <EditProfileComponent
          user={localUser}
          onClose={handleCloseEdit}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  );
};

export default Profile;
