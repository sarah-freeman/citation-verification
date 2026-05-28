/**
 * Validates a Digital Object Identifier (DOI).
 *
 * @param {string} doi The DOI to validate.
 * @return {boolean} True if the DOI is valid, false otherwise.
 * @customfunction
 */
function isValidDOI(doi) {
  if (!doi) {
    return ''; // Handle empty DOI
  }

  const apiUrl = `https://doi.org/api/handles/${doi}`;

  try {
    const options = {
      'muteHttpExceptions': true,
      'followRedirects': false
    };
    const response = UrlFetchApp.fetch(apiUrl, options);
    const responseCode = response.getResponseCode();

    // Check for successful response (200 OK) or a redirect (302 Found)
    if (responseCode === 200 || responseCode === 302) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    // Handle network or other errors
    Logger.log(e);
    return false;
  }
}
