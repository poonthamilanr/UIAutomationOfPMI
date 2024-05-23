import orchestrationApiService from 'foundation/Profile/orchestration-api-service';


export const getProviders = async (data) => {
  const term = data.term.replace(/[^a-zA-Z0-9 ]/g, "");
  const request = {
    url: `api/solr/search/provider/${term}/${data.rows}/${data.start}`,
  }
  const response = await orchestrationApiService.get(request);
  return response.data;
}