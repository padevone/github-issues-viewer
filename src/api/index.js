import ApiError from './ApiError';

export { ApiError };

const API = 'https://api.github.com';

const createSearchQuery = (queries = {}) => Object.keys(queries)
  .map((key) => `${key}:${queries[key]}`)
  .join(' ');

export const getRepoIssues = async (props) => {
  const {
    owner,
    repo,
    page = 1,
    perPage = 10,
  } = props;

  const url = new URL(`${API}/search/issues`);
  url.searchParams.set('q', createSearchQuery({
    repo: `${owner}/${repo}`,
  }));

  if (page) {
    url.searchParams.set('page', page);
  }

  if (perPage) {
    url.searchParams.set('per_page', perPage);
  }

  const response = await fetch(url);

  if (!response.ok) {
    const { status, statusText } = response;
    const remainingLimit = parseInt(response.headers.get('X-RateLimit-Remaining'), 10);
    throw new ApiError({
      status,
      statusText,
      remainingLimit,
    });
  }

  // eslint-disable-next-line camelcase
  const { total_count, items } = await response.json();
  return {
    items,
    // eslint-disable-next-line camelcase
    totalCount: total_count < 1000 ? total_count : 1000,
  };
};
