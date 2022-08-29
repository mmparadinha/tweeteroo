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
        for (let i = 0; lastTweets.length < tweets.length; i++) {
            const userAvatar = users.find(user => user.username === tweets[i].username).avatar;
            lastTweets.push({
                ...tweets[i],
                avatar: userAvatar
            });
        }
    } else {
        for (let i = tweets.length-tweetsShown; lastTweets.length !== tweetsShown; i++) {
            const userAvatar = users.find(user => user.username === tweets[i].username).avatar;
            lastTweets.push({
                ...tweets[i],
                avatar: userAvatar
            });
        }
    }
    res.send(lastTweets);
});

app.listen(5000, console.log('Listening at 5000'));