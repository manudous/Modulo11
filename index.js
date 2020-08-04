const reservas = [
  {
    tipoHabitacion: "standard",
    desayuno: false,
    pax: 1,
    noches: 3,
  },
  {
    tipoHabitacion: "standard",
    desayuno: false,
    pax: 1,
    noches: 4,
  },
  {
    tipoHabitacion: "suite",
    desayuno: true,
    pax: 2,
    noches: 1,
  },
];

class Bookings {
  constructor() {
    this._reserva = [];
    this._subTotal;
    this._total;
    this._desayuno = 15;
    this._VAT = 1.21;
    this._standard = 0;
    this._suite = 0;
  }

  typeRoom(room) {
    switch (room) {
      case "standard":
        return this._standard;
        break;

      default:
        return this._suite;
        break;
    }
  }

  increasePax(pax) {
    return pax > 1 ? --pax * 40 : 0;
  }

  includeBreakfast(pax, noches, desayuno) {
    return desayuno ? this._desayuno * pax * noches : 0;
  }

  calculateSubtotal() {
    this._subTotal = this._reserva.reduce(
      (acc, { tipoHabitacion, pax, noches, desayuno }) =>
        acc +
        this.typeRoom(tipoHabitacion) * noches +
        this.increasePax(pax) +
        this.includeBreakfast(pax, noches, desayuno),
      0
    );
  }

  calculateTotal() {
    this._total = this._subTotal * this._VAT;
  }

  get subTotal() {
    return `${this._subTotal}€`;
  }

  get total() {
    return `${this._total.toFixed(2)}€`;
  }

  set reserva(reservaExterior) {
    this._reserva = reservaExterior;
    this.calculateSubtotal();
    this.calculateTotal();
  }
}

class particular extends Bookings {
  constructor() {
    super();
    this._suite = 150;
    this._standard = 100;
  }
}

class packageHoliday extends Bookings {
  constructor() {
    super();
    this._suite = this._standard = 100;
  }

  get total() {
    return `${(this._total * 0.85).toFixed(2)}€`;
  }
}

const reservaParticular = new particular();
const reservaPackageHoliday = new packageHoliday();

reservaParticular.reserva = reservas;
reservaPackageHoliday.reserva = reservas;

console.log("Subtotal de la reserva como Particular", reservaParticular.subTotal);
console.log("Total de la resreva como Particular", reservaParticular.total);

console.log(
  "Subtotal de la reserva por Tour Operador",
  reservaPackageHoliday.subTotal
);
console.log(
  "Total de la reserva por Tour Operador aplicado descuento",
  reservaPackageHoliday.total
);
