import { Application } from "@hotwired/stimulus"

import TomSelect from "tom-select";
window.TomSelect = TomSelect;

const application = Application.start()

// Configure Stimulus development experience
application.debug = false
window.Stimulus   = application

export { application }
