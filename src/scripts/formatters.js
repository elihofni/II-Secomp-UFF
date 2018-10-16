export function uppercaseFirstLetter(text = '') {
  return text.trim()[0].toUpperCase() + text.trim().substring(1);
}

export function uppercase(text = '') {
  return text.trim().toUpperCase();
}

export function lowercase(text = '') {
  return text.trim().toLowerCase();
}

/**
 * Converte o texto para slug
 * ex: 'II Semana de Computação UFF' => 'ii-semana-de-computacao-uff'
 * @param {String} string Texto a ser convertido
 * @returns {string|*}
 */
export function slugify(string = '') {
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
