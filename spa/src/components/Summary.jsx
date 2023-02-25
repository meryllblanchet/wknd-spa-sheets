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
import React, { cloneElement } from 'react';
import useDocument from '../api/useDocument.js';
import Error from './Error.js';
import Loading from './Loading.js';

function contentFilter(node) {
  return node.type !== 'image';
}

export default function Summary() {
  const itemID = 'urn:fnkconnection:/summary';
  const { data, errorMessage } = useDocument(itemID, contentFilter);
  if (errorMessage) return <Error errorMessage={errorMessage}/>;
  if (!data) return <Loading/>;

  const title = cloneElement(data.title, {
    itemProp: 'title',
    itemType: 'text',
  });
  return (
    <div className="card" >
      <div itemID={itemID} itemType="urn:fnk:type/document" itemScope>
        {title}
        <div itemProp="content" itemType="richtext">
          {data.content}
        </div>
      </div>
      <img src={data.images?.[0]} alt="footer"/>
    </div>
  );
}
