import ApiService from 'foundation/CertificationApiCore/client/api-service';
import config from 'foundation/Config/client';

const orchestrationApiService = new ApiService(config.orchestrationApiServiceRoot);

export default orchestrationApiService;