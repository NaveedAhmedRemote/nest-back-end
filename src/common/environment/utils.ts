/**
 * Get a string environment variable or throws an exception
 * @param key environment variable key
 * @returns Either returns the environment variable value or throws an exception
 */
export function extractStringEnvVar(key: keyof NodeJS.ProcessEnv): string {
  const value = process.env[key];
  console.log('object');

  if (value === undefined) {
    const message = `The environment variable "${key}" cannot be "undefined".`;

    throw new Error(message);
  }

  return value;
}

/**
 * Get a number environment variable or throws an exception
 * @param key environment variable key
 * @returns Either returns the environment variable value or throws an exception
 */
export function extractNumberEnvVar(key: keyof NodeJS.ProcessEnv): number {
  const stringValue = extractStringEnvVar(key);

  const numberValue = parseFloat(stringValue);

  if (Number.isNaN(numberValue)) {
    const message = `The environment variable "${key}" has to hold a stringified number value - not ${stringValue}`;

    throw new Error(message);
  }

  return numberValue;
}
