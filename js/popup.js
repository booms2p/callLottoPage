// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */

/**
 * @param {string} searchTerm - Search term for Google Image search.
 * @param {function(string,number,number)} callback - Called when an image has
 *   been found. The callback gets the URL, width and height of the image.
 * @param {function(string)} errorCallback - Called when the image is not found.
 *   The callback gets a string that describes the failure reason.
 */
let startCall = false;

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('status').innerHTML = 'กด START เพื่อเริ่มการทำงาน';

    // checkUrl();
    document.getElementById("startBtn").disabled = false;
    document.getElementById('startBtn').addEventListener('click', function() {
        start();
    });

    document.getElementById("stopBtn").disabled = true;
    document.getElementById('stopBtn').addEventListener('click', function(){
        stop();
    });
});

chrome.tabs.onUpdated.addListener(function(tabId, info) {
    if (info.status == "complete" & startCall == true) {
    
        checkUrl();
    }
});

function start() {
    startCall = true;
    document.getElementById("stopBtn").disabled = false;
    document.getElementById("startBtn").disabled = true;
    checkUrl();
};

function stop() {
    startCall = false;
    document.getElementById("stopBtn").disabled = true;
    document.getElementById("startBtn").disabled = false;
    checkUrl();
};

function checkUrl () {
    var queryInfo = {
            active: true,
            currentWindow: true
        };

        chrome.tabs.query(queryInfo, function(tabs) {
            var tablink = tabs[0].url;
            if (tablink != 'https://www.lotto.ktbnetbank.com/KTBLotto/#/login' && startCall == true) {
                document.getElementById('status').innerHTML = 'กำลังโหลดหน้า login';
                chrome.tabs.getSelected(null, function(tab) {
                    var code = 'location.replace("https://www.lotto.ktbnetbank.com/KTBLotto/#/login");';
                    chrome.tabs.executeScript(tab.id, { code: code });
                });
            } else{
                document.getElementById('status').innerHTML = 'เข้าหน้า login เรียบร้อย';
            }

            if (startCall == false) {
                document.getElementById('status').innerHTML = 'กด START เพื่อเริ่มการทำงาน';
            }
        });
}