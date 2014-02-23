var adiaryTanStringBundle = {
	_bundle : Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService).createBundle("chrome://adiary-tan/locale/adiary-tan.properties"),

	getString : function(aMessage, aArgs) {
		if (aArgs) {
			aArgs = [].slice.call(arguments, 1);
			return this._bundle.formatStringFromName(aMessage, aArgs, aArgs.length);
		} else {
			return this._bundle.GetStringFromName(aMessage);
		}
	}
};

var adiaryTanAbout = {
	changeStyle : function(aBox, aBalloon, aLabel1, aLabel2, aLabel3, aType, aArgs) {
		var propertyName = "adiaryTanAbout.type" + aType + "_2";
		var backgroundImageValue = adiaryTanStringBundle.getString(propertyName + ".backgroundImage");
		var labelValue;

		if (aArgs) {
			aArgs = [].slice.call(arguments, 6);
			aArgs.unshift(propertyName + ".label");
			labelValue = adiaryTanStringBundle.getString.apply(adiaryTanStringBundle, aArgs);
		} else {
			labelValue = adiaryTanStringBundle.getString(propertyName + ".label");
		}

		if (backgroundImageValue) {
			aBox.setAttribute("style", backgroundImageValue);
		}
		if (labelValue) {
			var labelArray = labelValue.split("\n");
			if (labelArray[0] == "") {
				aLabel1.setAttribute("hidden", true);
			} else {
				aLabel1.removeAttribute("hidden");
				aLabel1.value = labelArray[0];
			}
			if (labelArray[1] == "") {
				aLabel2.setAttribute("hidden", true);
			} else {
				aLabel2.removeAttribute("hidden");
				aLabel2.value = labelArray[1];
			}
			if (labelArray[2] == "") {
				aLabel3.setAttribute("hidden", true);
			} else {
				aLabel3.removeAttribute("hidden");
				aLabel3.value = labelArray[2];
			}
		}
	},

	react : function() {
		var box = document.getElementById("clientBox");
		var balloon = document.getElementById("adiaryTanBalloon");
		var label1 = document.getElementById("adiaryTanLabel1");
		var label2 = document.getElementById("adiaryTanLabel2");
		var label3 = document.getElementById("adiaryTanLabel3");

		if (box && balloon) {
			if (box.getAttribute("adiaryTanClicked") == "true") {
				this.changeStyle(box, balloon, label1, label2, label3, 0);
				balloon.setAttribute("hidden", true);
				box.setAttribute("adiaryTanClicked", false);
			} else {
				if (Math.random() > 0.6) {
					switch (Math.floor(Math.random() * 3)) {
						// Wafu-!
						case 0:
							this.changeStyle(box, balloon, label1, label2, label3, 2);
							break;
						// Judgement desuno!
						case 1:
							this.changeStyle(box, balloon, label1, label2, label3, 3);
							break;
						// Akkari-n
						case 2:
							this.changeStyle(box, balloon, label1, label2, label3, 4);
							break;
					}
				} else {
					// Do you have the time?
					var nowDate = new Date();
					var nowHour = nowDate.getHours().toString();
					var nowMinute = nowDate.getMinutes().toString();
					if (nowMinute.length == 1) {
						nowMinute = "0" + nowMinute;
					}
					this.changeStyle(box, balloon, label1, label2, label3, 1, nowHour, nowMinute);
				}
				balloon.removeAttribute("hidden");
				box.setAttribute("adiaryTanClicked", true);
			}
		}
	},

	openWebsite : function(aURL) {
		window.close();
		window.opener.getBrowser().selectedTab = window.opener.getBrowser().addTab(aURL);
	}
};
