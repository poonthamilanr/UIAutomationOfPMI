import ApiService from 'foundation/CertificationApiCore/client/api-service';
import config from 'foundation/Config/client';

const authApiService = new ApiService(config.sitecoreInstanceUrl, true, true);

export default authApiService;