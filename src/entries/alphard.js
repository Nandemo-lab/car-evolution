// Bootstrap only -- wires one vehicle's data into the shared engine.
// No data, no logic; if you're tempted to add either here, it belongs
// in src/cars/alphard.js or src/car-page.js instead.
import { initCarPage } from '../car-page.js'
import alphard from '../cars/alphard.js'

initCarPage(alphard)
