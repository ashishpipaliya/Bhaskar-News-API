const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const validUrl = require('valid-url');
var read = require('node-readability');
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", async (req, res) => {

    var hi = {
        "टॉप न्यूज़": "hi",
        "देश": "national",
        "कोरोना": "coronavirus",
        "एंटरटेनमेंट": "entertainment",
        "स्पोर्ट्स": "sports",
        "करिअर": "career",
        "टेक & ऑटो": "tech-auto",
        "वीमेन": "women",
        "यूटिलिटी": "utility",
        "हैप्पी लाइफ": "happylife",
    };


    var gu = {
        "ટૉપ ન્યૂઝ": "gu",
        "ઈન્ડિયા": "national",
        "કોરોનાવાયરસ": "coronavirus",
        "એન્ટરટેઇનમેન્ટ": "entertainment",
        "વર્લ્ડ": "international",
        "સ્પોર્ટ્સ": "sports",
        "બિઝનેસ": "business",
        "ધર્મ દર્શન": "dharm-darshan",
        "યુટિલિટી": "utility",
        "લાઇફસ્ટાઇલ": "lifestyle"
    };

    var en = {
        "national": "national",
        "business": "business",
        "politics": "politics",
        "sports": "sports",
        "technology": "technology",
        "startups": "startups",
        "entertainment": "entertainment",
        "hatke": "hatke",
        "education": "education",
        "world": "world",
        "automobile": "automobile",
        "science": "science",
        "travel": "travel",
        "miscellaneous": "miscellaneous",
        "fashion": "fashion"
    };

    var response = {
        "status": "online",
        "hindi_categories": hi,
        "gujarati_categories": gu,
        "english_categories": en,

    };

    res.send(response);
});

// all news
app.get('/hi/', async (req, res) => {

    const url = "https://www.bhaskar.com/__api__/api/1.0/feed/home";


    var newsResponse = {};
    var articles = [];

    axios.defaults.headers = dainikHeaders;
    axios.get(url).then((response) => {


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

    }).catch(function (error) {
        console.log(error);
        res.send({
            status: error.status,
            message: error.message,
        });
    });


});


// category wise
app.get('/hi/:category', async (req, res) => {

    var category = req.params.category;

    const url = "https://www.bhaskar.com/__api__/api/1.0/feed/category/listingUrl/" + category;

    var newsResponse = {};
    var articles = [];

    axios.defaults.headers = dainikHeaders;
    axios.get(url).then((response) => {


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

    }).catch(function (error) {
        console.log(error.message + "line 111");
        res.send({
            status: error.name,
            message: error.message
        });
    });

});


// all news
app.get('/gu/', async (req, res) => {

    const url = "https://www.divyabhaskar.co.in/__api__/api/1.0/feed/home";

    var newsResponse = {};
    var articles = [];

    axios.defaults.headers = divyaHeaders;
    axios.get(url).then((response) => {

        var articleCount = response.data.feed.length;

        newsResponse["count"] = articleCount;


        for (var i = 0; i < articleCount; i++) {

            articles.push({
                "slug": response.data.feed[i].header?.slug,
                "headerTitle": response.data.feed[i]?.header?.title,
                "url": "https://www.divyabhaskar.co.in" + response.data.feed[i]?.shortUrl,
                "imageUrl": response.data.feed[i].header?.media[0]?.url ?? null,
                "publishTime": response.data.feed[i]?.publishTime,
                "displayNameEn": response.data.feed[i]?.category?.nameEn,
                "displayNameGuj": response.data.feed[i]?.category?.displayName,
                "slugColor": response.data.feed[i]?.category?.color,
            });
        }



        newsResponse["articles"] = articles;

        res.json(newsResponse);

    }).catch(function (error) {
        res.send({
            message: error.message
        });
    });
});


// category wise
app.get('/gu/:category', async (req, res) => {

    var category = req.params.category;

    const url = "https://www.divyabhaskar.co.in/__api__/api/1.0/feed/category/listingUrl/" + category;

    var newsResponse = {};
    var articles = [];

    axios.defaults.headers = divyaHeaders;
    axios.get(url).then((response) => {


        var articleCount = response.data.feed.length;
        var categoryName = response.data.categoryName;

        newsResponse["count"] = articleCount;
        newsResponse["categoryName"] = categoryName;



        for (var i = 0; i < articleCount; i++) {
            articles.push({


                "slug": response.data.feed[i].header?.slug,
                "headerTitle": response.data.feed[i]?.header?.title,
                "url": "https://www.divyabhaskar.co.in" + response.data.feed[i]?.shortUrl,
                "imageUrl": response.data.feed[i].header?.media[0]?.url ?? null,
                "publishTime": response.data.feed[i]?.publishTime,
                "displayNameEn": response.data.feed[i]?.category?.nameEn,
                "displayNameGuj": response.data.feed[i]?.category?.displayName,
                "slugColor": response.data.feed[i]?.category?.color,

            });
        }

        newsResponse["articles"] = articles;

        res.json(newsResponse);

    }).catch(function (error) {
        console.log(error.message + "line 220");
        res.send({
            status: error.name,
            message: error.message
        });
    });
});

/// inshorts english
app.get('/en/:category', (req, res) => {

    var category = req.params.category;

    const base_url = "http://inshorts.com/api/en/search/trending_topics/" + category + "&max_limit=50&type=NEWS_CATEGORY";

    var newsResponse = {};
    var articles = [];

    axios.get(base_url).then((response) => {
        var articleCount = response.data.data.news_list.length;

        newsResponse["total"] = articleCount;
        newsResponse["category"] = category;

        for (var i = 0; i < articleCount; i++) {
            articles.push({
                title: response?.data?.data?.news_list[i]?.news_obj?.title,
                description: response?.data?.data?.news_list[i]?.news_obj?.content,
                source: response.data?.data?.news_list[i]?.news_obj?.source_name,
                post_url: response?.data?.data?.news_list[i]?.news_obj?.source_url,
                image_url: response?.data?.data?.news_list[i]?.news_obj?.image_url,
                created_at: response?.data?.data?.news_list[i]?.news_obj?.created_at,
            });
        }

        newsResponse["articles"] = articles;

        res.json(newsResponse);

    });

});


// get news to read
app.get('/readable', function(req, res) {
    var url = req.query.url;

    if (validUrl.isUri(url)) {
        read(url, function(err, article, meta) {
            res.json({  title: article.title,
                content: "<p><h1>" + article.title + "</h1></p>" + article.content
              
            });
            // res.send("<p><h1>" + article.title + "</h1></p>" + article.content);
        });
    } else res.json({
        title: "Error",
        content: "<p><strong> Invalid URL, please recheck the link you have provided</strong></p>"
    });

});

app.listen(port, () => {
    console.log('running on port ' + port);
});


var dainikHeaders = {
    "Host": "www.bhaskar.com",
    "Connection": "keep-alive",
    "DNT": 1,
    "x-aut-web-t": "420x66695ztde3qao6a69",
    "dtyp": "web",
    "rt": "3ee17c7871384e5183d1385769e2efdc",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36",
    "uid": "1312598760680128500",
    "at": "Gu3m3gVhYiR8d_iSCfG8ygDraa-ldBbISN9f2_pKlNHZf5gWaMOJ-F6cfMAGk8_cSVnDOzC0lCfTMwUGKC5TiGo8RbHDHa7UHp1-kB0AHavLEmRkzNbG0BRMsDspWhplXLodwr_f2Vgq_CrLV6rTfhPb6LJ8XX-bSXKkHqNDeLw0nBIIVSRmNrpd2F9UN7QvCcDFJb1JIAary29Oyx8lEIx6G22QHTDio9fdGFbGY2Y=",
    "cid": "521",
    "Accept": "*/*",
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Dest": "empty",
    "Referer": "https://www.bhaskar.com/",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9,gu;q=0.8,hi;q=0.7",
    "Cookie": "at=Gu3m3gVhYiR8d_iSCfG8ygDraa-ldBbISN9f2_pKlNHZf5gWaMOJ-F6cfMAGk8_cSVnDOzC0lCfTMwUGKC5TiGo8RbHDHa7UHp1-kB0AHavLEmRkzNbG0BRMsDspWhplXLodwr_f2Vgq_CrLV6rTfhPb6LJ8XX-bSXKkHqNDeLw0nBIIVSRmNrpd2F9UN7QvCcDFJb1JIAary29Oyx8lEIx6G22QHTDio9fdGFbGY2Y=; rt=3ee17c7871384e5183d1385769e2efdc; uid=1312598760680128500; bhaskarUUID=d6c3a4ee-b07a-86ba-e91c-b7e7aa332c49"
};

var divyaHeaders = {
    "Host": "www.divyabhaskar.co.in",
    "Connection": "keep-alive",
    "DNT": 1,
    "x-aut-web-t": "420x66695ztde3qao6a69",
    "dtyp": "web",
    "rt": "974ff17e1c6a40deaf328b975f1b4893",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36",
    "uid": "1312605706435920000",
    "at": "Gu3m3gVhYiR8d_iSCfG8ygDraa-ldBbISN9f2_pKlNFrN2gRZh6k8IJwdHVuZG1azzr_1h10JoFDl6-aTPmevvAzDXkbgjI_vnqFDNHVnx4Fr3eWleCdRz8JNruIPuQFCYCmjaF93rkXjoUY9OJ1JpOkAyS9h5-dol8Q-8WNldwpDCd2N-yOB5ZvBwB7KwrqRN5FmwqhdY2b4pKcTue9RDviDx4aaGeT5wAR5l33eYc=",
    "cid": "960",
    "Accept": "*/*",
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Dest": "empty",
    "Referer": "https://www.divyabhaskar.co.in/",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9,gu;q=0.8,hi;q=0.7",
    "Cookie": "at=Gu3m3gVhYiR8d_iSCfG8ygDraa-ldBbISN9f2_pKlNFrN2gRZh6k8IJwdHVuZG1azzr_1h10JoFDl6-aTPmevvAzDXkbgjI_vnqFDNHVnx4Fr3eWleCdRz8JNruIPuQFCYCmjaF93rkXjoUY9OJ1JpOkAyS9h5-dol8Q-8WNldwpDCd2N-yOB5ZvBwB7KwrqRN5FmwqhdY2b4pKcTue9RDviDx4aaGeT5wAR5l33eYc=; rt=974ff17e1c6a40deaf328b975f1b4893;uid=1312605706435920000"
};