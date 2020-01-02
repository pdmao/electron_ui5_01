/**
 * UI5 Application component.
 *
 * @Author: testapp
 * @Email:  pdm@spin8.io
 * @Filename: Component.js
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
    "jquery.sap.global",
    "sap/ui/core/UIComponent"
], function (jQuery, UIComponent) {

    "use strict";

    return UIComponent.extend("spin8.app.Component", {

        metadata: {
            manifest: "json"
        },

        init: function () {
          this.eleapi = {};
          this.eleapi.require = window.nodeRequire;
          this.eleapi.electron = this.eleapi.require('electron');
          this.eleapi.fs = this.eleapi.require("fs")

          var buf = this.eleapi.fs.readFileSync("./app/models/uiModel.json");

            // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);
            var uiModel = new sap.ui.model.json.JSONModel(JSON.parse(buf));
            //sap.ui.getCore().setModel( uiModel, "uimodel" );
            this.setModel( uiModel , "uimodel");
            global.eleapi = this.eleapi;
            var a = 1;
        }
    });
});