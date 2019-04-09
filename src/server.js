const express = require('express');
const requestPromise = require('request-promise');
const {scrapers} = require('./scrapeFunctions');

const app = express();
const port = process.env.PORT || '8001';

const AB = {name: 'aftonbladet', url: 'https://www.aftonbladet.se/sportbladet/fotboll'};
const FD = {name: 'fotbolldirekt', url: 'http://www.fotbolldirekt.se'};
const FK = {name: 'fotbollskanalen', url: 'https://www.fotbollskanalen.se/senaste/'};
const EP = {name: 'expressen', url: 'https://www.expressen.se/sport/fotboll/'};

app.get('/news', function(req, res) {
    const urls = [FD, FK];
    
    let promises = urls.map(function(urlData) {
        const scraperFn = scrapers[urlData.name];
        return requestPromise(urlData.url).then(function(html) {
            return scraperFn(html);
        });
    });

    Promise.all(promises).then(function (data) {
        res.json({
            data
        });
        res.end(); 
    });
});

app.get('/test', function(req, res) {
    res.json({
        text: "HELLO WORLD"
    });
    res.end(); 
});

app.listen(port, function () {
    console.log('App listening on port: ', port);
});