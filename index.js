const express = require('express');
const axios = require('axios');
const port = process.env.PORT || 3000;

const app = express();

app.get("/", async(res, res)=>{
    res.send({
        "status" : "online"
    });
});

app.get('/dainik/', async(req, res) => {

    const url = "https://www.bhaskar.com/__api__/api/1.0/feed/home";

    var newsResponse = {};
    var articles = [];

    axios.get(url, { dainikheaders }).then((response) => {


        var articleCount = response.data.feed.length;
        var categoryName = response.data.categoryName;

        newsResponse["count"] = articleCount;
        newsResponse["categoryName"] = categoryName;



        for (var i = 0; i < articleCount; i++) {
            articles.push({
                "slug": response.data.feed[i].header ?.slug,
                "headerTitle": response.data.feed[i] ?.header ?.title,
                url: "https://www.bhaskar.com" + response.data.feed[i] ?.shortUrl,
                "imageUrl": response.data.feed[i].header ?.media[0] ?.url ?? null,
                "publishTime": response.data.feed[i] ?.publishTime,
                "displayNameEn": response.data.feed[i] ?.category ?.nameEn,
                "displayNameGuj": response.data.feed[i] ?.category ?.displayName,
                "slugColor": response.data.feed[i] ?.category ?.color,
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

app.get('/dainik/:category', async(req, res) => {

    var category = req.params.category;

    const url = "https://www.bhaskar.com/__api__/api/1.0/feed/category/listingUrl/" + category;

    // console.log(url);

    var newsResponse = {};
    var articles = [];

    axios.get(url, { dainikheaders }).then((response) => {


        var articleCount = response.data.feed.length;
        var categoryName = response.data.categoryName;

        newsResponse["count"] = articleCount;
        newsResponse["categoryName"] = categoryName;



        for (var i = 0; i < articleCount; i++) {
            articles.push({
                "slug": response.data.feed[i].header ?.slug,
                "headerTitle": response.data.feed[i] ?.header ?.title,
                url: "https://www.bhaskar.com" + response.data.feed[i] ?.shortUrl,
                "imageUrl": response.data.feed[i].header ?.media[0] ?.url ?? null,
                "publishTime": response.data.feed[i] ?.publishTime,
                "displayNameEn": response.data.feed[i] ?.category ?.nameEn,
                "displayNameGuj": response.data.feed[i] ?.category ?.displayName,
                "slugColor": response.data.feed[i] ?.category ?.color,
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


// all news

app.get('/divya/', async(req, res) => {

    const url = "https://www.divyabhaskar.co.in/__api__/api/1.0/feed/home";

    var newsResponse = {};
    var articles = [];

    axios.get(url, { divyaheaders }).then((response) => {

        var articleCount = response.data.feed.length;

        newsResponse["count"] = articleCount;


        for (var i = 0; i < articleCount; i++) {

            articles.push({
                "slug": response.data.feed[i].header ?.slug,
                "headerTitle": response.data.feed[i] ?.header ?.title,
                "url": "https://www.divyabhaskar.co.in" + response.data.feed[i] ?.shortUrl,
                "imageUrl": response.data.feed[i].header ?.media[0] ?.url ?? null,
                "publishTime": response.data.feed[i] ?.publishTime,
                "displayNameEn": response.data.feed[i] ?.category ?.nameEn,
                "displayNameGuj": response.data.feed[i] ?.category ?.displayName,
                "slugColor": response.data.feed[i] ?.category ?.color,
            });
        }



        newsResponse["articles"] = articles;

        res.json(newsResponse);

    }).catch(function(error) {
        res.send({
            message: error.message
        });
    });

});


// category wise

app.get('/divya/:category', async(req, res) => {

    var category = req.params.category;

    const url = "https://www.divyabhaskar.co.in/__api__/api/1.0/feed/category/listingUrl/" + category;

    // console.log(url);

    var newsResponse = {};
    var articles = [];

    axios.get(url, { divyaheaders }).then((response) => {


        var articleCount = response.data.feed.length;
        var categoryName = response.data.categoryName;

        newsResponse["count"] = articleCount;
        newsResponse["categoryName"] = categoryName;



        for (var i = 0; i < articleCount; i++) {
            articles.push({


                "slug": response.data.feed[i].header ?.slug,
                "headerTitle": response.data.feed[i] ?.header ?.title,
                "url": "https://www.divyabhaskar.co.in" + response.data.feed[i] ?.shortUrl,
                "imageUrl": response.data.feed[i].header ?.media[0] ?.url ?? null,
                "publishTime": response.data.feed[i] ?.publishTime,
                "displayNameEn": response.data.feed[i] ?.category ?.nameEn,
                "displayNameGuj": response.data.feed[i] ?.category ?.displayName,
                "slugColor": response.data.feed[i] ?.category ?.color,

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



app.get('/magic/', (req, res) => {

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


const dainikheaders = {
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


const divyaheaders = {
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