sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/library",
	"sap/m/Input",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"com/vSimpleApp/model/RebateConditionItemPO",
	"com/vSimpleApp/model/VendorRebateCondition",
	"com/vSimpleApp/model/CreateContract",
	"com/vSimpleApp/model/GetPODetails",
	"com/vSimpleApp/model/UpdatePO",
	"sap/m/ColumnListItem",
	"jquery.sap.global",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History",
	'sap/ui/core/BusyIndicator',
	"com/vSimpleApp/model/POItem",
	"com/vSimpleApp/model/PurchaseHeader"

], function(Controller, JSONModel, library, Input, Fragment, Filter, FilterOperator, RebateConditionItemPO,
	VendorRebateCondition, CreateContract, GetPODetails, UpdatePO, ColumnListItem, jQuery, MessageToast, MessageBox, History, BusyIndicator,
	POItem, PurchaseHeader) {
	"use strict";

	//global variable
	var oView, oComponent;
	var Ebeln, PurchaseOno, openpoList;
	var ListofVendor = [],
		ListofCompanycode = [],
		ListofPurchaseOrg = [];
	var MaterialnUmberForPo;
	return Controller.extend("com.vSimpleApp.controller.POITemDetails", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.vSimpleApp.view.view.POITemDetails
		 */
		onInit: function() {
			oView = this.getView();
			var oModel = this.getOwnerComponent().getModel("VHeader");
			oComponent = this.getOwnerComponent();
			//set the model on view to be used by the UI controls
			this.getView().setModel(oModel);

			this.getPurchaseOrderList();
			var oLookupModel = this.getOwnerComponent().getModel("Lookup");
			//model property store in variable
			openpoList = oLookupModel.oData.OpenPOList;
			ListofVendor = oLookupModel.oData.DisplyaVendorList;
			this.getOpenPOS();

			//define the json models
			var oPOitemsTab = new JSONModel();
			oView.setModel(oPOitemsTab, "PurchaseModelITem");

			var oPurchaseItems = new JSONModel();
			oView.setModel(oPurchaseItems, "PurchaseItems");

			var oOpenPOModel = new JSONModel();
			oView.setModel(oOpenPOModel, "OpenPOModel");

			var oEditModel = new JSONModel({
				isEditable: false
			});

			this.getView().setModel(oEditModel, "EditModel");
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("POITemDetails").attachPatternMatched(this._onObjectMatched, this);
			oView.byId("idSave").setVisible(false);
		},
		getOpenPOS: function() {

			var oModel = this.getOwnerComponent().getModel("VHeader");
			BusyIndicator.show(true);

			oModel.read("/openpo_headerSet", {
				success: function(oData) {
					BusyIndicator.hide(false);

					var iItemPO = oData.results.length;

					oView.getModel("OpenPOModel", oData.results);

				},
				error: function(oError) {
					BusyIndicator.hide(false);
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},

		onNavBack: function(oevt) {
			//clear all data and navigate to back page
			var oPurchaseModel = oComponent.getModel("PurchaseModel");
			var oTempContract = oPurchaseModel.getProperty("/TempContract");
			oTempContract.setData();
			//	oPurchaseModel.setData([]);
			var oDestroy = oPurchaseModel.oData.TempContract.destroy;
			oPurchaseModel.refresh(true);
			this.getOwnerComponent().getRouter().navTo("PoHeaderList");
			this.getView().getModel("VHeader").refresh();

		},
		_onObjectMatched: function(oEvent) {
			//get all the details form the parameter
			var oModel = this.getOwnerComponent().getModel("PurchaseSet");

			var sPath = oEvent.getParameter("arguments");
			PurchaseOno = sPath.PoNo;

			//call the function
			this.getVendorList();
			this.getCompanyList();
			this.getPurchaseOrgList();

			var oPomodel = new JSONModel({
				PurchaseO: PurchaseOno
			});

			this.getView().setModel(oPomodel, "pomodel");

			return new Promise(function(resolve1, reject1) {

				BusyIndicator.show(true);
				oModel.read("/PoDisplaySet(Purchaseorder='" + PurchaseOno + "')", {
					urlParameters: {
						"$expand": "PoitemSet,PoCondSet,PoScheduleSet"
					},

					success: function(odata) {
						console.log(odata);
						BusyIndicator.hide(false);

						var Podata = new PurchaseHeader(odata);
						oView.getModel("PurchaseModel").setProperty("/TempContract", Podata);
						// setData(oData.results);

						oView.getModel("PurchaseModel").setProperty("/TempContract/PoitemSet", Podata.PoitemSet.results);
						oView.getModel("PurchaseModel").setProperty("/TempContract/PoCondSet", Podata.PoCondSet.results);
						oView.getModel("PurchaseModel").setProperty("/TempContract/PoScheduleSet", Podata.PoScheduleSet.results);

						var aPurchaseConditionItems = Podata.PoitemSet;
						var iTtem = aPurchaseConditionItems.length;

						var sMatno = aPurchaseConditionItems[0].Material;

						for (var val = 0; val < iTtem; val++) {
							var Matitem = aPurchaseConditionItems[val].Material;
							//		var a = aPurchaseConditionItems.indexOf(sMaterial);
							if (sMatno.indexOf(" ") !== -1) {
								sMatno = sMatno.split(" ");
								sMatno = sMatno[0];
							}
							if (Matitem === sMatno) {
								var sMatList = new RebateConditionItemPO(aPurchaseConditionItems[val]);

								var oListModel = new JSONModel();
								oListModel.setData(sMatList);
								oView.setModel(oListModel, "PurchaseItems");
								
				//	oView.getModel("PurchaseModel").setProperty("/TempContract/PoitemSet", Podata.PoitemSet.results);
					
							} else {

							}

						}
						var aPoDetailsItems = [];

						var sVendor = Podata.Vendor;
						var sCreatedBy = Podata.CreatedBy;
						var sCreatDate = Podata.CreatDate;

						var sCompCode = Podata.CompCode;
						var sPurchOrg = Podata.PurchOrg;
						var sPurGroup = Podata.PurGroup;
						var sPurchaseorder = Podata.Purchaseorder;
						//get vendor name form vendor
						if (sVendor !== "" || sVendor !== undefined) {
							for (var y = 0; y < ListofVendor.length; y++) {
								if (sVendor === ListofVendor[y].Lifnr) {
									var sVendorname = ListofVendor[y].Name1;
									var Stras = ListofVendor[y].Stras;
									var Telf1 = ListofVendor[y].Telf1;
									var Pstlz = ListofVendor[y].Pstlz;
									var Land1 = ListofVendor[y].Land1;
									var Adrnr = ListofVendor[y].Adrnr;
									var Ort02 = ListofVendor[y].Ort02;
									var Regio = ListofVendor[y].Regio;

									oView.byId("idStreetHeader").setValue(Stras);
									oView.byId("idTelHeader").setValue(Telf1);
									oView.byId("idPostcodeHeader").setValue(Pstlz);
									oView.byId("idCountryCodeHeader").setValue(Land1);
									oView.byId("idAddnoHeader").setValue(Adrnr);
									oView.byId("idCityHeader").setValue(Ort02);

									oView.byId("vendoridd").setValue(sVendor);
									oView.byId("vendorname").setValue(sVendorname);
									oView.byId("idStreet").setValue(Stras);
									oView.byId("idAddno").setValue(Adrnr);
									oView.byId("idCountryCode").setValue(Land1);
									oView.byId("idRegion").setValue(Regio);
									oView.byId("idPostcode").setValue(Adrnr);
									oView.byId("idCity").setValue(Ort02);
									oView.byId("idTel").setValue(Telf1);

								}
							}
						}
						//get companycode discription from comp code
						if (sCompCode !== "" || sCompCode !== undefined) {
							for (var z = 0; z < ListofCompanycode.length; z++) {
								if (sCompCode === ListofCompanycode[z].Bukrs) {
									var compcodename = ListofCompanycode[z].Butxt;

								}
							}
						}
						//get purchase org description from purchase org
						if (sPurchOrg !== "" || sPurchOrg !== undefined) {
							for (var w = 0; w < ListofPurchaseOrg.length; w++) {
								if (sPurchOrg === ListofPurchaseOrg[w].Ekorg) {
									var sPurchOrgname = ListofPurchaseOrg[w].Ekotx;

								}
							}
						}
						//set the values to id
						oView.byId("vnumber").setValue(sVendor);
						oView.byId("idPurchaseOrg").setValue(sPurchOrg);
						oView.byId("cc").setValue(sCompCode);
						//		oView.byId("cu").setValue(sCurrency);
						oView.byId("pg").setValue(sPurGroup);

						var sDateon = sCreatDate.getFullYear() + "/" + sCreatDate.getMonth() + "/" + sCreatDate.getDate() + " ";
						//Header model 
						var oHeaderDataModel = new JSONModel({
							Name: sVendorname,
							Number: sVendor,
							createdby: sCreatedBy,
							createddate: sDateon,
							CompCodeno: sCompCode,
							CompCodename: compcodename,
							PurchOrgno: sPurchOrg,
							PurchOrgname: sPurchOrgname
						});

						oView.setModel(oHeaderDataModel, "oHeaderDataModel");

						var oHeaderDataCodePurOrg = new JSONModel({

							CompCode: compcodename,
							PurchOrg: sPurchOrgname
						});

						oView.setModel(oHeaderDataCodePurOrg, "oHeaderDataCodePurOrg");

						aPoDetailsItems.push({
							PoNumber: sPurchaseorder,
							Vendor: sVendor,
							Name: sVendorname,

							CreatedBy: sCreatedBy,
							CreatDate: sCreatDate,
							CompCode: sCompCode,
							PurchOrg: sPurchOrg,
							PurGroup: sPurGroup

						});

					},
					error: function(oError) {
						BusyIndicator.hide(false);
						MessageBox.error(oError);

					}
				});

			});

		},

		onEditPress: function() {
			//all the input  fields in editable mode
			oView.byId("iddEdit").setVisible(false);
			oView.byId("idSave").setVisible(true);
			oView.getModel("EditModel").setProperty("/isEditable", true);
		},
		OnCancel: function(event) {
			//cancel the all selected values and data
			oView.getModel("EditModel").setProperty("/isEditable", false);
			oView.byId("iddEdit").setVisible(true);
			oView.byId("idSave").setVisible(false);
			var oPurchaseModel = this.getOwnerComponent().getModel("PurchaseModel");
			var oTempContract = oPurchaseModel.getProperty("/TempContract");
			oTempContract.setData();
			//	oPurchaseModel.setData([]);
			var aDestroy = oPurchaseModel.oData.TempContract.destroy;
			//	s.refresh(true);

			oPurchaseModel.refresh(true);
			this.getView().getModel("VHeader").refresh();

			oView.byId("idPurchaseOrg").setValue("");

			oView.byId("cc").setValue("");
			oView.byId("vnumber").setValue("");
			oView.byId("cu").setValue("");
			oView.byId("pg").setValue("");

			//redirect the page	frot view
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("ShowTiles");

		},

		getMaterialDisList: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("VHeader");
			//BusyIndicator.show(0);
			oModel.read("/MaterialmasterSet", {
				success: function(oData) {
					//BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/MaterialDiscription", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					//BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},

		handleMaterialDisVendor: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogMD) {
				this._valueHelpDialogMD = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.MaterialDescription",
					this
				);
				this.getView().addDependent(this._valueHelpDialogMD);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogMD.getBinding("items").filter(new Filter([new Filter(
				"Description",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Materialno",
				FilterOperator.Contains, sInputValue
			)]));
			this.getMaterialDisList();
			// open value help dialog filtered by the input value
			this._valueHelpDialogMD.open(sInputValue);
		},
		_handleMaterialDisSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Description",
				FilterOperator.Contains, sValue
			), new Filter(
				"Materialno",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handleMaterialDisClose: function(evt) {

			var oSelectedItem = evt.getParameter("selectedItem");
			//	var oPurchaseContract = oPurchaseModel.getProperty("/TempContract");

			var oModel = oView.getModel("Lookup");
			var oPurchaseModel = this.getView().getModel("PurchaseModel");

			if (oSelectedItem) {
				var productInput = this.byId(this.inputId);
				MaterialnUmberForPo = oSelectedItem.getInfo();
				var sTitle = oSelectedItem.getTitle();
				productInput.setSelectedKey(MaterialnUmberForPo);

				productInput.setValue(sTitle);
				var sBindPath = oSelectedItem.getBindingContext("Lookup").sPath;
				productInput.setValue(MaterialnUmberForPo);

				var oMat = oModel.getProperty(sBindPath + "/Materialno");
				var ab = $(this)[0].inputId;
				var id = $("#" + ab).closest("tr").find(".mtid").attr("id");
				$("#" + id + "-inner").val(oMat);
				var oDiscription = oModel.getProperty(sBindPath + "/Description");
				var uom = oModel.getProperty(sBindPath + "/UOM");

				var ab = $(this)[0].inputId;
				var id = $("#" + ab).closest("tr").find(".desc1").attr("id");
				$("#" + id + "-inner").val(oDiscription);

				var b = oModel.getProperty(sBindPath + "/UOM");
				var ab1 = $(this)[0].inputId;
				var id1 = $("#" + ab1).closest("tr").find(".measure1").attr("id");
				$("#" + id1 + "-inner").val(b);

				var sPath = oPurchaseModel.oData.TempContract.POItem;
				var Modifiedlenght = sPath.length - 1;

				sPath[Modifiedlenght].Matnr = MaterialnUmberForPo;
				oPurchaseModel.setProperty(sPath);
				sPath[Modifiedlenght].Material = MaterialnUmberForPo;
				oPurchaseModel.setProperty(sPath + "/Material");

			}
			evt.getSource().getBinding("items").filter([]);
		},

		/*PGRP Search start*/

		getPurchaseGroupList: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("VHeader");
			//BusyIndicator.show(0);
			oModel.read("/get_purgrp_f4helpSet", {
				success: function(oData) {
					//BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/PurchaseGroupList", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					//BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},

		handlePurchaseGroupVendor: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogpgrop) {
				this._valueHelpDialogpgrop = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.PurchaseGroup",
					this
				);
				this.getView().addDependent(this._valueHelpDialogpgrop);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogpgrop.getBinding("items").filter(new Filter([new Filter(
				"Ekgrp",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Eknam",
				FilterOperator.Contains, sInputValue
			)]));
			this.getPurchaseGroupList();
			// open value help dialog filtered by the input value
			this._valueHelpDialogpgrop.open(sInputValue);
		},
		_handlePurchaseGroupSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Ekgrp",
				FilterOperator.Contains, sValue
			), new Filter(
				"Eknam",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handlePurchaseGroupClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputId),
					sDescription = oSelectedItem.getInfo(),
					sTitle = oSelectedItem.getTitle();
				productInput.setSelectedKey(sDescription);
				productInput.setValue(sTitle);

			}
			evt.getSource().getBinding("items").filter([]);
		},
		/*POGRP SEarch end*/

		/*start purchase order f4 click*/
		getPurchaseOrderList: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("VHeader");
			//	BusyIndicator.show(0);
			oModel.read("/POListSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/POOrderList", oData.results);
					oLookupModel.refresh(true);

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
			//
			// open value help dialog filtered by the input value
			this._valueHelpDialog.open(sInputValue);

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

			//		console.log(oModel);
			if (oSelectedItem) {

				var productInput = this.byId(this.inputId);
				var sBindPath = oSelectedItem.getBindingContext("Lookup").sPath;
				productInput.setValue(oSelectedItem.getTitle());

				oView.byId("vnumber").setValue(oModellookup.getProperty(sBindPath + "/Lifnr"));
				oView.byId("idPurOrg").setValue(oModellookup.getProperty(sBindPath + "/Ekorg"));
				oView.byId("idCompCode").setValue(oModellookup.getProperty(sBindPath + "/Bukrs"));
				oView.byId("idCountryCode").setValue(oModellookup.getProperty(sBindPath + "/Waers"));
				oView.byId("idPurGrg").setValue(oModellookup.getProperty(sBindPath + "/Ekgrp"));
				Ebeln = oModellookup.getProperty(sBindPath + "/Ebeln");

				var aFilter = [
					new sap.ui.model.Filter({
						path: "Purchaseorder",
						operator: sap.ui.model.FilterOperator.EQ,
						value1: Ebeln
					})

				];

				oModel.read("/PO_DetailsSet", {

					filters: aFilter,
					success: function(oData) {
						//set the odata items to model property
						oView.getModel("PurchaseModel").setProperty("/TempContract/POItem", oData.results);

					},
					error: function(oError) {
						MessageBox.error(oError);

					}
				});
				//set the data to table
				this.byId("idPOItemsTab").setModel(oView.getModel("PurchaseModelITem"), "PurchaseModelITem");

			}
			oEvent.getSource().getBinding("items").filter([]);

		},
		suggestionItemSelectedPOrder: function(oEvent) {
			var oSelectedItem = oEvent.getParameter("selectedItem");
			//get the all data for selected values
			var oModel = this.getOwnerComponent().getModel("VHeader");
			if (oSelectedItem) {

				var iproductInput = this.byId(this.inputId);
				var sBindPath = oSelectedItem.getBindingContext("VHeader").sPath;

				//	productInput.setValue(sInputValue.getTitle());
				oView.byId("vnumber").setValue(oModel.getProperty(sBindPath + "/Lifnr"));
				oView.byId("idPurOrg").setValue(oModel.getProperty(sBindPath + "/Ekorg"));
				oView.byId("idCompCode").setValue(oModel.getProperty(sBindPath + "/Bukrs"));
				oView.byId("idCountryCode").setValue(oModel.getProperty(sBindPath + "/Waers"));
				oView.byId("idPurGrg").setValue(oModel.getProperty(sBindPath + "/Ekgrp"));
				oView.byId("idPoOrder").setValue(oModel.getProperty(sBindPath + "/Ebeln"));
				Ebeln = oModel.getProperty(sBindPath + "/Ebeln");
				var aFilter = [
					new sap.ui.model.Filter({
						path: "Purchaseorder",
						operator: sap.ui.model.FilterOperator.EQ,
						value1: Ebeln
					})

				];

				oModel.read("/PO_DetailsSet", {

					filters: aFilter,
					success: function(oData) {
						oView.getModel("PurchaseModel").setProperty("/TempContract/POItem", oData.results); // setData(oData.results);
					},
					error: function(oError) {
						MessageBox.error(oError);
					}
				});
				this.byId("idPOItemsTab").setModel(oView.getModel("PurchaseModelITem"), "PurchaseModelITem");
			}

		},

		/*end purchase order f4 click*/

		/*SEARCH vendor start*/
		getVendorList: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("VHeader");
			//BusyIndicator.show(0);
			oModel.read("/Fetch_Vendor_DetailsSet", {
				success: function(oData) {
					var iItem = oData.results.length;

					for (var iRowIndex = 0; iRowIndex <= 2600; iRowIndex++) {
						var odata = oData.results[iRowIndex];
						if (odata !== undefined) {
							var Lifnrr = odata.Lifnr;
							var Name1r = odata.Name1;
							var Bukrs = odata.Bukrs;
							var Ekgrp = odata.Ekgrp;
							var Ekorg = odata.Ekorg;
							var Gbort = odata.Gbort;
							var Ktokk = odata.Ktokk;
							var Kunnr = odata.Kunnr;
							var Land1 = odata.Land1;
							var Ort01 = odata.Ort01;
							var Pstlz = odata.Pstlz;
							var Stras = odata.Stras;
							var Regio = odata.Regio;
							var Telf1 = odata.Telf1;
							var Waers = odata.Waers;
							var Sexkz = odata.Sexkz;
							var Adrnr = odata.Adrnr;
							ListofVendor.push({
								Lifnr: Lifnrr,
								Name1: Name1r,
								Adrnr: Adrnr,
								Bukrs: Bukrs,
								Ekgrp: Ekgrp,
								Ekorg: Ekorg,
								Gbort: Gbort,
								Ktokk: Ktokk,
								Kunnr: Kunnr,
								Land1: Land1,
								Ort01: Ort01,
								Pstlz: Pstlz,
								Regio: Regio,
								Sexkz: Sexkz,
								Stras: Stras,
								Telf1: Telf1,
								Waers: Waers

							});
						}

					}

					var oCount = new sap.ui.model.json.JSONModel({
						item: iItem

					});
					oView.setModel(oCount, "Count");

					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/DisplyaVendorList", ListofVendor);
					oLookupModel.refresh(true);

				},
				error: function(oError) {

					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},
		_handleValueVendorHelpS: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			//open the vendor fragment
			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogMP) {
				this._valueHelpDialogMP = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.Display",
					this
				);
				this.getView().addDependent(this._valueHelpDialogMP);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogMP.getBinding("items").filter(new Filter([new Filter(
				"Name1",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Lifnr",
				FilterOperator.Contains, sInputValue
			)]));
			this.getVendorList();
			// open value help dialog filtered by the input value
			this._valueHelpDialogMP.open(sInputValue);
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

					var sBindPath = oSelectedItem.getBindingContext("Lookup").sPath;
					oView.byId("idPurchaseOrg").setValue(oModel.getProperty(sBindPath + "/Ekorg"));
					oView.byId("cc").setValue(oModel.getProperty(sBindPath + "/Bukrs"));
					oView.byId("pg").setValue(oModel.getProperty(sBindPath + "/Ekgrp"));
					oView.byId("cu").setValue(oModel.getProperty(sBindPath + "/Waers"));
					oView.byId("VendorName").setValue(oModel.getProperty(sBindPath + "/Name1"));

				}
			}
			evt.getSource().getBinding("items").filter([]);

		},

		/*search vendor end*/

		onPOITemDetailss: function(oEvent) {
			oView.byId("idEdit").setVisible(false);
			oView.byId("idSave").setVisible(true);
			oView.byId("ed").setText("Change Purchase Order");

			oView.getModel("EditModel").setProperty("/isEditable", true);

			$(document).ready(function() {
				$("idEdit").click(function() {
					$("nDescription").removeAttr("value");
				});
			});

		},

		/*Purchase Order Suggestion Items Ended*/
		onAddNewConditionItem: function() {
			// add the new rows in a table and added set  the array to property

			var oPurchaseModel = this.getView().getModel("PurchaseModel");
			var aPurchaseConditionItems = oPurchaseModel.getProperty("/TempContract/PoitemSet");
				function LeadingZeros(num, size) {
				    var s = num+"";
				    while (s.length < size) s = "0" + s;
				    return s;
				}
			aPurchaseConditionItems.push(new RebateConditionItemPO({
				PoItem: LeadingZeros(aPurchaseConditionItems.length + 1 , 5)
			}));
			oPurchaseModel.refresh(false);

		},

		onDeleteConditionItem: function() {
			//delete the selected rows in a table and also delete the array property in model
			var oPurchaseItemTable = this.byId("idPOItemsTab");
			var aSelectedIndex = oPurchaseItemTable.getSelectedIndices().reverse();
			var oPurchaseModel = this.getOwnerComponent().getModel("PurchaseModel");
			var aPurchaseConditionItems = oPurchaseModel.getProperty("/TempContract/PoitemSet");
			for (var i = 0; i < aSelectedIndex.length; i++) {
				aPurchaseConditionItems.splice(aSelectedIndex[i], 1);
			}
			oPurchaseItemTable.clearSelection();
			oPurchaseModel.refresh(true);
		},
		onSelectMaterial: function(oEvt) {
			var sMaterial = oEvt.getSource().getSelectedKey();
			var oPurchaseModel = this.getOwnerComponent().getModel("PurchaseModel");
			var aPurchaseConditionItems = oPurchaseModel.getProperty("/TempContract/PoitemSet");
			var iTtem = oPurchaseModel.oData.TempContract.PoitemSet.length;

			for (var val = 0; val < iTtem; val++) {
				var Matitem = aPurchaseConditionItems[val].Material;
				//		var a = aPurchaseConditionItems.indexOf(sMaterial);
				if (sMaterial.indexOf(" ") !== -1) {
					sMaterial = sMaterial.split(" ");
					sMaterial = sMaterial[0];
				}
				if (Matitem === sMaterial) {
					var sMatList = new RebateConditionItemPO(aPurchaseConditionItems[val]);

					oView.getModel("PurchaseItems").setData(sMatList);

				} else {

				}

			}

		},
		/*Material Number Search start*/
		getMaterialList: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("VHeader");
			//BusyIndicator.show(0);
			oModel.read("/MaterialmasterSet", {
				success: function(oData) {
					//BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/MaterialList", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					//BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},

		handlePOMaterialHelp: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			//eate value help dialog
			if (!this._valueHelpDialogph) {
				this._valueHelpDialogph = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.MaterialNumber",
					this
				);
				this.getView().addDependent(this._valueHelpDialogph);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogph.getBinding("items").filter(new Filter([new Filter(
				"Materialno",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Description",
				FilterOperator.Contains, sInputValue
			)]));
			this.getMaterialList();
			// open value help dialog filtered by the input value
			this._valueHelpDialogph.open(sInputValue);
		},
		_handlePOMaterialSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Materialno",
				FilterOperator.Contains, sValue
			), new Filter(
				"Description",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},

		_handlePOMaterialClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			var oModel = oView.getModel("Lookup");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputId);
				var sBindPath = oSelectedItem.getBindingContext("Lookup").sPath;
				productInput.setValue(oSelectedItem.getTitle());

				var oDiscription = oModel.getProperty(sBindPath + "/Description");
				var uom = oModel.getProperty(sBindPath + "/UOM");

				var ab = $(this)[0].inputId;
				var id = $("#" + ab).closest("tr").find(".desc1").attr("id");
				var ss = "#" + id + "-inner";
				console.log(ss);
				$("#" + id + "-inner").val(oDiscription);

				MaterialnUmberForPo = oSelectedItem.getTitle();
				console.log(MaterialnUmberForPo);
				var sDiscription = oModel.getProperty(sBindPath + "/Description");
				var sUOM = oModel.getProperty(sBindPath + "/UOM");

				var b = oModel.getProperty(sBindPath + "/UOM");
				var ab1 = $(this)[0].inputId;
				var id1 = $("#" + ab1).closest("tr").find(".measure1").attr("id");
				$("#" + id1 + "-inner").val(b);

			}
			evt.getSource().getBinding("items").filter([]);

		},

		/*Material SEarch end*/

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

				},
				error: function(oError) {
					//BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},

		_handlePlantClose: function(evt) {
			var zero = "";
			var oSelectedItem = evt.getParameter("selectedItem");
			var oPurchaseModel = this.getView().getModel("PurchaseModel");
			var sVendor = oPurchaseModel.oData.TempContract.Vendor;

			var sMaterialno = MaterialnUmberForPo;
			var oModelread = oView.getModel("VHeader");

			var oModel = oView.getModel("Lookup");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputId);
				productInput.setValue(oSelectedItem.getTitle());
				var sPlantNumber = oSelectedItem.getTitle();
				oView.byId("Price").setValue(oModel.getProperty("/Stprs"));
				var s = "This";
				//increase the lenght of value
				var a = oView.byId("Price").setValue(s);
				if ($.isNumeric((sMaterialno)) === true) {
					var len = sMaterialno.length;
					if (len !== undefined) {
						var z = 18 - len;
						for (var i = 0; i < z; i++) {
							zero += "0";
						}
					}
					console.log(len);
					console.log(zero);
					sMaterialno = zero + sMaterialno;
				}

				var notzwer = "";
				//	var no;
				//increase the length of variable
				if ($.isNumeric((sVendor)) === true) {
					var len = sVendor.length;
					if (len !== undefined) {
						var z = 18 - len;
						for (var i = 0; i < z; i++) {
							notzwer += "0";
						}
					}
					console.log(len);
					console.log(notzwer);
					sVendor = notzwer + sVendor;
				}
				//filtered the data and set the filter to get enttityset
				var oFilter = new sap.ui.model.Filter('Lifnr', sap.ui.model.FilterOperator.EQ, sVendor);
				var oFilterV = new sap.ui.model.Filter('Matnr', sap.ui.model.FilterOperator.EQ, sMaterialno);
				var that = this;
				oModelread.read("/fetch_matpriceSet?$filter=(Lifnr eq '" + sVendor + "',Matnr eq '" + sMaterialno + "')", {
					filters: [oFilter, oFilterV],

					success: function(oData) {
						//get the price from passing filtered vendor and material no
						if (!oData.results.length) {
							MessageBox.alert("No price found for given material number and plant combination. Add the price manually.");
							var aaas = "0.00";

							var ab = $(that)[0].inputId;
							var id = $("#" + ab).closest("tr").find(".price1").attr("id");
							$("#" + id + "-inner").val(aaas);
						} else {

							var oPriceJson = new JSONModel();
							oPriceJson.setData(oData.results);
							oView.setModel(oPriceJson);
							var oHierarchyModel = new sap.ui.model.json.JSONModel();
							oView.setModel(oHierarchyModel, "hierarchy");
							oView.getModel("hierarchy").setData(oData);
							var aaas = oHierarchyModel.oData.results[0].Netpr;
							var ab = $(that)[0].inputId;
							var id = $("#" + ab).closest("tr").find(".price1").attr("id");
							$("#" + id + "-inner").removeAttr('value');
							$("#" + id + "-inner").val(aaas);

						}

					},
					error: function(oError) {
						console.log(oError);
						MessageBox.error("No price found for given material number and plant combination. Add the price manually.");
					}

				});

				evt.getSource().getBinding("items").filter([]);
			}
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

		/*plant search end*/

		onSavePurchaseOrder: function() {
			var oModel = this.getOwnerComponent().getModel("PurchaseSet");

			//get odata model with the data
			var oPurchaseModel = this.getView().getModel("PurchaseModel");
			var oPurchaseContract = oPurchaseModel.getProperty("/TempContract");
			var oRequestPayload = oPurchaseContract.getRequestPayload();
		 console.log(oRequestPayload);
		 
		/*	var Bukrs = oPurchaseContract.CompCode;

			var Lifnr = oPurchaseContract.Vendor;
			var Ebelp = oPurchaseContract.PoItem;

			var PoItem = Ebelp;

			var zero = "";
			//	var no;
			//increase the vendor length
			var len = Lifnr.length;
			if (len !== undefined) {
				var z = 10 - len;
				for (var i = 0; i < z; i++) {
					zero += "0";
				}
			}

			console.log(len);
			console.log(zero);
			Lifnr = zero + Lifnr;
			console.log(Lifnr);
			var Ekorg = oPurchaseContract.PurchOrg;
			var Ekgrp = oPurchaseContract.PurGroup;
			var Waers = oPurchaseContract.Currency;

			console.log(Ebeln);
			//var POItem = [];

			var aItems = oPurchaseContract.PoitemSet;
			//	Ebeln = oPurchaseContract.oData[0].Ebeln;

			console.log(aItems.length);
			// Define an empty Array
			var aItemData = [];

			//iterate the values of levels
			for (var iRowIndex = 0; iRowIndex < aItems.length; iRowIndex++) {

				var s_Ebelp = oPurchaseContract.PoitemSet[iRowIndex].Ebelp;
				s_Ebelp = Number(s_Ebelp).toString();

				var l_PoItem = oPurchaseContract.PoitemSet[iRowIndex].PoItem;
				l_PoItem = Number(l_PoItem).toString();

				var l_Ebelp1;

				if (!isNaN(s_Ebelp)) {
					l_Ebelp1 = s_Ebelp;
				} else if (l_PoItem !== undefined) {
					l_Ebelp1 = l_PoItem;
				}

				var l_material = oPurchaseContract.PoitemSet[iRowIndex].Material;
				var l_Menge = oPurchaseContract.PoitemSet[iRowIndex].Quantity;
				var l_Werks = oPurchaseContract.PoitemSet[iRowIndex].Plant;

				aItemData.push({
					Ebelp: l_Ebelp1,
					Matnr: l_material,
					Menge: l_Menge,
					Werks: l_Werks

				});
			}

			var oEntry1 = {};
			oEntry1.Ebeln = PurchaseOno;
			oEntry1.Bukrs = Bukrs;
			oEntry1.Bsart = "EC";
			oEntry1.Lifnr = Lifnr;
			oEntry1.Ekorg = Ekorg;
			oEntry1.Ekgrp = Ekgrp;
			oEntry1.Waers = Waers;

			//set the item data to ProductSet
			oEntry1.POItem = aItemData;
*/
	//		BusyIndicator.show(0);

			oModel.create("/PoDisplaySet", oRequestPayload, {
				success: this._onUpdateProdEntrySuccess.bind(this),
				error: this._onCreateEntryError.bind(this)
			});

			oPurchaseModel.refresh(true);

		},
		_onUpdateProdEntrySuccess: function(oObject, oResponse) {
		//	BusyIndicator.hide();
			//show the response from sap using meassage box
			var sUpdatedPO = oResponse.data.Ebeln;
			var oPurchaseModel = this.getOwnerComponent().getModel("PurchaseModel");
			var oTempContract = oPurchaseModel.getProperty("/TempContract");
			oTempContract.setData();
			var sDestroy = oPurchaseModel.oData.TempContract.destroy;
			//	s.refresh(true);
			oView.byId("vnumber").setValue("");
			oPurchaseModel.refresh(true);
			jQuery.sap.require("sap.m.MessageBox");
			sap.m.MessageBox.show("Standard PO updated under the number  #" + sUpdatedPO + " ", {

				icon: sap.m.MessageBox.Icon.INFORMATION,

				actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CLOSE],
				onClose: function(oAction) {
					if (oAction === "OK") {
						var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
						oRouter.navTo('PoHeaderList');
					}
				}.bind(this)
			});

		},
		_onCreateEntryError: function(oError) {
		//	BusyIndicator.hide();
			var sRespon = JSON.parse(oError.responseText);
			var err = sRespon.error.message.value;

			jQuery.sap.require("sap.m.MessageBox");

			sap.m.MessageBox.error(
				"Error creating entry: " + err + " "
			);

		},

		/*Po Search*/
		getPurchaseOrgList: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("VHeader");
			BusyIndicator.show(0);
			oModel.read("/get_purchaseorg_f4helpSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/PurchaseOrganization", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},

		handlePurchaseOrgVendor: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogporg) {
				this._valueHelpDialogporg = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.PurchaseOrg",
					this
				);
				this.getView().addDependent(this._valueHelpDialogporg);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogporg.getBinding("items").filter(new Filter([new Filter(
				"Ekorg",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Ekotx",
				FilterOperator.Contains, sInputValue
			)]));
			this.getPurchaseOrgList();
			// open value help dialog filtered by the input value
			this._valueHelpDialogporg.open(sInputValue);
		},
		_handlePOrganiVendorSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Ekorg",
				FilterOperator.Contains, sValue
			), new Filter(
				"Ekotx",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handlePOrganiVendorClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputId),
					sDescription = oSelectedItem.getInfo(),
					sTitle = oSelectedItem.getTitle();
				productInput.setSelectedKey(sDescription);
				productInput.setValue(sTitle);

			}
			evt.getSource().getBinding("items").filter([]);
		},

		/*PO Search end*/

		/*Comp Search start*/

		getCompanyList: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("VHeader");
			//BusyIndicator.show(0);
			oModel.read("/get_companycode_f4helpSet", {
				success: function(oData) {
					//BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/CountryCode", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					//BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},

		handleCompanyCodeVendor: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogcomp) {
				this._valueHelpDialogcomp = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.CompCode",
					this
				);
				this.getView().addDependent(this._valueHelpDialogcomp);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogcomp.getBinding("items").filter(new Filter([new Filter(
				"Bukrs",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Butxt",
				FilterOperator.Contains, sInputValue
			)]));
			this.getCompanyList();
			// open value help dialog filtered by the input value
			this._valueHelpDialogcomp.open(sInputValue);
		},
		_handlevendorCompSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Bukrs",
				FilterOperator.Contains, sValue
			), new Filter(
				"Butxt",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handlevendorCompClose: function(evt) {
				var oSelectedItem = evt.getParameter("selectedItem");
				if (oSelectedItem) {
					var productInput = this.byId(this.inputId),
						sDescription = oSelectedItem.getInfo(),
						sTitle = oSelectedItem.getTitle();
					productInput.setSelectedKey(sDescription);
					productInput.setValue(sTitle);

				}
				evt.getSource().getBinding("items").filter([]);
			}
			/*Company SEarch end*/

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.vSimpleApp.view.view.POITemDetails
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.vSimpleApp.view.view.POITemDetails
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.vSimpleApp.view.view.POITemDetails
		 */
		//	onExit: function() {
		//
		//	}

	});

});