import {Outlet} from 'react-router';
import './style.scss';
import {useMatches} from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import React from 'react';

export default function Template() {
  const matches = useMatches();
  const title = (matches.slice(-1)[0]?.handle?.title as string) || 'HOME';

  return (
    <>
      <div className="app">
        <Header title={title} />
        <Sidebar />
        <div className="wrapper">
          <Outlet />
        </div>
      </div>
    </>
  );
}
