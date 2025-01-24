import * as prismic from '@prismicio/client';

const apiEndpoint = 'https://requin1.cdn.prismic.io/api/v2'; // Replace with your Prismic repository endpoint
const accessToken = 'C5abXh3d0JBQUFDRUFsWG9s.PCfvv73vv73vv73vv73vv71PZO-_vUITPwdeOTTvv71A77-9e--_ve-_vT_vv73vv71Z77-977-9GCIT'; // If your repository is private, add an access token

const client = prismic.createClient(apiEndpoint, { accessToken });

export default client;