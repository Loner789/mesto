(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._baseUrl=e.baseUrl,this._headers=e.headers}var n,r;return n=t,(r=[{key:"_checkResult",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}},{key:"getInitialCards",value:function(){return fetch("".concat(this._baseUrl,"/cards"),{method:"GET",headers:this._headers}).then(this._checkResult)}},{key:"getUserInfo",value:function(){return fetch("".concat(this._baseUrl,"/users/me"),{method:"GET",headers:this._headers}).then(this._checkResult)}},{key:"setUserInfo",value:function(e){return fetch("".concat(this._baseUrl,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e.name,about:e.about})}).then(this._checkResult)}},{key:"addNewCard",value:function(e){return fetch("".concat(this._baseUrl,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:e.name,link:e.link})}).then(this._checkResult)}},{key:"deleteCard",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e),{method:"DELETE",headers:this._headers}).then(this._checkResult)}},{key:"addLike",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e,"/likes"),{method:"PUT",headers:this._headers}).then(this._checkResult)}},{key:"deleteLike",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e,"/likes"),{method:"DELETE",headers:this._headers}).then(this._checkResult)}},{key:"setUserAvatar",value:function(e){return fetch("".concat(this._baseUrl,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e.avatar})}).then(this._checkResult)}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._formSelector=t.formSelector,this._inputSelector=t.inputSelector,this._submitButtonSelector=t.submitButtonSelector,this._inactiveButtonClass=t.inactiveButtonClass,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass,this._formElement=n,this._inputsList=Array.from(this._formElement.querySelectorAll(this._inputSelector)),this._buttonElement=this._formElement.querySelector(this._submitButtonSelector)}var t,r;return t=e,(r=[{key:"_showInputError",value:function(e){e.classList.add(this._inputErrorClass),this._errorElement.classList.add(this._errorClass),this._errorElement.textContent=e.validationMessage}},{key:"_hideInputError",value:function(e){e.classList.remove(this._inputErrorClass),this._errorElement.classList.remove(this._errorClass),this._errorElement.textContent=""}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e)}},{key:"_checkInvalidInputs",value:function(){return this._inputsList.some((function(e){return!e.validity.valid}))}},{key:"_toggleButtonState",value:function(){this._checkInvalidInputs()?this.disableButton():this.enableButton()}},{key:"_setEventListeners",value:function(){var e=this;this._toggleButtonState(),this._inputsList.forEach((function(t){t.addEventListener("input",(function(){e._errorElement=e._formElement.querySelector(".".concat(t.id,"-error")),e._checkInputValidity(t),e._toggleButtonState()}))}))}},{key:"clearErrors",value:function(){var e=this;this._inputsList.forEach((function(t){e._errorElement=e._formElement.querySelector(".".concat(t.id,"-error")),e._hideInputError(t)}))}},{key:"enableButton",value:function(){this._buttonElement.classList.remove(this._inactiveButtonClass),this._buttonElement.disabled=!1}},{key:"disableButton",value:function(){this._buttonElement.classList.add(this._inactiveButtonClass),this._buttonElement.disabled=!0}},{key:"enableValidation",value:function(){this._setEventListeners()}}])&&n(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=function(){function e(t,n){var r=t.data,o=t.handleCardClick,i=t.handleDeletion,a=t.setLike,u=t.removeLike,c=t.userId;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=r.name,this._link=r.link,this._cardId=r._id,this._ownerId=r.owner._id,this._likes=r.likes,this._cardSelector=n,this._handleCardClick=o,this._handleDeletion=i,this._addLike=a,this._removeLike=u,this._userId=c}var t,n;return t=e,(n=[{key:"_getTemplate",value:function(){return document.querySelector(this._cardSelector).content.querySelector(".place").cloneNode(!0)}},{key:"switchLike",value:function(){this._likeButton.classList.toggle("place__like-button_active")}},{key:"deleteCard",value:function(){this._element.remove()}},{key:"_setEventListeners",value:function(){var e=this;this._likeButton=this._element.querySelector(".place__like-button"),this._deleteButton=this._element.querySelector(".place__delete-button"),this._likeButton.addEventListener("click",(function(){e._handleLikeButton()})),this._deleteButton.addEventListener("click",(function(){e._handleDeletion()})),this._cardImage.addEventListener("click",(function(){e._handleCardClick()}))}},{key:"_hideDeleteButton",value:function(){this._ownerId!==this._userId&&(this._deleteButton.style.display="none")}},{key:"_handleLikeButton",value:function(){this._likeButton.classList.contains("place__like-button_active")?this._removeLike():this._addLike()}},{key:"setLikesCount",value:function(e){this._element.querySelector(".place__likes-counter").textContent=e}},{key:"generateCard",value:function(){var e=this;return this._element=this._getTemplate(),this._cardCaption=this._element.querySelector(".place__caption-title"),this._cardImage=this._element.querySelector(".place__image"),this._cardCaption.textContent=this._name,this._cardImage.alt="Фото ".concat(this._name,"."),this._cardImage.src=this._link,this._setEventListeners(),this._likes.find((function(t){return e._userId===t._id}))&&this.switchLike(),this.setLikesCount(this._likes.length),this._hideDeleteButton(),this._element}}])&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var u=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._handleEscClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"setEventListeners",value:function(){var e=this;this._popup.addEventListener("mousedown",(function(t){e._closeButton=t.target.classList.contains("popup__container-discard"),e._overlay=t.target.classList.contains("popup_opened"),(e._closeButton||e._overlay)&&e.close()}))}}])&&a(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function c(e){return c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c(e)}function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(){return l="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=f(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},l.apply(this,arguments)}function f(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=d(e)););return e}function p(e,t){return p=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},p(e,t)}function h(e,t){if(t&&("object"===c(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function d(e){return d=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},d(e)}var _=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&p(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=d(r);if(o){var n=d(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return h(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._popupImage=t._popup.querySelector(".popup__image"),t._popupCaption=t._popup.querySelector(".popup__image-caption"),t}return t=a,(n=[{key:"open",value:function(e){l(d(a.prototype),"open",this).call(this),this._popupCaption.textContent=e.name,this._popupImage.alt="Фото ".concat(e.name,"."),this._popupImage.src=e.link}}])&&s(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(u);function y(e){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},y(e)}function b(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function v(){return v="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=m(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},v.apply(this,arguments)}function m(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=w(e)););return e}function k(e,t){return k=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},k(e,t)}function g(e,t){if(t&&("object"===y(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function w(e){return w=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},w(e)}var E=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&k(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=w(r);if(o){var n=w(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return g(this,e)});function a(e,t){var n,r=e.handleFormSubmit;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,t))._handleFormSubmit=r,n._form=n._popup.querySelector(".popup__container"),n._formInputs=n._form.querySelectorAll(".popup__container-input"),n._submitButton=n._form.querySelector(".popup__container-submit"),n._submitButtonText=n._submitButton.textContent,n}return t=a,(n=[{key:"_getInputValues",value:function(){var e=this;return this._inputsValues={},this._formInputs.forEach((function(t){e._inputsValues[t.name]=t.value})),this._inputsValues}},{key:"setEventListeners",value:function(){var e=this;v(w(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(t){t.preventDefault(),e._handleFormSubmit(e._getInputValues())}))}},{key:"renderLoading",value:function(e){e?this._submitButton.textContent="Сохранение...":(this.close(),this._submitButton.textContent=this._submitButtonText)}},{key:"close",value:function(){v(w(a.prototype),"close",this).call(this),this._form.reset()}}])&&b(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(u);function S(e){return S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},S(e)}function L(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function O(){return O="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=C(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},O.apply(this,arguments)}function C(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=P(e)););return e}function j(e,t){return j=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},j(e,t)}function I(e,t){if(t&&("object"===S(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function P(e){return P=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},P(e)}var B=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&j(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=P(r);if(o){var n=P(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return I(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._form=t._popup.querySelector(".popup__container"),t._submitButton=t._form.querySelector(".popup__container-submit"),t._submitButtonText=t._submitButton.textContent,t}return t=a,(n=[{key:"setSubmitAction",value:function(e){this._handleFormSubmit=e}},{key:"setEventListeners",value:function(){var e=this;O(P(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(t){t.preventDefault(),e._handleFormSubmit()}))}},{key:"renderLoadingDelete",value:function(e){this._submitButton.textContent=e?"Удаление...":this._submitButtonText}}])&&L(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(u);function R(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var q=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderedItems=r,this._renderer=o,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"_clear",value:function(){this._container.innerHTML=""}},{key:"renderItems",value:function(e){var t=this;this._clear(),e.forEach((function(e){t._renderer(e)}))}},{key:"addItem",value:function(e){this._container.prepend(e)}}])&&R(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function T(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var U=function(){function e(t){var n=t.userName,r=t.userInfo,o=t.userAvatar;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._userName=document.querySelector(n),this._userInfo=document.querySelector(r),this._userAvatar=document.querySelector(o)}var t,n;return t=e,(n=[{key:"setUserAvatar",value:function(e){this._userAvatar.src=e.avatar}},{key:"getUserInfo",value:function(){return this._userData={name:this._userName.textContent,about:this._userInfo.textContent},this._userData}},{key:"setUserInfo",value:function(e){this._userName.textContent=e.name,this._userInfo.textContent=e.about,this._userAvatar.src=e.avatar}}])&&T(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),x={formSelector:".popup__container",inputSelector:".popup__container-input",submitButtonSelector:".popup__container-submit",inactiveButtonClass:"popup__container-submit_disabled",inputErrorClass:"popup__container-input_invalid",errorClass:"popup__container-input-error_visible"},A=document.querySelector("#edit_profile_popup"),D=document.querySelector("#edit_profile_form"),N=document.querySelector(".profile__edit-button"),V=A.querySelector("#profile-name"),F=A.querySelector("#profile-job"),H=document.querySelector("#add_card_form"),J=document.querySelector(".profile__add-button"),M=document.querySelector("#edit_avatar_form"),G=document.querySelector(".profile__img-wrapper");function z(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function $(e){var t=new i({data:e,handleCardClick:function(){Z.open(e)},handleDeletion:function(){ee.open(),ee.setSubmitAction((function(){ee.renderLoadingDelete(!0),K.deleteCard(e._id).then((function(){t.deleteCard(),ee.close()})).catch((function(e){return console.log(e)})).finally(ee.renderLoadingDelete(!1))}))},setLike:function(){K.addLike(e._id).then((function(e){t.switchLike(),t.setLikesCount(e.likes.length)})).catch((function(e){return console.log(e)}))},removeLike:function(){K.deleteLike(e._id).then((function(e){t.switchLike(),t.setLikesCount(e.likes.length)})).catch((function(e){return console.log(e)}))},userId:te},".card-template");return t}var K=new t({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-47",headers:{authorization:"b01e7d69-f440-4376-9f8a-91f4cbf1fc4f","Content-Type":"application/json"}}),Q=new U({userName:".profile__title",userInfo:".profile__subtitle",userAvatar:".profile__avatar"}),W=new E({handleFormSubmit:function(e){W.renderLoading(!0),K.setUserInfo(e).then((function(e){Q.setUserInfo(e),W.close()})).catch((function(e){return console.log(e)})).finally((function(){W.renderLoading(!1)}))}},"#edit_profile_popup");W.setEventListeners();var X=new E({handleFormSubmit:function(e){X.renderLoading(!0),K.addNewCard(e).then((function(e){var t=$(e).generateCard();ne.addItem(t),X.close()})).catch((function(e){return console.log(e)})).finally((function(){X.renderLoading(!1)})),X.close()}},"#add_card_popup");X.setEventListeners();var Y=new E({handleFormSubmit:function(e){Y.renderLoading(!0),K.setUserAvatar(e).then((function(e){Q.setUserAvatar(e),Y.close()})).catch((function(e){return console.log(e)})).finally((function(){Y.renderLoading(!1)}))}},"#edit_avatar_popup");Y.setEventListeners();var Z=new _("#image_popup");Z.setEventListeners();var ee=new B("#card_deletion_popup");ee.setEventListeners();var te,ne=new q({renderer:function(e){var t=$(e).generateCard();ne.addItem(t)}},".places");Promise.all([K.getUserInfo(),K.getInitialCards()]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,u=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){u=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(u)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return z(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?z(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];return Q.setUserInfo(o),te=o._id,ne.renderItems(i)})).catch((function(e){return console.log(e)}));var re=new r(x,D);re.enableValidation();var oe=new r(x,H);oe.enableValidation();var ie=new r(x,M);ie.enableValidation(),N.addEventListener("click",(function(){var e=Q.getUserInfo();V.value=e.name,F.value=e.about,re.clearErrors(),re.enableButton(),W.open()})),J.addEventListener("click",(function(){oe.disableButton(),oe.clearErrors(),H.reset(),X.open()})),G.addEventListener("click",(function(){ie.disableButton(),ie.clearErrors(),M.reset(),Y.open()}))})();