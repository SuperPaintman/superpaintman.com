'use strict';
/* Imports */
const ts = require('typescript');
const { marked } = require('marked');

const escapeTest = /[&<>"']/;
const escapeReplace = /[&<>"']/g;
const escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
const escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
const escapeReplacements = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};
const getEscapeReplacement = (ch) => escapeReplacements[ch];
function escape(html, encode) {
  if (encode) {
    if (escapeTest.test(html)) {
      return html.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html)) {
      return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }

  return html;
}

const nonWordAndColonTest = /[^\w:]/g;
const originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
function cleanUrl(sanitize, base, href) {
  if (sanitize) {
    let prot;
    try {
      prot = decodeURIComponent(unescape(href))
        .replace(nonWordAndColonTest, '')
        .toLowerCase();
    } catch (e) {
      return null;
    }
    if (
      prot.indexOf('javascript:') === 0 ||
      prot.indexOf('vbscript:') === 0 ||
      prot.indexOf('data:') === 0
    ) {
      return null;
    }
  }
  if (base && !originIndependentUrl.test(href)) {
    href = resolveUrl(base, href);
  }
  try {
    href = encodeURI(href).replace(/%25/g, '%');
  } catch (e) {
    return null;
  }
  return href;
}

const baseUrls = {};
const justDomain = /^[^:]+:\/*[^/]*$/;
const protocol = /^([^:]+:)[\s\S]*$/;
const domain = /^([^:]+:\/*[^/]*)[\s\S]*$/;
function resolveUrl(base, href) {
  if (!baseUrls[' ' + base]) {
    // we can ignore everything in base after the last slash of its path component,
    // but we might need to add _that_
    // https://tools.ietf.org/html/rfc3986#section-3
    if (justDomain.test(base)) {
      baseUrls[' ' + base] = base + '/';
    } else {
      baseUrls[' ' + base] = rtrim(base, '/', true);
    }
  }
  base = baseUrls[' ' + base];
  const relativeBase = base.indexOf(':') === -1;

  if (href.substring(0, 2) === '//') {
    if (relativeBase) {
      return href;
    }
    return base.replace(protocol, '$1') + href;
  } else if (href.charAt(0) === '/') {
    if (relativeBase) {
      return href;
    }
    return base.replace(domain, '$1') + href;
  } else {
    return base + href;
  }
}

function rtrim(str, c, invert) {
  const l = str.length;
  if (l === 0) {
    return '';
  }

  // Length of suffix matching the invert condition.
  let suffLen = 0;

  // Step left until we fail to match the invert condition.
  while (suffLen < l) {
    const currChar = str.charAt(l - suffLen - 1);
    if (currChar === c && !invert) {
      suffLen++;
    } else if (currChar !== c && invert) {
      suffLen++;
    } else {
      break;
    }
  }

  return str.substr(0, l - suffLen);
}

class CustomRenderer extends marked.Renderer {
  link(href, title, text) {
    if (href !== null) {
      href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    }
    if (href === null) {
      return text;
    }
    let out = '<a href="' + escape(href) + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += ' target="_blank">' + text + '</a>';
    return out;
  }
}

const markdownRenderer = new CustomRenderer();

function renderMarkdown(source) {
  return marked(source, {
    gfm: true,
    renderer: markdownRenderer
  });
}

function transformMacros(context) {
  function transformTrim(node) {
    const source = node.arguments[0].text;

    return ts.factory.createStringLiteral(source.trim(), true);
  }

  function transformMarkdown(node) {
    const source = node.arguments[0].text;

    const html = renderMarkdown(source.trim());

    return ts.factory.createStringLiteral(html, true);
  }

  return (sourceFile) => {
    function visitor(node) {
      if (node.kind !== ts.SyntaxKind.CallExpression) {
        return ts.visitEachChild(node, visitor, context);
      }

      if (node.expression.text === '$$trim$$') {
        return transformMarkdown(node);
      }

      if (node.expression.text === '$$markdown$$') {
        return transformMarkdown(node);
      }

      return node;
    }

    return ts.visitEachChild(sourceFile, visitor, context);
  };
}

module.exports.transformMacros = transformMacros;
