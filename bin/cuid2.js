#!/usr/bin/env node

import { createId, init } from "../index.js";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { homedir } from "os";
import { join } from "path";

const args = process.argv.slice(2);

// Handle --install-alias
if (args.includes("--install-alias")) {
  const shellConfigFiles = [
    ".zshrc",
    ".bashrc",
    ".bash_profile",
    ".profile",
  ];
  
  const aliasCommand = 'alias cuid="npx @paralleldrive/cuid2"';
  const home = homedir();
  
  let installed = false;
  
  for (const configFile of shellConfigFiles) {
    const configPath = join(home, configFile);
    
    if (existsSync(configPath)) {
      const content = readFileSync(configPath, "utf8");
      
      // Check if alias already exists
      if (content.includes('alias cuid=')) {
        console.log(`✓ Alias already exists in ${configFile}`);
        installed = true;
      } else {
        // Add alias to config file
        const newContent = content + `\n\n# CUID2 alias\n${aliasCommand}\n`;
        writeFileSync(configPath, newContent, "utf8");
        console.log(`✓ Alias added to ${configFile}`);
        console.log(`  Run: source ~/${configFile}`);
        installed = true;
      }
    }
  }
  
  if (!installed) {
    console.log("✗ No shell config file found");
    console.log(`  You can manually add: ${aliasCommand}`);
    process.exit(1);
  }
  
  process.exit(0);
}

// Parse arguments
const getArgValue = (flag) => {
  const index = args.indexOf(flag);
  return index !== -1 && args[index + 1] ? args[index + 1] : null;
};

const hasSlug = args.includes("--slug");
const lengthArg = getArgValue("--length");
const fingerprintArg = getArgValue("--fingerprint");
const countArg = args.find(
  (arg) => !arg.startsWith("--") && arg !== lengthArg && arg !== fingerprintArg
);
const count = parseInt(countArg) || 1;

// Build init options
const options = {};
if (hasSlug) {
  options.length = 5;
} else if (lengthArg) {
  options.length = parseInt(lengthArg);
}
if (fingerprintArg) {
  options.fingerprint = fingerprintArg;
}

// Create generator
const generator = Object.keys(options).length > 0 ? init(options) : createId;

// Generate IDs
for (let i = 0; i < count; i++) {
  console.log(generator());
}
