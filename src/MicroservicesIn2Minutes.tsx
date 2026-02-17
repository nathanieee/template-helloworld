import React from 'react';
import {AbsoluteFill} from 'remotion';
import {TransitionSeries} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {wipe} from '@remotion/transitions/wipe';
import {springTiming, linearTiming} from '@remotion/transitions';
import {Background} from './components/shared/Background';
import {Scene1Hook} from './components/scenes/Scene1Hook';
import {Scene2MonolithExplained} from './components/scenes/Scene2MonolithExplained';
import {Scene3IntroMicroservices} from './components/scenes/Scene3IntroMicroservices';
import {Scene4Resilience} from './components/scenes/Scene4Resilience';
import {Scene5Scalability} from './components/scenes/Scene5Scalability';
import {Scene6TechnologyFreedom} from './components/scenes/Scene6TechnologyFreedom';
import {Scene7Tradeoffs} from './components/scenes/Scene7Tradeoffs';
import {Scene8Outro} from './components/scenes/Scene8Outro';

export const MicroservicesIn2Minutes: React.FC = () => {
  return (
    <AbsoluteFill>
      <Background />
      <TransitionSeries>
        {/* Scene 1: Hook (0-300 frames) */}
        <TransitionSeries.Sequence durationInFrames={300}>
          <Scene1Hook />
        </TransitionSeries.Sequence>
        
        {/* Transition 1-2 */}
        <TransitionSeries.Transition
          timing={springTiming({ config: { damping: 200 } })}
          presentation={wipe()}
        />
        
        {/* Scene 2: Monolith Explained (300-750 frames) */}
        <TransitionSeries.Sequence durationInFrames={450}>
          <Scene2MonolithExplained />
        </TransitionSeries.Sequence>
        
        {/* Transition 2-3 */}
        <TransitionSeries.Transition
          timing={linearTiming({ durationInFrames: 30 })}
          presentation={wipe()}
        />
        
        {/* Scene 3: Intro Microservices (750-1350 frames) */}
        <TransitionSeries.Sequence durationInFrames={600}>
          <Scene3IntroMicroservices />
        </TransitionSeries.Sequence>
        
        {/* Transition 3-4 */}
        <TransitionSeries.Transition
          timing={springTiming({ config: { damping: 200 } })}
          presentation={fade()}
        />
        
        {/* Scene 4: Resilience (1350-1950 frames) */}
        <TransitionSeries.Sequence durationInFrames={600}>
          <Scene4Resilience />
        </TransitionSeries.Sequence>
        
        {/* Transition 4-5 */}
        <TransitionSeries.Transition
          timing={linearTiming({ durationInFrames: 25 })}
          presentation={wipe()}
        />
        
        {/* Scene 5: Scalability (1950-2550 frames) */}
        <TransitionSeries.Sequence durationInFrames={600}>
          <Scene5Scalability />
        </TransitionSeries.Sequence>
        
        {/* Transition 5-6 */}
        <TransitionSeries.Transition
          timing={springTiming({ config: { damping: 200 } })}
          presentation={fade()}
        />
        
        {/* Scene 6: Technology Freedom (2550-3000 frames) */}
        <TransitionSeries.Sequence durationInFrames={450}>
          <Scene6TechnologyFreedom />
        </TransitionSeries.Sequence>
        
        {/* Transition 6-7 */}
        <TransitionSeries.Transition
          timing={linearTiming({ durationInFrames: 20 })}
          presentation={wipe()}
        />
        
        {/* Scene 7: Tradeoffs (3000-3300 frames) */}
        <TransitionSeries.Sequence durationInFrames={300}>
          <Scene7Tradeoffs />
        </TransitionSeries.Sequence>
        
        {/* Transition 7-8 */}
        <TransitionSeries.Transition
          timing={springTiming({ config: { damping: 200 } })}
          presentation={fade()}
        />
        
        {/* Scene 8: Outro (3300-3600 frames) */}
        <TransitionSeries.Sequence durationInFrames={300}>
          <Scene8Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
