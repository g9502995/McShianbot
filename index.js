const windowsg = require('prismarine-windows')('1.16.4');
const Item = require('prismarine-item')('1.16.4');
const express = require('express');
const linebot = require('linebot');
const localtunnel = require('localtunnel');
const config = require(`${process.cwd()}/config.json`);
const mineflayer = require("mineflayer");
const autoeat = require("mineflayer-auto-eat");
const { pathfinder, Movements, goals: { GoalNear } } = require('mineflayer-pathfinder');
const RANGE_GOAL = 1 // get within this radius of the player
const inv = windowsg.createWindow(1, 'minecraft:inventory', 'inv', 36);
const sd = require('silly-datetime');
const fs = require("fs");
const { clear } = require('console');
let game=true;
const app = express();
      
        // 用於辨識Line Channel的資訊
        var bots = linebot({
          channelId: '1656126046',
          channelSecret: '87e82955950bf2a61a69880f92a051ab',
          channelAccessToken: 'ah3xyDDg+mu8Lb9zOE5GDXq4H1hfz+UbG59jl3YsMlBaJln+We/NX9jgqKrD6IVDEsxE8TC83R5Z1+LN4oq/WpHDwDgL1EpJYM7k1oUAZJGBIORSLuFXrY22hcEdYZ2NZ/29IOf/6yevrcoQw6jr1gdB04t89/1O/w1cDnyilFU='
        });


let time1 = sd.format(new Date(), 'YYYY-MM-DD HH-mm-ss');

let loginOpts = {  //登入資訊
    host: config.ip,  //伺服器ip
    port: config.port,  //伺服器port(預設25565)
    username: config.username,  //Minecraft帳號
    password: config.password,  //Minecraft密碼
    version: false,  //bot的Minecraft版本
    auth: config.auth //登入驗證器使用mojang或者microsoft
}

var myDate = new Date();
var firsttime = myDate.getTime();
var start = 0;
var end = 0;
start = new Date().getTime();



function connects() {

    const bot = mineflayer.createBot(loginOpts) 

    
    let time2 = sd.format(new Date(), 'YYYY-MM-DD HH-mm-ss');
    
 



  

     console.log(`目前時間:${time2} BOT已上線 開始計時`)



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
                            case "farm":
							
                                 
                            }
                        }else{
                            bot.chat(`/m ${playerid[0]} 你不是管理者`)
                        }
                    }
            })

    
bot.once('spawn', function () { //一直看你看到發寒
    if (config.AutoEat===true) { //如果自動飲食設定為True時，則執行(預設為True)
        require("./commands/AutoEat")(bot, autoeat);
        bot.chat("/m Hiccup543 吃東西測試");
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

bot.on('spawn', () => {

    
        
        
        // 當有人傳送訊息給Bot時
        bots.on('message', function (event) {
          var reload = event.message.text;
          var adminid = "U03c9e418de6030bca6e201ab1ee6a36b"
          var adminid1 = "U4eadaf35a1ec9e69e801b6771f801e26"
          if(adminid === event.source.userId||adminid1===event.source.userId){
            if(reload===`重開`){
              bot.end();
              return;
            }
            if(reload===`智鈞`){
              event.reply(reload);
              return;
            }
            if(reload===`運行時間`){
  
  end = new Date().getTime();
  var date3=end-start; //时间差秒
  //计算天數
  var days=Math.floor(date3/(24*3600*1000))
  
  //计算小時
  var leave1=date3%(24*3600*1000) 
  var hours=Math.floor(leave1/(3600*1000))
  
  //计算分鐘
  var leave2=leave1%(3600*1000)      
  var minutes=Math.floor(leave2/(60*1000))
  
  //計算秒數
  var leave3=leave2%(60*1000) 
  var seconds=Math.round(leave3/1000)
  console.log("目前運行時間" + days + "天" + hours + "時" + minutes + "分" + seconds + "秒");
  
  return;
  
            }
          // event.message.text是使用者傳給bot的訊息
          // 使用event.reply(要回傳的訊息)方法可將訊息回傳給使用者
          
          //console.log(`使用者 ID: ${event.source.userId}`);
          abc(reload,bot)
          
          

        }
        });


      
      if (game!==true) return;
      ooo()
        async function ooo(){
        // Bot所監聽的webhook路徑與port
        bots.listen('/linebot', 3000, function () {
            console.log('[BOT已準備就緒]');
            game=false
        });
        
        const tunnel = await localtunnel({ port: 3000 ,subdomain: "shianbot" });
        game=false
        // the assigned public url for your tunnel
        // i.e. https://abcdefgjhij.localtunnel.me
        tunnel.url;
        console.log(tunnel.url);
        tunnel.on('close', () => {
          // tunnels are closed
        });
        }
    
    
    var ab ='';
    function abc(a,bot) {
     
       bot.chat(a);
    }

   
    
    setInterval(() => {
          
    
  if (bot.inventory.findInventoryItem('baked_potato')||bot.inventory.findInventoryItem('cooked_beef')||bot.inventory.findInventoryItem('cooked_porkchop')||bot.inventory.findInventoryItem('cooked_mutton')!==null){
    
  }else{
    bot.chat(`/m Hiccup543  草擬媽我沒食物了拉`)
  }
}, 120000);
if(config.AutoMessage===true){
setInterval(() => {
    let dt = new Date();
    let m = dt.getMinutes();
   let p = m/10
   bot.chat(config.messages)
    // minutes remaining until next 10 minute mark
   if(p === 1.1||p ===2.1||p ===3.1||p ===4.1||p ===5.1||p ===0.1){
    setTimeout(function(){
        bot.chat(config.messages)
    },31000);
    
   }
   
    
}, 15000);
}

  

  
    
    
  const mcData = require('minecraft-data')(bot.version)
  const defaultMove = new Movements(bot, mcData)

  bot.on('chat', (username, message) => {
      
    if (username === bot.username) return
    if (message === '名字'){
        bot.chat(`我叫做智鈞 汪汪 `)
    }
    if (message === '時間'){
        bot.chat(`${countdown()}`)
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
 
    console.log(`[資訊] 客戶端與伺服器斷線 ，5秒後將會自動重新連線...\n@${time1}`)
    
    setTimeout(function () {
        client.destroy();
        connects();
    }, 5000)
    
});

bot.on('kicked', console.log)
bot.on('error', console.log)


}
connects();






 
  
 