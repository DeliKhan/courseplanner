
export async function Program() {
    const cheerio = require("cheerio");
    const axios = require("axios");
    const axiosResponse = await axios.request({
        method: "GET",
        url: "https://academiccalendars.romcmaster.ca/content.php?catoid=53&navoid=10776"
    });
    const $ = cheerio.load(axiosResponse.data);
    const links = $("a");
    /*const links = await 
                    fetch("https://academiccalendars.romcmaster.ca/content.php?catoid=53&navoid=10776").then(response => 
                      response.text()).then(data => 
                        {
                          const parser = new DOMParser; 
                          const htmlDocument = parser.parseFromString(data, "text/html"); 
                          return htmlDocument.documentElement.querySelectorAll("a")
                        }
                      );*/
    const programs = (await [...$(links)].filter(link => `${link.attribs.href}`.includes("preview")).map(child => (child.children).map(prog => prog.data))).flat();
    return (
        <select id="programname" name="programname" className="flex-1 w-full justify-start py-2 pr-10 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            {programs.map(program => <option value={program}>{program}</option>)}
        </select>
    )
}