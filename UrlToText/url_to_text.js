const express = require('express');
const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const port = process.env.PORT || 3000;

const app = express();


app.get('/', (req, res) => {

    var url = req.query.url;

    var newsResponse = {};
    var paragraph = [];

    axios.get(url).then((response) => {
        var html = response.data;

        const { document } = new JSDOM(html).window

        document.querySelectorAll('head').forEach(e => e.remove());
        document.querySelectorAll('script').forEach(e => e.remove());
        document.querySelectorAll('noscript').forEach(e => e.remove());
        document.querySelectorAll('._9de5a653').forEach(e => e.remove());
        document.querySelectorAll('._5efa7e4f').forEach(e => e.remove());
        document.querySelectorAll('._72b21e61').forEach(e => e.remove());
        document.querySelectorAll('.e4ff2f36').forEach(e => e.remove());
        document.querySelectorAll('._598dff3e').forEach(e => e.remove());
        document.querySelectorAll('._8277d317').forEach(e => e.remove());
        document.querySelectorAll('.efb714ed').forEach(e => e.remove());
        document.querySelectorAll('.b8e98108').forEach(e => e.remove());
        document.querySelectorAll('._28e65306').forEach(e => e.remove());
        document.querySelectorAll('._3c197847').forEach(e => e.remove());
        document.querySelectorAll('.ddd9ee87').forEach(e => e.remove());
        document.querySelectorAll('.df7c9609').forEach(e => e.remove());
        document.querySelectorAll('._02f7cc9b').forEach(e => e.remove());
        document.querySelectorAll('._028b0249').forEach(e => e.remove());
        document.querySelectorAll('._51939484').forEach(e => e.remove());
        document.querySelectorAll('strong').forEach(e => e.remove());
        document.querySelectorAll('ul').forEach(e => e.remove());
        document.querySelectorAll('iframe').forEach(e => e.remove());
        document.querySelectorAll('br').forEach(e => e.remove());

        var paras = document.querySelectorAll('p');
        paras.forEach((item) => {
            if (!(item.innerHTML.length < 10 || item.innerHTML.includes('<a href='))) {
                paragraph.push({
                    p: item.innerHTML
                });
            }
        });

        newsResponse["url"] = url;
        newsResponse["paragraph"] = paras.length;
        newsResponse["news"] = paragraph;

        res.json(newsResponse);

    }).catch(function(error) {
        console.log(error.message);
    });

});

app.listen(port, () => {
    console.log('running on port ' + port);
});