'use strict';
/*
 * Starter content for the portfolio, testimonials and team.
 * Portfolio items are marked kind: "concept" — signature formats S59 offers, illustrated with inspiration photos.
 * Replace photos with your own and switch kind to "case" when a project is really delivered.
 * Testimonials and team members are drafts (published: false): fill in real people, then publish.
 */
const I = (n) => '/img/insp/' + n + '.jpg';
const t = (en, pl, uk, ru) => ({ en, pl, uk, ru });

const projects = [
  {
    id: 'c1', slug: 'candlelight-cellar-supper', kind: 'concept', published: true, featured: true,
    category: 'private-celebrations', location: 'Warsaw', guests: '24',
    cover: I('candle-couple'), video: '', images: [I('candle-couple'), I('candle-round-table'), I('wine-ice'), I('oysters')],
    title: t('Candlelight Supper in a Stone Cellar', 'Kolacja przy świecach w kamiennej piwnicy', 'Вечеря при свічках у кам’яному льосі', 'Ужин при свечах в каменном погребе'),
    summary: t('An intimate dinner lit only by hundreds of candles: one long table, stone walls, a seasonal chef’s menu and live strings.', 'Kameralna kolacja oświetlona wyłącznie setkami świec: jeden długi stół, kamienne ściany, sezonowe menu szefa kuchni i smyczki na żywo.', 'Камерна вечеря, освітлена лише сотнями свічок: один довгий стіл, кам’яні стіни, сезонне меню від шефа та живі струнні.', 'Камерный ужин, освещённый только сотнями свечей: один длинный стол, каменные стены, сезонное меню от шефа и живые струнные.'),
    prep: t('3–4 weeks', '3–4 tygodnie', '3–4 тижні', '3–4 недели'),
    concept: t('A private celebration that feels like a secret: guests are led down by candlelight into a vaulted cellar, where the whole evening happens around one table.', 'Prywatna uroczystość, która wydaje się sekretem: goście schodzą przy świecach do sklepionej piwnicy, gdzie cały wieczór toczy się wokół jednego stołu.', 'Приватне свято, що відчувається як таємниця: гостей при світлі свічок проводять у склепінчастий льох, де весь вечір відбувається навколо одного столу.', 'Частный праздник, который ощущается как тайна: гостей при свете свечей проводят в сводчатый погреб, где весь вечер происходит вокруг одного стола.'),
    details: t('Taper and pillar candles in clusters · natural linen and vintage glassware · oysters and champagne on ice at arrival · a string trio between courses · handwritten place cards.', 'Świece w grupach · naturalny len i vintage szkło · ostrygi i szampan na lodzie na powitanie · trio smyczkowe między daniami · ręcznie pisane winietki.', 'Свічки групами · натуральний льон і вінтажне скло · устриці та шампанське на льоду на вітання · струнне тріо між подачами · рукописні карточки з іменами.', 'Свечи группами · натуральный лён и винтажное стекло · устрицы и шампанское на льду при встрече · струнное трио между подачами · рукописные карточки рассадки.'),
  },
  {
    id: 'c2', slug: 'ivory-drapery-gala', kind: 'concept', published: true, featured: true,
    category: 'corporate-events', location: 'Warsaw', guests: '180',
    cover: I('drapery-ballroom'), video: '', images: [I('drapery-ballroom'), I('drapery-dance'), I('champagne-tower'), I('black-tie')],
    title: t('Ivory Drapery Gala', 'Gala w ivory draperii', 'Гала-вечір в айворі-драпіруванні', 'Гала-вечер в драпировке цвета айвори'),
    summary: t('A corporate gala where the ballroom disappears under flowing ivory fabric and warm light — from the welcome champagne tower to the last dance.', 'Gala firmowa, w której sala znika pod płynącą tkaniną ivory i ciepłym światłem — od wieży z szampanem po ostatni taniec.', 'Корпоративний гала-вечір, де зала зникає під легкою тканиною кольору айворі та теплим світлом — від шампанської вежі до останнього танцю.', 'Корпоративный гала-вечер, где зал исчезает под струящейся тканью цвета айвори и тёплым светом — от шампанской башни до последнего танца.'),
    prep: t('6–8 weeks', '6–8 tygodni', '6–8 тижнів', '6–8 недель'),
    concept: t('One visual gesture transforms an ordinary hotel ballroom into a soft, glowing space. The programme flows from awards to dinner to a live band without a single pause.', 'Jeden gest wizualny zamienia zwykłą salę hotelową w miękką, rozświetloną przestrzeń. Program płynnie przechodzi od nagród, przez kolację, do zespołu na żywo.', 'Один візуальний жест перетворює звичайну готельну залу на м’який, сяючий простір. Програма плавно переходить від нагородження до вечері та живого гурту.', 'Один визуальный жест превращает обычный гостиничный зал в мягкое, светящееся пространство. Программа плавно переходит от награждения к ужину и живой группе.'),
    details: t('Ceiling and column drapery · warm uplighting · long imperial tables with white florals · champagne tower at the welcome · awards on stage · live band and DJ.', 'Draperia sufitu i kolumn · ciepłe podświetlenie · długie stoły z białymi kwiatami · wieża z szampanem na powitanie · gala nagród · zespół na żywo i DJ.', 'Драпірування стелі й колон · тепле підсвічування · довгі столи з білою флористикою · шампанська вежа на вітання · нагородження · живий гурт і DJ.', 'Драпировка потолка и колонн · тёплая подсветка · длинные столы с белой флористикой · шампанская башня при встрече · награждение · живая группа и DJ.'),
  },
  {
    id: 'c3', slug: 'masquerade-night-30th', kind: 'concept', published: true, featured: true,
    category: 'private-celebrations', location: 'Warsaw', guests: '60',
    cover: I('tiramisu-tower'), video: '', images: [I('tiramisu-tower'), I('red-coupes'), I('martini-cart'), I('caviar-service')],
    title: t('Masquerade Night — a 30th Birthday', 'Masquerade Night — 30. urodziny', 'Masquerade Night — 30-й день народження', 'Masquerade Night — 30-й день рождения'),
    summary: t('A dark, glamorous birthday with masks, pearls and candlelight: a tiramisu tower instead of a cake, a martini trolley and caviar service.', 'Mroczne, eleganckie urodziny z maskami, perłami i świecami: wieża tiramisu zamiast tortu, wózek z martini i serwis kawioru.', 'Темний гламурний день народження з масками, перлами та свічками: вежа з тірамісу замість торта, мартіні-візок і подача ікри.', 'Тёмный гламурный день рождения с масками, жемчугом и свечами: башня из тирамису вместо торта, мартини-тележка и подача икры.'),
    prep: t('3–5 weeks', '3–5 tygodni', '3–5 тижнів', '3–5 недель'),
    concept: t('A dress code becomes a world: masks at the door, monogrammed coupes, deep red and black, and a dessert moment everyone films.', 'Dress code staje się światem: maski przy wejściu, kieliszki z monogramem, głęboka czerwień i czerń oraz deser, który wszyscy nagrywają.', 'Дрес-код стає світом: маски на вході, келихи з монограмою, глибокий червоний і чорний та десертний момент, який знімають усі.', 'Дресс-код становится миром: маски на входе, бокалы с монограммой, глубокий красный и чёрный и десертный момент, который снимают все.'),
    details: t('Personalised masks and invitations · monogrammed champagne coupes · martini service trolley · caviar and blini by waiters · tiramisu tower with pearls and black candles · DJ set.', 'Spersonalizowane maski i zaproszenia · kieliszki z monogramem · wózek martini · kawior i bliny podawane przez kelnerów · wieża tiramisu z perłami i czarnymi świecami · DJ.', 'Персоналізовані маски та запрошення · келихи з монограмою · мартіні-візок · ікра й млинці від офіціантів · вежа з тірамісу з перлами та чорними свічками · DJ-сет.', 'Персонализированные маски и приглашения · бокалы с монограммой · мартини-тележка · икра и блины от официантов · башня из тирамису с жемчугом и чёрными свечами · DJ-сет.'),
  },
  {
    id: 'c4', slug: 'floral-projection-dinner', kind: 'concept', published: true, featured: true,
    category: 'corporate-events', location: 'Warsaw', guests: '120',
    cover: I('floral-projection'), video: '', images: [I('floral-projection'), I('arches-dinner'), I('garden-dinner')],
    title: t('Floral Projection Dinner', 'Kolacja z projekcją kwiatów', 'Вечеря з квітковою проєкцією', 'Ужин с цветочной проекцией'),
    summary: t('A client dinner in a historic hall where walls and ceiling bloom with slowly moving flower projections above one endless candlelit table.', 'Kolacja dla klientów w historycznej sali, gdzie ściany i sufit rozkwitają powoli poruszającą się projekcją kwiatów nad jednym długim stołem przy świecach.', 'Вечеря для клієнтів в історичній залі, де стіни й стеля розквітають повільною проєкцією квітів над одним нескінченним столом при свічках.', 'Ужин для клиентов в исторической зале, где стены и потолок расцветают медленной проекцией цветов над одним бесконечным столом при свечах.'),
    prep: t('6–8 weeks', '6–8 tygodni', '6–8 тижнів', '6–8 недель'),
    concept: t('Technology in service of atmosphere: projection mapping replaces décor, so the room changes through the evening — from spring buds to full bloom.', 'Technologia w służbie atmosfery: mapping zastępuje dekoracje, a sala zmienia się w trakcie wieczoru — od pąków po pełny rozkwit.', 'Технології на службі атмосфери: проєкційний мапінг замінює декор, і зала змінюється протягом вечора — від бутонів до повного цвітіння.', 'Технологии на службе атмосферы: проекционный маппинг заменяет декор, и зал меняется в течение вечера — от бутонов до полного цветения.'),
    details: t('Projection mapping on walls and vaults · one long table for all guests · low florals and votive candles · tasting menu with wine pairing · short keynote between courses.', 'Mapping na ścianach i sklepieniach · jeden długi stół dla wszystkich · niskie kompozycje i świece · menu degustacyjne z winami · krótkie wystąpienie między daniami.', 'Мапінг на стінах і склепіннях · один довгий стіл для всіх гостей · низька флористика та свічки · дегустаційне меню з винами · короткий виступ між подачами.', 'Маппинг на стенах и сводах · один длинный стол для всех гостей · низкая флористика и свечи · дегустационное меню с винами · короткое выступление между подачами.'),
  },
  {
    id: 'c5', slug: 'black-tie-client-reception', kind: 'concept', published: true, featured: false,
    category: 'corporate-events', location: 'Warsaw', guests: '150',
    cover: I('black-tie'), video: '', images: [I('black-tie'), I('champagne-tower'), I('martini-cart'), I('caviar-service')],
    title: t('Black-Tie Client Reception', 'Bankiet black tie dla klientów', 'Black tie прийом для клієнтів', 'Black tie приём для клиентов'),
    summary: t('An evening reception for VIP clients and partners: black tie, a champagne tower, a martini trolley and conversations that build relationships.', 'Wieczorne przyjęcie dla klientów VIP i partnerów: black tie, wieża z szampanem, wózek martini i rozmowy, które budują relacje.', 'Вечірній прийом для VIP-клієнтів і партнерів: black tie, шампанська вежа, мартіні-візок і розмови, що будують відносини.', 'Вечерний приём для VIP-клиентов и партнёров: black tie, шампанская башня, мартини-тележка и разговоры, которые строят отношения.'),
    prep: t('4–6 weeks', '4–6 tygodni', '4–6 тижнів', '4–6 недель'),
    concept: t('Networking that never feels like networking: a flowing cocktail format, live jazz and moments designed to bring the right people together.', 'Networking, który nie przypomina networkingu: płynna formuła koktajlowa, jazz na żywo i momenty, które łączą właściwych ludzi.', 'Нетворкінг, що не відчувається як нетворкінг: вільний коктейльний формат, живий джаз і моменти, що знайомлять правильних людей.', 'Нетворкинг, который не ощущается как нетворкинг: свободный коктейльный формат, живой джаз и моменты, которые знакомят правильных людей.'),
    details: t('Personalised invitations and guest list management · champagne tower at the welcome · martini and caviar service · live jazz trio · host introductions between key guests.', 'Spersonalizowane zaproszenia i lista gości · wieża z szampanem na powitanie · martini i kawior · trio jazzowe · przedstawianie kluczowych gości przez gospodarza.', 'Персоналізовані запрошення та список гостей · шампанська вежа на вітання · мартіні та ікра · джазове тріо · знайомства ключових гостей через ведучого.', 'Персонализированные приглашения и список гостей · шампанская башня при встрече · мартини и икра · джазовое трио · знакомства ключевых гостей через ведущего.'),
  },
  {
    id: 'c6', slug: 'candlelit-garden-wedding', kind: 'concept', published: true, featured: true,
    category: 'weddings-engagements', location: 'Poland', guests: '90',
    cover: I('stone-welcome'), video: '', images: [I('stone-welcome'), I('garden-dinner'), I('candle-round-table'), I('fringe-dessert')],
    title: t('Candlelit Garden Wedding', 'Ślub w ogrodzie przy świecach', 'Весілля в саду при свічках', 'Свадьба в саду при свечах'),
    summary: t('A wedding in an old stone estate: a carved welcome sign, a garden ceremony at sunset and dinner at a candlelit table under the trees.', 'Ślub w starej kamiennej posiadłości: kamienna tablica powitalna, ceremonia w ogrodzie o zachodzie słońca i kolacja przy świecach pod drzewami.', 'Весілля в старому кам’яному маєтку: кам’яна вітальна табличка, церемонія в саду на заході сонця та вечеря при свічках під деревами.', 'Свадьба в старом каменном поместье: каменная приветственная табличка, церемония в саду на закате и ужин при свечах под деревьями.'),
    prep: t('4–6 months', '4–6 miesięcy', '4–6 місяців', '4–6 месяцев'),
    concept: t('Nature and stone set the palette; candles, orchids and deep hydrangeas do the rest. The evening moves from ceremony to dinner to dancing without guests ever losing the thread.', 'Natura i kamień wyznaczają paletę; świece, storczyki i ciemne hortensje robią resztę. Wieczór płynie od ceremonii, przez kolację, do tańca.', 'Природа й камінь задають палітру; свічки, орхідеї та глибокі гортензії роблять решту. Вечір плавно переходить від церемонії до вечері й танців.', 'Природа и камень задают палитру; свечи, орхидеи и глубокие гортензии делают остальное. Вечер плавно переходит от церемонии к ужину и танцам.'),
    details: t('Welcome stone with names · garden ceremony · serpentine candlelit table · hydrangea and amaranthus florals · dessert table under fringed lamps · live band.', 'Kamień powitalny z imionami · ceremonia w ogrodzie · wijący się stół przy świecach · hortensje i amarantus · stół deserowy pod lampami z frędzlami · zespół na żywo.', 'Вітальний камінь з іменами · церемонія в саду · звивистий стіл при свічках · гортензії та амарант · десертний стіл під лампами з бахромою · живий гурт.', 'Приветственный камень с именами · церемония в саду · извилистый стол при свечах · гортензии и амарант · десертный стол под лампами с бахромой · живая группа.'),
  },
  {
    id: 'c7', slug: 'summer-team-garden-picnic', kind: 'concept', published: true, featured: true,
    category: 'team-building', location: 'Warsaw region', guests: '70',
    cover: I('garden-picnic'), video: '', images: [I('garden-picnic'), I('brioche-tower'), I('wine-ice')],
    title: t('Summer Team Garden Picnic', 'Letni piknik firmowy w ogrodzie', 'Літній корпоративний пікнік у саду', 'Летний корпоративный пикник в саду'),
    summary: t('A relaxed summer day for the whole team: lounge carpets in a green garden, workshops and games, a brioche bar, wine on ice and a sunset DJ set.', 'Swobodny letni dzień dla całego zespołu: dywany i poduchy w zielonym ogrodzie, warsztaty i gry, bar z briochami, wino na lodzie i DJ o zachodzie słońca.', 'Невимушений літній день для всієї команди: килими й подушки в зеленому саду, майстер-класи та ігри, бріош-бар, вино на льоду та DJ-сет на заході сонця.', 'Непринуждённый летний день для всей команды: ковры и подушки в зелёном саду, мастер-классы и игры, бриошь-бар, вино на льду и DJ-сет на закате.'),
    prep: t('3–4 weeks', '3–4 tygodnie', '3–4 тижні', '3–4 недели'),
    concept: t('A team building without forced exercises: zones for every energy level, so people mix naturally — from a perfume workshop to a padel corner.', 'Integracja bez wymuszonych ćwiczeń: strefy dla każdego poziomu energii, aby ludzie naturalnie się mieszali — od warsztatu perfum po kort do padla.', 'Тімбілдинг без вимушених вправ: зони для будь-якого рівня енергії, щоб люди природно знайомилися — від парфумерного майстер-класу до паделу.', 'Тимбилдинг без вынужденных упражнений: зоны для любого уровня энергии, чтобы люди естественно знакомились — от парфюмерного мастер-класса до падела.'),
    details: t('Garden venue with umbrellas and rugs · perfume and floristry workshops · lawn games and padel · brioche and lemonade bar · wine and grapes on ice · DJ at sunset.', 'Ogród z parasolami i dywanami · warsztaty perfum i florystyki · gry na trawie i padel · bar z briochami i lemoniadą · wino i winogrona na lodzie · DJ o zachodzie.', 'Сад із парасолями й килимами · парфумерний і флористичний майстер-класи · ігри на газоні та падел · бріош-бар і лимонади · вино й виноград на льоду · DJ на заході сонця.', 'Сад с зонтами и коврами · парфюмерный и флористический мастер-классы · игры на газоне и падел · бриошь-бар и лимонады · вино и виноград на льду · DJ на закате.'),
  },
  {
    id: 'c8', slug: 'book-launch-dinner', kind: 'concept', published: true, featured: false,
    category: 'brand-lifestyle-events', location: 'Warsaw', guests: '40',
    cover: I('book-dinner'), video: '', images: [I('book-dinner'), I('red-coupes')],
    title: t('Book Launch Dinner', 'Kolacja z premierą książki', 'Вечеря-презентація книги', 'Ужин-презентация книги'),
    summary: t('A brand dinner built around one object: the book. Its cover colour runs through the florals, napkins and gifts at every seat.', 'Kolacja marki zbudowana wokół jednego przedmiotu — książki. Kolor okładki przewija się przez kwiaty, serwetki i prezenty przy każdym miejscu.', 'Брендова вечеря навколо одного предмета — книги. Колір обкладинки повторюється у флористиці, серветках і подарунках на кожному місці.', 'Брендовый ужин вокруг одного предмета — книги. Цвет обложки повторяется во флористике, салфетках и подарках на каждом месте.'),
    prep: t('3–4 weeks', '3–4 tygodnie', '3–4 тижні', '3–4 недели'),
    concept: t('The product as the set designer: a single brand colour, a lecture by the author, and a table where every guest leaves with a signed copy.', 'Produkt jako scenograf: jeden kolor marki, wykład autorki i stół, od którego każdy gość odchodzi z podpisanym egzemplarzem.', 'Продукт як сценограф: один колір бренду, лекція авторки та стіл, з-за якого кожен гість іде з підписаним примірником.', 'Продукт как сценограф: один цвет бренда, лекция автора и стол, из-за которого каждый гость уходит с подписанным экземпляром.'),
    details: t('Brand-colour florals and textiles · book and branded tote at every seat · author’s talk on screen · set menu · photographer and content for social media.', 'Kwiaty i tekstylia w kolorze marki · książka i torba przy każdym miejscu · wystąpienie autorki · menu degustacyjne · fotograf i treści do social mediów.', 'Флористика й текстиль у кольорі бренду · книга та брендована сумка на кожному місці · виступ авторки · сет-меню · фотограф і контент для соцмереж.', 'Флористика и текстиль в цвете бренда · книга и брендированная сумка на каждом месте · выступление автора · сет-меню · фотограф и контент для соцсетей.'),
  },
  {
    id: 'c9', slug: 'safari-garden-birthday', kind: 'concept', published: true, featured: false,
    category: 'childrens-celebrations', location: 'Warsaw', guests: '30',
    cover: I('safari-kids'), video: '', images: [I('safari-kids'), I('circus-kids')],
    title: t('Safari Birthday in the Garden', 'Urodziny w stylu safari w ogrodzie', 'День народження в стилі сафарі в саду', 'День рождения в стиле сафари в саду'),
    summary: t('A children’s birthday as an adventure: life-size animals, a balloon tree in earthy tones, rattan tables for families and a jungle menu.', 'Urodziny dziecka jak przygoda: zwierzęta w naturalnej wielkości, drzewo z balonów w ziemistych odcieniach, rattanowe stoły dla rodzin i menu z dżungli.', 'Дитячий день народження як пригода: тварини в натуральну величину, дерево з кульок у землистих відтінках, ротангові столи для сімей і меню з джунглів.', 'Детский день рождения как приключение: животные в натуральную величину, дерево из шаров в землистых оттенках, ротанговые столы для семей и меню из джунглей.'),
    prep: t('3–4 weeks', '3–4 tygodnie', '3–4 тижні', '3–4 недели'),
    concept: t('An immersive world for children that still looks beautiful to adults: natural textures, a calm palette and a programme built around the birthday child.', 'Immersyjny świat dla dzieci, który zachwyca też dorosłych: naturalne faktury, spokojna paleta i program wokół jubilata.', 'Світ для дітей, який тішить і дорослих: природні фактури, спокійна палітра та програма навколо іменинника.', 'Мир для детей, который радует и взрослых: природные фактуры, спокойная палитра и программа вокруг именинника.'),
    details: t('Balloon tree and plush animals · rattan family tables · animator and safari quest · kids’ menu and dessert table · gifts for every child.', 'Drzewo z balonów i pluszowe zwierzęta · rattanowe stoły · animator i quest safari · menu dla dzieci i stół deserowy · upominki dla każdego dziecka.', 'Дерево з кульок і плюшеві тварини · ротангові столи · аніматор і сафарі-квест · дитяче меню та десертний стіл · подарунки кожній дитині.', 'Дерево из шаров и плюшевые животные · ротанговые столы · аниматор и сафари-квест · детское меню и десертный стол · подарки каждому ребёнку.'),
  },
];

const testimonials = [
  { id: 't1', published: false, name: 'Приклад — Anna K.', photo: '', event: t('Private dinner, Warsaw', 'Prywatna kolacja, Warszawa', 'Приватна вечеря, Варшава', 'Частный ужин, Варшава'), text: t('EXAMPLE — replace with a real review. "I didn’t have to think about a single detail, and yet every detail was exactly us."', 'PRZYKŁAD — zastąp prawdziwą opinią.', 'ПРИКЛАД — замініть справжнім відгуком клієнта.', 'ПРИМЕР — замените настоящим отзывом клиента.') },
  { id: 't2', published: false, name: 'Приклад — HR Director, IT company', photo: '', event: t('Team offsite, 70 guests', 'Wyjazd firmowy, 70 osób', 'Корпоративний виїзд, 70 гостей', 'Корпоративный выезд, 70 гостей'), text: t('EXAMPLE — replace with a real review.', 'PRZYKŁAD — zastąp prawdziwą opinią.', 'ПРИКЛАД — замініть справжнім відгуком клієнта.', 'ПРИМЕР — замените настоящим отзывом клиента.') },
  { id: 't3', published: false, name: 'Приклад — Marta & Piotr', photo: '', event: t('Wedding', 'Ślub', 'Весілля', 'Свадьба'), text: t('EXAMPLE — replace with a real review.', 'PRZYKŁAD — zastąp prawdziwą opinią.', 'ПРИКЛАД — замініть справжнім відгуком клієнта.', 'ПРИМЕР — замените настоящим отзывом клиента.') },
];

const team = [
  { id: 'm1', published: false, name: '[Ім’я Прізвище]', photo: '', role: t('Founder & Creative Director', 'Założycielka i dyrektor kreatywna', 'Засновниця та креативна директорка', 'Основательница и креативный директор') },
  { id: 'm2', published: false, name: '[Ім’я Прізвище]', photo: '', role: t('Senior Event Manager', 'Senior Event Manager', 'Senior Event Manager', 'Senior Event Manager') },
  { id: 'm3', published: false, name: '[Ім’я Прізвище]', photo: '', role: t('Production & Design Lead', 'Produkcja i design', 'Продакшн і дизайн', 'Продакшн и дизайн') },
];

const gallery = ['drapery-dance', 'candle-round-table', 'red-coupes', 'arches-dinner', 'oysters', 'champagne-tower', 'garden-dinner', 'fringe-dessert', 'martini-cart', 'stone-welcome', 'brioche-tower', 'caviar-service'].map(I);
const heroCollage = ['drapery-ballroom', 'candle-couple', 'champagne-tower', 'garden-dinner', 'tiramisu-tower'].map(I);
const serviceImages = {
  'corporate-events': I('black-tie'),
  'team-building': I('garden-picnic'),
  'offsites-retreats': I('garden-dinner'),
  'brand-lifestyle-events': I('book-dinner'),
  'private-celebrations': I('candle-round-table'),
  'weddings-engagements': I('stone-welcome'),
  'childrens-celebrations': I('circus-kids'),
};

module.exports = { projects, testimonials, team, gallery, heroCollage, serviceImages, I };
