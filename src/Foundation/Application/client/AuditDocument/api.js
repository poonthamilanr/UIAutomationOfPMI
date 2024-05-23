import applicationApiService from 'foundation/Application/application-api-service';

const toBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.replace('data:', '').replace(/^.+,/, ''));
    reader.onerror = error => reject(error);
  });

export const uploadAuditDocument = async params => {
  let type = params.data.data.type;
  if (type.indexOf('/') !== -1) {
    type = type.substring(type.indexOf('/') + 1);
  }
  const fileContent = await toBase64(params.data.data);
  const apiData = {
    DocumentContent: fileContent,
    DocumentMetadata: {
      DocumentType: type,
      DocumentName: params.data.data.name,
    },
  };
  const request = {
    url: params.url,
    data: apiData,
    customErrorHandling: true,
    customerErrorEvent: params.data.customErrorHandling,
  };
  const response = await applicationApiService.post(request);
  return response.data;
};

export const deleteAuditDocument = async params => {
  const request = {
    url: params.url,
  };
  const response = await applicationApiService.delete(request);
  return response.data;
};

export const getAuditDocument = async params => {
  const request = {
    url: params.url,
  };
  request.responseType = 'blob';
  const response = await applicationApiService.get(request);
  const blob = new Blob([response.data], { type: 'application/octet-stream' });
  const url = window.URL.createObjectURL(blob);
  return url;
};

export const postAuditReference = async params => {
  const request = {
    url: '/api/Audit/reference-request',
    data: params.data,
  };
  const response = await applicationApiService.post(request);
  return response.data;
};

export const getReferenceDocument = async params => {
  const request = {
    url: `/api/Audit/download/application/${params.applicationId}/document/${params.auditDocumentId}`,
    responseType: 'blob',
  };
  const response = await applicationApiService.get(request);
  return response.data;
};
