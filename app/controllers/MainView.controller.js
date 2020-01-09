/**
 * Application view controller.
 *
 * @Author: pdm
 * @Email:  pdm@spin8.io
 * @Filename: MainView.controller.js
 *
 * Copyright (C) pdm.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {

    "use strict";

    return Controller.extend("spin8.app.controllers.MainView", {

        constructor: function(sName) {

            Controller.apply(this, arguments);
        },
        init: function(){
          var a = 1;
          this.xlsx = window.nodeRequire("xlsx");
        },

        onButPress: function(evt){
          MessageToast.show("button pressed!");
        },

      handleIconTabBarSelect: function(evt){
          var a = 1;
      },

      onStartUpload: function(evt){
        var a = 1;
        var oView = this.getView();
        var oUColl = this.byId("uco01");
        var aItems = oUColl.getItems();
        if (aItems.length == 0){
          MessageToast.show("No Files selected");
          return;
        }
        var oFsModel = oView.getModel("fsmodel").getData();
        var oXlModel = oView.getModel("xlmodel").getData();
        oXlModel = [];
        for (var iFileKey = 0 ; iFileKey < aItems.length; iFileKey++) {
          var oItem = aItems[iFileKey];
          var sName = oItem.getFileName();
          var sPath = oFsModel[sName].path;
          var sType = oFsModel[sName].type;
          var xFile =  global.eleapi.XLSX.readFileSync(sPath);
          var aSheets = Array.isArray(xFile.SheetNames) ? xFile.SheetNames : [];
          for (var iShtKey = 0 ; iShtKey < aSheets.length; iShtKey++) {
              var sShtName = aSheets[iShtKey];
              var oShtItem = xFile.Sheets[sShtName];
              var oShtJson = global.eleapi.XLSX.utils.sheet_to_json(oShtItem);
              var sShtHtml = global.eleapi.XLSX.utils.sheet_to_html(oShtItem,{header:'<div>', footer:'</div>', id:"htmltab", editable:true});
              var iRowCont = oShtJson.length;
              oXlModel.push( {file:  sName , sheet: sShtName, status:"", type : sType, rows: iRowCont, data: oShtJson , item: oItem, html: sShtHtml} );

          }

        //   // this.eleapi.XLSX
        }

        oView.getModel("xlmodel").setData(oXlModel);
        var x = 1;
      },

      onFileDeleted: function(evt){
        var a = 1;
      },

      onUploadChange: function(evt){
        var a = 1;
        var oView = this.getView();
        var oFile = evt.getParameters().files[0];
        var sName = oFile.name;
        var sPath = oFile.path;
        var sType = oFile.type;
        var sSize = oFile.size;
        var sModi = oFile.lastModified;

        var oData = { name : sName, path : sPath, type : sType, size: sSize, modi : sModi  };

        var oFsModel = oView.getModel("fsmodel").getData();
        oFsModel[sName] = oData;
        oView.getModel("fsmodel").setData(oFsModel);

      },

      onTabPress: function(evt){
        var a = 1;
        var aCells = evt.getSource().getParent().getCells();
        var sFileName = aCells[0].getText();
        var sShtName = aCells[1].getText();

        MessageToast.show("pressed item for " + sFileName + " - " + sShtName);

        var oDetails = this.getSheetDetails(sFileName, sShtName);
        var oData1 = oDetails.hasOwnProperty("data")? oDetails.data : {};
        var oTable = this.byId("tblData");
        var oXpMod = this.getView().getModel("xpmodel").getData();
        var fldRow = 0;
        try{
          fldRow = oXpMod.view.json2table.fldrow;
        }
        catch (e){}

        var txtRow = 0;
        try{
          txtRow = oXpMod.view.json2table.txtrow;
        }
        catch (e){}

        var dtaMin = 1;
        try{
          dtaMin = oXpMod.view.json2table.dtamin;
        }
        catch (e){}

        var dtaMax = 10;
        try{
          dtaMax = oXpMod.view.json2table.dtamax;
        }
        catch (e){}
        var aFlds = [];
        if (fldRow == -1){
          aFlds = Object.keys( oData1[0] );
        }else{
          aFlds = oData1[fldRow];
        }

        var aTxts = oData1[txtRow];


        oTable.destroyColumns();

        for (var idx = 0; idx < aFlds.length ; idx++){
          var sFld  = aFlds[idx];
          var oText = new sap.m.Text();

          oText.bindText(sFld);

          var oColumn = new sap.ui.table.Column();
          oColumn.setLabel(aTxts[sFld]);
          oColumn.setTemplate(oText);
          oColumn.setName(sFld);
          oTable.addColumn(oColumn);

        }
        var oData2 = oData1.slice(dtaMin, dtaMax);
        var oTbModel = new sap.ui.model.json.JSONModel();
        oTbModel.setData({data : oData2});
        oTable.setModel(oTbModel);
        oTable.bindRows("/data");

      },

      getSheetDetails: function(sFileName, sShtName){
        var aData = this.getView().getModel("xlmodel").getData();
        var oLine = {};
        for(var idx = 0; idx < aData.length; idx++){
          oLine = aData[idx];
          if (oLine.file == sFileName && oLine.sheet == sShtName){
            break;
          }
        }

        return(oLine);
      },

      testMethod: function(sFileName, sShtName){
        console.log(sFileName);
        console.log(sShtName);

      },

      checkObjProsReq: function(obj, props){
        if( ! (obj instanceof Object)){
          return -1;
        }

        if( ! (Array.isArray(props) ) ){
          return -2;
        }
        var propInList = props.length;
        var propInObj  = checkObjProps(obj, props);
        return( propInList == propInObj ? 1 : 0);
      },

      checkObjProsXcl: function(obj, props){
        if( ! (obj instanceof Object)){
          return -1;
        }

        if( ! (Array.isArray(props) ) ){
          return -2;
        }
        var propInList = props.length;
        var propInObj  = checkObjProps(obj, props);
        return( propInObj == 0 ? 1 : 0);
      },

      checkObjProsOpt: function(obj, props){
        if( ! (obj instanceof Object)){
          return -1;
        }

        if( ! (Array.isArray(props) ) ){
          return -2;
        }
        var propInList = props.length;
        var propInObj  = checkObjProps(obj, props);
        return( propInObj > 0 ? 1 : 0);
      },


      checkObjProps: function( obj, props ){
        if( ! (obj instanceof Object)){
          return -1;
        }

        if( ! (Array.isArray(props) ) ){
          return -2;
        }
        var iPropCnt  =  0;
        for(var idx = 0 ; idx < props.length; idx++ ){
          if(obj.hasOwnProperty(props[idx])){
            iPropCnt ++;
          }
      }

      return iPropCnt;

      }


    });
});
