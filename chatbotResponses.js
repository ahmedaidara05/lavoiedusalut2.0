const chatbotResponses = [
    {
        keywords: ["genese", "creation", "univers", "divin", "saint", "céleste", "origine", "aube"],
        response: "Dans le chapitre La Genèse, Ahmed Said Aidara explore la source sacrée de l’univers, révélée par le Coran, invitant à méditer sur la vérité islamique de la création."
    },
    {
        keywords: ["auteur", "ecrivain", "écrivain", "écrit", "ahmed", "said", "aidara", "ida"],
        response: "Ahmed Said Aidara mieux connu sous le nom de 'Mouhamad' ou 'Ida' est un jeune épistémophile, Sénégalais. Il est disciple à l'institut Al Mouyassar, après avoir mémorisé le Saint Coran ; diplômé, il continue ses études aux sciences religieuses. Il a été élu 'élève modèle' à cet institut en 2023 lors de la cérémonie 'remise de diplôme', après son discours. La Bible, lue par ce musulman, il décide de souligner certains points et faire un appel et un rappel aux hommes de Dieu. "
    },
    {
        keywords: ["dieu", "pere", "fils", "nom", "divin", "sacré", "unicite", "allah"],
        response: "Dans le chapitre Le terme Dieu, Père et Fils de Dieu, Ahmed Said Aidara rejette les noms chrétiens, prônant l’unicité d’Allah."
    },
    {
        keywords: ["apocalypse", "fin", "jugement", "dernier", "revelation", "eschatologie"],
        response: "Dans le chapitre Apocalypse, Ahmed Said Aidara discute des enseignements islamiques sur la fin des temps et le jugement dernier."
    },
    {
        keywords: ["genese", "creation", "univers", "divin", "saint", "origine", "aube"],
        response: "Dans le chapitre La Genèse, Ahmed Said Aidara explore la source de l’univers révélée par le Coran, invitant à méditer sur la vérité islamique de la création."
    },
    {
        keywords: ["creation", "etre", "identite", "saint", "divin", "ame", "spiritualite"],
        response: "Dans le chapitre Qui m’a créé et qui suis-je ?, Ahmed Said Aidara invite à découvrir l’être créé par Allah, guidant vers la vérité islamique."
    },
    {
        keywords: ["mission", "but", "dessein", "vocation", "divin", "saint", "humanite"],
        response: "Dans le chapitre Pourquoi on m’a créé ?, Ahmed Said Aidara révèle la mission de l’humanité soumise à la vérité d’Allah pour atteindre le salut."
    },
    {
        keywords: ["destin", "futur", "divin", "saint", "salut", "eternite"],
        response: "Dans le chapitre Qu’est-ce qui m’attend ?, Ahmed Said Aidara explore le destin de l’âme selon l’Islam, menant au salut éternel."
    },
    {
        keywords: ["paradis", "repos", "saint", "divin", "jardin", "eternite"],
        response: "Dans le chapitre Où irai-je ?, Ahmed Said Aidara décrit le paradis islamique, destination des croyants fidèles."
    },
    {
        keywords: ["mouhammad", "prophete", "saint", "divin", "messager", "guide"],
        response: "Dans le chapitre Mouhammad, Ahmed Said Aidara célèbre Mouhammad, porteur de la vérité coranique pour guider l’humanité."
    },
    {
        keywords: ["jesus", "isa", "prophete", "saint", "divin", "messager"],
        response: "Dans le chapitre Jésus-Christ, Ahmed Said Aidara présente Jésus comme prophète islamique, rejetant sa divinité chrétienne."
    },
    {
        keywords: ["miracles", "jesus", "signes", "divin", "saint", "prophetie"],
        response: "Dans le chapitre Les miracles de Jésus, Ahmed Said Aidara explore les signes divins de Jésus, confirmant sa prophétie islamique."
    },
    {
        keywords: ["trinite", "dieu", "saint", "divin", "unicite", "allah"],
        response: "Dans le chapitre La trinité, Ahmed Said Aidara rejette la trinité chrétienne, prônant l’unicité d’Allah selon l’Islam."
    },
    {
        keywords: ["harangue", "appel", "saint", "divin", "foi", "islam"],
        response: "Dans le chapitre Harangue, Ahmed Said Aidara délivre un appel à la foi islamique, avec respect et vérité."
    },
    {
        keywords: ["unite", "fraternite", "solidarite", "saint", "divin", "communaute"],
        response: "Dans le chapitre Inclusion, Ahmed Said Aidara promeut l’unité entre musulmans et non-musulmans pour une coexistence respectueuse."
    },
    {
        keywords: ["dieu", "allah", "saint", "divin", "createur", "misericorde"],
        response: "Dans le chapitre Qui est Dieu ?, Ahmed Said Aidara décrit Allah comme le Dieu unique et miséricordieux selon l’Islam."
    },
    {
        keywords: ["jesus", "dieu", "divinite", "saint", "prophete"],
        response: "Dans le chapitre Jésus, est-il Dieu ?, Ahmed Said Aidara rejette la divinité de Jésus, affirmant son rôle de prophète islamique."
    },
    {
        keywords: ["bible", "ecritures", "saint", "divin", "textes", "chretiens"],
        response: "Dans le chapitre La Bible, Ahmed Said Aidara examine les textes chrétiens, comparés au Coran pour révéler la vérité islamique."
    },
    {
        keywords: ["coran", "bible", "comparaison", "saint", "divin"],
        response: "Dans le chapitre Le Coran et la Bible, Ahmed Said Aidara analyse les textes sacrés, affirmant la supériorité du Coran."
    },
    {
        keywords: ["coran", "authenticite", "saint", "divin", "verite"],
        response: "Dans le chapitre L’auteur du Coran est-il un homme ?, Ahmed Said Aidara défend l’authenticité divine du Coran, rejetant une origine humaine."
    },
    {
        keywords: ["coran", "science", "saint", "divin", "connaissance"],
        response: "Dans le chapitre Le Coran et la Science, Ahmed Said Aidara explore les vérités scientifiques du Coran, preuve de sa révélation divine."
    },
    {
        keywords: ["coran", "originalite", "saint", "divin", "testament"],
        response: "Dans le chapitre Le Coran, une copie de l’ancien testament ?, Ahmed Said Aidara affirme l’originalité divine du Coran."
    },
    {
        keywords: ["coran", "mathematique", "saint", "divin", "precision"],
        response: "Dans le chapitre Mathématique, dans le Coran ?, Ahmed Said Aidara analyse les motifs mathématiques coraniques, signes de vérité."
    },
    {
        keywords: ["coran", "guidance", "saint", "divin", "voie"],
        response: "Dans le chapitre Le Coran, Ahmed Said Aidara présente le Coran comme guide divin pour l’humanité vers le salut."
    },
    {
        keywords: ["islam", "christianisme", "saint", "divin", "dialogue"],
        response: "Dans le chapitre L’Islam et le Christianisme, Ahmed Said Aidara promeut un dialogue pour révéler la vérité de l’Islam."
    },
    {
        keywords: ["salut", "grace", "saint", "divin", "islam"],
        response: "Dans le chapitre La Voie du Salut, Ahmed Said Aidara affirme l’Islam comme voie vers le salut éternel."
    },
    {
        keywords: ["jesus", "sauveur", "saint", "divin", "allah"],
        response: "Dans le chapitre Jésus, est-il le sauveur de l’humanité ?, Ahmed Said Aidara rejette Jésus comme sauveur, affirmant qu’Allah seul sauve."
    },
    {
        keywords: ["salut", "grace", "saint", "divin", "allah"],
        response: "Dans le chapitre Par qui Dieu sauve l’humanité ?, Ahmed Said Aidara affirme le salut par la grâce d’Allah."
    },
    {
        keywords: ["jesus", "isa", "musulman", "saint", "divin"],
        response: "Dans le chapitre Jésus, est-il musulman ?, Ahmed Said Aidara présente Jésus comme prophète islamique, soumis à Allah."
    },
    {
        keywords: ["priere", "salat", "saint", "divin", "bible"],
        response: "Dans le chapitre La prière musulmane, dans la Bible ?, Ahmed Said Aidara explore la salat islamique et ses parallèles bibliques."
    },
    {
        keywords: ["islam", "bible", "foi", "saint", "divin"],
        response: "Dans le chapitre L’islam, dans la Bible ?, Ahmed Said Aidara examine la foi islamique dans les textes bibliques."
    },
    {
        keywords: ["commandements", "lois", "saint", "divin", "coran"],
        response: "Dans le chapitre Les dix commandements, Ahmed Said Aidara compare les lois coraniques et bibliques."
    },
    {
        keywords: ["islam", "christianisme", "fraternite", "saint", "divin"],
        response: "Dans le chapitre L’islam et le christianisme, Ahmed Said Aidara promeut la fraternité entre musulmans et chrétiens."
    },
    {
        keywords: ["crucifixion", "jesus", "saint", "divin", "sacrifice"],
        response: "Dans le chapitre La crucifixion de Jésus-Christ, Ahmed Said Aidara rejette la crucifixion chrétienne, affirmant la vérité islamique."
    },
    {
        keywords: ["evangile", "barnabe", "saint", "divin", "islam"],
        response: "Dans le chapitre L’Évangile de Barnabé, Ahmed Said Aidara analyse ce texte, explorant son lien avec l’Islam."
    },
    {
        keywords: ["peche", "transgression", "saint", "divin", "islam"],
        response: "Dans le chapitre La question du péché, Ahmed Said Aidara compare le péché dans l’Islam et le Christianisme."
    },
    {
        keywords: ["mouhammad", "prophetie", "saint", "divin", "bible"],
        response: "Dans le chapitre Mouhammad PSL dans la Bible ?, Ahmed Said Aidara explore la prophétie de Mouhammad dans les textes bibliques."
    },
    {
        keywords: ["epilogue", "resume", "saint", "divin", "islam"],
        response: "Dans le chapitre Epilogue, Ahmed Said Aidara offre un résumé de la vérité islamique, réaffirmant la voie du salut."
    },
    {
        keywords: ["salut", "musulman", "saint", "divin", "assurance"],
        response: "Dans le chapitre Le salut du musulman est-il garanti ?, Ahmed Said Aidara explore la certitude du salut islamique."
    },
    {
        keywords: ["appel", "rappel", "saint", "divin", "islam"],
        response: "Dans le chapitre Appel et Rappel, Ahmed Said Aidara délivre un message invitant à embrasser la vérité de l’Islam."
    },
    {
        keywords: ["religion", "foi", "saint", "divin", "islam"],
        response: "Dans le chapitre Un Dieu, une religion, Ahmed Said Aidara promeut l’Islam comme religion unifiant les croyants."
    },
    {
        keywords: ["defis", "epreuve", "saint", "divin", "foi"],
        response: "Dans le chapitre Liste de défis, Ahmed Said Aidara propose des défis pour renforcer la foi islamique."
    },
    {
        keywords: ["enonce", "discours", "saint", "divin", "islam"],
        response: "Dans le chapitre Énoncé, Ahmed Said Aidara délivre un discours pour réaffirmer la vérité islamique."
    },
    {
        keywords: ["apocalypse", "jugement", "saint", "divin", "fin"],
        response: "Dans le chapitre Apocalypse, Ahmed Said Aidara explore l’eschatologie de l’Islam, guidant vers le salut."
    },
    {
        keywords: ["postface", "resume", "saint", "divin", "islam"],
        response: "Dans le chapitre Postface, Ahmed Said Aidara offre une conclusion consolidant la vérité islamique."
    },
    {
        keywords: ["jesus", "mission", "saint", "divin", "prophete"],
        response: "Dans le chapitre Qui est Jésus ?, Ahmed Said Aidara affirme la mission de Jésus comme prophète islamique."
    },
    {
        keywords: ["dieu", "pere", "fils", "saint", "divin", "unicite"],
        response: "Dans le chapitre Le terme Dieu, Père et Fils de Dieu, Ahmed Said Aidara rejette les noms chrétiens, prônant l’unicité d’Allah."
    }
   
];

export default chatbotResponses;
