sap.ui.define([
	"com/vSimpleApp/model/BaseObject",
	"sap/m/MessageToast",
	"com/vSimpleApp/model/RebateConditionItemPO",
	"com/vSimpleApp/model/PoSchedule",
	"com/vSimpleApp/model/PoCondition",
	"com/vSimpleApp/service/dateServices"

], function(BaseObject,  MessageToast, RebateConditionItemPO, PoSchedule, PoCondition, dateServices) {
	"use strict";
	var PurchaseHeader = BaseObject.extend("com.vSimpleApp.model.PurchaseHeader", {
		constructor: function(oData) {
				BaseObject.call(this);

			this.setData(oData);
		},

		setData: function(oData) {
			//	this.PostingPeriod = (oData && oData.PostingPeriod) ? this.DateService.format(new Date(oData.PostingPeriod), "dd/MM/yyyy") : this.DateService.format(new Date(), "dd/MM/yyyy");

			this.Purchaseorder = (oData && oData.Purchaseorder) ? oData.Purchaseorder : "";
			this.PoNumber = (oData && oData.PoNumber) ? oData.PoNumber : "";
			this.CompCode = (oData && oData.CompCode) ? oData.CompCode : "";
			this.DocType = (oData && oData.DocType) ? oData.DocType : "";
			this.NoDisct = (oData && oData.NoDisct) ? oData.NoDisct : "";
			this.DeleteInd = (oData && oData.DeleteInd) ? oData.DeleteInd : "";

			this.Status = (oData && oData.Status) ? oData.Status : "";
			this.CreatDate = (oData && oData.CreatDate) ? this.datatime(new Date(oData.CreatDate)) : this.datatime(new Date());
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
			//	this.ExchRate = (oData && oData.ExchRate) ? oData.ExchRate : "";
			this.ExRateFx = (oData && oData.ExRateFx) ? oData.ExRateFx : "";
			this.DocDate = (oData && oData.DocDate) ? this.datatime(new Date(oData.DocDate)) : this.datatime(new Date());
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

		},
		getRequestPayloadPO: function() {
	
			var PoitemSet = [];
			var PoScheduleSet = [];
			var PoCondSet = [];

			this.PoitemSet.forEach(function(item) {
				PoitemSet.push(item.getRequestPayloadPO());

			});
			this.PoScheduleSet.forEach(function(item2) {
				PoScheduleSet.push(item2);

			});
			this.PoCondSet.forEach(function(item3) {
				PoCondSet.push(item3);

			});
			return {
				Purchaseorder: this.Purchaseorder,
				PoNumber: this.PoNumber,
				CompCode: this.CompCode,
				DocType: this.DocType,
				DeleteInd: this.DeleteInd,
				Status: this.Status,
				CreatDate: this.CreatDate,
				CreatedBy: this.CreatedBy,
				ItemIntvl: this.ItemIntvl,
				Vendor: this.Vendor,
				Langu: "E",
				LanguIso: "EN",
				Pmnttrms: this.Pmnttrms,
				//	Dscnt1To: this.Dscnt1To,
				//	Dscnt2To: this.Dscnt2To,
				//	Dscnt3To: this.Dscnt3To,
				//	DsctPct1: this.DsctPct1,
				//	DsctPct2: this.DsctPct2,
				PurchOrg: this.PurchOrg,
				PurGroup: this.PurGroup,
				Currency: this.Currency,
				CurrencyIso: this.Currency,
				//		ExchRate: this.ExchRate,
				ExRateFx: this.ExRateFx,
				DocDate: this.DocDate,
				//	VperStart: this.VperStart,
				//	VperEnd: this.VperEnd,
				//	Warranty: this.Warranty,
				Quotation: this.Quotation,
				//		QuotDate: this.QuotDate,
				Ref1: this.Ref1,
				SalesPers: this.SalesPers,
				Telephone: this.Telephone,
				SupplVend: this.SupplVend,
				Customer: this.Customer,
				Agreement: this.Agreement,
				GrMessage: this.GrMessage,
				SupplPlnt: this.SupplPlnt,
				Incoterms1: this.Incoterms1,
				Incoterms2: this.Incoterms2,
				CollectNo: this.CollectNo,
				DiffInv: this.DiffInv,
				OurRef: this.OurRef,
				Logsystem: this.Logsystem,
				Subitemint: this.Subitemint,
				PoRelInd: this.PoRelInd,
				RelStatus: this.RelStatus,
				VatCntry: this.VatCntry,
				VatCntryIso: this.VatCntryIso,
				ReasonCancel: this.ReasonCancel,
				ReasonCode: this.ReasonCode,
				RetentionType: this.RetentionType,
				RetentionPercentage: "0.00",
				DownpayType: this.DownpayType,
				//	DownpayAmount: this.DownpayAmount,
				//	DownpayPercent: this.DownpayPercent,
				//	DownpayDuedate: this.DownpayDuedate,

				Memory: this.Memory,
				Memorytype: this.Memorytype,
				Shiptype: this.Shiptype,
				Handoverloc: this.Handoverloc,
				Shipcond: this.Shipcond,
				PoScheduleSet: PoScheduleSet,
				PoCondSet: PoCondSet,
				PoitemSet: PoitemSet

			};

		},

		getRequestPayload: function() {
			var PoitemSet = [];
			this.PoitemSet.forEach(function(item) {
				var sPo = new RebateConditionItemPO(item);
					PoitemSet.push(sPo.getRequestPayloadPO());
			//	PoitemSet.push(item);

			});
			var PoScheduleSet = [];
			this.PoScheduleSet.forEach(function(item2) {
				PoScheduleSet.push(item2);

			});
			var PoCondSet = [];
			this.PoCondSet.forEach(function(item3) {
				PoCondSet.push(item3);

			});

			return {

				Purchaseorder: this.Purchaseorder,
				PoNumber: this.PoNumber,
				CompCode: this.CompCode,
				DocType: this.DocType,
				DeleteInd: this.DeleteInd,
				Status: this.Status,
				CreatDate: this.CreatDate,
				CreatedBy: this.CreatedBy,
				ItemIntvl: this.ItemIntvl,
				Vendor: this.Vendor,
				Langu: this.Langu,
				LanguIso: this.LanguIso,
				Pmnttrms: this.Pmnttrms,
				Dscnt1To: this.Dscnt1To,
				Dscnt2To: this.Dscnt2To,
				Dscnt3To: this.Dscnt3To,
				DsctPct1: this.DsctPct1,
				DsctPct2: this.DsctPct2,
				PurchOrg: this.PurchOrg,
				PurGroup: this.PurGroup,
				Currency: this.Currency,
				CurrencyIso: this.CurrencyIso,
				//		ExchRate: this.ExchRate,
				ExRateFx: this.ExRateFx,
				DocDate: this.DocDate,
				//	VperStart: this.VperStart,
				//	VperEnd: this.VperEnd,
				//	Warranty: this.Warranty,
				Quotation: this.Quotation,
				//		QuotDate: this.QuotDate,
				Ref1: this.Ref1,
				SalesPers: this.SalesPers,
				Telephone: this.Telephone,
				SupplVend: this.SupplVend,
				Customer: this.Customer,
				Agreement: this.Agreement,
				GrMessage: this.GrMessage,
				SupplPlnt: this.SupplPlnt,
				Incoterms1: this.Incoterms1,
				Incoterms2: this.Incoterms2,
				CollectNo: this.CollectNo,
				DiffInv: this.DiffInv,
				OurRef: this.OurRef,
				Logsystem: this.Logsystem,
				Subitemint: this.Subitemint,
				PoRelInd: this.PoRelInd,
				RelStatus: this.RelStatus,
				VatCntry: this.VatCntry,
				VatCntryIso: this.VatCntryIso,
				ReasonCancel: this.ReasonCancel,
				ReasonCode: this.ReasonCode,
				RetentionType: this.RetentionType,
				RetentionPercentage: this.RetentionPercentage,
				DownpayType: this.DownpayType,
				DownpayAmount: this.DownpayAmount,
				DownpayPercent: this.DownpayPercent,
				//	DownpayDuedate: this.DownpayDuedate,
				Memory: this.Memory,
				Memorytype: this.Memorytype,
				Shiptype: this.Shiptype,
				Handoverloc: this.Handoverloc,
				Shipcond: this.Shipcond,
				PoScheduleSet: PoScheduleSet,
				PoCondSet: PoCondSet,
				PoitemSet: PoitemSet

			};

		},

		validateVendor: function(Vendor) {
			var zero = "";
			//	var no;
			//increase the vendor length
			var len = Vendor.length;
			if (len !== undefined) {
				var z = 10 - len;
				for (var i = 0; i < z; i++) {
					zero += "0";
				}
			}

			console.log(len);
			console.log(zero);
			Vendor = zero + Vendor;
			console.log(Vendor);
		},
		datatime: function(dDate) {
			var s_doc_datePost = dDate;
			var Datepoststring = s_doc_datePost.toISOString();
			Datepoststring = Datepoststring.slice(0, -5);
			return Datepoststring;
		},
		format: function(dDate, sFormat) {
			sFormat = sFormat.replace(/D/g, "d");
			var oDateFormat = sap.ui.core.format.DateFormat.getInstance({
				pattern: sFormat,
				calendarType: sap.ui.core.CalendarType.Gregorian
			});
			return oDateFormat.format(dDate);
		},
		formatStringDate: function(sDate, sFormat) {
			if (!sDate) {
				return "";
			}
			var dDate = new Date(sDate.substring(0, 4) + "/" + sDate.substring(4, 6) + "/" + sDate.substring(6, 8));
			if (sFormat && sFormat !== "") {
				return this.format(dDate, sFormat);
			} else {
				return dDate;
			}
		},
		formatAmount: function(sValue) {
			if (sValue !== "") {

				var fValue = parseFloat(sValue);
				return fValue.toFixed(2);
			} else {
				return "";
			}
		},

		getModel: function() {
			return this.model;
		}
	});
	return PurchaseHeader;
});