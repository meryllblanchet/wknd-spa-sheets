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
import { useState, useEffect, useRef } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { fromMarkdown } from 'mdast-util-from-markdown';
// eslint-disable-next-line import/no-extraneous-dependencies
import { visit } from 'unist-util-visit';
import dereference from '../utils/mdast-util-dereference.js';

function toDom(node, filter) {
  return node.children.map((child, idx) => {
    if (filter && !filter(child)) {
      return null;
    }
    if (child.type === 'paragraph') {
      return <p key={idx}>{toDom(child, filter)}</p>;
    }
    if (child.type === 'strong') {
      return <strong key={idx}>{toDom(child, filter)}</strong>;
    }
    if (child.type === 'image') {
      return <img key={idx} src={child.url} alt={child.alt}/>;
    }
    if (child.type === 'emphasis') {
      return <em key={idx}>{toDom(child, filter)}</em>;
    }
    if (child.type === 'heading') {
      switch (child.level) {
        case 1:
        default:
          return <h1 key={idx}>{toDom(child, filter)}</h1>;
      }
    }
    if (child.type === 'text') {
      return child.value;
    }
    return null;
  }).filter((elem) => !!elem);
}

function collectImages(tree) {
  const images = [];

  // first find all definitions
  visit(tree, (node) => {
    if (node.type === 'image') {
      images.push(node.url);
    }
  });
  return images;
}

function removeTitle(tree) {
  const idx = tree.children.findIndex(({ type }) => type === 'heading');
  if (idx < 0) {
    return null;
  }
  const children = tree.children.splice(idx, 1);
  const dom = toDom({ children });
  return dom[0];
}

/**
 * Custom React Hook to read from franklin sheet query
 * @param uri franklin plugin uri of the form `urn:fnkconnection:{path}`
 * @param contentFilter optional filter for the content
 */
export default function useDocument(uri, contentFilter) {
  const [data, setData] = useState(null);
  const [errorMessage, setErrors] = useState(null);
  const cache = useRef({});
  useEffect(() => {
    async function load() {
      const [, con, path] = uri.split(':');
      if (con !== 'fnkconnection') {
        throw Error(`unsupported connection: ${con}`);
      }
      // due to https://github.com/adobe/helix-html-pipeline/issues/30 we cannot load the html, but
      // need to convert the md here
      const url = `${path}.md`;
      let text = cache.current[url];
      if (!text) {
        const res = await fetch(url);
        if (!res.ok) {
          throw Error(res.status);
        }
        text = await res.text();
        cache.current[url] = text;
      }
      const mdast = fromMarkdown(text);
      dereference(mdast);
      const dom = toDom(mdast);
      const images = collectImages(mdast);
      const title = removeTitle(mdast);
      const content = toDom(mdast, contentFilter);
      return {
        dom,
        images,
        title,
        content,
      };
    }
    load()
      .then(setData)
      .catch((e) => {
        setErrors(e);
        sessionStorage.removeItem('accessToken');
      });
  }, [uri]);

  return { data, errorMessage };
}
