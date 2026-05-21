/**
 * Isolates a DOI from a citation.
 *
 * @param {string} citation The citation to check.
 * @return {string} isolatedDOI The isolated DOI (notFoundMessage if not found).
 * @customfunction
 */
function isolateDOI(citation) {
  if (!citation) {
    return false;  // Handle empty citation
  }

  Logger.log('Citation ' + citation);

  const doiLink = 'doi.org/';
  const notFoundMessage = 'No DOI found.';

  if (citation.indexOf(doiLink) > -1) {
   // Isolate the DOI
   let isolatedDOI = citation.split(doiLink)[1].trim();

   // If there's a period, comma, or whitespace at the end, remove it
   while (isolatedDOI.charAt(isolatedDOI.length - 1) == "," | isolatedDOI.charAt(isolatedDOI.length - 1) == ".") {
    isolatedDOI = isolatedDOI.slice(0, -1).trim();
   }

    Logger.log('Isolated DOI ' + isolatedDOI);

    return isolatedDOI;
  }
  else {
    return notFoundMessage;
  }
}
