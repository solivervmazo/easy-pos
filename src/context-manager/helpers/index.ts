export function checkIfPipelineKeysUnique(
  haystack: Array<[string, ...any]>
): void {
  const tuples: Array<string> = [];
  haystack.forEach((tuple) =>
    tuples.includes(tuple[0])
      ? console.warn(
          `Middleware key(${tuple[0]}) should be unique in pipelines, otherwise it will overwrite the predecessor.`
        )
      : tuples.push(tuple[0])
  );
}

export function checkIfPipelineNoKeyExists(
  haystack: Array<[string, ...any]>,
  needle: string
): boolean {
  if (haystack.every((tuple) => tuple[0] === needle)) {
    return false;
  }
  console.warn(
    `Middleware key(${needle}) does not exist on successors. Breaking pipeline`
  );
  return true;
}
