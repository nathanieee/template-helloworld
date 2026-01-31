import React from "react";
import { Series } from "remotion";
import {
  Scene0_Monolith,
  Scene1_UsersArrive,
  Scene2_Queue,
  Scene3_InternalTangle,
  Scene4_DatabaseLock,
  Scene5_Crash,
  Scene6_Decision,
  Scene7_Blueprint,
  Scene8_Separation,
  Scene9_SheddingSkin,
  Scene10_Reveal,
  Scene11_Network,
  Scene12_Request,
  Scene13_Processing,
  Scene14_Response,
  Scene15_Chaos,
  Scene16_GatewayArrives,
  Scene17_Routing,
  Scene18_Intruder,
  Scene19_ServiceDiscovery,
  Scene20_LooseCoupling,
  Scene21_ChaosMonkey,
  Scene22_Failure,
  Scene23_CircuitBreaker,
  Scene24_Load,
  Scene25_LoadBalancer,
  Scene26_Cloning,
  Scene27_ZoomOut,
  Scene28_Tradeoff,
  Scene29_TheEnd,
} from "../scenes";

const SCENE_DURATION = 300; // 10 seconds per scene

export const MainVideo: React.FC = () => {
  return (
    <Series>
      {/* Scene 0: Monolith Introduction */}
      <Series.Sequence durationInFrames={SCENE_DURATION}>
        <Scene0_Monolith />
      </Series.Sequence>

      {/* Scene 1: Users Arrive */}
      <Series.Sequence durationInFrames={SCENE_DURATION}>
        <Scene1_UsersArrive />
      </Series.Sequence>

      {/* Scene 2: The Queue */}
      <Series.Sequence durationInFrames={SCENE_DURATION}>
        <Scene2_Queue />
      </Series.Sequence>

      {/* Scene 3: Internal Tangle */}
      <Series.Sequence durationInFrames={SCENE_DURATION}>
        <Scene3_InternalTangle />
      </Series.Sequence>

      {/* Scene 4: Database Lock */}
      <Series.Sequence durationInFrames={SCENE_DURATION}>
        <Scene4_DatabaseLock />
      </Series.Sequence>

      {/* Scene 5: The Crash */}
      <Series.Sequence durationInFrames={SCENE_DURATION}>
        <Scene5_Crash />
      </Series.Sequence>

      {/* Scene 6: The Decision */}
      <Series.Sequence durationInFrames={SCENE_DURATION}>
        <Scene6_Decision />
      </Series.Sequence>

      {/* Scene 7: The Blueprint */}
      <Series.Sequence durationInFrames={SCENE_DURATION}>
        <Scene7_Blueprint />
      </Series.Sequence>

      {/* Scene 8: The Separation */}
      <Series.Sequence durationInFrames={SCENE_DURATION}>
        <Scene8_Separation />
      </Series.Sequence>

      {/* Scene 9: Shedding Skin */}
      <Series.Sequence durationInFrames={SCENE_DURATION}>
        <Scene9_SheddingSkin />
      </Series.Sequence>

      {/* Scene 10: Reveal */}
      <Series.Sequence durationInFrames={SCENE_DURATION}>
        <Scene10_Reveal />
      </Series.Sequence>

      {/* Scene 11: The Network */}
      <Series.Sequence durationInFrames={SCENE_DURATION}>
        <Scene11_Network />
      </Series.Sequence>

      {/* Scene 12: The Request */}
      <Series.Sequence durationInFrames={SCENE_DURATION}>
        <Scene12_Request />
      </Series.Sequence>

      {/* Scene 13: Processing */}
      <Series.Sequence durationInFrames={SCENE_DURATION}>
        <Scene13_Processing />
      </Series.Sequence>

      {/* Scene 14: The Response */}
      <Series.Sequence durationInFrames={SCENE_DURATION}>
        <Scene14_Response />
      </Series.Sequence>

      {/* Scene 15: The Chaos */}
      <Series.Sequence durationInFrames={SCENE_DURATION}>
        <Scene15_Chaos />
      </Series.Sequence>

      {/* Scene 16: Gateway Arrives */}
      <Series.Sequence durationInFrames={SCENE_DURATION}>
        <Scene16_GatewayArrives />
      </Series.Sequence>

      {/* Scene 17: Routing */}
      <Series.Sequence durationInFrames={SCENE_DURATION}>
        <Scene17_Routing />
      </Series.Sequence>

      {/* Scene 18: The Intruder */}
      <Series.Sequence durationInFrames={SCENE_DURATION}>
        <Scene18_Intruder />
      </Series.Sequence>

      {/* Scene 19: Service Discovery */}
      <Series.Sequence durationInFrames={SCENE_DURATION}>
        <Scene19_ServiceDiscovery />
      </Series.Sequence>

      {/* Scene 20: Loose Coupling */}
      <Series.Sequence durationInFrames={SCENE_DURATION}>
        <Scene20_LooseCoupling />
      </Series.Sequence>

      {/* Scene 21: Chaos Monkey */}
      <Series.Sequence durationInFrames={SCENE_DURATION}>
        <Scene21_ChaosMonkey />
      </Series.Sequence>

      {/* Scene 22: The Failure */}
      <Series.Sequence durationInFrames={SCENE_DURATION}>
        <Scene22_Failure />
      </Series.Sequence>

      {/* Scene 23: Circuit Breaker */}
      <Series.Sequence durationInFrames={SCENE_DURATION}>
        <Scene23_CircuitBreaker />
      </Series.Sequence>

      {/* Scene 24: The Load */}
      <Series.Sequence durationInFrames={SCENE_DURATION}>
        <Scene24_Load />
      </Series.Sequence>

      {/* Scene 25: Load Balancer */}
      <Series.Sequence durationInFrames={SCENE_DURATION}>
        <Scene25_LoadBalancer />
      </Series.Sequence>

      {/* Scene 26: Cloning */}
      <Series.Sequence durationInFrames={SCENE_DURATION}>
        <Scene26_Cloning />
      </Series.Sequence>

      {/* Scene 27: Zoom Out */}
      <Series.Sequence durationInFrames={SCENE_DURATION}>
        <Scene27_ZoomOut />
      </Series.Sequence>

      {/* Scene 28: Trade-off */}
      <Series.Sequence durationInFrames={SCENE_DURATION}>
        <Scene28_Tradeoff />
      </Series.Sequence>

      {/* Scene 29: The End */}
      <Series.Sequence durationInFrames={SCENE_DURATION}>
        <Scene29_TheEnd />
      </Series.Sequence>
    </Series>
  );
};
