---
trigger: always_on
---

# Security Guidelines

## Mandatory Security Checks

Before ANY commit or PR creation:
- [ ] No hardcoded secrets (API keys, passwords, tokens, AWS Cognito credentials)
- [ ] All user inputs validated at system boundaries (e.g., Zod schemas)
- [ ] SQL/NoSQL injection prevention
- [ ] XSS prevention (sanitized HTML, DOMPurify)
- [ ] CSRF protection enabled
- [ ] Authentication/authorization verified on all routes
- [ ] Rate limiting on sensitive endpoints
- [ ] Error messages don't leak sensitive data

## Autonomous AI Agent Security Rules (STRICTLY ENFORCED)

1. **Path Sanitization**:
   - NEVER output absolute local machine paths (`C:\Users\...`, `/home/...`) in commit messages, PR descriptions, Issues, or artifacts.
   - Always use relative paths starting from the project root (`./web/...`, `./.agent/...`).
2. **Log & Transcript Masking**:
   - Mask local usernames, IP addresses, or machine-specific environment variables in agent logs.
3. **Secret Leakage Prevention**:
   - NEVER commit `.env.local` or environment files containing real secrets.
   - Automatically abort PR creation if static analysis detects potential hardcoded API keys.

## AWS & Amplify Specifics

- **Cognito & DataStore**: Never expose admin credentials or overly permissive GraphQL/DynamoDB authorization rules.
- **Environment Variables**: NEVER commit `.env.local` or any file containing real AWS keys, database URIs, or API secrets.

## Security Response Protocol

If a security issue is found:
1. STOP immediately.
2. Use [Verification Engineering](../workflows/verification-engineering.md) or `/code-review` to identify scope.
3. Fix CRITICAL issues before continuing.
4. Rotate any exposed secrets immediately.
5. Review the codebase for similar patterns.
