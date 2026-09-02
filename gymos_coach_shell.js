#!/usr/bin/env node
/**
 * GymOS Coach Shell CLI - Terminal de Control & Logros Verificables
 * Herramienta interactiva para entrenadores de élite.
 * Permite la captación de clientes, prescripción nutricional/rutinas y seguimiento de logros por tiempo.
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'gymos_coach_db.json');

// --- Cargar / Guardar Base de Datos ---
function loadDB() {
  try {
    if (fs.existsSync(DB_FILE)) {
      return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    }
  } catch (err) {
    console.error('Error al leer la base de datos local:', err.message);
  }
  return {
    clients: [
      {
        id: 'cli-001',
        name: 'Carlos Mendoza',
        age: 29,
        gender: 'male',
        weight: 78.5,
        targetWeight: 74.0,
        height: 178,
        plan: 'Plan Mensual Élite ($89 USD)',
        joinedDate: '2026-08-01',
        goal: 'Pérdida de Grasa & Definición',
        checkins: [
          { week: 1, date: '2026-08-01', weight: 78.5, waistCm: 88, adherencePct: 92, pressLoadKg: 70, squatLoadKg: 100 },
          { week: 2, date: '2026-08-08', weight: 77.8, waistCm: 87, adherencePct: 95, pressLoadKg: 72.5, squatLoadKg: 105 },
          { week: 3, date: '2026-08-15', weight: 77.1, waistCm: 86, adherencePct: 90, pressLoadKg: 75, squatLoadKg: 110 },
          { week: 4, date: '2026-08-22', weight: 76.4, waistCm: 85, adherencePct: 96, pressLoadKg: 77.5, squatLoadKg: 112.5 }
        ]
      }
    ]
  };
}

function saveDB(db) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
  } catch (err) {
    console.error('Error al guardar la base de datos local:', err.message);
  }
}

// --- Motor de Logros Verificables por Tiempo ---
function evaluateAchievements(client) {
  const checkins = client.checkins || [];
  const achievements = [];

  if (checkins.length >= 2) {
    const recentAdherence = checkins.slice(-2).every(c => c.adherencePct >= 90);
    if (recentAdherence) {
      achievements.push({
        title: '🏆 Adherencia Nutricional Élite',
        detail: 'Superó el 90% de adherencia calórica durante 2+ semanas consecutivas.',
        badge: 'ÉLITE NUTRICIONAL'
      });
    }
  }

  if (checkins.length >= 2) {
    const first = checkins[0];
    const last = checkins[checkins.length - 1];
    if (last.pressLoadKg > first.pressLoadKg || last.squatLoadKg > first.squatLoadKg) {
      const diffPress = (last.pressLoadKg - first.pressLoadKg).toFixed(1);
      achievements.push({
        title: '⚡ Sobrecarga Progresiva Verificada',
        detail: `Incrementó su fuerza en máquinas principales (+${diffPress} kg en Press Plano manteniendo técnica limpia).`,
        badge: 'SOBRECARGA PROGRESIVA'
      });
    }
  }

  if (checkins.length >= 3) {
    const first = checkins[0];
    const last = checkins[checkins.length - 1];
    const waistDiff = (first.waistCm - last.waistCm).toFixed(1);
    if (waistDiff > 0) {
      achievements.push({
        title: '📉 Recomposición Corporal Eficiente',
        detail: `Reducción verificada de ${waistDiff} cm de cintura preservando/aumentando masa muscular.`,
        badge: 'RECOMPOSICIÓN CORPORAL'
      });
    }
  }

  if (checkins.length >= 4) {
    achievements.push({
      title: '🎖️ Consistencia de Asistencia (1 Mes Completado)',
      detail: 'Completó exitosamente 4 check-ins semanales continuos sin interrupción.',
      badge: 'CONSISTENCIA 100%'
    });
  }

  return achievements;
}

// --- Calculadora Nutricional & Dieta Coach ---
function generateCoachDiet(weight, targetCalories) {
  const scale = Math.max(0.7, Math.min(1.5, targetCalories / 2000));
  return [
    { meal: 'Desayuno (08:00 AM)', items: [`${Math.round(120 * scale)}g Huevos Enteros`, `${Math.round(60 * scale)}g Avena Molida`, `${Math.round(80 * scale)}g Berries`] },
    { meal: 'Colación Mañana (11:30 AM)', items: [`${Math.round(200 * scale)}g Yogur Griego 0%`, `${Math.round(20 * scale)}g Almendras Tostadas`] },
    { meal: 'Comida Principal (02:30 PM)', items: [`${Math.round(180 * scale)}g Pechuga de Pollo / Pescado`, `${Math.round(180 * scale)}g Arroz Basmati al Vapor`, `${Math.round(10 * scale)}g Aceite de Oliva Extra Virgen`] },
    { meal: 'Merienda Post-Workout (06:00 PM)', items: [`35g Whey Isolate Protein`, `${Math.round(150 * scale)}g Manzana Verde`] },
    { meal: 'Cena Reparadora (09:00 PM)', items: [`${Math.round(170 * scale)}g Salmón / Lomo al Horno`, `${Math.round(180 * scale)}g Camote Horneado`, `${Math.round(150 * scale)}g Vegetales Verdes`] }
  ];
}

// --- Interfaz Interactive Shell ---
function startShell() {
  const db = loadDB();
  let selectedClientIndex = 0;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.clear();
  console.log('\x1b[34m====================================================================\x1b[0m');
  console.log('\x1b[1m\x1b[33m           GYMOS COACH SHELL — CONTROL DE CLIENTES & LOGROS         \x1b[0m');
  console.log('\x1b[34m====================================================================\x1b[0m');
  console.log('Plataforma CLI interactiva de rendimiento, biomecánica y nutrición.\n');

  function showMenu() {
    const client = db.clients[selectedClientIndex] || null;
    console.log('\x1b[36m--------------------------------------------------------------------\x1b[0m');
    if (client) {
      console.log(`\x1b[1mCLIENTE SELECCIONADO:\x1b[0m \x1b[32m${client.name}\x1b[0m | Plan: ${client.plan} | Peso: ${client.weight}kg -> Meta: ${client.targetWeight}kg`);
    } else {
      console.log('\x1b[31mSin cliente seleccionado.\x1b[0m');
    }
    console.log('\x1b[36m--------------------------------------------------------------------\x1b[0m');
    console.log('1. Capturar Nuevo Cliente & Asignar Plan Élite');
    console.log('2. Cambiar / Seleccionar Cliente');
    console.log('3. Registrar Check-in Semanal & Datos Biométricos');
    console.log('4. Evaluar Matriz de Logros Verificables por Tiempo');
    console.log('5. Generar Dieta Coach con Gramajes Exactos');
    console.log('6. Generar Rutina & Guias Biomecánicas de Postura');
    console.log('7. Ver Ficha Completa & Exportar Estado');
    console.log('0. Salir de GymOS Shell\n');

    rl.question('\x1b[1m\x1b[33mGymOS-Coach> \x1b[0m', handleMenuInput);
  }

  function handleMenuInput(choice) {
    const opt = choice.trim();

    switch (opt) {
      case '1':
        rl.question('Nombre Completo del Cliente: ', name => {
          rl.question('Edad: ', age => {
            rl.question('Peso Actual (kg): ', weight => {
              rl.question('Peso Meta (kg): ', targetWeight => {
                rl.question('Estatura (cm): ', height => {
                  rl.question('Plan (1: Semanal VIP $29 / 2: Mensual Élite $89): ', planOpt => {
                    const planName = planOpt.trim() === '1' ? 'Plan Semanal VIP ($29 USD)' : 'Plan Mensual Élite ($89 USD)';
                    const newClient = {
                      id: 'cli-' + Date.now(),
                      name: name.trim() || 'Cliente Sin Nombre',
                      age: parseInt(age, 10) || 30,
                      gender: 'male',
                      weight: parseFloat(weight) || 75,
                      targetWeight: parseFloat(targetWeight) || 70,
                      height: parseInt(height, 10) || 175,
                      plan: planName,
                      joinedDate: new Date().toISOString().slice(0, 10),
                      goal: 'Pérdida de Grasa & Definición',
                      checkins: [
                        { week: 1, date: new Date().toISOString().slice(0, 10), weight: parseFloat(weight) || 75, waistCm: 85, adherencePct: 90, pressLoadKg: 60, squatLoadKg: 80 }
                      ]
                    };

                    db.clients.push(newClient);
                    selectedClientIndex = db.clients.length - 1;
                    saveDB(db);

                    console.log(`\n\x1b[32m[ÉXITO] Cliente "${newClient.name}" registrado correctamente y asignado a ${planName}.\x1b[0m\n`);
                    showMenu();
                  });
                });
              });
            });
          });
        });
        break;

      case '2':
        if (!db.clients.length) {
          console.log('\x1b[31mNo hay clientes registrados en la base de datos.\x1b[0m');
          showMenu();
          break;
        }
        console.log('\n--- Lista de Clientes ---');
        db.clients.forEach((c, idx) => {
          console.log(`[${idx + 1}] ${c.name} (${c.plan}) - ${c.checkins.length} check-ins`);
        });
        rl.question('\nSeleccione el número de cliente: ', idx => {
          const i = parseInt(idx, 10) - 1;
          if (i >= 0 && i < db.clients.length) {
            selectedClientIndex = i;
            console.log(`\x1b[32mCliente activo actualizado a: ${db.clients[i].name}\x1b[0m\n`);
          } else {
            console.log('\x1b[31mOpción inválida.\x1b[0m\n');
          }
          showMenu();
        });
        break;

      case '3':
        const client = db.clients[selectedClientIndex];
        if (!client) {
          console.log('\x1b[31mPrimero seleccione un cliente.\x1b[0m');
          showMenu();
          break;
        }
        const nextWeek = client.checkins.length + 1;
        console.log(`\n--- Registrar Check-in Semanal para ${client.name} (Semana ${nextWeek}) ---`);
        rl.question(`Peso esta semana (kg) [Anterior: ${client.checkins[client.checkins.length - 1].weight}kg]: `, w => {
          rl.question('Medida de Cintura (cm): ', waist => {
            rl.question('Porcentaje de Adherencia Calórica (0-100%): ', adh => {
              rl.question('Carga Máxima en Press Plano (kg): ', press => {
                rl.question('Carga Máxima en Sentadilla / Prensa (kg): ', squat => {
                  const checkin = {
                    week: nextWeek,
                    date: new Date().toISOString().slice(0, 10),
                    weight: parseFloat(w) || client.weight,
                    waistCm: parseFloat(waist) || 80,
                    adherencePct: parseInt(adh, 10) || 90,
                    pressLoadKg: parseFloat(press) || 70,
                    squatLoadKg: parseFloat(squat) || 100
                  };

                  client.checkins.push(checkin);
                  client.weight = checkin.weight;
                  saveDB(db);

                  console.log(`\n\x1b[32m[ÉXITO] Check-in Semana ${nextWeek} guardado para ${client.name}.\x1b[0m\n`);
                  showMenu();
                });
              });
            });
          });
        });
        break;

      case '4':
        const cli4 = db.clients[selectedClientIndex];
        if (!cli4) {
          console.log('\x1b[31mSeleccione un cliente primero.\x1b[0m');
          showMenu();
          break;
        }
        console.log(`\n\x1b[1m\x1b[33m--- LOGROS VERIFICABLES POR TIEMPO: ${cli4.name.toUpperCase()} ---\x1b[0m`);
        const achievements = evaluateAchievements(cli4);

        if (achievements.length === 0) {
          console.log('Aún no hay suficientes semanas registradas para desbloquear insignias verificables.');
        } else {
          achievements.forEach((ach, i) => {
            console.log(`\n\x1b[32m[LOGRO VERIFICADO #${i + 1}]\x1b[0m \x1b[1m${ach.title}\x1b[0m`);
            console.log(`   Badge: \x1b[33m[${ach.badge}]\x1b[0m`);
            console.log(`   Detalle: ${ach.detail}`);
          });
        }
        console.log('');
        showMenu();
        break;

      case '5':
        const cli5 = db.clients[selectedClientIndex];
        if (!cli5) {
          console.log('\x1b[31mSeleccione un cliente primero.\x1b[0m');
          showMenu();
          break;
        }
        const bmr = 10 * cli5.weight + 6.25 * cli5.height - 5 * cli5.age + 5;
        const tdee = Math.round(bmr * 1.55);
        const targetCalories = Math.round(tdee * 0.8); // Deficit

        console.log(`\n\x1b[1m\x1b[34m--- DIETA COACH CON GRAMAJES EXACTOS PARA ${cli5.name.toUpperCase()} ---\x1b[0m`);
        console.log(`TDEE: ${tdee} kcal | Meta Calórica: ${targetCalories} kcal/día (-20% Déficit)\n`);

        const meals = generateCoachDiet(cli5.weight, targetCalories);
        meals.forEach(m => {
          console.log(`\x1b[33m${m.meal}\x1b[0m`);
          m.items.forEach(it => console.log(`   • ${it}`));
        });
        console.log('');
        showMenu();
        break;

      case '6':
        console.log(`\n\x1b[1m\x1b[36m--- PRESCRIPCIÓN BIOMECÁNICA POR GRUPO MUSCULAR ---\x1b[0m`);
        console.log(`1. Press Pecho Convergente: 4 series x 8-10 reps (RIR 1). Tip: Depresión escapular & codos a 45°.`);
        console.log(`2. Jalón al Pecho Neutro: 4 series x 10-12 reps (RIR 2). Tip: Depresión escapular previa, codos a caderas.`);
        console.log(`3. Prensa de Piernas Lineal: 4 series x 8-10 reps (RIR 1). Tip: Pelvis fija al respaldo, no guiar valgo.`);
        console.log(`4. Peso Muerto Rumano: 4 series x 8-10 reps (RIR 2). Tip: Bisagra de cadera profunda, barra rozando muslos.\n`);
        showMenu();
        break;

      case '7':
        const cli7 = db.clients[selectedClientIndex];
        if (!cli7) {
          console.log('\x1b[31mSeleccione un cliente primero.\x1b[0m');
          showMenu();
          break;
        }
        console.log('\n' + JSON.stringify(cli7, null, 2) + '\n');
        showMenu();
        break;

      case '0':
        console.log('\n\x1b[32m¡Gracias por usar GymOS Coach Shell! Guardando estado...\x1b[0m');
        saveDB(db);
        rl.close();
        process.exit(0);

      default:
        console.log('\x1b[31mOpción no válida.\x1b[0m\n');
        showMenu();
        break;
    }
  }

  showMenu();
}

if (require.main === module) {
  startShell();
}

module.exports = { loadDB, saveDB, evaluateAchievements, generateCoachDiet };
