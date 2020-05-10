export const CURRENT_VERSION_MAJOR = 7;
export const CURRENT_VERSION_MINOR = 17;

export function validateVersion(
  major: number,
  minor: number,
  strictness: "major" | "minor" = "minor"
) {
  if (
    major !== CURRENT_VERSION_MAJOR ||
    (strictness == "minor" && minor !== CURRENT_VERSION_MINOR)
  ) {
    const err = new Error(
      `Save version "${major}.${minor}" is not compatible with this parser.  Expected version "${CURRENT_VERSION_MAJOR}.${CURRENT_VERSION_MINOR}".`
    );
    (err as any).code =
      major !== CURRENT_VERSION_MAJOR ? E_VERSION_MAJOR : E_VERSION_MINOR;
    throw err;
  }
}

export const E_VERSION_MAJOR = "E_VERSION_MAJOR";
export const E_VERSION_MINOR = "E_VERSION_MINOR";
