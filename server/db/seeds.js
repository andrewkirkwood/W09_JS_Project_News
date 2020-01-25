use news;
db.dropDatabase();

db.articles.insertMany([
  {
    sectionId: "business",
    webTitle: "Greta Thunberg: Davos leaders ignored climate activists’ demands",
    apiUrl: "https://content.guardianapis.com/business/2020/jan/24/greta-thunberg-davos-leaders-ignored-climate-activists-demands"
  },
  {
    sectionId: "sport",
    webTitle: "South Africa v England: rain delays start of fourth Test – live!",
    apiUrl: "https://content.guardianapis.com/sport/live/2020/jan/24/south-africa-v-england-fourth-test-day-one-live"
  },
  {
    sectionId: "mindofbaz",
    webTitle: "the french person converts french to german, the spanish person converts german to spanish... this is a bit weird because they both speak object",
    apiUrl: "https://themindofbaz.co.uk/public/images/languages.png"
  },
  {
    sectionId: "artanddesign",
    webTitle: "George Shaw’s My Baby Is Alright … from teenage kicks to lonely men",
    apiUrl: "https://content.guardianapis.com/artanddesign/2020/jan/24/george-shaw-my-baby-is-alright-she-doesnt-mind-a-bit-of-dirt"
  },
  {
    sectionId: "music",
    webTitle: "Okay Kaya: Watch This Liquid Pour Itself review",
    apiUrl: "https://content.guardianapis.com/music/2020/jan/24/okay-kaya-watch-this-liquid-pour-itself-review"
  },
  {
    sectionId: "sport",
    webTitle: "F1’s new-season storylines are tantalising, but pay TV is limiting potential",
    apiUrl: "https://content.guardianapis.com/sport/blog/2020/jan/24/formula-one-lewis-hamilton-max-verstappen-charles-leclerc-storylines-pay-tv-limit-potential"
  },
  {
    sectionId: "books",
    webTitle: "Wild Game by Adrienne Brodeur review – the reader wants to scream",
    apiUrl: "https://content.guardianapis.com/books/2020/jan/24/wild-game-adrienne-brodeur-review"
  },
  {
    sectionId: "liveblog",
    webTitle: "Davos 2020: Greta Thunberg says climate demands have been 'completely ignored' - live",
    apiUrl: "https://content.guardianapis.com/business/live/2020/jan/24/lagarde-georgieva-thunberg-mnuchin-davos-markets-uk-pmi-business-live"
  },
]);
