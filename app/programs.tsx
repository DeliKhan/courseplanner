    /*const links = await 
                    fetch("https://academiccalendars.romcmaster.ca/content.php?catoid=53&navoid=10776").then(response => 
                      response.text()).then(data => 
                        {
                          const parser = new DOMParser; 
                          const htmlDocument = parser.parseFromString(data, "text/html"); 
                          return htmlDocument.documentElement.querySelectorAll("a")
                        }
                      );*/
export async function Program() {
    const cheerio = require("cheerio");
    const axios = require("axios");
    const axiosResponse = await axios.request({
        method: "GET",
        url: "https://academiccalendars.romcmaster.ca/content.php?catoid=53&navoid=10776"
    });
    const $ = cheerio.load(axiosResponse.data);
    const links = $("a");
    const programList = (await [...$(links)].filter(link => `${link.attribs.href}`.includes("preview")).map(program => "https://academiccalendars.romcmaster.ca/" + program.attribs.href));                  
    const programs = (await [...$(links)].filter(link => `${link.attribs.href}`.includes("preview")).map(child => (child.children).map(prog => prog.data))).flat();
    let list = [];
    for (let i = 0; i < programs.length; i++) {
        list.push({'programName': programs[i].trim(), 'hrefLink': programList[i].trim()});
    }
    list.sort((a, b) => a.programName.localeCompare(b.programName));
    programs.sort();
    return list;
}