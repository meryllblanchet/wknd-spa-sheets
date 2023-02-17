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
import React, { useEffect } from 'react';
import Loading from './Loading.js';

const { REACT_APP_IBIZA_URL, REACT_APP_API_KEY } = process.env;

const ContentSample = () => {
  const [content, setContent] = React.useState();
  useEffect(() => {
    fetch(`${REACT_APP_IBIZA_URL}/editing/1234/articles.html`, {
      headers: {
        'x-api-key': REACT_APP_API_KEY,
      },
    })
      .then((res) => res.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        setContent(doc.querySelector('body').innerHTML);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('Failed to fetch page: ', err);
      });
  }, []);

  return !content ? <Loading/> : <div className="article" dangerouslySetInnerHTML={{ __html: content }}/>;
};

export default ContentSample;
