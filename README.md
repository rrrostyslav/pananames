## Installation

Node.js 20+ and npm are required.

```bash
npm ci
npx playwright install chromium
```

Create `.env` from `.env.example` and provide the test credentials:

```env
BASE_URL=https://mcp.pananames-dev.com/
TEST_USERNAME=
TEST_PASSWORD=
```

## Running the tests

```bash
npm test
```

Run with a visible browser:

```bash
npx playwright test --headed
```

Authentication is performed through the UI once before the test run. The session state is stored locally in `.auth/user.json`.

## Note about locators

Some elements are located using XPath because the app does not provide enough stable locators. These locators may be sensitive to layout changes. In a reale case, stable locators would be preferred.

## Test report

The repository includes an HTML report from the latest test run in `playwright-report/index.html`.

Open the report with Playwright:

```bash
npm run report
```
