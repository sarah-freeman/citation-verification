/**
 * Returns metadata for a DOI.
 *
 * @param {string} doi The DOI to fetch metadata for.
 * @return {string} responseText Citation for the article associated with the DOI if the DOI resolves, else empty  string.
 * @customfunction
 */
function getDOIMetadata(doi) {
  if (!doi) {
    return false; // Handle empty DOI
  }

  Logger.log('DOI: ' + doi);

  const apiUrl = `https://citation.doi.org/format?doi=${doi}&style=apa&lang=en-US`;

  const options = {
    'muteHttpExceptions': true,
    'followRedirects': false
  };

  const response = UrlFetchApp.fetch(apiUrl, options);
  const responseCode = response.getResponseCode();
  const responseText = response.getContentText();

  Logger.log('Response Code: ' + responseCode + ' Response Text: ' + responseText);

  // Check for successful response (200 OK) or a redirect (302 Found)
  if (responseCode === 200 || responseCode === 302) {
    return responseText;
  } else {
    return '';
  }

}
