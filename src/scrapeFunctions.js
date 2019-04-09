const cheerio = require('cheerio');

const fdScraper = function (html) {
    const $ = cheerio.load(html);
    const newElements = $('#category-posts').find('a');
    const featuredElements = $('.nyheter-featured').find('h3 > a');
    let data = [];
    
    newElements.each(function () {
        data.push({
            source: 'FD',
            text: $(this).attr('title'),
            url: $(this).attr('href')
        });
    });

    featuredElements.each(function () {
        data.push({
            source: 'FD',
            text: $(this).text(),
            url: $(this).attr('href')
        });
    });

    return data;

    /* return Object.values(elements).filter(function (elem) {
        return elem.children && elem.children[0];
    }).map(function (elem) {
        return {
            source: 'FD',
            text: elem.children[0].data,
            url: elem.attribs.href
        };
    }); */
}

const fkScraper = function(html) {
    let data = [];
    const $ = cheerio.load(html);
    const elements = $('[data-js=long-news-list]').find('a');
    elements.each(function () {
        data.push({
            source: 'FK',
            text: $(this).find('.news-list__item-text-headline').text(),
            url: $(this).attr('href')
        });
    });
    return data;
}

module.exports = {
    scrapers: {
        'fotbolldirekt': fdScraper,
        'fotbollskanalen': fkScraper
    }
}