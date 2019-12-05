import React from 'react';

// Notifies user if their device is offline

function OfflineNotification() {
  return (
    <>
      {!navigator.onLine && (
        <div className="mobile-alert offline">
          <p>You are offline.</p>
        </div>
      )}
    </>
  );
}

export default OfflineNotification;
