export const getReferenceStatus = referenceRequest => {
  if (referenceRequest) {
    /* eslint-disable indent, default-case */
    switch (referenceRequest.auditReferenceRequestStatus) {
      case 'Sent':
      case 'Delivered':
        return ReferenceStatus.RequestReceived;
      case 'Completed':
      case 'Declined':
        return ReferenceStatus.ResponseProvided;
      case 'AutoResponded':
        return ReferenceStatus.DeliveryFailed;
    }
    /* eslint-enable indent, default-case */
  }

  return ReferenceStatus.ReferenceNeeded;
};

export const isReferenceProvided = referenceRequest => {
  if (!referenceRequest) return false;
  const status = getReferenceStatus(referenceRequest);
  return [ReferenceStatus.RequestReceived, ReferenceStatus.ResponseProvided].includes(status);
};

export const ReferenceStatus = Object.freeze({
  ResponseProvided: 'ResponseProvided',
  RequestReceived: 'RequestReceived',
  ReferenceNeeded: 'ReferenceNeeded',
  DeliveryFailed: 'DeliveryFailed',
});
