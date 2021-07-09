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
	"sap/ui/core/routing/History",
	"com/vSimpleApp/model/GRDisplayHeader",
	"com/vSimpleApp/model/GRDisplayItem"
], function(Controller, JSONModel, BusyIndicator, MessageToast, FilterOperator, Filter, library, Fragment,
	MessageBox, History, GRDisplayHeader, GRDisplayItem) {
	"use strict";
	var oView, Ebeln, oComponent;
	var ListofVendor = [];
	var VendorNum, Vendorname, vendorname, s_Plant, CreateDocDate, CreateDoctypeDate;
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
			var oGRItemsModel = new JSONModel();
			oView.setModel(oGRItemsModel, "GRItemsModel");

			//define the model to  field editable or not
			var oEditModel = new JSONModel({
				isEditable: true
			});

			this.getView().setModel(oEditModel, "EditModel");

			var oVisi = new JSONModel({
				isvisible: false
			});

			this.getView().setModel(oVisi, "visiblemodel");

			var AllDataModel = new sap.ui.model.json.JSONModel([]);
			oView.setModel(AllDataModel, "AllDataModel");
			var oMatData = new JSONModel();
			oView.setModel(oMatData, "MatData");
		},
		datatime: function(dDate) {
			var s_doc_datePost = dDate;
			var Datepoststring = s_doc_datePost.toISOString();
			Datepoststring = Datepoststring.slice(0, -5);
			return Datepoststring;
		},
		onNavBack: function(oevt) {

			var oGoodReceiptModel = oComponent.getModel("GoodReceiptModel");
			var oTempContract = oGoodReceiptModel.getProperty("/GRPost");
			oGoodReceiptModel.setData([]);
			var AllDataModel = oView.getModel("AllDataModel");
			var aGRItemsModel = oView.getModel("GRItemsModel");
			aGRItemsModel.setData();
			AllDataModel.setData();
			AllDataModel.refresh(true);
			oView.getModel("visiblemodel").setProperty("/isvisible", false);

			oGoodReceiptModel.refresh(true);
			this.getView().getModel("VHeader").refresh();

			this.getOwnerComponent().getRouter().navTo("ShowTiles");

		},

		onMenuButtonPress: function() {
			var oGoodReceiptModel = this.getOwnerComponent().getModel("GoodReceiptModel");
			oGoodReceiptModel.setData([]);
			/*	var oTempContract = oGoodReceiptModel.getProperty("/GRPost");
				oTempContract.setData();
			*/ //	s.refresh(true);

			oGoodReceiptModel.refresh(true);
			//	oView.byId("vtitle").setValue("");
			//	oView.byId("idPurchaseOrder").setValue("");
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
				var sSubstring = sInputValue.split(")")[1];
				sInputValue = sSubstring.trim();
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
				var productInput = this.byId(this.inputId);
				productInput.setValue(oSelectedItem.getTitle());

			}
			oEvent.getSource().getBinding("items").filter([]);

		},

		getStorageLocation: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("VHeader");

			var oPurchaseModel = this.getView().getModel("PurchaseModel");
			var oTempModel = oPurchaseModel.getProperty("/TempContract");

			var aItems = oTempModel.POItem;
			console.log(aItems.length);

			for (var i = 0; i < aItems.length; i++) {

				s_Plant = oTempModel.POItem[i].Plant;

			}

			console.log(s_Plant);

			var oFilter = new sap.ui.model.Filter('Werks', sap.ui.model.FilterOperator.EQ, s_Plant);
			oModel.read("/storage_f4helpSet?$filter=(Werks eq '" + s_Plant + "')", {
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
		getPurchaseOrderList: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("VHeader");
			//	BusyIndicator.show(0);

			oModel.read("/openpo_headerSet", {
				success: function(oData) {
					console.log(oData);

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
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
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
			this.getPurchaseOrderList();

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

			if (oSelectedItem) {

				var productInput = this.byId(this.inputId);
				var sBindPath = oSelectedItem.getBindingContext("Lookup").sPath;
				productInput.setValue(oSelectedItem.getTitle());
				var eelnvalue = oSelectedItem.getTitle();
				console.log(eelnvalue);
				VendorNum = oModellookup.getProperty(sBindPath + "/Lifnr");
				oView.byId("idVendor").setValue(VendorNum);
				//	oView.byId("idvendorno").setValue(oModellookup.getProperty(sBindPath + "/Lifnr"));
				oView.getModel("EditModel").setProperty("/isEditable", true);

				Ebeln = oModellookup.getProperty(sBindPath + "/Ebeln");
				var Vendorname1 = oModellookup.getProperty(sBindPath + "/Lifnr");
				Vendorname = oModellookup.getProperty(sBindPath + "/Name1");
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
						if (lq === 0) {
							var AllModel = oView.getModel("AllDataModel");
							var path = AllModel.oData;
							AllModel.setProperty(path + "/PONO");
							oView.getModel("AllDataModel").setProperty("/PONO", Ebeln);
							oView.getModel("visiblemodel").setProperty("/isvisible", true);
							oView.getModel("EditModel").setProperty("/isEditable", false);

						} else {
							oView.getModel("visiblemodel").setProperty("/isvisible", false);
							oView.getModel("EditModel").setProperty("/isEditable", true);
						}
						for (var quant = 0; quant < lq; quant++) {

							var path = AllModel.oData;
							AllModel.setProperty(path + "/PONO");
							oView.getModel("AllDataModel").setProperty("/PONO", Ebeln);

						}
						var PostDate = oData.CreatDate;
						var s_doc_date = PostDate;
						var str = s_doc_date.toISOString();
						str = str.slice(0, -5);

						var DocumentDates = oData.DocDate;
						var s_doc_datePost = DocumentDates;
						var Datepoststring = s_doc_datePost.toISOString();
						Datepoststring = Datepoststring.slice(0, -5);

						AllModel = oView.getModel("AllDataModel");
						var path = AllModel.oData;
						AllModel.setProperty(path + "/CreatDate");
						oView.getModel("AllDataModel").setProperty("/CreatDate", str);

						AllModel.setProperty(path + "/DocumentDate");
						oView.getModel("AllDataModel").setProperty("/DocumentDate", Datepoststring);

						//	console.log(oData.Vendor);
						var vendor = oData.Vendor;

						if (vendor !== "" || vendor !== undefined) {
							for (var y = 0; y < ListofVendor.length; y++) {
								if (vendor == ListofVendor[y].Lifnr) {
									var venname = ListofVendor[y].Name1;
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

						var aData = aa.getProperty("/TempContract/PoitemSet");
						aData.push.apply(aData, oData.fpoItemSet.results);
						aa.setProperty("/TempContract/PoitemSet", aData);

						var poModel = oView.getModel("PurchaseModel");
						console.log(poModel);
						var mModel = poModel.getProperty("/TempContract/PoitemSet");
						CreateDocDate = oData.CreatDate;
						CreateDoctypeDate = oData.DocDate;
						var mno = mModel[0].Material;
						var matgp = mModel[0].MatlGroup;
						var shot = mModel[0].ShortText;
						var qunt = mModel[0].Quantity;
						var pun = mModel[0].PoUnit;
						var MaterialAndVendor = mno.concat("-", VendorNum);
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
		PressMaterialDoc: function(oEvent) {
			var oMatModel = oView.getModel("MatData");
			var oModel = this.getOwnerComponent().getModel("PurchaseSet");
			var oGRItemsModel = oView.getModel("GRItemsModel");
			var oGRModelData = this.getOwnerComponent().getModel("GoodReceiptModel");
			var sMaterialDocument = oMatModel.oData.MatDocument;
			var sMaterialDocumentYear = oMatModel.oData.MatDocYear;
			/*	var sMaterialDoc = oView.byId("idMacDoc");
			var sMatYear = oView.byId("idMacDocYear");
*/

			oModel.read("/GrHeadSet(MatDoc='5000001693',DocYear='2021')", {
				urlParameters: {
					"$expand": "GrItemSet"
				},

				success: function(oData) {
					var sPurchaseno = oData.GrItemSet.results[0].PoNumber;
					var sVendor = oData.GrItemSet.results[0].Vendor;

					var AllModel = oView.getModel("AllDataModel");

					var path = AllModel.oData;
					var iLength = oData.GrItemSet.results.length;
					if (iLength === 0) {

						AllModel.setProperty(path + "/PONO");
						oView.getModel("AllDataModel").setProperty("/PONO", sPurchaseno);
						oView.getModel("visiblemodel").setProperty("/isvisible", true);
						oView.getModel("EditModel").setProperty("/isEditable", false);
						console.log('value starts with zero');
					} else {
						oView.getModel("visiblemodel").setProperty("/isvisible", false);
						oView.getModel("EditModel").setProperty("/isEditable", true);
					}
					for (var quant = 0; quant < iLength; quant++) {
						//		var Quantity = oData.GrItemSet.results[quant].Quantity;

						AllModel.setProperty(path + "/PONO");
						oView.getModel("AllDataModel").setProperty("/PONO", sPurchaseno);

					}
					var PostDate = oData.PstngDate;
					var s_doc_date = PostDate;
					var str = s_doc_date.toISOString();
					str = str.slice(0, -5);

					var DocumentDates = oData.DocDate;
					var s_doc_datePost = DocumentDates;
					var Datepoststring = s_doc_datePost.toISOString();
					Datepoststring = Datepoststring.slice(0, -5);

					AllModel.setProperty(path + "/CreatDate");
					oView.getModel("AllDataModel").setProperty("/CreatDate", str);

					AllModel.setProperty(path + "/DocumentDate");
					oView.getModel("AllDataModel").setProperty("/DocumentDate", Datepoststring);

					if (sVendor !== "" || sVendor !== undefined) {
						for (var y = 0; y < ListofVendor.length; y++) {
							if (sVendor === ListofVendor[y].Lifnr) {
								var sVenname = ListofVendor[y].Name1;

							}
						}
					}
					AllModel.setProperty(path + "/Vendor");
					oView.getModel("AllDataModel").setProperty("/Vendor", sVendor);
					AllModel.setProperty(path + "/VendorName");
					oView.getModel("AllDataModel").setProperty("/VendorName", sVenname);
					oView.getModel("GoodReceiptModel").setData(oData);
					oView.getModel("GoodReceiptModel").setProperty("/GRPost", oData);
					oView.getModel("GoodReceiptModel").setProperty("/GRPost/GrItemSet", oData.GrItemSet.results);

					var aModel = oGRModelData.getProperty("/GRPost/GrItemSet");
					console.log(aModel);
					oView.getModel("GRItemsModel").setData(aModel[0]);

					CreateDoctypeDate = oData.DocDate;
					var mno = aModel[0].Material;

					var MaterialAndVendor = mno.concat("-", sVendor);
					oView.byId("VMatNo").setValue(MaterialAndVendor);
					//		oView.byId("iddis").setValue(VendorNum);

					console.log(oGRItemsModel);
					console.log(oGRModelData);

				},
				error: function(oError) {
					MessageBox.error(oError);
				}
			});

		},
		AddPartnerHeaderItems: function() {
			this.MacDocDialog = this.getView().byId("idMacDocyear");
			if (!this.MacDocDialog) {
				this.MacDocDialog = sap.ui.xmlfragment("com.vSimpleApp.GoodReceipt.MacDocYear", this);
				this.MacDocDialog.open();
			}
		},

		onClosePartner: function() {
			this.MacDocDialog.close();
			this.MacDocDialog.destroy();
		},
		onExitPartner: function() {
			if (this.MacDocDialog) {
				this.MacDocDialog.destroy();
			}
		},

		suggestionItemSelectedPOrder: function(oEvent) {
			var oSelectedItem = oEvent.getParameter("selectedItem");
			//get the all data for selected values
			var oModel = this.getOwnerComponent().getModel("VHeader");
			if (oSelectedItem) {

				var productInput = this.byId(this.inputId);
				var sBindPath = oSelectedItem.getBindingContext("VHeader").sPath;
				//	productInput.setValue(oSelectedItem.getText());
				var no = oSelectedItem.getText();

				//	productInput.setValue(sInputValue.getTitle());
				oView.byId("vnumber").setValue(oModel.getProperty(sBindPath + "/Lifnr"));
				oView.byId("idPurOrg").setValue(oModel.getProperty(sBindPath + "/Ekorg"));
				oView.byId("idCompCode").setValue(oModel.getProperty(sBindPath + "/Bukrs"));
				oView.byId("idCountryCode").setValue(oModel.getProperty(sBindPath + "/Waers"));
				oView.byId("idPurGrg").setValue(oModel.getProperty(sBindPath + "/Ekgrp"));
				oView.byId("idPoOrder").setValue(oModel.getProperty(sBindPath + "/Ebeln"));
				Ebeln = oModel.getProperty(sBindPath + "/Ebeln");
				console.log(Ebeln);
				var aFilter = [
					new sap.ui.model.Filter({
						path: "Purchaseorder",
						operator: sap.ui.model.FilterOperator.EQ,
						value1: Ebeln
					})

				];

				oModel.read("/PO_DetailsSet", {
					//oModel.read("/POItemSet", {
					filters: aFilter,
					success: function(oData) {
						//	console.log(oData.results);
						//	oView.getModel("PurchaseModelITem").setData(oData.results);
						oView.getModel("PurchaseModel").setProperty("/TempContract/PoitemSet", oData.results); // setData(oData.results);
						//console.log(oData);

					},
					error: function(oError) {
						//console.log(oError);
					}
				});
				this.byId("idPOItemsTab").setModel(oView.getModel("PurchaseModelITem"), "PurchaseModelITem");

			}

		},

		/*end purchase order f4 click*/
		/*Plant search start */
		getPOPlant: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("VHeader");
			//BusyIndicator.show(0);
			oModel.read("/get_plant_f4helpSet", {
				success: function(oData) {
					//BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/POPlant", oData.results);
					oLookupModel.refresh(true);
					//that.getMaterialList();
				},
				error: function(oError) {
					//BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
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
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
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
			var zero = "";
			var oSelectedItem = evt.getParameter("selectedItem");

			var oModel = oView.getModel("Lookup");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputId);
				var sBindPath = oSelectedItem.getBindingContext("Lookup").sPath;
				productInput.setValue(oSelectedItem.getTitle());
				var PlantNumber = oSelectedItem.getTitle();
				console.log(PlantNumber);

				evt.getSource().getBinding("items").filter([]);
			}
		},
		/*plant search end*/

		onDeleteConditionItem: function() {
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
							ListofVendor.push({
								Lifnr: Lifnrr,
								Name1: Name1r
							});
						}

					}
					//	console.log(ListofVendor);

					var Count = new sap.ui.model.json.JSONModel({
						item: item

					});
					oView.setModel(Count, "Count");

					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/DisplyaVendorList", ListofVendor);
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
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
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
				var productInput = this.byId(this.inputId),
					sDescription = oSelectedItem.getInfo(),
					sTitle = oSelectedItem.getTitle();
				productInput.setSelectedKey(sDescription);
				productInput.setValue(sDescription);
				if (sDescription !== "") {
					//	this.getVendorDetails(sDescription);
					var sBindPath = oSelectedItem.getBindingContext("Lookup").sPath;
					oView.byId("idvendorno1").setValue(oModel.getProperty(sBindPath + "/Name1"));

				}
			}
			evt.getSource().getBinding("items").filter([]);

		},

		/*vendor list end*/
		onPostPurchaseOrder: function() {

			var oPurchaseModel = this.getView().getModel("GoodReceiptModel");
			var oTempModel = oPurchaseModel.getProperty("/GRPost");
			var oRequestPayload = oTempModel.getRequestPayloadGR();
			console.log(oRequestPayload);

			var oVendors = oPurchaseModel.getData();

			//define and bind the model
			var oVModel = new VendorP2P(oVendors);
			var oContract = oVModel.getUpdateRequestPayload();

			var oModel = this.getOwnerComponent().getModel("VHeader");

			console.log(oTempModel);
			var oPoorder = oView.byId("idPD").getValue();
			var oVendor = oView.byId("idVendor").getValue();

			//	var idVendornumber = oView.byId("idvendorno").getValue();

			var aItems = oTempModel.POItem;
			console.log(aItems.length);

			var itemData = [];

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

				console.log(len);
				console.log(zero);
				s_Material = zero + s_Material;
				console.log(s_Material);

				s_Plant = oTempModel.POItem[i].Plant;
				var s_PoItem = oTempModel.POItem[i].PoItem;
				var s_PoNumber = oPoorder;
				var s_PoUnit = oTempModel.POItem[i].PoUnit;
				var s_Quantity = oTempModel.POItem[i].Quantity;
				var s_store = oTempModel.POItem[i].Plant;

				itemData.push({
					Bwart: "101",
					Sobkz: "Q",
					Matnr: s_Material,
					Ebeln: s_PoNumber,
					Ebelp: s_PoItem,
					Erfmg: s_Quantity,
					Erfme: s_PoUnit,
					Werks: s_Plant,
					Lgort: s_store

				});

			}
			var oEntry1 = {};

			var Documentdate = oView.byId("DocDate").getValue();
			var PostingDate = oView.byId("PstngDate").getValue();

			var date_post = new Date(PostingDate);
			var podate = date_post.toISOString();
			podate = podate.slice(0, -5);
			console.log(podate);

			var s_documentDate = new Date(Documentdate);

			var string = s_documentDate.toISOString();
			string = string.slice(0, -5);
			console.log(string);

			oEntry1.Budat = podate;
			oEntry1.Bldat = string;
			oEntry1.Xblnr = "1234";

			oEntry1.GRITEMSet = itemData;

			console.log(oEntry1);

			BusyIndicator.show(0);
			oModel.create("/GRHEADSet", oEntry1, {

				success: this._onUpdateProdEntrySuccess.bind(this),
				error: this._onCreateEntryError.bind(this)
			});
			oPurchaseModel.refresh(true);

		},
		OnPostGoodReceipt: function() {
			var oModel = this.getOwnerComponent().getModel("PurchaseSet");

			var oPurchaseModel = this.getView().getModel("GoodReceiptModel");
			var oTempModel = oPurchaseModel.getProperty("/GRPost");
			/*	var oRequestPayload = oTempModel.getRequestPayloadGR();
			console.log(oRequestPayload);
*/
			var aItems = oTempModel.GrItemSet;
			console.log(aItems.length);

			var itemData = [];

			for (var iTex = 0; iTex < aItems.length; iTex++) {

				var MatDoc = oTempModel.GrItemSet[iTex].MatDoc;
				var DocYear = oTempModel.GrItemSet[iTex].DocYear;
				var MatdocItm = oTempModel.GrItemSet[iTex].MatdocItm;
				var Material = oTempModel.GrItemSet[iTex].Material;
				var Plant = oTempModel.GrItemSet[iTex].Plant;
				var StgeLoc = oTempModel.GrItemSet[iTex].StgeLoc;
				var Batch = oTempModel.GrItemSet[iTex].Batch;
				var MoveType = oTempModel.GrItemSet[iTex].MoveType;
				var StckType = oTempModel.GrItemSet[iTex].StckType;
				var SpecStock = oTempModel.GrItemSet[iTex].SpecStock;
				var Vendor = oTempModel.GrItemSet[iTex].Vendor;
				var Customer = oTempModel.GrItemSet[iTex].Customer;
				var SalesOrd = oTempModel.GrItemSet[iTex].SalesOrd;
				var SOrdItem = oTempModel.GrItemSet[iTex].SOrdItem;
				var SchedLine = oTempModel.GrItemSet[iTex].SchedLine;
				var ValType = oTempModel.GrItemSet[iTex].ValType;
				var EntryQnt = oTempModel.GrItemSet[iTex].EntryQnt;
				var EntryUom = oTempModel.GrItemSet[iTex].EntryUom;
				var EntryUomIso = oTempModel.GrItemSet[iTex].EntryUomIso;
				var PoPrQnt = oTempModel.GrItemSet[iTex].PoPrQnt;
				var OrderprUn = oTempModel.GrItemSet[iTex].OrderprUn;
				var OrderprUnIso = oTempModel.GrItemSet[iTex].OrderprUnIso;
				var PoNumber = oTempModel.GrItemSet[iTex].PoNumber;
				var PoItem = oTempModel.GrItemSet[iTex].PoItem;
				var Shipping = oTempModel.GrItemSet[iTex].Shipping;
				var CompShip = oTempModel.GrItemSet[iTex].CompShip;
				var NoMoreGr = oTempModel.GrItemSet[iTex].NoMoreGr;
				var ItemText = oTempModel.GrItemSet[iTex].ItemText;
				var GrRcpt = oTempModel.GrItemSet[iTex].GrRcpt;
				var UnloadPt = oTempModel.GrItemSet[iTex].UnloadPt;
				var Costcenter = oTempModel.GrItemSet[iTex].Costcenter;
				var Orderid = oTempModel.GrItemSet[iTex].Orderid;
				var OrderItno = oTempModel.GrItemSet[iTex].OrderItno;
				var CalcMotive = oTempModel.GrItemSet[iTex].CalcMotive;
				var AssetNo = oTempModel.GrItemSet[iTex].AssetNo;
				var SubNumber = oTempModel.GrItemSet[iTex].SubNumber;
				var ReservNo = oTempModel.GrItemSet[iTex].ReservNo;
				var ResItem = oTempModel.GrItemSet[iTex].ResItem;
				var ResType = oTempModel.GrItemSet[iTex].ResType;
				var Withdrawn = oTempModel.GrItemSet[iTex].Withdrawn;
				var MoveMat = oTempModel.GrItemSet[iTex].MoveMat;
				var MovePlant = oTempModel.GrItemSet[iTex].MovePlant;
				var MoveStloc = oTempModel.GrItemSet[iTex].MoveStloc;
				var MoveBatch = oTempModel.GrItemSet[iTex].MoveBatch;
				var MoveValType = oTempModel.GrItemSet[iTex].MoveValType;
				var MvtInd = oTempModel.GrItemSet[iTex].MvtInd;
				var MoveReas = oTempModel.GrItemSet[iTex].MoveReas;
				var RlEstKey = oTempModel.GrItemSet[iTex].RlEstKey;
				var RefDate = oTempModel.GrItemSet[iTex].RefDate;
				var CostObj = oTempModel.GrItemSet[iTex].CostObj;
				var ProfitSegmNo = oTempModel.GrItemSet[iTex].ProfitSegmNo;
				var ProfitCtr = oTempModel.GrItemSet[iTex].ProfitCtr;
				var WbsElem = oTempModel.GrItemSet[iTex].WbsElem;
				var Network = oTempModel.GrItemSet[iTex].Network;
				var Activity = oTempModel.GrItemSet[iTex].Activity;
				var PartAcct = oTempModel.GrItemSet[iTex].PartAcct;
				var AmountLc = oTempModel.GrItemSet[iTex].AmountLc;
				var AmountSv = oTempModel.GrItemSet[iTex].AmountSv;
				var Currency = oTempModel.GrItemSet[iTex].Currency;
				var CurrencyIso = oTempModel.GrItemSet[iTex].CurrencyIso;
				var RefDocYr = oTempModel.GrItemSet[iTex].RefDocYr;
				var RefDoc = oTempModel.GrItemSet[iTex].RefDoc;
				var RefDocIt = oTempModel.GrItemSet[iTex].RefDocIt;
				var Expirydate = oTempModel.GrItemSet[iTex].Expirydate;
				var ProdDate = oTempModel.GrItemSet[iTex].ProdDate;
				var Fund = oTempModel.GrItemSet[iTex].Fund;
				var FundsCtr = oTempModel.GrItemSet[iTex].FundsCtr;
				var CmmtItem = oTempModel.GrItemSet[iTex].CmmtItem;
				var ValSalesOrd = oTempModel.GrItemSet[iTex].ValSalesOrd;
				var ValSOrdItem = oTempModel.GrItemSet[iTex].ValSOrdItem;
				var ValWbsElem = oTempModel.GrItemSet[iTex].ValWbsElem;
				var CoBusproc = oTempModel.GrItemSet[iTex].CoBusproc;
				var Acttype = oTempModel.GrItemSet[iTex].Acttype;
				var SupplVend = oTempModel.GrItemSet[iTex].SupplVend;
				var XAutoCre = oTempModel.GrItemSet[iTex].XAutoCre;
				var MaterialExternal = oTempModel.GrItemSet[iTex].MaterialExternal;
				var MaterialGuid = oTempModel.GrItemSet[iTex].MaterialGuid;
				var MaterialVersion = oTempModel.GrItemSet[iTex].MaterialVersion;
				var MoveMatExternal = oTempModel.GrItemSet[iTex].MoveMatExternal;
				var MoveMatGuid = oTempModel.GrItemSet[iTex].MoveMatGuid;
				var MoveMatVersion = oTempModel.GrItemSet[iTex].MoveMatVersion;
				var GrantNbr = oTempModel.GrItemSet[iTex].GrantNbr;
				var CmmtItemLong = oTempModel.GrItemSet[iTex].CmmtItemLong;
				var FuncAreaLong = oTempModel.GrItemSet[iTex].FuncAreaLong;
				var LineId = oTempModel.GrItemSet[iTex].LineId;
				var ParentId = oTempModel.GrItemSet[iTex].ParentId;
				var LineDepth = oTempModel.GrItemSet[iTex].LineDepth;
				var BudgetPeriod = oTempModel.GrItemSet[iTex].BudgetPeriod;
				var EarmarkedNumber = oTempModel.GrItemSet[iTex].EarmarkedNumber;
				var EarmarkedItem = oTempModel.GrItemSet[iTex].EarmarkedItem;
				var StkSegment = oTempModel.GrItemSet[iTex].StkSegment;

				itemData.push({
					Material: Material,
					Plant: Plant,
					StgeLoc: StgeLoc,
					Batch: Batch,
					MoveType: MoveType,
					StckType: StckType,
					SpecStock: SpecStock,
					Vendor: Vendor,
					Customer: Customer,
					SalesOrd: SalesOrd,
					SOrdItem: SOrdItem,
					SchedLine: SchedLine,
					ValType: ValType,
					EntryQnt: EntryQnt,
					EntryUom: EntryUom,
					EntryUomIso: EntryUomIso,
					PoPrQnt: PoPrQnt,
					OrderprUn: OrderprUn,
					OrderprUnIso: OrderprUnIso,
					PoNumber: PoNumber,
					PoItem: PoItem,
					Shipping: Shipping,
					CompShip: CompShip,
					NoMoreGr: NoMoreGr,
					ItemText: ItemText,
					GrRcpt: GrRcpt,
					UnloadPt: UnloadPt,
					Costcenter: Costcenter,
					Orderid: Orderid,
					OrderItno: OrderItno,
					CalcMotive: CalcMotive,
					AssetNo: AssetNo,
					SubNumber: SubNumber,
					ReservNo: ReservNo,
					ResItem: ResItem,
					ResType: ResType,
					Withdrawn: Withdrawn,
					MoveMat: MoveMat,
					MovePlant: MovePlant,
					MoveStloc: MoveStloc,
					MoveBatch: MoveBatch,
					MoveValType: MoveValType,
					MvtInd: MvtInd,
					MoveReas: MoveReas,
					RlEstKey: RlEstKey,
					RefDate: RefDate,
					CostObj: CostObj,
					ProfitSegmNo: ProfitSegmNo,
					ProfitCtr: ProfitCtr,
					WbsElem: WbsElem,
					Network: Network,
					Activity: Activity,
					PartAcct: PartAcct,
					AmountLc: AmountLc,
					AmountSv: AmountSv,
					RefDocYr: RefDocYr,
					RefDoc: RefDoc,
					RefDocIt: RefDocIt,
					Expirydate: Expirydate,
					ProdDate: ProdDate,
					Fund: Fund,
					FundsCtr: FundsCtr,
					CmmtItem: CmmtItem,
					ValSalesOrd: ValSalesOrd,
					ValSOrdItem: ValSOrdItem,
					ValWbsElem: ValWbsElem,
					GlAccount: "",
					IndProposeQuanx: " ",
					Xstob: "",
					EanUpc: "",
					DelivNumbToSearch: "",
					DelivItemToSearch: " ",
					SerialnoAutoNumberassignment: " ",
					Vendrbatch: Batch,
					StgeType: "",
					StgeBin: "StgeBin",
					SuPlStck1: EntryQnt,
					StUnQtyy1: EntryQnt,
					StUnQtyy1Iso: "",
					Unittype1: "",
					SuPlStck2: EntryQnt,
					StUnQtyy2: EntryQnt,
					StUnQtyy2Iso: " ",
					Unittype2: " ",
					StgeTypePc: "",
					StgeBinPc: " ",
					NoPstChgnt: " ",
					GrNumber: " ",
					StgeTypeSt: " ",
					StgeBinSt: "",
					MatdocTrCancel: " ",
					MatitemTrCancel: " ",
					MatyearTrCancel: " ",
					NoTransferReq: " ",
					CoBusproc: CoBusproc,
					Acttype: Acttype,
					SupplVend: SupplVend,
					MaterialExternal: MaterialExternal,
					MaterialGuid: MaterialGuid,
					MaterialVersion: MaterialVersion,
					MoveMatExternal: MoveMatExternal,
					MoveMatGuid: MoveMatGuid,
					MoveMatVersion: MoveMatVersion,
					FuncArea: FuncAreaLong,
					TrPartBa: " ",
					ParCompco: "",
					DelivNumb: " ",
					DelivItem: " ",
					NbSlips: " ",
					NbSlipsx: " ",
					GrRcptx: " ",
					UnloadPtx: "",
					SpecMvmt: " ",
					GrantNbr: GrantNbr,
					CmmtItemLong: CmmtItemLong,
					FuncAreaLong: FuncAreaLong,
					LineId: LineId,
					ParentId: ParentId,
					LineDepth: LineDepth,
					Quantity: EntryQnt,
					BaseUom: EntryUom,
					Longnum: " ",
					BudgetPeriod: BudgetPeriod,
					EarmarkedNumber: EarmarkedNumber,
					EarmarkedItem: EarmarkedItem,
					StkSegment: StkSegment,
					MoveSegment: ""

				});

			}
			var oRequestPayload = {};
			var MatDocd = oTempModel.MatDoc;
			var DocYear = oTempModel.DocYear;
			var TrEvType = oTempModel.TrEvType;
			var DocDate = this.datatime(oTempModel.DocDate);
			var PstngDate = this.datatime(oTempModel.PstngDate);
			//	var EntryDate = this.datatime(oTempModel.EntryDate);
			//	var EntryTime = oTempModel.EntryTime;
			var Username = oTempModel.Username;
			var VerGrGiSlip = oTempModel.VerGrGiSlip;
			//	var ExpimpNo = oTempModel.ExpimpNo;
			var RefDocNo = oTempModel.RefDocNo;
			var HeaderTxt = oTempModel.HeaderTxt;
			var RefDocNoLong = oTempModel.RefDocNoLong;

			oRequestPayload.PstngDate = PstngDate;
			oRequestPayload.DocDate = DocDate;
			oRequestPayload.RefDocNo = RefDocNo;
			oRequestPayload.BillOfLading = " ";
			oRequestPayload.GrGiSlipNo = " ";
			oRequestPayload.PrUname = Username;
			oRequestPayload.HeaderTxt = HeaderTxt;
			oRequestPayload.VerGrGiSlip = VerGrGiSlip;
			oRequestPayload.VerGrGiSlipx = " ";
			oRequestPayload.ExtWms = " ";
			oRequestPayload.RefDocNoLong = RefDocNoLong;
			oRequestPayload.BillOfLadingLong = " ";
			oRequestPayload.BarCode = " ";
			oRequestPayload.Matdocumentyear = DocYear;
			oRequestPayload.Materialdocument = MatDocd;
			oRequestPayload.GoodsmvtitemSet = itemData;

			console.log(oRequestPayload);

			BusyIndicator.show(0);
			oModel.create("/GrCrudSet", oRequestPayload, {

				success: this._onUpdateProdEntrySuccess.bind(this),
				error: this._onCreateEntryError.bind(this)
			});
			oPurchaseModel.refresh(true);

		},
		_onUpdateProdEntrySuccess: function(oObject, oResponse) {
			BusyIndicator.hide();

			var sap1 = {};
			sap1 = JSON.parse(oResponse.headers["sap-message"]);
			console.log(sap1.message);

			var oPurchaseModel = this.getView().getModel("GoodReceiptModel");
			var oTempContract = oPurchaseModel.getProperty("/GRPost");

			oTempContract.setData();
			var s = oPurchaseModel.oData.TempContract.destroy;
			//	s.refresh(true);

			oPurchaseModel.refresh(true);
			var allmodel = oView.getModel("AllDataModel");
			allmodel.setData({
				oData: {}
			});
			allmodel.updateBindings(true);

			allmodel.refresh(true);
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

			sap.m.MessageBox.show("Material document #" + sap1.message + " posted", {
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
			var err = x.error.message.value;

			jQuery.sap.require("sap.m.MessageBox");

			sap.m.MessageBox.error(
				"Error creating entry: " + err + " "
			);

		},

		onCancelPRess: function(event) {
				var oPurchaseModel = this.getView().getModel("GoodReceiptModel");
				var oTempContract = oPurchaseModel.getProperty("/GRPost");

				oTempContract.setData();
				//	oPurchaseModel.setData([]);
				var s = oPurchaseModel.oData.TempContract.destroy;
				//	s.refresh(true);
				var allmodel = oView.getModel("AllDataModel");
				allmodel.setData({
					oData: {}
				});
				allmodel.updateBindings(true);

				allmodel.refresh(true);
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