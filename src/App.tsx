/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Papers from './pages/Papers';
import Journals from './pages/Journals';
import Patents from './pages/Patents';
import Books from './pages/Books';
import Projects from './pages/Projects';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/papers" element={<Papers />} />
          <Route path="/journals" element={<Journals />} />
          <Route path="/patents" element={<Patents />} />
          <Route path="/books" element={<Books />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </Layout>
    </Router>
  );
}
