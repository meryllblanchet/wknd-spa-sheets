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
import image from '../images/footer.jpeg';
import Text from './Text.jsx';
import Title from './Title.jsx';

const Summary = () => (
    <div className="card">
      <div>
      <Title itemID="urn:aemconnection:/content/wknd/us/en/about-us/jcr:content/root/container/title" itemProp="jcr:title" itemType="text"/>
      <Text itemID="urn:aemconnection:/content/wknd/us/en/about-us/jcr:content/root/container/text_359993709" itemProp="text" itemType="richtext"/>
      <Text itemID="urn:aemconnection:/content/wknd/us/en/faqs/jcr:content/root/container/container/text" itemProp="text" itemType="richtext" />
      </div>
      <img src={image} alt="footer" />
    </div>
);

export default Summary;
