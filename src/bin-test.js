import { describe } from "riteway";
import { execSync } from "child_process";
import { isCuid } from "./index.js";

const runCli = (args = "") =>
  execSync(`node bin/cuid2.js ${args}`, {
    encoding: "utf8",
    cwd: process.cwd(),
  }).trim();

describe("CLI bin/cuid2.js", async (assert) => {
  {
    const output = runCli();
    const lines = output.split("\n");

    assert({
      given: "no arguments",
      should: "generate a single valid identifier",
      actual: lines.length === 1 && isCuid(lines[0]),
      expected: true,
    });
  }

  {
    const output = runCli("3");
    const lines = output.split("\n");

    assert({
      given: "a count parameter",
      should: "generate the requested number of identifiers",
      actual: lines.length === 3 && lines.every((id) => isCuid(id)),
      expected: true,
    });
  }

  {
    const output = runCli("--slug");
    const id = output.trim();

    assert({
      given: "slug mode",
      should: "generate a short identifier suitable for URL disambiguation",
      actual: id.length === 5 && isCuid(id),
      expected: true,
    });
  }

  {
    const output = runCli("--slug 2");
    const lines = output.split("\n");

    assert({
      given: "slug mode with a count parameter",
      should: "generate the requested number of short identifiers",
      actual:
        lines.length === 2 &&
        lines.every((id) => id.length === 5 && isCuid(id)),
      expected: true,
    });
  }

  {
    const output = runCli("--length 10");
    const id = output.trim();

    assert({
      given: "a custom length parameter",
      should: "generate an identifier of the specified length",
      actual: id.length === 10 && isCuid(id),
      expected: true,
    });
  }

  {
    const output = runCli("--length 8 3");
    const lines = output.split("\n");

    assert({
      given: "a custom length parameter with a count parameter",
      should:
        "generate the requested number of identifiers at the specified length",
      actual:
        lines.length === 3 &&
        lines.every((id) => id.length === 8 && isCuid(id)),
      expected: true,
    });
  }

  {
    const output1 = runCli('--fingerprint "server-1"');
    const output2 = runCli('--fingerprint "server-2"');
    const id1 = output1.trim();
    const id2 = output2.trim();

    assert({
      given: "a custom fingerprint",
      should:
        "generate valid identifiers incorporating the provided fingerprint",
      actual: isCuid(id1) && isCuid(id2),
      expected: true,
    });
  }

  {
    const output = runCli('--length 6 --fingerprint "test" 2');
    const lines = output.split("\n");

    assert({
      given: "multiple configuration options",
      should: "generate identifiers respecting all provided options",
      actual:
        lines.length === 2 &&
        lines.every((id) => id.length === 6 && isCuid(id)),
      expected: true,
    });
  }

  {
    const output = runCli("--help");
    const hasUsage = output.includes("Usage:");
    const hasOptions = output.includes("Options:");
    const hasExamples = output.includes("Examples:");

    assert({
      given: "the help flag",
      should: "display usage information with options and examples",
      actual: hasUsage && hasOptions && hasExamples,
      expected: true,
    });
  }

  {
    const output = runCli("-h");
    const hasUsage = output.includes("Usage:");

    assert({
      given: "the short help flag",
      should: "display usage information",
      actual: hasUsage,
      expected: true,
    });
  }
});
