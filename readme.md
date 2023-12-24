<h1>PixelStats</h1>

Requirements:
- npm

Setup:
```
npm install
```

First use:
- The CLI should log your API keys at startup.
Nodemon is reccomended for development, but you can use node:
```
node index.js
```

Issues:
- Implement something better than "default username" when user enters an invalid username.
- Need to send user-agent in header when pulling from playerDB

Todo:

- Show player's last login
- Show player's account age
    - Badges based on account age? Similar to Steam.
- Show dropdown to view stats for specific game
    - Bedwars
        - Beds broken
        - Final kills
        - Leaderboard position (if greater than certain threshold)
        - Level

- Show an option to view ALL stats for a given name. Might as well use everything the API gives us. Make it as readable as possible. Start by just dumping the entire JSON, and hone it down after.