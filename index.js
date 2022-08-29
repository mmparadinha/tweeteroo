import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const users = [];
const allTweets = [];

function isURL(url) {
    return (url.match(/https:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi));
}

app.post('/sign-up', (req, res) => {
    if (req.body.username !== '' && isURL(req.body.avatar)) {
        users.push(req.body);
        res.status(201).send('OK');
    } else {
        res.status(400).send('Todos os campos são obrigatórios');
    };
});

app.post('/tweets', function (req, res) {
    if (req.headers.user !== '' && req.body.tweet !== '') {
        allTweets.push({
            user: req.headers.user,
            ...req.body,
            id: allTweets.length+1
        });
        res.status(201).send('OK');
    } else {
        res.status(400).send('Todos os campos são obrigatórios');
    };
    console.log(allTweets)
});

app.get('/tweets', function (req, res) {
    const username = req.query.username;
    const tweetsShown = 10;
    let renderLimit = 0;
    let lastTweets = [];
    let tweets = [];

    (username ? tweets = allTweets.filter(tweet => tweet.user === username) : tweets = allTweets);
    renderLimit = (tweetsShown > tweets.length ? tweets.length : tweetsShown);

    for (let i = tweets.length-1; lastTweets.length < renderLimit; i--) {
        const userAvatar = users.find(user => user.username === tweets[i].user).avatar;
        lastTweets.push({
            ...tweets[i],
            avatar: userAvatar
        });
    };
    
    res.send(lastTweets);
});

app.listen(5000, console.log('Listening at 5000'));