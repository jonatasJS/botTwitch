// Pega algumas configuraões do index.js;
const chat = require('../server');

// Separa as informaçoes obtidas do index.js;
const bot = chat.bot;
const channel = chat.channel;
const tag = chat.tag;

// Váriavel que contem todos os comandos e as açoes dos mesmos;
const commands = {
  // Configs do meu Notebook;
  pc() {
    bot.say(channel, `/me Olá @${tag['display-name']} acesse: https://gist.github.com/sozinhoL/fe2602767f6b6cf2777a5fde937ee1c8`);
  },
  comandos() {
    bot.say(channel, `/me @${tag['display-name']} Eles são: !pc, !comandos ou !cmds`);
  },
  cmds() {
    bot.say(channel, `/me @${tag['display-name']} Eles são: !pc, !comandos ou !cmds`);
  }
}

// Exporta os comandos para serem usados no index.js;
module.exports = commands; 