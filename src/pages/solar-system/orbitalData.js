// Real astronomical data for the solar system
// Distances in AU, periods in Earth days, radii in km, tilts in degrees

export const SUN = {
  name: 'Sun',
  radiusKm: 696340,
  color: '#FDB813',
}

export const PLANETS = [
  {
    name: 'Mercury',
    orbitalRadiusAU: 0.387,
    orbitalPeriodDays: 87.97,
    rotationPeriodHours: 1407.6,
    axialTiltDeg: 0.034,
    radiusKm: 2439.7,
    color: '#8c7e6d',
    moons: [],
  },
  {
    name: 'Venus',
    orbitalRadiusAU: 0.723,
    orbitalPeriodDays: 224.7,
    rotationPeriodHours: -5832.5, // retrograde
    axialTiltDeg: 177.4,
    radiusKm: 6051.8,
    color: '#e6c87a',
    moons: [],
  },
  {
    name: 'Earth',
    orbitalRadiusAU: 1.0,
    orbitalPeriodDays: 365.25,
    rotationPeriodHours: 23.934,
    axialTiltDeg: 23.44,
    radiusKm: 6371,
    color: '#4a90d9',
    moons: [
      {
        name: 'Moon',
        orbitalRadiusKm: 384400,
        orbitalPeriodDays: 27.32,
        radiusKm: 1737.4,
        color: '#c0c0c0',
        orbitalTiltDeg: 5.145,
      },
    ],
  },
  {
    name: 'Mars',
    orbitalRadiusAU: 1.524,
    orbitalPeriodDays: 687.0,
    rotationPeriodHours: 24.623,
    axialTiltDeg: 25.19,
    radiusKm: 3389.5,
    color: '#c1440e',
    moons: [
      { name: 'Phobos', orbitalRadiusKm: 9376, orbitalPeriodDays: 0.319, radiusKm: 11.27, color: '#8a7d6b' },
      { name: 'Deimos', orbitalRadiusKm: 23463, orbitalPeriodDays: 1.263, radiusKm: 6.2, color: '#8a7d6b' },
    ],
  },
  {
    name: 'Jupiter',
    orbitalRadiusAU: 5.203,
    orbitalPeriodDays: 4331.0,
    rotationPeriodHours: 9.925,
    axialTiltDeg: 3.13,
    radiusKm: 69911,
    color: '#c88b3a',
    moons: [
      { name: 'Io', orbitalRadiusKm: 421700, orbitalPeriodDays: 1.769, radiusKm: 1821.6, color: '#e5d55a' },
      { name: 'Europa', orbitalRadiusKm: 671034, orbitalPeriodDays: 3.551, radiusKm: 1560.8, color: '#b0a080' },
      { name: 'Ganymede', orbitalRadiusKm: 1070412, orbitalPeriodDays: 7.155, radiusKm: 2634.1, color: '#8a8070' },
      { name: 'Callisto', orbitalRadiusKm: 1882709, orbitalPeriodDays: 16.689, radiusKm: 2410.3, color: '#6a6050' },
    ],
  },
  {
    name: 'Saturn',
    orbitalRadiusAU: 9.537,
    orbitalPeriodDays: 10747.0,
    rotationPeriodHours: 10.656,
    axialTiltDeg: 26.73,
    radiusKm: 58232,
    color: '#e0c068',
    hasRings: true,
    ringInnerRadiusKm: 74500,
    ringOuterRadiusKm: 140220,
    moons: [
      { name: 'Titan', orbitalRadiusKm: 1221870, orbitalPeriodDays: 15.945, radiusKm: 2574.7, color: '#d4a030' },
      { name: 'Rhea', orbitalRadiusKm: 527108, orbitalPeriodDays: 4.518, radiusKm: 763.8, color: '#c0c0c0' },
      { name: 'Enceladus', orbitalRadiusKm: 237948, orbitalPeriodDays: 1.370, radiusKm: 252.1, color: '#f0f0f0' },
    ],
  },
  {
    name: 'Uranus',
    orbitalRadiusAU: 19.19,
    orbitalPeriodDays: 30589.0,
    rotationPeriodHours: -17.24, // retrograde
    axialTiltDeg: 97.77,
    radiusKm: 25362,
    color: '#72b0d4',
    moons: [
      { name: 'Titania', orbitalRadiusKm: 435910, orbitalPeriodDays: 8.706, radiusKm: 788.4, color: '#a0a0a0' },
      { name: 'Oberon', orbitalRadiusKm: 583520, orbitalPeriodDays: 13.463, radiusKm: 761.4, color: '#909090' },
    ],
  },
  {
    name: 'Neptune',
    orbitalRadiusAU: 30.07,
    orbitalPeriodDays: 59800.0,
    rotationPeriodHours: 16.11,
    axialTiltDeg: 28.32,
    radiusKm: 24622,
    color: '#3f54ba',
    moons: [
      { name: 'Triton', orbitalRadiusKm: 354759, orbitalPeriodDays: -5.877, radiusKm: 1353.4, color: '#b0a8a0' },
    ],
  },
]

// Scale conversion helpers
// In "to scale" mode: 1 AU = 100 scene units, planet radii proportional
// In "not to scale" mode: compressed distances, enlarged radii

const AU_TO_SCENE = 100 // 1 AU = 100 units in scene
const KM_TO_SCENE = AU_TO_SCENE / 149597870.7 // km → scene units

// Sun radius in scene units (to scale)
export const SUN_RADIUS_SCENE = SUN.radiusKm * KM_TO_SCENE

export function getScaledValues(planet, scaleMode, t = 0) {
  if (scaleMode === 'toScale') {
    const orbitalRadius = planet.orbitalRadiusAU * AU_TO_SCENE
    const radius = planet.radiusKm * KM_TO_SCENE
    return { orbitalRadius, radius }
  }

  // Not to scale: log-compress distances, enlarge radii
  const logRadius = Math.log2(planet.orbitalRadiusAU + 1) * 20 + 8
  const minRadius = 0.3
  const maxRadius = 2.5
  const normalizedSize = Math.log(planet.radiusKm / 2400) / Math.log(69911 / 2400)
  const radius = minRadius + normalizedSize * (maxRadius - minRadius)

  return { orbitalRadius: logRadius, radius: Math.max(minRadius, radius) }
}

export function getSunScaledRadius(scaleMode) {
  if (scaleMode === 'toScale') return SUN_RADIUS_SCENE
  return 4 // fixed visible size in not-to-scale mode
}

export function getMoonScaledValues(moon, parentScaledRadius, scaleMode) {
  if (scaleMode === 'toScale') {
    const orbitalRadius = moon.orbitalRadiusKm * KM_TO_SCENE
    const radius = moon.radiusKm * KM_TO_SCENE
    return { orbitalRadius, radius }
  }

  // Not to scale: moons orbit close to parent, visible size
  const baseOrbit = parentScaledRadius * 2 + 0.5
  const normalizedOrbit = moon.orbitalRadiusKm / 2000000 // normalize to ~1
  const orbitalRadius = baseOrbit + normalizedOrbit * 2
  const radius = Math.max(0.1, parentScaledRadius * 0.2)

  return { orbitalRadius, radius }
}

// Compute orbital position at time t (in days)
export function getOrbitalPosition(orbitalRadius, period, t) {
  const angle = (2 * Math.PI * t) / Math.abs(period)
  const direction = period < 0 ? -1 : 1
  return [
    orbitalRadius * Math.cos(angle * direction),
    0,
    orbitalRadius * Math.sin(angle * direction),
  ]
}
