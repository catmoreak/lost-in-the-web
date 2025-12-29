'use client';

import { useEffect, useState } from 'react';

interface DevToolsDetectorProps {
  onDevToolsToggle: (isOpen: boolean) => void;
}

export default function DevToolsDetector({ onDevToolsToggle }: DevToolsDetectorProps) {
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);

  useEffect(() => {
    let devtools = { open: false };
    const threshold = 160;

    setInterval(() => {
      if (
        window.outerHeight - window.innerHeight > threshold ||
        window.outerWidth - window.innerWidth > threshold
      ) {
        if (!devtools.open) {
          devtools.open = true;
          setIsDevToolsOpen(true);
          onDevToolsToggle(true);
          console.log('%c⚠️ DevTools opened! Proceed with caution...', 'color: #ff0000; font-size: 16px;');
        }
      } else {
        if (devtools.open) {
          devtools.open = false;
          setIsDevToolsOpen(false);
          onDevToolsToggle(false);
        }
      }
    }, 500);

    


    (window as any).hint = () => {
      console.log('%c◦ Current layer requires deeper inspection', 'color: #10b981; font-size: 12px;');
      console.log('◦ The answers lie within the foundation...');
    };

    (window as any).glitch = () => {
      console.log('%c⚡ REALITY GLITCH ACTIVATED ⚡', 'color: #ff0000; font-size: 16px;');
      document.body.style.filter = 'hue-rotate(90deg) saturate(2)';
      setTimeout(() => {
        document.body.style.filter = '';
        console.log('Reality stabilized...');
      }, 3000);
    };

  }, [onDevToolsToggle]);

  return null; 
}