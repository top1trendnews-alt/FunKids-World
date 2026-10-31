/* ==========================================================================
   عالم فن كيدز - اللعبة 6: مغامرة الفضاء (space-game.js)
   استكشاف المجموعة الشمسية وتحديات الكواكب وفتح المراحل
   ========================================================================== */

const SOLAR_PLANETS = [
  {
    id: 0,
    name: 'كوكب عطارد',
    emoji: '🪨',
    color: 'from-slate-400 to-stone-600',
    fact: 'عطارد هو أقرب كوكب إلى الشمس وأصغر كواكب المجموعة الشمسية!',
    question: 'ما هو أقرب كوكب إلى الشمس في مجموعتنا الشمسية؟',
    options: ['كوكب عطارد', 'كوكب المريخ', 'كوكب نبتون', 'كوكب زحل'],
    answer: 'كوكب عطارد'
  },
  {
    id: 1,
    name: 'كوكب الزهرة',
    emoji: '🌕',
    color: 'from-amber-300 to-orange-500',
    fact: 'كوكب الزهرة هو أسخن كوكب في المجموعة الشمسية بسبب غلافه الجوي الكثيف، ويُسمى نجمة المساء!',
    question: 'أي كوكب يُعد الأسخن في المجموعة الشمسية ويلمع في السماء بشدة؟',
    options: ['كوكب الزهرة', 'كوكب أورانوس', 'كوكب الأرض', 'كوكب المشتري'],
    answer: 'كوكب الزهرة'
  },
  {
    id: 2,
    name: 'كوكب الأرض',
    emoji: '🌍',
    color: 'from-sky-400 to-emerald-500',
    fact: 'الأرض هي كوكبنا الجميل والكوكب الوحيد المعروف بوجود الماء السائل والحياة عليه بنسبة مياه تقارب 71%!',
    question: 'كم تبلغ تقريباً نسبة المياه التي تغطي سطح كوكب الأرض؟',
    options: ['حوالي 71%', 'حوالي 10%', 'حوالي 99%', 'حوالي 25%'],
    answer: 'حوالي 71%'
  },
  {
    id: 3,
    name: 'كوكب المريخ',
    emoji: '🔴',
    color: 'from-red-500 to-orange-700',
    fact: 'يُلقب المريخ بالكوكب الأحمر بسبب أكسيد الحديد على سطحه، ويضم أكبر بركان في المجموعة الشمسية (أوليمبوس مونس)!',
    question: 'لماذا يُلقب كوكب المريخ بالكوكب الأحمر؟',
    options: ['بسبب أكسيد الحديد في تربته', 'لأنه مغطى بالنار', 'بسبب أشعة الليزر', 'لأنه مصنوع من النحاس'],
    answer: 'بسبب أكسيد الحديد في تربته'
  },
  {
    id: 4,
    name: 'كوكب المشتري',
    emoji: '🟠',
    color: 'from-amber-500 to-red-700',
    fact: 'المشتري هو أضخم كوكب في المجموعة الشمسية على الإطلاق، وهو عملاق غازي يضم البقعة الحمراء العظيمة!',
    question: 'ما هو أكبر وأضخم كوكب في مجموعتنا الشمسية؟',
    options: ['كوكب المشتري', 'كوكب عطارد', 'كوكب المريخ', 'كوكب الزهرة'],
    answer: 'كوكب المشتري'
  },
  {
    id: 5,
    name: 'كوكب زحل',
    emoji: '🪐',
    color: 'from-yellow-300 to-amber-600',
    fact: 'يشتهر كوكب زحل بحلقاته المدهشة والجميلة المكونة من ملايين القطع الجليدية والصخرية!',
    question: 'ممَّ تتكون حلقات كوكب زحل الشهيرة؟',
    options: ['قطع الجليد والصخور', 'الذهب الخالص', 'الغيوم الممطرة فقط', 'قوس قزح ضوئي'],
    answer: 'قطع الجليد والصخور'
  }
];

window.SpaceAdventureGame = {
  selectedPlanetId: 0,

  start() {
    const unlocked = (window.FunKidsStorage.state && window.FunKidsStorage.state.unlockedPlanets) || [0, 1];
    this.selectedPlanetId = unlocked[unlocked.length - 1] || 0;
    window.MaxCompanion.say(
      'أهلاً بك أيها القائد في مغامرة الفضاء! اضغط على أي كوكب مفتوح لاستكشافه والإجابة عن تحديه الفضائي لفتح الكوكب الذي يليه!',
      'explaining',
      false
    );
    this.render();
  },

  selectPlanet(id) {
    const unlocked = window.FunKidsStorage.state.unlockedPlanets || [0, 1];
    if (!unlocked.includes(id)) {
      window.FunKidsRewards.playSound('wrong');
      window.MaxCompanion.say('هذا الكوكب مقفل حالياً! أجب عن تحدي الكوكب السابق أولاً لفتحه 🚀', 'encouraging', true);
      return;
    }
    window.FunKidsRewards.playSound('click');
    this.selectedPlanetId = id;
    this.render();
  },

  answerChallenge(planetId, choice, btnEl) {
    const planet = SOLAR_PLANETS.find(p => p.id === planetId);
    if (!planet) return;
    const msgBox = document.getElementById('space-challenge-result');

    if (choice === planet.answer) {
      window.FunKidsRewards.playSound('correct');
      if (btnEl) {
        btnEl.classList.remove('btn-secondary');
        btnEl.classList.add('btn-success');
      }

      const unlocked = window.FunKidsStorage.state.unlockedPlanets;
      const nextId = planetId + 1;
      let unlockedNew = false;
      if (nextId < SOLAR_PLANETS.length && !unlocked.includes(nextId)) {
        unlocked.push(nextId);
        unlockedNew = true;
      }

      window.FunKidsRewards.awardPoints(35, 2, 'space', `اجتياز مهمة ${planet.name}`);
      const nextPlanetName = SOLAR_PLANETS[nextId] ? SOLAR_PLANETS[nextId].name : null;

      if (msgBox) {
        msgBox.className = 'p-4 rounded-2xl bg-emerald-500/25 border-2 border-emerald-300 text-white font-black block space-y-2';
        msgBox.innerHTML = `
          <div>🌟 إجابة فضائية صحيحة! +35 نقطة</div>
          <p class="text-sm font-bold text-emerald-100">${planet.fact}</p>
          ${unlockedNew ? `<div class="text-amber-300 text-base">🔓 مبروك! تم فتح كوكب جديد: ${nextPlanetName}</div>` : ''}
        `;
      }

      window.MaxCompanion.onCorrectAnswer(
        unlockedNew
          ? `عمل رائع أيها القائد! لقد فتحت ${nextPlanetName}!`
          : `أحسنت! معلومة ممتازة عن ${planet.name}!`
      );

      setTimeout(() => {
        if (unlockedNew) this.selectedPlanetId = nextId;
        this.render();
      }, 1700);
    } else {
      window.FunKidsRewards.playSound('wrong');
      if (btnEl) {
        btnEl.classList.remove('btn-secondary');
        btnEl.classList.add('btn-primary');
      }
      if (msgBox) {
        msgBox.className = 'p-4 rounded-2xl bg-rose-500/30 border-2 border-rose-300 text-white font-bold block';
        msgBox.textContent = `💡 ليست الإجابة الصحيحة، اقرأ معلومة الكوكب في الأعلى وحاول مجدداً!`;
      }
      window.MaxCompanion.onWrongAnswer('اقرأ حقيقة الكوكب العلمية بعناية وجرب اختيار الإجابة الصحيحة!');
    }
  },

  render() {
    const container = document.getElementById('space-game-mount');
    if (!container) return;

    const unlocked = (window.FunKidsStorage.state && window.FunKidsStorage.state.unlockedPlanets) || [0, 1];
    const currentPlanet = SOLAR_PLANETS.find(p => p.id === this.selectedPlanetId) || SOLAR_PLANETS[0];

    container.innerHTML = `
      <div class="rounded-3xl p-5 md:p-6 bg-slate-900 text-white border-4 border-indigo-400 shadow-2xl space-y-6 relative overflow-hidden">
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-indigo-800 pb-4">
          <div>
            <span class="px-3 py-1 rounded-full bg-indigo-600 text-amber-300 font-black text-xs">🌌 خريطة المجموعة الشمسية التفاعلية</span>
            <h3 class="text-2xl font-black mt-1">الكواكب المفتوحة: ${unlocked.length} / ${SOLAR_PLANETS.length}</h3>
          </div>
          <div class="text-sm font-bold text-indigo-200">اضغط على أي كوكب لاستكشافه 🛸</div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 py-2">
          ${SOLAR_PLANETS.map(p => {
            const isUnlocked = unlocked.includes(p.id);
            const isSelected = p.id === currentPlanet.id;
            return `
              <button type="button"
                onclick="window.SpaceAdventureGame.selectPlanet(${p.id})"
                class="planet-node p-4 bg-gradient-to-br ${p.color} ${isUnlocked ? '' : 'locked'} ${isSelected ? 'ring-4 ring-amber-300 scale-105' : ''}">
                <span class="text-4xl mb-1">${isUnlocked ? p.emoji : '🔒'}</span>
                <span class="text-xs font-black text-white drop-shadow">${p.name}</span>
                <span class="text-[10px] font-bold mt-1 px-2 py-0.5 rounded-full bg-black/30 text-amber-200">
                  ${isUnlocked ? 'مفتوح ✅' : 'مقفل 🔒'}
                </span>
              </button>
            `;
          }).join('')}
        </div>

        <div class="bg-indigo-950/90 border-2 border-indigo-400/60 rounded-3xl p-5 space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <div class="text-5xl p-3 rounded-2xl bg-indigo-900 border border-indigo-500">${currentPlanet.emoji}</div>
              <div>
                <span class="text-xs font-black text-amber-300">مهمة استكشاف الكوكب رقم ${currentPlanet.id + 1}</span>
                <h4 class="text-2xl font-black text-white">${currentPlanet.name}</h4>
              </div>
            </div>
            <button type="button" onclick="window.MaxCompanion.say('${currentPlanet.fact}', 'explaining', true)"
              class="btn-3d btn-accent text-xs py-2 px-4">
              🔊 استمع لمعلومة الكوكب من ماكس
            </button>
          </div>

          <p class="text-indigo-100 font-bold bg-indigo-900/60 p-3.5 rounded-2xl border border-indigo-700/80">
            🔭 <strong>معلومة علمية:</strong> ${currentPlanet.fact}
          </p>

          <div class="space-y-3 pt-1">
            <div class="font-black text-lg text-amber-300">❓ تحدي الكوكب: ${currentPlanet.question}</div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              ${currentPlanet.options.map(opt => `
                <button type="button"
                  onclick="window.SpaceAdventureGame.answerChallenge(${currentPlanet.id}, '${opt}', this)"
                  class="btn-3d btn-secondary text-base py-3 font-extrabold">
                  🚀 ${opt}
                </button>
              `).join('')}
            </div>
          </div>

          <div id="space-challenge-result" class="hidden"></div>
        </div>
      </div>
    `;
  }
};
