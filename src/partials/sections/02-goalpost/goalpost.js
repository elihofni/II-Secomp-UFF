const FORWARD = 1; // eslint-disable-line
const BACKWARD = -1; // eslint-disable-line

let currentFrame;  // eslint-disable-line
let totalFrames; // eslint-disable-line

export default class Goalpost {
  static init() {
    // Inicializa os contadores
    currentFrame = 0;
    totalFrames = $('.penalty-shadow-wrapper').length - 1;

    // TODO Ativar o primeiro placar e sombra
    // TODO Inicializar os cliques de navegação
  }

  static navToFrame(frame, direction) { // eslint-disable-line
    // TODO Verificar se está tentando navegar para além dos limites
    // TODO Atualizar a sombra
    // TODO Atualizar o placar
  }
}
