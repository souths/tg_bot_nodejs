const {
  Telegraf
} = require('telegraf')
const tg_bot_token = process.env.TG_BOT_TOKEN
const tg_user_id = process.env.TG_USER_ID


function main(params) {
  if(tg_bot_token&&tg_user_id){
    const bot = new Telegraf(tg_bot_token)
    bot.start((ctx) => ctx.reply('Welcome'))
    bot.help((ctx) => ctx.reply('Send me a sticker 机器人bot'))
    bot.on('sticker', (ctx) => ctx.reply('👍'))
    bot.hears('hi', (ctx) => ctx.reply('Hey there'))
    bot.hears('time', (ctx) => ctx.reply(new Date().Format("yyyy-MM-dd HH:mm:ss")))
    bot.telegram.sendMessage(tg_user_id,'tg bot机器人 nodejs版启用成功')
    bot.on('text', (ctx) => {
      // Explicit usage
      ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`)
    
      // Using context shortcut
      ctx.reply(`欢迎你输入文字 ${ctx.state.role}`)
    })
    bot.launch()
  
    // Enable graceful stop
    process.once('SIGINT', () => bot.stop('SIGINT'))
    process.once('SIGTERM', () => bot.stop('SIGTERM'))
  }else{
    console.log(`tg_bot_token=${tg_bot_token},==,tg_user_id=${tg_user_id}`)
  }

}
try {
  main()
} catch (e) {
  console.log(e)
}