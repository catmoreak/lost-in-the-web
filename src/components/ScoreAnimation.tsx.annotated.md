# Annotated: src/components/ScoreAnimation.tsx

This file contains a client-side React component that animates a score change (gain/loss).
Below is a line-by-line copy of the original file with an explanation for each line.

1 | 'use client';
// Next.js directive to mark this file as a client component — ensures hooks and browser-only APIs work.

2 | 
3 | import { motion, AnimatePresence } from 'framer-motion';
// Imports `motion` and `AnimatePresence` from Framer Motion. `motion` creates animated elements, and `AnimatePresence` enables exit animations when elements are removed.

4 | import { useEffect, useState } from 'react';
// Imports React hooks `useEffect` and `useState` used for managing state and side effects in the component.

5 | 
6 | interface ScoreAnimationProps {
// Declares a TypeScript interface describing the component's props (the expected shape of props).

7 |   show: boolean;
// `show` indicates whether the animation should be triggered (true/false).

8 |   points: number;
// `points` is the numeric amount to display (can be positive or negative).

9 |   type: 'gain' | 'loss';
// `type` is a string union literal that must be either 'gain' or 'loss' — used to change styles and text.

10 | }
// End of the interface declaration.

11 | 
12 | export default function ScoreAnimation({ show, points, type }: ScoreAnimationProps) {
// Exports the React functional component `ScoreAnimation` as the default export. It accepts props typed as `ScoreAnimationProps` and uses destructuring to access `show`, `points`, and `type`.

13 |   const [visible, setVisible] = useState(false);
// Declares a state variable `visible` initialized to `false`. `visible` controls whether the animated element is mounted in the DOM. `setVisible` updates it.

14 | 
15 |   useEffect(() => {
// Starts a `useEffect` hook to run side effects when `show` changes.

16 |     if (show) {
// If the `show` prop is true, trigger the visible state and schedule it to hide after a timeout.

17 |       setVisible(true);
// Set `visible` to true so the animated element mounts and plays its enter animation.

18 |       const timer = setTimeout(() => {
// Create a timer that will hide the animation after a delay.

19 |         setVisible(false);
// When the timer runs, set `visible` back to false so the element unmounts and the exit animation can run.

20 |       }, 2000);
// The delay is 2000 milliseconds (2 seconds).

21 |       return () => clearTimeout(timer);
// Cleanup function: if the effect runs again or the component unmounts, clear the timeout to avoid memory leaks or unexpected state updates.

22 |     }
// End of the `if (show)` block. If `show` is false, the effect does nothing.

23 |   }, [show]);
// Effect dependency array: this effect runs whenever `show` changes.

24 | 
25 |   return (
// Begin return of JSX from the functional component.

26 |     <AnimatePresence>
// Use `AnimatePresence` to enable mount/unmount animations for children (handles exit animations correctly).

27 |       {visible && (
// Conditionally render the animated element only when `visible` is true. This drives enter/exit animations.

28 |         <motion.div
// A `motion.div` is an animated `div` from Framer Motion. The following lines define its animation props and styling.

29 |           initial={{ opacity: 0, y: 0, scale: 0.5 }}
// `initial` animation state when the component mounts: fully transparent (`opacity:0`), positioned at `y:0`, scaled down to 50%.

30 |           animate={{ opacity: 1, y: -50, scale: 1 }}
// `animate` target state: fade in (`opacity:1`), move upward by 50 pixels (`y:-50`), and scale to full size (`scale:1`).

31 |           exit={{ opacity: 0, y: -100, scale: 0.5 }}
// `exit` state when unmounting: fade out and move further up while shrinking — provides a clear exit animation.

32 |           transition={{ duration: 0.8, ease: "easeOut" }}
// Animation timing: 0.8 seconds duration with an `easeOut` easing for a smooth finish.

33 |           className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 font-bold text-4xl pointer-events-none ${
// `className` applies Tailwind CSS utility classes. The template literal concatenates classes based on the `type` prop. The classes center the element and style font, size, and stacking order. `pointer-events-none` lets clicks pass through.

34 |             type === 'gain' 
// Start of a conditional expression: check if `type` equals 'gain'.

35 |               ? 'text-green-400' 
// If `type` is 'gain', add a green text color class for emphasis.

36 |               : 'text-orange-400'
// Otherwise (for `loss`), use an orange text color class.

37 |           }`}
// Close the template literal and `className` prop.

38 |         >
// Close the opening tag for `motion.div` and begin its children.

39 |           <div className="flex items-center gap-2">
// A wrapper `div` using flex layout to horizontally place the points and emoji with some gap.

40 |             <span>{type === 'gain' ? '+' : '-'}{Math.abs(points)}</span>
// Displays a '+' for gains or '-' for losses, then the absolute value of `points` (ensures sign is controlled by the prefix).

41 |             <span className="text-2xl">
// A span for the emoji, slightly smaller than the numeric text.

42 |               {type === 'gain' ? '🎯' : '💡'}
// Shows a target emoji for gains and a lightbulb for losses (hint used).

43 |             </span>
// Close emoji span.

44 |           </div>
// Close the flex wrapper `div`.

45 |           <div className={`text-sm text-center mt-1 ${
// Another `div` used for the subtext (like 'Level Complete' or 'Hint Used'), with conditional color.

46 |             type === 'gain' ? 'text-green-300' : 'text-orange-300'
// If `gain`, use a lighter green; if `loss`, use a lighter orange for the subtext.

47 |           }`}>
// Close template literal and opening tag for the subtext `div`.

48 |             {type === 'gain' ? 'Level Complete' : 'Hint Used'}
// Conditionally render the message: when gaining points show 'Level Complete'; when losing show 'Hint Used'.

49 |           </div>
// Close the subtext `div`.

50 |         </motion.div>
// Close the animated `motion.div` element. This encloses both the main points and the subtext.

51 |       )}
// Close conditional rendering expression for `visible`.

52 |     </AnimatePresence>
// Close `AnimatePresence` wrapper.

53 |   );
// Close the returned JSX.

54 | }
// End of the functional component.


---

Notes / rationale:
- I created this separate annotated file instead of editing the source directly to avoid accidental syntax issues inside JSX attributes and to keep the repository code unchanged while still providing a full line-by-line explanation.
- If you want these comments injected inline into the source file instead, I can perform that (I recommend caution — comments inside JSX must use `{/* ... */}` and can make diffs noisy). 
- Next steps I can take on your confirmation: annotate more files in `src/components`, or switch to inline annotations.
