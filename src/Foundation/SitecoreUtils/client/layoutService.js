import { RestLayoutService } from '@sitecore-jss/sitecore-jss-react';
import config from 'foundation/Config/client';
import { dataFetcher } from 'foundation/Infrastructure/client/api/JssData/dataFetcher';

export class LayoutServiceFactory {
  create() {
    return new RestLayoutService({
      apiHost: config.sitecoreApiHost,
      apiKey: config.sitecoreApiKey,
      siteName: config.jssAppName,
      tracking: false,
      // provide your custom data fetcher to the service instance
      dataFetcherResolver: () => dataFetcher,
    });
  }
}

export const layoutServiceFactory = new LayoutServiceFactory();