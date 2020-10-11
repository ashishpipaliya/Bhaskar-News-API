const express = require('express');
const axios = require('axios');
const port = process.env.PORT || 3000;

const app = express();


// all news

app.get('/', async(req, res) => {

    const url = "https://www.bhaskar.com/__api__/api/1.0/feed/home";

    var newsResponse = {};
    var articles = [];

    axios.get(url, { headers }).then((response) => {


        var articleCount = response.data.feed.length;
        var categoryName = response.data.categoryName;

        newsResponse["count"] = articleCount;
        newsResponse["categoryName"] = categoryName;



        for (var i = 0; i < articleCount; i++) {
            articles.push({
                "slug": response.data.feed[i].header?.slug,
                "headerTitle": response.data.feed[i]?.header?.title,
                url: "https://www.bhaskar.com" + response.data.feed[i]?.shortUrl,
               "imageUrl": response.data.feed[i].header?.media[0]?.url ?? null,
                "publishTime": response.data.feed[i]?.publishTime,
                "displayNameEn": response.data.feed[i]?.category?.nameEn,
                "displayNameGuj": response.data.feed[i]?.category?.displayName,
                "slugColor": response.data.feed[i]?.category?.color,
            });
        }

        newsResponse["articles"] = articles;

        res.json(newsResponse);

    }).catch(function(error) {
        // console.log(error.message);
        res.send({
            status: error.status,
            message: error.message,
        });
    });

});


// category wise

app.get('/:category', async(req, res) => {

    var category = req.params.category;

    const url = "https://www.bhaskar.com/__api__/api/1.0/feed/category/listingUrl/" + category;

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
                "slug": response.data.feed[i].header?.slug,
                "headerTitle": response.data.feed[i]?.header?.title,
                url: "https://www.bhaskar.com" + response.data.feed[i]?.shortUrl,
               "imageUrl": response.data.feed[i].header?.media[0]?.url ?? null,
                "publishTime": response.data.feed[i]?.publishTime,
                "displayNameEn": response.data.feed[i]?.category?.nameEn,
                "displayNameGuj": response.data.feed[i]?.category?.displayName,
                "slugColor": response.data.feed[i]?.category?.color,
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
    "Host": "www.bhaskar.com",
    "Connection": "keep-alive",
    "DNT": 1,
    "x-aut-web-t": "420x66695ztde3qao6a69",
    "dtyp": "web",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
    "rt": "3e e17c7871384e5183d1385769e2efdc",
    "uid": 1312598760680128500,
    "at": "Gu3m3gVhYiR8d_iSCfG8ygDraa-ldBbISN9f2_pKlNHZf5gWaMOJ-F6cfMAGk8_cSVnDOzC0lCfTMwUGKC5TiGo8RbHDHa7UHp1-kB0AHavLEmRkzNbG0BRMsDspWhplXLodwr_f2Vgq_CrLV6rTfhPb6LJ8XX-bSXKkHqNDeLw0nBIIVSRmNrpd2F9UN7QvCcDFJb1JIAary29Oyx8lEIx6G22QHTDio9fdGFbGY2Y=",
    "cid": 521,
    "Accept": "*/*",
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Dest": "empty",
    "Referer": "https//www.bhaskar.com/",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9,gu;q=0.8,hi;q=0.7",
    "Cookie": "at=Gu3m3gVhYiR8d_iSCfG8ygDraa-ldBbISN9f2_pKlNHZf5gWaMOJ-F6cfMAGk8_cSVnDOzC0lCfTMwUGKC5TiGo8RbHDHa7UHp1-kB0AHavLEmRkzNbG0BRMsDspWhplXLodwr_f2Vgq_CrLV6rTfhPb6LJ8XX-bSXKkHqNDeLw0nBIIVSRmNrpd2F9UN7QvCcDFJb1JIAary29Oyx8lEIx6G22QHTDio9fdGFbGY2Y=; rt=3ee17c7871384e5183d1385769e2efdc; uid=1312598760680128500; bhaskarUUID=d6c3a4ee-b07a-86ba-e91c-b7e7aa332c49"
};