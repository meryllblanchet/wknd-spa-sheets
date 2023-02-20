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
import React from 'react';
import Text from './Text.jsx';
import Title from './Title.jsx';
import useDocument from '../api/useDocument.js';
import Error from './Error.js';
import Loading from './Loading.js';

export default function Summary() {
  const itemID = 'urn:fnkconnection:/aboutus';
  const { data, errorMessage } = useDocument(itemID);
  if (errorMessage) return <Error errorMessage={errorMessage}/>;
  if (!data) return <Loading/>;
  return (
    <div className="card">
      <div itemID={itemID} itemType="urn:fnk:type/document" itemScope>
        {data.dom}
        <Title itemID={itemID} itemProp="title" itemType="text"/>
        <Text itemID={itemID} itemProp="content" itemType="richtext"/>
      </div>
      <img src={data.images?.[0]} alt="footer"/>
    </div>
  );
}
