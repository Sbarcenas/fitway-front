import feathers from '@feathersjs/feathers';
import auth from '@feathersjs/authentication-client';
import feathersRest from '@feathersjs/rest-client';

const URL = 'https://fitway-api.notnumber.com';
export const client = feathers();

client.configure(feathersRest(URL).fetch(fetch));
client.configure(
    auth({
        storage: localStorage,
        strategy: 'jwt',
        storageKey: 'accessToken',
    }),
);
