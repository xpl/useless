/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------

We define custom syntax separately from server/tests.js trait, to let
you define assertions without need to actually plug in tests.js trait.

------------------------------------------------------------------------
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*  For marking custom assertions
 */
Tags.define ('assertion')

/*  For marking methods with test procedure
 */
Tags.define ('withTest')