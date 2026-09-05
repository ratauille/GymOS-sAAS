/**
 * GymOS Firebase Data Connect Client Module
 * Interfaz para ejecutar Queries y Mutations en PostgreSQL / Cloud SQL vía Firebase Data Connect
 */
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDataConnect, executeQuery, executeMutation } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-data-connect.js";

const firebaseConfig = {
  apiKey: "AIzaSyAnkNGipTl1bH4sHvvJkVIHzDS4RGW60AU",
  authDomain: "gymos-saas.firebaseapp.com",
  projectId: "gymos-saas",
  storageBucket: "gymos-saas.firebasestorage.app",
  messagingSenderId: "176518675928",
  appId: "1:176518675928:web:5a33865adea38dee98c6ad"
};

const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);

// Conexión al servicio Data Connect definido en dataconnect.yaml
export const dataConnect = getDataConnect(app, {
  service: "gymos-saas-service",
  location: "us-central1",
  connector: "default"
});

/**
 * API GymOS Data Connect
 */
export const GymOSDataConnect = {
  // 1. Crear nuevo Prospecto / Lead en PostgreSQL
  async createLead(leadData) {
    try {
      const mutation = `
        mutation CreateLead($fullName: String!, $email: String!, $phone: String, $goal: String, $planInterest: String) {
          lead_insert(data: {
            fullName: $fullName,
            email: $email,
            phone: $phone,
            goal: $goal,
            planInterest: $planInterest,
            status: "new"
          })
        }
      `;
      const result = await executeMutation(dataConnect, mutation, leadData);
      console.log("Lead registrado en PostgreSQL vía Data Connect:", result);
      return result;
    } catch (err) {
      console.error("Error al registrar lead en Data Connect:", err);
      throw err;
    }
  },

  // 2. Listar Clases Disponibles
  async listClasses() {
    try {
      const query = `
        query ListClasses {
          classes {
            id
            name
            description
            capacity
            startTime
            trainer {
              id
              fullName
            }
            gym {
              id
              name
            }
          }
        }
      `;
      const result = await executeQuery(dataConnect, query);
      return result.data?.classes || [];
    } catch (err) {
      console.error("Error al obtener clases:", err);
      return [];
    }
  },

  // 3. Crear Reserva para Usuario
  async createBooking(userId, classId) {
    try {
      const mutation = `
        mutation CreateBooking($userId: String!, $classId: UUID!) {
          booking_insert(data: {
            userId: $userId,
            classId: $classId,
            status: "confirmed"
          })
        }
      `;
      const result = await executeMutation(dataConnect, mutation, { userId, classId });
      return result;
    } catch (err) {
      console.error("Error al crear reserva:", err);
      throw err;
    }
  }
};

// Exportar al objeto global para acceso directo desde app.js o la consola
if (typeof window !== "undefined") {
  window.GymOSDataConnect = GymOSDataConnect;
}
