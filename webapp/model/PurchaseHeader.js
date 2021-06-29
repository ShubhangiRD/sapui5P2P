sap.ui.define([
	"com/vSimpleApp/model/BaseObject",
	"sap/m/MessageToast",
	"com/vSimpleApp/model/PODetail"

], function(BaseObject, Application, MessageToast,PODetail) {
	"use strict";
	var PurchaseHeader = BaseObject.extend("com.vSimpleApp.model.PurchaseHeader", {
		constructor: function(oData) {
		//	BaseObject.call(this);
			this.setData(oData);
		},

		setData: function(oData) {
			this.Purchaseorder = (oData && oData.Purchaseorder) ? oData.Purchaseorder : "";
			this.PoNumber = (oData && oData.PoNumber) ? oData.PoNumber : "";
			this.CompCode = (oData && oData.CompCode) ? oData.CompCode : "";
			this.DocType = (oData && oData.DocType) ? oData.DocType : "";
			this.NoDisct = (oData && oData.NoDisct) ? oData.NoDisct : "";
			this.Status = (oData && oData.Status) ? oData.Status : "";
			this.CreatDate = (oData && oData.CreatDate) ? oData.CreatDate : "";
			this.CreatedBy = (oData && oData.CreatedBy) ? oData.CreatedBy : "";
			this.ItemIntvl = (oData && oData.ItemIntvl) ? oData.ItemIntvl : "";
			this.Vendor = (oData && oData.Vendor) ? oData.Vendor : "";
			this.Langu = (oData && oData.Langu) ? oData.Langu : "";
			this.LanguIso = (oData && oData.LanguIso) ? oData.LanguIso : "";
			this.Pmnttrms = (oData && oData.Pmnttrms) ? oData.Pmnttrms : "";
			this.Dscnt1To = (oData && oData.Dscnt1To) ? oData.Dscnt1To : "";
			this.Dscnt2To = (oData && oData.Dscnt2To) ? oData.Dscnt2To : "";
			this.Dscnt3To = (oData && oData.Dscnt3To) ? oData.Dscnt3To : "";
			this.DsctPct1 = (oData && oData.DsctPct1) ? oData.DsctPct1 : "";
			this.DsctPct2 = (oData && oData.DsctPct2) ? oData.DsctPct2 : "";
			this.PurchOrg = (oData && oData.PurchOrg) ? oData.PurchOrg : "";
			this.PurGroup = (oData && oData.PurGroup) ? oData.PurGroup : "";
			this.Currency = (oData && oData.Currency) ? oData.Currency : "";
			this.CurrencyIso = (oData && oData.CurrencyIso) ? oData.CurrencyIso : "";
			this.ExchRate = (oData && oData.ExchRate) ? oData.ExchRate : "";
			this.ExRateFx = (oData && oData.ExRateFx) ? oData.ExRateFx : "";
			this.DocDate = (oData && oData.DocDate) ? oData.DocDate : "";
			this.VperStart = (oData && oData.VperStart) ? oData.VperStart : "";
			this.VperEnd = (oData && oData.VperEnd) ? oData.VperEnd : "";
			this.Warranty = (oData && oData.Warranty) ? oData.Warranty : "";
			this.Quotation = (oData && oData.Quotation) ? oData.Quotation : "";
			this.QuotDate = (oData && oData.QuotDate) ? oData.QuotDate : "";
			this.Ref1 = (oData && oData.Ref1) ? oData.Ref1 : "";
			this.SalesPers = (oData && oData.SalesPers) ? oData.SalesPers : "";
			this.Telephone = (oData && oData.Telephone) ? oData.Telephone : "";
			this.SupplVend = (oData && oData.SupplVend) ? oData.SupplVend : "";
			this.Customer = (oData && oData.Customer) ? oData.Customer : "";
			this.Agreement = (oData && oData.Agreement) ? oData.Agreement : "";
			this.GrMessage = (oData && oData.GrMessage) ? oData.GrMessage : "";
			this.SupplPlnt = (oData && oData.SupplPlnt) ? oData.SupplPlnt : "";
			this.Incoterms1 = (oData && oData.Incoterms1) ? oData.Incoterms1 : "";
			this.Incoterms2 = (oData && oData.Incoterms2) ? oData.Incoterms2 : "";
			this.CollectNo = (oData && oData.CollectNo) ? oData.CollectNo : "";
			this.DiffInv = (oData && oData.DiffInv) ? oData.DiffInv : "";
			this.OurRef = (oData && oData.OurRef) ? oData.OurRef : "";
			this.Logsystem = (oData && oData.Logsystem) ? oData.Logsystem : "";
			this.Subitemint = (oData && oData.Subitemint) ? oData.Subitemint : "";
			this.PoRelInd = (oData && oData.PoRelInd) ? oData.PoRelInd : "";
			this.RelStatus = (oData && oData.RelStatus) ? oData.RelStatus : "";
			this.VatCntry = (oData && oData.VatCntry) ? oData.VatCntry : "";
			this.VatCntryIso = (oData && oData.VatCntryIso) ? oData.VatCntryIso : "";
			this.ReasonCancel = (oData && oData.ReasonCancel) ? oData.ReasonCancel : "";
			this.ReasonCode = (oData && oData.ReasonCode) ? oData.ReasonCode : "";
			this.RetentionType = (oData && oData.RetentionType) ? oData.RetentionType : "";
			this.RetentionPercentage = (oData && oData.RetentionPercentage) ? oData.RetentionPercentage : "";
			this.DownpayType = (oData && oData.DownpayType) ? oData.DownpayType : "";
			this.DownpayAmount = (oData && oData.DownpayAmount) ? oData.DownpayAmount : "";
			this.DownpayPercent = (oData && oData.DownpayPercent) ? oData.DownpayPercent : "";
			this.DownpayDuedate = (oData && oData.DownpayDuedate) ? oData.DownpayDuedate : "";
			this.Memory = (oData && oData.Memory) ? oData.Memory : "";
			this.Memorytype = (oData && oData.Memorytype) ? oData.Memorytype : "";
			this.Shiptype = (oData && oData.Shiptype) ? oData.Shiptype : "";
			this.Handoverloc = (oData && oData.Handoverloc) ? oData.Handoverloc : "";
			this.Shipcond = (oData && oData.Shipcond) ? oData.Shipcond : "";
		this.PoitemSet = (oData && oData.PoitemSet) ? oData.PoitemSet : [];
		this.PoCondSet = (oData && oData.PoCondSet) ? oData.PoCondSet : [];
		this.PoScheduleSet = (oData && oData.PoScheduleSet) ? oData.PoScheduleSet : [];
	//	this.PoitemSet = (oData && oData.PoitemSet) ? oData.PoitemSet : new PODetail();
		
		

		},
		getUpdateRequestPayload: function() {

		},
		getCreateRequestPayload: function() {

		},

		getRequestPayload: function(isCreate) {

		},
		getModel: function() {
			return this.model;
		}
	});
	return PurchaseHeader;
});