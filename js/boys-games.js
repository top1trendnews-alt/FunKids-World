/* ==========================================================================
   عالم فن كيدز - ألعاب الأولاد الحركية والواقعية الـ 5 (boys-games.js)
   1. سباق الأبطال التوربيني (HeroRacerGame)
   2. مختبر الروبوتات والمدافع الفضائي (RoboDefenderGame)
   3. بطولة نجوم كرة القدم وركلات الترجيح (SoccerChampGame)
   4. مغامرة منقب الديناصورات والكنوز (DinoExplorerGame)
   5. تحدي السهام والرامي المحترف (ArcheryMasterGame)
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. سباق الأبطال التوربيني (HeroRacerGame) - مضمار متحرك ونيترو وتغيير مسار
   -------------------------------------------------------------------------- */
window.HeroRacerGame = {
  selectedCar: { name: 'البرق الأحمر', emoji: '🏎️', speedTitle: 'توربو ناري' },
  playerProgress: 10,
  rivalProgress: 10,
  lane: 1, // 0: مسار علوي, 1: مسار سفلي
  speedKmh: 120,
  nitroActive: false,
  score: 0,
  round: 1,
  maxRounds: 5,
  currentQ: null,
  raceInterval: null,

  cars: [
    { name: 'البرق الأحمر', emoji: '🏎️', speedTitle: 'توربو ناري' },
    { name: 'الصقر الأزرق', emoji: '🚙', speedTitle: 'دفع رباعي خارق' },
    { name: 'الوحش الأخضر', emoji: '🚓', speedTitle: 'اعتراض سريع' }
  ],

  start() {
    this.stopLoop();
    this.playerProgress = 8;
    this.rivalProgress = 8;
    this.lane = 0;
    this.speedKmh = 125;
    this.nitroActive = false;
    this.score = 0;
    this.round = 1;
    this.generateQuestion();

    window.MaxCompanion.say(
      'استعد للانطلاق في سباق الأبطال التوربيني! غيّر مسار سيارتك وأجب بسرعة لتشغيل لهب النيترو وتجاوز خط النهاية أولاً!',
      'excited',
      false
    );
    this.render();
    this.startLoop();
  },

  stopLoop() {
    if (this.raceInterval) {
      clearInterval(this.raceInterval);
      this.raceInterval = null;
    }
  },

  startLoop() {
    this.stopLoop();
    this.raceInterval = setInterval(() => {
      if (this.rivalProgress < 92 && this.round <= this.maxRounds) {
        this.rivalProgress = Math.min(92, this.rivalProgress + 1.2);
        const rivalEl = document.getElementById('racer-rival-car');
        if (rivalEl) rivalEl.style.right = `${this.rivalProgress}%`;
      }
    }, 650);
  },

  selectCar(idx) {
    window.FunKidsRewards.playSound('engine');
    this.selectedCar = this.cars[idx] || this.cars[0];
    this.render();
  },

  switchLane(newLane) {
    window.FunKidsRewards.playSound('click');
    this.lane = newLane;
    this.render();
  },

  generateQuestion() {
    const zone = (window.FunKidsStorage.state && window.FunKidsStorage.state.ageZone) || 'junior';
    let a, b, op, ans;
    if (zone === 'kids') {
      a = Math.floor(Math.random() * 8) + 2;
      b = Math.floor(Math.random() * 7) + 1;
      op = '+';
      ans = a + b;
    } else if (zone === 'junior') {
      const ops = ['+', '-', '×'];
      op = ops[Math.floor(Math.random() * ops.length)];
      if (op === '×') {
        a = Math.floor(Math.random() * 7) + 2;
        b = Math.floor(Math.random() * 6) + 2;
        ans = a * b;
      } else if (op === '-') {
        a = Math.floor(Math.random() * 15) + 10;
        b = Math.floor(Math.random() * 9) + 1;
        ans = a - b;
      } else {
        a = Math.floor(Math.random() * 15) + 5;
        b = Math.floor(Math.random() * 12) + 3;
        ans = a + b;
      }
    } else {
      a = Math.floor(Math.random() * 11) + 4;
      b = Math.floor(Math.random() * 9) + 3;
      op = '×';
      ans = a * b;
    }

    const opts = new Set([ans]);
    while (opts.size < 4) {
      const cand = ans + (Math.floor(Math.random() * 9) - 4);
      if (cand >= 0 && cand !== ans) opts.add(cand);
    }
    this.currentQ = {
      text: `${a} ${op} ${b} = ؟`,
      answer: ans,
      options: Array.from(opts).sort(() => Math.random() - 0.5)
    };
  },

  render() {
    const mount = document.getElementById('racer-game-mount');
    if (!mount) return;

    if (this.round > this.maxRounds) {
      this.stopLoop();
      const won = this.playerProgress >= this.rivalProgress;
      const finalBonus = won ? 50 : 20;
      const totalScore = this.score + finalBonus;
      window.FunKidsRewards.awardPoints(totalScore, won ? 3 : 2, 'racer', 'إنهاء سباق الأبطال التوربيني');

      mount.innerHTML = `
        <div class="text-center py-6 px-4 space-y-4 bg-gradient-to-b from-sky-50 to-white rounded-3xl border-4 border-sky-300">
          <div class="text-6xl animate-bounce">${this.selectedCar.emoji}🏁🏆</div>
          <h3 class="text-2xl sm:text-3xl font-black text-slate-900">${won ? 'المركز الأول! بطل الحلبة التوربيني!' : 'سباق حماسي رائع!'}</h3>
          <p class="text-base sm:text-lg font-bold text-slate-600">السرعة القصوى: <span class="text-rose-600 font-black">${this.speedKmh} كم/س</span> • مجموع النقاط: <span class="text-sky-600 font-black">${totalScore} نقطة</span></p>
          <button type="button" onclick="window.HeroRacerGame.start()" class="btn-3d btn-secondary text-base py-3 px-6">
            🔄 سباق جديد
          </button>
        </div>
      `;
      return;
    }

    mount.innerHTML = `
      <div class="space-y-4">
        <!-- اختيار السيارة وعداد السرعة -->
        <div class="flex flex-wrap items-center justify-between gap-2 bg-sky-50 p-3.5 rounded-2xl border-2 border-sky-200">
          <div class="flex flex-wrap items-center gap-1.5">
            <span class="text-xs font-black text-slate-700 ml-1">اختر سيارتك:</span>
            ${this.cars.map((c, i) => `
              <button type="button" onclick="window.HeroRacerGame.selectCar(${i})"
                class="px-3 py-1.5 rounded-xl font-black text-xs border-2 transition ${this.selectedCar.name === c.name ? 'bg-sky-600 text-white border-sky-800 scale-105 shadow' : 'bg-white text-slate-700 border-slate-200'}">
                ${c.emoji} ${c.name}
              </button>
            `).join('')}
          </div>
          <div class="flex items-center gap-2 text-xs sm:text-sm font-black">
            <span class="px-3 py-1 rounded-full bg-rose-600 text-white">⚡ السرعة: ${this.speedKmh} كم/س</span>
            <span class="px-3 py-1 rounded-full bg-amber-300 text-slate-900">النقاط: ${this.score}</span>
          </div>
        </div>

        <!-- مضمار السباق الحركي والواقعي -->
        <div class="interactive-stage bg-slate-800 p-4 sm:p-5 text-white space-y-4 relative">
          <div class="flex items-center justify-between text-xs font-black text-amber-300">
            <span>🚦 الدفعة ${this.round} من ${this.maxRounds}</span>
            <div class="flex items-center gap-2">
              <button type="button" onclick="window.HeroRacerGame.switchLane(0)" class="px-2.5 py-1 rounded-lg ${this.lane === 0 ? 'bg-amber-400 text-slate-900' : 'bg-slate-700 text-white'}">⬆️ المسار العلوي</button>
              <button type="button" onclick="window.HeroRacerGame.switchLane(1)" class="px-2.5 py-1 rounded-lg ${this.lane === 1 ? 'bg-amber-400 text-slate-900' : 'bg-slate-700 text-white'}">⬇️ المسار السفلي</button>
            </div>
            <span>🏁 خط النهاية</span>
          </div>

          <!-- حلبة الأسفلت المتحركة -->
          <div class="relative bg-slate-900 rounded-2xl p-3 border-2 border-slate-600 space-y-3 overflow-hidden">
            <!-- خط النهاية الشطرنجي -->
            <div class="absolute left-3 top-0 bottom-0 w-3 bg-gradient-to-b from-white via-black to-white opacity-80 z-10"></div>

            <!-- مسار اللاعب مع خطوط الطريق المتحركة ولهب النيترو -->
            <div class="relative h-14 bg-slate-800/90 rounded-xl flex items-center px-3 border ${this.lane === 0 ? 'border-amber-400 ring-2 ring-amber-300/40' : 'border-slate-700'}">
              <div class="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 animate-road-scroll opacity-50"></div>
              <span class="text-[11px] font-black text-sky-300 z-10">أنت (${this.selectedCar.name})</span>
              <div class="absolute transition-all duration-500 flex items-center gap-1 z-20" style="right: ${this.playerProgress}%">
                <span class="text-3xl sm:text-4xl drop-shadow" style="display:inline-block; transform: scaleX(-1);">${this.selectedCar.emoji}</span>
                ${this.nitroActive ? '<span class="text-xl animate-nitro">🔥💨</span>' : ''}
              </div>
            </div>

            <!-- مسار المنافس الآلي -->
            <div class="relative h-14 bg-slate-800/75 rounded-xl flex items-center px-3 border ${this.lane === 1 ? 'border-amber-400 ring-2 ring-amber-300/40' : 'border-slate-700'}">
              <div class="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 animate-road-scroll opacity-40"></div>
              <span class="text-[11px] font-black text-rose-300 z-10">المنافس التوربيني</span>
              <div id="racer-rival-car" class="absolute transition-all duration-500 text-3xl sm:text-4xl z-20" style="right: ${this.rivalProgress}%">
                <span style="display:inline-block; transform: scaleX(-1);">🚕</span>
              </div>
            </div>
          </div>
        </div>

        <!-- سؤال شحن النيترو -->
        <div class="text-center p-5 bg-gradient-to-b from-white to-sky-50 rounded-3xl border-4 border-sky-200 space-y-4">
          <div class="inline-block px-3.5 py-1 rounded-full bg-amber-300 text-slate-900 font-black text-xs">
            🔥 اشحن محرك النيترو التوربيني بالإجابة الصحيحة!
          </div>
          <div class="text-3xl sm:text-4xl font-black text-slate-900 py-1" dir="ltr">${this.currentQ.text}</div>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            ${this.currentQ.options.map(opt => `
              <button type="button" onclick="window.HeroRacerGame.answer(${opt})"
                class="btn-3d btn-secondary text-xl sm:text-2xl py-3.5 font-black">
                ${opt}
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  answer(val) {
    if (val === this.currentQ.answer) {
      window.FunKidsRewards.playSound('engine');
      window.FunKidsRewards.playSound('correct');
      this.score += 35;
      this.speedKmh += 35;
      this.nitroActive = true;
      this.playerProgress = Math.min(88, this.playerProgress + 17);
      this.rivalProgress = Math.min(85, this.rivalProgress + 7);
      window.MaxCompanion.onCorrectAnswer('انطلاقة نيترو خارقة! سيارتك تتقدم بسرعة البرق!');
    } else {
      window.FunKidsRewards.playSound('wrong');
      this.nitroActive = false;
      this.playerProgress = Math.min(88, this.playerProgress + 5);
      this.rivalProgress = Math.min(88, this.rivalProgress + 14);
      window.MaxCompanion.onWrongAnswer(`الإجابة الصحيحة كانت ${this.currentQ.answer}. ركّز في المنعطف القادم!`);
    }
    this.round += 1;
    this.generateQuestion();
    this.render();
  }
};

/* --------------------------------------------------------------------------
   2. مختبر الروبوتات والمدافع الفضائي (RoboDefenderGame) - شعاع ليزر ودروع
   -------------------------------------------------------------------------- */
window.RoboDefenderGame = {
  headIdx: 0,
  armorIdx: 0,
  weaponIdx: 0,
  shieldEnergy: 100,
  laserFiring: false,
  step: 0,
  score: 0,

  heads: ['🤖 رأس ليزر ذكي', '👾 خوذة رادار فضائية', '🦾 معالج كوانتم خارق'],
  armors: ['🛡️ درع تيتانيوم أزرق', '⚡ درع بلازما ذهبي', '🔥 درع نيون ناري'],
  weapons: ['🔫 مدفع نبضات ضوئية', '🧲 قاذف كهرومغناطيسي', '☄️ شعاع نيازك ثنائي'],

  missions: [
    {
      meteorTitle: 'نيزك جليدي عملاق يقترب من القاعدة بسرعة 45 كم/ث!',
      question: 'لتفكيك النيزك بشعاع الليزر، نحتاج إلى طاقة تساوي: 6 × 4 ميغاواط. كم تساوي؟',
      options: ['24', '18', '20', '28'],
      answer: '24'
    },
    {
      meteorTitle: 'خلل في بوابة القمر الصناعي: فقدنا 30% من الطاقة من أصل 100%!',
      question: 'كم نسبة الطاقة المتبقية في القمر الصناعي الآن؟',
      options: ['70%', '60%', '80%', '50%'],
      answer: '70%'
    },
    {
      meteorTitle: 'سرب من 3 صخور فضائية كل صخرة تحتاج 15 نبضة ليزر لتفتيتها!',
      question: 'كم مجموع نبضات الليزر المطلوبة لحماية القاعدة بالكامل؟',
      options: ['45', '35', '50', '30'],
      answer: '45'
    }
  ],

  start() {
    this.step = 0;
    this.score = 0;
    this.shieldEnergy = 100;
    this.laserFiring = false;
    window.MaxCompanion.say(
      'أهلاً بك يا مهندس المستقبل في مختبر الروبوتات! طوّر دروع وأسلحة الروبوت ثم أطلق شعاع الليزر لتدمير النيازك!',
      'explaining',
      false
    );
    this.render();
  },

  customize(part, idx) {
    window.FunKidsRewards.playSound('laser');
    if (part === 'head') this.headIdx = idx;
    if (part === 'armor') this.armorIdx = idx;
    if (part === 'weapon') this.weaponIdx = idx;
    this.render();
  },

  render() {
    const mount = document.getElementById('robo-game-mount');
    if (!mount) return;

    if (this.step >= this.missions.length) {
      window.FunKidsRewards.awardPoints(this.score + 40, 3, 'robo', 'حماية القاعدة في مختبر الروبوتات');
      mount.innerHTML = `
        <div class="text-center py-6 px-4 space-y-4 bg-gradient-to-b from-indigo-50 to-white rounded-3xl border-4 border-indigo-300">
          <div class="text-6xl">🤖🛡️⚡⭐⭐⭐</div>
          <h3 class="text-2xl sm:text-3xl font-black text-slate-900">قائد هندسة الروبوتات الأعلى!</h3>
          <p class="text-base sm:text-lg font-bold text-slate-600">نجح روبوتك في تدمير جميع النيازك وحصلت على <span class="text-indigo-600 font-black">${this.score + 40} نقطة</span>!</p>
          <button type="button" onclick="window.RoboDefenderGame.start()" class="btn-3d btn-purple text-base py-3 px-6">
            🔄 مهمة روبوت جديدة
          </button>
        </div>
      `;
      return;
    }

    const m = this.missions[this.step];

    mount.innerHTML = `
      <div class="space-y-4">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <!-- ساحة المعركة الفضائية والروبوت التفاعلي -->
          <div class="lg:col-span-5 interactive-stage bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 text-white p-5 flex flex-col items-center justify-between text-center space-y-3">
            <div class="w-full flex items-center justify-between text-xs font-black">
              <span class="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">⚙️ درع القاعدة: ${this.shieldEnergy}%</span>
              <span class="px-2.5 py-1 rounded-full bg-amber-400 text-slate-900">النقاط: ${this.score}</span>
            </div>

            <!-- النيزك والليزر والروبوت -->
            <div class="relative py-3 flex flex-col items-center justify-center w-full">
              <div class="text-4xl sm:text-5xl animate-bounce mb-2">☄️</div>
              <div class="h-10 w-1.5 rounded-full ${this.laserFiring ? 'bg-cyan-400 shadow-[0_0_20px_#22d3ee]' : 'bg-cyan-500/25'} transition-all"></div>
              <div class="w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-400 via-blue-600 to-indigo-700 border-4 border-white shadow-xl flex items-center justify-center text-5xl mt-1">
                🤖
              </div>
            </div>

            <div class="w-full space-y-1 text-xs font-bold bg-white/10 p-3 rounded-2xl border border-white/15">
              <div class="text-cyan-300">الرأس: ${this.heads[this.headIdx]}</div>
              <div class="text-amber-300">الدرع: ${this.armors[this.armorIdx]}</div>
              <div class="text-emerald-300">السلاح: ${this.weapons[this.weaponIdx]}</div>
            </div>
          </div>

          <!-- أزرار تخصيص القطع -->
          <div class="lg:col-span-7 bg-slate-50 p-4 rounded-3xl border-2 border-slate-200 space-y-3">
            <h4 class="font-black text-slate-800 text-sm sm:text-base">🔧 ورشة تركيب وتطوير الروبوت:</h4>
            <div class="space-y-2">
              <div class="text-xs font-black text-slate-500">1. اختر وحدة الرأس والرادار:</div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                ${this.heads.map((h, i) => `
                  <button type="button" onclick="window.RoboDefenderGame.customize('head', ${i})"
                    class="p-2 rounded-xl text-xs font-black border-2 transition ${this.headIdx === i ? 'bg-indigo-600 text-white border-indigo-800' : 'bg-white text-slate-700 border-slate-200'}">${h}</button>
                `).join('')}
              </div>
            </div>

            <div class="space-y-2">
              <div class="text-xs font-black text-slate-500">2. اختر الدرع الواقي:</div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                ${this.armors.map((a, i) => `
                  <button type="button" onclick="window.RoboDefenderGame.customize('armor', ${i})"
                    class="p-2 rounded-xl text-xs font-black border-2 transition ${this.armorIdx === i ? 'bg-sky-600 text-white border-sky-800' : 'bg-white text-slate-700 border-slate-200'}">${a}</button>
                `).join('')}
              </div>
            </div>

            <div class="space-y-2">
              <div class="text-xs font-black text-slate-500">3. اختر منظومة الليزر:</div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                ${this.weapons.map((w, i) => `
                  <button type="button" onclick="window.RoboDefenderGame.customize('weapon', ${i})"
                    class="p-2 rounded-xl text-xs font-black border-2 transition ${this.weaponIdx === i ? 'bg-emerald-600 text-white border-emerald-800' : 'bg-white text-slate-700 border-slate-200'}">${w}</button>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- مهمة إطلاق الليزر -->
        <div class="p-5 bg-gradient-to-b from-indigo-50 to-white rounded-3xl border-4 border-indigo-200 space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="px-3 py-1 rounded-full bg-rose-600 text-white font-black text-xs">🚨 إنذار المهمة ${this.step + 1} من ${this.missions.length}</span>
          </div>
          <p class="font-bold text-slate-700 text-xs sm:text-sm bg-amber-50 p-3 rounded-xl border border-amber-200">${m.meteorTitle}</p>
          <h4 class="text-base sm:text-xl font-black text-slate-900">${m.question}</h4>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            ${m.options.map(opt => `
              <button type="button" onclick="window.RoboDefenderGame.solveMission('${opt}')"
                class="btn-3d btn-purple text-base sm:text-lg py-3 font-black">
                ⚡ ${opt}
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  solveMission(selected) {
    const m = this.missions[this.step];
    if (selected === m.answer) {
      this.score += 40;
      this.laserFiring = true;
      window.FunKidsRewards.playSound('laser');
      window.FunKidsRewards.playSound('correct');
      window.MaxCompanion.onCorrectAnswer('إصابة مباشرة بشعاع الليزر! تم تفتيت النيزك الفضائي بالكامل!');
    } else {
      this.shieldEnergy = Math.max(40, this.shieldEnergy - 20);
      window.FunKidsRewards.playSound('wrong');
      window.MaxCompanion.onWrongAnswer(`الإجابة الصحيحة هي ${m.answer}. تم تفعيل الدرع الاحتياطي!`);
    }
    this.step += 1;
    this.render();
  }
};

/* --------------------------------------------------------------------------
   3. بطولة نجوم كرة القدم وركلات الترجيح (SoccerChampGame) - حارس متحرك وتسديد حي
   -------------------------------------------------------------------------- */
window.SoccerChampGame = {
  shotsTaken: 0,
  maxShots: 5,
  goalsScored: 0,
  score: 0,
  goalieZone: 2, // 0..4
  ballPos: { x: 50, y: 82 },
  lastResultText: 'اختر زاوية التسديد في المرمى واضبط التوقيت لتتغلب على حارس المرمى المتحرك!',
  goalieTimer: null,
  isKicking: false,

  zones: [
    { id: 0, label: 'زاوية علوية يمنى ↗️', x: 18, y: 24 },
    { id: 1, label: 'زاوية سفلية يمنى ↘️', x: 22, y: 52 },
    { id: 2, label: 'وسط المرمى ⬆️', x: 50, y: 35 },
    { id: 3, label: 'زاوية سفلية يسرى ↙️', x: 78, y: 52 },
    { id: 4, label: 'زاوية علوية يسرى ↖️', x: 82, y: 24 }
  ],

  start() {
    this.stopGoalie();
    this.shotsTaken = 0;
    this.goalsScored = 0;
    this.score = 0;
    this.goalieZone = 2;
    this.ballPos = { x: 50, y: 82 };
    this.isKicking = false;
    this.lastResultText = 'الحارس يتحرك باستمرار! انقر على إحدى زوايا المرمى الخمس لتسديد الكرة بقوة!';
    window.MaxCompanion.say(
      'مرحباً بك في نهائي بطولة نجوم كرة القدم! راقب حركة حارس المرمى وسدد الكرة في الزاوية الخالية لتسجل هدفاً ذهبياً!',
      'excited',
      false
    );
    this.render();
    this.startGoalie();
  },

  stopGoalie() {
    if (this.goalieTimer) {
      clearInterval(this.goalieTimer);
      this.goalieTimer = null;
    }
  },

  startGoalie() {
    this.stopGoalie();
    this.goalieTimer = setInterval(() => {
      if (this.isKicking) return;
      this.goalieZone = Math.floor(Math.random() * 5);
      const goalieEl = document.getElementById('soccer-goalie-sprite');
      if (goalieEl) {
        const z = this.zones[this.goalieZone];
        goalieEl.style.left = `${z.x}%`;
        goalieEl.style.top = `${z.y}%`;
      }
    }, 850);
  },

  shoot(zoneId) {
    if (this.isKicking || this.shotsTaken >= this.maxShots) return;
    this.isKicking = true;
    const targetZone = this.zones[zoneId];
    this.ballPos = { x: targetZone.x, y: targetZone.y };

    // الحارس يقفز لحظة التسديد (فرصة عالية للتسجيل إذا اختار زاوية مختلفة)
    const goalieDive = Math.random() < 0.28 ? zoneId : this.goalieZone;
    this.goalieZone = goalieDive;
    const isGoal = goalieDive !== zoneId;

    this.shotsTaken += 1;
    if (isGoal) {
      this.goalsScored += 1;
      this.score += 35;
      window.FunKidsRewards.playSound('correct');
      this.lastResultText = `⚽ قووول رائع في ${targetZone.label}! تسديدة صاروخية لا تُصد! (+35 نقطة)`;
      window.MaxCompanion.onCorrectAnswer('قووول! تسديدة احترافية في المقص هزت الشباك!');
    } else {
      window.FunKidsRewards.playSound('wrong');
      this.lastResultText = `🧤 تصدى لها الحارس في ${targetZone.label}! جرب زاوية أخرى في الركلة القادمة!`;
      window.MaxCompanion.onWrongAnswer('تصدى لها الحارس بصعوبة! سدد في الزاوية البعيدة في الركلة التالية!');
    }

    this.render();

    setTimeout(() => {
      this.ballPos = { x: 50, y: 82 };
      this.isKicking = false;
      this.render();
    }, 950);
  },

  render() {
    const mount = document.getElementById('soccer-game-mount');
    if (!mount) return;

    if (this.shotsTaken >= this.maxShots && !this.isKicking) {
      this.stopGoalie();
      const total = this.score + 30;
      window.FunKidsRewards.awardPoints(total, 3, 'soccer', 'الفوز ببطولة نجوم كرة القدم');
      mount.innerHTML = `
        <div class="text-center py-6 px-4 space-y-4 bg-gradient-to-b from-emerald-50 to-white rounded-3xl border-4 border-emerald-400">
          <div class="text-6xl animate-bounce">⚽🥇🏆</div>
          <h3 class="text-2xl sm:text-3xl font-black text-slate-900">هدّاف البطولة الذهبي!</h3>
          <p class="text-base sm:text-lg font-bold text-slate-600">سجلت <span class="text-emerald-600 font-black">${this.goalsScored} أهداف</span> من ${this.maxShots} ركلات وحصلت على <span class="text-emerald-700 font-black">${total} نقطة</span>!</p>
          <button type="button" onclick="window.SoccerChampGame.start()" class="btn-3d btn-success text-base py-3 px-6">
            🔄 مباراة ركلات ترجيح جديدة
          </button>
        </div>
      `;
      return;
    }

    const gPos = this.zones[this.goalieZone] || this.zones[2];

    mount.innerHTML = `
      <div class="space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2 bg-emerald-50 p-3.5 rounded-2xl border-2 border-emerald-200">
          <div class="flex items-center gap-2 text-xs sm:text-sm font-black">
            <span class="px-3 py-1 rounded-full bg-emerald-600 text-white">⚽ الركلة: ${this.shotsTaken} / ${this.maxShots}</span>
            <span class="px-3 py-1 rounded-full bg-amber-300 text-slate-900">الأهداف المسجلة: ${this.goalsScored}</span>
          </div>
          <span class="font-black text-emerald-800 text-sm">النقاط: ${this.score}</span>
        </div>

        <!-- ملعب كرة القدم التفاعلي -->
        <div class="interactive-stage soccer-pitch h-72 sm:h-80 relative p-4 flex flex-col justify-between">
          <!-- إطار المرمى والشباك -->
          <div class="relative mx-auto w-11/12 sm:w-4/5 h-44 border-t-8 border-x-8 border-white rounded-t-2xl bg-white/10 backdrop-blur-[1px] shadow-inner">
            <!-- نقاط التصويب داخل المرمى -->
            ${this.zones.map(z => `
              <button type="button" onclick="window.SoccerChampGame.shoot(${z.id})"
                style="left: ${z.x}%; top: ${z.y}%; transform: translate(-50%, -50%);"
                class="target-zone-btn absolute z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-amber-400/90 hover:bg-amber-300 border-3 border-white shadow-lg flex items-center justify-center text-lg font-black text-slate-900"
                title="${z.label}">
                🎯
              </button>
            `).join('')}

            <!-- حارس المرمى المتحرك -->
            <div id="soccer-goalie-sprite"
              style="left: ${gPos.x}%; top: ${gPos.y}%; transform: translate(-50%, -50%);"
              class="absolute z-10 text-4xl sm:text-5xl transition-all duration-300 pointer-events-none drop-shadow-lg">
              🤾‍♂️
            </div>
          </div>

          <!-- الكرة على نقطة الجزاء وتطير نحو الزاوية -->
          <div style="left: ${this.ballPos.x}%; top: ${this.ballPos.y}%; transform: translate(-50%, -50%);"
            class="absolute z-30 text-3xl sm:text-4xl transition-all duration-500 pointer-events-none drop-shadow-xl">
            ⚽
          </div>

          <div class="text-center text-white font-black text-xs sm:text-sm bg-slate-900/70 py-1.5 px-3 rounded-xl mx-auto">
            ${this.lastResultText}
          </div>
        </div>

        <!-- أزرار التسديد السريع للجوال -->
        <div class="grid grid-cols-2 sm:grid-cols-5 gap-2">
          ${this.zones.map(z => `
            <button type="button" onclick="window.SoccerChampGame.shoot(${z.id})"
              class="btn-3d btn-success text-xs py-2.5 px-2">
              ⚽ ${z.label}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }
};

/* --------------------------------------------------------------------------
   4. مغامرة منقب الديناصورات والكنوز (DinoExplorerGame) - حفر بالمعول ورادار
   -------------------------------------------------------------------------- */
window.DinoExplorerGame = {
  grid: [],
  fossilsFound: 0,
  totalFossils: 5,
  score: 0,
  tool: 'pickaxe', // 'pickaxe' | 'brush'
  lastDiscovery: 'استخدم المعول ⛏️ أو الفرشاة 🖌️ للنقر على طبقات الصخور واستخراج أحافير الديناصورات والكنوز!',

  dinoCatalog: [
    { icon: '🦖', name: 'جمجمة تي ريكس العملاق', fact: 'عاش التيرانوصور قبل 68 مليون سنة وكان يمتلك أقوى فك بين الديناصورات!' },
    { icon: '🦕', name: 'فقرات براكيوصور الطويل', fact: 'البراكيوصور كان يصل ارتفاعه إلى 13 متراً ويتغذى على أوراق الأشجار العالية!' },
    { icon: '🦴', name: 'درع ترايسيراتوبس الثلاثي', fact: 'امتلك الترايسيراتوبس ثلاثة قرون قوية ودرعاً عظمياً لحماية رأسه!' },
    { icon: '💎', name: 'بلورة كهرمان ما قبل التاريخ', fact: 'الكهرمان هو صمغ أشجار متحجر حفظ الحشرات والنباتات لملايين السنين!' },
    { icon: '🥚', name: 'بيضة ديناصور متحجرة نادرة', fact: 'كانت الديناصورات تضع بيضها في أعشاش دافئة وترعى صغارها!' }
  ],

  start() {
    this.fossilsFound = 0;
    this.score = 0;
    this.tool = 'pickaxe';
    this.lastDiscovery = 'انقر على المربعات الصخرية الـ 12 لتكسير الصخور واكتشاف الأحافير الـ 5 المخفية!';

    const items = [
      ...this.dinoCatalog.map(d => ({ type: 'fossil', ...d })),
      { type: 'gold', icon: '🪙', name: 'عملة أثرية قديمة', fact: 'قطعة معدنية لامعة من العصور القديمة (+15 نقطة)!' },
      { type: 'gold', icon: '🪙', name: 'عملة أثرية قديمة', fact: 'قطعة معدنية لامعة من العصور القديمة (+15 نقطة)!' },
      { type: 'rock', icon: '🪨', name: 'طبقة رملية فارغة', fact: 'واصل الحفر في المربعات المجاورة!' },
      { type: 'rock', icon: '🪨', name: 'طبقة رملية فارغة', fact: 'واصل الحفر في المربعات المجاورة!' },
      { type: 'rock', icon: '🪨', name: 'طبقة رملية فارغة', fact: 'واصل الحفر في المربعات المجاورة!' },
      { type: 'rock', icon: '🪨', name: 'طبقة رملية فارغة', fact: 'واصل الحفر في المربعات المجاورة!' },
      { type: 'rock', icon: '🪨', name: 'طبقة رملية فارغة', fact: 'واصل الحفر في المربعات المجاورة!' }
    ].sort(() => Math.random() - 0.5);

    this.grid = items.map((item, idx) => ({
      id: idx,
      layers: 2, // يحتاج نقرتين أو نقرة بالمعول القوي
      revealed: false,
      content: item
    }));

    window.MaxCompanion.say(
      'أهلاً بك في موقع التنقيب الجيولوجي! اكسر الطبقات الصخرية بالمعول لتكتشف عظام الديناصورات العملاقة!',
      'explaining',
      false
    );
    this.render();
  },

  setTool(t) {
    window.FunKidsRewards.playSound('click');
    this.tool = t;
    this.render();
  },

  digTile(idx) {
    const cell = this.grid[idx];
    if (!cell || cell.revealed) return;

    cell.layers = this.tool === 'pickaxe' ? 0 : Math.max(0, cell.layers - 1);
    if (cell.layers === 0) {
      cell.revealed = true;
      const c = cell.content;
      if (c.type === 'fossil') {
        this.fossilsFound += 1;
        this.score += 35;
        window.FunKidsRewards.playSound('correct');
        this.lastDiscovery = `🦖 اكتشاف مذهل: ${c.name}! — ${c.fact}`;
        window.MaxCompanion.onCorrectAnswer(`رائع! استخرجت ${c.name}! ${c.fact}`);
      } else if (c.type === 'gold') {
        this.score += 15;
        window.FunKidsRewards.playSound('sparkle');
        this.lastDiscovery = `🪙 عثرت على ${c.name}! +15 نقطة إضافية!`;
      } else {
        window.FunKidsRewards.playSound('click');
        this.lastDiscovery = `🪨 ${c.name} — جرب الحفر في المربع المجاور!`;
      }
    } else {
      window.FunKidsRewards.playSound('click');
      this.lastDiscovery = '⛏️ تشققت الصخرة! انقر مرة أخرى لإزالة الرمال واستخراج ما بداخلها!';
    }

    this.render();
  },

  render() {
    const mount = document.getElementById('dino-game-mount');
    if (!mount) return;

    if (this.fossilsFound >= this.totalFossils) {
      const total = this.score + 40;
      window.FunKidsRewards.awardPoints(total, 3, 'dino', 'استخراج جميع أحافير الديناصورات');
      mount.innerHTML = `
        <div class="text-center py-6 px-4 space-y-4 bg-gradient-to-b from-amber-50 to-white rounded-3xl border-4 border-amber-400">
          <div class="text-6xl animate-bounce">🦖🦕💎🏆</div>
          <h3 class="text-2xl sm:text-3xl font-black text-slate-900">كبير علماء الحفريات والديناصورات!</h3>
          <p class="text-base sm:text-lg font-bold text-slate-600">استخرجت جميع الأحافير الخمسة بنجاح وحصلت على <span class="text-amber-600 font-black">${total} نقطة</span>!</p>
          <button type="button" onclick="window.DinoExplorerGame.start()" class="btn-3d btn-accent text-base py-3 px-6">
            🔄 بعثة تنقيب جديدة
          </button>
        </div>
      `;
      return;
    }

    mount.innerHTML = `
      <div class="space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2 bg-amber-50 p-3.5 rounded-2xl border-2 border-amber-300">
          <div class="flex flex-wrap items-center gap-2">
            <span class="px-3 py-1 rounded-full bg-amber-700 text-white font-black text-xs">🦖 الأحافير المكتشفة: ${this.fossilsFound} / ${this.totalFossils}</span>
            <button type="button" onclick="window.DinoExplorerGame.setTool('pickaxe')"
              class="px-3 py-1 rounded-xl font-black text-xs border-2 ${this.tool === 'pickaxe' ? 'bg-amber-500 text-slate-900 border-amber-800' : 'bg-white text-slate-700 border-slate-200'}">
              ⛏️ معول الصخور السريع
            </button>
            <button type="button" onclick="window.DinoExplorerGame.setTool('brush')"
              class="px-3 py-1 rounded-xl font-black text-xs border-2 ${this.tool === 'brush' ? 'bg-amber-500 text-slate-900 border-amber-800' : 'bg-white text-slate-700 border-slate-200'}">
              🖌️ فرشاة التنظيف الدقيقة
            </button>
          </div>
          <span class="font-black text-amber-900 text-sm">النقاط: ${this.score}</span>
        </div>

        <!-- شبكة التنقيب الصخرية التفاعلية -->
        <div class="grid grid-cols-3 sm:grid-cols-4 gap-3 bg-stone-800 p-4 rounded-3xl border-4 border-amber-700 shadow-inner">
          ${this.grid.map((cell, i) => {
            if (!cell.revealed) {
              return `
                <button type="button" onclick="window.DinoExplorerGame.digTile(${i})"
                  class="h-24 sm:h-28 rounded-2xl border-3 ${cell.layers === 1 ? 'bg-amber-600 border-amber-300 animate-shake' : 'bg-gradient-to-b from-amber-700 to-stone-700 border-stone-500'} hover:scale-105 transition flex flex-col items-center justify-center text-white shadow-md">
                  <span class="text-3xl">${cell.layers === 1 ? '🏜️' : '🪨'}</span>
                  <span class="text-[11px] font-black mt-1 text-amber-200">${cell.layers === 1 ? 'طبقة رملية' : 'احفر هنا ⛏️'}</span>
                </button>
              `;
            }
            const c = cell.content;
            const bg = c.type === 'fossil' ? 'bg-emerald-100 border-emerald-500 text-emerald-950' : (c.type === 'gold' ? 'bg-amber-100 border-amber-400 text-amber-950' : 'bg-stone-200 border-stone-400 text-stone-700');
            return `
              <div class="h-24 sm:h-28 rounded-2xl border-3 ${bg} p-2 flex flex-col items-center justify-center text-center shadow">
                <span class="text-3xl sm:text-4xl">${c.icon}</span>
                <span class="text-[10px] sm:text-xs font-black mt-1 leading-tight">${c.name}</span>
              </div>
            `;
          }).join('')}
        </div>

        <div class="p-4 rounded-2xl bg-amber-100/90 border-2 border-amber-400 font-bold text-xs sm:text-sm text-amber-950">
          🔎 <strong>تقرير الرادار الجيولوجي:</strong> ${this.lastDiscovery}
        </div>
      </div>
    `;
  }
};

/* --------------------------------------------------------------------------
   5. تحدي السهام والرامي المحترف (ArcheryMasterGame) - أهداف متحركة ورياح
   -------------------------------------------------------------------------- */
window.ArcheryMasterGame = {
  round: 1,
  maxRounds: 5,
  score: 0,
  windSpeed: 0,
  targets: [],
  targetQ: null,

  start() {
    this.round = 1;
    this.score = 0;
    this.setupRound();
    window.MaxCompanion.say(
      'مرحباً بك في ميدان الرماية الملكي! صوّب سهمك نحو الهدف الحامل للرقم الصحيح واصنع أعلى نتيجة!',
      'excited',
      false
    );
    this.render();
  },

  setupRound() {
    this.windSpeed = Math.floor(Math.random() * 11) - 5;
    const a = Math.floor(Math.random() * 9) + 3;
    const b = Math.floor(Math.random() * 8) + 2;
    const correct = a + b;

    const vals = new Set([correct]);
    while (vals.size < 4) {
      const cand = correct + (Math.floor(Math.random() * 9) - 4);
      if (cand > 0 && cand !== correct) vals.add(cand);
    }

    this.targetQ = {
      prompt: `أصِب الهدف الذي يحمل ناتج: ${a} + ${b}`,
      answer: correct
    };

    const colors = ['from-rose-500 to-red-600', 'from-sky-500 to-blue-600', 'from-amber-400 to-orange-500', 'from-purple-500 to-indigo-600'];
    this.targets = Array.from(vals)
      .sort(() => Math.random() - 0.5)
      .map((val, idx) => ({
        val,
        color: colors[idx % colors.length],
        delay: (idx * 0.4).toFixed(1)
      }));
  },

  fireArrow(val) {
    if (val === this.targetQ.answer) {
      this.score += 40;
      window.FunKidsRewards.playSound('laser');
      window.FunKidsRewards.playSound('correct');
      window.MaxCompanion.onCorrectAnswer('🎯 إصابة في منتصف الهدف تماماً (Bullseye)! رامٍ محترف!');
    } else {
      window.FunKidsRewards.playSound('wrong');
      window.MaxCompanion.onWrongAnswer(`الهدف الصحيح كان رقم ${this.targetQ.answer}! اضبط زاوية القوس في الرمية التالية!`);
    }
    this.round += 1;
    if (this.round <= this.maxRounds) {
      this.setupRound();
    }
    this.render();
  },

  render() {
    const mount = document.getElementById('archery-game-mount');
    if (!mount) return;

    if (this.round > this.maxRounds) {
      const total = this.score + 35;
      window.FunKidsRewards.awardPoints(total, 3, 'archery', 'إتقان تحدي السهام والرامي المحترف');
      mount.innerHTML = `
        <div class="text-center py-6 px-4 space-y-4 bg-gradient-to-b from-cyan-50 to-white rounded-3xl border-4 border-cyan-400">
          <div class="text-6xl animate-bounce">🏹🎯🥇</div>
          <h3 class="text-2xl sm:text-3xl font-black text-slate-900">القناص الذهبي المحترف!</h3>
          <p class="text-base sm:text-lg font-bold text-slate-600">أنهيت جولات الرماية الخمس وحققت <span class="text-cyan-700 font-black">${total} نقطة</span>!</p>
          <button type="button" onclick="window.ArcheryMasterGame.start()" class="btn-3d btn-secondary text-base py-3 px-6">
            🔄 جولة رماية جديدة
          </button>
        </div>
      `;
      return;
    }

    const windText = this.windSpeed === 0 ? 'هادئة 🍃' : (this.windSpeed > 0 ? `شرقية +${this.windSpeed} كم/س 💨` : `غربية ${this.windSpeed} كم/س 💨`);

    mount.innerHTML = `
      <div class="space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2 bg-cyan-50 p-3.5 rounded-2xl border-2 border-cyan-200">
          <div class="flex items-center gap-2 text-xs sm:text-sm font-black">
            <span class="px-3 py-1 rounded-full bg-cyan-700 text-white">🏹 السهم: ${this.round} / ${this.maxRounds}</span>
            <span class="px-3 py-1 rounded-full bg-white text-slate-700 border border-cyan-300">الرياح: ${windText}</span>
          </div>
          <span class="font-black text-cyan-900 text-sm">النقاط: ${this.score}</span>
        </div>

        <!-- ميدان الرماية المتحرك -->
        <div class="interactive-stage bg-gradient-to-b from-sky-300 via-sky-100 to-emerald-400 p-5 space-y-6 text-center">
          <div class="inline-block px-5 py-2 rounded-full bg-slate-900/85 text-amber-300 font-black text-sm sm:text-lg shadow-lg">
            🎯 ${this.targetQ.prompt}
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4">
            ${this.targets.map(t => `
              <button type="button" onclick="window.ArcheryMasterGame.fireArrow(${t.val})"
                style="animation-delay: ${t.delay}s;"
                class="animate-float group mx-auto w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br ${t.color} p-2.5 border-4 border-white shadow-2xl flex items-center justify-center transition transform hover:scale-110">
                <div class="w-full h-full rounded-full bg-white/95 flex flex-col items-center justify-center border-4 border-amber-400">
                  <span class="text-xs text-rose-500 font-black">🎯 هدف</span>
                  <span class="text-2xl sm:text-3xl font-black text-slate-900">${t.val}</span>
                </div>
              </button>
            `).join('')}
          </div>

          <div class="text-4xl">🏹⬆️</div>
          <p class="text-xs font-black text-slate-800 bg-white/80 inline-block px-4 py-1 rounded-full">انقر مباشرة على قرص الهدف لإطلاق السهم!</p>
        </div>
      </div>
    `;
  }
};
