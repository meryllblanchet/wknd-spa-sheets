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
import image from '../images/wknd-card.jpeg';
import Text from './Text.jsx';
import Title from './Title.jsx';

const Card = () => (
  <>
    <article className="card">
      <img src={image} alt="Sample" />
      <div>
        <Title itemID="urn:aemconnection:/content/wknd/us/en/jcr:content/root/container/container/title" itemProp="jcr:title" itemType="text"/>
        <Title itemID="urn:aemconnection:/content/wknd/us/en/magazine/western-australia/jcr:content/root/container/container/title" itemProp="jcr:title" itemType="text"/>
        <div className="card-text"><Text itemID="urn:aemconnection:/content/wknd/us/en/magazine/ski-touring/jcr:content/root/container/container/contentfragment/par1/text" itemProp="text" itemType="richtext"/></div>
        <Link to={'/magazine'}>
          <button>Show More</button>
        </Link>
      </div>
    </article>
  </>
);

export default Card;
