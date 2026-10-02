/* =========================================================
   ABERNO — tillar (o'zbek / rus / ingliz)

   Sahifalardagi asosiy matn o'zbekcha. Bu skript har bir matnni
   lug'atdan qidiradi va tanlangan tilga almashtiradi.
   Lug'at kaliti — o'zbekcha matn, qiymati — [ruscha, inglizcha].
   HTML'dagi o'zbekcha matn o'zgarsa, shu yerdagi kalitni ham yangilash kerak.
   ========================================================= */

(function () {
  const DICT = {
    // --- Umumiy: menyu, tugmalar, footer ---
    "Bosh sahifa": ["Главная", "Home"],
    "Kompaniya": ["О компании", "Company"],
    "Mahsulotlar": ["Продукция", "Products"],
    "Ishlab chiqarish": ["Производство", "Production"],
    "Distribyutsiya": ["Дистрибуция", "Distribution"],
    "Bog'lanish": ["Связаться", "Contact us"],
    "Asosiy menyu": ["Главное меню", "Main menu"],
    "Menyuni ochish": ["Открыть меню", "Open menu"],
    "Tilni tanlash": ["Выбрать язык", "Choose language"],
    "Qorong'u rejimga o'tish": ["Включить тёмный режим", "Switch to dark mode"],
    "Yorug' rejimga o'tish": ["Включить светлый режим", "Switch to light mode"],
    "Quruq salfetka, salfetka xomashyosi va margarin ishlab chiqaruvchi. Import, qayta ishlash, eksport va o'z distribyutsiya tarmog'i.": [
      "Производитель сухих салфеток, сырья для салфеток и маргарина. Импорт, переработка, экспорт и собственная дистрибьюторская сеть.",
      "Manufacturer of dry wipes, wipe raw material and margarine. Import, processing, export and our own distribution network.",
    ],
    "Sahifalar": ["Страницы", "Pages"],
    "Aloqa": ["Контакты", "Contact"],
    "O'zbekiston": ["Узбекистан", "Uzbekistan"],
    "Aberno. Barcha huquqlar himoyalangan.": ["Aberno. Все права защищены.", "Aberno. All rights reserved."],
    "BULUT — quruq salfetka": ["BULUT — сухие салфетки", "BULUT — dry wipes"],
    "ENM INFIN — salfetka xomashyosi": ["ENM INFIN — сырьё для салфеток", "ENM INFIN — wipe raw material"],
    "Margaritto — margarin": ["Margaritto — маргарин", "Margaritto — margarine"],
    "Batafsil →": ["Подробнее →", "Learn more →"],
    "Ariza qoldirish": ["Оставить заявку", "Send a request"],

    // --- Bosh sahifa ---
    "Aberno — Quruq salfetka, salfetka xomashyosi va margarin": [
      "Aberno — сухие салфетки, сырьё для салфеток и маргарин",
      "Aberno — Dry wipes, wipe raw material and margarine",
    ],
    "Aberno — quruq salfetka, quruq salfetka uchun xomashyo va margarin ishlab chiqaruvchi kompaniya. Import, qayta ishlash, eksport va o'z distribyutsiya tarmog'i.": [
      "Aberno — производитель сухих салфеток, сырья для сухих салфеток и маргарина. Импорт, переработка, экспорт и собственная дистрибьюторская сеть.",
      "Aberno manufactures dry wipes, raw material for dry wipes and margarine. Import, processing, export and our own distribution network.",
    ],
    "Ishlab chiqarish · Import · Eksport": ["Производство · Импорт · Экспорт", "Production · Import · Export"],
    "Sifatli mahsulot —": ["Качественная продукция —", "Quality products,"],
    "ishonchli": ["надёжное", "reliable"],
    "hamkorlik": ["партнёрство", "partnership"],
    "Aberno quruq salfetka, quruq salfetka uchun xomashyo va margarin ishlab chiqaradi. Xomashyoni chet eldan import qilamiz, o'z korxonamizda qayta ishlaymiz va mahsulotni ichki bozorga hamda eksportga yetkazamiz.": [
      "Aberno производит сухие салфетки, сырьё для сухих салфеток и маргарин. Мы импортируем сырьё из-за рубежа, перерабатываем его на собственном предприятии и поставляем продукцию на внутренний рынок и на экспорт.",
      "Aberno manufactures dry wipes, raw material for dry wipes and margarine. We import raw materials from abroad, process them at our own plant and supply products to the domestic market and for export.",
    ],
    "Mahsulotlarni ko'rish": ["Смотреть продукцию", "View products"],
    "Hamkor bo'lish": ["Стать партнёром", "Become a partner"],
    "Quruq salfetkalar": ["Сухие салфетки", "Dry wipes"],
    "Salfetka xomashyosi": ["Сырьё для салфеток", "Wipe raw material"],
    "Margarin mahsulotlari": ["Маргариновая продукция", "Margarine products"],
    "malakali hodim": ["квалифицированных сотрудников", "skilled employees"],
    "mahsulot yo'nalishi": ["направления продукции", "product lines"],
    "Import": ["Импорт", "Import"],
    "va eksport faoliyati": ["и экспорт", "and export operations"],
    "O'z": ["Своя", "Own"],
    "distribyutsiya tarmog'i": ["дистрибьюторская сеть", "distribution network"],
    "Uch yo'nalish — bitta ishonchli ishlab chiqaruvchi": ["Три направления — один надёжный производитель", "Three product lines, one reliable manufacturer"],
    "Xomashyodan tortib tayyor mahsulotgacha bo'lgan jarayonni o'zimiz boshqaramiz. Shu sababli sifat va yetkazib berish muddatiga javob bera olamiz.": [
      "Мы сами управляем всем процессом — от сырья до готовой продукции. Поэтому отвечаем за качество и сроки поставки.",
      "We manage the whole process ourselves, from raw material to finished product. That is why we can answer for quality and delivery times.",
    ],
    "Quruq salfetka": ["Сухие салфетки", "Dry wipes"],
    "Maishiy, gigiyenik va sanoat maqsadlari uchun yumshoq, pishiq va suvni yaxshi shimadigan quruq salfetkalar.": [
      "Мягкие, прочные и хорошо впитывающие сухие салфетки для бытовых, гигиенических и промышленных целей.",
      "Soft, strong and highly absorbent dry wipes for household, hygiene and industrial use.",
    ],
    "Sof sellyulozadan tayyorlangan sanitariya-gigiyena qog'ozi: salfetka, sochiq va hojatxona qog'ozi ishlab chiqaruvchilar uchun.": [
      "Санитарно-гигиеническая бумага из чистой целлюлозы: для производителей салфеток, полотенец и туалетной бумаги.",
      "Sanitary and hygiene paper made from pure cellulose, for manufacturers of napkins, towels and toilet paper.",
    ],
    "Margarin": ["Маргарин", "Margarine"],
    "Qandolatchilik, non mahsulotlari va HoReCa sohasi uchun sifatli margarin mahsulotlari.": [
      "Качественная маргариновая продукция для кондитерского и хлебопекарного производства и сегмента HoReCa.",
      "Quality margarine products for confectionery, bakery and the HoReCa sector.",
    ],
    "Biz qanday ishlaymiz": ["Как мы работаем", "How we work"],
    "Importdan tayyor mahsulotgacha": ["От импорта до готовой продукции", "From import to finished product"],
    "Xomashyo chet eldan olib kelinadi va korxonamizda qayta ishlanadi. Natija uch yo'nalishda sotiladi.": [
      "Сырьё завозится из-за рубежа и перерабатывается на нашем предприятии. Результат реализуется по трём направлениям.",
      "Raw material is brought in from abroad and processed at our plant. The output is sold in three directions.",
    ],
    "Sifatli xomashyo xorijiy yetkazib beruvchilardan olib kelinadi": [
      "Качественное сырьё поставляется от зарубежных поставщиков",
      "Quality raw material is sourced from foreign suppliers",
    ],
    "Qayta ishlash": ["Переработка", "Processing"],
    "O'z korxonamizda qayta ishlanadi va sifat nazoratidan o'tkaziladi": [
      "Перерабатывается на нашем предприятии и проходит контроль качества",
      "Processed at our own plant and passed through quality control",
    ],
    "Eksport": ["Экспорт", "Export"],
    "Mahsulotning bir qismi xorijga": ["Часть продукции — за рубеж", "Part of the output goes abroad"],
    "Tayyor mahsulot": ["Готовая продукция", "Finished products"],
    "O'z brendlarimiz ostida": ["Под собственными брендами", "Under our own brands"],
    "Ichki bozor": ["Внутренний рынок", "Domestic market"],
    "O'z distribyutsiyamiz orqali": ["Через собственную дистрибуцию", "Through our own distribution"],
    "Ishlab chiqarish haqida batafsil": ["Подробнее о производстве", "More about production"],
    "Afzalliklar": ["Преимущества", "Advantages"],
    "Nega aynan Aberno?": ["Почему именно Aberno?", "Why Aberno?"],
    "Sifat nazorati": ["Контроль качества", "Quality control"],
    "Xomashyo qabul qilishdan qadoqlashgacha har bir bosqich tekshiriladi.": [
      "Проверяется каждый этап — от приёмки сырья до упаковки.",
      "Every stage is checked, from raw material intake to packaging.",
    ],
    "O'z ishlab chiqarishimiz": ["Собственное производство", "Our own production"],
    "Jarayonni o'zimiz boshqaramiz, shuning uchun narx barqaror va hajm moslashuvchan.": [
      "Мы сами управляем процессом, поэтому цена стабильна, а объёмы гибкие.",
      "We run the process ourselves, so prices are stable and volumes are flexible.",
    ],
    "O'z distribyutsiyamiz": ["Собственная дистрибуция", "Our own distribution"],
    "Mahsulotni vositachilarsiz, o'z logistika va savdo tarmog'imiz orqali yetkazamiz.": [
      "Доставляем продукцию без посредников — через собственную логистику и торговую сеть.",
      "We deliver without intermediaries, through our own logistics and sales network.",
    ],
    "Tajribali jamoa": ["Опытная команда", "Experienced team"],
    "150 dan ortiq mutaxassis ishlab chiqarish, sifat va savdo yo'nalishlarida ishlaydi.": [
      "Более 150 специалистов работают в производстве, контроле качества и продажах.",
      "More than 150 specialists work in production, quality and sales.",
    ],
    "Ulgurji xarid yoki hamkorlik bo'yicha savolingiz bormi?": [
      "Есть вопросы по оптовым закупкам или сотрудничеству?",
      "Questions about wholesale purchases or partnership?",
    ],
    "Distribyutor, ulgurji xaridor yoki eksport hamkori bo'lish uchun biz bilan bog'laning. Mutaxassisimiz sizga qo'ng'iroq qiladi.": [
      "Свяжитесь с нами, чтобы стать дистрибьютором, оптовым покупателем или партнёром по экспорту. Наш специалист вам перезвонит.",
      "Get in touch to become a distributor, wholesale buyer or export partner. Our specialist will call you back.",
    ],
    "Hamkorlik shartlari": ["Условия сотрудничества", "Partnership terms"],

    // --- Kompaniya ---
    "Kompaniya haqida — Aberno": ["О компании — Aberno", "About the company — Aberno"],
    "Aberno kompaniyasi haqida: 150 dan ortiq hodim, o'z ishlab chiqarishi, import, eksport va distribyutsiya tarmog'i.": [
      "О компании Aberno: более 150 сотрудников, собственное производство, импорт, экспорт и дистрибьюторская сеть.",
      "About Aberno: more than 150 employees, in-house production, import, export and a distribution network.",
    ],
    "Aberno kompaniyasi haqida": ["О компании Aberno", "About Aberno"],
    "Biz xomashyoni import qilamiz, qayta ishlaymiz va tayyor mahsulotni ichki bozor hamda eksport uchun chiqaramiz. Butun zanjirni o'zimiz boshqaramiz.": [
      "Мы импортируем сырьё, перерабатываем его и выпускаем готовую продукцию для внутреннего рынка и на экспорт. Всей цепочкой управляем сами.",
      "We import raw materials, process them and produce finished goods for the domestic market and for export. We manage the entire chain ourselves.",
    ],
    "150+ hodim": ["150+ сотрудников", "150+ employees"],
    "Biz kimmiz": ["Кто мы", "Who we are"],
    "Ishlab chiqarish, savdo va logistika — bir joyda": ["Производство, продажи и логистика — в одном месте", "Production, sales and logistics in one place"],
    "Aberno — quruq salfetka, quruq salfetka uchun xomashyo va margarin ishlab chiqaruvchi O'zbekiston kompaniyasi. Xomashyoni xorijiy hamkorlardan import qilamiz va o'z korxonamizda qayta ishlaymiz.": [
      "Aberno — узбекская компания, производящая сухие салфетки, сырьё для сухих салфеток и маргарин. Мы импортируем сырьё у зарубежных партнёров и перерабатываем его на собственном предприятии.",
      "Aberno is an Uzbek company that manufactures dry wipes, raw material for dry wipes and margarine. We import raw materials from foreign partners and process them at our own plant.",
    ],
    "Qayta ishlangan mahsulotning bir qismi eksport qilinadi. Yana bir qismidan o'zimiz tayyor mahsulot ishlab chiqaramiz, qolgani esa ichki bozorga sotiladi. Kompaniyaning o'z distribyutsiya tarmog'i bor, shuning uchun mahsulot xaridorga vositachilarsiz yetib boradi.": [
      "Часть переработанной продукции идёт на экспорт. Из другой части мы сами выпускаем готовую продукцию, а остальное продаём на внутреннем рынке. У компании есть собственная дистрибьюторская сеть, поэтому продукция доходит до покупателя без посредников.",
      "Part of the processed output is exported. From another part we make our own finished products, and the rest is sold on the domestic market. The company has its own distribution network, so products reach the buyer without intermediaries.",
    ],
    "Mahsulotlarimiz beshta brend ostida chiqadi: BULUT va PanDoozy — qog'oz salfetkalar, ENM INFIN — salfetka xomashyosi, Margaritto — margarin, Smaylo — spred.": [
      "Наша продукция выпускается под пятью брендами: BULUT и PanDoozy — бумажные салфетки, ENM INFIN — сырьё для салфеток, Margaritto — маргарин, Smaylo — спред.",
      "Our products are sold under five brands: BULUT and PanDoozy for paper napkins, ENM INFIN for wipe raw material, Margaritto for margarine, and Smaylo for spread.",
    ],
    "Korxonada 150 dan ortiq hodim ishlaydi": ["На предприятии работает более 150 сотрудников", "More than 150 people work at the plant"],
    "Import va eksport faoliyati yo'lga qo'yilgan": ["Налажены импорт и экспорт", "Import and export operations are established"],
    "O'z distribyutsiya va logistika tarmog'i mavjud": ["Есть собственная сеть дистрибуции и логистики", "We have our own distribution and logistics network"],
    "Maqsad va qadriyatlar": ["Цели и ценности", "Goals and values"],
    "Bizni nima harakatga keltiradi": ["Что нами движет", "What drives us"],
    "Missiyamiz": ["Наша миссия", "Our mission"],
    "Mahalliy bozorni sifatli va hamyonbop mahsulot bilan ta'minlash, O'zbekistonda ishlab chiqarilgan mahsulotni xorijga olib chiqish.": [
      "Обеспечивать местный рынок качественной и доступной продукцией и выводить продукцию, произведённую в Узбекистане, за рубеж.",
      "To supply the local market with quality, affordable products and to take goods made in Uzbekistan abroad.",
    ],
    "Maqsadimiz": ["Наша цель", "Our goal"],
    "Mintaqadagi ishonchli ishlab chiqaruvchi va yetkazib beruvchilardan biri bo'lish, eksport geografiyasini kengaytirish.": [
      "Стать одним из надёжных производителей и поставщиков региона и расширить географию экспорта.",
      "To be one of the region's reliable manufacturers and suppliers and to expand our export geography.",
    ],
    "Qadriyatlarimiz": ["Наши ценности", "Our values"],
    "Sifat, halollik, hamkorlarga hurmat va o'z so'zimizda turish. Biz uzoq muddatli munosabatlarni qadrlaymiz.": [
      "Качество, честность, уважение к партнёрам и верность своему слову. Мы ценим долгосрочные отношения.",
      "Quality, honesty, respect for partners and keeping our word. We value long-term relationships.",
    ],
    "Faoliyat": ["Деятельность", "Activities"],
    "Asosiy yo'nalishlarimiz": ["Наши основные направления", "Our main areas"],
    "Xorijiy yetkazib beruvchilardan sifatli xomashyo olib kelish.": ["Поставка качественного сырья от зарубежных поставщиков.", "Sourcing quality raw material from foreign suppliers."],
    "Xomashyoni qayta ishlash va tayyor mahsulot chiqarish.": ["Переработка сырья и выпуск готовой продукции.", "Processing raw material and making finished products."],
    "Mahsulotning bir qismini xorijiy bozorlarga yetkazish.": ["Поставка части продукции на зарубежные рынки.", "Supplying part of the output to foreign markets."],
    "O'z tarmog'imiz orqali ichki bozorga yetkazib berish.": ["Доставка на внутренний рынок через собственную сеть.", "Delivering to the domestic market through our own network."],
    "Bizning jamoa": ["Наша команда", "Our team"],
    "Jamoa": ["Команда", "Team"],
    "150 dan ortiq mutaxassis": ["Более 150 специалистов", "More than 150 specialists"],
    "Kompaniya muvaffaqiyati ortida tajribali jamoa turadi: texnologlar, operatorlar, sifat nazorati mutaxassislari, logistlar va savdo menejerlari.": [
      "За успехом компании стоит опытная команда: технологи, операторы, специалисты по контролю качества, логисты и менеджеры по продажам.",
      "Behind the company's success is an experienced team: technologists, operators, quality control specialists, logisticians and sales managers.",
    ],
    "Biz hodimlarimizning malakasini oshirishga va xavfsiz ish sharoitini yaratishga e'tibor qaratamiz.": [
      "Мы уделяем внимание повышению квалификации сотрудников и созданию безопасных условий труда.",
      "We invest in our employees' skills and in safe working conditions.",
    ],
    "Logistika": ["Логистика", "Logistics"],
    "Savdo": ["Продажи", "Sales"],
    "Tashqi iqtisodiy faoliyat": ["Внешнеэкономическая деятельность", "Foreign trade"],
    "Jamoamizga qo'shilmoqchimisiz?": ["Хотите присоединиться к нашей команде?", "Want to join our team?"],
    "Bo'sh ish o'rinlari va hamkorlik bo'yicha biz bilan bog'laning.": [
      "Свяжитесь с нами по вопросам вакансий и сотрудничества.",
      "Contact us about vacancies and partnership.",
    ],

    // --- Mahsulotlar ---
    "Mahsulotlar — Aberno": ["Продукция — Aberno", "Products — Aberno"],
    "Aberno mahsulotlari: BULUT quruq salfetkalari, ENM INFIN salfetka xomashyosi va Margaritto margarin.": [
      "Продукция Aberno: сухие салфетки BULUT, сырьё для салфеток ENM INFIN и маргарин Margaritto.",
      "Aberno products: BULUT dry wipes, ENM INFIN wipe raw material and Margaritto margarine.",
    ],
    "Mahsulotlarimiz": ["Наша продукция", "Our products"],
    "Quruq salfetka, uning xomashyosi va margarin. Ulgurji xaridorlar, ishlab chiqaruvchilar va eksport hamkorlari uchun.": [
      "Сухие салфетки, сырьё для них и маргарин. Для оптовых покупателей, производителей и партнёров по экспорту.",
      "Dry wipes, their raw material and margarine. For wholesale buyers, manufacturers and export partners.",
    ],
    "01 · Quruq salfetka": ["01 · Сухие салфетки", "01 · Dry wipes"],
    "BULUT quruq salfetkalari": ["Сухие салфетки BULUT", "BULUT dry wipes"],
    "BULUT — yumshoq, pishiq va suyuqlikni yaxshi shimadigan quruq salfetkalar brendi. Uy xo'jaligi, shaxsiy gigiyena, go'zallik salonlari, tibbiyot muassasalari va umumiy ovqatlanish korxonalari uchun mos.": [
      "BULUT — бренд мягких, прочных и хорошо впитывающих сухих салфеток. Подходит для дома, личной гигиены, салонов красоты, медицинских учреждений и предприятий общественного питания.",
      "BULUT is our brand of soft, strong and highly absorbent dry wipes. Suitable for the home, personal hygiene, beauty salons, medical facilities and catering businesses.",
    ],
    "Yumshoq va teriga yoqimli tuzilish": ["Мягкая, приятная для кожи текстура", "Soft texture that is gentle on skin"],
    "Yuqori shimuvchanlik va pishiqlik": ["Высокая впитываемость и прочность", "High absorbency and strength"],
    "Turli o'lcham va qadoqlash variantlari": ["Разные размеры и варианты упаковки", "Various sizes and packaging options"],
    "Ulgurji buyurtmalar uchun barqaror hajm": ["Стабильные объёмы для оптовых заказов", "Stable volumes for wholesale orders"],
    "Maishiy": ["Бытовые", "Household"],
    "Gigiyenik": ["Гигиенические", "Hygiene"],
    "Salonlar": ["Салоны", "Salons"],
    "02 · Xomashyo": ["02 · Сырьё", "02 · Raw material"],
    "ENM INFIN — sanitariya-gigiyena qog'ozi": ["ENM INFIN — санитарно-гигиеническая бумага", "ENM INFIN — sanitary and hygiene paper"],
    "ENM INFIN sof sellyuloza xomashyosidan tayyorlangan, turli xildagi yuqori sifatli sanitariya-gigiyena qog'ozini taklif etadi. Bu qog'ozdan hojatxona qog'ozi, sochiq va salfetkalar ishlab chiqariladi.": [
      "ENM INFIN предлагает высококачественную санитарно-гигиеническую бумагу различных видов из чистого целлюлозного сырья. Из неё производят туалетную бумагу, полотенца и салфетки.",
      "ENM INFIN offers high-quality sanitary and hygiene paper of various types, made from pure cellulose. It is used to produce toilet paper, towels and napkins.",
    ],
    "Sof sellyuloza xomashyosidan tayyorlanadi": ["Изготавливается из чистого целлюлозного сырья", "Made from pure cellulose"],
    "Hojatxona qog'ozi, sochiq va salfetka ishlab chiqarish uchun": ["Для производства туалетной бумаги, полотенец и салфеток", "For producing toilet paper, towels and napkins"],
    "Namga chidamli qog'oz turi ham mavjud": ["Есть и влагопрочная бумага", "Wet-strength paper is also available"],
    "Salfetka uchun qog'oz": ["Бумага для салфеток", "Paper for napkins"],
    "Sochiq uchun qog'oz": ["Бумага для полотенец", "Paper for towels"],
    "Hojatxona qog'ozi uchun": ["Для туалетной бумаги", "For toilet paper"],
    "Namga chidamli qog'oz": ["Влагопрочная бумага", "Wet-strength paper"],
    "Narx so'rash →": ["Запросить цену →", "Request a quote →"],
    "ENM INFIN qog'oz rulonlari": ["Рулоны бумаги ENM INFIN", "ENM INFIN paper rolls"],
    "Qog'oz rulonlari ombori": ["Склад бумажных рулонов", "Paper roll warehouse"],
    "Katta qog'oz rulonlari": ["Большие рулоны бумаги", "Large paper rolls"],
    "Qog'oz rulonini o'rash jarayoni": ["Процесс намотки бумажного рулона", "Paper roll winding"],

    // Smaylo va PanDoozy
    "Smaylo — spred": ["Smaylo — спред", "Smaylo — spread"],
    "PanDoozy — qog'oz salfetka": ["PanDoozy — бумажные салфетки", "PanDoozy — paper napkins"],
    "Spred": ["Спред", "Spread"],
    "04 · Spred": ["04 · Спред", "04 · Spread"],
    "Smaylo spredi": ["Спред Smaylo", "Smaylo spread"],
    "Smaylo — kundalik dasturxon va pazandachilik uchun spred. Nonga surtish, pishiriqlar, kremlar hamda issiq taomlar tayyorlashda ishlatiladi.": [
      "Smaylo — спред для повседневного стола и кулинарии. Его намазывают на хлеб и используют для выпечки, кремов и горячих блюд.",
      "Smaylo is a spread for the everyday table and for cooking. It is used on bread and in pastries, creams and hot dishes.",
    ],
    "Nonushta va kundalik dasturxon uchun": ["Для завтрака и повседневного стола", "For breakfast and the everyday table"],
    "Pishiriq, shirinlik va kremlar uchun": ["Для выпечки, десертов и кремов", "For pastries, desserts and creams"],
    "Issiq taomlar va garnirlar uchun": ["Для горячих блюд и гарниров", "For hot dishes and side dishes"],
    "Nonushta uchun": ["Для завтрака", "For breakfast"],
    "Pishiriqlar": ["Выпечка", "Pastries"],
    "Kremlar va glazurlar": ["Кремы и глазури", "Creams and glazes"],
    "Issiq taomlar": ["Горячие блюда", "Hot dishes"],
    "Smaylo spredi qadog'i": ["Упаковка спреда Smaylo", "Smaylo spread pack"],
    "05 · Qog'oz salfetka": ["05 · Бумажные салфетки", "05 · Paper napkins"],
    "PanDoozy qog'oz salfetkalari": ["Бумажные салфетки PanDoozy", "PanDoozy paper napkins"],
    "PanDoozy — qulay qadoqdagi qog'oz salfetkalar. 100% sellyulozadan tayyorlanadi, ko'p qavatli bo'lgani uchun yumshoq va pishiq.": [
      "PanDoozy — бумажные салфетки в удобной упаковке. Изготавливаются из 100% целлюлозы; благодаря многослойности они мягкие и прочные.",
      "PanDoozy paper napkins come in convenient packaging. They are made from 100% cellulose, and their multiple layers make them soft and strong.",
    ],
    "100% sellyulozadan tayyorlanadi": ["Изготавливаются из 100% целлюлозы", "Made from 100% cellulose"],
    "Ko'p qavatli, yumshoq va pishiq": ["Многослойные, мягкие и прочные", "Multi-layered, soft and strong"],
    "Katta va kichik qadoq variantlari": ["Большая и малая упаковка", "Large and small pack options"],
    "100% sellyuloza": ["100% целлюлоза", "100% cellulose"],
    "Ko'p qavatli": ["Многослойные", "Multi-layered"],
    "Qulay qadoq": ["Удобная упаковка", "Convenient packaging"],
    "03 · Margarin": ["03 · Маргарин", "03 · Margarine"],
    "Margaritto margarin mahsulotlari": ["Маргариновая продукция Margaritto", "Margaritto margarine products"],
    "Margaritto — qandolatchilik, non va un mahsulotlari ishlab chiqaruvchilari hamda umumiy ovqatlanish korxonalari uchun margarin brendi. Barqaror ta'm va tuzilish xamir mahsulotlarining sifatini oshiradi.": [
      "Margaritto — бренд маргарина для производителей кондитерских, хлебобулочных и мучных изделий, а также предприятий общественного питания. Стабильные вкус и текстура повышают качество изделий из теста.",
      "Margaritto is our margarine brand for confectionery, bread and flour product makers and for catering businesses. Consistent taste and texture improve the quality of baked goods.",
    ],
    "Qandolatchilik va non mahsulotlari uchun": ["Для кондитерских и хлебобулочных изделий", "For confectionery and bakery products"],
    "Barqaror ta'm va tuzilish": ["Стабильные вкус и текстура", "Consistent taste and texture"],
    "Sanoat va chakana qadoqlash variantlari": ["Промышленная и розничная упаковка", "Industrial and retail packaging options"],
    "Sanitariya me'yorlariga muvofiq ishlab chiqarish": ["Производство в соответствии с санитарными нормами", "Production in line with sanitary standards"],
    "Qandolatchilik": ["Кондитерское производство", "Confectionery"],
    "Nonvoyxonalar": ["Пекарни", "Bakeries"],
    "Narxlar va namunalar kerakmi?": ["Нужны цены и образцы?", "Need prices and samples?"],
    "Ulgurji narxlar, namunalar va texnik ma'lumotlarni olish uchun ariza qoldiring. Savdo bo'limimiz siz bilan bog'lanadi.": [
      "Оставьте заявку, чтобы получить оптовые цены, образцы и техническую информацию. Наш отдел продаж свяжется с вами.",
      "Send a request to get wholesale prices, samples and technical information. Our sales team will contact you.",
    ],
    "Narx so'rash": ["Запросить цену", "Request a quote"],

    // --- Ishlab chiqarish ---
    "Ishlab chiqarish — Aberno": ["Производство — Aberno", "Production — Aberno"],
    "Aberno ishlab chiqarish jarayoni: xomashyo importi, qayta ishlash, sifat nazorati, eksport va ichki bozorga yetkazib berish.": [
      "Производственный процесс Aberno: импорт сырья, переработка, контроль качества, экспорт и поставки на внутренний рынок.",
      "Aberno's production process: raw material import, processing, quality control, export and domestic delivery.",
    ],
    "Ishlab chiqarish jarayoni": ["Производственный процесс", "Production process"],
    "Xomashyo importidan tayyor mahsulot yetkazib berilgunga qadar har bir bosqich nazoratimiz ostida.": [
      "Каждый этап — от импорта сырья до доставки готовой продукции — под нашим контролем.",
      "Every stage, from raw material import to delivery of the finished product, is under our control.",
    ],
    "Bosqichlar": ["Этапы", "Stages"],
    "Mahsulot qanday tayyorlanadi": ["Как создаётся продукция", "How the product is made"],
    "1. Xomashyo importi": ["1. Импорт сырья", "1. Raw material import"],
    "Salfetka va margarin uchun xomashyo ishonchli xorijiy yetkazib beruvchilardan tanlab olinadi va import qilinadi.": [
      "Сырьё для салфеток и маргарина отбирается у надёжных зарубежных поставщиков и импортируется.",
      "Raw material for wipes and margarine is selected from reliable foreign suppliers and imported.",
    ],
    "2. Kiruvchi nazorat": ["2. Входной контроль", "2. Incoming inspection"],
    "Korxonaga kelgan har bir partiya tekshiriladi. Talablarga javob bermagan xomashyo ishlab chiqarishga yo'l qo'yilmaydi.": [
      "Каждая поступившая партия проверяется. Сырьё, не соответствующее требованиям, в производство не допускается.",
      "Every incoming batch is inspected. Raw material that does not meet requirements is not released to production.",
    ],
    "3. Qayta ishlash": ["3. Переработка", "3. Processing"],
    "Xomashyo zamonaviy uskunalarda qayta ishlanadi: salfetka materiali kesiladi va o'raladi, margarin esa texnologik jarayon asosida tayyorlanadi.": [
      "Сырьё перерабатывается на современном оборудовании: материал для салфеток режется и наматывается, а маргарин готовится по технологическому процессу.",
      "Raw material is processed on modern equipment: wipe material is cut and wound, and margarine is made according to the production process.",
    ],
    "4. Sifat nazorati": ["4. Контроль качества", "4. Quality control"],
    "Tayyor mahsulot qadoqlashdan oldin yana tekshiriladi. Shu tariqa har bir partiya bir xil sifatda chiqadi.": [
      "Готовая продукция ещё раз проверяется перед упаковкой. Так каждая партия выходит одинакового качества.",
      "Finished products are checked again before packaging, so every batch comes out at the same quality.",
    ],
    "5. Qadoqlash va jo'natish": ["5. Упаковка и отгрузка", "5. Packaging and dispatch"],
    "Mahsulot qadoqlanib, eksportga, o'z tayyor mahsulotimiz liniyasiga yoki distribyutsiya tarmog'i orqali ichki bozorga yo'naltiriladi.": [
      "Продукция упаковывается и направляется на экспорт, на нашу линию готовой продукции или через дистрибьюторскую сеть на внутренний рынок.",
      "Products are packaged and sent for export, to our own finished-goods line, or to the domestic market through the distribution network.",
    ],
    "Natija": ["Результат", "Output"],
    "Qayta ishlangan mahsulot uch yo'nalishda sotiladi": ["Переработанная продукция реализуется по трём направлениям", "Processed output is sold in three directions"],
    "Mahsulotning bir qismi xorijiy hamkorlarga eksport qilinadi.": ["Часть продукции экспортируется зарубежным партнёрам.", "Part of the output is exported to foreign partners."],
    "O'z tayyor mahsulotimiz": ["Собственная готовая продукция", "Our own finished products"],
    "Bir qismidan kompaniyaning o'zi BULUT brendi ostida tayyor quruq salfetka ishlab chiqaradi.": [
      "Из части сырья компания сама выпускает готовые сухие салфетки под брендом BULUT.",
      "From part of it the company makes its own finished dry wipes under the BULUT brand.",
    ],
    "Qolgan qismi o'z distribyutsiya tarmog'imiz orqali mahalliy xaridorlarga sotiladi.": [
      "Остальное продаётся местным покупателям через нашу дистрибьюторскую сеть.",
      "The rest is sold to local buyers through our own distribution network.",
    ],
    "Sifat": ["Качество", "Quality"],
    "Sifat — asosiy ustuvorligimiz": ["Качество — наш главный приоритет", "Quality is our top priority"],
    "Jarayonning har bir bosqichida sifatni nazorat qilamiz. Bu hamkorlarimizga har bir partiyada bir xil natijani kafolatlaydi.": [
      "Мы контролируем качество на каждом этапе процесса. Это гарантирует партнёрам одинаковый результат в каждой партии.",
      "We control quality at every stage of the process. This gives our partners the same result in every batch.",
    ],
    "Xomashyo partiyalarini kirishda tekshirish": ["Проверка партий сырья при поступлении", "Inspecting raw material batches on arrival"],
    "Ishlab chiqarish jarayonida doimiy monitoring": ["Постоянный мониторинг в процессе производства", "Continuous monitoring during production"],
    "Tayyor mahsulotni jo'natishdan oldin nazorat": ["Контроль готовой продукции перед отгрузкой", "Checking finished products before dispatch"],
    "Sanitariya-gigiyena me'yorlariga rioya qilish": ["Соблюдение санитарно-гигиенических норм", "Compliance with sanitary and hygiene standards"],
    "Korxonamizga tashrif buyurmoqchimisiz?": ["Хотите посетить наше предприятие?", "Would you like to visit our plant?"],
    "Hamkorlar uchun ishlab chiqarish bilan tanishtiruv tashrifini tashkil qilamiz.": [
      "Для партнёров мы организуем ознакомительный визит на производство.",
      "We arrange introductory production tours for partners.",
    ],
    "Tashrifni rejalashtirish": ["Запланировать визит", "Plan a visit"],

    // --- Distribyutsiya ---
    "Distribyutsiya va hamkorlik — Aberno": ["Дистрибуция и сотрудничество — Aberno", "Distribution and partnership — Aberno"],
    "Aberno o'z distribyutsiya tarmog'i orqali ichki bozorga yetkazib beradi va eksport qiladi. Hamkor bo'lish shartlari.": [
      "Aberno поставляет продукцию на внутренний рынок через собственную дистрибьюторскую сеть и экспортирует её. Условия партнёрства.",
      "Aberno delivers to the domestic market through its own distribution network and exports. Partnership terms.",
    ],
    "Distribyutsiya va hamkorlik": ["Дистрибуция и сотрудничество", "Distribution and partnership"],
    "O'z distribyutsiya tarmog'imiz mahsulotni vositachilarsiz va o'z vaqtida yetkazib beradi. Ichki bozor va eksport uchun hamkorlikka ochiqmiz.": [
      "Наша дистрибьюторская сеть доставляет продукцию без посредников и вовремя. Мы открыты к сотрудничеству на внутреннем рынке и в экспорте.",
      "Our own distribution network delivers products on time and without intermediaries. We are open to partnership in both the domestic market and export.",
    ],
    "Ishlab chiqaruvchidan to'g'ridan-to'g'ri": ["Напрямую от производителя", "Direct from the manufacturer"],
    "Aberno o'z distribyutsiya tarmog'iga ega. Mahsulot ombordan to'g'ridan-to'g'ri xaridorga yetkaziladi, shuning uchun narx qulay, yetkazib berish esa tez va nazorat ostida.": [
      "У Aberno есть собственная дистрибьюторская сеть. Продукция доставляется покупателю прямо со склада, поэтому цена выгодная, а доставка быстрая и под контролем.",
      "Aberno has its own distribution network. Products go straight from the warehouse to the buyer, so prices are competitive and delivery is fast and controlled.",
    ],
    "Vositachilarsiz, ishlab chiqaruvchi narxida": ["Без посредников, по цене производителя", "No intermediaries, at the manufacturer's price"],
    "O'z transportimiz va logistikamiz": ["Собственный транспорт и логистика", "Our own transport and logistics"],
    "Muntazam va rejali yetkazib berish": ["Регулярные плановые поставки", "Regular, scheduled deliveries"],
    "Har bir mijoz uchun shaxsiy menejer": ["Персональный менеджер для каждого клиента", "A dedicated manager for every client"],
    "Mijozlarimiz": ["Наши клиенты", "Our clients"],
    "Kimlar bilan ishlaymiz": ["С кем мы работаем", "Who we work with"],
    "Ulgurji savdo": ["Оптовая торговля", "Wholesale"],
    "Ulgurji bazalar va savdo kompaniyalari.": ["Оптовые базы и торговые компании.", "Wholesale depots and trading companies."],
    "Chakana savdo": ["Розничная торговля", "Retail"],
    "Do'konlar, supermarketlar va savdo shoxobchalari.": ["Магазины, супермаркеты и торговые точки.", "Shops, supermarkets and retail outlets."],
    "Ishlab chiqaruvchilar": ["Производители", "Manufacturers"],
    "Salfetka, qandolat va non mahsulotlari korxonalari.": ["Предприятия по производству салфеток, кондитерских и хлебобулочных изделий.", "Wipe, confectionery and bakery producers."],
    "Restoranlar, kafe, mehmonxonalar va oshxonalar.": ["Рестораны, кафе, гостиницы и столовые.", "Restaurants, cafés, hotels and canteens."],
    "Xalqaro hamkorlik": ["Международное сотрудничество", "International partnership"],
    "Qayta ishlangan mahsulotimizning bir qismini xorijiy bozorlarga eksport qilamiz. Import va eksport operatsiyalarida tajribamiz bor, shuning uchun hujjatlar va logistikani to'liq o'z zimmamizga olamiz.": [
      "Часть переработанной продукции мы экспортируем на зарубежные рынки. У нас есть опыт импортно-экспортных операций, поэтому документы и логистику полностью берём на себя.",
      "We export part of our processed output to foreign markets. We have experience in import and export operations, so we take care of the paperwork and logistics in full.",
    ],
    "Eksport hujjatlarini rasmiylashtirish": ["Оформление экспортных документов", "Preparing export documents"],
    "Xalqaro logistikani tashkil qilish": ["Организация международной логистики", "Arranging international logistics"],
    "Katta hajmdagi buyurtmalar uchun barqaror ta'minot": ["Стабильные поставки для крупных заказов", "Stable supply for large orders"],
    "Qadamlar": ["Шаги", "Steps"],
    "Qanday qilib hamkor bo'lish mumkin": ["Как стать партнёром", "How to become a partner"],
    "Ariza": ["Заявка", "Request"],
    "Saytda ariza qoldiring yoki bizga qo'ng'iroq qiling.": ["Оставьте заявку на сайте или позвоните нам.", "Send a request on the site or call us."],
    "Muloqot": ["Переговоры", "Discussion"],
    "Menejerimiz ehtiyojingizni aniqlaydi va taklif tayyorlaydi.": ["Наш менеджер выяснит ваши потребности и подготовит предложение.", "Our manager clarifies your needs and prepares an offer."],
    "Shartnoma": ["Договор", "Contract"],
    "Narx, hajm va yetkazib berish shartlarini kelishib olamiz.": ["Согласовываем цену, объёмы и условия поставки.", "We agree on price, volume and delivery terms."],
    "Yetkazib berish": ["Доставка", "Delivery"],
    "Mahsulot o'z tarmog'imiz orqali belgilangan muddatda yetkaziladi.": ["Продукция доставляется в срок через нашу сеть.", "Products are delivered on time through our own network."],
    "Distribyutor yoki ulgurji xaridor bo'ling": ["Станьте дистрибьютором или оптовым покупателем", "Become a distributor or wholesale buyer"],
    "Ariza qoldiring, biz siz uchun individual taklif tayyorlaymiz.": ["Оставьте заявку — мы подготовим для вас индивидуальное предложение.", "Send a request and we will prepare an individual offer for you."],

    // --- Bog'lanish ---
    "Bog'lanish — Aberno": ["Контакты — Aberno", "Contact — Aberno"],
    "Aberno bilan bog'lanish: telefon, elektron pochta, manzil va ariza formasi.": [
      "Связь с Aberno: телефон, электронная почта, адрес и форма заявки.",
      "Contact Aberno: phone, email, address and request form.",
    ],
    "Biz bilan bog'laning": ["Свяжитесь с нами", "Get in touch"],
    "Ulgurji xarid, distribyutsiya, eksport yoki boshqa savollar bo'yicha ariza qoldiring. Mutaxassisimiz tez orada siz bilan bog'lanadi.": [
      "Оставьте заявку по оптовым закупкам, дистрибуции, экспорту или другим вопросам. Наш специалист скоро свяжется с вами.",
      "Send a request about wholesale purchases, distribution, export or anything else. Our specialist will contact you shortly.",
    ],
    "Telefon": ["Телефон", "Phone"],
    "Elektron pochta": ["Электронная почта", "Email"],
    "Manzil": ["Адрес", "Address"],
    "O'zbekiston (aniq manzil kiritiladi)": ["Узбекистан (точный адрес будет указан)", "Uzbekistan (exact address to be added)"],
    "Ish vaqti": ["Время работы", "Working hours"],
    "Dushanba – Shanba, 09:00 – 18:00": ["Понедельник – суббота, 09:00 – 18:00", "Monday – Saturday, 09:00 – 18:00"],
    "Xarita shu yerda joylashadi": ["Здесь будет карта", "The map will go here"],
    "(Google yoki Yandex xarita kodi qo'yiladi)": ["(сюда вставляется код карты Google или Яндекс)", "(Google or Yandex map embed goes here)"],
    "Ismingiz *": ["Ваше имя *", "Your name *"],
    "Telefon *": ["Телефон *", "Phone *"],
    "Mavzu *": ["Тема *", "Subject *"],
    "Xabar *": ["Сообщение *", "Message *"],
    "Ism Familiya": ["Имя Фамилия", "First and last name"],
    "Kompaniya nomi": ["Название компании", "Company name"],
    "Qaysi mahsulot va qancha hajm kerakligini yozing": ["Напишите, какая продукция и в каком объёме вам нужна", "Tell us which product and what volume you need"],
    "Tanlang": ["Выберите", "Select"],
    "Ulgurji xarid": ["Оптовая закупка", "Wholesale purchase"],
    "Distribyutorlik": ["Дистрибьюторство", "Distributorship"],
    "Xomashyo xaridi": ["Закупка сырья", "Raw material purchase"],
    "Ish o'rni": ["Вакансия", "Job vacancy"],
    "Boshqa": ["Другое", "Other"],
    "Yuborish": ["Отправить", "Send"],
    "Rahmat! Arizangiz qabul qilindi. Tez orada siz bilan bog'lanamiz.": [
      "Спасибо! Ваша заявка принята. Мы скоро свяжемся с вами.",
      "Thank you! Your request has been received. We will contact you shortly.",
    ],
    "Ismingizni kiriting": ["Введите ваше имя", "Enter your name"],
    "Telefon raqamini to'g'ri kiriting": ["Введите корректный номер телефона", "Enter a valid phone number"],
    "Murojaat mavzusini tanlang": ["Выберите тему обращения", "Choose a subject"],
    "Xabar kamida 10 ta belgidan iborat bo'lsin": ["Сообщение должно содержать не менее 10 символов", "The message must be at least 10 characters long"],
    "Ijtimoiy tarmoqlar": ["Социальные сети", "Social media"],

    // --- Kataloglar ---
    "Kataloglar": ["Каталоги", "Catalogs"],
    "Kataloglar — Aberno": ["Каталоги — Aberno", "Catalogs — Aberno"],
    "Aberno mahsulot kataloglari: Margaritto va Smaylo yog'-moy mahsulotlari hamda BULUT qog'oz mahsulotlari. PDF formatida ochish va yuklab olish.": [
      "Каталоги продукции Aberno: масложировая продукция Margaritto и Smaylo и бумажная продукция BULUT. Открыть и скачать в формате PDF.",
      "Aberno product catalogs: Margaritto and Smaylo fats and oils, and BULUT paper products. Open or download as PDF.",
    ],
    "Mahsulot kataloglari": ["Каталоги продукции", "Product catalogs"],
    "Barcha mahsulotlar, qadoqlash o'lchamlari va tavsiflari bilan tanishish uchun kataloglarni oching yoki yuklab oling.": [
      "Откройте или скачайте каталоги, чтобы познакомиться со всей продукцией, размерами упаковки и описаниями.",
      "Open or download the catalogs to see all products, packaging sizes and descriptions.",
    ],
    "Yog'-moy mahsulotlari katalogi": ["Каталог масложировой продукции", "Fats and oils catalog"],
    "Margaritto margarinlari va Smaylo spredlari: har bir mahsulotning tavsifi, yog'liligi, qadoqlash o'lchamlari va undan tayyorlash mumkin bo'lgan mahsulotlar.": [
      "Маргарины Margaritto и спреды Smaylo: описание каждого продукта, жирность, размеры упаковки и изделия, которые можно из него приготовить.",
      "Margaritto margarines and Smaylo spreads: each product's description, fat content, packaging sizes and what can be made with it.",
    ],
    "Qog'oz mahsulotlari katalogi": ["Каталог бумажной продукции", "Paper products catalog"],
    "BULUT va PanDoozy brendlari: qog'oz salfetkalar, qog'oz sochiqlar, nam salfetkalar, qutili salfetkalar, dispenser salfetkalari va hojatxona qog'ozi.": [
      "Бренды BULUT и PanDoozy: бумажные салфетки, бумажные полотенца, влажные салфетки, салфетки в коробках, салфетки для диспенсеров и туалетная бумага.",
      "The BULUT and PanDoozy brands: paper napkins, paper towels, wet wipes, boxed tissues, dispenser napkins and toilet paper.",
    ],
    "30 sahifa": ["30 страниц", "30 pages"],
    "13 sahifa": ["13 страниц", "13 pages"],
    "41 MB": ["41 МБ", "41 MB"],
    "62 MB": ["62 МБ", "62 MB"],
    "Ingliz tilida": ["На английском", "In English"],
    "Rus tilida": ["На русском", "In Russian"],
    "Katalogni ochish": ["Открыть каталог", "Open catalog"],
    "Yuklab olish": ["Скачать", "Download"],
    "Katalogni ko'rish →": ["Смотреть каталог →", "View catalog →"],
    "Kataloglarni ochish": ["Открыть каталоги", "Open catalogs"],

    // --- Yangi dizayn: bosh sahifa va mahsulotlar ---
    "Aberno Group · Oilangiz uchun": ["Aberno Group · Для вашей семьи", "Aberno Group · For your family"],
    "Brendlarimiz:": ["Наши бренды:", "Our brands:"],
    "oyiga margarin ishlab chiqarish quvvati": ["мощность производства маргарина в месяц", "monthly margarine production capacity"],
    "Qog'oz salfetkalar": ["Бумажные салфетки", "Paper napkins"],
    "Qog'oz sochiqlar": ["Бумажные полотенца", "Paper towels"],
    "Nam salfetkalar": ["Влажные салфетки", "Wet wipes"],
    "Qutili salfetkalar": ["Салфетки в коробках", "Boxed tissues"],
    "Hojatxona qog'ozi": ["Туалетная бумага", "Toilet paper"],
    "Qatlamli xamir uchun": ["Для слоёного теста", "For puff pastry"],
    "Universal": ["Универсальный", "Universal"],
    "Kremlar uchun": ["Для кремов", "For creams"],

    // --- Rasm tavsiflari (alt) ---
    "Margaritto margarini va undan tayyorlangan pishiriqlar": ["Маргарин Margaritto и выпечка на его основе", "Margaritto margarine and pastries made with it"],
    "BULUT qog'oz salfetkalari": ["Бумажные салфетки BULUT", "BULUT paper napkins"],
    "Margaritto margarin qadoqlari": ["Упаковки маргарина Margaritto", "Margaritto margarine packs"],
    "Yog'-moy mahsulotlari katalogi muqovasi": ["Обложка каталога масложировой продукции", "Cover of the fats and oils catalog"],
    "BULUT qog'oz mahsulotlari katalogi muqovasi": ["Обложка каталога бумажной продукции BULUT", "Cover of the BULUT paper products catalog"],
    "Katalog sahifasi: Margaritto Universal margarini": ["Страница каталога: маргарин Margaritto Universal", "Catalog page: Margaritto Universal margarine"],
    "Katalog sahifasi: Margaritto qatlamli xamir margarini": ["Страница каталога: маргарин Margaritto для слоёного теста", "Catalog page: Margaritto puff pastry margarine"],
    "Katalog sahifasi: Smaylo spredi": ["Страница каталога: спред Smaylo", "Catalog page: Smaylo spread"],
    "Katalog sahifasi: BULUT qog'oz salfetkalari": ["Страница каталога: бумажные салфетки BULUT", "Catalog page: BULUT paper napkins"],
    "Katalog sahifasi: BULUT qog'oz sochiqlari": ["Страница каталога: бумажные полотенца BULUT", "Catalog page: BULUT paper towels"],
    "Katalog sahifasi: BULUT qutili salfetkalari": ["Страница каталога: салфетки BULUT в коробках", "Catalog page: BULUT boxed tissues"],
  };

  const LANGS = ["uz", "ru", "en"];
  const ATTRS = ["placeholder", "aria-label", "title", "alt"];

  // Apostrof turlari va ortiqcha bo'shliqlar farq qilmasligi uchun kalitlarni bir xil ko'rinishga keltiramiz
  const norm = (s) => s.replace(/[‘’ʻʼ`]/g, "'").replace(/\s+/g, " ").trim();

  const index = {};
  Object.keys(DICT).forEach((key) => { index[norm(key)] = DICT[key]; });

  let lang = "uz";
  try {
    const saved = localStorage.getItem("lang");
    if (LANGS.includes(saved)) lang = saved;
  } catch (e) { /* saqlangan til o'qilmasa o'zbekcha qoladi */ }

  const t = (text) => {
    if (lang === "uz") return text;
    const entry = index[norm(text)];
    return entry ? entry[lang === "ru" ? 0 : 1] : text;
  };

  // Har bir matn va atributning o'zbekcha asl nusxasi — tilni qaytarish uchun
  const textOrig = new WeakMap();
  const attrOrig = new WeakMap();

  const apply = () => {
    const root = document.documentElement;
    root.lang = lang;

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => {
        const tag = node.parentElement && node.parentElement.tagName;
        return tag === "SCRIPT" || tag === "STYLE" ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      },
    });
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (!textOrig.has(node)) textOrig.set(node, node.nodeValue);
      const orig = textOrig.get(node);
      if (!norm(orig)) continue;
      // Matn atrofidagi bo'shliqlar saqlanadi, faqat ichidagi matn almashadi
      const lead = orig.match(/^\s*/)[0];
      const trail = orig.match(/\s*$/)[0];
      const next = lang === "uz" ? orig : lead + t(orig) + trail;
      if (index[norm(orig)] && node.nodeValue !== next) node.nodeValue = next;
    }

    document.querySelectorAll("[placeholder], [aria-label], [title], [alt], meta[name='description']").forEach((el) => {
      if (el.closest("[data-i18n-skip]")) return;
      const names = el.tagName === "META" ? ["content"] : ATTRS;
      if (!attrOrig.has(el)) attrOrig.set(el, {});
      const store = attrOrig.get(el);
      names.forEach((name) => {
        if (!el.hasAttribute(name)) return;
        if (!(name in store)) store[name] = el.getAttribute(name);
        if (index[norm(store[name])]) el.setAttribute(name, t(store[name]));
      });
    });

    document.querySelectorAll(".lang").forEach((box) => {
      box.querySelector(".lang__current").textContent = lang.toUpperCase();
      box.querySelector(".lang__btn").setAttribute("aria-label", t("Tilni tanlash"));
      box.querySelectorAll("[data-lang]").forEach((item) => {
        if (item.dataset.lang === lang) item.setAttribute("aria-current", "true");
        else item.removeAttribute("aria-current");
      });
    });

    root.classList.remove("i18n-loading");
  };

  const setLang = (next) => {
    if (!LANGS.includes(next) || next === lang) return;
    lang = next;
    try { localStorage.setItem("lang", lang); } catch (e) { /* saqlab bo'lmasa ham til almashadi */ }
    apply();
    document.dispatchEvent(new CustomEvent("langchange"));
  };

  // --- Til tanlash menyusi ---
  const closeMenus = () => {
    document.querySelectorAll(".lang.is-open").forEach((box) => {
      box.classList.remove("is-open");
      box.querySelector(".lang__btn").setAttribute("aria-expanded", "false");
    });
  };

  document.querySelectorAll(".lang").forEach((box) => {
    const btn = box.querySelector(".lang__btn");
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = !box.classList.contains("is-open");
      closeMenus();
      box.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
    });
    box.querySelectorAll("[data-lang]").forEach((item) => {
      item.addEventListener("click", () => {
        setLang(item.dataset.lang);
        closeMenus();
        btn.focus();
      });
    });
  });
  document.addEventListener("click", closeMenus);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenus(); });

  window.i18n = { t, setLang, get lang() { return lang; } };
  apply();
})();
