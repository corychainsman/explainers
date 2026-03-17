export const TOPICS = [
  {
    id: 'solar-day',
    title: "Earth's Solar Day",
    menuLabel: 'Solar Day',
    scaleMode: 'notToScale',
    speed: 0.2, // 1 day in ~5 real seconds
    loopDays: 2, // loop every 2 days
    followPlanet: 'Earth',
    camera: { offset: [5, 3, 5] }, // relative to Earth
    focusPlanet: 'Earth',
    description: `A "day" is one rotation of Earth relative to the Sun — not relative to the distant stars. This takes about 24 hours.

But Earth also moves along its orbit while it spins. After one full 360° rotation (a sidereal day, ~23h 56m), Earth has shifted slightly in its orbit, so it needs to rotate about 1° more to face the Sun again. That extra ~4 minutes is why a solar day is longer than a sidereal day.

Watch Earth spin and notice how the line from Earth to the Sun slowly shifts as Earth orbits. Every day, your noon points slightly differently in space.`,
    annotations: [
      { type: 'label', target: 'Earth', text: 'Earth' },
      { type: 'label', target: 'Sun', text: 'Sun' },
      { type: 'line', from: 'Earth', to: 'Sun', label: 'Sunlight direction' },
    ],
  },
  {
    id: 'solar-year',
    title: "Earth's Solar Year",
    menuLabel: 'Solar Year',
    scaleMode: 'notToScale',
    speed: 12, // 1 year in ~30 real seconds
    loopDays: 365.25,
    followPlanet: null, // top-down fixed view
    camera: { position: [0, 70, 10], target: [0, 0, 0] },
    focusPlanet: 'Earth',
    description: `A year is one complete orbit of Earth around the Sun — about 365.25 days. That extra quarter-day is why we add a leap day every four years.

Earth's axis is tilted 23.4° from vertical. As Earth orbits, different hemispheres lean toward or away from the Sun, creating seasons. In June, the Northern Hemisphere tilts sunward (summer); in December, it tilts away (winter).

Watch Earth trace its full orbit. The tilt direction stays fixed in space (pointing toward Polaris), but Earth's position changes, so which hemisphere gets more direct sunlight shifts throughout the year.`,
    annotations: [
      { type: 'label', target: 'Earth', text: 'Earth' },
      { type: 'label', target: 'Sun', text: 'Sun' },
      { type: 'seasonMarkers', show: true },
    ],
  },
  {
    id: 'moon-phases',
    title: 'Moon Phases',
    menuLabel: 'Moon Phases',
    scaleMode: 'notToScale',
    speed: 2.5, // 1 lunar month (~29.5 days) in ~12 real seconds
    loopDays: 29.5,
    followPlanet: 'Earth',
    camera: { offset: [0, 10, 8] }, // above Earth-Moon
    focusPlanet: 'Earth',
    description: `The Moon orbits Earth every ~27.3 days. Half of the Moon is always lit by the Sun — but how much of that lit side we see from Earth changes as the Moon moves.

When the Moon is between Earth and the Sun, the lit side faces away from us: New Moon. When Earth is between the Moon and the Sun, we see the full lit face: Full Moon. The phases in between — crescents, quarters, gibbous — are the geometry of the Sun-Earth-Moon angle.

Watch the Moon orbit and notice how the angle between the Sun and Moon (as seen from Earth) determines the phase. The cycle from New Moon back to New Moon takes ~29.5 days (a synodic month) — slightly longer than one orbit, because Earth has moved along its own orbit.`,
    annotations: [
      { type: 'label', target: 'Moon', text: 'Moon' },
      { type: 'label', target: 'Earth', text: 'Earth' },
      { type: 'sunDirection', show: true },
      { type: 'phaseLabel', show: true },
    ],
  },
  {
    id: 'eclipses',
    title: 'Eclipses',
    menuLabel: 'Eclipses',
    scaleMode: 'notToScale',
    speed: 0, // paused by default, user scrubs
    loopDays: null,
    followPlanet: 'Earth',
    camera: { offset: [8, 2, 0] }, // side view of alignment
    focusPlanet: 'Earth',
    description: `A solar eclipse happens when the Moon passes directly between the Sun and Earth, casting a shadow on Earth. A lunar eclipse happens when Earth is directly between the Sun and Moon, casting its shadow on the Moon.

So why don't eclipses happen every month? Because the Moon's orbit is tilted about 5° from Earth's orbital plane. Most months, the Moon passes slightly above or below the Sun-Earth line. Eclipses only occur when the Moon crosses Earth's orbital plane (the "nodes") at the right time.

Use the timeline scrubber to find the alignment. Notice how the Moon's tilted orbit usually misses the perfect lineup.`,
    annotations: [
      { type: 'label', target: 'Moon', text: 'Moon' },
      { type: 'label', target: 'Earth', text: 'Earth' },
      { type: 'shadowCone', show: true },
      { type: 'orbitalPlane', show: true },
    ],
  },
  {
    id: 'sunrise-sunset',
    title: 'Sunrises & Sunsets',
    menuLabel: 'Sunrise/Sunset',
    scaleMode: 'notToScale',
    speed: 0.2, // 1 day in ~5 real seconds
    loopDays: 2,
    followPlanet: 'Earth',
    camera: { offset: [3, 1, 3] }, // very close, low angle
    focusPlanet: 'Earth',
    description: `As Earth rotates, every point on its surface sweeps through the sunlit and dark hemispheres. When your location rotates from the dark side into sunlight, you see a sunrise. When you rotate out of sunlight, it's sunset.

At sunrise and sunset the Sun is near the horizon — its light passes through the maximum thickness of atmosphere. Short-wavelength blue light scatters away, leaving the warm reds and oranges.

Watch the observer marker on Earth's surface. As Earth rotates, the marker moves into and out of the lit hemisphere. The boundary between light and dark (the "terminator") is where dawn and dusk happen.`,
    annotations: [
      { type: 'label', target: 'Earth', text: 'Earth' },
      { type: 'observerMarker', show: true },
      { type: 'dayNightLabels', show: true },
    ],
  },
  {
    id: 'whole-orrery',
    title: 'The Whole Orrery',
    menuLabel: 'Full System',
    scaleMode: 'toScale',
    speed: 9, // Mercury orbit (~88 days) in ~10 seconds
    loopDays: null,
    followPlanet: null,
    camera: { position: [0, 200, 300], target: [0, 0, 0] },
    focusPlanet: null,
    description: `This is the full solar system in motion, shown at approximately correct proportional distances.

The inner planets — Mercury, Venus, Earth, and Mars — orbit relatively close to the Sun and move quickly. The gas giants — Jupiter, Saturn, Uranus, and Neptune — are vastly farther away and take years, decades, even centuries to complete one orbit.

Neptune, the most distant planet, is 30 times farther from the Sun than Earth. At this scale, the planets themselves are too small to see — they're just dots. The solar system is overwhelmingly empty space, governed by gravity across enormous distances.`,
    annotations: [
      { type: 'planetLabels', show: true },
    ],
  },
]

export function getTopicById(id) {
  return TOPICS.find((t) => t.id === id) || null
}
