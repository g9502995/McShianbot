module.exports = async (linebot,bot) => {
 
 

  // 用於辨識Line Channel的資訊
  var bots = linebot({
    channelId: '1656126046',
    channelSecret: '87e82955950bf2a61a69880f92a051ab',
    channelAccessToken: 'ah3xyDDg+mu8Lb9zOE5GDXq4H1hfz+UbG59jl3YsMlBaJln+We/NX9jgqKrD6IVDEsxE8TC83R5Z1+LN4oq/WpHDwDgL1EpJYM7k1oUAZJGBIORSLuFXrY22hcEdYZ2NZ/29IOf/6yevrcoQw6jr1gdB04t89/1O/w1cDnyilFU='
  });
  
  // 當有人傳送訊息給Bot時
  bots.on('message', function (event) {
    var adminid = "U03c9e418de6030bca6e201ab1ee6a36b"
    var adminid1 = "U4eadaf35a1ec9e69e801b6771f801e26"
    if(adminid === event.source.userId||adminid1===event.source.userId){
    // event.message.text是使用者傳給bot的訊息
    // 使用event.reply(要回傳的訊息)方法可將訊息回傳給使用者
    var reload = event.message.text;
    console.log(`使用者 ID: ${event.source.userId}`);
    bot.chat(event.message.text);
    if(reload===`重開`){
      bot.end();
    }
  }
  });
  
  // Bot所監聽的webhook路徑與port
  bots.listen('/linewebhook', 3000, function () {
      console.log('[BOT已準備就緒]');
  });

};



