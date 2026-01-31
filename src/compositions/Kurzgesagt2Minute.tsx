import React from "react";
import { Series } from "remotion";
import {
  // Part 1
  Part1_Scene1_MonolithRises,
  Part1_Scene2_UsersArrive,
  Part1_Scene3_Crash,
  // Part 2
  Part2_Scene1_Decision,
  Part2_Scene2_Blueprint,
  Part2_Scene3_Planning,
  // Part 3
  Part3_Scene1_Separation,
  Part3_Scene2_Reveal,
  // Part 4
  Part4_Scene1_Network,
  Part4_Scene2_RequestFlow,
  // Part 5
  Part5_Scene1_TrafficSpike,
  Part5_Scene2_GatewayProtection,
  // Part 6
  Part6_Scene1_Scaling,
  Part6_Scene2_Resilience,
  Part6_Scene3_Conclusion,
} from "../scenes/kurzgesagt";

// Scene durations in frames (30fps)
// Part 1: 0:00-0:20 (600 frames)
const PART1_SCENE1 = 210;  // 0:00-0:07
const PART1_SCENE2 = 210;  // 0:07-0:14
const PART1_SCENE3 = 180;  // 0:14-0:20

// Part 2: 0:20-0:40 (600 frames)
const PART2_SCENE1 = 210;  // 0:20-0:27
const PART2_SCENE2 = 210;  // 0:27-0:34
const PART2_SCENE3 = 180;  // 0:34-0:40

// Part 3: 0:40-1:00 (600 frames)
const PART3_SCENE1 = 210;  // 0:40-0:47
const PART3_SCENE2 = 390;  // 0:47-1:00 (combined scenes)

// Part 4: 1:00-1:20 (600 frames)
const PART4_SCENE1 = 210;  // 1:00-1:07
const PART4_SCENE2 = 390;  // 1:07-1:20 (combined scenes)

// Part 5: 1:20-1:40 (600 frames)
const PART5_SCENE1 = 210;  // 1:20-1:27
const PART5_SCENE2 = 390;  // 1:27-1:40 (combined scenes)

// Part 6: 1:40-2:00 (600 frames)
const PART6_SCENE1 = 210;  // 1:40-1:47
const PART6_SCENE2 = 210;  // 1:47-1:54
const PART6_SCENE3 = 180;  // 1:54-2:00

/**
 * Kurzgesagt 2-Minute Microservices Animation
 *
 * Total duration: 2 minutes (3,600 frames @ 30fps)
 * Resolution: 1920x1080 (16:9)
 *
 * Based on the production guide specification.
 */
export const Kurzgesagt2Minute: React.FC = () => {
  return (
    <Series>
      {/* PART 1: Monolith & Problems (0:00-0:20) */}
      <Series.Sequence durationInFrames={PART1_SCENE1}>
        <Part1_Scene1_MonolithRises />
      </Series.Sequence>
      <Series.Sequence durationInFrames={PART1_SCENE2}>
        <Part1_Scene2_UsersArrive />
      </Series.Sequence>
      <Series.Sequence durationInFrames={PART1_SCENE3}>
        <Part1_Scene3_Crash />
      </Series.Sequence>

      {/* PART 2: Decision & Blueprint (0:20-0:40) */}
      <Series.Sequence durationInFrames={PART2_SCENE1}>
        <Part2_Scene1_Decision />
      </Series.Sequence>
      <Series.Sequence durationInFrames={PART2_SCENE2}>
        <Part2_Scene2_Blueprint />
      </Series.Sequence>
      <Series.Sequence durationInFrames={PART2_SCENE3}>
        <Part2_Scene3_Planning />
      </Series.Sequence>

      {/* PART 3: Separation & Reveal (0:40-1:00) */}
      <Series.Sequence durationInFrames={PART3_SCENE1}>
        <Part3_Scene1_Separation />
      </Series.Sequence>
      <Series.Sequence durationInFrames={PART3_SCENE2}>
        <Part3_Scene2_Reveal />
      </Series.Sequence>

      {/* PART 4: Network & Communication (1:00-1:20) */}
      <Series.Sequence durationInFrames={PART4_SCENE1}>
        <Part4_Scene1_Network />
      </Series.Sequence>
      <Series.Sequence durationInFrames={PART4_SCENE2}>
        <Part4_Scene2_RequestFlow />
      </Series.Sequence>

      {/* PART 5: Gateway & Security (1:20-1:40) */}
      <Series.Sequence durationInFrames={PART5_SCENE1}>
        <Part5_Scene1_TrafficSpike />
      </Series.Sequence>
      <Series.Sequence durationInFrames={PART5_SCENE2}>
        <Part5_Scene2_GatewayProtection />
      </Series.Sequence>

      {/* PART 6: Resilience & Conclusion (1:40-2:00) */}
      <Series.Sequence durationInFrames={PART6_SCENE1}>
        <Part6_Scene1_Scaling />
      </Series.Sequence>
      <Series.Sequence durationInFrames={PART6_SCENE2}>
        <Part6_Scene2_Resilience />
      </Series.Sequence>
      <Series.Sequence durationInFrames={PART6_SCENE3}>
        <Part6_Scene3_Conclusion />
      </Series.Sequence>
    </Series>
  );
};
