import { useRef, useEffect } from 'react';

const useKeepScrollPosition = (deps = []) => {
  const containerRef = useRef(null);
  const previousScrollPosition = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      // Save previous scroll position
      previousScrollPosition.current = container.scrollHeight - container.scrollTop;
      console.log("useEffect: Updated previousScrollPosition:", previousScrollPosition.current);
    }
  }, [deps]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      // Restore scroll position
      container.scrollTop = container.scrollHeight - previousScrollPosition.current;
      console.log("useEffect: Restored scroll position:", container.scrollTop);
    }
  }, [deps]);


  console.log('containerRefcontainerRefcontainerRefcontainerRef', containerRef);
  
  return { containerRef };
};

export default useKeepScrollPosition;
