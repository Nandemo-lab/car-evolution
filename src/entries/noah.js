// Bootstrap only -- wires one vehicle's data into the shared engine.
// No data, no logic; if you're tempted to add either here, it belongs
// in src/cars/noah.js or src/car-page.js instead.
import { initCarPage } from '../car-page.js'
import noah from '../cars/noah.js'

initCarPage(noah)
