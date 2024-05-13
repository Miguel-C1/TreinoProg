import {Outlet} from 'react-router';
import {useMatches} from 'react-router-dom';
import React from 'react';

export default function Template() {
  const matches = useMatches();

  return (
    <>
      <div className="app">
        <div className="wrapper">
          <Outlet />
        </div>
      </div>
    </>
  );
}
