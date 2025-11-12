# 🤖 Autonomous Landing Page Agent

An AI-powered agent that automatically creates, codes, and deploys landing pages for BookTok Hype Hub.

## Quick Start

```bash
# Install dependencies
pnpm install

# Run the agent
pnpm agent -k YOUR_OPENROUTER_API_KEY
```

## What It Does

1. **Asks for your idea**: What landing page do you want? (e.g., "romance books", "sci-fi audiobooks")
2. **Generates keywords**: Creates SEO-optimized search terms
3. **Fetches books**: Gets recommendations for your theme
4. **Writes code**: Creates the page component, updates routes, adds search integration
5. **Git workflow**: Creates branch, commits, pushes, and opens PR

## Requirements

- **OpenRouter API Key**: Get one at https://openrouter.ai/
- **GitHub Token** (optional): Set `GITHUB_TOKEN` env var for automatic PR creation
  ```bash
  export GITHUB_TOKEN=your_github_token
  pnpm agent -k your_openrouter_key
  ```

## Example Usage

```bash
$ pnpm agent -k sk-or-v1-xxx...

🤖 Landing Page Agent Started!

💡 What landing page idea do you have? romance books

🧠 Agent thinking...

🔧 Executing: generate_keywords
🔧 Executing: fetch_book_recommendations  
🔧 Executing: generate_content
🔧 Executing: write_page_file
🔧 Executing: update_app_routes
🔧 Executing: update_search_results
🔧 Executing: create_git_branch
🔧 Executing: commit_and_push
🔧 Executing: create_pull_request

✨ Agent completed! Check your repository for the new branch and PR.
```

## Architecture

- **agent.ts**: Main orchestration loop with OpenAI function calling
- **tools.ts**: Tool implementations (file writing, git operations, API calls)
- **templates.ts**: React component code templates

## Tools Available

- `generate_keywords`: SEO keyword generation
- `fetch_book_recommendations`: Book API integration
- `generate_content`: Page content creation
- `write_page_file`: Write React component
- `update_app_routes`: Add route to App.tsx
- `update_search_results`: Integrate with search engine
- `create_git_branch`: Git branch creation
- `commit_and_push`: Commit and push changes
- `create_pull_request`: GitHub PR creation

## Models Supported

Currently configured for: `anthropic/claude-3.5-sonnet`

You can modify this in `agent.ts` if needed.

## Limitations

- Book recommendations currently use mock data (integrate real API endpoint)
- Requires manual book cover uploads for production
- PR creation needs GITHUB_TOKEN environment variable

## Hackathon Notes

Built in 2-3 hours for rapid landing page generation! 🚀

