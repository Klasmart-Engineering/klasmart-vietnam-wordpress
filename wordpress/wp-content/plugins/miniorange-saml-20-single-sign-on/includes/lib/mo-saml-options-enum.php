<?php
include "MoSAMLBasicEnum.php";

class mo_saml_options_enum_sso_loginMoSAML extends MoSAMLBasicEnum {
	const Force_authentication = 'mo_saml_force_authentication';
}

class mo_saml_options_enum_identity_providerMoSAML extends MoSAMLBasicEnum{
	const SP_Base_Url='mo_saml_sp_base_url';
	const SP_Entity_ID = 'mo_saml_sp_entity_id';
}

class mo_saml_options_enum_service_providerMoSAML extends MoSAMLBasicEnum{
	const Identity_name ='saml_identity_name';
	const Login_binding_type='saml_login_binding_type';
	const Login_URL = 'saml_login_url';
	const Logout_binding_type = 'saml_logout_binding_type';
	const Logout_URL = 'saml_logout_url';
	const Issuer = 'saml_issuer';
	const X509_certificate = 'saml_x509_certificate';
	const Request_signed = 'saml_request_signed';
	const Guide_name = 'saml_identity_provider_guide_name';
    const Is_encoding_enabled = 'mo_saml_encoding_enabled';
}

class mo_saml_options_test_configuration extends MoSAMLBasicEnum{
    const SAML_REQUEST = 'MO_SAML_REQUEST';
    const SAML_RESPONSE = 'MO_SAML_RESPONSE';
    const TEST_CONFIG_ERROR_LOG = 'MO_SAML_TEST';
}

class mo_saml_options_enum_attribute_mappingMoSAML extends MoSAMLBasicEnum{
 	const Attribute_Username ='saml_am_username';
 	const Attribute_Email = 'saml_am_email';
 	const Attribute_First_name ='saml_am_first_name';
 	const Attribute_Last_name = 'saml_am_last_name';
 	const Attribute_Group_name ='saml_am_group_name';
	const Attribute_Account_matcher = 'saml_am_account_matcher';
}

class mo_saml_options_enum_role_mappingMoSAML extends MoSAMLBasicEnum{
	const Role_do_not_assign_role_unlisted = 'saml_am_dont_allow_unlisted_user_role';
	const Role_default_role ='saml_am_default_user_role';
}


class mo_saml_options_error_constants extends MoSAMLBasicEnum{
 	const Error_no_certificate = "Unable to find a certificate .";
	const Cause_no_certificate = "No signature found in SAML Response or Assertion. Please sign at least one of them.";
	const Error_wrong_certificate = "Unable to find a certificate matching the configured fingerprint.";
	const Cause_wrong_certificate = "X.509 Certificate field in plugin does not match the certificate found in SAML Response.";
	const Error_invalid_audience = "Invalid Audience URI.";
	const Cause_invalid_audience = "The value of 'Audience URI' field on Identity Provider's side is incorrect";
	const Error_issuer_not_verfied = "Issuer cannot be verified.";
	const Cause_issuer_not_verfied = "IdP Entity ID configured and the one found in SAML Response do not match";
}


class mo_saml_options_plugin_constants extends  MoSAMLBasicEnum{
     const CMS_Name = "WP";
     const Application_Name = "WP miniOrange SAML 2.0 SSO Plugin";
     const Application_type = "SAML";
     const Version = "4.9.16";
     const HOSTNAME = "https://login.xecurify.com";
     const WP_Version = "5.9";
     const PLUGIN_FILE = "miniorange-saml-20-single-sign-on/login.php";
}

class mo_saml_options_plugin_idp_specific_ads extends MoSAMLBasicEnum{
    public static $idp_specific_ads = array(
        "ADFS" => ["Text"=>"miniOrange SAML Single Sign On Plugin allows users in a corporate Active Directory setup to log into WordPress using their Windows Credentials. Once the user is logged in to a domain joined machine, they will not have to re-enter credentials in order to log into WordPress.",
            "Link"=>"https://plugins.miniorange.com/saml-single-sign-on-sso-wordpress-using-adfs#step8",
            "Heading"=>"Enable Windows SSO","Link_Title"=>"See Configuration"],
        "Azure AD" => ["Text"=>"User Sync for Azure AD / Azure B2C plugin Offers WordPress integrations with Microsoft Azure AD Graph APIs and provides Bi-directional User Synchronization, PowerBI integration, Sharepoint integration, etc.",
            "Link"=>"https://wordpress.org/plugins/user-sync-for-azure-office365/","Heading"=>"User Sync for Azure AD / Azure B2C","Link_Title"=>"Download","Know_Title"=>"Know More","Know_Link"=>"https://plugins.miniorange.com/wordpress-azure-office365-integrations"],
        "Azure B2C" => ["Text"=>"User Sync for Azure AD / Azure B2C plugin Offers WordPress integrations with Microsoft Azure AD Graph APIs and provides Bi-directional User Synchronization, PowerBI integration, Sharepoint integration, etc.",
            "Link"=>"https://wordpress.org/plugins/user-sync-for-azure-office365/","Heading"=>"User Sync for Azure AD / Azure B2C","Link_Title"=>"Download","Know_Title"=>"Know More","Know_Link"=>"https://plugins.miniorange.com/wordpress-azure-office365-integrations"],
        "SalesForce" => ["Text"=>"Object Data Sync For Salesforce plugin provides a bi-directional data synchronization between WP and Salesforce objects",
            "Link"=>"https://wordpress.org/plugins/object-data-sync-for-salesforce/","Heading"=>"Object Data Sync For Salesforce","Link_Title"=>"Download","Know_Title"=>"Know More","Know_Link"=>"https://plugins.miniorange.com/wordpress-object-sync-for-salesforce"],
        "Community" => ["Text"=>"Object Data Sync For Salesforce plugin provides a bi-directional data synchronization between WP and Salesforce objects",
            "Link"=>"https://wordpress.org/plugins/object-data-sync-for-salesforce/","Heading"=>"Object Data Sync For Salesforce","Link_Title"=>"Download","Know_Title"=>"Know More","Know_Link"=>"https://plugins.miniorange.com/wordpress-object-sync-for-salesforce"],
        "Windows SSO" => ["Text"=>"miniOrange SAML Single Sign On Plugin allows users in a corporate Active Directory setup to log into WordPress using their Windows Credentials. Once the user is logged in to a domain joined machine, they will not have to re-enter credentials in order to log into WordPress.",
            "Link"=>"https://plugins.miniorange.com/saml-single-sign-on-sso-wordpress-using-adfs#step8",
            "Heading"=>"Enable Windows SSO","Link_Title"=>"See Configuration"],
    );
}

class mo_saml_options_suggested_add_ons extends  MoSAMLBasicEnum {
    public static $suggested_addons = array (
        "page-restriction" => ["title"=>"Page / Post Restriction",
            "text" => "Restrict access to WordPress pages/posts based on user roles and their login status, thereby protecting these pages/posts from unauthorized access.",
            "link" => "https://wordpress.org/plugins/page-and-post-restriction/","knw-link"=>"https://plugins.miniorange.com/wordpress-page-restriction"],
        "scim" => ["title"=>"SCIM User Provisioning",
            "text" => "Allows real-time user sync (automatic user create, delete, and update) from your Identity Provider such as Azure, Okta, Onelogin into your WordPress site.",
            "link" => "https://wordpress.org/plugins/scim-user-provisioning/","knw-link"=>"https://plugins.miniorange.com/wordpress-user-provisioning"]
    );
}

class mo_saml_options_plugin_idp extends  MoSAMLBasicEnum{
    public static $IDP_GUIDES = array(
        "ADFS" => ["adfs","saml-single-sign-on-sso-wordpress-using-adfs"],
        "Azure AD" => ["azure-ad","saml-single-sign-on-sso-wordpress-using-azure-ad"],
        "Azure B2C" => ["azure-b2c","saml-single-sign-on-sso-wordpress-using-azure-b2c"],
        "Okta" => ["okta","saml-single-sign-on-sso-wordpress-using-okta"],
        "Keycloak" => ["jboss-keycloak","saml-single-sign-on-sso-wordpress-using-jboss-keycloak"],
       "Google Apps" => ["google-apps","saml-single-sign-on-sso-wordpress-using-google-apps"],
       "Windows SSO" => ["windows","saml-single-sign-on-sso-wordpress-using-adfs"],
       "SalesForce" => ["salesforce","saml-single-sign-on-sso-wordpress-using-salesforce"],
       "WordPress" => ["wordpress","saml-single-sign-on-sso-between-two-wordpress-sites"],
       "Office 365" => ["office365","saml-single-sign-on-sso-wordpress-using-azure-ad"],
       "Auth0"=>["auth0","saml-single-sign-on-sso-wordpress-using-auth0"],
       "MiniOrange" => ["miniorange","saml-single-sign-on-sso-wordpress-using-miniorange"],
       "Community" => ["salesforce","saml-single-sign-on-sso-wordpress-using-salesforce community"], 
       "Classlink"=>["classlink","saml-single-sign-on-sso-login-wordpress-using-classlink"], 
       "OneLogin" => ["onelogin","saml-single-sign-on-sso-wordpress-using-onelogin"],
        "Centrify" => ["centrify","saml-single-sign-on-sso-wordpress-using-centrify"],
        "PingFederate" => ["pingfederate","saml-single-sign-on-sso-wordpress-using-pingfederate"],
        "Shibboleth 2" => ["shibboleth2","saml-single-sign-on-sso-wordpress-using-shibboleth2"],
        "Shibboleth 3" => ["shibboleth3","saml-single-sign-on-sso-wordpress-using-shibboleth3"],
        "AbsorbLMS" => ["absorb-lms","saml-single-sign-on-sso-wordpress-using-absorb-lms"],
        "Gluu Server"  => ["gluu-server","saml-single-sign-on-sso-wordpress-using-gluu-server"],
        "JumpCloud" => ["jumpcloud","saml-single-sign-on-sso-wordpress-using-jumpcloud"],
        "IdentityServer" => ["identityserver4","saml-single-sign-on-sso-wordpress-using-identityserver4"],
        "Degreed" => ["degreed","saml-single-sign-on-sso-wordpress-using-degreed"],
        "CyberArk" => ["cyberark","saml-single-sign-on-sso-for-wordpress-using-cyberark"],
        "Duo"=>["duo","saml-single-sign-on-sso-wordpress-using-duo"],
        "FusionAuth"=>["fusionauth","saml-single-sign-on-sso-wordpress-using-fusionauth"],
        "SecureAuth"=>["secureauth","saml-single-sign-on-sso-wordpress-using-secureauth"],
        "NetIQ"=>["netIQ","saml-single-sign-on-sso-wordpress-using-netIQ"],
        "Fonteva"=>["fonteva","saml-single-sign-on-sso-wordpress-using-fonteva"],
        "SURFconext"=>["surfconext","surfconext-saml-single-sign-on-sso-in-wordpress"], 
        "PhenixID"=>["phenixid","phenixid-saml-single-sign-on-sso-login-wordpresss"], 
        "Authanvil"=>["authanvil","saml-single-sign-on-sso-wordpress-using-authanvil"],
        "Bitium" => ["bitium","saml-single-sign-on-sso-wordpress-using-bitium"],
        "CA Identity"=>["ca-identity","saml-single-sign-on-sso-wordpress-using-ca-identity"],
        "OpenAM" => ["openam","saml-single-sign-on-sso-wordpress-using-openam"],
        "Oracle" => ["oracle-enterprise-manager","saml-single-sign-on-sso-wordpress-using-oracle-enterprise-manager"],
        "PingOne" => ["pingone","saml-single-sign-on-sso-wordpress-using-pingone"],
        "RSA SecureID"=>["rsa-secureid","saml-single-sign-on-sso-wordpress-using-rsa-secureid"],
        "SimpleSAMLphp" => ["simplesaml","saml-single-sign-on-sso-wordpress-using-simplesaml"],
        "WSO2"=>["wso2","saml-single-sign-on-sso-wordpress-using-wso2"],
        "Custom IDP"=>["custom-idp","saml-single-sign-on-sso-wordpress-using-custom-idp"],     
     
    );
}

class mo_saml_options_plugin_idp_videos extends  MoSAMLBasicEnum{
    public static $IDP_VIDEOS = array(
        "azure-ad"=> "4-zyFUFiOXU",
        "azure-b2c"=> "B8zCYjhV3UU",
        "adfs"=> "rLBHbRbrY5E",
        "okta"=> "YHE8iYojUqM",
        "salesforce"=> "LRQrmgr255Q",
        "google-apps"=> "5BwzEjgZiu4",
        "onelogin"=> "_Hsot_RG9YY",
        "miniorange"=> "eamf9s6JpbA",
        "jboss-keycloak"=> "Io6x1fTNWHI",
        "absorb-lms"=> "",
        "degreed"=> "",
        "jumpcloud"=> "",
        "pingfederate"=> "",
        "pingone"=> "",
        "centrify"=> "",
        "oracle-enterprise-manager"=> "",
        "bitium"=> "",
        "shibboleth2"=> "",
        "shibboleth3"=> "",
        "gluu-server"=> "",
        "simplesaml"=> "",
        "openam"=> "",
        "authanvil"=> "",
        "auth0"=> "54pz6m5h9mk",
        "ca-identity" => "",
        "wso2" => "",
        "rsa-secureid" => "",
        "custom-idp" => "gilfhNFYsgc",
        "wordpress" => "DA61F7PqnQU",
         "office365" => "4-zyFUFiOXU",
        "jumpcloud" => "OTP35vbQrts",
        "identityserver4" => "",
        "cyberark" => "",
        "duo" => "",
        "fusionauth" => "",
        "secureauth" => "",
        "netIQ" => "",
        "fonteva" => "",
        "windows" => "rLBHbRbrY5E",
        "surfconext" => "",
        "phenixid" => "",
        "classlink" => "",
        "community" => "",

    );
}

class mo_saml_options_addons extends MoSAMLBasicEnum{

    public static $ADDON_URL = array(

        'scim'                          =>  'https://plugins.miniorange.com/wordpress-user-provisioning',
        'page_restriction'              =>  'https://plugins.miniorange.com/wordpress-page-restriction',
        'file_prevention'               =>  'https://plugins.miniorange.com/wordpress-media-restriction',
        'ssologin'                      =>  'https://plugins.miniorange.com/wordpress-sso-login-audit',
        'buddypress'                    =>  'https://plugins.miniorange.com/wordpress-buddypress-integrator',
        'learndash'                     =>  'https://plugins.miniorange.com/wordpress-learndash-integrator',
        'attribute_based_redirection'   =>  'https://plugins.miniorange.com/wordpress-attribute-based-redirection-restriction',
        'ssosession'                    =>  'https://plugins.miniorange.com/sso-session-management',
        'fsso'                          =>  'https://plugins.miniorange.com/incommon-federation-single-sign-on-sso',
        'paid_mem_pro'                  =>  'https://plugins.miniorange.com/paid-membership-pro-integrator',
        'memberpress'                   =>  'https://plugins.miniorange.com/wordpress-memberpress-integrator',
        'wp_members'                    =>  'https://plugins.miniorange.com/wordpress-members-integrator',
        'woocommerce'                   =>  'https://plugins.miniorange.com/wordpress-woocommerce-integrator',
        'guest_login'                   =>  'https://plugins.miniorange.com/guest-user-login',
        'profile_picture_add_on'        =>  'https://plugins.miniorange.com/wordpress-profile-picture-map'

    );

    public static $WP_ADDON_URL = array(
        'wp-page-restriction' => ['Page Restriction WordPress (WP) – Protect WP Pages/Post','Protect content access for WordPress (WP) | Give access to specific WP pages and posts based on user’s roles and logged in/logged out status...','https://wordpress.org/plugins/page-and-post-restriction/'],
        'wp-scim' => ['SCIM user provisioning','SCIM User Provisioning plugin, Create, Update, delete users from Azure AD, Okta, OneLogin, G-suite, Centrify, JumpCloud, Idaptive, Gluu, WS02 and all SCIM …','https://wordpress.org/plugins/scim-user-provisioning/']
    );

    public static $ADDON_TITLE = array(

        'scim'                          =>  'SCIM User Provisioning',
        'page_restriction'              =>  'Page and Post Restriction',
        'file_prevention'               =>  'Prevent File Access',
        'ssologin'                      =>  'SSO Login Audit',
        'buddypress'                    =>  'BuddyPress Integrator',
        'learndash'                     =>  'Learndash Integrator',
        'attribute_based_redirection'   =>  'Attribute Based Redirection',
        'ssosession'                    =>  'SSO Session Management',
        'fsso'                          =>  'Federation Single Sign-On',
        'memberpress'                   =>  'MemberPress Integrator',
        'wp_members'                    =>  'WP-Members Integrator',
        'woocommerce'                   =>  'WooCommerce Integrator',
        'guest_login'                   =>  'Guest Login',
        'profile_picture_add_on'        =>  'Profile Picture Add-on',
        'paid_mem_pro'                  =>  'PaidMembership Pro Integrator'
    );

    public static $RECOMMENDED_ADDONS_PATH = array(

        "learndash"     =>  "sfwd-lms/sfwd_lms.php",
        "buddypress"    =>  "buddypress/bp-loader.php",
        "paid_mem_pro"  =>  "paid-memberships-pro/paid-memberships-pro.php",
        "memberpress"   =>  "memberpress/memberpress.php",
        "wp_members"    =>  "wp-members/wp-members.php",
        "woocommerce"   =>  "woocommerce/woocommerce.php"
    );

}

class mo_saml_license_plans extends MoSAMLBasicEnum {

    public static $license_plans = array (
        'standard'                  => 'WP SAML SSO Standard Plan',
        'premium'                   => 'WP SAML SSO Premium Plan',
        'enterprise'                => 'WP SAML SSO Enterprise Plan',
        'enterprise-multiple-idp'   => 'WP SAML SSO Enterprise Multiple-IDP Plan',
        'all-inclusive'             => 'WP SAML SSO All Inclusive Plan',
        'premium-multisite'         => 'WP SAML SSO Premium Multisite Plan',
        'enterprise-multisite'      => 'WP SAML SSO Enterprise Multisite Plan',
        'all-inclusive-multisite'   => 'WP SAML SSO All Inclusive Multisite Plan',
        'help'                      => 'Not Sure'
    );

    public static $license_plans_slug = array (
        'standard'                  => '16.0.2@16.0.2',
        'premium'                   => '12.0.2@12.0.2',
        'enterprise'                => '12.0.2@12.0.2',
        'enterprise-multiple-idp'   => '25.0.1@25.0.1',
        'all-inclusive'             => '25.0.1@25.0.1',
    );
}

class mo_saml_time_zones extends  MoSAMLBasicEnum {

    public static $time_zones = array(
        "(GMT-11:00) Niue Time" => "Pacific/Niue",
        "(GMT-11:00) Samoa Standard Time" => "Pacific/Pago_Pago",
        "(GMT-10:00) Cook Islands Standard Time" => "Pacific/Rarotonga",
        "(GMT-10:00) Hawaii-Aleutian Standard Time" => "Pacific/Honolulu",
        "(GMT-10:00) Tahiti Time" => "Pacific/Tahiti",
        "(GMT-09:30) Marquesas Time" => "Pacific/Marquesas",
        "(GMT-09:00) Gambier Time" => "Pacific/Gambier",
        "(GMT-09:00) Hawaii-Aleutian Time (Adak)" => "America/Adak",
        "(GMT-08:00) Alaska Time - Anchorage" => "America/Anchorage",
        "(GMT-08:00) Alaska Time - Juneau" => "America/Juneau",
        "(GMT-08:00) Alaska Time - Metlakatla" => "America/Metlakatla",
        "(GMT-08:00) Alaska Time - Nome" => "America/Nome",
        "(GMT-08:00) Alaska Time - Sitka" => "America/Sitka",
        "(GMT-08:00) Alaska Time - Yakutat" => "America/Yakutat",
        "(GMT-08:00) Pitcairn Time" => "Pacific/Pitcairn",
        "(GMT-07:00) Mexican Pacific Standard Time" => "America/Hermosillo",
        "(GMT-07:00) Mountain Standard Time - Creston" => "America/Creston",
        "(GMT-07:00) Mountain Standard Time - Dawson" => "America/Dawson",
        "(GMT-07:00) Mountain Standard Time - Dawson Creek" => "America/Dawson_Creek",
        "(GMT-07:00) Mountain Standard Time - Fort Nelson" => "America/Fort_Nelson",
        "(GMT-07:00) Mountain Standard Time - Phoenix" => "America/Phoenix",
        "(GMT-07:00) Mountain Standard Time - Whitehorse" => "America/Whitehorse",
        "(GMT-07:00) Pacific Time - Los Angeles" => "America/Los_Angeles",
        "(GMT-07:00) Pacific Time - Tijuana" => "America/Tijuana",
        "(GMT-07:00) Pacific Time - Vancouver" => "America/Vancouver",
        "(GMT-06:00) Central Standard Time - Belize" => "America/Belize",
        "(GMT-06:00) Central Standard Time - Costa Rica" => "America/Costa_Rica",
        "(GMT-06:00) Central Standard Time - El Salvador" => "America/El_Salvador",
        "(GMT-06:00) Central Standard Time - Guatemala" => "America/Guatemala",
        "(GMT-06:00) Central Standard Time - Managua" => "America/Managua",
        "(GMT-06:00) Central Standard Time - Regina" => "America/Regina",
        "(GMT-06:00) Central Standard Time - Swift Current" => "America/Swift_Current",
        "(GMT-06:00) Central Standard Time - Tegucigalpa" => "America/Tegucigalpa",
        "(GMT-06:00) Easter Island Time" => "Pacific/Easter",
        "(GMT-06:00) Galapagos Time" => "Pacific/Galapagos",
        "(GMT-06:00) Mexican Pacific Time - Chihuahua" => "America/Chihuahua",
        "(GMT-06:00) Mexican Pacific Time - Mazatlan" => "America/Mazatlan",
        "(GMT-06:00) Mountain Time - Boise" => "America/Boise",
        "(GMT-06:00) Mountain Time - Cambridge Bay" => "America/Cambridge_Bay",
        "(GMT-06:00) Mountain Time - Denver" => "America/Denver",
        "(GMT-06:00) Mountain Time - Edmonton" => "America/Edmonton",
        "(GMT-06:00) Mountain Time - Inuvik" => "America/Inuvik",
        "(GMT-06:00) Mountain Time - Ojinaga" => "America/Ojinaga",
        "(GMT-06:00) Mountain Time - Yellowknife" => "America/Yellowknife",
        "(GMT-05:00) Acre Standard Time - Eirunepe" => "America/Eirunepe",
        "(GMT-05:00) Acre Standard Time - Rio Branco" => "America/Rio_Branco",
        "(GMT-05:00) Central Time - Bahia Banderas" => "America/Bahia_Banderas",
        "(GMT-05:00) Central Time - Beulah, North Dakota" => "America/North_Dakota/Beulah",
        "(GMT-05:00) Central Time - Center, North Dakota" => "America/North_Dakota/Center",
        "(GMT-05:00) Central Time - Chicago" => "America/Chicago",
        "(GMT-05:00) Central Time - Knox, Indiana" => "America/Indiana/Knox",
        "(GMT-05:00) Central Time - Matamoros" => "America/Matamoros",
        "(GMT-05:00) Central Time - Menominee" => "America/Menominee",
        "(GMT-05:00) Central Time - Merida" => "America/Merida",
        "(GMT-05:00) Central Time - Mexico City" => "America/Mexico_City",
        "(GMT-05:00) Central Time - Monterrey" => "America/Monterrey",
        "(GMT-05:00) Central Time - New Salem, North Dakota" => "America/North_Dakota/New_Salem",
        "(GMT-05:00) Central Time - Rainy River" => "America/Rainy_River",
        "(GMT-05:00) Central Time - Rankin Inlet" => "America/Rankin_Inlet",
        "(GMT-05:00) Central Time - Resolute" => "America/Resolute",
        "(GMT-05:00) Central Time - Tell City, Indiana" => "America/Indiana/Tell_City",
        "(GMT-05:00) Central Time - Winnipeg" => "America/Winnipeg",
        "(GMT-05:00) Colombia Standard Time" => "America/Bogota",
        "(GMT-05:00) Eastern Standard Time - Atikokan" => "America/Atikokan",
        "(GMT-05:00) Eastern Standard Time - Cancun" => "America/Cancun",
        "(GMT-05:00) Eastern Standard Time - Jamaica" => "America/Jamaica",
        "(GMT-05:00) Eastern Standard Time - Panama" => "America/Panama",
        "(GMT-05:00) Ecuador Time" => "America/Guayaquil",
        "(GMT-05:00) Peru Standard Time" => "America/Lima",
        "(GMT-04:00) Amazon Standard Time - Boa Vista" => "America/Boa_Vista",
        "(GMT-04:00) Amazon Standard Time - Campo Grande" => "America/Campo_Grande",
        "(GMT-04:00) Amazon Standard Time - Cuiaba" => "America/Cuiaba",
        "(GMT-04:00) Amazon Standard Time - Manaus" => "America/Manaus",
        "(GMT-04:00) Amazon Standard Time - Porto Velho" => "America/Porto_Velho",
        "(GMT-04:00) Atlantic Standard Time - Barbados" => "America/Barbados",
        "(GMT-04:00) Atlantic Standard Time - Blanc-Sablon" => "America/Blanc-Sablon",
        "(GMT-04:00) Atlantic Standard Time - Curaçao" => "America/Curacao",
        "(GMT-04:00) Atlantic Standard Time - Martinique" => "America/Martinique",
        "(GMT-04:00) Atlantic Standard Time - Port of Spain" => "America/Port_of_Spain",
        "(GMT-04:00) Atlantic Standard Time - Puerto Rico" => "America/Puerto_Rico",
        "(GMT-04:00) Atlantic Standard Time - Santo Domingo" => "America/Santo_Domingo",
        "(GMT-04:00) Bolivia Time" => "America/La_Paz",
        "(GMT-04:00) Chile Time" => "America/Santiago",
        "(GMT-04:00) Cuba Time" => "America/Havana",
        "(GMT-04:00) Eastern Time - Detroit" => "America/Detroit",
        "(GMT-04:00) Eastern Time - Grand Turk" => "America/Grand_Turk",
        "(GMT-04:00) Eastern Time - Indianapolis" => "America/Indiana/Indianapolis",
        "(GMT-04:00) Eastern Time - Iqaluit" => "America/Iqaluit",
        "(GMT-04:00) Eastern Time - Louisville" => "America/Kentucky/Louisville",
        "(GMT-04:00) Eastern Time - Marengo, Indiana" => "America/Indiana/Marengo",
        "(GMT-04:00) Eastern Time - Monticello, Kentucky" => "America/Kentucky/Monticello",
        "(GMT-04:00) Eastern Time - Nassau" => "America/Nassau",
        "(GMT-04:00) Eastern Time - New York" => "America/New_York",
        "(GMT-04:00) Eastern Time - Nipigon" => "America/Nipigon",
        "(GMT-04:00) Eastern Time - Pangnirtung" => "America/Pangnirtung",
        "(GMT-04:00) Eastern Time - Petersburg, Indiana" => "America/Indiana/Petersburg",
        "(GMT-04:00) Eastern Time - Port-au-Prince" => "America/Port-au-Prince",
        "(GMT-04:00) Eastern Time - Thunder Bay" => "America/Thunder_Bay",
        "(GMT-04:00) Eastern Time - Toronto" => "America/Toronto",
        "(GMT-04:00) Eastern Time - Vevay, Indiana" => "America/Indiana/Vevay",
        "(GMT-04:00) Eastern Time - Vincennes, Indiana" => "America/Indiana/Vincennes",
        "(GMT-04:00) Eastern Time - Winamac, Indiana" => "America/Indiana/Winamac",
        "(GMT-04:00) Guyana Time" => "America/Guyana",
        "(GMT-04:00) Paraguay Time" => "America/Asuncion",
        "(GMT-04:00) Venezuela Time" => "America/Caracas",
        "(GMT-03:00) Argentina Standard Time - Buenos Aires" => "America/Argentina/Buenos_Aires",
        "(GMT-03:00) Argentina Standard Time - Catamarca" => "America/Argentina/Catamarca",
        "(GMT-03:00) Argentina Standard Time - Cordoba" => "America/Argentina/Cordoba",
        "(GMT-03:00) Argentina Standard Time - Jujuy" => "America/Argentina/Jujuy",
        "(GMT-03:00) Argentina Standard Time - La Rioja" => "America/Argentina/La_Rioja",
        "(GMT-03:00) Argentina Standard Time - Mendoza" => "America/Argentina/Mendoza",
        "(GMT-03:00) Argentina Standard Time - Rio Gallegos" => "America/Argentina/Rio_Gallegos",
        "(GMT-03:00) Argentina Standard Time - Salta" => "America/Argentina/Salta",
        "(GMT-03:00) Argentina Standard Time - San Juan" => "America/Argentina/San_Juan",
        "(GMT-03:00) Argentina Standard Time - San Luis" => "America/Argentina/San_Luis",
        "(GMT-03:00) Argentina Standard Time - Tucuman" => "America/Argentina/Tucuman",
        "(GMT-03:00) Argentina Standard Time - Ushuaia" => "America/Argentina/Ushuaia",
        "(GMT-03:00) Atlantic Time - Bermuda" => "Atlantic/Bermuda",
        "(GMT-03:00) Atlantic Time - Glace Bay" => "America/Glace_Bay",
        "(GMT-03:00) Atlantic Time - Goose Bay" => "America/Goose_Bay",
        "(GMT-03:00) Atlantic Time - Halifax" => "America/Halifax",
        "(GMT-03:00) Atlantic Time - Moncton" => "America/Moncton",
        "(GMT-03:00) Atlantic Time - Thule" => "America/Thule",
        "(GMT-03:00) Brasilia Standard Time - Araguaina" => "America/Araguaina",
        "(GMT-03:00) Brasilia Standard Time - Bahia" => "America/Bahia",
        "(GMT-03:00) Brasilia Standard Time - Belem" => "America/Belem",
        "(GMT-03:00) Brasilia Standard Time - Fortaleza" => "America/Fortaleza",
        "(GMT-03:00) Brasilia Standard Time - Maceio" => "America/Maceio",
        "(GMT-03:00) Brasilia Standard Time - Recife" => "America/Recife",
        "(GMT-03:00) Brasilia Standard Time - Santarem" => "America/Santarem",
        "(GMT-03:00) Brasilia Standard Time - Sao Paulo" => "America/Sao_Paulo",
        "(GMT-03:00) Chile Time" => "America/Santiago",
        "(GMT-03:00) Falkland Islands Standard Time" => "Atlantic/Stanley",
        "(GMT-03:00) French Guiana Time" => "America/Cayenne",
        "(GMT-03:00) Palmer Time" => "Antarctica/Palmer",
        "(GMT-03:00) Punta Arenas Time" => "America/Punta_Arenas",
        "(GMT-03:00) Rothera Time" => "Antarctica/Rothera",
        "(GMT-03:00) Suriname Time" => "America/Paramaribo",
        "(GMT-03:00) Uruguay Standard Time" => "America/Montevideo",
        "(GMT-02:30) Newfoundland Time" => "America/St_Johns",
        "(GMT-02:00) Fernando de Noronha Standard Time" => "America/Noronha",
        "(GMT-02:00) South Georgia Time" => "Atlantic/South_Georgia",
        "(GMT-02:00) St. Pierre & Miquelon Time" => "America/Miquelon",
        "(GMT-02:00) West Greenland Time" => "America/Nuuk",
        "(GMT-01:00) Cape Verde Standard Time" => "Atlantic/Cape_Verde",
        "(GMT+00:00) Azores Time" => "Atlantic/Azores",
        "(GMT+00:00) Coordinated Universal Time" => "UTC",
        "(GMT+00:00) East Greenland Time" => "America/Scoresbysund",
        "(GMT+00:00) Greenwich Mean Time" => "Etc/GMT",
        "(GMT+00:00) Greenwich Mean Time - Abidjan" => "Africa/Abidjan",
        "(GMT+00:00) Greenwich Mean Time - Accra" => "Africa/Accra",
        "(GMT+00:00) Greenwich Mean Time - Bissau" => "Africa/Bissau",
        "(GMT+00:00) Greenwich Mean Time - Danmarkshavn" => "America/Danmarkshavn",
        "(GMT+00:00) Greenwich Mean Time - Monrovia" => "Africa/Monrovia",
        "(GMT+00:00) Greenwich Mean Time - Reykjavik" => "Atlantic/Reykjavik",
        "(GMT+00:00) Greenwich Mean Time - São Tomé" => "Africa/Sao_Tome",
        "(GMT+01:00) Central European Standard Time - Algiers" => "Africa/Algiers",
        "(GMT+01:00) Central European Standard Time - Tunis" => "Africa/Tunis",
        "(GMT+01:00) Ireland Time" => "Europe/Dublin",
        "(GMT+01:00) Morocco Time" => "Africa/Casablanca",
        "(GMT+01:00) United Kingdom Time" => "Europe/London",
        "(GMT+01:00) West Africa Standard Time - Lagos" => "Africa/Lagos",
        "(GMT+01:00) West Africa Standard Time - Ndjamena" => "Africa/Ndjamena",
        "(GMT+01:00) Western European Time - Canary" => "Atlantic/Canary",
        "(GMT+01:00) Western European Time - Faroe" => "Atlantic/Faroe",
        "(GMT+01:00) Western European Time - Lisbon" => "Europe/Lisbon",
        "(GMT+01:00) Western European Time - Madeira" => "Atlantic/Madeira",
        "(GMT+01:00) Western Sahara Time" => "Africa/El_Aaiun",
        "(GMT+02:00) Central Africa Time - Khartoum" => "Africa/Khartoum",
        "(GMT+02:00) Central Africa Time - Maputo" => "Africa/Maputo",
        "(GMT+02:00) Central Africa Time - Windhoek" => "Africa/Windhoek",
        "(GMT+02:00) Central European Time - Amsterdam" => "Europe/Amsterdam",
        "(GMT+02:00) Central European Time - Andorra" => "Europe/Andorra",
        "(GMT+02:00) Central European Time - Belgrade" => "Europe/Belgrade",
        "(GMT+02:00) Central European Time - Berlin" => "Europe/Berlin",
        "(GMT+02:00) Central European Time - Brussels" => "Europe/Brussels",
        "(GMT+02:00) Central European Time - Budapest" => "Europe/Budapest",
        "(GMT+02:00) Central European Time - Ceuta" => "Africa/Ceuta",
        "(GMT+02:00) Central European Time - Copenhagen" => "Europe/Copenhagen",
        "(GMT+02:00) Central European Time - Gibraltar" => "Europe/Gibraltar",
        "(GMT+02:00) Central European Time - Luxembourg" => "Europe/Luxembourg",
        "(GMT+02:00) Central European Time - Madrid" => "Europe/Madrid",
        "(GMT+02:00) Central European Time - Malta" => "Europe/Malta",
        "(GMT+02:00) Central European Time - Monaco" => "Europe/Monaco",
        "(GMT+02:00) Central European Time - Oslo" => "Europe/Oslo",
        "(GMT+02:00) Central European Time - Paris" => "Europe/Paris",
        "(GMT+02:00) Central European Time - Prague" => "Europe/Prague",
        "(GMT+02:00) Central European Time - Rome" => "Europe/Rome",
        "(GMT+02:00) Central European Time - Stockholm" => "Europe/Stockholm",
        "(GMT+02:00) Central European Time - Tirane" => "Europe/Tirane",
        "(GMT+02:00) Central European Time - Vienna" => "Europe/Vienna",
        "(GMT+02:00) Central European Time - Warsaw" => "Europe/Warsaw",
        "(GMT+02:00) Central European Time - Zurich" => "Europe/Zurich",
        "(GMT+02:00) Eastern European Standard Time - Cairo" => "Africa/Cairo",
        "(GMT+02:00) Eastern European Standard Time - Kaliningrad" => "Europe/Kaliningrad",
        "(GMT+02:00) Eastern European Standard Time - Tripoli" => "Africa/Tripoli",
        "(GMT+02:00) South Africa Standard Time" => "Africa/Johannesburg",
        "(GMT+02:00) Troll Time" => "Antarctica/Troll",
        "(GMT+03:00) Arabian Standard Time - Baghdad" => "Asia/Baghdad",
        "(GMT+03:00) Arabian Standard Time - Qatar" => "Asia/Qatar",
        "(GMT+03:00) Arabian Standard Time - Riyadh" => "Asia/Riyadh",
        "(GMT+03:00) East Africa Time - Juba" => "Africa/Juba",
        "(GMT+03:00) East Africa Time - Nairobi" => "Africa/Nairobi",
        "(GMT+03:00) Eastern European Time - Amman" => "Asia/Amman",
        "(GMT+03:00) Eastern European Time - Athens" => "Europe/Athens",
        "(GMT+03:00) Eastern European Time - Beirut" => "Asia/Beirut",
        "(GMT+03:00) Eastern European Time - Bucharest" => "Europe/Bucharest",
        "(GMT+03:00) Eastern European Time - Chisinau" => "Europe/Chisinau",
        "(GMT+03:00) Eastern European Time - Damascus" => "Asia/Damascus",
        "(GMT+03:00) Eastern European Time - Gaza" => "Asia/Gaza",
        "(GMT+03:00) Eastern European Time - Hebron" => "Asia/Hebron",
        "(GMT+03:00) Eastern European Time - Helsinki" => "Europe/Helsinki",
        "(GMT+03:00) Eastern European Time - Kiev" => "Europe/Kiev",
        "(GMT+03:00) Eastern European Time - Nicosia" => "Asia/Nicosia",
        "(GMT+03:00) Eastern European Time - Riga" => "Europe/Riga",
        "(GMT+03:00) Eastern European Time - Sofia" => "Europe/Sofia",
        "(GMT+03:00) Eastern European Time - Tallinn" => "Europe/Tallinn",
        "(GMT+03:00) Eastern European Time - Uzhhorod" => "Europe/Uzhgorod",
        "(GMT+03:00) Eastern European Time - Vilnius" => "Europe/Vilnius",
        "(GMT+03:00) Eastern European Time - Zaporozhye" => "Europe/Zaporozhye",
        "(GMT+03:00) Famagusta Time" => "Asia/Famagusta",
        "(GMT+03:00) Israel Time" => "Asia/Jerusalem",
        "(GMT+03:00) Kirov Time" => "Europe/Kirov",
        "(GMT+03:00) Moscow Standard Time - Minsk" => "Europe/Minsk",
        "(GMT+03:00) Moscow Standard Time - Moscow" => "Europe/Moscow",
        "(GMT+03:00) Moscow Standard Time - Simferopol" => "Europe/Simferopol",
        "(GMT+03:00) Syowa Time" => "Antarctica/Syowa",
        "(GMT+03:00) Turkey Time" => "Europe/Istanbul",
        "(GMT+04:00) Armenia Standard Time" => "Asia/Yerevan",
        "(GMT+04:00) Astrakhan Time" => "Europe/Astrakhan",
        "(GMT+04:00) Azerbaijan Standard Time" => "Asia/Baku",
        "(GMT+04:00) Georgia Standard Time" => "Asia/Tbilisi",
        "(GMT+04:00) Gulf Standard Time" => "Asia/Dubai",
        "(GMT+04:00) Mauritius Standard Time" => "Indian/Mauritius",
        "(GMT+04:00) Réunion Time" => "Indian/Reunion",
        "(GMT+04:00) Samara Standard Time" => "Europe/Samara",
        "(GMT+04:00) Saratov Time" => "Europe/Saratov",
        "(GMT+04:00) Seychelles Time" => "Indian/Mahe",
        "(GMT+04:00) Ulyanovsk Time" => "Europe/Ulyanovsk",
        "(GMT+04:00) Volgograd Standard Time" => "Europe/Volgograd",
        "(GMT+04:30) Afghanistan Time" => "Asia/Kabul",
        "(GMT+04:30) Iran Time" => "Asia/Tehran",
        "(GMT+05:00) French Southern & Antarctic Time" => "Indian/Kerguelen",
        "(GMT+05:00) Maldives Time" => "Indian/Maldives",
        "(GMT+05:00) Mawson Time" => "Antarctica/Mawson",
        "(GMT+05:00) Pakistan Standard Time" => "Asia/Karachi",
        "(GMT+05:00) Tajikistan Time" => "Asia/Dushanbe",
        "(GMT+05:00) Turkmenistan Standard Time" => "Asia/Ashgabat",
        "(GMT+05:00) Uzbekistan Standard Time - Samarkand" => "Asia/Samarkand",
        "(GMT+05:00) Uzbekistan Standard Time - Tashkent" => "Asia/Tashkent",
        "(GMT+05:00) West Kazakhstan Time - Aqtau" => "Asia/Aqtau",
        "(GMT+05:00) West Kazakhstan Time - Aqtobe" => "Asia/Aqtobe",
        "(GMT+05:00) West Kazakhstan Time - Atyrau" => "Asia/Atyrau",
        "(GMT+05:00) West Kazakhstan Time - Oral" => "Asia/Oral",
        "(GMT+05:00) West Kazakhstan Time - Qyzylorda" => "Asia/Qyzylorda",
        "(GMT+05:00) Yekaterinburg Standard Time" => "Asia/Yekaterinburg",
        "(GMT+05:30) Indian Standard Time - Colombo" => "Asia/Colombo",
        "(GMT+05:30) Indian Standard Time - Kolkata" => "Asia/Kolkata",
        "(GMT+05:45) Nepal Time" => "Asia/Kathmandu",
        "(GMT+06:00) Bangladesh Standard Time" => "Asia/Dhaka",
        "(GMT+06:00) Bhutan Time" => "Asia/Thimphu",
        "(GMT+06:00) East Kazakhstan Time - Almaty" => "Asia/Almaty",
        "(GMT+06:00) East Kazakhstan Time - Kostanay" => "Asia/Qostanay",
        "(GMT+06:00) Indian Ocean Time" => "Indian/Chagos",
        "(GMT+06:00) Kyrgyzstan Time" => "Asia/Bishkek",
        "(GMT+06:00) Omsk Standard Time" => "Asia/Omsk",
        "(GMT+06:00) Urumqi Time" => "Asia/Urumqi",
        "(GMT+06:00) Vostok Time" => "Antarctica/Vostok",
        "(GMT+06:30) Cocos Islands Time" => "Indian/Cocos",
        "(GMT+06:30) Myanmar Time" => "Asia/Yangon",
        "(GMT+07:00) Barnaul Time" => "Asia/Barnaul",
        "(GMT+07:00) Christmas Island Time" => "Indian/Christmas",
        "(GMT+07:00) Davis Time" => "Antarctica/Davis",
        "(GMT+07:00) Hovd Standard Time" => "Asia/Hovd",
        "(GMT+07:00) Indochina Time - Bangkok" => "Asia/Bangkok",
        "(GMT+07:00) Indochina Time - Ho Chi Minh City" => "Asia/Ho_Chi_Minh",
        "(GMT+07:00) Krasnoyarsk Standard Time - Krasnoyarsk" => "Asia/Krasnoyarsk",
        "(GMT+07:00) Krasnoyarsk Standard Time - Novokuznetsk" => "Asia/Novokuznetsk",
        "(GMT+07:00) Novosibirsk Standard Time" => "Asia/Novosibirsk",
        "(GMT+07:00) Tomsk Time" => "Asia/Tomsk",
        "(GMT+07:00) Western Indonesia Time - Jakarta" => "Asia/Jakarta",
        "(GMT+07:00) Western Indonesia Time - Pontianak" => "Asia/Pontianak",
        "(GMT+08:00) Australian Western Standard Time - Casey" => "Antarctica/Casey",
        "(GMT+08:00) Australian Western Standard Time - Perth" => "Australia/Perth",
        "(GMT+08:00) Brunei Darussalam Time" => "Asia/Brunei",
        "(GMT+08:00) Central Indonesia Time" => "Asia/Makassar",
        "(GMT+08:00) China Standard Time - Macao" => "Asia/Macau",
        "(GMT+08:00) China Standard Time - Shanghai" => "Asia/Shanghai",
        "(GMT+08:00) Hong Kong Standard Time" => "Asia/Hong_Kong",
        "(GMT+08:00) Irkutsk Standard Time" => "Asia/Irkutsk",
        "(GMT+08:00) Malaysia Time - Kuala Lumpur" => "Asia/Kuala_Lumpur",
        "(GMT+08:00) Malaysia Time - Kuching" => "Asia/Kuching",
        "(GMT+08:00) Philippine Standard Time" => "Asia/Manila",
        "(GMT+08:00) Singapore Standard Time" => "Asia/Singapore",
        "(GMT+08:00) Taipei Standard Time" => "Asia/Taipei",
        "(GMT+08:00) Ulaanbaatar Standard Time - Choibalsan" => "Asia/Choibalsan",
        "(GMT+08:00) Ulaanbaatar Standard Time - Ulaanbaatar" => "Asia/Ulaanbaatar",
        "(GMT+08:45) Australian Central Western Standard Time" => "Australia/Eucla",
        "(GMT+09:00) East Timor Time" => "Asia/Dili",
        "(GMT+09:00) Eastern Indonesia Time" => "Asia/Jayapura",
        "(GMT+09:00) Japan Standard Time" => "Asia/Tokyo",
        "(GMT+09:00) Korean Standard Time - Pyongyang" => "Asia/Pyongyang",
        "(GMT+09:00) Korean Standard Time - Seoul" => "Asia/Seoul",
        "(GMT+09:00) Palau Time" => "Pacific/Palau",
        "(GMT+09:00) Yakutsk Standard Time - Chita" => "Asia/Chita",
        "(GMT+09:00) Yakutsk Standard Time - Khandyga" => "Asia/Khandyga",
        "(GMT+09:00) Yakutsk Standard Time - Yakutsk" => "Asia/Yakutsk",
        "(GMT+09:30) Australian Central Standard Time" => "Australia/Darwin",
        "(GMT+09:30) Central Australia Time - Adelaide" => "Australia/Adelaide",
        "(GMT+09:30) Central Australia Time - Broken Hill" => "Australia/Broken_Hill",
        "(GMT+10:00) Australian Eastern Standard Time - Brisbane" => "Australia/Brisbane",
        "(GMT+10:00) Australian Eastern Standard Time - Lindeman" => "Australia/Lindeman",
        "(GMT+10:00) Chamorro Standard Time" => "Pacific/Guam",
        "(GMT+10:00) Chuuk Time" => "Pacific/Chuuk",
        "(GMT+10:00) Dumont-d’Urville Time" => "Antarctica/DumontDUrville",
        "(GMT+10:00) Eastern Australia Time - Currie" => "Australia/Currie",
        "(GMT+10:00) Eastern Australia Time - Hobart" => "Australia/Hobart",
        "(GMT+10:00) Eastern Australia Time - Melbourne" => "Australia/Melbourne",
        "(GMT+10:00) Eastern Australia Time - Sydney" => "Australia/Sydney",
        "(GMT+10:00) Papua New Guinea Time" => "Pacific/Port_Moresby",
        "(GMT+10:00) Vladivostok Standard Time - Ust-Nera" => "Asia/Ust-Nera",
        "(GMT+10:00) Vladivostok Standard Time - Vladivostok" => "Asia/Vladivostok",
        "(GMT+10:30) Lord Howe Time" => "Australia/Lord_Howe",
        "(GMT+11:00) Bougainville Time" => "Pacific/Bougainville",
        "(GMT+11:00) Kosrae Time" => "Pacific/Kosrae",
        "(GMT+11:00) Macquarie Island Time" => "Antarctica/Macquarie",
        "(GMT+11:00) Magadan Standard Time" => "Asia/Magadan",
        "(GMT+11:00) New Caledonia Standard Time" => "Pacific/Noumea",
        "(GMT+11:00) Norfolk Island Time" => "Pacific/Norfolk",
        "(GMT+11:00) Ponape Time" => "Pacific/Pohnpei",
        "(GMT+11:00) Sakhalin Standard Time" => "Asia/Sakhalin",
        "(GMT+11:00) Solomon Islands Time" => "Pacific/Guadalcanal",
        "(GMT+11:00) Srednekolymsk Time" => "Asia/Srednekolymsk",
        "(GMT+11:00) Vanuatu Standard Time" => "Pacific/Efate",
        "(GMT+12:00) Anadyr Standard Time" => "Asia/Anadyr",
        "(GMT+12:00) Fiji Time" => "Pacific/Fiji",
        "(GMT+12:00) Gilbert Islands Time" => "Pacific/Tarawa",
        "(GMT+12:00) Marshall Islands Time - Kwajalein" => "Pacific/Kwajalein",
        "(GMT+12:00) Marshall Islands Time - Majuro" => "Pacific/Majuro",
        "(GMT+12:00) Nauru Time" => "Pacific/Nauru",
        "(GMT+12:00) New Zealand Time" => "Pacific/Auckland",
        "(GMT+12:00) Petropavlovsk-Kamchatski Standard Time" => "Asia/Kamchatka",
        "(GMT+12:00) Tuvalu Time" => "Pacific/Funafuti",
        "(GMT+12:00) Wake Island Time" => "Pacific/Wake",
        "(GMT+12:00) Wallis & Futuna Time" => "Pacific/Wallis",
        "(GMT+12:45) Chatham Time" => "Pacific/Chatham",
        "(GMT+13:00) Apia Time" => "Pacific/Apia",
        "(GMT+13:00) Phoenix Islands Time" => "Pacific/Enderbury",
        "(GMT+13:00) Tokelau Time" => "Pacific/Fakaofo",
        "(GMT+13:00) Tonga Standard Time" => "Pacific/Tongatapu",
        "(GMT+14:00) Line Islands Time" => "Pacific/Kiritimati"
    );
}

class mo_saml_error_log extends MoSAMLBasicEnum {
 	const PLUGIN_CONFIGURATIONS = '[Downloading Debug Logs] Plugin Configurations on Download: 
 	                                [   SSO_Login = {{SSO_Login}},
 	                                    Service_Provider_Metadata = {{Identity_Provider}},
 	                                    Service_Provider_Setup = {{Service_Provider}},
 	                                    Attribute_Mapping = {{Attribute_Mapping}},
 	                                    Role_Mapping = {{Role_Mapping}},
 	                                    Version_Dependencies = {{Version_dependencies}}
 	                                ]';
    const INVALID_CERT = 'Invalid x509 certificate Provided';
    const IDP_CERT_NULL ='No x509 certificate Provided';
    const CLEAR_ATTR_LIST = 'Attributes List cleared';
    const SERVICE_PROVIDER_CONF = '[Service Provider Setup] Configuration saved: 
                                   [ saml_identity_name = {{saml_identity_name}},
                                     saml_login_url = {{saml_login_url}} ,
                                     saml_issuer = {{saml_issuer}},
                                     saml_x509_certificate = {{saml_x509_certificate}},
                                     mo_saml_encoding_enabled = {{iconv_enabled}}
                                    ]';
    const INCORRECT_CONFIGURATION_AZUREB2C = 'Couldn\'t save settings due to invalid entries.[saml_identity_name = {{saml_identity_name}}, same_login_url = {{same_login_url}}, saml_issuer = {{saml_issuer}}, saml_b2c_tenant_id = {{saml_b2c_tenant_id}} ]';
    const INVAILD_IDP_NAME_FORMAT = 'INVAILD_IDP_NAME_FORMAT IDP_NAME = {{saml_identity_name}}';
    const AZURE_B2C_CONFIGURATION_TENTENT_ID ='[Service Provider Setup] Configuration saved: [ Azure B2C saml_b2c_tenant_id = {{b2c_tenant_id}}]';
    const AZURE_B2C_CONFIGURATION_IEF_ID = '[Service Provider Setup] Configuration saved: Azure B2C saml_IdentityExperienceFramework_id = {{saml_IdentityExperienceFramework_id}}';
    const AZURE_B2C_CONFIGURATION_PEF_ID = '[Service Provider Setup] Configuration saved: Azure B2C saml_ProxyIdentityExperienceFramework_id = {{saml_ProxyIdentityExperienceFramework_id}}';
    const AZURE_B2C_PLUGIN_CONFIGURATION_UPDATED = 'Plugin Configuration updated with Azure B2C metadata';
    const AZURE_B2C_POLICIES = 'Azure B2C Policies Generated';
    const SP_ENTITY_ID ='[Service Provider Metadata] Configuration saved:[ sp_entity_id = ' . '{{sp_entity_id}} '. ' ]';
    const DEFAULT_ROLE_ID = '[Role Mapping] Configuration saved:[ default_user_role = {{default_user_role}} ]';
    const UPLOAD_METADATA_SUCCESS = '[Upload IDP Metadata] IDP Metadata fetched from file';
    const UPLOAD_METADATA_CURL_ERROR = '[Upload IDP Metadata] PHP CURL disabled. Can\'t fetch IDP metadata from URL';
    const UPLOAD_METADATA_URL = '[Upload IDP Metadata] Fetching IDP metadata from URL: {{url}} ';
    const UPLOAD_METADATA_SUCCESS_FROM_URL = '[Upload IDP Metadata] IDP metadata fetched from URL ';
    const UPLOAD_METADATA_ERROR_FROM_URL ='[Upload IDP Metadata] An error occurred while fetching IDP metadata from the URL';
    const UPLOAD_METADATA_INVALID_FILE = '[Upload IDP Metadata] IDP Metadata file is invalid';
    const UPLOAD_METADATA_INVALID_URL = '[Upload IDP Metadata] IDP Metadata URL is invalid';
    const UPLOAD_METADATA_INVALID_CONFIGURATION = '[Upload IDP Metadata] Invalid IDP Configuration found in metadata';
    const UPLOAD_METADATA_CONFIGURATION_SAVED = '[Upload IDP Metadata] Configuration saved from IDP metadata: 
                                                  [ saml_login_url = {{saml_login_url}} ,
                                                   saml_issuer = {{saml_issuer}},
                                                   saml_x509_certificate = {{saml_x509_certificate}},
                                                 ]';
    const LOGIN_WIDGET_AUTHN_REQUEST= '[MO SAML SSO] Initiating SAML Request:
                          [ SSO URL = {{ssoUrl}},
                            ACS URL = {{acsUrl}},
                            Force Authentication = {{force_authn}},
                            SP Entity ID = {{sp_entity_id}},
                            RelayState = {{sendRelayState}} ]';
    const LOGIN_WIDGET_SAML_REQUEST = '[MO SAML SSO] SAML Request generated: [ SAMLRequest = {{samlRequest}} ]';
    const LOGIN_WIDGET_RELAYSTATE_SENT = '[MO SAML SSO] Sending SAML Request to IDP SSO URL: {{redirect}}';
    const LOGIN_WIDGET_SAML_RESPONSE = '[MO SAML SSO] SAML Response received from the IDP: {{samlResponse}}';
    const LOGIN_WIDGET_RELAYSTATE_RECEIVED = '[MO SAML SSO] RelayState received from the IDP:{{relayState}}';
    const LOGIN_WIDGET_SAML_STATUS = '[MO SAML SSO] SAML Response Status:[ Status Code =  {{status}},Status Message =  {[statusMessage}}  ]';
    const LOGIN_WIDGET_INVAILD_SAML_STATUS = '[MO SAML SSO] Invalid Status Code in the SAML Response';
    const LOGIN_WIDGET_RESPONSE_ASSERATION_NOT_SIGNED= '[MO SAML SSO] SAML Response and Assertion are not signed.';
    const LOGIN_WIDGET_VAILD_RESPONSE   = '[MO SAML SSO] SAML Response validated. Performing user mapping check.';
    Const ATTRIBUTES_RECEIVED_IN_TEST_CONFIGURATION = '[MO SAML SSO TEST-VALIDATE] {{{attrs}}}';
    const LOGIN_WIDGET_USER_EXISTS = '[MO SAML SSO] User found with username: {{userName}}';
    const LOGIN_WIDGET_CERT_NOT_MATCHED = '[MO SAML SSO] Certificate mismatch or Invalid Signature found in the SAML Response';
    const LOGIN_WIDGET_EMAIL_EXISTS = '[MO SAML SSO] User found with email: {{user_email}}';
    const LOGIN_WIDGET_NEW_USER = "[MO SAML SSO] User not found. Creating a new user account:[ Username = {{user_email}},
                                                                                               Email =  {{user_email}},
                                                                                                 User ID = {{user_id}} ]";
    const LOGIN_WIDGET_USER_CREATION_FAILED ='[MO SAML SSO] An error occurred while creating the user';
    const LOGIN_WIDGET_DEFAULT_ROLE = "[MO SAML SSO] Assigning user to the default role :{{defaultRole}}";
    const LOGIN_WIDGET_USER_CREATION_FAILED_USERNAME_EXISTS = '[MO SAML SSO] An error occurred while creating the user. A user with the same username already exists in the WordPress site';
    const LOGIN_WIDGET_COOKIE_CREATED = "[MO SAML SSO] Generating Auth Cookie for User ID: {{user_id}}";
    const LOGIN_WIDGET_REDIRECT_URL_AFTER_LOGIN = "[MO SAML SSO] Redirecting the user to URL: {{redirect_url}}";
    const UTLITITES_INVAID_AUDIENCE_URI = "[MO SAML SSO] Invalid Audience URI found in the SAML Response:
                                            [ SP Entity ID = {{spEntityId}}, 
                                              Assertion Audience = {{audiences}}, ]";
    const UTLITITES_INVAID_ISSUER = "[MO SAML SSO] Invalid Issuer found for the SAML Response:
                                     [ IDP Entity ID = {{issuerToValidateAgainst}},
                                     Issuer = {{issuer}} ]";
                    
    public static function showMessage($message , $data=array()) {
    	$message = constant( "self::".$message );
    	foreach($data as $key => $value) {
    		if(is_array($value))
    			$value = json_encode($value,JSON_UNESCAPED_SLASHES);
    		$message = str_replace("{{" . $key . "}}", $value , $message);
    		$message = preg_replace("/\s+/"," ",$message);
    	}
    	return $message;
    }

		
} 
