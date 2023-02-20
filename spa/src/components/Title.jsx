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
import useSheets from '../api/useSheets.js';
import Error from './Error.js';

const Title = (props) => {
  const {
    itemID, itemProp, itemType, className, TitleTag = 'h1',
  } = props;

  const { data, errorMessage } = useSheets(itemID);

  // If there is an error with the GraphQL query
  if (errorMessage) return <Error errorMessage={errorMessage} />;

  const text = data?.[itemProp] ?? '';
  return (
    // eslint-disable-next-line max-len
    <TitleTag itemID={itemID} itemProp={itemProp} itemType={itemType} className={className}>{text}</TitleTag>
  );
};

export default Title;
