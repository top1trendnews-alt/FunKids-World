/* ==========================================================================
   عالم فن كيدز - المتحكم الرئيسي بالمنصة (main.js)
   يدير 16 لعبة تفاعلية وحركية واقعية:
   - 6 ألعاب تعليمية مشتركة للجميع
   - 5 ألعاب حركية وواقعية للأولاد
   - 5 ألعاب إبداعية وواقعية للبنات
   ========================================================================== */

const GAMES_CATALOG = [
  // ==================== 6 ألعاب مشتركة للجميع ====================
  {
    id: 'math',
    title: 'مغامرة الأرقام والحساب',
    island: 'math',
    audience: 'all',
    audienceLabel: 'مشتركة للجميع 🌟',
    islandName: 'جزيرة الأرقام',
    icon: '🧮',
    badgeColor: 'bg-rose-500',
    cardGradient: 'from-rose-500 to-orange-500',
    ages: ['kids', 'junior', 'teen'],
    shortDesc: 'مسائل الجمع والطرح والضرب والقسمة المتدرجة مع مؤقت اختياري ورسائل تشجيعية.',
    difficultyLabel: {
      kids: 'سهل (جمع وطرح بالصور حتى 15)',
      junior: 'متوسط (جمع وطرح وضرب وقسمة)',
      teen: 'متقدم (عمليات حسابية سريعة وتحدي وقت)'
    },
    standaloneUrl: 'games/math.html'
  },
  {
    id: 'memory',
    title: 'تحدي الذاكرة الذكية',
    island: 'brain',
    audience: 'all',
    audienceLabel: 'مشتركة للجميع 🌟',
    islandName: 'جزيرة الذكاء',
    icon: '🧠',
    badgeColor: 'bg-purple-600',
    cardGradient: 'from-purple-600 to-indigo-600',
    ages: ['kids', 'junior', 'teen'],
    shortDesc: 'اقلب البطاقات ثلاثية الأبعاد واعثر على الأزواج المتطابقة بأقل عدد من المحاولات.',
    difficultyLabel: {
      kids: '8 بطاقات (4 أزواج مصورة)',
      junior: '12 بطاقة (6 أزواج متنوعة)',
      teen: '16 بطاقة (8 أزواج كاملة)'
    },
    standaloneUrl: 'games/memory.html'
  },
  {
    id: 'animals',
    title: 'خمّن الحيوان وصوته',
    island: 'knowledge',
    audience: 'all',
    audienceLabel: 'مشتركة للجميع 🌟',
    islandName: 'جزيرة المعرفة',
    icon: '🦁',
    badgeColor: 'bg-emerald-600',
    cardGradient: 'from-emerald-500 to-teal-600',
    ages: ['kids', 'junior', 'teen'],
    shortDesc: 'استمع إلى أصوات الحيوانات وتعرف على صفاتها ومعلوماتها العلمية المدهشة.',
    difficultyLabel: {
      kids: 'أصوات وصور الحيوانات المحبوبة',
      junior: 'معلومات علمية وبيئات الطبيعة',
      teen: 'حقائق علمية دقيقة عن عالم الحيوان'
    },
    standaloneUrl: 'games/animals.html'
  },
  {
    id: 'puzzle',
    title: 'مغامرة تركيب الصور (البازل)',
    island: 'brain',
    audience: 'all',
    audienceLabel: 'مشتركة للجميع 🌟',
    islandName: 'جزيرة الذكاء',
    icon: '🧩',
    badgeColor: 'bg-amber-500',
    cardGradient: 'from-amber-500 to-orange-600',
    ages: ['kids', 'junior', 'teen'],
    shortDesc: 'اسحب القطع المقسمة وأفلتها في أماكنها الصحيحة لإكمال اللوحة الكرتونية والفوز بالمكافأة.',
    difficultyLabel: {
      kids: 'ترتيب مرقم مع مساعدة ماكس الذكية',
      junior: 'تحدي ترتيب لوحة القلعة والفضاء',
      teen: 'أقل عدد من الخطوات لتحقيق 3 نجوم'
    },
    standaloneUrl: 'games/puzzle.html'
  },
  {
    id: 'drawing',
    title: 'المرسم الإبداعي الحر',
    island: 'creative',
    audience: 'all',
    audienceLabel: 'مشتركة للجميع 🌟',
    islandName: 'جزيرة الإبداع',
    icon: '🎨',
    badgeColor: 'bg-pink-500',
    cardGradient: 'from-pink-500 to-rose-500',
    ages: ['kids', 'junior', 'teen'],
    shortDesc: 'لوحة رسم تفاعلية بالألوان والأحجام والملصقات وتصميم الشخصيات مع حفظ محلي.',
    difficultyLabel: {
      kids: 'تلوين حر وملصقات كرتونية كبيرة',
      junior: 'رسم وتلوين قوالب الشخصيات',
      teen: 'تصميم حر متعدد الأحجام وحفظ المعرض'
    },
    standaloneUrl: 'games/drawing.html'
  },
  {
    id: 'space',
    title: 'مغامرة الفضاء والكواكب',
    island: 'knowledge',
    audience: 'all',
    audienceLabel: 'مشتركة للجميع 🌟',
    islandName: 'جزيرة المعرفة',
    icon: '🚀',
    badgeColor: 'bg-indigo-600',
    cardGradient: 'from-indigo-600 to-violet-700',
    ages: ['kids', 'junior', 'teen'],
    shortDesc: 'استكشف كواكب المجموعة الشمسية وأجب عن تحديات الفضاء لفتح كواكب ومراحل جديدة.',
    difficultyLabel: {
      kids: 'رحلة مصورة بين الكواكب المبتسمة',
      junior: 'أسئلة علم الفلك والكواكب الستة',
      teen: 'موسوعة الفضاء وتحديات الكواكب'
    },
    standaloneUrl: 'games/space.html'
  },

  // ==================== 5 ألعاب حركية وواقعية للأولاد ====================
  {
    id: 'racer',
    title: 'سباق الأبطال التوربيني',
    island: 'math',
    audience: 'boys',
    audienceLabel: 'ألعاب الأولاد 👦',
    islandName: 'ركن ألعاب الأولاد (حركية)',
    icon: '🏎️',
    badgeColor: 'bg-blue-600',
    cardGradient: 'from-blue-600 to-cyan-500',
    ages: ['kids', 'junior', 'teen'],
    shortDesc: 'اختر سيارتك الخارقة، غيّر المسارات على الأسفلت المتحرك، واشحن محرك النيترو الناري!',
    difficultyLabel: {
      kids: 'سباق ممتع بمسائل جمع سريعة',
      junior: 'تحدي نيترو بعمليات متنوعة',
      teen: 'سباق المحترفين بالحساب الذهني السريع'
    },
    standaloneUrl: 'games/racer.html'
  },
  {
    id: 'robo',
    title: 'مختبر الروبوتات والمدافع الفضائي',
    island: 'brain',
    audience: 'boys',
    audienceLabel: 'ألعاب الأولاد 👦',
    islandName: 'ركن ألعاب الأولاد (حركية)',
    icon: '🤖',
    badgeColor: 'bg-slate-800',
    cardGradient: 'from-slate-700 to-indigo-800',
    ages: ['kids', 'junior', 'teen'],
    shortDesc: 'ركّب دروع وأسلحة الروبوت المدرع وأطلق شعاع الليزر لتدمير النيازك الفضائية!',
    difficultyLabel: {
      kids: 'تجميع أجزاء الروبوت ومهام مبسطة',
      junior: 'برمجة طاقة الدروع وتفكيك النيازك',
      teen: 'هندسة الروبوتات المتقدمة وحساب الطاقة'
    },
    standaloneUrl: 'games/robo.html'
  },
  {
    id: 'soccer',
    title: 'بطولة نجوم كرة القدم وركلات الترجيح',
    island: 'math',
    audience: 'boys',
    audienceLabel: 'ألعاب الأولاد 👦',
    islandName: 'ركن ألعاب الأولاد (رياضية)',
    icon: '⚽',
    badgeColor: 'bg-emerald-600',
    cardGradient: 'from-emerald-600 to-green-700',
    ages: ['kids', 'junior', 'teen'],
    shortDesc: 'راقب حركة حارس المرمى في الملعب الأخضر وصوّب الكرة نحو الزوايا الخمس لتسجيل الأهداف!',
    difficultyLabel: {
      kids: 'تسديد مباشر نحو زوايا المرمى',
      junior: 'مراوغة الحارس المتحرك بدقة',
      teen: 'تحدي ركلات الترجيح الحاسمة'
    },
    standaloneUrl: 'games/soccer.html'
  },
  {
    id: 'dino',
    title: 'مغامرة منقب الديناصورات والكنوز',
    island: 'knowledge',
    audience: 'boys',
    audienceLabel: 'ألعاب الأولاد 👦',
    islandName: 'ركن ألعاب الأولاد (استكشاف)',
    icon: '🦖',
    badgeColor: 'bg-amber-700',
    cardGradient: 'from-amber-600 to-stone-700',
    ages: ['kids', 'junior', 'teen'],
    shortDesc: 'استخدم المعول والفرشاة لتكسير الصخور واستخراج هياكل الديناصورات العملاقة والكنوز!',
    difficultyLabel: {
      kids: 'حفر سريع واكتشاف الديناصورات',
      junior: 'تنقيب جيولوجي ومعلومات علمية',
      teen: 'إدارة أدوات التنقيب واستخراج الأحافير'
    },
    standaloneUrl: 'games/dino.html'
  },
  {
    id: 'archery',
    title: 'تحدي السهام والرامي المحترف',
    island: 'math',
    audience: 'boys',
    audienceLabel: 'ألعاب الأولاد 👦',
    islandName: 'ركن ألعاب الأولاد (تصويب)',
    icon: '🏹',
    badgeColor: 'bg-cyan-700',
    cardGradient: 'from-cyan-600 to-blue-700',
    ages: ['kids', 'junior', 'teen'],
    shortDesc: 'صوّب القوس والسهم نحو الأهداف المتحركة مع حساب سرعة الرياح لإصابة منتصف الهدف!',
    difficultyLabel: {
      kids: 'أهداف واضحة وأرقام مبسطة',
      junior: 'أهداف متحركة مع مؤشر رياح',
      teen: 'دقة قناص السهام الذهبي'
    },
    standaloneUrl: 'games/archery.html'
  },

  // ==================== 5 ألعاب إبداعية وواقعية للبنات ====================
  {
    id: 'fashion',
    title: 'بوتيك الأزياء وتنسيق الأميرات',
    island: 'creative',
    audience: 'girls',
    audienceLabel: 'ألعاب البنات 👧',
    islandName: 'ركن ألعاب البنات (أزياء)',
    icon: '👗',
    badgeColor: 'bg-fuchsia-500',
    cardGradient: 'from-pink-500 to-fuchsia-600',
    ages: ['kids', 'junior', 'teen'],
    shortDesc: 'نسّقي الفساتين والتيجان والحقائب والأحذية اللامعة واعرضي إطلالتك على المسرح!',
    difficultyLabel: {
      kids: 'تنسيق الألوان والفساتين الملكية',
      junior: 'اختيار الإطلالة المناسبة لكل مناسبة',
      teen: 'تصميم أزياء متكامل وتقييم النجوم'
    },
    standaloneUrl: 'games/fashion.html'
  },
  {
    id: 'bakery',
    title: 'شيف الحلويات والمخبز السعيد',
    island: 'creative',
    audience: 'girls',
    audienceLabel: 'ألعاب البنات 👧',
    islandName: 'ركن ألعاب البنات (طبخ)',
    icon: '🧁',
    badgeColor: 'bg-rose-500',
    cardGradient: 'from-rose-400 to-pink-600',
    ages: ['kids', 'junior', 'teen'],
    shortDesc: 'حضّري طبقات كعك الكب كيك والكريمة والزينة اللذيذة المطابقة لبطاقات طلبات الزبائن!',
    difficultyLabel: {
      kids: 'تزيين الكعك بالكرز والفراولة',
      junior: 'مطابقة طلبات المخبز الثلاثية بدقة',
      teen: 'إدارة طلبات الشيف السريعة بالترتيب'
    },
    standaloneUrl: 'games/bakery.html'
  },
  {
    id: 'jewelry',
    title: 'استوديو تصميم المجوهرات والتيجان',
    island: 'creative',
    audience: 'girls',
    audienceLabel: 'ألعاب البنات 👧',
    islandName: 'ركن ألعاب البنات (مجوهرات)',
    icon: '💎',
    badgeColor: 'bg-purple-600',
    cardGradient: 'from-fuchsia-500 to-purple-700',
    ages: ['kids', 'junior', 'teen'],
    shortDesc: 'انظمي حبات الألماس واللؤلؤ والياقوت والزمرد في عقود وتيجان ملكية متناظرة وبراقة!',
    difficultyLabel: {
      kids: 'نظم الجواهر الملونة البراقة',
      junior: 'مطابقة أنماط العقود الملكية',
      teen: 'تصميم مجوهرات متناظرة بدقة عالية'
    },
    standaloneUrl: 'games/jewelry.html'
  },
  {
    id: 'petcare',
    title: 'عيادة وصالون رعاية الحيوانات الأليفة',
    island: 'knowledge',
    audience: 'girls',
    audienceLabel: 'ألعاب البنات 👧',
    islandName: 'ركن ألعاب البنات (رعاية)',
    icon: '🐱',
    badgeColor: 'bg-teal-600',
    cardGradient: 'from-teal-400 to-emerald-600',
    ages: ['kids', 'junior', 'teen'],
    shortDesc: 'اعتني بالقطة الشيرازية والأرنب والجرو عبر حمام الفقاعات والفحص الطبي والتغذية والتزيين!',
    difficultyLabel: {
      kids: 'استحمام وتزيين الأليفة اللطيفة',
      junior: 'رعاية صحية متكاملة ورفع المؤشرات',
      teen: 'إدارة عيادة وصالون الأليفة بالكامل'
    },
    standaloneUrl: 'games/petcare.html'
  },
  {
    id: 'garden',
    title: 'حديقة الفراشات وتنسيق الزهور الملكية',
    island: 'knowledge',
    audience: 'girls',
    audienceLabel: 'ألعاب البنات 👧',
    islandName: 'ركن ألعاب البنات (طبيعة)',
    icon: '🌸',
    badgeColor: 'bg-pink-600',
    cardGradient: 'from-emerald-400 to-pink-500',
    ages: ['kids', 'junior', 'teen'],
    shortDesc: 'ازرعي بذور الورد الجوري والتوليب واسقيها بالماء والشمس لتتفتح وتجذب الفراشات الملونة!',
    difficultyLabel: {
      kids: 'زراعة وسقاية الزهور الملونة',
      junior: 'مراحل نمو النباتات وجذب الفراشات',
      teen: 'تنسيق الحديقة الملكية الكاملة'
    },
    standaloneUrl: 'games/garden.html'
  }
];

window.FunKidsMain = {
  currentPage: 'home',
  activeGameId: 'math',
  selectedIslandFilter: 'all',
  games: GAMES_CATALOG,

  init() {
    window.FunKidsStorage.init();
    this.syncUI();
    this.renderLibraryGrid();
    this.renderAgeZoneCards();
    this.renderAchievementsPage();
    this.renderProgressPage();
    this.renderSettingsPage();

    const standaloneGame = document.body.getAttribute('data-standalone-game');
    if (standaloneGame) {
      this.startSpecificGame(standaloneGame);
    }
  },

  navigate(pageId) {
    window.FunKidsRewards.playSound('click');
    this.currentPage = pageId;

    document.querySelectorAll('.page-section').forEach(sec => {
      sec.classList.add('hidden');
    });
    const target = document.getElementById(`page-${pageId}`);
    if (target) {
      target.classList.remove('hidden');
    }

    document.querySelectorAll('.nav-btn').forEach(btn => {
      const isMatch = btn.getAttribute('data-page') === pageId;
      btn.classList.toggle('ring-4', isMatch);
      btn.classList.toggle('ring-amber-300', isMatch);
      btn.classList.toggle('scale-105', isMatch);
    });

    if (pageId === 'achievements') this.renderAchievementsPage();
    if (pageId === 'progress') this.renderProgressPage();
    if (pageId === 'settings') this.renderSettingsPage();
    if (pageId === 'categories') this.renderAgeZoneCards();
    if (pageId === 'library') this.renderLibraryGrid();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  openIsland(islandKey) {
    this.selectedIslandFilter = islandKey;
    this.navigate('library');
    const islandNames = {
      all: 'مكتبة الألعاب الشاملة (16 لعبة تفاعلية)',
      shared: 'الألعاب التعليمية المشتركة (6 ألعاب)',
      boys: 'ركن ألعاب الأولاد الحركية والواقعية (5 ألعاب)',
      girls: 'ركن ألعاب البنات التفاعلية والإبداعية (5 ألعاب)',
      math: 'جزيرة الأرقام والحساب',
      knowledge: 'جزيرة المعرفة والعلوم',
      brain: 'جزيرة الذكاء والألغاز',
      creative: 'جزيرة الإبداع والفنون'
    };
    window.MaxCompanion.say(
      `مرحباً بك في ${islandNames[islandKey] || 'مكتبة الألعاب'}! اختر لعبتك المفضلة لننطلق في المغامرة!`,
      'excited',
      true
    );
  },

  openGame(gameId) {
    window.FunKidsRewards.playSound('click');
    this.activeGameId = gameId;
    this.navigate('game-view');
    this.startSpecificGame(gameId);
  },

  startSpecificGame(gameId) {
    if (window.MathAdventureGame && window.MathAdventureGame.stopTimer) {
      window.MathAdventureGame.stopTimer();
    }
    if (window.HeroRacerGame && window.HeroRacerGame.stopLoop) {
      window.HeroRacerGame.stopLoop();
    }
    if (window.SoccerChampGame && window.SoccerChampGame.stopGoalie) {
      window.SoccerChampGame.stopGoalie();
    }

    const meta = GAMES_CATALOG.find(g => g.id === gameId) || GAMES_CATALOG[0];

    const titleEl = document.getElementById('active-game-title');
    const subEl = document.getElementById('active-game-subtitle');
    const iconEl = document.getElementById('active-game-icon');
    if (titleEl) titleEl.textContent = meta.title;
    if (subEl) subEl.textContent = `${meta.islandName} • ${meta.shortDesc}`;
    if (iconEl) iconEl.textContent = meta.icon;

    const allMountIds = [
      'math', 'memory', 'animals', 'puzzle', 'drawing', 'space',
      'racer', 'robo', 'soccer', 'dino', 'archery',
      'fashion', 'bakery', 'jewelry', 'petcare', 'garden'
    ];
    allMountIds.forEach(id => {
      const mount = document.getElementById(`${id}-game-mount`);
      if (mount) {
        mount.classList.toggle('hidden', id !== gameId);
      }
    });

    // تشغيل اللعبة المختارة
    if (gameId === 'math') window.MathAdventureGame.start();
    if (gameId === 'memory') window.MemoryChallengeGame.start();
    if (gameId === 'animals') window.GuessAnimalGame.start();
    if (gameId === 'puzzle') window.PuzzleAdventureGame.start(0);
    if (gameId === 'drawing') window.CreativeDrawingGame.start();
    if (gameId === 'space') window.SpaceAdventureGame.start();

    if (gameId === 'racer') window.HeroRacerGame.start();
    if (gameId === 'robo') window.RoboDefenderGame.start();
    if (gameId === 'soccer') window.SoccerChampGame.start();
    if (gameId === 'dino') window.DinoExplorerGame.start();
    if (gameId === 'archery') window.ArcheryMasterGame.start();

    if (gameId === 'fashion') window.PrincessFashionGame.start();
    if (gameId === 'bakery') window.SweetBakeryGame.start();
    if (gameId === 'jewelry') window.JewelryStudioGame.start();
    if (gameId === 'petcare') window.PetCareSpaGame.start();
    if (gameId === 'garden') window.GardenDesignGame.start();
  },

  selectAgeZone(zone) {
    window.FunKidsRewards.playSound('correct');
    window.FunKidsStorage.setAgeZone(zone);
    this.syncUI();
    this.renderAgeZoneCards();
    this.renderLibraryGrid();

    const zoneMessages = {
      kids: 'تم تفعيل واحة الصغار (من 5 إلى 7 سنوات)! الألعاب الـ 16 الآن مصممة بمساعدات بصرية وأرقام مبسطة ومبهجة!',
      junior: 'تم تفعيل واحة الناشئين (من 8 إلى 11 سنة)! استعد لتحديات حركية وعلمية متوازنة في جميع الألعاب الـ 16!',
      teen: 'تم تفعيل واحة اليافعين (من 12 إلى 15 سنة)! تم رفع مستوى السرعة الذهنية والتحدي للأبطال الكبار!'
    };
    window.MaxCompanion.say(zoneMessages[zone], 'excited', true);
  },

  syncUI() {
    const st = window.FunKidsStorage.state;
    if (!st) return;

    const nextLevelPoints = st.level * 100;
    const prevLevelPoints = (st.level - 1) * 100;
    const progressPct = Math.min(100, Math.max(5, Math.round(((st.points - prevLevelPoints) / (nextLevelPoints - prevLevelPoints)) * 100)));

    document.querySelectorAll('.ui-points').forEach(el => { el.textContent = st.points; });
    document.querySelectorAll('.ui-stars').forEach(el => { el.textContent = st.stars; });
    document.querySelectorAll('.ui-level').forEach(el => { el.textContent = st.level; });
    document.querySelectorAll('.ui-badges-count').forEach(el => { el.textContent = `${st.badges.length} / ${window.FunKidsRewards.badges.length}`; });
    document.querySelectorAll('.ui-player-name').forEach(el => { el.textContent = st.playerName; });
    document.querySelectorAll('.ui-progress-bar').forEach(el => { el.style.width = `${progressPct}%`; });
    document.querySelectorAll('.ui-progress-label').forEach(el => { el.textContent = `${progressPct}% نحو المستوى ${st.level + 1}`; });

    const zoneLabels = {
      kids: 'واحة الصغار (5-7 سنوات)',
      junior: 'واحة الناشئين (8-11 سنة)',
      teen: 'واحة اليافعين (12-15 سنة)'
    };
    document.querySelectorAll('.ui-age-zone').forEach(el => {
      el.textContent = zoneLabels[st.ageZone] || zoneLabels.junior;
    });

    const soundBtn = document.getElementById('quick-sound-toggle');
    if (soundBtn) {
      soundBtn.textContent = st.settings.soundEnabled ? '🔊 الصوت: مفعل' : '🔇 الصوت: صامت';
    }
  },

  toggleQuickSound() {
    const st = window.FunKidsStorage.state;
    const nextState = !st.settings.soundEnabled;
    window.FunKidsStorage.updateSetting('soundEnabled', nextState);
    if (nextState) window.FunKidsRewards.playSound('click');
    this.syncUI();
    this.renderSettingsPage();
  },

  renderLibraryGrid() {
    const grid = document.getElementById('library-games-grid');
    if (!grid) return;
    const st = window.FunKidsStorage.state;
    const filter = this.selectedIslandFilter || 'all';

    document.querySelectorAll('.island-filter-pill').forEach(btn => {
      const f = btn.getAttribute('data-island');
      btn.classList.toggle('btn-accent', f === filter);
      btn.classList.toggle('btn-secondary', f !== filter);
    });

    const filtered = GAMES_CATALOG.filter(g => {
      if (filter === 'all') return true;
      if (filter === 'shared') return g.audience === 'all';
      if (filter === 'boys') return g.audience === 'boys';
      if (filter === 'girls') return g.audience === 'girls';
      return g.island === filter;
    });

    grid.innerHTML = filtered.map(g => {
      const plays = st.completedGames[g.id] || 0;
      const high = st.highScores[g.id] || 0;
      const diffText = g.difficultyLabel[st.ageZone] || g.difficultyLabel.junior;

      return `
        <div class="card-3d card-3d-interactive p-5 flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            <div class="flex flex-wrap items-center justify-between gap-1">
              <span class="px-3 py-1 rounded-full text-xs font-black text-white ${g.badgeColor}">${g.islandName}</span>
              <span class="text-xs font-black px-2.5 py-1 rounded-full ${g.audience === 'boys' ? 'bg-sky-100 text-sky-800' : (g.audience === 'girls' ? 'bg-pink-100 text-pink-800' : 'bg-amber-100 text-amber-800')}">${g.audienceLabel}</span>
            </div>
            <div class="flex items-center gap-3.5">
              <div class="w-15 h-15 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${g.cardGradient} flex items-center justify-center text-3xl sm:text-4xl text-white shadow-md shrink-0 p-3">
                ${g.icon}
              </div>
              <div>
                <h3 class="text-lg sm:text-xl font-black text-slate-800">${g.title}</h3>
                <p class="text-xs font-extrabold text-sky-700 mt-0.5">🎯 ${diffText}</p>
              </div>
            </div>
            <p class="text-xs sm:text-sm font-bold text-slate-600 leading-relaxed">${g.shortDesc}</p>
          </div>

          <div class="pt-2 flex items-center justify-between border-t border-slate-200/80">
            <span class="text-xs font-extrabold text-slate-500">الفوز: ${plays} ✅ | الأعلى: ${high}</span>
            <button type="button" onclick="window.FunKidsMain.openGame('${g.id}')" class="btn-3d btn-primary text-xs sm:text-sm py-2 px-4">
              🎮 العب الآن
            </button>
          </div>
        </div>
      `;
    }).join('');
  },

  renderAgeZoneCards() {
    const container = document.getElementById('age-zones-mount');
    if (!container) return;
    const currentZone = window.FunKidsStorage.state.ageZone;

    const zones = [
      {
        id: 'kids',
        title: 'واحة الصغار (من 5 إلى 7 سنوات)',
        emoji: '🐣🎈',
        features: [
          'عمليات جمع وطرح مبسطة مدعومة بالرموز والصور الملونة.',
          'بطاقات ذاكرة كبيرة (8 بطاقات) سهلة التذكر للمبتدئين.',
          'ألعاب سباق وكرة قدم وتلوين وتنسيق أزياء ورعاية أليفة مبسطة ومبهجة.'
        ]
      },
      {
        id: 'junior',
        title: 'واحة الناشئين (من 8 إلى 11 سنة)',
        emoji: '🦊🌟',
        features: [
          'تحديات الضرب والقسمة والجمع والطرح مع مكافآت السرعة.',
          'شبكة ذاكرة متوسطة (12 بطاقة) وألغاز بازل وتنقيب ديناصورات.',
          'مهام علمية في الفضاء ومختبر الروبوتات وتصميم المجوهرات والمخبز.'
        ]
      },
      {
        id: 'teen',
        title: 'واحة اليافعين (من 12 إلى 15 سنة)',
        emoji: '🚀⚡',
        features: [
          'حساب ذهني متقدم بأرقام كبيرة ومؤقت زمني تنافسي.',
          'شبكة ذاكرة كاملة (16 بطاقة) وتحدي دقة السهام وركلات الترجيح.',
          'سباقات نيترو سريعة، هندسة روبوتات متقدمة، وتصميم مجوهرات وحدائق احترافي.'
        ]
      }
    ];

    container.innerHTML = zones.map(z => {
      const active = z.id === currentZone;
      return `
        <div class="card-3d p-6 flex flex-col justify-between space-y-5 ${active ? 'ring-4 ring-amber-400 bg-amber-50/95' : ''}">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-4xl">${z.emoji}</span>
              ${active
                ? `<span class="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-black">✅ الفئة النشطة حالياً</span>`
                : `<span class="px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-bold">متاح للاختيار</span>`
              }
            </div>
            <h3 class="text-xl sm:text-2xl font-black text-slate-800">${z.title}</h3>
            <ul class="space-y-2 text-xs sm:text-sm font-bold text-slate-600">
              ${z.features.map(f => `<li class="flex items-start gap-2"><span class="text-emerald-500">✔</span><span>${f}</span></li>`).join('')}
            </ul>
          </div>
          <div class="pt-3">
            <button type="button" onclick="window.FunKidsMain.selectAgeZone('${z.id}')"
              class="btn-3d ${active ? 'btn-success' : 'btn-secondary'} w-full text-sm sm:text-base py-3">
              ${active ? '🌟 الفئة العمرية المختارة' : 'تفعيل هذه الفئة العمرية'}
            </button>
          </div>
        </div>
      `;
    }).join('');
  },

  renderAchievementsPage() {
    const mount = document.getElementById('achievements-grid-mount');
    if (!mount) return;
    const unlockedIds = window.FunKidsStorage.state.badges || [];

    mount.innerHTML = window.FunKidsRewards.badges.map(b => {
      const isUnlocked = unlockedIds.includes(b.id);
      return `
        <div class="card-3d p-5 flex items-center gap-4 ${isUnlocked ? 'bg-white' : 'opacity-65 bg-slate-100'}">
          <div class="w-16 h-16 rounded-2xl bg-gradient-to-br ${b.color} flex items-center justify-center text-4xl text-white shadow-md shrink-0">
            ${isUnlocked ? b.icon : '🔒'}
          </div>
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <h4 class="font-black text-base sm:text-lg text-slate-800">${b.name}</h4>
              <span class="text-[11px] font-black px-2 py-0.5 rounded-full ${isUnlocked ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}">
                ${isUnlocked ? 'مكتسبة 🏆' : 'مقفلة'}
              </span>
            </div>
            <p class="text-xs font-bold text-slate-600">${b.desc}</p>
            <p class="text-[11px] font-extrabold text-sky-700">الشرط: ${b.reqText}</p>
          </div>
        </div>
      `;
    }).join('');
  },

  renderProgressPage() {
    const statsMount = document.getElementById('progress-stats-mount');
    const logMount = document.getElementById('progress-log-mount');
    const st = window.FunKidsStorage.state;
    if (!st) return;

    if (statsMount) {
      statsMount.innerHTML = GAMES_CATALOG.map(g => {
        const count = st.completedGames[g.id] || 0;
        const best = st.highScores[g.id] || 0;
        const pct = Math.min(100, count * 25);
        return `
          <div class="bg-white p-3.5 rounded-2xl border-2 border-slate-200 space-y-2">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <div class="flex items-center gap-2 font-black text-slate-800 text-sm">
                <span class="text-2xl">${g.icon}</span>
                <span>${g.title}</span>
                <span class="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">${g.audienceLabel}</span>
              </div>
              <span class="text-xs font-black text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">أفضل نتيجة: ${best} نقطة</span>
            </div>
            <div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-sky-400 to-emerald-500 rounded-full" style="width: ${pct}%"></div>
            </div>
            <div class="flex justify-between text-xs font-bold text-slate-500">
              <span>مرات الإكمال: ${count} جولات</span>
              <span>نسبة الإتقان: ${pct}%</span>
            </div>
          </div>
        `;
      }).join('');
    }

    if (logMount) {
      logMount.innerHTML = (st.activityLog || []).map(item => `
        <div class="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200">
          <div class="flex items-center gap-2 font-bold text-xs sm:text-sm text-slate-800">
            <span>🌟</span>
            <span>${item.title}</span>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <span class="text-xs font-black text-emerald-600">+${item.points} نقطة</span>
            <span class="text-[11px] text-slate-400 font-bold">${item.date}</span>
          </div>
        </div>
      `).join('');
    }
  },

  renderSettingsPage() {
    const mount = document.getElementById('settings-controls-mount');
    if (!mount) return;
    const st = window.FunKidsStorage.state;

    mount.innerHTML = `
      <div class="space-y-4">
        <div class="p-4 rounded-2xl bg-sky-50 border-2 border-sky-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 class="font-black text-slate-800">👤 اسم البطل المستكشف</h4>
            <p class="text-xs font-bold text-slate-600">يظهر اسمك في ترحيب الشخصية ماكس وفي لوحة التقدم (يُحفظ محلياً فقط دون جمع أي بيانات خارجية).</p>
          </div>
          <div class="flex items-center gap-2">
            <input id="player-name-input" type="text" value="${st.playerName}" maxlength="24"
              class="px-3 py-2 rounded-xl border-2 border-sky-300 font-bold text-slate-800 text-sm focus:outline-none focus:border-sky-500" />
            <button type="button" onclick="window.FunKidsMain.savePlayerName()" class="btn-3d btn-secondary text-xs py-2 px-4">حفظ الاسم</button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-between">
            <div>
              <h4 class="font-black text-slate-800">🔊 المؤثرات الصوتية للألعاب</h4>
              <p class="text-xs font-bold text-slate-500">أصوات المحركات والليزر والبريق والفوز</p>
            </div>
            <button type="button" onclick="window.FunKidsMain.toggleSetting('soundEnabled')"
              class="btn-3d ${st.settings.soundEnabled ? 'btn-success' : 'btn-primary'} text-xs py-2 px-4">
              ${st.settings.soundEnabled ? 'مفعل ✅' : 'متوقف 🔇'}
            </button>
          </div>

          <div class="p-4 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-between">
            <div>
              <h4 class="font-black text-slate-800">🗣️ نطق الشخصية ماكس الصوتي</h4>
              <p class="text-xs font-bold text-slate-500">قراءة رسائل التشجيع والأسئلة بصوت مسموع باللغة العربية</p>
            </div>
            <button type="button" onclick="window.FunKidsMain.toggleSetting('voiceEnabled')"
              class="btn-3d ${st.settings.voiceEnabled ? 'btn-success' : 'btn-primary'} text-xs py-2 px-4">
              ${st.settings.voiceEnabled ? 'مفعل ✅' : 'متوقف 🔇'}
            </button>
          </div>

          <div class="p-4 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-between">
            <div>
              <h4 class="font-black text-slate-800">✨ الحركات والمؤثرات البصرية</h4>
              <p class="text-xs font-bold text-slate-500">حركة المضمار وحارس المرمى والأهداف والاحتفالات</p>
            </div>
            <button type="button" onclick="window.FunKidsMain.toggleSetting('animationsEnabled')"
              class="btn-3d ${st.settings.animationsEnabled ? 'btn-success' : 'btn-primary'} text-xs py-2 px-4">
              ${st.settings.animationsEnabled ? 'مفعلة ✨' : 'مخفضة 🛑'}
            </button>
          </div>

          <div class="p-4 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-between">
            <div>
              <h4 class="font-black text-slate-800">⏱️ مؤقت التحدي في جزيرة الأرقام</h4>
              <p class="text-xs font-bold text-slate-500">تفعيل أو إيقاف العد التنازلي أثناء الحساب</p>
            </div>
            <button type="button" onclick="window.FunKidsMain.toggleSetting('timerEnabled')"
              class="btn-3d ${st.settings.timerEnabled ? 'btn-success' : 'btn-primary'} text-xs py-2 px-4">
              ${st.settings.timerEnabled ? 'مفعل ⏱️' : 'بدون وقت ♾️'}
            </button>
          </div>
        </div>

        <div class="p-4 rounded-2xl bg-rose-50 border-2 border-rose-200 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h4 class="font-black text-rose-900">🔄 إعادة ضبط تقدم اللاعب</h4>
            <p class="text-xs font-bold text-rose-700">إعادة النقاط والنجوم والمستوى إلى البداية لتجربة جديدة.</p>
          </div>
          <button type="button" onclick="window.FunKidsMain.confirmResetProgress()" class="btn-3d btn-primary text-xs py-2 px-4">
            إعادة ضبط النقاط والإنجازات
          </button>
        </div>
      </div>
    `;
  },

  savePlayerName() {
    const input = document.getElementById('player-name-input');
    if (!input) return;
    const val = input.value.trim() || 'المستكشف البطل';
    window.FunKidsStorage.state.playerName = val;
    window.FunKidsStorage.save();
    this.syncUI();
    window.FunKidsRewards.playSound('correct');
    window.MaxCompanion.say(`تشرفنا يا ${val}! اسم رائع لبطل مستكشف!`, 'excited', true);
  },

  toggleSetting(key) {
    const current = window.FunKidsStorage.state.settings[key];
    window.FunKidsStorage.updateSetting(key, !current);
    window.FunKidsRewards.playSound('click');
    this.syncUI();
    this.renderSettingsPage();
  },

  confirmResetProgress() {
    window.FunKidsStorage.resetProgress();
    window.FunKidsRewards.playSound('correct');
    this.syncUI();
    this.renderSettingsPage();
    this.renderAchievementsPage();
    this.renderProgressPage();
    window.MaxCompanion.say('تمت إعادة ضبط التقدم بنجاح! هيا نبدأ مغامرة جديدة في الألعاب الـ 16!', 'happy', true);
  }
};

window.addEventListener('DOMContentLoaded', () => {
  window.FunKidsMain.init();
});
