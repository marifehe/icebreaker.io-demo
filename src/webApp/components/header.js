'use strict';

import React from 'react';

const Header = () => {
  const repo = 'https://github.com/elbecita/icebreaker.io';
  return (
    <div className="jumbotron text-center">
      <h1 className="display-3">Oh hi! Let's break the ice.</h1>
      <p className="lead">This is a simple example of a webRTC chat application, using the signaling server and JavaScript
        client library implemented in <strong><a href={repo} target="_blank">icebreaker.io</a></strong> set of libraries.</p>
    </div>
  );
};

export default Header;