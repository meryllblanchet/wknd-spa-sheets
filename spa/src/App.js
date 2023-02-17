/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import { React, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import logo from './images/wknd-logo-dk.svg';
import './App.scss';
import AdventureDetail from './components/AdventureDetail.jsx';
import Articles from './components/Articles.jsx';
import ArticleDetail from './components/ArticleDetail.jsx';
import About from './components/About.jsx';
// import "./api/mirage.js";
import ContentSample from './components/ContentSample.jsx';

const { REACT_APP_HOST_URI } = process.env;

// import { EditorProvider } from '@aem-sites/universal-editor-react';

// function App() {
//   return (
//     <div className="App">
//       <div className="Home">
//         <header>
//           <img src={logo} className="logo" alt="WKND Logo"/>
//           <hr />
//         </header>
//         <EditorProvider>
//           <Adventures />
//         </EditorProvider>
//       </div>
//     </div>
//   );
// }

function App() {
  useEffect(() => {
    document.querySelector('meta[name="urn:auecon:aemconnection"]').setAttribute('content', `aem:${REACT_APP_HOST_URI}`);
  });

  return (
    <div className="App">
      <div className="Home">
        <header>
          <img src={logo} className="logo" alt="WKND Logo" />
          <hr />
        </header>
        <Router>
          <Routes>
            <Route path="/dist/adventure/:name" element={<AdventureDetail />} />
            <Route path="/dist/" element={<Home />} />
            <Route path="/dist/index.html" element={<Home />} />
            <Route path="/dist/article" element={<ContentSample />} />
            <Route path="/dist/articles" element={<Articles />} />
            <Route path="/dist/articles/article:slug" element={<ArticleDetail />} />
            <Route path="/dist/articles/article:slug/aboutus" element={<About />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
