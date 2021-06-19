
const Discord = require("discord.js");
const windowsg = require('prismarine-windows')('1.16.4');
const Item = require('prismarine-item')('1.16.4');
const config = require(`./config.json`);
const auth = require(`./auth.json`);
const mineflayer = require("mineflayer");
const autoeat = require("mineflayer-auto-eat");
const { pathfinder, Movements, goals: { GoalNear } } = require('mineflayer-pathfinder');
const RANGE_GOAL = 1 // get within this radius of the player
const inv = windowsg.createWindow(1, 'minecraft:inventory', 'inv', 36);
const client = new Discord.Client();
const sd = require('silly-datetime');
const fs = require("fs");
let gginin=true;
let prefix = ".";

var functionIsRunning = false;



let loginOpts = {  //登入資訊
    host: config.ip,  //伺服器ip
    port: config.port,  //伺服器port(預設25565)
    username: config.username,  //Minecraft帳號
    password: config.password,  //Minecraft密碼
    version: false,  //bot的Minecraft版本
    auth: config.auth //登入驗證器使用mojang或者microsoft
}

//使用驗證緩存
function connects() {
    const bot = mineflayer.createBot(loginOpts) //定義bot為mineflayer類別中的createBot
   
    


/*bindEvents(bot);

function bindEvents(bot) {

    bot.on('error', function(err) {
        console.log('Error attempting to reconnect: ' + err.errno + '.');
        if (err.code == undefined) {
            console.log('Invalid credentials OR bot needs to wait because it relogged too quickly.');
            console.log('Will retry to connect in 30 seconds. ');
            setTimeout(relog, 30000);
        }
    });

    bot.on('end', function() {
        console.log("Bot has ended");
        // If set less than 30s you will get an invalid credentials error, which we handle above.
        setTimeout(relog, 30000);  
    });
}

function relog() {
    console.log("Attempting to reconnect...");
    bot = mineflayer.createBot(options);
    bindEvents(bot);
}*/




  

  



client.login(auth["discord-auth"]);

client.on("ready", async =>{
    let channel = client.channels.cache.get("855265085517332497")
    console.log("Bot已正常上線")
    channel.send("Bot已正常上線")

    /*timename=setInterval(hello,10000)
    function hello(){ 
    bot.chat("&4/warp jssd0808試營運！菜鳥抽獎機，1注10000，中獎23000，機率約33.33%(三分之一)"); 
    }*/
    
})



client.on('message', msg => {
    
    let userg = "379186348210520064"
    let userh = "379186888570830850"
    if (msg.author.id !== userg && msg.author.id !== userh) return;
    //前置判斷
    try {
        if (!msg.guild || !msg.member) return; //訊息內不存在guild元素 = 非群組消息(私聊)
        if (!msg.member.user) return; //幫bot值多拉一層，判斷上層物件是否存在
        if (msg.member.user.bot) return; //訊息內bot值為正 = 此消息為bot發送
    } catch (err) {
        return;
    }

    //字串分析
    try {
        const prefix = '!' //前綴符號定義
        let channel = client.channels.cache.get("855265085517332497")
        if (msg.content.substring(0, prefix.length) === prefix) //如果訊息的開頭~前綴字長度的訊息 = 前綴字
        {
            const cmd = msg.content.substring(prefix.length).split(' '); //以空白分割前綴以後的字串

            //功能實作
            
            switch (cmd[0]) {
                case '開機':
                    inject();
                    
                    break;
                    
                case '關機':
                    
                    channel.send('我已關閉');
                    process.exit();
                    break;
                    
                    
                case '重開':
                    bot.end();
                  
                    break;
            }
        }
    } catch (err) {
        console.log('OnMessageError', err);
    }
}
);







const whitelist = (config.whitelist)  //定義白名單
            //自動接受或拒絕/tpa /tpahere
            bot.on("message", async function (jsonMsg) {
                if (jsonMsg.toString().startsWith(`[廢土伺服] :`) &&
                    jsonMsg.toString().toLowerCase().includes(`想要你傳送到 該玩家 的位置!`) ||
                    jsonMsg.toString().toLowerCase().includes(`想要傳送到 你 的位置`)) {
                    let msg = jsonMsg.toString().split(/ +/g);
                    let playerid = msg[2]
                    if (whitelist.includes(playerid)) {
                        bot.chat(`/tok`)
                    } else {
                        bot.chat(`/tno`)
                    }
                }
                if (jsonMsg.toString().startsWith(`[收到私訊`)) { 
                    const msg = (jsonMsg.toString())
                    let dec = msg.split(/ +/g);
                    let lo = dec[2].split(`]`)//
                    let playerid = dec.splice(lo.length)[0].split("]") //取得Minecraft ID
                    let args = msg.slice(10 + playerid[0].length).split(" ") 
                    if (whitelist.includes(`${playerid[0]}`)) {
                        switch (args[0]) {
                            case "about":
                                bot.chat(`/m ${playerid[0]} 此bot由顯智編譯而成，想查看bot相關的教學或想要下載     歡迎加入我的Discord伺服器 (https://discord.gg/R9X7rpfwy4) 點連結即可前往`)
                                break
                            case "reload":
                                bot.chat(`/m ${playerid[0]} bot將於3秒後重新啟動...`);
                                setTimeout(function () {
                                    bot.end();
                                }, 3000)
                                break
                            case "exit":
                                bot.chat(`/m ${playerid[0]} 正在關閉bot中...`)
                                console.log(`5秒後將關閉bot...`)
                                setTimeout(function () {
                                    process.exit()
                                }, 5000)
                                break
                            case "welcome":
                                var interval = setInterval(function(){
                                    bot.chat(`你好 歡迎來到菜鳥賭場`)
                                    const entity = bot.nearestEntity()
                                    if (entity === null || entity.type === 'player'){
                                        clearInterval(interval);
                                    } 
                                }, 10000)
                                break
                                 
                            }
                        }else{
                            bot.chat(`/m ${playerid[0]} 你不是管理者`)
                        }
                    }
            })

            var itemss = [   //不要被丟棄的物品
                'baked_potato',
                '868'
                
            ];

bot.on('chat', (username, message) => {
    if (username==='jssd0808') {
    
    let channel = client.channels.cache.get("855265085517332497")
    
    if(!channel) return;
    channel.send(`${username}:${message}`)
    }

    
})
    
bot.once('spawn', function () { //一直看你看到發寒
    if (config.AutoEat) { //如果自動飲食設定為True時，則執行(預設為True)
        require("./commands/AutoEat")(bot, autoeat);
        bot.chat("吃東西測試");
    } 

    setInterval(() => {
        bot.setControlState('left',true) ; 
        
            
            setTimeout(function () {
                bot.clearControlStates(); 
            }, 1000)
        
    }, 30000);
    setInterval(() => {
      const entity = bot.nearestEntity()
      if (entity !== null) {
        if (entity.type === 'player') {
            
          bot.lookAt(entity.position.offset(0, 1.6, 0))
        } else if (entity.type === 'mob') {
          bot.lookAt(entity.position)
        }
      }
    }, 50)

    

  })

  


 

inv.updateSlot(10, new Item(256, 1))
bot.loadPlugin(pathfinder)

bot.once('spawn', () => {
    setInterval(() => {
          
    
  if (bot.inventory.findInventoryItem('baked_potato')||bot.inventory.findInventoryItem('cooked_beef')||bot.inventory.findInventoryItem('cooked_porkchop')||bot.inventory.findInventoryItem('cooked_mutton')!==null){
    
  }else{
    bot.chat(`/m Hiccup543  草擬媽我沒食物了拉`)
  }
}, 120000);
console.log(inv.items("baked_potato"))

  
    var interval = setInterval(function(){
        bot.chat("$/warp jssd0808 試營運！菜鳥抽獎機，1注10000，中獎23000，機率約33.33%(三分之一)");
        
        
    }, config.timecold)
  const mcData = require('minecraft-data')(bot.version)
  const defaultMove = new Movements(bot, mcData)

  bot.on('chat', (username, message) => {
    if (username === bot.username) return
    if (message === '名字'){
        bot.chat(`我叫做智鈞 汪汪 `)
    }
    if (message !== '過來') return
    const target = bot.players[username]?.entity
    if (!target) {
      bot.chat("I don't see you !")
      return
    }
   
    const { x: playerX, y: playerY, z: playerZ } = target.position
    bot.chat(`是的主人 汪汪 `)
    bot.pathfinder.setMovements(defaultMove)
    bot.pathfinder.setGoal(new GoalNear(playerX, playerY, playerZ, RANGE_GOAL))
   
  })
})



  bot.once('end', () => {
    let time1 = sd.format(new Date(), 'YYYY-MM-DD HH-mm-ss'); //獲得系統時間
    console.log(`[資訊] 客戶端與伺服器斷線 ，5秒後將會自動重新連線...\n@${time1}`)
    setTimeout(function () {
        connects();
    }, 5000)
});

bot.on('kicked', console.log)
bot.on('error', console.log)


}
connects();





 
  
 