/**
 * GymOS Supabase Integration Client Module
 * Authentication, Multi-tenant RLS Database Operations, and Cloud Sync Engine
 */

(function (window) {
  'use strict';

  // --- SUPABASE CONFIGURATION ---
  const SUPABASE_URL = 'https://xgtaukrydufhojokyhyd.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_SxypO_CkNwnp4-iPTHOB2g_D8fdu_gY';

  let supabase = null;

  // Initialize Supabase Client SDK if library exists
  function initSupabase() {
    if (window.supabase && window.supabase.createClient) {
      supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      console.log('GymOS Supabase Client Engine Connected.');
    } else {
      console.warn('Supabase SDK CDN not loaded. Operating in Local Fallback Mode.');
    }
  }

  // --- AUTHENTICATION METHODS ---
  async function signUp(email, password, fullName, phone = '', role = 'client') {
    if (!supabase) return { error: 'Supabase offline' };
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone,
          role: role
        }
      }
    });
    return { data, error };
  }

  async function signIn(email, password) {
    if (!supabase) return { error: 'Supabase offline' };
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  }

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
  }

  async function getCurrentProfile() {
    if (!supabase) return null;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*, gyms(*)')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
    return profile;
  }

  // --- MULTI-TENANT DATABASE CRUD OPERATIONS ---
  async function getRoutines() {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('routines')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error('Error fetching routines:', error);
    return data || [];
  }

  async function saveRoutine(clientId, title, splitType, exercises) {
    if (!supabase) return null;
    const profile = await getCurrentProfile();
    if (!profile) return null;

    const { data, error } = await supabase
      .from('routines')
      .insert([
        {
          gym_id: profile.gym_id,
          client_id: clientId,
          created_by: profile.id,
          title: title,
          split_type: splitType,
          exercises: exercises
        }
      ])
      .select();

    if (error) console.error('Error saving routine:', error);
    return data ? data[0] : null;
  }

  async function getDiets() {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('diets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error('Error fetching diets:', error);
    return data || [];
  }

  async function saveDiet(clientId, title, dietType, calories, protein, carbs, fat, meals) {
    if (!supabase) return null;
    const profile = await getCurrentProfile();
    if (!profile) return null;

    const { data, error } = await supabase
      .from('diets')
      .insert([
        {
          gym_id: profile.gym_id,
          client_id: clientId,
          created_by: profile.id,
          title: title,
          diet_type: dietType,
          calories: calories,
          protein: protein,
          carbs: carbs,
          fat: fat,
          meals: meals
        }
      ])
      .select();

    if (error) console.error('Error saving diet:', error);
    return data ? data[0] : null;
  }

  async function getCheckins(clientId) {
    if (!supabase) return [];
    let query = supabase.from('checkins').select('*').order('week_number', { ascending: true });
    if (clientId) query = query.eq('client_id', clientId);

    const { data, error } = await query;
    if (error) console.error('Error fetching checkins:', error);
    return data || [];
  }

  async function saveCheckin(clientId, weekNumber, weightKg, waistCm, adherencePct, pressLoadKg, squatLoadKg, achievements = []) {
    if (!supabase) return null;
    const profile = await getCurrentProfile();
    if (!profile) return null;

    const { data, error } = await supabase
      .from('checkins')
      .insert([
        {
          gym_id: profile.gym_id,
          client_id: clientId,
          week_number: weekNumber,
          weight_kg: weightKg,
          waist_cm: waistCm,
          adherence_pct: adherencePct,
          press_load_kg: pressLoadKg,
          squat_load_kg: squatLoadKg,
          achievements: achievements
        }
      ])
      .select();

    if (error) console.error('Error saving checkin:', error);
    return data ? data[0] : null;
  }

  // --- EXPOSE API GLOBAL MODULE ---
  window.GymOSSupabase = {
    init: initSupabase,
    signUp,
    signIn,
    signOut,
    getCurrentProfile,
    getRoutines,
    saveRoutine,
    getDiets,
    saveDiet,
    getCheckins,
    saveCheckin
  };

  document.addEventListener('DOMContentLoaded', initSupabase);

})(window);
