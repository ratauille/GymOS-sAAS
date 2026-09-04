/**
 * GymOS Luxury Edition - Core Application Engine & Coach Shell Terminal
 * High-performance UI/UX logic, TDEE calculator, Workout Generator, Biomechanics & PayPal SDK
 */

(function () {
  'use strict';

  // --- STATE MANAGEMENT ---
  const STORAGE_KEY_LEADS = 'gymos_leads_v3';
  const STORAGE_KEY_LOADS = 'gymos_loads_v3';
  const STORAGE_KEY_USER  = 'gymos_user_v3';
  const STORAGE_KEY_CHECKINS = 'gymos_checkins_v3';

  let state = {
    user: {
      name: 'Carlos Mendoza',
      age: 29,
      gender: 'male',
      weight: 76.4,
      targetWeight: 74.0,
      height: 178,
      activity: 1.55,
      goal: 'fatloss',
      dietType: 'omnivore',
      tdee: 2650,
      targetCalories: 2120,
      protein: 172,
      carbs: 205,
      fat: 60,
      membership: 'Plan Mensual Élite',
      paymentStatus: 'Activo'
    },
    checkins: JSON.parse(localStorage.getItem(STORAGE_KEY_CHECKINS)) || [
      { week: 1, date: '2026-08-01', weight: 78.5, waistCm: 88, adherencePct: 92, pressLoadKg: 70, squatLoadKg: 100, status: 'Verificado' },
      { week: 2, date: '2026-08-08', weight: 77.8, waistCm: 87, adherencePct: 95, pressLoadKg: 72.5, squatLoadKg: 105, status: 'Verificado' },
      { week: 3, date: '2026-08-15', weight: 77.1, waistCm: 86, adherencePct: 90, pressLoadKg: 75, squatLoadKg: 110, status: 'Verificado' },
      { week: 4, date: '2026-08-22', weight: 76.4, waistCm: 85, adherencePct: 96, pressLoadKg: 77.5, squatLoadKg: 112.5, status: 'Élite Verificado' }
    ],
    leads: JSON.parse(localStorage.getItem(STORAGE_KEY_LEADS)) || [
      {
        id: 'lead-101',
        date: '2026-09-01',
        name: 'Elena Rostova',
        email: 'elena.rostova@luxury.com',
        phone: '+52 55 9876 5432',
        goal: 'Hipertrofia & Masa Muscular Élite',
        planInterest: 'Plan Mensual Élite ($89 USD)',
        status: 'Contactado'
      },
      {
        id: 'lead-102',
        date: '2026-09-02',
        name: 'Mateo Valenzuela',
        email: 'm.valenzuela@tech.io',
        phone: '+52 81 1234 9988',
        goal: 'Pérdida de Grasa & Definición',
        planInterest: 'Plan Semanal VIP ($29 USD)',
        status: 'Nuevo'
      },
      {
        id: 'lead-103',
        date: '2026-08-28',
        name: 'Sofia Alarcón',
        email: 'sofia.a@design.net',
        phone: '+52 33 4455 6677',
        goal: 'Recomposición Física & Biomecánica',
        planInterest: 'Licencia GymOS Pro ($199 USD)',
        status: 'Suscrito VIP'
      }
    ],
    workoutLoads: JSON.parse(localStorage.getItem(STORAGE_KEY_LOADS)) || {}
  };

  // --- HELPER FUNCTIONS ---
  const $ = selector => document.querySelector(selector);
  const $$ = selector => Array.from(document.querySelectorAll(selector));

  function showToast(message, icon = 'fa-circle-check') {
    const container = $('#toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid ${icon} text-gold"></i> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(state.leads));
    localStorage.setItem(STORAGE_KEY_LOADS, JSON.stringify(state.workoutLoads));
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(state.user));
    localStorage.setItem(STORAGE_KEY_CHECKINS, JSON.stringify(state.checkins));
  }

  // --- 1. CINEMATIC MOTIVATIONAL HERO CAROUSEL ---
  function initHeroCarousel() {
    const quotes = $$('.quote-item');
    const indicators = $$('.indicator');
    if (!quotes.length) return;

    let currentIndex = 0;
    let carouselInterval;

    function goToSlide(index) {
      quotes.forEach((q, i) => {
        q.classList.toggle('active', i === index);
      });
      indicators.forEach((ind, i) => {
        ind.classList.toggle('active', i === index);
      });
      currentIndex = index;
    }

    function nextSlide() {
      const nextIndex = (currentIndex + 1) % quotes.length;
      goToSlide(nextIndex);
    }

    function startAutoPlay() {
      carouselInterval = setInterval(nextSlide, 5000);
    }

    indicators.forEach(ind => {
      ind.addEventListener('click', () => {
        clearInterval(carouselInterval);
        const idx = parseInt(ind.dataset.index, 10);
        goToSlide(idx);
        startAutoPlay();
      });
    });

    startAutoPlay();
  }

  // --- 2. SINGLE PAGE TAB NAVIGATION & DROPDOWN MENUS ---
  function initNavigation() {
    const navButtons = $$('.nav-btn');
    const sections = $$('.app-section');

    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.dataset.target;

        navButtons.forEach(b => b.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));

        btn.classList.add('active');
        const targetSection = $(`#${targetId}`);
        if (targetSection) {
          targetSection.classList.add('active');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Close parent dropdown menu if present
        $$('.nav-dropdown').forEach(d => d.classList.remove('active'));
      });
    });

    // Dropdown toggle logic
    $$('.nav-dropdown-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const parent = btn.closest('.nav-dropdown');
        const wasActive = parent.classList.contains('active');
        $$('.nav-dropdown').forEach(d => d.classList.remove('active'));
        if (!wasActive) parent.classList.add('active');
      });
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-dropdown')) {
        $$('.nav-dropdown').forEach(d => d.classList.remove('active'));
      }
    });

    $('#openCheckoutNavBtn')?.addEventListener('click', () => {
      const checkoutBtn = $('[data-target="section-checkout"]');
      if (checkoutBtn) checkoutBtn.click();
    });
  }

  // --- 3. TERMINAL COACH SHELL INTERACTIVE ENGINE ---
  function appendTerminalLine(text, type = 'term-line') {
    const termBody = $('#terminalOutput');
    if (!termBody) return;
    const line = document.createElement('div');
    line.className = `term-line ${type}`;
    line.textContent = text;
    termBody.appendChild(line);
    termBody.scrollTop = termBody.scrollHeight;
  }

  function processCoachCommand(cmdStr) {
    const cleanCmd = cmdStr.trim();
    if (!cleanCmd) return;

    appendTerminalLine(`GymOS-Coach> ${cleanCmd}`, 'term-prompt');

    const parts = cleanCmd.split(' ');
    const mainAction = parts[0].toLowerCase();
    const subAction = parts[1] ? parts[1].toLowerCase() : '';

    if (mainAction === 'help') {
      appendTerminalLine('--- COMANDOS DISPONIBLES EN GYMOS COACH SHELL ---', 'term-intro');
      appendTerminalLine('  checkin list             : Despliega la matriz de check-ins por tiempo.');
      appendTerminalLine('  checkin add <peso> <cintura> : Registra un nuevo check-in semanal.');
      appendTerminalLine('  achievements             : Evalúa y desbloquea insignias verificables.');
      appendTerminalLine('  diet generate            : Calcula dieta con gramajes exactos.');
      appendTerminalLine('  routine generate         : Muestra rutina y guías biomecánicas.');
      appendTerminalLine('  client info              : Muestra la información del cliente activo.');
      appendTerminalLine('  clear                    : Limpia la pantalla de la terminal.');
      return;
    }

    if (mainAction === 'clear') {
      const termBody = $('#terminalOutput');
      if (termBody) termBody.innerHTML = '';
      appendTerminalLine('GymOS Coach Shell — Consola Limpiada', 'term-intro');
      return;
    }

    if (mainAction === 'checkin') {
      if (subAction === 'list') {
        appendTerminalLine(`--- HISTORIAL DE CHECK-INS PARA ${state.user.name.toUpperCase()} ---`, 'term-intro');
        state.checkins.forEach(c => {
          appendTerminalLine(`  Semana ${c.week} (${c.date}): Peso: ${c.weight}kg | Cintura: ${c.waistCm}cm | Adherencia: ${c.adherencePct}% | Press: ${c.pressLoadKg}kg`);
        });
        return;
      }

      if (subAction === 'add') {
        const weight = parseFloat(parts[2]) || state.user.weight;
        const waist = parseFloat(parts[3]) || 85;
        const nextW = state.checkins.length + 1;

        const newCheckin = {
          week: nextW,
          date: new Date().toISOString().slice(0, 10),
          weight: weight,
          waistCm: waist,
          adherencePct: 95,
          pressLoadKg: 77.5 + (nextW * 1.5),
          squatLoadKg: 110 + (nextW * 2.5),
          status: 'Verificado'
        };

        state.checkins.push(newCheckin);
        state.user.weight = weight;
        saveState();
        renderCheckinsTable();

        appendTerminalLine(`[ÉXITO] Check-in Semana ${nextW} registrado: ${weight}kg, ${waist}cm cintura.`, 'term-success');
        showToast(`Check-in Semana ${nextW} registrado exitosamente`, 'fa-circle-check');
        return;
      }
    }

    if (mainAction === 'achievements') {
      appendTerminalLine(`--- MATRIZ DE LOGROS VERIFICABLES: ${state.user.name.toUpperCase()} ---`, 'term-intro');
      appendTerminalLine('  [LOGRO #1] 🏆 Adherencia Nutricional Élite (>90% en 4 semanas).', 'term-success');
      appendTerminalLine('  [LOGRO #2] ⚡ Sobrecarga Progresiva (+7.5kg en Press Plano).', 'term-success');
      appendTerminalLine('  [LOGRO #3] 📉 Recomposición Corporal (-3.0cm de cintura).', 'term-success');
      appendTerminalLine('  [LOGRO #4] 🎖️ Consistencia de Asistencia (100% asistencias).', 'term-success');
      return;
    }

    if (mainAction === 'diet') {
      appendTerminalLine(`--- PRESCRIPCIÓN NUTRICIONAL COACH (${state.user.targetCalories} kcal/día) ---`, 'term-intro');
      appendTerminalLine('  Desayuno : 120g Huevos Enteros + 60g Avena + 80g Berries');
      appendTerminalLine('  Colación : 200g Yogur Griego 0% + 20g Almendras Tostadas');
      appendTerminalLine('  Comida   : 180g Pechuga de Pollo + 180g Arroz Basmati + 10g AOV');
      appendTerminalLine('  Merienda : 35g Whey Isolate + 150g Manzana Verde');
      appendTerminalLine('  Cena     : 170g Salmón Noruego + 180g Camote + 150g Espinacas');
      return;
    }

    if (mainAction === 'routine') {
      appendTerminalLine('--- PRESCRIPCIÓN BIOMECÁNICA POR GRUPO MUSCULAR ---', 'term-intro');
      appendTerminalLine('  • Press Pecho plano: 4x8-10 (RIR 1). Cue: Depresión escapular.');
      appendTerminalLine('  • Jalón al Pecho: 4x10-12 (RIR 2). Cue: Codos hacia crestas ilíacas.');
      appendTerminalLine('  • Prensa Lineal: 4x8-10 (RIR 1). Cue: Pelvis fija contra respaldo.');
      appendTerminalLine('  • Peso Muerto Rumano: 4x8-10 (RIR 2). Cue: Bisagra de cadera limpia.');
      return;
    }

    if (mainAction === 'client') {
      appendTerminalLine(`--- FICHA DE CLIENTE ACTIVO ---`, 'term-intro');
      appendTerminalLine(`  Nombre: ${state.user.name} | Edad: ${state.user.age} años | Estatus: ${state.user.membership}`);
      appendTerminalLine(`  Peso Inicial: 78.5kg | Peso Actual: ${state.user.weight}kg | Meta: ${state.user.targetWeight}kg`);
      return;
    }

    appendTerminalLine(`Comando no reconocido '${cleanCmd}'. Escriba 'help' para ver la lista de comandos.`, 'term-muted');
  }

  function renderCheckinsTable() {
    const tbody = $('#checkinsTableBody');
    if (!tbody) return;

    tbody.innerHTML = state.checkins.map(c => `
      <tr>
        <td><strong>Semana ${c.week}</strong></td>
        <td><span class="fs-xs text-muted">${c.date}</span></td>
        <td><b>${c.weight} kg</b></td>
        <td>${c.waistCm} cm</td>
        <td><span class="badge badge-success">${c.adherencePct}%</span></td>
        <td><b>${c.pressLoadKg} kg</b></td>
        <td><b>${c.squatLoadKg} kg</b></td>
        <td><span class="badge badge-cobalt"><i class="fa-solid fa-certificate text-gold"></i> ${c.status}</span></td>
      </tr>
    `).join('');
  }

  function initCoachShellUI() {
    const input = $('#terminalInput');
    const sendBtn = $('#terminalSendBtn');
    const clearBtn = $('#shellClearBtn');
    const helpBtn = $('#shellHelpBtn');
    const addCheckinBtn = $('#addCheckinBtn');

    sendBtn?.addEventListener('click', () => {
      if (input && input.value) {
        processCoachCommand(input.value);
        input.value = '';
      }
    });

    input?.addEventListener('keydown', e => {
      if (e.key === 'Enter' && input.value) {
        processCoachCommand(input.value);
        input.value = '';
      }
    });

    clearBtn?.addEventListener('click', () => processCoachCommand('clear'));
    helpBtn?.addEventListener('click', () => processCoachCommand('help'));

    $$('.shell-quick-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cmd = btn.dataset.cmd;
        processCoachCommand(cmd);
      });
    });

    addCheckinBtn?.addEventListener('click', () => {
      const nextW = state.checkins.length + 1;
      const newWeight = (state.user.weight - 0.6).toFixed(1);
      const newWaist = (85 - 0.5 * nextW).toFixed(1);

      processCoachCommand(`checkin add ${newWeight} ${newWaist}`);
    });

    renderCheckinsTable();
  }

  // --- 4. MOTOR DE NUTRICIÓN (TDEE & DIETA POR GRAMOS) ---
  const FOOD_DATABASE = {
    omnivore: {
      breakfast: [
        { name: 'Huevos Enteros Orgánicos', baseGrams: 120, kcalPerG: 1.45, p: 0.13, c: 0.01, f: 0.10 },
        { name: 'Avena Molida en Frío', baseGrams: 60, kcalPerG: 3.8, p: 0.13, c: 0.67, f: 0.07 },
        { name: 'Berries Mixtos (Arándanos/Fresas)', baseGrams: 80, kcalPerG: 0.5, p: 0.01, c: 0.12, f: 0.00 }
      ],
      snackAM: [
        { name: 'Yogur Griego Natural 0% Grasa', baseGrams: 200, kcalPerG: 0.6, p: 0.10, c: 0.04, f: 0.00 },
        { name: 'Almendras Tostadas en Lascas', baseGrams: 20, kcalPerG: 5.8, p: 0.21, c: 0.22, f: 0.50 }
      ],
      lunch: [
        { name: 'Pechuga de Pollo al Limón & Hierbas (Cocida)', baseGrams: 180, kcalPerG: 1.65, p: 0.31, c: 0.00, f: 0.03 },
        { name: 'Arroz Jasmine o Basmati al Vapor', baseGrams: 180, kcalPerG: 1.30, p: 0.03, c: 0.28, f: 0.00 },
        { name: 'Aceite de Oliva Extra Virgen (AOV)', baseGrams: 10, kcalPerG: 8.84, p: 0.00, c: 0.00, f: 1.00 },
        { name: 'Aspárragos Verde Élite a la Parrilla', baseGrams: 150, kcalPerG: 0.20, p: 0.02, c: 0.04, f: 0.00 }
      ],
      snackPM: [
        { name: 'Aislado de Proteína de Suero (Whey Isolate)', baseGrams: 35, kcalPerG: 3.7, p: 0.85, c: 0.05, f: 0.02 },
        { name: 'Manzana Verde Crispy', baseGrams: 150, kcalPerG: 0.52, p: 0.00, c: 0.14, f: 0.00 }
      ],
      dinner: [
        { name: 'Filete de Salmón Noruego a la Plancha', baseGrams: 170, kcalPerG: 2.06, p: 0.22, c: 0.00, f: 0.13 },
        { name: 'Camote/Batata Horneado con Canela', baseGrams: 180, kcalPerG: 0.86, p: 0.02, c: 0.20, f: 0.00 },
        { name: 'Ensalada Verde de Espinaca & Rúcula', baseGrams: 150, kcalPerG: 0.23, p: 0.03, c: 0.03, f: 0.00 }
      ]
    },
    pescatarian: {
      breakfast: [
        { name: 'Claras de Huevo con Espinaca', baseGrams: 200, kcalPerG: 0.52, p: 0.11, c: 0.01, f: 0.00 },
        { name: 'Pan de Masa Madre Multigrano', baseGrams: 70, kcalPerG: 2.50, p: 0.09, c: 0.48, f: 0.03 }
      ],
      snackAM: [
        { name: 'Kéfir Natural Bajo en Grasa', baseGrams: 220, kcalPerG: 0.45, p: 0.04, c: 0.05, f: 0.01 },
        { name: 'Nueces de Castilla', baseGrams: 20, kcalPerG: 6.54, p: 0.15, c: 0.14, f: 0.65 }
      ],
      lunch: [
        { name: 'Lomo de Atún de Aleta Amarilla Sellado', baseGrams: 190, kcalPerG: 1.30, p: 0.28, c: 0.00, f: 0.01 },
        { name: 'Quinoa Cocida a las Fina Hierbas', baseGrams: 170, kcalPerG: 1.20, p: 0.04, c: 0.21, f: 0.02 },
        { name: 'Aguacate Hass', baseGrams: 60, kcalPerG: 1.60, p: 0.02, c: 0.08, f: 0.15 }
      ],
      snackPM: [
        { name: 'Proteína de Suero de Leche Orgánica', baseGrams: 35, kcalPerG: 3.7, p: 0.85, c: 0.05, f: 0.02 },
        { name: 'Plátano Dominico', baseGrams: 100, kcalPerG: 0.89, p: 0.01, c: 0.23, f: 0.00 }
      ],
      dinner: [
        { name: 'Filete de Bacalao o Robalo al Horno', baseGrams: 200, kcalPerG: 0.82, p: 0.18, c: 0.00, f: 0.01 },
        { name: 'Papa Criolla al Horno con Romero', baseGrams: 200, kcalPerG: 0.87, p: 0.02, c: 0.20, f: 0.00 },
        { name: 'Vegetales Salteados en AOV', baseGrams: 180, kcalPerG: 0.45, p: 0.02, c: 0.05, f: 0.02 }
      ]
    },
    vegetarian: {
      breakfast: [
        { name: 'Tofu Firme Marinado al Grille', baseGrams: 180, kcalPerG: 1.44, p: 0.15, c: 0.03, f: 0.08 },
        { name: 'Avena con Semillas de Chía', baseGrams: 60, kcalPerG: 3.90, p: 0.14, c: 0.60, f: 0.09 }
      ],
      snackAM: [
        { name: 'Yogur de Soya Enriquecido con B12', baseGrams: 220, kcalPerG: 0.55, p: 0.05, c: 0.06, f: 0.02 },
        { name: 'Semillas de Calabaza Tostadas', baseGrams: 25, kcalPerG: 5.60, p: 0.30, c: 0.11, f: 0.49 }
      ],
      lunch: [
        { name: 'Lentejas Cocidas con Comino & Laurel', baseGrams: 220, kcalPerG: 1.16, p: 0.09, c: 0.20, f: 0.00 },
        { name: 'Arroz Integral al Vapor', baseGrams: 170, kcalPerG: 1.11, p: 0.03, c: 0.23, f: 0.01 },
        { name: 'Semillas de Sésamo Tostado', baseGrams: 15, kcalPerG: 5.73, p: 0.18, c: 0.23, f: 0.50 }
      ],
      snackPM: [
        { name: 'Proteína Vege-Élite (Guisante & Arroz)', baseGrams: 35, kcalPerG: 3.8, p: 0.80, c: 0.06, f: 0.03 },
        { name: 'Pera Mantecosa', baseGrams: 140, kcalPerG: 0.57, p: 0.00, c: 0.15, f: 0.00 }
      ],
      dinner: [
        { name: 'Hamburguesa de Garbanzos & Espinaca', baseGrams: 180, kcalPerG: 1.50, p: 0.10, c: 0.22, f: 0.04 },
        { name: 'Camote Horneado', baseGrams: 150, kcalPerG: 0.86, p: 0.02, c: 0.20, f: 0.00 }
      ]
    },
    lowcarb: {
      breakfast: [
        { name: 'Omeyas de Huevo Entero con Queso Gouda', baseGrams: 180, kcalPerG: 2.10, p: 0.14, c: 0.01, f: 0.16 },
        { name: 'Aguacate con Pimienta Negra', baseGrams: 80, kcalPerG: 1.60, p: 0.02, c: 0.08, f: 0.15 }
      ],
      snackAM: [
        { name: 'Queso Parmesano Curado', baseGrams: 35, kcalPerG: 4.31, p: 0.38, c: 0.04, f: 0.29 }
      ],
      lunch: [
        { name: 'Ribeye / Bife de Chorizo a la Parrilla', baseGrams: 220, kcalPerG: 2.50, p: 0.24, c: 0.00, f: 0.17 },
        { name: 'Ensalada de Brócoli & Tocino con AOV', baseGrams: 180, kcalPerG: 1.20, p: 0.04, c: 0.05, f: 0.10 }
      ],
      snackPM: [
        { name: 'Macadamias & Almendras', baseGrams: 35, kcalPerG: 7.18, p: 0.08, c: 0.14, f: 0.75 }
      ],
      dinner: [
        { name: 'Muslos de Pollo Orgánico con Piel al Horno', baseGrams: 220, kcalPerG: 2.30, p: 0.24, c: 0.00, f: 0.15 },
        { name: 'Espárragos con Mantequilla Ghee', baseGrams: 150, kcalPerG: 0.60, p: 0.02, c: 0.04, f: 0.05 }
      ]
    }
  };

  function calculateTDEE(age, gender, weight, height, activity, goal) {
    let bmr = 10 * weight + 6.25 * height - 5 * age;
    bmr += (gender === 'male') ? 5 : -161;

    const tdee = Math.round(bmr * activity);
    let targetCalories = tdee;

    if (goal === 'fatloss') targetCalories = Math.round(tdee * 0.80);
    else if (goal === 'muscle') targetCalories = Math.round(tdee * 1.15);
    else if (goal === 'strength') targetCalories = Math.round(tdee * 0.90);

    const proteinGrams = Math.round(weight * 2.2);
    const proteinKcal = proteinGrams * 4;
    const fatKcal = targetCalories * 0.25;
    const fatGrams = Math.round(fatKcal / 9);
    const carbKcal = Math.max(0, targetCalories - (proteinKcal + fatKcal));
    const carbGrams = Math.round(carbKcal / 4);

    return { bmr, tdee, targetCalories, proteinGrams, fatGrams, carbGrams };
  }

  function generateMealPlanUI(dietType, targetCalories) {
    const container = $('#mealListContainer');
    if (!container) return;

    const dietData = FOOD_DATABASE[dietType] || FOOD_DATABASE.omnivore;
    const scale = Math.max(0.7, Math.min(1.5, targetCalories / 2000));

    const mealNames = {
      breakfast: '1. Desayuno Élite & Activación Metabólica',
      snackAM: '2. Colación Mañana (Pre-Entrenamiento)',
      lunch: '3. Comida Principal de Alto Rendimiento',
      snackPM: '4. Merienda Tarde (Recuperación Post-Workout)',
      dinner: '5. Cena Nocturna de Reparación Tisular'
    };

    let html = '';

    Object.entries(dietData).forEach(([mealKey, items]) => {
      let mealCalories = 0;

      const renderedItems = items.map(food => {
        const grams = Math.round((food.baseGrams * scale) / 5) * 5;
        const kcal = Math.round(grams * food.kcalPerG);
        mealCalories += kcal;

        return `
          <tr>
            <td><strong>${food.name}</strong></td>
            <td><span class="val-num">${grams}</span> <span class="unit-badge unit-grams">g</span></td>
            <td><span class="val-num">${kcal}</span> <span class="unit-badge unit-kcal">kcal</span></td>
          </tr>
        `;
      }).join('');

      html += `
        <div class="meal-card">
          <div class="meal-header">
            <h4><i class="fa-solid fa-utensils text-cobalt"></i> ${mealNames[mealKey]}</h4>
            <span class="unit-badge unit-kcal"><span class="val-num">${mealCalories}</span> KCAL APROX.</span>
          </div>
          <table class="meal-table">
            <thead>
              <tr>
                <th>Ingrediente / Alimento Seleccionado</th>
                <th>Gramaje Exacto</th>
                <th>Aporte Energético</th>
              </tr>
            </thead>
            <tbody>
              ${renderedItems}
            </tbody>
          </table>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  function initNutritionForm() {
    const form = $('#tdeeForm');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();

      const age = parseInt($('#nutriAge').value, 10);
      const gender = $('#nutriGender').value;
      const weight = parseFloat($('#nutriWeight').value);
      const height = parseFloat($('#nutriHeight').value);
      const activity = parseFloat($('#nutriActivity').value);
      const goal = $('#nutriGoal').value;
      const dietType = $('#nutriDietType').value;

      const res = calculateTDEE(age, gender, weight, height, activity, goal);

      state.user.age = age;
      state.user.gender = gender;
      state.user.weight = weight;
      state.user.height = height;
      state.user.activity = activity;
      state.user.goal = goal;
      state.user.dietType = dietType;
      state.user.tdee = res.tdee;
      state.user.targetCalories = res.targetCalories;
      state.user.protein = res.proteinGrams;
      state.user.carbs = res.carbGrams;
      state.user.fat = res.fatGrams;
      saveState();

      const pPct = Math.round((res.proteinGrams * 4 / res.targetCalories) * 100);
      $('#resTDEE').innerHTML = `<span class="val-num">${res.tdee.toLocaleString()}</span> <span class="unit-badge unit-kcal">KCAL</span>`;
      $('#resCalories').innerHTML = `<span class="val-num">${res.targetCalories.toLocaleString()}</span> <span class="unit-badge unit-kcal">KCAL / DÍA</span>`;
      $('#resProtein').innerHTML = `<span class="val-num">${res.proteinGrams}</span> <span class="unit-badge unit-grams">g</span> <span class="unit-badge unit-percent">${pPct}%</span>`;
      $('#resCarbsFat').innerHTML = `<span class="val-num">${res.carbGrams}</span> <span class="unit-badge unit-grams">g C</span> / <span class="val-num">${res.fatGrams}</span> <span class="unit-badge unit-grams">g G</span>`;

      $('#dashCalories').textContent = `${res.targetCalories.toLocaleString()}`;
      $('#dashMacroSummary').textContent = `${res.proteinGrams}g P | ${res.carbGrams}g C | ${res.fatGrams}g G`;

      generateMealPlanUI(dietType, res.targetCalories);
      showToast('Cálculo TDEE y Plan Nutricional generado con éxito', 'fa-bolt');
    });

    generateMealPlanUI(state.user.dietType, state.user.targetCalories);
  }

  // --- 5. GENERADOR DE ENTRENAMIENTO & BIOMECÁNICA ---
  const WORKOUT_ROUTINES = {
    '4days': [
      {
        dayName: 'DÍA 1: TORSO ÉLITE A (ENFOQUE HIPERTROFIA / PECHO & ESPALDA)',
        duration: '60 min',
        exercises: [
          { id: 'ex-101', name: 'Press de Pecho Plano en Máquina Convergente', muscle: 'Pectoral Mayor', sets: '4', reps: '8 - 10', rir: 'RIR 1', rest: '90 seg', cue: 'Biomecánica: Mantener retracción y depresión escapular constante. Guiar los codos en ángulo de 45°.' },
          { id: 'ex-102', name: 'Jalón al Pecho con Agarre Neutro en Polea', muscle: 'Dorsal Ancho & Redondo Mayor', sets: '4', reps: '10 - 12', rir: 'RIR 2', rest: '90 seg', cue: 'Biomecánica: Iniciar descendiendo las escápulas antes de flexionar codos. Codos a crestas ilíacas.' },
          { id: 'ex-103', name: 'Press Inclinado con Mancuernas (30°)', muscle: 'Pectoral Superior', sets: '3', reps: '10 - 12', rir: 'RIR 2', rest: '75 seg', cue: 'Biomecánica: Banco a 30° para evitar tensión excesiva en deltoides anterior.' }
        ]
      },
      {
        dayName: 'DÍA 2: PIERNA & CADENA POSTERIOR ÉLITE',
        duration: '65 min',
        exercises: [
          { id: 'ex-201', name: 'Prensa de Piernas Lineal', muscle: 'Cuádriceps', sets: '4', reps: '8 - 10', rir: 'RIR 1-2', rest: '120 seg', cue: 'Biomecánica: Pelvis apoyada al respaldo. Evitar valgo dinámico de rodilla.' },
          { id: 'ex-202', name: 'Peso Muerto Rumano con Mancuernas / Barra', muscle: 'Isquiosurales', sets: '4', reps: '8 - 10', rir: 'RIR 2', rest: '90 seg', cue: 'Biomecánica: Bisagra de cadera profunda. Barra pegada a los muslos.' }
        ]
      }
    ]
  };

  function renderWorkoutRoutine(splitKey) {
    const container = $('#workoutContainer');
    if (!container) return;
    const days = WORKOUT_ROUTINES[splitKey] || WORKOUT_ROUTINES['4days'];

    let html = '';
    days.forEach(day => {
      const exerciseRows = day.exercises.map(ex => {
        const savedLoad = state.workoutLoads[ex.id] || '';
        return `
          <tr>
            <td>
              <span class="exercise-name">${ex.name}</span>
              <span class="exercise-muscle"><i class="fa-solid fa-layer-group text-cobalt"></i> ${ex.muscle}</span>
              <div class="biomechanics-box">
                <i class="fa-solid fa-lightbulb text-gold"></i> <strong>Tip Biomecánico:</strong> ${ex.cue}
              </div>
            </td>
            <td class="text-center"><strong>${ex.sets}</strong></td>
            <td class="text-center"><strong>${ex.reps}</strong></td>
            <td class="text-center"><span class="badge badge-cobalt">${ex.rir}</span></td>
            <td class="text-center">${ex.rest}</td>
            <td class="text-center">
              <input type="number" class="load-input workout-load-field" data-exid="${ex.id}" step="0.5" min="0" placeholder="0" value="${savedLoad}">
              <span class="fs-xs text-muted">kg</span>
            </td>
          </tr>
        `;
      }).join('');

      html += `
        <div class="day-card">
          <div class="day-card-header">
            <h3><i class="fa-solid fa-calendar-day"></i> ${day.dayName}</h3>
            <span class="badge badge-gold"><i class="fa-solid fa-clock"></i> ${day.duration}</span>
          </div>
          <div class="table-responsive">
            <table class="exercise-table">
              <thead>
                <tr>
                  <th style="width: 45%;">Ejercicio & Guía Biomecánica Postural</th>
                  <th class="text-center">Series</th>
                  <th class="text-center">Reps Target</th>
                  <th class="text-center">RIR Target</th>
                  <th class="text-center">Descanso</th>
                  <th class="text-center" style="width: 15%;">Carga (kg)</th>
                </tr>
              </thead>
              <tbody>
                ${exerciseRows}
              </tbody>
            </table>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    $$('.workout-load-field').forEach(input => {
      input.addEventListener('change', e => {
        const exId = e.target.dataset.exid;
        state.workoutLoads[exId] = e.target.value;
        saveState();
      });
    });
  }

  function initWorkoutGenerator() {
    const btn = $('#generateWorkoutBtn');
    const saveBtn = $('#saveLoadsBtn');

    btn?.addEventListener('click', () => {
      const splitVal = $('#workSplit').value;
      renderWorkoutRoutine(splitVal);
      showToast('Rutina por grupos musculares y biomecánica actualizada', 'fa-dumbbell');
    });

    saveBtn?.addEventListener('click', () => {
      saveState();
      showToast('Historial de cargas registrado en almacenamiento local', 'fa-floppy-disk');
    });

    renderWorkoutRoutine('4days');
  }

  // --- 6. CRM LEADS & CAPTACIÓN MARKETING ---
  function renderLeadsTable() {
    const tbody = $('#leadsTableBody');
    const dashTbody = $('#dashboardLeadsTableBody');
    const badge = $('#leadCountBadge');

    if (badge) badge.textContent = `${state.leads.length} Prospectos Registrados`;

    const htmlContent = !state.leads.length
      ? `<tr><td colspan="7" class="text-center text-muted p-lg">No hay prospectos capturados en el CRM local.</td></tr>`
      : state.leads.map(lead => {
          let statusBadge = 'badge-cobalt';
          if (lead.status === 'Nuevo') statusBadge = 'badge-gold';
          if (lead.status === 'Suscrito VIP') statusBadge = 'badge-success';

          const encodedMsg = encodeURIComponent(`Hola ${lead.name}, te saludamos de GymOS. Vimos tu interés en el ${lead.planInterest}. ¿Te gustaría agendar tu consulta biomecánica?`);
          const whatsappUrl = `https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodedMsg}`;

          return `
            <tr>
              <td class="fs-xs text-muted">${lead.date}</td>
              <td><strong>${lead.name}</strong></td>
              <td>
                <div class="fs-xs"><i class="fa-solid fa-envelope text-muted"></i> ${lead.email}</div>
                <div class="fs-xs"><i class="fa-solid fa-phone text-muted"></i> ${lead.phone}</div>
              </td>
              <td class="fs-sm">${lead.goal}</td>
              <td class="fs-sm fw-700 text-cobalt">${lead.planInterest}</td>
              <td><span class="badge ${statusBadge}">${lead.status}</span></td>
              <td>
                <div class="display-flex gap-xs">
                  <a href="${whatsappUrl}" target="_blank" rel="noopener" class="btn btn-xs btn-outline">
                    <i class="fa-brands fa-whatsapp"></i> Contactar
                  </a>
                  <button class="btn btn-xs btn-secondary delete-lead-btn" data-id="${lead.id}">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          `;
        }).join('');

    if (tbody) tbody.innerHTML = htmlContent;
    if (dashTbody) dashTbody.innerHTML = htmlContent;

    $$('.delete-lead-btn').forEach(b => {
      b.addEventListener('click', () => {
        const id = b.dataset.id;
        state.leads = state.leads.filter(l => l.id !== id);
        saveState();
        renderLeadsTable();
        showToast('Prospecto eliminado del CRM local', 'fa-trash');
      });
    });
  }

  function initLeadModal() {
    const modal = $('#leadModal');
    const openBtn1 = $('#openLeadModalBtn');
    const openBtn2 = $('#openLeadModalBtn2');
    const closeBtn = $('#closeLeadModalBtn');
    const form = $('#leadCaptureForm');

    function openModal() { modal?.classList.add('active'); }
    function closeModal() { modal?.classList.remove('active'); }

    openBtn1?.addEventListener('click', openModal);
    openBtn2?.addEventListener('click', openModal);
    closeBtn?.addEventListener('click', closeModal);

    modal?.addEventListener('click', e => {
      if (e.target === modal) closeModal();
    });

    form?.addEventListener('submit', e => {
      e.preventDefault();

      const newLead = {
        id: 'lead-' + Date.now(),
        date: new Date().toISOString().slice(0, 10),
        name: $('#leadName').value.trim(),
        email: $('#leadEmail').value.trim(),
        phone: $('#leadPhone').value.trim(),
        goal: $('#leadGoal').value,
        planInterest: $('#leadPlanInterest').value,
        status: 'Nuevo'
      };

      state.leads.unshift(newLead);
      saveState();
      renderLeadsTable();

      // Firebase Firestore Cloud Sync
      if (window.GymOSFirebase && window.GymOSFirebase.saveLead) {
        window.GymOSFirebase.saveLead(newLead);
      }

      form.reset();
      closeModal();
      showToast(`¡Lead capturado exitosamente! Sincronizado en Firebase & CRM.`, 'fa-user-check');
      showSection('section-leads');
    });

    renderLeadsTable();
  }

  // --- 7. REMINDERS & CRM ACTION TRIGGERS ---
  function initReminders() {
    $('#triggerReminderBtn')?.addEventListener('click', () => {
      showToast('Recordatorio automático programado para envío a clientes VIP', 'fa-paper-plane');
    });

    $$('.send-reminder-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.type;
        let msg = 'Alerta enviada al cliente.';
        if (type === 'pesaje') msg = 'Recordatorio de pesaje semanal enviado vía WhatsApp.';
        if (type === 'dieta') msg = 'Ajuste de macronutrientes agendado para notificación.';
        if (type === 'renovacion') msg = 'Enlace seguro de PayPal enviado para renovación.';
        showToast(msg, 'fa-bell');
      });
    });

    $('#exportBackupBtn')?.addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `GymOS-Reporte-CRM-${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('Reporte CRM exportado exitosamente', 'fa-download');
    });
  }

  // --- 8. PAYPAL CHECKOUT INTEGRATION ---
  function initPayPalCheckout() {
    let currentSelectedPlan = 'Plan Mensual Élite';
    let currentPrice = '89.00';

    const planTitleEl = $('#selectedPlanTitle');
    const planButtons = $$('.select-plan-btn');

    planButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        currentSelectedPlan = btn.dataset.plan;
        currentPrice = btn.dataset.price;

        if (planTitleEl) {
          planTitleEl.textContent = `Plan Seleccionado: ${currentSelectedPlan} ($${currentPrice} USD)`;
        }

        const paypalBox = $('#paypalContainerBox');
        paypalBox?.scrollIntoView({ behavior: 'smooth' });
        showToast(`Seleccionado: ${currentSelectedPlan}`, 'fa-credit-card');
      });
    });

    if (window.paypal && window.paypal.Buttons) {
      window.paypal.Buttons({
        style: { layout: 'vertical', color: 'blue', shape: 'rect', label: 'paypal' },
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [{
              description: currentSelectedPlan,
              amount: { currency_code: 'USD', value: currentPrice }
            }]
          });
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            state.user.membership = currentSelectedPlan;
            state.user.paymentStatus = 'Activo (PayPal)';
            saveState();

            $('#dashMembershipStatus').textContent = currentSelectedPlan;
            showToast(`¡Pago confirmado por PayPal! Gracias ${details.payer.name.given_name}.`, 'fa-circle-check');
          });
        }
      }).render('#paypal-button-container');
    } else {
      const container = $('#paypal-button-container');
      if (container) {
        container.innerHTML = `<div class="alert-box alert-info">Contenedor PayPal SDK Listo. (Modo Sandbox Activo)</div>`;
      }
    }

    $('#simulatedPayBtn')?.addEventListener('click', () => {
      state.user.membership = currentSelectedPlan;
      state.user.paymentStatus = 'Activo (Simulado)';
      saveState();

      const statusEl = $('#dashMembershipStatus');
      if (statusEl) statusEl.textContent = currentSelectedPlan;

      showToast(`Membresía "${currentSelectedPlan}" activada exitosamente`, 'fa-circle-check');
    });
  }

  // --- 9. HARBIZ-STYLE AFFILIATE & FAQ ACCORDION ENGINE ---
  function initAffiliateAndFAQUI() {
    // FAQ Accordion Toggle
    const faqItems = $$('.faq-item');
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      question?.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    });

    // Affiliate Link Generator
    const nameInput = $('#affiliateNameInput');
    const linkInput = $('#generatedAffiliateLink');
    const copyBtn = $('#copyAffiliateLinkBtn');

    nameInput?.addEventListener('input', e => {
      const cleanName = e.target.value.trim().replace(/[^a-zA-Z0-9]/g, '') || 'Coach';
      if (linkInput) linkInput.value = `https://ratauille.github.io/GymOS-sAAS/?aff=${cleanName}`;
    });

    copyBtn?.addEventListener('click', () => {
      if (linkInput) {
        navigator.clipboard.writeText(linkInput.value);
        showToast('¡Enlace de afiliado copiado al portapapeles!', 'fa-copy');
      }
    });

    // Affiliate Commission Calculator
    const slider = $('#affiliateReferredCount');
    const label = $('#referredCountLabel');
    const incomeDisplay = $('#estimatedCommissionIncome');

    slider?.addEventListener('input', e => {
      const count = parseInt(e.target.value, 10);
      const monthlyIncome = Math.round(count * 89 * 0.30);
      const mxnIncome = Math.round(monthlyIncome * 18);

      if (label) label.textContent = `${count} Clientes Plan Mensual ($89 USD)`;
      if (incomeDisplay) incomeDisplay.innerHTML = `$${monthlyIncome}.00 <small class="fs-xs text-muted">USD / mes ($${mxnIncome.toLocaleString()} MXN)</small>`;
    });
  }

  // --- 10. BIOLINK ÉLITE GENERATOR ENGINE ---
  function initBioLinkGenerator() {
    const coachNameInput = $('#bioCoachName');
    const coachTaglineInput = $('#bioCoachTagline');
    const avatarSelect = $('#bioAvatarSelect');
    const link1Input = $('#bioLink1Text');
    const link2Input = $('#bioLink2Text');
    const link3Input = $('#bioLink3Text');
    const link4Input = $('#bioLink4Text');
    const bioUrlInput = $('#generatedBioUrl');
    const copyBioBtn = $('#copyBioUrlBtn');

    const prevName = $('#previewBioName');
    const prevTagline = $('#previewBioTagline');
    const prevAvatarIcon = $('#previewBioAvatarIcon');
    const prevB1 = $('#prevBtn1');
    const prevB2 = $('#prevBtn2');
    const prevB3 = $('#prevBtn3');
    const prevB4 = $('#prevBtn4');

    function updatePreview() {
      if (prevName && coachNameInput) prevName.textContent = coachNameInput.value || 'Tu Nombre / Marca';
      if (prevTagline && coachTaglineInput) prevTagline.textContent = coachTaglineInput.value || 'Tu Tagline Bio';
      if (prevB1 && link1Input) prevB1.textContent = link1Input.value || 'Enlace 1';
      if (prevB2 && link2Input) prevB2.textContent = link2Input.value || 'Enlace 2';
      if (prevB3 && link3Input) prevB3.textContent = link3Input.value || 'Enlace 3';
      if (prevB4 && link4Input) prevB4.textContent = link4Input.value || 'Enlace 4';

      if (coachNameInput && bioUrlInput) {
        const slug = coachNameInput.value.trim().replace(/[^a-zA-Z0-9]/g, '') || 'Coach';
        bioUrlInput.value = `https://ratauille.github.io/GymOS-sAAS/?biolink=${slug}`;
      }

      const prevAvatarImg = $('#previewBioAvatarImg');
      if (avatarSelect) {
        if (avatarSelect.value === 'logo') {
          if (prevAvatarImg) prevAvatarImg.style.display = 'block';
          if (prevAvatarIcon) prevAvatarIcon.style.display = 'none';
        } else {
          if (prevAvatarImg) prevAvatarImg.style.display = 'none';
          if (prevAvatarIcon) {
            prevAvatarIcon.style.display = 'block';
            const iconMap = {
              'crown': 'fa-crown',
              'dumbbell': 'fa-dumbbell',
              'user-ninja': 'fa-user-ninja',
              'bolt': 'fa-bolt'
            };
            prevAvatarIcon.className = `fa-solid ${iconMap[avatarSelect.value] || 'fa-dumbbell'}`;
          }
        }
      }
    }

    [coachNameInput, coachTaglineInput, avatarSelect, link1Input, link2Input, link3Input, link4Input].forEach(el => {
      el?.addEventListener('input', updatePreview);
      el?.addEventListener('change', updatePreview);
    });

    copyBioBtn?.addEventListener('click', () => {
      if (bioUrlInput) {
        navigator.clipboard.writeText(bioUrlInput.value);
        showToast('¡URL de BioLink copiada al portapapeles!', 'fa-link');
      }
    });

    updatePreview();
  }

  // --- 11. HERMARFIT THEME TOGGLE & ACADEMIA FITNESS ENGINE ---
  function initThemeToggle() {
    const themeBtn = $('#themeToggleBtn');
    if (!themeBtn) return;

    const savedTheme = localStorage.getItem('gymos_theme');
    if (savedTheme === 'hermarfit') {
      document.body.classList.add('theme-hermarfit');
      themeBtn.innerHTML = '<i class="fa-solid fa-palette"></i> Estilo Cobalto Élite';
    }

    themeBtn.addEventListener('click', () => {
      const isHermarfit = document.body.classList.toggle('theme-hermarfit');
      if (isHermarfit) {
        localStorage.setItem('gymos_theme', 'hermarfit');
        themeBtn.innerHTML = '<i class="fa-solid fa-palette"></i> Estilo Cobalto Élite';
        showToast('Tema Hermarfit Dark Crimson activado', 'fa-fire');
      } else {
        localStorage.setItem('gymos_theme', 'cobalt');
        themeBtn.innerHTML = '<i class="fa-solid fa-palette"></i> Estilo Hermarfit';
        showToast('Tema Cobalto Élite activado', 'fa-gem');
      }
    });
  }

  function initAcademyModule() {
    const startBtns = $$('.start-course-btn');
    const badge = $('#activeCourseBadge');
    const title = $('#activeCourseTitle');
    const topic = $('#videoTopicTitle');
    const completeBtn = $('#completeModuleBtn');
    const percentEl = $('#courseProgressPercent');
    const fillEl = $('#courseProgressBarFill');
    const playIcon = $('#playVideoIcon');

    let currentProgress = 35;

    startBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const courseName = btn.dataset.course;
        if (badge) badge.textContent = `MASTERCLASS ACTIVA`;
        if (title) title.textContent = `Masterclass: ${courseName} Avanzada`;
        if (topic) topic.textContent = `Módulo 1: Introducción Teórico-Práctica de ${courseName}`;
        
        currentProgress = 10;
        if (percentEl) percentEl.textContent = `${currentProgress}% Completado`;
        if (fillEl) fillEl.style.width = `${currentProgress}%`;

        $('#coursePlayerContainer')?.scrollIntoView({ behavior: 'smooth' });
        showToast(`Masterclass de ${courseName} cargada en el reproductor HD`, 'fa-graduation-cap');
      });
    });

    completeBtn?.addEventListener('click', () => {
      currentProgress = Math.min(100, currentProgress + 25);
      if (percentEl) percentEl.textContent = `${currentProgress}% Completado`;
      if (fillEl) fillEl.style.width = `${currentProgress}%`;

      if (currentProgress >= 100) {
        showToast('¡Felicidades! Has completado el curso y obtenido tu Certificado Digital', 'fa-award');
      } else {
        showToast('¡Módulo completado con éxito! Siguiente lección desbloqueada.', 'fa-circle-check');
      }
    });

    playIcon?.addEventListener('click', () => {
      showToast('Reproduciendo Masterclass HD...', 'fa-play');
    });
  }

  // --- 12. FICHA NUTRICIONAL ÉLITE EXPORT & PDF GENERATOR ---
  function initDietPdfExport() {
    const previewBtn = $('#previewPdfDietBtn');
    const downloadBtn = $('#downloadPdfDietBtn');
    const printBtn = $('#printPdfDocumentBtn');
    const modal = $('#dietPdfModal');

    function populatePdfData() {
      const activeClient = state.user.name || 'Carlos Mendoza';
      const goalEl = $('#nutriGoal');
      const goalText = goalEl ? goalEl.options[goalEl.selectedIndex].text : 'Pérdida de Grasa (Déficit -20%)';
      const resCalories = $('#resCalories')?.textContent || '2,120 kcal';
      const resProtein = $('#resProtein')?.textContent || '172g (32%)';
      const resCarbsFat = $('#resCarbsFat')?.textContent || '205g C / 60g G';

      $('#pdfClientName').textContent = activeClient;
      $('#pdfGoalName').textContent = goalText;
      $('#pdfCalorieTarget').textContent = resCalories;
      $('#pdfProteinGrams').textContent = resProtein;
      
      const parts = resCarbsFat.split('/');
      $('#pdfCarbsGrams').textContent = parts[0]?.trim() || '205g Carbs';
      $('#pdfFatGrams').textContent = parts[1]?.trim() || '60g Grasas';

      // Copy HTML from mealListContainer to pdfMealRowsContainer formatted cleanly
      const mealList = $('#mealListContainer');
      const pdfContainer = $('#pdfMealRowsContainer');
      if (mealList && pdfContainer) {
        const mealCards = mealList.querySelectorAll('.meal-card');
        let pdfHtml = '';

        mealCards.forEach((card, idx) => {
          const title = card.querySelector('h4')?.textContent || `Comida ${idx + 1}`;
          const kcalBadge = card.querySelector('.badge')?.textContent || '';
          const rows = card.querySelectorAll('tbody tr');

          let itemsHtml = '';
          rows.forEach(r => {
            const foodName = r.cells[0]?.textContent || '';
            const grams = r.cells[1]?.textContent || '';
            const kcal = r.cells[2]?.textContent || '';

            itemsHtml += `
              <div class="pdf-food-item">
                <span>• <strong>${foodName}</strong></span>
                <span style="font-weight: 700; color: #0F2C59;">${grams} (${kcal})</span>
              </div>
            `;
          });

          pdfHtml += `
            <div class="pdf-meal-card">
              <div class="display-flex justify-between items-center pdf-meal-title">
                <span>${title}</span>
                <span class="badge badge-gold" style="font-size: 0.7rem;">${kcalBadge}</span>
              </div>
              <div class="pdf-food-list">
                ${itemsHtml}
              </div>
            </div>
          `;
        });

        pdfContainer.innerHTML = pdfHtml || '<p class="text-muted">Por favor calcula un plan nutricional primero.</p>';
      }

      // Date & ID
      const today = new Date().toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' });
      $('#pdfDate').textContent = today;
      $('#pdfId').textContent = `GYM-NUTRI-${Math.floor(1000 + Math.random() * 9000)}`;
    }

    previewBtn?.addEventListener('click', () => {
      populatePdfData();
      modal?.classList.add('active');
    });

    downloadBtn?.addEventListener('click', () => {
      populatePdfData();
      modal?.classList.add('active');
      setTimeout(() => {
        window.print();
      }, 300);
    });

    printBtn?.addEventListener('click', () => {
      window.print();
    });
  }

  // --- 13. CONTINUOUS SCROLL MODE (BAJAR MÁS & MÁS) ---
  function initScrollModeToggle() {
    const scrollBtn = $('#toggleScrollModeBtn');
    if (!scrollBtn) return;

    scrollBtn.addEventListener('click', () => {
      const isContinuous = document.body.classList.toggle('continuous-scroll');
      if (isContinuous) {
        scrollBtn.classList.add('active');
        scrollBtn.innerHTML = '<i class="fa-solid fa-arrows-up-down"></i> Vista Pestañas';
        showToast('Modo Bajar Más activo: explora todas las secciones desplazándote', 'fa-scroll');
      } else {
        scrollBtn.classList.remove('active');
        scrollBtn.innerHTML = '<i class="fa-solid fa-arrows-up-down"></i> Modo Bajar Más';
        showToast('Modo Vista Pestañas activo', 'fa-table-cells');
      }
    });
  }

  // --- 14. CATÁLOGO GASTRONÓMICO DE RECETAS FITNESS (PDF & MENÚ DESPLEGABLE) ---
  const RECIPES_DATABASE = {
    'receta-1': {
      title: 'Bowl de Avena Proteica con Frutos Rojos y Chía',
      category: 'DESAYUNO ENERGÉTICO & ALTO EN FIBRA',
      prepTime: '10 min',
      servings: '1 persona',
      difficulty: 'Fácil',
      focus: 'Energía Sostenida',
      calories: 385,
      protein: 32,
      carbs: 44,
      fat: 8,
      fiber: 9,
      ingredients: [
        { name: 'Copos de avena integral', grams: '50 g', note: 'Carbohidrato complejo rico en betaglucanos saciantes' },
        { name: 'Proteína Whey Isolate (vainilla)', grams: '30 g (1 scoop)', note: 'Aislado de suero de leche de absorción óptima' },
        { name: 'Bebida vegetal de almendras s/azúcar', grams: '180 ml', note: 'Base líquida ligera baja en densidad calórica' },
        { name: 'Frutos rojos (fresas y arándanos)', grams: '70 g', note: 'Antioxidantes naturales, polifenoles y micronutrientes' },
        { name: 'Semillas de chía', grams: '10 g', note: 'Ácidos grasos esenciales Omega-3 y mucílago digestivo' },
        { name: 'Nueces en trozos', grams: '10 g', note: 'Grasas monoinsaturadas y aporte crocante' },
        { name: 'Canela en polvo de Ceilán', grams: '2 g', note: 'Favorece el control glicémico y aroma natural' }
      ],
      steps: [
        '1. Cocción base: En cacerola a fuego bajo, verter la bebida de almendras con la avena y la canela. Cocinar 4 min removiendo hasta lograr textura cremosa.',
        '2. Mezcla proteica: Retirar del fuego y dejar reposar 1 min. Añadir el scoop de proteína en polvo batiendo con globo para integrar suavemente sin grumos.',
        '3. Emplatado: Servir en bowl hondo. Disponer en abanico las fresas laminadas, arándanos, semillas de chía y trozos de nuez en la superficie.',
        '4. Consumo: Disfrutar tibio al momento o conservar en frasco hermético en nevera como Overnight Oats para la mañana siguiente.'
      ],
      chefTip: 'Para maximizar la asimilación digestiva de la fibra, puedes activar la chía dejándola reposar 10 min en 30 ml de agua tibia antes de servir.'
    },
    'receta-2': {
      title: 'Pechuga de Pollo al Limón con Quinoa y Espárragos',
      category: 'ALMUERZO MAGRO & ALTA SÍNTESIS PROTEICA',
      prepTime: '20 min',
      servings: '1 persona',
      difficulty: 'Fácil',
      focus: 'Construcción Muscular',
      calories: 450,
      protein: 48,
      carbs: 36,
      fat: 11,
      fiber: 6,
      ingredients: [
        { name: 'Pechuga de pollo limpia sin piel', grams: '180 g', note: 'Proteína de alto valor biológico baja en grasa' },
        { name: 'Quinoa cocida (pre-lavada)', grams: '130 g (45g cruda)', note: 'Pseudocereal con perfil completo de 9 aminoácidos' },
        { name: 'Espárragos verdes frescos', grams: '120 g', note: 'Diurético natural rico en fibra, folatos y asparagina' },
        { name: 'Aceite de oliva virgen extra (AOVE)', grams: '7 ml (1/2 cda)', note: 'Ácido oleico cardioprotector y cocción limpia' },
        { name: 'Jugo de limón eureka y ralladura', grams: '15 ml / 2 g', note: 'Ácido cítrico y aceites aromáticos digestivos' },
        { name: 'Hierbas frescas (tomillo y romero)', grams: '3 g', note: 'Fitonutrientes y realce aromático mediterráneo' },
        { name: 'Sal marina y pimienta negra', grams: '2 g', note: 'Sazón mineral sin excesos de sodio' }
      ],
      steps: [
        '1. Marinado: Salpimentar la pechuga y frotar con el limón, su ralladura, tomillo y romero picados. Dejar reposar 5 min a temperatura ambiente.',
        '2. Sellado: Calentar sartén con 3 ml de AOVE a fuego medio-alto. Cocinar el pollo 5-6 min por lado hasta dorar con 74°C internos.',
        '3. Reposo cárnico: Reposar la pechuga 3 min cubierta en papel aluminio antes de rebanar en láminas oblicuas para conservar todos los jugos.',
        '4. Salteado: En la misma sartén con los 4 ml restantes de AOVE, saltear los espárragos 4 min a fuego vivo hasta dejarlos tiernos al dente.',
        '5. Montaje: Servir sobre cama de quinoa caliente, acomodar la pechuga en abanico y acompañar con los espárragos dorados.'
      ],
      chefTip: 'Lavar la quinoa con agua corriente fría 3 veces antes de hervirla elimina por completo la saponina amarga natural.'
    },
    'receta-3': {
      title: 'Salmón a la Plancha con Puré Rústico de Camote y Brócoli',
      category: 'COMIDA POST-ENTRENO & ÁCIDOS GRASOS ESENCIALES',
      prepTime: '25 min',
      servings: '1 persona',
      difficulty: 'Media',
      focus: 'Recuperación y Antiinflamación',
      calories: 520,
      protein: 42,
      carbs: 40,
      fat: 20,
      fiber: 7,
      ingredients: [
        { name: 'Filete de salmón fresco con piel', grams: '170 g', note: 'Ácidos grasos EPA/DHA Omega-3 y proteína de asimilación pura' },
        { name: 'Camote naranja (batata dulce)', grams: '160 g', note: 'Carbohidratos complejos de bajo índice glucémico y beta-caroteno' },
        { name: 'Floretes de brócoli fresco', grams: '140 g', note: 'Sulforafano antioxidante, fibra crucífera y micronutrientes' },
        { name: 'Aceite de oliva virgen extra', grams: '5 ml (1 cdta)', note: 'Grasa monoinsaturada para sellado a temperatura precisa' },
        { name: 'Bebida de almendras s/azúcar', grams: '30 ml', note: 'Aporte de fluidez cremosa al puré sin grasas saturadas' },
        { name: 'Nuez moscada, sal marina y pimienta', grams: '2 g', note: 'Matices aromáticos cálidos y sazón justa' },
        { name: 'Gajos de limón amarillo', grams: '20 g', note: 'Contraste cítrico fresco para acompañar el salmón' }
      ],
      steps: [
        '1. Puré de camote: Hervir el camote pelado en cubos 12 min. Escurrir y prensar con tenedor agregando bebida vegetal, nuez moscada y sal.',
        '2. Brócoli al vapor: Cocinar floretes de brócoli al vapor 5 min. Pasar por agua fría para cortar cocción y fijar el color verde vibrante.',
        '3. Salmón crujiente: Secar la piel del salmón. Salpimentar. En sartén caliente con aceite, cocinar con la piel hacia abajo 4 min; voltear 2 min más.',
        '4. Emplatado: Trazar una base de puré de camote, coronar con el salmón crujiente y acompañar con el brócoli y un gajo de limón.'
      ],
      chefTip: 'Secar la piel del salmón con toalla de cocina antes de cocinarlo garantiza un acabado crujiente perfecto sin añadir harinas.'
    },
    'receta-4': {
      title: 'Toast Integral de Masa Madre con Aguacate y Huevo Poché',
      category: 'SNACK SALUDABLE / DESAYUNO FUNCIONAL',
      prepTime: '12 min',
      servings: '1 persona',
      difficulty: 'Fácil',
      focus: 'Grasas Saludables & Saciedad',
      calories: 360,
      protein: 18,
      carbs: 28,
      fat: 19,
      fiber: 8,
      ingredients: [
        { name: 'Pan integral de masa madre', grams: '60 g (1 rebanada)', note: 'Carbohidratos complejos de fermentación lenta y alta digestibilidad' },
        { name: 'Huevos de libre pastoreo', grams: '100 g (2 piezas)', note: 'Colina para función cognitiva, albúmina y leucina pura' },
        { name: 'Aguacate Hass maduro', grams: '60 g (1/3 pieza)', note: 'Ácido oleico cardiosaludable y saciedad metabólica' },
        { name: 'Semillas de calabaza tostadas', grams: '10 g', note: 'Zinc, magnesio y textura crujiente' },
        { name: 'Hojuelas de chile peperoncino / pimentón', grams: '1 g', note: 'Capsaicina termogénica y realce visual' },
        { name: 'Sal marina en escamas y gotas de limón', grams: '3 ml / 1 g', note: 'Acentúa los sabores naturales del aguacate fresco' }
      ],
      steps: [
        '1. Tostado del pan: Tostar la rebanada de masa madre a fuego medio en plancha seca hasta que esté crujiente por fuera y tierna al centro.',
        '2. Puré rústico: Machacar el aguacate con tenedor junto con unas gotas de limón fresco, pimienta y sal marina hasta lograr textura rústica.',
        '3. Escalfado poché: En agua caliente a 85°C (sin hervir a borbotones), formar un remolino y deslizar los huevos. Cocinar 3 min exactos. Escurrir.',
        '4. Armado: Extender el aguacate sobre la tostada, colocar con cuidado los dos huevos poché y terminar con semillas y escamas de sal.'
      ],
      chefTip: 'La yema líquida del huevo poché actúa como un aderezo natural ultra untuoso y nutritivo, sin recurrir a mayonesas comerciales.'
    },
    'receta-5': {
      title: 'Tataki de Atún Sellado con Edamames y Espinacas Baby',
      category: 'CENA LIGERA & DEFINICIÓN MUSCULAR PURA',
      prepTime: '15 min',
      servings: '1 persona',
      difficulty: 'Media',
      focus: 'Máxima Densidad Proteica',
      calories: 395,
      protein: 46,
      carbs: 16,
      fat: 14,
      fiber: 6,
      ingredients: [
        { name: 'Lomo de atún fresco grado sashimi', grams: '170 g', note: 'Proteína pura magra de rápida digestión y fósforo' },
        { name: 'Edamames desgranados cocidos', grams: '80 g', note: 'Proteína vegetal, isoflavonas y fibra soluble' },
        { name: 'Espinacas baby frescas', grams: '70 g', note: 'Hierro no hemo, ácido fólico y volumen vegetal' },
        { name: 'Semillas de sésamo mixto (blanco/negro)', grams: '8 g', note: 'Aporte de calcio biodisponible y costra crocante' },
        { name: 'Aceite de sésamo tostado', grams: '5 ml (1 cdta)', note: 'Perfil aromático oriental concentrado' },
        { name: 'Salsa de soja baja en sodio y vinagre de arroz', grams: '10 ml / 5 ml', note: 'Equilibrio umami sin sobrecarga salina' },
        { name: 'Jengibre fresco rallado', grams: '3 g', note: 'Propiedades antiinflamatorias y acelerador digestivo' }
      ],
      steps: [
        '1. Vinagreta umami: Emulsionar en un pocillo la salsa de soja baja en sodio, el vinagre de arroz, el jengibre rallado y el aceite de sésamo.',
        '2. Costra de sésamo: Rebozar el lomo de atún presionando las semillas de sésamo contra las caras exteriores de la pieza.',
        '3. Sellado tataki: En sartén de hierro muy caliente, sellar el atún 40 segundos por lado. Debe quedar tostado por fuera y crudo al centro. Rebanar en láminas de 1 cm.',
        '4. Salteado flash: Saltear rápidamente los edamames y espinacas con 1 cdta de agua en la misma sartén durante 1 min para marchitar apenas las hojas.',
        '5. Montaje: Armar una cama vegetal tibia, disponer las láminas de atún tataki y salsear con la emulsión umami.'
      ],
      chefTip: 'Corta el lomo de atún con un cuchillo bien afilado humedecido con agua fría para que las semillas de sésamo no se desprendan.'
    }
  };

  function initRecipesCatalog() {
    const dropdown = $('#recipeSelectDropdown');
    const viewer = $('#recipeViewer');
    const printBtn = $('#printRecipePdfBtn');
    const navPdfBtn = $('#navRecipePdfBtn');
    const pdfModal = $('#recipesPdfModal');
    const printAllBtn = $('#printAllRecipesPdfBtn');
    const fullContainer = $('#fullRecipesPdfContainer');

    if (!dropdown || !viewer) return;

    function renderRecipe(recipeKey) {
      const r = RECIPES_DATABASE[recipeKey];
      if (!r) return;

      const ingredientsRows = r.ingredients.map(i => `
        <tr>
          <td><strong>${i.name}</strong></td>
          <td><span class="val-num">${i.grams}</span></td>
          <td class="fs-xs text-muted">${i.note}</td>
        </tr>
      `).join('');

      const stepsHtml = r.steps.map(s => `<p class="mb-xs fs-xs" style="line-height: 1.6;">${s}</p>`).join('');

      viewer.innerHTML = `
        <div class="display-flex justify-between items-center border-bottom pb-sm mb-md flex-wrap gap-xs">
          <div>
            <span class="badge badge-gold mb-xs">${r.category}</span>
            <h3 class="font-serif fs-lg text-cobalt" style="margin:0;">${r.title}</h3>
            <span class="fs-xs text-muted">Porciones: ${r.servings} • Prep: ${r.prepTime} • Dificultad: ${r.difficulty} • Enfoque: ${r.focus}</span>
          </div>
          <div class="display-flex gap-xs text-center fs-xs">
            <div class="p-xs bg-white border-radius shadow-sm"><span class="text-muted block uppercase fw-700">Calorías</span><strong class="text-cobalt fs-md">${r.calories} kcal</strong></div>
            <div class="p-xs bg-white border-radius shadow-sm"><span class="text-muted block uppercase fw-700">Proteína</span><strong class="text-cobalt fs-md">${r.protein}g</strong></div>
            <div class="p-xs bg-white border-radius shadow-sm"><span class="text-muted block uppercase fw-700">Carbs</span><strong class="text-dark fs-md">${r.carbs}g</strong></div>
            <div class="p-xs bg-white border-radius shadow-sm"><span class="text-muted block uppercase fw-700">Grasas</span><strong class="text-dark fs-md">${r.fat}g</strong></div>
            <div class="p-xs bg-white border-radius shadow-sm"><span class="text-muted block uppercase fw-700">Fibra</span><strong class="text-emerald fs-md">${r.fiber}g</strong></div>
          </div>
        </div>

        <div class="grid grid-2 gap-md mb-md">
          <div>
            <h4 class="fs-sm font-serif text-cobalt mb-xs border-bottom pb-xs"><i class="fa-solid fa-scale-balanced"></i> Ingredientes y Gramajes Exactos</h4>
            <table class="meal-table">
              <thead>
                <tr>
                  <th>Ingrediente</th>
                  <th>Gramaje / Cantidad</th>
                  <th>Aporte Nutricional Clave</th>
                </tr>
              </thead>
              <tbody>
                ${ingredientsRows}
              </tbody>
            </table>
          </div>
          <div>
            <h4 class="fs-sm font-serif text-cobalt mb-xs border-bottom pb-xs"><i class="fa-solid fa-list-ol"></i> Método de Preparación Paso a Paso</h4>
            <div class="p-sm bg-white border-radius border mb-sm">
              ${stepsHtml}
            </div>
            <div class="p-sm border-radius fs-xs" style="background: #FFFBEB; border: 1px solid #FCD34D; color: #78350F;">
              <strong><i class="fa-solid fa-lightbulb text-gold"></i> Tip del Chef:</strong> ${r.chefTip}
            </div>
          </div>
        </div>
      `;
    }

    function populateFullPdfModal() {
      if (!fullContainer) return;
      
      let html = '';
      Object.values(RECIPES_DATABASE).forEach((r, idx) => {
        const ingredientsRows = r.ingredients.map(i => `
          <tr>
            <td style="padding: 6px 10px; border-bottom: 1px solid #E2E8F0;"><strong>${i.name}</strong></td>
            <td style="padding: 6px 10px; border-bottom: 1px solid #E2E8F0;"><span>${i.grams}</span></td>
            <td style="padding: 6px 10px; border-bottom: 1px solid #E2E8F0; font-size: 0.75rem; color: #64748B;">${i.note}</td>
          </tr>
        `).join('');

        const stepsHtml = r.steps.map(s => `<p style="margin-bottom: 6px; font-size: 0.78rem; line-height: 1.5; color: #1E293B;">${s}</p>`).join('');

        html += `
          <div class="pdf-recipe-card" style="margin-bottom: 24px; padding-bottom: 20px; border-bottom: 2px dashed #CBD5E1; page-break-inside: avoid;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <div>
                <span class="badge badge-gold" style="font-size: 0.68rem;">RECETA #${idx + 1} — ${r.category}</span>
                <h3 style="font-family: serif; font-size: 1.15rem; color: #0F2C59; margin: 4px 0 0 0;">${r.title}</h3>
                <span style="font-size: 0.75rem; color: #64748B;">Prep: ${r.prepTime} • Dificultad: ${r.difficulty} • Enfoque: ${r.focus}</span>
              </div>
              <div style="display: flex; gap: 8px; font-size: 0.75rem; text-align: center;">
                <div style="padding: 4px 8px; background: #F1F5F9; border-radius: 6px;"><strong>${r.calories}</strong> kcal</div>
                <div style="padding: 4px 8px; background: #F1F5F9; border-radius: 6px;"><strong>${r.protein}g</strong> P</div>
                <div style="padding: 4px 8px; background: #F1F5F9; border-radius: 6px;"><strong>${r.carbs}g</strong> C</div>
                <div style="padding: 4px 8px; background: #F1F5F9; border-radius: 6px;"><strong>${r.fat}g</strong> G</div>
                <div style="padding: 4px 8px; background: #FEF3C7; color: #78350F; border-radius: 6px;"><strong>${r.fiber}g</strong> Fibra</div>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div>
                <h4 style="font-size: 0.85rem; color: #0F2C59; border-bottom: 1px solid #0F2C59; padding-bottom: 4px; margin-bottom: 8px;">Ingredientes & Gramajes</h4>
                <table style="width: 100%; border-collapse: collapse; font-size: 0.78rem;">
                  <thead>
                    <tr style="background: #F8FAFC; text-align: left;">
                      <th style="padding: 4px 10px;">Ingrediente</th>
                      <th style="padding: 4px 10px;">Cantidad</th>
                      <th style="padding: 4px 10px;">Aporte</th>
                    </tr>
                  </thead>
                  <tbody>${ingredientsRows}</tbody>
                </table>
              </div>
              <div>
                <h4 style="font-size: 0.85rem; color: #0F2C59; border-bottom: 1px solid #0F2C59; padding-bottom: 4px; margin-bottom: 8px;">Método de Preparación</h4>
                <div style="padding: 8px; background: #F8FAFC; border-radius: 6px; border: 1px solid #E2E8F0; margin-bottom: 8px;">${stepsHtml}</div>
                <div style="padding: 8px; background: #FFFBEB; border: 1px solid #FCD34D; border-radius: 6px; font-size: 0.75rem; color: #78350F;">
                  <strong>Tip del Chef:</strong> ${r.chefTip}
                </div>
              </div>
            </div>
          </div>
        `;
      });

      fullContainer.innerHTML = html;
    }

    dropdown.addEventListener('change', () => {
      renderRecipe(dropdown.value);
    });

    printBtn?.addEventListener('click', () => {
      populateFullPdfModal();
      pdfModal?.classList.add('active');
    });

    navPdfBtn?.addEventListener('click', () => {
      populateFullPdfModal();
      pdfModal?.classList.add('active');
    });

    printAllBtn?.addEventListener('click', () => {
      window.print();
    });

    renderRecipe('receta-1');
  }

  // --- INITIALIZATION ENTRY POINT ---
  document.addEventListener('DOMContentLoaded', () => {
    initHeroCarousel();
    initNavigation();
    initCoachShellUI();
    initNutritionForm();
    initWorkoutGenerator();
    initLeadModal();
    initReminders();
    initPayPalCheckout();
    initAffiliateAndFAQUI();
    initBioLinkGenerator();
    initThemeToggle();
    initAcademyModule();
    initDietPdfExport();
    initScrollModeToggle();
    initRecipesCatalog();

    console.log('GymOS Luxury Edition & Coach Shell initialized successfully.');
  });

})();
