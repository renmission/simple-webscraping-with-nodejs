const mongoose = require('mongoose');
const cheerio = require('cheerio');
const request = require('request-promise');
const RedditArticle = require('./Reddit');

async function connectToMongoDB() {
    await mongoose.connect("mongodb+srv://reddituser:reddituser@cluster0-546tg.mongodb.net/test?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('db connected')
}

async function scrapeReddit() {
    const html = await request.get("https://www.reddit.com");
    const $ = await cheerio.load(html);
    const title = $("h3");

    title.each(async(i, element) => {
        const title = $(element).text();
        console.log(title);
        const redditArticle = new RedditArticle({
            title
        });

        await redditArticle.save();
    })
}

async function main() {
    await connectToMongoDB();
    await scrapeReddit();
}


main();