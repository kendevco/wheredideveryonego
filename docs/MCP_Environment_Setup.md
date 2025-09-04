# MCP Environment Setup

## Required Environment Variables

Add these to your `.env.local` file:

```env
# MCP Server Configuration
MCP_SECRET_KEY=your-super-secret-jwt-key-for-mcp-server
MCP_JWT_EXPIRY=24h
MCP_RATE_LIMIT_ENABLED=true
MCP_AUDIT_LOG_ENABLED=true
MCP_ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
MCP_MAX_REQUEST_SIZE=10mb

# AI Agent API Keys
MCP_CHATGPT_API_KEY=chatgpt-agent-api-key-here
MCP_LEO_API_KEY=leo-site-ai-api-key-here
MCP_ADMIN_API_KEY=admin-agent-api-key-here

# Test Configuration
MCP_TEST_API_KEY=test-api-key-for-development
MCP_BASE_URL=http://localhost:3000
```

## Quick Start

1. **Copy environment variables** to your `.env.local` file
2. **Generate API keys** for your AI agents
3. **Test the MCP server**:
   ```bash
   node scripts/test-mcp.js your-test-api-key
   ```
4. **Access health endpoint**: http://localhost:3000/api/mcp/health

## API Key Generation

Generate secure API keys for your agents:

```bash
# Generate random API keys
node -e "console.log('MCP_CHATGPT_API_KEY=' + require('crypto').randomBytes(32).toString('hex'))"
node -e "console.log('MCP_LEO_API_KEY=' + require('crypto').randomBytes(32).toString('hex'))"
node -e "console.log('MCP_ADMIN_API_KEY=' + require('crypto').randomBytes(32).toString('hex'))"
node -e "console.log('MCP_SECRET_KEY=' + require('crypto').randomBytes(64).toString('hex'))"
```

## Testing MCP Integration

Once configured, you can test the MCP server:

```javascript
// Test authentication
const response = await fetch('/api/mcp/auth', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ apiKey: 'your-api-key' })
});

// Test content operations
const collections = await fetch('/api/mcp/collections', {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

## Security Notes

- **Never commit API keys** to version control
- **Use strong, unique keys** for each agent
- **Rotate keys regularly** in production
- **Monitor usage** via health endpoint
- **Enable rate limiting** in production


