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
import React, { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
// import CurrencyFormat from 'react-currency-format';
import backIcon from '../images/icon-close.svg';
import Error from './Error.js';
import Loading from './Loading.js';
import './AdventureDetail.scss';
import useSheets from '../api/useSheets.js';
import { createMarkup } from '../utils/utils.js';

function AdventureDetail() {
  // params hook from React router
  const { name } = useParams();
  const navigate = useNavigate();

  // Use a custom React Hook to execute the sheets query
  const { data, errorMessage } = useSheets('/adventures.json');

  // If there is an error with the GraphQL query
  if (errorMessage) return <Error errorMessage={errorMessage} />;

  // If query response is null then return a loading icon...
  if (!data) return <Loading />;

  const currentAdventure = data.find((adv) => adv.name === name);

  // set references of current adventure
  const references = [];

  // Must have title, path, and image
  if (!currentAdventure) {
    return <NoAdventureFound />;
  }

  return (<div className="adventure-detail">
        <button className="adventure-detail-close-button" onClick={() => navigate(-1)} >
            <img className="Backbutton-icon" src={backIcon} alt="Return" />
        </button>
        <AdventureDetailRender {...currentAdventure} references={references}/>
    </div>);
}

function AdventureDetailRender({
  name,
  title,
  image,
  activity,
  adventureType,
  tripLength,
  groupSize,
  difficulty,
  description,
  itinerary,
  contributor,
  // eslint-disable-next-line no-unused-vars
  references,
}) {
  const editorProps = useMemo(() => true && { itemID: `adventure/${name}`, itemType: 'urn:fcs:type/fragment' }, [name]);

  // eslint-disable-next-line no-param-reassign
  image = image ?? `/assets/adventures/${name}.jpeg`;

  return (<div {...editorProps} itemScope>
            <h1 className="adventure-detail-title">{title}</h1>
            <div className="adventure-detail-info">
                <div className="adventure-detail-info-label">Activity</div>
                <div className="adventure-detail-info-description" itemProp='activity' itemType="text">{activity}</div>
                <div className="adventure-detail-info-label">Type</div>
                <div className="adventure-detail-info-description" itemProp='adventureType' itemType="text">{adventureType}</div>
                <div className="adventure-detail-info-label">Trip Length</div>
                <div className="adventure-detail-info-description" itemProp='tripLength' itemType="text">{tripLength}</div>
                <div className="adventure-detail-info-label">Group Size</div>
                <div className="adventure-detail-info-description" itemProp='groupSize' itemType="text">{groupSize}</div>
                <div className="adventure-detail-info-label">Difficulty</div>
                <div className="adventure-detail-info-description" itemProp='difficulty' itemType="text">{difficulty}</div>
            </div>
            <div className="adventure-detail-content">
                <img className="adventure-detail-primaryimage"
                    src={image} alt={title} itemType="image"/>
            <div dangerouslySetInnerHTML={createMarkup(description)} />
            <h2>Itinerary</h2>
            <hr />

            {/* Render the itinerary without any custom render options (just use defaults) */}
            <div className="adventure-detail-itinerary" dangerouslySetInnerHTML={createMarkup(itinerary)} />
            <Contributer {...contributor} />
            </div>
    </div>
  );
}

function NoAdventureFound() {
  return (
    <div className="adventure-detail">
        <Link className="adventure-detail-close-button" to={'/'}>
            <img className="Backbutton-icon" src={backIcon} alt="Return" />
        </Link>
        <Error errorMessage="Missing data, adventure could not be rendered." />
  </div>
  );
}

function Contributer(props) {
  if (!props) {
    return null;
  }
  let pictureReference = null;
  if (props.pictureReference) {
    pictureReference = <img className="contributor-image" src={props.pictureReference._path} alt={props.fullName} />;
  }

  return (
    <div className="contributor">
      <hr className="contributor-separator" />
      {pictureReference}
      <h3 className="contributor-name">{props.fullName}</h3>
      <h4 className="contributor-occupation">{props.occupation}</h4>
    </div>);
}

export default AdventureDetail;
