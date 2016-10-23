'use strict';

const pluralize = require('pluralize');
const numberConverter = require('number-to-words');

class ItemFormatter {
  static formatDebugItem(item, count) {
    const countText = count === 1 ? '' : ` x ${count}`;
    return `${item.name}(${item.id})${countText}`;
  }

  static formatListItem(item, count) {
    const countText = count === 1 ? '' : ` (${count})`;
    let itemName = item.name;
    if (item.suffix) {
      itemName = `${itemName} ${item.suffix}`;
    }

    return `${itemName}${countText}`;
  }

  static formatProseItem(item, count) {
    let itemName = pluralize(item.name, count);
    if (item.suffix) {
      itemName = `${itemName} ${item.suffix}`;
    }
    const numberOrArticle = getNumberArticle(item.name, item.isProperNoun, count);

    return `${numberOrArticle}${itemName}`;
  }
}

function getNumberArticle(name, isProperName, count) {
  if (count !== 1) {
    return `${numberConverter.toWords(count)} `;
  }

  if (isProperName) {
    return '';
  }

  return /^[aeiou]/i.test(name) ? 'an ' : 'a ';
}

module.exports = ItemFormatter;
