/*
    * ViewModel Method
    *
   $("#btn").click(function () {
       $.get("/Home/GetList", null, DataBind);

       function DataBind(List) {
           var setData = $("#setList");
           for (var i = 0; i < List.length; i++) {
               var data = "<tr class='" + List[i].CustomerID + "'>" +
                   "<td>" + List[i].CustomerID + "</td>" +
                   "<td>" + List[i].CompanyName + "</td>" +
                   "<td>" + List[i].ContactName + "</td>" +
                   "<td>" + List[i].Phone + "</td>" +
                   "</tr> ";
               setData.append(data);
           }
       }
   });  **/

var page = 1, searchID, searchComp;

//Page load
$(document).ready(function () {
    onLoad();
});

//Add button
$("#addBtn").click(function () {

    $("#createAndUpdate").show();
    $("#listPage").hide();
});

//Create function
$("#saveBtn").click(function () {

    var cudObj = {
        customerID: $("#customerID").val(),
        companyName: $("#companyName").val(),
        contactName: $("#contactName").val(),
        phone: $("#phone").val()
    };

    $.ajax({
        url: "/Home/Create",
        type: "POST",
        dataType: "json",
        data: cudObj
    });

    $("#createAndUpdate").hide();
    $("#listPage").show();
});

//Edit button
$("#setList").on("click", ".editBtn", function () {

    var rowdata = $(this).parents("tr");
    var cols = rowdata.children("td");

    $("#customerID").val($(cols[0]).text());
    $("#companyName").val($(cols[1]).text());
    $("#contactName").val($(cols[2]).text());
    $("#phone").val($(cols[3]).text());

    $("#createAndUpdate").show();
    $("#listPage").hide();
    $("#updateBtn").show();
    $("#saveBtn").hide();
});

//Update function
$("#updateBtn").click(function () {

    var cudObj = {
        customerID: $("#customerID").val(),
        companyName: $("#companyName").val(),
        contactName: $("#contactName").val(),
        phone: $("#phone").val()
    };

    $.ajax({
        url: "/Home/Update",
        type: "POST",
        dataType: "json",
        data: cudObj
    });

    $("#createAndUpdate").hide();
    $("#listPage").show();
    $("#setList tr").remove();
    onLoad();
});

//Delete function
$("#setList").on("click", ".delBtn", function () {

    $.ajax({
        url: "/Home/Delete",
        type: "POST",
        dataType: "json",
        data: { customerID: $(this).attr("value") }
    });
    $("#setList tr").remove();
    onLoad();
});

$("#cancelBtn").click(function () {
    $("#createAndUpdate").hide();
    $("#listPage").show();
});

//Search data
$("#search").click(function () {

    $("#setList tr").remove();
    page = 1;
    $("#pageNo").val(page);
    onLoad();

});

//Previous page
$("#prePage").click(function () {

    $("#setList tr").remove();
    page -= 1;
    $("#pageNo").val(page);
    onLoad();

});

//Next page
$("#nextPage").click(function () {

    $("#setList tr").remove();
    page += 1;
    $("#pageNo").val(page);
    onLoad();

});

//First page
$("#firstPage").click(function () {

    $("#setList tr").remove();
    page = 1;
    $("#pageNo").val(page);
    onLoad();

});

//Last page
$("#lastPage").click(function () {

    page = $("#totalPage").val();
    onLoad();
    $("#setList tr").remove();
});

//GetList
function onLoad() {
    $.ajax({
        url: "/Home/GetList",
        type: "GET",
        dataType: "json",
        data: { page: page, searchID: $("#searchID").val(), searchComp: $("#searchComp").val() },
        success: function (data) {
            var list = data.dataList;
            $("#pageNo").val(data.page);
            $("#totalPage").val(data.lastPage);
            BtnValidation();

            $.each(data.dataList, function (i, item) {
                list = "<tr id='row_" + item.CustomerID + "'>" +
                    "<td id='customerID' >" + item.CustomerID + "</td>" +
                    "<td id='companyName' >" + item.CompanyName + "</td>" +
                    "<td id='contactName'  >" + item.ContactName + "</td>" +
                    "<td id='phone' >" + item.Phone + "</td>" +
                    "<td>" +
                    "<button type='button' class='editBtn' value='" + item.CustomerID + "'>編輯</button>&nbsp;" +
                    "<button type='button' class='delBtn' value='" + item.CustomerID + "'>刪除</button>" +
                    "</td>" +
                    "</tr> ";

                $("#setList").append(list);
            });
        }
    });
};

//Button validation
function BtnValidation() {
    if ($("#pageNo").val() == 1) {
        document.getElementById("firstPage").disabled = true;
        document.getElementById("prePage").disabled = true;
    } else {
        document.getElementById("firstPage").disabled = false;
        document.getElementById("prePage").disabled = false;
    }

    if ($("#pageNo").val() == $("#totalPage").val()) {
        document.getElementById("nextPage").disabled = true;
        document.getElementById("lastPage").disabled = true;
    } else {
        document.getElementById("nextPage").disabled = false;
        document.getElementById("lastPage").disabled = false;
    }
}