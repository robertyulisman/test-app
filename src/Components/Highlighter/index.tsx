import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Text } from 'react-native';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'high... Remove this comment to see the full error message
import { findAll } from 'highlight-words-core';
import CustomText from "../CustomText";
/**
 * Highlights all occurrences of search terms (searchText) within a string (textToHighlight).
 * This function returns an array of strings and <Text> elements (wrapping highlighted words).
 */

export default function Highlighter({ autoEscape, highlightStyle, searchWords, textToHighlight, sanitize, style, ...props} : any) {
 
  const chunks = findAll({ textToHighlight, searchWords, sanitize, autoEscape });

  return (
    <CustomText textType="semibold" numberOfLines={1} ellipsizeMode="tail" style={style} {...props}>
      {chunks.map((chunk: any, index: any) => {
        const text = textToHighlight.substr(chunk.start, chunk.end - chunk.start);

        return !chunk.highlight ? (
          text
        ) : (
          <Text key={index} style={chunk.highlight && highlightStyle}>
            {text}
          </Text>
        );
      })}
    </CustomText>
  );
}
