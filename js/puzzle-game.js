/* ==========================================================================
   عالم فن كيدز - اللعبة 4: مغامرة تركيب الصور (البازل) (puzzle-game.js)
   ========================================================================== */

const PUZZLE_THEMES = [
  {
    id: 'castle',
    title: 'قلعة الأرقام السحرية',
    pieces: [
      { pos: 0, icon: '🏰', label: 'البرج الشمالي', bg: 'bg-rose-100' },
      { pos: 1, icon: '🌈', label: 'قوس السماء', bg: 'bg-sky-100' },
      { pos: 2, icon: '☀️', label: 'شمس الجزيرة', bg: 'bg-amber-100' },
      { pos: 3, icon: '🌉', label: 'الجسر الذهبي', bg: 'bg-orange-100' },
      { pos: 4, icon: '🦊', label: 'القائد ماكس', bg: 'bg-emerald-100' },
      { pos: 5, icon: '🌳', label: 'غابة المعرفة', bg: 'bg-green-100' },
      { pos: 6, icon: '💎', label: 'كنز الذكاء', bg: 'bg-purple-100' },
      { pos: 7, icon: '⛵', label: 'سفينة المغامرة', bg: 'bg-cyan-100' },
      { pos: 8, icon: '🏝️', label: 'شاطئ المرح', bg: 'bg-yellow-100' }
    ]
  },
  {
    id: 'space',
    title: 'أسطول الفضاء والكواكب',
    pieces: [
      { pos: 0, icon: '☀️', label: 'الشمس المضيئة', bg: 'bg-amber-100' },
      { pos: 1, icon: '🌍', label: 'كوكب الأرض', bg: 'bg-sky-100' },
      { pos: 2, icon: '🌙', label: 'القمر الفضي', bg: 'bg-slate-100' },
      { pos: 3, icon: '🚀', label: 'مركبة الفضاء', bg: 'bg-rose-100' },
      { pos: 4, icon: '🪐', label: 'حلقات زحل', bg: 'bg-orange-100' },
      { pos: 5, icon: '👨‍🚀', label: 'رائد الفضاء', bg: 'bg-indigo-100' },
      { pos: 6, icon: '☄️', label: 'المذنب اللامع', bg: 'bg-purple-100' },
      { pos: 7, icon: '🛰️', label: 'القمر الصناعي', bg: 'bg-emerald-100' },
      { pos: 8, icon: '🌌', label: 'مجرة درب التبانة', bg: 'bg-violet-100' }
    ]
  }
];

window.PuzzleAdventureGame = {
  themeIndex: 0,
  board: [],
  selectedSlot: null,
  dragSourceSlot: null,
  moves: 0,

  start(themeIdx) {
    if (typeof themeIdx === 'number') this.themeIndex = themeIdx;
    const theme = PUZZLE_THEMES[this.themeIndex];
    this.board = theme.pieces.map(p => ({ ...p }));
    this.board.sort(() => Math.random() - 0.5);
    if (this.isSolved()) {
      const tmp = this.board[0];
      this.board[0] = this.board[1];
      this.board[1] = tmp;
    }
    this.selectedSlot = null;
    this.dragSourceSlot = null;
    this.moves = 0;

    window.MaxCompanion.say(
      'اسحب القطع وأفلتها في مكانها الصحيح (من 1 إلى 9)، أو اضغط على قطعتين لتبديل مكانهما حتى تكتمل اللوحة!',
      'explaining',
      false
    );
    this.render();
  },

  isSolved() {
    return this.board.every((piece, index) => piece.pos === index);
  },

  onDragStart(slotIndex) {
    this.dragSourceSlot = slotIndex;
  },

  onDropSlot(targetIndex) {
    if (this.dragSourceSlot === null || this.dragSourceSlot === targetIndex) return;
    this.swapSlots(this.dragSourceSlot, targetIndex);
    this.dragSourceSlot = null;
  },

  onTapSlot(slotIndex) {
    window.FunKidsRewards.playSound('click');
    if (this.selectedSlot === null) {
      this.selectedSlot = slotIndex;
      this.render();
    } else if (this.selectedSlot === slotIndex) {
      this.selectedSlot = null;
      this.render();
    } else {
      this.swapSlots(this.selectedSlot, slotIndex);
      this.selectedSlot = null;
    }
  },

  swapSlots(i, j) {
    const tmp = this.board[i];
    this.board[i] = this.board[j];
    this.board[j] = tmp;
    this.moves += 1;

    if (this.board[i].pos === i || this.board[j].pos === j) {
      window.FunKidsRewards.playSound('correct');
    } else {
      window.FunKidsRewards.playSound('click');
    }

    this.render();
    if (this.isSolved()) {
      setTimeout(() => this.handleWin(), 350);
    }
  },

  solveHint() {
    const wrongIdx = this.board.findIndex((p, idx) => p.pos !== idx);
    if (wrongIdx === -1) return;
    const correctCurrentSlot = this.board.findIndex(p => p.pos === wrongIdx);
    if (correctCurrentSlot !== -1) {
      window.MaxCompanion.say('ها قد ساعدتك في وضع قطعة في مكانها الصحيح! أكمل الباقي يا بطل 🌟', 'happy', true);
      this.swapSlots(wrongIdx, correctCurrentSlot);
    }
  },

  handleWin() {
    const container = document.getElementById('puzzle-game-mount');
    const score = Math.max(80, 180 - this.moves * 4);
    window.FunKidsRewards.awardPoints(score, 3, 'puzzle', 'إكمال لوحة مغامرة تركيب الصور (البازل) بنجاح');
    if (!container) return;

    container.innerHTML = `
      <div class="text-center py-8 px-4 space-y-4 bg-gradient-to-b from-amber-50 to-white rounded-3xl border-4 border-amber-300">
        <div class="text-6xl">🧩🏆⭐⭐⭐</div>
        <h3 class="text-3xl font-black text-slate-800">اكتملت اللوحة بنجاح!</h3>
        <p class="text-lg font-bold text-slate-600">رتبت جميع القطع في ${this.moves} خطوة وربحت <span class="text-amber-600 font-black">${score} نقطة</span>!</p>
        <div class="flex flex-wrap justify-center gap-3">
          <button type="button" onclick="window.PuzzleAdventureGame.start(0)" class="btn-3d btn-accent text-base">🏰 لوحة القلعة</button>
          <button type="button" onclick="window.PuzzleAdventureGame.start(1)" class="btn-3d btn-secondary text-base">🚀 لوحة الفضاء</button>
        </div>
      </div>
    `;
  },

  render() {
    const container = document.getElementById('puzzle-game-mount');
    if (!container) return;
    const theme = PUZZLE_THEMES[this.themeIndex];
    const correctCount = this.board.filter((p, idx) => p.pos === idx).length;

    container.innerHTML = `
      <div class="space-y-5">
        <div class="flex flex-wrap items-center justify-between gap-3 bg-amber-50 p-4 rounded-2xl border-2 border-amber-200">
          <div class="flex flex-wrap items-center gap-2">
            <span class="px-3 py-1 rounded-full bg-amber-500 text-white font-black text-sm">${theme.title}</span>
            <span class="font-bold text-slate-700">القطع الصحيحة: <strong class="text-emerald-600">${correctCount} / 9</strong></span>
            <span class="font-bold text-slate-700">الخطوات: <strong>${this.moves}</strong></span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" onclick="window.PuzzleAdventureGame.solveHint()" class="btn-3d btn-accent text-xs py-2 px-3">💡 مساعدة من ماكس</button>
            <button type="button" onclick="window.PuzzleAdventureGame.start(${(this.themeIndex + 1) % PUZZLE_THEMES.length})" class="btn-3d btn-secondary text-xs py-2 px-3">🔄 تغيير الصورة</button>
          </div>
        </div>

        <p class="text-sm font-bold text-slate-600 text-center">
          اسحب أي قطعة بالماوس وأفلتها فوق قطعة أخرى، أو اضغط على قطعتين متتاليتين لتبديل مكانهما بحيث تصبح الأرقام مرتبة من 1 إلى 9!
        </p>

        <div class="grid grid-cols-3 gap-3 max-w-lg mx-auto">
          ${this.board.map((piece, slotIndex) => {
            const isCorrect = piece.pos === slotIndex;
            const isSelected = this.selectedSlot === slotIndex;
            return `
              <div draggable="true"
                ondragstart="window.PuzzleAdventureGame.onDragStart(${slotIndex})"
                ondragover="event.preventDefault()"
                ondrop="window.PuzzleAdventureGame.onDropSlot(${slotIndex})"
                onclick="window.PuzzleAdventureGame.onTapSlot(${slotIndex})"
                class="puzzle-tile ${piece.bg} ${isCorrect ? 'correct-pos ring-2 ring-emerald-400' : ''} ${isSelected ? 'selected-tile' : ''} p-3 text-center">
                <div class="flex items-center justify-between w-full text-xs font-black px-1 mb-1">
                  <span class="px-2 py-0.5 rounded-full ${isCorrect ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-700'}">#${piece.pos + 1}</span>
                  <span>${isCorrect ? '✅' : '🔄'}</span>
                </div>
                <div class="text-4xl my-1">${piece.icon}</div>
                <div class="text-xs font-extrabold text-slate-800">${piece.label}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }
};
