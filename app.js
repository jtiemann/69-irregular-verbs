// Functional composition using Ramda (R)
// Reactive streams using RxJS (rxjs)
const { fromEvent, BehaviorSubject, combineLatest, merge } = rxjs;
const { map, filter, debounceTime, tap, startWith, withLatestFrom, scan, distinctUntilChanged } = rxjs.operators;

// The 69 Verbs Data (Top B1 Irregular Verbs) with Conversational Examples
const irregularVerbs = [
    { inf: "sein", praet: "war", part: "gewesen", exInf: "Ich bin heute sehr müde von der Arbeit.", exPraet: "Ich war gestern auf einer tollen Party.", exPart: "Bist du schon mal in Berlin gewesen?" },
    { inf: "haben", praet: "hatte", part: "gehabt", exInf: "Wir haben heute Nachmittag leider keine Zeit.", exPraet: "Ich hatte gestern leider keine Zeit für das Treffen.", exPart: "Wir haben gestern beim Grillen viel Spaß gehabt." },
    { inf: "werden", praet: "wurde", part: "geworden", exInf: "Was möchtest du nach deinem Studium werden?", exPraet: "Das Wetter wurde am Abend ziemlich kalt.", exPart: "Mein Bruder ist vor kurzem Vater geworden." },
    { inf: "können", praet: "konnte", part: "gekonnt", exInf: "Kannst du mir bitte kurz beim Aufräumen helfen?", exPraet: "Ich konnte gestern Abend nicht einschlafen.", exPart: "Hast du das Rätsel wirklich lösen gekonnt?" },
    { inf: "müssen", praet: "musste", part: "gemusst", exInf: "Ich muss morgen leider sehr früh aufstehen.", exPraet: "Ich musste gestern sehr lange im Büro bleiben.", exPart: "Ich habe gestern noch einkaufen gemusst." },
    { inf: "sollen", praet: "sollte", part: "gesollt", exInf: "Soll ich vielleicht etwas zu trinken mitbringen?", exPraet: "Ich sollte gestern eigentlich früher schlafen gehen.", exPart: "Das habe ich eigentlich nicht so machen gesollt." },
    { inf: "wollen", praet: "wollte", part: "gewollt", exInf: "Willst du heute Abend mit uns ins Kino gehen?", exPraet: "Ich wollte dir eigentlich gestern schon schreiben.", exPart: "Das habe ich so nicht gewollt." },
    { inf: "dürfen", praet: "durfte", part: "gedurft", exInf: "Darf ich mich hier auf den freien Stuhl setzen?", exPraet: "Als Kind durfte ich abends nie fernsehen.", exPart: "Wir haben das noch nie machen gedurft." },
    { inf: "mögen", praet: "mochte", part: "gemocht", exInf: "Ich mag dieses kleine Restaurant wirklich sehr.", exPraet: "Früher mochte ich keinen Kaffee, aber heute liebe ich ihn.", exPart: "Ich habe diese Band schon immer sehr gemocht." },
    { inf: "wissen", praet: "wusste", part: "gewusst", exInf: "Weißt du zufällig, wie spät es gerade ist?", exPraet: "Ich wusste gar nicht, dass du so gut tanzen kannst!", exPart: "Hast du gewusst, dass sie umgezogen ist?" },
    { inf: "gehen", praet: "ging", part: "gegangen", exInf: "Wir gehen am Wochenende auf ein großes Konzert.", exPraet: "Wir gingen nach dem Essen noch ein Bier trinken.", exPart: "Sind alle Gäste schon nach Hause gegangen?" },
    { inf: "sehen", praet: "sah", part: "gesehen", exInf: "Ich sehe oft spannende Serien auf Deutsch.", exPraet: "Ich sah ihn gestern beim Bäcker.", exPart: "Habt ihr den neuen Film im Kino schon gesehen?" },
    { inf: "lassen", praet: "ließ", part: "gelassen", exInf: "Lass uns doch am Freitagabend Pizza bestellen!", exPraet: "Er ließ seine Schlüssel auf dem Tisch liegen.", exPart: "Ich habe mein Handy im Auto gelassen." },
    { inf: "stehen", praet: "stand", part: "gestanden", exInf: "Die sauberen Gläser stehen schon auf dem Tisch.", exPraet: "Ich stand gestern eine Stunde im Stau.", exPart: "Wir haben den ganzen Abend an der Bar gestanden." },
    { inf: "kommen", praet: "kam", part: "gekommen", exInf: "Kommst du morgen auch zu der Geburtstagsparty?", exPraet: "Anna kam gestern viel zu spät zur Party.", exPart: "Bist du gestern gut nach Hause gekommen?" },
    { inf: "tun", praet: "tat", part: "getan", exInf: "Es gibt heute im Garten noch viel für uns zu tun.", exPraet: "Mir tat nach dem Sport alles weh.", exPart: "Was hast du am Wochenende getan?" },
    { inf: "bringen", praet: "brachte", part: "gebracht", exInf: "Bringst du heute bitte den Müll raus?", exPraet: "Er brachte Wein zur Feier mit.", exPart: "Hast du den Müll schon rausgebracht?" },
    { inf: "fahren", praet: "fuhr", part: "gefahren", exInf: "Ich fahre jeden Tag mit dem Fahrrad zur Arbeit.", exPraet: "Wir fuhren letztes Wochenende in die Berge.", exPart: "Bist du schon mal mit dem Motorrad gefahren?" },
    { inf: "finden", praet: "fand", part: "gefunden", exInf: "Wie findest du eigentlich meine neue Wohnung?", exPraet: "Ich fand das Konzert wirklich großartig.", exPart: "Hast du deinen verlorenen Schlüssel wiedergefunden?" },
    { inf: "bleiben", praet: "blieb", part: "geblieben", exInf: "Wir bleiben heute Abend lieber gemütlich zu Hause.", exPraet: "Wir blieben bis zum Schluss auf dem Festival.", exPart: "Wie lange seid ihr gestern im Club geblieben?" },
    { inf: "geben", praet: "gab", part: "gegeben", exInf: "Gibt es hier in der Nähe einen wirklich guten Bäcker?", exPraet: "Es gab gestern fantastisches Essen auf der Hochzeit.", exPart: "Hat er dir meine Nachricht gegeben?" },
    { inf: "denken", praet: "dachte", part: "gedacht", exInf: "Ich denke oft gerne an unseren letzten Urlaub zurück.", exPraet: "Ich dachte, wir treffen uns erst um acht Uhr.", exPart: "Daran habe ich gar nicht gedacht!" },
    { inf: "nehmen", praet: "nahm", part: "genommen", exInf: "Ich nehme einen Espresso mit etwas Milch, bitte.", exPraet: "Ich nahm mir gestern einen Tag frei, um mich zu erholen.", exPart: "Wer hat das letzte Stück Pizza genommen?" },
    { inf: "halten", praet: "hielt", part: "gehalten", exInf: "Der Regionalzug hält fast an jedem kleinen Bahnhof.", exPraet: "Das Auto hielt plötzlich an der Kreuzung.", exPart: "Er hat sein Versprechen leider nicht gehalten." },
    { inf: "nennen", praet: "nannte", part: "genannt", exInf: "Man nennt diese alte Stadt auch das Venedig des Nordens.", exPraet: "Seine Freunde nannten ihn früher immer 'Speedy'.", exPart: "Hat er dir den Namen des Restaurants schon genannt?" },
    { inf: "ziehen", praet: "zog", part: "gezogen", exInf: "Wir ziehen im nächsten Monat in eine viel größere Wohnung.", exPraet: "Sie zog letztes Jahr von Berlin nach München.", exPart: "Wir sind gerade in eine neue Wohnung gezogen." },
    { inf: "fallen", praet: "fiel", part: "gefallen", exInf: "Die bunten Blätter fallen im Herbst von den Bäumen.", exPraet: "Das Glas fiel mir leider aus der Hand.", exPart: "Bist du beim Skifahren hingefallen?" },
    { inf: "sitzen", praet: "saß", part: "gesessen", exInf: "Wir sitzen gerade mit Freunden in unserem Lieblingscafé.", exPraet: "Wir saßen gestern den ganzen Nachmittag im Café.", exPart: "Habt ihr auf dem Balkon gesessen?" },
    { inf: "sprechen", praet: "sprach", part: "gesprochen", exInf: "Sprichst du außer Deutsch und Englisch noch andere Sprachen?", exPraet: "Der Chef sprach heute Morgen kurz mit mir.", exPart: "Hast du auf der Party mit Maria gesprochen?" },
    { inf: "tragen", praet: "trug", part: "getragen", exInf: "Sie trägt heute ein sehr schickes rotes Kleid.", exPraet: "Sie trug ein wunderschönes rotes Kleid auf der Party.", exPart: "Wer hat den schweren Karton getragen?" },
    { inf: "schreiben", praet: "schrieb", part: "geschrieben", exInf: "Ich schreibe dir heute Nachmittag eine kurze Nachricht.", exPraet: "Er schrieb mir sofort eine Nachricht, als er ankam.", exPart: "Hast du die Mail schon an die Kunden geschrieben?" },
    { inf: "lesen", praet: "las", part: "gelesen", exInf: "Ich lese abends am liebsten gemütlich im Bett Romane.", exPraet: "Ich las gestern abend gemütlich auf dem Sofa.", exPart: "Hast du das neue Buch von ihm schon gelesen?" },
    { inf: "treffen", praet: "traf", part: "getroffen", exInf: "Treffen wir uns morgen früh um acht vor dem Kino?", exPraet: "Ich traf gestern zufällig einen alten Schulfreund.", exPart: "Wir haben uns gestern auf einen Kaffee getroffen." },
    { inf: "trinken", praet: "trank", part: "getrunken", exInf: "Trinkst du morgens lieber schwarzen Kaffee oder grünen Tee?", exPraet: "Wir tranken gestern spontan ein paar Cocktails.", exPart: "Hast du auf der Feier gestern etwas getrunken?" },
    { inf: "essen", praet: "aß", part: "gegessen", exInf: "Wir essen am Sonntag eigentlich immer mit der ganzen Familie.", exPraet: "Wir aßen gestern in dem neuen Italiener um die Ecke.", exPart: "Habt ihr schon Abendessen gegessen?" },
    { inf: "helfen", praet: "half", part: "geholfen", exInf: "Kannst du mir heute kurz bei dieser schwierigen Aufgabe helfen?", exPraet: "Er half mir gestern beim Umzug.", exPart: "Vielen Dank, dass du uns so sehr geholfen hast." },
    { inf: "vergessen", praet: "vergaß", part: "vergessen", exInf: "Vergiss bitte nachher nicht, auf dem Heimweg Brot zu kaufen!", exPraet: "Ich vergaß völlig, dich anzurufen, tut mir leid!", exPart: "Hast du deinen Geldbeutel im Restaurant vergessen?" },
    { inf: "verlieren", praet: "verlor", part: "verloren", exInf: "Ich verliere wegen meiner Unordnung ständig meine Schlüssel.", exPraet: "Unser Team verlor das Spiel am Wochenende knapp.", exPart: "Ich habe leider meine Sonnenbrille am Strand verloren." },
    { inf: "beginnen", praet: "begann", part: "begonnen", exInf: "Wann genau beginnt eigentlich der neue Film in diesem Kino?", exPraet: "Der Film begann pünktlich um 20 Uhr.", exPart: "Hat die Vorlesung schon begonnen?" },
    { inf: "gewinnen", praet: "gewann", part: "gewonnen", exInf: "Wer gewinnt wohl dieses wichtige Fußballspiel heute Abend?", exPraet: "Sie gewann den Wettbewerb völlig verdient.", exPart: "Wer hat gestern das Fußballspiel gewonnen?" },
    { inf: "schlafen", praet: "schlief", part: "geschlafen", exInf: "Wie viele Stunden schläfst du normalerweise unter der Woche?", exPraet: "Ich schlief gestern auf der Couch vor dem Fernseher ein.", exPart: "Hast du im Hotel gut geschlafen?" },
    { inf: "bekommen", praet: "bekam", part: "bekommen", exInf: "Bekommen wir gleich noch die Dessertkarte für Eiscreme gereicht?", exPraet: "Ich bekam zu meinem Geburtstag ein tolles Geschenk.", exPart: "Hast du meine E-Mail heute Morgen bekommen?" },
    { inf: "gefallen", praet: "gefiel", part: "gefallen", exInf: "Gefällt dir eigentlich unsere neue Espressomaschine in der Küche?", exPraet: "Der neue Film gefiel mir überhaupt nicht.", exPart: "Hat dir die Ausstellung gefallen?" },
    { inf: "empfehlen", praet: "empfahl", part: "empfohlen", exInf: "Können Sie uns einen passenden Wein zu diesem Lachs empfehlen?", exPraet: "Der Kellner empfahl uns den Hauswein.", exPart: "Ein Freund hat mir dieses tolle Restaurant empfohlen." },
    { inf: "entscheiden", praet: "entschied", part: "entschieden", exInf: "Wir entscheiden das mit dem Urlaubsreiseziel einfach ganz spontan.", exPraet: "Wir entschieden uns ganz spontan für einen Kurztrip.", exPart: "Habt ihr euch schon für ein Reiseziel entschieden?" },
    { inf: "verstehen", praet: "verstand", part: "verstanden", exInf: "Ich verstehe diesen harten regionalen Dialekt leider oft gar nicht.", exPraet: "Ich verstand den Witz zuerst gar nicht.", exPart: "Hast du alles in der Besprechung verstanden?" },
    { inf: "fliegen", praet: "flog", part: "geflogen", exInf: "Wir fliegen am liebsten nächsten Sommer nach Mailand in Italien.", exPraet: "Wir flogen im Sommer nach Spanien.", exPart: "Bist du schon mal mit dem Hubschrauber geflogen?" },
    { inf: "schließen", praet: "schloss", part: "geschlossen", exInf: "Dieser Supermarkt an der Ecke schließt heute wegen des Feiertages schon um 20 Uhr.", exPraet: "Der Barkeeper schloss die Tür um zwei Uhr nachts ab.", exPart: "Hast du die Haustür richtig geschlossen?" },
    { inf: "bieten", praet: "bot", part: "geboten", exInf: "Dieses nette kleine Hotel am See bietet auch in der Nebensaison einen tollen Service.", exPraet: "Das kleine Hotel bot leider kein Frühstück an.", exPart: "Sie hat mir netterweise ihre Hilfe angeboten." },
    { inf: "bitten", praet: "bat", part: "gebeten", exInf: "Darf ich dich in dieser Angelegenheit um einen wirklich großen Gefallen bitten?", exPraet: "Ich bat ihn um einen kleinen Gefallen.", exPart: "Ich habe ihn gebeten, das Fenster zuzumachen." },
    { inf: "fangen", praet: "fing", part: "gefangen", exInf: "Der junge Hund fängt im Garten jeden Tag glücklich einen roten Ball.", exPraet: "Er fing den Ball noch in der letzten Sekunde.", exPart: "Habt ihr beim Angeln viele Fische gefangen?" },
    { inf: "hängen", praet: "hing", part: "gehangen", exInf: "Dieses große Familienfoto hängt doch hier an dieser Wand total schief, oder nicht?", exPraet: "Das Bild hing jahrelang in unserem alten Wohnzimmer.", exPart: "Wo hat deine Jacke gestern gehangen?" },
    { inf: "heißen", praet: "hieß", part: "geheißen", exInf: "Wie heißt nochmal dein neuer Mitbewohner, mit dem du künftig hier zusammenziehst?", exPraet: "Der Typ auf der Party hieß glaube ich Thomas.", exPart: "Wie hat das Restaurant noch gleich geheißen?" },
    { inf: "kennen", praet: "kannte", part: "gekannt", exInf: "Kennst du vielleicht ein gutes, günstiges asiatisches Restaurant hier ganz in der Nähe?", exPraet: "Ich kannte fast niemanden auf der Gästeliste.", exPart: "Habt ihr euch schon vor der Schulzeit gekannt?" },
    { inf: "laufen", praet: "lief", part: "gelaufen", exInf: "Wir laufen unter der Woche jeden Morgen eine kleine und entspannte Runde in dem Park.", exPraet: "Wir liefen den ganzen Weg vom Bahnhof nach Hause.", exPart: "Bist du den Halbmarathon wirklich in zwei Stunden gelaufen?" },
    { inf: "rufen", praet: "rief", part: "gerufen", exInf: "Ich rufe dich dann sehr gern morgen am frühen Abend nach der anstrengenden Arbeit kurz an.", exPraet: "Ich rief dir gestern von der anderen Straßenseite zu.", exPart: "Wer hat eben nach dir gerufen?" },
    { inf: "schlagen", praet: "schlug", part: "geschlagen", exInf: "Mein Herz schlägt wegen der Aufregung leider immer so extrem schnell vor wichtigen Prüfungen.", exPraet: "Er schlug vor, dass wir am Wochenende grillen.", exPart: "Hat er dir ernsthaft ins Gesicht geschlagen?" },
    { inf: "sterben", praet: "starb", part: "gestorben", exInf: "Ohne regelmäßiges Wasser sterben uns all diese schönen grünen Pflanzen auf dem Balkon weg.", exPraet: "Mein alter Hamster starb leider letzten Monat.", exPart: "Sein Großvater ist letztes Jahr friedlich gestorben." },
    { inf: "wachsen", praet: "wuchs", part: "gewachsen", exInf: "Die Kinder deiner Schwester wachsen in diesen ersten Lebensjahren wirklich sehr unglaublich schnell.", exPraet: "Ich wuchs in einer kleinen Küstenstadt auf.", exPart: "Dein Sohn ist aber groß gewachsen!" },
    { inf: "waschen", praet: "wusch", part: "gewaschen", exInf: "Ich wasche nach diesem harten Trainingstag heute noch sehr zügig am späten Abend ganz alleine meine restlichen Sportsachen in der Waschmaschine durch.", exPraet: "Er wusch das Auto am Samstag per Hand.", exPart: "Hast du deine Sportklamotten schon gewaschen?" },
    { inf: "binden", praet: "band", part: "gebunden", exInf: "Ich binde mir morgens immer ganz besonders schnell fest und sicher meine abgenutzten alten dunkelbraunen Lieblingslederschuhe beim Hinausgehen zu.", exPraet: "Sie band sich vor dem Joggen die Haare zusammen.", exPart: "Ich habe den Hund an den Baum gebunden, bevor ich in den Laden bin." },
    { inf: "singen", praet: "sang", part: "gesungen", exInf: "Wir singen abends alle auf der einsamen Rückfahrt oft immer furchtbar fröhlich laut und gemeinsam beim späten Autofahren völlig falsch in der Gegend umher.", exPraet: "Wir sangen nach ein paar Bieren laut im Karaoke-Club.", exPart: "Habt ihr an Weihnachten Lieder gesungen?" },
    { inf: "sinken", praet: "sank", part: "gesunken", exInf: "Die Temperaturen sinken zum Glück abends draußen in unserem gemütlichen dunklen Wald aktuell nach dem heißen Tag immer schnell oft wieder merklich auf ein erträgliches kühleres Maß herunter.", exPraet: "Das Boot sank glücklicherweise erst The nach der Evakuierung.", exPart: "Ist der Preis für die Tickets inzwischen etwas gesunken?" },
    { inf: "springen", praet: "sprang", part: "gesprungen", exInf: "Die kleinen fröhlichen Kinder und die Hunde der Nachbarsfamilie springen lachend und wild und so wahnsinnig vergnügt an diesem warmen weiten Sommernachmittag unermüdlich immer wieder in unseren kühlen runden kleinen Pool hinaus.", exPraet: "Der Hund sprang begeistert in den See.", exPart: "Bist du schon mal Fallschirm gesprungen?" },
    { inf: "werfen", praet: "warf", part: "geworfen", exInf: "Bitte wirf nach der langen dunklen Vorstellung später abends draußen stets umgehend brav und ganz vorsichtig deinen gesamten Müll in genau diesen einen großen Eimer gleich da vorne am Ausgang rein und lasse nicht einfach alles draußen in der freien nassen kühlen unaufgeräumten Natur liegen, danke dir sehr herzlich dafür im Voraus.", exPraet: "Er warf die kaputte Flasche vorsichtig in den Müll.", exPart: "Wer hat den Ball auf das Dach geworfen?" },
    { inf: "weisen", praet: "wies", part: "gewiesen", exInf: "Die klaren großen gelben Schilder vorne weisen uns und allen verlorenen Touristen den langen Weg zum historischen Bahnhof.", exPraet: "Der Kellner wies uns einen gemütlichen Tisch am Fenster zu.", exPart: "Er hat mich extra auf den Fehler hingewiesen." },
    { inf: "zwingen", praet: "zwang", part: "gezwungen", exInf: "Wirklich absolut niemand in diesem ganzen weiten Raum zwingt dich heute widerwillig dazu, das hier jetzt zu essen.", exPraet: "Der Regen zwang uns, das Picknick abzusagen.", exPart: "Du hast mich doch dazu gezwungen, das Geheimnis zu verraten!" },
    { inf: "brechen", praet: "brach", part: "gebrochen", exInf: "Hoffentlich bricht hier jetzt das dünne Eis auf dem See wirklich heute nicht direkt unter uns beiden armen Leuten auf einmal so schrecklich laut ein.", exPraet: "Er brach beim Skifahren leider sein Bein.", exPart: "Oh nein, ist dein Handydisplay gebrochen?" },
    { inf: "schwimmen", praet: "schwamm", part: "geschwommen", exInf: "Wir schwimmen meistens früh morgens im unendlich stillen blauen See.", exPraet: "Wir schwammen nachts im leeren Hotelpool.", exPart: "Bist du heute Morgen im See geschwommen?" }
];

// STATE MANAGEMENT (RxJS)
const activeTab$ = new BehaviorSubject('list');
const verbsList$ = new BehaviorSubject(irregularVerbs); // Full immutable list
const reviewHistory$ = new BehaviorSubject([]); // Stores test answers

// TEST STATE
const createDeck = () => R.take(10, R.sort(() => Math.random() - 0.5, irregularVerbs));
const testDeck$ = new BehaviorSubject(createDeck());
const currentTestIndex$ = new BehaviorSubject(0);
const score$ = new BehaviorSubject(0);
const answered$ = new BehaviorSubject(false);
const testComplete$ = new BehaviorSubject(false);

function restartTest() {
    testDeck$.next(createDeck());
    currentTestIndex$.next(0);
    score$.next(0);
    answered$.next(false);
    testComplete$.next(false);
    reviewHistory$.next([]); // Reset review history on new test
}

// AUDIO CONTEXT & FEEDBACK
let audioCtx;
function initAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}
function playSound(type) {
    try {
        initAudio();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        const now = audioCtx.currentTime;

        if (type === 'success') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.2, now + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
            osc.start(now);
            osc.stop(now + 0.4);
        } else if (type === 'error') {
            osc.type = 'square';
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.setValueAtTime(100, now + 0.1);
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.1, now + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            osc.start(now);
            osc.stop(now + 0.3);
        }
    } catch (e) {
        console.error('Audio playback failed', e);
    }
}

// SUBSCRIPTION TRACKER
let viewSubscriptions = [];
function clearSubscriptions() {
    viewSubscriptions.forEach(sub => sub.unsubscribe());
    viewSubscriptions = [];
}

// ==== SPEECH RECOGNITION ====
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// ==== APP BOOTSTRAP ====
document.addEventListener("DOMContentLoaded", () => {
    setupNavigation();

    // Subscribe to tab changes to render current view
    activeTab$.pipe(distinctUntilChanged()).subscribe(tab => {
        clearSubscriptions();
        renderView(tab);
        updateNavUI(tab);
    });
});

// ==== NAVIGATION LOGIC ====
function setupNavigation() {
    const navButtons = document.querySelectorAll('.tab-btn');

    fromEvent(navButtons, 'click').pipe(
        map(e => e.target.getAttribute('data-tab'))
    ).subscribe(tab => activeTab$.next(tab));
}

function updateNavUI(activeTabValue) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        if (btn.getAttribute('data-tab') === activeTabValue) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

const getTemplateElement = id => document.getElementById(id).content.cloneNode(true);
const appRoot = document.getElementById('app-root');

function renderView(tab) {
    appRoot.innerHTML = ''; // Clear DOM
    appRoot.appendChild(getTemplateElement(`tpl-${tab}`));

    // Initialize logic based on view
    if (tab === 'list') initListView();
    if (tab === 'learn') initLearnView();
    if (tab === 'test') initTestView();
    if (tab === 'review') initReviewView();
}


// ==== LIST VIEW LOGIC ====
function initListView() {
    const inputEl = document.getElementById('search-input');
    const tbodyEl = document.getElementById('verb-tbody');
    const btnToggleEx = document.getElementById('btn-toggle-examples-list');

    const showExamples$ = new BehaviorSubject(false);

    // Ramda: pure function to create table rows from verbs
    const createRowHTML = (verb, showExamples) => {
        const row = `
            <tr>
                <td>
                    <strong>${verb.inf}</strong>
                    ${showExamples ? `<span class="example-sub">${verb.exInf}</span>` : ''}
                </td>
                <td>
                    ${verb.praet}
                    ${showExamples ? `<span class="example-sub">${verb.exPraet}</span>` : ''}
                </td>
                <td>
                    ${verb.part}
                    ${showExamples ? `<span class="example-sub">${verb.exPart}</span>` : ''}
                </td>
            </tr>
        `;
        return row;
    };

    const renderTableRows = (verbs, showExamples) => R.pipe(
        R.map(v => createRowHTML(v, showExamples)),
        R.join('')
    )(verbs);

    // Initial render
    tbodyEl.innerHTML = renderTableRows(verbsList$.value);

    // RxJS Stream for Search Input
    const search$ = fromEvent(inputEl, 'input').pipe(
        map(e => e.target.value.toLowerCase().trim()),
        debounceTime(300),
        startWith('')
    );

    // Filter logic using Ramda
    // curried filter function checking if input is substring of any verb property values
    const matchVerb = term => verb => R.any(val => String(val).toLowerCase().includes(term), R.values(verb));
    const filterVerbs = (term, verbs) => R.filter(matchVerb(term), verbs);

    const subToggle = fromEvent(btnToggleEx, 'click').subscribe(() => {
        showExamples$.next(!showExamples$.value);
    });

    const subRender = combineLatest([search$, verbsList$, showExamples$])
        .pipe(
            map(([term, verbs, showExamples]) => {
                const filtered = filterVerbs(term, verbs);
                return renderTableRows(filtered, showExamples);
            })
        ).subscribe(html => {
            tbodyEl.innerHTML = html;
            btnToggleEx.textContent = showExamples$.value ? 'Hide Examples' : 'Show Examples';
            if (showExamples$.value) {
                btnToggleEx.classList.add('active');
            } else {
                btnToggleEx.classList.remove('active');
            }
        });

    viewSubscriptions.push(subToggle, subRender);
}


// ==== LEARN VIEW LOGIC ====
function initLearnView() {
    // Ramda: utility to shuffle an array purely
    const shuffleArray = R.sort(() => Math.random() - 0.5);

    // State specific to Learn view
    const deck$ = new BehaviorSubject(irregularVerbs);
    const currentIndex$ = new BehaviorSubject(0);
    const flipped$ = new BehaviorSubject(false);
    const showExamples$ = new BehaviorSubject(false);

    // Elements
    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');
    const btnShuffle = document.getElementById('btn-shuffle');
    const btnToggleEx = document.getElementById('btn-toggle-examples-learn');

    const flashcard = document.getElementById('flashcard');
    const elInf = document.getElementById('fc-inf');
    const elPraet = document.getElementById('fc-praet');
    const elPart = document.getElementById('fc-part');
    const elExInf = document.getElementById('fc-ex-inf');
    const elExPraet = document.getElementById('fc-ex-praet');
    const elExPart = document.getElementById('fc-ex-part');
    const counter = document.getElementById('card-counter');

    // Actions
    const subNext = fromEvent(btnNext, 'click').subscribe(() => {
        const current = currentIndex$.value;
        const total = deck$.value.length;
        flipped$.next(false);
        setTimeout(() => currentIndex$.next((current + 1) % total), 150);
    });

    const subPrev = fromEvent(btnPrev, 'click').subscribe(() => {
        const current = currentIndex$.value;
        const total = deck$.value.length;
        flipped$.next(false);
        setTimeout(() => currentIndex$.next((current - 1 + total) % total), 150);
    });

    const subShuffle = fromEvent(btnShuffle, 'click').subscribe(() => {
        deck$.next(shuffleArray(irregularVerbs));
        flipped$.next(false);
        currentIndex$.next(0);
    });

    const subFlip = fromEvent(flashcard, 'click').subscribe(() => {
        flipped$.next(!flipped$.value);
    });

    const subToggleEx = fromEvent(btnToggleEx, 'click').subscribe(() => {
        showExamples$.next(!showExamples$.value);
    });

    // Reactive UI Updates
    const subCardUpdate = combineLatest([deck$, currentIndex$, showExamples$]).subscribe(([deck, idx, showEx]) => {
        const card = deck[idx];
        elInf.textContent = card.inf;
        elPraet.textContent = card.praet;
        elPart.textContent = card.part;

        elExInf.textContent = `"${card.exInf}"`;
        elExPraet.textContent = `"${card.exPraet}"`;
        elExPart.textContent = `"${card.exPart}"`;

        if (showEx) {
            elExInf.classList.remove('hidden');
            elExPraet.classList.remove('hidden');
            elExPart.classList.remove('hidden');
            btnToggleEx.classList.add('active');
        } else {
            elExInf.classList.add('hidden');
            elExPraet.classList.add('hidden');
            elExPart.classList.add('hidden');
            btnToggleEx.classList.remove('active');
        }

        counter.textContent = `${idx + 1} / ${deck.length}`;
    });

    const subFlipUpdate = flipped$.subscribe(isFlipped => {
        if (isFlipped) flashcard.classList.add('is-flipped');
        else flashcard.classList.remove('is-flipped');
    });

    viewSubscriptions.push(subNext, subPrev, subShuffle, subFlip, subToggleEx, subCardUpdate, subFlipUpdate);
}


// ==== TEST VIEW LOGIC ====
function initTestView() {
    // Elements
    const testBoxActive = document.getElementById('test-box-active');
    const testBoxDone = document.getElementById('test-box-done');
    const inputPraet = document.getElementById('input-praet');
    const inputPart = document.getElementById('input-part');
    const btnCheck = document.getElementById('btn-check');
    const btnNextTest = document.getElementById('btn-next-test');
    const btnRestartTest = document.getElementById('btn-restart-test');

    // Voice UI
    const micPraet = document.getElementById('mic-praet');
    const micPart = document.getElementById('mic-part');

    const uiInf = document.getElementById('test-verb-inf');
    const scoreVal = document.getElementById('test-score');
    const scoreTotal = document.getElementById('test-total');
    const finalScore = document.getElementById('final-score');
    const fbPraet = document.getElementById('feedback-praet');
    const fbPart = document.getElementById('feedback-part');

    // Display verb updates
    const subVerbUpdate = combineLatest([testDeck$, currentTestIndex$, testComplete$]).subscribe(([deck, idx, complete]) => {
        if (complete) {
            testBoxActive.classList.add('hidden');
            testBoxDone.classList.remove('hidden');
            finalScore.textContent = score$.value;
        } else {
            testBoxActive.classList.remove('hidden');
            testBoxDone.classList.add('hidden');
            const verb = deck[idx];
            uiInf.textContent = verb.inf;
            inputPraet.value = '';
            inputPart.value = '';
            inputPraet.classList.remove('success', 'error');
            inputPart.classList.remove('success', 'error');
            testBoxActive.classList.remove('success-flash');
            fbPraet.textContent = '';
            fbPart.textContent = '';
            btnCheck.classList.remove('hidden');
            btnNextTest.classList.add('hidden');
            answered$.next(false);

            // Re-focus tracking
            setTimeout(() => inputPraet.focus(), 50);
        }
    });

    const subScoreUpdate = combineLatest([score$, testDeck$, currentTestIndex$]).subscribe(([score, deck, idx]) => {
        scoreVal.textContent = score;
        scoreTotal.textContent = deck.length;
    });

    // Normalizer (Ramda)
    const normalize = R.pipe(
        R.toLower,
        R.trim
    );

    // Check Answer Logic triggered by Button Click or Enter key hitting the inputs
    const enterPresses$ = merge(
        fromEvent(inputPraet, 'keypress'),
        fromEvent(inputPart, 'keypress')
    ).pipe(filter(e => e.key === 'Enter'));

    const checkTrigger$ = merge(
        fromEvent(btnCheck, 'click'),
        enterPresses$
    ).pipe(
        withLatestFrom(answered$),
        filter(([_, answered]) => !answered) // only process check if not already answered
    );

    const subCheck = checkTrigger$.pipe(
        withLatestFrom(testDeck$, currentTestIndex$, score$)
    ).subscribe(([_, deck, idx, score]) => {
        const verb = deck[idx];
        const pInput = normalize(inputPraet.value);
        const ppInput = normalize(inputPart.value);

        const pCorrect = pInput === verb.praet;
        const ppCorrect = ppInput === verb.part;

        // UI Feedback
        if (pCorrect) {
            inputPraet.classList.add('success');
            fbPraet.textContent = '✅';
        } else {
            inputPraet.classList.add('error');
            fbPraet.textContent = `❌ (${verb.praet})`;
        }

        if (ppCorrect) {
            inputPart.classList.add('success');
            fbPart.textContent = '✅';
        } else {
            inputPart.classList.add('error');
            fbPart.textContent = `❌ (${verb.part})`;
        }

        // Update score
        if (pCorrect && ppCorrect) {
            score$.next(score + 1);

            // demonstrative UI update
            testBoxActive.classList.remove('success-flash');
            void testBoxActive.offsetWidth; // trigger reflow
            testBoxActive.classList.add('success-flash');

            playSound('success');
        } else {
            playSound('error');
        }

        // Save to History
        const currentHistory = reviewHistory$.value;
        reviewHistory$.next([{
            verb: verb,
            pInput: inputPraet.value,
            ppInput: inputPart.value,
            pCorrect: pCorrect,
            ppCorrect: ppCorrect
        }, ...currentHistory]);

        answered$.next(true);

        // Toggle buttons
        btnCheck.classList.add('hidden');
        btnNextTest.classList.remove('hidden');
        btnNextTest.focus();
    });

    // Handlers for next verb (via Enter or click)
    const nextTrigger$ = merge(
        fromEvent(btnNextTest, 'click'),
        fromEvent(document, 'keypress').pipe(filter(e => e.key === 'Enter'))
    ).pipe(
        withLatestFrom(answered$, testComplete$),
        filter(([_, answered, complete]) => answered && !complete)
    );

    const subNextQuestion = nextTrigger$.pipe(
        withLatestFrom(currentTestIndex$, testDeck$)
    ).subscribe(([_, idx, deck]) => {
        if (idx + 1 >= deck.length) {
            testComplete$.next(true);
        } else {
            currentTestIndex$.next(idx + 1);
        }
    });

    // Setup Voice Events
    const activeRecognitions = [];

    const setupSpeech = (btnElement, inputElement) => {
        if (!SpeechRecognition) {
            btnElement.style.display = 'none'; // hide if not supported
            console.log("SpeechRecognition not supported in this browser.");
            return rxjs.EMPTY.subscribe();
        }

        return fromEvent(btnElement, 'click').subscribe(() => {
            // If already recording with THIS button, stop it
            if (btnElement.classList.contains('recording')) {
                btnElement.classList.remove('recording');
                // stop all active
                activeRecognitions.forEach(rec => {
                    try { rec.stop() } catch (e) { }
                });
                activeRecognitions.length = 0;
                return;
            }

            // clear both so only one is active at a time
            micPraet.classList.remove('recording');
            micPart.classList.remove('recording');

            // Stop existing instances
            activeRecognitions.forEach(rec => {
                try { rec.stop() } catch (e) { }
            });
            activeRecognitions.length = 0;

            btnElement.classList.add('recording');

            // Create a fresh instance each time to avoid state issues
            const recognition = new SpeechRecognition();
            recognition.lang = 'de-DE';
            recognition.continuous = false;
            recognition.interimResults = false;
            activeRecognitions.push(recognition);

            recognition.onstart = () => {
                console.log("Speech recognition started.");
            };

            recognition.onresult = (event) => {
                const speechToText = event.results[0][0].transcript;
                console.log("Heard:", speechToText);
                inputElement.value = speechToText;
            };

            recognition.onerror = (e) => {
                console.error("Speech recognition error:", e.error);
                if (e.error === 'not-allowed') {
                    alert("Microphone access was denied. Please allow microphone access for this site.");
                } else if (e.error === 'network') {
                    console.error("Network error. Speech recognition requires internet access in some browsers.");
                }
                btnElement.classList.remove('recording');
            };

            recognition.onend = () => {
                console.log("Speech recognition ended.");
                btnElement.classList.remove('recording');
                const index = activeRecognitions.indexOf(recognition);
                if (index > -1) activeRecognitions.splice(index, 1);
            };

            try {
                recognition.start();
            } catch (e) {
                console.error("Already started or failed to start", e);
                btnElement.classList.remove('recording');
            }
        });
    };

    window.addEventListener("beforeunload", () => {
        activeRecognitions.forEach(rec => {
            try { rec.stop() } catch (e) { }
        });
    });

    const subMicPraet = setupSpeech(micPraet, inputPraet);
    const subMicPart = setupSpeech(micPart, inputPart);

    viewSubscriptions.push(subVerbUpdate, subScoreUpdate, subCheck, subNextQuestion, subRestart, subMicPraet, subMicPart);
}


// ==== REVIEW VIEW LOGIC ====
function initReviewView() {
    const tbodyEl = document.getElementById('review-tbody');

    const renderReviewRow = entry => {
        const pClass = entry.pCorrect ? 'text-success' : 'text-error';
        const ppClass = entry.ppCorrect ? 'text-success' : 'text-error';

        const pDetails = entry.pCorrect
            ? entry.pInput
            : `${entry.pInput || '(empty)'} <span class="correct-ans">Correct: ${entry.verb.praet}</span>`;

        const ppDetails = entry.ppCorrect
            ? entry.ppInput
            : `${entry.ppInput || '(empty)'} <span class="correct-ans">Correct: ${entry.verb.part}</span>`;

        return `
            <tr>
                <td><strong>${entry.verb.inf}</strong></td>
                <td class="${pClass}">${pDetails}</td>
                <td class="${ppClass}">${ppDetails}</td>
            </tr>
        `;
    };

    const renderPlaceholder = () => `
        <tr>
            <td colspan="3" style="text-align: center; color: var(--text-secondary); padding: 2rem;">
                No test answers yet. Go take a test!
            </td>
        </tr>
    `;

    const subHistory = reviewHistory$.subscribe(history => {
        if (history.length === 0) {
            tbodyEl.innerHTML = renderPlaceholder();
        } else {
            tbodyEl.innerHTML = R.pipe(
                R.map(renderReviewRow),
                R.join('')
            )(history);
        }
    });

    viewSubscriptions.push(subHistory);
}
