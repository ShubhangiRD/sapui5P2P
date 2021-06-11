sap.ui.define([
	"com/vSimpleApp/controller/BaseController",
	"sap/m/MessageBox",
	"sap/m/PDFViewer",
	"com/vSimpleApp/service/documentServices",
	"../Formatter"
], function (BaseController, MessageBox, PDFViewer, documentServices, Formatter) {
	"use strict";
	var oView, oController, oComponent;
	return BaseController.extend("com.vSimpleApp.controller.ReadyToPostDetails", {
		onInit: function() {
			this._pdfViewer = new PDFViewer();
			this.getView().addDependent(this._pdfViewer);
			oController = this;
			oView = this.getView();
			oComponent = this.getOwnerComponent();
			$('body').on('click', '#btnToggleTable', function() {
		       $(this).parent().toggleClass('no-filter');
		       oView.byId("collapsibleFooter").toggleStyleClass('expanded');
		    });
		    
		    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        	oRouter.getRoute("ReadyToPostDetails").attachPatternMatched(this._onObjectMatched, this);
		},
			onMenuButtonPress: function() {
		
	
			var oComponent2 = this.getOwnerComponent();
				oComponent2.getRouter().navTo("Dashboard");
		},
		_onObjectMatched: function(oEvent) {
			sap.ui.core.BusyIndicator.show(0);
			var fiReviewRecordsDataModel = oComponent.getModel("approvedDocuments");
			var oRecords = fiReviewRecordsDataModel.getData();
			var record = {};
			for(var i = 0; i < oRecords.length; i++) {
				if(oRecords[i].uniqueId === oEvent.getParameter("arguments").recordId){
					record = oRecords[i];
					break;
				}
			}
			//approval.balanceAmount = approval.Grossvalue;
			//approval.isValid = false;
			
			var oRecordlModel = new sap.ui.model.json.JSONModel(record);
			oView.setModel(oRecordlModel, "record"); 
			
			var filePath = record.filePath;
			var newFilePath = filePath.substring(filePath.lastIndexOf("/") + 1);
			var postData = JSON.stringify({
				filePath: newFilePath,
				linkId: record.documentId
			});
			
			documentServices.getInstance().getFile(this, postData, 
				function(oData) {
					//oView.byId("invoiceFileImg").setBusy(false);
				},
				function(oError) {
					if(oError.status === 200) {
						oRecordlModel.getData().file = oError.responseText;
						oRecordlModel.refresh(true);
						sap.ui.core.BusyIndicator.hide();
					}
				});
			
			documentServices.getInstance().getTaxRate(oController, record.vendorCountry, record.companyCode,
					function(oData) {
						oRecordlModel.getData().taxCode = oData.taxCode;
						oRecordlModel.getData().taxRate = oData.taxRate;
						//record.tax = documentServices.getInstance().calculateTax(record.netValue, oData.taxRate);
						//oRecordlModel.getData().tax  = (parseFloat(oRecordlModel.getData().netValue) * parseFloat(oData.taxRate)) / 100;
						oRecordlModel.refresh(true);
					});
			
		/*$.ajax("/ocrspring/getTaxRate/"+ record.VendorCountry + "/" + record.Companycode + "/", {
				success: function(data) {
					oRecordlModel.getData().taxcode = data.taxCode;
					oRecordlModel.getData().taxRate = data.taxRate;
					var tax = (parseFloat(oRecordlModel.getData().netValue) * parseFloat(data.taxRate)) / 100;
					oRecordlModel.getData().Vat = tax;
					oRecordlModel.refresh(true);
				},
				error: function(err) {
					MessageBox.error(err);
		    	}
		   });*/
		},
		onViewDocument: function (oEvent) {
			var sSource = oEvent.getSource().data("file");
			/*this._pdfViewer.setSource(sSource);
			this._pdfViewer.setTitle("Document");
			this._pdfViewer.open();*/
			var pdfWindow = window.open("", "myWindow", "width=1000, height=800");
			pdfWindow.document.write("<iframe width='100%' height='100%' src='" + sSource +"'></iframe>");
		},
		onExpandCollapsibleTable: function(oEvent) {
			try {
				//this.getView().byId("collapsibleFooter").toggleStyleClass('expanded');
			} catch (ex) {
				MessageBox.error(ex);
			}
		},
		onPost: function(oEvent) {
			try {
				MessageBox.confirm(
					"Do you confirm the posting?",
					{
						actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
						onClose: function(sAction) {
							if(sAction === "OK") {
								sap.ui.core.BusyIndicator.show(0);
								//var reviewedData = JSON.parse(JSON.stringify(oView.getModel("record").getData()));
								/*var reviewedData = oView.getModel("record").getData();
								reviewedData.UpdOcrHdrToOcrItm = reviewedData.GetOcrHdrToOcrItm;
								
								for(var i = 0; i < reviewedData.UpdOcrHdrToOcrItm.results.length; i++) {
									reviewedData.UpdOcrHdrToOcrItm.results[i].FinReviewed = "X";
									delete reviewedData.UpdOcrHdrToOcrItm.results[i].Paymentindays;
									delete reviewedData.UpdOcrHdrToOcrItm.results[i].VendorCountry;
									delete reviewedData.UpdOcrHdrToOcrItm.results[i].__metadata;
								}
								
								var postingDate = new Date(reviewedData.Postingdate);
							
								var postingMonth = "";
								if(postingDate.getMonth() < 9) {
									postingMonth = "0" + (postingDate.getMonth() + 1);
								} else {
									postingMonth = (postingDate.getMonth() + 1).toString();
								}
								
								postingDate = postingDate.getFullYear() + "-" + postingMonth + "-" + postingDate.getDate() + "T00:00:00";
								
								var documentDate = new Date(reviewedData.Invoicedate);
							
								var documentMonth = "";
								if(documentDate.getMonth() < 9) {
									documentMonth = "0" + (documentDate.getMonth() + 1);
								} else {
									documentMonth = (documentDate.getMonth() + 1).toString();
								}
								
								documentDate = documentDate.getFullYear() + "-" + documentMonth + "-" + documentDate.getDate() + "T00:00:00";
								
								var postData = {
									Servicecall: "FIN",
									PostingDate: postingDate.toJSON().split(".")[0],
									MgrComment: reviewedData.MgrComment,
									Vat: reviewedData.Vat.toString(),
									TaxCode: reviewedData.Taxcode,
									DocumentDate: documentDate.toJSON().split(".")[0],
									CalcTax: "X",
									UpdOcrHdrToOcrItm: reviewedData.UpdOcrHdrToOcrItm
								};*/
								
								var oReadyToPostModel = oView.getModel("record");
								var postData = oReadyToPostModel.getData().getSAPPostData(true);
								
								var oMainServiceModel = oComponent.getModel("mainServiceModel");
								oMainServiceModel.create("/UpdOcrHdrs", postData, {
									success: function(postResponse) {
										sap.ui.core.BusyIndicator.hide();
										postData.sapInvoice = postResponse.UpdOcrHdrToOcrItm.results[0].Sapinvoice;
										oReadyToPostModel.refresh(true);
										if(postData.sapInvoice && postData.sapInvoice !== "") {
											MessageBox.success(
												"Document no. " + postData.sapInvoice + " posted successfully",
												{
													actions: [sap.m.MessageBox.Action.OK],
													onClose: function(sAction) {
														documentServices.getInstance().getApprovedDocuments(oController);
														documentServices.getInstance().getPostedDocuments(oController);
														oController.getRouter().navTo("Dashboard");
													}
												}
											);
										} else {
											MessageBox.error("Error while posting the document");
										}
										
									},
									error: function(oError) {
										sap.ui.core.BusyIndicator.hide();
										MessageBox.error(oError);
									}
								});				
							}
						}
					});
				
			} catch (ex) {
				sap.ui.core.BusyIndicator.hide();
				MessageBox.error(ex);
			}
		}
	});
});