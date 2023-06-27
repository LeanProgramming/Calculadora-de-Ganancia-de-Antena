let ctx_diameter = document.getElementById("chart-diameter").getContext("2d");
let chart_diameter = new Chart(ctx_diameter, {
  type: "line",
  options: {
    scales: {
      x: {
        title: {
          display: true,
          text: "Frecuencia de la antena (GHz)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Ganacia(dB)",
        },
      },
    },
  },
});

let ctx_frequency = document.getElementById("chart-frequency").getContext("2d");
let chart_frequency = new Chart(ctx_frequency, {
  type: "line",
  options: {
    scales: {
      x: {
        title: {
          display: true,
          text: "Diámetro de la antenta (metros)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Ganacia(dB)",
        },
      },
    },
  },
});

function calcularGanancia() {
  var diameter = parseFloat(document.getElementById("diameter").value);
  var frequency = parseFloat(document.getElementById("frequency").value);

  if (isNaN(diameter) || isNaN(frequency)) {
    alert(
      "Por favor, ingresa valores válidos para el diámetro y la frecuencia."
    );
    return;
  }

  let area = Math.PI * Math.pow(diameter / 2, 2);
  let lambda = (3 * Math.pow(10, 8)) / (frequency * Math.pow(10, 9));
  let ganancia = 10 * Math.log10((7 * area) / Math.pow(lambda, 2));

  document.getElementById("ganancia").innerHTML = ganancia.toFixed(2) + " dB";
  document.getElementById("result-container").style.display = "block";
  document.getElementById("diameterValue").innerHTML = `${diameter} m`;
  document.getElementById("frequencyValue").innerHTML = `${frequency} GHz`;

  // Crear gráfica
  generarGrafica(chart_diameter, diameter);
  generarGrafica(chart_frequency, null,frequency);
}

function generarGrafica(chart, diameter = null, frequency = null) {
  let chartData = generarDatosGrafica(diameter, frequency);

  chart.data = chartData;
  chart.update();
}

function generarDatosGrafica(diameter, frequency) {
  let data = [];
  let labels = [];

  if (diameter == null) {
    let diameter = 0.5;
    while (diameter <= 15) {
      let area = Math.PI * Math.pow(diameter / 2, 2);
      let lambda = (3 * Math.pow(10, 8)) / (frequency * Math.pow(10, 9));
      let ganancia = 10 * Math.log10((7 * area) / Math.pow(lambda, 2));
      data.push({
        x: diameter.toFixed(2),
        y: ganancia.toFixed(2),
      });

      labels.push(diameter.toFixed(2));

      diameter += 0.5;
    }
  }
  
  if (frequency == null) {
    let frequency = 0.5;
    while (frequency <= 15) {
      let area = Math.PI * Math.pow(diameter / 2, 2);
      let lambda = (3 * Math.pow(10, 8)) / (frequency * Math.pow(10, 9));
      let ganancia = 10 * Math.log10(7 * area / Math.pow(lambda, 2));
      data.push({
        x: frequency.toFixed(2),
        y: ganancia.toFixed(2),
      });

      labels.push(frequency.toFixed(2));

      frequency += 0.5;
    }
  }

  return {
    datasets: [
      {
        label: "Ganancia (dB)",
        data: data,
        borderColor: "blue",
        fill: false,
      },
    ],
    labels: labels,
  };
}
