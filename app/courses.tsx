

export async function updateCourse() {
    const cheerio = require("cheerio");
    const axios = require("axios");
    const axiosResponse = await axios.request({
        method: "GET",
        url: "https://academiccalendars.romcmaster.ca/content.php?catoid=53&navoid=10775"
    });
    let $ = cheerio.load(axiosResponse.data);
    //This gets the number of pages
    const ariaLabel = (await [...$("a")].filter(link => `${link.attribs["aria-label"]}`.includes("Page")).map(page => `${page.attribs["aria-label"]}`)).pop()?.split(" ")[1];
    //split can return undefined, so we need to check for that, if its undefined, we set num to 0
    const num = ariaLabel ? parseInt(ariaLabel) : 0;
    //get each page link
    let courses : string[] = [];
    for (let i = 0; i < num; i++) {
        let pageResponse = await axios.request({
            method: "GET",
            url: "https://academiccalendars.romcmaster.ca/content.php?catoid=53&catoid=53&navoid=10775&filter%5Bitem_type%5D=3&filter%5Bonly_active%5D=1&filter%5B3%5D=1&filter%5Bcpage%5D=" + i + "#acalog_template_course_filter"
        });
        $ = cheerio.load(pageResponse.data);
        courses.push(...( ([...$("a")].filter(link => `${link.attribs.href}`.startsWith("preview_course_nopop.php") && `${link.attribs.onclick}`.startsWith("showCourse")).map(page => {let title = page.attribs.title ? `${page.attribs.title}` : `${page.text}`; return title.includes("opens a new window") ? title.replace("opens a new window", "").trim() : title.trim();})))); //that last conditional checks if page.attribs.title is undefined and if so, get the innerHTML instead
    }
    return courses;
}