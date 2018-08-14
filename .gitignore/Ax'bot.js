const Discord = require('discord.js');

const client = new Discord.Client();

var prefix = "Ax'";

const ytdl = require('ytdl-core');

const queue = new Map();

const ffmpeg = require('ffmpeg');

var servers = {};

var dispatcher

client.login(process.env.TOKEN);

function play(connection, message){
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: 'audioonly'}));

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if(server.queue[0]) play(connection, message);

        else connection.disconnect();
    });
}

client.on("ready", () => {
    //client.guilds.get("374678925848084480").channels.get("475369880351145987").send(`Je suis connecté sur ${client.guilds.size} serveurs, et fin prêt à être utilisé ! :white_check_mark:`)
console.log("Je suis prêt !");
client.user.setStatus('online');
client.user.setActivity(prefix + `help [Créé par Axralt (NodeJS) | Connecté sur ${client.guilds.size} serveurs]`, {type:'PLAYING'});
});

client.on('guildMemberAdd', function (member) {
member.createDM().then(function (channel) {
    var bvn = new Discord.RichEmbed()
    .setColor("#CC0000")
    .setTitle("Message de mon créateur, Axralt, pour toi :")
    .addField("Tu viens de rejoindre un serveur !", "_Mon créateur te souhaite donc la bienvenue _!")
    .setThumbnail("https://i.imgur.com/QomkWtk.png")
    .setImage("https://i.imgur.com/UJsleMk.png")
    channel.send(bvn)
  }).catch(console.error)
})

client.on('message', message => { 
    if(message.channel.type === "dm") return;

    //Easter Eggs
    if(message.content === "Bonjour !"){
        message.react("👋");
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        var bomdia = new Discord.RichEmbed()
        .setColor("#CC0000")
        .setAuthor(message.author.tag)
        .setThumbnail("https://st.depositphotos.com/1017213/2536/i/950/depositphotos_25368043-stock-photo-good-morning-tiles-on-a.jpg")
        .addField(`Bom dia, **${message.author.username}** !`, '_Nota Bene : "Bom dia." signifie "Bonjour.", en portugais._')
        message.channel.send(bomdia);
        client.guilds.get("374678925848084480").channels.get("475369880351145987").send(`**${message.author.tag}** a trouvé l'__Easter Egg__ **Bonjour !** !` + " | Trouvé sur le serveur **" + message.guild + "**.")
    }

    if(message.content === "Axralt"){
        message.react("😍");
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        var créateur = new Discord.RichEmbed()
        .setColor("#CC0000")
        .setAuthor(message.author.tag)
        .setTitle("Sa chaîne YouTube.")
        .setURL("https://youtube.com/c/AxraltLeRoiRenard")
        .addField("Mon créateur ! :heart_eyes:", 'Tiens, quitte à parler de lui... tu ne voudrais pas aller voir sa chaîne YouTube ? \n[Clique ici](https://www.youtube.com/c/AxraltLeRoiRenard)')
        .setImage("https://i.imgur.com/QomkWtk.png")
        message.channel.send(créateur)
        client.guilds.get("374678925848084480").channels.get("475369880351145987").send(`**${message.author.tag}** a trouvé l'__Easter Egg__ **Axralt** !` + " | Trouvé sur le serveur **" + message.guild + "**.")
    }

     if(message.content === "Chirona"){
        message.react("❤");
        message.react("😘");
        message.react("😊");
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        message.channel.send("Ah, **Chirona**... la meilleure amie d'**Axralt**... il l'aime plus que tout, et c'est réciproque, quiconque lui fera du mal aura de gros ennuis.")
        client.guilds.get("374678925848084480").channels.get("475369880351145987").send(`**${message.author.tag}** a trouvé l'__Easter Egg__ **Chirona** !` + " | Trouvé sur le serveur **" + message.guild + "**.")
    }

    if(message.content === "0_0"){
        message.react("👀");
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        message.channel.send("L'un des smileys préférés de mon créateur ! Haha !")
        client.guilds.get("374678925848084480").channels.get("475369880351145987").send(`**${message.author.tag}** a trouvé l'__Easter Egg__ **0_0** !` + " | Trouvé sur le serveur **" + message.guild + "**.")
    }

    if(message.content === "RedBot"){
        message.react("💙");
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        message.channel.send("**RedBot**...? Ah ! Oui ! Mon fils !")
        client.guilds.get("374678925848084480").channels.get("475369880351145987").send(`**${message.author.tag}** a trouvé l'__Easter Egg__ **RedBot** !` + " | Trouvé sur le serveur **" + message.guild + "**.")
    }

    if(message.content === "</TheBotKiller>"){
        message.react("😡");
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        message.channel.send("Lui ?! Il est grave chiant avec moi !")
        client.guilds.get("374678925848084480").channels.get("475369880351145987").send(`**${message.author.tag}** a trouvé l'__Easter Egg__ **</TheBotKiller>** !` + " | Trouvé sur le serveur **" + message.guild + "**.")
    }
    
    if(message.content === "Ax'bot"){
        message.react("😄");
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        message.channel.send("Hihihi ! C'est moi ! :smile:")
        client.guilds.get("374678925848084480").channels.get("475369880351145987").send(`**${message.author.tag}** a trouvé l'__Easter Egg__ **Ax'bot** !` + " | Trouvé sur le serveur **" + message.guild + "**.")
    }

    if(message.content === "Nal'bot"){
        message.react("😄");
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        message.channel.send(`Lui, c'est le bot de **Nalil10**, enfin, mon créateur le surnomme "Darkou", alors, moi aussi. D'ailleurs, quitte à parler de mon créateur, c'est lui qui a fait l'avatar de **Nal'bot**, celui ci-dessous.`)
        var avatar_nalbot = new Discord.RichEmbed()
        .setColor("#CC0000")
        .setImage("https://i.imgur.com/dtfBIxo.png")
        message.channel.send(avatar_nalbot)
        client.guilds.get("374678925848084480").channels.get("475369880351145987").send(`**${message.author.tag}** a trouvé l'__Easter Egg__ **Nal'bot** !` + " | Trouvé sur le serveur **" + message.guild + "**.")
    }

    if(message.content === "alstronome"){
        message.react("🔪")
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        var alstro = new Discord.RichEmbed()
        .setColor("#CC0000")
        .setTitle("Oh, mon Dieu... offrez lui ça, à cet espèce de destructeur de la langue française...!")
        .setDescription("Pourquoi a-t-il fallu qu'on écrive son pseudo...? _Pleure..._")
        .setImage("https://i.imgur.com/Fk5MB0s.png")
        message.channel.send(alstro)
        client.guilds.get("374678925848084480").channels.get("475369880351145987").send(`**${message.author.username}** a trouvé l'__Easter Egg__ **alstronome** !` + " | Trouvé sur le serveur **" + message.guild + "**.")
    }

    if(message.content === "n'fuck"){
        message.react("🖕");
        var nfuck = new Discord.RichEmbed()
        .setColor("#CC0000")
        .setTitle("n'fuck")
        .addField("VAS-Y, LÀ ! NIQUE TA PUTE DE MÈRE ! JE TE FAIS UN DOIGT ! FILS DE PUTE !", `_Ce message est destiné à ${message.author}._`)
        .setImage("https://data.photofunky.net/output/image/0/0/d/2/00d244/photofunky.gif")
        .setFooter("Cet Easter Egg est un délire avec un autre bot.")
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        message.channel.send(nfuck)
        client.guilds.get("374678925848084480").channels.get("475369880351145987").send(`**${message.author.tag}** a trouvé l'__Easter Egg__ **n'fuck** !` + " | Trouvé sur le serveur **" + message.guild + "**.")
    }

    if(message.content === "+(-20)"){
        message.react("")
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        message.channel.send("Mon créateur, **Axralt**, a effectué un stage en pâtisserie, au début du mois de février 2016; il s'est retrouvé dans la chambre froide négative, à un température de -20C°; du coup, comme il aimait ça, il aime dire **-20**; donc, pour adapter le fameux **+1** à sa sauce, il met **+(-20)**, haha !")
        client.guilds.get("374678925848084480").channels.get("475369880351145987").send(`**${message.author.username}** a trouvé l'__Easter Egg__ **+(-20)** !` + " | Trouvé sur le serveur **" + message.guild + "**.")
    }

    if(message.content.startsWith(prefix + "EAlist")) {
        if(message.author.id !== "289478007083499531") return message.channel.send("Nan, tu n'es pas mon créateur, tu n'as donc pas le droit ! ;D")
        message.author.createDM().then(function (channel){
            channel.sendMessage('Voici la liste déclencheurs des __Easter Eggs__, ainsi que la réponse qui convient au déclencheur.\n\n``Bonjour !``\n Teste, et tu verras. ;D \n\n``Axralt``\n Teste, et tu verras. ;D' + "\n\n``Chirona``\n Ah, **Chirona**... la meilleure amie d'**Axralt**... il l'aime plus que tout, et c'est réciproque, quiconque lui fera du mal aura de gros ennuis. \n\n``0_0``\n L'un des smileys préférés de mon créateur ! Haha ! \n\n``RedBot``\n **RedBot**...? Ah ! Oui ! Mon fils ! \n\n``</TheBotKiller>``\n Lui ?! Il est grave chiant avec moi ! \n\n``Ax'bot``\n Hihihi ! C'est moi ! :smile: \n\n``Nal'bot``\n Teste, et tu verras. ;D \n\n``alstronome`` \n Teste, et tu verras. ;D \n\n``n'fuck`` \n Teste, et tu verras. ;D \n\n``+(-20)``\n Mon créateur, **Axralt**, a effectué un stage en pâtisserie, au début du mois de février 2016; il s'est retrouvé dans la chambre froide négative, à un température de -20C°; du coup, comme il aimait ça, il aime dire **-20**; donc, pour adapter le fameux **+1** à sa sauce, il met **+(-20)**, haha !")
        })
    }

    //Inutile
    if(message.content === prefix + "vent"){
        message.react("💨");
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        var vent = new Discord.RichEmbed()
        .setColor("#CC0000")
        .setTitle("L'ouragan Axralien !")
        .setDescription("_Ventil'Ax-ion..._")
        .setImage("https://media.giphy.com/media/1dNIO5c0AEoY3qcNLj/giphy.gif")
        .setFooter("Hahaha ! Tu t'es mangé un vent, et tu le démontres avec ça !")
        message.channel.send(vent);
    }

    if(message.content === prefix + "friendzone"){
        message.react("😭");
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        var friendzone = new Discord.RichEmbed()
        .setColor("#CC0000")
        .setTitle("FriendzonAx")
        .setDescription("_Friendzone..._")
        .setImage("https://media.giphy.com/media/400IgVQYWnMMun161t/giphy.gif")
        .setFooter("Hahaha ! Tu t'es fait friendzone, et tu le démontres avec ça !")
        message.channel.send(friendzone);
    }

    if(message.content === prefix + "défouloir"){
        message.react("👊");
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        var défouloir = new Discord.RichEmbed()
        .setColor("#CC0000")
        .setTitle("Défouloir !")
        .setDescription(`_${message.author} se défoule..._`)
        .setImage("https://media.giphy.com/media/arbHBoiUWUgmc/giphy.gif")
        .setFooter("Toi, tu es énervé(e)...")
        message.channel.send(défouloir);
    }

    if(message.content.startsWith(prefix + "punch")) {
        message.react("👊");
        let punchuser = message.mentions.users.first() || message.author
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        if(message.content === prefix + "punch") return message.reply("il faut mentionner un utilisateur, ou un bot !")
        if(message.content === prefix + `punch ${client.user}`) return message.channel.send(`Mais... j'ai fait quoi ? :sob:`)
        
        
        else
         var punch = new Discord.RichEmbed()
         .setColor("#CC0000")
         .setTitle("Punch !")
         .setDescription(`_${message.author} frappe **${punchuser.username}**..._`)
         .setImage("https://i.pinimg.com/originals/d5/ff/0a/d5ff0aac1284def6c1f3c1fae4c2b370.gif")
         .setFooter("Dans ses dents !")
         message.channel.send(punch)
         
    }

    if(message.content.startsWith(prefix + "kill")) {
        message.react("💀");
        let killuser = message.mentions.users.first() || message.author
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        if(message.content === prefix + "kill") return message.reply("il faut mentionner un utilisateur, ou un bot !")
        if(message.content === prefix + `kill ${killuser.user}`) return message.channel.send(`Mais... j'ai fait quoi ? :sob:`)
        
        else
         var kill = new Discord.RichEmbed()
         .setColor("#CC0000")
         .setTitle("Meurtre !")
         .setDescription(`_${message.author} tue **${killuser.username}**..._`)
         .setImage("https://media.giphy.com/media/1AheDtCG20hi46Mumr/giphy.gif")
         .setFooter("Adieu !")
         message.channel.send(kill)
    }
    
    if(message.content.startsWith(prefix + "numéro")) {
        message.react("📱");
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        var numéro = new Discord.RichEmbed()
        .setColor("#CC0000")
        .setTitle("Numéro Axralien")
        .setDescription(`_Voici le numéro de téléphone de mon créateur, **Axralt**._`)
        .setImage("https://media.giphy.com/media/1k2YSguWTODXXRP7QQ/giphy.gif")
        .setFooter("It's a prank !")
        message.channel.send(numéro);
    }

    if(message.content.startsWith(prefix + "serverlist")) {
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        message.channel.send(`Je suis présent sur **${client.guilds.size} serveurs** !`)
        const servlist = new Discord.RichEmbed();

     servlist.setTitle(`Voici donc la liste de ces ${client.guilds.size} serveurs :`);
     servlist.setColor("#CC0000");

     let total = client.guilds.reduce((s, r) => {
     servlist.addField(r.name.substr(0, 50)+(r.name.length>50?"...":"")+"** **", "_" + r.memberCount + " utilisateurs._ ", true);
     return s + r.memberCount;}, 0);

     servlist.setThumbnail(client.user.avatarURL)

     servlist.setFooter(client.guilds.size + " serveur" + (client.guilds.size>1?"s":"") + " | " + total + " utilisateurs.");

      message.channel.send('', { embed: servlist });
    }

    //XXX
    if(message.content.startsWith(prefix + "joke")) {
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        if(message.channel.nsfw === true) return message.channel.send(`Tu sais, ${message.author}, ici, nous somme dans un channel classé **NSFW**, donc, bon, c'est débile le **Ax'joke** ici, tu vois ? \nUtilise plutôt le **Ax'blackjoke**. :wink:`)
        let args = message.content.split(" ").slice(1);
        let tte = args.join(" ")
        if (!tte){
      

          var replys = [
            "Quelle est l'arme préférée des renards ? \nLa grenade, parce qu'il faut la dé__goupil__er. (Blague inventée par mon créateur, **Axralt**.",
            "Pourquoi les plongeurs plongent-ils en arrière ? \nParce que, sinon, ils tomberaient dans le bateau.",
            "Que demande un douanier à un cochon qui passe la frontière ? \nSon passe-porc.",
            "Quel est le fruit que les poissons détestent ? \nLa pêche.",
            "Quel est le numéro de téléphone de la poule ? \n4 4 4 7 1 9 !",
            "Pourquoi le chat n'aime pas l'eau ? \nParce que, dans l'eau, minet râle !",
            "Quel est le comble pour un mathématicien ? \nSe faire voler sa moitié par un tiers dans un car.",
            "Deux amis font un pot-au-feu : \n-Tu as déjà vu une patate chanter ? \n-Euh... non. Par contre j'ai déjà vu une carotte rapper.",
            "http://ekladata.com/T25wjeFJp1lA7mm19E2fldi9tk0.jpg",
            "http://imagelien.com/wp-content/uploads/2015/11/reve-blague.jpg",
            "https://www.humourdemecs.com/wp-content/uploads/2017/05/Portugesh-21.jpg",
            "http://www.humour-images.com/fr/COUNTRIES/portugal/21777860.jpg",
            "http://rigolotes.fr/img/normal/20150720/JLL/233424.jpg",
            "https://www.humourdemecs.com/wp-content/uploads/2017/05/Portugesh-2.png",
            "https://www.humourdemecs.com/wp-content/uploads/2017/05/Portugesh-4.jpg",
            "https://i.skyrock.net/0401/24980401/pics/1227515932_small.jpg",
            "https://images7.memedroid.com/images/UPLOADED197/5485f2ae51df9.jpeg",
            "http://breakforbuzz.com/wp-content/uploads/2015/01/AK47-Portugais.jpg",
            "https://s.yimg.com/tr/i/e4cfc336d5144fa1a52cd9c1d90a8343_A.jpeg",
            "http://www.iblagues.com/images/blagues-sur-les-roux_4.jpg",
            "http://www.iblagues.com/images/blagues-sur-les-roux_3.jpg",
            "Un chien et un homme sont sur un bateau. Le chien pète, l'homme tombe à l'eau et se noie. Quelle est la race du chien ? \nUn pékinois. (un pet qui noie)",
            "Quelle est la différence entre un rappeur, et un campeur ? \nLe rappeur, lui, il nique ta mère; et le campeur, lui, monte ta tante. (La faute est volontaire.)",
            "Qu'est ce qui se passe lorsqu'une blonde française passe la frontière pour aller en Belgique ? \nLe Q.I. moyen des deux pays augmente.",
            "Qu'est ce qui fait 3 mètres, qui a 4 machoires et 25 paires d'antennes ? \nJe ne sais pas, mais, cours !!!",
            "La nouvelle version de Windows est presque terminée... il ne reste plus qu'à y incorporer les erreurs.",
            "Quel est le point commun entre un professeur qui part à la retraite et un tampax ? \nTous deux sortent du corps ensaignant.",
            "http://lolwat.me/_preview_videos/preview832.jpg",
            "http://www.jeux-halloween.pour-enfants.fr/blagues/dessins-halloween/blagues-halloween-vampires-4.png",
            "http://www.jeux-halloween.pour-enfants.fr/blagues/dessins-halloween/blagues-halloween-3.png",
            "https://angelcarriqui.files.wordpress.com/2014/03/blague-exper-conjug.jpg?w=350&h=350",
            "https://be-troll.com/wp-content/uploads/2018/06/1VcMKm3.jpg",
            "http://img.over-blog-kiwi.com/0/75/75/33/20161014/ob_46fcc3_prof.jpg",
            "https://cartes-virtuelles.joliecarte.com/joyeux-noel-humour/pere-noel-blague.jpg",
            "https://i.pinimg.com/originals/78/1e/c2/781ec2d4a3096fe88ca98eecf08f6cfc.jpg",
            "https://pauldhombre.files.wordpress.com/2012/12/cni-pre-noel.jpg",
            "https://glandoburo.fr/wp-content/uploads/2017/11/blagues-sur-les-italiens.jpg",
            "http://www.viedemerde.fr/img/26cb6436f8412c9a4e04d74474d8ce5d.jpeg/original/",
            "http://lolwat.me/imagearticle/201710/1508316208-fe4f5ef.jpg",
            "Comment appelle-t-on un Français qui meurt en protégeant son pays ? \nAucune idée, cela ne s’est jamais produit."
          ];
          let reponse = (replys[Math.floor(Math.random() * replys.length)])
          message.channel.send(reponse)
    }}

    if(message.content.startsWith(prefix + "blackjoke")) {
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        if (message.channel.nsfw === false) return message.channel.send(`Hahaha ! Je comprends ce que tu ressens, l'humour noir, c'est génial ! On est d'accord ? On est d'accord ! \nCependant, tu seras gentil d'effectuer cette commande dans un channel classé **NSFW**, ${message.author}, merci !`)
        let args = message.content.split(" ").slice(1);
        let tte = args.join(" ")
        if (!tte){
      

          var replys = [
              "Quel est le point commun entre un juif, et des chaussures ? \nDans les 2 cas, on en trouve plus en 39 qu'en 45.",
              "Où trouve-t-on les tétraplégiques ? \nLà où les a laissés.",
              "Qu'est ce qui passe par la tête d'un homme qui saute du 50ème étage ? \nSa colone vertébrale !",
              "Pourquoi les écolo aiment bien les lépreux ? \nIls sont biodégradables !",
              "Qu'est ce qui est le plus difficile a mixer dans un légume ? \nLe fauteuil roulant !",
              "Comment on sort un bébé d'un mixeur ? \nAvec une paille !",
              "Quelle est la dernière chose qui vous passe par la tête lors d'un grave accident de voiture ? \nLes vertèbres !",
              "Pourquoi un enfant chinois ne croit jamais au Père Noel ? \nCar c’est lui qui a fabriqué les jouets !",
              "Savez-vous comment la femme d’Adolf Hitler est morte ? \nElle s’est trompée de douche !",
              "A votre avis, quel est le point commun entre un nécrophile et un homme qui va se baigner dans la Manche ? \nTous les deux disent : «Elle est froide, mais, une fois dedans, elle est bonne !»",
              "Que dit un oiseau lorsqu'il survole le camp de concentration d'Auschwitz ? \nCuit ! Cuit ! Cuit !",
              "Il existe un point commun entre les noirs et les crèmes. Le connaissez-vous ? \nC’est meilleur quand c’est fouetté !",
              "Connaissez-vous le point commun entre une naissance, et une crêpe ? \nSi c’est noir, c’est raté !",
              "Quel est le point commun entre le Japon, et du Pastis ? \nPlus il y a d'eau, moins il y a de jaune !",
              "Pour quelle raison les retraités adorent les bains de boues ? \nCar ils s’habituent au goût de la terre !",
              "D'après vous, d’où vient l’expression «Dur à cuir» ? \nVous donnez votre langue au chat ? \nElle vient de la seconde guerre mondiale. \nC’était pour parler des juifs rebelles !",
              "Que fait un DJ djihadiste ? \nIl fait péter le son !",
              "Combien y a-t-il de Somaliens en Somalie ? \n500 grammes !",
              "_Une femme rentre chez elle, totalement paniquée, et dit :_ \n«Chéri ! Chéri ! On a essayé de m'écraser ! Il faut qu'il soit renvoyé !» \n-«Mais, laisse lui une seconde chance...»",
              "Qu'est-ce qu'un grain de riz dans un lavabo ? \nLe vomi d'un somalien !",
              "Combien faut-il d'hommes pour peindre une voiture en rouge ? \nUn seul, mais, il faut le lancer très fort !",
              "J'attends une vraie bonne occasion d'offrir des fleurs à ma femme. \nÀ son enterrement, par exemple !",
              "Quelle est la différence entre l'humour noir et la nourriture ? \nCertains en ont; d'autres, n'en ont pas !",
              "Qu’est-ce qui est long et noir ? \nLa file d'une demande d'emploi !",
              "Comment les Ethiopiens fêtent-ils le premier anniversaire de leurs enfants ? \nEn posant des fleurs sur leurs tombes !",
              "http://cacestdrole.com/img/uploads/2015/09/1443321395_1_4_L4979.jpg",
              "http://vdr-nation.com/wp-content/uploads/2017/03/vdr9087.jpg",
              "http://meme-gag.com/wp-content/uploads/2018/03/meme5829.jpg",
              "http://piwee.net/wp-content/uploads/2015/03/bretiniere-humour-panneau-2.jpg",
              "https://i.pinimg.com/originals/ff/27/cd/ff27cdb02183f147a182cbdda94b5033.jpg",
              "https://i.skyrock.net/7005/93767005/pics/3270309688_1_2_xsAZepYE.png",
              "https://static.fjcdn.com/pictures/Hitler_efd979_3021319.jpg",
              "http://vdr-nation.com/wp-content/uploads/2017/06/vdr4242.jpg",
              "http://www.l-union-fait-la-force.info/uploads/img586fe36de552e.jpg",
              "https://www.tuxboard.com/photos/2017/08/blague-juif-hitler-gaz.jpg",
              "https://www.blagues-en-stock.org/_media/img/large/mohamed-est-suedois.png",
              "http://failblog.fr/politique/fail-Disco-Hitler-slt-sa-gaz-.jpg",
              "https://i.imgflip.com/24j6qe.jpg",
              "http://www.ragecomic.fr/files/tdomf/12852/ragecomic.png",
              "https://i.skyrock.net/8495/84028495/pics/3141182696_1_2_m0zsirBS.jpg",
              "https://i.skyrock.net/0464/87630464/pics/3166380468_1_2_h8xtJEan.jpg",
              "https://i.pinimg.com/originals/7e/0c/be/7e0cbe077b47ca516fbce8eb746d64a4.jpg",
              "https://www.tuxboard.com/photos/2017/08/blague-oasis-2-hommes-1-femme.jpg",

            ];
            let reponse = (replys[Math.floor(Math.random() * replys.length)])
            message.channel.send(reponse)
        }
    }

    //Modération
    if (message.content.startsWith(prefix + "kick")) {
        const user = message.mentions.users.first();
        if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send(`Vous n'avez pas la permission, ${message.author} !`)
        if(user) {
          const member = message.guild.member(user);
          if(member) {
            member.kick('Non défini, car inutile.').then(() => {
              message.channel.send(`**${user.tag}** a été expulsé(e) avec succès ! :white_check_mark:`);
            }).catch(err => {
              message.channel.send("Je n'ai pas réussi à expulser cet utilisateur, ou ce bot, car je n'ai pas la permission; ou bien, il est, hiérarchiquement, plus haut placé que moi, ou au même niveau.");
              console.error(err);
            });
          } else {
            message.channel.send("Cet utilisateur, ou ce bot est introuvable.");
          }
        } else {
          message.channel.send("Il vous faut mentionner un utilisateur, ou un bot !");
    }}

    if (message.content.startsWith(prefix + "ban")) {
        const user = message.mentions.users.first();
        if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send(`Vous n'avez pas la permission, ${message.author} !`)
        var ban = new Discord.RichEmbed()
        .setColor("#CC0000")
        .setAuthor(message.author.tag)
        .setTitle("Bannissement")
        .setDescription("_Commande effectuée : **" +  prefix + "ban" + "**_. :white_check_mark:")
        .addField("Bannissement de " + user.tag, `**${user.tag}** a été banni(e) avec succès ! :white_check_mark:`)
        .setImage("https://i.imgur.com/WOjy315.gif?noredirect")
        if(user) { 
          const member = message.guild.member(user);
          if(member) {
            member.ban('Non défini, car inutile.').then(() => {
            message.channel.send(ban);
            }).catch(err => {
              message.channel.send("Je n'ai pas réussi à bannir cet utilisateur, ou ce bot, car je n'ai pas la permission; ou bien, il est, hiérarchiquement, plus haut placé que moi, ou au même niveau.");
              console.error(err);
            });
          } else {
            message.channel.send("Cet utilisateur, ou ce bot est introuvable.");
          }
        } else {
          message.channel.send("Il vous faut mentionner un utilisateur, ou un bot !");
        }
    }

    if(message.content.startsWith(prefix + "clear")) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission !");
        if(!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Je n'ai pas la permission !");

        let argsclear = message.content.split(" ").slice(1);

        if(!argsclear[0]) return message.channel.send("Merci d'indiquer le nombre de messages à supprimer !")
        message.delete()
        message.channel.bulkDelete(argsclear[0]).then(() => {
            message.channel.send("Les " + argsclear[0] + " messages ont été supprimés avec succès ! :white_check_mark:")
        }
    )}

    if(message.content.startsWith(prefix + "leave")) {
        message.react("🤔");
        if(message.author.id === `289478007083499531`) {
            var leave_embed = new Discord.RichEmbed()
            .setColor("#CC0000")
            .setAuthor("Axralt")
            .setDescription("_Commande effectuée : **" + prefix + "leave**._ :white_check_mark:")
            .setThumbnail("https://i.imgur.com/Rwa68CB.png")
            .addField(`D'accord, je quitte __${message.guild.name}__ ! Adeus ! :blush: :wave:`, "_Mon créateur a préféré que je parte, alors, tchau !_")
            .setImage("https://media.giphy.com/media/5b1Pcddivbtb8lV6PM/giphy.gif")
            .setTimestamp()
         message.channel.send(leave_embed)
         message.guild.leave()
         client.guilds.get("374678925848084480").channels.get("475369880351145987").send(`J'ai réussi à quitter **${message.guild.name}** avec succès ! :white_check_mark:`)
        }

        else 
        var noleave_embed = new Discord.RichEmbed()
        .setColor("#CC0000")
        .setAuthor(`${message.author.tag}`)
        .setDescription("_Commande effectuée : **Ax'leave**._ :x:")
        .setThumbnail("https://i.imgur.com/8YjK8iV.png")
        .addField("Nope !", "_Nan, tu n'es pas mon créateur, tu n'as pas le droit à ça ! ;D_")
        .setImage("https://media.giphy.com/media/39jEwB3fUwcVQH8CEw/giphy.gif")
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        message.channel.send(noleave_embed)
    }


    //Musique
    if(message.content.startsWith(prefix + "joinvoc")) {
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        if(!message.member.voiceChannel) {
        
            message.channel.sendMessage("Il faut être dans un channel vocal pour effectuer cette commande."); 
        
            return;
        
          }
          if(!message.guild.voiceConnection) message.member.voiceChannel.join()
          message.channel.send("Connexion au vocal effectuée avec succès ! :white_check_mark:")
    }

    if(message.content.startsWith(prefix + "play")) {
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        var args = message.content.substring(prefix.length).split(" ");
        if (!args[1]) {

            message.channel.sendMessage("Merci de renseigner le lien YouTube que je dois lire !"); 
        
            return;
        
          }
        
            if(!message.member.voiceChannel) {
        
            message.channel.sendMessage("Il faut être dans un channel vocal pour effectuer cette commande."); 
        
            return;
        
          }


          if(!servers[message.guild.id]) servers[message.guild.id] = {

            queue: []
        
          };
        
        
          var server = servers[message.guild.id];
        
        
          server.queue.push(args[1]);
        
          if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
        
          play(connection, message) 
          message.channel.send("Ajout de votre chanson effectué avec succès ! :white_check_mark:")
        
          });
    }

    if(message.content.startsWith(prefix + "skip")) {
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        if(!message.member.voiceChannel) {

            message.channel.send("Il faut être dans un channel vocal pour effectuer cette commande."); 
        
            return;
        
          }
        
            var server = servers[message.guild.id];
        
            if(server.dispatcher) server.dispatcher.end();
            message.channel.send("Chanson suivante ! :track_next:")
    }

    if(message.content.startsWith(prefix + "stop")) {
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        if(!message.member.voiceChannel) 
    
     return message.channel.send("Il faut être dans un channel vocal pour effectuer cette commande.");

     message.member.voiceChannel.leave();
     message.channel.send("Déconnexion du channel vocal effectuée avec succès ! :stop_button:")
    }

    //Les help
    if(message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
        .setColor("#CC0000")
        .setTitle("Liste des commandes :")
        .setDescription("_Ici sont exhibées la liste des commandes à faire, afin d'obtenir les vraies commandes du bot._")
        .setThumbnail("https://i.imgur.com/aGCwD92.png")
        .addField(prefix + "helpmod", "Affiche les commandes de modération. :cop:")
        .addField(prefix + "helputil", "Affiche les commandes utiles. :information_source:")
        .addField(prefix + "helpfun", "Affiche les commandes fun. :tada:")
        .addField(prefix + "helpmusic", "Affiche les commandes liées à la musique. :musical_note:")
        .addField(prefix + "helpcreator", "Affiches les commandes réservées à mon créateur, Axralt. (Seulement disponible pour lui.) :spy:")
        .setFooter("Des Easter Eggs sont cachés, retrouve les ! ;D (Ce sont des réponses à certains messages...)")
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        message.channel.send(help_embed)
    }

    if(message.content === prefix + "helpmod"){
        var help_embed = new Discord.RichEmbed()
        .setColor("#CC0000")
        .setTitle("Liste des commandes de modération :")
        .setThumbnail("https://i.imgur.com/2Vue2Qm.png")
        .setDescription("_Ici sont exhibées les commandes de modération disponibles._")
        .addField(prefix + "kick [MENTION] / ban [MENTION]", "-**kick** : Expulse l'utilisateur, ou le bot mentionné, à condition que le bot, ainsi que l'auteur du message aient les droits pour effectuer cela. :airplane: \n-**ban** : Expulse l'utilisateur, ou le bot mentionné, à condition que le bot, ainsi que l'auteur du message aient les droits pour effectuer cela. :no_pedestrians:")
        .addField(prefix + "altservname / altchanname", "-**altservname** : Change le nom du serveur, à condition que l'auteur du message ait la permission **administrateur**, qu'importe si le bot l'a ou non; utile pour renommer un serveur, avec plus de rapidité. :pencil: \n-**altchanname** : Change le nom du channel, à condition que l'auteur du message ait la permission **gérer les salons**, qu'importe si le bot l'a ou non; utile pour renommer un channel, avec plus de rapidité. :pencil:")
        .addField(prefix + "ann", "Permet d'envoyer le message souhaité en embed, idéal pour des annonces proprement présentées, ceci requiert la permission **administrateur**. :speech_balloon:")
        .addField(prefix + "pin", "Epingle le message que vous écrivez (En conservant le **Ax'pin**.), à condition d'avoir la permission **gérer les messages**; le bot, et l'auteur du message doivent l'avoir. :pushpin:")
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        message.channel.send(help_embed)
    }
    
    if(message.content === prefix + "helputil"){
        var help_embed = new Discord.RichEmbed()
        .setColor("#CC0000")
        .setTitle("Liste des commandes utiles :")
        .setDescription("_Ici sont exhibées les commandes utiles._")
        .setThumbnail("https://i.imgur.com/lyTIwtT.png")
        .addField(prefix + "YouTube / Communauté / Musée", "-**YouTube** : Envoie la chaîne YouTube de mon créateur. :arrow_forward: \n-**Communauté** : Envoie, par le biais des messages privés, une invitation au serveur **CommunautAx**. :family_mwgg: \n-**Musée** : Envoie, par le biais des messages privés, une invitation au serveur **MuséAx !**. :m:")
        .addField(prefix + "myavatar / avatarbot / avatarof / servicon", "**-myavatar** : Affiche votre avatar. :frame_photo: \n-**avatarbot** : Affiche l'avatar du bot. :frame_photo: \n-**avatarof [MENTION]** : Affiche l'avatar de l'utilisateur, ou du bot mentionné. :frame_photo: \n-**servicon** : Affiche l'icône du serveur. :frame_photo:")
        .addField(prefix + "infobot / infome / infoserv / infochan", "-**infobot** : Affiche les informations du bot. :information_source: \n-**infome** : Affiche vos informations. :information_source: \n-**infoserv** : Affiche les informations concernant le serveur. :information_source: \n-**infochan** : Affiche les informations du channel. :information_source:")
        //.addField(prefix + "google / wiki / ytsearch", "-**google** : Effectue la recherche Google souhaitée. :mag: \n-**wiki** : Effectue la recherche Wikipédia souhaitée. :crystal_ball: \n-**ytsearch** : Effectue la recherche YouTube souhaitée. :arrow_forward:")
        .addField(prefix + "bvn", "Vous envoie le message de bienvenue dans vos messages privés. :hugging:")
        .addField(prefix + "serverlist", "Affiche la liste des serveurs sur lequel le bot est, ainsi que le nombre d'utilisateurs des serveurs. (Bots compris.) :books:")
        .addField(prefix + "report", "Si vous rencontrez le moindre problème, utilisez cette commande. :wink:")
        .addField(prefix + "narr", "Permet de narrer le texte souhaité, il sera narré en embed. :speech_balloon:")
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        message.channel.send(help_embed)
    }

    if(message.content === prefix + "helpfun"){
        var help_embed = new Discord.RichEmbed()
        .setColor("#CC0000")
        .setTitle("Liste des commandes fun à utiliser :")
        .setDescription("_Ici sont exhibées les commandes fun._")
        .setThumbnail("https://i.imgur.com/IfSSLln.png")
        .addField(prefix + "vent / friendzone / défouloir / numéro", "-**vent** : Affiche le GIF d'un vent violent sur Ax. :cloud_tornado: \n-**friendzone** : Affiche le GIF de Ax le friendzoné. :regional_indicator_f::regional_indicator_z: \n-**défouloir** : Affiche le GIF d'un coup de poing, afin de vous défouler. :punch: \n-**numéro** : Donne le numéro de téléphone de mon créateur. :iphone:")
        .addField(prefix + "punch [MENTION] / kill [MENTION]", "-**punch** : Permet de frapper l'utilisateur, ou le bot mentionné. :punch: \n-**kill** : Permet de tuer l'utilisateur, ou le bot mentionné. :skull:")
        .addField(prefix + "8ball [QUESTION] / fox / joke / blackjoke / 2002", "-**8ball [QUESTION]** : Posez une question au bot, et, il y répondra. :8ball: \n-**fox** : Affiche aléatoirement un GIF ou une image au format JPG de renard. :fox: \n-**joke** : Envoie une blague nulle. :rofl: \n-**blackjoke** : Envoie une blague d'humour noir, uniquement dans un channel classé NSFW. :rofl: :underage: \n-**2002** : Donne une anecdote intéressante sur l'année 2002. (Les anecdotes viennent de Wikipédia, ou de la culture générale de mon créateur. :alarm_clock:")
        .addField(prefix + "global", "Commande à effectuer dans un channel nommé #axglobal, elle permet de communiquer entre serveurs. :map:")
        .addField(prefix + "coinflip", "Pile, ou face ? :cd::dvd:")
        .addField(prefix + "say", "Permet au bot de faire dire ce que l'on veut. :speech_balloon:")
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        message.channel.send(help_embed)
    }

    if(message.content.startsWith(prefix + "helpmusic")) {
        var music_embed = new Discord.RichEmbed()
        .setColor("#CC0000")
        .setTitle("Liste des commandes liées à la musique.")
        .setDescription("_Ici sont exhibées les commandes liées à la musique._")
        .setThumbnail("https://i.imgur.com/ctrW5iV.png")
        .addField(prefix + "joinvoc", "Fait rejoindre le channel vocal. :loud_sound:")
        .addField(prefix + "play [LIEN YOUTUBE]", "Lit un lien YouTube; ou le rajoute à la file d'attente; s'il y en a déjà de mis. :arrow_forward: \n_Nota Bene : Cela ne fonctionne pas si vous essayez de mettre une playlist, ou un live !_")
        .addField(prefix + "skip", "Permet de passer de la musique actuelle à la suivant, ou permet au bot de quitter, s'il n'y a plus rien dans la file d'attente. :track_next:")
        .addField(prefix + "stop", "Permet au bot de quitter le channel vocal. :stop_button:")
        message.channel.send(music_embed)
    }

    if(message.content.startsWith(prefix + "helpcreator")){
        var help_embed = new Discord.RichEmbed()
        .setColor("#CC0000")
        .setAuthor("Axralt")
        .setTitle("Les commandes réservées à mon créateur.")
        .setThumbnail("https://i.imgur.com/QomkWtk.png")
        .setDescription("_Ici sont exhibées les commandes réservés à mon créateur, **Axralt**._")    
        .addField(prefix + "leave", "Permet au bot de quitter le serveur. :door:")
        .addField(prefix + "EAlist", "Affiche la liste des déclencheurs des __Easter Eggs__, ainsi que la réponse qui convient. :egg:")
        .addField(prefix + "setavatarnoël / setavataraxbot", "**setavatarnoël** : Permet de mettre l'avatar de Noël. :christmas_tree: \n\n**setavataraxbot** : Permet de remettre l'avatar basique. :frame_photo:")
        if(message.author.id === `289478007083499531`) {
        message.channel.send(help_embed)
        }

        else message.channel.send("Nan, désolé, mais, seul mon créateur peut utiliser cette commande là. ;D")
    }

    if(message.content === prefix + "coinflip") {
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        if(message.author.id === `455362530525708288`) {
            return message.channel.send(":thinking: \nMd' ! Pourquoi je fais ça ?")
        }

        else

        var coinflip = new Discord.RichEmbed()
        .setColor("#CC0000")
        .setTitle(`Pile ou face de ${message.author.tag}`)
        .setDescription("_Lancement de la pièce..._")
        .setImage("https://media.giphy.com/media/2wZoM5eL8n6xhQ1fhw/giphy.gif")
        .setFooter("Pile, ou face ?")
        message.channel.send(coinflip)

        let args = message.content.split(" ").slice(1);
        let tte = args.join(" ")
        if (!tte){

          var replys = [
            `La pièce est tombée sur pile, ${message.author} !`,
            `La pièce est tombée sur face, ${message.author} !`
        ]};

        let reponse = (replys[Math.floor(Math.random() * replys.length)])

        message.channel.send()
        message.channel.send()
        message.channel.send(reponse)
    }

    if(message.content.startsWith(prefix + "report")) {
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        let argsreport = message.content.split(" ").slice(1);
           var bug = argsreport.slice(0).join(" ")
           if(!bug) return message.reply("merci de renseigner ce que vous voulez report !")
               
                       var reportsend = new Discord.RichEmbed()
                       .setColor("#CC0000")
                       .setTitle(":rotating_light: **__Report !__** :rotating_light:")
                       .setDescription("_Un utilisateur a report quelque chose !_")
                       .addField("Report de :", "**[ " + message.author.username + " ]**", true)
                       .addField("Provenant du serveur :", "**[ " + message.guild.name + " ]**", true)
                       .addField(`Contenu du report :`, "**" + bug + "**")
                       .setFooter("Ax'bot Report")
                       .setTimestamp()
                       
                       
              client.guilds.get("374678925848084480").channels.get("474522454740566036").send(reportsend)

                           var report = new Discord.RichEmbed()
                           .setColor("#CC0000")
                           .setDescription(`**Votre report a correctement été envoyé, __${message.author.tag}__ !**`)
                           .setFooter("Merci de votre report, Axralt s'en occupe dès que possible !")
                           .setTimestamp()
           message.channel.send(report)
       
    }

    if(message.content.startsWith(prefix + "global")) {
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        let argsglobal = message.content.split(" ").slice(1);
        let argsglobaltext = argsglobal.join(" ");
        let argsglobalchan = message.guild.channels.find('name', 'axglobal');
        if(!argsglobalchan) return message.channel.send("Je n'arrive pas à trouver le channel **#axglobal**, " + message.author + ".")
        if(message.channel.name !== 'axglobal') return message.channel.send("Cette commande s'effectue dans le channel nommé **axglobal** !")
        if(!argsglobaltext) return message.channel.send("Il faut écrire un message, " + message.author + ", sinon, ça ne fonctionne pas !")
        var global_embed = new Discord.RichEmbed()
        .setColor("#CC0000")
        .setTitle("Message global Axralien")
        .setThumbnail(message.author.avatarURL)
        .addField("_Message envoyé par :_ ", "**[ " + message.author.tag + " ]**", true)
        .addField("_Envoyé depuis le serveur :_", "**[ " + message.guild.name + " ]**" + " \n_(Serveur comptant **" + message.guild.memberCount + "** utilisateurs, bots compris.)_", true)
        .addField("Le contenu du message est :", argsglobaltext)
        .setImage(message.guild.iconURL)
        .setFooter("Tchat global Axralien.")
        .setTimestamp()
        client.channels.findAll('name', 'axglobal').map(channel => channel.send(global_embed))
    
    }

    let mgname = message.content.toLowerCase();
    let gname = message.content.slice(prefix.length).trim().split(' ');
    let comgname = gname.shift().toLowerCase();
    if(message.content.startsWith(prefix + "altservname")) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_CHANNELS")) return message.channel.send(`Vous n'avez pas la permission, ${message.author} ! L'appellation du serveur ne sera donc pas altérée ! :x:`)
        if(!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) return message.channel.send(`Je n'ai pas la permission. L'appellation du serveur ne sera donc pas altérée ! :x:`)
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        if(message.content === prefix + "altservname") return message.channel.send("Pour altérer l'appellation du serveur, il faut inscrire la nouvelle appellation, " + message.author + " !")
        message.guild.setName(gname.join(' '))
         .then(g => console.log("Nom du serveur changé en " + '"' + gname.join(' ') + '"' +"!"))
         .catch(console.error);
         message.channel.send("L'altération de l'appellation du serveur a été effectuée avec succès ! :white_check_mark:")
    }

    let mcname = message.content.toLowerCase();
    let cname = message.content.slice(prefix.length).trim().split(' ');
    let comcname = cname.shift().toLowerCase();
    if(message.content.startsWith(prefix + "altchanname")) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_CHANNELS")) return message.channel.send(`Vous n'avez pas la permission, ${message.author} ! L'appellation du channel ne sera donc pas altérée ! :x:`)
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        if(message.content === prefix + "altchanname") return message.channel.send("Pour altérer l'appellation du channel, il faut inscrire la nouvelle appellation, " + message.author + " !")
        message.channel.setName(cname.join(' '))
         .then(g => console.log("Nom du channel changé en " + '"' + cname.join(' ') + '"' +"!"))
         .catch(console.error);
         message.channel.send("L'altération de l'appellation du channel a été effectuée avec succès ! :white_check_mark:")
    }
    
    if(message.content === "test"){
        if(message.author.id !== `289478007083499531`) return;
    }
    
    let mrpname = message.content.toLowerCase();
    let rpname = message.content.slice(prefix.length).trim().split(' ');
    let comrpname = rpname.shift().toLowerCase();
    if(message.content.startsWith(prefix + "narr")){
        message.delete()
        var rp_embed = new Discord.RichEmbed()
        .setColor("#CC0000")
        .setDescription("*" + rpname.join(' ') + "*")
        message.channel.send(rp_embed)
    }

    if(message.content.startsWith(prefix + "setavatarnoël")) {
        if(message.author.id !== `289478007083499531`) return("Seul mon créateur peut effectuer cette commande !")
        client.user.setAvatar("./Avatar Ax'bot (Noël).png")
        client.guilds.get("374678925848084480").channels.get("475369880351145987").send("Avatar changé en celui de Noël !")
        message.channel.send("J'ai mis mon avatar de Noël, comme tu me l'as demandé, " + message.author + " ! :blush:")
    }

    if(message.content.startsWith(prefix + "setavataraxbot")) {
        if(message.author.id !== `289478007083499531`) return("Seul mon créateur peut effectuer cette commande !")
        client.user.setAvatar("./Avatar Ax'bot.png")
        client.guilds.get("374678925848084480").channels.get("475369880351145987").send("Avatar remis en place !")
        message.channel.send("J'ai remis mon avatar, comme tu me l'as demandé, " + message.author + " ! :blush:")
    }

    if(message.content.startsWith(prefix + "pin")) {
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        let argspin = message.content.split(" ").slice();
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission d'épingler un message, " + message.author + " !")
        if(!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Je n'ai pas la permission d'épingler un message, " + message.author + " !")
        message.pin(argspin.join(' '))
    }


    //Utiles
    if(message.content.startsWith(prefix + "myavatar")) {
        message.channel.send(`Tu voulais voir ton avatar, ${message.author} ? Tiens, le voilà !`)
        var avatar_embed = new Discord.RichEmbed()
        .setColor("#CC0000")
        .setAuthor(`Votre avatar`)
        .setImage(message.author.displayAvatarURL)
        .setFooter("myavatar")
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        message.channel.send(avatar_embed)

    }

    if(message.content.startsWith(prefix + "avatarof")) {
        let user = message.mentions.users.first() || message.author

        if(message.mentions.users.first() === message.author){
            message.channel.send("Nan, tu utilises **Ax'myavatar** pour ça ! ;D")
        }

       if(message.content === prefix + "avatarof") return message.reply("il faut mentionner un utilisateur, ou un bot !")
       if(message.content === prefix + `avatarof ${client.user}`) return;

        else {
         message.channel.send(`Voici l'avatar de **${user.tag}** !`)

         var avatar_embed = new Discord.RichEmbed()
         .setColor("#CC0000")
         .setAuthor(`Avatar de ${user.username}`)
         .setImage(user.displayAvatarURL)
         .setFooter("avatarof")
         if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
         message.channel.send(avatar_embed)
    }}

    if(message.content.startsWith(prefix + "avatarbot")) {
        message.channel.send(`Voici mon avatar, ${message.author} !`)
        var avatar_embed = new Discord.RichEmbed()
        .setColor("#CC0000")
        .setAuthor(`Mon avatar`)
        .setImage(client.user.displayAvatarURL)
        .setFooter("avatarbot")
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        message.channel.send(avatar_embed)

    }  

    if(message.content.startsWith(prefix + "servicon")) {
        message.channel.send(`Voici l'icône du serveur, ${message.author} !`)
        var servicon_embed = new Discord.RichEmbed()
        .setColor("#CC0000")
        .setAuthor("Icône du serveur")
        .setImage(message.guild.iconURL)
        .setFooter("servicon")
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        message.channel.send(servicon_embed)
    }
    
    if(message.content.startsWith(prefix + "Communauté")) {
        var communauté_embed = new Discord.RichEmbed()
        .setColor("#CC0000")
        .setAuthor(`${message.author.tag}`)
        .setDescription("_Invitation au serveur **CommunautAx**._")
        .addField("Tu as demandé à rejoindre **CommunautAx**, c'est bien ça ?", `Et bien, voilà l'invitation ! :grin: \nhttps://discord.gg/wvZs9vj`)
        .setImage("https://i.imgur.com/9VQe3Pa.png")
        .setFooter("CommunautAx")
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        message.channel.send(`Tu peux aller voir dans tes messages privés, tu as reçu l'invitation, ${message.author}.`)
        message.author.createDM().then(function (channel) {
            channel.send(communauté_embed)
          }).catch(console.error)
    }

    if(message.content.startsWith(prefix + "Musée")) {
        var musée_embed = new Discord.RichEmbed()
        .setColor("#CC0000")
        .setAuthor(`${message.author.tag}`)
        .setDescription("_Invitation au serveur **MuséAx !**._")
        .addField("Tu as demandé à rejoindre **MuséAx !**, c'est bien ça ?", `Et bien, voilà l'invitation ! :grin: \nhttps://discord.gg/Cv2QkNa`)
        .setImage("https://i.imgur.com/XcS5V6R.png")
        .setFooter("MuséAx !")
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        message.channel.send(`Tu peux aller voir dans tes messages privés, tu as reçu l'invitation, ${message.author}.`)
        message.author.createDM().then(function (channel) {
            channel.send(musée_embed)
          }).catch(console.error)
    }

    if(message.content.startsWith(prefix + "bvn")) {
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        message.channel.send(`Le message de bienvenue vous a correctement été envoyé dans vos messages privés, ${message.author}.`)
        message.author.createDM().then(function (channel) {
            var bvn = new Discord.RichEmbed()
         .setColor("#CC0000")
         .setTitle("Message de mon créateur, Axralt, pour toi :")
         .addField("Tu viens de rejoindre un serveur !", "_Mon créateur te souhaite donc la bienvenue _!")
         .setThumbnail("https://i.imgur.com/QomkWtk.png")
         .setImage("https://i.imgur.com/UJsleMk.png")
         channel.send(bvn)
          }).catch(console.error)
    }

    //Culture
    if (message.content.startsWith(prefix + "2002")) {
        let args = message.content.split(" ").slice(1);
        let tte = args.join(" ")
        if (!tte){
      
          var replys = [
            "On emmerde toutes les générations 2000... sauf les 2002 ! VIVE LES 2002 !",
            "Le __volcan__ **Nyiragongo** entra en éruption le 18 janvier, il dévasta la ville de **Goma**, cela s'est passé dans la **République démocratique du Congo**.",
            "Le 23 janvier, le __cyclone__ **Dina** frappa l'île de **La Réunion**.",
            "Lancement de la première radio libre de l'île **Maurice**, **Radio One**, le 12 mars.",
            "Le 26 février, **Chen Liangyu** est devenu __maire__ de **Shanghai**.",
            "Le **Brésil** remporte la finale de la **Coupe du Monde** contre l'**Allemagne**, 2-0.",
            "Naissance de mon créateur, **Axralt**, le 18 septembre.",
            "Nouveau gouvernement formé par **Abdullah Gül**, en **Turquie**, le 19 novembre.",
            "**Driss Jettou** fût nommé __premier ministre__ par le **Roi du Maroc**, le 9 octobre.",
            "14 août, **Lyonpo Kinzang Dorji** est devenu __premier ministre__ du **Bhoutan**.",
            "Le **Timor oriental** est devenu, le 20 mai, un pays indépendant de l'**Indonésie**.",
            "Le 1er janvier fût officiellement lancé l'**Euro**, en pièces, et en billets, dans __12 pays__ sur les __15__ de l'**Union européenne**. Les 12 monnaies nationales ont disparu, afin de laisser place à l'**Euro**.",
            "Le 17 février, le **Franc** vivait officiellement son dernier jour d'utilisation.",
            "Le chômage était à 7,9%.",
            "Attentat de **Tampa**, le 5 janvier.",
            "Le 1er mars a eu lieu la __mission__ **STS-109**, une mission de la __navette spatiale__ **Columbia**.",
            "Attentat à **Karachi**, le 14 juin, devant le __consulat__ des États-Unis.",
            "Le 3 octobre, l'__ouragan__ **Lili** frappa les côtes de la Louisiane.",
            "Sortie du film __États-Unien__ **Star Wars, Episode II : _Attack of the Clones_** au cinéma, le 17 mai, en France.",
            "**Gérard Vié**, cuisinier français né le 11 avril 1943 obtient __2 étoiles__ au **__Guide Michelin__**, et est désigné **Meilleur cuisinier de l'année 2002**, par l'__*International Food and Beverage*__ de la **__Johnson & Wales University__**.",
            "L'année commença un mardi.",
            "Dans le mois de mai, **OpenOffice 1.0** fût sortit.",
          ];
          let reponse = (replys[Math.floor(Math.random() * replys.length)])
          if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
          message.channel.send(reponse)
    }}

    //XXX
    if(message.content.startsWith(prefix + "YouTube")){
        message.react("👌");
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        var ytax = new Discord.RichEmbed()
        .setColor("#CC0000")
        .setTitle("Chaîne YouTube Axralienne.")
        .setDescription("_Ci-dessous se trouve le lien de la chaîne YouTube de mon créateur._")
        .addField("Lien :", "_https://youtube.com/c/AxraltLeRoiRenard_")
        .setThumbnail("https://i.imgur.com/QomkWtk.png")
        .setImage("https://i.imgur.com/VbiviTA.png")
        message.channel.send(ytax)
    }

    //Fun
    let msgmod = message.content.toLowerCase();
    let argsmsgmod = message.content.slice(prefix.length).trim().split(' ');
    let commandmod = argsmsgmod.shift().toLowerCase();

    if(message.content.startsWith(prefix + "ann")) {""
     if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
     if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send(`Désolé, mais, tu n'as pas accès à cette commande, ${message.author}.`) 
         let saymod = argsmsgmod.join(' ');
         var say_embed = new Discord.RichEmbed()
         .setColor("#CC0000")
         .setDescription(argsmsgmod.join(' '))
         message.delete();
         message.channel.send(say_embed);
    }

    let msg = message.content.toLowerCase();
    let argsmsg = message.content.slice(prefix.length).trim().split(' ');
    let command = argsmsg.shift().toLowerCase();

    if(message.content.startsWith(prefix + "say")) {""
     if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
         message.delete();
         message.channel.send(argsmsg.join(' '));
    }

    if(message.content.startsWith(prefix + "8ball")) {
        let args = message.content.split(" ").slice(1);
        let tte = args.join(" ")
        if (!tte){
          return message.channel.send("Il vous faut poser une question !")};
      
          var replys = [
            ":8ball: | Oui !",
            ":8ball: | Non.",
            ":8ball: | Sans aucun doute !",
            ":8ball: | Pas du tout.",
            ":8ball: | Comment pourrait-il en être autrement ?",
            ":8ball: | Possiblement.",
            ":8ball: | Possiblement pas.",
            ":8ball: | Aucune idée.",
            ":8ball: | Sim !",
            ":8ball: | Não.",
            ":8ball: | Je dois vraiment répondre honnêtement...?",
            ":8ball: | Peut-être.",
            ":8ball: | Peut-être pas.",
            ":8ball: | Ouhla... je pense que non.",
          ];
          let reponse = (replys[Math.floor(Math.random() * replys.length)])
          if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
          message.channel.send(reponse)
    }

    //Informations
    if(message.content.startsWith(prefix + "infome")) {
        var infome_embed = new Discord.RichEmbed()
                .setColor("#CC0000")
                .setTitle("Liste de vos informations.")
                .setDescription("_Ici sont exhibées les informations de votre compte._")
                .addField(":man_in_tuxedo: ``Votre pseudo :``", `_${message.author.username}_`, true)
                .addField(":man_in_tuxedo: ``Votre surnom :``", `_${message.guild.member(message.author).nickname}_`, true)
                .addField(":id: ``Votre ID :``", `_${message.author.id}_`)
                .addField(":calendar: ``Date de création de votre compte :``", `_${message.author.createdAt}_`)
                .addField(":robot: ``Êtes-vous un bot ?``", `_Cela m'étonnerait fortement, alors, je dirais que non._`)
                .setThumbnail(message.author.displayAvatarURL)
                .setFooter("Informations - Utilisateur.", message.author.avatarURL)
                if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
                message.channel.send(infome_embed)
    }

    if(message.content === prefix + "infochan") {
        var infochan_embed = new Discord.RichEmbed()
       .setColor("#CC0000")
       .setTitle("Informations du channel.")
       .setDescription("_Ici, les informations du channel sont données._")
       .addField(":name_badge: ``Nom du channel :``", `***#${message.channel.name}***`, true)
       .addField(":id: ``ID du channel :``", `_${message.channel.id}_`, true)
       .addBlankField(true)
       .addField(":pencil: ``Type du channel :``", `_Il s'agit d'un channel textuel._`, true)
       .addField(":underage: ``NSFW ou non :``", `_${message.channel.nsfw}_`, true)
       .addField(":calendar: ``Date de création :``", `_${message.channel.createdAt}_`)
       .setFooter("Informations - Channel.")
       if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
       message.channel.send(infochan_embed);
    }
    if(message.content.startsWith(prefix + "infobot")) {
        var infobot_embed = new Discord.RichEmbed()
        .setColor("#CC0000")
        .setTitle("Informations du Bot.")
        .setDescription("_Ici sont exhibées les informations me concernant._")
        .addField(":man_in_tuxedo: ``Mon créateur :``", "_[Axralt](https://youtube.com/c/AxraltLeRoiRenard)_")
        .addField(":robot: ``Mon nom :``", `_${client.user.tag}_`, true)
        .addField(":track_previous: ``Mon préfixe :``", `_${prefix}_`, true)
        .addField(":id: ``Mon ID :``", `_${client.user.id}_`)
        .addField(":calendar: ``Ma date de création :``", `_${client.user.createdAt}_`)
        .addField(":robot: ``Suis-je un bot ?``", `_Oui, je suis un bot ! ;D_`)
        .setThumbnail(client.user.displayAvatarURL)
        .setFooter("Informations - Bot.", client.user.avatarURL)
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        message.channel.send(infobot_embed);
       
    }
 
    if(message.content.startsWith(prefix + "infoserv")) {
        var infoserv_embed = new Discord.RichEmbed()
        .setColor("#CC0000")
        .setTitle("Informations du serveur.")
        .setDescription("_Ici sont données les informations concernant le serveur._")
        .addField(":name_badge: ``Nom du serveur :``", `**_${message.guild.name}_**`, true)
        .addField(":id: ``ID du serveur :``", `_${message.guild.id}_`, true)
        .addField(":man_in_tuxedo: ``Propriétaire du serveur :``", `_${message.guild.owner}_`, true)
        .addField(":1234: ``Nombre d'utilisateurs :``", `_${message.guild.members.size} (Bots compris.)_`, true)
        .addField(":loud_sound::pencil: ``Nombre de channels :``", `_${message.guild.channels.size}_`, true)
        .addField(":zzz: ``Channel AFK :``", `**_${message.guild.afkChannel}_**`, true)
        .addField(":smiley: ``Nombre d'émojis personnalisés :``", `_${message.guild.emojis.size}_`, true)
        .addField(":scroll: ``Nombre de rôles :``", `_${message.guild.roles.size}_`, true)
        .addField(":map: ``Région du serveur :``", `_${message.guild.region}_`, true)
        .addField(":date: ``Date de création :``", `_${message.guild.createdAt}_`, true)
        .setThumbnail(message.guild.iconURL)
        .setFooter("Informations - Serveur.", message.guild.iconURL)
        if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
        message.channel.send(infoserv_embed);
    } 

    //XXX
    if(message.content.startsWith(prefix + "fox")) {
        let args = message.content.split(" ").slice(1);
        let tte = args.join(" ")
        if (!tte){
         
      
          var replys = [
            "https://media.giphy.com/media/LvHBV2O3aFqBG/giphy.gif",
            "https://media.giphy.com/media/qkdTy6tTmF7Xy/giphy.gif",
            "https://media.giphy.com/media/Kt3lpGbEkM8i4/giphy.gif",
            "https://media.giphy.com/media/TdMVH60kJvTMI/giphy.gif",
            "https://media.giphy.com/media/aYrtl1AhKDhjq/giphy.gif",
            "https://media.giphy.com/media/iTiG5vhZs7II/giphy.gif",
            "https://media.giphy.com/media/13D9Y0kCSv5du0/giphy.gif",
            "https://media.giphy.com/media/Vs3lyIJPTmBAk/giphy.gif",
            "https://media.giphy.com/media/bOuLUce0ama1G/giphy.gif",
            "https://media.giphy.com/media/qYfIy1fyi0Cdy/giphy.gif",
            "https://media.giphy.com/media/UNijmdYxMUeha/giphy.gif",
            "https://media.giphy.com/media/B1xlEHtKiFM9W/giphy.gif",
            "https://media.giphy.com/media/yO5nbWHNWMXKM/giphy.gif",
            "https://media.giphy.com/media/oEZTwViEemW7S/giphy.gif",
            "https://media.giphy.com/media/10iWB3hNBJGS6k/giphy.gif",
            "https://cdn.pixabay.com/photo/2017/04/14/16/46/red-fox-2230731_960_720.jpg",
            "https://cdn.pixabay.com/photo/2015/04/10/01/41/fox-715588_960_720.jpg",
            "https://cdn.pixabay.com/photo/2017/04/14/16/43/red-fox-2230730_960_720.jpg",
            "https://cdn.pixabay.com/photo/2015/02/12/21/05/fox-634307_960_720.jpg",
            "https://cdn.pixabay.com/photo/2016/08/05/22/30/fuchs-1573451_960_720.jpg",
            "https://cdn.pixabay.com/photo/2014/04/05/12/27/fox-317023_960_720.jpg",
            "https://cdn.pixabay.com/photo/2017/11/02/12/13/fuchs-2910975_960_720.jpg",
            "https://cdn.pixabay.com/photo/2017/06/26/16/20/desert-fox-2444230_960_720.jpg",
            "https://cdn.pixabay.com/photo/2016/01/27/17/18/fox-1164951_960_720.jpg",
            "https://cdn.pixabay.com/photo/2018/06/26/22/59/fox-3500499_960_720.jpg",
            "https://cdn.pixabay.com/photo/2017/11/02/09/36/fuchs-2910517_960_720.jpg",
            "https://cdn.pixabay.com/photo/2013/02/27/14/50/red-fox-86616_960_720.jpg",
            "https://cdn.pixabay.com/photo/2017/07/18/05/45/fox-2514836_960_720.jpg",
            "https://cdn.pixabay.com/photo/2015/04/13/19/01/fox-721105_960_720.jpg",
            "https://cdn.pixabay.com/photo/2017/05/31/08/03/arctic-fox-2359437_960_720.jpg",
          ];
          let reponse = (replys[Math.floor(Math.random() * replys.length)])
          if(message.author.bot) return message.channel.send(":warning: Indisponible pour les bots. :warning:")
          message.channel.send(reponse)
       
    }
    
 }});
