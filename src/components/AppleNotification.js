import React from 'react';

function AppleNotification() {
  // Detects if device is on iOS
  const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  };

  const isInStandaloneMode = () =>
    'standalone' in window.navigator && window.navigator.standalone;

  return (
    <>
      {isIos() && !isInStandaloneMode() ? (
        <div className="apple-notification">
          <p>
            For a better experience, open this page in Safari, press the Action
            menu at the bottom center and press{' '}
            <strong>Add to Home Screen</strong>. Enjoy!
          </p>
        </div>
      ) : null}
    </>
  );
}

export default AppleNotification;
