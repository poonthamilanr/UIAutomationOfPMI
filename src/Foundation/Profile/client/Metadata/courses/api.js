import orchestrationApiService from 'foundation/Profile/orchestration-api-service';


export const getCourses = async (data) => {
  const courseName = data.courseName.replace(/[^a-zA-Z0-9 ]/g, "");
  const request = {
    url: `/api/solr/search/course/${data.providerId}/${courseName}/${data.rows}/${data.start}`,
  }
  const response = await orchestrationApiService.get(request);
  return response.data;
}