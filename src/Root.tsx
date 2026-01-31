import React from "react";
import { Composition } from "remotion";
import { MainVideo, Kurzgesagt2Minute } from "./compositions";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Original 5-minute video */}
      <Composition
        id="MainVideo"
        component={MainVideo}
        durationInFrames={9000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      {/* New 2-minute Kurzgesagt-style video */}
      <Composition
        id="Kurzgesagt2Minute"
        component={Kurzgesagt2Minute}
        durationInFrames={3600}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
