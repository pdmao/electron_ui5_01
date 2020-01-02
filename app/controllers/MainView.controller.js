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
              var iRowCont = oShtJson.length;
              oXlModel.push( {file:  sName , sheet: sShtName, status:"", type : sType, rows: iRowCont, data: oShtJson } );

          }
        //   // this.eleapi.XLSX
        }

        oView.getModel("xlmodel").setData(oXlModel);
        var a = 1;
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

      }


    });
});
