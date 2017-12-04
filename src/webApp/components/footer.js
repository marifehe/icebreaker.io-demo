'use strict';

import React from 'react';

const Footer = () => {
  const repo = 'https://github.com/elbecita/icebreaker.io';

  return (
    <div className="container footer d-flex justify-content-center">
        <a href={repo} target="_blank"><i className="fa fa-2x fa-github"></i></a>
    </div>
  );
}

export default Footer;