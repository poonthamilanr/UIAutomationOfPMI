import ApiService from 'foundation/CertificationApiCore/client/api-service';
import config from 'foundation/Config/client';

const certificationApiService = new ApiService(config.certificationApiServiceRoot);

export default certificationApiService;