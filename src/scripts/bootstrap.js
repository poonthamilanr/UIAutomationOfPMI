const configGenerator = require('./generate-config');

/*
  BOOTSTRAPPING
  The bootstrap process runs before build, and generates JS that needs to be
  included into the build - specifically, the component name to component mapping,
  and the global config module.
*/

const isEnv = process.argv.some((arg) => arg === '--env');
const configOverridePath = isEnv ? '../scjssconfig.env.json' : '../scjssconfig.json' 
/*
  CONFIG GENERATION
  Generates the /src/temp/config.js file which contains runtime configuration
  that the app can import and use.
*/
configGenerator(configOverridePath);

/*
  COMPONENT FACTORY GENERATION
*/
require('./generate-component-factory');
