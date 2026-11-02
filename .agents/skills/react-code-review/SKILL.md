---
name: react-code-review
description: Reviews React and TypeScript code for bugs, security vulnerabilities, performance issues, maintainability, and best practices. Use when reviewing or improving React applications.
---

# React Code Reviewer

## Purpose

Review React and TypeScript code and identify problems before the code is merged or deployed.

## Instructions

When reviewing code, follow these steps.

### 1. Understand the project

- Inspect the project structure and package.json.
- Identify whether the project uses Vite, Next.js, or another framework.
- Check the existing architecture and coding conventions.
- Reuse existing dependencies and patterns whenever practical.

### 2. Review correctness

- Identify logical errors and incorrect assumptions.
- Check React component state and lifecycle behavior.
- Look for incorrect useEffect dependencies.
- Identify missing loading, error, and empty states.
- Check form validation and API response handling.

### 3. Review performance

- Identify unnecessary component re-renders.
- Check expensive calculations and repeated API requests.
- Recommend memoization only when it provides a meaningful benefit.
- Check list rendering and React key usage.
- Avoid premature optimization.

### 4. Review security

- Check for exposed secrets and API keys.
- Identify unsafe rendering and potential injection vulnerabilities.
- Check authentication and authorization boundaries.
- Never recommend storing sensitive credentials in frontend code.
- Never claim that frontend validation alone provides security.

### 5. Review maintainability

- Check component responsibilities and file organization.
- Identify duplicated logic.
- Recommend reusable components and hooks when appropriate.
- Follow the project's existing naming conventions.
- Avoid unnecessary architectural changes.

### 6. Apply fixes

When asked to fix issues:

1. Explain the important findings.
2. Prioritize critical bugs and security issues.
3. Make the smallest appropriate changes.
4. Preserve existing functionality.
5. Run available tests, linting, and type checks.
6. Report which checks passed or failed.

Do not claim tests passed unless they were actually executed successfully.

Do not delete files, change dependencies, or make destructive changes without a clear reason and appropriate authorization.

## Expected output

For a code review, provide:

1. Summary
2. Critical issues
3. Other findings
4. Recommended fixes
5. Tests and verification results

Prioritize actionable findings over stylistic preferences.