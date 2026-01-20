export const parseFeaturesString = (features: string | string[] | undefined | null): string[] => {
  if (!features) {
    return [];
  }

  if (Array.isArray(features)) {
    // If it's already an array, but its elements might be stringified JSON arrays
    if (features.length === 1 && typeof features[0] === 'string') {
      try {
        const innerParsed = JSON.parse(features[0]);
        if (Array.isArray(innerParsed)) {
          return innerParsed.map(item => String(item || ''));
        }
      } catch (e) {
        // Not a stringified JSON array inside, treat as plain strings
      }
    }
    return features.map(item => String(item || ''));
  }

  if (typeof features === 'string') {
    let S = features.trim();
    try {
      let parsed = JSON.parse(S); // First parse

      // Check if the first parse resulted in an array
      if (Array.isArray(parsed)) {
        // If this array contains a single string element that itself is a JSON array string
        // e.g., S = "[\"[\\\"F1\\\",\\\"F2\\\"]\"]" -> parsed = ["[\"F1\",\"F2\"]"]
        if (parsed.length === 1 && typeof parsed[0] === 'string') {
          try {
            const deeperParsed = JSON.parse(parsed[0]); // Parse the inner string
            if (Array.isArray(deeperParsed)) {
              return deeperParsed.map(item => String(item || ''));
            }
          } catch (e) {
            // Failed to parse the inner string, return the outer array's string element as is
            return [String(parsed[0] || '')];
          }
        }
        // If it's a simple array of strings after the first parse
        // e.g., S = "[\"F1\",\"F2\"]" -> parsed = ["F1", "F2"]
        return parsed.map(item => String(item || ''));
      }
      // Check if the first parse resulted in a string (doubly stringified JSON)
      // e.g., S = "\"[\\\"F1\\\",\\\"F2\\\"]\"" -> parsed = "[\"F1\",\"F2\"]"
      else if (typeof parsed === 'string' && parsed.startsWith('[') && parsed.endsWith(']')) {
        const secondParse = JSON.parse(parsed); // Second parse
        if (Array.isArray(secondParse)) {
          return secondParse.map(item => String(item || ''));
        }
      }
    } catch (e) {
      console.warn('[parseFeaturesString] JSON.parse failed or data is not a direct/doubly JSON array string:', S, 'Error:', e);
      // Fallback for non-JSON strings or other formats
      if (S.startsWith('["') && S.endsWith('"]')) {
        if (S === '[""]') return [''];
        return S.substring(2, S.length - 2).split('","').map(item => item.trim());
      }
      if (S.startsWith('[') && S.endsWith(']')) {
        S = S.substring(1, S.length - 1);
      }
      return S.split(',').map(item => {
        let cleanItem = item.trim();
        if ((cleanItem.startsWith('"') && cleanItem.endsWith('"')) || (cleanItem.startsWith("'") && cleanItem.endsWith("'"))) {
          cleanItem = cleanItem.substring(1, cleanItem.length - 1);
        }
        return cleanItem;
      }).filter(item => item);
    }
  }
  return [];
}; 