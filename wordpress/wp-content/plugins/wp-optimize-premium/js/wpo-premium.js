jQuery(document).ready(function ($) {
	WP_Optimize_Premium = WP_Optimize_Premium();
});

/**
 * Main WP_Optimize_Premium - handle Premium features.
 */
var WP_Optimize_Premium = function() {
	var $ = jQuery,
		send_command = WP_Optimize.send_command,
		optimization_get_info = WP_Optimize.optimization_get_info,
		take_a_backup_with_updraftplus = WP_Optimize.take_a_backup_with_updraftplus,
		save_auto_backup_options = WP_Optimize.save_auto_backup_options;

	console.log('Loading WP-O Premium');

	/**
	 * Wrapper for send_command() using especially for unused images trash commands.
	 *
	 * @param {string}   action     The action to send
	 * @param {[type]}   data       Data to send
	 * @param {Function} callback   Will be called with the results
	 */
	function trash_manager_send_command(action, data, callback) {
		if (!data) {
			data = {};
		}

		data['images_trash_command'] = action;

		send_command('images_trash_command', data, callback);
	}

	/**
	 * Returns true if settings tab active.
	 *
	 * @return {boolean}
	 */
	function is_tab_active(tab) {
		var is_active = $('#wp-optimize-wrap .nav-tab-wrapper .nav-tab-active').is(['#wp-optimize-nav-tab-', tab].join(''));
		console.log(['Checking if ',tab,' active. Result: ',(is_active ? 'TRUE' : 'FALSE')].join(''));
		return is_active;
	}

	/**
	 * Variables for image optimization.
	 */
	var unused_images_tab_container = $('#wp-optimize-nav-tab-wpo_images-unused-contents'),
		unused_images_container = $('#wpo_unused_images'),
		unused_images_trash_container = $('#wpo_unused_images_trash'),
		unused_images_view_images_btn = $('#wpo_unused_images_view_images_btn'),
		unused_images_view_trash_btn = $('#wpo_unused_images_view_trash_btn'),
		restore_unused_images_from_trash_btn = $('#wpo_restore_unused_images_from_trash_btn'),
		unused_images_progress_message = $('#wpo_shade_progress_message'),
		remove_unused_images_btn = $('#wpo_remove_unused_images_btn'),
		move_unused_images_to_trash_btn = $('#wpo_move_unused_images_to_trash_btn'),
		remove_selected_sizes_btn = $('#wpo_remove_selected_sizes_btn'),
		unused_images_refresh_btn = $('#wpo_unused_images_refresh'),
		unused_images_select_all_btn = $('#wpo_unused_images_select_all'),
		unused_images_select_none_btn = $('#wpo_unused_images_select_none'),
		unused_images_optimization_message = $('#optimization_info_images'),
		sites_select_container = $('#wpo_unused_images_sites_select_container'),
		sites_select = $('#wpo_unused_images_sites_select'),
		take_a_backup_checkbox1 = $('#enable-auto-backup-2'),
		take_a_backup_checkbox2 = $('#enable-auto-backup-3'),

		unused_images_view = new WP_Optimize_Images_View({
			container: unused_images_container,
			related_elements: [
				$('.wpo-unused-images-el'),
				$('.wpo-image-sizes-section'),
				$('#wpo_unused_images_loaded_count'),
				$('#wpo_unused_images_refresh')
			],
			action_buttons: [
				remove_unused_images_btn,
				move_unused_images_to_trash_btn,
			],
			hide_when_empty: [
				$('#wpo_unused_images_control_panel')
			],
			load_next_page_callback: load_unused_images_next_page
		}),
		unused_images_trash_view = new WP_Optimize_Images_View({
			container: unused_images_trash_container,
			related_elements: [
				$('.wpo-unused-images-trash-el')
			],
			action_buttons: [
				restore_unused_images_from_trash_btn
			],
			hide_when_empty: [
				$('#wpo_unused_images_control_panel')
			],
			load_next_page_callback: load_unused_images_trash_next_page
		}),

		unused_images_tab_loaded = false,
		optimization_checkbox_images_val = false,
		images_loaded_count = {},
		images_loaded_count_text = {},

		last_load_status = {},
		last_load_trash_status = {},

		IMAGES_LOAD_STATUS = {
			COMPLETE: 'complete',
			SUCCESS: 'success',
			FAILURE: 'failure',
			BUSY: 'busy'
		},
		IMAGES_EVENTS = {
			GET_INFO_START: 'optimization_get_info_images_start',
			GET_INFO_PROCESS: 'optimization_get_info_images',
			GET_INFO_DONE: 'optimization_get_info_images_done',
			OPTIMIZATION_START: 'do_optimization_images_start',
			OPTIMIZATION_DONE: 'do_optimization_images_done'
		};

	/**
	 * Called on images tab activated and load content if need.
	 *
	 * @return void
	 */
	function images_tab_activated() {
		if (unused_images_tab_loaded) return;
		unused_images_tab_loaded = true;

		unused_images_view.show();
		unused_images_trash_view.hide();

		load_unused_images();
	}

	/**
	 * Handle switch to unused images trash view
	 */
	unused_images_view_trash_btn.on('click', function() {
		unused_images_view_trash_btn.hide();
		unused_images_view_images_btn.show();

		unused_images_view.hide();
		unused_images_trash_view.show();

		unused_images_tab_container.addClass('wpo-unused-images-trash-view');

		// if this view has new information then reload it.
		if (unused_images_view_trash_btn.data('dirty')) {
			unused_images_view_trash_btn.data('dirty', false);
			unused_images_trash_reload();
		}

		return false;
	});

	/**
	 * Handle switch to unused images trash view
	 */
	unused_images_view_images_btn.on('click', function() {
		unused_images_view_images_btn.hide();
		unused_images_view_trash_btn.show();

		unused_images_trash_view.hide();
		unused_images_view.show();

		unused_images_tab_container.removeClass('wpo-unused-images-trash-view');

		// if this view has new information then reload it.
		if (unused_images_view_images_btn.data('dirty')) {
			unused_images_view_images_btn.data('dirty', false);
			// refresh images list
			unused_images_refresh_btn.trigger('click');
		}

		return false;
	});


	/**
	 * Handle images optimization get info start event.
	 */
	$(document).on(IMAGES_EVENTS.GET_INFO_START, function() {
		unused_images_optimization_message.html('...');
		unused_images_progress_message.html('');
		unused_images_refresh_btn.prop('disabled', true);
		$('.wpo_shade').show();
		$('.wpo_unused_images_loader').show();
		disable_image_optimization_controls(true);
	});

	/**
	 * Handle images optimization get info process event.
	 */
	$(document).on(IMAGES_EVENTS.GET_INFO_PROCESS, function(event, message) {
		unused_images_optimization_message.html(message);
		if (!unused_images_tab_loaded) return;
		unused_images_progress_message.html(message);
	});

	/**
	 * Handle images optimization get info done event.
	 */
	$(document).on(IMAGES_EVENTS.GET_INFO_DONE, function(event, data) {
		$('.wpo_unused_images_loader').hide();
		$('.wpo_shade').hide();
		unused_images_refresh_btn.prop('disabled', false);
		if (data && data.hasOwnProperty('result') && data.result.hasOwnProperty('output')) {
			unused_images_optimization_message.html(data.result.output.join('<br>'));
		} else {
			unused_images_optimization_message.html('');
		}

		if (!unused_images_tab_loaded) {
			disable_image_optimization_controls(false);
		} else {
			handle_response_from_image_optimization(data, update_unused_images_view);
			disable_image_optimization_controls(false);
		}
	});

	/**
	 * Handle images optimization start event.
	 */
	$(document).on(IMAGES_EVENTS.OPTIMIZATION_START, function() {
		unused_images_tab_loaded = true;
		$('.wpo_unused_images_loader').show();
		disable_image_optimization_controls(true);
	});

	/**
	 * Handle images optimization done event.
	 */
	$(document).on(IMAGES_EVENTS.OPTIMIZATION_DONE, function(event, data) {
		$('.wpo_unused_images_loader').hide();
		disable_image_optimization_controls(false);
		handle_response_from_image_optimization(data, update_unused_images_view);
		unused_images_optimization_message.html(data.result.output);
		alert(data.result.meta.removed_message);
	});

	/**
	 * Handle clicks on image optimization buttons.
	 */
	remove_unused_images_btn.on('click', function() {
		// if no unused imaged then exit.
		if (0 == $('#wpo_unused_images input[type="checkbox"]:checked').length) return;

		save_auto_backup_options();

		if (take_a_backup_checkbox1.is(':checked')) {
			take_a_backup_with_updraftplus(remove_selected_images, 'uploads');
		} else {
			remove_selected_images();
		}
	});

	/**
	 * Handle move images to trash button.
	 */
	move_unused_images_to_trash_btn.on('click', function() {
		// if no unused imaged then exit.
		if (0 == $('#wpo_unused_images input[type="checkbox"]:checked').length) return;

		save_auto_backup_options();

		if (take_a_backup_checkbox1.is(':checked')) {
			take_a_backup_with_updraftplus(move_unused_images_to_trash, 'uploads');
		} else {
			move_unused_images_to_trash();
		}
	});

	/**
	 * Move selected unused images to trash.
	 */
	function move_unused_images_to_trash() {
		disable_image_optimization_controls(true);

		trash_manager_send_command('move_images_to_trash', {
			images: unused_images_view.get_selected_images()
		}, function(resp) {
			alert(resp.message);
			disable_image_optimization_controls(false);
			// refresh images list
			unused_images_refresh_btn.trigger('click');
			// set dirty flag for refresh unused images trash view when user switch on it.
			unused_images_view_trash_btn.data('dirty', true);
		});
	}

	/**
	 * Handle restore images from trash button.
	 */
	restore_unused_images_from_trash_btn.on('click', function() {
		// if no selected images then exit.
		if (0 == unused_images_trash_view.get_selected_images().length) return;

		save_auto_backup_options();

		if (take_a_backup_checkbox1.is(':checked')) {
			take_a_backup_with_updraftplus(restore_unused_images_from_trash, 'uploads');
		} else {
			restore_unused_images_from_trash();
		}
	});

	/**
	 * Restore selected unused images from trash.
	 */
	function restore_unused_images_from_trash() {
		disable_image_optimization_controls(true);

		trash_manager_send_command('restore_images_from_trash', {
			images: unused_images_trash_view.get_selected_images()
		}, function(resp) {
			if (resp.error) {
				alert(resp.error);
			} else if (resp.message) {
				alert(resp.message);
				// set dirty flag for refresh unused images view when user switch on it.
				unused_images_view_images_btn.data('dirty', true);
				// refresh trash view.
				unused_images_trash_reload();
			}

			disable_image_optimization_controls(false);
		});
	}

	/**
	 * Handle remove selected sizes button click.
	 */
	remove_selected_sizes_btn.on('click', function() {
		save_auto_backup_options();

		if (take_a_backup_checkbox2.is(':checked')) {
			take_a_backup_with_updraftplus(remove_selected_image_sizes);
		} else {
			remove_selected_image_sizes();
		}
	});

	/**
	 * Handle refresh link click.
	 */
	unused_images_refresh_btn.on('click', function(e) {
		
		e.preventDefault();

		if ($(this).prop('disabled')) return;
		// reset statuses for pagination.
		images_loaded_count = {};
		images_loaded_count_text = {};
		last_load_status = {};

		$(document).trigger(IMAGES_EVENTS.GET_INFO_START);
		// run get info request with.
		optimization_get_info(unused_images_optimization_message, 'images', {support_ajax_get_info: true, forced: true})
			.fail(function() {
				$(document).trigger(IMAGES_EVENTS.GET_INFO_DONE, {});
			});
	});

	/**
	 * Handle select all images link click.
	 */
	unused_images_select_all_btn.on('click', function() {
		if (unused_images_view.is_visible()) unused_images_view.select_all();
		if (unused_images_trash_view.is_visible()) unused_images_trash_view.select_all();
	});

	/**
	 * Handle select none images link click.
	 */
	unused_images_select_none_btn.on('click', function() {
		if (unused_images_view.is_visible()) unused_images_view.select_none();
		if (unused_images_trash_view.is_visible()) unused_images_trash_view.select_none();
	});

	/**
	 * Handle click on images tab.
	 */
	$('#wp-optimize-nav-tab-wrapper__wpo_images .nav-tab').on('click', function() {
		if (is_tab_active('wpo_images-unused')) images_tab_activated();
	});

	if (is_tab_active('wpo_images-unused')) images_tab_activated();

	/**
	 * Disable images optimization controls (buttons, checkboxes).
	 *
	 * @param {boolean} disable - if true then disable controls, false - enable.
	 *
	 * @return void
	 */
	function disable_image_optimization_controls(disable) {
		var optimization_checkbox_images = $('#optimization_checkbox_images');

		$.each([
			remove_unused_images_btn,
			remove_selected_sizes_btn,
			$('#optimization_button_images_big'),
			$('#optimization_button_images_small'),
			optimization_checkbox_images,
			unused_images_refresh_btn,
			move_unused_images_to_trash_btn,
			restore_unused_images_from_trash_btn
		], function(i, el) {
			el.prop('disabled', disable);
		});

		if (disable) {
			optimization_checkbox_images_val = optimization_checkbox_images.is(':checked');
			optimization_checkbox_images.prop('checked', false);
		} else {
			optimization_checkbox_images.prop('checked', optimization_checkbox_images_val);
			// enable action buttons only if any image selected
			unused_images_view.update_view();
			unused_images_trash_view.update_view();
		}
	}

	/**
	 * Load and show information about unused images and sizes.
	 *
	 * @return void
	 */
	function load_unused_images() {
		var data = { optimization_id: 'images' };
		console.log('Loading information about unused images.');
		$(document).trigger(IMAGES_EVENTS.GET_INFO_START);

		optimization_get_info(unused_images_optimization_message, 'images', {support_ajax_get_info: true})
			.fail(function() {
				$(document).trigger(IMAGES_EVENTS.GET_INFO_DONE, {});
			});

	}

	/**
	 * Callback for loading next page of unused images.
	 *
	 * @return void
	 */
	function load_unused_images_next_page() {
		load_unused_images_page(get_selected_site());
	}

	/**
	 * Callback for loading next page of unused images.
	 *
	 * @return void
	 */
	function load_unused_images_trash_next_page() {
		load_unused_images_trash_page(get_selected_site());
	}

	/**
	 * Load next images page for blog_id.
	 *
	 * @return void
	 */
	function load_unused_images_page() {
		var images_per_page = 99,
			blog_id = get_selected_site();

		if (last_load_status.hasOwnProperty(blog_id) && (IMAGES_LOAD_STATUS.BUSY === last_load_status[blog_id] || IMAGES_LOAD_STATUS.COMPLETE === last_load_status[blog_id])) return;

		$('#wpo_unused_images_loader_bottom').css('visibility', 'visible');

		last_load_status[blog_id] = IMAGES_LOAD_STATUS.BUSY;

		var offset = images_loaded_count.hasOwnProperty(blog_id) ? images_loaded_count[blog_id] : 0,
			data = {
				optimization_id: 'images',
				data: {
					blog_id: blog_id,
					length: images_per_page,
					offset: offset
				}
			};

		send_command('get_optimization_info', data, function(resp) {
			var loaded = append_images_from_response(resp.result.meta);

			show_images_loaded_text(get_selected_site());

			if (loaded === images_per_page) {
				last_load_status[blog_id] = IMAGES_LOAD_STATUS.SUCCESS;
			} else {
				last_load_status[blog_id] = IMAGES_LOAD_STATUS.COMPLETE;
			}

			$('#wpo_unused_images_loader_bottom').css('visibility', 'hidden');

			unused_images_view.update_view();
		})
			.fail(function() {
				last_load_status[blog_id] = IMAGES_LOAD_STATUS.FAILURE;

				$('#wpo_unused_images_loader_bottom').css('visibility', 'hidden');
			});
	}

	/**
	 * Load images from trash for selected blog and display it.
	 *
	 * @return {Object} jquery ajax object
	 */
	function load_unused_images_trash_page() {

		var images_per_page = 99,
			blog_id = get_selected_site(),
			offset = unused_images_trash_view.get_images_count(blog_id);

		if (last_load_trash_status.hasOwnProperty(blog_id) && (IMAGES_LOAD_STATUS.BUSY === last_load_trash_status[blog_id] || IMAGES_LOAD_STATUS.COMPLETE === last_load_trash_status[blog_id])) return;

		last_load_trash_status[blog_id] = IMAGES_LOAD_STATUS.BUSY;

		$('#wpo_unused_images_loader_bottom').css('visibility', 'visible');

		if (0 == offset) {
			$('.wpo_shade').show();
			unused_images_progress_message.html('');
		}

		return trash_manager_send_command('get_trash_images', {
			offset: offset,
			length: images_per_page,
			blog_id: blog_id
		}, function(resp) {

			$('#wpo_unused_images_loader_bottom').css('visibility', 'hidden');
			$('.wpo_shade').hide();

			if (resp.errors) {
				alert(resp.errors.join("\n"));
				return;
			}

			var i, value, url, title;
			for (i in resp.images) {
				if (!resp.images.hasOwnProperty(i)) continue;
				value = resp.images[i][0];
				title = (resp.images[i].length > 1) ? [resp.images[i][0],' [id:', resp.images[i][1],' ]', ].join('') : resp.images[i][0];
				url = [resp.base_url, resp.images[i][0]].join('');
				unused_images_trash_view.append_image(blog_id, value, url, url, title, title);
			}

			if (resp.images && resp.images.length === images_per_page) {
				last_load_trash_status[blog_id] = IMAGES_LOAD_STATUS.SUCCESS;
			} else {
				last_load_trash_status[blog_id] = IMAGES_LOAD_STATUS.COMPLETE;
			}

			unused_images_trash_view.update_view();
		});
	}

	/**
	 * Reload unused images trash items.
	 */
	function unused_images_trash_reload() {
		unused_images_trash_view.clear();
		last_load_trash_status[get_selected_site()] = '';

		load_unused_images_trash_page();
	}

	/**
	 * Show count of loaded images for blog_id.
	 *
	 * @param {number} blog_id
	 *
	 * @return void
	 */
	function show_images_loaded_text(blog_id) {
		if (images_loaded_count_text.hasOwnProperty(blog_id)) {
			$('#wpo_unused_images_loaded_count').text(images_loaded_count_text[blog_id]);
		}
	}

	/**
	 * Check returned response from image optimization and call update view callback.
	 *
	 * @param {Object} resp - response from image optimization.
	 * @param {Function} update_view_callback - callback function to update view.
	 *
	 * @return void
	 */
	function handle_response_from_image_optimization(resp, update_view_callback) {
		if (resp.result && resp.result.hasOwnProperty('meta') && resp.result.meta) {
			if (update_view_callback) update_view_callback(resp.result.meta);
		} else {
			alert(wpoptimize.error_unexpected_response);
		}
	}

	/**
	 * Update images optimization tab view with data returned from images optimization.
	 *
	 * @param {Object} data - meta data returned from images optimization
	 *
	 * @return void
	 */
	function update_unused_images_view(data) {
		var new_images_loaded = !data.hasOwnProperty('removed_message');

		if (new_images_loaded) unused_images_container.text('');

		if (data && data.hasOwnProperty('unused_images') && data.files > 0) {
			var blog_id, blog_url = '', show_multisite_select = false;

			// append images to list from response.
			if (new_images_loaded) {
				append_images_from_response(data);
			}

			sites_select.html('');

			for (blog_id in data.unused_images) {
				if (!data.unused_images.hasOwnProperty(blog_id)) continue;

				if (data.images_loaded_text.hasOwnProperty(blog_id)) {
					images_loaded_count_text[blog_id] = data.images_loaded_text[blog_id];
				}

				// update multisite sites select options list.
				if (data.unused_images[blog_id].length && data.multisite) {
					show_multisite_select = true;
					blog_url = [data.sites[blog_id].domain, data.sites[blog_id].path].join('');
					sites_select.append(['<option value="', blog_id, '">', blog_url, '</option>'].join(''));
				}
			}

		} else {
			// show message - no unuset images found.
			unused_images_container.html($('<div class="wpo-fieldgroup" />').text(wpoptimize.no_unused_images_found));

			// hide information about loaded images.
			images_loaded_count_text[get_selected_site()] = '';
			// block loading next page of images.
			last_load_status[get_selected_site()] = IMAGES_LOAD_STATUS.COMPLETE;
		}

		// show or hide multisite select.
		if (show_multisite_select) {
			sites_select_container.show();
			filter_images_by_site(sites_select.val());
		} else {
			sites_select_container.hide();
		}

		update_sizes_sidebar(data);

		// show images loaded text.
		show_images_loaded_text(get_selected_site());
	}

	/**
	 * Update information about sizes in the sidebar.
	 *
	 * @param data
	 *
	 * @return void
	 */
	function update_sizes_sidebar(data) {
		// show informations in the sizes sidebar.
		show_sizes_list($('#registered_image_sizes'), get_array_items_by_key_value(data.image_sizes, 'used', true), wpoptimize.no_registered_image_sizes);
		show_sizes_list($('#unused_image_sizes'), get_array_items_by_key_value(data.image_sizes, 'used', false), wpoptimize.no_unsed_image_sizes);

		// disable/enable button if sizes selected or not selected.
		$('#registered_image_sizes, #unused_image_sizes').on('change', 'input[type="checkbox"]', function() {
			update_remove_selected_button_state();
		});

		update_remove_selected_button_state();
	}

	/**
	 * Append images to the list returned from ajax request.
	 *
	 * @param {object} data
	 *
	 * @return {number}
	 */
	function append_images_from_response(data) {
		var i, blog_id = 0, base_url = '', admin_url = '', blog_url = '', unused_image = {}, count;

		for (blog_id in data.unused_images) {
			if (!data.unused_images.hasOwnProperty(blog_id)) continue;

			// save images loaded count text.
			if (data.images_loaded_text.hasOwnProperty(blog_id)) {
				images_loaded_count_text[blog_id] = data.images_loaded_text[blog_id];
			}

			base_url = data[['baseurl_', blog_id].join('')];
			admin_url = data[['adminurl_', blog_id].join('')];

			count = 0;

			for (i in data.unused_images[blog_id]) {
				if (!data.unused_images[blog_id].hasOwnProperty(i)) continue;

				count++;
				unused_image = data.unused_images[blog_id][i];

				if (data.multisite) {
					// set blog url to show on multisite image titles.
					blog_url = [data.sites[blog_id].domain, data.sites[blog_id].path].join('');
				}

				append_image_to_list(unused_image, base_url, admin_url, blog_id, blog_url);
			}

			// update loaded count.
			if (images_loaded_count.hasOwnProperty(blog_id)) {
				images_loaded_count[blog_id] += count;
			} else {
				images_loaded_count[blog_id] = count;
			}
		}

		// lazyload images.
		// $('.lazyload', unused_images_container).lazyload();

		return count;
	}

	/**
	 * Handle site change.
	 */
	sites_select.on('change', function() {
		filter_images_by_site(sites_select.val());
	});

	/**
	 * Filter images on site change.
	 *
	 * @param {number} blog_id
	 *
	 * @return {void}
	 */
	function filter_images_by_site(blog_id) {
		unused_images_view.filter_by_site(blog_id);
		unused_images_trash_view.filter_by_site(blog_id);
	}

	/**
	 * Return array of items from array where array[i].key == value.
	 *
	 * @param array
	 * @param key
	 * @param value
	 *
	 * @return {Array}
	 */
	function get_array_items_by_key_value(array, key, value) {
		var i, result = [];

		for (i in array) {
			if (!array.hasOwnProperty(i)) continue;
			if (array[i].hasOwnProperty(key) && value == array[i][key]) {
				result[i] = array[i];
			}
		}

		return result;
	}

	/**
	 * Output list of sizes with checkboxes to container.
	 *
	 * @param {Object} container 		 - jquery container.
	 * @param {Object} sizes 			 - list of image sizes.
	 * @param {string} not_found_message - message to show if sizes list is empty.
	 *
	 * @return void
	 */
	function show_sizes_list(container, sizes, not_found_message) {
		var i, empty = true;
		container.text('');
		if (sizes) {
			for (i in sizes) {
				if (sizes.hasOwnProperty(i)) {
					container.append(['<label for="chk_',i,'" class="unused-image-sizes__label"><input type="checkbox" id="chk_',i,'" class="unused-image-sizes" name="',i,'">',i,' (',sizes[i].size_formatted,' - Total: ',sizes[i].files,')</lalbel><br>'].join(''));
					empty = false;
				}
			}
		}

		if (empty) {
			$('.hide_on_empty', container.parent()).hide();
			container.append(['<i>', not_found_message,'</i>'].join(''));
		} else {
			$('.hide_on_empty', container.parent()).show();
		}

	}

	/**
	 * Append unused image to list.
	 *
	 * @param {string} image 	 - relative path to image or object {id: 'image id', url: 'relative url'}.
	 * @param {string} base_url  - url to images upload directory.
	 * @param {string} admin_url - url to images upload directory.
	 * @param {int}    blog_id   - blog id for the image
	 * @param {string} blog_url  - url for image blog, used in image title.
	 *
	 * @return void
	 */
	function append_image_to_list(image, base_url, admin_url, blog_id, blog_url) {
		var value = [blog_id, (image.id ? image.id : image.url)].join('_'),
			href = image.id ? [admin_url, 'upload.php?item=', image.id].join('') : [base_url, '/', image.url].join(''),
			title = image.id ? ['#', image.id].join('') : image.url,
			thumbnail_url = [base_url,'/',image.url].join(''),
			row_file_text = [base_url,'/',(image.id ? image.url.replace(/(\-[0-9]+x[0-9]+)(\.[a-z]+)$/i, '$2') : image.url), (image.id ? [' [id: ',image.id,']'].join('') : '')].join('');

		// add blog_url to title on multisite.
		if (blog_url) title = [title, ' [',blog_url,']'].join('');

		unused_images_view.append_image(blog_id, value, href, thumbnail_url, title, row_file_text);
	}

	/**
	 * Handle changing unused images view action.
	 */
	$('.wpo_unused_images_switch_view a').on('click', function() {
		switch_view_unused_images($(this).data('mode'));
	});

	unused_images_container.on('click', '.wpo_unused_images_remove_single', function() {
		var btn = $(this),
			image_item = btn.closest('.wpo_unused_image'),
			image_value = $('input[type="checkbox"]', image_item).attr('value');

		btn.prop('disabled', true);
		remove_selected_images_command([image_value]).done(function() {
			image_item.remove();
		});
	});

	/**
	 * Change unused images view between grid and list.
	 *
	 * @param mode
	 *
	 * @return void
	 */
	function switch_view_unused_images(mode) {
		unused_images_view.switch_view_mode(mode);
		unused_images_trash_view.switch_view_mode(mode);
	}

	/**
	 * Get selected images and call ajax request to remove them.
	 *
	 * @return void
	 */
	function remove_selected_images() {
		var selected_images = [];

		// if all images selected then set 'all'.
		if (0 == $('#wpo_unused_images input:not(:checked)').length && IMAGES_LOAD_STATUS.COMPLETE == last_load_status[get_selected_site()]) {
			selected_images = 'all';
		} else {
			selected_images = unused_images_view.get_selected_images();
		}

		// if no selected images then exit.
		if (0 == selected_images.length) return;

		remove_selected_images_command(selected_images);
	}

	/**
	 * Run unused images optimization for selected images.
	 *
	 * @param {array} selected_images
	 *
	 * @return {object}
	 */
	function remove_selected_images_command(selected_images) {
		$(document).trigger(IMAGES_EVENTS.OPTIMIZATION_START);

		return send_command('do_optimization', { optimization_id: 'images', data: { selected_images: selected_images, images_loaded: images_loaded_count} }, function(resp) {
			// remove checked images.
			$('#wpo_unused_images input:checked').each(function() {
				var blog_id = $(this).val().split('_').shift();
				// update loaded count
				images_loaded_count[blog_id]--;
				$(this).closest('.wpo_unused_image').remove();
			});
			$(document).trigger(IMAGES_EVENTS.OPTIMIZATION_DONE, resp);
			// trigger load next page of images if need.
			unused_images_view.load_next_page_if_need();
		})
		.fail(function() {
			alert(wpoptimize.error_unexpected_response);
		});
	}

	/**
	 * Returns list of selected image sizes by user.
	 *
	 * @return {array} list of image sizes.
	 */
	function get_selected_image_sizes() {
		var selected_sizes = [];
		$('#registered_image_sizes input[type="checkbox"], #unused_image_sizes input[type="checkbox"]').each(function() {
			var checkbox = $(this);
			if (checkbox.is(':checked')) selected_sizes.push(checkbox.prop('name'));
		});

		return selected_sizes;
	}

	/**
	 * Do ajax action to remove image by sizes list.
	 *
	 * @param {array} sizes - list of image sizes.
	 *
	 * @return void
	 */
	function remove_selected_image_sizes() {

		var sizes = get_selected_image_sizes();

		if (remove_selected_sizes_btn.prop('disabled') || !sizes || 0 == sizes.length) return;

		var registered_image_sizes_container = $('#registered_image_sizes'),
			unused_image_sizes_container = $('#unused_image_sizes'),
			sizes_section_container = registered_image_sizes_container.parent(),
			loaders = $('.wpo_unused_images_loader', sizes_section_container);

		disable_image_optimization_controls(true);
		loaders.show();

		send_command('do_optimization', { optimization_id: 'images', data: { selected_sizes: sizes } }, function(resp) {
			handle_response_from_image_optimization(resp, function(data) {
				show_sizes_list(registered_image_sizes_container, get_array_items_by_key_value(data.image_sizes, 'used', true), wpoptimize.no_registered_image_sizes);
				show_sizes_list(unused_image_sizes_container, get_array_items_by_key_value(data.image_sizes, 'used', false), wpoptimize.no_used_image_sizes);
			});

			disable_image_optimization_controls(false);
			update_remove_selected_button_state();
			loaders.hide();

			alert(resp.result.meta.removed_message);
		})
			.fail(function() {
				disable_image_optimization_controls(false);
				update_remove_selected_button_state();
				loaders.hide();

				alert(wpoptimize.error_unexpected_response);
			});
	}

	/**
	 * Changes Remove selected button state on sizes checkbox change.
	 *
	 * @return void
	 */
	function update_remove_selected_button_state() {
		var registered_image_sizes_container = $('#registered_image_sizes'),
			unused_image_sizes_container = $('#unused_image_sizes');

		if ($('input[type="checkbox"]:checked', registered_image_sizes_container).length + $('input[type="checkbox"]:checked', unused_image_sizes_container).length > 0) {
			remove_selected_sizes_btn.prop('disabled', false);
		} else {
			remove_selected_sizes_btn.prop('disabled', true);
		}
	}

	/**
	 * Returns currently selected site.
	 *
	 * @return {number}
	 */
	function get_selected_site() {
		if (sites_select_container.is(':visible')) {
			return sites_select_container.val();
		}

		return 1;
	}

	/**
	 * Save Lazy Load settings.
	 *
	 * @return void
	 */
	function save_lazy_load_settings(callback) {
		var form_data = '';

		form_data = $("#wpo_lazy_load_settings input[type='text'], #wpo_lazy_load_settings input[type='radio']").serialize();

		$.each($("#wpo_lazy_load_settings input[type='checkbox']"), function() {
			// Attach matched element names to the form_data with chosen value.
			var empty_val = $(this).prop('checked') ? '1' : '0';
			form_data += '&' + $(this).attr('name') + '=' + empty_val;
		});

		send_command('save_lazy_load_settings', form_data, function(response) {

			$('body').trigger('wpo_purge_cache');

			if (callback) {
				callback(response);
			}
		});
	}

	/**
	 * Handle save lazy load settings.
	 */
	$('#wpo_lazy_load_settings').on('click', '.wp-optimize-settings-save', function() {
		var btn = $(this),
			spinner = btn.next('.wpo_spinner'),
			success_icon  = spinner.next('.dashicons-yes');

		spinner.show();

		save_lazy_load_settings(function() {
			spinner.hide();
			success_icon
				.removeClass('display-none')
				.show()
				.delay(5000)
				.fadeOut('fast', function() {
					success_icon.addClass('display-none');
				});
		});
	});
	
	// append popup container to page body.
	$('body').append('<div id="wpo-popup-preview"></div>');

	/**
	 * Handle click on preview link and run open dialog with preview optimization data for remove.
	 */
	$('#optimizations_list').on('click', '.wpo-optimization-preview', function() {
		open_preview_dialog($(this).data());
		return false;
	});

	/**
	 * Handle change event for "select all" checkbox.
	 */
	$('#wpo-popup-preview').on('change', '#wpo-select-all-preview-rows', function() {
		var table = $(this).closest('table'),
			checked = $(this).prop('checked');

		$('input:checkbox', table).each(function() {
			if (!$(this).is('#wpo-select-all-preview-rows')) {
				$(this).prop('checked', checked);
			}
		});
	});

	/**
	 * Opens dialogs with optimization data for preview and remove.
	 *
	 * @param {object} data {id: <optimization_id, title: <optimization_title>, ...}
	 *
	 * @return {void}
	 */
	function open_preview_dialog(data) {
		var optimization_id = data.id,
			title = data.title,
			dialog = $('#wpo-popup-preview'),
			// table template with pager.
			dialog_html = [
				'<table id="wpo-preview-tablesorter" cellspacing="1" class="tablesorter"></table>',
				'<h4 id="wpo-preview-message" style="display: none;"></h4>'
			].join(''),
			pager_html = [
				'<div id="pager" class="pager" style="display: none">',
				'<span class="first dashicons dashicons-controls-skipback"></span>',
				'<span class="prev dashicons dashicons-controls-back"></span>',

				'<input type="text" class="pagedisplay">',
				'<span class="pagedisplay-count"></span>',

				'<span class="next dashicons dashicons-controls-forward"></span>',
				'<span class="last dashicons dashicons-controls-skipforward"></span>',

				'<select class="pagesize">',
				'<option value="50">50</option>',
				'<option value="100">100</option>',
				'<option value="200">200</option>',
				'<option value="300">300</option>',
				'<option value="400">400</option>',
				'<option value="500">500</option>',
				'</select>',
				'</div>'
			].join(''),
			sites_select_html = '',
			sites_select_options = [],
			dialog_buttons = {};

		// build sites select html.
		if ('undefined' != typeof wpoptimize.sites && wpoptimize.sites.length) {
			for (var i in wpoptimize.sites) {
				if (!wpoptimize.sites.hasOwnProperty(i)) continue;

				sites_select_options.push(['<option value="', wpoptimize.sites[i].blog_id, '">', wpoptimize.sites[i].domain, wpoptimize.sites[i].path, '</option>'].join(''));
			}
			sites_select_html = [
				'<select id="wpo-preview-site" style="display: none">',
				sites_select_options.join(''),
				'</select>'
			].join('');
		}

		// add delete button to the dialog.
		dialog_buttons[wpoptimize.delete_selected_items_btn] = function() {
			var selected_ids = [],
				table = $('#wpo-preview-tablesorter');

			$('input:checkbox:checked', table).each(function() {
				if (!$(this).is('#wpo-select-all-preview-rows')) {
					selected_ids.push($(this).val());
				}
			});

			// @codingStandardsIgnoreLine
			if (0 == selected_ids.length) return;

			var optimization_data = data;
			optimization_data['ids'] = selected_ids;

			// set site_id option for multisite.
			if ($('#wpo-preview-site').length) {
				optimization_data['site_id'] = $('#wpo-preview-site').val();
			}

			preview_loader.show();

			wp_optimize_send_command_admin_ajax('do_optimization',
				{
					'optimization_id': optimization_id,
					'data': optimization_data
				},
				function (response) {
					// force reload table content.
					$('#wpo-preview-tablesorter').trigger('reload');
					// uncheck all checkboxes in table.
					$('#wpo-select-all-preview-rows').prop('checked', false);

					send_command('get_optimization_info', {optimization_id: optimization_id}, function(resp) {
						var meta = (resp && resp.result && resp.result.meta) ? resp.result.meta : {},
							message = (resp && resp.result && resp.result.output) ? resp.result.output.join('<br>') : '',
							checkboxes = {};

						if ('' != message) {
							// save checkbox states before update optimization info text.
							// used in additional options, like for "remove all transients"
							$(['#optimization_info_', optimization_id, ' input[type="checkbox"]'].join('')).each(function() {
								checkboxes[$(this).attr('name')] = $(this).prop('checked');
							});

							$(['#optimization_info_', optimization_id].join('')).html(message);

							// restore saved checkboxes state.
							for (var i in checkboxes) {
								if (!checkboxes.hasOwnProperty(i)) continue;
								$(['#optimization_info_', optimization_id, ' input[name="',i,'"]'].join('')).prop('checked', checkboxes[i]);
							}
						}
					});
				}
			);
		};

		// add cancel button to the dialog.
		dialog_buttons[wpoptimize.close_btn] = function() {
			$(this).dialog('destroy');
		};

		// open dialog.
		dialog.dialog({
			autoOpen: false,
			title: title,
			minWidth: 800,
			minHeight: 400,
			modal: true,
			close: function() {
				// destroy dialog on close.
				$(this).dialog('destroy');
				// clear popup content.
				$('#wpo-popup-preview').html('');
			},
			buttons: dialog_buttons
		});

		// hide table before loading.
		$('#wpo-preview-tablesorter').hide();

		// put table template into dialog.
		dialog.html(dialog_html);

		// hide delete button.
		$('.ui-dialog-buttonpane button').first().hide();

		// add pager and site selector to dialog.
		$('.ui-dialog-buttonpane').prepend([pager_html, sites_select_html].join(''));

		// add spinner to title.
		$('.ui-dialog-title').append(['<i id="wpo-preview-loader"><img width="12" height="12" src="',wpoptimize.spinner_src,'" /></i>'].join(''));

		var preview_loader = $('#wpo-preview-loader > img'),
			preview_site_select = $('#wpo-preview-site');

		/**
		 * Create new data source object used for fetch preview data from optimization.
		 *
		 * @type {TableSorter_DataSource}
		 */
		var ds = new TableSorter_DataSource({
			optimization_id: optimization_id,
			limit: 1
		});

		for (var i in data) {
			if (!data.hasOwnProperty(i)) continue;
			if ('id' == i || 'title' == i) continue;
			ds.set_option(i, data[i]);
		}

		// if multisite the add site id value to data source object.
		if (preview_site_select.length && preview_site_select.val()) {
			ds.set_option('site_id', preview_site_select.val());
		}

		// handle change event for change site select.
		preview_site_select.change(function() {
			// update site id option.
			ds.set_option('site_id', preview_site_select.val());
			// force reload table content.
			$('#wpo-preview-tablesorter').trigger('reload');
		});

		/**
		 * Get data from optimization for preview and show it in dialog.
		 */
		ds.fetch().done(
			function(response) {
				var table = $('#wpo-preview-tablesorter');

				try {
					response = wpo_parse_json(response);
				} catch (e) {
					alert(wpoptimize.error_unexpected_response);
					return;
				}

				// hide table and pager until data loading.
				table.hide();

				// add table headings with received from optimization
				var i,header = [], footer = [],
					j = 1, // no sorters counter, 0 index already filled for column with checkboxes.
					no_sorters = { 0 : { sorter: false } };

				// build header and footer for preview table.
				header.push('<th style="width: 20px"><input id="wpo-select-all-preview-rows" type="checkbox" /></th>');
				footer.push('<th></th>');

				for (i in response.result.columns) {
					if (!response.result.columns.hasOwnProperty(i)) continue;

					// set as no sortable option.
					no_sorters[j] = { sorter: false };
					j++;

					header.push(['<th class="header">', response.result.columns[i],'</th>'].join(''));
					footer.push(['<th>', response.result.columns[i],'</th>'].join(''));
				}

				table.append(['<thead><tr>',header,'</tr></thead>'].join(''));
				table.append(['<tfoot><tr>',footer,'</tr></tfoot>'].join(''));
				table.append('<tbody></tbody>');

				// initialize table sorter for displayed data.
				var pager = $("#pager");

				table.tablesorter({
					widthFixed: true,
					widgets: ['zebra'],
					headers: no_sorters
				})
				.tablesorterPager({
					container: pager,
					size: parseInt($(".pagesize", pager).val()), // set selected page size.
					dataSource: ds
				});

				// handle loading start for preview.
				table.on('load_start', function() {
					preview_loader.show();
				});

				// handle loading end data for preview.
				table.on('load_end', function(event, response) {
					preview_loader.hide();

					if (parseInt(response.result.total) > 0) {
						// show table with found items.
						$('#wpo-preview-tablesorter').show();
						// hide "no items found" message.
						$('#wpo-preview-message').hide();
						// show pager.
						$('.ui-dialog-buttonpane #pager').show();
						// show delete button.
						$('.ui-dialog-buttonpane button').first().show();
					} else {
						// hide the table.
						$('#wpo-preview-tablesorter').hide();
						// show "no items found" message.
						$('#wpo-preview-message').text(response.result.message).show();
						// hide pager.
						$('.ui-dialog-buttonpane #pager').hide();
						// hide delete button.
						$('.ui-dialog-buttonpane button').first().hide();
					}
					// show site select for multisite.
					$('#wpo-preview-site').show();
				});
			}
		);

		// open the dialog.
		dialog.dialog('open');
	}

	/**
	 * Update data-remove_all_transients value for transients preview links.
	 */
	$('#remove_all_transients').on('change', function() {
		var container = $(this).closest('td'),
			value = $(this).is(':checked');

		$('a', container).each(function() {
			$(this).data('remove_all_transients', value);
		});
	});
};

/**
 * Flexible scheduler staff.
 */
jQuery(document).ready(function($) {

	var $auto_options = $('#wp-optimize-auto-options');
	var $time_fields = $('input[type="time"]');
	var $date_fields = $('input[type="date"]');
	var today = new Date().toISOString().split('T')[0];

	// This helps to keep track of scheduled events
	var count = $('.wpo_auto_event:last').data('count') || 0;

	// Use time picker when input[type="time"] not supported
	$time_fields.each(function(index, element) {
		if (!Modernizr.inputtypes.time) {
			$(element).timepicker({'timeFormat': 'H:i'});
			$(element).addClass('no_date_time_support');
			$(element).on('changeTime', function() {
				$(this).timepicker('hide');
			});
		}
	});

	$auto_options.on('focus', 'input[type="time"]', function() {
		var element = $(this).get(0);
		if (!Modernizr.inputtypes.time) {
			$(element).timepicker({'timeFormat': 'H:i'});
			$(element).on('changeTime', function() {
				$(this).timepicker('hide');
			});
		}
	});

	$auto_options.on('keypress', 'input', function(e) {
		if (13 === e.keyCode) return false;
	});

	// Use datepicker when input[type="date"] not supported
	$date_fields.each(function(index, element) {
		if (!Modernizr.inputtypes.date) {
			$(element).datepicker({
				dateFormat: "yy-mm-dd",
				minDate: 0
			});
			$(element).addClass('no_date_time_support');
		}
	});

	$auto_options.on('focus', 'input[type="date"]', function() {
		var ele = $(this).get(0);
		if (!Modernizr.inputtypes.date) {
			$(ele).datepicker({
				dateFormat: "yy-mm-dd",
				minDate: 0
			});
		}
	});

	if (0 !== $('.wpo_scheduled_event').length) {
		$('.wpo_no_schedules').hide();
	} else {
		$('.wpo_no_schedules').show();
	}

	$('.wpo_auto_optimizations').select2({
		placeholder: wpoptimize.select_optimizations
	});

	$('.wpo_auto_optimizations').on('select2:opening select2:closing', function(event) {
		var $searchfield = $(this).parent().find('.select2-search__field');
		$searchfield.prop('disabled', true);
	});

	/**
	 * Detect change on schedule panel and set reminder
	 */
	$auto_options.on('change', 'select, input[type="date"], input[type="time"]', function() {
		$("#save_settings_reminder").slideDown();
		display_headers();
	});

	/**
	 * Adds settings fields for event scheduling
	 */
	$('#wpo-add-event').on('click', function(e) {
		e.preventDefault();
		count++;
		var optimizations = WP_Optimize_Handlebars.optimizations.handlebars({'optimizations': wpoptimize.auto_optimizations, 'count': count});
		var schedule_types = WP_Optimize_Handlebars.schedule_types.handlebars({'schedule_types': wpoptimize.schedule_types, 'count': count});
		var action = WP_Optimize_Handlebars.action.handlebars({'count': count});
		var html_content = '<div class="wpo_auto_event wpo_cf" data-count="' + count +'">';
		html_content += optimizations + schedule_types + action;
		html_content += '</div>';
		$('#wpo_auto_events').prepend(html_content);
		$('.wpo_auto_optimizations').select2({
			placeholder: wpoptimize.select_optimizations
		});
		$('.wpo_auto_optimizations').on('select2:opening select2:closing', function(event) {
			var $searchfield = $(this).parent().find('.select2-search__field');
			$searchfield.prop('disabled', true);
		});
	});

	/**
	 * Show appropriate fields (date, time, week and day) when schedule type is changed
	 */
	$auto_options.on('change', '.wpo_schedule_type', function() {
		var $container = $(this).closest('.wpo_auto_event');

		// Use existing count, if it is editing to existing event or use incremented count
		var event_count = $container.data('count') || count;
		var schedule_type = $(this).val();
		var class_name = '';
		if (!Modernizr.inputtypes.date || !Modernizr.inputtypes.time) {
			class_name = 'no_date_time_support';
		}
		var field_details = {
			'date': wpoptimize.date,
			'time': wpoptimize.time,
			'day': wpoptimize.day,
			'day_number': wpoptimize.day_number,
			'days': wpoptimize.days,
			'date_value': '',
			'time_value': '00:00',
			'status': wpoptimize.active,
			'status_value': "checked",
			'week_days': wpoptimize.week_days,
			'week': wpoptimize.week,
			'count': event_count,
			'class_name': class_name,
			'today': today
		};
		var schedule_fields = display_field_details(schedule_type, field_details);
		var status = WP_Optimize_Handlebars.status.handlebars({'details': field_details});
		var action = WP_Optimize_Handlebars.action.handlebars({});
		$(this).next().html('');
		$container.find('.wpo_event_status').remove();
		$container.find('.wpo_event_actions').remove();
		if ('' !== schedule_fields) {
			$(this).next().html(schedule_fields);
		}
		$container.append(status + action);
	});

	/**
	 * Edit event details
	 */
	$auto_options.on('click', '.wpo_edit_event', function() {
		var $container = $(this).closest('.wpo_scheduled_event');
		$container.hide();
		$container.next().show();
		display_headers();
	});

	/**
	 * Remove event details
	 */
	$auto_options.on('click', '.wpo_remove_event', function() {
		var count = $(this).data('count');
		var ok_remove = confirm(wpoptimize.confirm_remove_task);
		if (true === ok_remove) {
			var $scheduled_event = $(this).closest('.wpo_scheduled_event');
			var $auto_event = $(this).closest('.wpo_auto_event');

			// If event deleted from list, then remove form as well
			if (count == $scheduled_event.next().data('count')) {
				$scheduled_event.next().remove();
				$scheduled_event.remove();
			}

			// If event deleted from form, then remove stored details as well
			if (count == $auto_event.prev().data('count')) {
				$auto_event.prev().remove();
			}

			// Delete newly created event
			$auto_event.remove();

			$("#save_settings_reminder").slideDown();
			display_headers();
		}
	});

	/**
	 * Additional UI processing for save settings in premium
	 */
	$('#settings_form').on('click', '#wp-optimize-settings-save', function(e) {
		e.preventDefault();
		var all_filled = true;
		$('.wpo_auto_optimizations').each(function() {
			if (!$(this).val()) {
				all_filled = false;
			}
		});

		$('.wpo_schedule_type').each(function() {
			if (!$(this).val()) {
				all_filled = false;
			}
		});

		if (false === all_filled) {
			e.stopImmediatePropagation();
			$('#wp-optimize-settings-save-results')
				.show()
				.addClass('wpo_alert_notice')
				.text(wpoptimize.fill_all_fields)
				.delay(5000)
				.fadeOut(3000, function() {
					$(this).removeClass('wpo_alert_notice');
				});
		}

		$("#save_settings_reminder").slideUp('normal', function() {
			display_headers();
		});

	});

	/**
	 * Displays field details based on selected scheduled type
	 *
	 * @param {string} schedule_type
	 * @param {object} field_details
	 *
	 * @return {string}
	 */
	function display_field_details(schedule_type, field_details) {
		var schedule_fields = '';
		switch (schedule_type) {
			case 'wpo_once':
				schedule_fields = WP_Optimize_Handlebars.once.handlebars({'details': field_details});
				break;
			case 'wpo_daily':
				schedule_fields = WP_Optimize_Handlebars.daily.handlebars({'details': field_details});
				break;
			case 'wpo_weekly':
				schedule_fields = WP_Optimize_Handlebars.weekly.handlebars({'details': field_details});
				break;
			case 'wpo_fortnightly':
				schedule_fields = WP_Optimize_Handlebars.fortnightly.handlebars({'details': field_details});
				break;
			case 'wpo_monthly':
				schedule_fields = WP_Optimize_Handlebars.monthly.handlebars({'details': field_details});
				break;
		}
		return schedule_fields;
	}

	/**
	 * Displays scheduled event headers
	 *
	 * @return void
	 */
	function display_headers() {
		if (0 === $('.wpo_scheduled_event:visible').length) {
			$('.wpo_auto_event_heading_container').hide();
			$('.wpo_no_schedules').show();
		} else {
			$('.wpo_auto_event_heading_container').show();
			$('.wpo_no_schedules').hide();
		}

		if (0 === $('.wpo_scheduled_event:visible').length && 0 === $('.wpo_auto_event:visible').length && !$('#save_settings_reminder').is(':visible')) {
			$('.wpo_no_schedules').show();
		} else {
			$('.wpo_no_schedules').hide();
		}
	}
});
