export default (gql: string) => {
  return gql.replace(/(^\s*)|(\s*$)/g, '').replace(/[\r\n]/g, '');
};
