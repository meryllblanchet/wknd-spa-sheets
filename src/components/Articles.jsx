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
import useGraphQL from '../api/useGraphQL.js';
import Error from './Error.js';
import Loading from './Loading.js';
import './Articles.scss';

const Article = ({
  _path, title, authorFragment, slug,
}) => {
  const editorProps = useMemo(() => true && { itemID: _path, itemType: 'urn:fcs:type/fragment' }, [_path]);

  return (
    <li className="article-item">
      <div itemScope {...editorProps}>
        <Link to={`/articles/article:${slug}`}>
          <h3 data-id="title" itemProp="title" itemType="text">{title}</h3>
        </Link>
        <img className="article-item-image" src={authorFragment?.profilePicture._path}
                alt={title} itemProp="profilePicture" itemType="image"/>
        <p>{`By ${authorFragment.firstName} ${authorFragment.lastName}`}</p>
      </div>
      <p className="article-content">
        Steep mountain sides surround us, like wise trolls from a distant timeline, weathered and worn by long-gone
        glaciers, green moss now covering the black rock. White sheep forage on steep grass, defying the chilling winds
        funneled by the deep valley. The subtle hues of the arctic circle are welcoming, comfortable on the eyes. When
        rare sunrays pierce through the low clouds, the scenery reveals its vibrancy, as the waves reflect a translucent
        cyan blue before crashing loudly onto white sand. A small but playful groundswell is building, the offshore breeze
        grooming playful lines down the point, making for welcoming conditions for acclimatizing to cold water and thick
        neoprene. Knowing it is our last surf before a few days of hard wind, we take full advantage out of every ripple
        the North Atlantic Ocean sends our way.
      </p>
    </li>
  );
};

const Articles = () => {
  const persistentQuery = 'wknd-shared/articles-all';

  // Use a custom React Hook to execute the GraphQL query
  const { data, errorMessage } = useGraphQL('', persistentQuery);

  // If there is an error with the GraphQL query
  if (errorMessage) return <Error errorMessage={errorMessage} />;

  // If data is null then return a loading state...
  if (!data) return <Loading />;

  return (
    <>
      <h2>Articles</h2>
      <ul>
        {
            data.articleList.items.map((article, index) => (
                <Article key={index} {...article} />
            ))
        }
        </ul>
    </>
  );
};

export default Articles;
