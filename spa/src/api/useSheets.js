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
import { useState, useEffect } from 'react';

const { REACT_APP_FRANKLIN_HOST_URI = '' } = process.env;

/**
 * Custom React Hook to read from franklin sheet query
 * @param path path to workboot
 * @param sheet name of sheet
 */
export default function useSheets(path, sheet) {
  const [data, setData] = useState(null);
  const [errorMessage, setErrors] = useState(null);
  useEffect(() => {
    async function load() {
      const url = new URL(`${REACT_APP_FRANKLIN_HOST_URI}${path}`);
      if (sheet) {
        url.searchParams.append('sheet', sheet);
      }
      const res = await fetch(url);
      const json = await res.json();
      return json.data;
    }
    load()
      .then(setData)
      .catch((e) => {
        setErrors(e);
        sessionStorage.removeItem('accessToken');
      });
  }, [path, sheet]);

  return { data, errorMessage };
}
