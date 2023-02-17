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

const { AEMHeadless } = require('@adobe/aem-headless-client-js');

const { REACT_APP_GRAPHQL_ENDPOINT, REACT_APP_HOST_URI } = process.env;
/**
 * concatenate error messages into a single string.
 * @param {*} errors
 */
function mapErrors(errors) {
  return errors.map((error) => error.message).join(',');
}

/**
 * Custom React Hook to perform a GraphQL query
 * @param query - GraphQL query
 * @param path - Persistent query path
 */
function useGraphQL(query, path) {
  const [data, setData] = useState(null);
  const [errorMessage, setErrors] = useState(null);
  useEffect(() => {
    function makeRequest() {
      const sdk = new AEMHeadless({
        serviceURL: REACT_APP_HOST_URI,
        endpoint: REACT_APP_GRAPHQL_ENDPOINT,
      });
      const request = query ? sdk.runQuery.bind(sdk) : sdk.runPersistedQuery.bind(sdk);

      request(path)
        // eslint-disable-next-line no-shadow
        .then(({ data, errors }) => {
          // If there are errors in the response set the error message
          if (errors) {
            setErrors(mapErrors(errors));
          }
          // If data in the response set the data as the results
          if (data) {
            setData(data);
          }
        })
        .catch((error) => {
          setErrors(error);
          sessionStorage.removeItem('accessToken');
        });
    }
    makeRequest();
  }, [query, path]);

  return { data, errorMessage };
}

export default useGraphQL;
