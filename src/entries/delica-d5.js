// Bootstrap only -- wires one vehicle's data into the shared engine.
// No data, no logic; if you're tempted to add either here, it belongs
// in src/cars/delica-d5.js or src/car-page.js instead.
import { initCarPage } from '../car-page.js'
import delicaD5 from '../cars/delica-d5.js'

initCarPage(delicaD5)
