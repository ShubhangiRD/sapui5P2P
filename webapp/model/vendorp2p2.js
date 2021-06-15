sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/model/json/JSONModel"
], function(Object, JSONModel) {
	"use strict";
	return Object.extend("com.vSimpleApp.model.VendorMaster", {
		constructor: function(oData) {

			this.CreationProfile = (oData && oData.Abuebc) ? oData.Abuebc : "";
			this.SocInsCode = (oData && oData.Actssa) ? oData.Actssa : "";
			this.Address = (oData && oData.Adrnra) ? oData.Adrnra : "";
			this.Agencybusiness = (oData && oData.Agrelc) ? oData.Agrelc : "";
			this.Reconaccount = (oData && oData.Akontb) ? oData.Akontb : "";
			this.Prevacctno = (oData && oData.Altknb) ? oData.Altknb : "";
			this.Title = (oData && oData.Anreda) ? oData.Anreda : "";
			this.PmtAdvXML = (oData && oData.Avsndb) ? oData.Avsndb : "";
			this.Trainstation = (oData && oData.Bahnsa) ? oData.Bahnsa : "";
			this.BankKey = (oData && oData.Bankld) ? oData.Bankld : "";
			this.BankAccount = (oData && oData.Banknd) ? oData.Banknd : "";
			this.BankCountry = (oData && oData.Banksd) ? oData.Banksd : "";

			this.Locationno1 = (oData && oData.Bbbnra) ? oData.Bbbnra : "";
			this.Locationno2 = (oData && oData.Bbsnra) ? oData.Bbsnra : "";
			this.Authorization = (oData && oData.Begrua) ? oData.Begrua : "";
			this.Authorization = (oData && oData.Begrub) ? oData.Begrub : "";
			this.Controlkey = (oData && oData.Bkontd) ? oData.Bkontd : "";
			this.Reference = (oData && oData.Bkrefd) ? oData.Bkrefd : "";
			this.DocumentIndex = (oData && oData.Blindc) ? oData.Blindc : "";
			this.Subsind = (oData && oData.Blnkzb) ? oData.Blnkzb : "";
			this.SSindexactive = (oData && oData.Boindc) ? oData.Boindc : "";
			this.Subseqsett = (oData && oData.Bolrec) ? oData.Bolrec : "";
			this.LBprofile = (oData && oData.Bopnrc) ? oData.Bopnrc : "";
			this.Industry = (oData && oData.Brscha) ? oData.Brscha : "";
			this.ConfControl = (oData && oData.Bstaec) ? oData.Bstaec : "";
			this.Checkdigit = (oData && oData.Bubkza) ? oData.Bubkza : "";
			this.CompanyCode = (oData && oData.Bukrsb) ? oData.Bukrsb : "";
			this.Acctgclerk = (oData && oData.Busabb) ? oData.Busabb : "";
			this.PartBankType = (oData && oData.Bvtypd) ? oData.Bvtypd : "";

			this.CertifictnDate = (oData && oData.Cerdtb) ? oData.Cerdtb : "";
			this.Confirmstatus = (oData && oData.Confsa) ? oData.Confsa : "";
			this.ConfirmStCCd = (oData && oData.Confsb) ? oData.Confsb : "";
			this.Dataline = (oData && oData.Datlta) ? oData.Datlta : "";
			this.Lastintcalc = (oData && oData.Datlzb) ? oData.Datlzb : "";
			this.ServAgntProcGrp = (oData && oData.Dlgrpa) ? oData.Dlgrpa : "";
			this.DMEIndicator = (oData && oData.Dtamsa) ? oData.Dtamsa : "";
			this.Instructionkey = (oData && oData.Dtawsa) ? oData.Dtawsa : "";
			this.DataTransferStatus = (oData && oData.Duefla) ? oData.Duefla : "";

			this.Acctwvendor = (oData && oData.Eiktob) ? oData.Eiktob : "";
			this.Accwvendor = (oData && oData.Eiktoc) ? oData.Eiktoc : "";
			this.PurchGroup = (oData && oData.Ekgrpc) ? oData.Ekgrpc : "";
			this.PurchasingOrg = (oData && oData.Ekorgc) ? oData.Ekorgc : "";
			this.Externalmanuf = (oData && oData.Emnfra) ? oData.Emnfra : "";
			this.Createdon = (oData && oData.Erdata) ? oData.Erdata : "";
			this.Createdon = (oData && oData.Erdatb) ? oData.Erdatb : "";
			this.Createdon = (oData && oData.Erdatc) ? oData.Erdatc : "";
			this.Createdby = (oData && oData.Ernama) ? oData.Ernama : "";
			this.Createdby = (oData && oData.Ernamb) ? oData.Ernamb : "";
			this.Createdby = (oData && oData.Ernamc) ? oData.Ernamc : "";
			this.ISRNumber = (oData && oData.Esrnra) ? oData.Esrnra : "";
			this.ModeOfTr - Border = (oData && oData.Expvzc) ? oData.Expvzc : "";

			this.Planninggroup = (oData && oData.Fdgrvb) ? oData.Fdgrvb : "";
			this.Fiscaladdress = (oData && oData.Fiskna) ? oData.Fiskna : "";
			this.Taxoffice = (oData && oData.Fiskua) ? oData.Fiskua : "";
			this.Taxtype = (oData && oData.Fitypa) ? oData.Fitypa : "";
			this.Releasegroup = (oData && oData.Frgrpb) ? oData.Frgrpb : "";

			this.Dateofbirth = (oData && oData.Gbdata) ? oData.Gbdata : "";
			this.Placeofbirth = (oData && oData.Gborta) ? oData.Gborta : "";
			this.ActivityCode = (oData && oData.Gricdb) ? oData.Gricdb : "";
			this.DistrType = (oData && oData.Gridtb) ? oData.Gridtb : "";
			this.Crmemoterms = (oData && oData.Guzteb) ? oData.Guzteb : "";
			this.HouseBank = (oData && oData.Hbkidb) ? oData.Hbkidb : "";

			this.Incoterms = (oData && oData.Inco1c) ? oData.Inco1c : "";
			this.Incoterms2 = (oData && oData.Inco2c) ? oData.Inco2c : "";
			this.Clrksinternet = (oData && oData.Intadb) ? oData.Intadb : "";
			this.Taxsplit = (oData && oData.Ipispa) ? oData.Ipispa : "";
			this.SchemaGrpVndr = (oData && oData.Kalskc) ? oData.Kalskc : "";
			this.Accountholder = (oData && oData.Koinhd) ? oData.Koinhd : "";
			this.CorporateGroup = (oData && oData.Konzsa) ? oData.Konzsa : "";
			this.Credinfono = (oData && oData.Krausa) ? oData.Krausa : "";
			this.Refacctgroup = (oData && oData.Ktocka) ? oData.Ktocka : "";
			this.Accountgroup = (oData && oData.Ktokka) ? oData.Ktokka : "";
			this.Chkcashngtime = (oData && oData.Kultgb) ? oData.Kultgb : "";
			this.Customer = (oData && oData.Kunnra) ? oData.Kunnra : "";
			this.Accountmemo = (oData && oData.Kvermb) ? oData.Kvermb : "";
			this.AcknowlReqd = (oData && oData.Kzabsc) ? oData.Kzabsc : "";
			this.AutomaticPO = (oData && oData.Kzautc) ? oData.Kzautc : "";
			this.Returnsvendor = (oData && oData.Kzretc) ? oData.Kzretc : "";

			this.Country = (oData && oData.Land1a) ? oData.Land1a : "";
			this.Srv - BasedInvVer = (oData && oData.Lebrec) ? oData.Lebrec : "";
			this.ABCindicator = (oData && oData.Lfabcc) ? oData.Lfabcc : "";
			this.Planningcycle = (oData && oData.Lfrhyc) ? oData.Lfrhyc : "";
			this.URL = (oData && oData.Lfurla) ? oData.Lfurla : "";
			this.POentryvend = (oData && oData.Libesc) ? oData.Libesc : "";
			this.Vendor = (oData && oData.Lifnra) ? oData.Lifnra : "";
			this.Pricemkgvnd = (oData && oData.Liprec) ? oData.Liprec : "";
			this.Rackjobbing = (oData && oData.Liserc) ? oData.Liserc : "";
			this.Alternatpayee = (oData && oData.Lnrzaa) ? oData.Lnrzaa : "";
			this.Alternatpayee = (oData && oData.Lnrzbb) ? oData.Lnrzbb : "";
			this.Headoffice = (oData && oData.Lnrzeb) ? oData.Lnrzeb : "";
			this.Deletionflag = (oData && oData.Loevma) ? oData.Loevma : "";
			this.Cocdedeletionflag = (oData && oData.Loevmb) ? oData.Loevmb : "";
			this.DelflagPOrg = (oData && oData.Loevmc) ? oData.Loevmc : "";
			this.VSRrelevant = (oData && oData.Ltsnaa) ? oData.Ltsnaa : "";
			this.Transportzone = (oData && oData.Lzonea) ? oData.Lzonea : "";

			this.Name = (oData && oData.Mcod1a) ? oData.Mcod1a : "";
			this.Name2 = (oData && oData.Mcod2a) ? oData.Mcod2a : "";
			this.City = (oData && oData.Mcod3a) ? oData.Mcod3a : "";
			this.UoMGroup = (oData && oData.Megruc) ? oData.Megruc : "";
			this.PrDateCat = (oData && oData.Meprfc) ? oData.Meprfc : "";
			this.Groupingkey = (oData && oData.Mgrupb) ? oData.Mgrupb : "";
			this.Minimumvalue = (oData && oData.Minbwc) ? oData.Minbwc : "";
			this.Minorityindic = (oData && oData.Mindkb) ? oData.Mindkb : "";
			this.Planningcal = (oData && oData.Mrpppc) ? oData.Mrpppc : "";
			this.Name = (oData && oData.Name1a) ? oData.Name1a : "";
			this.Name2 = (oData && oData.Name2a) ? oData.Name2a : "";
			this.Name3 = (oData && oData.Name3a) ? oData.Name3a : "";
			this.Name4 = (oData && oData.Name4a) ? oData.Name4a : "";
			this.Deletionblock = (oData && oData.Nodela) ? oData.Nodela : "";
			this.CoCddelblock = (oData && oData.Nodelb) ? oData.Nodelb : "";
			this.QualiffDKd = (oData && oData.Nrgewc) ? oData.Nrgewc : "";

			this.City = (oData && oData.Ort01a) ? oData.Ort01a : "";
			this.District = (oData && oData.Ort02a) ? oData.Ort02a : "";
			this.PROACTcontrolprof = (oData && oData.Paprfc) ? oData.Paprfc : "";
			this.PersonnelNo = (oData && oData.Pernrb) ? oData.Pernrb : "";
			this.PO Box = (oData && oData.Pfacha) ? oData.Pfacha : "";
			this.POBoxcity = (oData && oData.Pforta) ? oData.Pforta : "";
			this.PlDelivTime = (oData && oData.Plifzc) ? oData.Plifzc : "";
			this.Factorycalend = (oData && oData.Plkala) ? oData.Plkala : "";
			this.Pricedetermin = (oData && oData.Prfrec) ? oData.Prfrec : "";
			this.Profession = (oData && oData.Profsa) ? oData.Profsa : "";
			this.POBoxPCode = (oData && oData.Pstl2a) ? oData.Pstl2a : "";
			this.PostalCode = (oData && oData.Pstlza) ? oData.Pstlza : "";
			this.Country = (oData && oData.Qlandb) ? oData.Qlandb : "";
			this.Exmptauthority = (oData && oData.Qsbgrb) ? oData.Qsbgrb : "";
			this.Recipienttype = (oData && oData.Qsrecb) ? oData.Qsrecb : "";
			this.WTaxCode = (oData && oData.Qsskzb) ? oData.Qsskzb : "";
			this.ActualQMsys = (oData && oData.Qssysa) ? oData.Qssysa : "";
			this.Validuntil = (oData && oData.Qszdtb) ? oData.Qszdtb : "";
			this.Exemptionno = (oData && oData.Qsznrb) ? oData.Qsznrb : "";

			this.RndingProfile = (oData && oData.Rdprfc) ? oData.Rdprfc : "";
			this.region = (oData && oData.Regioa) ? oData.Regioa : "";
			this.SocialIns = (oData && oData.Regssa) ? oData.Regssa : "";
			this.Chkdoubleinv = (oData && oData.Reprfb) ? oData.Reprfb : "";
			this.Lastextreview = (oData && oData.Revdba) ? oData.Revdba : "";
			this.SCAC = (oData && oData.Scacda) ? oData.Scacda : "";
			this.Sex = (oData && oData.Sexkza) ? oData.Sexkza : "";
			this.Carfreightgrp = (oData && oData.Sfrgra) ? oData.Sfrgra : "";
			this.Sortcriterion = (oData && oData.Skritc) ? oData.Skritc : "";
			//-------------------
			this.Searchterm = (oData && oData.Sortla) ? oData.Sortla : "";
			this.Purchblock = (oData && oData.Sperma) ? oData.Sperma : "";
			this.PurblockPOrg = (oData && oData.Spermc) ? oData.Spermc : "";
			this.Blockfunction = (oData && oData.Sperqa) ? oData.Sperqa : "";
			this.PostingBlock = (oData && oData.Sperra) ? oData.Sperra : "";
			this.Cocodepostblock = (oData && oData.Sperrb) ? oData.Sperrb : "";
			this.Paymentblock = (oData && oData.Sperza) ? oData.Sperza : "";
			this.Language = (oData && oData.Sprasa) ? oData.Sprasa : "";
			this.TaxNumber1 = (oData && oData.Stcd1a) ? oData.Stcd1a : "";
			this.TaxNumber2 = (oData && oData.Stcd2a) ? oData.Stcd2a : "";
			this.TaxNumber3 = (oData && oData.Stcd3a) ? oData.Stcd3a : "";
			this.TaxNumber4 = (oData && oData.Stcd4a) ? oData.Stcd4a : "";

			this.TaxNumber5 = (oData && oData.Stcd5a) ? oData.Stcd5a : "";
			this.Taxnumbertype = (oData && oData.Stcdta) ? oData.Stcdta : "";
			this.VATRegNo = (oData && oData.Stcega) ? oData.Stcega : "";
			this.TaxNumber = (oData && oData.Stenra) ? oData.Stenra : "";
			this.Statgrpagent = (oData && oData.Stgdla) ? oData.Stgdla : "";
			this.Equalizatntax = (oData && oData.Stkzaa) ? oData.Stkzaa : "";
			this.Naturalperson = (oData && oData.Stkzna) ? oData.Stkzna : "";
			this.LiableforVAT = (oData && oData.Stkzua) ? oData.Stkzua : "";
			this.Street = (oData && oData.Strasa) ? oData.Strasa : "";

			this.Taxbase = (oData && oData.Taxbsa) ? oData.Taxbsa : "";
			this.Telebox = (oData && oData.Telbxa) ? oData.Telbxa : "";
			this.Telephone1 = (oData && oData.Telf1a) ? oData.Telf1a : "";
			this.Telephone = (oData && oData.Telf1c) ? oData.Telf1c : "";
			this.Telephone2 = (oData && oData.Telf2a) ? oData.Telf2a : "";
			this.FaxNumber = (oData && oData.Telfxa) ? oData.Telfxa : "";
			this.Teletex = (oData && oData.Teltxa) ? oData.Teltxa : "";
			this.Telex = (oData && oData.Telx1a) ? oData.Telx1a : "";
			this.Actclktelno = (oData && oData.Tlfnsb) ? oData.Tlfnsb : "";
			this.Clerksfax = (oData && oData.Tlfxsb) ? oData.Tlfxsb : "";
			this.Tolerancegrp = (oData && oData.Togrrb) ? oData.Togrrb : "";
			this.Tolerancegroup = (oData && oData.Togrub) ? oData.Togrub : "";
			this.TaxJur = (oData && oData.Txjcda) ? oData.Txjcda : "";

			this.Bvolcompag = (oData && oData.Umsaec) ? oData.Umsaec : "";
			this.Confirmdate = (oData && oData.Updata) ? oData.Updata : "";
			this.Confirmdate = (oData && oData.Updatb) ? oData.Updatb : "";
			this.Confirmtime = (oData && oData.Uptima) ? oData.Uptima : "";
			this.Confirmtime = (oData && oData.Uptimb) ? oData.Uptimb : "";
			this.Pmtmethsupl = (oData && oData.Uzaweb) ? oData.Uzaweb : "";
			this.TradingPartner = (oData && oData.Vbunda) ? oData.Vbunda : "";
			this.VenServLevl = (oData && oData.Venslc) ? oData.Venslc : "";
			this.Salesperson = (oData && oData.Verkfc) ? oData.Verkfc : "";
			this.ShippingCond = (oData && oData.Vsbedc) ? oData.Vsbedc : "";
			this.Interestindic. = (oData && oData.Vzskzb) ? oData.Vzskzb : "";

			this.Ordercurrency = (oData && oData.Waersc) ? oData.Waersc : "";
			this.GR - BasedIV = (oData && oData.Webrec) ? oData.Webrec : "";
			this.B / exchlimit = (oData && oData.Webtrb) ? oData.Webtrb : "";
			this.Plantrelevant = (oData && oData.Werkra) ? oData.Werkra : "";
			this.Plant = (oData && oData.Werksa) ? oData.Werksa : "";
			this.Acctstatement = (oData && oData.Xauszb) ? oData.Xauszb : "";
			this.One - timeacct = (oData && oData.Xcpdka) ? oData.Xcpdka : "";
			this.Localprocess = (oData && oData.Xdezvb) ? oData.Xdezvb : "";
			this.PmtadvbyEDI = (oData && oData.Xedipb) ? oData.Xedipb : "";
			this.AutGRSetRet = (oData && oData.Xersrc) ? oData.Xersrc : "";
			this.ERS = (oData && oData.Xersyc) ? oData.Xersyc : "";
			this.Collectauthor = (oData && oData.Xezerd) ? oData.Xezerd : "";
			this.Altpayeedoc = (oData && oData.Xlfzaa) ? oData.Xlfzaa : "";
			this.Altpayeedoc = (oData && oData.Xlfzbb) ? oData.Xlfzbb : "";
			this.Revaluation = (oData && oData.Xnbwyc) ? oData.Xnbwyc : "";
			this.Individualpmnt = (oData && oData.Xporeb) ? oData.Xporeb : "";

			this.Clrgwithcust = (oData && oData.Xverrb) ? oData.Xverrb : "";
			this.Payeeindoc = (oData && oData.Xzempa) ? oData.Xzempa : "";

			this.Paymentblock = (oData && oData.Zahlsb) ? oData.Zahlsb : "";
			this.LedgerExpdate = (oData && oData.Zbokdb) ? oData.Zbokdb : "";
			this.Groupingkey = (oData && oData.Zgrupb) ? oData.Zgrupb : "";
			this.Lastkeydate = (oData && oData.Zindtb) ? oData.Zindtb : "";
			this.Intcalcfreq = (oData && oData.Zinrtb) ? oData.Zinrtb : "";
			this.Customsoffice = (oData && oData.Zollac) ? oData.Zollac : "";
			this.Clerkatvendor = (oData && oData.Zsabeb) ? oData.Zsabeb : "";
			this.PaytTerms = (oData && oData.Ztermb) ? oData.Ztermb : "";
			this.PaytTerms = (oData && oData.Ztermc) ? oData.Ztermc : "";
			this.Sortkey = (oData && oData.Zuawab) ? oData.Zuawab : "";
			this.Paymentmethods = (oData && oData.Zwelsb) ? oData.Zwelsb : "";

		},

		getCreateRequestPayload: function() {
			return {


				Abuebc: this.CreationProfile,
				Actssa: this.SocInsCode,
				Adrnra: this.Address,
				Agrelc: this.Agencybusiness,
				Akontb: this.Reconaccount,
				Altknb: this.Prevacctno,
				Anreda: this.Title,
				Avsndb: this.PmtAdvXML,
				Bahnsa: this.Trainstation,
				Bankld: this.BankKey,
				Banknd: this.BankAccount,
				Banksd: this.BankCountry,
				Bbbnra: this.Locationno1,
				Bbsnra: this.Locationno2,
				Begrua: this.Authorization,
				Begrub: this.Authorization,
				Bkontd: this.Controlkey,
				Bkrefd: this.Reference
				Blindc: this.DocumentIndex,
				Blnkzb: this.Subsind
				Boindc: this.SSindexactive,
				Bolrec: this.Subseqsett,
				Bopnrc: this.LBprofile,
				Brscha: this.Industry,
				Bstaec: this.ConfControldd,
				Bubkza: this.Checkdigit,
				Bukrsb: this.CompanyCode,
				Busabb: this.Acctgclerk,
				Bvtypd: this.PartBankType,
				Cerdtb: this.CertifictnDate,
				Confsa: this.Confirmstatus,
				Confsb: this.ConfirmStCCd,
				Datlta: this.Dataline,
				Datlzb: this.Lastintcalc,
				Dlgrpa: this.ServAgntProcGrp,
				Dtamsa: this.DMEIndicator,
				Dtawsa: this.Instructionkey,
				Duefla: this.DataTransferStatus,
				Eiktob: this.Acctwvendor,
				Eiktoc: this.Accwvendor,
				Ekgrpc: this.PurchGroup,
				Ekorgc: this.PurchasingOrg,
				Emnfra: this.Externalmanuf,
				Erdata: this.Createdon,
				Erdatb: this.Createdon,
				Erdatc: this.Createdon,
				Ernama: this.Createdby
				Ernamb: this.Createdby,
				Ernamc: this.Createdby,
				Esrnra: this.ISRNumber,
				Expvzc: this.ModeOfTr,
				Fdgrvb: this.Planninggroup,
				Fiskna: this.Fiscaladdress,
				Fiskua: this.Taxoffice,
				Fitypa: this.Taxtype,
				Frgrpb: this.Releasegroup,
				Gbdata: this.Dateofbirth,
				Gborta: this.Placeofbirth,
				Gricdb: this.ActivityCode,
				Gridtb: this.DistrType,
				Guzteb: this.Crmemoterms,
				Hbkidb: this.HouseBank,

					Inco1c: this.Incoterms,
				Inco2c: this.Incoterms2,
				Intadb: this.Clrksinternet,
				Ipispa: this.Taxsplit,
				Kalskc: this.SchemaGrpVndr,
				Koinhd: this.Accountholder,
				Konzsa: this.CorporateGroup,
				Krausa: this.Credinfono,
				Ktocka: this.Refacctgroup,
				Ktokka: this.Accountgroup,
				Kultgb: this.Chkcashngtime,
				Kunnra: this.Customer,
				Kvermb: this.Accountmemo,
				Kzabsc: this.AcknowlReqd,
				Kzautc: this.AutomaticPO,
				Kzretc: this.Returnsvendor

					Land1a: this.Country,
				Lebrec: this.Srv - BasedInvVer,
				Lfabcc: this.ABCindicator,
				Lfrhyc: this.Planningcycle,
				Lfurla: this.URL,
				Libesc: this.POentryvend,
				Lifnra: this.Vendor,
				Liprec: this.Pricemkgvnd,
				Liserc: this.Rackjobbing,
				Lnrzaa: this.Alternatpayee,
				Lnrzbb: this.Alternatpayee
				Lnrzeb: this.Headoffice,
				Loevma: this.Deletionflag,
				Loevmb: this.Cocdedeletionflag,
				Loevmc: this.DelflagPOrg
				Ltsnaa: this.VSRrelevant
				Lzonea: this.Transportzone,

					Mcod1a: this.Name,
				Mcod2a: this.Name2,
				Mcod3a: this.City,
				Megruc: this.UoMGroup,
				Meprfc: this.PrDateCat,
				Mgrupb: this.Groupingkey,
				Minbwc: this.Minimumvalue,
				Mindkb: this.Minorityindic,
				Mrpppc: this.Planningcal,
				Name1a: this.Name,
				Name2a: this.Name2,
				Name3a: this.Name3,
				Name4a: this.Name4,
				Nodela: this.Deletionblock,
				Nodelb: this.CoCddelblock,
				Nrgewc: this.QualiffDKd,

					Ort01a: City,
				Ort02a: District,
				Paprfc: PROACTcontrolprof,
				Pernrb: PersonnelNo,
				Pfacha: PO Box,
				Pforta: POBoxcity,
				Plifzc: PlDelivTime,
				Plkala: Factorycalend,
				Prfrec: Pricedetermin,
				Profsa: Profession,
				Pstl2a: POBoxPCode,
				Pstlza: PostalCode,
				Qlandb: Country,
				Qsbgrb: Exmptauthority,
				Qsrecb: Recipienttype,
				Qsskzb: WTaxCode,
				Qssysa: ActualQMsys,
				Qszdtb: Validuntil,
				Qsznrb: Exemptionno,

					Rdprfc: RndingProfile,
				Regioa: region,
				Regssa: SocialIns,
				Reprfb: Chkdoubleinv,
				Revdba: Lastextreview,
				Scacda: SCAC,
				Sexkza: Sex,
				Sfrgra: Carfreightgrp,
				Skritc: Sortcriterion,
				
				Sortla: Searchterm,
				Sperma: Purchblock,
				Spermc: PurblockPOrg,
				Sperqa: Blockfunction,
				Sperra: PostingBlock,
				Sperrb: Cocodepostblock,
				Sperza: Paymentblock,
				Sprasa: Language,
				Stcd1a: TaxNumber1,
				Stcd2a: TaxNumber2,
				Stcd3a: TaxNumber3,
				Stcd4a: TaxNumber4,
				Stcd5a: TaxNumber5,
				Stcdta: Taxnumbertype,
				Stcega: VATRegNo,
				Stenra: TaxNumber,
				Stgdla: Statgrpagent,
				Stkzaa: Equalizatntax,
				Stkzna: Naturalperson,
				Stkzua: LiableforVAT,
				Strasa: Street,

					Taxbsa: Taxbase,
				Telbxa: Telebox,
				Telf1a: Telephone1,
				Telf1c: Telephone,
				Telf2a: Telephone2,
				Telfxa: FaxNumber,
				Teltxa: Teletex,
				Telx1a: Telex,
				Tlfnsb: Actclktelno,
				Tlfxsb: Clerksfax,
				Togrrb: Tolerancegrp,
				Togrub: Tolerancegroup,
				Txjcda: TaxJur,

					Umsaec: Bvolcompag,
				Updata: Confirmdate,
				Updatb: Confirmdate,
				Uptima: Confirmtime,
				Uptimb: Confirmtime,
				Uzaweb: Pmtmethsupl
				Vbunda: ""
				Venslc: "0.0000"
				Verkfc: ""
				Vsbedc: ""
				Vzskzb: ""

					Waersc: ""
				Webrec: ""
				Webtrb: "0.000"
				Werkra: ""
				Werksa: ""
				Xauszb: ""
				Xcpdka: ""
				Xdezvb: ""
				Xedipb: ""
				Xersrc: ""
				Xersyc: ""
				Xezerd: ""
				Xlfzaa: ""
				Xlfzbb: ""
				Xnbwyc: ""
				Xporeb: ""
				Xverrb: ""
				Xzempa: ""

					Zahlsb: ""
				Zbokdb: null
				Zgrupb: ""
				Zindtb: null
				Zinrtb: "00"
				Zollac: ""
				Zsabeb: ""
				Ztermb: ""
				Ztermc: ""
				Zuawab: ""
				Zwelsb: ""

			};

		}

	});

});