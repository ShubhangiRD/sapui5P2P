sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/BusyIndicator",
	"sap/m/MessageToast",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Filter",
	"sap/m/library",
	"sap/ui/core/Fragment",

	"sap/m/ColumnListItem",
	"jquery.sap.global",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History"

], function(Controller, JSONModel, BusyIndicator, MessageToast, FilterOperator, Filter, library, Fragment,
	MessageBox, History) {
	"use strict";
	//global variable
	var oView, Ebeln, oComponent;
	var aListofVendor = [];
	var sVendorNum, sVendorname, svendorname, sPlant, CreateDocDate, CreateDoctypeDate;
	return Controller.extend("com.vSimpleApp.controller.GoodReceipt", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.vSimpleApp.view.view.GoodReceipt
		 */
		onInit: function() {
			oView = this.getView();
			var oModel = this.getOwnerComponent().getModel("VHeader");
			//set the model on view to be used by the UI controls
			this.getView().setModel(oModel);
			oComponent = this.getOwnerComponent();

			this.getVendorList();
			var oPOItemsModel = new JSONModel();
			oView.setModel(oPOItemsModel, "oPOItemsModel");

			//define the model to  field editable true or false
			var oEditModel = new JSONModel({
				isEditable: true
			});

			this.getView().setModel(oEditModel, "EditModel");

			//define the model to  field visible true or false
			var oVisi = new JSONModel({
				isvisible: false
			});

			this.getView().setModel(oVisi, "visiblemodel");

			//define the model 
			var oAllDataModel = new sap.ui.model.json.JSONModel([]);
			oView.setModel(oAllDataModel, "oAllDataModel");

		},
		onNavBack: function(oevt) {

			//to clear all the model data or fields and navigate to back page
			var oPurchaseModel = oComponent.getModel("PurchaseModel");
			var oTempContract = oPurchaseModel.getProperty("/TempContract");
			oTempContract.setData();

			// var s = oPurchaseModel.oData.TempContract.destroy;

			var oAllDataModel = oView.getModel("oAllDataModel");
			oAllDataModel.setData();
			oAllDataModel.refresh(true);
			oView.getModel("visiblemodel").setProperty("/isvisible", false);
			oPurchaseModel.refresh(true);
			this.getView().getModel("VHeader").refresh();
			oView.byId("idPD").setValue("");
			oView.byId("idlant").setValue("");
			oView.byId("idVendor").setValue("");
			oView.byId("idMatdis").setValue("");
			oView.byId("idMatNo").setValue("");
			oView.byId("VMatNo").setValue("");
			oView.byId("idMatGrp").setValue("");
			oView.byId("idmatGrptwo").setValue("");
			oView.byId("ident").setValue("");
			oView.byId("idQunat").setValue("");
			oView.byId("idQntS").setValue("");
			oView.byId("idQuantsku").setValue("");
			oView.byId("idDelNot").setValue("");
			oView.byId("idDelNott").setValue("");
			oView.byId("idPOrder").setValue("");
			this.getOwnerComponent().getRouter().navTo("ShowTiles");

		},

		onMenuButtonPress: function() {
			var oPurchaseModel = this.getOwnerComponent().getModel("PurchaseModel");
			var oTempContract = oPurchaseModel.getProperty("/TempContract");
			oTempContract.setData();
			// var s = oPurchaseModel.oData.TempContract.destroy;
			oPurchaseModel.refresh(true);
			oView.byId("idPD").setValue("");
			oView.byId("idlant").setValue("");
			oView.byId("idVendor").setValue("");
			oView.byId("idMatdis").setValue("");
			oView.byId("idMatNo").setValue("");
			oView.byId("VMatNo").setValue("");
			oView.byId("idMatGrp").setValue("");
			oView.byId("idmatGrptwo").setValue("");
			oView.byId("ident").setValue("");
			oView.byId("idQunat").setValue("");
			oView.byId("idQntS").setValue("");
			oView.byId("idQuantsku").setValue("");
			oView.byId("idDelNot").setValue("");
			oView.byId("idDelNott").setValue("");
			oView.byId("idPOrder").setValue("");
			var oComponent2 = this.getOwnerComponent();
			oComponent2.getRouter().navTo("ShowTiles");
		},
		/*Storage Location start*/

		handleStorageLocationValue: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();
			this.inputId = oEvent.getSource().getId();
			//create value help dialog 
			if (!this._valueHelpDialogStorage) {
				this._valueHelpDialogStorage = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.StorageLocation",
					this
				);
				this.getView().addDependent(this._valueHelpDialogStorage);
			}
			this.getStorageLocation();
			if (sInputValue.includes(")")) {
				var sSubsString = sInputValue.split(")")[1];
				sInputValue = sSubsString.trim();
			}
			// ccreate a filter for the binding
			this._valueHelpDialogStorage.getBinding("items").filter(new Filter([new Filter(
					"Lgort",
					FilterOperator.Contains, sInputValue),
				new Filter(
					"Lgobe",
					FilterOperator.Contains, sInputValue
				)
			]));
			this._valueHelpDialogStorage.open(sInputValue);
		},

		_handleStorageLocationSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Lgort",
				FilterOperator.Contains, sValue
			), new Filter(
				"Lgobe",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handleStorageLocationClose: function(oEvent) {
			var oSelectedItem = oEvent.getParameter("selectedItem");
			if (oSelectedItem) {
				var sProductInput = this.byId(this.inputId);
				sProductInput.setValue(oSelectedItem.getTitle());

			}
			oEvent.getSource().getBinding("items").filter([]);

		},

		getStorageLocation: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("VHeader");

			var oPurchaseModel = this.getView().getModel("PurchaseModel");
			var oTempModel = oPurchaseModel.getProperty("/TempContract");
			var aItems = oTempModel.POItem;
			for (var i = 0; i < aItems.length; i++) {
				sPlant = oTempModel.POItem[i].Plant;
			}
			var oFilter = new sap.ui.model.Filter('Werks', sap.ui.model.FilterOperator.EQ, sPlant);
			oModel.read("/storage_f4helpSet?$filter=(Werks eq '" + sPlant + "')", {
				filters: [oFilter],
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/StorageLocationList", oData.results);
					oLookupModel.refresh(true);
				},
				error: function(oError) {
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusCode + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},

		/*Storage Location End*/

		/*start purchase order f4 click*/
		getsPurchaseorderList: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("VHeader");
			//	BusyIndicator.show(0);
			oModel.read("/openpo_headerSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/PoDocumentNumber", oData.results);
					oLookupModel.refresh(true);
					//that.getMaterialList();
				},
				error: function(oError) {
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},
		handlePursOrderValueHelp: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();
			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialog) {
				this._valueHelpDialog = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.PurchaseDocument",
					this
				);
				this.getView().addDependent(this._valueHelpDialog);
			}
			if (sInputValue.includes(")")) {
				var sSubsString = sInputValue.split(")")[1];
				sInputValue = sSubsString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialog.getBinding("items").filter(new Filter([new Filter(
				"Ebeln",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Lifnr",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpDialog.open(sInputValue);
			this.getsPurchaseorderList();

		},
		_handleValueHelpSearchPurs: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Ebeln",
				FilterOperator.Contains, sValue
			), new Filter(
				"Lifnr",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
	_handleValueHelpClosePurs: function(oEvent) {

			var oSelectedItem = oEvent.getParameter("selectedItem");
			var oModel = this.getOwnerComponent().getModel("VHeader");

			var oModellookup = oView.getModel("Lookup");

			console.log(oModellookup);
			if (oSelectedItem) {

				var productInput = this.byId(this.inputId);
				var sBindPath = oSelectedItem.getBindingContext("Lookup").sPath;
				productInput.setValue(oSelectedItem.getTitle());
				var eelnvalue = oSelectedItem.getTitle();
				console.log(eelnvalue);
				sVendorNum = oModellookup.getProperty(sBindPath + "/Lifnr");
				oView.byId("idVendor").setValue(sVendorNum);
				//	oView.byId("idvendorno").setValue(oModellookup.getProperty(sBindPath + "/Lifnr"));
				oView.getModel("EditModel").setProperty("/isEditable", true);

				Ebeln = oModellookup.getProperty(sBindPath + "/Ebeln");
				var Vendorname1 = oModellookup.getProperty(sBindPath + "/Lifnr");
				sVendorname = oModellookup.getProperty(sBindPath + "/Name1");
				console.log(Vendorname1);

				console.log(Ebeln);
				var aFilter = [
					new sap.ui.model.Filter({
						path: "Purchaseorder",
						operator: sap.ui.model.FilterOperator.EQ,
						value1: Ebeln
					})

				];

				var Purchaseorder = Ebeln;
				oModel.read("/fetch_openPOSet(Purchaseorder='" + Purchaseorder + "')", {
					urlParameters: {
						"$expand": "fpoItemSet"
					},
					success: function(oData) {
						console.log(oData);
							var AllModel = oView.getModel("AllDataModel");
						
						var lq = oData.fpoItemSet.results.length;
						if (lq == 0) {
							var AllModel = oView.getModel("AllDataModel");
							var path = AllModel.oData;
							AllModel.setProperty(path + "/PONO");
							oView.getModel("AllDataModel").setProperty("/PONO", Ebeln);
							oView.getModel("visiblemodel").setProperty("/isvisible", true);
							oView.getModel("EditModel").setProperty("/isEditable", false);
							console.log('value starts with zero');
						} else {
							oView.getModel("visiblemodel").setProperty("/isvisible", false);
							oView.getModel("EditModel").setProperty("/isEditable", true);
						}
						for (var quant = 0; quant < lq; quant++) {
							var Quantity = oData.fpoItemSet.results[quant].Quantity;

							var path = AllModel.oData;
							AllModel.setProperty(path + "/PONO");
							oView.getModel("AllDataModel").setProperty("/PONO", Ebeln);
							/*	var PO = new JSONModel({
									PONO: Ebeln
								});

								oView.setModel(PO, "PO");*/
						}
						var PostDate = oData.CreatDate;
						var s_doc_date = PostDate;
						var str = s_doc_date.toISOString();
						str = str.slice(0, -5);
						console.log(str);

						var DocumentDates = oData.DocDate;
						var s_doc_datePost = DocumentDates;
						var Datepoststring = s_doc_datePost.toISOString();
						Datepoststring = Datepoststring.slice(0, -5);
						console.log(Datepoststring);

					
					AllModel = oView.getModel("AllDataModel");
						var path = AllModel.oData;
						AllModel.setProperty(path + "/CreatDate");
						oView.getModel("AllDataModel").setProperty("/CreatDate", str);

						AllModel.setProperty(path + "/DocumentDate");
						oView.getModel("AllDataModel").setProperty("/DocumentDate", Datepoststring);

						//	console.log(oData.Vendor);
						var vendor = oData.Vendor;

						if (vendor !== "" || vendor !== undefined) {
							for (var y = 0; y < aListofVendor.length; y++) {
								if (vendor == aListofVendor[y].Lifnr) {
									var venname = aListofVendor[y].Name1;
									console.log(venname);
									//	oView.byId("idvendorno1").setValue(venname);
									//			oView.byId("idpatven").setValue(venname);
									//	oView.byId("idPostDateq").setValue(venname);

								}
							}
						}
						/*		var OData = new JSONModel({
									Vendor: vendor,
									VendorName: venname,
									PON: Ebeln

								});

								oView.setModel(OData, "OData");*/

						AllModel.setProperty(path + "/Vendor");
						oView.getModel("AllDataModel").setProperty("/Vendor", vendor);
						AllModel.setProperty(path + "/VendorName");
						oView.getModel("AllDataModel").setProperty("/VendorName", venname);
						AllModel.setProperty(path + "/PON");
						oView.getModel("AllDataModel").setProperty("/PON", Ebeln);

						var aa = oView.getModel("PurchaseModel");
						console.log(aa);
						var ppp = oData.fpoItemSet.results[0].Plant;
						oView.byId("idlant").setValue(ppp);
						var oModellookup = oView.getModel("Lookup");

						console.log(oModellookup);
						var dd = "abc";
						var path = oData.fpoItemSet.results;
						console.log(path.length);
						//	aa.setProperty(path + "/SuppVendor", dd);

						var aData = aa.getProperty("/TempContract/POItem");
						aData.push.apply(aData, oData.fpoItemSet.results);
						aa.setProperty("/TempContract/POItem", aData);
						/*	for (var i = 0; i < aa.oData.TempContract.POItem.length; i++) {
						oView.getModel("PurchaseModel").setProperty("/TempContract/POItem", oData.results); // setData(oData.results);
						//console.log(oData);
						}*/

						var poModel = oView.getModel("PurchaseModel");
						console.log(poModel);
						var mModel = poModel.getProperty("/TempContract/POItem");
						CreateDocDate = oData.CreatDate;
						CreateDoctypeDate = oData.DocDate;
						var mno = mModel[0].Material;
						var matgp = mModel[0].MatlGroup;
						var shot = mModel[0].ShortText;
						var qunt = mModel[0].Quantity;
						var pun = mModel[0].PoUnit;
						var MaterialAndVendor = mno.concat("-", sVendorNum);
						oView.byId("VMatNo").setValue(MaterialAndVendor);
						//		oView.byId("iddis").setValue(VendorNum);
						oView.byId("idPOrder").setValue(Ebeln);
						oView.byId("idMatdis").setValue(shot);
						oView.byId("idMatNo").setValue(mno);
						oView.byId("idMatGrp").setValue(matgp);
						oView.byId("ident").setValue(qunt);
						oView.byId("idQunat").setValue(pun);
						oView.byId("idQntS").setValue(qunt);
						oView.byId("idQuantsku").setValue(pun);
						oView.byId("idDelNot").setValue(qunt);
						oView.byId("idDelNott").setValue(pun);

					},
					error: function(oError) {
						console.log(oError);
					}
				});
				//	this.byId("idPOItemsTab").setModel(oView.getModel("POItemsModel"), "POItemsModel");

			}
			oEvent.getSource().getBinding("items").filter([]);

		},
		_handleValueHelpClosePurs1: function(oEvent) {

			var oSelectedItem = oEvent.getParameter("selectedItem");
			var oModel = this.getOwnerComponent().getModel("VHeader");
			var oModellookup = oView.getModel("Lookup");
			if (oSelectedItem) {
				var sProductInput = this.byId(this.inputId);
				var sBindsPath = oSelectedItem.getBindingContext("Lookup").ssPath;
				sProductInput.setValue(oSelectedItem.getTitle());

				sVendorNum = oModellookup.getProperty(sBindsPath + "/Lifnr");
				oView.byId("idVendor").setValue(sVendorNum);

				oView.getModel("EditModel").setProperty("/isEditable", true);

				Ebeln = oModellookup.getProperty(sBindsPath + "/Ebeln");

				sVendorname = oModellookup.getProperty(sBindsPath + "/Name1");

				var sPurchaseorder = Ebeln;
				//fetch all the data from entity set based on filters
				oModel.read("/fetch_openPOSet(sPurchaseorder='" + sPurchaseorder + "')", {
					urlParameters: {
						"$expand": "fpoItemSet"
					},
					success: function(oData) {

						// var AllModel = oView.getModel("oAllDataModel");

						var lq = oData.fpoItemSet.results.length;
						//fields visible or disable, fields editable or disable based on odata. 
						if (lq === 0) {
							var oAllModel = oView.getModel("oAllDataModel");
							var sPath = oAllModel.oData;
							oAllModel.setProperty(sPath + "/PONO");
							oView.getModel("oAllDataModel").setProperty("/PONO", Ebeln);
							oView.getModel("visiblemodel").setProperty("/isvisible", true);
							oView.getModel("EditModel").setProperty("/isEditable", false);

						} else {
							oView.getModel("visiblemodel").setProperty("/isvisible", false);
							oView.getModel("EditModel").setProperty("/isEditable", true);
						}
						for (var quant = 0; quant < lq; quant++) {
							var Quantity = oData.fpoItemSet.results[quant].Quantity;

							var sPath1 = oAllModel.oData;
							oAllModel.setProperty(sPath1 + "/PONO");
							oView.getModel("oAllDataModel").setProperty("/PONO", Ebeln);

						}
						var PostDate = oData.CreatDate;
						var s_doc_date = PostDate;
						var str = s_doc_date.toISOsString();
						str = str.slice(0, -5);

						var DocumentDates = oData.DocDate;
						var s_doc_datePost = DocumentDates;
						var DatepostsString = s_doc_datePost.toISOsString();
						DatepostsString = DatepostsString.slice(0, -5);

						//set the runtime properties to model
						oAllModel = oView.getModel("oAllDataModel");
						var sPath2 = oAllModel.oData;
						oAllModel.setProperty(sPath2 + "/CreatDate");
						oView.getModel("oAllDataModel").setProperty("/CreatDate", str);

						oAllModel.setProperty(sPath + "/DocumentDate");
						oView.getModel("oAllDataModel").setProperty("/DocumentDate", DatepostsString);

						var sVendor = oData.Vendor;

						if (sVendor !== "" || sVendor !== undefined) {
							for (var y = 0; y < aListofVendor.length; y++) {
								if (sVendor === aListofVendor[y].Lifnr) {
									var venname = aListofVendor[y].Name1;

								}
							}
						}

						oAllModel.setProperty(sPath + "/Vendor");
						oView.getModel("oAllDataModel").setProperty("/Vendor", sVendor);
						oAllModel.setProperty(sPath + "/sVendorname");
						oView.getModel("oAllDataModel").setProperty("/sVendorname", venname);
						oAllModel.setProperty(sPath + "/PON");
						oView.getModel("oAllDataModel").setProperty("/PON", Ebeln);

						var oPurchaseModel = oView.getModel("PurchaseModel");

						var sPlant1 = oData.fpoItemSet.results[0].Plant;
						oView.byId("idlant").setValue(sPlant1);

						//	oPurchaseModel.setProperty(sPath + "/SuppVendor", dd);

						var aData = oPurchaseModel.getProperty("/TempContract/POItem");
						aData.push.apply(aData, oData.fpoItemSet.results);
						oPurchaseModel.setProperty("/TempContract/POItem", aData);
						/*	for (var i = 0; i < oPurchaseModel.oData.TempContract.POItem.length; i++) {
						oView.getModel("PurchaseModel").setProperty("/TempContract/POItem", oData.results); // setData(oData.results);
					
						}*/

						var poModel = oView.getModel("PurchaseModel");

						var mModel = poModel.getProperty("/TempContract/POItem");
						CreateDocDate = oData.CreatDate;
						CreateDoctypeDate = oData.DocDate;
						var sMaterial = mModel[0].Material;
						var sMaterialGroup = mModel[0].MatlGroup;
						var sShortText = mModel[0].ShortText;
						var sQuantity = mModel[0].Quantity;
						var sPoUnit = mModel[0].PoUnit;
						var MaterialAndVendor = sMaterial.concat("-", sVendorNum);
						oView.byId("VMatNo").setValue(MaterialAndVendor);
						//		oView.byId("iddis").setValue(sVendorNum);
						oView.byId("idPOrder").setValue(Ebeln);
						oView.byId("idMatdis").setValue(sShortText);
						oView.byId("idMatNo").setValue(sMaterial);
						oView.byId("idMatGrp").setValue(sMaterialGroup);
						oView.byId("ident").setValue(sQuantity);
						oView.byId("idQunat").setValue(sPoUnit);
						oView.byId("idQntS").setValue(sQuantity);
						oView.byId("idQuantsku").setValue(sPoUnit);
						oView.byId("idDelNot").setValue(sQuantity);
						oView.byId("idDelNott").setValue(sPoUnit);

					},
					error: function(oError) {
						console.log(oError);
					}
				});

			}
			oEvent.getSource().getBinding("items").filter([]);

		},
		suggestionItemSelectedPOrder: function(oEvent) {
			var oSelectedItem = oEvent.getParameter("selectedItem");
			//get the all data for selected values
			var oModel = this.getOwnerComponent().getModel("VHeader");
			if (oSelectedItem) {
				var sBindsPath = oSelectedItem.getBindingContext("VHeader").ssPath;
				oView.byId("vnumber").setValue(oModel.getProperty(sBindsPath + "/Lifnr"));
				oView.byId("idPurOrg").setValue(oModel.getProperty(sBindsPath + "/Ekorg"));
				oView.byId("idCompCode").setValue(oModel.getProperty(sBindsPath + "/Bukrs"));
				oView.byId("idCountryCode").setValue(oModel.getProperty(sBindsPath + "/Waers"));
				oView.byId("idPurGrg").setValue(oModel.getProperty(sBindsPath + "/Ekgrp"));
				oView.byId("idPoOrder").setValue(oModel.getProperty(sBindsPath + "/Ebeln"));
				Ebeln = oModel.getProperty(sBindsPath + "/Ebeln");

				var aFilter = [
					new sap.ui.model.Filter({
						sPath: "sPurchaseorder",
						operator: sap.ui.model.FilterOperator.EQ,
						value1: Ebeln
					})

				];

				oModel.read("/PO_DetailsSet", {
					filters: aFilter,
					success: function(oData) {
						oView.getModel("PurchaseModel").setProperty("/TempContract/POItem", oData.results); // setData(oData.results);
					},
					error: function(oError) {}
				});
				this.byId("idPOItemsTab").setModel(oView.getModel("PurchaseModelITem"), "PurchaseModelITem");

			}

		},

		/*end purchase order f4 click*/
		/*Plant search start */
		getPOPlant: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("VHeader");
			oModel.read("/get_plant_f4helpSet", {
				success: function(oData) {
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/POPlant", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {

					var sErrorMessage = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(sErrorMessage);
				}
			});
		},
		handleValueHelpPlant: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();
			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogpp) {
				this._valueHelpDialogpp = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.Plant",
					this
				);
				this.getView().addDependent(this._valueHelpDialogpp);
			}
			if (sInputValue.includes(")")) {
				var sSubsString = sInputValue.split(")")[1];
				sInputValue = sSubsString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogpp.getBinding("items").filter(new Filter([new Filter(
				"Bwkey",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Bwkey",
				FilterOperator.Contains, sInputValue
			)]));
			this.getPOPlant();
			// open value help dialog filtered by the input value
			this._valueHelpDialogpp.open(sInputValue);

		},
		_handlePlantSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Bwkey",
				FilterOperator.Contains, sValue
			), new Filter(
				"Bwkey",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},

		_handlePlantClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var sProductInput = this.byId(this.inputId);
				sProductInput.setValue(oSelectedItem.getTitle());
				evt.getSource().getBinding("items").filter([]);
			}
		},
		/*plant search end*/

		onDeleteConditionItem: function() {
			//remove the selected row  from table using model property
			var oPurchaseItemTable = this.byId("idTableitem");
			var aSelectedIndex = oPurchaseItemTable.getSelectedIndices().reverse();
			var oPurchaseModel = this.getOwnerComponent().getModel("PurchaseModel");
			var aPurchaseConditionItems = oPurchaseModel.getProperty("/TempContract/POItem");
			for (var i = 0; i < aSelectedIndex.length; i++) {
				aPurchaseConditionItems.splice(aSelectedIndex[i], 1);
			}
			oPurchaseItemTable.clearSelection();
			oPurchaseModel.refresh(true);
		},

		/*vendor list start*/
		getVendorList: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("VHeader");
			BusyIndicator.show(0);
			oModel.read("/Fetch_Vendor_DetailsSet", {
				success: function(oData) {
					var item = oData.results.length;

					for (var iRowIndex = 0; iRowIndex <= 2600; iRowIndex++) {
						var odata = oData.results[iRowIndex];
						if (odata !== undefined) {
							var Lifnrr = odata.Lifnr;
							var Name1r = odata.Name1;
							aListofVendor.push({
								Lifnr: Lifnrr,
								Name1: Name1r
							});
						}

					}

					var iCount = new sap.ui.model.json.JSONModel({
						item: item

					});
					oView.setModel(iCount, "Count");

					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/DisplyaVendorList", aListofVendor);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					//BusyIndicator.hide();
					MessageToast.show(oError);
				}
			});
		},

		handleVendorValueHelp: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogvendor) {
				this._valueHelpDialogvendor = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.Display",
					this
				);
				this.getView().addDependent(this._valueHelpDialogvendor);
			}
			if (sInputValue.includes(")")) {
				var sSubsString = sInputValue.split(")")[1];
				sInputValue = sSubsString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogvendor.getBinding("items").filter(new Filter([new Filter(
				"Name1",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Lifnr",
				FilterOperator.Contains, sInputValue
			)]));
			this.getVendorList();
			// open value help dialog filtered by the input value
			this._valueHelpDialogvendor.open(sInputValue);
		},
		_handleValueVendorHelpSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Name1",
				FilterOperator.Contains, sValue
			), new Filter(
				"Lifnr",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handleValueVendorHelpClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			var oModel = oView.getModel("Lookup");
			if (oSelectedItem) {
				var sProductInput = this.byId(this.inputId),
					sDescription = oSelectedItem.getInfo();

				sProductInput.setSelectedKey(sDescription);
				sProductInput.setValue(sDescription);
				if (sDescription !== "") {
					//	this.getVendorDetails(sDescription);
					var sBindsPath = oSelectedItem.getBindingContext("Lookup").ssPath;
					oView.byId("idvendorno1").setValue(oModel.getProperty(sBindsPath + "/Name1"));

				}
			}
			evt.getSource().getBinding("items").filter([]);

		},

		/*vendor list end*/
		onPostsPurchaseorder: function() {
			//get the  model and their property
			var oPurchaseModel = this.getView().getModel("PurchaseModel");
			var oTempModel = oPurchaseModel.getProperty("/TempContract");
			var oModel = this.getOwnerComponent().getModel("VHeader");
			var oPoorder = oView.byId("idPD").getValue();
			var aItems = oTempModel.POItem;
			var aItemData = [];
			//increase the length of  material 
			for (var i = 0; i < aItems.length; i++) {
				var s_Material = oTempModel.POItem[i].Material;
				var zero = "";
				//	var no;

				var len = s_Material.length;
				if (len !== undefined) {
					var z = 18 - len;
					for (var m = 0; m < z; m++) {
						zero += "0";
					}
				}

				s_Material = zero + s_Material;

				sPlant = oTempModel.POItem[i].Plant;
				var s_PoItem = oTempModel.POItem[i].PoItem;
				var s_PoNumber = oPoorder;
				var s_PoUnit = oTempModel.POItem[i].PoUnit;
				var s_Quantity = oTempModel.POItem[i].Quantity;
				var s_store = oTempModel.POItem[i].Plant;

				aItemData.push({
					Bwart: "101",
					Sobkz: "Q",
					Matnr: s_Material,
					Ebeln: s_PoNumber,
					Ebelp: s_PoItem,
					Erfmg: s_Quantity,
					Erfme: s_PoUnit,
					Werks: sPlant,
					Lgort: s_store

				});

			}
			var oEntry1 = {};
			//get date
			var Documentdate = oView.byId("idDocDate").getValue();
			var PostingDate = oView.byId("idPostDate").getValue();
			//convert the date formate
			var date_post = new Date(PostingDate);
			var podate = date_post.toISOsString();
			podate = podate.slice(0, -5);

			var s_documentDate = new Date(Documentdate);
			var sString = s_documentDate.toISOsString();
			sString = sString.slice(0, -5);

			oEntry1.Budat = podate;
			oEntry1.Bldat = sString;
			oEntry1.Xblnr = "1234";
			oEntry1.GRITEMSet = aItemData;

			BusyIndicator.show(0);
			//post data
			oModel.create("/GRHEADSet", oEntry1, {

				success: this._onUpdateProdEntrySuccess.bind(this),
				error: this._onCreateEntryError.bind(this)
			});
			oPurchaseModel.refresh(true);

		},

		_onUpdateProdEntrySuccess: function(oObject, oResponse) {
			BusyIndicator.hide();

			var oSap = {};
			oSap = JSON.parse(oResponse.headers["sap-message"]);
			var oPurchaseModel = this.getOwnerComponent().getModel("PurchaseModel");
			var oTempContract = oPurchaseModel.getProperty("/TempContract");
			oTempContract.setData();
			oPurchaseModel.refresh(true);
			var oAllModel = oView.getModel("oAllDataModel");
			oAllModel.setData({
				oData: {}
			});
			oAllModel.updateBindings(true);

			oAllModel.refresh(true);
			oView.byId("idPD").setValue("");
			oView.byId("idlant").setValue("");
			oView.byId("idVendor").setValue("");
			oView.byId("idMatdis").setValue("");
			oView.byId("idMatNo").setValue("");
			oView.byId("VMatNo").setValue("");
			oView.byId("idMatGrp").setValue("");
			oView.byId("idmatGrptwo").setValue("");
			oView.byId("ident").setValue("");
			oView.byId("idQunat").setValue("");
			oView.byId("idQntS").setValue("");
			oView.byId("idQuantsku").setValue("");
			oView.byId("idDelNot").setValue("");
			oView.byId("idDelNott").setValue("");
			oView.byId("idPOrder").setValue("");
			oView.byId("idDocDate").setValue(" ");
			oView.byId("idPostDate").setValue(" ");

			//	this.getView().getModel("VHeader").refresh();
			jQuery.sap.require("sap.m.MessageBox");

			sap.m.MessageBox.show("Material document #" + oSap.message + " posted", {
				icon: sap.m.MessageBox.Icon.INFORMATION,
				title: "Message",
				actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CLOSE],
				onClose: function(oAction) {
					if (oAction === "OK") {
						var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
						oRouter.navTo('ShowTiles');
					}
				}.bind(this)
			});

		},

		_onCreateEntryError: function(oError) {
			BusyIndicator.hide();
			var x = JSON.parse(oError.responseText);
			var sError = x.error.message.value;
			jQuery.sap.require("sap.m.MessageBox");
			sap.m.MessageBox.error(
				"Error creating entry: " + sError + " "
			);

		},

		onCancelPRess: function(event) {

				var oPurchaseModel = this.getOwnerComponent().getModel("PurchaseModel");
				var oTempContract = oPurchaseModel.getProperty("/TempContract");
				oTempContract.setData();
				// var s = oPurchaseModel.oData.TempContract.destroy;
				var oAllModel = oView.getModel("oAllDataModel");
				oAllModel.setData({
					oData: {}
				});
				oAllModel.updateBindings(true);

				oAllModel.refresh(true);
				oPurchaseModel.refresh(true);
				this.getView().getModel("VHeader").refresh();
				oView.byId("idPD").setValue("");
				oView.byId("idlant").setValue("");
				oView.byId("idVendor").setValue("");
				oView.byId("idMatdis").setValue("");
				oView.byId("idMatNo").setValue("");
				oView.byId("VMatNo").setValue("");
				oView.byId("idMatGrp").setValue("");
				oView.byId("idmatGrptwo").setValue("");
				oView.byId("ident").setValue("");
				oView.byId("idQunat").setValue("");
				oView.byId("idQntS").setValue("");
				oView.byId("idQuantsku").setValue("");
				oView.byId("idDelNot").setValue("");
				oView.byId("idDelNott").setValue("");
				oView.byId("idPOrder").setValue("");
				//redirect the page	frot view
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("ShowTiles");

			}
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf com.vSimpleApp.view.view.GoodReceipt
			 */
			//	onBeforeRendering: function() {
			//
			//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.vSimpleApp.view.view.GoodReceipt
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.vSimpleApp.view.view.GoodReceipt
		 */
		//	onExit: function() {
		//
		//	}

	});

});