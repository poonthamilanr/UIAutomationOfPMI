export const getEnumDisplayName = (list, value) => {
  const isEqual = item => item.name === value;
  const item = list && list.find(isEqual);
  return item && item.displayName;
};

const formatFieldName = name => {
  const firstLatter = name.slice(0, 1);
  const restLatters = name.slice(1);
  return firstLatter.toLowerCase() + restLatters;
}

const mapFieldsList = (fields, format) => {
  return (fields || []).reduce((result, { name, ...field }) => ({
    ...result,
    [formatFieldName(name)]: format ? format(field) : field,
  }), {});
};

export const mapItemFields = ({ fields, ...item }) => ({
  ...item,
  ...mapFieldsList(fields),
});

export const templateIs = templateId => {
  const sanitizedId = templateId.replace(/-/g, '');
  return item => item.template.id === sanitizedId;
};

export const collectFolderItems = folderTemplateId => {
  const isTargetFolder = templateIs(folderTemplateId);

  return (result, folder) => {
    if (isTargetFolder(folder) && folder.children) {
      folder.children.forEach(item => result.push(item));
    }

    return result;
  }
}