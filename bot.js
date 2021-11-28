
            module.exports = async function s4d(){
                    const Discord = require("discord.js");
                    const Database = require("easy-json-database");
                    const moment = require('moment');
                    const { DB } = require("quickmongo");
		    const canvas = require("discord-canvas")
                    const { MessageEmbed, MessageButton, MessageActionRow, Intents, Permissions, MessageSelectMenu } = require('discord.js')
                    const devMode = typeof __E_IS_DEV !== "undefined" && __E_IS_DEV;
                    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
                    const s4d = {
                        Discord,
                        database: new Database(`${devMode ? S4D_NATIVE_GET_PATH : "."}/db.json`),
                        joiningMember:null,
                        reply:null,
                        tokenInvalid:false,
                        tokenError: null,
                        player:null,
                        client:null,
                        checkMessageExists() {
                            if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
                            if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
                        }
                    };
                    s4d.client = new s4d.Discord.Client({
                        intents: [Object.values(s4d.Discord.Intents.FLAGS).reduce((acc, p) => acc | p, 0)],
                        partials: ["REACTION"]
                    });
                    const { Player,QueueRepeatMode } = require("discord-player")
                    s4d.player = new Player(s4d.client)
                    var arguments2, member_xp, command, member_level, volume, onoff;


await s4d.client.login('OTE0NTQyODYxNDUyNzA5ODg4.YaOkaQ.223N82W_A2xFh8YQouJN6Qywu_M').catch((e) => { s4d.tokenInvalid = true; s4d.tokenError = e.code; });

s4d.client.on('messageReactionAdd', async (reaction,user) => {
  if ((reaction.message.id) == '914552348557320202') {
    (user).roles.add((user).guild.roles.cache.find((role) => role.id === 'PP' || role.name === 'PP' || '@'+role.name === 'PP'));
  }

});

s4d.client.on('messageCreate', async (s4dmessage) => {
  if (!((s4dmessage.author).bot)) {
    member_xp = s4d.database.get(String(('xp-' + String(s4dmessage.author.id))));
    member_level = s4d.database.get(String(('level-' + String(s4dmessage.author.id))));
    if (!member_xp) {
      member_xp = 0;
    } else if (!member_level) {
      member_level = 0;
    }
    s4d.database.set(String(('xp-' + String(s4dmessage.author.id))), (member_xp + 1));
    member_xp = member_xp + 1;
    if (member_xp > 100) {
      s4d.database.set(String(('level-' + String(s4dmessage.author.id))), (member_level + 1));
      member_level = member_level + 1;
      s4dmessage.channel.send({content:String((['Congratulations, ',s4dmessage.author,'you jumped to level ',member_level,'!!'].join('')))});
    }
    if ((s4dmessage.content) == '$level') {
      s4dmessage.channel.send({content:String(([s4dmessage.author,', you are currently level: ',member_level].join('')))});
    } else if ((s4dmessage.content) == '$xp') {
      s4dmessage.channel.send({content:String(([s4dmessage.author,', you need ',100 - member_xp,' to jump to level ',member_level + 1].join('')))});
    }
  }

});

s4d.client.on('messageCreate', async (s4dmessage) => {
  if ((s4dmessage.content) == '$help') {
    (s4dmessage.author).setNickname('Help Needer smh (imagine tho L)');
    s4dmessage.channel.send({content:String('Why the fuck are u asking me for help do i look like a doctor')});
    s4dmessage.channel.send({content:String('But like fr tho say $commands too see commands')});
  }

});

s4d.client.on('messageReactionRemove', async (reaction,user) => {
  if ((reaction.message.id) == '914552348557320202') {
    (user).roles.remove((user).guild.roles.cache.find((role) => role.id === 'PP' || role.name === 'PP' || '@'+role.name === 'PP'));
  }

});

s4d.client.on('messageCreate', async (s4dmessage) => {
  if ((s4dmessage.content) == '$commands') {
    s4dmessage.channel.send({content:String('Commands: $xp, $level, $help, $credits, $play, for music commands say $musichelp')});
  }

});

s4d.client.on('guildMemberAdd', async (param1) => {
s4d.joiningMember = param1;
  (s4d.joiningMember).send(String('Hi, thanks for joining GRAPE$ i hope you have a great time here! (You probably wont smh)'));
s4d.joiningMember = null
});

s4d.client.on('messageCreate', async (s4dmessage) => {
  if ((s4dmessage.content) == '$credits') {
    s4dmessage.channel.send({content:String('Credits: s.#6110 And zitthecowgirl#6035')});
  }

});

s4d.player.on("trackStart", (queue, track) => {
   let embed = new Discord.MessageEmbed()
     embed.setTitle((['now playing ',track.title,'\n','author: ',track.author,'\n','url: ',track.url,'\n','views: ',track.views,'\n','duration: ',track.duration].join('')));
    embed.setImage((track.thumbnail));
    (queue.metadata.channel).send({embeds:[embed]});


})

s4d.client.on('messageCreate', async (s4dmessage) => {
  arguments2 = (s4dmessage.content).split(' ');
  command = arguments2.splice(0, 1)[0];
  if (command == '$play') {
    if ((s4dmessage.member.voice.channelId) == null) {
      s4dmessage.channel.send({content:String('you are not in a voice channel!')});
      return
    }
    if ((s4dmessage.guild.me.voice.channelId) != null && (s4dmessage.member.voice.channelId) != (s4dmessage.guild.me.voice.channelId)) {
      s4dmessage.channel.send({content:String('you are not in my voice channel!')});
      return
    }
    const queue = s4d.player.createQueue((s4dmessage.guild), {metadata: {channel: (s4dmessage.channel)}});
    if (!(queue.connection)) {
      await queue.connect((s4dmessage.member.voice.channel))
      ;}
    queue.play((await s4d.player.search((arguments2.join(' ')), {requestedBy: (s4dmessage.author)}).then(x => x.tracks[0])));
  }
  if (command == '$pause') {
    if ((s4dmessage.member.voice.channel) == null) {
      s4dmessage.channel.send({content:String('Retard Your Not In A Voice Channel')});
      return
    }
    if ((s4dmessage.member.voice.channelId) != (s4dmessage.guild.me.voice.channelId)) {
      s4dmessage.channel.send({content:String('Retard Your Not In A Voice Channel')});
      return
    }
    if (!((s4d.player.getQueue((s4dmessage.guild).id)).playing)) {
      s4dmessage.channel.send({content:String('Theres No Music Playing xoxo')});
      return
    }
    (s4d.player.getQueue((s4dmessage.guild).id)).setPaused(true)
    s4dmessage.channel.send({content:String('paused music')});
  }
  if (command == '$resume') {
    if ((s4dmessage.member.voice.channel) == null) {
      s4dmessage.channel.send({content:String('Retard Your Not In A Voice Channel')});
      return
    }
    if ((s4dmessage.member.voice.channelId) != (s4dmessage.guild.me.voice.channelId)) {
      s4dmessage.channel.send({content:String('Retard Your Not In A Voice Channel')});
      return
    }
    if (!((s4d.player.getQueue((s4dmessage.guild).id)).playing)) {
      s4dmessage.channel.send({content:String('Theres No Music Playing xoxo')});
      return
    }
    (s4d.player.getQueue((s4dmessage.guild).id)).setPaused(false)
    s4dmessage.channel.send({content:String('resumed the music')});
  }
  if (command == '$stop') {
    if ((s4dmessage.member.voice.channel) == null) {
      s4dmessage.channel.send({content:String('Retard Your Not In A Voice Channel')});
      return
    }
    if ((s4dmessage.member.voice.channelId) != (s4dmessage.guild.me.voice.channelId)) {
      s4dmessage.channel.send({content:String('Retard Your Not In A Voice Channel')});
      return
    }
    if (!((s4d.player.getQueue((s4dmessage.guild).id)).playing)) {
      s4dmessage.channel.send({content:String('Theres No Music Playing xoxo')});
      return
    }
    (s4d.player.getQueue((s4dmessage.guild).id)).destroy()
    s4dmessage.channel.send({content:String('I Stopped The Music! Bc Im Pro No Cap')});
  }
  if (command == '$volume') {
    volume = arguments2[0];
    if ((s4dmessage.member.voice.channel) == null) {
      s4dmessage.channel.send({content:String('Retard Your Not In A Voice Channel')});
      return
    }
    if ((s4dmessage.member.voice.channelId) != (s4dmessage.guild.me.voice.channelId)) {
      s4dmessage.channel.send({content:String('Retard Your Not In A Voice Channel')});
      return
    }
    if (!((s4d.player.getQueue((s4dmessage.guild).id)).playing)) {
      s4dmessage.channel.send({content:String('Theres No Music Playing xoxo')});
      return
    }
    if ((Number(volume)) < 0) {
      s4dmessage.channel.send({content:String('the volume need to be more then 0!')});
      return
    }
    if ((Number(volume)) > 100) {
      s4dmessage.channel.send({content:String('the volume need to be less then 100!')});
      return
    }
    (s4d.player.getQueue((s4dmessage.guild).id)).setVolume(volume)
    s4dmessage.channel.send({content:String(('the volume is now ' + String(volume)))});
  }
  if (command == '$skip') {
    if ((s4dmessage.member.voice.channel) == null) {
      s4dmessage.channel.send({content:String('Retard Your Not In A Voice Channel')});
      return
    }
    if ((s4dmessage.member.voice.channelId) != (s4dmessage.guild.me.voice.channelId)) {
      s4dmessage.channel.send({content:String('Retard Your Not In A Voice Channel')});
      return
    }
    if (!((s4d.player.getQueue((s4dmessage.guild).id)).playing)) {
      s4dmessage.channel.send({content:String('Theres No Music Playing xoxo')});
      return
    }
    (s4d.player.getQueue((s4dmessage.guild).id)).skip()
    s4dmessage.channel.send({content:String(('skipped music ' + String((s4d.player.getQueue((s4dmessage.guild).id)).current)))});
  }
  if (command == '$loop') {
    onoff = arguments2[0];
    if (onoff == 'on') {
      if ((s4dmessage.member.voice.channel) == null) {
        s4dmessage.channel.send({content:String('Retard Your Not In A Voice Channel')});
        return
      }
      if ((s4dmessage.member.voice.channelId) != (s4dmessage.guild.me.voice.channelId)) {
        s4dmessage.channel.send({content:String('Retard Your Not In A Voice Channel')});
        return
      }
      if (!((s4d.player.getQueue((s4dmessage.guild).id)).playing)) {
        s4dmessage.channel.send({content:String('Theres No Music Playing xoxo')});
        return
      }
      (s4d.player.getQueue((s4dmessage.guild).id)).setRepeatMode(QueueRepeatMode.QUEUE)
      s4dmessage.channel.send({content:String('loop on')});
    } else if (onoff == 'off') {
      if ((s4dmessage.member.voice.channel) == null) {
        s4dmessage.channel.send({content:String('Retard Your Not In A Voice Channel')});
        return
      }
      if ((s4dmessage.member.voice.channelId) != (s4dmessage.guild.me.voice.channelId)) {
        s4dmessage.channel.send({content:String('Retard Your Not In A Voice Channel')});
        return
      }
      if (!((s4d.player.getQueue((s4dmessage.guild).id)).playing)) {
        s4dmessage.channel.send({content:String('Theres No Music Playing xoxo')});
        return
      }
      (s4d.player.getQueue((s4dmessage.guild).id)).setRepeatMode(QueueRepeatMode.OFF)
      s4dmessage.channel.send({content:String('loop off')});
    } else {
      s4dmessage.channel.send({content:String('you need to send $loop on/off')});
    }
  }
  if (command == '$back') {
    if ((s4dmessage.member.voice.channel) == null) {
      s4dmessage.channel.send({content:String('Retard Your Not In A Voice Channel')});
      return
    }
    if ((s4dmessage.member.voice.channelId) != (s4dmessage.guild.me.voice.channelId)) {
      s4dmessage.channel.send({content:String('Retard Your Not In A Voice Channel')});
      return
    }
    if (!((s4d.player.getQueue((s4dmessage.guild).id)).playing)) {
      s4dmessage.channel.send({content:String('Theres No Music Playing xoxo')});
      return
    }
    (s4d.player.getQueue((s4dmessage.guild).id)).back()
    s4dmessage.channel.send({content:String('Playing Previous Music <3')});
  }

});

s4d.player.on("trackAdd", (queue, track) => {
   (queue.metadata.channel).send({ content: String((['music ',track.title,'Added To Queue Ig Smh'].join('')))});

})

s4d.player.on("queueEnd", (queue) => {
   (queue.metadata.channel).send({ content: String('Queue Finished Add More Music Retards')});

})

s4d.client.on('messageCreate', async (s4dmessage) => {
  if ((s4dmessage.content) == '$musichelp') {
    s4dmessage.channel.send({content:String('Commands: $play, $pause, $resume, $stop, $volume, $skip, $loop (on/off), $back')});
  }

});

                    return s4d;
                    }
            