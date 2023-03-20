export const CURRENT_VERSION_MAJOR = 7;
export const CURRENT_VERSION_MINOR = [31];

export function validateVersion(
  major: number,
  minor: number,
  strictness: "major" | "minor" = "minor"
) {
  if (
    !matchVersion(major, CURRENT_VERSION_MAJOR) ||
    (strictness == "minor" && !matchVersion(minor, CURRENT_VERSION_MINOR))
  ) {
    const err = new Error(
      `Save version "${major}.${minor}" is not compatible with this parser.  Expected version "${CURRENT_VERSION_MAJOR}.${CURRENT_VERSION_MINOR}".`
    );
    (err as any).code =
      major !== CURRENT_VERSION_MAJOR ? E_VERSION_MAJOR : E_VERSION_MINOR;
    throw err;
  }
}

function matchVersion(
  currentVersion: number,
  supportedVersion: number | number[]
) {
  if (Array.isArray(supportedVersion)) {
    return supportedVersion.indexOf(currentVersion) !== -1;
  }

  return currentVersion === supportedVersion;
}

export const E_VERSION_MAJOR = "E_VERSION_MAJOR";
export const E_VERSION_MINOR = "E_VERSION_MINOR";
