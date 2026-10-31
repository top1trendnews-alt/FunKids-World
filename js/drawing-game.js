/* ==========================================================================
   عالم فن كيدز - اللعبة 5: المرسم الإبداعي الحر (drawing-game.js)
   ========================================================================== */

const PALETTE_COLORS = [
  '#FF5252', '#FF922B', '#FCC419', '#51CF66',
  '#339AF0', '#845EF7', '#F06595', '#20C997',
  '#8B5CF6', '#1E293B', '#FFFFFF'
];

const STAMPS = [
  { icon: '🦊', label: 'ماكس' },
  { icon: '⭐', label: 'نجمة' },
  { icon: '🚀', label: 'صاروخ' },
  { icon: '👑', label: 'تاج' },
  { icon: '🌈', label: 'قوس قزح' },
  { icon: '🦋', label: 'فراشة' },
  { icon: '🦖', label: 'ديناصور' },
  { icon: '❤️', label: 'قلب' }
];

window.CreativeDrawingGame = {
  canvas: null,
  ctx: null,
  isDrawing: false,
  color: '#FF5252',
  brushSize: 8,
  activeStamp: null,
  lastX: 0,
  lastY: 0,

  start() {
    const container = document.getElementById('drawing-game-mount');
    if (!container) return;

    container.innerHTML = `
      <div class="space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-3 bg-orange-50 p-4 rounded-2xl border-2 border-orange-200">
          <div class="flex flex-wrap items-center gap-2">
            ${PALETTE_COLORS.map(c => `
              <button type="button"
                onclick="window.CreativeDrawingGame.setColor('${c}', this)"
                style="background-color: ${c};"
                class="color-swatch ${c === this.color ? 'active' : ''}"
                title="لون ${c}"></button>
            `).join('')}
          </div>
          <div class="flex items-center gap-2">
            <label class="text-xs font-black text-slate-700">حجم الفرشاة:</label>
            <input type="range" min="3" max="28" value="${this.brushSize}"
              oninput="window.CreativeDrawingGame.setBrushSize(this.value)"
              class="w-24 accent-rose-500 cursor-pointer" />
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-2 bg-white/90 p-3 rounded-2xl border-2 border-slate-200">
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-xs font-black text-slate-600 ml-1">ملصقات وأشكال:</span>
            <button type="button" onclick="window.CreativeDrawingGame.setStamp(null, this)"
              class="stamp-btn px-3 py-1.5 rounded-full text-xs font-black bg-rose-500 text-white">🖌️ فرشاة حرة</button>
            ${STAMPS.map(st => `
              <button type="button" onclick="window.CreativeDrawingGame.setStamp('${st.icon}', this)"
                class="stamp-btn px-3 py-1.5 rounded-full text-xs font-bold bg-slate-100 hover:bg-amber-100 text-slate-800">
                ${st.icon} ${st.label}
              </button>
            `).join('')}
          </div>
          <div class="flex items-center gap-2">
            <button type="button" onclick="window.CreativeDrawingGame.drawTemplate()" class="btn-3d btn-secondary text-xs py-1.5 px-3">🤖 قالب شخصية للتلوين</button>
            <button type="button" onclick="window.CreativeDrawingGame.clearCanvas()" class="btn-3d btn-primary text-xs py-1.5 px-3">🗑️ مسح اللوحة</button>
            <button type="button" onclick="window.CreativeDrawingGame.saveArtwork()" class="btn-3d btn-success text-xs py-1.5 px-4">💾 حفظ الرسمة (+40 نقطة)</button>
          </div>
        </div>

        <div class="drawing-canvas-wrap">
          <canvas id="funkids-drawing-canvas" class="w-full h-[340px] block cursor-crosshair"></canvas>
        </div>

        <div id="saved-drawings-gallery" class="pt-2"></div>
      </div>
    `;

    this.initCanvas();
    this.renderGallery();
    window.MaxCompanion.say(
      'أهلاً بك في المرسم الإبداعي الحر! اختر الألوان أو الملصقات الكرتونية، أو اضغط على قالب الشخصية لتلوينه ثم احفظ لوحتك!',
      'explaining',
      false
    );
  },

  initCanvas() {
    this.canvas = document.getElementById('funkids-drawing-canvas');
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = Math.max(580, Math.floor(rect.width || 640));
    this.canvas.height = 340;
    this.ctx = this.canvas.getContext('2d');
    this.fillWhiteBackground();

    const getPos = (e) => {
      const r = this.canvas.getBoundingClientRect();
      const scaleX = this.canvas.width / r.width;
      const scaleY = this.canvas.height / r.height;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: (clientX - r.left) * scaleX,
        y: (clientY - r.top) * scaleY
      };
    };

    const startDraw = (e) => {
      e.preventDefault();
      const pos = getPos(e);
      if (this.activeStamp) {
        this.ctx.font = `${Math.max(32, this.brushSize * 3)}px sans-serif`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(this.activeStamp, pos.x, pos.y);
        window.FunKidsRewards.playSound('click');
        return;
      }
      this.isDrawing = true;
      this.lastX = pos.x;
      this.lastY = pos.y;
    };

    const moveDraw = (e) => {
      if (!this.isDrawing || this.activeStamp) return;
      e.preventDefault();
      const pos = getPos(e);
      this.ctx.beginPath();
      this.ctx.moveTo(this.lastX, this.lastY);
      this.ctx.lineTo(pos.x, pos.y);
      this.ctx.strokeStyle = this.color;
      this.ctx.lineWidth = this.brushSize;
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';
      this.ctx.stroke();
      this.lastX = pos.x;
      this.lastY = pos.y;
    };

    const endDraw = () => {
      this.isDrawing = false;
    };

    this.canvas.addEventListener('mousedown', startDraw);
    this.canvas.addEventListener('mousemove', moveDraw);
    window.addEventListener('mouseup', endDraw);
    this.canvas.addEventListener('touchstart', startDraw, { passive: false });
    this.canvas.addEventListener('touchmove', moveDraw, { passive: false });
    this.canvas.addEventListener('touchend', endDraw);
  },

  fillWhiteBackground() {
    if (!this.ctx || !this.canvas) return;
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  },

  setColor(c, btn) {
    this.color = c;
    this.activeStamp = null;
    document.querySelectorAll('.color-swatch').forEach(el => el.classList.remove('active'));
    if (btn) btn.classList.add('active');
    window.FunKidsRewards.playSound('click');
  },

  setBrushSize(val) {
    this.brushSize = Number(val) || 8;
  },

  setStamp(stamp, btn) {
    this.activeStamp = stamp;
    document.querySelectorAll('.stamp-btn').forEach(el => {
      el.classList.remove('bg-rose-500', 'text-white');
      el.classList.add('bg-slate-100', 'text-slate-800');
    });
    if (btn) {
      btn.classList.remove('bg-slate-100', 'text-slate-800');
      btn.classList.add('bg-rose-500', 'text-white');
    }
    window.FunKidsRewards.playSound('click');
  },

  drawTemplate() {
    if (!this.ctx || !this.canvas) return;
    this.fillWhiteBackground();
    const cx = this.canvas.width / 2;
    const cy = this.canvas.height / 2;
    this.ctx.strokeStyle = '#334155';
    this.ctx.lineWidth = 4;

    this.ctx.strokeRect(cx - 55, cy - 85, 110, 90);
    this.ctx.beginPath();
    this.ctx.arc(cx - 22, cy - 45, 12, 0, Math.PI * 2);
    this.ctx.arc(cx + 22, cy - 45, 12, 0, Math.PI * 2);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.arc(cx, cy - 22, 24, 0.15 * Math.PI, 0.85 * Math.PI);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(cx, cy - 85);
    this.ctx.lineTo(cx, cy - 115);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.arc(cx, cy - 122, 9, 0, Math.PI * 2);
    this.ctx.stroke();

    this.ctx.strokeRect(cx - 70, cy + 15, 140, 105);
    window.FunKidsRewards.playSound('correct');
    window.MaxCompanion.say('لقد رسمت لك قالب الروبوت اللطيف! استخدم الفرشاة والألوان لتلوينه بطريقتك الخاصة 🎨', 'happy', true);
  },

  clearCanvas() {
    this.fillWhiteBackground();
    window.FunKidsRewards.playSound('click');
    window.MaxCompanion.say('تم مسح اللوحة! يمكنك الآن البدء برسم فكرة جديدة كلياً ✨', 'happy', false);
  },

  saveArtwork() {
    if (!this.canvas) return;
    const dataUrl = this.canvas.toDataURL('image/png');
    window.FunKidsStorage.saveDrawing(dataUrl, 'لوحة إبداعية ' + (window.FunKidsStorage.state.savedDrawings.length + 1));
    window.FunKidsRewards.awardPoints(40, 2, 'drawing', 'حفظ لوحة فنية في جزيرة الإبداع');
    window.MaxCompanion.say('لوحة فنية مذهلة! تم حفظها في معرض رسوماتك وحصلت على 40 نقطة وشارات إبداعية!', 'excited', true);
    this.renderGallery();
  },

  renderGallery() {
    const gal = document.getElementById('saved-drawings-gallery');
    if (!gal) return;
    const list = (window.FunKidsStorage.state && window.FunKidsStorage.state.savedDrawings) || [];
    if (list.length === 0) {
      gal.innerHTML = `<p class="text-xs font-bold text-slate-500 text-center">لم تقم بحفظ أي رسومات بعد — ارسم لوحتك الأولى واضغط على "حفظ الرسمة"!</p>`;
      return;
    }

    gal.innerHTML = `
      <div class="space-y-2">
        <h4 class="font-black text-sm text-slate-700">🖼️ معرض رسوماتي المحفوظة محلياً (${list.length}):</h4>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          ${list.map(item => `
            <div class="bg-white p-2 rounded-2xl border-2 border-slate-200 shadow-sm text-center">
              <img src="${item.dataUrl}" alt="${item.title}" class="w-full h-24 object-contain rounded-xl border border-slate-100 bg-white" />
              <div class="text-xs font-black text-slate-700 mt-1">${item.title}</div>
              <a href="${item.dataUrl}" download="${item.title}.png" class="text-[11px] font-bold text-sky-600 hover:underline">⬇️ تحميل الصورة</a>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
};
