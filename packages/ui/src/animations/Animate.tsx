import 'raf/polyfill';
import { MotiView } from 'moti';

export const Animate = () => {
  return (
    <MotiView
      from={{
        opacity: 0,
        scale: 0.5,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        type: 'timing',
      }}
      style={{
        justifyContent: 'center',
        height: 250,
        width: 250,
        borderRadius: 25,
        marginRight: 10,
        backgroundColor: 'white',
      }}
    />
  );
};
