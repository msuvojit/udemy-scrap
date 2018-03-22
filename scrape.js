const rp = require('request-promise');
const cheerio = require('cheerio');
const jsonfile = require('jsonfile');
const sleep = require('sleep');
const axios = require('axios');
var async = require('async');

var file = './udemyCourseData.json';

// async function getCourse(url) {
//     try {
//         const response = await axios.get(url, {
//             headers: {
//                 "content-type": "text/html; charset=utf-8",
//                 'user-agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.62 Safari/537.36",
//                 "upgrade-insecure-requests": "1",
//                 "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
//                 "cookie": "ud_firstvisit=2018-03-21T12:34:51.129812+00:00:1eycx9:FdRhu57cti-68cxVaJC-ppuOevE; new_user=true; existing_user=true; optimizelyEndUserId=oeu1521635693063r0.529534769490005; _ga=GA1.1.1503117003.1521635696; _gid=GA1.1.1769881523.1521635696; IR_gbd=udemy.com; optimizelySegments=%7B%22306102099%22%3A%22gc%22%2C%22306155008%22%3A%22direct%22%2C%22306161004%22%3A%22false%22%2C%227473112303%22%3A%22none%22%2C%227518841116%22%3A%22true%22%2C%227514910721%22%3A%22Academics%22%7D; optimizelyBuckets=%7B%7D; _gat=1; _gat_UA-12366301-1=1; _dc_gtm_UA-12366301-29=1; _ga=GA1.2.1503117003.1521635696; _gid=GA1.2.1769881523.1521635696; IR_PI=1521635698754.xpvcutjkung; IR_5420=1521699711117%7C0%7C1521699711117; ki_t=1521635701040%3B1521696528288%3B1521699712680%3B2%3B10; ud_rule_vars=\"eJyFzcEKgzAQBNBfkVxbZXddNcm3CKJxU0JbpDH2Iv57pVIovfQ882ZWlfp4kSRj9wxzSFO0ROgM8yi9Yx6QDXnt3eBH1uI1i3XTdA2ibKbWVt36OXVuWuIsx0KXwl3aPW0VAeocypwog9oSWq4LY7Cp4QRgAVp13ls-xH3isGOffi1mSLZkW2GB1Gitv-37Pcpjkfkf5qbSUH3wprYXnuBHPg==:1eytbk:4i_ib7ZDKZZhn-fd7yWtrU30SHM\"; eva=\"SlFYNkxYDm4AQxJ3TFhHewVDB2NfU0F0E0kZeVZQCGATFVk3TFgObgBCHXVMWEd1A0FWPA==\"; __udmy_2_v57r=221c944deac44b1492f8fcbfd48ef84e; seen=1; ki_r=; _px2=eyJ1IjoiNGVhNDU5ODAtMmQ5OS0xMWU4LTk2NTUtNGY0ZDNkOWE5NmIzIiwidiI6IjYzZjBiNjkwLTJjNmMtMTFlOC1hOWFhLTk5ZjJhNDNjOThhNiIsInQiOjE1MjE3MDAyMTI3NjcsImgiOiIzZGMzNTFkMDZkZmU0NTlkOGQyMDU4ZDU0NjUzMjRlM2I1ODZmNDcyYWE4ZjBhY2Y0MzY4YTdjZTIxOGNjNGYwIn0=; _px3=447255db839d3e2fa27aecc6575d761b7039fe6cc8076c5780be2c6d628a72f6:RPjgdz6/qs1DEj3XvHa2kuZDXS2+2/YbcE2u+gzvaJl62fe6KIkijt3buaJLVSDotfPIfmX8njLl0KaU14033w==:1000:036j6nqa+4bZElD8b8E8xkWHF5PxzrkahY5supcbemSS0lTYMEar17I2LseSxzGKYx0ypwOYEXbc4ZKj5I9irX8EqnbPbMT3AeulnXvbSG2EJYlweKlTXtYNYYyF0gJHL4yJyOXuTnBr58YpJAc8knfjLYIm3UyuC19vSAHEr98="
//             }
//         });
//         console.log(response.data);
//     } catch (error) {
//         console.error(error);
//     }
// }


function getUdemyData(url) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
        headers: {
            "content-type": "text/html; charset=utf-8",
            'user-agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.62 Safari/537.36",
            "upgrade-insecure-requests": "1",
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
            "cookie": "ud_firstvisit=2018-03-21T12:34:51.129812+00:00:1eycx9:FdRhu57cti-68cxVaJC-ppuOevE; new_user=true; existing_user=true; optimizelyEndUserId=oeu1521635693063r0.529534769490005; _ga=GA1.1.1503117003.1521635696; _gid=GA1.1.1769881523.1521635696; IR_gbd=udemy.com; optimizelySegments=%7B%22306102099%22%3A%22gc%22%2C%22306155008%22%3A%22direct%22%2C%22306161004%22%3A%22false%22%2C%227473112303%22%3A%22none%22%2C%227518841116%22%3A%22true%22%2C%227514910721%22%3A%22Academics%22%7D; optimizelyBuckets=%7B%7D; _gat=1; _gat_UA-12366301-1=1; _dc_gtm_UA-12366301-29=1; _ga=GA1.2.1503117003.1521635696; _gid=GA1.2.1769881523.1521635696; IR_PI=1521635698754.xpvcutjkung; IR_5420=1521699711117%7C0%7C1521699711117; ki_t=1521635701040%3B1521696528288%3B1521699712680%3B2%3B10; ud_rule_vars=\"eJyFzcEKgzAQBNBfkVxbZXddNcm3CKJxU0JbpDH2Iv57pVIovfQ882ZWlfp4kSRj9wxzSFO0ROgM8yi9Yx6QDXnt3eBH1uI1i3XTdA2ibKbWVt36OXVuWuIsx0KXwl3aPW0VAeocypwog9oSWq4LY7Cp4QRgAVp13ls-xH3isGOffi1mSLZkW2GB1Gitv-37Pcpjkfkf5qbSUH3wprYXnuBHPg==:1eytbk:4i_ib7ZDKZZhn-fd7yWtrU30SHM\"; eva=\"SlFYNkxYDm4AQxJ3TFhHewVDB2NfU0F0E0kZeVZQCGATFVk3TFgObgBCHXVMWEd1A0FWPA==\"; __udmy_2_v57r=221c944deac44b1492f8fcbfd48ef84e; seen=1; ki_r=; _px2=eyJ1IjoiNGVhNDU5ODAtMmQ5OS0xMWU4LTk2NTUtNGY0ZDNkOWE5NmIzIiwidiI6IjYzZjBiNjkwLTJjNmMtMTFlOC1hOWFhLTk5ZjJhNDNjOThhNiIsInQiOjE1MjE3MDAyMTI3NjcsImgiOiIzZGMzNTFkMDZkZmU0NTlkOGQyMDU4ZDU0NjUzMjRlM2I1ODZmNDcyYWE4ZjBhY2Y0MzY4YTdjZTIxOGNjNGYwIn0=; _px3=447255db839d3e2fa27aecc6575d761b7039fe6cc8076c5780be2c6d628a72f6:RPjgdz6/qs1DEj3XvHa2kuZDXS2+2/YbcE2u+gzvaJl62fe6KIkijt3buaJLVSDotfPIfmX8njLl0KaU14033w==:1000:036j6nqa+4bZElD8b8E8xkWHF5PxzrkahY5supcbemSS0lTYMEar17I2LseSxzGKYx0ypwOYEXbc4ZKj5I9irX8EqnbPbMT3AeulnXvbSG2EJYlweKlTXtYNYYyF0gJHL4yJyOXuTnBr58YpJAc8knfjLYIm3UyuC19vSAHEr98="
        }
        })
        .then(function (response) {
            // console.log(response.data);
            resolve(response.data);
        })
        .catch(function (error) {
            // console.log(error);
            reject(error)
        });
    });
}



async function startScrape() {
    var udemyUrls = JSON.parse(require('fs').readFileSync('./udemy_courses_links.json', 'utf8'));
    // console.log(udemyUrls.length);
    for (i=0; i< udemyUrls.length; i++) {
        // console.log(udemyUrls[i]);
        const courseUrl = udemyUrls[i];
        console.log(courseUrl);
        const result = await getUdemyData(courseUrl);
        // console.log(result);
        const $ = cheerio.load(result);

        const description = $('.description').html();
        const whatYouLearn = $(".what-you-get__items").html();
        const requirements = $(".requirements__content").html();
        const duration = $("[data-purpose='video-content-length']").html();
        const certificate = $("[data-purpose='incentive-certificate']").html();
        const price = $("[data-purpose='course-price-text']").html();
        const rating = $('.star-rating--static.star-rating--primary').html();
        const url = $("[rel='canonical']").attr('href');

        const course = {};

        course['whatYouLearn'] = whatYouLearn;
        course['requirements'] = requirements;
        course['duration'] = duration;
        course['certificate'] = certificate;
        course['price'] = price;
        course['rating'] = rating;
        course['url'] = url;
        // console.log(course);
        jsonfile.writeFileSync(file, course, {flag: 'a'})

        sleep.sleep(2);
    }
}

startScrape();
