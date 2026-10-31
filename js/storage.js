/* ==========================================================================
   عالم فن كيدز - إدارة التخزين المحلي (storage.js)
   يحفظ التقدم في 16 لعبة تفاعلية (6 مشتركة + 5 أولاد + 5 بنات)
   ========================================================================== */

const STORAGE_KEY = 'funkids_world_save_v2';

const DEFAULT_STATE = {
  playerName: 'المستكشف البطل',
  ageZone: 'junior', // 'kids' (5-7), 'junior' (8-11), 'teen' (12-15)
  points: 150,
  stars: 15,
  level: 2,
  badges: ['first_step'],
  unlockedPlanets: [0, 1],
  completedGames: {
    // 6 ألعاب مشتركة
    math: 2,
    memory: 1,
    animals: 2,
    puzzle: 1,
    drawing: 1,
    space: 1,
    // 5 ألعاب أولاد
    racer: 1,
    robo: 1,
    soccer: 1,
    dino: 1,
    archery: 1,
    // 5 ألعاب بنات
    fashion: 1,
    bakery: 1,
    jewelry: 1,
    petcare: 1,
    garden: 1
  },
  highScores: {
    math: 150,
    memory: 120,
    animals: 140,
    puzzle: 110,
    drawing: 100,
    space: 160,
    racer: 155,
    robo: 135,
    soccer: 160,
    dino: 145,
    archery: 150,
    fashion: 145,
    bakery: 150,
    jewelry: 140,
    petcare: 155,
    garden: 145
  },
  savedDrawings: [],
  settings: {
    soundEnabled: true,
    voiceEnabled: true,
    animationsEnabled: true,
    timerEnabled: true
  },
  activityLog: [
    { title: 'الانضمام إلى عالم فن كيدز التفاعلي المطور (16 لعبة)!', points: 100, date: 'اليوم' },
    { title: 'اجتياز التحدي الأول بنجاح', points: 50, date: 'اليوم' }
  ]
};

window.FunKidsStorage = {
  state: null,

  init() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        this.state = Object.assign({}, DEFAULT_STATE, parsed, {
          completedGames: Object.assign({}, DEFAULT_STATE.completedGames, parsed.completedGames || {}),
          highScores: Object.assign({}, DEFAULT_STATE.highScores, parsed.highScores || {}),
          settings: Object.assign({}, DEFAULT_STATE.settings, parsed.settings || {})
        });
      } else {
        this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
        this.save();
      }
    } catch (e) {
      this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
    this.applySettingsToDOM();
    return this.state;
  },

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      // Ignore storage errors gracefully
    }
  },

  resetProgress() {
    this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    this.save();
    this.applySettingsToDOM();
    if (window.FunKidsMain && window.FunKidsMain.syncUI) {
      window.FunKidsMain.syncUI();
    }
  },

  applySettingsToDOM() {
    if (!this.state) return;
    if (!this.state.settings.animationsEnabled) {
      document.body.classList.add('reduce-motion');
    } else {
      document.body.classList.remove('reduce-motion');
    }
  },

  updateSetting(key, value) {
    if (!this.state) this.init();
    this.state.settings[key] = value;
    this.save();
    this.applySettingsToDOM();
  },

  setAgeZone(zone) {
    if (!this.state) this.init();
    this.state.ageZone = zone;
    this.save();
  },

  saveDrawing(dataUrl, title) {
    if (!this.state) this.init();
    this.state.savedDrawings.unshift({
      id: 'draw_' + Date.now(),
      title: title || 'لوحة فنية إبداعية',
      dataUrl: dataUrl,
      date: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
    });
    if (this.state.savedDrawings.length > 8) {
      this.state.savedDrawings = this.state.savedDrawings.slice(0, 8);
    }
    this.save();
  }
};
