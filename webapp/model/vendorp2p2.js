sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/model/json/JSONModel"
], function(Object, JSONModel) {
	"use strict";
	return Object.extend("com.vSimpleApp.model.VendorMaster", {
		constructor: function(oData) {

		   
		   this.Abuebc = (oData && oData.Abuebc) ? oData.Abuebc : "";
		   this.Actssa = (oData && oData.Actssa) ? oData.Actssa : "";
		   this.Adrnra = (oData && oData.Adrnra) ? oData.Adrnra : "";
		   this.Agrelc = (oData && oData.Agrelc) ? oData.Agrelc : "";
		   this.Akontb = (oData && oData.Akontb) ? oData.Akontb : "";
		   this.Altknb = (oData && oData.Altknb) ? oData.Altknb : "";
		   this.Anreda = (oData && oData.Anreda) ? oData.Anreda : "";
		   this.Avsndb = (oData && oData.Avsndb) ? oData.Avsndb : "";
		   this.Bahnsa = (oData && oData.Bahnsa) ? oData.Bahnsa : "";
		   this.Bankld = (oData && oData.Bankld) ? oData.Bankld : "";
		   this.Banknd = (oData && oData.Banknd) ? oData.Banknd : "";
		   this.Banksd = (oData && oData.Banksd) ? oData.Banksd : "";
		   
		   this.Bbbnra = (oData && oData.Bbbnra) ? oData.Bbbnra : "";
		   this.Bbsnra = (oData && oData.Bbsnra) ? oData.Bbsnra : "";
		   this.Begrua = (oData && oData.Begrua) ? oData.Begrua : "";
		   this.Begrub = (oData && oData.Begrub) ? oData.Begrub : "";
		   this.Bkontd = (oData && oData.Bkontd) ? oData.Bkontd : "";
		   this.Bkrefd = (oData && oData.Bkrefd) ? oData.Bkrefd : "";
		   this.Blindc = (oData && oData.Blindc) ? oData.Blindc : "";
		   this.Blnkzb = (oData && oData.Blnkzb) ? oData.Blnkzb : "";
		   this.Boindc = (oData && oData.Boindc) ? oData.Boindc : "";
		   this.Bolrec = (oData && oData.Bolrec) ? oData.Bolrec : "";
		   this.Bopnrc = (oData && oData.Bopnrc) ? oData.Bopnrc : "";
		   this.Brscha = (oData && oData.Brscha) ? oData.Brscha : "";
		   this.Bstaec = (oData && oData.Bstaec) ? oData.Bstaec : "";
		   this.Bubkza = (oData && oData.Bubkza) ? oData.Bubkza : "";
		   this.Bukrsb = (oData && oData.Bukrsb) ? oData.Bukrsb : "";
		   this.Busabb = (oData && oData.Busabb) ? oData.Busabb : "";
		   this.Bvtypd = (oData && oData.Bvtypd) ? oData.Bvtypd : "";
		   
		   this.Cerdtb = (oData && oData.Cerdtb) ? oData.Cerdtb : "";
		   this.Confsa = (oData && oData.Confsa) ? oData.Confsa : "";
		   this.Confsb = (oData && oData.Confsb) ? oData.Confsb : "";
		   this.Datlta = (oData && oData.Datlta) ? oData.Datlta : "";
		   this.Datlzb = (oData && oData.Datlzb) ? oData.Datlzb : "";
		   this.Dlgrpa = (oData && oData.Dlgrpa) ? oData.Dlgrpa : "";
		   this.Dtamsa = (oData && oData.Dtamsa) ? oData.Dtamsa : "";
		   this.Dtawsa = (oData && oData.Dtawsa) ? oData.Dtawsa : "";
		   this.Duefla = (oData && oData.Duefla) ? oData.Duefla : "";
		   
		   this.Eiktob = (oData && oData.Eiktob) ? oData.Eiktob : "";
		   this.Eiktoc = (oData && oData.Eiktoc) ? oData.Eiktoc : "";
		   this.Ekgrpc = (oData && oData.Ekgrpc) ? oData.Ekgrpc : "";
		   this.Ekorgc = (oData && oData.Ekorgc) ? oData.Ekorgc : "";
		   this.Emnfra = (oData && oData.Emnfra) ? oData.Emnfra : "";
		   this.Erdata = (oData && oData.Erdata) ? oData.Erdata : "";
		   this.Erdatb = (oData && oData.Erdatb) ? oData.Erdatb : "";
		   this.Erdatc = (oData && oData.Erdatc) ? oData.Erdatc : "";
		   this.Ernama = (oData && oData.Ernama) ? oData.Ernama : "";
		   this.Ernamb = (oData && oData.Ernamb) ? oData.Ernamb : "";
		   this.Ernamc = (oData && oData.Ernamc) ? oData.Ernamc : "";
		   this.Esrnra = (oData && oData.Esrnra) ? oData.Esrnra : "";
		   this.Expvzc = (oData && oData.Expvzc) ? oData.Expvzc : "";
		   
		   this.Fdgrvb = (oData && oData.Fdgrvb) ? oData.Fdgrvb : "";
		   this.Fiskna = (oData && oData.Fiskna) ? oData.Fiskna : "";
		   this.Fiskua = (oData && oData.Fiskua) ? oData.Fiskua : "";
		   this.Fitypa = (oData && oData.Fitypa) ? oData.Fitypa : "";
		   this.Frgrpb = (oData && oData.Frgrpb) ? oData.Frgrpb : "";
		   
		   this.Gbdata = (oData && oData.Gbdata) ? oData.Gbdata : "";
		   this.Gborta = (oData && oData.Gborta) ? oData.Gborta : "";
		   this.Gricdb = (oData && oData.Gricdb) ? oData.Gricdb : "";
		   this.Gridtb = (oData && oData.Gridtb) ? oData.Gridtb : "";
		   this.Guzteb = (oData && oData.Guzteb) ? oData.Guzteb : "";
		   this.Hbkidb = (oData && oData.Hbkidb) ? oData.Hbkidb : "";
		   
		   this.Inco1c = (oData && oData.Inco1c) ? oData.Inco1c : "";
		   this.Inco2c = (oData && oData.Inco2c) ? oData.Inco2c : "";
		   this.Intadb = (oData && oData.Intadb) ? oData.Intadb : "";
		   this.Ipispa = (oData && oData.Ipispa) ? oData.Ipispa : "";
		   this.Kalskc = (oData && oData.Kalskc) ? oData.Kalskc : "";
		   this.Koinhd = (oData && oData.Koinhd) ? oData.Koinhd : "";
		   this.Konzsa = (oData && oData.Konzsa) ? oData.Konzsa : "";
		   this.Krausa = (oData && oData.Krausa) ? oData.Krausa : "";
		   this.Ktocka = (oData && oData.Ktocka) ? oData.Ktocka : "";
		   this.Ktokka = (oData && oData.Ktokka) ? oData.Ktokka : "";
		   this.Kultgb = (oData && oData.Kultgb) ? oData.Kultgb : "";
		   this.Kunnra = (oData && oData.Kunnra) ? oData.Kunnra : "";
		   this.Kvermb = (oData && oData.Kvermb) ? oData.Kvermb : "";
		   this.Kzabsc = (oData && oData.Kzabsc) ? oData.Kzabsc : "";
		   this.Kzautc = (oData && oData.Kzautc) ? oData.Kzautc : "";
		   this.Kzretc = (oData && oData.Kzretc) ? oData.Kzretc : "";
		   
		   this.Country = (oData && oData.Land1a) ? oData.Land1a : "";
		   this.Lebrec = (oData && oData.Lebrec) ? oData.Lebrec : "";
		   this.Lfabcc = (oData && oData.Lfabcc) ? oData.Lfabcc : "";
		   this.Lfrhyc = (oData && oData.Lfrhyc) ? oData.Lfrhyc : "";
		   this.Lfurla = (oData && oData.Lfurla) ? oData.Lfurla : "";
		   this.Libesc = (oData && oData.Libesc) ? oData.Libesc : "";
		   this.Vendor = (oData && oData.Lifnra) ? oData.Lifnra : "";
		   this.Liprec = (oData && oData.Liprec) ? oData.Liprec : "";
		   this.Liserc = (oData && oData.Liserc) ? oData.Liserc : "";
		   this.Lnrzaa = (oData && oData.Lnrzaa) ? oData.Lnrzaa : "";
		   this.Lnrzbb = (oData && oData.Lnrzbb) ? oData.Lnrzbb : "";
		   this.Lnrzeb = (oData && oData.Lnrzeb) ? oData.Lnrzeb : "";
		   this.Loevma = (oData && oData.Loevma) ? oData.Loevma : "";
		   this.Loevmb = (oData && oData.Loevmb) ? oData.Loevmb : "";
		   this.Loevmc = (oData && oData.Loevmc) ? oData.Loevmc : "";
		   this.Ltsnaa = (oData && oData.Ltsnaa) ? oData.Ltsnaa : "";
		   this.Lzonea = (oData && oData.Lzonea) ? oData.Lzonea : "";
		   
		   this.Mcod1a = (oData && oData.Mcod1a) ? oData.Mcod1a : "";
		   this.Mcod2a = (oData && oData.Mcod2a) ? oData.Mcod2a : "";
		   this.Mcod3a = (oData && oData.Mcod3a) ? oData.Mcod3a : "";
		   this.Megruc = (oData && oData.Megruc) ? oData.Megruc : "";
		   this.Meprfc = (oData && oData.Meprfc) ? oData.Meprfc : "";
		   this.Mgrupb = (oData && oData.Mgrupb) ? oData.Mgrupb : "";
		   this.Minbwc = (oData && oData.Minbwc) ? oData.Minbwc : "";
		   this.Mindkb = (oData && oData.Mindkb) ? oData.Mindkb : "";
		   this.Mrpppc = (oData && oData.Mrpppc) ? oData.Mrpppc : "";
		   this.Name = (oData && oData.Name1a) ? oData.Name1a : "";
		   this.Name2 = (oData && oData.Name2a) ? oData.Name2a : "";
		   this.Name3 = (oData && oData.Name3a) ? oData.Name3a : "";
		   this.Name4 = (oData && oData.Name4a) ? oData.Name4a : "";
		   this.Nodela = (oData && oData.Nodela) ? oData.Nodela : "";
		   this.Nodelb = (oData && oData.Nodelb) ? oData.Nodelb : "";
		   this.Nrgewc = (oData && oData.Nrgewc) ? oData.Nrgewc : "";
		   
		   this.City = (oData && oData.Ort01a) ? oData.Ort01a : "";
		   this.District = (oData && oData.Ort02a) ? oData.Ort02a : "";
		   this.Paprfc = (oData && oData.Paprfc) ? oData.Paprfc : "";
		   this.Pernrb = (oData && oData.Pernrb) ? oData.Pernrb : "";
		   this.POBox = (oData && oData.Pfacha) ? oData.Pfacha : "";
		   this.Pforta = (oData && oData.Pforta) ? oData.Pforta : "";
		   this.Plifzc = (oData && oData.Plifzc) ? oData.Plifzc : "";
		   this.Plkala = (oData && oData.Plkala) ? oData.Plkala : "";
		   this.Prfrec = (oData && oData.Prfrec) ? oData.Prfrec : "";
		   this.Profsa = (oData && oData.Profsa) ? oData.Profsa : "";
		   this.POBox_PCode = (oData && oData.Pstl2a) ? oData.Pstl2a : "";
		   this.Postal_Code = (oData && oData.Pstlza) ? oData.Pstlza : "";
		   this.Qlandb = (oData && oData.Qlandb) ? oData.Qlandb : "";
		   this.Qsbgrb = (oData && oData.Qsbgrb) ? oData.Qsbgrb : "";
		   this.Qsrecb = (oData && oData.Qsrecb) ? oData.Qsrecb : "";
		   this.Qsskzb = (oData && oData.Qsskzb) ? oData.Qsskzb : "";
		   this.Qssysa = (oData && oData.Qssysa) ? oData.Qssysa : "";
		   this.Qszdtb = (oData && oData.Qszdtb) ? oData.Qszdtb : "";
		   this.Qsznrb = (oData && oData.Qsznrb) ? oData.Qsznrb : "";
		   
		   this.Rdprfc = (oData && oData.Rdprfc) ? oData.Rdprfc : "";
		   this.Regioa = (oData && oData.Regioa) ? oData.Regioa : "";
		   this.Regssa = (oData && oData.Regssa) ? oData.Regssa : "";
		   this.Reprfb = (oData && oData.Reprfb) ? oData.Reprfb : "";
		   this.Revdba = (oData && oData.Revdba) ? oData.Revdba : "";
		   this.Scacda = (oData && oData.Scacda) ? oData.Scacda : "";
		   this.Sexkza = (oData && oData.Sexkza) ? oData.Sexkza : "";
		   this.Sfrgra = (oData && oData.Sfrgra) ? oData.Sfrgra : "";
		   this.Skritc = (oData && oData.Skritc) ? oData.Skritc : "";
		   //-------------------
		   this.Rdprfc = (oData && oData.Sortla) ? oData.Sortla : "";
		   this.Regioa = (oData && oData.Sperma) ? oData.Sperma : "";
		   this.Regssa = (oData && oData.Spermc) ? oData.Spermc : "";
		   this.Reprfb = (oData && oData.Sperqa) ? oData.Sperqa : "";
		   this.Revdba = (oData && oData.Sperra) ? oData.Sperra : "";
		   this.Scacda = (oData && oData.Sperrb) ? oData.Sperrb : "";
		   this.Sexkza = (oData && oData.Sperza) ? oData.Sperza : "";
		   this.Sfrgra = (oData && oData.Sprasa) ? oData.Sprasa : "";
		   this.Skritc = (oData && oData.Stcd1a) ? oData.Stcd1a : "";
		   this.Stcd2a = (oData && oData.Stcd2a) ? oData.Stcd2a : "";
		   this.Stcd3a = (oData && oData.Stcd3a) ? oData.Stcd3a : "";
		   this.Stcd4a = (oData && oData.Stcd4a) ? oData.Stcd4a : "";
		   
		   this. = (oData && oData.Stcd5a) ? oData.Stcd5a : "";
		   this. = (oData && oData.Stcdta) ? oData.Stcdta : "";
		   this. = (oData && oData.Stcega) ? oData.Stcega : "";
		   this. = (oData && oData.Stenra) ? oData.Stenra : "";
		   this. = (oData && oData.Stgdla) ? oData.Stgdla : "";
		   this. = (oData && oData.Stkzaa) ? oData.Stkzaa : "";
		   this. = (oData && oData.Stkzna) ? oData.Stkzna : "";
		   this. = (oData && oData.Stkzua) ? oData.Stkzua : "";
		   this. = (oData && oData.Strasa) ? oData.Strasa : "";
		   
		   this. = (oData && oData.Taxbsa) ? oData.Taxbsa : "";
		   this. = (oData && oData.Telbxa) ? oData.Telbxa : "";
		   this. = (oData && oData.Telf1a) ? oData.Telf1a : "";
		   this. = (oData && oData.Telf1c) ? oData.Telf1c : "";
		   this. = (oData && oData.Telf2a) ? oData.Telf2a : "";
		   this. = (oData && oData.Telfxa) ? oData.Telfxa : "";
		   this. = (oData && oData.Teltxa) ? oData.Teltxa : "";
		   this. = (oData && oData.Telx1a) ? oData.Telx1a : "";
		   this. = (oData && oData.Tlfnsb) ? oData.Tlfnsb : "";
		   this. = (oData && oData.Tlfxsb) ? oData.Tlfxsb : "";
		   this. = (oData && oData.Togrrb) ? oData.Togrrb : "";
		   this. = (oData && oData.Togrub) ? oData.Togrub : "";
		   this. = (oData && oData.Txjcda) ? oData.Txjcda : "";
		   
		   
		   this. = (oData && oData.Umsaec) ? oData.Umsaec : "";
		   this. = (oData && oData.Updata) ? oData.Updata : "";
		   this. = (oData && oData.Updatb) ? oData.Updatb : "";
		   this. = (oData && oData.Uptima) ? oData.Uptima : "";
		   this. = (oData && oData.Uptimb) ? oData.Uptimb : "";
		   this. = (oData && oData.Uzaweb) ? oData.Uzaweb : "";
		   this. = (oData && oData.Vbunda) ? oData.Vbunda : "";
		   this. = (oData && oData.Venslc) ? oData.Venslc : "";
		   this. = (oData && oData.Verkfc) ? oData.Verkfc : "";
		   this. = (oData && oData.Vsbedc) ? oData.Vsbedc : "";
		   this. = (oData && oData.Vzskzb) ? oData.Vzskzb : "";
		   
		   this. = (oData && oData.Waersc) ? oData.Waersc : "";
		   this. = (oData && oData.Webrec) ? oData.Webrec : "";
		   this. = (oData && oData.Webtrb) ? oData.Webtrb : "";
		   this. = (oData && oData.Werkra) ? oData.Werkra : "";
		   this. = (oData && oData.Werksa) ? oData.Werksa : "";
		   this. = (oData && oData.Xauszb) ? oData.Xauszb : "";
		   this. = (oData && oData.Xcpdka) ? oData.Xcpdka : "";
		   this. = (oData && oData.Xdezvb) ? oData.Xdezvb : "";
		   this. = (oData && oData.Xedipb) ? oData.Xedipb : "";
		   this. = (oData && oData.Xersrc) ? oData.Xersrc : "";
		   this. = (oData && oData.Xersyc) ? oData.Xersyc : "";
		   this. = (oData && oData.Xezerd) ? oData.Xezerd : "";
		   this. = (oData && oData.Xlfzaa) ? oData.Xlfzaa : "";
		   this. = (oData && oData.Xlfzbb) ? oData.Xlfzbb : "";
		   this. = (oData && oData.Xnbwyc) ? oData.Xnbwyc : "";
		   this. = (oData && oData.Xverrb) ? oData.Xverrb : "";
		   this. = (oData && oData.Xzempa) ? oData.Xzempa : "";
		   
		   
		   this. = (oData && oData.Zahlsb) ? oData.Zahlsb : "";
		   this. = (oData && oData.Zbokdb) ? oData.Zbokdb : "";
		   this. = (oData && oData.Zgrupb) ? oData.Zgrupb : "";
		   this. = (oData && oData.Zindtb) ? oData.Zindtb : "";
		   this. = (oData && oData.Zinrtb) ? oData.Zinrtb : "";
		   this. = (oData && oData.Zollac) ? oData.Zollac : "";
		   this. = (oData && oData.Zsabeb) ? oData.Zsabeb : "";
		   this. = (oData && oData.Ztermb) ? oData.Ztermb : "";
		   this. = (oData && oData.Ztermc) ? oData.Ztermc : "";
		   this. = (oData && oData.Zuawab) ? oData.Zuawab : "";
		   this. = (oData && oData.Zwelsb) ? oData.Zwelsb : "";
		   
		   
		   
		   
		   

            
	
		},
		 
		getCreateRequestPayload: function() {
			return {

				Akontb: this.ReconciliationAccount,
				Anreda: this.Title,
				Bankld: this.BankKey,
				Banknd: this.BankAcct,
				Banksd: this.BankCtry,
				Bkontd: this.BankControlKey
			

			};

		}
		
	});

});