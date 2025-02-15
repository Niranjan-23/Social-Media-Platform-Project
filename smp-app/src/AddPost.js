import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import BackupTwoToneIcon from "@mui/icons-material/BackupTwoTone";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import "./AddPost.css"; 

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function AddPost({ loggedInUser, onAddPost }) {
  const [files, setFiles] = useState("");

  // Handle file selection
  const newPost = (event) => {
    const image = event.target.files[0];
    setFiles(URL.createObjectURL(image));
  };

  // When "Post" is clicked, call the callback to update the user's posts
  const handlePost = () => {
    if (files) {
      onAddPost(files);
      setFiles("");
    }
  };

  return (
    <div className="add-container">
      {files ? (
        <>
          <img src={files} alt="Selected" />
          <div className="post-button">
            <div>
              <Button
                size="medium"
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<FileUploadOutlinedIcon />}
              >
                Upload
                <VisuallyHiddenInput
                  type="file"
                  onChange={newPost}
                  multiple
                  accept="image/*"
                />
              </Button>
            </div>
            <div>
              <Button
                size="medium"
                variant="contained"
                startIcon={<BackupTwoToneIcon />}
                onClick={handlePost}
              >
                Post
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <h3>No Image is uploaded</h3>
          <Button
            size="small"
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<FileUploadOutlinedIcon />}
          >
            Upload
            <VisuallyHiddenInput
              type="file"
              onChange={newPost}
              multiple
              accept="image/*"
            />
          </Button>
        </>
      )}
    </div>
  );
}
