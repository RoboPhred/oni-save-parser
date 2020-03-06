export const CURRENT_VERSION_MAJOR = 7;
export const CURRENT_VERSION_MINOR = 15;

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
    (err as any).code = E_VERSION;
    throw err;
  }
}

export const E_VERSION = "E_VERSION";
