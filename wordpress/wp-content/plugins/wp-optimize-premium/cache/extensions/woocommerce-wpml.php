<?php

if (!defined('ABSPATH')) die('No direct access allowed');

// works since WP 4.6
if (function_exists('add_filter')) {
	add_filter('wpo_cache_cookies', 'wpo_cache_cookies_add_wc_currency_converter', 20, 2);
	add_filter('wpo_cache_query_variables', 'wpo_cache_query_variables_woocommerce', 20, 2);
	add_action('wpo_cache_extensions_loaded', 'wpo_cache_woocommerce_set_default_vars');
}

/**
 * Filter GET query variable names used for building cache file name.
 *
 * @param array $variables
 * @param array $config
 *
 * @return array
 */
function wpo_cache_query_variables_woocommerce($variables, $config) {

	// WPML multi currency plugin.
	if (defined('WCML_VERSION')) {
		$variables[] = 'wcmlc';
	}

	// check if active WPML plugin.
	if (defined('ICL_SITEPRESS_VERSION')) {
		$variables[] = 'lang';
	}

	// Aelia Currency switcher
	if (class_exists('WC_Aelia_CurrencySwitcher')) {
		$variables[] = 'aelia_cs_currency';
	}

	return $variables;
}

/**
 * Filter COOKIE variable names used for building cache file name.
 *
 * @param array $cookies
 *
 * @return array
 */
function wpo_cache_cookies_add_wc_currency_converter($cookies, $config) {

	// Aelia currency switcher
	if (class_exists('WC_Aelia_CurrencySwitcher')) {
		$cookies[] = 'aelia_cs_selected_currency';
	}

	return $cookies;
}

/**
 * Set the default variables
 *
 * @return void
 */
function wpo_cache_woocommerce_set_default_vars() {
	$cookies = wpo_cache_cookies();
	$defaults = wpo_cache_config_get('default_values');
	if (in_array('aelia_cs_selected_currency', $cookies) && !isset($_COOKIE['aelia_cs_selected_currency'])) {
		if (!empty($defaults) && isset($defaults['woocommerce_currency'])) {
			$_COOKIE['aelia_cs_selected_currency'] = $defaults['woocommerce_currency'];
		}
	}
}
