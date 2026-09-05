/**
 * GymOS Firebase Data Connect Frontend Integration Engine
 * Connects GraphQL Queries (ListClasses, GetUserBookings) & Mutations (CreateBooking) to GymOS UI
 */

(function (window) {
  'use strict';

  const DATA_CONNECT_ENDPOINT = 'https://us-central1-gymos-saas.cloudfunctions.net/gymos-saas-service/graphql';

  async function executeGraphQL(queryOrMutation, variables = {}) {
    try {
      const response = await fetch(DATA_CONNECT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          query: queryOrMutation,
          variables: variables
        })
      });

      const result = await response.json();
      if (result.errors) {
        console.warn('Data Connect GraphQL Warning:', result.errors);
      }
      return result.data;
    } catch (err) {
      console.error('Data Connect Network Error:', err);
      return null;
    }
  }

  // GraphQL Operations
  const QUERIES = {
    listClasses: `
      query ListClasses {
        classes {
          id
          name
          description
          capacity
          startTime
          trainer { id fullName email }
          gym { id name address }
        }
      }
    `,
    getUserBookings: `
      query GetUserBookings($userId: String!) {
        bookings(where: { userId: { eq: $userId } }) {
          class { id name startTime trainer { fullName } }
          bookedAt
          status
        }
      }
    `
  };

  const MUTATIONS = {
    createBooking: `
      mutation CreateBooking($userId: String!, $classId: UUID!) {
        booking_insert(data: { userId: $userId, classId: $classId, status: "confirmed" })
      }
    `,
    createGym: `
      mutation CreateGym($name: String!, $address: String!, $phone: String) {
        gym_insert(data: { name: $name, address: $address, phone: $phone })
      }
    `
  };

  // Global Window API
  window.GymOSDataConnect = {
    async fetchClasses() {
      const data = await executeGraphQL(QUERIES.listClasses);
      return data?.classes || [];
    },

    async fetchUserBookings(userId) {
      const data = await executeGraphQL(QUERIES.getUserBookings, { userId });
      return data?.bookings || [];
    },

    async bookClass(userId, classId) {
      const data = await executeGraphQL(MUTATIONS.createBooking, { userId, classId });
      return data ? true : false;
    },

    async registerGym(name, address, phone) {
      const data = await executeGraphQL(MUTATIONS.createGym, { name, address, phone });
      return data;
    }
  };

  console.log('GymOS Data Connect Client API Engine Loaded.');

})(window);
