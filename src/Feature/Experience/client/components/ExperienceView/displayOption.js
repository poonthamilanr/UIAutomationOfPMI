export const getDisplayOption = (list, value, other) => {
  if (value === 'Other' && other) {
    return other;
  }

  const item = list && list.find(item => item.apiKey && item.apiKey.value === value);
  return item ? item.displayName : '';
}