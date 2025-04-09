/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function handleError(error) {
  // Handle the error here, e.g., display an error message to the user
  if (error.response && error.response.status === 401) {
    return error.response.json().then(data => {
      throw new Error(data.error);
    });
  }
  // Handle other errors
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export function get(url, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  if (options.isAuthRoute) {
    const token = JSON.parse(localStorage.getItem('session'));
    headers.Authorization = `Bearer ${token}`;
  }
  return fetch(url, {
    headers,
    credentials: 'include',
    method: 'GET',
    ...options,
  })
    .then(checkStatus)
    .then(parseJSON);
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export function post(url, options) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  if (options.isAuthRoute) {
    const token = JSON.parse(localStorage.getItem('session'));
    headers.Authorization = `Bearer ${token}`;
  }
  const { payload } = options;
  console.log(headers.Authorization);
  return fetch(url, {
    ...options,
    headers,
    body: JSON.stringify(payload),
    method: 'POST',
  })
    .then(checkStatus)
    .then(parseJSON)
    .catch(handleError);
}
