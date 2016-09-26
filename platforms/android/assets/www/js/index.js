/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
	// Application Constructor
	initialize: function () {
		this.bindEvents();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents: function () {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicitly call 'app.receivedEvent(...);'
	onDeviceReady: function () {

		function onSuccess(allcontacts) {
			var str = "",
				mPage = "",
				phoneNumberList = "",
				phones = "",
				emailList = "",
				emails = "",
				sortContact = function (array) {
					return array.sort(function (a, b) {
						var x = a.name.formatted;
						var y = b.name.formatted;
						return ((x < y) ? -1 : ((x > y) ? 1 : 0));
					});
				},
				contacts = sortContact(allcontacts);
			for (i = 0; i < contacts.length; i++) {
				// if(contacts[i].name.formatted != '') {
				//fetch phonenumber
				phoneNumberList = "";
				phones = "";
				if (contacts[i].phoneNumbers) {
					for (j = 0; j < contacts[i].phoneNumbers.length; j++) {
						phoneNumberList += '<ons-list-item><span style="color:#4f81bb;">' + contacts[i].phoneNumbers[j].type + '</span> ' + contacts[i].phoneNumbers[j].value + '</ons-list-item>\n';
						phones += "\\t" + contacts[i].phoneNumbers[j].type + ": " + contacts[i].phoneNumbers[j].value + "\\n";
					}
				} else {
					phoneNumberList = "";
					phones = "";
				}
				//fetch email
				emailList = "";
				emails = "";
				if (contacts[i].emails) {
					for (j = 0; j < contacts[i].emails.length; j++) {
						emailList += '<ons-list-item><span style="color:#4f81bb;">' + contacts[i].emails[j].type + '</span> ' + contacts[i].emails[j].value + '</ons-list-item>\n';
						emails += "\\t" + contacts[i].emails[j].type + ": " + contacts[i].emails[j].value + "\\n";
					}
				} else {
					emailList = "";
					emails = "";
				}
				//make HTML string
				str += '<ons-list-item modifier="tappable" onclick="myNavigator.pushPage(\'page_' + i + '\', { animation : \'slide\' } )">' + contacts[i].name.formatted + '</ons-list-item>\n';
				mPage += '<ons-template id="page_' + i + '"><ons-page><ons-toolbar fixed-style><div class="left" style="line-height: 44px"><ons-back-button>All Contacts</ons-back-button></div></ons-toolbar><ons-scroller style="margin-left:30px;"><br /><b style="font-size:150%;">' + contacts[i].name.formatted + '</b><ons-list style="margin-top:40px;">' + (phoneNumberList !== "" ? "<ons-list-header>Phone</ons-list-header>" + phoneNumberList : "") + (emailList !== "" ? "<ons-list-header>Email</ons-list-header>" + emailList : "") + '</ons-list><div style="text-align: center"><br /><button class="button button--outline" onclick="window.plugins.socialsharing.share(\'This is ' + contacts[i].name.formatted + '\\\'s Contact Infomation\\n\\n' + (phones !== "" ? "Phone\\n" + phones + "\\n" : "") + (emails !== "" ? "Email\\n" + emails : "") + '\', \'' + contacts[i].name.formatted + '\\\'s Contact Infomation\')">Share Contact</button></div></ons-scroller></ons-page></ons-template>\n';
				// }
			}
			var content = document.getElementById('contact-list');
			content.innerHTML = str;
			ons.compile(content);
			var content2 = document.body;
			content2.innerHTML += mPage;
			ons.compile(content2);
		}

		function onError(contactError) {
			alert('onError!');
		}

		var options = new ContactFindOptions();
		options.filter = "";
		options.multiple = true;
		filter = ["name", "phoneNumbers", "emails"];
		navigator.contacts.find(filter, onSuccess, onError, options);
	}
};
