<div align="center">

# HTTP Header Database

[![NPM](https://nodei.co/npm/known-http-header-db.png?compact=true)](https://nodei.co/npm/known-http-header-db/)
<br />
[![](https://img.shields.io/npm/dt/known-http-header-db.svg?style=flat-square)](https://www.npmjs.com/package/known-http-header-db)

</div>

[![NPM Version](https://badgen.net/npm/v/known-http-header-db)](https://npmjs.org/package/known-http-header-db)
[![license](https://img.shields.io/github/license/pichillilorenzo/known-http-header-db)](/LICENSE)
[![Donate to this project using Paypal](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://www.paypal.me/LorenzoPichilli)

This is a large database of known HTTP Headers and information about them. It consists of a single, public JSON file and does not include any logic, allowing it to remain as un-opinionated as possible with an API. It aggregates data from the following sources:

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers

## Installation

```bash
npm i --save known-http-header-db
```

### Database Download

If you want download the database and use it directly in the browser, you can just grab the
JSON file using [jsDelivr](https://www.jsdelivr.com/). It is recommended to
replace `main` with [a release tag](https://github.com/pichillilorenzo/known-http-header-db/tags)
as the JSON format may change in the future.

```
https://cdn.jsdelivr.net/gh/pichillilorenzo/known-http-header-db@main/dist/db.json
```

## Usage

```js
import db from 'known-http-header-db';
// .. or
const db = require('known-http-header-db');

const contentTypeInfo = db['content-type']; // An instance of HTTPHeader
console.log(contentTypeInfo.name); // Content-Type
```

Access HTTP Header info using the header name in **lower case** as key.

## Contributing

The primary way to contribute to this database is by updating the data in one of the upstream sources.
Check the `scripts/src/mdn-scraper.ts` to check the MDN scraper implementation.

### Direct Inclusion

If that is not possible / feasible, they can be added directly here as a "custom" header.

To edit the database, only make PRs against `scripts/src/custom-headers.json`.

The `scripts/src/custom-headers.json` file is a JSON object of type [HTTPHeaderDb](https://pichillilorenzo.github.io/known-http-header-db/interfaces/HTTPHeaderDb.html), where each `key` is the header name in lower case and the `value`
is an Object of type [HTTPHeader](https://pichillilorenzo.github.io/known-http-header-db/interfaces/HTTPHeader.html).

To update the build, run `npm run build:all`.

## HTTPHeaderDb Data Structure Example

```json
{
  "accept": {...},
  "content-type": {
    "name": "Content-Type",
    "type": [
      "representation"
    ],
    "description": "The Content-Type representation header is used to indicate the original media type of the resource (prior to any content encoding applied for sending). In responses, a Content-Type header provides the client with the actual content type of the returned content. This header's value may be ignored, for example when browsers perform MIME sniffing; set the X-Content-Type-Options header value to nosniff to prevent this behavior. In requests, (such as POST or PUT), the client tells the server what type of data is actually sent.",
    "syntax": "Content-Type: text/html; charset=UTF-8\nContent-Type: multipart/form-data; boundary=something",
    "link": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type",
    "forbiddenHeaderName": false,
    "corsSafeListedRequestHeader": false,
    "corsSafeListedResponseHeader": true,
    "examples": [],
    "directives": [
      {
        "name": "media-type",
        "description": "The MIME type of the resource or the data."
      },
      {
        "name": "charset",
        "description": "The character encoding standard."
      },
      {
        "name": "boundary",
        "description": "For multipart entities the boundary directive is required. The directive consists of 1 to 70 characters from a set of characters (and not ending with white space) known to be very robust through email gateways. It is used to encapsulate the boundaries of the multiple parts of the message. Often, the header boundary is prepended with two dashes and the final boundary has two dashes appended at the end."
      }
    ],
    "specifications": [
      {
        "name": "HTTP Semantics # status.206",
        "link": "https://httpwg.org/specs/rfc9110.html#status.206"
      },
      {
        "name": "HTTP Semantics # field.content-type",
        "link": "https://httpwg.org/specs/rfc9110.html#field.content-type"
      }
    ],
    "browserCompatibility": [
      {
        "feature": "Content-Type",
        "browsers": [
          {
            "name": "Chrome",
            "supported": true,
            "version": "Yes"
          },
          {
            "name": "Edge",
            "supported": true,
            "version": "12"
          },
          {
            "name": "Firefox",
            "supported": true,
            "version": "Yes"
          },
          {
            "name": "Opera",
            "supported": true,
            "version": "Yes"
          },
          {
            "name": "Safari",
            "supported": true,
            "version": "Yes"
          },
          {
            "name": "Chrome Android",
            "supported": true,
            "version": "Yes"
          },
          {
            "name": "Firefox for Android",
            "supported": true,
            "version": "Yes"
          },
          {
            "name": "Opera Android",
            "supported": true,
            "version": "Yes"
          },
          {
            "name": "Safari on iOS",
            "supported": true,
            "version": "Yes"
          },
          {
            "name": "Samsung Internet",
            "supported": true,
            "version": "Yes"
          },
          {
            "name": "WebView Android",
            "supported": true,
            "version": "Yes"
          }
        ]
      }
    ]
  },
  "content-length": {...},
  ...
}
```

Check [HTTPHeaderDb](https://pichillilorenzo.github.io/known-http-header-db/interfaces/HTTPHeaderDb.html) for more details.

## License

Released under the [ISC](/LICENSE) license.

This project is strongly inspired by the [mime-db](https://github.com/jshttp/mime-db).
