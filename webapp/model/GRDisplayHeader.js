sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/model/json/JSONModel"
], function(Object, JSONModel) {
	"use strict";
	return Object.extend("com.vSimpleApp.model.GRDisplayHeader", {
		constructor: function(oData) {
			if (oData) {

				this.MatDoc = (oData && oData.MatDoc) ? oData.MatDoc : "";
				this.DocYear = (oData && oData.DocYear) ? oData.DocYear : "";
				this.TrEvType = (oData && oData.TrEvType) ? oData.TrEvType : "";
				this.DocDate = (oData && oData.DocDate) ? oData.DocDate : "";
				this.PstngDate = (oData && oData.PstngDate) ? oData.PstngDate : "";
				this.EntryDate = (oData && oData.EntryDate) ? oData.EntryDate : "";
				this.EntryTime = (oData && oData.EntryTime) ? oData.EntryTime : "";
				this.Username = (oData && oData.Username) ? oData.Username : "";
				this.VerGrGiSlip = (oData && oData.VerGrGiSlip) ? oData.VerGrGiSlip : "";
				this.ExpimpNo = (oData && oData.ExpimpNo) ? oData.ExpimpNo : "";
				this.RefDocNo = (oData && oData.RefDocNo) ? oData.RefDocNo : "";
				this.HeaderTxt = (oData && oData.HeaderTxt) ? oData.HeaderTxt : "";
				this.RefDocNoLong = (oData && oData.RefDocNoLong) ? oData.RefDocNoLong : "";
				this.GrItemSet = (oData && oData.GrItemSet) ? oData.GrItemSet : [];
				this.model = new JSONModel();
				this.model.setData(this);
			}
		
		},

		getModel: function() {
			return this.model;
		}
	});
});