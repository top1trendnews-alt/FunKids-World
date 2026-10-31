/* ==========================================================================
   عالم فن كيدز - اللعبة 1: مغامرة الأرقام والحساب (math-game.js)
   عمليات حسابية متكيفة مع العمر (+، -، ×، ÷)، مضاعف الفوز، ومؤقت اختياري
   ========================================================================== */

window.MathAdventureGame = {
  score: 0,
  questionNumber: 1,
  totalQuestions: 5,
  streak: 0,
  currentAnswer: 0,
  timerInterval: null,
  timeLeft: 20,
  isLocked: false,

  start() {
    this.score = 0;
    this.questionNumber = 1;
    this.streak = 0;
    this.isLocked = false;
    this.nextQuestion();
    window.MaxCompanion.say(
      'أهلاً بك في مغامرة الأرقام والحساب! اختر الإجابة الصحيحة لكل مسألة حسابية لتجمع النجوم الذهبية!',
      'explaining',
      false
    );
  },

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  },

  generateProblem() {
    const zone = (window.FunKidsStorage.state && window.FunKidsStorage.state.ageZone) || 'junior';
    const difficultyBoost = Math.floor((this.questionNumber - 1) / 2);
    let a, b, op, ans, visualEmoji = '🍎';
    const emojis = ['🍎', '⭐', '🎈', '🍓', '🚀', '💎'];
    visualEmoji = emojis[this.questionNumber % emojis.length];

    if (zone === 'kids') {
      op = Math.random() > 0.35 ? '+' : '-';
      const maxVal = 7 + difficultyBoost * 3;
      a = Math.floor(Math.random() * maxVal) + 2;
      b = Math.floor(Math.random() * maxVal) + 1;
      if (op === '-' && b > a) [a, b] = [b, a];
      ans = op === '+' ? a + b : a - b;
    } else if (zone === 'junior') {
      const ops = ['+', '-', '×', '÷'];
      op = ops[(this.questionNumber - 1 + Math.floor(Math.random() * 2)) % ops.length];
      if (op === '+') {
        a = Math.floor(Math.random() * (18 + difficultyBoost * 8)) + 5;
        b = Math.floor(Math.random() * (15 + difficultyBoost * 6)) + 4;
        ans = a + b;
      } else if (op === '-') {
        a = Math.floor(Math.random() * 25) + 12;
        b = Math.floor(Math.random() * (a - 3)) + 2;
        ans = a - b;
      } else if (op === '×') {
        a = Math.floor(Math.random() * (7 + difficultyBoost * 2)) + 2;
        b = Math.floor(Math.random() * 8) + 2;
        ans = a * b;
      } else {
        b = Math.floor(Math.random() * 7) + 2;
        ans = Math.floor(Math.random() * 8) + 2;
        a = b * ans;
      }
    } else {
      const ops = ['×', '÷', '+', '-'];
      op = ops[Math.floor(Math.random() * ops.length)];
      if (op === '×') {
        a = Math.floor(Math.random() * 12) + 6;
        b = Math.floor(Math.random() * 11) + 4;
        ans = a * b;
      } else if (op === '÷') {
        b = Math.floor(Math.random() * 10) + 3;
        ans = Math.floor(Math.random() * 12) + 4;
        a = b * ans;
      } else if (op === '+') {
        a = Math.floor(Math.random() * 65) + 25;
        b = Math.floor(Math.random() * 55) + 18;
        ans = a + b;
      } else {
        a = Math.floor(Math.random() * 85) + 40;
        b = Math.floor(Math.random() * 35) + 12;
        ans = a - b;
      }
    }

    const choices = new Set([ans]);
    while (choices.size < 4) {
      const offset = (Math.floor(Math.random() * 7) + 1) * (Math.random() > 0.5 ? 1 : -1);
      const cand = Math.max(0, ans + offset);
      if (cand !== ans) choices.add(cand);
    }

    return {
      a,
      b,
      op,
      ans,
      visualEmoji,
      zone,
      choices: Array.from(choices).sort(() => Math.random() - 0.5)
    };
  },

  nextQuestion() {
    this.stopTimer();
    this.isLocked = false;
    const container = document.getElementById('math-game-mount');
    if (!container) return;

    if (this.questionNumber > this.totalQuestions) {
      this.renderVictory(container);
      return;
    }

    const prob = this.generateProblem();
    this.currentAnswer = prob.ans;
    const timerOn = window.FunKidsStorage.state.settings.timerEnabled;
    this.timeLeft = 20;

    let visualHelper = '';
    if (prob.zone === 'kids' && prob.a <= 10 && prob.b <= 10) {
      visualHelper = `
        <div class="flex flex-wrap items-center justify-center gap-2 my-2 bg-amber-50/90 px-4 py-2 rounded-2xl border-2 border-amber-200">
          <span>${prob.visualEmoji.repeat(prob.a)}</span>
          <span class="font-black text-rose-500 mx-1">${prob.op}</span>
          <span>${prob.visualEmoji.repeat(prob.b)}</span>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="space-y-5">
        <div class="flex flex-wrap items-center justify-between gap-3 bg-rose-50 p-4 rounded-2xl border-2 border-rose-200">
          <div class="flex items-center gap-3">
            <span class="px-3 py-1 rounded-full bg-rose-500 text-white font-black text-sm">السؤال ${this.questionNumber} / ${this.totalQuestions}</span>
            <span class="font-bold text-slate-700">🔥 سلسلة الفوز: <strong class="text-rose-600">${this.streak}</strong></span>
          </div>
          <div class="flex items-center gap-4">
            ${timerOn ? `<span id="math-timer-badge" class="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-black text-sm border border-amber-300">⏱️ ${this.timeLeft} ثانية</span>` : ''}
            <span class="font-black text-lg text-emerald-700">النقاط: ${this.score}</span>
          </div>
        </div>

        <div class="text-center py-6 px-4 bg-gradient-to-br from-white to-sky-50 rounded-3xl border-4 border-sky-200 shadow-inner">
          <p class="text-sm font-bold text-sky-700 mb-2">ما هو ناتج العملية الحسابية التالية؟</p>
          <div class="text-4xl md:text-6xl font-black text-slate-800 tracking-wider my-3" dir="ltr">
            ${prob.a} ${prob.op} ${prob.b} = ?
          </div>
          ${visualHelper}
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4" dir="ltr">
          ${prob.choices.map(c => `
            <button type="button" onclick="window.MathAdventureGame.submitAnswer(${c}, this)"
              class="btn-3d btn-secondary text-2xl md:text-3xl py-5 font-black">
              ${c}
            </button>
          `).join('')}
        </div>

        <div id="math-feedback-bar" class="hidden p-4 rounded-2xl text-center font-bold text-lg"></div>
      </div>
    `;

    if (timerOn) {
      this.timerInterval = setInterval(() => {
        this.timeLeft -= 1;
        const badge = document.getElementById('math-timer-badge');
        if (badge) badge.textContent = `⏱️ ${this.timeLeft} ثانية`;
        if (this.timeLeft <= 0) {
          this.stopTimer();
          this.submitAnswer(null, null);
        }
      }, 1000);
    }
  },

  submitAnswer(choice, btnEl) {
    if (this.isLocked) return;
    this.isLocked = true;
    this.stopTimer();

    const feedback = document.getElementById('math-feedback-bar');
    if (choice === this.currentAnswer) {
      this.streak += 1;
      const gained = 20 + this.streak * 5;
      this.score += gained;
      window.FunKidsRewards.playSound('correct');
      if (btnEl) {
        btnEl.classList.remove('btn-secondary');
        btnEl.classList.add('btn-success');
      }
      if (feedback) {
        feedback.className = 'p-4 rounded-2xl text-center font-black text-lg bg-emerald-100 text-emerald-900 border-2 border-emerald-400 block';
        feedback.textContent = `🎉 إجابة صحيحة ورائعة! +${gained} نقطة`;
      }
      window.MaxCompanion.onCorrectAnswer(`ممتاز يا بطل! الإجابة ${this.currentAnswer} صحيحة تماماً!`);
    } else {
      this.streak = 0;
      window.FunKidsRewards.playSound('wrong');
      if (btnEl) {
        btnEl.classList.remove('btn-secondary');
        btnEl.classList.add('btn-primary');
      }
      if (feedback) {
        feedback.className = 'p-4 rounded-2xl text-center font-black text-lg bg-rose-100 text-rose-900 border-2 border-rose-400 block';
        feedback.textContent = choice === null
          ? `⏰ انتهى الوقت! الإجابة الصحيحة هي ${this.currentAnswer}`
          : `💡 محاولة جيدة! الإجابة الصحيحة هي ${this.currentAnswer}`;
      }
      window.MaxCompanion.onWrongAnswer(`الإجابة الصحيحة هي ${this.currentAnswer}، ركز في السؤال القادم وستنجح بالتأكيد!`);
    }

    setTimeout(() => {
      this.questionNumber += 1;
      this.nextQuestion();
    }, 1500);
  },

  renderVictory(container) {
    const stars = this.score >= 100 ? 3 : (this.score >= 60 ? 2 : 1);
    window.FunKidsRewards.awardPoints(this.score, stars, 'math', 'إكمال جولة مغامرة الأرقام والحساب');
    window.MaxCompanion.say(`واو! أنهيت مغامرة الأرقام وحصلت على ${this.score} نقطة و ${stars} نجوم!`, 'excited', true);

    container.innerHTML = `
      <div class="text-center py-8 px-4 space-y-5 bg-gradient-to-b from-amber-50 to-white rounded-3xl border-4 border-amber-300">
        <div class="text-6xl">${'⭐'.repeat(stars)}</div>
        <h3 class="text-3xl font-black text-slate-800">أحسنت يا بطل الأرقام! 🎉</h3>
        <p class="text-lg font-bold text-slate-600">مجموع نقاطك في هذه الجولة: <span class="text-emerald-600 font-black">${this.score} نقطة</span></p>
        <div class="flex flex-wrap justify-center gap-4 pt-2">
          <button type="button" onclick="window.MathAdventureGame.start()" class="btn-3d btn-success text-lg">
            🔄 العب جولة جديدة
          </button>
        </div>
      </div>
    `;
  }
};
