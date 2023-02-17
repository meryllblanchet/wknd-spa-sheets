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
const { REACT_APP_HOST_URI } = process.env;

export const fetchData = async (path) => {
  if (path.startsWith('local:')) {
    const url = path.replace('local:', '');
    const data = await fetch(url);
    const json = await data.json();
    return json.paths;
  } else {
    const url = `${REACT_APP_HOST_URI}/${path.split(':/')[1]}.model.json`;
    const data = await fetch(url);
    const json = await data.json();
    return json;
  }
};
