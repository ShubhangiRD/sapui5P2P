sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"jquery.sap.global",
	"sap/m/Popover",
	"sap/m/Button",
	"sap/m/library",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/BusyIndicator", "sap/ui/core/routing/History",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"com/vSimpleApp/model/RebateConditionItem",
	"com/vSimpleApp/model/Scale",
	"com/vSimpleApp/model/Material",
	"com/vSimpleApp/model/EligibleData",
	"com/vSimpleApp/model/AccrualItem",
	"com/vSimpleApp/model/SettlementItem",
	"com/vSimpleApp/service/dateServices",
	"com/vSimpleApp/model/Formatter"

], function(Controller, jQuery, Popover, Button, library, JSONModel, BusyIndicator, History, MessageToast, MessageBox,
	RebateConditionItem, Scale, Material, EligibleData, AccrualItem, SettlementItem, dateServices, Formatter) {
	"use strict";
	var ButtonType = library.ButtonType,
		PlacementType = library.PlacementType;
	var oView;
	//console.log(sap.ui.getCore().byId("idVendorInput").setValue("dfs"));
	return Controller.extend("com.vSimpleApp.controller.Home", {
		onInit: function() {

			var oUserModel = this.getOwnerComponent().getModel("User");
			var sUsername = oUserModel.getProperty("/Username");
		/*	if (sUsername === "") {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("Login");
			}*/
			this.oModel = new JSONModel();

			oView = this.getView();
			var vn = oView.sViewName;
			if (vn === "com.vSimpleApp.view.ChangeContract") {
				this.oModel.loadData(sap.ui.require.toUrl("com/vSimpleApp/model") + "/model.json", null, false);
				this.oModel.oData.selectedKey = "changeContract";
				this.getView().setModel(this.oModel);
			} else
			if (vn === "com.vSimpleApp.view.ViewContract") {
				this.oModel.loadData(sap.ui.require.toUrl("com/vSimpleApp/model") + "/model.json", null, false);
				this.oModel.oData.selectedKey = "viewContract";
				this.getView().setModel(this.oModel);
			} else
			if (vn === "com.vSimpleApp.view.Home") {
				this.oModel.loadData(sap.ui.require.toUrl("com/vSimpleApp/model") + "/model.json", null, false);
				this.oModel.oData.selectedKey = "createContract";
				this.getView().setModel(this.oModel);
			}

		},
		onUserNamePress: function(oEvent) {
			var that = this;
			var oPopover = new Popover({
				showHeader: false,
				placement: PlacementType.Bottom,
				content: [
					new Button({
						text: "Feedback",
						type: ButtonType.Transparent
					}),
					new Button({
						text: "Help",
						type: ButtonType.Transparent
					}),
					new Button({
						text: "Logout",
						type: ButtonType.Transparent,
						press: function() {
							var oRouter = that.getOwnerComponent().getRouter();
							oRouter.navTo("Login");
						}
					})
				]
			}).addStyleClass("sapMOTAPopover sapTntToolHeaderPopover");

			oPopover.openBy(oEvent.getSource());
		},

		onItemSelect: function(oEvent) {
			//navigated items
			var oComponent = this.getOwnerComponent();
			var item = oEvent.getParameter("item");
			var key = item.getKey();
			var oVendorModel = this.getOwnerComponent().getModel("Vendor");
			if (key === "createContract") {
				var oTempContract = oVendorModel.getProperty("/TempContract");
				oTempContract.setData({
					modelData: {}
				});
				oComponent.getRouter().navTo("Home");
			} else
			if (key === "displayContract") {
				oComponent.getRouter().navTo("Dashboard");
			} else
			if (key === "changeContract") {
				oComponent.getRouter().navTo("ChangeContract");
			} else
			if (key === "dashboard") {
				oComponent.getRouter().navTo("Dashboard");
			}
			//this.byId("pageContainer").to(this.getView().createId(item.getKey()));
		},

		onMenuButtonPress: function() {
			var toolPage = this.byId("toolPage");

			toolPage.setSideExpanded(!toolPage.getSideExpanded());
		},

		onSaveWithItem: function(oEvent) {
			//get model
			var oVendorModel = this.getOwnerComponent().getModel("Vendor");
			var oLookupModel = this.getOwnerComponent().getModel("Lookup");
			var oTempContract = oVendorModel.getProperty("/TempContract");
			//call the request payload method
			if (oTempContract.validate()) {
				var oRequestPayload = oTempContract.getRequestPayload();
				oRequestPayload.Rcont = "1";
				var oModel = this.getOwnerComponent().getModel("HeaderSet");
				BusyIndicator.show(0);
				//save the data
				oModel.create("/HeaderSet", oRequestPayload, {
					success: function(oData) {
						BusyIndicator.hide();
						//MessageToast.show("Contract Saved Successfully");
						MessageBox.success("Contract No.: " + oData.Rcont + " created successfully");
						oTempContract.ContractNo = oData.Rcont;
						oLookupModel.setProperty("/IsContractItemSaved", true);
						oLookupModel.refresh(true);
						oVendorModel.refresh(true);
					},
					error: function(oError) {
						BusyIndicator.hide();
						var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
						MessageToast.show(errorMsg);
					}
				});
			}
			oVendorModel.refresh(true);
		},

		onPostAccrual: function(oEvent) {
			//get the model
			var oVendorModel = this.getOwnerComponent().getModel("Vendor");
			var oLookupModel = this.getOwnerComponent().getModel("Lookup");
			var oTempContract = oVendorModel.getProperty("/TempContract");
			//validate the data and call the class requestpayload method
			if (oTempContract.validateHeader() && oTempContract.Accrual.validate()) {
				var oRequestPayload = oTempContract.getAccrualRequestPayload();
				var dt = oRequestPayload.Aedtm;
				dt = dt.split("T");
				var dt1 = dt[0];
				var dt2 = dt[1];
				dt1 = dt1 + "-01";
				oRequestPayload.Aedtm = dt1 + "T" + dt2;
				var oModel = this.getOwnerComponent().getModel("RebatePostSet");
				BusyIndicator.show(0);
				//post the Accural data into enttityset
				oModel.create("/HeaderDocSet", oRequestPayload, {
					success: function(oData) {
						BusyIndicator.hide();
						MessageBox.success("Document No.: " + oData.Rcont + " posted successfully");
						oLookupModel.setProperty("/IsContractAccrualSaved", true);
						oLookupModel.refresh(true);
						oVendorModel.refresh(true);
						sap.ui.getCore().byId("__xmlview6--tabid").setSelectedKey("item");
					},
					error: function(oError) {
						BusyIndicator.hide();
						var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
						MessageToast.show(errorMsg);
					}
				});
			}
			oVendorModel.refresh(true);
		},

		onPostSettlement: function() {
			var oVendorModel = this.getOwnerComponent().getModel("Vendor");
			var oLookupModel = this.getOwnerComponent().getModel("Lookup");
			var oTempContract = oVendorModel.getProperty("/TempContract");
			//validate the data based on class method and call the settlement request payload
			if (oTempContract.validateHeader() && oTempContract.Settlement.validate()) {
				var oRequestPayload = oTempContract.getSettlementRequestPayload();
				var oModel = this.getOwnerComponent().getModel("RebatePostSet");
				BusyIndicator.show(0);
				//post the Settlement data into enttityset
				oModel.create("/HeaderDocSet", oRequestPayload, {
					success: function(oData) {
						BusyIndicator.hide();
						MessageBox.success("Document No.: " + oData.Rcont + " posted successfully");
						oLookupModel.setProperty("/IsContractSettlementSaved", true);
						oLookupModel.refresh(true);
						oVendorModel.refresh(true);
						sap.ui.getCore().byId("__xmlview6--tabid").setSelectedKey("item");
					},
					error: function(oError) {
						BusyIndicator.hide();
						var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
						MessageToast.show(errorMsg);
					}
				});
			}
			oVendorModel.refresh(true);
		},
		onNavBack: function() {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("overview", true);
			}
		}
	});
});