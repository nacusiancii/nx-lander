# 🚀 Agent Setup & Usage

## Installation

```bash
# Install all dependencies including agent dependencies
pnpm install
```

## Running the Agent

```bash
# Basic usage
pnpm agent -k YOUR_OPENROUTER_API_KEY

# With GitHub PR creation (set token first)
export GITHUB_TOKEN=ghp_your_token_here
pnpm agent -k YOUR_OPENROUTER_API_KEY
```

## What Happens?

1. **Interactive prompt**: Agent asks for your landing page idea
2. **Autonomous execution**: Agent uses 9 tools to:
   - Generate SEO keywords
   - Fetch book recommendations
   - Create page content (title, subtitle, features, ad copy)
   - Write React component file
   - Update App.tsx routing
   - Update SearchResults.tsx with keywords & ads
   - Create git branch
   - Commit & push changes
   - Create pull request (if GITHUB_TOKEN set)

3. **Result**: New landing page ready for review in a PR!

## Example Session

```
$ pnpm agent -k sk-or-v1-xxx

🤖 Landing Page Agent Started!

💡 What landing page idea do you have? thriller books

🧠 Agent thinking...

🔧 Executing: generate_keywords
   ✅ Result: ["thriller books", "best thriller", ...]

🔧 Executing: fetch_book_recommendations
   ✅ Result: [{"title": "The Silent Patient", ...}]

🔧 Executing: write_page_file
   ✅ Result: {"success": true, "path": "src/pages/Thriller.tsx"}

...

✨ Agent completed! Check your repository for the new branch and PR.
```

## Testing Without Git Push

If you want to test code generation without pushing:

1. Comment out `commit_and_push` and `create_pull_request` in `agent/tools.ts`
2. Run the agent - it will generate all files locally
3. Review with `git diff`

## Troubleshooting

**"Module not found" errors**: Run `pnpm install` again

**OpenRouter API errors**: 
- Check your API key is valid
- Ensure you have credits at https://openrouter.ai/

**Git push fails**:
- Check you have git credentials configured
- Ensure remote origin is set

**PR creation fails**:
- Set `GITHUB_TOKEN` environment variable
- Token needs `repo` permissions

## Files Created

When you run the agent for "thriller books", it creates:

```
src/pages/Thriller.tsx          # New landing page component
src/App.tsx                      # Updated with new route
src/pages/SearchResults.tsx      # Updated with keywords & ad
```

And creates git branch: `feat/landing-thriller`

## Architecture

The agent uses OpenAI-compatible function calling via OpenRouter:
- **Model**: Claude 3.5 Sonnet (configurable)
- **Tools**: 9 autonomous functions
- **Max iterations**: 15 (usually completes in 8-10)

## Time to Complete

~2-4 minutes depending on:
- API response time
- Number of iterations
- Git push speed

Happy hacking! 🎉

