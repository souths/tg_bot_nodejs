const {
  Telegraf
} = require('telegraf')
const tg_bot_token = process.env.TG_BOT_TOKEN
const tg_user_id = process.env.TG_USER_ID
Date.prototype.Format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'S+': this.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(String(o[k]).length)));
    }
  }
  return fmt;
};

function main(params) {
  if(tg_bot_token&&tg_user_id){
    const bot = new Telegraf(tg_bot_token)
    bot.start((ctx) => ctx.reply('Welcome'))
    bot.help((ctx) => ctx.reply('Send me a sticker 机器人bot'))
    bot.on('sticker', (ctx) => ctx.reply('👍'))
    bot.hears('hi', (ctx) => ctx.reply('Hey there'))
    bot.hears('time', (ctx) => ctx.reply(new Date().Format('yyyy-MM-dd HH:mm:ss')))
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