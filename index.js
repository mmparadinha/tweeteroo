import express from 'express';

const app = express();
app.use(express.json());

const users = [];
const tweets = [];

app.post('/sign-up', (req, res) => {
    users.push(req.body);
    res.send('OK');
    console.log(users)
});

app.post('/tweets', function (req, res) {

    tweets.push({
        ...req.body,
        id: tweets.length+1
    });
    res.send('OK');
    console.log(tweets)
});

app.get('/tweets', function (req, res) {
    const tweetsShown = 10;
    let lastTweets = [];

    if (tweets.length <= tweetsShown) {
        lastTweets = tweets;
    } else {
        console.log(tweets.length)
        for (let i = tweets.length-tweetsShown; lastTweets.length !== tweetsShown; i++) {
            lastTweets.push(tweets[i]);
        }
    }
    console.log(lastTweets)
    res.send(lastTweets);
});

app.listen(5000, console.log('Listening at 5000'));