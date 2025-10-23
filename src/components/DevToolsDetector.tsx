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
          console.log('%c ◉ Perception expanded', 'color: #10b981; font-size: 14px;');
          console.log('%c◦ New layers are now visible', 'color: #06d6a0; font-size: 12px;');
        }
      } else {
        if (devtools.open) {
          devtools.open = false;
          setIsDevToolsOpen(false);
          onDevToolsToggle(false);
        }
      }
    }, 500);

   
    console.log('%c◉ DIGITAL ESCAPE PROTOCOL ACTIVE', 'color: #10b981; font-size: 16px; font-weight: bold;');
    console.log('%c◦ Reality has multiple layers...', 'color: #06d6a0; font-size: 12px;');
    console.log('%c◦ Type help() to understand more', 'color: #22d3ee; font-size: 12px;');

    
    (window as any).help = () => {
      console.log('%c ◉ GUIDANCE SYSTEM', 'color: #22d3ee; font-size: 14px; font-weight: bold;');
      console.log('◦ Examine the structure beneath the surface');
      console.log('◦ Modify what seems unchangeable');
      console.log('◦ Speak the language of machines');
      console.log('◦ Type hint() for current layer guidance');
    };

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