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
import { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { fromMarkdown } from 'mdast-util-from-markdown';

function toDom(node) {
  return node.children.map((child, idx) => {
    if (child.type === 'paragraph') {
      return <p key={idx}>{toDom(child)}</p>;
    }
    if (child.type === 'heading') {
      switch (child.level) {
        case 1:
        default:
          return <h1 key={idx}>{toDom(child)}</h1>;
      }
    }
    if (child.type === 'text') {
      return child.value;
    }
    return [];
  });
}

/**
 * Custom React Hook to read from franklin sheet query
 * @param path path to document
 * @param variant name of sheet
 */
export default function useDocument(path) {
  const [data, setData] = useState(null);
  const [errorMessage, setErrors] = useState(null);
  useEffect(() => {
    async function load() {
      // due to https://github.com/adobe/helix-html-pipeline/issues/30 we cannot load the html, but
      // need to convert the md here
      const res = await fetch(`${path}.md`);
      if (!res.ok) {
        return '';
      }
      const mdast = fromMarkdown(await res.text());
      return toDom(mdast);
    }
    load()
      .then(setData)
      .catch((e) => {
        setErrors(e);
        sessionStorage.removeItem('accessToken');
      });
  }, [path]);

  return { data, errorMessage };
}
