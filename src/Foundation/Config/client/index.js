
const source = typeof window !== 'undefined' ? window : global;
const config = source && source.certAppConfig;

if (!config) {
  console.error('Cert app configuration undefined');
}

export default config || {};