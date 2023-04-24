define("RealtySection", ["ProcessModuleUtilities"], function(ProcessModuleUtilities) {
	return {
		entitySchemaName: "Realty",
		attributes: {
			"ButtonEnabled": {
                "dataValueType": Terrasoft.DataValueType.BOOLEAN,
                "type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
                "value": false
            }
        },
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		methods: {
            onCardRendered: function() {
                this.callParent();
				this.setButtonEnabled();
            },
			setButtonEnabled: function () {
				var activeRow = this.get("ActiveRow");
                if (activeRow) { 
					this.set("ButtonEnabled", true); 
				}
				else { 
					this.set("ButtonEnabled", false); 
				}
			},
			callCreateRecords: function () {
                var realtyId = this.get("ActiveRow");
                if (realtyId) {
                    var args = { sysProcessName: "CreateRecords", parameters: { RealtyId: realtyId } };
                    ProcessModuleUtilities.executeProcess(args);
                }
            }
        },
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
                "parentName": "CombinedModeActionButtonsCardLeftContainer",
                "propertyName": "items",
                "name": "MainCreateRecordsButton",
                "values": {
                    "itemType": Terrasoft.ViewItemType.BUTTON,
                    "caption": {bindTo: "Resources.Strings.MainCreateRecordsHelp"},
                    "click": {bindTo: "callCreateRecords"},
                    "style": Terrasoft.controls.ButtonEnums.style.GREEN,
                    "enabled": {bindTo: "ButtonEnabled"}
                }
            }
        ]/**SCHEMA_DIFF*/,
	};
});