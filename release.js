#!/usr/bin/env node

import { execSync } from "child_process";
import process from "process";
import { errorCauses, createError } from "error-causes";

// Configuration objects (camelCase per javascript.mdc)

const bumpAliases = {
  breaking: "major",
  feature: "minor",
  fix: "patch",
  major: "major",
  minor: "minor",
  patch: "patch",
};

const defaultBump = "minor";

const allowedBranches = ["main", "master"];

const config = {
  validBumpTypes: Object.keys(bumpAliases),
};

// Error causes definition using error-causes library
const [releaseErrors, handleReleaseErrors] = errorCauses({
  ValidationError: {
    code: "VALIDATION_ERROR",
    message: "Input validation failed",
  },
  GitError: {
    code: "GIT_ERROR",
    message: "Git operation failed",
  },
  ReleaseItError: {
    code: "RELEASE_IT_ERROR",
    message: "release-it command failed",
  },
});

const { ValidationError, GitError, ReleaseItError } = releaseErrors;

// Pure utility functions (explicit parameter defaults per javascript.mdc)
const parseBumpType = ({
  argv = process.argv,
  defaultType = defaultBump,
} = {}) => argv.slice(2)[0] || defaultType;

const validateBumpType = (bumpType) => {
  if (!bumpAliases[bumpType]) {
    throw createError({
      ...ValidationError,
      message: `Invalid bump type: ${bumpType}. Valid options: ${config.validBumpTypes.join(
        ", "
      )}`,
    });
  }
  return bumpAliases[bumpType];
};

const getCurrentBranch = () => {
  try {
    const branch = execSync("git branch --show-current", {
      encoding: "utf8",
    }).trim();
    return branch;
  } catch (originalError) {
    throw createError({
      ...GitError,
      message: "Failed to get current git branch",
      cause: originalError,
    });
  }
};

const validateBranch = (branch) => {
  const allowed = allowedBranches.includes(branch);
  if (!allowed) {
    throw createError({
      ...ValidationError,
      message: `Not on allowed branch. Current: ${branch}, Allowed: ${allowedBranches.join(
        ", "
      )}`,
    });
  }
  return { branch, valid: true };
};

const runReleaseIt = (semverType) => {
  try {
    console.log(`🚀 Starting release with release-it (${semverType})...`);
    execSync(`npx release-it ${semverType} --ci`, {
      stdio: "inherit",
      env: { ...process.env },
    });
    console.log("🎉 Release completed successfully!");
  } catch (originalError) {
    throw createError({
      ...ReleaseItError,
      message: "release-it command failed",
      cause: originalError,
    });
  }
};

// Use error-causes handleErrors pattern
const handleError = handleReleaseErrors({
  ValidationError: ({ message, cause }) => {
    console.error(`❌ Validation failed: ${message}`);
    console.error("💡 Fix the issue and try again.");
    if (cause) console.error(`🔍 Root cause: ${cause.message || cause}`);
    process.exit(1);
  },
  GitError: ({ message, cause }) => {
    console.error(`❌ Git command failed: ${message}`);
    console.error("💡 Check your git configuration and network connection.");
    if (cause?.command) console.error(`📝 Failed command: ${cause.command}`);
    if (cause?.message) console.error(`🔍 Root cause: ${cause.message}`);
    process.exit(1);
  },
  ReleaseItError: ({ message, cause }) => {
    console.error(`❌ release-it failed: ${message}`);
    console.error("💡 Check the release-it output above for details.");
    if (cause?.message) console.error(`🔍 Root cause: ${cause.message}`);
    process.exit(1);
  },
});

// Simplified release flow using release-it
const createRelease = ({ argv, defaultType }) => {
  const bumpType = parseBumpType({ argv, defaultType });
  const semverType = validateBumpType(bumpType);

  // Basic validation pipeline
  const currentBranch = getCurrentBranch();
  validateBranch(currentBranch);

  console.log(
    `🎯 Preparing ${bumpType} (${semverType}) release on branch ${currentBranch}...`
  );

  // Use release-it to handle the complete release workflow
  runReleaseIt(semverType);
};

// Main function - now concise with explicit parameter defaults
function main({ argv = process.argv, defaultType = defaultBump } = {}) {
  try {
    createRelease({ argv, defaultType });
  } catch (error) {
    // Enhanced error handling with specific error types
    handleError(error);
  }
}

// Show usage if --help is provided
if (process.argv.includes("--help") || process.argv.includes("-h")) {
  console.log(`
🚀 Release Script (powered by release-it)

Usage: npm run release [<bump-type>]

Bump types:
  major, breaking    - Breaking changes (1.0.0 -> 2.0.0)  
  minor, feature     - New features (1.0.0 -> 1.1.0) [default]
  patch, fix         - Bug fixes (1.0.0 -> 1.0.1)

Examples:
  npm run release           # minor bump (default)
  npm run release breaking  # major bump  
  npm run release feature   # minor bump
  npm run release fix       # patch bump

This script uses release-it to:
1. Run tests before release
2. Bump the version in package.json
3. Commit the version change  
4. Create a git tag (v*.*.*)
5. Push commits and tags to origin
6. Create GitHub release with auto-generated changelog
7. Publish to npm registry
`);
  process.exit(0);
}

main();
