import ApiService from 'foundation/CertificationApiCore/client/api-service';
import config from 'foundation/Config/client';

const navigationApiService = new ApiService(config.sitecoreInstanceUrl);

export default navigationApiService;