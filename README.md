# WordPress SEO Theme Auditor

**An AI skill for auditing, diagnosing, and fixing WordPress theme SEO issues without breaking existing functionality.**

WordPress SEO Theme Auditor helps AI coding assistants inspect WordPress themes, investigate technical SEO audit findings, identify the actual source of problems, implement safe fixes, and verify that changes work as intended.

It is designed for classic PHP themes, block themes, and hybrid themes, including sites that use SEO plugins, multilingual plugins, custom post types, caching, and performance optimization layers.

## Install

Install the skill into your AI assistant with a single command — no global install required:

```bash
npx wp-seo-theme-auditor install
```

That copies the skill to `~/.claude/skills/wordpress-seo-theme-auditor/`. Restart the assistant afterwards so it picks the skill up.

### CLI commands

| Command | Description |
| --- | --- |
| `install` | Copy the skill into an AI assistant's skills directory |
| `print` | Write `SKILL.md` to stdout |
| `path` | Print the absolute path of the bundled `SKILL.md` |
| `info` | Show package metadata and the skill's section coverage |
| `help` | Show usage |

Install options:

| Option | Description |
| --- | --- |
| `--dir <path>` | Skills directory to install into (default `~/.claude/skills`) |
| `--local` | Shorthand for `--dir ./.claude/skills` — installs into the current project |
| `--force` | Overwrite an existing installation |
| `--dry-run` | Report what would be written without writing it |

```bash
# install into the current project instead of your home directory
npx wp-seo-theme-auditor install --local

# install into another assistant's skills directory
npx wp-seo-theme-auditor install --dir ~/.config/my-agent/skills --force

# pipe the skill wherever you need it
npx wp-seo-theme-auditor print > SKILL.md
```

The binary is also available as `wp-seo-auditor`. Node.js 18 or newer is required. The CLI only installs and prints the skill file — it does not crawl sites or modify themes.

## What it helps with

- Technical SEO audits of WordPress themes.
- Findings from Ahrefs, Semrush, Screaming Frog, Google Search Console, Lighthouse, and PageSpeed Insights.
- Page titles, meta descriptions, canonical URLs, robots directives, pagination, and indexability.
- Semantic HTML, heading structure, internal links, images, and media markup.
- Structured data and compatibility with SEO plugins.
- Multilingual URLs, language attributes, and hreflang integration.
- Rendering, mobile usability, accessibility, and Core Web Vitals diagnostics.
- WordPress hooks, template hierarchy, theme assets, and safe refactoring.
- Regression testing and protection of existing site functionality.

## What this skill does not claim to do

This is an instruction set for an AI assistant, not a standalone crawler or WordPress plugin. It does not independently crawl a website, access a server, change a theme, or verify live results unless the assistant has suitable tools and authorized access. Recommendations must be based on available evidence, and theme-level issues must be distinguished from problems caused by plugins, hosting, DNS, server configuration, or external systems.

## Repository contents

- [`SKILL.md`](SKILL.md) — the main skill instructions and audit/remediation workflow.
- [`index.js`](index.js) — the CLI that installs or prints the skill.
- [`package.json`](package.json) — npm package manifest (`npx wp-seo-theme-auditor`).
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — contribution and review guidelines.
- [`SECURITY.md`](SECURITY.md) — responsible vulnerability reporting.
- [`CHANGELOG.md`](CHANGELOG.md) — release history.
- [`LICENSE`](LICENSE) — MIT License.
- `.github/` — issue templates and pull-request template.

## How to use

1. Run `npx wp-seo-theme-auditor install` (or open `SKILL.md` and review the skill's scope and workflow first).
2. Confirm the assistant loads skills from the target directory; for other products, use `--dir` to match that product's current installation format.
3. Provide the assistant with the WordPress theme repository, relevant audit findings, the affected URLs, and any constraints on changing functionality.
4. Ask it to inspect before editing, explain the root cause, propose the smallest safe fix, and run relevant checks.

Example prompt:

> Audit this WordPress theme against the instructions in `SKILL.md`. Review the attached technical SEO findings, map each finding to its actual source, prioritize issues by impact and confidence, and propose fixes. Do not edit files until you have explained the root causes and the planned changes. Preserve all existing behavior and report the verification performed.

### Example follow-up tasks

- Audit canonical and robots output across all relevant templates.
- Check whether title tags and meta descriptions conflict with the active SEO plugin.
- Investigate duplicate headings, broken internal links, missing image alternatives, and invalid schema output.
- Review multilingual template behavior and hreflang integration.
- Implement a confirmed fix and produce a regression checklist.

## Operating principles

- Inspect first; edit only after the cause is understood.
- Prefer minimal, reversible changes.
- Preserve existing functionality and design unless a change is explicitly authorized.
- Do not duplicate SEO-plugin functionality in the theme.
- Do not hide or suppress audit warnings without addressing their causes.
- Test affected templates and representative page types after changes.
- Never claim that a fix was tested or deployed unless that actually happened.

## Compatibility

The skill is written as a Markdown instruction file with YAML front matter. The CLI defaults to the Claude Code skills directory (`~/.claude/skills`). AI products differ in their skill discovery and installation conventions; use `--dir` and adapt the file location and metadata to the target product's current documentation. The repository does not promise automatic installation across every AI assistant.

## Suggested GitHub topics

`wordpress` `seo` `technical-seo` `wordpress-theme` `seo-audit` `ai-skill` `web-development` `screaming-frog` `ahrefs` `semrush`

## License

Released under the MIT License. See [`LICENSE`](LICENSE).
