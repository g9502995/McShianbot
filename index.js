const windowsg = require('prismarine-windows')('1.16.4');
const Item = require('prismarine-item')('1.16.4');
const config = require(`${process.cwd()}/config.json`);
const mineflayer = require("mineflayer");
const autoeat = require("mineflayer-auto-eat");
const { pathfinder, Movements, goals: { GoalNear } } = require('mineflayer-pathfinder');
const RANGE_GOAL = 1 // get within this radius of the player
const inv = windowsg.createWindow(1, 'minecraft:inventory', 'inv', 36);
const sd = require('silly-datetime');
const fs = require("fs");

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


  


//使用驗證緩存
function connects() {
    const bot = mineflayer.createBot(loginOpts) //定義bot為mineflayer類別中的createBot
   
     console.log(`目前時間:${time1} BOT已上線 開始計時`)



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
                            case "start":

                                 
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
if(config.AutoMessage){
setInterval(() => {
    let dt = new Date();
    let m = dt.getMinutes();
   let p = m/10
   
    // minutes remaining until next 10 minute mark
   if(p === 1.1||p ===2.1||p ===3.1||p ===4.3||p ===5.1||p ===0.1){
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
        connects();
    }, 5000)
});

bot.on('kicked', console.log)
bot.on('error', console.log)


}
connects();





 
  
 