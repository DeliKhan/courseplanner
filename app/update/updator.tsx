export async function UpdateJson() {
    const cheerio = require("cheerio");
    const axios = require("axios");
    const fs = require('fs');

    let database = require('../../data/courses.json');

    //This is the sequential version of the code, which is slower
    const axiosResponse = await axios.request({
        method: "GET",
        url: "https://academiccalendars.romcmaster.ca/content.php?catoid=53&navoid=10775"
    });
    let $ = cheerio.load(axiosResponse.data);
    //This gets the number of pages
    const ariaLabel = [...$("a")].filter(link => `${link.attribs["aria-label"]}`.includes("Page")).map(page => `${page.attribs["aria-label"]}`).pop()?.split(" ")[1];
    //split can return undefined, so we need to check for that, if its undefined, we set num to 0
    const num = ariaLabel ? parseInt(ariaLabel) : 0;
    //get each page link
    let courses : string[] = [];
    let courselinks : string[] = [];
    let courseDescription : string[] = [];
    let prereqs : string[][] = [];
    let antireqs : string[][] = [];
    let coreqs : string[][] = [];

    for (let i = 0; i < num; i++) {
        let pageResponse = await axios.request({
            method: "GET",
            url: "https://academiccalendars.romcmaster.ca/content.php?catoid=53&catoid=53&navoid=10775&filter%5Bitem_type%5D=3&filter%5Bonly_active%5D=1&filter%5B3%5D=1&filter%5Bcpage%5D=" + i + "#acalog_template_course_filter"
        });
        $ = cheerio.load(pageResponse.data);
        courselinks.push(...( ([...$("a")].filter(link => `${link.attribs.href}`.startsWith("preview_course_nopop.php") && `${link.attribs.onclick}`.startsWith("showCourse")).map(page => "https://academiccalendars.romcmaster.ca/" + page.attribs.href))));
        courses.push(...( ([...$("a")].filter(link => `${link.attribs.href}`.startsWith("preview_course_nopop.php") && `${link.attribs.onclick}`.startsWith("showCourse")).map(page => {let title = page.attribs.title ? `${page.attribs.title}` : `${page.text}`; return title.includes("opens a new window") ? title.replace("opens a new window", "").trim() : title.trim();})))); //that last conditional checks if page.attribs.title is undefined and if so, get the innerHTML instead
    }
    for (let m = 0; m < courselinks.length; m++) {
        let pageResponse = await axios.request({
            method: "GET",
            url: courselinks[m]
        });
        $ = cheerio.load(pageResponse.data);
        let parentText = $('h1#course_preview_title').parent().text().trim().replace(/(\r\n|\n|\r|HELP|Undergraduate Calendar 2023-2024|Print-Friendly Page|Facebook this Page|Tweet this Page|Add to Favourites|Back to Top|)/gm, "").replace(/\(opens\s+a\s+new\s+window\)/gi,"").replace("|","").replace(/\s{2,}/g," ");
        courseDescription.push(parentText.split("unit(s)")[1]?.split("Prerequisite(s)")[0]?.split(/\b(one|two|three|four|five|six|seven|eight|nine|ten)\b/i)[0]);
        //The matching system will look for the course code, which is 4-7 capital letters, followed by a space, followed by a number, followed by a capital letter, followed by 2 numbers
        prereqs.push((parentText.includes("Prerequisite(s)") ? (parentText.split("Prerequisite(s)")[1]?.includes("Antirequisite(s)") ? (parentText.split("Prerequisite(s)")[1].split("Antirequisite(s)")[0].includes("Co-requisite(s)") ? (parentText.split("Prerequisite(s)")[1].split("Antirequisite(s)")[0].split("Co-requisite(s)")[0].includes("Cross-list(s)") ? parentText.split("Prerequisite(s)")[1].split("Antirequisite(s)")[0].split("Co-requisite(s)")[0].split("Cross-list(s)")[0] : parentText.split("Prerequisite(s)")[1].split("Antirequisite(s)")[0].split("Co-requisite(s)")[0]) : parentText.split("Prerequisite(s)")[1].split("Antirequisite(s)")[0]): parentText.split("Prerequisite(s)")[1]) : "No Prereqs").match(/([A-Z]{4,7}\s(\d[A-Z]\d{2}))/g));
        antireqs.push(parentText.includes("Antirequisite(s)") ? parentText.split("Antirequisite(s)")[1].match(/([A-Z]{4,7}\s(\d[A-Z]\d{2}))/g) : "No Antireqs");
        coreqs.push((parentText.includes("Cross-list(s)") ? parentText.split("Cross-list(s)")[1] : "No Cross-lists").match(/([A-Z]{4,7}\s(\d[A-Z]\d{2}))/g));
    }
    database.course = courses;
    database.courseDescription = courseDescription;
    database.courseLinks = courselinks;
    database.prereqs = prereqs;
    database.antireqs = antireqs;
    database.coreqs = coreqs;
    fs.writeFileSync('data/courses.json', JSON.stringify(database, null, 4));
    //database.prereqs = prereqs;
    //database.antireqs = antireqs;
    //database.coreqs = coreqs;
    console.log("Finished updating the database. Enjoy!");
}