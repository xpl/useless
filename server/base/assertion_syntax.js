/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------

We define custom syntax separately from server/tests.js trait, to let
you define assertions without need to actually plug in tests.js trait.

------------------------------------------------------------------------
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*  For marking custom assertions
 */
_.defineTagKeyword ('assertion')

/*  For marking methods with test procedure
 */
_.defineTagKeyword ('withTest')