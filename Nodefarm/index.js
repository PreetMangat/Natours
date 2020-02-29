const fs = require('fs');
const http = require('http');
const url = require('url');

//Sync
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `This is what we know about: ${textIn}.\n Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt',textOut);
// console.log('File written');

//Async
// fs.readFile('./txt/start.txt', 'utf-8', (error, data) => {
//     console.log(data);
// })

// SERVER
const replaceTemplate = (template, product) => {
    let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%ID%}/g, product.id);

    if(!product.organic) {
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    }
    return output;
}
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);



const server = http.createServer((request,response) => {
    const {query,pathname} = url.parse(request.url, true);

    //Overview page
    if(pathname === '/' || pathname === '/overview') {
        response.writeHead(200, { 'Content-type':'text/html'});

        const cardsHtml = dataObj.map(element => replaceTemplate(tempCard,element)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml);

        response.end(output);
    }

    //product page
    else if (pathname ==='/product') {
        response.writeHead(200, {'Content-type':'text/html'});
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        response.end(output);
    }

    //api
    else if (pathname === '/api') {
        response.writeHead(200, { 'Content-type': 'application/json'});
        response.end(data);
    
    }
    else {
        response.writeHead(404, {
            'Content-type': 'text/html',

        });
        response.end('<h1>Page NOT FOUND</h1>');
    }
});

server.listen(8000,'127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
})

