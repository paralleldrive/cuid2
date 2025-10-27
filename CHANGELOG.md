# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.2] - 2025-10-27

### Changed

- Remove collision-test from pre-commit hook to unblock release process

### Fixed

- Replace BigInt with bignumber.js for broader browser support (legacy browsers)
- Add export module field to package.json for better ESM compatibility

### Added

- Implement CSPRNG using crypto.getRandomValues for enhanced security
- Add validation to throw error when length > 32

### Documentation

- Fix typo: Change "Pseudo" to "Pseudo" in README.md
- Update link for PleaseRobMe.com

## [3.0.0] - 2025-10-18

### ⚠️ BREAKING CHANGES

- **Convert entire project from CommonJS to ES modules**
  - Changed from `require()`/`module.exports` to `import`/`export`
  - Added `"type": "module"` to package.json
  - Users must use ESM imports or upgrade to this version carefully
  - For CommonJS compatibility, use v2.3.1 instead

## [2.3.1] - 2025-10-24

### Fixed

- **Maintenance release:** Restore CommonJS compatibility for v2.x line
- This version is based on v2.2.2 to provide a non-breaking upgrade path
- Published with `v2-compat` tag for users who need CommonJS

> **Note:** v2.3.0 was incorrectly released with a breaking change (ESM conversion).
> This version supersedes v2.3.0 for users on the v2.x line.

## [2.3.0] - 2025-10-18 [DEPRECATED]

⚠️ **This version contains a breaking change and should have been v3.0.0**

Use v2.3.1 for CommonJS or v3.0.0+ for ESM.

### Changed

- Converted to ES modules (breaking change)
- Added CLI with help flags
- Improved dark mode detection
- Upgraded @noble/hashes to v2.0.1
- Modernized dev tooling

### Added

- CLI tool with shell alias installer
- Better documentation

## [2.2.2] - 2023-08-08

### Fixed

- Fix type definition for random option parameter

## [2.2.1] - 2023-06-05

### Added

- Expose random parameter to allow custom random implementation
- Document usage with React Native

### Fixed

- Create entropy should use supplied random function

### Documentation

- Improve `init` docs
- Update repository URLs for .NET and PHP ports
- Add missing closing parenthesis in docs
- Fix various typos

## [2.2.0] - 2023-02-20

### Added

- Add `isCuid(id)` function to validate CUID strings

### Changed

- Remove unused variables for cleaner codebase

### Documentation

- Various README improvements

## [2.1.0] - 2023-02-17

### Added

- Add PHP port reference
- Add Dart port reference

### Changed

- Cleanup and improvements to codebase
- Add `files` field to package.json for smaller package size

### Documentation

- Multiple README updates and improvements

## [2.0.1] - 2023-01-23

### Fixed

- Fix conversion bug that could cause collisions (#25)
- Fix histogram and conversion tests

### Added

- Add character frequency test

## [2.0.0] - 2023-01-09

### Changed

- Performance improvements: Move globalObj and primes outside function scopes

### Fixed

- Fix counter not being incremented (#21)
- Fix global object expression
- Update TypeScript types

### Documentation

- Add comparisons to other ID generators
- Multiple README improvements

## [1.0.2] - 2023-01-04

### Fixed

- Various bug fixes and improvements

## [1.0.1] - 2022-12-31

### Changed

- Minor improvements and fixes

## [1.0.0] - 2022-12-30

### Added

- Initial stable release of CUID2
- Cryptographically secure, collision-resistant IDs
- K-sortable (roughly time-ordered)
- URL-safe, no special characters
- Configurable length (default 24 characters)
- Customizable fingerprints and random functions

[3.0.2]: https://github.com/paralleldrive/cuid2/compare/v3.0.0...v3.0.2
[3.0.0]: https://github.com/paralleldrive/cuid2/compare/v2.3.1...v3.0.0
[2.3.1]: https://github.com/paralleldrive/cuid2/compare/v2.2.2...v2.3.1
[2.3.0]: https://github.com/paralleldrive/cuid2/compare/v2.2.2...v2.3.0
[2.2.2]: https://github.com/paralleldrive/cuid2/compare/v2.2.1...v2.2.2
[2.2.1]: https://github.com/paralleldrive/cuid2/compare/v2.2.0...v2.2.1
[2.2.0]: https://github.com/paralleldrive/cuid2/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/paralleldrive/cuid2/compare/v2.0.1...v2.1.0
[2.0.1]: https://github.com/paralleldrive/cuid2/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/paralleldrive/cuid2/compare/v1.0.2...v2.0.0
[1.0.2]: https://github.com/paralleldrive/cuid2/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/paralleldrive/cuid2/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/paralleldrive/cuid2/releases/tag/v1.0.0
