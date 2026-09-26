/**
 * Storage Layer - Manages local persistence for Member data & Leads
 */
import { GymData } from './data.js';

const STORAGE_KEY_MEMBER = 'rfw_member_data';
const STORAGE_KEY_LEADS = 'rfw_trial_leads';
const STORAGE_KEY_ACTIVE_PLAN_MODE = 'rfw_plan_mode'; // 'recurring' | 'custom'

export const Storage = {
  // Get active member (or initialize with default)
  getMember() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_MEMBER);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('LocalStorage error reading member:', e);
    }
    const def = JSON.parse(JSON.stringify(GymData.defaultMember));
    this.saveMember(def);
    return def;
  },

  // Save member
  saveMember(member) {
    try {
      localStorage.setItem(STORAGE_KEY_MEMBER, JSON.stringify(member));
    } catch (e) {
      console.warn('LocalStorage error saving member:', e);
    }
  },

  // Reset member to initial state
  resetMember() {
    const def = JSON.parse(JSON.stringify(GymData.defaultMember));
    this.saveMember(def);
    return def;
  },

  // Add weight log entry
  addWeightLog(weightKg) {
    const member = this.getMember();
    const today = new Date().toISOString().split('T')[0];
    const existingIndex = member.weightHistory.findIndex(entry => entry.date === today);

    if (existingIndex >= 0) {
      member.weightHistory[existingIndex].weightKg = Number(weightKg);
    } else {
      member.weightHistory.push({
        date: today,
        weightKg: Number(weightKg)
      });
    }
    // Keep sorted by date
    member.weightHistory.sort((a, b) => new Date(a.date) - new Date(b.date));
    this.saveMember(member);
    return member;
  },

  // Toggle exercise completion state
  toggleExercise(dayKey, exerciseIndex) {
    const member = this.getMember();
    if (member.weeklyPlan[dayKey] && member.weeklyPlan[dayKey].exercises[exerciseIndex]) {
      const ex = member.weeklyPlan[dayKey].exercises[exerciseIndex];
      ex.completed = !ex.completed;
      this.saveMember(member);
    }
    return member;
  },

  // Add exercise to a specific day
  addExercise(dayKey, exerciseObj) {
    const member = this.getMember();
    if (member.weeklyPlan[dayKey]) {
      member.weeklyPlan[dayKey].exercises.push({
        name: exerciseObj.name,
        sets: Number(exerciseObj.sets) || 3,
        reps: Number(exerciseObj.reps) || 10,
        weightKg: Number(exerciseObj.weightKg) || 0,
        completed: false
      });
      this.saveMember(member);
    }
    return member;
  },

  // Remove exercise from a specific day
  removeExercise(dayKey, exerciseIndex) {
    const member = this.getMember();
    if (member.weeklyPlan[dayKey] && member.weeklyPlan[dayKey].exercises[exerciseIndex] !== undefined) {
      member.weeklyPlan[dayKey].exercises.splice(exerciseIndex, 1);
      this.saveMember(member);
    }
    return member;
  },

  // Save trial pass lead
  saveLead(lead) {
    try {
      const leads = JSON.parse(localStorage.getItem(STORAGE_KEY_LEADS) || '[]');
      leads.push({
        ...lead,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(leads));
      return true;
    } catch (e) {
      console.warn('Failed to save lead:', e);
      return false;
    }
  },

  // Get current plan mode: 'recurring' | 'custom'
  getPlanMode() {
    return localStorage.getItem(STORAGE_KEY_ACTIVE_PLAN_MODE) || 'recurring';
  },

  setPlanMode(mode) {
    localStorage.setItem(STORAGE_KEY_ACTIVE_PLAN_MODE, mode);
  },

  // Add water intake (e.g. +250ml)
  addWater(amountMl = 250) {
    const member = this.getMember();
    member.waterTodayMl = Math.min((member.waterTodayMl || 0) + amountMl, 5000);
    this.saveMember(member);
    return member.waterTodayMl;
  }
};
