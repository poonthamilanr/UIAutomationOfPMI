import ApiService from 'foundation/CertificationApiCore/client/api-service';
import config from 'foundation/Config/client';

const applicationApiService = new ApiService(config.applicationApiServiceRoot);

export default applicationApiService;