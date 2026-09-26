/**
 * Core Application Data Store
 * Defines gym details, programs, offers, reviews, and default member state.
 * Strictly no emojis.
 */

export const GymData = {
  brandName: "ROYAL FITNESS WORLD",
  tagline: "Train Smart Stay Strong",
  phone: "+15550198234", // Configurable for WhatsApp
  formattedPhone: "+1 (555) 019-8234",
  email: "contact@royalfitnessworld.com",
  hours: "Monday – Sunday: 5:00 AM – 11:00 PM",
  location: "742 Evergreen Athletic Blvd, Metro Center",
  rating: "4.9",
  reviewCount: "480+",
  activeMembers: "1,850+",

  // Programs & Specialty Clubs
  programs: [
    {
      id: "hypertrophy",
      title: "Strength & Hypertrophy",
      badge: "Power",
      duration: "60 Min",
      intensity: "High",
      desc: "Progressive overload systems, compound lifting protocols, and targeted muscular hypertrophy coaching.",
      schedule: "Mon / Wed / Fri • 06:30 AM & 06:00 PM"
    },
    {
      id: "functional-hiit",
      title: "Functional HIIT & Cross-Flow",
      badge: "Fit Flow",
      duration: "45 Min",
      intensity: "Maximum",
      desc: "High-cadence metabolic conditioning, kettlebell circuits, plyometrics, and functional endurance.",
      schedule: "Tue / Thu / Sat • 07:00 AM & 05:30 PM"
    },
    {
      id: "combat",
      title: "Combat & Boxing Studio",
      badge: "Power",
      duration: "50 Min",
      intensity: "High",
      desc: "Authentic boxing fundamentals, heavy bag conditioning, footwork drills, and core defensive agility.",
      schedule: "Mon / Wed / Sat • 07:30 PM"
    },
    {
      id: "recovery",
      title: "Mobility & Active Recovery",
      badge: "Balance",
      duration: "45 Min",
      intensity: "Restorative",
      desc: "Dynamic spinal decompression, myofascial release, deep tissue mobility flows, and breathing mechanics.",
      schedule: "Daily • 08:00 AM & 08:00 PM"
    },
    {
      id: "coaching",
      title: "1-on-1 Elite Coaching",
      badge: "Mindset",
      duration: "Personalized",
      intensity: "Tailored",
      desc: "Biometric body scanning, bespoke nutrition frameworks, and dedicated private trainer mentorship.",
      schedule: "Custom Flexible Booking"
    }
  ],

  // Subscription Pricing & Limited-Time Offers
  pricing: [
    {
      id: "starter",
      title: "Starter Pass",
      period: "Monthly",
      monthlyPrice: 49,
      annualPrice: 39,
      badge: "Flexible",
      features: [
        "Full access to gym floor & weights",
        "Cardio theater & locker facilities",
        "Axion Member Web App access",
        "1 Trainer introduction session"
      ],
      popular: false
    },
    {
      id: "pro",
      title: "Pro Athlete",
      period: "Quarterly",
      monthlyPrice: 79,
      annualPrice: 62,
      badge: "Most Popular",
      features: [
        "Everything in Starter Pass",
        "Unlimited Functional HIIT & Spin Clubs",
        "Bi-weekly InBody metric scans",
        "Sauna, steam & cold plunge recovery",
        "Dedicated weekly workout routines"
      ],
      popular: true
    },
    {
      id: "elite",
      title: "Elite VIP",
      period: "Annual",
      monthlyPrice: 119,
      annualPrice: 94,
      badge: "Best Value",
      features: [
        "Everything in Pro Athlete",
        "All Specialty Clubs & Combat Studio",
        "2 Monthly 1-on-1 Personal Training slots",
        "Bespoke nutritionist diet planner",
        "VIP guest passes (4 per month)",
        "24/7 Locker priority reservation"
      ],
      popular: false
    }
  ],

  // Facilities & Equipment Showcases
  facilities: [
    {
      title: "Heavy Iron & Olympic Racks",
      category: "Strength Zone",
      highlight: "Hammer Strength, Eleiko Barbells, Calibrated Plates"
    },
    {
      title: "Endurance & Cardio Theater",
      category: "Cardio Arena",
      highlight: "Woodway Treadmills, Concept2 Rowers, Assault Bikes"
    },
    {
      title: "Contrast Hydrotherapy Suite",
      category: "Recovery & Spa",
      highlight: "Cedar Dry Sauna, Cold Plunge (3°C), Infrared Lounge"
    },
    {
      title: "Combat & Agility Turf",
      category: "Studio",
      highlight: "Boxing Ring, Heavy Bags, Sled Sprint Track (30m)"
    }
  ],

  // Customer Reviews & Transformation Proof
  reviews: [
    {
      name: "Marcus Vance",
      role: "Member for 14 Months",
      achievement: "-16 kg Fat Loss & 140kg Deadlift",
      rating: "5.0",
      quote: "The facility and the Axion member tracker app completely transformed my consistency. Setting my weekly routine and tracking every lift keeps me unstoppable."
    },
    {
      name: "Elena Rostova",
      role: "Member for 8 Months",
      achievement: "Completed First Marathon & Functional Fitness",
      rating: "5.0",
      quote: "Top-tier equipment, pristine contrast hydrotherapy recovery, and the group clubs build real athletic discipline. Highly recommended."
    },
    {
      name: "David Chen",
      role: "Member for 2 Years",
      achievement: "+8 kg Lean Muscle Mass",
      rating: "5.0",
      quote: "Having my daily routine right on my phone without complicated apps is pure gold. Axion is hands down the best gym experience in the city."
    }
  ],

  // Categorized Exercise Registry for the Workout Planner
  exerciseLibrary: {
    chest: [
      { name: "Barbell Bench Press", target: "Pectorals, Anterior Deltoid", defaultSets: 4, defaultReps: 10, defaultKg: 80 },
      { name: "Incline Dumbbell Press", target: "Upper Chest", defaultSets: 3, defaultReps: 12, defaultKg: 30 },
      { name: "Cable Chest Flyes", target: "Inner Chest Tension", defaultSets: 3, defaultReps: 15, defaultKg: 20 },
      { name: "Weighted Dips", target: "Lower Chest, Triceps", defaultSets: 3, defaultReps: 10, defaultKg: 15 }
    ],
    back: [
      { name: "Conventional Deadlift", target: "Posterior Chain, Erectors", defaultSets: 4, defaultReps: 6, defaultKg: 120 },
      { name: "Wide Grip Lat Pulldown", target: "Latissimus Dorsi", defaultSets: 4, defaultReps: 10, defaultKg: 65 },
      { name: "Barbell Bent Over Row", target: "Mid-Back, Rhomboids", defaultSets: 4, defaultReps: 8, defaultKg: 75 },
      { name: "Single Arm Dumbbell Row", target: "Lats & Scapular Control", defaultSets: 3, defaultReps: 12, defaultKg: 34 }
    ],
    legs: [
      { name: "Barbell Back Squat", target: "Quadriceps, Glutes", defaultSets: 4, defaultReps: 8, defaultKg: 100 },
      { name: "Romanian Deadlift", target: "Hamstrings, Glute-Ham Tie-in", defaultSets: 3, defaultReps: 10, defaultKg: 85 },
      { name: "Leg Press 45-Degree", target: "Quad Hypertrophy", defaultSets: 4, defaultReps: 12, defaultKg: 180 },
      { name: "Walking Dumbbell Lunges", target: "Unilateral Leg Strength", defaultSets: 3, defaultReps: 14, defaultKg: 22 },
      { name: "Standing Calf Raises", target: "Gastrocnemius", defaultSets: 4, defaultReps: 15, defaultKg: 50 }
    ],
    shoulders: [
      { name: "Overhead Military Press", target: "Anterior & Lateral Deltoids", defaultSets: 4, defaultReps: 8, defaultKg: 55 },
      { name: "Dumbbell Lateral Raises", target: "Lateral Deltoids (Cap Width)", defaultSets: 4, defaultReps: 15, defaultKg: 14 },
      { name: "Face Pulls with Rope", target: "Rear Deltoids, Rotator Cuff", defaultSets: 4, defaultReps: 15, defaultKg: 27 },
      { name: "Dumbbell Shrugs", target: "Upper Trapezius", defaultSets: 3, defaultReps: 12, defaultKg: 36 }
    ],
    arms: [
      { name: "Barbell Bicep Curl", target: "Biceps Brachii", defaultSets: 3, defaultReps: 10, defaultKg: 35 },
      { name: "Incline Dumbbell Hammer Curl", target: "Brachialis & Forearms", defaultSets: 3, defaultReps: 12, defaultKg: 16 },
      { name: "Triceps Rope Pushdown", target: "Lateral & Medial Triceps", defaultSets: 4, defaultReps: 12, defaultKg: 32 },
      { name: "Skull Crushers (EZ Bar)", target: "Triceps Long Head", defaultSets: 3, defaultReps: 10, defaultKg: 30 }
    ],
    core: [
      { name: "Hanging Leg Raises", target: "Lower Abs & Hip Flexors", defaultSets: 3, defaultReps: 15, defaultKg: 0 },
      { name: "Cable Woodchoppers", target: "Obliques & Rotational Power", defaultSets: 3, defaultReps: 14, defaultKg: 25 },
      { name: "Ab Wheel Rollouts", target: "Rectus Abdominis Stability", defaultSets: 3, defaultReps: 12, defaultKg: 0 },
      { name: "Weighted Plank", target: "Core Isometric Bracing", defaultSets: 3, defaultReps: 60, defaultKg: 20 }
    ]
  },

  // Default Mock Member (matches the reference screen: "Michael David")
  defaultMember: {
    id: "mem_axion_77",
    name: "Michael David",
    email: "michael.david@axionfit.io",
    avatar: "assets/images/avatar.jpg",
    membership: {
      plan: "Elite VIP Member",
      memberId: "AX-88219",
      status: "Active",
      validUntil: "November 28, 2027",
      clubAccess: "All Clubs + Hydrotherapy"
    },
    activityScore: 80,
    stepsToday: 8792,
    stepTarget: 10000,
    fitFlowMinutes: 40,
    fitFlowTarget: 60,
    morningRunKm: 10.58,
    activeSession: {
      title: "Morning Run",
      durationSeconds: 2725, // 45:25
      distanceKm: 1.25,
      calories: 638,
      bpm: 120,
      joinedToday: 21,
      routePoints: [
        { label: "Start", km: 0 },
        { label: "Riverfront Checkpoint", km: 4.3 },
        { label: "Hill Climb", km: 4.5 },
        { label: "Current Position", km: 1.25 }
      ]
    },
    weeklyPlan: {
      monday: {
        splitName: "Chest & Triceps (Push A)",
        exercises: [
          { name: "Barbell Bench Press", sets: 4, reps: 10, weightKg: 80, completed: true },
          { name: "Incline Dumbbell Press", sets: 3, reps: 12, weightKg: 30, completed: true },
          { name: "Cable Chest Flyes", sets: 3, reps: 15, weightKg: 20, completed: true },
          { name: "Triceps Rope Pushdown", sets: 4, reps: 12, weightKg: 32, completed: false }
        ]
      },
      tuesday: {
        splitName: "Back & Biceps (Pull A)",
        exercises: [
          { name: "Conventional Deadlift", sets: 4, reps: 6, weightKg: 120, completed: false },
          { name: "Wide Grip Lat Pulldown", sets: 4, reps: 10, weightKg: 65, completed: false },
          { name: "Barbell Bent Over Row", sets: 4, reps: 8, weightKg: 75, completed: false },
          { name: "Barbell Bicep Curl", sets: 3, reps: 10, weightKg: 35, completed: false }
        ]
      },
      wednesday: {
        splitName: "Active Recovery & Mobility",
        exercises: [
          { name: "Dynamic Hip & Hamstring Flow", sets: 3, reps: 15, weightKg: 0, completed: false },
          { name: "Thoracic Spine Foam Rolling", sets: 3, reps: 20, weightKg: 0, completed: false },
          { name: "Contrast Hydrotherapy Session", sets: 1, reps: 1, weightKg: 0, completed: false }
        ]
      },
      thursday: {
        splitName: "Legs & Core (Legs A)",
        exercises: [
          { name: "Barbell Back Squat", sets: 4, reps: 8, weightKg: 100, completed: false },
          { name: "Romanian Deadlift", sets: 3, reps: 10, weightKg: 85, completed: false },
          { name: "Leg Press 45-Degree", sets: 4, reps: 12, weightKg: 180, completed: false },
          { name: "Hanging Leg Raises", sets: 3, reps: 15, weightKg: 0, completed: false }
        ]
      },
      friday: {
        splitName: "Shoulders & Upper Volume",
        exercises: [
          { name: "Overhead Military Press", sets: 4, reps: 8, weightKg: 55, completed: false },
          { name: "Dumbbell Lateral Raises", sets: 4, reps: 15, weightKg: 14, completed: false },
          { name: "Face Pulls with Rope", sets: 4, reps: 15, weightKg: 27, completed: false },
          { name: "Weighted Dips", sets: 3, reps: 10, weightKg: 15, completed: false }
        ]
      },
      saturday: {
        splitName: "Conditioning & HIIT Flow",
        exercises: [
          { name: "Assault Bike Intervals", sets: 5, reps: 60, weightKg: 0, completed: false },
          { name: "Kettlebell Swings", sets: 4, reps: 20, weightKg: 24, completed: false },
          { name: "Sled Push Turf Sprint", sets: 4, reps: 30, weightKg: 60, completed: false }
        ]
      },
      sunday: {
        splitName: "Full Rest & Regeneration",
        exercises: []
      }
    },
    // Weight history trajectory
    weightHistory: [
      { date: "2026-07-05", weightKg: 83.4 },
      { date: "2026-07-19", weightKg: 82.8 },
      { date: "2026-08-02", weightKg: 81.9 },
      { date: "2026-08-16", weightKg: 81.3 },
      { date: "2026-08-30", weightKg: 80.6 },
      { date: "2026-09-13", weightKg: 79.9 },
      { date: "2026-09-23", weightKg: 79.2 }
    ],
    targetWeightKg: 77.0,
    waterTodayMl: 2250,
    waterGoalMl: 3000
  }
};
