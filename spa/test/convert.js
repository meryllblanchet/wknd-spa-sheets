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
/* eslint-disable no-underscore-dangle,no-await-in-loop */
import { writeFile } from 'fs/promises';
import mime from 'mime';
import { basename } from 'path';
import { h1NoCache } from '@adobe/fetch';
import { stringify } from 'csv-stringify/sync';

const { fetch } = h1NoCache();

async function saveImage(url, name) {
  const img = await fetch(url);
  const ext = mime.getExtension(img.headers.get('content-type'));
  const buffer = await img.buffer();
  const imgName = `tmp/${name}.${ext}`;
  await writeFile(imgName, buffer);
  process.stderr.write(`saved ${imgName}\n`);
}

/**
 * Sanitizes the given string by :
 * - convert to lower case
 * - normalize all unicode characters
 * - replace all non-alphanumeric characters with a dash
 * - remove all consecutive dashes
 * - remove all leading and trailing dashes
 *
 * @param {string} name
 * @returns {string} sanitized name
 */
export function sanitizeName(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

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
    const details = await getAdventureDetails(adv.slug);
    const name = basename(adv._path);
    await saveImage(adv.primaryImage._authorUrl, name);
    rows.push({
      name,
      ...details,
      image: adv.primaryImage._authorUrl,
    });
  }
  toTable(rows);
}

async function getArticleDetails(slug) {
  process.stderr.write(`loading ${slug}\n`);
  const res = await fetch(`https://author-p15902-e145656-cmstg.adobeaemcloud.com/graphql/execute.json/wknd-shared/article-by-slug;slug=${slug}`);
  const json = await res.json();
  const art = json.data.articleList.items[0];
  const name = basename(art._path);
  const html = [`<h1>${art.title}</h1>`];
  let abstract;
  for (const para of art.main.json) {
    html.push(`<p>${para.content[0].value}</p>`);
    if (!abstract) {
      abstract = para.content[0].value;
    }
  }
  return {
    title: art.title,
    name,
    html,
    abstract,
  };
}

async function articles() {
  const res = await fetch('https://author-p15902-e145656-cmstg.adobeaemcloud.com/graphql/execute.json/wknd-shared/articles-all');
  const json = await res.json();
  const rows = [];
  for (const art of json.data.articleList.items) {
    const details = await getArticleDetails(art.slug);
    const name = basename(art._path);
    const author = `${art.authorFragment.firstName} ${art.authorFragment.lastName}`;
    const authorName = sanitizeName(author);

    // if (art.featuredImage) {
    //   await saveImage(art.featuredImage._authorUrl, `articles/${name}`);
    // }
    // await saveImage(art.authorFragment.profilePicture._authorUrl, `authors/${authorName}`);
    await writeFile(`tmp/articles/${name}.html`, details.html);
    rows.push({
      name,
      title: art.title,
      author,
      abstract: details.abstract,
    });
  }
  toTable(rows);
}

// adventures().catch(console.error);
articles().catch(console.error);
