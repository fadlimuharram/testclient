var api_url = "http://ec2-34-207-128-225.compute-1.amazonaws.com/api/";
var drawMonthly = false;
var drawYearly = false;
var isShowInbox = false;
var isShowNotification = false;
var queryRageYearly = "";

$(function() {
  initMonthly();
  initYearly();
  initRangeInput();
  getAllInbox();
  getALlNotification();
  toggleInboxShow();
  toggleNotificationShow();
  $("#toggleinbox").click(function() {
    toggleInboxShow();
  });
  $("#togglenotif").click(function() {
    toggleNotificationShow();
  });
  $("#btn__range").click(function() {
    queryRageYearly =
      "?start_date=" +
      $("#startdate").val() +
      "&end_date=" +
      $("#enddate").val();
    initYearly();
  });
});

function initRangeInput() {
  $("#startdate").val(
    moment()
      .subtract(30, "days")
      .format("YYYY-MM-D")
  );
  $("#enddate").val(moment().format("YYYY-MM-D"));
}

function getALlNotification() {
  $.ajax({
    type: "GET",
    url: api_url + "notifications",
    data: {
      format: "json"
    },
    success: function(data) {
      Object.keys(data).forEach(function(val) {
        console.log(val);
      });

      var temphtml = "";
      Object.keys(data).forEach(function(value) {
        console.log("ty", data[value].type);
        if (data[value].type === "very_important") {
          temphtml += '<li class="list-group-item very_important">';
        } else if (data[value].type === "slightly_important") {
          temphtml += '<li class="list-group-item slightly_important">';
        } else if (data[value].type === "normal") {
          temphtml += '<li class="list-group-item normal">';
        } else {
          temphtml += '<li class="list-group-item normal">';
        }
        temphtml +=
          '<img src="https://via.placeholder.com/150" class="rounded" alt="Cinque Terre">' +
          '<div class="content">' +
          "<h5>" +
          data[value].title +
          "</h5>" +
          "<p>" +
          data[value].content +
          "</p>" +
          "</div>" +
          "</li>";
      });

      $(".list__notification").html(temphtml);
    },
    error: function() {
      console.log("error get data inbox");
    }
  });
}

function getAllInbox() {
  $.ajax({
    type: "GET",
    url: api_url + "inboxes",
    data: {
      format: "json"
    },
    success: function(data) {
      console.log("--success---");
      console.log(data);
      Object.keys(data).forEach(function(val) {
        console.log(val);
      });

      console.log("--success---");
      var temphtml = "";
      Object.keys(data).forEach(function(value) {
        temphtml +=
          '<li class="list-group-item">' +
          '<img src="https://via.placeholder.com/150" class="rounded" alt="Cinque Terre">' +
          '<div class="content">' +
          "<p>" +
          data[value].title +
          "</p>" +
          "<p>" +
          data[value].content +
          "</p>" +
          "</div>" +
          "</li>";
      });

      $(".list__inbox").html(temphtml);
    },
    error: function() {
      console.log("error get data inbox");
    }
  });
}

function toggleInboxShow() {
  $("#notification__list").hide(500);
  isShowNotification = false;
  if (isShowInbox) {
    $("#inbox__list").show(500);
    isShowInbox = false;
  } else {
    $("#inbox__list").hide(500);
    isShowInbox = true;
  }
}

function toggleNotificationShow() {
  $("#inbox__list").hide(500);
  isShowInbox = false;
  if (isShowNotification) {
    $("#notification__list").show(500);
    isShowNotification = false;
  } else {
    $("#notification__list").hide(500);
    isShowNotification = true;
  }
}
