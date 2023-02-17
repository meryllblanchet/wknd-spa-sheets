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
/* eslint-disable no-underscore-dangle */
import { basename } from 'path';
import { h1NoCache } from '@adobe/fetch';
import { stringify } from 'csv-stringify/sync';

const { fetch } = h1NoCache();

function toTable(rows) {
  // assume first row contains all column names
  const table = [];
  const keys = Object.keys(rows[0]);
  table.push(keys);
  for (const row of rows) {
    table.push(keys.map((key) => row[key] || ''));
  }
  process.stdout.write(stringify(table, { quoted: true }));
}

async function getAdventureDetails(slug) {
  process.stderr.write(`loading ${slug}\n`);
  const res = await fetch(`https://author-p15902-e145656-cmstg.adobeaemcloud.com/graphql/execute.json/wknd-shared/adventure-by-slug;slug=${slug}`);
  const json = await res.json();
  const adv = json.data.adventureList.items[0];
  return {
    title: adv.title,
    price: adv.price,
    activity: adv.activity,
    adventureType: adv.adventureType,
    tripLength: adv.tripLength,
    groupSize: adv.groupSize,
    difficulty: adv.difficulty,
    'description (formatted)': adv.description?.html ?? '',
    'itinerary (formatted)': adv.itinerary?.html ?? '',
  };
}

async function adventures() {
  const res = await fetch('https://author-p100120-e919464.adobeaemcloud.com/graphql/execute.json/wknd-shared/adventures-all');
  const json = await res.json();
  const rows = [];
  for (const adv of json.data.adventureList.items) {
    // eslint-disable-next-line no-await-in-loop
    const details = await getAdventureDetails(adv.slug);
    rows.push({
      name: basename(adv._path),
      ...details,
      image: adv.primaryImage._authorUrl,
    });
  }
  toTable(rows);
}

adventures().catch(console.error);
