sap.ui.define([
	"com/vSimpleApp/model/BaseObject",

	"com/vSimpleApp/service/Application"
], function(BaseObject, Application) {
	"use strict";
	var GRDisplay = BaseObject.extend("com.vSimpleApp.model.GRDisplay", {
		constructor: function(oData) {
			BaseObject.call(this);

			this.setData(oData);
		},

		setData: function(oData) {
		
			this.MatDoc = (oData && oData.MatDoc) ? oData.MatDoc : "";
			this.DocYear = (oData && oData.DocYear) ? oData.DocYear : "";
			this.MatdocItm = (oData && oData.MatdocItm) ? oData.MatdocItm : "";
			this.Material = (oData && oData.Material) ? oData.Material : "";
			this.Plant = (oData && oData.Plant) ? oData.Plant : "";
			this.StgeLoc = (oData && oData.StgeLoc) ? oData.StgeLoc : "";
			this.Batch = (oData && oData.Batch) ? oData.Batch : "";
			this.MoveType = (oData && oData.MoveType) ? oData.MoveType : "";
			this.StckType = (oData && oData.StckType) ? oData.StckType : "";
			this.SpecStock = (oData && oData.SpecStock) ? oData.SpecStock : "";
			this.Vendor = (oData && oData.Vendor) ? oData.Vendor : "";
			this.Customer = (oData && oData.Customer) ? oData.Customer : "";
			this.SalesOrd = (oData && oData.SalesOrd) ? oData.SalesOrd : "";
			this.SOrdItem = (oData && oData.SOrdItem) ? oData.SOrdItem : "";
			this.SchedLine = (oData && oData.SchedLine) ? oData.SchedLine : "";
			this.ValType = (oData && oData.ValType) ? oData.ValType : "";
			this.EntryQnt = (oData && oData.EntryQnt) ? oData.EntryQnt : "";
			this.EntryUom = (oData && oData.EntryUom) ? oData.EntryUom : "";
			this.EntryUomIso = (oData && oData.EntryUomIso) ? oData.EntryUomIso : "";
			this.PoPrQnt = (oData && oData.PoPrQnt) ? oData.PoPrQnt : "";
			this.OrderprUn = (oData && oData.OrderprUn) ? oData.OrderprUn : "";
			this.OrderprUnIso = (oData && oData.OrderprUnIso) ? oData.OrderprUnIso : "";
			this.PoNumber = (oData && oData.PoNumber) ? oData.PoNumber : "";
			this.PoItem = (oData && oData.PoItem) ? oData.PoItem : "";
			this.Shipping = (oData && oData.Shipping) ? oData.Shipping : "";
			this.CompShip = (oData && oData.CompShip) ? oData.CompShip : "";
			this.NoMoreGr = (oData && oData.NoMoreGr) ? oData.NoMoreGr : "";
			this.ItemText = (oData && oData.ItemText) ? oData.ItemText : "";
			this.GrRcpt = (oData && oData.GrRcpt) ? oData.GrRcpt : "";
			this.UnloadPt = (oData && oData.UnloadPt) ? oData.UnloadPt : "";
			this.Costcenter = (oData && oData.Costcenter) ? oData.Costcenter : "";
			this.Orderid = (oData && oData.Orderid) ? oData.Orderid : "";
			this.OrderItno = (oData && oData.OrderItno) ? oData.OrderItno : "";
			this.CalcMotive = (oData && oData.CalcMotive) ? oData.CalcMotive : "";
			this.AssetNo = (oData && oData.AssetNo) ? oData.AssetNo : "";
			this.SubNumber = (oData && oData.SubNumber) ? oData.SubNumber : "";
			this.ReservNo = (oData && oData.ReservNo) ? oData.ReservNo : "";
			this.ResItem = (oData && oData.ResItem) ? oData.ResItem : "";
			this.ResType = (oData && oData.ResType) ? oData.ResType : "";
			this.Withdrawn = (oData && oData.Withdrawn) ? oData.Withdrawn : "";
			this.MoveMat = (oData && oData.MoveMat) ? oData.MoveMat : "";
			this.MovePlant = (oData && oData.MovePlant) ? oData.MovePlant : "";
			this.MoveStloc = (oData && oData.MoveStloc) ? oData.MoveStloc : "";
			this.MoveBatch = (oData && oData.MoveBatch) ? oData.MoveBatch : "";
			this.MoveValType = (oData && oData.MoveValType) ? oData.MoveValType : "";
			this.MvtInd = (oData && oData.MvtInd) ? oData.MvtInd : "";
			this.MoveReas = (oData && oData.MoveReas) ? oData.MoveReas : "";
			this.RlEstKey = (oData && oData.RlEstKey) ? oData.RlEstKey : "";
			this.RefDate = (oData && oData.RefDate) ? oData.RefDate : "";
			this.CostObj = (oData && oData.CostObj) ? oData.CostObj : "";
			this.ProfitSegmNo = (oData && oData.ProfitSegmNo) ? oData.ProfitSegmNo : "";
			this.ProfitCtr = (oData && oData.ProfitCtr) ? oData.ProfitCtr : "";
			this.WbsElem = (oData && oData.WbsElem) ? oData.WbsElem : "";
			this.Network = (oData && oData.Network) ? oData.Network : "";
			this.Activity = (oData && oData.Activity) ? oData.Activity : "";
			this.PartAcct = (oData && oData.PartAcct) ? oData.PartAcct : "";
			this.AmountLc = (oData && oData.AmountLc) ? oData.AmountLc : "";
			this.AmountSv = (oData && oData.AmountSv) ? oData.AmountSv : "";
			this.Currency = (oData && oData.Currency) ? oData.Currency : "";
			this.CurrencyIso = (oData && oData.CurrencyIso) ? oData.CurrencyIso : "";
			this.RefDocYr = (oData && oData.RefDocYr) ? oData.RefDocYr : "";
			this.RefDoc = (oData && oData.RefDoc) ? oData.RefDoc : "";
			this.RefDocIt = (oData && oData.RefDocIt) ? oData.RefDocIt : "";
			this.Expirydate = (oData && oData.Expirydate) ? oData.Expirydate : "";
			this.ProdDate = (oData && oData.ProdDate) ? oData.ProdDate : "";
			this.Fund = (oData && oData.Fund) ? oData.Fund : "";
			this.FundsCtr = (oData && oData.FundsCtr) ? oData.FundsCtr : "";
			this.CmmtItem = (oData && oData.CmmtItem) ? oData.CmmtItem : "";
			this.ValSalesOrd = (oData && oData.ValSalesOrd) ? oData.ValSalesOrd : "";
			this.ValSOrdItem = (oData && oData.ValSOrdItem) ? oData.ValSOrdItem : "";
			this.ValWbsElem = (oData && oData.ValWbsElem) ? oData.ValWbsElem : "";
			this.CoBusproc = (oData && oData.CoBusproc) ? oData.CoBusproc : "";
			this.Acttype = (oData && oData.Acttype) ? oData.Acttype : "";
			this.SupplVend = (oData && oData.SupplVend) ? oData.SupplVend : "";
			this.XAutoCre = (oData && oData.XAutoCre) ? oData.XAutoCre : "";
			this.MaterialExternal = (oData && oData.MaterialExternal) ? oData.MaterialExternal : "";
			this.MaterialGuid = (oData && oData.MaterialGuid) ? oData.MaterialGuid : "";
			this.MaterialVersion = (oData && oData.MaterialVersion) ? oData.MaterialVersion : "";
			this.MoveMatExternal = (oData && oData.MoveMatExternal) ? oData.MoveMatExternal : "";
			this.MoveMatGuid = (oData && oData.MoveMatGuid) ? oData.MoveMatGuid : "";
			this.MoveMatVersion = (oData && oData.MoveMatVersion) ? oData.MoveMatVersion : "";
			this.GrantNbr = (oData && oData.GrantNbr) ? oData.GrantNbr : "";
			this.CmmtItemLong = (oData && oData.CmmtItemLong) ? oData.CmmtItemLong : "";
			this.FuncAreaLong = (oData && oData.FuncAreaLong) ? oData.FuncAreaLong : "";
			this.LineId = (oData && oData.LineId) ? oData.LineId : "";
			this.ParentId = (oData && oData.ParentId) ? oData.ParentId : "";
			this.LineDepth = (oData && oData.LineDepth) ? oData.LineDepth : "";
			this.BudgetPeriod = (oData && oData.BudgetPeriod) ? oData.BudgetPeriod : "";
			this.EarmarkedNumber = (oData && oData.EarmarkedNumber) ? oData.EarmarkedNumber : "";
			this.EarmarkedItem = (oData && oData.EarmarkedItem) ? oData.EarmarkedItem : "";
			this.StkSegment = (oData && oData.StkSegment) ? oData.StkSegment : "";

		},

		getRequestPayloadGR: function() {
			return {

			
			};
		}

	});
	return GRDisplay;
});