'use strict';

import pluralize = require('pluralize');
const numberConverter = require('number-to-words');

export class ItemFormatter {
  static formatDebugItem(item: any, count: number) {
    const countText = count === 1 ? '' : ` x ${count}`;
    return `${item.name}(${item.id})${countText}`;
  }

  static formatListItem(item: any, count: number) {
    const countText = count === 1 ? '' : ` (${count})`;
    let itemName = item.name;
    if (item.suffix) {
      itemName = `${itemName} ${item.suffix}`;
    }

    return `${itemName}${countText}`;
  }

  static formatProseItem(item: any, count: number) {
    let itemName = pluralize(item.name, count);
    if (item.suffix) {
      itemName = `${itemName} ${item.suffix}`;
    }
    const numberOrArticle = getNumberArticle(item.name, item.isProperNoun, count);

    return `${numberOrArticle}${itemName}`;
  }
}

function getNumberArticle(name: string, isProperName: boolean, count: number) {
  if (count !== 1) {
    return `${numberConverter.toWords(count)} `;
  }

  if (isProperName) {
    return '';
  }

  return /^[aeiou]/i.test(name) ? 'an ' : 'a ';
}

