import ApiService from 'foundation/CertificationApiCore/client/api-service';
import config from 'foundation/Config/client';

const profileApiService = new ApiService(config.profileApiServiceRoot);

export default profileApiService;