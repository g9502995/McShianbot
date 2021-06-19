module.exports = async (bot, autoeat) => {
    bot.loadPlugin(autoeat) // 載入AutoEat插件

    bot.autoEat.options = {
        priority: "foodPoints",
        startAt: 14,
        bannedFood: [],
    }

   

    bot.on("autoeat_started", () => {
        console.log("開始自動飲食!")
    })
  

    bot.on("autoeat_stopped", () => {
        console.log("停止自動飲食!")
    })

    bot.on("health", () => {
        if (bot.food === 20) bot.autoEat.disable() //當飽食度到20時，停止此插件運作
        else bot.autoEat.enable()  //如果沒有達到 就繼續執行此插件
    })
}
