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
        },
        onButPress: function(evt){

          MessageToast.show("button pressed!");
        },

      handleIconTabBarSelect: function(evt){

          var a = 1;
      },
      onStartUpload: function(evt){
        var a = 1;
        var oUColl = this.byId("uco01");
        var aItems = oUColl.getItems();
        if (aItems.length == 0){
          MessageToast.show("No Files selected");
          return;
        }

      },

      onUploadChange: function(evt){
        var a = 1;
      },


    });
});
