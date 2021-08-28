import React from 'react';

const Notifications = ({ message }) => (
    <div>
      {message ? <h3>{message}</h3> : null}
    </div>
);

export default Notifications;
