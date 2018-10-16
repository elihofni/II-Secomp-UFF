import '../styles/main.scss';
import user from './../data/user.json';

(($) => {
  $(document).ready(() => {
    // TODO inserir chamadas dos componentes aqui

    console.log(`%cDesenvolvido por ${user.name}`, 'background: #222; color: #bada55'); // eslint-disable-line
  });
})(jQuery);

/* istanbul ignore if */
if (module.hot) {
  module.hot.accept();
}
