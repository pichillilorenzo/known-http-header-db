/**
 * HTTP Header Type.
 */
export enum HTTPHeaderType {
  /**
   * A request header is an HTTP header that can be used in an HTTP request to provide information about the request context, so that the server can tailor the response.
   *
   * {@link https://developer.mozilla.org/en-US/docs/Glossary/Request_header | MDN - Request header}
   */
  request = 'request',

  /**
   * A response header is an HTTP header that can be used in an HTTP response and that doesn't relate to the content of the message.
   *
   * {@link https://developer.mozilla.org/en-US/docs/Glossary/Response_header | MDN - Response header}
   */
  response = 'response',

  /**
   * A representation header is an HTTP header that describes the particular representation of the resource sent in an HTTP message body.
   *
   * {@link https://developer.mozilla.org/en-US/docs/Glossary/Representation_header | MDN - Representation header}
   */
  representation = 'representation'
}

/**
 * HTTP Header Database.
 *
 * @example
 * ```json
 * {
 *   "accept": {...},
 *   "content-type": {
 *     "name": "Content-Type",
 *     "type": [
 *       "representation"
 *     ],
 *     "description": "The Content-Type representation header is used to indicate the original media type of the resource (prior to any content encoding applied for sending). In responses, a Content-Type header provides the client with the actual content type of the returned content. This header's value may be ignored, for example when browsers perform MIME sniffing; set the X-Content-Type-Options header value to nosniff to prevent this behavior. In requests, (such as POST or PUT), the client tells the server what type of data is actually sent.",
 *     "syntax": "Content-Type: text/html; charset=UTF-8\nContent-Type: multipart/form-data; boundary=something",
 *     "link": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type",
 *     "forbiddenHeaderName": false,
 *     "corsSafeListedRequestHeader": false,
 *     "corsSafeListedResponseHeader": true,
 *     "examples": [],
 *     "directives": [
 *       {
 *         "name": "media-type",
 *         "description": "The MIME type of the resource or the data."
 *       },
 *       {
 *         "name": "charset",
 *         "description": "The character encoding standard."
 *       },
 *       {
 *         "name": "boundary",
 *         "description": "For multipart entities the boundary directive is required. The directive consists of 1 to 70 characters from a set of characters (and not ending with white space) known to be very robust through email gateways. It is used to encapsulate the boundaries of the multiple parts of the message. Often, the header boundary is prepended with two dashes and the final boundary has two dashes appended at the end."
 *       }
 *     ],
 *     "specifications": [
 *       {
 *         "name": "HTTP Semantics # status.206",
 *         "link": "https://httpwg.org/specs/rfc9110.html#status.206"
 *       },
 *       {
 *         "name": "HTTP Semantics # field.content-type",
 *         "link": "https://httpwg.org/specs/rfc9110.html#field.content-type"
 *       }
 *     ],
 *     "browserCompatibility": [
 *       {
 *         "feature": "Content-Type",
 *         "browsers": [
 *           {
 *             "name": "Chrome",
 *             "supported": true,
 *             "version": "Yes"
 *           },
 *           {
 *             "name": "Edge",
 *             "supported": true,
 *             "version": "12"
 *           },
 *           {
 *             "name": "Firefox",
 *             "supported": true,
 *             "version": "Yes"
 *           },
 *           {
 *             "name": "Opera",
 *             "supported": true,
 *             "version": "Yes"
 *           },
 *           {
 *             "name": "Safari",
 *             "supported": true,
 *             "version": "Yes"
 *           },
 *           {
 *             "name": "Chrome Android",
 *             "supported": true,
 *             "version": "Yes"
 *           },
 *           {
 *             "name": "Firefox for Android",
 *             "supported": true,
 *             "version": "Yes"
 *           },
 *           {
 *             "name": "Opera Android",
 *             "supported": true,
 *             "version": "Yes"
 *           },
 *           {
 *             "name": "Safari on iOS",
 *             "supported": true,
 *             "version": "Yes"
 *           },
 *           {
 *             "name": "Samsung Internet",
 *             "supported": true,
 *             "version": "Yes"
 *           },
 *           {
 *             "name": "WebView Android",
 *             "supported": true,
 *             "version": "Yes"
 *           }
 *         ]
 *       }
 *     ]
 *   },
 *   "content-length": {...},
 *   ...
 * }
 * ```
 */
export interface HTTPHeaderDb {
  [key: string]: HTTPHeader;
}

/**
 * HTTP Header directive.
 *
 * @example
 * ```json
 * {
 *   "name": "media-type",
 *   "description": "The MIME type of the resource or the data."
 * }
 * ```
 */
export interface HTTPHeaderDirective {
  /**
   * HTTP Header directive name.
   */
  name: string;

  /**
   * HTTP Header directive description.
   */
  description?: string;

  /**
   * HTTP Header directive documentation link.
   */
  link?: string;
}

/**
 * HTTP Header specification.
 * @example
 * ```json
 * {
 *   "name": "HTTP Semantics # field.content-type",
 *   "link": "https://httpwg.org/specs/rfc9110.html#field.content-type"
 * }
 * ```
 */
export interface HTTPHeaderSpecification {
  /**
   * HTTP Header specification name.
   */
  name: string;

  /**
   * HTTP Header specification documentation link.
   */
  link?: string;
}

/**
 * HTTP Header browser info.
 *
 * @example
 * ```json
 * {
 *   "name": "Chrome",
 *   "supported": true,
 *   "version": "65"
 * }
 * ```
 */
export interface HTTPHeaderBrowserInfo {
  /**
   * HTTP Header browser info name.
   */
  name: string;

  /**
   * HTTP Header browser info label version.
   */
  version: string;

  /**
   * If the HTTP Header is supported by the browser.
   */
  supported?: boolean;
}

/**
 * HTTP Header feature browser compatibility info.
 *
 * @example
 * ```json
 * {
 *   "feature": "Content-Type",
 *   "browsers": [...]
 * }
 * ```
 */
export interface HTTPHeaderBrowserCompatibility {
  /**
   * HTTP Header feature name.
   */
  feature: string;

  /**
   * HTTP Header feature browser compatibility info list.
   */
  browsers: HTTPHeaderBrowserInfo[];
}

/**
 * HTTP Header info
 *
 * @example
 * ```json
 * {
 *   "name": "Content-Type",
 *   "type": [
 *     "representation"
 *   ],
 *   "description": "The Content-Type representation header is used to indicate the original media type of the resource (prior to any content encoding applied for sending). In responses, a Content-Type header provides the client with the actual content type of the returned content. This header's value may be ignored, for example when browsers perform MIME sniffing; set the X-Content-Type-Options header value to nosniff to prevent this behavior. In requests, (such as POST or PUT), the client tells the server what type of data is actually sent.",
 *   "syntax": "Content-Type: text/html; charset=UTF-8\nContent-Type: multipart/form-data; boundary=something",
 *   "link": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type",
 *   "forbiddenHeaderName": false,
 *   "corsSafeListedRequestHeader": false,
 *   "corsSafeListedResponseHeader": true,
 *   "examples": [],
 *   "directives": [
 *     {
 *       "name": "media-type",
 *       "description": "The MIME type of the resource or the data."
 *     },
 *     {
 *       "name": "charset",
 *       "description": "The character encoding standard."
 *     },
 *     {
 *       "name": "boundary",
 *       "description": "For multipart entities the boundary directive is required. The directive consists of 1 to 70 characters from a set of characters (and not ending with white space) known to be very robust through email gateways. It is used to encapsulate the boundaries of the multiple parts of the message. Often, the header boundary is prepended with two dashes and the final boundary has two dashes appended at the end."
 *     }
 *   ],
 *   "specifications": [
 *     {
 *       "name": "HTTP Semantics # status.206",
 *       "link": "https://httpwg.org/specs/rfc9110.html#status.206"
 *     },
 *     {
 *       "name": "HTTP Semantics # field.content-type",
 *       "link": "https://httpwg.org/specs/rfc9110.html#field.content-type"
 *     }
 *   ],
 *   "browserCompatibility": [
 *     {
 *       "feature": "Content-Type",
 *       "browsers": [
 *         {
 *           "name": "Chrome",
 *           "supported": true,
 *           "version": "Yes"
 *         },
 *         {
 *           "name": "Edge",
 *           "supported": true,
 *           "version": "12"
 *         },
 *         {
 *           "name": "Firefox",
 *           "supported": true,
 *           "version": "Yes"
 *         },
 *         {
 *           "name": "Opera",
 *           "supported": true,
 *           "version": "Yes"
 *         },
 *         {
 *           "name": "Safari",
 *           "supported": true,
 *           "version": "Yes"
 *         },
 *         {
 *           "name": "Chrome Android",
 *           "supported": true,
 *           "version": "Yes"
 *         },
 *         {
 *           "name": "Firefox for Android",
 *           "supported": true,
 *           "version": "Yes"
 *         },
 *         {
 *           "name": "Opera Android",
 *           "supported": true,
 *           "version": "Yes"
 *         },
 *         {
 *           "name": "Safari on iOS",
 *           "supported": true,
 *           "version": "Yes"
 *         },
 *         {
 *           "name": "Samsung Internet",
 *           "supported": true,
 *           "version": "Yes"
 *         },
 *         {
 *           "name": "WebView Android",
 *           "supported": true,
 *           "version": "Yes"
 *         }
 *       ]
 *     }
 *   ]
 * }
 * ```
 */
export interface HTTPHeader {
  /**
   * HTTP Header name.
   */
  name: string;

  /**
   * HTTP Header type.
   */
  type?: HTTPHeaderType[];

  /**
   * HTTP Header description.
   */
  description?: string;

  /**
   * HTTP Header note.
   */
  note?: string;

  /**
   * HTTP Header documentation link.
   */
  link?: string;

  /**
   * HTTP Header syntax example.
   */
  syntax?: string;

  /**
   * If set, this HTTP Header is experimental. The string represents the documentation description.
   */
  experimental?: string;

  /**
   * If set, this HTTP Header requires a secure context. The string represents the documentation description.
   */
  secure?: string;

  /**
   * If set, this HTTP Header is deprecated. The string represents the documentation description.
   */
  deprecated?: string;

  /**
   * If set, this HTTP Header is non-standard. The string represents the documentation description.
   */
  nonstandard?: string;

  /**
   * If set, it represents a warning message for this HTTP Header.
   */
  warning?: string;

  /**
   * A forbidden header name is the name of any HTTP header that cannot be modified programmatically; specifically, an HTTP request header name (in contrast with a Forbidden response header name).
   *
   * {@link https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name | MDN - Forbidden header name}
   */
  forbiddenHeaderName?: boolean;

  /**
   * A CORS-safelisted request header is one of the following HTTP headers:
   * - Accept,
   * - Accept-Language,
   * - Content-Language,
   * - Content-Type.
   *
   * When containing only these headers (and values that meet the additional requirements laid out below), a request doesn't need to send a preflight request in the context of CORS.
   *
   * {@link https://developer.mozilla.org/en-US/docs/Glossary/CORS-safelisted_request_header | MDN - CORS-safelisted request header}
   */
  corsSafeListedRequestHeader?: boolean;

  /**
   * A CORS-safelisted response header is an HTTP header in a CORS response that it is considered safe to expose to client scripts. Only safelisted response headers are made available to web pages.
   *
   * {@link https://developer.mozilla.org/en-US/docs/Glossary/CORS-safelisted_response_header | MDN - CORS-safelisted response header}
   */
  corsSafeListedResponseHeader?: boolean;

  /**
   * HTTP Header examples.
   */
  examples: string[];

  /**
   * HTTP Header directives.
   */
  directives: HTTPHeaderDirective[];

  /**
   * HTTP Header specifications.
   */
  specifications: HTTPHeaderSpecification[];

  /**
   * HTTP Header features browser compatibility list.
   */
  browserCompatibility: HTTPHeaderBrowserCompatibility[];
}

export default require('./db.json') as HTTPHeaderDb;
