import { useState, useEffect } from 'react';
/*
  Checks whether the app was launched from a browser (web or mobile)...
  using the URL or if it was launched from user's homescreen (standalone)
*/
function useIsAppInStandaloneMode() {
  const [IsAppInStandaloneMode, setIsAppInStandaloneMode] = useState(false);
  useEffect(() => {
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone ||
      document.referrer.includes('android-app://')
    ) {
      setIsAppInStandaloneMode(true);
    }
  }, []);
  return IsAppInStandaloneMode;
}
export default useIsAppInStandaloneMode;
/*
  Usage
  `const standaloneMode = useIsAppInStandaloneMode()`
  returns `true` if launched from user's homescreen
  returns `false` if launched from a browser
*/
