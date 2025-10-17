# Release Script Replacement Epic

## Goal

Extract sudolang.ai's release scripts into a shared npm package (`@paralleldrive/release-system`) that both sudolang.ai and cuid2 can import, eliminating duplication.

## Current State

Both projects have duplicate release scripts:

- `release.js` - Main release script with validation and release-it integration
- `lib/release-helpers.js` - Helper functions (sudolang.ai only)
- `lib/update-latest-tag-hook.js` - Latest tag updater (sudolang.ai only)
- `.release-it.json` - release-it configuration

## Tasks

### 1. Create & Package Release System

- [ ] Create new repo: `@paralleldrive/release-system`
- [ ] Extract scripts from sudolang.ai
- [ ] Configure as npm package with bin exports
- [ ] Test locally with yalc
- [ ] Publish to npm

### 2. Integrate into Projects

- [ ] Install package in sudolang.ai
- [ ] Install package in cuid2
- [ ] Update package.json scripts in both
- [ ] Remove local release files
- [ ] Test release process (dry run) in both

### 3. Validate

- [ ] Verify release process works in both projects
- [ ] Verify latest tag update functionality
- [ ] Document usage for future projects
