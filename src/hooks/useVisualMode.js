import React, {useState, useEffect} from 'react';

export function useVisualMode(initial) {
  
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition (newMode, replace = false) {
    if (!replace) {
      setHistory((prev) => ([newMode, ...prev]))
    } else {
      setHistory((prev) => (prev))
    }
    return setMode((prev) => (newMode))
  }

  function back () {
    let historyCopy = history.slice(0);
    let prevMode;

    if (historyCopy.length > 1) {
      historyCopy.shift();
      prevMode = historyCopy[0];
      setHistory((prev) => (historyCopy))
    } else {
      prevMode = historyCopy[0];
    }
    return setMode((prev) => (prevMode))
  }
  
  return {
    mode,
    transition: transition,
    back: back
  }
};