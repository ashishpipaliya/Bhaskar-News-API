const express = require('express');
const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const port = process.env.PORT || 3000;

const app = express();

app.get("/", async (req, res) => {


    // var hindiCategories ={
    //     "टॉप न्यूज़" : "https://bhaskar-news-api-0c72ef.asia1.kinto.io/hindi",
    //     "देश" : "https://bhaskar-news-api-0c72ef.asia1.kinto.io/hindi/national",
    //     "कोरोना" : "https://bhaskar-news-api-0c72ef.asia1.kinto.io/hindi/coronavirus",
    //     "एंटरटेनमेंट" : "https://bhaskar-news-api-0c72ef.asia1.kinto.io/hindi/entertainment",
    //     "स्पोर्ट्स" : "https://bhaskar-news-api-0c72ef.asia1.kinto.io/hindi/sports",
    //     "करिअर" : "https://bhaskar-news-api-0c72ef.asia1.kinto.io/hindi/career",
    //     "टेक & ऑटो" : "https://bhaskar-news-api-0c72ef.asia1.kinto.io/hindi/tech-auto",
    //     "वीमेन" : "https://bhaskar-news-api-0c72ef.asia1.kinto.io/hindi/women",
    //     "यूटिलिटी" : "https://bhaskar-news-api-0c72ef.asia1.kinto.io/hindi/utility",
    //     "हैप्पी लाइफ" : "https://bhaskar-news-api-0c72ef.asia1.kinto.io/hindi/happylife",
    // };

    // var gujCategories = {
    //       "ટૉપ ન્યૂઝ" : "https://bhaskar-news-api-0c72ef.asia1.kinto.io/guj",
    //       "ઈન્ડિયા" : "https://bhaskar-news-api-0c72ef.asia1.kinto.io/guj/national",   
    //       "કોરોનાવાયરસ": "https://bhaskar-news-api-0c72ef.asia1.kinto.io/guj/coronavirus",   
    //       "એન્ટરટેઇનમેન્ટ": "https://bhaskar-news-api-0c72ef.asia1.kinto.io/guj/entertainment",   
    //       "વર્લ્ડ":"https://bhaskar-news-api-0c72ef.asia1.kinto.io/guj/international" ,   
    //       "સ્પોર્ટ્સ": "https://bhaskar-news-api-0c72ef.asia1.kinto.io/guj/sports",   
    //       "બિઝનેસ": "https://bhaskar-news-api-0c72ef.asia1.kinto.io/guj/business",   
    //       "ધર્મ દર્શન": "https://bhaskar-news-api-0c72ef.asia1.kinto.io/guj/dharm-darshan" ,  
    //       "યુટિલિટી": "https://bhaskar-news-api-0c72ef.asia1.kinto.io/guj/utility", 
    //       "લાઇફસ્ટાઇલ": "https://bhaskar-news-api-0c72ef.asia1.kinto.io/guj/lifestyle" 
    // };
  

    var response = {
        "status": "online",
        // "hin_categories" : hindiCategories,
        // "guj_categories" : gujCategories,

    };
    res.send(response);
});


// all news
app.get('/hindi/', async (req, res) => {

    const url = "https://www.newspointapp.com/api/api_listing.cms?v=v1&source=pwa&curpg=1&section=top-news&lang=hindi&pp=20";

    var newsResponse = {};
    var articles = [];

    axios.get(url).then((response) => {


        var articleCount = response.data.items.length;
        var categoryName = "hindi";

        newsResponse["count"] = articleCount;
        newsResponse["categoryName"] = categoryName;



        for (var i = 0; i < articleCount; i++) {
            articles.push({
                "headerTitle": response.data.items[i]?.hl,
                "description": response.data.items[i]?.mwebsyn,
                "url": response.data.items[i]?.wu,
                "imageUrl": response.data.items[i].imageid,
                "publishTime": response.data.items[i]?.dl,
                "displayNameEn": response.data.items[i]?.lang,
                "displayNameGuj": response.data.items[i]?.category?.displayName,
            });
        }

        newsResponse["articles"] = articles;

        res.json(newsResponse);

    }).catch(function (error) {
        console.log(error);
        res.send({
            message: error.message,
        });
    });


});



app.listen(port, () => {

    console.log('running on port ' + port);
});


