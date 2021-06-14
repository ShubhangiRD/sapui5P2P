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

	return Controller.extend("com.vSimpleApp.controller.Home", {
		onInit: function() {
<<<<<<< HEAD
			//get model and model property
			var oUserModel = this.getOwnerComponent().getModel("User");
			var sUsername = oUserModel.getProperty("/Username");
=======
>>>>>>> branch 'main' of https://github.com/ShubhangiRD/sapui5P2P.git

			this.oModel = new JSONModel();
			//get the view name to set model value
			oView = this.getView();
<<<<<<< HEAD
			var sViewName = oView.sViewName;

			if (sViewName === "com.vSimpleApp.view.ChangeContract") {
=======
			var svn = oView.sViewName;

			if (svn === "com.vSimpleApp.view.ChangeContract") {
>>>>>>> branch 'main' of https://github.com/ShubhangiRD/sapui5P2P.git
				this.oModel.loadData(sap.ui.require.toUrl("com/vSimpleApp/model") + "/model.json", null, false);
				this.oModel.oData.selectedKey = "changeContract";
				this.getView().setModel(this.oModel);
			} else
			if (sViewName === "com.vSimpleApp.view.ViewContract") {
				this.oModel.loadData(sap.ui.require.toUrl("com/vSimpleApp/model") + "/model.json", null, false);
				this.oModel.oData.selectedKey = "viewContract";
				this.getView().setModel(this.oModel);
			} else
			if (sViewName === "com.vSimpleApp.view.Home") {
				this.oModel.loadData(sap.ui.require.toUrl("com/vSimpleApp/model") + "/model.json", null, false);
				this.oModel.oData.selectedKey = "createContract";
				this.getView().setModel(this.oModel);
			}

		},
		onUserNamePress: function(oEvent) {
			//creating buttons through button objects
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
							//calling function to navigate to the login page
							var oRouter = that.getOwnerComponent().getRouter();
							oRouter.navTo("Login");
						}
					})
				]
			}).addStyleClass("sapMOTAPopover sapTntToolHeaderPopover");

			oPopover.openBy(oEvent.getSource());
		},

		onItemSelect: function(oEvent) {
			var oComponent = this.getOwnerComponent();
			var iItem = oEvent.getParameter("item");
<<<<<<< HEAD
			var sKey = iItem.getKey();
=======
			var skey = iItem.getKey();
>>>>>>> branch 'main' of https://github.com/ShubhangiRD/sapui5P2P.git
			//get model
			var oVendorModel = this.getOwnerComponent().getModel("Vendor");
<<<<<<< HEAD
			if (sKey === "createContract") {
=======
			if (skey === "createContract") {
>>>>>>> branch 'main' of https://github.com/ShubhangiRD/sapui5P2P.git
				//get model property to set data 
				var oTempContract = oVendorModel.getProperty("/TempContract");
				oTempContract.setData({
					modelData: {}
				});
				//navigate the page according to the condition
				oComponent.getRouter().navTo("Home");
			} else
<<<<<<< HEAD
			if (sKey === "displayContract") {
=======
			if (skey === "displayContract") {
>>>>>>> branch 'main' of https://github.com/ShubhangiRD/sapui5P2P.git
				oComponent.getRouter().navTo("Dashboard");
			} else
<<<<<<< HEAD
			if (sKey === "changeContract") {
=======
			if (skey === "changeContract") {
>>>>>>> branch 'main' of https://github.com/ShubhangiRD/sapui5P2P.git
				oComponent.getRouter().navTo("ChangeContract");
			} else
<<<<<<< HEAD
			if (sKey === "dashboard") {
=======
			if (skey === "dashboard") {
>>>>>>> branch 'main' of https://github.com/ShubhangiRD/sapui5P2P.git
				oComponent.getRouter().navTo("Dashboard");
			}

		},

		onMenuButtonPress: function() {
			//function called to expand and unexpand the tool page
			var sToolPage = this.byId("toolPage");
			sToolPage.setSideExpanded(!sToolPage.getSideExpanded());
		},

		onSaveWithItem: function(oEvent) {
			//get model
			var oVendorModel = this.getOwnerComponent().getModel("Vendor");
			var oLookupModel = this.getOwnerComponent().getModel("Lookup");
			//get model property
			var oTempContract = oVendorModel.getProperty("/TempContract");
			if (oTempContract.validate()) {
				var oRequestPayload = oTempContract.getRequestPayload();
				oRequestPayload.Rcont = "1";
				var oModel = this.getOwnerComponent().getModel("HeaderSet");
				BusyIndicator.show(0);
				//get entity set
				oModel.create("/HeaderSet", oRequestPayload, {
					success: function(oData) {
						BusyIndicator.hide();
						//MessageToast.show("Contract Saved Successfully");
						MessageBox.success("Contract No.: " + oData.Rcont + " created successfully");
						oTempContract.ContractNo = oData.Rcont;
						//set model property
						oLookupModel.setProperty("/IsContractItemSaved", true);
						oLookupModel.refresh(true);
						oVendorModel.refresh(true);
					},
					error: function(oError) {
						BusyIndicator.hide();
						var sErrorMessage = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
						MessageToast.show(sErrorMessage);
					}
				});
			}
			oVendorModel.refresh(true);
		},

		onPostAccrual: function(oEvent) {
			//get model
			var oVendorModel = this.getOwnerComponent().getModel("Vendor");
			var oLookupModel = this.getOwnerComponent().getModel("Lookup");
			//get model property
			var oTempContract = oVendorModel.getProperty("/TempContract");
			if (oTempContract.validateHeader() && oTempContract.Accrual.validate()) {
				var oRequestPayload = oTempContract.getAccrualRequestPayload();
				var sDateTime = oRequestPayload.Aedtm;
				sDateTime = sDateTime.split("T");
				var sDateTime1 = sDateTime[0];
				var sDateTime2 = sDateTime[1];
				sDateTime1 = sDateTime2 + "-01";
				oRequestPayload.Aedtm = sDateTime1 + "T" + sDateTime2;
				var oModel = this.getOwnerComponent().getModel("RebatePostSet");
				BusyIndicator.show(0);
				//get entity set
				oModel.create("/HeaderDocSet", oRequestPayload, {
					success: function(oData) {
						BusyIndicator.hide();
						MessageBox.success("Document No.: " + oData.Rcont + " posted successfully");
						//set model property
						oLookupModel.setProperty("/IsContractAccrualSaved", true);
						oLookupModel.refresh(true);
						oVendorModel.refresh(true);
						//get id to set selected key value
						sap.ui.getCore().byId("__xmlview6--tabid").setSelectedKey("item");
					},
					error: function(oError) {
						BusyIndicator.hide();
						var sErrorMessage = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
						MessageToast.show(sErrorMessage);
					}
				});
			}
			oVendorModel.refresh(true);
		},

		onPostSettlement: function() {
			//get model
			var oVendorModel = this.getOwnerComponent().getModel("Vendor");
			var oLookupModel = this.getOwnerComponent().getModel("Lookup");
			//get model property
			var oTempContract = oVendorModel.getProperty("/TempContract");
			if (oTempContract.validateHeader() && oTempContract.Settlement.validate()) {
				var oRequestPayload = oTempContract.getSettlementRequestPayload();
				var oModel = this.getOwnerComponent().getModel("RebatePostSet");
				BusyIndicator.show(0);
				//get entity set
				oModel.create("/HeaderDocSet", oRequestPayload, {
					success: function(oData) {
						BusyIndicator.hide();
						MessageBox.success("Document No.: " + oData.Rcont + " posted successfully");
						//set model property
						oLookupModel.setProperty("/IsContractSettlementSaved", true);
						oLookupModel.refresh(true);
						oVendorModel.refresh(true);
						//get id to set selected key value
						sap.ui.getCore().byId("__xmlview6--tabid").setSelectedKey("item");
					},
					error: function(oError) {
						BusyIndicator.hide();
						var sErrorMessage = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
						MessageToast.show(sErrorMessage);
					}
				});
			}
			oVendorModel.refresh(true);
		},
		onNavBack: function() {
			//function is called to navigate to the previous page
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
