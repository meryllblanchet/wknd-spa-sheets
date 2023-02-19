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
import { createServer, Model } from 'miragejs';

const { REACT_APP_HOST_URI, REACT_APP_IBIZA_URL, REACT_APP_IO_URL } = process.env;

const getData = (fallback) => {
  const current = localStorage.getItem(`mirage-${fallback.id}`);
  return current ? JSON.parse(current) : fallback;
};

const server = createServer({
  models: {
    paths: Model,
  },
  seeds(server) {
    server.create(
      'path',
      getData({
        id: 'card',
        linkDisabled: false,
        title: 'Western Australia by Camper Van',
	    subtitle: 'Recent Articles',
        ':type': 'wknd/components/title',
      }),
    );
    server.create(
      'path',
      getData({
        id: 'home',
        'jcr:title': 'WKND Guides',
        ':type': 'wknd/components/title',
        appliedCssClassNames: 'cmp-title--underline',
      }),
    );
    server.create(
      'path',
      getData({
        id: 'card-desc',
        linkDisabled: false,
        text: 'The Australian West coast is a camper’s heaven!! Endless miles of desert roads leading to secret beaches,vast canyons and crystal clear rivers, and the very few people you are likely to meet on your journey will be some of the most easy-going characters you will find anywhere in the world.',
        ':type': 'wknd/components/text',
      }),
    );
  },
  routes() {
    this.get('/path/:id', (schema, request) => {
      const path = request.params.id;
      return schema.paths.find(path);
    });

    this.post('/path/:id', (schema, request) => {
      const path = request.params.id;
      const comp = schema.paths.find(path);
      const attrs = JSON.parse(request.requestBody);
      comp.update({ ...attrs });
      localStorage.setItem(`mirage-${comp.attrs.id}`, JSON.stringify({ ...comp.attrs, ...attrs }));
      return { ...attrs };
    });
  },
});

server.passthrough(`${REACT_APP_HOST_URI}/**`);
server.passthrough(`${REACT_APP_IBIZA_URL}/**`);
server.passthrough('https://snazzy-tulumba-547f0e.netlify.app/**');
server.passthrough(`${REACT_APP_IO_URL}**`);
