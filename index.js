#!/usr/bin/env node

/**
 * WordPress SEO Theme Auditor — CLI installer for the skill file.
 *
 * This package ships an AI assistant skill (SKILL.md). The CLI copies that
 * skill into an assistant's skills directory, or prints it to stdout so it can
 * be piped elsewhere. It does not crawl sites or modify WordPress themes.
 */

import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const require = createRequire(import.meta.url);
const PACKAGE_ROOT = path.dirname(fileURLToPath(import.meta.url));
const PKG = require('./package.json');

/** Files copied into the skill directory on install. */
const SKILL_FILES = ['SKILL.md', 'LICENSE'];

/** Directory name created inside the target skills directory. */
const SKILL_DIR_NAME = 'wordpress-seo-theme-auditor';

const USAGE = `
${PKG.name} v${PKG.version}
${PKG.description}

Usage
  npx ${PKG.name} <command> [options]

Commands
  install            Copy the skill into an AI assistant's skills directory
  print              Write SKILL.md to stdout
  path               Print the absolute path of the bundled SKILL.md
  info               Show package metadata and the skill's audit coverage
  help               Show this message

Install options
  --dir <path>       Skills directory to install into
                     (default: ~/.claude/skills)
  --local            Shorthand for --dir ./.claude/skills
  --force            Overwrite an existing installation
  --dry-run          Report what would be written without writing it

Examples
  npx ${PKG.name} install
  npx ${PKG.name} install --local
  npx ${PKG.name} install --dir ~/.config/my-agent/skills --force
  npx ${PKG.name} print > SKILL.md
`.trim();

const useColor = process.stdout.isTTY && !process.env.NO_COLOR;
const paint = (code, text) => (useColor ? `\u001b[${code}m${text}\u001b[0m` : text);
const bold = (text) => paint('1', text);
const dim = (text) => paint('2', text);
const green = (text) => paint('32', text);
const yellow = (text) => paint('33', text);
const red = (text) => paint('31', text);

class CliError extends Error {
  constructor(message, exitCode = 1) {
    super(message);
    this.exitCode = exitCode;
  }
}

/** Absolute path of a file bundled with this package. */
export function skillPath(file = 'SKILL.md') {
  return path.join(PACKAGE_ROOT, file);
}

/** Contents of the bundled SKILL.md. */
export function readSkill() {
  return fs.readFileSync(skillPath(), 'utf8');
}

/** Default skills directory for an install. */
export function defaultSkillsDir({ local = false } = {}) {
  return local
    ? path.join(process.cwd(), '.claude', 'skills')
    : path.join(os.homedir(), '.claude', 'skills');
}

function parseArgs(argv) {
  const options = { dir: null, local: false, force: false, dryRun: false };
  const positional = [];

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    switch (arg) {
      case '--dir':
      case '-d': {
        const value = argv[i + 1];
        if (!value || value.startsWith('-')) {
          throw new CliError('--dir requires a directory path', 2);
        }
        options.dir = value;
        i += 1;
        break;
      }
      case '--local':
        options.local = true;
        break;
      case '--force':
      case '-f':
        options.force = true;
        break;
      case '--dry-run':
        options.dryRun = true;
        break;
      case '--help':
      case '-h':
        positional.push('help');
        break;
      case '--version':
      case '-v':
        positional.push('version');
        break;
      default:
        if (arg.startsWith('-')) {
          throw new CliError(`Unknown option: ${arg}`, 2);
        }
        positional.push(arg);
    }
  }

  return { command: positional[0] ?? 'help', options };
}

/**
 * Copy the skill files into `<skillsDir>/wordpress-seo-theme-auditor/`.
 * Returns the destination directory and the files written.
 */
export function install({ dir, local = false, force = false, dryRun = false } = {}) {
  const skillsDir = path.resolve(dir ?? defaultSkillsDir({ local }));
  const destination = path.join(skillsDir, SKILL_DIR_NAME);
  const existing = fs.existsSync(path.join(destination, 'SKILL.md'));

  if (existing && !force) {
    throw new CliError(
      `Skill already installed at ${destination}\nRe-run with --force to overwrite it.`
    );
  }

  const written = [];
  for (const file of SKILL_FILES) {
    const source = skillPath(file);
    if (!fs.existsSync(source)) continue;
    if (!dryRun) {
      fs.mkdirSync(destination, { recursive: true });
      fs.copyFileSync(source, path.join(destination, file));
    }
    written.push(file);
  }

  if (written.length === 0) {
    throw new CliError('No skill files found in the package — the install is incomplete.');
  }

  return { destination, written, overwritten: existing, dryRun };
}

function commandInstall(options) {
  const result = install(options);
  const label = result.dryRun
    ? yellow('Would install')
    : green(result.overwritten ? 'Reinstalled' : 'Installed');

  console.log(`${label} ${bold(PKG.name)} v${PKG.version}`);
  console.log(`  ${result.destination}`);
  for (const file of result.written) {
    console.log(dim(`    ${file}`));
  }

  if (!result.dryRun) {
    console.log('');
    console.log('Restart your assistant, then ask it to audit a theme against the skill.');
  }
}

function commandInfo() {
  const skill = readSkill();
  const sections = skill
    .split('\n')
    .filter((line) => /^## \d+\./.test(line))
    .map((line) => line.replace(/^##\s*/, ''));

  console.log(`${bold(PKG.name)} v${PKG.version}`);
  console.log(PKG.description);
  console.log('');
  console.log(`${bold('Skill file')}  ${skillPath()}`);
  console.log(`${bold('Install to')}  ${defaultSkillsDir()}/${SKILL_DIR_NAME}`);
  console.log('');
  console.log(bold('Skill sections'));
  for (const section of sections) {
    console.log(`  ${section}`);
  }
}

export function run(argv = process.argv.slice(2)) {
  const { command, options } = parseArgs(argv);

  switch (command) {
    case 'install':
      commandInstall(options);
      break;
    case 'print':
      process.stdout.write(readSkill());
      break;
    case 'path':
      console.log(skillPath());
      break;
    case 'info':
      commandInfo();
      break;
    case 'version':
      console.log(PKG.version);
      break;
    case 'help':
      console.log(USAGE);
      break;
    default:
      throw new CliError(`Unknown command: ${command}\n\n${USAGE}`, 2);
  }
}

const invokedDirectly =
  process.argv[1] && fs.realpathSync(process.argv[1]) === fs.realpathSync(fileURLToPath(import.meta.url));

if (invokedDirectly) {
  try {
    run();
  } catch (error) {
    console.error(`${red('Error:')} ${error.message}`);
    process.exit(error instanceof CliError ? error.exitCode : 1);
  }
}
