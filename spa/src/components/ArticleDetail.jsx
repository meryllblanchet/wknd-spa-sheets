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
import { Link, useNavigate, useParams } from 'react-router-dom';
import backIcon from '../images/icon-close.svg';
import Error from './Error.js';
import Loading from './Loading.js';
import './AdventureDetail.scss';
import useSheets from '../api/useSheets.js';
import { sanitizeName } from '../utils/utils.js';
import useDocument from '../api/useDocument.js';

function ArticleDetail() {
  // params hook from React router
  const { name } = useParams();
  const navigate = useNavigate();

  // Use a custom React Hook to execute the sheets query
  const itemID = `urn:fnkconnection:/articles.json:default:name:${name}`;
  const { data, errorMessage } = useSheets(itemID);

  // If there is an error with the GraphQL query
  if (errorMessage) return <Error errorMessage={errorMessage}/>;

  // If query response is null then return a loading icon...
  if (!data) return <Loading/>;

  return (<div className="adventure-detail">
    <button className="adventure-detail-close-button" onClick={() => navigate(-1)}>
      <img className="Backbutton-icon" src={backIcon} alt="Return"/>
    </button>
    <ArticleDetailRender {...data} />
  </div>);
}

function ArticleDetailRender(props) {
  const { name, title } = props;

  const itemID = `urn:fnkconnection:/magazine/${name}`;
  const { data, errorMessage } = useDocument(itemID);
  if (errorMessage) return <Error errorMessage={errorMessage}/>;
  if (!data) return <Loading/>;

  return (<div itemScope itemID={itemID} itemType="unr:fnk:type/document">
      <h1 className="adventure-detail-title" itemProp="title" itemType="text">{title}</h1>
      <div className="adventure-detail-info">
        <Contributor {...props} />
        <Link to={'/magazine/aboutus'}>About Us</Link>
      </div>
      <div className="adventure-detail-content">
        <img className="adventure-detail-primaryimage"
             src={`/assets/articles/${name}.jpeg`} alt={title}/>
        <div>{data.dom}</div>
      </div>
    </div>
  );
}

// function NoArticleFound() {
//   return (
//     <div className="adventure-detail">
//       <Link className="adventure-detail-close-button" to={'/'}>
//         <img className="Backbutton-icon" src={backIcon} alt="Return"/>
//       </Link>
//       <Error errorMessage="Missing data, article could not be rendered."/>
//     </div>
//   );
// }

function Contributor(props) {
  return (
    <div className="contributor">
      <img className="contributor-image"
           src={`/assets/authors/${sanitizeName(props.author)}.jpeg`} alt={props.author}/>
      <h3 className="contributor-name">{props.author}</h3>
    </div>);
}

export default ArticleDetail;
