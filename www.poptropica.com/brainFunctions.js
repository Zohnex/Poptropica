/* @version CVS $Id: brainFunctions.js 39973 2012-07-15 00:53:59Z svnsync $ */
function createRequestObject() {
    var tmpXmlHttpObject;
    
    if (window.XMLHttpRequest) { 
        // Mozilla, Safari
        tmpXmlHttpObject = new XMLHttpRequest();
	
    } else if (window.ActiveXObject) { 
        // IE 
        tmpXmlHttpObject = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    return tmpXmlHttpObject;
}

var http = createRequestObject();

function brainImpression(event, campaign, gender, grade, choice) {

    http.open('get', '/brain/track.php?event=' + event + '&campaign=' + campaign + '&gender=' + gender + '&grade=' + grade + '&choice=' + choice);
    http.send(null);
}

/**
 * Track one event.
 *
 * @param string event - event name
 * @param object params - event parameters, as an object. E.g.
 *        { gender:"M", grade:7, lang:"en", ... }
 * Parameters may be chosen from
 *  brain
 *  campaign
 *  choice
 *  subchoice
 *  cluster
 *  event
 *  game
 *  gender
 *  grade
 *  lang
 *  scene
 *  country
 */
function trackEvent(event, params, async) {
    var req = '/brain/track.php?event=' + encodeURIComponent(event);
    for (var field in params) {
	req += '&' + field + '=' + encodeURIComponent(params[field]);
    }
    req += '&randomNumber=' + Math.random();
    http.open('GET', req, async);
    http.send(null);
    return true;
}

function trackStoreEvent(event, subevent, grade, gender, country) {
    var params = {'choice':event };
    if (subevent) params['subchoice'] = subevent;
    if (grade != null && grade != '') params['grade'] = grade;
    if (gender) params['gender'] = gender;
    if (country) params['country'] = country;
    // If called from onSubmit or a link click, an async xfer often never completes
    trackEvent('StoreEvent', params, false);
    return true;
}
