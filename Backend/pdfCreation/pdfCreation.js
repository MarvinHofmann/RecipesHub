const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");

module.exports = async function createRecipePDF(recipe) {
    const templateHTML = fs.readFileSync(path.join(__dirname + '/recipeTemplate.html'), 'utf8');
    const template = handlebars.compile(templateHTML);
    const result = template({ recipeData: recipe });
    const pdfOptions = {
        fromat: 'A4',
        displayHeaderFooter: true,
        headerTemplate: "<p></p>",
        footerTemplate: // Display RecipesHub and Page Number automatically in footer
            "<div style=\"text-align: left;font-size: 10px; opacity: 0.5; margin-top: 10px; margin-left:1cm\">" +
            "RecipesHub</div>" +
            "<div style=\"text-align: right;width: 297mm;font-size: 10px; opacity: 0.5; margin-top: 10px;\">" +
            "Seite <span style=\"margin-right: 1cm\"><span class=\"pageNumber\"></span> von <span class=\"totalPages\">" +
            "</span></span></div>",
        margin: {
            top: "20px",
            bottom: "50px"
        },
        printBackground: true,
    }

    const browser = await puppeteer.launch({
        executablePath: "/usr/bin/chromium-browser",
        args: ['--no-sandbox'],
        headless: true
    });
    const page = await browser.newPage();
    await page.goto(`data:text/html;charset=UTF-8,${result}`, {
        waitUntil: 'networkidle0'
    });
    return await page.pdf(pdfOptions);
}
