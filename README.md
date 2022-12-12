# TummyBot
 A Discord Bot project for fun.
 
# Local Host
 1. Download repository
 2. Install Node.js
 3. In terminal, change to project directory and type "npm install discord.js"
 4. Uncomment out Local Host Save Files in index.js
 5. In save.js, comment out onlineSave() and uncomment localSave()
 6. Replace process.env.DISCORD_TOKEN in index.js to your Discord Bot token
 7. In terminal, change to project directory and type "node ."

# Heroku Host
 1. Clone and link repository to Heroku
 2. Add the following config vars to Heroku: ACCESS_KEY_ID, BUCKET, SECRET_ACCESS_KEY, DISCORD_TOKEN
 3. Add user___.json and items.json to your AWS S3 bucket/storage
 4. Turn on bot on Heroku
