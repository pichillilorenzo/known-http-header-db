import * as fs from "fs";
import * as path from "path";
import * as MdnScraper from "./mdn-scraper";
import {HTTPHeaderDb} from "known-http-header-db";

(async () => {
  let httpHeadersDb = await MdnScraper.run();

  // load custom headers
  const customHeaders = require('./custom-headers.json') as HTTPHeaderDb;

  httpHeadersDb = {
    ...httpHeadersDb,
    ...customHeaders
  };

  const dbJsonPath = path.join(__dirname, '..', '..', 'src', 'db.json');
  console.log(`Save db.json to ${dbJsonPath}`);
  fs.writeFileSync(dbJsonPath, JSON.stringify(httpHeadersDb, null, '\t'));
})();
