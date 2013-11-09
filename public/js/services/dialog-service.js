app.service('dialogService',
function dialogService($rootScope, $compile, $document, $http, $templateCache, $q, $log, $timeout) {
	// add dialog widget to the end of body
	var body = $document.find('body');
	var allDialogs = [];
	var openDialogs = [];
	var counter = 0;
	var dialogWidget = angular.element('<div dialog-generator></div>');
	var bScope = body.scope();
	/**
	 *  Constructor function for creation of dialogues
	 * @param template {String}
	 * @param className {String}
	 * @param ctrl {Function|Object} function will be used as controller, if object is provided, new function will be created with $scope extended
	 * @param disposable {boolean} if you want a dialogue that is destroyed rather than just dismissed, let the constructor know in this param
	 * @returns {Dialog}
	 * @constructor
	 */
	var Dialog = function(template, className, ctrl, disposable)
	{
		var self = this;
		counter += 1;
		this.id = counter;
		this.name= template;
		this.template = '/templates/dialogs/'+template+'.html';
		this.className = className;
		if (angular.isObject(ctrl)) {
			var ctrlFn = function($scope){  // creates simple controller for dialog
				angular.extend($scope, ctrl);
				self.$scope = $scope;
			};
			this.controller = ctrlFn;
		}
		if (angular.isFunction(ctrl)) {
			this.controller = ctrl;
		}
		this.registeredEventHandlers = {
			hide: [],
			destroy: [],
			open: []
		};

		this.fireEvent = function(evName, context){
			var arr = this.registeredEventHandlers[evName];
			context = context || this;
			for (var i=0;i<arr.length;i++){
				arr[i].call(context);
			}
		};

		this.isOpen = false;
		this.isDestroyed = false;
		this.busy = false;  // if busy, we can't call open/dismiss
		this.banDismiss = false;  // if true, dismiss is ignored
		if (disposable) {
			this.onEscapeKeyUp = this.hide;
		}
		this.linkDeferred = $q.defer();

		if (this.name) {
			var name = this.name + ', id ' + this.id;
			var dialog = this;
			$http.get(this.template, {cache: $templateCache})
				.success(function (response) {
					allDialogs.push(dialog);
					$log.log("dialog template " + name + " loaded");
				}).error(function () {
					dialog.linkDeferred.reject();
					allDialogs.push(dialog);
					$log.warn("Dialog template was not loaded");
				});
		} else {
			$log.error("Dialog template was not specified");
		}

		/* return dialog ID */
		return this;
	};
	// OPENING
	var open = function(dialog){
		if (dialog.busy) {
			$log.log("calling open more than once in short time frame on dialog " + dialog.name);
			return false;   // call to dialog.open is ignored
		}
		if (!dialog.isOpen) {
			if (!dialog.isDestroyed) {
				dialog.busy = true;
				openDialogs.push(dialog);
				dialog.linkDeferred.promise.then(function () {
					dialog.showModal();
				});
			} else {
				$log.error("dialog " + dialog.name + " with id "+ dialog.id + " was destroyed, cannot open");
			}
		} else {
			$log.log("dialog " + dialog.name + " with id "+ dialog.id + " is open, open canceled");
		}
		return true;
	};

	Dialog.prototype.isLastOpened = function (dialog) {
		var self = dialog || this;
		if (self === openDialogs.last) {
			return true;
		}
		return false;
	};

	Dialog.prototype.open = function (e) {
		e && e.preventDefault();
		return open(this);
	};

	Dialog.prototype.modalOpt = {
		show: true,
		backdrop: false,
		keyboard: false
	};

	/**
	 * hides all dialogs before opening
	 */
	Dialog.prototype.exclusiveOpen = function(){
		var index = openDialogs.length;
		while(index--){
			var dial = openDialogs[index];
			if (this !== dial) {
				dial.hide();
			}
		}
		open(this);
	};

	// CLOSING
	var dismiss = function (dialog, callback) {
		if (dialog.isOpen && (dialog.banDismiss !== true)) {
			var index = allDialogs.indexOf(self);
			openDialogs.splice(index, 1);
			dialog.fireEvent('hide', dialog);
			dialog.hideModal(callback);
		} else {
			$log.log("dialog " + dialog.name + ' cannot be dismissed' );
		}

		if (!openDialogs.length) {
			$rootScope.$emit('allDialogsDismissed');
		}
	};

	var hide = function () {
		dismiss(this);    //default behaviour on click to backdrop is dismissal
	};
	Dialog.prototype.hide = hide;
	Dialog.prototype.onEscapeKeyUp = hide;
	Dialog.prototype.onBackdropClick = hide;

	Dialog.prototype.destroy = function () {    // not only closes, but also removes from the dom
		var self = this;
		var finishDestroy = function () {
			if (allDialogs.contains(self)) {
				$log.log("destroying dialog " + self.name + " with id "+ self.id);
				self.isDestroyed = true;
				allDialogs.remove(self);
				self.fireEvent('destroy', self);
			} else {
				$log.error("could not destroy " + self.name + " with id "+ self.id);
			}
		};
		if (self.isOpen) {
			dismiss(this, finishDestroy);   // we have to dismiss it and after the fade, the destroy shall finish
		} else {    //when the modal is already closed, we just remove it
			finishDestroy();
		}

	};
	/**
	 * Registers an event handler to be called when dialog event is fired
	 * @param evName {String}
	 * @param fn {Function}
	 * @returns {Dialog}
	 */
	Dialog.prototype.on = function(evName, fn) {
		if (angular.isFunction(fn) && this.registeredEventHandlers[evName]) {
			this.registeredEventHandlers[evName].push(fn);
			return this;
		}
	};

	// SERVICE methods
	this.getOpen = function () {
		return openDialogs;
	};

	this.create = function(template, className, data, disposable){
		return new Dialog(template, className, data, disposable);
	};

	this.allDialogs = function()
	{
		return allDialogs;
	};

	this.getByProp = function (prop, val) {
		var r = allDialogs.filter(function (d) {
			return d[prop] === val;
		});
		if (r.isEmpty) {
			return null;
		}
		return r;
	};

	this.getByName = function (name) {
		return this.getByProp('name', name);
	};

	this.getById = function (id) {
		return this.getByProp('id', id)[0];
	};

	this.getByClass = function (cl) {
		return this.getByProp('class', cl);
	};

	this.backdropClick = function(){
		var dialog = openDialogs.last;
		if (dialog.isOpen) {
			dialog.onBackdropClick && dialog.onBackdropClick();
		}
	};

	bScope.dialogService = this;
	$compile(dialogWidget.prependTo(body))(bScope);

	return this;

})
.directive('dialogGenerator', function() {    //cannot be used directly, just helper for dialogService
	return {
		replace: true,
		restrict: 'A',
		priority: 50,
		templateUrl: '/templates/dialog-gen.html'
	};
})
.directive('singleDialog', function( $parse, dialogService, $log, $timeout) {    //don't use directly, just helper for dialogService
	return {
		priority: 200,
		link: function (scope, element, attrs) {

			var dialogName = $parse(attrs.id)(scope);
			var dId = $parse(attrs.dialogid)(scope);

			element.attr('id', dialogName);
			element.attr('dialogid', dId);
			var dialog = dialogService.getById(dId);

			dialog.showModal = function () {
				if (dialogService.getOpen().length === 1) {
					dialog.modalOpt = {     //overwrites the prototype's
						show: true,
						backdrop: true,
						keyboard: false
					};
				}
				dialog.isOpen = true;

				element.one('shown.bs.modal',
					function () {
						dialog.busy = false;
						if(!scope.$$phase) {
							scope.$apply();
						}

					}
				);

				element.keyup(
					function (e) {
						e.keyCode == 27 && dialog.onEscapeKeyUp();
					}
				);

				element.modal(dialog.modalOpt);

				element.one('hide.bs.modal', function () {
				// we have to keep an eye for this because someone might use data-dismiss="modal" for closing button
						dialog.hide();
					}
				);

				if (element.data('bs.modal').$backdrop) {
					element.data('bs.modal').$backdrop.unbind('click.hideBackdrop');
					element.data('bs.modal').$backdrop.click(dialogService.backdropClick);
				}
				$log.info("opening dialog " + dialogName + " with id " + dId);

			};

			dialog.hideModal = function (callback) {
				dialog.busy = true;
				element.unbind('hide.bs.modal');
				element.unbind('keyup');
				element.one('hidden.bs.modal', function(){
					//$log.log("dialog " + dialogName + " with id " + dId + " hidden event fired");
					dialog.busy = false;
					if(!scope.$$phase) {
						scope.$apply(function () {
								if (callback) {
									callback.apply(this, arguments);
								}
							}
						);
					}
				}).modal('hide');
				dialog.isOpen = false;
				$log.info("hiding dialog " + dialogName + " with id " + dId);
			};

			dialog.linkDeferred.resolve();

		}

	};
});
