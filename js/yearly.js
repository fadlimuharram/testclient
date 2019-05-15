function initYearly() {
  var uriRange = queryRageYearly !== "" ? "/" + queryRageYearly : "";
  if ($.fn.DataTable.isDataTable("#yearly-performances")) {
    $("#yearly-performances")
      .DataTable()
      .clear()
      .destroy();
  }
  var table = $("#yearly-performances").DataTable({
    processing: true,
    serverSide: true,
    ajax: api_url + "performances" + uriRange,
    columns: [
      { data: "created_at", name: "created_at" },
      { data: "target_time", name: "target_time" },
      { data: "work_time", name: "work_time" },
      { data: "achievement", name: "achievement" },
      { data: "overtime", name: "overtime" }
    ]
  });

  setTimeout(() => {
    var tableData = getTableData(table);
    createYearlyColumnChart(tableData);
    getPercentageData(table);

    createYearlyPieChart(tableData);
    createYearlyAreaChart(tableData);
  }, 3000);
  setTableEventsYearly(table);
}

function getPercentageData(table) {
  var dataArray = [];

  const lengthAchivement = table.rows({ search: "applied" }).data().length;
  // alert(table.rows.length);
  var ttl = 0;
  table.rows({ search: "applied" }).every(function() {
    var data = this.data();
    console.log("debq", lengthAchivement);
    var result = parseInt(data.achievement) / parseInt(lengthAchivement);

    dataArray.push(result);
    ttl += result;
  });

  console.log("abcccccc->>>", ttl, dataArray);
}

function createYearlyColumnChart(data) {
  Highcharts.chart("yearly-performances-chart-column", {
    chart: {
      type: "area"
    },
    title: {
      text: "Datatables"
    },
    subtitle: {
      text: "Dummy Subtitle Chart"
    },
    xAxis: [
      {
        categories: data[0]
      }
    ],
    yAxis: [
      {
        // first yaxis
        title: {
          text: "Hour"
        }
      }
    ],
    series: [
      {
        name: "Target Time",
        color: "#0071A7",
        type: "column",
        data: data[1]
      },
      {
        name: "Work Time",
        color: "#FFFB00",
        type: "column",
        data: data[2]
      },
      {
        name: "Over Time",
        color: "#FF8100",
        type: "column",
        data: data[4]
      }
    ],
    tooltip: {
      shared: true
    },
    legend: {
      backgroundColor: "#ececec",
      shadow: true
    },
    credits: {
      enabled: false
    },
    noData: {
      style: {
        fontSize: "16px"
      }
    }
  });
}

function createYearlyPieChart(data) {
  Highcharts.chart("yearly-performances-chart-pie", {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie"
    },
    title: {
      text: "Dummy Data"
    },
    tooltip: {
      pointFormat: "dummy"
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "dummy",
          style: {
            color:
              (Highcharts.theme && Highcharts.theme.contrastTextColor) ||
              "black"
          }
        }
      }
    },
    series: [
      {
        name: "Brands",
        colorByPoint: true,
        data: [
          {
            name: "Chrome",
            y: 61.41,
            sliced: true,
            selected: true
          },
          {
            name: "Internet Explorer",
            y: 11.84
          },
          {
            name: "Firefox",
            y: 10.85
          },
          {
            name: "Edge",
            y: 4.67
          },
          {
            name: "Safari",
            y: 4.18
          },
          {
            name: "Sogou Explorer",
            y: 1.64
          },
          {
            name: "Opera",
            y: 1.6
          },
          {
            name: "QQ",
            y: 1.2
          },
          {
            name: "Other",
            y: 2.61
          }
        ]
      }
    ]
  });
}

function createYearlyAreaChart(data) {
  Highcharts.chart("yearly-performances-chart-area", {
    chart: {
      type: "area"
    },
    title: {
      text: "Area Chart"
    },
    subtitle: {
      text: "asda"
    },
    xAxis: [
      {
        categories: data[0]
      }
    ],
    yAxis: [
      {
        // first yaxis
        title: {
          text: "Hour"
        }
      }
    ],
    series: [
      {
        name: "Target Time",
        color: "#0071A7",
        data: data[1]
      },
      {
        name: "Work Time",
        color: "#FFFB00",
        data: data[2]
      },
      {
        name: "Over Time",
        color: "#FF8100",
        data: data[4]
      }
    ],
    legend: {
      backgroundColor: "#ececec",
      shadow: true
    }
  });
}

function setTableEventsYearly(table) {
  // listen for page clicks
  table.on("page", () => {
    drawYearly = true;
  });

  // listen for updates and adjust the chart accordingly
  table.on("draw", () => {
    if (drawYearly) {
      drawYearly = false;
    } else {
      setTimeout(() => {
        var tableData = getTableData(table);
        createYearlyColumnChart(tableData);
        getPercentageData(table);

        createYearlyPieChart(tableData);
        createYearlyAreaChart(tableData);
      }, 3000);
    }
  });
}
