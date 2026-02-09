# Remote Terminal Bridge — Future Feature

## Concept
Allow visitors to connect their local terminal to your portfolio website, enabling you to demonstrate commands in real-time on their machine.

## How It Works
```
┌─────────────────┐       WebSocket        ┌─────────────────┐
│  Website        │◄─────────────────────►│   Server        │
│  Terminal       │                        │  (WebSocket)    │
└─────────────────┘                        └────────┬────────┘
                                                    │
                                                    ▼
                                           ┌─────────────────┐
                                           │  Visitor CLI    │
                                           │  $ npx prasad   │
                                           └─────────────────┘
```

## User Flow
1. Visitor runs `npx prasad-terminal` in their terminal
2. CLI generates connection code (e.g., `ABC-123`)
3. Visitor pastes code in portfolio website terminal
4. WebSocket bridge established
5. Commands typed on website execute on visitor's machine

## Components Needed

### 1. WebSocket Server
- Node.js + Socket.io
- Session management with unique codes
- Command relay between web and CLI

### 2. npm Package (`prasad-terminal`)
```javascript
// Rough structure
#!/usr/bin/env node
const io = require('socket.io-client');
const { spawn } = require('child_process');

const code = generateCode();
console.log(`Your code: ${code}`);
console.log('Paste this in the website terminal to connect');

const socket = io('wss://your-server.com');
socket.emit('register', { code });

socket.on('command', (cmd) => {
  const proc = spawn(cmd, { shell: true });
  proc.stdout.on('data', (data) => socket.emit('output', data.toString()));
});
```

### 3. Website Terminal Updates
- Connect to WebSocket server
- `connect <CODE>` command
- Relay input/output through socket

## Security Considerations
- [ ] Code expiration (5 min)
- [ ] Command whitelist/blacklist
- [ ] Rate limiting
- [ ] Sandboxed execution option
- [ ] Connection timeout
- [ ] Audit logging

## Tech Stack
| Component | Technology |
|-----------|------------|
| Server | Node.js, Socket.io, Express |
| CLI | Node.js CLI, chalk, ora |
| Hosting | Railway / Render / Fly.io |
| npm | npm registry |

## Estimated Effort
- Server setup: 2-3 hours
- npm package: 2-3 hours  
- Website integration: 1-2 hours
- Testing & security: 2-3 hours
- **Total: 8-12 hours**

## Status
🔮 **Future Development** — Documented for later implementation
