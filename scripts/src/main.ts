import * as fs from "fs";
import * as path from "path";
import * as MdnScraper from "./mdn-scraper";
import * as IanaScraper from "./iana-scraper";
import * as WikipediaScraper from "./wikipedia-scraper";
import {HTTPHeaderDb} from "known-http-header-db";

(async () => {
  const httpHeadersDb = mergeDatabases([
    await MdnScraper.run(),
    await IanaScraper.run(),
    await WikipediaScraper.run(),
    // load custom headers
    require('./custom-headers.json') as HTTPHeaderDb
  ]);

  const dbJsonPath = path.join(__dirname, '..', '..', 'src', 'db.json');
  console.log(`Save db.json to ${dbJsonPath}`);
  fs.writeFileSync(dbJsonPath, JSON.stringify(httpHeadersDb, null, '\t'));
})();

function mergeDatabases(databases: HTTPHeaderDb[]): HTTPHeaderDb {
  databases = JSON.parse(JSON.stringify(databases));
  const mergedDb: HTTPHeaderDb = databases[0];
  for (const target of databases.slice(1)) {
    for (const key of Object.keys(target)) {
      if (mergedDb[key] == null) {
        mergedDb[key] = target[key];
      } else {
        for (const property of Object.keys(target[key])) {
          if (mergedDb[key][property] == null) {
            mergedDb[key][property] = target[key][property];
          } else {
            switch (property) {
              case 'type':
                mergedDb[key][property] = [...new Set([...(mergedDb[key][property] ?? []), ...(target[key][property] ?? [])])];
                if (mergedDb[key][property]?.length === 0) {
                  mergedDb[key][property] = undefined;
                }
                break;
              case 'examples':
                mergedDb[key][property] = [...new Set([...mergedDb[key][property], ...target[key][property]])];
                break;
              case 'directives':
                for (const targetDirective of target[key][property]) {
                  if (targetDirective.name != null && !mergedDb[key][property].find(spec => spec.name === targetDirective.name)) {
                    mergedDb[key][property].push(targetDirective);
                  }
                }
                break;
              case 'specifications':
                for (const targetSpec of target[key][property]) {
                  if (targetSpec.link != null && !mergedDb[key][property].find(spec => spec.link === targetSpec.link)) {
                    mergedDb[key][property].push(targetSpec);
                  }
                }
                break;
              case 'browserCompatibility':
                for (const targetBrowserCompatibility of target[key][property]) {
                  const sourceBrowserCompatibility = mergedDb[key][property].find(browserCompatibility => browserCompatibility.feature === targetBrowserCompatibility.feature);
                  if (!sourceBrowserCompatibility) {
                    mergedDb[key][property].push(targetBrowserCompatibility);
                  } else {
                    for (const targetBrowserInfo of targetBrowserCompatibility.browsers) {
                      if (!sourceBrowserCompatibility.browsers.find(browserInfo => browserInfo.name === targetBrowserInfo.name)) {
                        sourceBrowserCompatibility.browsers.push(targetBrowserInfo);
                      }
                    }
                  }
                }
                break;
            }
          }
        }
      }
    }
  }
  return mergedDb;
}
