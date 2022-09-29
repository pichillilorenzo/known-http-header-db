import * as puppeteer from "puppeteer";
import {HTTPHeader, HTTPHeaderDb, HTTPHeaderSpecification, HTTPHeaderType} from "known-http-header-db";

export const run = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', consoleObj => {
    if (consoleObj.type() === 'log') {
      console.log(consoleObj.text());
    }
  });
  const link = 'https://en.wikipedia.org/wiki/List_of_HTTP_header_fields';
  await page.goto(link, {
    waitUntil: 'networkidle2',
  });

  const httpHeaderDb: HTTPHeaderDb = await page.evaluate((data) => {
    const removeExtraSpace = (str: string) => {
      return str.replace(/\s+/g, " ");
    }

    const httpHeaderDb: HTTPHeaderDb = {};

    // @ts-ignore
    const tables = [...document.querySelectorAll('.wikitable')] as HTMLTableElement[];
    for (const table of tables) {
      table.querySelectorAll('sup').forEach(el => el.remove());

      const tableIndex = tables.indexOf(table);
      let type = [0, 1].includes(tableIndex) ? [data.HTTPHeaderType.request] : [data.HTTPHeaderType.response];
      // @ts-ignore
      const rows = [...table.querySelectorAll('tbody tr')] as HTMLTableRowElement[];
      for (const row of rows) {
        // @ts-ignore
        const columns = [...row.querySelectorAll('td')] as HTMLTableColElement[];
        const names = columns[0]?.textContent?.trim().split(',').map(n => n.trim()) ?? [];

        for (const name of names) {
          console.log(data.link, `${name}`);

          const description = columns[1]?.textContent?.trim();
          // @ts-ignore
          const examples = [...columns[2].querySelectorAll('code')]
            .map(e => e.textContent?.trim() ?? '')
            .filter(e => e.toLowerCase().includes(name.toLowerCase()));
          const syntax = examples.length > 0 ? examples[0] : `${name}`;

          const specifications: HTTPHeaderSpecification[] = [];
          if (columns[4]) {
            // @ts-ignore
            const anchors: HTMLAnchorElement[] = [...columns[4].querySelectorAll('a.external')];
            for (const anchor of anchors) {
              specifications.push({
                name: anchor.textContent?.trim() ?? '',
                link: anchor.href
              });
            }
          }

          const httpHeaderInfo: HTTPHeader = {
            name,
            type,
            description: description ? removeExtraSpace(description) : undefined,
            syntax,
            link: row.id ? `${data.link}#${row.id}` : data.link,
            directives: [],
            examples,
            specifications,
            browserCompatibility: []
          };

          const headerKey = httpHeaderInfo.name.toLowerCase();
          if (!httpHeaderDb[headerKey]) {
            httpHeaderDb[headerKey] = httpHeaderInfo;
          } else {
            httpHeaderDb[headerKey].type = [...(httpHeaderDb[headerKey].type ?? []), ...(httpHeaderInfo.type ?? [])];
            if (httpHeaderDb[headerKey].type?.length === 0) {
              httpHeaderDb[headerKey].type = undefined;
            }
          }

        }

      }
    }

    return httpHeaderDb;
  }, {
    link,
    HTTPHeaderType
  });

  await browser.close();

  return httpHeaderDb;
}
