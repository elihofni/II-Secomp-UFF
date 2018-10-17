const FORWARD = 1;
const BACKWARD = -1;

let currentFrame;
let totalFrames;

export default class Goalpost {
  static init() {
    currentFrame = 0;
    totalFrames = $('.penalty-shadow-wrapper').length - 1;

    // Ativa o primeiro placar e sombra
    $('.gamescores > .gamescore-wrapper:first-child').addClass('gamescore-wrapper--active');
    $('.penalty-shadows > .penalty-shadow-wrapper:first-child').addClass('penalty-shadow-wrapper--active');

    // Inicializa os cliques de navegação
    $('.penalties-shadow-nav.penalties-shadow-nav--left').on('click', () => this.navToPenalty(currentFrame, BACKWARD));
    $('.penalties-shadow-nav.penalties-shadow-nav--right').on('click', () => this.navToPenalty(currentFrame, FORWARD));
  }

  static navToPenalty(frame, direction) {
    const isForwardingToNull = (frame === totalFrames && direction === FORWARD);
    const isBackwardingToNull = (frame === 1 && direction === BACKWARD);

    if (!isBackwardingToNull && !isForwardingToNull) {
      // Atualiza a sombra
      $('.penalty-shadow-wrapper.penalty-shadow-wrapper--active').removeClass('penalty-shadow-wrapper--active');
      $(`#penalty-shadow-wrapper--${frame + direction}`).addClass('penalty-shadow-wrapper--active');

      // Atualiza o placar
      $('.gamescore-wrapper.gamescore-wrapper--active').removeClass('gamescore-wrapper--active');
      $(`#gamescore-wrapper--${frame + direction}`).addClass('gamescore-wrapper--active');

      currentFrame = frame + direction;
    }
  }
}
