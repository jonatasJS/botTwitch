// importa modulo "tni.js" para a variavel "tmi";
const tmi = require('tmi.js');
// Quarda as configurações dos comandos;
const config = require('./config/config.js');
// Cria nosso bot com suas configurações e login;
const bot = new tmi.Client({
  options: { debug: true },
  connection: {
    cluster: 'aws',
    reconnect: true,
    secure: true
  },
  // Indentificação;
  identity: {
    // Nome do bot;
    username: config.userName,
    // Senha/Oauth de uma conta SÓ para o bot;
    password: config.token
  },
  // Canais em que ele possui acesso;
  channels: config.channels
});

// Execultar oc comandos;
bot.on('chat', (channel, tag, message, self) => {
  // Verifica o prefixo;
  if(self || !message.startsWith(config.prefix) || tag['display-name'] === 'wallker_l') return;
  // verifica os argumentos e remove espaços;
  const args = message.slice(1).split(' ');
  // Converte os comandos para letra menuscula para melhor eficiência do script;
  const command = args.shift().toLowerCase();
  
  // Exporta algumas váriaveis para o "./components/commands.js" poder funcionar corretamente;
  const chat = {
    bot,
    channel,
    tag
  }
  module.exports = chat;

  // Importa o coponente comando de "./components/commands.js";
  const acceptedCommands = require('./components/commands');
  // Quarda o valor correto de qual comando foi solicitado ao coponente;
  const execultedCommand = acceptedCommands[command];
  
  // Verifica se o comando existe;
  if(execultedCommand){
    // Execulta o comando;
    execultedCommand();
  }

  return
});

bot.on('resub', (channel, tag, months, message, userstate, methods) => {
  const resub = {
    channel,
    tag,
    months,
    message,
    userstate,
    methods
  }

  module.exports = resub;

});

bot.on('followersonly', (channel, enabled, length) => {
  console.log(`enabled: ${enabled}, lenght: ${length}`);
  bot.say(channel, `enabled: ${enabled}, lenght: ${length}`);
});

bot.on('subgift', (channel, tag, streakMonths, recipient, methods, userstate) => {
  subGiftHandler(channel, tag, streakMonths, recipient, methods, userstate)
})

bot.on('hosted', (channel, tag, viewers, autohost) => {
  onHostedHandler(channel, tag, viewers, autohost)
})

bot.on('subscription', (channel, tag, method, message, userstate) => {
  onSubscriptionHandler(channel, tag, method, message, userstate)
})

bot.on('raided', (channel, tag, viewers) => {
  onRaidedHandler(channel, tag, viewers)
})

bot.on('cheer', (channel, userstate, message) => {
  onCheerHandler(channel, userstate, message)
})

bot.on('giftpaidupgrade', (channel, tag, sender, userstate) => {
  onGiftPaidUpgradeHandler(channel, tag, sender, userstate)
})

bot.on('hosting', (channel, target, viewers) => {
  onHostingHandler(channel, target, viewers)
})

// Conecta/Liga o bot;
bot.connect().catch(console.error);
