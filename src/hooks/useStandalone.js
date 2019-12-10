import { useState, useEffect } from 'react';
/*
  Checks whether the app was launched from a browser (web or mobile)...
  using the URL or if it was launched from user's homescreen (standalone)
*/
function useStandalone() {
  const [isStandalone, setIsStandalone] = useState(false);
  useEffect(() => {
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone ||
      document.referrer.includes('android-app://')
    ) {
      setIsStandalone(true);
    }
  }, []);
  return isStandalone;
}
export default useStandalone;
/*
  Usage
  `const isStandalone = useStandalone()`
  returns `true` if launched from user's homescreen
  returns `false` if launched from a browser
*/
