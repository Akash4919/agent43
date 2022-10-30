import React from "react";

function VideoComponent(props) {
  const { src } = props;
  return (
    <video
      width="100%"
      height="20%"
      src={src}
      type={"video/mp4"}
      controls
    ></video>
  );
}

export default VideoComponent;
