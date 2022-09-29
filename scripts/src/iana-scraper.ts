import * as puppeteer from "puppeteer";
import {HTTPHeader, HTTPHeaderStatus, HTTPHeaderDb, HTTPHeaderSpecification} from "known-http-header-db";

export const run = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', consoleObj => {
    if (consoleObj.type() === 'log') {
      console.log(consoleObj.text());
    }
  });
  const link = 'https://www.iana.org/assignments/http-fields/http-fields.xhtml';
  await page.goto(link);

  const httpHeaderDb: HTTPHeaderDb = await page.evaluate((data) => {
    const removeExtraSpace = (str: string) => {
      return str.replace(/\s+/g, " ");
    }

    const httpHeaderDb: HTTPHeaderDb = {};

    // @ts-ignore
    const rows = [...document.querySelectorAll('#table-field-names tbody tr')] as HTMLTableRowElement[];
    for (const row of rows) {
      const name = row.querySelectorAll('td')[0]!.textContent!.trim();
      console.log(data.link, `${name}`);

      const status = data.HTTPHeaderStatus[row.querySelectorAll('td')[2]?.textContent?.trim().toLowerCase() ?? ''] as HTTPHeaderStatus | undefined;

      const note = row.querySelectorAll('td')[4]?.textContent?.trim();

      const specifications: HTTPHeaderSpecification[] = [];
      // @ts-ignore
      const anchors: HTMLAnchorElement[] = [...row.querySelectorAll('td')[3].querySelectorAll('a')];
      for (const anchor of anchors) {
        specifications.push({
          name: anchor.textContent?.trim() ?? '',
          link: anchor.href
        });
      }

      const httpHeaderInfo: HTTPHeader = {
        name,
        status,
        note: note ? removeExtraSpace(note) : undefined,
        link: data.link,
        examples: [],
        directives: [],
        specifications,
        browserCompatibility: []
      };

      httpHeaderDb[httpHeaderInfo.name.toLowerCase()] = httpHeaderInfo;
    }

    return httpHeaderDb;
  }, {
    link,
    HTTPHeaderStatus
  });

  await browser.close();

  return httpHeaderDb;
}
