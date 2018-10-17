import '../styles/main.scss';
import user from './../data/user.json';
import Goalpost from './../partials/sections/02-goalpost/goalpost';

(($) => {
  $(document).ready(() => {
    Goalpost.init();

    console.log(`%cDesenvolvido por ${user.name}`, 'background: #222; color: #bada55'); // eslint-disable-line
  });
})(jQuery);

/* istanbul ignore if */
if (module.hot) {
  module.hot.accept();
}
