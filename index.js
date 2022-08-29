import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const users = [];
const tweets = [];

app.post('/sign-up', (req, res) => {
    users.push(req.body);
    res.send('OK');
});

app.post('/tweets', function (req, res) {
    tweets.push({
        ...req.body,
        id: tweets.length+1
    });
    res.send('OK');
});

app.get('/tweets', function (req, res) {
    let lastTweets = [];
    const tweetsShown = 10;
    const renderLimit = (tweetsShown > tweets.length ? tweets.length : tweetsShown);

    for (let i = tweets.length-1; lastTweets.length < renderLimit; i--) {
        const userAvatar = users.find(user => user.username === tweets[i].username).avatar;
        lastTweets.push({
            ...tweets[i],
            avatar: userAvatar
        });
    };
    res.send(lastTweets);
});

app.listen(5000, console.log('Listening at 5000'));