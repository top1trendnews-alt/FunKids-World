/* ==========================================================================
   عالم فن كيدز - الألعاب التفاعلية الخاصة بالأولاد (boys-games.js)
   اللعبة 7: سباق الأبطال الذكي
   اللعبة 8: مختبر الروبوتات والمدافع الفضائي
   ========================================================================== */

const RACE_CARS = [
  { id: 'red_bolt', name: 'البرق الأحمر', emoji: '🏎️', color: 'from-red-500 to-rose-700' },
  { id: 'blue_falcon', name: 'الصقر الأزرق', emoji: '🚙', color: 'from-sky-500 to-blue-700' },
  { id: 'green_monster', name: 'الوحش الأخضر', emoji: '🚜', color: 'from-emerald-500 to-green-700' }
];

window.HeroRacerGame = {
  selectedCar: RACE_CARS[0],
  playerProgress: 10,
  rivalProgress: 10,
  speedBoosts: 0,
  score: 0,
  currentQuestion: null,
  raceLoopTimer: null,
  isFinished: false,

  start() {
    this.stopLoop();
    this.playerProgress = 8;
    this.rivalProgress = 8;
    this.speedBoosts = 0;
    this.score = 0;
    this.isFinished = false;
    this.generateQuestion();
    this.render();

    window.MaxCompanion.say(
      'مرحباً بك في حلبة سباق الأبطال! اختر سيارتك الرياضية وأجب بسرعة عن أسئلة النيترو الحسابية لتسبق المنافس إلى خط النهاية!',
      'excited',
      false
    );

    this.raceLoopTimer = setInterval(() => {
      if (this.isFinished) return;
      const zone = (window.FunKidsStorage.state && window.FunKidsStorage.state.ageZone) || 'junior';
      const rivalStep = zone === 'kids' ? 1.4 : (zone === 'junior' ? 2.0 : 2.6);
      this.rivalProgress = Math.min(100, this.rivalProgress + rivalStep);
      this.updateTrackBars();
      if (this.rivalProgress >= 100 && !this.isFinished) {
        this.finishRace(false);
      }
    }, 800);
  },

  stopLoop() {
    if (this.raceLoopTimer) {
      clearInterval(this.raceLoopTimer);
      this.raceLoopTimer = null;
    }
  },

  selectCar(carId) {
    const found = RACE_CARS.find(c => c.id === carId);
    if (found) {
      this.selectedCar = found;
      window.FunKidsRewards.playSound('click');
      this.render();
    }
  },

  generateQuestion() {
    const zone = (window.FunKidsStorage.state && window.FunKidsStorage.state.ageZone) || 'junior';
    let a, b, op, ans;
    if (zone === 'kids') {
      a = Math.floor(Math.random() * 9) + 2;
      b = Math.floor(Math.random() * 8) + 1;
      op = '+';
      ans = a + b;
    } else if (zone === 'junior') {
      const ops = ['+', '-', '×'];
      op = ops[Math.floor(Math.random() * ops.length)];
      if (op === '×') {
        a = Math.floor(Math.random() * 8) + 2;
        b = Math.floor(Math.random() * 7) + 2;
        ans = a * b;
      } else if (op === '-') {
        a = Math.floor(Math.random() * 20) + 10;
        b = Math.floor(Math.random() * 9) + 2;
        ans = a - b;
      } else {
        a = Math.floor(Math.random() * 18) + 5;
        b = Math.floor(Math.random() * 15) + 4;
        ans = a + b;
      }
    } else {
      a = Math.floor(Math.random() * 11) + 4;
      b = Math.floor(Math.random() * 10) + 3;
      op = '×';
      ans = a * b;
    }

    const opts = new Set([ans]);
    while (opts.size < 4) {
      const cand = Math.max(1, ans + (Math.floor(Math.random() * 6) + 1) * (Math.random() > 0.5 ? 1 : -1));
      if (cand !== ans) opts.add(cand);
    }

    this.currentQuestion = {
      prompt: `${a} ${op} ${b} = ؟`,
      ans,
      options: Array.from(opts).sort(() => Math.random() - 0.5)
    };
  },

  answerTurbo(choice) {
    if (this.isFinished || !this.currentQuestion) return;

    if (choice === this.currentQuestion.ans) {
      window.FunKidsRewards.playSound('correct');
      this.speedBoosts += 1;
      this.score += 35;
      this.playerProgress = Math.min(100, this.playerProgress + 23);
      window.MaxCompanion.onCorrectAnswer('دفعة نيترو صاروخية! سيارتك تتقدم بسرعة هائلة نحو خط النهاية!');
      if (this.playerProgress >= 100) {
        this.finishRace(true);
        return;
      }
    } else {
      window.FunKidsRewards.playSound('wrong');
      this.rivalProgress = Math.min(100, this.rivalProgress + 8);
      window.MaxCompanion.onWrongAnswer('انزلاق بسيط على المضمار! ركز في السؤال القادم لتشغيل محرك النيترو!');
      if (this.rivalProgress >= 100) {
        this.finishRace(false);
        return;
      }
    }

    this.generateQuestion();
    this.render();
  },

  updateTrackBars() {
    const pCar = document.getElementById('racer-player-car');
    const rCar = document.getElementById('racer-rival-car');
    const pPct = document.getElementById('racer-player-pct');
    const rPct = document.getElementById('racer-rival-pct');
    if (pCar) pCar.style.right = `${Math.min(88, this.playerProgress * 0.88)}%`;
    if (rCar) rCar.style.right = `${Math.min(88, this.rivalProgress * 0.88)}%`;
    if (pPct) pPct.textContent = `${Math.round(this.playerProgress)}%`;
    if (rPct) rPct.textContent = `${Math.round(this.rivalProgress)}%`;
  },

  finishRace(won) {
    this.isFinished = true;
    this.stopLoop();
    const container = document.getElementById('racer-game-mount');
    if (!container) return;

    if (won) {
      const totalScore = this.score + 50;
      window.FunKidsRewards.awardPoints(totalScore, 3, 'racer', 'الفوز بالمركز الأول في سباق الأبطال الذكي');
      container.innerHTML = `
        <div class="text-center py-8 px-4 space-y-4 bg-gradient-to-b from-sky-50 to-white rounded-3xl border-4 border-sky-400">
          <div class="text-6xl">🏁🏎️🏆⭐⭐⭐</div>
          <h3 class="text-3xl font-black text-slate-800">المركز الأول! بطل مضمار السباق!</h3>
          <p class="text-lg font-bold text-slate-600">قدت سيارة <strong>${this.selectedCar.name}</strong> ببراعة وفزت بالسباق برصيد <span class="text-sky-600 font-black">${totalScore} نقطة</span>!</p>
          <button type="button" onclick="window.HeroRacerGame.start()" class="btn-3d btn-secondary text-lg">
            🔄 خوض سباق جديد
          </button>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="text-center py-8 px-4 space-y-4 bg-gradient-to-b from-amber-50 to-white rounded-3xl border-4 border-amber-300">
          <div class="text-6xl">🏁🚙💨</div>
          <h3 class="text-2xl font-black text-slate-800">سباق حماسي ومثير!</h3>
          <p class="text-base font-bold text-slate-600">وصل المنافس أولاً بفارق بسيط! أعد تشغيل المحرك وجرب مرة أخرى لتحقيق المركز الأول!</p>
          <button type="button" onclick="window.HeroRacerGame.start()" class="btn-3d btn-primary text-lg">
            🔄 إعادة السباق فوراً
          </button>
        </div>
      `;
    }
  },

  render() {
    const container = document.getElementById('racer-game-mount');
    if (!container || this.isFinished) return;
    const q = this.currentQuestion;

    container.innerHTML = `
      <div class="space-y-5">
        <div class="flex flex-wrap items-center justify-between gap-3 bg-sky-50 p-4 rounded-2xl border-2 border-sky-200">
          <div class="flex flex-wrap items-center gap-2">
            <span class="px-3 py-1 rounded-full bg-sky-600 text-white font-black text-xs">👦 لعبة خاصة للأولاد</span>
            <span class="font-black text-slate-700">⚡ دفعات النيترو: <strong class="text-rose-600">${this.speedBoosts}</strong></span>
            <span class="font-black text-emerald-700">النقاط: ${this.score}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-black text-slate-600">اختر سيارتك:</span>
            ${RACE_CARS.map(c => `
              <button type="button" onclick="window.HeroRacerGame.selectCar('${c.id}')"
                class="px-3 py-1 rounded-full text-xs font-black border-2 transition ${this.selectedCar.id === c.id ? 'bg-amber-400 text-slate-900 border-slate-900 scale-105' : 'bg-white text-slate-700 border-slate-200'}">
                ${c.emoji} ${c.name}
              </button>
            `).join('')}
          </div>
        </div>

        <div class="bg-slate-800 p-5 rounded-3xl border-4 border-slate-600 space-y-4 text-white shadow-inner">
          <div class="space-y-1">
            <div class="flex justify-between text-xs font-black text-amber-300">
              <span>${this.selectedCar.emoji} سيارتك (${this.selectedCar.name})</span>
              <span id="racer-player-pct">${Math.round(this.playerProgress)}% نحو خط النهاية 🏁</span>
            </div>
            <div class="relative h-12 bg-slate-700 rounded-2xl border-2 border-slate-500 overflow-hidden flex items-center px-3">
              <div class="absolute left-3 top-1 bottom-1 w-3 bg-amber-400 rounded"></div>
              <div id="racer-player-car" class="absolute text-3xl transition-all duration-300" style="right: ${Math.min(88, this.playerProgress * 0.88)}%;">
                ${this.selectedCar.emoji}🔥
              </div>
            </div>
          </div>

          <div class="space-y-1">
            <div class="flex justify-between text-xs font-black text-slate-300">
              <span>🚓 المتسابق الآلي المنافس</span>
              <span id="racer-rival-pct">${Math.round(this.rivalProgress)}% نحو خط النهاية 🏁</span>
            </div>
            <div class="relative h-12 bg-slate-700 rounded-2xl border-2 border-slate-500 overflow-hidden flex items-center px-3">
              <div class="absolute left-3 top-1 bottom-1 w-3 bg-white rounded"></div>
              <div id="racer-rival-car" class="absolute text-3xl transition-all duration-300" style="right: ${Math.min(88, this.rivalProgress * 0.88)}%;">
                🚓💨
              </div>
            </div>
          </div>
        </div>

        <div class="text-center p-5 bg-gradient-to-br from-amber-50 to-white rounded-3xl border-4 border-amber-300 space-y-4">
          <div class="text-xs font-black text-amber-800">🔥 سؤال شحن النيترو السريع:</div>
          <div class="text-3xl md:text-5xl font-black text-slate-900" dir="ltr">${q.prompt}</div>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3" dir="ltr">
            ${q.options.map(opt => `
              <button type="button" onclick="window.HeroRacerGame.answerTurbo(${opt})"
                class="btn-3d btn-primary text-2xl py-4 font-black">
                ⚡ ${opt}
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
};

const ROBO_PARTS = {
  heads: [
    { id: 'laser_helm', name: 'خوذة الليزر الذكية', icon: '🤖', power: 35 },
    { id: 'radar_visor', name: 'منظار الرادار الفضائي', icon: '👾', power: 30 },
    { id: 'titan_crown', name: 'درع التيتانيوم المدرع', icon: '🦾', power: 40 }
  ],
  cores: [
    { id: 'solar_core', name: 'مفاعل الطاقة الشمسية', icon: '☀️', shield: 40 },
    { id: 'plasma_core', name: 'محرك البلازما الفائق', icon: '⚡', shield: 45 },
    { id: 'magnet_core', name: 'القلب المغناطيسي النووي', icon: '🧲', shield: 35 }
  ],
  missions: [
    {
      title: 'المهمة 1: تفكيك حقل النيازك المغناطيسي',
      question: 'إذا كان الروبوت يطلق 3 نبضات ليزر في الثانية، فكم نبضة يطلق في 6 ثوانٍ لتدمير النيزك؟',
      options: ['18 نبضة', '12 نبضة', '9 نبضات', '24 نبضة'],
      answer: '18 نبضة'
    },
    {
      title: 'المهمة 2: شحن درع القاعدة الفضائية',
      question: 'تحتاج القاعدة إلى 100 واط من الطاقة، ولدينا بطاريتان تعطي كل واحدة 40 واط، فكم واط إضافي نحتاج؟',
      options: ['20 واط', '40 واط', '10 واط', '60 واط'],
      answer: '20 واط'
    },
    {
      title: 'المهمة 3: برمجة مسار الإنقاذ الآلي',
      question: 'تحرك الروبوت 5 خطوات للأمام ثم 3 خطوات لليمين، كم مجموع الخطوات التي قطعها للوصول للمركبة؟',
      options: ['8 خطوات', '15 خطوة', '2 خطوة', '10 خطوات'],
      answer: '8 خطوات'
    }
  ]
};

window.RoboDefenderGame = {
  headIdx: 0,
  coreIdx: 1,
  missionIdx: 0,
  score: 0,

  start() {
    this.missionIdx = 0;
    this.score = 0;
    window.MaxCompanion.say(
      'أهلاً بك أيها المهندس البطل في مختبر الروبوتات! ركّب أجزاء الروبوت المدرع وحل الألغاز الهندسية لحماية القاعدة!',
      'explaining',
      false
    );
    this.render();
  },

  setPart(type, idx) {
    window.FunKidsRewards.playSound('click');
    if (type === 'head') this.headIdx = idx;
    if (type === 'core') this.coreIdx = idx;
    this.render();
  },

  solveMission(choice, btnEl) {
    const m = ROBO_PARTS.missions[this.missionIdx];
    if (!m) return;

    if (choice === m.answer) {
      window.FunKidsRewards.playSound('correct');
      this.score += 45;
      if (btnEl) {
        btnEl.classList.remove('btn-secondary');
        btnEl.classList.add('btn-success');
      }
      window.MaxCompanion.onCorrectAnswer('برمجة هندسية دقيقة! نجح الروبوت في تنفيذ المهمة الدفاعية!');
      setTimeout(() => {
        this.missionIdx += 1;
        this.render();
      }, 1100);
    } else {
      window.FunKidsRewards.playSound('wrong');
      if (btnEl) {
        btnEl.classList.remove('btn-secondary');
        btnEl.classList.add('btn-primary');
      }
      window.MaxCompanion.onWrongAnswer('أعد حساب الطاقة الهندسية المطلوبة وجرب الخيار الصحيح يا مهندس المستقبل!');
    }
  },

  render() {
    const container = document.getElementById('robo-game-mount');
    if (!container) return;

    const head = ROBO_PARTS.heads[this.headIdx];
    const core = ROBO_PARTS.cores[this.coreIdx];
    const totalPower = head.power + core.shield + 20;

    if (this.missionIdx >= ROBO_PARTS.missions.length) {
      window.FunKidsRewards.awardPoints(this.score, 3, 'robo', 'إكمال مهام مختبر الروبوتات والمدافع الفضائي');
      container.innerHTML = `
        <div class="text-center py-8 px-4 space-y-4 bg-gradient-to-b from-indigo-50 to-white rounded-3xl border-4 border-indigo-400">
          <div class="text-6xl">${head.icon}${core.icon}🏆⭐⭐⭐</div>
          <h3 class="text-3xl font-black text-slate-800">مهندس الروبوتات الأسطوري!</h3>
          <p class="text-lg font-bold text-slate-600">بنيت الروبوت المدرع وحميت القاعدة الفضائية بنجاح وحصلت على <span class="text-indigo-600 font-black">${this.score} نقطة</span>!</p>
          <button type="button" onclick="window.RoboDefenderGame.start()" class="btn-3d btn-purple text-lg">
            🔄 تصميم روبوت ومهمة جديدة
          </button>
        </div>
      `;
      return;
    }

    const m = ROBO_PARTS.missions[this.missionIdx];

    container.innerHTML = `
      <div class="space-y-5">
        <div class="flex flex-wrap items-center justify-between gap-3 bg-indigo-50 p-4 rounded-2xl border-2 border-indigo-200">
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 rounded-full bg-indigo-700 text-white font-black text-xs">👦 لعبة خاصة للأولاد</span>
            <span class="font-black text-slate-800">المهمة ${this.missionIdx + 1} / ${ROBO_PARTS.missions.length}</span>
          </div>
          <span class="font-black text-indigo-700">قوة الروبوت الإجمالية: ⚡ ${totalPower}% | النقاط: ${this.score}</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          <div class="md:col-span-5 bg-slate-900 text-white p-5 rounded-3xl border-4 border-indigo-400 text-center space-y-3">
            <span class="text-xs font-black text-amber-300 bg-indigo-950 px-3 py-1 rounded-full">ورشة تجميع الروبوت</span>
            <div class="py-4 bg-gradient-to-b from-indigo-950 to-slate-900 rounded-2xl border border-indigo-700">
              <div class="text-6xl animate-float">${head.icon}</div>
              <div class="text-4xl mt-1">${core.icon}🛡️</div>
            </div>
            <div class="text-sm font-black text-sky-300">${head.name} + ${core.name}</div>

            <div class="space-y-2 text-right pt-2">
              <div class="text-xs font-bold text-slate-300">1. اختر وحدة الرأس والرادار:</div>
              <div class="flex flex-wrap gap-1.5">
                ${ROBO_PARTS.heads.map((h, i) => `
                  <button type="button" onclick="window.RoboDefenderGame.setPart('head', ${i})"
                    class="px-2.5 py-1 rounded-xl text-xs font-black ${this.headIdx === i ? 'bg-amber-400 text-slate-900' : 'bg-slate-800 text-slate-200'}">
                    ${h.icon} ${h.name}
                  </button>
                `).join('')}
              </div>

              <div class="text-xs font-bold text-slate-300 pt-1">2. اختر مفاعل الطاقة والدرع:</div>
              <div class="flex flex-wrap gap-1.5">
                ${ROBO_PARTS.cores.map((c, i) => `
                  <button type="button" onclick="window.RoboDefenderGame.setPart('core', ${i})"
                    class="px-2.5 py-1 rounded-xl text-xs font-black ${this.coreIdx === i ? 'bg-emerald-400 text-slate-900' : 'bg-slate-800 text-slate-200'}">
                    ${c.icon} ${c.name}
                  </button>
                `).join('')}
              </div>
            </div>
          </div>

          <div class="md:col-span-7 bg-white p-5 rounded-3xl border-4 border-indigo-200 space-y-4">
            <span class="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-black text-xs">🛡️ ${m.title}</span>
            <h4 class="text-xl font-black text-slate-800 leading-relaxed">${m.question}</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              ${m.options.map(opt => `
                <button type="button" onclick="window.RoboDefenderGame.solveMission('${opt}', this)"
                  class="btn-3d btn-secondary text-base py-3.5 font-black">
                  ⚙️ ${opt}
                </button>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
