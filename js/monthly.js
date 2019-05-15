function initMonthly() {
  var table = $("#monthly-performances").DataTable({
    processing: true,
    serverSide: true,
    ajax: api_url + "performances/monthly",
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
    createHighcharts(tableData);
  }, 3000);
  setTableEvents(table);
}

function getTableData(table) {
  var dataArray = [],
    dayArray = [],
    target_timeArray = [],
    work_timeArray = [],
    achievementArray = [],
    overtimeArray = [];

  table.rows({ search: "applied" }).every(function() {
    var data = this.data();
    // alert(data);
    dayArray.push(data.created_at);
    target_timeArray.push(parseInt(data.target_time));
    work_timeArray.push(parseInt(data.work_time));
    achievementArray.push(parseInt(data.achievement));
    overtimeArray.push(parseInt(data.overtime));
  });

  console.log("day-->", dayArray);

  dataArray.push(
    dayArray,
    target_timeArray,
    work_timeArray,
    achievementArray,
    overtimeArray
  );
  console.log(dataArray);
  return dataArray;
}

function createHighcharts(data) {
  Highcharts.setOptions({
    lang: {
      thousandsSep: ","
    }
  });

  Highcharts.chart("monthly-performances-chart", {
    title: {
      text: "Highcharts"
    },
    subtitle: {
      text: "Dummy Chart Subtitle"
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

function setTableEvents(table) {
  // listen for page clicks
  table.on("page", () => {
    drawMonthly = true;
  });

  // listen for updates and adjust the chart accordingly
  table.on("draw", () => {
    if (drawMonthly) {
      drawMonthly = false;
    } else {
      setTimeout(() => {
        var tableData = getTableData(table);
        createHighcharts(tableData);
      }, 3000);
    }
  });
}
