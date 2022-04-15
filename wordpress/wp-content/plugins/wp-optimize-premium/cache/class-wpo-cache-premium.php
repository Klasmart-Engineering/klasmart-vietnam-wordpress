<?php

if (!defined('ABSPATH')) die('No direct access allowed');

if (!class_exists('WPO_Cache_Premium')) :

class WPO_Cache_Premium {
	/**
	 * Construct WPO_Cache_Premium - setup filters and actions, initiate class variables
	 */
	public function __construct() {

		$this->config = WP_Optimize()->get_page_cache()->config->get();

		add_filter('wpo_cache_update_config', array($this, 'add_default_values_to_cache_config'), 20);

	}

	/**
	 * Add default values to use in cache extensions - filters the WPO config when updating it
	 *
	 * @param array $config - The original config array
	 * @return array
	 */
	public function add_default_values_to_cache_config($config) {
		if (!isset($config['default_values'])) {
			$config['default_values'] = array();
		}

		// Add WooCommerce's default currency
		if (function_exists('get_woocommerce_currency')) {

			/**
			 * Filters wether or not to add WooCommerce default currency to the cache config.
			 */
			if (apply_filters('wpo_add_woocommerce_default_currency_to_cache_config', true)) {
				// Save the default WC currency in our config.
				// Note: We use get_option('woocommerce_currency') as get_woocommerce_currency() is overriden by the currency selector plugin.
				$config['default_values']['woocommerce_currency'] = get_option('woocommerce_currency');
			}
		}

		return $config;
	}
}
endif;
