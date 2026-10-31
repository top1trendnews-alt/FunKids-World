/* ==========================================================================
   عالم فن كيدز - ألعاب البنات التفاعلية والواقعية الـ 5 (girls-games.js)
   1. بوتيك الأزياء وتنسيق الأميرات (PrincessFashionGame)
   2. شيف الحلويات والمخبز السعيد (SweetBakeryGame)
   3. استوديو تصميم المجوهرات والتيجان الملكية (JewelryStudioGame)
   4. عيادة وصالون رعاية الحيوانات الأليفة اللطيفة (PetCareSpaGame)
   5. حديقة الفراشات وتنسيق الزهور الملكية (GardenDesignGame)
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. بوتيك الأزياء وتنسيق الأميرات (PrincessFashionGame) - منصة عرض حية وتقييم
   -------------------------------------------------------------------------- */
window.PrincessFashionGame = {
  eventIdx: 0,
  dressIdx: 0,
  crownIdx: 0,
  bagIdx: 0,
  shoeIdx: 0,
  score: 0,

  events: [
    {
      title: 'حفلة القصر الملكي المسائية ✨',
      desc: 'نسّقي إطلالة ملكية لامعة تناسب قاعة الاحتفالات الذهبية!',
      bestDress: 0,
      bestCrown: 0
    },
    {
      title: 'مهرجان العلوم والابتكار المدرسي 🔬',
      desc: 'اختاري زياً أنيقاً وعملياً يناسب تقديم مشروعك العلمي المميز!',
      bestDress: 1,
      bestCrown: 1
    },
    {
      title: 'نزهة حديقة الفراشات الربيعية 🌸',
      desc: 'نسّقي ألواناً زاهية ومبهجة تناسب أجواء الزهور والطبيعة!',
      bestDress: 2,
      bestCrown: 2
    }
  ],

  dresses: [
    { name: 'فستان الزمرد الملكي اللامع', emoji: '👗', color: 'from-pink-400 to-rose-500' },
    { name: 'طقم المخترعة الأنيق السماوي', emoji: '👚', color: 'from-sky-400 to-indigo-500' },
    { name: 'فستان زهور الربيع البنفسجي', emoji: '👘', color: 'from-purple-400 to-fuchsia-500' }
  ],

  crowns: [
    { name: 'تاج الألماس الملكي', emoji: '👑' },
    { name: 'طوق النجوم الذكي', emoji: '🎀' },
    { name: 'إكليل الورد الطبيعي', emoji: '🌸' }
  ],

  bags: [
    { name: 'حقيبة اللؤلؤ الذهبية', emoji: '👜' },
    { name: 'حقيبة المستكشفة العصرية', emoji: '🎒' },
    { name: 'حقيبة الفراشة الوردية', emoji: '👛' }
  ],

  shoes: [
    { name: 'حذاء الكريستال اللامع', emoji: '👠' },
    { name: 'حذاء مريح للمختبر', emoji: '👟' },
    { name: 'صندل الربيع المزهر', emoji: '👡' }
  ],

  start() {
    this.eventIdx = 0;
    this.dressIdx = 0;
    this.crownIdx = 0;
    this.bagIdx = 0;
    this.shoeIdx = 0;
    this.score = 0;
    window.MaxCompanion.say(
      'أهلاً بكِ في بوتيك الأزياء الملكي! اختاري الفستان والتاج والحقيبة والحذاء المناسب لكل مناسبة ثم اعرضي تصميمك على منصة الأضواء!',
      'excited',
      false
    );
    this.render();
  },

  selectItem(type, idx) {
    window.FunKidsRewards.playSound('sparkle');
    if (type === 'dress') this.dressIdx = idx;
    if (type === 'crown') this.crownIdx = idx;
    if (type === 'bag') this.bagIdx = idx;
    if (type === 'shoe') this.shoeIdx = idx;
    this.render();
  },

  presentLook() {
    const ev = this.events[this.eventIdx];
    let roundPoints = 30;
    if (this.dressIdx === ev.bestDress) roundPoints += 10;
    if (this.crownIdx === ev.bestCrown) roundPoints += 10;
    this.score += roundPoints;

    window.FunKidsRewards.playSound('sparkle');
    window.FunKidsRewards.playSound('correct');
    window.MaxCompanion.onCorrectAnswer(`إطلالة ساحرة! لجنة التحكيم منحت تصميمك ${roundPoints} نقطة و 5 نجوم متألقة!`);

    this.eventIdx += 1;
    this.render();
  },

  render() {
    const mount = document.getElementById('fashion-game-mount');
    if (!mount) return;

    if (this.eventIdx >= this.events.length) {
      window.FunKidsRewards.awardPoints(this.score, 3, 'fashion', 'التألق في بوتيك الأزياء وتنسيق الأميرات');
      mount.innerHTML = `
        <div class="text-center py-6 px-4 space-y-4 bg-gradient-to-b from-pink-50 to-white rounded-3xl border-4 border-pink-300">
          <div class="text-6xl animate-bounce">👑👗✨⭐⭐⭐</div>
          <h3 class="text-2xl sm:text-3xl font-black text-slate-900">مصممة الأزياء الملكية الأولى!</h3>
          <p class="text-base sm:text-lg font-bold text-slate-600">أبدعتِ في تنسيق جميع الإطلالات وحصلتِ على <span class="text-pink-600 font-black">${this.score} نقطة</span>!</p>
          <button type="button" onclick="window.PrincessFashionGame.start()" class="btn-3d btn-primary text-base py-3 px-6">
            🔄 عرض أزياء جديد
          </button>
        </div>
      `;
      return;
    }

    const ev = this.events[this.eventIdx];
    const d = this.dresses[this.dressIdx];
    const c = this.crowns[this.crownIdx];
    const b = this.bags[this.bagIdx];
    const s = this.shoes[this.shoeIdx];

    mount.innerHTML = `
      <div class="space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2 bg-pink-50 p-3.5 rounded-2xl border-2 border-pink-200">
          <div>
            <span class="px-3 py-1 rounded-full bg-pink-600 text-white font-black text-xs">المناسبة ${this.eventIdx + 1} من ${this.events.length}</span>
            <h4 class="font-black text-slate-900 text-base sm:text-lg mt-1">${ev.title}</h4>
            <p class="text-xs font-bold text-slate-600">${ev.desc}</p>
          </div>
          <div class="px-4 py-2 rounded-2xl bg-white border-2 border-pink-300 font-black text-pink-700 text-sm">
            النقاط: ${this.score} ✨
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <!-- منصة عرض الأميرة التفاعلية -->
          <div class="lg:col-span-5 interactive-stage bg-gradient-to-b ${d.color} p-5 text-white flex flex-col items-center justify-between text-center space-y-3">
            <span class="px-3 py-1 rounded-full bg-white/25 text-xs font-black">📸 منصة عرض الأزياء الحية</span>

            <div class="relative py-4 px-6 rounded-3xl bg-white/20 backdrop-blur-sm border-2 border-white/50 w-full space-y-2">
              <div class="text-4xl animate-sparkle">${c.emoji}</div>
              <div class="text-6xl sm:text-7xl drop-shadow-md">👸</div>
              <div class="flex items-center justify-center gap-4 text-4xl pt-1">
                <span>${d.emoji}</span>
                <span>${b.emoji}</span>
                <span>${s.emoji}</span>
              </div>
            </div>

            <div class="w-full bg-slate-900/45 p-3 rounded-2xl text-xs font-bold space-y-1">
              <div>👗 ${d.name}</div>
              <div>👑 ${c.name} • ${b.emoji} ${b.name}</div>
              <div>👠 ${s.name}</div>
            </div>

            <button type="button" onclick="window.PrincessFashionGame.presentLook()" class="btn-3d btn-accent w-full text-sm sm:text-base py-3">
              🌟 اعرضي الإطلالة وتألقي على المسرح!
            </button>
          </div>

          <!-- خزانة الملابس والإكسسوارات -->
          <div class="lg:col-span-7 bg-white p-4 rounded-3xl border-2 border-pink-200 space-y-3">
            <div>
              <div class="text-xs font-black text-pink-700 mb-1.5">1. اختاري الفستان أو الزي:</div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                ${this.dresses.map((item, i) => `
                  <button type="button" onclick="window.PrincessFashionGame.selectItem('dress', ${i})"
                    class="p-2.5 rounded-2xl border-2 text-xs font-black flex items-center gap-2 transition ${this.dressIdx === i ? 'bg-pink-500 text-white border-pink-700 shadow' : 'bg-pink-50/60 text-slate-700 border-pink-200'}">
                    <span class="text-2xl">${item.emoji}</span>
                    <span>${item.name}</span>
                  </button>
                `).join('')}
              </div>
            </div>

            <div>
              <div class="text-xs font-black text-pink-700 mb-1.5">2. اختاري التاج أو زينة الشعر:</div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                ${this.crowns.map((item, i) => `
                  <button type="button" onclick="window.PrincessFashionGame.selectItem('crown', ${i})"
                    class="p-2.5 rounded-2xl border-2 text-xs font-black flex items-center gap-2 transition ${this.crownIdx === i ? 'bg-fuchsia-500 text-white border-fuchsia-700 shadow' : 'bg-pink-50/60 text-slate-700 border-pink-200'}">
                    <span class="text-2xl">${item.emoji}</span>
                    <span>${item.name}</span>
                  </button>
                `).join('')}
              </div>
            </div>

            <div>
              <div class="text-xs font-black text-pink-700 mb-1.5">3. اختاري الحقيبة الملكية:</div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                ${this.bags.map((item, i) => `
                  <button type="button" onclick="window.PrincessFashionGame.selectItem('bag', ${i})"
                    class="p-2.5 rounded-2xl border-2 text-xs font-black flex items-center gap-2 transition ${this.bagIdx === i ? 'bg-rose-500 text-white border-rose-700 shadow' : 'bg-pink-50/60 text-slate-700 border-pink-200'}">
                    <span class="text-2xl">${item.emoji}</span>
                    <span>${item.name}</span>
                  </button>
                `).join('')}
              </div>
            </div>

            <div>
              <div class="text-xs font-black text-pink-700 mb-1.5">4. اختاري الحذاء المناسب:</div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                ${this.shoes.map((item, i) => `
                  <button type="button" onclick="window.PrincessFashionGame.selectItem('shoe', ${i})"
                    class="p-2.5 rounded-2xl border-2 text-xs font-black flex items-center gap-2 transition ${this.shoeIdx === i ? 'bg-purple-500 text-white border-purple-700 shadow' : 'bg-pink-50/60 text-slate-700 border-pink-200'}">
                    <span class="text-2xl">${item.emoji}</span>
                    <span>${item.name}</span>
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

/* --------------------------------------------------------------------------
   2. شيف الحلويات والمخبز السعيد (SweetBakeryGame) - خبز وتزيين طبقات الكيك
   -------------------------------------------------------------------------- */
window.SweetBakeryGame = {
  orderIdx: 0,
  score: 0,
  chosenBase: 0,
  chosenCream: 0,
  chosenTop: 0,

  bases: [
    { name: 'كيك الفراولة الوردي', emoji: '🍓', color: 'bg-pink-300' },
    { name: 'كيك الشوكولاتة الفاخرة', emoji: '🍫', color: 'bg-amber-800 text-white' },
    { name: 'كيك الفانيليا الذهبي', emoji: '🍯', color: 'bg-amber-200' }
  ],

  creams: [
    { name: 'كريمة التوت الأزرق', emoji: '🫐', color: 'bg-sky-200' },
    { name: 'كريمة الفانيليا البيضاء', emoji: '🍦', color: 'bg-slate-100' },
    { name: 'كريمة الكراميل المملح', emoji: '🍮', color: 'bg-amber-300' }
  ],

  toppings: [
    { name: 'حبة كرز ونجوم سكرية', emoji: '🍒' },
    { name: 'فراشة شوكولاتة لامعة', emoji: '🦋' },
    { name: 'قلوب ملونة ومارشميلو', emoji: '💖' }
  ],

  orders: [
    { customer: 'الأميرة ليلى 👧', base: 0, cream: 1, top: 0 },
    { customer: 'الشيف الصغير سارة 👩‍🍳', base: 1, cream: 2, top: 1 },
    { customer: 'صديقتنا نور 🌸', base: 2, cream: 0, top: 2 }
  ],

  start() {
    this.orderIdx = 0;
    this.score = 0;
    this.chosenBase = 0;
    this.chosenCream = 0;
    this.chosenTop = 0;
    window.MaxCompanion.say(
      'مرحباً بكِ في المخبز السعيد! اقرئي بطاقة طلب الزبونة بعناية وحضّري طبقات الكب كيك المطابقة تماماً!',
      'happy',
      false
    );
    this.render();
  },

  pickIngredient(layer, idx) {
    window.FunKidsRewards.playSound('click');
    if (layer === 'base') this.chosenBase = idx;
    if (layer === 'cream') this.chosenCream = idx;
    if (layer === 'top') this.chosenTop = idx;
    this.render();
  },

  serveCake() {
    const ord = this.orders[this.orderIdx];
    let matches = 0;
    if (this.chosenBase === ord.base) matches += 1;
    if (this.chosenCream === ord.cream) matches += 1;
    if (this.chosenTop === ord.top) matches += 1;

    if (matches === 3) {
      this.score += 45;
      window.FunKidsRewards.playSound('correct');
      window.MaxCompanion.onCorrectAnswer('يمييي! كعكة مطابقة للطلب 100%! الزبونة سعيدة جداً بطعمها الرائع!');
    } else {
      this.score += matches * 15;
      window.FunKidsRewards.playSound('sparkle');
      window.MaxCompanion.say(`كعكة لذيذة! طابقتِ ${matches} من 3 مكونات مطلوبة. لنحضر الطلب التالي!`, 'encouraging', true);
    }

    this.orderIdx += 1;
    this.render();
  },

  render() {
    const mount = document.getElementById('bakery-game-mount');
    if (!mount) return;

    if (this.orderIdx >= this.orders.length) {
      window.FunKidsRewards.awardPoints(this.score, 3, 'bakery', 'إتمام طلبات شيف الحلويات والمخبز السعيد');
      mount.innerHTML = `
        <div class="text-center py-6 px-4 space-y-4 bg-gradient-to-b from-rose-50 to-white rounded-3xl border-4 border-rose-300">
          <div class="text-6xl animate-bounce">🧁🍓👩‍🍳⭐⭐⭐</div>
          <h3 class="text-2xl sm:text-3xl font-black text-slate-900">أبرع شيف حلويات في العالم!</h3>
          <p class="text-base sm:text-lg font-bold text-slate-600">قدمتِ أشهى الحلويات لجميع الزبائن وحصلتِ على <span class="text-rose-600 font-black">${this.score} نقطة</span>!</p>
          <button type="button" onclick="window.SweetBakeryGame.start()" class="btn-3d btn-primary text-base py-3 px-6">
            🔄 افتحي المخبز لجولة جديدة
          </button>
        </div>
      `;
      return;
    }

    const ord = this.orders[this.orderIdx];
    const reqBase = this.bases[ord.base];
    const reqCream = this.creams[ord.cream];
    const reqTop = this.toppings[ord.top];

    const curBase = this.bases[this.chosenBase];
    const curCream = this.creams[this.chosenCream];
    const curTop = this.toppings[this.chosenTop];

    mount.innerHTML = `
      <div class="space-y-4">
        <!-- بطاقة طلب الزبونة -->
        <div class="bg-amber-50 p-4 rounded-3xl border-3 border-amber-300 flex flex-col md:flex-row items-center justify-between gap-3">
          <div class="space-y-1 text-center md:text-right">
            <span class="px-3 py-0.5 rounded-full bg-rose-500 text-white font-black text-xs">🧾 طلب الزبونة ${this.orderIdx + 1} من ${this.orders.length}: ${ord.customer}</span>
            <div class="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1 text-xs sm:text-sm font-black text-slate-800">
              <span class="px-3 py-1 rounded-xl bg-white border border-amber-300">1. ${reqBase.emoji} ${reqBase.name}</span>
              <span class="px-3 py-1 rounded-xl bg-white border border-amber-300">2. ${reqCream.emoji} ${reqCream.name}</span>
              <span class="px-3 py-1 rounded-xl bg-white border border-amber-300">3. ${reqTop.emoji} ${reqTop.name}</span>
            </div>
          </div>
          <div class="px-4 py-2 rounded-2xl bg-white border-2 border-rose-300 font-black text-rose-700 text-sm shrink-0">
            النقاط: ${this.score} 🧁
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <!-- طاولة تحضير الكب كيك التفاعلية -->
          <div class="lg:col-span-5 interactive-stage bg-gradient-to-b from-rose-100 via-pink-50 to-amber-50 p-5 flex flex-col items-center justify-between text-center space-y-3">
            <span class="px-3 py-1 rounded-full bg-rose-500 text-white text-xs font-black">🍽️ منصة التزيين المباشرة</span>

            <!-- شكل الكب كيك المركب بطبقاته الحقيقية -->
            <div class="py-4 flex flex-col items-center justify-center space-y-1">
              <div class="text-4xl animate-bounce">${curTop.emoji}</div>
              <div class="w-28 h-12 rounded-t-full ${curCream.color} border-3 border-white shadow flex items-center justify-center font-black text-xs text-slate-800">
                ${curCream.emoji} كريمة
              </div>
              <div class="w-32 h-16 rounded-b-3xl ${curBase.color} border-3 border-white shadow-md flex items-center justify-center font-black text-xs">
                ${curBase.emoji} كيك
              </div>
            </div>

            <button type="button" onclick="window.SweetBakeryGame.serveCake()" class="btn-3d btn-primary w-full text-sm sm:text-base py-3">
              🛎️ قدّمي الكعكة للزبونة الآن!
            </button>
          </div>

          <!-- أزرار اختيار المكونات -->
          <div class="lg:col-span-7 bg-white p-4 rounded-3xl border-2 border-rose-200 space-y-3">
            <div>
              <div class="text-xs font-black text-rose-700 mb-1.5">1. اختاري نكهة الكيك الأساسية:</div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                ${this.bases.map((b, i) => `
                  <button type="button" onclick="window.SweetBakeryGame.pickIngredient('base', ${i})"
                    class="p-2.5 rounded-2xl border-2 text-xs font-black flex items-center gap-2 ${this.chosenBase === i ? 'bg-rose-500 text-white border-rose-700' : 'bg-rose-50/60 text-slate-700 border-rose-200'}">
                    <span class="text-2xl">${b.emoji}</span><span>${b.name}</span>
                  </button>
                `).join('')}
              </div>
            </div>

            <div>
              <div class="text-xs font-black text-rose-700 mb-1.5">2. اختاري طبقة الكريمة:</div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                ${this.creams.map((c, i) => `
                  <button type="button" onclick="window.SweetBakeryGame.pickIngredient('cream', ${i})"
                    class="p-2.5 rounded-2xl border-2 text-xs font-black flex items-center gap-2 ${this.chosenCream === i ? 'bg-pink-500 text-white border-pink-700' : 'bg-rose-50/60 text-slate-700 border-rose-200'}">
                    <span class="text-2xl">${c.emoji}</span><span>${c.name}</span>
                  </button>
                `).join('')}
              </div>
            </div>

            <div>
              <div class="text-xs font-black text-rose-700 mb-1.5">3. اختاري الزينة العلوية:</div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                ${this.toppings.map((t, i) => `
                  <button type="button" onclick="window.SweetBakeryGame.pickIngredient('top', ${i})"
                    class="p-2.5 rounded-2xl border-2 text-xs font-black flex items-center gap-2 ${this.chosenTop === i ? 'bg-amber-400 text-slate-900 border-amber-600' : 'bg-rose-50/60 text-slate-700 border-rose-200'}">
                    <span class="text-2xl">${t.emoji}</span><span>${t.name}</span>
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

/* --------------------------------------------------------------------------
   3. استوديو تصميم المجوهرات والتيجان الملكية (JewelryStudioGame) - نظم الخرز والألماس
   -------------------------------------------------------------------------- */
window.JewelryStudioGame = {
  level: 0,
  score: 0,
  userSlotGems: [],

  gems: [
    { id: 'ruby', icon: '🔴', name: 'ياقوت أحمر' },
    { id: 'diamond', icon: '💎', name: 'ألماس أزرق' },
    { id: 'pearl', icon: '⚪', name: 'لؤلؤ أبيض' },
    { id: 'emerald', icon: '🟢', name: 'زمرد أخضر' },
    { id: 'star', icon: '⭐', name: 'ذهب ملكي' }
  ],

  patterns: [
    {
      title: 'عقد اللؤلؤ والياقوت المتناظر',
      target: ['ruby', 'pearl', 'diamond', 'pearl', 'ruby']
    },
    {
      title: 'تاج الألماس والذهب الملكي',
      target: ['star', 'diamond', 'emerald', 'diamond', 'star']
    },
    {
      title: 'سوار الزمرد والنجوم السحري',
      target: ['emerald', 'star', 'ruby', 'star', 'emerald']
    }
  ],

  start() {
    this.level = 0;
    this.score = 0;
    this.userSlotGems = [];
    window.MaxCompanion.say(
      'أهلاً بكِ في استوديو المجوهرات الملكية! انظمي الأحجار الكريمة واللآلئ بالترتيب المتناظر المطلوب لتصنعي أجمل عقد وتاج!',
      'excited',
      false
    );
    this.render();
  },

  addGem(gemId) {
    const pat = this.patterns[this.level];
    if (!pat || this.userSlotGems.length >= pat.target.length) return;
    window.FunKidsRewards.playSound('sparkle');
    this.userSlotGems.push(gemId);
    this.render();
  },

  clearSlots() {
    window.FunKidsRewards.playSound('click');
    this.userSlotGems = [];
    this.render();
  },

  checkJewelry() {
    const pat = this.patterns[this.level];
    if (this.userSlotGems.length < pat.target.length) {
      window.MaxCompanion.say('أكملي وضع جميع الجواهر الـ 5 في الخيط الذهبي أولاً!', 'encouraging', true);
      return;
    }

    const isExact = pat.target.every((g, i) => g === this.userSlotGems[i]);
    if (isExact) {
      this.score += 45;
      window.FunKidsRewards.playSound('sparkle');
      window.FunKidsRewards.playSound('correct');
      window.MaxCompanion.onCorrectAnswer('تصميم مجوهرات ملكي متقن 100%! بريق الألماس يخطف الأنظار!');
      this.level += 1;
      this.userSlotGems = [];
      this.render();
    } else {
      window.FunKidsRewards.playSound('wrong');
      window.MaxCompanion.onWrongAnswer('ترتيب الجواهر يختلف قليلاً عن النمط المطلوب! اضغطي مسح ورتبيها بنفس التسلسل!');
    }
  },

  render() {
    const mount = document.getElementById('jewelry-game-mount');
    if (!mount) return;

    if (this.level >= this.patterns.length) {
      window.FunKidsRewards.awardPoints(this.score + 35, 3, 'jewelry', 'إتقان تصميم المجوهرات والتيجان الملكية');
      mount.innerHTML = `
        <div class="text-center py-6 px-4 space-y-4 bg-gradient-to-b from-fuchsia-50 to-white rounded-3xl border-4 border-fuchsia-300">
          <div class="text-6xl animate-bounce">💎👑📿⭐⭐⭐</div>
          <h3 class="text-2xl sm:text-3xl font-black text-slate-900">خبيرة المجوهرات والألماس الملكي!</h3>
          <p class="text-base sm:text-lg font-bold text-slate-600">صممتِ جميع العقود والتيجان المتناظرة وحصلتِ على <span class="text-fuchsia-600 font-black">${this.score + 35} نقطة</span>!</p>
          <button type="button" onclick="window.JewelryStudioGame.start()" class="btn-3d btn-purple text-base py-3 px-6">
            🔄 تصميم مجموعة جديدة
          </button>
        </div>
      `;
      return;
    }

    const pat = this.patterns[this.level];
    const getGemObj = (id) => this.gems.find(g => g.id === id) || this.gems[0];

    mount.innerHTML = `
      <div class="space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2 bg-fuchsia-50 p-3.5 rounded-2xl border-2 border-fuchsia-200">
          <div>
            <span class="px-3 py-1 rounded-full bg-fuchsia-600 text-white font-black text-xs">التصميم ${this.level + 1} من ${this.patterns.length}</span>
            <h4 class="font-black text-slate-900 text-base sm:text-lg mt-1">📿 ${pat.title}</h4>
          </div>
          <span class="font-black text-fuchsia-800 text-sm">النقاط: ${this.score} 💎</span>
        </div>

        <!-- النمط المطلوب مطابقته -->
        <div class="p-4 rounded-3xl bg-gradient-to-r from-indigo-950 via-purple-900 to-fuchsia-950 text-white text-center space-y-3">
          <div class="text-xs font-black text-amber-300">✨ النمط الملكي المطلوب (رتبي الجواهر من اليمين إلى اليسار بنفس الشكل):</div>
          <div class="flex items-center justify-center gap-3 sm:gap-5 py-2">
            ${pat.target.map(gid => {
              const g = getGemObj(gid);
              return `
                <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/15 border-2 border-amber-300 flex flex-col items-center justify-center shadow-lg">
                  <span class="text-2xl sm:text-3xl animate-sparkle">${g.icon}</span>
                </div>
              `;
            }).join('')}
          </div>

          <!-- خيط العقد الذي تنظم فيه الطفلة الجواهر -->
          <div class="text-xs font-black text-pink-200 pt-2">👑 خيط العقد الخاص بكِ (${this.userSlotGems.length} / 5):</div>
          <div class="flex items-center justify-center gap-3 sm:gap-5 py-2">
            ${[0, 1, 2, 3, 4].map(slotIdx => {
              const gid = this.userSlotGems[slotIdx];
              const g = gid ? getGemObj(gid) : null;
              return `
                <div class="w-13 h-13 sm:w-16 sm:h-16 rounded-full ${g ? 'bg-white text-slate-900 border-4 border-amber-400 scale-105' : 'bg-white/10 border-2 border-dashed border-white/50'} flex items-center justify-center text-2xl sm:text-3xl transition-all">
                  ${g ? g.icon : '➕'}
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- علبة الجواهر والأحجار الكريمة -->
        <div class="bg-white p-4 rounded-3xl border-2 border-fuchsia-200 space-y-3">
          <div class="text-xs font-black text-slate-700 text-center">انقري على الجوهرة لإضافتها إلى الخيط الذهبي:</div>
          <div class="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            ${this.gems.map(g => `
              <button type="button" onclick="window.JewelryStudioGame.addGem('${g.id}')"
                class="btn-3d btn-secondary py-2.5 px-3 text-xs sm:text-sm flex items-center justify-center gap-1.5">
                <span class="text-xl">${g.icon}</span>
                <span>${g.name}</span>
              </button>
            `).join('')}
          </div>

          <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button type="button" onclick="window.JewelryStudioGame.checkJewelry()" class="btn-3d btn-primary text-sm sm:text-base py-2.5 px-6">
              ✅ اعتماد التصميم الملكي
            </button>
            <button type="button" onclick="window.JewelryStudioGame.clearSlots()" class="btn-3d btn-accent text-xs sm:text-sm py-2.5 px-4">
              🔄 إفراغ الخيط وإعادة الترتيب
            </button>
          </div>
        </div>
      </div>
    `;
  }
};

/* --------------------------------------------------------------------------
   4. عيادة وصالون رعاية الحيوانات الأليفة اللطيفة (PetCareSpaGame) - استحمام وعلاج وتجميل
   -------------------------------------------------------------------------- */
window.PetCareSpaGame = {
  petIdx: 0,
  cleanliness: 30,
  health: 30,
  happiness: 30,
  accessory: '🎀',
  score: 0,
  lastActionMsg: 'اختاري أدوات الاستحمام والفحص الطبي والغذاء والتزيين حتى تصل جميع مؤشرات أليفكِ إلى 100%!',

  pets: [
    { name: 'القطة الشيرازية لولو', emoji: '🐱', soundText: 'مياااو لطيف!' },
    { name: 'الأرنب الأبيض سنو', emoji: '🐰', soundText: 'قفزة سعادة!' },
    { name: 'الجرو الذهبي بوبي', emoji: '🐶', soundText: 'هاو هاو مرح!' }
  ],

  start() {
    this.petIdx = 0;
    this.cleanliness = 30;
    this.health = 30;
    this.happiness = 30;
    this.accessory = '🎀';
    this.score = 0;
    this.lastActionMsg = 'ابدئي بغسل الأليف بالفقاعات الدافئة ثم فحص صحته وإطعامه وتزيينه!';
    window.MaxCompanion.say(
      'أهلاً بكِ في عيادة وصالون الأليفة اللطيفة! اعتني بالقطة والأرنب والجرو بالصابون والغذاء الصحي والإكسسوارات!',
      'happy',
      false
    );
    this.render();
  },

  applyCare(type) {
    if (type === 'bath') {
      this.cleanliness = 100;
      this.score += 20;
      window.FunKidsRewards.playSound('sparkle');
      this.lastActionMsg = '🛁 فقاعات الصابون الدافئة جعلت الفرو ناصع البياض وناعم الملمس!';
    } else if (type === 'checkup') {
      this.health = 100;
      this.score += 20;
      window.FunKidsRewards.playSound('correct');
      this.lastActionMsg = '🩺 فحص السماعة الطبية والفيتامينات ممتاز! نبضات القلب نشيطة وصحية!';
    } else if (type === 'feed') {
      this.happiness = 100;
      this.score += 20;
      window.FunKidsRewards.playSound('animal');
      this.lastActionMsg = '🥣 وجبة مغذية ولذيذة! الأليف يقفز فرحاً وسعادة!';
    }
    this.render();
  },

  setAccessory(acc) {
    window.FunKidsRewards.playSound('sparkle');
    this.accessory = acc;
    this.render();
  },

  nextPet() {
    this.petIdx += 1;
    this.cleanliness = 30;
    this.health = 30;
    this.happiness = 30;
    this.lastActionMsg = 'حيوان أليف جديد بانتظار رعايتكِ الحنونة!';
    this.render();
  },

  render() {
    const mount = document.getElementById('petcare-game-mount');
    if (!mount) return;

    if (this.petIdx >= this.pets.length) {
      window.FunKidsRewards.awardPoints(this.score + 40, 3, 'petcare', 'رعاية جميع الحيوانات الأليفة في الصالون');
      mount.innerHTML = `
        <div class="text-center py-6 px-4 space-y-4 bg-gradient-to-b from-teal-50 to-white rounded-3xl border-4 border-teal-300">
          <div class="text-6xl animate-bounce">🐱🐰🐶💖</div>
          <h3 class="text-2xl sm:text-3xl font-black text-slate-900">الطبيبة الحنونة وصديقة الأليفة!</h3>
          <p class="text-base sm:text-lg font-bold text-slate-600">اعتنيتِ بجميع الحيوانات الأليفة الثلاثة وحصلتِ على <span class="text-teal-600 font-black">${this.score + 40} نقطة</span>!</p>
          <button type="button" onclick="window.PetCareSpaGame.start()" class="btn-3d btn-success text-base py-3 px-6">
            🔄 جولة رعاية جديدة
          </button>
        </div>
      `;
      return;
    }

    const pet = this.pets[this.petIdx];
    const allComplete = this.cleanliness === 100 && this.health === 100 && this.happiness === 100;

    mount.innerHTML = `
      <div class="space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2 bg-teal-50 p-3.5 rounded-2xl border-2 border-teal-200">
          <span class="px-3 py-1 rounded-full bg-teal-600 text-white font-black text-xs">🐾 الأليف ${this.petIdx + 1} من ${this.pets.length}: ${pet.name}</span>
          <span class="font-black text-teal-900 text-sm">النقاط: ${this.score} 💖</span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <!-- منصة الأليف التفاعلية -->
          <div class="lg:col-span-5 interactive-stage bg-gradient-to-b from-sky-100 via-teal-50 to-pink-50 p-5 flex flex-col items-center justify-between text-center space-y-3">
            <div class="text-xs font-black text-teal-800 bg-white/80 px-3 py-1 rounded-full">${pet.name}</div>

            <div class="relative py-4">
              <div class="text-3xl absolute -top-1 right-2 animate-sparkle">${this.accessory}</div>
              <div class="text-7xl sm:text-8xl ${allComplete ? 'animate-bounce' : 'animate-float'}">${pet.emoji}</div>
              ${this.cleanliness === 100 ? '<div class="text-xs font-black text-sky-600 mt-1">🫧 نظيف ولامع!</div>' : ''}
            </div>

            <!-- أشرطة الحالة الثلاثة -->
            <div class="w-full space-y-2 bg-white p-3 rounded-2xl border border-teal-200 text-xs font-black">
              <div>
                <div class="flex justify-between mb-1"><span>🛁 النظافة واللمعان</span><span>${this.cleanliness}%</span></div>
                <div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden"><div class="h-full bg-sky-400 transition-all" style="width:${this.cleanliness}%"></div></div>
              </div>
              <div>
                <div class="flex justify-between mb-1"><span>🩺 الصحة والنشاط</span><span>${this.health}%</span></div>
                <div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden"><div class="h-full bg-emerald-500 transition-all" style="width:${this.health}%"></div></div>
              </div>
              <div>
                <div class="flex justify-between mb-1"><span>🥣 الشبع والسعادة</span><span>${this.happiness}%</span></div>
                <div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden"><div class="h-full bg-pink-500 transition-all" style="width:${this.happiness}%"></div></div>
              </div>
            </div>
          </div>

          <!-- أدوات العيادة والصالون -->
          <div class="lg:col-span-7 bg-white p-4 rounded-3xl border-2 border-teal-200 flex flex-col justify-between space-y-4">
            <div class="space-y-3">
              <h4 class="font-black text-slate-800 text-sm sm:text-base">🧴 خطوات الرعاية المتكاملة (اضغطي على الأدوات الثلاث):</h4>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button type="button" onclick="window.PetCareSpaGame.applyCare('bath')"
                  class="btn-3d ${this.cleanliness === 100 ? 'btn-success' : 'btn-secondary'} py-3.5 text-xs sm:text-sm flex flex-col items-center gap-1">
                  <span class="text-2xl">🛁🫧</span>
                  <span>حمام الفقاعات الدافئ</span>
                </button>
                <button type="button" onclick="window.PetCareSpaGame.applyCare('checkup')"
                  class="btn-3d ${this.health === 100 ? 'btn-success' : 'btn-purple'} py-3.5 text-xs sm:text-sm flex flex-col items-center gap-1">
                  <span class="text-2xl">🩺💊</span>
                  <span>الفحص الطبي اللطيف</span>
                </button>
                <button type="button" onclick="window.PetCareSpaGame.applyCare('feed')"
                  class="btn-3d ${this.happiness === 100 ? 'btn-success' : 'btn-primary'} py-3.5 text-xs sm:text-sm flex flex-col items-center gap-1">
                  <span class="text-2xl">🥣🥕</span>
                  <span>الوجبة الصحية اللذيذة</span>
                </button>
              </div>

              <div class="pt-2">
                <div class="text-xs font-black text-slate-600 mb-2">🎀 اختاري طوق التزيين للأليف:</div>
                <div class="flex flex-wrap gap-2">
                  ${['🎀', '👑', '🌸', '🕶️', '🔔'].map(acc => `
                    <button type="button" onclick="window.PetCareSpaGame.setAccessory('${acc}')"
                      class="w-11 h-11 rounded-2xl border-2 text-2xl flex items-center justify-center ${this.accessory === acc ? 'bg-pink-100 border-pink-500 scale-110' : 'bg-slate-50 border-slate-200'}">
                      ${acc}
                    </button>
                  `).join('')}
                </div>
              </div>
            </div>

            <div class="p-3.5 rounded-2xl bg-teal-50 border border-teal-200 text-xs sm:text-sm font-bold text-teal-950">
              💬 ${this.lastActionMsg}
            </div>

            ${allComplete ? `
              <button type="button" onclick="window.PetCareSpaGame.nextPet()" class="btn-3d btn-accent w-full text-base py-3 animate-bounce">
                🌟 اكتملت رعاية ${pet.name}! انتقلي للأليف التالي ⬅️
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }
};

/* --------------------------------------------------------------------------
   5. حديقة الفراشات وتنسيق الزهور الملكية (GardenDesignGame) - زراعة وسقاية وفراشات
   -------------------------------------------------------------------------- */
window.GardenDesignGame = {
  plots: [],
  selectedSeed: 0,
  score: 0,
  bloomedCount: 0,

  seeds: [
    { name: 'ورد جوري أحمر', flower: '🌹', butterfly: '🦋' },
    { name: 'توليب وردي ملكي', flower: '🌷', butterfly: '🦋' },
    { name: 'عباد الشمس الذهبي', flower: '🌻', butterfly: '🐝' },
    { name: 'زهرة الكرز الربيعية', flower: '🌸', butterfly: '🦋' }
  ],

  start() {
    this.score = 0;
    this.bloomedCount = 0;
    this.selectedSeed = 0;
    // stage: 0 = تربة فارغة, 1 = بذرة مزروعة, 2 = برعم أخضر, 3 = زهرة متفتحة مع فراشة
    this.plots = Array.from({ length: 6 }, (_, idx) => ({
      id: idx,
      stage: 0,
      seedIdx: 0
    }));

    window.MaxCompanion.say(
      'أهلاً بكِ في حديقة الفراشات السحرية! ازرعي البذور في الأحواض الستة ثم اسقيها بالماء وأشعة الشمس لتتفتح الزهور وتجذب الفراشات الملونة!',
      'happy',
      false
    );
    this.render();
  },

  selectSeed(idx) {
    window.FunKidsRewards.playSound('click');
    this.selectedSeed = idx;
    this.render();
  },

  interactPlot(idx) {
    const p = this.plots[idx];
    if (!p || p.stage >= 3) return;

    if (p.stage === 0) {
      p.stage = 1;
      p.seedIdx = this.selectedSeed;
      window.FunKidsRewards.playSound('click');
    } else if (p.stage === 1) {
      p.stage = 2;
      window.FunKidsRewards.playSound('sparkle');
    } else if (p.stage === 2) {
      p.stage = 3;
      this.bloomedCount += 1;
      this.score += 30;
      window.FunKidsRewards.playSound('sparkle');
      window.FunKidsRewards.playSound('correct');
      const s = this.seeds[p.seedIdx];
      window.MaxCompanion.onCorrectAnswer(`تفتحت ${s.name} وجذبت الفراشات الملونة إلى حديقتك!`);
    }
    this.render();
  },

  waterAll() {
    let progressed = false;
    this.plots.forEach(p => {
      if (p.stage > 0 && p.stage < 3) {
        p.stage += 1;
        progressed = true;
        if (p.stage === 3) {
          this.bloomedCount += 1;
          this.score += 30;
        }
      }
    });
    if (progressed) {
      window.FunKidsRewards.playSound('sparkle');
      this.render();
    } else {
      window.MaxCompanion.say('ازرعي البذور في الأحواض الفارغة أولاً ثم اسقيها بالماء!', 'explaining', true);
    }
  },

  render() {
    const mount = document.getElementById('garden-game-mount');
    if (!mount) return;

    if (this.bloomedCount >= 6) {
      const total = this.score + 40;
      window.FunKidsRewards.awardPoints(total, 3, 'garden', 'تفتح جميع أزهار حديقة الفراشات الملكية');
      mount.innerHTML = `
        <div class="text-center py-6 px-4 space-y-4 bg-gradient-to-b from-emerald-50 to-white rounded-3xl border-4 border-emerald-300">
          <div class="text-6xl animate-bounce">🌸🌹🌻🦋🏆</div>
          <h3 class="text-2xl sm:text-3xl font-black text-slate-900">مهندسة الحدائق الملكية المبدعة!</h3>
          <p class="text-base sm:text-lg font-bold text-slate-600">تفتحت جميع الأحواض الستة وامتلأت الحديقة بالفراشات وحصلتِ على <span class="text-emerald-600 font-black">${total} نقطة</span>!</p>
          <button type="button" onclick="window.GardenDesignGame.start()" class="btn-3d btn-success text-base py-3 px-6">
            🔄 تنسيق حديقة جديدة
          </button>
        </div>
      `;
      return;
    }

    mount.innerHTML = `
      <div class="space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2 bg-emerald-50 p-3.5 rounded-2xl border-2 border-emerald-200">
          <div class="flex flex-wrap items-center gap-2">
            <span class="px-3 py-1 rounded-full bg-emerald-600 text-white font-black text-xs">🌸 الزهور المتفتحة: ${this.bloomedCount} / 6</span>
            <button type="button" onclick="window.GardenDesignGame.waterAll()" class="btn-3d btn-secondary text-xs py-1.5 px-3.5">
              🚿 سقاية جميع البراعم بالماء والشمس ☀️
            </button>
          </div>
          <span class="font-black text-emerald-900 text-sm">النقاط: ${this.score} 🦋</span>
        </div>

        <!-- اختيار نوع البذور -->
        <div class="bg-white p-3.5 rounded-2xl border-2 border-pink-200 space-y-2">
          <div class="text-xs font-black text-slate-700">1. اختاري نوع الزهرة التي ترغبين بزراعتها:</div>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            ${this.seeds.map((s, i) => `
              <button type="button" onclick="window.GardenDesignGame.selectSeed(${i})"
                class="p-2 rounded-xl border-2 text-xs font-black flex items-center justify-center gap-1.5 ${this.selectedSeed === i ? 'bg-pink-500 text-white border-pink-700 shadow' : 'bg-pink-50/50 text-slate-700 border-pink-200'}">
                <span class="text-xl">${s.flower}</span>
                <span>${s.name}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- أحواض الحديقة الستة التفاعلية -->
        <div class="interactive-stage bg-gradient-to-b from-sky-200 via-emerald-100 to-emerald-300 p-4 sm:p-5">
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            ${this.plots.map((p, i) => {
              const s = this.seeds[p.seedIdx];
              let stageIcon = '🕳️';
              let stageAction = 'انقري لزراعة البذرة 🌱';
              let cardBg = 'bg-amber-900/80 text-amber-100 border-amber-700';

              if (p.stage === 1) {
                stageIcon = '🌱';
                stageAction = 'انقري للسقاية بالماء 💧';
                cardBg = 'bg-amber-800/85 text-white border-sky-300';
              } else if (p.stage === 2) {
                stageIcon = '🌿';
                stageAction = 'انقري لمنح أشعة الشمس ☀️';
                cardBg = 'bg-emerald-700 text-white border-amber-300';
              } else if (p.stage === 3) {
                stageIcon = s.flower;
                stageAction = `متفتحة! ${s.name} ✨`;
                cardBg = 'bg-gradient-to-b from-white to-pink-100 text-slate-900 border-pink-400';
              }

              return `
                <button type="button" onclick="window.GardenDesignGame.interactPlot(${i})"
                  class="h-32 sm:h-36 rounded-3xl border-3 ${cardBg} p-3 flex flex-col items-center justify-between text-center shadow-lg transition transform hover:scale-105 relative">
                  <span class="text-[11px] font-black opacity-80">حوض رقم ${i + 1}</span>
                  <div class="relative">
                    ${p.stage === 3 ? `<span class="absolute -top-3 -right-5 text-2xl animate-bounce">${s.butterfly}</span>` : ''}
                    <span class="text-4xl sm:text-5xl ${p.stage === 3 ? 'animate-float' : ''}">${stageIcon}</span>
                  </div>
                  <span class="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-black/15">${stageAction}</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }
};
