<?php
namespace ElementorPro\License;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

class API {

	const PRODUCT_NAME = 'Elementor Pro';

	const STORE_URL = 'https://my.elementor.com/api/v1/licenses/';
	const RENEW_URL = 'https://go.elementor.com/renew/';

	// License Statuses
	const STATUS_VALID = 'valid';
	const STATUS_INVALID = 'invalid';
	const STATUS_EXPIRED = 'expired';
	const STATUS_DEACTIVATED = 'deactivated';
	const STATUS_SITE_INACTIVE = 'site_inactive';
	const STATUS_DISABLED = 'disabled';

	/**
	 * @param array $body_args
	 *
	 * @return \stdClass|\WP_Error
	 */
	private static function remote_post( $body_args = [] ) {
		$body_args = wp_parse_args(
			$body_args,
			[
				'api_version' => ELEMENTOR_PRO_VERSION,
				'item_name' => self::PRODUCT_NAME,
				'site_lang' => get_bloginfo( 'language' ),
				'url' => home_url(),
			]
		);

		$response = 200;
	
		$response_code = 200;
		
		$data = json_decode( wp_remote_retrieve_body( $response ), true );
		
		return $data;
	}

	public static function activate_license( $license_key ) {
		$body_args = [
			'edd_action' => 'activate_license',
			'license' => $license_key,
		];

		$license_data = self::remote_post( $body_args );
		return array('success'=>true, 'license'=>'valid', 'item_name'=>'Elementor Pro', 'license_limit'=>999, 'site_count'=>1, 'expires'=>'2048-06-06 23:59:59', 'activations_left'=>998, 'payment_id'=>'12345',
'customer_name'=>'GPLREADY', 'customer_email'=>'full@gplready.com', 'price_id'=>'1');

	}

	public static function deactivate_license() {
		$body_args = [
			'edd_action' => 'deactivate_license',
			'license' => Admin::get_license_key(),
		];

		$license_data = self::remote_post( $body_args );

		return array('success'=>true, 'license'=>'valid', 'item_name'=>'Elementor Pro', 'license_limit'=>999, 'site_count'=>1, 'expires'=>'2048-06-06 23:59:59', 'activations_left'=>998, 'payment_id'=>'12345',
'customer_name'=>'GPLREADY', 'customer_email'=>'full@gplready.com', 'price_id'=>'1');
	}

	public static function set_license_data( $license_data, $expiration = null ) {
		
		set_transient( 'elementor_pro_license_data', $license_data, $expiration );
	}

	public static function get_license_data( $force_request = false ) {
		$license_data = get_transient( 'elementor_pro_license_data' );
		
		return $license_data;
	}

	public static function get_version( $force_update = true ) {
		$cache_key = 'elementor_pro_remote_info_api_data_' . ELEMENTOR_PRO_VERSION;

		$info_data = get_site_transient( $cache_key );

		if ( $force_update || false === $info_data ) {
			$updater = Admin::get_updater_instance();

			$translations = wp_get_installed_translations( 'plugins' );
			$plugin_translations = [];
			if ( isset( $translations[ $updater->plugin_slug ] ) ) {
				$plugin_translations = $translations[ $updater->plugin_slug ];
			}

			$locales = array_values( get_available_languages() );

			$body_args = [
				'edd_action' => 'get_version',
				'name' => $updater->plugin_name,
				'slug' => $updater->plugin_slug,
				'version' => $updater->plugin_version,
				'license' => Admin::get_license_key(),
				'translations' => wp_json_encode( $plugin_translations ),
				'locales' => wp_json_encode( $locales ),
				'beta' => 'yes' === get_option( 'elementor_beta', 'no' ),
			];

			$info_data = self::remote_post( $body_args );

			set_site_transient( $cache_key, $info_data, 12999 * HOUR_IN_SECONDS );
		}

		return $info_data;
	}

	/**
	 * @param $version
	 *
	 * @deprecated 2.7.0 Use `API::get_plugin_package_url()` method instead.
	 */
	public static function get_previous_package_url( $version ) {
		return self::get_plugin_package_url( $version );
	}

	public static function get_plugin_package_url( $version ) {
		$url = 'https://my.elementor.com/api/v1/pro-downloads/';

		$body_args = [
			'item_name' => self::PRODUCT_NAME,
			'version' => $version,
			'license' => Admin::get_license_key(),
			'url' => home_url(),
		];

		$response = 200;

		return $response;
		
		$response_code = (int) wp_remote_retrieve_response_code( $response );
		$data = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( 401 === $response_code ) {
			return new \WP_Error( $response_code, $data['message'] );
		}

		if ( 200 !== $response_code ) {
			return new \WP_Error( $response_code, __( 'HTTP Error', 'elementor-pro' ) );
		}

		$data = json_decode( wp_remote_retrieve_body( $response ), true );
		if ( empty( $data ) || ! is_array( $data ) ) {
			return new \WP_Error( 'no_json', __( 'An error occurred, please try again', 'elementor-pro' ) );
		}

		return $data['package_url'];
	}

	public static function get_previous_versions() {
		$url = 'https://my.elementor.com/api/v1/pro-downloads/';

		$body_args = [
			'version' => ELEMENTOR_PRO_VERSION,
			'license' => Admin::get_license_key(),
			'url' => home_url(),
		];

		$response = 200;

		return $response;
		

		$response_code = (int) wp_remote_retrieve_response_code( $response );
		$data = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( 401 === $response_code ) {
			return new \WP_Error( $response_code, $data['message'] );
		}

		if ( 200 !== $response_code ) {
			return new \WP_Error( $response_code, __( 'HTTP Error', 'elementor-pro' ) );
		}

		$data = json_decode( wp_remote_retrieve_body( $response ), true );
		if ( empty( $data ) || ! is_array( $data ) ) {
			return new \WP_Error( 'no_json', __( 'An error occurred, please try again', 'elementor-pro' ) );
		}

		return $data['versions'];
	}

	public static function get_errors() {
		return [
			'no_activations_left' => sprintf( __( '<strong>You have no more activations left.</strong> <a href="%s" target="_blank">Please upgrade to a more advanced license</a> (you\'ll only need to cover the difference).', 'elementor-pro' ), 'https://go.elementor.com/upgrade/' ),
			'expired' => sprintf( __( '<strong>Your License Has Expired.</strong> <a href="%s" target="_blank">Renew your license today</a> to keep getting feature updates, premium support and unlimited access to the template library.', 'elementor-pro' ), 'https://go.elementor.com/renew/' ),
			'missing' => __( 'Your license is missing. Please check your key again.', 'elementor-pro' ),
			'revoked' => __( '<strong>Your license key has been cancelled</strong> (most likely due to a refund request). Please consider acquiring a new license.', 'elementor-pro' ),
			'key_mismatch' => __( 'Your license is invalid for this domain. Please check your key again.', 'elementor-pro' ),
		];
	}

	public static function get_error_message( $error ) {
		$errors = self::get_errors();

		if ( isset( $errors[ $error ] ) ) {
			$error_msg = $errors[ $error ];
		} else {
			$error_msg = __( 'An error occurred. Please check your internet connection and try again. If the problem persists, contact our support.', 'elementor-pro' ) . ' (' . $error . ')';
		}

		return $error_msg;
	}
}
