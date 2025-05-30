// Configuration et initialisation de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAljojXHODwHjStePWkhthWLRzrw3pUslQ",
    authDomain: "la-voie-du-salut-36409.firebaseapp.com",
    projectId: "la-voie-du-salut-36409",
    storageBucket: "la-voie-du-salut-36409.firebasestorage.app",
    messagingSenderId: "61439310820",
    appId: "1:61439310820:web:52bfe8b862666ac13d25f1",
    measurementId: "G-G9S1ST8K3R"
};

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(() => {
        console.log('Service Worker registered');
    }).catch(err => console.error('Service Worker registration failed:', err));
}

document.addEventListener('DOMContentLoaded', () => {
    const homePage = document.getElementById('homePage');
    const indexPage = document.getElementById('indexPage');
    const readingPage = document.getElementById('readingPage');
    const settingsPanel = document.getElementById('settingsPanel');
    const favoritesPage = document.getElementById('favoritesPage');
    const notesPage = document.getElementById('notesPage');
    const arabicText = document.getElementById('arabicText');
    const textContent = document.getElementById('textContent');
    const suraTitle = document.getElementById('suraTitle');
    const languageSelect = document.getElementById('languageSelect');
    const themeSelect = document.getElementById('themeSelect');
    const fontSelect = document.getElementById('fontSelect');
    const fontSize = document.getElementById('fontSize');
    const favoritesList = document.getElementById('favoritesList');
    const searchBar = document.getElementById('searchBar');
    const searchResults = document.getElementById('searchResults');
    const customizePanel = document.getElementById('customizePanel');
    const favoriteBtn = document.querySelector('.favorite-btn');
    const voicePlayBtn = document.querySelector('.customize-panel .voice-play-btn');
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let notes = JSON.parse(localStorage.getItem('notes')) || {};
    let currentSura = 1;
    let isPlaying = false;
    let synth = window.speechSynthesis;
    let currentFontSize = 16;
    let hasPurchased = localStorage.getItem('hasPurchased') === 'true'; // État du paiement

    // Contenu des 44 sourates en arabe, anglais et français (avec 4 paragraphes pour 1-5 et 44)
    const suraContents = {
        1: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ<br><br>هذا النص هو مثال لمحتوى الفقرة الأولى في السورة الأولى. يمكن أن يكون هذا النص طويلاً أو قصيرًا حسب الحاجة، وهو هنا فقط لمحاكاة المحتوى الحقيقي الذي ستقوم بإضافته لاحقًا.<br><br>هذه الفقرة الثانية تتحدث عن موضوع آخر. ربما تكون هذه الفقرة تتناول تفاصيل إضافية أو قصة معينة مرتبطة بالسورة. يمكن أن تكون هذه الجملة أطول قليلاً لتوضيح الفكرة بشكل أفضل.<br><br>الفقرة الثالثة قد تحتوي على تعليمات أو دروس مستفادة. هنا يمكن أن نضيف بعض التفاصيل التي تجعل النص أكثر غنى وإفادة، مع الحفاظ على اللغة الطبيعية والسلسة.<br><br>أما الفقرة الرابعة فهي الختامية. يمكن أن تكون هذه الفقرة دعاء أو تأمل يلخص المعاني التي تم تناولها في السورة، مع إضافة بعض العبارات التي تعزز من الروحانية.",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>Praise be to Allah, the Lord of all the worlds<br><br>This text is an example of the first paragraph in the first chapter. It can be long or short depending on the need, and it’s here just to simulate the real content you’ll add later.<br><br>The second paragraph discusses another topic. Perhaps this paragraph delves into additional details or a specific story related to the chapter. This sentence might be a bit longer to better clarify the idea.<br><br>The third paragraph might contain instructions or lessons learned. Here we can add some details that make the text richer and more informative, while keeping the language natural and smooth.<br><br>As for the fourth paragraph, it’s the concluding one. This paragraph could be a prayer or a reflection summarizing the meanings discussed in the chapter, with some phrases added to enhance the spiritual tone.",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Louange à Allah, Seigneur des mondes<br><br>Ce texte est un exemple du premier paragraphe du premier chapitre. Il peut être long ou court selon les besoins, et il est ici uniquement pour simuler le contenu réel que vous ajouterez plus tard.<br><br>Le deuxième paragraphe aborde un autre sujet. Peut-être que ce paragraphe explore des détails supplémentaires ou une histoire spécifique liée au chapitre. Cette phrase peut être un peu plus longue pour mieux clarifier l’idée.<br><br>Le troisième paragraphe peut contenir des instructions ou des leçons tirées. Ici, nous pouvons ajouter des détails qui rendent le texte plus riche et informatif, tout en maintenant un langage naturel et fluide.<br><br>Quant au quatrième paragraphe, il est conclusif. Ce paragraphe pourrait être une prière ou une réflexion résumant les significations abordées dans le chapitre, avec quelques phrases ajoutées pour renforcer la tonalité spirituelle."
        },
        2: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>ذَٰلِكَ ٱلْكِتَٰبُ لَا رَيْبَ ۖ فِيهِ هُدًى لِّلْمُتَّقِينَ<br><br>هذه السورة تبدأ بتأكيد أهمية الكتاب المقدس. هذا النص يمكن أن يحتوي على تفاصيل عن كيفية استخدام هذا الكتاب كمرجع للحياة اليومية، مع إضافة بعض الأمثلة العملية.<br><br>الفقرة التالية قد تتحدث عن المتقين وصفاتهم. يمكن أن نذكر هنا كيف يمكن للإنسان أن يصبح من المتقين من خلال اتباع تعاليم الدين والالتزام بالأخلاق الحميدة.<br><br>في هذه الفقرة الثالثة، يمكننا مناقشة أهمية الصلاة والزكاة. هذه العبادات تعتبر من أركان الإسلام، ويمكن أن نتحدث عن تأثيرها الروحي والاجتماعي على الفرد والمجتمع.<br><br>أخيرًا، هذه الفقرة الرابعة تلخص الفوائد الروحية لهذه السورة. يمكن أن نتحدث عن الطمأنينة التي يجلبها الإيمان، مع دعاء يطلب الهداية والثبات على الصراط المستقيم.",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>This is the Book about which there is no doubt, a guidance for those conscious of Allah<br><br>This chapter begins by emphasizing the importance of the holy book. This text can include details about how to use this book as a guide for daily life, with some practical examples added.<br><br>The next paragraph might discuss the characteristics of the righteous. We can mention here how one can become among the righteous by following religious teachings and adhering to good morals.<br><br>In this third paragraph, we can discuss the importance of prayer and charity. These acts of worship are pillars of Islam, and we can talk about their spiritual and social impact on the individual and the community.<br><br>Finally, this fourth paragraph summarizes the spiritual benefits of this chapter. We can talk about the peace that faith brings, with a prayer asking for guidance and steadfastness on the straight path.",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Ceci est le Livre au sujet duquel il n'y a aucun doute, un guide pour les pieux<br><br>Ce chapitre commence par souligner l’importance du livre sacré. Ce texte peut inclure des détails sur la manière d’utiliser ce livre comme guide pour la vie quotidienne, avec quelques exemples pratiques ajoutés.<br><br>Le paragraphe suivant pourrait aborder les caractéristiques des pieux. Nous pouvons mentionner ici comment on peut devenir pieux en suivant les enseignements religieux et en adhérant à de bonnes mœurs.<br><br>Dans ce troisième paragraphe, nous pouvons discuter de l’importance de la prière et de l’aumône. Ces actes d’adoration sont des piliers de l’Islam, et nous pouvons parler de leur impact spirituel et social sur l’individu et la communauté.<br><br>Enfin, ce quatrième paragraphe résume les bienfaits spirituels de ce chapitre. Nous pouvons parler de la paix que la foi apporte, avec une prière demandant la guidance et la constance sur le droit chemin."
        },
        3: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>الم ۝ ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ<br><br>هذه الفقرة الأولى تتحدث عن توحيد الله. يمكن أن نذكر هنا أهمية الإيمان بوحدانية الله وكيف أن هذا الاعتقاد يشكل أساس العقيدة الإسلامية.<br><br>الفقرة الثانية قد تتناول قصة عائلة عمران. يمكن أن نشير إلى قصة مريم وميلاد عيسى عليهما السلام، مع التركيز على الدروس الأخلاقية المستفادة من هذه القصة.<br><br>في الفقرة الثالثة، يمكننا الحديث عن أهمية الصبر في مواجهة التحديات. هذه السورة تحتوي على دروس قيمة عن الصبر والثقة بالله في أوقات الشدة.<br><br>أخيرًا، الفقرة الرابعة تكون دعاء للثبات. يمكن أن نضيف هنا دعاء يطلب من الله القوة والثبات على الحق، مع إضافة بعض التأملات حول أهمية الاعتماد على الله.",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>Alif Lam Mim. Allah, there is no deity except Him, the Ever-Living, the Sustainer of existence<br><br>This first paragraph discusses the oneness of Allah. We can mention here the importance of believing in Allah’s unity and how this belief forms the foundation of Islamic faith.<br><br>The second paragraph might address the story of the family of Imran. We can refer to the story of Maryam and the birth of Jesus (peace be upon them), focusing on the moral lessons derived from this story.<br><br>In the third paragraph, we can talk about the importance of patience in facing challenges. This chapter contains valuable lessons about patience and trust in Allah during difficult times.<br><br>Finally, the fourth paragraph is a prayer for steadfastness. We can add here a prayer asking Allah for strength and steadfastness in the truth, with some reflections on the importance of relying on Allah.",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Alif Lam Mim. Allah, il n'y a de divinité sauf Lui, le Vivant, le Subsistant<br><br>Ce premier paragraphe parle de l’unicité d’Allah. Nous pouvons mentionner ici l’importance de croire en l’unicité d’Allah et comment cette croyance forme la base de la foi islamique.<br><br>Le deuxième paragraphe pourrait aborder l’histoire de la famille d’Imran. Nous pouvons faire référence à l’histoire de Maryam et de la naissance de Jésus (paix sur eux), en mettant l’accent sur les leçons morales tirées de cette histoire.<br><br>Dans le troisième paragraphe, nous pouvons parler de l’importance de la patience face aux défis. Ce chapitre contient des leçons précieuses sur la patience et la confiance en Allah dans les moments difficiles.<br><br>Enfin, le quatrième paragraphe est une prière pour la constance. Nous pouvons ajouter ici une prière demandant à Allah la force et la constance dans la vérité, avec quelques réflexions sur l’importance de s’en remettre à Allah."
        },
        4: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>يَٰٓأَيُّهَا ٱلنَّاسُ ٱتَّقُوا۟ رَبَّكُمُ ٱلَّذِى خَلَقَكُم<br><br>هذه الفقرة الأولى تتحدث عن خلق الإنسان. يمكن أن نذكر هنا كيف خلق الله الإنسان من نفس واحدة، وكيف أن هذا الخلق يعكس قدرة الله العظيمة.<br><br>الفقرة الثانية تتناول حقوق المرأة في الإسلام. هذه السورة تحتوي على تعاليم حول معاملة النساء بالعدل والإحسان، ويمكن أن نتحدث عن أهمية هذه القيم.<br><br>في الفقرة الثالثة، يمكننا مناقشة أهمية العدل في المعاملات. يمكن أن نتحدث عن كيفية التعامل مع اليتامى وإدارة الأموال بأمانة وشفافية.<br><br>الفقرة الرابعة تكون تأملية حول التقوى. يمكن أن نضيف هنا دعاء يطلب من الله التقوى والإخلاص في الأعمال، مع إضافة بعض النصائح العملية لتحقيق ذلك.",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>O mankind, fear your Lord, who created you from one soul...<br><br>This first paragraph talks about the creation of humanity. We can mention here how Allah created humans from a single soul, and how this creation reflects Allah’s immense power.<br><br>The second paragraph addresses women’s rights in Islam. This chapter contains teachings about treating women with justice and kindness, and we can discuss the importance of these values.<br><br>In the third paragraph, we can discuss the importance of justice in dealings. We can talk about how to deal with orphans and manage finances with honesty and transparency.<br><br>The fourth paragraph is a reflection on piety. We can add here a prayer asking Allah for piety and sincerity in actions, along with some practical advice to achieve that.",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Ô hommes, craignez votre Seigneur qui vous a créés d'une seule âme...<br><br>Ce premier paragraphe parle de la création de l’humanité. Nous pouvons mentionner ici comment Allah a créé les humains à partir d’une seule âme, et comment cette création reflète la puissance immense d’Allah.<br><br>Le deuxième paragraphe aborde les droits des femmes en Islam. Ce chapitre contient des enseignements sur le traitement des femmes avec justice et bonté, et nous pouvons discuter de l’importance de ces valeurs.<br><br>Dans le troisième paragraphe, nous pouvons discuter de l’importance de la justice dans les transactions. Nous pouvons parler de la manière de traiter les orphelins et de gérer les finances avec honnêteté et transparence.<br><br>Le quatrième paragraphe est une réflexion sur la piété. Nous pouvons ajouter ici une prière demandant à Allah la piété et la sincérité dans les actions, ainsi que quelques conseils pratiques pour y parvenir."
        },
        5: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوٓا۟ أَوْفُوا۟ بِٱلْعُقُودِ<br><br>هذه الفقرة الأولى تتحدث عن أهمية الوفاء بالعهود. يمكن أن نذكر هنا كيف أن الالتزام بالعهود هو من صفات المؤمنين الصادقين.<br><br>الفقرة الثانية تتناول الأحكام المتعلقة بالطعام. يمكن أن نتحدث عن الأطعمة المحللة والمحرمة، مع شرح الأسباب الروحية والصحية وراء هذه الأحكام.<br><br>في الفقرة الثالثة، يمكننا مناقشة أهمية العدل في القضاء. هذه السورة تحتوي على تعاليم حول كيفية إقامة العدل بين الناس، حتى في أصعب الظروف.<br><br>أخيرًا، الفقرة الرابعة تكون دعاء للثبات على الإيمان. يمكن أن نضيف هنا دعاء يطلب من الله الهداية والثبات في مواجهة التحديات.",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>O you who have believed, fulfill [all] contracts...<br><br>This first paragraph discusses the importance of fulfilling promises. We can mention here how keeping promises is a trait of truthful believers.<br><br>The second paragraph addresses the rulings related to food. We can talk about permissible and prohibited foods, explaining the spiritual and health reasons behind these rulings.<br><br>In the third paragraph, we can discuss the importance of justice in judgment. This chapter contains teachings about establishing justice among people, even in the most difficult circumstances.<br><br>Finally, the fourth paragraph is a prayer for steadfastness in faith. We can add here a prayer asking Allah for guidance and steadfastness in facing challenges.",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Ô vous qui avez cru, remplissez les contrats...<br><br>Ce premier paragraphe parle de l’importance de respecter les engagements. Nous pouvons mentionner ici comment tenir ses promesses est une caractéristique des croyants sincères.<br><br>Le deuxième paragraphe aborde les règles relatives à la nourriture. Nous pouvons parler des aliments autorisés et interdits, en expliquant les raisons spirituelles et sanitaires derrière ces règles.<br><br>Dans le troisième paragraphe, nous pouvons discuter de l’importance de la justice dans le jugement. Ce chapitre contient des enseignements sur l’établissement de la justice parmi les gens, même dans les circonstances les plus difficiles.<br><br>Enfin, le quatrième paragraphe est une prière pour la constance dans la foi. Nous pouvons ajouter ici une prière demandant à Allah la guidance et la constance face aux défis."
        },
        44: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>حٰمٓ ۚ وَٱلْكِتَٰبِ ٱلْمُبِينِ<br><br>هذه الفقرة الأولى تتحدث عن وضوح الكتاب. يمكن أن نذكر هنا كيف أن هذا الكتاب يحتوي على آيات واضحة تهدي الناس إلى الحق.<br><br>الفقرة الثانية تتناول قصة موسى وفرعون. يمكن أن نتحدث عن كيف أن الله أنقذ بني إسرائيل من فرعون، مع التركيز على عظمة الله.<br><br>في الفقرة الثالثة، يمكننا مناقشة أهمية الشكر لله. هذه السورة تحتوي على دروس حول شكر النعم في أوقات الرخاء والشدة.<br><br>أخيرًا، الفقرة الرابعة تكون دعاء للشكر. يمكن أن نضيف هنا دعاء يطلب من الله زيادة النعم وقبول الشكر.",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>Ha Mim. By the clear Book...<br><br>This first paragraph talks about the clarity of the Book. We can mention here how this Book contains clear verses that guide people to the truth.<br><br>The second paragraph addresses the story of Musa and Pharaoh. We can talk about how Allah saved the Children of Israel from Pharaoh, focusing on Allah’s greatness.<br><br>In the third paragraph, we can discuss the importance of gratitude to Allah. This chapter contains lessons about thanking Allah in times of ease and hardship.<br><br>Finally, the fourth paragraph is a prayer for gratitude. We can add here a prayer asking Allah for an increase in blessings and acceptance of gratitude.",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Ha Mim. Par le Livre clair...<br><br>Ce premier paragraphe parle de la clarté du Livre. Nous pouvons mentionner ici comment ce Livre contient des versets clairs qui guident les gens vers la vérité.<br><br>Le deuxième paragraphe aborde l’histoire de Musa et Pharaon. Nous pouvons parler de la manière dont Allah a sauvé les Enfants d’Israël de Pharaon, en mettant l’accent sur la grandeur d’Allah.<br><br>Dans le troisième paragraphe, nous pouvons discuter de l’importance de la gratitude envers Allah. Ce chapitre contient des leçons sur le fait de remercier Allah en temps de facilité et de difficulté.<br><br>Enfin, le quatrième paragraphe est une prière pour la gratitude. Nous pouvons ajouter ici une prière demandant à Allah une augmentation des bienfaits et l’acceptation de la gratitude."
        }
    };

    // Fonctions de navigation
    document.querySelector('.start-btn').addEventListener('click', () => {
        homePage.style.display = 'none';
        indexPage.style.display = 'block';
    });

    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (indexPage.style.display === 'block') indexPage.style.display = 'none';
            if (readingPage.style.display === 'block') readingPage.style.display = 'none';
            if (settingsPanel.style.display === 'block') settingsPanel.style.display = 'none';
            if (favoritesPage.style.display === 'block') favoritesPage.style.display = 'none';
            if (notesPage.style.display === 'block') notesPage.style.display = 'none';
            homePage.style.display = 'block';
        });
    });

    document.querySelectorAll('.index-page li').forEach(li => {
        li.addEventListener('click', () => {
            const suraNumber = parseInt(li.getAttribute('data-sura'));
            if (suraNumber <= 9 || hasPurchased) {
                currentSura = suraNumber;
                loadSuraContent();
                indexPage.style.display = 'none';
                readingPage.style.display = 'block';
            } else {
                showPaymentPopup(); // Ouvre la popup pour les chapitres payants
            }
        });
    });

    document.querySelector('.prev-btn').addEventListener('click', () => {
        if (currentSura > 1) {
            currentSura--;
            loadSuraContent();
        }
    });

    document.querySelector('.next-btn').addEventListener('click', () => {
        if (currentSura < 44) {
            if (currentSura >= 9 && !hasPurchased) {
                showPaymentPopup();
            } else {
                currentSura++;
                loadSuraContent();
            }
        }
    });

    document.querySelector('.settings-btn').addEventListener('click', () => {
        settingsPanel.style.display = 'block';
        readingPage.style.display = 'none';
    });

    document.querySelector('.favorites-btn').addEventListener('click', () => {
        loadFavorites();
        favoritesPage.style.display = 'block';
        readingPage.style.display = 'none';
    });

    document.querySelector('.index-btn').addEventListener('click', () => {
        indexPage.style.display = 'block';
        readingPage.style.display = 'none';
    });

    document.querySelector('.customize-btn').addEventListener('click', () => {
        customizePanel.style.display = 'block';
    });

    document.querySelector('.close-customize-btn').addEventListener('click', () => {
        customizePanel.style.display = 'none';
    });

    document.querySelector('.ai-btn').addEventListener('click', () => {
        alert('Assistant IA non implémenté dans cette version.');
    });

    // Gestion des paramètres
    languageSelect.addEventListener('change', loadSuraContent);
    themeSelect.addEventListener('change', (e) => {
        document.body.className = e.target.value === 'dark' ? 'dark' : '';
    });
    fontSelect.addEventListener('change', (e) => {
        document.body.style.fontFamily = e.target.value + ', serif';
    });
    fontSize.addEventListener('input', (e) => {
        currentFontSize = e.target.value;
        arabicText.style.fontSize = `${currentFontSize}px`;
        textContent.style.fontSize = `${currentFontSize}px`;
    });

    // Authentification
    document.querySelectorAll('.auth-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const username = btn.parentElement.querySelector('input[type="text"]').value;
            const password = btn.parentElement.querySelector('input[type="password"]').value;
            if (btn.textContent.includes('Se connecter')) {
                auth.signInWithEmailAndPassword(username, password)
                    .then(() => alert('Connecté avec succès'))
                    .catch(err => alert('Erreur de connexion: ' + err.message));
            } else if (btn.textContent.includes('S\'inscrire')) {
                auth.createUserWithEmailAndPassword(username, password)
                    .then(() => alert('Inscription réussie'))
                    .catch(err => alert('Erreur d\'inscription: ' + err.message));
            }
        });
    });

    // Favoris
    favoriteBtn.addEventListener('click', () => {
        if (!favorites.includes(currentSura)) {
            favorites.push(currentSura);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            favoriteBtn.textContent = '★';
            alert('Sourate ajoutée aux favoris !');
        } else {
            favorites = favorites.filter(f => f !== currentSura);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            favoriteBtn.textContent = '☆';
            alert('Sourate retirée des favoris !');
        }
    });

    function loadFavorites() {
        favoritesList.innerHTML = '';
        favorites.forEach(sura => {
            const li = document.createElement('li');
            li.textContent = `Sourate ${sura}`;
            li.addEventListener('click', () => {
                if (sura <= 9 || hasPurchased) {
                    currentSura = sura;
                    loadSuraContent();
                    favoritesPage.style.display = 'none';
                    readingPage.style.display = 'block';
                } else {
                    showPaymentPopup();
                }
            });
            favoritesList.appendChild(li);
        });
    }

    // Notes
    document.querySelector('.note-btn').addEventListener('click', () => {
        notesPage.style.display = 'block';
        readingPage.style.display = 'none';
        loadNotes();
    });

    document.querySelector('.add-category-btn').addEventListener('click', () => {
        const category = document.getElementById('newCategory').value;
        if (category && !notes[category]) {
            notes[category] = '';
            localStorage.setItem('notes', JSON.stringify(notes));
            loadNotes();
            document.getElementById('newCategory').value = '';
        }
    });

    function loadNotes() {
        const categoriesList = document.getElementById('categoriesList');
        categoriesList.innerHTML = '';
        for (let category in notes) {
            const div = document.createElement('div');
            div.className = 'category';
            div.innerHTML = `<h3>${category}</h3><textarea>${notes[category]}</textarea>`;
            div.querySelector('textarea').addEventListener('input', (e) => {
                notes[category] = e.target.value;
                localStorage.setItem('notes', JSON.stringify(notes));
            });
            categoriesList.appendChild(div);
        }
    }

    // Recherche intelligente
    searchBar.addEventListener('input', () => {
        const query = searchBar.value.toLowerCase();
        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }
        searchResults.innerHTML = '';
        searchResults.style.display = 'block';
        for (let sura in suraContents) {
            const content = suraContents[sura][languageSelect.value] || '';
            if (content.toLowerCase().includes(query)) {
                const div = document.createElement('div');
                div.className = 'result-item';
                div.textContent = `Sourate ${sura}`;
                div.addEventListener('click', () => {
                    const suraNumber = parseInt(sura);
                    if (suraNumber <= 9 || hasPurchased) {
                        currentSura = suraNumber;
                        loadSuraContent();
                        searchResults.style.display = 'none';
                    } else {
                        showPaymentPopup();
                    }
                });
                searchResults.appendChild(div);
            }
        }
    });

    document.addEventListener('click', (e) => {
        if (!searchBar.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });

    // Lecture à haute voix
    voicePlayBtn.addEventListener('click', () => {
        if (isPlaying) {
            synth.cancel();
            isPlaying = false;
            voicePlayBtn.innerHTML = '<i class="fas fa-play"></i> Lecture à haute voix';
        } else {
            const utterance = new SpeechSynthesisUtterance(arabicText.innerText || textContent.innerText);
            utterance.lang = languageSelect.value === 'ar' ? 'ar-SA' : languageSelect.value === 'en' ? 'en-US' : 'fr-FR';
            utterance.onend = () => {
                isPlaying = false;
                voicePlayBtn.innerHTML = '<i class="fas fa-play"></i> Lecture à haute voix';
            };
            synth.speak(utterance);
            isPlaying = true;
            voicePlayBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
        }
    });

    // Zoom
    document.querySelector('.zoom-in-btn').addEventListener('click', () => {
        if (currentFontSize < 30) {
            currentFontSize += 2;
            fontSize.value = currentFontSize;
            arabicText.style.fontSize = `${currentFontSize}px`;
            textContent.style.fontSize = `${currentFontSize}px`;
        }
    });

    document.querySelector('.zoom-out-btn').addEventListener('click', () => {
        if (currentFontSize > 12) {
            currentFontSize -= 2;
            fontSize.value = currentFontSize;
            arabicText.style.fontSize = `${currentFontSize}px`;
            textContent.style.fontSize = `${currentFontSize}px`;
        }
    });

    // Personnalisation des couleurs
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.body.style.backgroundColor = btn.getAttribute('data-color');
            localStorage.setItem('backgroundColor', btn.getAttribute('data-color'));
        });
    });

    // Charger le contenu de la sourate
    function loadSuraContent() {
        const suraData = suraContents[currentSura] || suraContents[1];
        suraTitle.textContent = `La Voie du Salut ${currentSura}`;
        arabicText.innerHTML = suraData.ar || '';
        textContent.innerHTML = suraData[languageSelect.value] || suraData.en;
        textContent.style.display = languageSelect.value === 'ar' ? 'none' : 'block';
        arabicText.style.display = languageSelect.value === 'ar' ? 'block' : 'none';
        arabicText.style.fontSize = `${currentFontSize}px`;
        textContent.style.fontSize = `${currentFontSize}px`;
        favoriteBtn.textContent = favorites.includes(currentSura) ? '★' : '☆';
    }

    // Charger les paramètres sauvegardés
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) themeSelect.value = savedTheme;
    document.body.className = savedTheme === 'dark' ? 'dark' : '';

    const savedFont = localStorage.getItem('font');
    if (savedFont) fontSelect.value = savedFont;
    document.body.style.fontFamily = savedFont + ', serif' || 'Amiri, serif';

    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        currentFontSize = savedFontSize;
        fontSize.value = currentFontSize;
        arabicText.style.fontSize = `${currentFontSize}px`;
        textContent.style.fontSize = `${currentFontSize}px`;
    }

    const savedBgColor = localStorage.getItem('backgroundColor');
    if (savedBgColor) document.body.style.backgroundColor = savedBgColor;

    // Initialisation
    loadSuraContent();
    loadFavorites();

    // Gestion des redirections après paiement
    const urlParams = new URLSearchParams(window.location.search);
    if (window.location.pathname === '/success') {
        localStorage.setItem('hasPurchased', 'true');
        hasPurchased = true;
        alert('Paiement réussi ! Vous avez maintenant accès à tous les chapitres.');
        window.location.href = window.location.origin;
    } else if (window.location.pathname === '/cancel') {
        alert('Paiement annulé. Vous pouvez réessayer à tout moment.');
        window.location.href = window.location.origin;
    }
});
