import {Composition} from 'remotion';
import {MicroservicesIn2Minutes} from './MicroservicesIn2Minutes';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="MicroservicesIn2Minutes"
        component={MicroservicesIn2Minutes}
        durationInFrames={3600}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{}}
      />
    </>
  );
};
