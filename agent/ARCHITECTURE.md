# Agent Architecture

## Overview

Autonomous AI agent that generates complete landing pages following the BookTok Hype Hub requirements document.

## Core Components

### 1. Agent Loop (`agent.ts`)
- **Model**: Claude 3.5 Sonnet via OpenRouter
- **Pattern**: Function calling in iterative loop
- **Max iterations**: 15 (typically completes in 8-10)
- **Input**: User's landing page idea
- **Output**: Complete working landing page + git workflow

### 2. Tool System (`tools.ts`)

**9 Autonomous Tools**:

| Tool | Purpose | Output |
|------|---------|--------|
| `generate_keywords` | SEO keyword generation | Array of 12 keywords |
| `fetch_book_recommendations` | Get books from API | Array of book objects |
| `generate_content` | Create page content | Title, subtitle, features, ad copy |
| `write_page_file` | Write React component | File written to src/pages/ |
| `update_app_routes` | Update App.tsx routing | Route added |
| `update_search_results` | Add search integration | Keywords + ad added |
| `create_git_branch` | Create feature branch | Branch created |
| `commit_and_push` | Commit & push code | Changes pushed |
| `create_pull_request` | Open GitHub PR | PR URL returned |

### 3. Templates (`templates.ts`)

**Code Generation**:
- `generatePageCode()`: Full React component with hero, features, book grid, CTA
- Follows existing patterns from Booktok, Kids, Comparison pages
- Uses shadcn-ui components
- Responsive design with Tailwind CSS

## Workflow

```
User Input: "thriller books"
    ↓
[Agent Loop Start]
    ↓
1. generate_keywords("thriller books")
   → ["thriller books", "best thriller 2025", ...]
    ↓
2. fetch_book_recommendations("thriller")
   → [{title: "Book 1", author: "Author 1", ...}, ...]
    ↓
3. generate_content(theme, keywords, books)
   → {title: "...", subtitle: "...", features: [...], ...}
    ↓
4. write_page_file("Thriller", content)
   → src/pages/Thriller.tsx created
    ↓
5. update_app_routes("Thriller", "/thriller")
   → App.tsx updated with import & route
    ↓
6. update_search_results("thrillerKeywords", keywords, ad, "/thriller")
   → SearchResults.tsx updated with keywords, logic, ad
    ↓
7. create_git_branch("feat/landing-thriller")
   → New branch created
    ↓
8. commit_and_push("Add thriller landing page", "feat/landing-thriller")
   → Changes committed and pushed
    ↓
9. create_pull_request("Add Thriller Landing Page", description, branch)
   → PR created on GitHub
    ↓
[Agent Loop End]
    ↓
Output: "✨ Agent completed! Check your repository..."
```

## Design Decisions

### Why Function Calling?
- **Deterministic**: Agent must complete all steps
- **Observable**: Each tool call is logged
- **Debuggable**: Can see exactly what failed
- **Extensible**: Easy to add new tools

### Why OpenRouter?
- **Model agnostic**: Can switch between Claude, GPT-4, etc.
- **Cost effective**: Pay per use
- **No vendor lock-in**: Standard OpenAI API format

### Why Template-Based?
- **Fast**: No LLM calls for code generation
- **Consistent**: Always follows best practices
- **Reliable**: No hallucinated code
- **Time constraint**: 2-3 hours for hackathon

## Tool Implementation Details

### File Manipulation
- **Read/Write**: Standard fs/promises
- **AST manipulation**: Regex-based (simple & fast)
- **Safety**: Always checks if content exists before adding

### Git Operations
- **Library**: simple-git
- **Branch naming**: `feat/landing-{theme}`
- **Commit message**: Descriptive with theme

### GitHub Integration
- **Library**: @octokit/rest
- **Auth**: GITHUB_TOKEN env var
- **PR**: Auto-generated title & description

## Error Handling

- Tool failures return error objects
- Agent receives error and can retry or adapt
- User sees real-time error messages
- Partial success: Files created even if PR fails

## Performance

**Typical execution**:
- Total time: ~2-4 minutes
- API calls: ~10-15
- Tokens used: ~8,000-12,000
- Cost per run: ~$0.10-0.20

## Limitations & Future Work

**Current**:
- Mock book data (needs real API integration)
- No book cover uploads
- Requires manual PR approval
- Single theme per run

**Future Enhancements**:
- Real book API integration
- Automated book cover downloads
- Multi-page generation in one run
- Visual preview before commit
- A/B testing variant generation
- Analytics integration

## Testing

**Manual testing**:
```bash
# Test without git operations
pnpm agent -k KEY  # Stop before git push

# Test with git
export GITHUB_TOKEN=xxx
pnpm agent -k KEY  # Full workflow
```

**Verify**:
1. Check src/pages/{PageName}.tsx exists
2. Check App.tsx has new route
3. Check SearchResults.tsx has keywords & ad
4. Test search on Fooble homepage
5. Verify new page renders correctly

## Metrics

**Lines of Code**: ~600 LOC
- agent.ts: ~100
- tools.ts: ~400
- templates.ts: ~100

**Development Time**: 2 hours

**Dependencies Added**: 4
- openai
- simple-git
- @octokit/rest
- tsx

## Success Criteria

✅ Takes user input
✅ Generates keywords
✅ Creates React component
✅ Updates routing
✅ Updates search integration
✅ Creates git branch
✅ Pushes code
✅ Opens PR
✅ Under 3 hours development time
✅ Single command to run

**Mission accomplished!** 🚀

