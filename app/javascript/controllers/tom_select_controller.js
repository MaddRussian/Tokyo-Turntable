import { Controller } from "@hotwired/stimulus"
import TomSelect from "tom-select"

export default class extends Controller {
  static values = { options: Object }

  connect() {

    this.masterOptions = Object.entries(this.optionsValue || {}).map(([value, text]) => ({
      value,
      text
    }));

    this.tomSelect = new TomSelect(
      this.element,
      {
        maxItems: 3,
        maxOptions: 3,
        create: false,
        plugins: ['remove_button'],
        openOnFocus: false,
        closeAfterSelect: true,
        // render: {
        //   no_results: function(data, escape) {
        //     return 'No results found';
        //   }
        // },
        onItemAdd: () => {
          setTimeout(() => {
          this.tomSelect.setTextboxValue("");
          this.tomSelect.clearOptions();
          this.tomSelect.close();
      }, 0);
    },

        // onChange: (value) => {
        //   if (this.tomSelect.items.length === 0 && !this.tomSelect.getValue()) {
        //     this.tomSelect.clearOptions();
        //   }
        // },

        onType: (str) => {
          const search = str.trim().toLowerCase();

          if (search === "") {
            this.tomSelect.clearOptions();
            this.tomSelect.close();
            return;
          }

          const filtered = this.masterOptions.filter(opt =>
            opt.text.toLowerCase().includes(search)
          );

          this.tomSelect.clearOptions();
          this.tomSelect.addOption(filtered);
          this.tomSelect.refreshOptions(false);
          this.tomSelect.open();
        }
    });

    this.tomSelect.addOption(this.masterOptions);
    this.tomSelect.refreshOptions(false);
}
 // ADD THIS DISCONNECT METHOD
  disconnect() {
    console.log("TomSelect Stimulus controller disconnected.");
    if (this.tomSelect) {
      this.tomSelect.destroy(); // Crucial: destroy the TomSelect instance
      this.tomSelect = null; // Clear the reference
    }
  }

  clearInput(e) {
    console.log(e, "trigger")
  }
}
