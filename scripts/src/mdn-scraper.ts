import * as puppeteer from "puppeteer";
import {HTTPHeader, HTTPHeaderBrowserInfo, HTTPHeaderDb, HTTPHeaderSpecification, HTTPHeaderType, HTTPHeaderBrowserCompatibility, HTTPHeaderDirective} from "known-http-header-db";

export const run = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers');

  const headerLinkElements = await page.$$('#sidebar-quicklinks .toggle > details ol > li > a[href^="/en-US/docs/Web/HTTP/Headers"]:not([href^="/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/"]):not([href^="/en-US/docs/Web/HTTP/Headers/Feature-Policy/"])');
  const headerLinks: string[] = [];
  for (const headerLinkElement of headerLinkElements) {
    headerLinks.push(await headerLinkElement.evaluate((link: HTMLLinkElement) => {
      return link.href;
    }, headerLinkElement));
  }
  await headerLinkElements?.forEach(h => h.dispose());

  const httpHeadersDb: HTTPHeaderDb = {};
  for (const headerLink of headerLinks) {
    await page.goto(headerLink, {
      waitUntil: 'networkidle2',
    });
    console.log(headerLink);

    const httpHeader: HTTPHeader = await page.evaluate((data) => {
      const removeExtraSpace = (str: string) => {
        return str.replace(/\s+/g, " ");
      }

      const name = document.querySelector('.main-page-content h1')!.textContent!.trim();

      // @ts-ignore
      const description = [...document.querySelector('.main-page-content .section-content').querySelectorAll('p')]
        .map((p: HTMLParagraphElement) => p.textContent?.trim() ?? '').join('\n');
      const note = document.querySelector('.main-page-content .section-content')?.querySelector('.notecard.note')?.textContent?.trim();

      const secure = document.querySelector('.main-page-content .section-content')?.querySelector('.notecard.secure')?.textContent?.trim();
      const deprecated = document.querySelector('.main-page-content .section-content')?.querySelector('.notecard.deprecated')?.textContent?.trim();
      const nonstandard = document.querySelector('.main-page-content .section-content')?.querySelector('.notecard.nonstandard')?.textContent?.trim();
      const warning = document.querySelector('.main-page-content .section-content')?.querySelector('.notecard.warning')?.textContent?.trim();

      let type: HTTPHeaderType[] | undefined;
      let forbiddenHeaderName: boolean | undefined;
      let corsSafeListedRequestHeader: boolean | undefined;
      let corsSafeListedResponseHeader: boolean | undefined;
      const tableScroll = document.querySelector('.main-page-content .section-content')?.querySelector('.table-scroll');
      if (tableScroll) {
        // @ts-ignore
        const rows: HTMLTableRowElement[] = [...tableScroll.querySelectorAll('.properties tr')];
        for (const row of rows) {
          const key = row.querySelector('th')?.textContent?.trim().toLowerCase();
          const value = row.querySelector('td')?.textContent?.trim().toLowerCase();
          switch (key) {
            case 'header type':
              type = [];
              if (value != null) {
                if (value.includes('request header')) {
                  type.push(data.HTTPHeaderType.request);
                }
                if (value.includes('response header')) {
                  type.push(data.HTTPHeaderType.response);
                }
                if (value.includes('representation header')) {
                  type.push(data.HTTPHeaderType.representation);
                }
              }
              type = type.length > 0 ? type : undefined;
              break;
            case 'forbidden header name':
              if (value != null) {
                forbiddenHeaderName = value === 'yes';
              }
              break;
            case 'cors-safelisted request header':
              if (value != null) {
                corsSafeListedRequestHeader = value === 'yes';
              }
              break;
            case 'cors-safelisted response header':
              if (value != null) {
                corsSafeListedResponseHeader = value === 'yes';
              }
              break;
          }
        }
      }

      const syntax = document.querySelector('section[aria-labelledby="syntax"] .section-content .code-example code')?.textContent?.trim();

      // @ts-ignore
      const examples = [...document.querySelectorAll('section[aria-labelledby="examples"] .section-content .code-example pre.http code')]
        .map((code: HTMLElement) => code.textContent?.trim() ?? '');

      const directives: HTTPHeaderDirective[] = [];
      // @ts-ignore
      const directivesDls = [...document.querySelectorAll('section[aria-labelledby*="directives"] .section-content dl')];
      if (directivesDls) {
        for (const directivesDl of directivesDls) {
          // @ts-ignore
          const dts = [...directivesDl.querySelectorAll('dt')] as HTMLElement[];
          // @ts-ignore
          const dds = [...directivesDl.querySelectorAll('dd')] as HTMLElement[];
          dts.forEach((dt, index) => {
            const directiveDescription = (dds[index].querySelector('p') ?? dds[index]).textContent?.trim();
            directives.push({
              name: dt.querySelector('code')?.textContent?.trim() ?? dt.id?.trim() ?? dt.textContent?.trim() ?? '',
              description: directiveDescription ? removeExtraSpace(directiveDescription) : undefined,
              link: dt.querySelector('a')?.href
            });
          });
        }
      }

      const specifications: HTTPHeaderSpecification[] = [];
      const specificationTable = document.querySelector('.main-page-content #specifications + table');
      if (specificationTable) {
        // @ts-ignore
        const rows: HTMLTableRowElement[] = [...specificationTable.querySelectorAll('tbody tr')];
        for (const row of rows) {
          specifications.push({
            name: row.querySelector('td')?.textContent?.trim() ?? '',
            link: row.querySelector('a')?.href
          });
        }
      }

      const browserCompatibility: HTTPHeaderBrowserCompatibility[] = [];
      const browserCompatibilityTable = document.querySelector('.main-page-content .bc-table');
      if (browserCompatibilityTable) {
        // @ts-ignore
        const rows: HTMLTableRowElement[] = [...browserCompatibilityTable.querySelectorAll('tbody tr')];
        for (const row of rows) {
          // @ts-ignore
          const tds = [...row.querySelectorAll('td')] as HTMLTableColElement[];
          const browsers: HTTPHeaderBrowserInfo[] = [];
          for (const td of tds) {
            let supported: boolean | undefined;
            if (td.querySelector('abbr')?.classList.contains('bc-level-yes') ||
              td.querySelector('abbr')?.classList.contains('bc-level-no')) {
              supported = td.querySelector('abbr')?.classList.contains('bc-level-yes');
            }
            browsers.push({
              name: td.querySelector('.bc-browser-name')?.textContent?.trim() ?? '',
              supported,
              version: td.querySelector('.bc-version-label')?.textContent?.trim() ?? ''
            });
          }

          browserCompatibility.push({
            feature: (row.querySelector('th .bc-table-row-header code') ?? row.querySelector('th .bc-table-row-header'))?.textContent?.trim() ?? '',
            browsers
          });
        }
      }

      const headerInfo: HTTPHeader = {
        name,
        type,
        description: description ? removeExtraSpace(description) : undefined,
        note: note ? removeExtraSpace(note) : undefined,
        syntax,
        secure: secure ? removeExtraSpace(secure) : undefined,
        deprecated: deprecated ? removeExtraSpace(deprecated) : undefined,
        nonstandard: nonstandard ? removeExtraSpace(nonstandard) : undefined,
        warning: warning ? removeExtraSpace(warning) : undefined,
        link: data.headerLink,
        forbiddenHeaderName,
        corsSafeListedRequestHeader,
        corsSafeListedResponseHeader,
        examples,
        directives,
        specifications,
        browserCompatibility
      };
      return headerInfo;
    }, {
      headerLink,
      HTTPHeaderType
    });

    httpHeadersDb[httpHeader.name.toLowerCase()] = httpHeader;
  }

  await browser.close();

  return httpHeadersDb;
}
