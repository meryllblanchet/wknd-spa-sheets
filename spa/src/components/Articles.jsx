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
/* eslint-disable max-len */
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Error from './Error.js';
import Loading from './Loading.js';
import './Articles.scss';
import useSheets from '../api/useSheets.js';

const Article = ({
  name, title, author, abstract,
}) => {
  const editorProps = useMemo(() => true && { itemID: name, itemType: 'urn:fcs:type/fragment' }, [name]);

  return (
    <li className="article-item">
      <div itemScope {...editorProps}>
        <Link to={`/magazine/${name}`}>
          <h3 data-id="title" itemProp="title" itemType="text">{title}</h3>
          <img className="article-item-image" src={`/assets/articles/${name}.jpeg`}
               alt={title} itemProp="profilePicture" itemType="image"/>
        </Link>
        <p>{`By ${author}`}</p>
      </div>
      <p className="article-content" dangerouslySetInnerHTML={{ __html: abstract }} />
    </li>
  );
};

const Articles = () => {
  const { data, errorMessage } = useSheets('/articles.json');

  // If there is an error with the GraphQL query
  if (errorMessage) return <Error errorMessage={errorMessage} />;

  // If data is null then return a loading state...
  if (!data) return <Loading />;

  return (
    <>
      <h2>Articles</h2>
      <ul>
        {
            data.map((article, index) => (
                <Article key={index} {...article} />
            ))
        }
        </ul>
    </>
  );
};

export default Articles;
