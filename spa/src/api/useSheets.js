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
import { useState, useEffect, useRef } from 'react';

/**
 * Custom React Hook to read from franklin sheet query
 * @param uri franklin plugin uri of the form `urn:fnkconnection:{path}:{sheet}:{keycol}:{key}`
 */
export default function useSheets(uri) {
  const [data, setData] = useState(null);
  const [errorMessage, setErrors] = useState(null);
  const cache = useRef({});
  useEffect(() => {
    async function load() {
      const [, con, path, sheet, keycol, key] = uri.split(':');
      if (con !== 'fnkconnection') {
        throw Error(`unsupported connection: ${con}`);
      }
      let url = path;
      if (sheet) {
        url += `?sheet=${sheet}`;
      }
      let json = cache.current[url];
      if (!json) {
        const res = await fetch(url);
        json = await res.json();
        cache.current[url] = json;
      }
      if (keycol === '#') {
        return json.data[Number(key || 0)];
      }
      if (keycol) {
        return json.data.find((row) => row[keycol] === key);
      }
      return json.data;
    }
    load()
      .then(setData)
      .catch((e) => {
        setErrors(e);
        sessionStorage.removeItem('accessToken');
      });
  }, [uri]);

  return { data, errorMessage };
}
