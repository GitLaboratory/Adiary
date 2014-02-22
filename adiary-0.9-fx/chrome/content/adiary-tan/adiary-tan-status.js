var adiaryTanProgressListener = {
  QueryInterface: function(aIID) {
    if (aIID.equals(Components.interfaces.nsIWebProgressListener) ||
        aIID.equals(Components.interfaces.nsISupportsWeakReference) ||
        aIID.equals(Components.interfaces.nsISupports)) {
      return this;
    }
    throw Components.results.NS_NOINTERFACE;
  },

  onStateChange: function(aProgress, aRequest, aFlag, aStatus) {
    if (aFlag & Components.interfaces.nsIWebProgressListener.STATE_STOP &&
        aFlag & Components.interfaces.nsIWebProgressListener.STATE_IS_NETWORK) {
      adiaryTanStatus.showStatus();
    }
  },

  onLocationChange: function(aProgress, aRequest, aURI) {
    adiaryTanStatus.showStatus();
  },

  onProgressChange: function() {},
  onStatusChange: function() {},
  onSecurityChange: function() {},
  onLinkIconAvailable: function() {}
};

var adiaryTanStatus = {
  init: function() {
    // Listen for webpage loads
    gBrowser.addProgressListener(adiaryTanProgressListener,
                                 Components.interfaces.nsIWebProgress
                                                      .NOTIFY_STATE_DOCUMENT);
  },
  
  uninit: function() {
    gBrowser.removeProgressListener(adiaryTanProgressListener);
  },

  showStatus: function() {
    if (typeof(content.document) == "undefined") {
      return;
    }

    var metaCollection = content.document.getElementsByTagName("meta");
    var panel = document.getElementById("adiaryTanStatus");
    var isAdiary = false;
    var adiaryVersion = "";

    if (panel) {
      // Is this page made by adiary?
      for (var i = 0; i < metaCollection.length; i++) {
        if (metaCollection[i].name.search(/^generator$/) != -1 &&
            metaCollection[i].content.search(/^adiary/) != -1) {
          isAdiary = true;
          adiaryVersion = metaCollection[i].content.replace(/^adiary /, "");
        }
      }

      // Modify status
      if (isAdiary) {
        panel.setAttribute("tooltiptext", adiaryVersion);
        panel.removeAttribute("hidden");
      } else {
        panel.setAttribute("hidden", true);
      }
    }

    return;
  }
};

window.addEventListener("load", function() { adiaryTanStatus.init() },
                        false);
window.addEventListener("unload", function() { adiaryTanStatus.uninit() },
                        false);
