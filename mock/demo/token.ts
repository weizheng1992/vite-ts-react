import { resultError, mock } from '../config';

mock.mock('/basic-api/token/expire', 'post', () => {
  return resultError('', { code: 555, result: null });
});
