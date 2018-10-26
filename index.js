const Discord = require ("discord.js")
const fs = require("fs")
var client = new Discord.Client();
var prefix = ('tp!')

client.on("ready", ()  => {
    client.user.setActivity("tp!help | TP®『🚫』| " + client.guilds.size + " servs", {type:"STREAMING"})
console.log('TeamProtectBot\'s est maintenant connecté');
})

client.on('message', message => {
if(message.content === prefix + "help"){
if(message.channel.type !== 'text') return message.channel.send("***:x: Les commandes en mp sont désactivé !***")
var embed = new Discord.RichEmbed()
.setColor("RANDOM")
.setTitle("Voici la page d'aide")
.addField("🚔 Modération", "`tp!clear` `tp!sondage`")
.addField("🚨 Administration", "`tp!ban` `tp!kick`")
.addField("🎉 Fun", "`tp!ping` `tp!lien` `tp!si` `tp!pdp` `tp!sayembed` `tp!say`")
.setFooter(`Help demandé par ${message.author.username} ( pour avoir des info sur une commande exemple : tp!help ban )`)
message.author.send(embed)
message.reply("Commande help envoyé en mp ;)")
}
})


client.on('message', message => {
if(message.content.startsWith(prefix +"bl")){
if(message.channel.type !== 'text') return message.channel.send("***:x: Les commandes en mp sont désactivé !***")
if(message.author.id !== "421096405914877952") return message.channel.send(" Tu n'a pas les permission pour blacklist")
let bc = JSON.parse(fs.readFileSync("./bc.json", "utf8"));
let msgsub = message.content.substr(6)
bc[msgsub] = {"bc" : msgsub}
fs.writeFile("./bc.json", JSON.stringify(bc), (err) => 
{if (err) console.error(err);});
message.channel.send(`\`\`\`Cet id a bien ete ajouter dans la blacklist [ ${msgsub} ]\`\`\``)
client.channels.find("id", "503558414522384394").send(`\`\`\`Un Utilisateur a blacklist une personne : ${message.author.username}\`\`\` \`\`\`Il a Blacklist : <@${msgsub}> ( ${msgsub} ) \`\`\` \`\`\`Depuis : ${message.guild.name}\`\`\``)
 }
 })


client.on("guildMemberAdd", mem => {
let bc = JSON.parse(fs.readFileSync("./bc.json", "utf8"));
if(bc[mem.id]){
mem.ban()
mem.guild.owner.createDM().then(chan => chan.send("**❌ Bonjour, " + mem.author.username + " à été banni de votre serveur car il se trouve dans la blacklist !**"))
}
})

client.on('message', message => {
if(message.content.startsWith(prefix + "clear")){
if(message.channel.type !== 'text') return message.channel.send("***:x: Les commandes en mp sont désactivé !***")
if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission pour clear !");
let args = message.content.split(" ").slice(1);
if(!args[0]) return message.channel.send("Tu doit préciser un nombre a suprimer !")
message.channel.bulkDelete(args[0]).then(() => {
message.channel.send(`${args[0]} message on été supprimer ! 🗑 `);
})
 }

})

client.on('message', message => {
if(message.content.startsWith(prefix + "kick")) {
if (!message.guild) {
     if (message.author.bot) return;
     message.channel.send("***❌ Les commandes en MP sont désactivées !***")
return
}
if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("Vous n'avez pas la permissions !");                                                                if(message.mentions.users.size === 0) {
return message.channel.send("Vous devez mentionner un utilistaur")}                                                                               var kick = message.guild.member(message.mentions.users.first());
if(!kick) {
return message.channel.send("Je ne sais pas si l'utilisateur existe :/")
}
if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) { 
return message.channel.send("Je n'ai pas la permission pour kick");
}

kick.kick().then(member => {
message.channel.send(`\`\`\`Utilisateur kick : ${member.user.username}\`\`\` \`\`\`Utilisateur qui a kick : ${message.author.username}\`\`\``)
})
}
})

client.on('message', message => {
if(message.content.startsWith(prefix + "ar")) {
if(message.channel.type !== 'text') return message.channel.send("***:x: Les commandes en mp sont désactivé !***")
if(message.author.id !== "421096405914877952") return message.channel.send("Tu n'a pas les perms")
let arm = JSON.parse(fs.readFileSync("./antiraidmember.json", "utf8"));
let msgsub = message.content.substr(6)
arm[msgsub] = {"antiraidmember" : msgsub}
fs.writeFile("./antiraidmember.json", JSON.stringify(arm), (err) => {
	if (err) console.error(err);});
message.channel.send(`\`\`\`Cet Id a bien ete ajouter en tant que Anti-raid [${msgsub}]\`\`\``)

}
})

client.on('message', message => {
if(message.content.startsWith(prefix + "cheek-ar")) {
if(message.channel.type !== 'text') return message.channel.send("***:x: Les commandes en mp sont désactivé !***")
let msgsub = message.content.substr(12)
let bc = JSON.parse(fs.readFileSync("./antiraidmember.json", "utf8"))

if(bc[msgsub]){
	message.channel.send(`✅ Cet id fait parti de l'anti raid [ ${msgsub} ]`)
}else{
	message.channel.send(`❌ Cet id ne fait pas parti de l'anti raid [ ${msgsub} ]`)
}
}
})

client.on('message', message => {
	if(message.content.startsWith(prefix + "id")) {
if(message.channel.type !== 'text') return message.channel.send("***:x: Les commandes en mp sont désactivé !***")
let msgsub = message.content.substr(6)
let bc = JSON.parse(fs.readFileSync("./bc.json", "utf8"))
		var embed = new Discord.RichEmbed()
.setColor("#00001")
.addField(`Id BlackList TeamProtect's ❌`, `[ ${msgsub} ]`)
.setFooter(`Demande faite par : ${message.author.username}`)
.setThumbnail(message.author.avatarURL)
if(bc[msgsub]){
message.channel.send(embed)
}else{
message.channel.send(`\`\`\`Cet id n'est pas BlackList [ ${msgsub} ]\`\`\``)
}
}
})

client.on('message', message => {
if(message.content.startsWith(prefix + "ubl")) {
if(message.channel.type !== 'text') return message.channel.send("***:x: Les commandes en mp sont désactivé !***")
if(message.author.id !== "421096405914877952") return ("Tu n'a pas les permissions !")
	let bc = JSON.parse(fs.readFileSync("./bc.json", "utf8"));
	var msgsub = message.content.substr(7)
delete bc[msgsub] 
fs.writeFile("./bc.json", JSON.stringify(bc), (err) => {if (err) console.error(err);});
		message.channel.send(`\`\`\`Cet id a bien ete retirer de la BlackList [ ${msgsub} ]\`\`\``)
	}
});

client.on('message', message => {
if(message.content.startsWith(prefix + "uar")) {
if(message.channel.type !== 'text') return message.channel.send("***:x: Les commandes en mp sont désactivé !***")
if(message.author.id !== "421096405914877952") return ("Tu n'a pas les permissions !")
	let bc = JSON.parse(fs.readFileSync("./antiraidmember.json", "utf8"));
	var msgsub = message.content.substr(7)
delete bc[msgsub] 
fs.writeFile("./antiraidmember.json", JSON.stringify(bc), (err) => {if (err) console.error(err);});
		message.channel.send(`Cet id a bien ete retirer de L'anti-Raid [ ${msgsub} ]`)
	}
});

client.on('message', message => {
if(message.content === prefix + "help bl"){
message.channel.send("Cette commande est faite pour Blacklist une id !")
message.delete(message.content)
}
if(message.content === prefix + "help ubl"){
message.channel.send("Cette commande est faite pour UnBlacklist une id !")
message.delete(message.content)
}
if(message.content === prefix + "help id"){
message.delete(message.content)
message.channel.send("Cette commande est faite pour cheek une id si il est Blacklist ou pas !")
}
if(message.content === prefix + "help cheek-ar"){
message.delete(message.content)
message.channel.send("Cette commande est faite pour cheek si une id fait parti de l'anti raid")
}
if(message.content === prefix + "help uar"){
message.delete(message.content)
message.channel.send("Cette commande est faite pour retiré une id de L'anti raid")
}
if(message.content === prefix + "help ar"){
message.delete(message.content)
message.channel.send("Cette commande est faite pour ajouter quelqu'un dans L'anti raid")
}
if(message.content === prefix + "help clear"){
message.delete(message.content)
message.channel.send("Cette commande est faite pour supprimer une quantité de message limité par vous !")
}
if(message.content === prefix + "help kick"){
message.delete(message.content)
message.channel.send("Cette commande est faite pour expulser un membre de votre serveur !")
}
if(message.content === prefix + "help ban"){
message.delete(message.content)
message.channel.send("Cette commande est faite pour Bannir un membre de votre serveur !")
}

})

client.on('message', message => {
if(message.content.startsWith(prefix +"gban")){
if(message.author.id !== "371193829895962626") return message.channel.send(" Tu n'a pas les permission pour blacklist")
let bc = JSON.parse(fs.readFileSync("./bc.json", "utf8"));
let msgsub = message.content.substr(8)
bc[msgsub] = {"bc" : msgsub}
fs.writeFile("./bc.json", JSON.stringify(bc), (err) => 
{if (err) console.error(err);});
message.channel.send(`\`\`\`Cet id a bien ete ajouter dans la blacklist [ ${msgsub} ]\`\`\``)
client.channels.find("id", "503558414522384394").send(`\`\`\`Un Utilisateur a blacklist une personne : ${message.author.username}\`\`\` \`\`\` Il a Blacklist : <@${msgsub}> ( ${msgsub} )\`\`\` \`\`\`Depuis : ${message.guild.name}\`\`\``)
 }
 })

client.on("message", message => {
    if(message.content === "tp!ping"){
    	  if(message.channel.type !== 'text') return message.channel.send("***:x: Les commandes en mp sont désactivé !***")
        var help2_embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .addField("Pong :ping_pong:", "**L'API** discord a pris " + Math.round(client.ping) + " ms pour répondre");
        message.channel.send(help2_embed)
        message.delete(message.content)
    }
})

client.on('message', message => {
	if(message.content === prefix + "aidebc") {
if(message.channel.type !== 'text') return message.channel.send("***:x: Les commandes en mp sont désactivé !***")
		var embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setTitle("Commande de BlackList")
		.addField(":gear:", "`tp!id` `tp!cheek-ar` `tp!uar` `tp!ar`")
		message.author.send(embed)
		message.channel.send("Commande BlackList envoyé en mp ;)")
		}
		})
		
		client.on('message', message => {
if(message.content.startsWith(prefix +"bban")){
if(message.channel.type !== 'text') return message.channel.send("***:x: Les commandes en mp sont désactivé !***")
if(message.author.id !== "462651745600929793") return message.channel.send(" Tu n'a pas les permission pour blacklist")
let bc = JSON.parse(fs.readFileSync("./bc.json", "utf8"));
let msgsub = message.content.substr(8)
bc[msgsub] = {"bc" : msgsub}
fs.writeFile("./bc.json", JSON.stringify(bc), (err) => 
{if (err) console.error(err);});
message.channel.send(`\`\`\`Cet id a bien ete ajouter dans la blacklist [ ${msgsub} ]\`\`\``)
client.channels.find("id", "503558414522384394").send(`\`\`\`Un Utilisateur a blacklist une personne : ${message.author.username}\`\`\` \`\`\` Il a Blacklist : <@${msgsub}> ( ${msgsub} )\`\`\` \`\`\`Depuis : ${message.guild.name}\`\`\``)
 }
 })
 
 client.on('message', message => {
if(message.content.startsWith(prefix +"oxi")){
if(message.channel.type !== 'text') return message.channel.send("***:x: Les commandes en mp sont désactivé !***")
if(message.author.id !== "422353090667347968") return message.channel.send(" Tu n'a pas les permission pour blacklist")
let bc = JSON.parse(fs.readFileSync("./bc.json", "utf8"));
let msgsub = message.content.substr(7)
bc[msgsub] = {"bc" : msgsub}
fs.writeFile("./bc.json", JSON.stringify(bc), (err) => 
{if (err) console.error(err);});
message.channel.send(`\`\`\`Cet id a bien ete ajouter dans la blacklist [ ${msgsub} ]\`\`\``)
client.channels.find("id", "503558414522384394").send(`\`\`\`Un Utilisateur a blacklist une personne : ${message.author.username}\`\`\` \`\`\` Il a Blacklist : <@${msgsub}> ( ${msgsub} )\`\`\` \`\`\`Depuis : ${message.guild.name}\`\`\``)
 }
 })
 
 client.on('message', message => {
if(message.content.startsWith(prefix +"wbl")){
if (!message.guild) {
     if (message.author.bot) return;
     message.channel.send("***❌ Les commandes en MP sont désactivées !***")
return
}
if(message.author.id !== "411215708320563210") return message.channel.send(" Tu n'a pas les permission pour blacklist")
let bc = JSON.parse(fs.readFileSync("./bc.json", "utf8"));
let msgsub = message.content.substr(7)
bc[msgsub] = {"bc" : msgsub}
fs.writeFile("./bc.json", JSON.stringify(bc), (err) => 
{if (err) console.error(err);});
message.channel.send(`\`\`\`Cet id a bien ete ajouter dans la blacklist [ ${msgsub} ]\`\`\``)
client.channels.find("id", "503558414522384394").send(`\`\`\`Un Utilisateur a blacklist une personne : ${message.author.username}\`\`\` \`\`\` Il a Blacklist : <@${msgsub}> ( ${msgsub} )\`\`\` \`\`\`Depuis : ${message.guild.name}\`\`\``)
 }
 })
 
 client.on('message', message => {
if(message.content.startsWith(prefix +"all")){
if (!message.guild) {
     if (message.author.bot) return;
     message.channel.send("***❌ Les commandes en MP sont désactivées !***")
return
}
if(message.author.id !== "490220102650953729") return message.channel.send(" Tu n'a pas les permission pour blacklist")
let bc = JSON.parse(fs.readFileSync("./bc.json", "utf8"));
let msgsub = message.content.substr(7)
bc[msgsub] = {"bc" : msgsub}
fs.writeFile("./bc.json", JSON.stringify(bc), (err) => 
{if (err) console.error(err);});
message.channel.send(`\`\`\`Cet id a bien ete ajouter dans la blacklist [ ${msgsub} ]\`\`\``)
client.channels.find("id", "503558414522384394").send(`\`\`\`Un Utilisateur a blacklist une personne : ${message.author.username}\`\`\` \`\`\` Il a Blacklist : <@${msgsub}> ( ${msgsub} )\`\`\` \`\`\`Depuis : ${message.guild.name}\`\`\``)
 }
 })
 
 client.on('message', message => {
if(message.content.startsWith(prefix +"rb")){
if (!message.guild) {
     if (message.author.bot) return;
     message.channel.send("***❌ Les commandes en MP sont désactivées !***")
return
}
if(message.author.id !== "370593040706043905") return message.channel.send(" Tu n'a pas les permission pour blacklist")
let bc = JSON.parse(fs.readFileSync("./bc.json", "utf8"));
let msgsub = message.content.substr(6)
bc[msgsub] = {"bc" : msgsub}
fs.writeFile("./bc.json", JSON.stringify(bc), (err) => 
{if (err) console.error(err);});
message.channel.send(`\`\`\`Cet id a bien ete ajouter dans la blacklist [ ${msgsub} ]\`\`\``)
client.channels.find("id", "503558414522384394").send(`\`\`\`Un Utilisateur a blacklist une personne : ${message.author.username}\`\`\` \`\`\` Il a Blacklist : <@${msgsub}> ( ${msgsub} )\`\`\` \`\`\`Depuis : ${message.guild.name}\`\`\``)
 }
 })
 
 client.on('message', message => {
if(message.content === prefix + "lien") {
var embed = new Discord.RichEmbed()
.setColor("RANDOM")
.addField(" Lien d'invitation :", "https://discordapp.com/oauth2/authorize?client_id=500764046048493578&scope=bot&permissions=8")
.addField(" Lien pour rejoindre le Support :", "https://discord.gg/7xwf6E7")
.setFooter("#TeamProtect 🚀")
message.channel.send(embed)
}
})

client.on('message', message => {
if(message.content.startsWith(prefix + "ugban")) {
if (!message.guild) {
     if (message.author.bot) return;
     message.channel.send("***❌ Les commandes en MP sont désactivées !***")
return
}
if(message.author.id !== "371193829895962626") return message.channel.send("Tu n'a pas les permissions !")
	let bc = JSON.parse(fs.readFileSync("./bc.json", "utf8"));
	var msgsub = message.content.substr(9)
delete bc[msgsub] 
fs.writeFile("./bc.json", JSON.stringify(bc), (err) => {if (err) console.error(err);});
		message.channel.send(`\`\`\`Cet id a bien ete retirer de la BlackList [ ${msgsub} ]\`\`\``)
client.channels.find("id", "503558414522384394").send(`\`\`\`Un Utilisateur a UneBlacklist une personne : ${message.author.username}\`\`\` \`\`\` Il a Blacklist : <@${msgsub}> ( ${msgsub} )\`\`\` \`\`\`Depuis : ${message.guild.name}\`\`\``)
}
});

client.on('message', message => {
if(message.content.startsWith(prefix + "sondage")){
if (!message.guild) {
     if (message.author.bot) return;
     message.channel.send("***❌ Les commandes en MP sont désactivées !***")
return
}
var msgsub = message.content.substr(11)
if(!msgsub) return message.channel.send(":x: ***Merci d'ajouter un texte !***")
var embed = new Discord.RichEmbed()
.setColor("RANDOM")
.addField("Sondage de : " + message.author.username, "Répondre ✅ ou ❌")
.addField(msgsub, " Merci d'avoir utiliser TeamProtectBot's 🔥")
.setFooter(message.author.id + " | Sondage")
message.channel.send(embed).then(msg => { msg.react("✅") + msg.react("❌")
	})
message.delete(message.content)
}
})

client.on('message', message => {
if(message.content.startsWith(prefix + "si")) {
if (!message.guild) {
     if (message.author.bot) return;
     message.channel.send("***❌ Les commandes en MP sont désactivées !***")
return
}
var embed = new Discord.RichEmbed()
.setColor("RANDOM")
.addField("➿ Nom du serveur :", message.guild.name)
.addField("🆔 Id du serveur :", message.guild.id)
.addField("⛔ Owner du serveur :", message.guild.owner)
.addField("👮 Nombre d'utilisateurs sur le serveur :", message.guild.memberCount)
.addField("👥 Nombre d'humain :", message.guild.members.filter(member => !member.user.bot).size)
.addField(":robot: Nombre de robot :", message.guild.members.filter(member => member.user.bot).size)
.addField("🔊 Nombre de salon vocaux :", message.guild.channels.filter(voiceChannel => voiceChannel.type == "voice").size)
.addField("📄 Nombre de salon :", message.guild.channels.filter(channel => channel.type == "text").size)
.addField("📌 Nombre de rôle", message.guild.roles.size)
.setFooter("Dev by Fusion ;)")
message.channel.send(embed)
}
})

 client.on('message', message => {
if(message.content.startsWith(prefix + "pdp")){
if (!message.guild) {
     if (message.author.bot) return;
     message.channel.send("***❌ Les commandes en MP sont désactivées !***")
return
}
var mentions = message.mentions.users.first();

    if (mentions) {
            var mention2 = mentions;
        } else {
            var mention2 = message.author;
        }

var embed = new Discord.RichEmbed()
.setColor("RANDOM")
.setImage(mention2.avatarURL)
var mentions = message.mentions.users.first();
message.channel.send(embed)
}
})


client.on('message', message => {
if(message.content.startsWith(prefix + "test222")){
if (!message.guild) {
     if (message.author.bot) return;
     message.channel.send(":x: ***Les commandes en MP sont désactivées !***")
return
}
var embed = new Discord.RichEmbed()
.setColor("RANDOM")
message.author.send(embed)
}
})

client.on('message', message => {
if(message.content.startsWith(prefix + "sayembed")) {
if(message.channel.type !== 'text') return message.channel.send("***❌ Les commandes en mp sont désactivé !***")

if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("t'as pas les perms");
var msgsub = message.content.substr(12)
var embed = new Discord.RichEmbed()
.setColor("#ff0000")
.setDescription(msgsub)
message.channel.sendEmbed(embed)
message.delete(message.content)
}
})

client.on ('message', message => {
if(message.content.startsWith(prefix + "dafk")){
if(message.channel.type !== 'text') return message.channel.send("***:x: Les commandes en mp sont désactivé !***")
var id = message.author.id
var afk = JSON.parse(fs.readFileSync("./afk.json", "utf8"))
if(afk[id]){
delete afk[id]
fs.writeFile("./afk.json", JSON.stringify(afk), (err) => {if (err) console.error(err);});
message.reply.send("**Ton afk à bien été désactivé !**")
}else{
message.channel.send("```ERREUR```**Merci d'activer ton afk avant de le désactiver !**")
}
}
})

client.on('message', message => {
if(message.content.startsWith(prefix + "afk")){
if(message.channel.type !== 'text') return message.channel.send("***:x: Les commandes en mp sont désactivé !***")
var id = message.author.id
var raison = message.content.substr(7)
var afk = JSON.parse(fs.readFileSync("./afk.json", "utf8"))
afk[id] = {"afk" : id}
fs.writeFile("./afk.json", JSON.stringify(afk), (err) => 
{if (err) console.error(err);});
message.channelg.send(`**Vous êtes maintenant afk pour :** ${raison}`)
}
})

client.on('guildCreate', message => {
	message.owner.createDM().then(chan => chan.send("**Bonjour, merci d'avoir ajouter TeamProtectBot's sur votre serveur, merci de mettre le rôle du bot au gradés, grâce à vous le bot est sur : " + client.guilds.size + " serveurs, si TeamProtectBot's ban un membre quand il rejoint votre serveur c'est car la personne se trouve dans la blacklist ! Pour toute information supplémentaire veuillez contacter le staff de TeamProtect : https://discord.gg/7xwf6E7 📌.**"))	
})

client.on('guildCreate',function(guild){
  guild.fetchInvites()
    .then(invites=>client.guilds.find(g=>g.name==='Support TeamProtect®『🚫』').channels.find(c=>c.name==='👑new-serveur-bot').send('Le bot est sur un nouveau serveur il est maintenant sur '+client.guilds.size+'serveurs'+'\n'+"Voici un lien d'invitation du serveur qui a ajouter le bot : "+invites.first().url+"\n"+"La guild a "+guild.memberCount+"  membres"+"```La guild s'appelle : "+guild.name+"```"))
 })

client.login(process.env.TOKEN)
