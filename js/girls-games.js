/* ==========================================================================
   عالم فن كيدز - الألعاب التفاعلية الخاصة بالبنات (girls-games.js)
   اللعبة 9: بوتيك الأزياء وتنسيق الأميرات
   اللعبة 10: شيف الحلويات والمخبز السعيد
   ========================================================================== */

const FASHION_OCCASIONS = [
  {
    id: 'royal_party',
    title: 'حفلة القصر الملكي المتألقة',
    hint: 'اختاري فستاناً ملكياً وتاجاً لامعاً وحقيبة سهرة أنيقة لتحصلي على أعلى تقييم!',
    bestDress: '👑 فستان الأميرة الوردي',
    bestCrown: '💎 التاج الماسي الملكي',
    bestAcc: '👛 حقيبة اللؤلؤ اللامعة'
  },
  {
    id: 'science_fair',
    title: 'معرض المبتكرات والعلوم المدرسي',
    hint: 'اختاري زي الباحثة الأنيق مع نظارة المعرفة وحقيبة الكتب العلمية!',
    bestDress: '🥼 معطف العالمة المبتكرة',
    bestCrown: '👓 طوق النجوم الذكي',
    bestAcc: '🔬 حقيبة المختبر الوردية'
  },
  {
    id: 'spring_picnic',
    title: 'نزهة حديقة الزهور الربيعية',
    hint: 'اختاري فستان الزهور المبهج مع قبعة الشمس الجميلة وسلة الورود!',
    bestDress: '🌸 فستان زهور الربيع',
    bestCrown: '👒 قبعة الشاطئ المزهرة',
    bestAcc: '🧺 سلة الورود والفراشات'
  }
];

const DRESS_OPTIONS = [
  '👑 فستان الأميرة الوردي',
  '🥼 معطف العالمة المبتكرة',
  '🌸 فستان زهور الربيع',
  '✨ فستان السماء البنفسجي'
];

const CROWN_OPTIONS = [
  '💎 التاج الماسي الملكي',
  '👓 طوق النجوم الذكي',
  '👒 قبعة الشاطئ المزهرة',
  '🎀 شريطة الحرير الوردية'
];

const ACC_OPTIONS = [
  '👛 حقيبة اللؤلؤ اللامعة',
  '🔬 حقيبة المختبر الوردية',
  '🧺 سلة الورود والفراشات',
  '🪄 عصا النجوم المضيئة'
];

window.PrincessFashionGame = {
  occIndex: 0,
  selectedDress: DRESS_OPTIONS[0],
  selectedCrown: CROWN_OPTIONS[0],
  selectedAcc: ACC_OPTIONS[0],
  score: 0,

  start() {
    this.occIndex = 0;
    this.score = 0;
    this.selectedDress = DRESS_OPTIONS[0];
    this.selectedCrown = CROWN_OPTIONS[0];
    this.selectedAcc = ACC_OPTIONS[0];
    window.MaxCompanion.say(
      'أهلاً بكِ في بوتيك الأزياء وتنسيق الأميرات! نسّقي الفستان والتاج والإكسسوار بما يناسب المناسبة المطلوبة لتحصلي على 3 نجوم متألقة!',
      'excited',
      false
    );
    this.render();
  },

  chooseItem(category, value) {
    window.FunKidsRewards.playSound('click');
    if (category === 'dress') this.selectedDress = value;
    if (category === 'crown') this.selectedCrown = value;
    if (category === 'acc') this.selectedAcc = value;
    this.render();
  },

  evaluateLook() {
    const occ = FASHION_OCCASIONS[this.occIndex];
    if (!occ) return;

    let matches = 0;
    if (this.selectedDress === occ.bestDress) matches += 1;
    if (this.selectedCrown === occ.bestCrown) matches += 1;
    if (this.selectedAcc === occ.bestAcc) matches += 1;

    const gained = 30 + matches * 15;
    this.score += gained;
    window.FunKidsRewards.playSound('correct');
    window.MaxCompanion.onCorrectAnswer(`تنسيق رائع وأنيق جداً لمناسبة "${occ.title}"! ربحتِ ${gained} نقطة!`);

    setTimeout(() => {
      this.occIndex += 1;
      if (this.occIndex >= FASHION_OCCASIONS.length) {
        this.renderVictory();
      } else {
        this.render();
      }
    }, 1000);
  },

  renderVictory() {
    const container = document.getElementById('fashion-game-mount');
    window.FunKidsRewards.awardPoints(this.score, 3, 'fashion', 'إكمال تصميم الأزياء في بوتيك الأميرات');
    if (!container) return;

    container.innerHTML = `
      <div class="text-center py-8 px-4 space-y-4 bg-gradient-to-b from-pink-50 to-white rounded-3xl border-4 border-pink-300">
        <div class="text-6xl">👗👑💖⭐⭐⭐</div>
        <h3 class="text-3xl font-black text-slate-800">مصممة أزياء مبدعة ومتألقة!</h3>
        <p class="text-lg font-bold text-slate-600">نسّقتِ أجمل الإطلالات لجميع المناسبات وحصلتِ على <span class="text-pink-600 font-black">${this.score} نقطة</span>!</p>
        <button type="button" onclick="window.PrincessFashionGame.start()" class="btn-3d btn-primary text-lg">
          🔄 تنسيق مجموعة أزياء جديدة
        </button>
      </div>
    `;
  },

  render() {
    const container = document.getElementById('fashion-game-mount');
    if (!container) return;
    const occ = FASHION_OCCASIONS[this.occIndex];

    container.innerHTML = `
      <div class="space-y-5">
        <div class="flex flex-wrap items-center justify-between gap-3 bg-pink-50 p-4 rounded-2xl border-2 border-pink-200">
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 rounded-full bg-pink-500 text-white font-black text-xs">👧 لعبة خاصة للبنات</span>
            <span class="font-black text-slate-800">المناسبة ${this.occIndex + 1} / ${FASHION_OCCASIONS.length}: ${occ.title}</span>
          </div>
          <span class="font-black text-pink-700">النقاط: ${this.score} 💖</span>
        </div>

        <div class="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 text-sm font-bold text-amber-950">
          💡 <strong>تلميح التنسيق:</strong> ${occ.hint}
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          <div class="md:col-span-5 bg-gradient-to-b from-pink-100 via-rose-50 to-white p-6 rounded-3xl border-4 border-pink-300 text-center space-y-3 shadow-inner">
            <span class="px-3 py-1 rounded-full bg-pink-500 text-white text-xs font-black">✨ منصة عرض الأزياء</span>
            <div class="py-5 bg-white/90 rounded-2xl border-2 border-pink-200 space-y-2 shadow">
              <div class="text-5xl animate-float">👸🏻</div>
              <div class="text-sm font-black text-pink-700">${this.selectedCrown}</div>
              <div class="text-base font-black text-slate-800">${this.selectedDress}</div>
              <div class="text-sm font-black text-purple-700">${this.selectedAcc}</div>
            </div>
            <button type="button" onclick="window.PrincessFashionGame.evaluateLook()" class="btn-3d btn-primary w-full text-base py-3">
              ✨ اعتماد الإطلالة والتقييم (+نقاط)
            </button>
          </div>

          <div class="md:col-span-7 space-y-4">
            <div class="bg-white p-4 rounded-2xl border-2 border-pink-100 space-y-2">
              <div class="text-xs font-black text-pink-700">1. اختاري الزي أو الفستان:</div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                ${DRESS_OPTIONS.map(d => `
                  <button type="button" onclick="window.PrincessFashionGame.chooseItem('dress', '${d}')"
                    class="p-2.5 rounded-xl text-xs font-black border-2 text-right transition ${this.selectedDress === d ? 'bg-pink-500 text-white border-pink-700' : 'bg-pink-50/50 text-slate-800 border-pink-200'}">
                    ${d}
                  </button>
                `).join('')}
              </div>
            </div>

            <div class="bg-white p-4 rounded-2xl border-2 border-pink-100 space-y-2">
              <div class="text-xs font-black text-pink-700">2. اختاري التاج أو القبعة:</div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                ${CROWN_OPTIONS.map(c => `
                  <button type="button" onclick="window.PrincessFashionGame.chooseItem('crown', '${c}')"
                    class="p-2.5 rounded-xl text-xs font-black border-2 text-right transition ${this.selectedCrown === c ? 'bg-purple-500 text-white border-purple-700' : 'bg-purple-50/50 text-slate-800 border-purple-200'}">
                    ${c}
                  </button>
                `).join('')}
              </div>
            </div>

            <div class="bg-white p-4 rounded-2xl border-2 border-pink-100 space-y-2">
              <div class="text-xs font-black text-pink-700">3. اختاري الحقيبة والإكسسوار:</div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                ${ACC_OPTIONS.map(a => `
                  <button type="button" onclick="window.PrincessFashionGame.chooseItem('acc', '${a}')"
                    class="p-2.5 rounded-xl text-xs font-black border-2 text-right transition ${this.selectedAcc === a ? 'bg-amber-400 text-slate-900 border-amber-600' : 'bg-amber-50/50 text-slate-800 border-amber-200'}">
                    ${a}
                  </button>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};

const BAKERY_ORDERS = [
  {
    customer: 'الأميرة سارة',
    base: '🧁 كيك الفانيليا الذهبي',
    cream: '🍓 كريمة الفراولة الوردية',
    topping: '🍒 كرزة حمراء حلوة'
  },
  {
    customer: 'الشيف ليلى',
    base: '🍫 كيك الشوكولاتة الغني',
    cream: '🍦 كريمة الحليب البيضاء',
    topping: '🌈 حبيبات قوس قزح الملونة'
  },
  {
    customer: 'صديقتنا نور',
    base: '🍋 كيك الليمون المنعش',
    cream: '🫐 كريمة التوت البنفسجية',
    topping: '⭐ نجمة السكر الذهبية'
  }
];

const BASES = ['🧁 كيك الفانيليا الذهبي', '🍫 كيك الشوكولاتة الغني', '🍋 كيك الليمون المنعش'];
const CREAMS = ['🍓 كريمة الفراولة الوردية', '🍦 كريمة الحليب البيضاء', '🫐 كريمة التوت البنفسجية'];
const TOPPINGS = ['🍒 كرزة حمراء حلوة', '🌈 حبيبات قوس قزح الملونة', '⭐ نجمة السكر الذهبية'];

window.SweetBakeryGame = {
  orderIdx: 0,
  chosenBase: BASES[0],
  chosenCream: CREAMS[0],
  chosenTopping: TOPPINGS[0],
  score: 0,

  start() {
    this.orderIdx = 0;
    this.score = 0;
    this.chosenBase = BASES[0];
    this.chosenCream = CREAMS[0];
    this.chosenTopping = TOPPINGS[0];
    window.MaxCompanion.say(
      'مرحباً بكِ يا أحلى شيف في مخبز الحلويات السعيد! اقرئي طلب الزبونة بعناية وحضّري الكعكة بنفس النكهة والكريمة والزينة!',
      'excited',
      false
    );
    this.render();
  },

  setIngredient(type, val) {
    window.FunKidsRewards.playSound('click');
    if (type === 'base') this.chosenBase = val;
    if (type === 'cream') this.chosenCream = val;
    if (type === 'topping') this.chosenTopping = val;
    this.render();
  },

  serveOrder() {
    const ord = BAKERY_ORDERS[this.orderIdx];
    if (!ord) return;

    const isExact =
      this.chosenBase === ord.base &&
      this.chosenCream === ord.cream &&
      this.chosenTopping === ord.topping;

    if (isExact) {
      this.score += 50;
      window.FunKidsRewards.playSound('correct');
      window.MaxCompanion.onCorrectAnswer(`يميي! كعكة لذيذة ومطابقة تماماً لطلب ${ord.customer}! +50 نقطة!`);
      setTimeout(() => {
        this.orderIdx += 1;
        this.render();
      }, 950);
    } else {
      window.FunKidsRewards.playSound('wrong');
      window.MaxCompanion.onWrongAnswer(`انتبهي يا شيف! قارني المكونات الثلاثة بطلب ${ord.customer} في البطاقة العلوية!`);
    }
  },

  render() {
    const container = document.getElementById('bakery-game-mount');
    if (!container) return;

    if (this.orderIdx >= BAKERY_ORDERS.length) {
      window.FunKidsRewards.awardPoints(this.score, 3, 'bakery', 'إتمام جميع طلبات شيف الحلويات والمخبز السعيد');
      container.innerHTML = `
        <div class="text-center py-8 px-4 space-y-4 bg-gradient-to-b from-rose-50 to-white rounded-3xl border-4 border-rose-300">
          <div class="text-6xl">🧁🍓👩‍🍳⭐⭐⭐</div>
          <h3 class="text-3xl font-black text-slate-800">أبرع شيف حلويات في العالم!</h3>
          <p class="text-lg font-bold text-slate-600">حضّرتِ جميع طلبات الكعك بدقة وإبداع وحصلتِ على <span class="text-rose-600 font-black">${this.score} نقطة</span>!</p>
          <button type="button" onclick="window.SweetBakeryGame.start()" class="btn-3d btn-primary text-lg">
            🔄 تحضير طلبات جديدة
          </button>
        </div>
      `;
      return;
    }

    const ord = BAKERY_ORDERS[this.orderIdx];

    container.innerHTML = `
      <div class="space-y-5">
        <div class="flex flex-wrap items-center justify-between gap-3 bg-rose-50 p-4 rounded-2xl border-2 border-rose-200">
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 rounded-full bg-rose-500 text-white font-black text-xs">👧 لعبة خاصة للبنات</span>
            <span class="font-black text-slate-800">الطلب ${this.orderIdx + 1} / ${BAKERY_ORDERS.length} (${ord.customer})</span>
          </div>
          <span class="font-black text-rose-700">النقاط: ${this.score} 🧁</span>
        </div>

        <div class="bg-amber-50 p-4 rounded-3xl border-3 border-amber-300 space-y-2">
          <div class="font-black text-amber-900 text-sm">📋 بطاقة طلب الزبونة (${ord.customer}) — طابقي هذه المكونات الثلاثة:</div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-black">
            <div class="bg-white p-2.5 rounded-xl border border-amber-200">1. القاعدة: <span class="text-rose-600">${ord.base}</span></div>
            <div class="bg-white p-2.5 rounded-xl border border-amber-200">2. الكريمة: <span class="text-pink-600">${ord.cream}</span></div>
            <div class="bg-white p-2.5 rounded-xl border border-amber-200">3. الزينة: <span class="text-purple-600">${ord.topping}</span></div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          <div class="md:col-span-5 bg-gradient-to-b from-rose-100 to-white p-5 rounded-3xl border-4 border-rose-300 text-center space-y-3">
            <span class="px-3 py-1 rounded-full bg-rose-500 text-white text-xs font-black">🍽️ طبق التقديم المباشر</span>
            <div class="py-5 bg-white rounded-2xl border-2 border-rose-200 space-y-1.5 shadow">
              <div class="text-3xl">${this.chosenTopping.split(' ')[0]}</div>
              <div class="text-4xl">${this.chosenCream.split(' ')[0]}</div>
              <div class="text-5xl">${this.chosenBase.split(' ')[0]}</div>
              <div class="text-xs font-black text-slate-700 pt-2">${this.chosenBase}</div>
              <div class="text-xs font-bold text-pink-600">${this.chosenCream}</div>
              <div class="text-xs font-bold text-purple-600">${this.chosenTopping}</div>
            </div>
            <button type="button" onclick="window.SweetBakeryGame.serveOrder()" class="btn-3d btn-success w-full text-base py-3">
              🛎️ تقديم الكعكة للزبونة (+50 نقطة)
            </button>
          </div>

          <div class="md:col-span-7 space-y-3">
            <div class="bg-white p-3.5 rounded-2xl border-2 border-rose-100 space-y-2">
              <div class="text-xs font-black text-slate-700">1. اختاري نكهة الكيك الأساسية:</div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                ${BASES.map(b => `
                  <button type="button" onclick="window.SweetBakeryGame.setIngredient('base', '${b}')"
                    class="p-2 rounded-xl text-xs font-black border-2 transition ${this.chosenBase === b ? 'bg-rose-500 text-white border-rose-700' : 'bg-rose-50/60 text-slate-800 border-rose-200'}">
                    ${b}
                  </button>
                `).join('')}
              </div>
            </div>

            <div class="bg-white p-3.5 rounded-2xl border-2 border-rose-100 space-y-2">
              <div class="text-xs font-black text-slate-700">2. اختاري طبقة الكريمة:</div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                ${CREAMS.map(c => `
                  <button type="button" onclick="window.SweetBakeryGame.setIngredient('cream', '${c}')"
                    class="p-2 rounded-xl text-xs font-black border-2 transition ${this.chosenCream === c ? 'bg-pink-500 text-white border-pink-700' : 'bg-pink-50/60 text-slate-800 border-pink-200'}">
                    ${c}
                  </button>
                `).join('')}
              </div>
            </div>

            <div class="bg-white p-3.5 rounded-2xl border-2 border-rose-100 space-y-2">
              <div class="text-xs font-black text-slate-700">3. اختاري الزينة العلوية:</div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                ${TOPPINGS.map(t => `
                  <button type="button" onclick="window.SweetBakeryGame.setIngredient('topping', '${t}')"
                    class="p-2 rounded-xl text-xs font-black border-2 transition ${this.chosenTopping === t ? 'bg-purple-500 text-white border-purple-700' : 'bg-purple-50/60 text-slate-800 border-purple-200'}">
                    ${t}
                  </button>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
