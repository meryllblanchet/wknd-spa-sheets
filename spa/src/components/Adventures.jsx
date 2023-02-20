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
import { Link } from 'react-router-dom';
import Error from './Error.js';
import Loading from './Loading.js';
import './Adventures.scss';
import useSheets from '../api/useSheets.js';

function AdventureItem(props) {
  // Must have title, path, and image
  if (!props || !props.name || !props.title) {
    return null;
  }
  const image = props.image || `/assets/adventures/${props.name}.jpeg`;

  return (
         <li className="adventure-item" itemScope itemID={props.itemID} itemType="urn:fnk:type/sheet">
          <Link to={`/adventure/${props.name}`}>
            <img className="adventure-item-image" src={image}
                alt={props.title} itemProp="image" itemType="image" />
          </Link>
          <div className="adventure-item-length-price">
            <div className="adventure-item-length" itemProp="tripLength" itemType="text">{props.tripLength}</div>
            <div className="adventure-item-price" itemProp="price" itemType="text">${props.price}</div>
          </div>
          <div className="adventure-item-title" itemProp="title" itemType="text">{props.title}</div>
      </li>
  );
}

// import { EditableCF } from '@aem-sites/universal-editor-react';

// const Image = ({ _path, title }) => (
//   <img className="adventure-item-image" src={_path} alt={title} />
// );

// function AdventureItem({ _path, slug, ...props}) {
//   if(!props || !_path || !props.title || !props.primaryImage ) {
//     return null;
//   }
//   return (
//     <li className="adventure-item">
//       <EditableCF data={props} path={_path} components={{
//         primaryImage: <Image />
//       }}/>
//     </li>
//   );
// }

function Adventures() {
  // Use a custom React Hook to load sheet data
  const itemID = 'urn:fnkconnection:/adventures.json:default';
  const { data, errorMessage } = useSheets(itemID);

  // If there is an error with the GraphQL query
  if (errorMessage) return <Error errorMessage={errorMessage} />;

  // If data is null then return a loading state...
  if (!data) return <Loading />;

  return (
      <div className="adventures">
        <ul className="adventure-items">
          {
              // Iterate over the returned data items from the query
              data.map((adventure, index) => (
                  <AdventureItem itemID={`${itemID}:name:${adventure.name}`} key={index} {...adventure} />
              ))
          }
          </ul>
      </div>
  );
}

export default Adventures;
