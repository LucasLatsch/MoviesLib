import React from "react";
import ReactPlayer from "react-player";

const YouTubeVideo = ({ videoId }) => {
  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoId}`}
        width="100%"
        height="450px"
        controls={true}
      />
    </div>
  );
};

export default YouTubeVideo;
