# Contributing to the WooCommerce Connect 

Hi! Thank you for your interest in contributing to WooCommerce Connect. We appreciate it.

Although what you see today is a plugin, the goal for  WooCommerce Connect is to be a fully integrated part of WooCommerce core. To get us from feature plugin to core, WooCommerce Connect development is now in ALPHA - this means that you should expect frequent and sometimes large changes as features are added. During ALPHA testing, we'll be fixing problems and working to launch a feature-complete BETA. Successful BETA will culminate in a PR for inclusion into a future WooCommerce release.

**We do not recommend you use this ALPHA software on a production site.**

The emphasis for initial release of WooCommerce Connect is shipping simplified. We are providing a Shipping Zones-compatible USPS shipping method and, coming soon, a Shipping Zones compatible Canada Post shipping method. Shipping Zones are [an exciting new feature of WooCommerce 2.6](https://woocommerce.wordpress.com/2016/02/10/shipping-zones-to-ship-with-2-6/).

Our USPS shipping method fetches rates for customers' carts in real time from the USPS server. No USPS account is needed - you can use the default one if you like.

There are many ways to contribute – reporting bugs, feature suggestions, and fixing bugs.

## Reporting Bugs, Asking Questions, Sending Suggestions

Open [a GitHub issue](https://github.com/Automattic/woocommerce-connect-client/issues/), that's all. If you want to prefix the title with a “Question:”, “Bug:”, or the general area of the application, that would be helpful but is no means mandatory. If you have write access, add the appropriate labels.

If you're filing a bug, specific steps to reproduce are helpful. Please include what you expected to see and what happened instead.

## Setting up USPS shipping with the WooCommerce Connect 

1. Install or update to [WordPress 4.5](https://wordpress.org/download/) or higher.
2. Install and activate WooCommerce 2.6 or higher. The WooCommerce Connect will NOT work with WooCommerce 2.5 or older.  A plugin ZIP will be available soon, but for now you need to download a ZIP of the master branch or clone the WooCommerce plugin from its [repository on GitHub](https://github.com/woothemes/woocommerce).
3. Install and activate [Jetpack 3.9.6 or higher](https://wordpress.org/plugins/jetpack/).
4. Connect your Jetpack to WordPress.com. Although there is no specific module you need to activate, the WooCommerce Connect requires the Jetpack connection to authenticate with the WooCommerce Connect server.
5. Install and activate this feature plugin.
6. Add at least one product with weight and dimensions.
7. Add at least one shipping zone, and add the WooCommerce Connect USPS shipping method to it.
8. Configure the USPS shipping method origin ZIP code, and select at least one service.
9. USPS rates will automatically display during checkout once a destination address is given.

## Running PHPUnit Tests

The WooCommerce Connect client tests use [WooCommerce's tests installer](https://github.com/woothemes/woocommerce/blob/master/tests/bin/install.sh) to get up and running.

In order to successfully bootstrap your testing environment, you'll need the following:

* `mysql`
* `mysqladmin`
* `svn`
* `git`
* `phpunit`

Once you have the prerequisites, run the tests installer:

`./tests/bin/install-wc-tests.sh <db-name> <db-user> <db-pass> [db-host] [wp-version]`

For example, if you had a `mysql` database running on `localhost` and with the default `root` user, you could run:

`./tests/bin/install-wc-tests.sh wcc_tests root ''`

After the tests installer has completed, simply run `phpunit` from the root of the `woocommerce-connect-client` plugin directory.

If everything is running correctly, you'll see output like the following:

```
Installing...
Running as single site... To run multisite, use -c tests/phpunit/multisite.xml
Installing WooCommerce...
Not running ajax tests. To execute these, use --group ajax.
Not running ms-files tests. To execute these, use --group ms-files.
Not running external-http tests. To execute these, use --group external-http.

PHPUnit 4.8.24 by Sebastian Bergmann and contributors.

...............................................

Time: 2.55 seconds, Memory: 32.00Mb

OK (47 tests, 105 assertions)
```

## We're Here To Help

We encourage you to ask for help. We want your first experience with WooCommerce Connect to be a good one, so don't be shy. If you're wondering why something is the way it is, or how a decision was made, you can tag issues with [Type] Question or prefix them with “Question:”

## License

WooCommerce Connect is licensed under [GNU General Public License v2 (or later)](/LICENSE.md).

All materials contributed should be compatible with the GPLv2. This means that if you own the material, you agree to license it under the GPLv2 license. If you are contributing code that is not your own, such as adding a component from another Open Source project, or adding an `npm` package, you need to make sure you follow these steps:

1. Check that the code has a license. If you can't find one, you can try to contact the original author and get permission to use, or ask them to release under a compatible Open Source license.
2. Check the license is compatible with [GPLv2](http://www.gnu.org/licenses/license-list.en.html#GPLCompatibleLicenses), note that the Apache 2.0 license is *not* compatible.
3. Add the code source URL (e.g. a GitHub URL), the files where it's used in the WooCommerce Connect and the full license terms to [`CREDITS.md`](/CREDITS.md)
4. Add attribution to the code, if applicable. This line should include the copyright notice of the source, and a reference to the license contained in [`CREDITS.md`](/CREDITS.md)
