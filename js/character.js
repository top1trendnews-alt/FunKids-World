/* ==========================================================================
   عالم فن كيدز - المرشد الكرتوني التفاعلي "ماكس" (character.js)
   فقاعات محادثة، تعبيرات وجه، تشجيع، ونطق صوتي عربي عبر Web Speech API
   ========================================================================== */

const MAX_EXPRESSIONS = {
  happy: { emoji: '🦊✨', moodLabel: 'سعيد ومتحمس', animClass: 'animate-max-happy' },
  excited: { emoji: '🦊🎉', moodLabel: 'يحتفل معك!', animClass: 'animate-max-cheer' },
  thinking: { emoji: '🦊🤔', moodLabel: 'يفكر في الحل...', animClass: '' },
  encouraging: { emoji: '🦊💪', moodLabel: 'يشجعك بقوة!', animClass: 'animate-max-happy' },
  explaining: { emoji: '🦊🎓', moodLabel: 'يشرح القواعد', animClass: '' }
};

const MAX_TIPS = [
  'مرحباً بك في عالم فن كيدز! أنا صديقك ماكس الثعلب المستكشف، اضغط على أي جزيرة أو لعبة لنبدأ المغامرة معاً!',
  'جديد! أضفنا ألعاباً خاصة للأولاد (سباق الأبطال الذكي ومختبر الروبوتات) وألعاباً خاصة للبنات (بوتيك الأميرات وشيف الحلويات)!',
  'هل تعلم؟ يمكنك تغيير الفئة العمرية (من 5 إلى 7، أو من 8 إلى 11، أو من 12 إلى 15 سنة) لتتناسب صعوبة الألعاب مع عمرك!',
  'في جزيرة الأرقام، كل إجابة متتالية صحيحة تمنحك نقاطاً إضافية ونجوماً ذهبية!',
  'جرب زيارة جزيرة الإبداع لترسم لوحتك الخاصة وتحفظها في معرضك المحلي!'
];

window.MaxCompanion = {
  currentMood: 'happy',
  tipIndex: 0,

  say(message, mood = 'happy', speakAloud = true) {
    this.currentMood = mood;
    const expr = MAX_EXPRESSIONS[mood] || MAX_EXPRESSIONS.happy;

    const bubbles = document.querySelectorAll('.max-speech-text');
    bubbles.forEach(el => {
      el.textContent = message;
    });

    const moodBadges = document.querySelectorAll('.max-mood-badge');
    moodBadges.forEach(el => {
      el.textContent = `${expr.emoji} ${expr.moodLabel}`;
    });

    const avatars = document.querySelectorAll('.max-avatar-wrap');
    avatars.forEach(el => {
      el.classList.remove('animate-max-happy', 'animate-max-cheer');
      if (expr.animClass) {
        void el.offsetWidth;
        el.classList.add(expr.animClass);
      }
    });

    if (speakAloud) {
      this.speak(message);
    }
  },

  speak(text) {
    const st = window.FunKidsStorage && window.FunKidsStorage.state;
    if (st && !st.settings.voiceEnabled) return;
    if (!('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = 1.02;
      utterance.pitch = 1.15;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      // Ignore Web Speech API errors
    }
  },

  nextTip() {
    window.FunKidsRewards.playSound('click');
    this.tipIndex = (this.tipIndex + 1) % MAX_TIPS.length;
    const moods = ['happy', 'explaining', 'encouraging', 'excited'];
    this.say(MAX_TIPS[this.tipIndex], moods[this.tipIndex % moods.length], true);
  },

  greetPlayer() {
    const st = window.FunKidsStorage.state;
    const zoneNames = {
      kids: 'واحة الصغار (5-7 سنوات)',
      junior: 'واحة الناشئين (8-11 سنة)',
      teen: 'واحة اليافعين (12-15 سنة)'
    };
    const msg = `مرحباً بك في عالم فن كيدز! أهلاً بك يا ${st.playerName} في ${zoneNames[st.ageZone] || 'عالم المرح'}! لديك الآن ${st.points} نقطة. هيا نلعب!`;
    this.say(msg, 'excited', true);
  },

  onCorrectAnswer(customMsg) {
    const praises = [
      'إجابة عبقرية وصحيحة! أنت بطل رائع 🌟',
      'يا سلام! تفكير ذكي وسريع جداً 🎉',
      'أحسنت يا صديقي! نجمة ذهبية جديدة لك 🚀'
    ];
    const msg = customMsg || praises[Math.floor(Math.random() * praises.length)];
    this.say(msg, 'excited', true);
  },

  onWrongAnswer(hintMsg) {
    const msg = hintMsg || 'لا بأس يا بطل! المحاولة جزء من التعلم، فكر بهدوء وجرب مرة أخرى 💪';
    this.say(msg, 'encouraging', true);
  }
};
