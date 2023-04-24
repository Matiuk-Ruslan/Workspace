define("RealtyPage", ["ProcessModuleUtilities"], function (ProcessModuleUtilities) {
    return {
        entitySchemaName: "Realty",
        attributes: {
            "Commission": {
                dataValueType: Terrasoft.DataValueType.FLOAT2,
                dependencies: [
                    {
                        columns: ["Price", "OfferType"],
                        methodName: "calculateCommission"
                    }
                ]
            },
            "OfferType": {
                lookupListConfig: {
                    columns: ["Coefficient"]
                }
            },
			"ButtonEnabled": {
                "dataValueType": Terrasoft.DataValueType.BOOLEAN,
                "type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
                "value": false
            }
        },
        modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
        details: /**SCHEMA_DETAILS*/{
            "Files": {
                "schemaName": "FileDetailV2",
                "entitySchemaName": "RealtyFile",
                "filter": {
                    "masterColumn": "Id",
                    "detailColumn": "Realty"
                }
            },
            "RealtyViewsDetail": {
                "schemaName": "RealtyViewsDetail",
                "entitySchemaName": "RealtyView",
                "filter": {
                    "detailColumn": "Realty",
                    "masterColumn": "Id"
                }
            }
        }/**SCHEMA_DETAILS*/,
        businessRules: /**SCHEMA_BUSINESS_RULES*/{
            "Notes": {
                "73d0a0be-7f81-45fd-88a2-20fa0c49716e": {
                    "uId": "73d0a0be-7f81-45fd-88a2-20fa0c49716e",
                    "enabled": true,
                    "removed": false,
                    "ruleType": 0,
                    "property": 2,
                    "logical": 0,
                    "conditions": [
                        {
                            "comparisonType": 7,
                            "leftExpression": {
                                "type": 1,
                                "attribute": "Price"
                            },
                            "rightExpression": {
                                "type": 0,
                                "value": 100000,
                                "dataValueType": 5
                            }
                        }
                    ]
                }
            }
        }/**SCHEMA_BUSINESS_RULES*/,
        messages: {
            "SetRealtyViews": {
                "mode": Terrasoft.MessageMode.BROADCAST,
                "direction": Terrasoft.MessageDirectionType.SUBSCRIBE
            }
        },
        methods: {
            onEntityInitialized: function () {
                this.callParent(arguments);
                this.calculateCommission();
				this.isRecordExist();
                this.sandbox.subscribe("SetRealtyViews", this.updateDetailRealtyViews, this);
            },
            calculateCommission: function () {
                var price = this.get("Price");
                if (!price) { price = 0; }
                var offerType = this.get("OfferType");
                var commissionRate = 0;
                if (offerType) { commissionRate = offerType.Coefficient; }
                var commission = price * commissionRate;
                this.set("Commission", commission);
            },
            valueValidator: function (value, field) {
                var warning = '';
                if (value < 0) { warning = this.get("Resources.Strings.WarningMessageValidator"); }
                return { invalidMessage: warning };
            },
            setValidationConfig: function () {
                this.callParent(arguments);
                this.addColumnValidator("Price", this.valueValidator);
                this.addColumnValidator("Area", this.valueValidator);
            },
            isRecordExist: function () {
				var pageContext = this;
                var recordId = this.get("Id");
				if(recordId) {
					var readESQ = this.Ext.create("Terrasoft.EntitySchemaQuery", { rootSchemaName: "Realty" });
					readESQ.addColumn("Id");
                	var esqFirstFilter = readESQ.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "Id", recordId);
                	readESQ.filters.add("esqFirstFilter", esqFirstFilter);
                	readESQ.getEntityCollection(function (result) {
						if (result.success) {
							var count = result.collection.getCount();
							pageContext.setButtonEnabled(count);
						}
					});
				}
            },
			setButtonEnabled: function (count) {
				if (count == 1) {
					this.set("ButtonEnabled", true);
				}
				else {
					this.set("ButtonEnabled", false);
				}
			},
            callCreateRecords: function () {
                var realtyId = this.get("Id");
                if (realtyId) {
                    var args = { sysProcessName: "CreateRecords", parameters: { RealtyId: realtyId } };
                    ProcessModuleUtilities.executeProcess(args);
                }
            },
            updateDetailRealtyViews: function (args) {
                this.updateDetail({ detail: "RealtyViewsDetail" });
            },
        },
        dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
        diff: /**SCHEMA_DIFF*/[
            {
                "operation": "insert",
                "name": "Name",
                "values": {
                    "layout": {
                        "colSpan": 24,
                        "rowSpan": 1,
                        "column": 0,
                        "row": 0,
                        "layoutName": "ProfileContainer"
                    },
                    "bindTo": "Name"
                },
                "parentName": "ProfileContainer",
                "propertyName": "items",
                "index": 0
            },
            {
                "operation": "insert",
                "name": "Area",
                "values": {
                    "layout": {
                        "colSpan": 24,
                        "rowSpan": 1,
                        "column": 0,
                        "row": 1,
                        "layoutName": "ProfileContainer"
                    },
                    "bindTo": "Area",
                    "tip": { "content": { "bindTo": "Resources.Strings.AreaHelp" } }
                },
                "parentName": "ProfileContainer",
                "propertyName": "items",
                "index": 1
            },
            {
                "operation": "insert",
                "name": "Price",
                "values": {
                    "layout": {
                        "colSpan": 24,
                        "rowSpan": 1,
                        "column": 0,
                        "row": 2,
                        "layoutName": "ProfileContainer"
                    },
                    "bindTo": "Price",
                    "tip": { "content": { "bindTo": "Resources.Strings.PriceHelp" } }
                },
                "parentName": "ProfileContainer",
                "propertyName": "items",
                "index": 2
            },
            {
                "operation": "insert",
                "name": "Commission",
                "values": {
                    "layout": {
                        "colSpan": 24,
                        "rowSpan": 1,
                        "column": 0,
                        "row": 3,
                        "layoutName": "ProfileContainer"
                    },
                    "bindTo": "Commission",
                    "tip": { "content": { "bindTo": "Resources.Strings.CommissionHelp" } },
                    "enabled": false
                },
                "parentName": "ProfileContainer",
                "propertyName": "items",
                "index": 3
            },
            {
                "operation": "insert",
                "name": "RealtyType",
                "values": {
                    "layout": {
                        "colSpan": 12,
                        "rowSpan": 1,
                        "column": 0,
                        "row": 0,
                        "layoutName": "Header"
                    },
                    "bindTo": "RealtyType",
                    "enabled": true,
                    "contentType": 3
                },
                "parentName": "Header",
                "propertyName": "items",
                "index": 0
            },
            {
                "operation": "insert",
                "name": "OfferType",
                "values": {
                    "layout": {
                        "colSpan": 12,
                        "rowSpan": 1,
                        "column": 12,
                        "row": 0,
                        "layoutName": "Header"
                    },
                    "bindTo": "OfferType",
                    "enabled": true,
                    "contentType": 3
                },
                "parentName": "Header",
                "propertyName": "items",
                "index": 1
            },
            {
                "operation": "insert",
                "name": "Notes",
                "values": {
                    "layout": {
                        "colSpan": 24,
                        "rowSpan": 1,
                        "column": 0,
                        "row": 1,
                        "layoutName": "Header"
                    },
                    "bindTo": "Notes"
                },
                "parentName": "Header",
                "propertyName": "items",
                "index": 2
            },
            {
                "operation": "insert",
                "name": "GeneralInformationTabLabel",
                "values": {
                    "caption": {
                        "bindTo": "Resources.Strings.GeneralInformationTabLabelTabCaption"
                    },
                    "items": [],
                    "order": 0
                },
                "parentName": "Tabs",
                "propertyName": "tabs",
                "index": 0
            },
            {
                "operation": "insert",
                "name": "RealtyViewsDetail",
                "values": {
                    "itemType": 2,
                    "markerValue": "added-detail"
                },
                "parentName": "GeneralInformationTabLabel",
                "propertyName": "items",
                "index": 0
            },
            {
                "operation": "insert",
                "name": "NotesAndFilesTab",
                "values": {
                    "caption": {
                        "bindTo": "Resources.Strings.NotesAndFilesTabCaption"
                    },
                    "items": [],
                    "order": 1
                },
                "parentName": "Tabs",
                "propertyName": "tabs",
                "index": 1
            },
            {
                "operation": "insert",
                "name": "Files",
                "values": {
                    "itemType": 2
                },
                "parentName": "NotesAndFilesTab",
                "propertyName": "items",
                "index": 0
            },
            {
                "operation": "insert",
                "parentName": "LeftContainer",
                "propertyName": "items",
                "name": "CreateRecordsButton",
                "values": {
                    "itemType": Terrasoft.ViewItemType.BUTTON,
                    "caption": {bindTo: "Resources.Strings.CreateRecordsHelp"},
                    "click": {bindTo: "callCreateRecords"},
                    "style": Terrasoft.controls.ButtonEnums.style.GREEN,
					"enabled": {bindTo: "ButtonEnabled"},
                }
            }
        ]/**SCHEMA_DIFF*/
    };
});