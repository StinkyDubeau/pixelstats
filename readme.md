# PixelStats

PixelStats is a simple webapp which queries hypixel to show a playercard for a desired user.

### Requirements:
- npm
- an API key from api.hypixel.net

### Setup:

```
git clone https://github.com/StinkyDubeau/pixelstats.git
cd pixelstats
npm install
touch .env
```

Then, open `.env` and add a line containing your hypixel API key. You can also specify a port if you wish:

```
--- [.env] ---------------------
HYPIXEL_KEY=<your-key-goes-here>
PORT=3000
--------------------------------
```

### First use:

```
cd pixelstats
npm start
```

You should be greeted with

```
Welcome to PixelStats!
Using API key:   <your-api-key>
Running on port: <your-chosen-port>
```

Head to `localhost:PORT` to give it a try