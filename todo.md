# Want to help?

Check out issues. We need a lot of refactoring. The spaghetti consumes.


## OLD (But maybe some good ideas within)

Issues:
- Log a user-error in the site rather than defaulting to Herobrine.
- handle nonexistant usernames better.
    - Currently, it will fallback to DEFAULTUUID if there is no username.
- send user-agent in header when pulling from playerDB
- disallow illegal characters in username field.

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
- Cache name searches in our own db to reduce latency and reliance on (slow!) playerdb.
- Get and display player skin
    - Get and display player pet beside skin
- Add playercompare feature to put multiple playercards side-by-side.