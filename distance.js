document.addEventListener("DOMContentLoaded", () => {
  // Extension de Math pour ajouter round6
  Math.round6 = function(number) {
    return Math.round(number * 1e6) / 1e6;
  };

  class Distance {
    #meter = 0;

    get m() {
      return this.#meter;
    }

    set m(value) {
      this.#meter = Number(value);
    }

    get cm() {
      return Math.round6(this.m * 100);
    }

    set cm(value) {
      this.m = value / 100;
    }

    get mm() {
      return Math.round6(this.cm * 10);
    }

    set mm(value) {
      this.cm = value / 10;
    }

    get in() {
      return Math.round6(this.cm / 2.54);
    }

    set in(value) {
      this.cm = value * 2.54;
    }

    get ft() {
      return Math.round6(this.in / 12);
    }

    set ft(value) {
      this.in = value * 12;
    }

    get yd() {
      return Math.round6(this.ft / 3);
    }

    set yd(value) {
      this.ft = value * 3;
    }
  }

  const distance = new Distance();

  const view = {
    inputs: document.querySelectorAll("input"),
    show: function() {
      for (let input of this.inputs) {
        input.value = distance[input.id];
      }
    }
  };

  // Contrôleur unique pour gérer les événements d'entrée
  document.querySelector("form").addEventListener("input", (event) => {
    const unit = event.target.id;
    const value = event.target.value;
    if (value === '') {
      // Réinitialiser les valeurs si le champ est vide
      view.inputs.forEach(input => input.value = '');
    } else {
      distance[unit] = value;
      view.show();
    }
  });

  // Initialiser la vue avec la distance par défaut
  view.show();
});
