/**
 * @param {string} text Texto
 * @return {*}
 */
export function uppercaseFirstLetter(text) {
  if (text.trim().length) {
    return text.trim()[0].toUpperCase() + text.trim().substring(1);
  }

  return null;
}

/**
 * @param {string} text Texto
 * @return {*}
 */
export function uppercase(text) {
  if (text.trim().length) {
    return text.trim().toUpperCase();
  }

  return null;
}

/**
 * @param {string} text Texto
 * @return {*}
 */
export function lowercase(text) {
  if (text.trim().length) {
    return text.trim().toLowerCase();
  }

  return null;
}

/**
 * Converte o texto para slug
 * ex: 'Alocação de Aulas' => 'alocacao-de-aulas'
 * @param {String} string String to convert to slug
 * @returns {string|*}
 */
export function slugify(string) {
  let str = string.replace(/^\s+|\s+$/g, '').toLowerCase();

  const from = 'àáäâãèéëêìíïîõòóöôùúüûñç·/_,:;';
  const to = 'aaaaaeeeeiiiiooooouuuunc------';

  for (let i = 0, l = from.length; i < l; i += 1) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  return str;
}
