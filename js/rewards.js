/* ==========================================================================
   عالم فن كيدز - نظام النقاط والمكافآت والشارات والصوتيات الواقعية (rewards.js)
   ========================================================================== */

const BADGE_CATALOG = [
  {
    id: 'first_step',
    name: 'المستكشف الشجاع',
    desc: 'بدء الرحلة في عالم فن كيدز التعليمي',
    icon: '🧭',
    color: 'from-sky-400 to-blue-600',
    reqText: 'الانضمام للمنصة'
  },
  {
    id: 'math_hero',
    name: 'بطل الأرقام الذهبي',
    desc: 'الفوز في 3 جولات داخل جزيرة الأرقام',
    icon: '🧮',
    color: 'from-rose-400 to-red-600',
    reqText: 'إكمال 3 تحديات حسابية'
  },
  {
    id: 'memory_master',
    name: 'عبقري الذاكرة الخارقة',
    desc: 'إكمال تحدي الذاكرة بنجاح ومطابقة جميع البطاقات',
    icon: '🧠',
    color: 'from-purple-400 to-indigo-600',
    reqText: 'الفوز في تحدي الذاكرة'
  },
  {
    id: 'animal_friend',
    name: 'صديق الطبيعة والحيوانات',
    desc: 'التعرف على الحيوانات وأصواتها في جزيرة المعرفة',
    icon: '🦁',
    color: 'from-emerald-400 to-green-600',
    reqText: 'الفوز في لعبة خمّن الحيوان'
  },
  {
    id: 'puzzle_solver',
    name: 'مهندس الألغاز الذكي',
    desc: 'تركيب الصور المقطعة بنجاح في مغامرة البازل',
    icon: '🧩',
    color: 'from-amber-400 to-orange-500',
    reqText: 'إكمال لوحة بازل كاملة'
  },
  {
    id: 'creative_artist',
    name: 'الفنان المبدع الصغير',
    desc: 'رسم وحفظ لوحة فنية في مرسم الإبداع',
    icon: '🎨',
    color: 'from-pink-400 to-rose-500',
    reqText: 'حفظ رسمة في المعرض'
  },
  {
    id: 'space_captain',
    name: 'قائد الفضاء والكواكب',
    desc: 'فتح 4 كواكب أو أكثر في مغامرة الفضاء',
    icon: '🚀',
    color: 'from-indigo-500 to-violet-700',
    reqText: 'فتح 4 كواكب فضائية'
  },
  {
    id: 'boys_champion',
    name: 'أسطورة ألعاب الأولاد الحركية',
    desc: 'التألق والفوز في سباق السيارات أو الروبوتات أو كرة القدم أو الديناصورات أو القوس',
    icon: '⚽',
    color: 'from-blue-500 to-cyan-600',
    reqText: 'الفوز في ألعاب الأولاد الحركية'
  },
  {
    id: 'girls_star',
    name: 'نجمة إبداع وتألق البنات',
    desc: 'التألق في بوتيك الأزياء أو الحلويات أو المجوهرات أو رعاية الأليفة أو تنسيق الزهور',
    icon: '👑',
    color: 'from-pink-500 to-fuchsia-600',
    reqText: 'الفوز في ألعاب البنات التفاعلية'
  },
  {
    id: 'super_star_500',
    name: 'نجم المجرة الأسطوري',
    desc: 'جمع 500 نقطة أو أكثر في المنصة',
    icon: '🌟',
    color: 'from-yellow-400 to-amber-600',
    reqText: 'الوصول إلى 500 نقطة'
  }
];

window.FunKidsRewards = {
  audioCtx: null,
  badges: BADGE_CATALOG,

  ensureAudio() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  },

  playSound(type) {
    const st = window.FunKidsStorage.state;
    if (!st || !st.settings.soundEnabled) return;
    try {
      this.ensureAudio();
      if (!this.audioCtx) return;
      const now = this.audioCtx.currentTime;

      if (type === 'click') {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(580, now);
        osc.frequency.exponentialRampToValueAtTime(860, now + 0.07);
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'engine') {
        // صوت محرك نيترو حركي واقعي
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(110, now);
        osc.frequency.exponentialRampToValueAtTime(360, now + 0.25);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.29);
      } else if (type === 'laser') {
        // صوت شعاع ليزر أو سهم منطلق
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(980, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.18);
        gain.gain.setValueAtTime(0.16, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.19);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'sparkle') {
        // صوت بريق سحري للمجوهرات والأزياء والزهور
        const notes = [783.99, 987.77, 1174.66, 1567.98];
        notes.forEach((freq, idx) => {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.05);
          gain.gain.setValueAtTime(0.16, now + idx * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.15);
          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(now + idx * 0.05);
          osc.stop(now + idx * 0.05 + 0.16);
        });
      } else if (type === 'correct') {
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, idx) => {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.07);
          gain.gain.setValueAtTime(0.22, now + idx * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.18);
          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(now + idx * 0.07);
          osc.stop(now + idx * 0.07 + 0.19);
        });
      } else if (type === 'wrong') {
        const notes = [311.13, 233.08];
        notes.forEach((freq, idx) => {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now + idx * 0.12);
          gain.gain.setValueAtTime(0.16, now + idx * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.2);
          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(now + idx * 0.12);
          osc.stop(now + idx * 0.12 + 0.21);
        });
      } else if (type === 'win') {
        const notes = [523.25, 659.25, 783.99, 659.25, 1046.5];
        notes.forEach((freq, idx) => {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.09);
          gain.gain.setValueAtTime(0.26, now + idx * 0.09);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.28);
          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(now + idx * 0.09);
          osc.stop(now + idx * 0.09 + 0.3);
        });
      } else if (type === 'animal') {
        const notes = [440, 660, 550, 880];
        notes.forEach((freq, idx) => {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          gain.gain.setValueAtTime(0.2, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.15);
          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.16);
        });
      }
    } catch (e) {
      // Ignore audio errors on blocked autoplay
    }
  },

  awardPoints(amount, starsEarned, gameKey, reasonText) {
    const st = window.FunKidsStorage.state;
    st.points += amount;
    st.stars += (starsEarned || 0);
    st.level = Math.max(1, Math.floor(st.points / 100) + 1);

    if (gameKey && st.completedGames[gameKey] !== undefined) {
      st.completedGames[gameKey] += 1;
      if (amount > (st.highScores[gameKey] || 0)) {
        st.highScores[gameKey] = amount;
      }
    }

    if (reasonText) {
      st.activityLog.unshift({
        title: reasonText,
        points: amount,
        date: 'الآن'
      });
      if (st.activityLog.length > 14) st.activityLog.pop();
    }

    const newlyUnlocked = this.checkBadges();
    window.FunKidsStorage.save();

    if (window.FunKidsMain && window.FunKidsMain.syncUI) {
      window.FunKidsMain.syncUI();
    }

    if (starsEarned > 0 || newlyUnlocked.length > 0) {
      this.launchCelebration(reasonText || 'أحسنت يا بطل!', amount, starsEarned, newlyUnlocked);
    }
  },

  checkBadges() {
    const st = window.FunKidsStorage.state;
    const unlocked = [];

    const tryUnlock = (id) => {
      if (!st.badges.includes(id)) {
        st.badges.push(id);
        const b = BADGE_CATALOG.find(item => item.id === id);
        if (b) unlocked.push(b);
      }
    };

    if (st.completedGames.math >= 3) tryUnlock('math_hero');
    if (st.completedGames.memory >= 2) tryUnlock('memory_master');
    if (st.completedGames.animals >= 3) tryUnlock('animal_friend');
    if (st.completedGames.puzzle >= 2) tryUnlock('puzzle_solver');
    if (st.savedDrawings.length >= 1) tryUnlock('creative_artist');
    if (st.unlockedPlanets.length >= 4) tryUnlock('space_captain');

    const boysWins = (st.completedGames.racer || 0) + (st.completedGames.robo || 0) + (st.completedGames.soccer || 0) + (st.completedGames.dino || 0) + (st.completedGames.archery || 0);
    if (boysWins >= 6) tryUnlock('boys_champion');

    const girlsWins = (st.completedGames.fashion || 0) + (st.completedGames.bakery || 0) + (st.completedGames.jewelry || 0) + (st.completedGames.petcare || 0) + (st.completedGames.garden || 0);
    if (girlsWins >= 6) tryUnlock('girls_star');

    if (st.points >= 500) tryUnlock('super_star_500');

    return unlocked;
  },

  launchCelebration(title, points, stars, newBadges) {
    this.playSound('win');
    this.fireConfetti();
    const toast = document.getElementById('celebration-toast');
    if (!toast) return;

    const titleEl = document.getElementById('celebration-title');
    const detailsEl = document.getElementById('celebration-details');
    if (titleEl) titleEl.textContent = title;
    if (detailsEl) {
      let badgeStr = '';
      if (newBadges && newBadges.length > 0) {
        badgeStr = ` • شارة جديدة: ${newBadges.map(b => b.icon + ' ' + b.name).join('، ')}`;
      }
      detailsEl.textContent = `+${points} نقطة 🌟 +${stars} نجوم${badgeStr}`;
    }

    toast.classList.remove('hidden', 'translate-y-10', 'opacity-0');
    toast.classList.add('flex');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      toast.classList.add('hidden');
      toast.classList.remove('flex');
    }, 4200);
  },

  fireConfetti() {
    const st = window.FunKidsStorage.state;
    if (st && !st.settings.animationsEnabled) return;
    const container = document.getElementById('confetti-layer');
    if (!container) return;

    const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#A855F7', '#F472B6'];
    for (let i = 0; i < 36; i++) {
      const piece = document.createElement('div');
      const size = Math.floor(Math.random() * 10) + 8;
      piece.style.position = 'fixed';
      piece.style.zIndex = '9999';
      piece.style.pointerEvents = 'none';
      piece.style.width = `${size}px`;
      piece.style.height = `${size}px`;
      piece.style.backgroundColor = colors[i % colors.length];
      piece.style.borderRadius = i % 2 === 0 ? '999px' : '3px';
      piece.style.left = `${Math.random() * 96 + 2}vw`;
      piece.style.top = '-20px';
      piece.style.transition = `transform ${1.2 + Math.random() * 1.1}s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.8s ease`;
      container.appendChild(piece);

      requestAnimationFrame(() => {
        piece.style.transform = `translate(${(Math.random() - 0.5) * 200}px, ${window.innerHeight * 0.85}px) rotate(${Math.random() * 520}deg)`;
        piece.style.opacity = '0';
      });

      setTimeout(() => {
        if (piece.parentNode) piece.parentNode.removeChild(piece);
      }, 2400);
    }
  }
};
