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

/**
 * Sanitize HTMl by:
 * - replace line breaks with <br>
 * - make paragraphs, separated with empty lines
 *
 * Note: this can be removed once this is done automatically by the admin.
 * see https://github.com/adobe/helix-admin/pull/1033
 *
 * @param {string} html
 * @returns {string} sanitized HTML
 */
export function sanitizeHtml(html) {
  // eslint-disable-next-line no-param-reassign
  html = html.trim();
  if (!html) {
    return '';
  }
  // assume already sanitized
  if (html.startsWith('<p>')) {
    return html;
  }
  const lines = html.split('\n').map((l) => l.trim());
  const paras = [];
  const para = [];
  for (const line of lines) {
    if (line) {
      para.push(line);
    } else {
      paras.push(para.join('<br>'));
      para.length = 0;
    }
  }
  if (para.length) {
    paras.push(para.join('<br>'));
  }
  return paras.map((p) => `<p>${p}</p>`).join('');
}

export function createMarkup(val) {
  return { __html: sanitizeHtml(val) };
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
