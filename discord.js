module.exports = async (client,bot) => {
  client.on('ready', () => {
  console.log(`The discord bot logged in! Username:`);
  channel = client.channels.cache.get("855265085517332497");

  if (!channel) {

    console.log(`怪怪的`);
  }
})

client.on('message', msg => {
  // 如果訊息的內容是 'ping'
  if (msg.content === 'ping') {
      // 則 Bot 回應 'Pong'
      msg.reply('pong');
  }
});
client.login("ODU1MjU4MTY4NzgyMjI1NDA4.YMv3PQ.KBOGlJzgYGsnF-pP3jUflpfGP18");
}
