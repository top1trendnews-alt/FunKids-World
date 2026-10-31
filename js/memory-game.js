/* ==========================================================================
   عالم فن كيدز - اللعبة 2 واللعبة 3: تحدي الذاكرة وخمّن الحيوان (memory-game.js)
   ========================================================================== */

window.MemoryChallengeGame = {
  cards: [],
  flippedIndices: [],
  matchedCount: 0,
  moves: 0,
  isBusy: false,

  start() {
    const zone = (window.FunKidsStorage.state && window.FunKidsStorage.state.ageZone) || 'junior';
    const allItems = [
      { icon: '🦁', label: 'أسد' },
      { icon: '🐬', label: 'دولفين' },
      { icon: '🚀', label: 'صاروخ' },
      { icon: '🦖', label: 'ديناصور' },
      { icon: '🌈', label: 'قوس قزح' },
      { icon: '🎸', label: 'جيتار' },
      { icon: '🦋', label: 'فراشة' },
      { icon: '🪐', label: 'كوكب زحل' }
    ];

    const pairCount = zone === 'kids' ? 4 : (zone === 'junior' ? 6 : 8);
    const chosen = allItems.slice(0, pairCount);
    this.cards = [...chosen, ...chosen]
      .map((item, idx) => ({ ...item, uid: idx, matched: false, flipped: false }))
      .sort(() => Math.random() - 0.5);

    this.flippedIndices = [];
    this.matchedCount = 0;
    this.moves = 0;
    this.isBusy = false;

    window.MaxCompanion.say(
      'اقلب البطاقات وتذكر أماكن الرسومات المتشابهة لتطابقها جميعاً بأقل عدد من المحاولات!',
      'explaining',
      false
    );
    this.render();
  },

  render() {
    const container = document.getElementById('memory-game-mount');
    if (!container) return;

    const totalPairs = this.cards.length / 2;
    const colsClass = totalPairs <= 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-3 sm:grid-cols-4';

    container.innerHTML = `
      <div class="space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2 bg-purple-50 p-3.5 rounded-2xl border-2 border-purple-200">
          <div class="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
            <span class="px-3 py-1 rounded-full bg-purple-600 text-white font-black">الأزواج: ${this.matchedCount} / ${totalPairs}</span>
            <span class="font-bold text-slate-700">المحاولات: <strong class="text-purple-700">${this.moves}</strong></span>
          </div>
          <button type="button" onclick="window.MemoryChallengeGame.start()" class="btn-3d btn-purple text-xs py-1.5 px-3.5">
            🔄 خلط البطاقات
          </button>
        </div>

        <div class="memory-grid ${colsClass}">
          ${this.cards.map((c, index) => `
            <div onclick="window.MemoryChallengeGame.flipCard(${index})"
              class="memory-card ${c.flipped || c.matched ? 'flipped' : ''} ${c.matched ? 'matched' : ''}">
              <div class="memory-face memory-front">
                <span>❓</span>
              </div>
              <div class="memory-face memory-back">
                <span class="text-3xl sm:text-4xl">${c.icon}</span>
                <span class="text-[11px] sm:text-xs font-black text-slate-700 mt-1">${c.label}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  flipCard(index) {
    if (this.isBusy) return;
    const card = this.cards[index];
    if (!card || card.flipped || card.matched) return;

    window.FunKidsRewards.playSound('click');
    card.flipped = true;
    this.flippedIndices.push(index);
    this.render();

    if (this.flippedIndices.length === 2) {
      this.moves += 1;
      this.isBusy = true;
      const [i1, i2] = this.flippedIndices;
      const c1 = this.cards[i1];
      const c2 = this.cards[i2];

      if (c1.icon === c2.icon) {
        c1.matched = true;
        c2.matched = true;
        this.matchedCount += 1;
        this.flippedIndices = [];
        this.isBusy = false;
        window.FunKidsRewards.playSound('correct');
        window.MaxCompanion.onCorrectAnswer(`رائع! طابقت بطاقة ${c1.label} بنجاح!`);
        this.render();

        if (this.matchedCount === this.cards.length / 2) {
          setTimeout(() => this.finishGame(), 500);
        }
      } else {
        setTimeout(() => {
          c1.flipped = false;
          c2.flipped = false;
          this.flippedIndices = [];
          this.isBusy = false;
          this.render();
        }, 850);
      }
    }
  },

  finishGame() {
    const container = document.getElementById('memory-game-mount');
    const score = Math.max(60, 160 - this.moves * 5);
    window.FunKidsRewards.awardPoints(score, 3, 'memory', 'الفوز في لعبة تحدي الذاكرة');
    if (!container) return;

    container.innerHTML = `
      <div class="text-center py-6 px-4 space-y-4 bg-gradient-to-b from-purple-50 to-white rounded-3xl border-4 border-purple-300">
        <div class="text-5xl sm:text-6xl">🧠⭐⭐⭐</div>
        <h3 class="text-2xl sm:text-3xl font-black text-slate-800">ذاكرة حديدية خارقة!</h3>
        <p class="text-base sm:text-lg font-bold text-slate-600">أكملت التحدي في ${this.moves} محاولة وربحت <span class="text-purple-600 font-black">${score} نقطة</span>!</p>
        <button type="button" onclick="window.MemoryChallengeGame.start()" class="btn-3d btn-purple text-base">
          🔄 العب جولة جديدة
        </button>
      </div>
    `;
  }
};

/* ==========================================================================
   اللعبة 3: خمّن الحيوان (جزيرة المعرفة - العلوم والطبيعة والحيوانات)
   ========================================================================== */
const ANIMAL_QUESTIONS = [
  {
    emoji: '🦁',
    name: 'الأسد',
    soundDesc: 'زئير قوي في السافانا',
    clue: 'يُلقب بملك الغابة ويعيش في مجموعات تُسمى قطيعاً ويمتلك لبدة كثيفة حول عنقه.',
    fact: 'هل تعلم؟ زئير الأسد يمكن سماعه من مسافة تصل إلى 8 كيلومترات!',
    options: ['الأسد', 'النمر', 'الفهد', 'الذئب']
  },
  {
    emoji: '🐬',
    name: 'الدولفين',
    soundDesc: 'صفير ونقرات صوتية تحت الماء',
    clue: 'حيوان بحري ذكي جداً يتنفس الهواء ويستخدم الصدى الصوتي لتحديد المواقع في المحيط.',
    fact: 'هل تعلم؟ الدولفين ينام بنصف دماغه فقط ليبقى النصف الآخر مستيقظاً للتنفس!',
    options: ['القرش', 'الدولفين', 'الأخطبوط', 'الفقمة']
  },
  {
    emoji: '🐘',
    name: 'الفيل',
    soundDesc: 'نهيم وبوق عالٍ بالخرطوم',
    clue: 'أضخم حيوان بري على سطح الأرض، يمتلك خرطوماً طويلاً وأذنين كبيرتين.',
    fact: 'هل تعلم؟ خرطوم الفيل يحتوي على أكثر من 40 ألف عضلة ويستطيع حمل الأشياء الدقيقة!',
    options: ['وحيد القرن', 'الزرافة', 'الفيل', 'فرس النهر']
  },
  {
    emoji: '🦉',
    name: 'البومة',
    soundDesc: 'هوهأة هادئة في الليل',
    clue: 'طائر ليلي يمتلك عينين واسعتين ويستطيع تدوير رأسه بزاوية تصل إلى 270 درجة!',
    fact: 'هل تعلم؟ ريش البومة مصمم خصيصاً ليطير في صمت تام دون إصدار أي ضجيج!',
    options: ['الصقر', 'البومة', 'الببغاء', 'النعامة']
  },
  {
    emoji: '🐧',
    name: 'البطريق',
    soundDesc: 'نداء لطيف على الجليد القطبي',
    clue: 'طائر لا يطير في الهواء لكنه سباح ماهر جداً ويعيش في القارة القطبية الجنوبية المتجمدة.',
    fact: 'هل تعلم؟ البطريق الإمبراطور يستطيع الغوص لأعماق تتجاوز 500 متر تحت الماء!',
    options: ['البطريق', 'النورس', 'البجعة', 'الدب القطبي']
  }
];

window.GuessAnimalGame = {
  idx: 0,
  score: 0,
  answered: false,

  start() {
    this.idx = 0;
    this.score = 0;
    this.answered = false;
    window.MaxCompanion.say(
      'مرحباً بك في جزيرة المعرفة! استمع إلى صوت ووصف الحيوان ثم خمّن اسمه الصحيح لتتعلم معلومة علمية مدهشة!',
      'explaining',
      false
    );
    this.render();
  },

  playAnimalSound() {
    const q = ANIMAL_QUESTIONS[this.idx];
    if (!q) return;
    window.FunKidsRewards.playSound('animal');
    window.MaxCompanion.say(`صوت الحيوان: ${q.soundDesc}. تلميح: ${q.clue}`, 'happy', true);
  },

  render() {
    const container = document.getElementById('animals-game-mount');
    if (!container) return;

    if (this.idx >= ANIMAL_QUESTIONS.length) {
      window.FunKidsRewards.awardPoints(this.score, 3, 'animals', 'إكمال مسابقة خمّن الحيوان في جزيرة المعرفة');
      container.innerHTML = `
        <div class="text-center py-6 px-4 space-y-4 bg-gradient-to-b from-emerald-50 to-white rounded-3xl border-4 border-emerald-300">
          <div class="text-5xl sm:text-6xl">🦁🌿⭐⭐⭐</div>
          <h3 class="text-2xl sm:text-3xl font-black text-slate-800">عالم طبيعة مبدع!</h3>
          <p class="text-base sm:text-lg font-bold text-slate-600">تعرفت على الحيوانات وخصائصها العلمية وحصلت على <span class="text-emerald-600 font-black">${this.score} نقطة</span>!</p>
          <button type="button" onclick="window.GuessAnimalGame.start()" class="btn-3d btn-success text-base">
            🔄 العب مرة أخرى
          </button>
        </div>
      `;
      return;
    }

    const q = ANIMAL_QUESTIONS[this.idx];
    container.innerHTML = `
      <div class="space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2 bg-emerald-50 p-3.5 rounded-2xl border-2 border-emerald-200">
          <span class="px-3 py-1 rounded-full bg-emerald-600 text-white font-black text-xs sm:text-sm">الحيوان ${this.idx + 1} / ${ANIMAL_QUESTIONS.length}</span>
          <span class="font-black text-emerald-800 text-sm sm:text-base">النقاط: ${this.score}</span>
        </div>

        <div class="text-center p-4 sm:p-6 bg-gradient-to-b from-white to-emerald-50/60 rounded-3xl border-4 border-emerald-200 space-y-3">
          <div class="text-6xl sm:text-7xl inline-block p-3.5 rounded-full bg-amber-100/80 border-4 border-white shadow-md animate-float">
            ${q.emoji}
          </div>
          <p class="text-base sm:text-lg font-extrabold text-slate-700 max-w-xl mx-auto leading-relaxed">${q.clue}</p>
          <div>
            <button type="button" onclick="window.GuessAnimalGame.playAnimalSound()" class="btn-3d btn-accent text-xs sm:text-sm py-2 px-4">
              🔊 استمع لصوت وتلميح الحيوان (${q.soundDesc})
            </button>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          ${q.options.map(opt => `
            <button type="button" onclick="window.GuessAnimalGame.checkAnswer('${opt}', this)"
              class="btn-3d btn-secondary text-sm sm:text-lg py-3.5 font-extrabold">
              🐾 ${opt}
            </button>
          `).join('')}
        </div>

        <div id="animal-fact-box" class="hidden p-4 rounded-2xl border-2"></div>
      </div>
    `;
  },

  checkAnswer(selected, btnEl) {
    if (this.answered) return;
    this.answered = true;
    const q = ANIMAL_QUESTIONS[this.idx];
    const factBox = document.getElementById('animal-fact-box');

    if (selected === q.name) {
      this.score += 30;
      window.FunKidsRewards.playSound('correct');
      if (btnEl) {
        btnEl.classList.remove('btn-secondary');
        btnEl.classList.add('btn-success');
      }
      window.MaxCompanion.onCorrectAnswer(`أحسنت! إنه ${q.name}. ${q.fact}`);
      if (factBox) {
        factBox.className = 'p-4 rounded-2xl border-2 bg-emerald-100 border-emerald-400 text-emerald-950 block space-y-2.5';
        factBox.innerHTML = `
          <div class="font-black text-base">✅ إجابة صحيحة! +30 نقطة</div>
          <p class="font-bold text-xs sm:text-sm">${q.fact}</p>
          <button type="button" onclick="window.GuessAnimalGame.next()" class="btn-3d btn-success text-xs sm:text-sm py-2 px-5">الحيوان التالي ⬅️</button>
        `;
      }
    } else {
      window.FunKidsRewards.playSound('wrong');
      if (btnEl) {
        btnEl.classList.remove('btn-secondary');
        btnEl.classList.add('btn-primary');
      }
      window.MaxCompanion.onWrongAnswer(`الإجابة الصحيحة هي ${q.name}. ${q.fact}`);
      if (factBox) {
        factBox.className = 'p-4 rounded-2xl border-2 bg-amber-100 border-amber-400 text-amber-950 block space-y-2.5';
        factBox.innerHTML = `
          <div class="font-black text-base">💡 الحيوان الصحيح هو: ${q.name}</div>
          <p class="font-bold text-xs sm:text-sm">${q.fact}</p>
          <button type="button" onclick="window.GuessAnimalGame.next()" class="btn-3d btn-secondary text-xs sm:text-sm py-2 px-5">الحيوان التالي ⬅️</button>
        `;
      }
    }
  },

  next() {
    this.idx += 1;
    this.answered = false;
    this.render();
  }
};
