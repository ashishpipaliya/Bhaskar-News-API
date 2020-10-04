const express = require('express');
const axios = require('axios');
const port = process.env.PORT || 4000;

const app = express();


// all news

app.get('/', async(req, res) => {

    const url = "https://www.divyabhaskar.co.in/__api__/api/1.0/feed/home";

    var newsResponse = {};
    var articles = [];

    axios.get(url, { headers }).then((response) => {


        var articleCount = response.data.feed.length;
        var categoryName = response.data.categoryName;

        newsResponse["count"] = articleCount;
        newsResponse["categoryName"] = categoryName;



        for (var i = 0; i < articleCount; i++) {
            articles.push({
                headerTitle: response.data.feed[i].header.title,
                url: "https://www.divyabhaskar.co.in" + response.data.feed[i].shortUrl,
                imageUrl: response.data.feed[i].header.media.url,
                publishTime: response.data.feed[i].publishTime,
                slugColor: response.data.feed[i].category.color,

            });
        }

        newsResponse["articles"] = articles;

        res.json(newsResponse);

    }).catch(function(error) {
        // console.log(error.message);
        res.send({
            status: error.status,
            message: error.message
        });
    });

});


// category wise

app.get('/:category', async(req, res) => {

    var category = req.params.category;

    const url = "https://www.divyabhaskar.co.in/__api__/api/1.0/feed/category/listingUrl/" + category;

    // console.log(url);

    var newsResponse = {};
    var articles = [];

    axios.get(url, { headers }).then((response) => {


        var articleCount = response.data.feed.length;
        var categoryName = response.data.categoryName;

        newsResponse["count"] = articleCount;
        newsResponse["categoryName"] = categoryName;



        for (var i = 0; i < articleCount; i++) {
            articles.push({
                headerTitle: response.data.feed[i].header.title,
                url: "https://www.divyabhaskar.co.in" + response.data.feed[i].shortUrl,
                imageUrl: response.data.feed[i].header.media.url,
                publishTime: response.data.feed[i].publishTime,
                slugColor: response.data.feed[i].category.color,

            });
        }

        newsResponse["articles"] = articles;

        res.json(newsResponse);

    }).catch(function(error) {
        // console.log(error.message);
        res.send({
            status: error.name,
            message: error.message
        });
    });

});

app.listen(port, () => {
    console.log('running on port ' + port);
});




const headers = {
    "Host": "www.divyabhaskar.co.in",
    "Connection": "keep-alive",
    "DNT": 1,
    "x-aut-web-t": "420x66695ztde3qao6a69",
    "dtyp": "web",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
    "rt": "974ff17e1c6a40deaf328b975f1b4893",
    "uid": 1312605706435920000,
    "at": "Gu3m3gVhYiR8d_iSCfG8ygDraa-ldBbISN9f2_pKlNFrN2gRZh6k8IJwdHVuZG1azzr_1h10JoFDl6-aTPmevvAzDXkbgjI_vnqFDNHVnx4Fr3eWleCdRz8JNruIPuQFCYCmjaF93rkXjoUY9OJ1JpOkAyS9h5-dol8Q-8WNldwpDCd2N-yOB5ZvBwB7KwrqRN5FmwqhdY2b4pKcTue9RDviDx4aaGeT5wAR5l33eYc=",
    "cid": "960",
    "Accept": "*/*",
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Dest": "empty",
    "Referer": "https://www.divyabhaskar.co.in/",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9,gu;q=0.8,hi;q=0.7",
    "Cookie": "at=Gu3m3gVhYiR8d_iSCfG8ygDraa-ldBbISN9f2_pKlNFrN2gRZh6k8IJwdHVuZG1azzr_1h10JoFDl6-aTPmevvAzDXkbgjI_vnqFDNHVnx4Fr3eWleCdRz8JNruIPuQFCYCmjaF93rkXjoUY9OJ1JpOkAyS9h5-dol8Q-8WNldwpDCd2N-yOB5ZvBwB7KwrqRN5FmwqhdY2b4pKcTue9RDviDx4aaGeT5wAR5l33eYc=; rt=974ff17e1c6a40deaf328b975f1b4893; uid=1312605706435920000"
};