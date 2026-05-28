//
// Levenshtein Distance Function for Google Sheets
//
// This function calculates de Levenshtein Distance (or Edit Distance) between two strings.
// I used the algorith and code from Wikipedia (https://en.wikipedia.org/wiki/Levenshtein_distance)
// as a reference and just adjusted the code to be used on Google Sheets.
//
// MIT License
//
// Copyright (c) 2017 Manoel Lemos
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// Adaptations by Sarah Freeman.
/**
 * @param {string} s The first string.
 * @param {string} t The second string.
 * @param {string} validDOI
 * @return {int} Levenshtein Distance between the strings.
 * @customfunction
 */
function LevDis(s,t, validDOI) {
  // Workaround on Google Sheets rate-limit for external functions
  // var sleep = Math.floor((Math.random() * 3000) + 1);
  // Utilities.sleep(3000+sleep);

  //If invalid DOI, do not display Levenshtein Distance
  if (!validDOI) {
    return;
  }

  // Calculations
  if (s == t) return 0;
  if (s.length == 0) return t.length;
  if (t.length == 0) return s.length;

  var v0 = [];
  var v1 = [];
  var i;
  var j;
  var cost;

  for (i = 0; i < (t.length+1); i++) {
      v0[i] = i;
  }

  for(i = 0; i < s.length; i++)
  {
      v1[0] = i + 1;
      for(j = 0; j < t.length; j++)
      {
        if (s[i] == t[j]) {
          cost = 0;
        } else {
          cost = 1;
        }
        v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
      }
      for(j = 0; j < (t.length+1); j++) {
          v0[j] = v1[j];
      }
  }
  return v1[t.length];
}