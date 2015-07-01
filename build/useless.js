/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------

Entry point.

------------------------------------------------------------------------
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


/*  As we do not run macro processor on server scripts, $include reduces to
    built-in require (if running in Node.js environment)
    ======================================================================== */

if (typeof require !== 'undefined') {
    _ = require ('underscore')
    $include = require }


/*  Bootstrap code (couple of absolutely urgent fixes to underscore.js)
    ======================================================================== */

_ = (function () {

    _.mixin ({
        zipWith: function (rows, zippo) {
                    return _.reduce (_.rest (rows), function (memo, row) {
                        return _.times (Math.max ((memo && memo.length) || 0, (row && row.length) || 0), function (i) {
                            return zippo (memo && memo[i], row && row[i]) }) }, _.first (rows)) } })

    if ('a1 b2 c3' !== _.zipWith ([['a','b','c'], [1,2,3]], function (a, b) { return a + b }).join (' ')) {
        throw new Error ('_.zipWith broken') }

    return _ }) ()


/*  Internal dependencies
    ======================================================================== */


/*  Third party (free-licensed)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/*	Unicode hack (third party)
	======================================================================== */

/*! unicode_hack.js
    Copyright (C) 2010-2012,2014  Marcelo Gibson de Castro Gonçalves. All rights reserved.
    
    Copying and distribution of this file, with or without modification,
    are permitted in any medium without royalty provided the copyright
    notice and this notice are preserved.  This file is offered as-is,
    without any warranty.
*/
unicode_hack = (function() {
    /* Regexps to match characters in the BMP according to their Unicode category.
       Extracted from running all characters (code units) against Java's
       Character.getType. Source:
       https://ideone.com/04llh4
    */
    var unicodeCategories = {
        Cn:'[\u0378\u0379\u037f-\u0383\u038b\u038d\u03a2\u0528-\u0530\u0557\u0558\u0560\u0588\u058b-\u0590\u05c8-\u05cf\u05eb-\u05ef\u05f5-\u05ff\u0604\u0605\u061c\u061d\u070e\u074b\u074c\u07b2-\u07bf\u07fb-\u07ff\u082e\u082f\u083f\u085c\u085d\u085f-\u08ff\u0978\u0980\u0984\u098d\u098e\u0991\u0992\u09a9\u09b1\u09b3-\u09b5\u09ba\u09bb\u09c5\u09c6\u09c9\u09ca\u09cf-\u09d6\u09d8-\u09db\u09de\u09e4\u09e5\u09fc-\u0a00\u0a04\u0a0b-\u0a0e\u0a11\u0a12\u0a29\u0a31\u0a34\u0a37\u0a3a\u0a3b\u0a3d\u0a43-\u0a46\u0a49\u0a4a\u0a4e-\u0a50\u0a52-\u0a58\u0a5d\u0a5f-\u0a65\u0a76-\u0a80\u0a84\u0a8e\u0a92\u0aa9\u0ab1\u0ab4\u0aba\u0abb\u0ac6\u0aca\u0ace\u0acf\u0ad1-\u0adf\u0ae4\u0ae5\u0af0\u0af2-\u0b00\u0b04\u0b0d\u0b0e\u0b11\u0b12\u0b29\u0b31\u0b34\u0b3a\u0b3b\u0b45\u0b46\u0b49\u0b4a\u0b4e-\u0b55\u0b58-\u0b5b\u0b5e\u0b64\u0b65\u0b78-\u0b81\u0b84\u0b8b-\u0b8d\u0b91\u0b96-\u0b98\u0b9b\u0b9d\u0ba0-\u0ba2\u0ba5-\u0ba7\u0bab-\u0bad\u0bba-\u0bbd\u0bc3-\u0bc5\u0bc9\u0bce\u0bcf\u0bd1-\u0bd6\u0bd8-\u0be5\u0bfb-\u0c00\u0c04\u0c0d\u0c11\u0c29\u0c34\u0c3a-\u0c3c\u0c45\u0c49\u0c4e-\u0c54\u0c57\u0c5a-\u0c5f\u0c64\u0c65\u0c70-\u0c77\u0c80\u0c81\u0c84\u0c8d\u0c91\u0ca9\u0cb4\u0cba\u0cbb\u0cc5\u0cc9\u0cce-\u0cd4\u0cd7-\u0cdd\u0cdf\u0ce4\u0ce5\u0cf0\u0cf3-\u0d01\u0d04\u0d0d\u0d11\u0d3b\u0d3c\u0d45\u0d49\u0d4f-\u0d56\u0d58-\u0d5f\u0d64\u0d65\u0d76-\u0d78\u0d80\u0d81\u0d84\u0d97-\u0d99\u0db2\u0dbc\u0dbe\u0dbf\u0dc7-\u0dc9\u0dcb-\u0dce\u0dd5\u0dd7\u0de0-\u0df1\u0df5-\u0e00\u0e3b-\u0e3e\u0e5c-\u0e80\u0e83\u0e85\u0e86\u0e89\u0e8b\u0e8c\u0e8e-\u0e93\u0e98\u0ea0\u0ea4\u0ea6\u0ea8\u0ea9\u0eac\u0eba\u0ebe\u0ebf\u0ec5\u0ec7\u0ece\u0ecf\u0eda\u0edb\u0ede-\u0eff\u0f48\u0f6d-\u0f70\u0f98\u0fbd\u0fcd\u0fdb-\u0fff\u10c6-\u10cf\u10fd-\u10ff\u1249\u124e\u124f\u1257\u1259\u125e\u125f\u1289\u128e\u128f\u12b1\u12b6\u12b7\u12bf\u12c1\u12c6\u12c7\u12d7\u1311\u1316\u1317\u135b\u135c\u137d-\u137f\u139a-\u139f\u13f5-\u13ff\u169d-\u169f\u16f1-\u16ff\u170d\u1715-\u171f\u1737-\u173f\u1754-\u175f\u176d\u1771\u1774-\u177f\u17de\u17df\u17ea-\u17ef\u17fa-\u17ff\u180f\u181a-\u181f\u1878-\u187f\u18ab-\u18af\u18f6-\u18ff\u191d-\u191f\u192c-\u192f\u193c-\u193f\u1941-\u1943\u196e\u196f\u1975-\u197f\u19ac-\u19af\u19ca-\u19cf\u19db-\u19dd\u1a1c\u1a1d\u1a5f\u1a7d\u1a7e\u1a8a-\u1a8f\u1a9a-\u1a9f\u1aae-\u1aff\u1b4c-\u1b4f\u1b7d-\u1b7f\u1bab-\u1bad\u1bba-\u1bbf\u1bf4-\u1bfb\u1c38-\u1c3a\u1c4a-\u1c4c\u1c80-\u1ccf\u1cf3-\u1cff\u1de7-\u1dfb\u1f16\u1f17\u1f1e\u1f1f\u1f46\u1f47\u1f4e\u1f4f\u1f58\u1f5a\u1f5c\u1f5e\u1f7e\u1f7f\u1fb5\u1fc5\u1fd4\u1fd5\u1fdc\u1ff0\u1ff1\u1ff5\u1fff\u2065-\u2069\u2072\u2073\u208f\u209d-\u209f\u20ba-\u20cf\u20f1-\u20ff\u218a-\u218f\u23f4-\u23ff\u2427-\u243f\u244b-\u245f\u2700\u27cb\u27cd\u2b4d-\u2b4f\u2b5a-\u2bff\u2c2f\u2c5f\u2cf2-\u2cf8\u2d26-\u2d2f\u2d66-\u2d6e\u2d71-\u2d7e\u2d97-\u2d9f\u2da7\u2daf\u2db7\u2dbf\u2dc7\u2dcf\u2dd7\u2ddf\u2e32-\u2e7f\u2e9a\u2ef4-\u2eff\u2fd6-\u2fef\u2ffc-\u2fff\u3040\u3097\u3098\u3100-\u3104\u312e-\u3130\u318f\u31bb-\u31bf\u31e4-\u31ef\u321f\u32ff\u4db6-\u4dbf\u9fcc-\u9fff\ua48d-\ua48f\ua4c7-\ua4cf\ua62c-\ua63f\ua674-\ua67b\ua698-\ua69f\ua6f8-\ua6ff\ua78f\ua792-\ua79f\ua7aa-\ua7f9\ua82c-\ua82f\ua83a-\ua83f\ua878-\ua87f\ua8c5-\ua8cd\ua8da-\ua8df\ua8fc-\ua8ff\ua954-\ua95e\ua97d-\ua97f\ua9ce\ua9da-\ua9dd\ua9e0-\ua9ff\uaa37-\uaa3f\uaa4e\uaa4f\uaa5a\uaa5b\uaa7c-\uaa7f\uaac3-\uaada\uaae0-\uab00\uab07\uab08\uab0f\uab10\uab17-\uab1f\uab27\uab2f-\uabbf\uabee\uabef\uabfa-\uabff\ud7a4-\ud7af\ud7c7-\ud7ca\ud7fc-\ud7ff\ufa2e\ufa2f\ufa6e\ufa6f\ufada-\ufaff\ufb07-\ufb12\ufb18-\ufb1c\ufb37\ufb3d\ufb3f\ufb42\ufb45\ufbc2-\ufbd2\ufd40-\ufd4f\ufd90\ufd91\ufdc8-\ufdef\ufdfe\ufdff\ufe1a-\ufe1f\ufe27-\ufe2f\ufe53\ufe67\ufe6c-\ufe6f\ufe75\ufefd\ufefe\uff00\uffbf-\uffc1\uffc8\uffc9\uffd0\uffd1\uffd8\uffd9\uffdd-\uffdf\uffe7\uffef-\ufff8\ufffe\uffff]',
        Lu:'[\u0041-\u005a\u00c0-\u00d6\u00d8-\u00de\u0100\u0102\u0104\u0106\u0108\u010a\u010c\u010e\u0110\u0112\u0114\u0116\u0118\u011a\u011c\u011e\u0120\u0122\u0124\u0126\u0128\u012a\u012c\u012e\u0130\u0132\u0134\u0136\u0139\u013b\u013d\u013f\u0141\u0143\u0145\u0147\u014a\u014c\u014e\u0150\u0152\u0154\u0156\u0158\u015a\u015c\u015e\u0160\u0162\u0164\u0166\u0168\u016a\u016c\u016e\u0170\u0172\u0174\u0176\u0178\u0179\u017b\u017d\u0181\u0182\u0184\u0186\u0187\u0189-\u018b\u018e-\u0191\u0193\u0194\u0196-\u0198\u019c\u019d\u019f\u01a0\u01a2\u01a4\u01a6\u01a7\u01a9\u01ac\u01ae\u01af\u01b1-\u01b3\u01b5\u01b7\u01b8\u01bc\u01c4\u01c7\u01ca\u01cd\u01cf\u01d1\u01d3\u01d5\u01d7\u01d9\u01db\u01de\u01e0\u01e2\u01e4\u01e6\u01e8\u01ea\u01ec\u01ee\u01f1\u01f4\u01f6-\u01f8\u01fa\u01fc\u01fe\u0200\u0202\u0204\u0206\u0208\u020a\u020c\u020e\u0210\u0212\u0214\u0216\u0218\u021a\u021c\u021e\u0220\u0222\u0224\u0226\u0228\u022a\u022c\u022e\u0230\u0232\u023a\u023b\u023d\u023e\u0241\u0243-\u0246\u0248\u024a\u024c\u024e\u0370\u0372\u0376\u0386\u0388-\u038a\u038c\u038e\u038f\u0391-\u03a1\u03a3-\u03ab\u03cf\u03d2-\u03d4\u03d8\u03da\u03dc\u03de\u03e0\u03e2\u03e4\u03e6\u03e8\u03ea\u03ec\u03ee\u03f4\u03f7\u03f9\u03fa\u03fd-\u042f\u0460\u0462\u0464\u0466\u0468\u046a\u046c\u046e\u0470\u0472\u0474\u0476\u0478\u047a\u047c\u047e\u0480\u048a\u048c\u048e\u0490\u0492\u0494\u0496\u0498\u049a\u049c\u049e\u04a0\u04a2\u04a4\u04a6\u04a8\u04aa\u04ac\u04ae\u04b0\u04b2\u04b4\u04b6\u04b8\u04ba\u04bc\u04be\u04c0\u04c1\u04c3\u04c5\u04c7\u04c9\u04cb\u04cd\u04d0\u04d2\u04d4\u04d6\u04d8\u04da\u04dc\u04de\u04e0\u04e2\u04e4\u04e6\u04e8\u04ea\u04ec\u04ee\u04f0\u04f2\u04f4\u04f6\u04f8\u04fa\u04fc\u04fe\u0500\u0502\u0504\u0506\u0508\u050a\u050c\u050e\u0510\u0512\u0514\u0516\u0518\u051a\u051c\u051e\u0520\u0522\u0524\u0526\u0531-\u0556\u10a0-\u10c5\u1e00\u1e02\u1e04\u1e06\u1e08\u1e0a\u1e0c\u1e0e\u1e10\u1e12\u1e14\u1e16\u1e18\u1e1a\u1e1c\u1e1e\u1e20\u1e22\u1e24\u1e26\u1e28\u1e2a\u1e2c\u1e2e\u1e30\u1e32\u1e34\u1e36\u1e38\u1e3a\u1e3c\u1e3e\u1e40\u1e42\u1e44\u1e46\u1e48\u1e4a\u1e4c\u1e4e\u1e50\u1e52\u1e54\u1e56\u1e58\u1e5a\u1e5c\u1e5e\u1e60\u1e62\u1e64\u1e66\u1e68\u1e6a\u1e6c\u1e6e\u1e70\u1e72\u1e74\u1e76\u1e78\u1e7a\u1e7c\u1e7e\u1e80\u1e82\u1e84\u1e86\u1e88\u1e8a\u1e8c\u1e8e\u1e90\u1e92\u1e94\u1e9e\u1ea0\u1ea2\u1ea4\u1ea6\u1ea8\u1eaa\u1eac\u1eae\u1eb0\u1eb2\u1eb4\u1eb6\u1eb8\u1eba\u1ebc\u1ebe\u1ec0\u1ec2\u1ec4\u1ec6\u1ec8\u1eca\u1ecc\u1ece\u1ed0\u1ed2\u1ed4\u1ed6\u1ed8\u1eda\u1edc\u1ede\u1ee0\u1ee2\u1ee4\u1ee6\u1ee8\u1eea\u1eec\u1eee\u1ef0\u1ef2\u1ef4\u1ef6\u1ef8\u1efa\u1efc\u1efe\u1f08-\u1f0f\u1f18-\u1f1d\u1f28-\u1f2f\u1f38-\u1f3f\u1f48-\u1f4d\u1f59\u1f5b\u1f5d\u1f5f\u1f68-\u1f6f\u1fb8-\u1fbb\u1fc8-\u1fcb\u1fd8-\u1fdb\u1fe8-\u1fec\u1ff8-\u1ffb\u2102\u2107\u210b-\u210d\u2110-\u2112\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u2130-\u2133\u213e\u213f\u2145\u2183\u2c00-\u2c2e\u2c60\u2c62-\u2c64\u2c67\u2c69\u2c6b\u2c6d-\u2c70\u2c72\u2c75\u2c7e-\u2c80\u2c82\u2c84\u2c86\u2c88\u2c8a\u2c8c\u2c8e\u2c90\u2c92\u2c94\u2c96\u2c98\u2c9a\u2c9c\u2c9e\u2ca0\u2ca2\u2ca4\u2ca6\u2ca8\u2caa\u2cac\u2cae\u2cb0\u2cb2\u2cb4\u2cb6\u2cb8\u2cba\u2cbc\u2cbe\u2cc0\u2cc2\u2cc4\u2cc6\u2cc8\u2cca\u2ccc\u2cce\u2cd0\u2cd2\u2cd4\u2cd6\u2cd8\u2cda\u2cdc\u2cde\u2ce0\u2ce2\u2ceb\u2ced\ua640\ua642\ua644\ua646\ua648\ua64a\ua64c\ua64e\ua650\ua652\ua654\ua656\ua658\ua65a\ua65c\ua65e\ua660\ua662\ua664\ua666\ua668\ua66a\ua66c\ua680\ua682\ua684\ua686\ua688\ua68a\ua68c\ua68e\ua690\ua692\ua694\ua696\ua722\ua724\ua726\ua728\ua72a\ua72c\ua72e\ua732\ua734\ua736\ua738\ua73a\ua73c\ua73e\ua740\ua742\ua744\ua746\ua748\ua74a\ua74c\ua74e\ua750\ua752\ua754\ua756\ua758\ua75a\ua75c\ua75e\ua760\ua762\ua764\ua766\ua768\ua76a\ua76c\ua76e\ua779\ua77b\ua77d\ua77e\ua780\ua782\ua784\ua786\ua78b\ua78d\ua790\ua7a0\ua7a2\ua7a4\ua7a6\ua7a8\uff21-\uff3a]',
        Ll:'[\u0061-\u007a\u00aa\u00b5\u00ba\u00df-\u00f6\u00f8-\u00ff\u0101\u0103\u0105\u0107\u0109\u010b\u010d\u010f\u0111\u0113\u0115\u0117\u0119\u011b\u011d\u011f\u0121\u0123\u0125\u0127\u0129\u012b\u012d\u012f\u0131\u0133\u0135\u0137\u0138\u013a\u013c\u013e\u0140\u0142\u0144\u0146\u0148\u0149\u014b\u014d\u014f\u0151\u0153\u0155\u0157\u0159\u015b\u015d\u015f\u0161\u0163\u0165\u0167\u0169\u016b\u016d\u016f\u0171\u0173\u0175\u0177\u017a\u017c\u017e-\u0180\u0183\u0185\u0188\u018c\u018d\u0192\u0195\u0199-\u019b\u019e\u01a1\u01a3\u01a5\u01a8\u01aa\u01ab\u01ad\u01b0\u01b4\u01b6\u01b9\u01ba\u01bd-\u01bf\u01c6\u01c9\u01cc\u01ce\u01d0\u01d2\u01d4\u01d6\u01d8\u01da\u01dc\u01dd\u01df\u01e1\u01e3\u01e5\u01e7\u01e9\u01eb\u01ed\u01ef\u01f0\u01f3\u01f5\u01f9\u01fb\u01fd\u01ff\u0201\u0203\u0205\u0207\u0209\u020b\u020d\u020f\u0211\u0213\u0215\u0217\u0219\u021b\u021d\u021f\u0221\u0223\u0225\u0227\u0229\u022b\u022d\u022f\u0231\u0233-\u0239\u023c\u023f\u0240\u0242\u0247\u0249\u024b\u024d\u024f-\u0293\u0295-\u02af\u0371\u0373\u0377\u037b-\u037d\u0390\u03ac-\u03ce\u03d0\u03d1\u03d5-\u03d7\u03d9\u03db\u03dd\u03df\u03e1\u03e3\u03e5\u03e7\u03e9\u03eb\u03ed\u03ef-\u03f3\u03f5\u03f8\u03fb\u03fc\u0430-\u045f\u0461\u0463\u0465\u0467\u0469\u046b\u046d\u046f\u0471\u0473\u0475\u0477\u0479\u047b\u047d\u047f\u0481\u048b\u048d\u048f\u0491\u0493\u0495\u0497\u0499\u049b\u049d\u049f\u04a1\u04a3\u04a5\u04a7\u04a9\u04ab\u04ad\u04af\u04b1\u04b3\u04b5\u04b7\u04b9\u04bb\u04bd\u04bf\u04c2\u04c4\u04c6\u04c8\u04ca\u04cc\u04ce\u04cf\u04d1\u04d3\u04d5\u04d7\u04d9\u04db\u04dd\u04df\u04e1\u04e3\u04e5\u04e7\u04e9\u04eb\u04ed\u04ef\u04f1\u04f3\u04f5\u04f7\u04f9\u04fb\u04fd\u04ff\u0501\u0503\u0505\u0507\u0509\u050b\u050d\u050f\u0511\u0513\u0515\u0517\u0519\u051b\u051d\u051f\u0521\u0523\u0525\u0527\u0561-\u0587\u1d00-\u1d2b\u1d62-\u1d77\u1d79-\u1d9a\u1e01\u1e03\u1e05\u1e07\u1e09\u1e0b\u1e0d\u1e0f\u1e11\u1e13\u1e15\u1e17\u1e19\u1e1b\u1e1d\u1e1f\u1e21\u1e23\u1e25\u1e27\u1e29\u1e2b\u1e2d\u1e2f\u1e31\u1e33\u1e35\u1e37\u1e39\u1e3b\u1e3d\u1e3f\u1e41\u1e43\u1e45\u1e47\u1e49\u1e4b\u1e4d\u1e4f\u1e51\u1e53\u1e55\u1e57\u1e59\u1e5b\u1e5d\u1e5f\u1e61\u1e63\u1e65\u1e67\u1e69\u1e6b\u1e6d\u1e6f\u1e71\u1e73\u1e75\u1e77\u1e79\u1e7b\u1e7d\u1e7f\u1e81\u1e83\u1e85\u1e87\u1e89\u1e8b\u1e8d\u1e8f\u1e91\u1e93\u1e95-\u1e9d\u1e9f\u1ea1\u1ea3\u1ea5\u1ea7\u1ea9\u1eab\u1ead\u1eaf\u1eb1\u1eb3\u1eb5\u1eb7\u1eb9\u1ebb\u1ebd\u1ebf\u1ec1\u1ec3\u1ec5\u1ec7\u1ec9\u1ecb\u1ecd\u1ecf\u1ed1\u1ed3\u1ed5\u1ed7\u1ed9\u1edb\u1edd\u1edf\u1ee1\u1ee3\u1ee5\u1ee7\u1ee9\u1eeb\u1eed\u1eef\u1ef1\u1ef3\u1ef5\u1ef7\u1ef9\u1efb\u1efd\u1eff-\u1f07\u1f10-\u1f15\u1f20-\u1f27\u1f30-\u1f37\u1f40-\u1f45\u1f50-\u1f57\u1f60-\u1f67\u1f70-\u1f7d\u1f80-\u1f87\u1f90-\u1f97\u1fa0-\u1fa7\u1fb0-\u1fb4\u1fb6\u1fb7\u1fbe\u1fc2-\u1fc4\u1fc6\u1fc7\u1fd0-\u1fd3\u1fd6\u1fd7\u1fe0-\u1fe7\u1ff2-\u1ff4\u1ff6\u1ff7\u210a\u210e\u210f\u2113\u212f\u2134\u2139\u213c\u213d\u2146-\u2149\u214e\u2184\u2c30-\u2c5e\u2c61\u2c65\u2c66\u2c68\u2c6a\u2c6c\u2c71\u2c73\u2c74\u2c76-\u2c7c\u2c81\u2c83\u2c85\u2c87\u2c89\u2c8b\u2c8d\u2c8f\u2c91\u2c93\u2c95\u2c97\u2c99\u2c9b\u2c9d\u2c9f\u2ca1\u2ca3\u2ca5\u2ca7\u2ca9\u2cab\u2cad\u2caf\u2cb1\u2cb3\u2cb5\u2cb7\u2cb9\u2cbb\u2cbd\u2cbf\u2cc1\u2cc3\u2cc5\u2cc7\u2cc9\u2ccb\u2ccd\u2ccf\u2cd1\u2cd3\u2cd5\u2cd7\u2cd9\u2cdb\u2cdd\u2cdf\u2ce1\u2ce3\u2ce4\u2cec\u2cee\u2d00-\u2d25\ua641\ua643\ua645\ua647\ua649\ua64b\ua64d\ua64f\ua651\ua653\ua655\ua657\ua659\ua65b\ua65d\ua65f\ua661\ua663\ua665\ua667\ua669\ua66b\ua66d\ua681\ua683\ua685\ua687\ua689\ua68b\ua68d\ua68f\ua691\ua693\ua695\ua697\ua723\ua725\ua727\ua729\ua72b\ua72d\ua72f-\ua731\ua733\ua735\ua737\ua739\ua73b\ua73d\ua73f\ua741\ua743\ua745\ua747\ua749\ua74b\ua74d\ua74f\ua751\ua753\ua755\ua757\ua759\ua75b\ua75d\ua75f\ua761\ua763\ua765\ua767\ua769\ua76b\ua76d\ua76f\ua771-\ua778\ua77a\ua77c\ua77f\ua781\ua783\ua785\ua787\ua78c\ua78e\ua791\ua7a1\ua7a3\ua7a5\ua7a7\ua7a9\ua7fa\ufb00-\ufb06\ufb13-\ufb17\uff41-\uff5a]',
        Lt:'[\u01c5\u01c8\u01cb\u01f2\u1f88-\u1f8f\u1f98-\u1f9f\u1fa8-\u1faf\u1fbc\u1fcc\u1ffc]',
        Lm:'[\u02b0-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0374\u037a\u0559\u0640\u06e5\u06e6\u07f4\u07f5\u07fa\u081a\u0824\u0828\u0971\u0e46\u0ec6\u10fc\u17d7\u1843\u1aa7\u1c78-\u1c7d\u1d2c-\u1d61\u1d78\u1d9b-\u1dbf\u2071\u207f\u2090-\u209c\u2c7d\u2d6f\u2e2f\u3005\u3031-\u3035\u303b\u309d\u309e\u30fc-\u30fe\ua015\ua4f8-\ua4fd\ua60c\ua67f\ua717-\ua71f\ua770\ua788\ua9cf\uaa70\uaadd\uff70\uff9e\uff9f]',
        Lo:'[\u01bb\u01c0-\u01c3\u0294\u05d0-\u05ea\u05f0-\u05f2\u0620-\u063f\u0641-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u0800-\u0815\u0840-\u0858\u0904-\u0939\u093d\u0950\u0958-\u0961\u0972-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e45\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0edc\u0edd\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10d0-\u10fa\u1100-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17dc\u1820-\u1842\u1844-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bc0-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c77\u1ce9-\u1cec\u1cee-\u1cf1\u2135-\u2138\u2d30-\u2d65\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u3006\u303c\u3041-\u3096\u309f\u30a1-\u30fa\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcb\ua000-\ua014\ua016-\ua48c\ua4d0-\ua4f7\ua500-\ua60b\ua610-\ua61f\ua62a\ua62b\ua66e\ua6a0-\ua6e5\ua7fb-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa6f\uaa71-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb\uaadc\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff66-\uff6f\uff71-\uff9d\uffa0-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]',
        Mn:'[\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u0900-\u0902\u093a\u093c\u0941-\u0948\u094d\u0951-\u0957\u0962\u0963\u0981\u09bc\u09c1-\u09c4\u09cd\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b62\u0b63\u0b82\u0bc0\u0bcd\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc6\u0ccc\u0ccd\u0ce2\u0ce3\u0d41-\u0d44\u0d4d\u0d62\u0d63\u0dca\u0dd2-\u0dd4\u0dd6\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135d-\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1be6\u1be8\u1be9\u1bed\u1bef-\u1bf1\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfc-\u1dff\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\ufb1e\ufe00-\ufe0f\ufe20-\ufe26]',
        Me:'[\u0488\u0489\u20dd-\u20e0\u20e2-\u20e4\ua670-\ua672]',
        Mc:'[\u0903\u093b\u093e-\u0940\u0949-\u094c\u094e\u094f\u0982\u0983\u09be-\u09c0\u09c7\u09c8\u09cb\u09cc\u09d7\u0a03\u0a3e-\u0a40\u0a83\u0abe-\u0ac0\u0ac9\u0acb\u0acc\u0b02\u0b03\u0b3e\u0b40\u0b47\u0b48\u0b4b\u0b4c\u0b57\u0bbe\u0bbf\u0bc1\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcc\u0bd7\u0c01-\u0c03\u0c41-\u0c44\u0c82\u0c83\u0cbe\u0cc0-\u0cc4\u0cc7\u0cc8\u0cca\u0ccb\u0cd5\u0cd6\u0d02\u0d03\u0d3e-\u0d40\u0d46-\u0d48\u0d4a-\u0d4c\u0d57\u0d82\u0d83\u0dcf-\u0dd1\u0dd8-\u0ddf\u0df2\u0df3\u0f3e\u0f3f\u0f7f\u102b\u102c\u1031\u1038\u103b\u103c\u1056\u1057\u1062-\u1064\u1067-\u106d\u1083\u1084\u1087-\u108c\u108f\u109a-\u109c\u17b6\u17be-\u17c5\u17c7\u17c8\u1923-\u1926\u1929-\u192b\u1930\u1931\u1933-\u1938\u19b0-\u19c0\u19c8\u19c9\u1a19-\u1a1b\u1a55\u1a57\u1a61\u1a63\u1a64\u1a6d-\u1a72\u1b04\u1b35\u1b3b\u1b3d-\u1b41\u1b43\u1b44\u1b82\u1ba1\u1ba6\u1ba7\u1baa\u1be7\u1bea-\u1bec\u1bee\u1bf2\u1bf3\u1c24-\u1c2b\u1c34\u1c35\u1ce1\u1cf2\ua823\ua824\ua827\ua880\ua881\ua8b4-\ua8c3\ua952\ua953\ua983\ua9b4\ua9b5\ua9ba\ua9bb\ua9bd-\ua9c0\uaa2f\uaa30\uaa33\uaa34\uaa4d\uaa7b\uabe3\uabe4\uabe6\uabe7\uabe9\uabea\uabec]',
        Nd:'[\u0030-\u0039\u0660-\u0669\u06f0-\u06f9\u07c0-\u07c9\u0966-\u096f\u09e6-\u09ef\u0a66-\u0a6f\u0ae6-\u0aef\u0b66-\u0b6f\u0be6-\u0bef\u0c66-\u0c6f\u0ce6-\u0cef\u0d66-\u0d6f\u0e50-\u0e59\u0ed0-\u0ed9\u0f20-\u0f29\u1040-\u1049\u1090-\u1099\u17e0-\u17e9\u1810-\u1819\u1946-\u194f\u19d0-\u19d9\u1a80-\u1a89\u1a90-\u1a99\u1b50-\u1b59\u1bb0-\u1bb9\u1c40-\u1c49\u1c50-\u1c59\ua620-\ua629\ua8d0-\ua8d9\ua900-\ua909\ua9d0-\ua9d9\uaa50-\uaa59\uabf0-\uabf9\uff10-\uff19]',
        Nl:'[\u16ee-\u16f0\u2160-\u2182\u2185-\u2188\u3007\u3021-\u3029\u3038-\u303a\ua6e6-\ua6ef]',
        No:'[\u00b2\u00b3\u00b9\u00bc-\u00be\u09f4-\u09f9\u0b72-\u0b77\u0bf0-\u0bf2\u0c78-\u0c7e\u0d70-\u0d75\u0f2a-\u0f33\u1369-\u137c\u17f0-\u17f9\u19da\u2070\u2074-\u2079\u2080-\u2089\u2150-\u215f\u2189\u2460-\u249b\u24ea-\u24ff\u2776-\u2793\u2cfd\u3192-\u3195\u3220-\u3229\u3251-\u325f\u3280-\u3289\u32b1-\u32bf\ua830-\ua835]',
        Zs:'[\u0020\u00a0\u1680\u180e\u2000-\u200a\u202f\u205f\u3000]',
        Zl:'[\u2028]',
        Zp:'[\u2029]',
        Cc:'[\u0000-\u001f\u007f-\u009f]',
        Cf:'[\u00ad\u0600-\u0603\u06dd\u070f\u17b4\u17b5\u200b-\u200f\u202a-\u202e\u2060-\u2064\u206a-\u206f\ufeff\ufff9-\ufffb]',
        Cs:'[\ud800-\udfff]',
        Co:'[\ue000-\uf8ff]',
        Ps:'[\u0028\u005b\u007b\u0f3a\u0f3c\u169b\u201a\u201e\u2045\u207d\u208d\u2329\u2768\u276a\u276c\u276e\u2770\u2772\u2774\u27c5\u27e6\u27e8\u27ea\u27ec\u27ee\u2983\u2985\u2987\u2989\u298b\u298d\u298f\u2991\u2993\u2995\u2997\u29d8\u29da\u29fc\u2e22\u2e24\u2e26\u2e28\u3008\u300a\u300c\u300e\u3010\u3014\u3016\u3018\u301a\u301d\ufd3e\ufe17\ufe35\ufe37\ufe39\ufe3b\ufe3d\ufe3f\ufe41\ufe43\ufe47\ufe59\ufe5b\ufe5d\uff08\uff3b\uff5b\uff5f\uff62]',
        Pd:'[\u002d\u058a\u05be\u1400\u1806\u2010-\u2015\u2e17\u2e1a\u301c\u3030\u30a0\ufe31\ufe32\ufe58\ufe63\uff0d]',
        Pc:'[\u005f\u203f\u2040\u2054\ufe33\ufe34\ufe4d-\ufe4f\uff3f]',
        Pe:'[\u0029\u005d\u007d\u0f3b\u0f3d\u169c\u2046\u207e\u208e\u232a\u2769\u276b\u276d\u276f\u2771\u2773\u2775\u27c6\u27e7\u27e9\u27eb\u27ed\u27ef\u2984\u2986\u2988\u298a\u298c\u298e\u2990\u2992\u2994\u2996\u2998\u29d9\u29db\u29fd\u2e23\u2e25\u2e27\u2e29\u3009\u300b\u300d\u300f\u3011\u3015\u3017\u3019\u301b\u301e\u301f\ufd3f\ufe18\ufe36\ufe38\ufe3a\ufe3c\ufe3e\ufe40\ufe42\ufe44\ufe48\ufe5a\ufe5c\ufe5e\uff09\uff3d\uff5d\uff60\uff63]',
        Sm:'[\u002b\u003c-\u003e\u007c\u007e\u00ac\u00b1\u00d7\u00f7\u03f6\u0606-\u0608\u2044\u2052\u207a-\u207c\u208a-\u208c\u2118\u2140-\u2144\u214b\u2190-\u2194\u219a\u219b\u21a0\u21a3\u21a6\u21ae\u21ce\u21cf\u21d2\u21d4\u21f4-\u22ff\u2308-\u230b\u2320\u2321\u237c\u239b-\u23b3\u23dc-\u23e1\u25b7\u25c1\u25f8-\u25ff\u266f\u27c0-\u27c4\u27c7-\u27ca\u27cc\u27ce-\u27e5\u27f0-\u27ff\u2900-\u2982\u2999-\u29d7\u29dc-\u29fb\u29fe-\u2aff\u2b30-\u2b44\u2b47-\u2b4c\ufb29\ufe62\ufe64-\ufe66\uff0b\uff1c-\uff1e\uff5c\uff5e\uffe2\uffe9-\uffec]',
        Po:'[\u0021-\u0023\u0025-\u0027\u002a\u002c\u002e\u002f\u003a\u003b\u003f\u0040\u005c\u00a1\u00b7\u00bf\u037e\u0387\u055a-\u055f\u0589\u05c0\u05c3\u05c6\u05f3\u05f4\u0609\u060a\u060c\u060d\u061b\u061e\u061f\u066a-\u066d\u06d4\u0700-\u070d\u07f7-\u07f9\u0830-\u083e\u085e\u0964\u0965\u0970\u0df4\u0e4f\u0e5a\u0e5b\u0f04-\u0f12\u0f85\u0fd0-\u0fd4\u0fd9\u0fda\u104a-\u104f\u10fb\u1361-\u1368\u166d\u166e\u16eb-\u16ed\u1735\u1736\u17d4-\u17d6\u17d8-\u17da\u1800-\u1805\u1807-\u180a\u1944\u1945\u1a1e\u1a1f\u1aa0-\u1aa6\u1aa8-\u1aad\u1b5a-\u1b60\u1bfc-\u1bff\u1c3b-\u1c3f\u1c7e\u1c7f\u1cd3\u2016\u2017\u2020-\u2027\u2030-\u2038\u203b-\u203e\u2041-\u2043\u2047-\u2051\u2053\u2055-\u205e\u2cf9-\u2cfc\u2cfe\u2cff\u2d70\u2e00\u2e01\u2e06-\u2e08\u2e0b\u2e0e-\u2e16\u2e18\u2e19\u2e1b\u2e1e\u2e1f\u2e2a-\u2e2e\u2e30\u2e31\u3001-\u3003\u303d\u30fb\ua4fe\ua4ff\ua60d-\ua60f\ua673\ua67e\ua6f2-\ua6f7\ua874-\ua877\ua8ce\ua8cf\ua8f8-\ua8fa\ua92e\ua92f\ua95f\ua9c1-\ua9cd\ua9de\ua9df\uaa5c-\uaa5f\uaade\uaadf\uabeb\ufe10-\ufe16\ufe19\ufe30\ufe45\ufe46\ufe49-\ufe4c\ufe50-\ufe52\ufe54-\ufe57\ufe5f-\ufe61\ufe68\ufe6a\ufe6b\uff01-\uff03\uff05-\uff07\uff0a\uff0c\uff0e\uff0f\uff1a\uff1b\uff1f\uff20\uff3c\uff61\uff64\uff65]',
        Sk:'[\u005e\u0060\u00a8\u00af\u00b4\u00b8\u02c2-\u02c5\u02d2-\u02df\u02e5-\u02eb\u02ed\u02ef-\u02ff\u0375\u0384\u0385\u1fbd\u1fbf-\u1fc1\u1fcd-\u1fcf\u1fdd-\u1fdf\u1fed-\u1fef\u1ffd\u1ffe\u309b\u309c\ua700-\ua716\ua720\ua721\ua789\ua78a\ufbb2-\ufbc1\uff3e\uff40\uffe3]',
        Sc:'[\u0024\u00a2-\u00a5\u060b\u09f2\u09f3\u09fb\u0af1\u0bf9\u0e3f\u17db\u20a0-\u20b9\ua838\ufdfc\ufe69\uff04\uffe0\uffe1\uffe5\uffe6]',
        Pi:'[\u00ab\u2018\u201b\u201c\u201f\u2039\u2e02\u2e04\u2e09\u2e0c\u2e1c\u2e20]',
        So:'[\u00a6\u00a7\u00a9\u00ae\u00b0\u00b6\u0482\u060e\u060f\u06de\u06e9\u06fd\u06fe\u07f6\u09fa\u0b70\u0bf3-\u0bf8\u0bfa\u0c7f\u0d79\u0f01-\u0f03\u0f13-\u0f17\u0f1a-\u0f1f\u0f34\u0f36\u0f38\u0fbe-\u0fc5\u0fc7-\u0fcc\u0fce\u0fcf\u0fd5-\u0fd8\u109e\u109f\u1360\u1390-\u1399\u1940\u19de-\u19ff\u1b61-\u1b6a\u1b74-\u1b7c\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116\u2117\u211e-\u2123\u2125\u2127\u2129\u212e\u213a\u213b\u214a\u214c\u214d\u214f\u2195-\u2199\u219c-\u219f\u21a1\u21a2\u21a4\u21a5\u21a7-\u21ad\u21af-\u21cd\u21d0\u21d1\u21d3\u21d5-\u21f3\u2300-\u2307\u230c-\u231f\u2322-\u2328\u232b-\u237b\u237d-\u239a\u23b4-\u23db\u23e2-\u23f3\u2400-\u2426\u2440-\u244a\u249c-\u24e9\u2500-\u25b6\u25b8-\u25c0\u25c2-\u25f7\u2600-\u266e\u2670-\u26ff\u2701-\u2767\u2794-\u27bf\u2800-\u28ff\u2b00-\u2b2f\u2b45\u2b46\u2b50-\u2b59\u2ce5-\u2cea\u2e80-\u2e99\u2e9b-\u2ef3\u2f00-\u2fd5\u2ff0-\u2ffb\u3004\u3012\u3013\u3020\u3036\u3037\u303e\u303f\u3190\u3191\u3196-\u319f\u31c0-\u31e3\u3200-\u321e\u322a-\u3250\u3260-\u327f\u328a-\u32b0\u32c0-\u32fe\u3300-\u33ff\u4dc0-\u4dff\ua490-\ua4c6\ua828-\ua82b\ua836\ua837\ua839\uaa77-\uaa79\ufdfd\uffe4\uffe8\uffed\uffee\ufffc\ufffd]',
        Pf:'[\u00bb\u2019\u201d\u203a\u2e03\u2e05\u2e0a\u2e0d\u2e1d\u2e21]'
    };
    /* Also supports the general category (only the first letter) */
    var firstLetters = {};
    for ( var p in unicodeCategories ) {
        if ( firstLetters[p[0]] )
            firstLetters[p[0]] = unicodeCategories[p].substring(0,unicodeCategories[p].length-1) + firstLetters[p[0]].substring(1);
        else
            firstLetters[p[0]] = unicodeCategories[p];
    }
    for ( var p in firstLetters )
        unicodeCategories[p] = firstLetters[p];
    
    /* Gets a regex written in a dialect that supports unicode categories and
       translates it to a dialect supported by JavaScript. */
    return function(regexpString) {
        var modifiers = "";
        if ( regexpString instanceof RegExp ) {
            modifiers = (regexpString.global ? "g" : "") +
                        (regexpString.ignoreCase ? "i" : "") +
                        (regexpString.multiline ? "m" : "");
            regexpString = regexpString.source;
        }
        regexpString = regexpString.replace(/\\p\{(..?)\}/g, function(match,group) {
            return unicodeCategories[group] || match;
        });
        return new RegExp(regexpString,modifiers);
    };
})();

/*	Base64 utility
	======================================================================== */

Base64 = {
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	// public method for encoding
	encode : function (input) {
	    var output = "";
	    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	    var i = 0;

	    input = Base64._utf8_encode(input);

	    while (i < input.length) {

	        chr1 = input.charCodeAt(i++);
	        chr2 = input.charCodeAt(i++);
	        chr3 = input.charCodeAt(i++);

	        enc1 = chr1 >> 2;
	        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
	        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
	        enc4 = chr3 & 63;

	        if (isNaN(chr2)) {
	            enc3 = enc4 = 64;
	        } else if (isNaN(chr3)) {
	            enc4 = 64;
	        }

	        output = output +
	        Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) +
	        Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);

	    }

	    return output;
	},

	// public method for decoding
	decode : function (input) {
	    var output = "";
	    var chr1, chr2, chr3;
	    var enc1, enc2, enc3, enc4;
	    var i = 0;

	    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

	    while (i < input.length) {

	        enc1 = Base64._keyStr.indexOf(input.charAt(i++));
	        enc2 = Base64._keyStr.indexOf(input.charAt(i++));
	        enc3 = Base64._keyStr.indexOf(input.charAt(i++));
	        enc4 = Base64._keyStr.indexOf(input.charAt(i++));

	        chr1 = (enc1 << 2) | (enc2 >> 4);
	        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
	        chr3 = ((enc3 & 3) << 6) | enc4;

	        output = output + String.fromCharCode(chr1);

	        if (enc3 != 64) {
	            output = output + String.fromCharCode(chr2);
	        }
	        if (enc4 != 64) {
	            output = output + String.fromCharCode(chr3);
	        }

	    }

	    output = Base64._utf8_decode(output);

	    return output;

	},

	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
	    string = string.replace(/\r\n/g,"\n");
	    var utftext = "";

	    for (var n = 0; n < string.length; n++) {

	        var c = string.charCodeAt(n);

	        if (c < 128) {
	            utftext += String.fromCharCode(c);
	        }
	        else if((c > 127) && (c < 2048)) {
	            utftext += String.fromCharCode((c >> 6) | 192);
	            utftext += String.fromCharCode((c & 63) | 128);
	        }
	        else {
	            utftext += String.fromCharCode((c >> 12) | 224);
	            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
	            utftext += String.fromCharCode((c & 63) | 128);
	        }

	    }

	    return utftext;
	},

	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
	    var string = "";
	    var i = 0;
	    var c = c1 = c2 = 0;

	    while ( i < utftext.length ) {

	        c = utftext.charCodeAt(i);

	        if (c < 128) {
	            string += String.fromCharCode(c);
	            i++;
	        }
	        else if((c > 191) && (c < 224)) {
	            c2 = utftext.charCodeAt(i+1);
	            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
	            i += 2;
	        }
	        else {
	            c2 = utftext.charCodeAt(i+1);
	            c3 = utftext.charCodeAt(i+2);
	            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
	            i += 3;
	        }

	    }
	    return string;
	}
}



/*  Basics of basics
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/*  Platform abstraction layer
 */

_.platform = function () {
                if ((typeof window !== 'undefined') && (window._.platform === arguments.callee)) {
                    if (navigator.platform && navigator.platform.indexOf) {
                        return _.extend ({ engine: 'browser'},
                                ((navigator.platform .indexOf ("Linux arm") >= 0)
                            ||   (navigator.platform .indexOf ("Android")   >= 0)
                            ||   (navigator.userAgent.indexOf ("Android")   >= 0) ? { touch: true, system: 'Android' } :
                                ((navigator.platform .indexOf ("iPad")      >= 0) ? { touch: true, system: 'iOS', device: 'iPad' }  :
                                ((navigator.platform .indexOf ("iPhone")    >= 0)
                            ||   (navigator.platform .indexOf ("iPod")      >= 0) ? { touch: true, system: 'iOS', device: 'iPhone' } : {} )))) } }

                if ((typeof global !== 'undefined') && (global._.platform === arguments.callee)) {
                    return { engine: 'node' } }

                return {} }

_.global = function () {
                return ((_.platform ().engine === 'browser') ? window :
                        (_.platform ().engine === 'node')    ? global : undefined) }

_.defineGlobalProperty = function (name, value, cfg) {
                            if (_.global ()[name] !== undefined) {
                                throw new Error ('cannot defineGlobalProperty: ' + name + ' is already there') }

                            Object.defineProperty (_.global (), name, _.extend ({
                                        enumerable: true,
                                        get: (_.isFunction (value) && value.length === 0) ? value : _.constant (value) }, cfg))

                            return value }

/*  Use this helper to override underscore's functions
    ======================================================================== */

$overrideUnderscore = function (name, genImpl) {
    return _[name] = genImpl (_[name]) }

/*  alert2 for ghetto debugging in browser
    ======================================================================== */

if (_.platform ().engine !== 'browser') {
    _.defineGlobalProperty ('alert', function (args) {
        var print = ((_.global ()['log'] &&
            _.partial (log.warn, log.config ({ stackOffset: 2 }))) ||
            console.log)
        print.apply (print, ['ALERT:'].concat (_.asArray (arguments))) }) }

_.defineGlobalProperty ('alert2', function (args) {
    alert (_.map (arguments, _.stringify).join (', ')) })

/*  Uncaught exception handling facility
    ======================================================================== */

var globalUncaughtExceptionHandler = function (e) { var chain = arguments.callee.chain
    if (chain.length) {
        for (var i = 0, n = chain.length; i < n; i++) {
            try {
                chain[i] (e); break }
            catch (newE) {
                if (i === n - 1) {
                    throw newE }
                else {
                    newE.originalError = e
                    e = newE } } } }
    else {
        console.log ('Uncaught exception: ', e)
        throw e } }

_.withUncaughtExceptionHandler = function (handler, context) { context = context || _.identity

                           globalUncaughtExceptionHandler.chain.unshift (handler)
    context (function () { globalUncaughtExceptionHandler.chain.remove  (handler) }) }

globalUncaughtExceptionHandler.chain = []

switch (_.platform ().engine) {
    case 'node':
        require ('process').on ('uncaughtException', globalUncaughtExceptionHandler); break;
    case 'browser':
        window.addEventListener ('error', function (e) { globalUncaughtExceptionHandler (e.error) }) }
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------

Unit tests (bootstrap code)

------------------------------------------------------------------------
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

_.hasAsserts = true

_.extend (_, {

/*  a namespace where you put tests (for enumeration purposes)
    ======================================================================== */

    tests: {},

/*  A degenerate case of a test shell. We use it to bootstrap most critical
    useless.js internals, where real shell (tests.js) is not available, as it
    itself depends on these utility. It takes test and test's subject as
    arguments (test before code, embodying test-driven philosophy) and executes
    test immediately, throwing exception if anything fails - which is simply
    the default behavior of $assert. So expect no advanced error reporting
    and no controlled execution by using this API.
    ======================================================================== */

    withTest:   function (name, test, defineSubject) {
                    defineSubject ()
                    _.runTest (test)
                    _.publishToTestsNamespace (name, test) },

/*  Publishes to _.tests namespace, but does not run
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    deferTest:  function (name, test, defineSubject) {
                    defineSubject ()
                    _.publishToTestsNamespace (name, test) },

    /*  INTERNALS (you won't need that)
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        runTest:    function (test) {
                        if (_.isFunction (test)) {
                            test () }
                        else {
                            _.each (test, function (fn) { fn () }) } },

        publishToTestsNamespace: function (name, test) {
                        if (_.isArray (name)) { // [suite, name] case
                            (_.tests[name[0]] || (_.tests[name[0]] = {}))[name[1]] = test }
                        else {
                            _.tests[name] = test } } })
        
/*  TEST ITSELF
    ======================================================================== */

_.withTest ('assert.js bootstrap', function () {

/*  One-argument $assert (requires its argument to be strictly 'true')
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    $assert (                       // public front end, may be replaced by environment)
        _.assert ===                // member of _ namespace (original implementation, do not mess with that)
        _.assertions.assert)        // member of _.assertions (for enumeration purposes)

/*  Multi-argument assert (requires its arguments be strictly equal to each other)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    $assert (2 + 2, 2 * 2, 4)                    // any number of arguments
    $assert ({ foo: [1,2,3] }, { foo: [1,2,3] }) // compares objects (deep match)
    $assert ({ foo: { bar: 1 }, baz: 2 },        // ignores order of properties
             { baz: 2, foo: { bar: 1 } })

/*  Nonstrict matching (a wrapup over _.matches)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    $assertMatches ({ foo: 1, bar: 2 },
                    { foo: 1 })

/*  Nonstrict matching against complex objects (stdlib.js feature)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    if (_.hasStdlib) { $assertMatches ( { foo: [1,2], bar: 3 },
                                        { foo: [1] }) }

/*  Regex matching (stdlib.js feature)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    if (_.hasStdlib) { $assertMatches ('123', /[0-9]+/) }


/*  Type matching (plain)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    if (_.hasStdlib) {  $assertTypeof (42, 'number')
                        $assertFails (function () {
                            $assertTypeof ('foo', 'number') }) }

/*  Type matching (array type)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    if (_.hasStdlib) {  $assertTypeof ([1,2],   [])
                        $assertTypeof ([],      [])
                        $assertTypeof ([1,2,3], ['number'])
                        $assertTypeof ([],      ['number'])
                        $assertFails (function () {
                            $assertTypeof ([1,2,3],     ['string'])
                            $assertTypeof ([1,2,'foo'], ['number']) }) }

/*  Type matching (deep)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    if (_.hasStdlib) {  $assertTypeof ({

                            /*  Input object */

                                foo: 42,
                                bar: {
                                    even: 4,
                                    many: ['foo','bar'] } }, {

                            /*  Type contract */

                                foo: 'number',      // simple type check
                                qux: 'undefined',   // nonexisting match 'undefined' 
                                bar: {                                              // breakdown of complex object 
                                    even: function (n) { return (n % 2) === 0 },    // custom contract predicate    
                                    many: ['string'] } }) }                         // array contract (here, 'array of strings')

/*  Type matching ($prototype)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    if (_.hasOOP) { var Foo = $prototype (),
                        Bar = $prototype ()

        $assertTypeof ({ foo: new Foo (),
                         bar: new Bar () },

                       { foo: Foo,
                         bar: Bar })

        $assertFails (function () {
            $assertTypeof (new Bar (), Foo) }) };


/*  Argument contracts
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

if (_.hasStdlib) {

    var testF = function (_777, _foo_bar_baz, notInvolved) { $assertArguments (arguments) }

                    testF (777, 'foo bar baz')

    $assertFails (function () { testF (777, 42) }) }

/*  Ensuring throw (and no throw)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    $assertThrows (function () { throw 42 })
    $assertNotThrows (function () {})

/*  Ensuring throw (strict version)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    $assertThrows (function () { throw 42 }, 42) // accepts either plain value or predicate
    $assertThrows (function () { throw new Error ('42') }, _.matches ({ message: '42' }))


/*  Ensuring execution (given number of times)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    $assertCalls (1, function (mkay) { mkay () })
    $assertFails (function () {
        $assertCalls (1, function (mkay) { })   })

    $assertCalls (3, function (mkay) { mkay (); mkay (); mkay () })
    $assertFails (function () {
        $assertCalls (0, function (mkay) { mkay () })
        $assertCalls (2, function (mkay) { mkay (); mkay (); mkay () }) })

/*  Ensuring CPS routine result
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    $assertCPS (function (then) { then ('foo', 'bar') }, ['foo', 'bar'])
    $assertCPS (function (then) { then ('foo') }, 'foo')
    $assertCPS (function (then) { then () })

/*  Ensuring assertion failure
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    $assertFails (function () {
        $fail                                           // simplest way to generate assertion
        $stub                                           // to mark code stubs (throws error)
        $assert ('not true')                            // remember that assert is more strict than JavaScript if clauses
        $assert ({ foo: 1, bar: 2 }, { foo: 1 })        // not be confused with _.matches behavior (use $assertMatches for that)
        $assert ([1,2,3,4], [1,2,3])                    // same for arrays
        $assert (['foo'], { 0: 'foo', length: 1 })      // array-like objects not gonna pass (regression test)
        $assertFails (function () {}) })                // $assertFails fails if passed code don't

/*  Default fail behavior (never depend on that, as it's environment-dependent)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    if ($assert === _.assertions.assert) {
        $assertThrows (function () { $fail }) } },

/*  IMPLEMENTATION
    ======================================================================== */

function () {

    /*  assertions that exhibit CPS interface
     */
    _.extend (_, _.asyncAssertions = {

        assertCPS: function (fn, args, then) { var requiredResult = (args && (_.isArray (args) ? args : [args])) || []
            fn (function () {
                $assert ([].splice.call (arguments, 0), requiredResult)
                if (then) {
                    then () } }) },

        assertCalls: function (times, test, then) {
            var timesCalled = 0
            var mkay        = function () {
                                timesCalled++ }

            var countMkays  = function () {
                                $assert (times, timesCalled)
                                if (then) {
                                    then () } }

            if (test.length >= 2) {
                test.call (this, mkay, function () {
                    countMkays () }) }      // async
            else {
                test.call (this, mkay);
                    countMkays () } } })    // sync
    
    /*  non-CPS assertions
     */
    _.extend (_, _.assertions = _.extend ({}, _.asyncAssertions, {

        assert: function (__) { var args = [].splice.call (arguments, 0)

                    if (args.length === 1) {
                        if (args[0] !== true) {
                            _.assertionFailed ({ notMatching: args }) } }

                    else if (!_.allEqual (args)) {
                        _.assertionFailed ({ notMatching: args }) }

                    return true },

        assertMatches: function (value, pattern) {
            try {       return _.assert (_.matches.apply (null, _.rest (arguments)) (value)) }
            catch (e) { throw _.isAssertionError (e) ? _.extend (e, { notMatching: [value, pattern] }) : e } },

        assertNotMatches: function (value, pattern) {
            try {       return _.assert (!_.matches.apply (null, _.rest (arguments)) (value)) }
            catch (e) { throw _.isAssertionError (e) ? _.extend (e, { notMatching: [value, pattern] }) : e } },

        assertTypeof: function (value, contract) {

                            var mismatches = _.typeMismatches (contract, value)
                            return _.isEmpty (mismatches) ? true : _.assertionFailed ({
                                asColumns: true,
                                notMatching: [
                                    { value:        value },
                                    { type:         _.decideType (value) },
                                    { contract:     contract },
                                    { mismatches:   mismatches }] }) },

        assertFails: function (what) {
            _.assertThrows.call (this, what, _.isAssertionError) },

        assertThrows: function (what, errorPattern /* optional */) {
                            var e = undefined, thrown = false
                                try         { what.call (this) }
                                catch (__)  { e = __; thrown = true }

                            _.assert.call (this, thrown)

                            if (arguments.length === 1) {
                                _.assertMatches.apply (this, [e].concat (_.rest (arguments))) } },

        assertNotThrows: function (what) {
            _.assertCalls.call (this, 0, function () { what () }) },

        assertArguments: function (args, callee, name) {
            var fn    = (callee || args.callee).toString ()
            var match = fn.match (/.*function[^\(]\(([^\)]+)\)/)
            if (match) {
                var valuesPassed   = _.asArray (args);
                var valuesNeeded   = _.map (match[1].split (','),
                                            function (_s) {
                                                var s = (_s.trim ()[0] === '_') ? _s.replace (/_/g, ' ').trim () : undefined
                                                var n = parseInt (s, 10)
                                                return _.isFinite (n) ? n : s })

                var zap = _.zipWith ([valuesNeeded, valuesPassed], function (a, b) {
                                return (a === undefined) ? true : (a === b) })

                if (!_.every (zap)) {
                    _.assertionFailed ({ notMatching: _.nonempty ([[name, fn].join (': '), valuesNeeded, valuesPassed]) }) } } },

        fail: function () {
                _.assertionFailed () },

        fails: _.constant (function () {    // higher order version
                _.assertionFailed () }),

        stub: function () {
                _.assertionFailed () } }))


    /*  DEFAULT FAILURE IMPL.
        ---------------------
        We do not subclass Error, because _.isTypeOf currently does not support
        inhertitance (UPDATE: now does) and it would cause troubles in tests.js
        and logging facility. Thus a subclass is defined that way.
        ======================================================================== */

    _.extend (_, {

        assertionError: function (additionalInfo) {
                            return _.extend (new Error ('assertion failed'), additionalInfo, { assertion: true }) },

        assertionFailed: function (additionalInfo) {
                            throw _.extend (_.assertionError (additionalInfo), {
                                        stack: _.rest ((new Error ()).stack.split ('\n'), 3).join ('\n') }) },

        isAssertionError: function (e) {        
                            return e.assertion === true } })


    /*  $assert helper
        ======================================================================== */

    _.extend (_, {

        allEqual: function (values) {
                            return _.reduce (values, function (prevEqual, x) {
                                return prevEqual && _.isEqual (values[0], x) }, true) } })

    /*  Publish asserts as $-things (will be replaced by tests.js onwards,
        thus configurable=true)
        ======================================================================== */

    _.each (_.keys (_.assertions), function (name) {
        _.defineGlobalProperty ('$' + name, _[name], { configurable: true }) })

})

/*  console.log with 'pure' semantics, for debugging of complex expressions
    ======================================================================== */

_.mixin ({

    log: function (x, label) {
        console.log.apply (console.log,
            _.times (arguments.callee.depth || 0, _.constant ('→ '))
                .concat ([label || '_.log:', x]))
        return x },

    logs: function (fn, numArgs) {
        return function () {
            _.log.depth = (_.log.depth || 0) + 1
                _.log (_.first (arguments, numArgs), 'inp:')
                var result = _.log (fn.apply (this, arguments), 'out:')
                console.log ('\n')
            _.log.depth--
            return result }} })





/*  converts 'arguments' (and any other array mimick) to real Array
    ======================================================================== */

_.withTest (['stdlib', 'asArray'], function () {

    (function (a, b) {
        var args = _.asArray (arguments)

        $assert (_.isArray (args))
        $assert (args.length === 2)
        $assert (args[0] === a)
        $assert (args[1] === b) }) (42, 43) }, function () { _.extend (_, {

    asArray: function (arrayMimick) {
                return [].splice.call (arrayMimick, 0) } }) })

/*  Argument count tracking module (provides hinting to several metaprogramming
    utilities, like property definitions)
    ======================================================================== */

/*  NOTE:   "rest argument" is a term from upcoming ECMAScript 6 standard,
             denoting the "..." thing in "f(a,b,...)"-type signatures.

             Although it's best known elsewhere as 'variable argument list',
             and the "rest argument" term is really confusing to most of
             people, we should take course on the future language prospects
             that will soon become widely recognized reality for everyone.
 */

_.withTest ('argcount tracking', function () {

    var none        = function () {}
    var one         = function (a) {}
    var three       = function (a, b, c) {}
    var many        = $restArg (function () {})

    $assert (_.noArgs (none)    === true)
    $assert (_.hasArgs (none)   === false)
    $assert (_.numArgs (three)  === 3)
    $assert (_.hasArgs (three)  === true)
    $assert (_.restArg (many)   === true)
    $assert (_.noArgs (many)    === false)
    $assert (_.oneArg (one)     === true)

    var sameAsThree = _.withSameArgs (three, function () {})
    var oneArgLess  = _.withArgs (_.numArgs (three) - 1, _.restArg (three), function () {})

    $assert ([_.numArgs (sameAsThree), _.restArg (sameAsThree)], [3, false])
    $assert ([_.numArgs (oneArgLess ), _.restArg (oneArgLess )], [2, false])


}, function () { _.extend (_, {

    /*  Querying
     */
    numArgs: function (fn) {
                return fn._ac === undefined ? fn.length : fn._ac },     // short name for speed (it's now invisible, so pofig)

    restArg: function (fn) {
                return fn._ra || false },                               // short name for speed (it's now invisible, so pofig)

    noArgs: function (fn) {
                return (_.numArgs (fn) === 0) && !fn._ra },

    hasArgs: function (fn) {
                return (_.numArgs (fn) > 0) && !fn._ra },

    oneArg: function (fn) {
                return (_.numArgs (fn) === 1) && !fn._ra },

    /*  Setting
     */
    withRestArg: _.defineGlobalProperty ('$restArg',
                        function (fn) {
                            Object.defineProperty (fn, '_ra', { enumerable: false, writable: true, value: true })
                            return fn }),

    withArgs: function (numArgs, restArg, fn) {
                        if (numArgs !== undefined) {
                            Object.defineProperty (fn, '_ac', { enumerable: false, writable: true, value: numArgs }) }
                        if (restArg !== undefined) {
                            Object.defineProperty (fn, '_ra', { enumerable: false, writable: true, value: restArg }) }
                        return fn },

    withSameArgs: function (other, fn) {
                        return _.withArgs (_.numArgs (other), _.restArg (other), fn) } }) })

/*  Adds argcount tracking to some underscore functions.
    Will test it for speed in future, and if slow in app code,
    will be de-mounted, thus sacrificing clarity in some places.
    ======================================================================== */

$overrideUnderscore ('memoize',
    function (memoize) {
        return function (fn) {
                    return _.withSameArgs (fn, memoize (fn)) } })

$overrideUnderscore ('partial',
    function (partial) {
        return $restArg (function (fn) {
                                return _.withArgs (
                                    Math.max (0, _.numArgs (fn) - (arguments.length - 1)), fn._ra,
                                        partial.apply (this, arguments)) }) })


$overrideUnderscore ('bind',
    function (bind) {
        return $restArg (function (fn, this_) {
                            return _.withArgs (
                                Math.max (0, _.numArgs (fn) - (arguments.length - 2)), fn._ra,
                                    bind.apply (this, arguments)) }) })


/*  Limits function to given number of arguments
    ======================================================================== */

_.arity = function (N, fn) { return function () {
                                        return fn.apply (this, _.first (arguments, N)) }}

_.arity0 = function (fn) { return function () {
                                    return fn.call (this) }}

_.arity1 = function (fn) { return function (a) {
                                    return fn.call (this, a) }}

_.arity2 = function (fn) { return function (a, b) {
                                    return fn.call (this, a, b) }}

_.arity3 = function (fn) { return function (a, b, c) {
                                    return fn.call (this, a, b, c) }}

_.arityFn = function (N) { return _['arity' + N] }


/*  A version of _.partial that binds to tail of argument list
    ======================================================================== */

_.tails = $restArg (function (fn) { var tailArgs = _.rest (arguments)
                                        return function () {
                                            return fn.apply (this, _.asArray (arguments).concat (tailArgs)) }})

_.tails2 = $restArg (function (fn) { var tailArgs = _.rest (arguments)
                                        return function (a) {
                                            return fn.apply (this, [a].concat (tailArgs)) }})

_.tails3 = $restArg (function (fn) { var tailArgs = _.rest (arguments)
                                        return function (a, b) {
                                            return fn.apply (this, [a, b].concat (tailArgs)) }})

/*  Flips function signature (argument order)
    ======================================================================== */

_.flip = function (fn) {
            if (_.restArg (fn)) { return $restArg (function () {
                return fn.apply (this, _.asArray (arguments).reverse ()) }) }
            else {
                switch (_.numArgs (fn)) {
                    case 0:
                    case 1: return fn
                    case 2: return _.flip2 (fn)
                    case 3: return _.flip3 (fn)
                    default: throw new Error ('flip: unsupported arity') } } }

_.flip2 = function (fn) { return function (a, b) {
                                    return fn.call (this, b, a) }}

_.flip3 = function (fn) { return function (a, b, c) {
                                    return fn.call (this, c, b, a) }}

/*  Logical composition operators
    ======================================================================== */

_.or = function (a, b) { return function () {
        return a.apply (this, arguments) || b.apply (this, arguments) }},

_.and = function (a, b) { return function () {
        return a.apply (this, arguments) && b.apply (this, arguments) }},

_.not = function (x) { return function () {
        return !x.apply (this, arguments) } }

/*  Y combinator (for anonymous recursive functions)
    ======================================================================== */

_.withTest (['function', 'Y combinator'], function () {

    var countTo5 = _.Y (function (self) {
        return function (n) {
            return n >= 5 ? n : self (n + 1) } })

    $assert (countTo5 (0), 5) }, function () { _.extend (_, {

    Y: function (eatSelf) {
        var self = eatSelf (function () {
            return self.apply (this, arguments) }); return self } }) });


/*  converts regular things like map/zip to hyper versions, that traverse
    deep structures (tested later, via its derivatives: zipZip/mapMap etc)
    ======================================================================== */

/*  Operator argument is the thing that walks down the tree and transforms it.
    But its predicate gets called only on the leaves of a tree (end values).

    Essentially, it abstracts you from structure, making it 'transparent'
    for any kind of previously defined one-dimensional operators like
    map/filter/zip/reduce/etc.

    Example:    hyperMap = _.hyperOperator (_.unary,  _.map2)
                hyperZip = _.hyperOperator (_.binary, _.zip2, _.goDeeperOnlyWhenNessesary)
 */

 (function () {

    /*  N number denotes how many arguments underlying operation accepts
     */
    _.hyperOperator = function (N, operator, diCaprioPredicate, nonTrivial) {
                                                                          var arity            = _.arityFn (N)       || _.identity
                                                                          var weNeedToGoDeeper =  (diCaprioPredicate || _.goDeeperWhenFirstArgumentIsGood) (N, nonTrivial || _.isNonTrivial)
                            return function () {                          var subOperator      = _.last (arguments)
                                return _.Y (function (hyperOperator_) {   var hyperOperator    = _.tails (operator, arity (hyperOperator_))
                                    return function () {
                                        return (weNeedToGoDeeper (arguments) ?
                                                    hyperOperator :
                                                    subOperator)
                                                        .apply (this, arguments) } }).apply (this, _.initial (arguments)) } }

    /*  Combinatoric complexity classifiers for exact configuration of hyperOperator behavior
     */
    _.goDeeperWhenFirstArgumentIsGood= function (N, canGoDeeper) { 
        return function (args) { return   (args.length > 0) ? canGoDeeper (args[0]) : false } }

    _.goDeeperAlwaysIfPossible= function (N, canGoDeeper) {
             if (N === 0) {                          return _.constant (false)                                }
        else if (N === 1) { return function (args) { return   canGoDeeper (args[0])                           } }
        else if (N === 2) { return function (args) { return   canGoDeeper (args[0]) || canGoDeeper (args[1])  } }
        else              { return function (args) { return _.some (_.asArray (args),  canGoDeeper)           } } }

    _.goDeeperOnlyWhenNessesary = function (N, canGoDeeper) {
             if (N === 0) {                          return _.constant (false)                                }
        else if (N === 1) { return function (args) { return   canGoDeeper (args[0])                           } }
        else if (N === 2) { return function (args) { return   canGoDeeper (args[0]) && canGoDeeper (args[1])  } }
        else              { return function (args) { return _.every (_.asArray (args), canGoDeeper)           } } }

    _.isTrivial = function (x) { return _           .isEmpty (x) || _.isString (x) || _.isNumber (x) ||
                                        !(_.isStrictlyObject (x) || _.isArray (x)) || _.isPrototypeInstance (x) || _.isMeta (x) }

    _.isMeta = _.constant (false)

    _.isNonTrivial = _.not (_.isTrivial)

    /*  Self-descriptive constants (for clarity)
     */
    _.binary = 2
    _.unary  = 1 }) ()

/*  Generates higher order stuff from regular routine
    ======================================================================== */

_.withTest (['function', 'higherOrder'], function () {

        var file = []
        var write = function (x) { file.push (x) }
        var writes = _.higherOrder (write)

        _.times (3, writes ('foo'))

        $assert (file, ['foo', 'foo', 'foo']) }, function () {

    _.higherOrder = function (fn) { return _.partial (_.partial, fn) } })

/*  coerces x|fn()→x to x (useful for configuration parameters)
    ======================================================================== */

_.deferTest (['function', 'eval/evals'], function () {

        var cfg = {
            value1: 42,
            value2: function () { return 42 },
            value3: _.property ('number')
        }

        var eval = _.evals ({ number: 42 }) // higher order

        $assert (_.eval (cfg.value1), _.eval (cfg.value2), eval (cfg.value3), 42) }, function () {

    _.eval = function (x) {
                return _.isFunction (x) ? x.call (this) : x  }

    _.evals = function (__args__) {
                var arguments_ = arguments
                return function (x) {
                    return _.isFunction (x) ? x.apply (this, arguments_) : x } } })

/*  in rhyme with _.property, this one calls a method
    ======================================================================== */

_.method = function (name) {
                var args = _.rest (arguments)
                    return function (obj) {
                        return obj[name].apply (obj, args) } }

/*  Converts between calling conventions
    ======================================================================== */

_.asFreeFunction = function (fn) { return function (this_, restArg) {
                                            return fn.apply (this_, _.rest (arguments)) } }

_.asMethod = function (fn) { return function () {
                                        return fn.apply (undefined, [this].concat (_.asArray (arguments))) } }


/*  Wrapper generator
    ======================================================================== */

_.wrapper = function (fn, wrapper) {
                return _.withSameArgs (fn, function () {
                                                var this_ = this
                                                var arguments_ = arguments
                                                return wrapper (function (additionalArguments) {
                                                                    fn.apply (
                                                                        this_,
                                                                        _.asArray (arguments_).concat (additionalArguments)) }) }) }


/*  _.once
    ======================================================================== */

_.withTest (['function', 'once'], function () {

    $assertCalls (1, function (mkay) {
        var f = _.once (function () { mkay () })
        f ()
        f () }) }, function () {

    _.once = function (fn) {
                var called = false
                return function () {
                    if (!called) { called = true
                        return fn.apply (this, arguments) } } } })

/*  _.withTimeout
    ======================================================================== */

_.deferTest (['function', 'withTimeout'], function (testDone) {

    _.withTimeout ({
        maxTime: 10,
        expired: function () { $fail } },
        function (done) { done () })

    _.withTimeout ({
        maxTime: 10,
        expired: function (then) { testDone () } },
        function (done) { _.delay (done, 20) },
        function () { // 'then' should not be called if expired (though you may call it explicitly at expired() callback)
            $fail })

}, function () {

    _.withTimeout = function (cfg, what, then) {
        var expired = false
        var timeout = setTimeout (function () {
            expired = true
            if (cfg.expired) {
                cfg.expired (then) } }, cfg.maxTime)

        what (function () {
            if (!expired) {
                clearTimeout (timeout)
                if (then) {
                    then.apply (this, arguments) } } }) } })

/*  Sequential composition operator (inverted _.compose, basically)
    ======================================================================== */

_.withTest (['function', 'sequence / then'], function () {

        var context = { foo: 'bar' }

        var makeCookies = function (from) { $assert (this === context)
            return 'cookies from ' + from }

        var eatCookies = function (cookies) { $assert (this === context)
            return 'nice ' + cookies }

        var lifeProcess = makeCookies.then ?                            // available in both notations
                                makeCookies.then (eatCookies) :
                                _.then (makeCookies, eatCookies)

        var anotherWay = _.sequence (makeCookies, eatCookies)
        var wayAnother = _.sequence ([makeCookies, eatCookies])

        $assert (lifeProcess.call (context, 'shit'), 'nice cookies from shit')
        $assert (anotherWay.call  (context, 'shit'), 'nice cookies from shit')
        $assert (wayAnother.call  (context, 'shit'), 'nice cookies from shit')

        $assert (_.sequence ([]).call (context, 'foo'), 'foo') }, function () {

    _.sequence = function (arg) { // was _.flip (_.compose) before... but it needs performance
        var chain = _.isArray (arg) ? arg : _.asArray (arguments)
        var length = chain.length
        return (length === 0) ? _.identity : function (x) {
            for (var i = 0; i < length; i++) { x = chain[i].call (this, x) }
            return x } }

    _.seq = _.sequence

    _.then = function (fn1, fn2) { return function (args) {
                                            return fn2.call (this, fn1.apply (this, arguments)) }} })



/*  Basic utility for writing data-crunching functional expressions.
    ======================================================================== */

_.asString = function (what) { return what + '' }

_.typeOf = function (what) {
                return typeof what }

_.count = function (what) { // cannot override _.length
                return what.length }

_.array = _.tuple = function () {
                        return _.asArray (arguments) }

_.concat = function (a, b) {
    if (_.isArray (a)) {
        return a.concat ([b]) }
    else {
        return a + b } }

_.atIndex = function (n) {
                return function (arr) { return arr[n] } }

_.applies = function (fn, this_, args) {
                return function () { return fn.apply (this_, args) } }

_.prepends = function (what) {
                return function (to) {
                    return what + to } }

_.appends = function (what) {
                return function (to) {
                    return to + what } }

_.join = function (arr, s) { return arr.join (s) }
_.joinWith = _.flip2 (_.join)
_.joinsWith = _.higherOrder (_.joinWith)

_.sum = function (a, b) {
            return (a || 0) + (b || 0) }


_.subtract = function (a, b) {
                return (a || 0) - (b || 0) }

_.mul = function (a, b) {
            return (a || 0) * (b || 0) }

_.equal = function (a, b) {
            return a === b }

_.sums      = _.plus  = _.higherOrder (_.sum)
_.subtracts = _.minus = _.higherOrder (_.subtract)
_.muls                = _.higherOrder (_.mul)
_.equals              = _.higherOrder (_.equal)

_.largest = function (a, b) {                   // FFFFUUUU: underscore already taken _.max for its dirty needs, pidory blyat.
                if (isNaN (a) && isNaN (b)) {
                    return NaN }
                else if (isNaN (a)) {
                    return b }
                else if (isNaN (b)) {
                    return a }
                else {
                    return Math.max (a, b) } }

_.notZero = function (x) { return x !== 0 }

_.propertyOf = function (obj) { return function (prop) {            // inverted version of _.property
                                            return obj[prop] }}


/*  isTypeOf (bootstrap for OOP.js)
    ======================================================================== */

_.isInstanceofSyntaxAvailable = function () { var e = new Error ()
    try       { return e instanceof Error }
    catch (e) { return false } }

_.isTypeOf_ES4 = function (constructor, what) {
    while (what) {
        if (what.constructor === constructor) {
            return true }
        what = what.constructor.$base }
    return false }

_.isTypeOf_ES5 = function (constructor, what) {
    return what instanceof constructor }

_.isTypeOf = _.isInstanceofSyntaxAvailable () ? _.isTypeOf_ES5 : _.isTypeOf_ES4

_.isPrototypeInstance = function (x) {
    return x && x.constructor && _.isPrototypeConstructor (x.constructor) }

_.isPrototypeConstructor = function (x) {
    return (x && (x.$definition !== undefined)) || false }

_.typeOf2 = function (x) {
    return _.isEmptyArray (x) ? x : (typeof x) }

/*  Useful for defining functions that accept either [x] or x as argument
    ======================================================================== */

_.coerceToArray = function (x) {
                        return (x === undefined) ? [] : (_.isArray (x) ? x : [x]) }

/*  Fixes _.isArray to account objects that derive from Array prototype
    ======================================================================== */

_.deferTest (['type', 'isArray'], function () {

        var CustomArray = $extends (Array, {
            method: function () { return 42 } })

        $assert (_.isArray (new CustomArray ())) }, function () {

    $overrideUnderscore ('isArray', function (isArray) {
        return function (x) {
            return _.isTypeOf (Array, x) || isArray (x) } }) })

/*  Better _.matches / $assertMatches: +regexp feature, +deep matching
    ======================================================================== */

_.deferTest (['type', 'matches(regex)'], function () {

    var test = function (a, pattern) {
        $assert (_.match (a, pattern))
        $assert (_.matches (pattern) (a))
        $assertMatches (a, pattern) }

    $assertFails (function () {
        test ({ foo: [1,2], bar: 2 },
              { foo: [3], bar: 2 })
        test ({ bar: { foo: 'foo' } },
              { bar: { foo: /[0-9]+/ } })
        test ({}, { foo: 1 }) })

    $assertFails (function () {
        test ({ foo: 1 }, undefined)    // differs from original impl in that
        test ('.DS_Store', /.+\.js/) }) // regression

    test ({ foo: [1,2], bar: 2 },
          { foo: [2] })
    test ({ bar: { foo: '123', qux: 1 } },
          { bar: { foo: /[0-9]+/ } })
    test ({ foo: 1 }, {}) },

    function () { _.mixin ({

        matches: function (pattern) {
                        return ((arguments.length === 0) && _.constant (true)) ||
                                                            _.tails2 (_.match, pattern) },

        match: function (a, ptrn) {
                        return  (a === ptrn)
                            ||  (_.isArray (a)  && _.isArray (ptrn)  && _.arrayMatch (a, ptrn))
                            ||  (_.isObject (a) && _.isObject (ptrn) && _.objectMatch (a, ptrn))
                            ||  (_.isTypeOf (RegExp, ptrn) && _.isString (a) && (a.match (ptrn) !== null)) },

        arrayMatch: function (a, pattern) {
            return _.every (pattern, _.propertyOf (_.index (a))) },
         
        objectMatch: function (a, pattern) {
                            return _.reduce (_.pairs (pattern),
                                function (result, kv) {
                                    return result && _.match (a[kv[0]], kv[1]) }, true) } }) })

/*  POD data types
    ======================================================================== */

_.withTest (['type', 'POD'], function () {

    $assert (_.every ([[], {}, 42, 'foo', null, undefined, true].map (_.isPOD)))
    $assert (_.every ([/foo/, new Date ()].map (_.isNonPOD)))

}, function () { _.extend (_, {

    isNonPOD: function (v) {
        return (v && v.constructor) &&
            (v.constructor !== Object) &&
            (v.constructor !== Array) &&
            (v.constructor !== String) &&
            (v.constructor !== Number) &&
            (v.constructor !== Boolean) },

    isPOD: function (v) {
        return !_.isNonPOD (v) } }) })

/*  Numbers
    ======================================================================== */

_.withTest (['type', 'numbers'], function () {

    $assert (_.every (_.map ([0,        1,     -7,    200003, 12344567788], _.arity1 (_.not (_.isDecimal)))))
    $assert (_.every (_.map ([0.1, -0.001, 0.0001, -0.000001,    0.000001], _.arity1 (       _.isDecimal))))

    $assert (_.isDecimal (0.003, 0.01), false) // custom tolerance

}, function () {

    if (typeof Number.EPSILON === 'undefined') {
        Object.defineProperty (Number, 'EPSILON', { enumerable: true,
                                                    get:  _.constant (2.2204460492503130808472633361816E-16) }) } // NodeJS lack this

    _.extend (_, {
        isDecimal: function (x, tolerance) {
                        if (!_.isNumber (x) || _.isNaN (x)) {
                            return false }
                        else {
                            return (Math.abs (Math.floor (x) - x) > (tolerance || Number.EPSILON)) } } }) })

/*  'empty' classifiers (fixes underscore shit)
    ======================================================================== */

_.withTest (['type', 'empty-centric routines'], function () {

    $assert (_.coerceToEmpty (42), undefined)
    $assert (_.coerceToEmpty ([42]), [])
    $assert (_.coerceToEmpty ({ foo: 42 }), {})

    $assert ([
        _.isNonemptyString ('foo'),
        _.isNonemptyString (''),
        _.isNonemptyString ([])], [true, false, false])

    $assert (_.isEmptyArray ([]),           true)
    $assert (_.isEmptyArray ([1,2,3]),      false)
    $assert (_.isEmptyArray (undefined),    false)
    $assert (_.isEmptyArray (null),         false)
    $assert (_.isEmptyArray (''),           false)

    $assert (_.isEmptyObject ({}),          true)
    $assert (_.isEmptyObject ([]),          false)
    $assert (_.isEmptyObject ({ foo: 1 }),  false)
    $assert (_.isEmptyObject (undefined),   false) 
    $assert (_.isEmptyObject (null),        false)
    $assert (_.isEmptyObject (''),          false)
    $assert (_.isEmptyObject (0),           false)
    $assert (_.isEmptyObject (false),       false)

    $assert (_.isEmpty (0),         false)
    $assert (_.isEmpty (false),     false)
    $assert (_.isEmpty (/.+\.js/),  false) // regression
    $assert (_.isEmpty (null),      true)
    $assert (_.isEmpty ({}),        true)
    $assert (_.isEmpty ([]),        true)

    $assert (_.isNonempty ('foo'),  true) // negated _.isEmpty

    $assert (_.coerceToUndefined (undefined),   undefined)
    $assert (_.coerceToUndefined ({}),          undefined)
    $assert (_.coerceToUndefined ([]),          undefined)
    $assert (_.coerceToUndefined (''),          undefined)
    $assert (_.coerceToUndefined (null),        undefined)
    $assert (_.coerceToUndefined (0),           0)
    $assert (_.coerceToUndefined (Math.NaN),    undefined)
    $assert (_.coerceToUndefined (false),       false)
    $assert (_.coerceToUndefined ({ foo: 1 }),  { foo: 1 })
    $assert (_.coerceToUndefined ([1, 2]),      [1, 2])  }, function () { _.extend (_, {

    /*  These two override underscore's one, because the original stuff is semantically incorrect.
        A word needs to be spoken here, because it's not the first routine we override, and not
        the last. So what about semantics?

        For instance, 0 and false should NOT be treated as empty. But they are (in underscore).
        This is ridiculous. Can think of hundreds of applications of the correct impl., and
        just none of that for the creeped original version. Why would one ever need to treat 0
        as 'empty'? Shit, its just a regular number, no worse or better than 1 or 42. And 'false'?
        Keep hands off boolean logic. If someone states that something's false - it's false, not
        a 'void non-existing piece of nothing'. It's a value. It has value. And it's false. Oh,
        fock, just don't get me started...
     */
    isEmpty: function (obj) {
        return _.coerceToUndefined (obj) === undefined },

    isNonempty: function (obj) {
        return _.coerceToUndefined (obj) !== undefined },

    isEmptyObject: function (v) {
                        return   !_.isArray (v) &&
                                 !_.isFunction (v) &&
                                  _.isObject (v) &&
                                 (_.keys (v).length === 0) },

    isStrictlyObject: function (v) {
        return (v && (typeof v === 'object')) ? true : false },

    isEmptyArray: function (v) {
                        return _.isArray (v) && v.length === 0 },

    isNonemptyString: function (v) {
        return (typeof v === 'string') && (v.length > 0) },

    coerceToEmpty: function (x) {
        if (_.isArray (x)) { return [] }
        else if (_.isStrictlyObject (x)) { return {} }
        else { return undefined } },

    /*  Projects a variety of input values through 'undefined/non-undefined' dichotomy.
     */
    coerceToUndefined: function (v) {
                            return ((v === undefined) ||
                                    (v === null) ||
                                    (v === Math.NaN) ||
                                    (v === '') ||
                                    (_.isPOD (v) &&
                                        (_.isEmptyObject (v) ||
                                        (v.length === 0)))) ? undefined : v } })} )

/*  Tired of wrapping JSON.parse to try/catch? Here's solution.
    Also, it's two-way (can either parse, or stringify).
    ======================================================================== */

_.json = function (arg) {
            if (typeof arg === 'string') {
                try         { return JSON.parse (arg) }
                catch (e)   { return {} } }
            else {
                return JSON.stringify (arg) } }
                
/*  Object stringifier
    ======================================================================== */

_.deferTest (['type', 'stringify'], function () {

        var complex =  { foo: 1, nil: null, nope: undefined, fn: _.identity, bar: [{ baz: "garply", qux: [1, 2, 3] }] }
            complex.bar[0].bar = complex.bar

        var renders = '{ foo: 1, nil: null, nope: undefined, fn: <function>, bar: [{ baz: "garply", qux: [1, 2, 3], bar: <cyclic> }] }'

        var Proto = $prototype ({})

        $assert (_.stringify (Proto),   '<prototype>')

        $assert (_.stringify (123),     '123')
        $assert (_.stringify (complex), renders)

        var obj = {}
        $assert (_.stringify ([obj, obj, obj]), '[{  }, <ref:1>, <ref:1>]') }, function () {

    _.stringify         = function (x, cfg) { return _.stringifyImpl (x, [], [], 0, cfg || {}, -1) }

    _.stringifyImpl     = function (x, parents, siblings, depth, cfg, prevIndent) {

                            if (x === $global) {
                                return '$global' }

                            var customFormat = cfg.formatter && cfg.formatter (x)
                            
                            if (customFormat) {
                                return customFormat }

                            else if (parents.indexOf (x) >= 0) {
                                return cfg.pure ? undefined : '<cyclic>' }

                            else if (siblings.indexOf (x) >= 0) {
                                return cfg.pure ? undefined : '<ref:' + siblings.indexOf (x) + '>' }

                            else if (x === undefined) {
                                return 'undefined' }

                            else if (x === null) {
                                return 'null' }

                            else if (_.isFunction (x)) {
                                return cfg.pure ? x.toString () : (_.isPrototypeConstructor (x) ? '<prototype>' : '<function>') }

                            else if (typeof x === 'string') {
                                return _.quoteWith ('"', x) }

                            else if (_.isObject (x) && $atom.isNot (x)) { var isArray = _.isArray (x)

                                var pretty = cfg.pretty || false

                                if (x.toJSON) {
                                    return _.quoteWith ('"', x.toJSON ()) } // for MongoDB ObjectID

                                if (!cfg.pure && (depth > (cfg.maxDepth || 5) || (isArray && x.length > (cfg.maxArrayLength || 30)))) {
                                    return isArray ? '<array[' + x.length + ']>' : '<object>' }

                                var parentsPlusX = parents.concat ([x])

                                siblings.push (x)

                                var values  = _.pairs (x)

                                var oneLine = !pretty || (values.length < 2)

                                var indent  = prevIndent + 1
                                var tabs    = !oneLine ? '\t'.repeats (indent) : ''

                                if (pretty && !isArray) {
                                    var max = _.reduce (_.map (_.keys (x), _.count), _.largest, 0)
                                    values = _.map (values, function (v) {
                                        return [v[0], v[1], ' '.repeats (max - v[0].length)] }) }

                                var square  = !oneLine ? '[\n  ]' : '[]'
                                var fig     = !oneLine ? '{\n  }' : '{  }'
                                
                                return _.quoteWith (isArray ? square : fig, _.joinWith (oneLine ?  ', ' : ',\n',
                                            _.map (values, function (kv) {
                                                        return tabs + (isArray ? '' : (kv[0] + ': ' + (kv[2] || ''))) +
                                                            _.stringifyImpl (kv[1], parentsPlusX, siblings, depth + 1, cfg, indent) }))) }

                            else if (_.isDecimal (x) && (cfg.precision > 0)) {
                                return _.toFixed (x,     cfg.precision) }
                                
                            else {
                                return x + '' } } })

/*  Safe version of toFixed
    ======================================================================== */

_.toFixed = function (x, precision) {
    return (x && x.toFixed && x.toFixed (precision)) || undefined }

_.toFixed2 = function (x) {
    return _.toFixed (x, 2) }

_.toFixed3 = function (x) {
    return _.toFixed (x, 3) }







_.hasStdlib = true

/*  _.throwsError
    ======================================================================== */

_.withTest (['stdlib', 'throwsError'], function () {

        $assertThrows (
            _.throwsError ('неуловимый Джо'),
            _.matches ({ message: 'неуловимый Джо' })) }, function () { _.extend (_, {

    throwsError: function (msg) {
                    return function () {
                        throw new Error (msg) }} }) })

_.overrideThis   = _.throwsError ('override this')
_.notImplemented = _.throwsError ('not implemented')


/*  A functional try/catch
    ======================================================================== */

_.deferTest (['stdlib', 'tryEval'], function () {

    /*  'return' interface
     */
    $assert ('ok',     _.tryEval (_.constant ('ok'),
                                  $fails))

    $assert ('failed', _.tryEval (_.throwsError ('yo'),
                                  $assertMatches.partial ({ message: 'yo'}).then (_.constant ('failed'))))

   /*   CPS interface
    */
    $assertCPS (_.tryEval.partial (_.constant ('ok'),
                                   _.constant ('failed')), 'ok')
 
    $assertCPS (_.tryEval.partial (_.throwsError ('yo'),
                                   _.constant ('failed')), 'failed')

}, function () { _.mixin ({
                    tryEval: function (try_, catch_, then_) { var result = undefined
                        try       { result = try_ ()    }
                        catch (e) { result = catch_ && catch_ (e) }
                        return then_ ?
                                    then_ (result) :
                                    result } }) })


/*  Abstract _.values
    ======================================================================== */

_.deferTest (['stdlib', 'values2'], function () {

    $assert (_.values2 (undefined), [])
    $assert (_.values2 (_.identity), [_.identity])
    $assert (_.values2 ('foo'), ['foo'])
    $assert (_.values2 (['foo', 'bar']), ['foo', 'bar'])
    $assert (_.values2 ({ f: 'foo', b: 'bar' }), ['foo', 'bar'])

}, function () { _.mixin ({
                    values2: function (x) {
                        if (_.isArray (x))                  { return x }
                        else if (_.isStrictlyObject (x))    { return _.values (x) }
                        else if (_.isEmpty (x))             { return [] }
                        else                                { return [x] } } }) })

/*  Map 2.0
    ======================================================================== */

/*  Semantically-correct abstract map (maps any type of value)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

_.deferTest (['stdlib', 'map2'], function () { var plusBar = _.appends ('bar')

    $assert (_.map2 ('foo', plusBar), 'foobar')
    $assert (_.map2 (['foo'], plusBar), ['foobar'])
    $assert (_.map2 ({ foo: 'foo' }, plusBar), { foo: 'foobar' })

}, function () { _.mixin ({
                    map2: function (value, fn, context) {
                        if (_.isArray (value)) {
                            return _.map (value, fn, context) }
                        else if (_.isStrictlyObject (value)) {
                            return _.objectMap (value, fn, context) }
                        else {
                            return fn.call (context, value) } } })})

/*  Hyper map (deep) #1 — maps leafs
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

_.deferTest (['stdlib', 'mapMap'], function () {

    $assert (_.mapMap ( 7,  _.typeOf2),  'number')   // degenerate cases
    $assert (_.mapMap ([7], _.typeOf2), ['number'])
    $assert (_.mapMap ([ ], _.typeOf2), [        ])

    $assert (_.mapMap ( {   foo: 7,
                            bar: ['foo', {
                                bar: undefined } ] }, _.typeOf2),
                        
                        {   foo: 'number',
                            bar: ['string', {
                                bar: 'undefined' } ] }) },

    function () {

        _.mixin ({ mapMap: _.hyperOperator (_.unary, _.map2) }) })



/*  Internal impl.
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

_.withTest (['stdlib', 'objectMap'], function () {

        var obj     = { a: 1, b: 2 }
        var plusOne = function (v) { return v + 1 }
        var crazy   = function (v, k) { return k + (v + 1) }

        $assert ({ a: 2, b: 3 },        _.objectMap (obj, plusOne))
        $assert ({ a: 'a2', b: 'b3' },  _.objectMap (obj, crazy))

        _.objectMap (obj, function () { $assert (this, 42) }, 42) }, function () { _.extend (_, {

    objectMap: function (obj, fn, context) {
                    return _.object (_.map (obj,
                        function (v, k) {
                            return [k, fn.call (context, v, k)] })) } }) })



/*  Filter 2.0
    ======================================================================== */

_.deferTest (['stdlib', 'filter 2.0'], function () { var foo = _.equals ('foo')

    // generic filter behavior for any container type

    $assert (_.filter2 (     'foo'  ,   foo),        'foo' )
    $assert (_.filter2 ([    'foo' ],   foo),   [    'foo' ])
    $assert (_.filter2 ({ f: 'foo' },   foo),   { f: 'foo' })
    
    $assert (_.filter2 (     'foo'  ,   _.not (foo)),   undefined)
    $assert (_.filter2 ([    'foo' ],   _.not (foo)),   [])
    $assert (_.filter2 ({ f: 'foo' },   _.not (foo)),   {})

    // map behavior, if predicate returns not boolean (mixed-behavior test not needed - although its the expected case of use)

    $assert (_.filter2 (     'foo' ,    _.constant ('bar')),         'bar'  )
    $assert (_.filter2 ([    'foo' ],   _.constant ('bar')),    [    'bar' ])
    $assert (_.filter2 ({ f: 'foo' },   _.constant ('bar')),    { f: 'bar' })

    // hyper-filter

    $assert (_.filterFilter (
                    { foo: 'foo',   bar: [7, 'foo', { bar: 'foo' }] }, _.not (_.equals ('foo'))),
                    {               bar: [7,        {            }] })

}, function () { _.mixin ({

    reject2: function (value, op) {
        return _.filter2 (value, _.not (op)) },

    filter2: function (value, op) {
        if (_.isArray (value)) {                                var result = []
            for (var i = 0, n = value.length; i < n; i++) {     var v = value[i], opSays = op (v, i)
                if (opSays === true) {
                    result.push (v) }
                else if (opSays !== false) {
                    result.push (opSays) } } return result }

        else if (_.isStrictlyObject (value)) {                  var result = {}
            _.each (Object.keys (value), function (key) {       var v = value[key], opSays = op (v, key)
                if (opSays === true) {
                    result[key] = v }
                else if (opSays !== false) {
                    result[key] = opSays } }); return result }

        else {                                                  var opSays = op (value)
            if (opSays === true) {
                return value }
            else if (opSays !== false) {
                return opSays }
            else {
                return undefined } } } })

    _.mixin ({

        filterFilter: _.hyperOperator (_.unary, _.filter2) }) })


/*  Reduce on steroids
    ======================================================================== */

_.deferTest (['stdlib', 'reduce 2.0'], function () {

    /*$assert (_.reduce2 ([    3,    7,    9 ], _.sum), 19)
    $assert (_.reduce2 ({ a: 3, b: 7, c: 9 }, _.sum), 19)
    $assert (_.reduce2 (     3   + 7   + 9  , _.sum), 19)

    $assert (_.reduce2 ([1], _.sum), 1)
    $assert (_.reduce2 ([],  _.sum), undefined)

    $assert (              1 + 20 + 3 + 4 + 5,
        _.reduceReduce ([[[1], 20],[3,[ 4,  5]]], function (a, b) { return (_.isNumber (a) && _.isNumber (b)) ? (a + b) : b }))*/

}, function () {

    /*  Because hyperOperator is fractal thing, it is nessesary to define a compatible argument
        order for _.reduce and its functor operand, as they get melted together to form a generic
        self-similar routine of a higher order.

        And that becames kinda "Yodish" when applied to familiar 'reduce'. See how they dont match:

            1. _.reduce (value, op, memo)
            2.       op (memo, value)
    */
    _.reduce2 = function (value, memo, op_) {

                    var op     = _.last (arguments)

                    var safeOp = function (value, memo) { var hasMemo = (memo !== undefined)
                                                          var result  = (hasMemo ? op (value, memo) : value)
                        return (result === undefined) ?
                                    (hasMemo ? memo : value) :
                                    (result) }

                    if (_.isArray (value)) {                                
                        for (var i = 0, n = value.length; i < n; i++) {
                            memo = safeOp (value[i],   memo) } }

                    else if (_.isStrictlyObject (value)) {                  
                        _.each (Object.keys (value), function (key) {
                            memo = safeOp (value[key], memo) }) }

                    else {
                            memo = safeOp (value,      memo) } return memo }

    _.reduceReduce = function (initial, value, op) {
                        return _.hyperOperator (_.binary, _.reduce2, _.goDeeperAlwaysIfPossible) (value, initial, op.flip2) }
 })

/*  Zip 2.0
    ======================================================================== */

/*  Abstract zip that reduces any types of matrices.
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

_.deferTest (['stdlib', 'zip2'], function () {

    $assert (_.zip2 ([  'f',
                        'o',
                        'o'], _.concat), 'foo')

    $assert (_.zip2 ([  ['f', 'b'],
                        ['o', 'a'],
                        ['o', 'r']], _.concat), ['foo', 'bar'])

    $assert (_.zip2 ([  { foo:'f', bar:'b' },
                        { foo:'o', bar:'a' },
                        { foo:'o', bar:'r' }], _.concat), { foo: 'foo', bar: 'bar' })

    $assert (_.zip2 (   { foo:'f', bar:'b' },           // passing rows as arguments
                        { foo:'o', bar:'a' },
                        { foo:'o', bar:'r' },  _.concat), { foo: 'foo', bar: 'bar' })

    $assert (_.zip2 (undefined, _.concat), undefined)   // degenerate cases
    $assert (_.zip2 (5,         _.concat), 5)
    $assert (_.zip2 ([],        _.concat), [])
    $assert (_.zip2 (['foo'],   _.concat), 'foo')

    // internals (regression tests)

    $assert (_.zipObjectsWith ([
                { name: 'string' },
                { born: 123 }], _.array),
            
                { name: ['string',  undefined],
                  born: [undefined, 123] })

}, function () { _.mixin ({

    zipObjectsWith: function (objects, fn) {
        return _.reduce (_.rest (objects), function (memo, obj) {
            _.each (_.union (_.keys (obj), _.keys (memo)), function (k) {
                var zipped = fn (memo && memo[k], obj && obj[k])
                if (zipped === undefined) {
                    delete memo[k] }
                else {
                    memo[k] = zipped } }); return memo }, _.clone (objects[0])) },

    zip2: function (rows_, fn_) {   var rows = arguments.length === 2 ? rows_ : _.initial (arguments)
                                    var fn   = arguments.length === 2 ? fn_   : _.last (arguments)
        if (!_.isArray (rows) || rows.length === 0) {
            return rows }
        else {
            if (_.isArray (rows[0])) {
                return _.zipWith (rows, fn) }
            else if (_.isStrictlyObject (rows[0])) {
                return _.zipObjectsWith (rows, fn) }
            else {
                return _.reduce (rows, fn) } } } }) })

/*  Hyperzip (deep one).
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

_.deferTest (['stdlib', 'zipZip'], function () {

    $assert (_.zipZip (
            { phones: [{ number: 'number' }] },
            { phones: [{ number: 333 }] }, _.array),
            { phones: [{ number: ['number', 333] }] })

    $assert (_.zipZip ([{   foo: 7,
                            bar: ['foo', {
                                bar: undefined } ] },
                        
                        {   foo: 'number',
                            bar: ['string', {
                                bar: 'undefined' } ] } ], _.array),

                        {   foo: [7, 'number'],
                            bar: [['foo', 'string'], {
                                bar: [undefined, 'undefined'] } ] }) },
function () {

    _.mixin ({ zipZip: _.hyperOperator (_.binary, _.zip2) }) })


/*  Find 2.0 + Hyperfind
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

_.deferTest (['stdlib', 'findFind'], function () {

    var obj = { x: 1, y: { z: 2 }}

    $assert (_.findFind ({ foo: 1, bar: [1,2,3]  }, _.constant (false)), false)
    $assert (_.findFind ({ foo: 1, bar: [1,2,3]  }, _.equals (2)),       2)
    $assert (_.findFind ({ foo: { bar: obj     } }, _.equals (obj)),     obj) },

function () {

    _.findFind = function (obj, pred_) {
                    return _.hyperOperator (_.unary,
                             function (value, pred) {
                                    if (_.isArray (value)) {                                
                                        for (var i = 0, n = value.length; i < n; i++) { var x = pred (value[i])
                                                          if (typeof x !== 'boolean') { return x }
                                                                 else if (x === true) { return value[i] } } }

                                    else if (_.isStrictlyObject (value)) {        
                                        for (var i = 0, ks = Object.keys (value), n = ks.length; i < n; i++) { var k = ks[i]; var x = pred (value[k])
                                                                                 if (typeof x !== 'boolean') { return x }
                                                                                        else if (x === true) { return value[k] } } }

                                                                                          var x = pred_ (value)
                                                            if (typeof x !== 'boolean') { return x }
                                                                   else if (x === true) { return value }
                                                                                          return false }) (obj, pred_) } })


/*  Most useful _.extend derivatives
    ======================================================================== */

_.withTest (['stdlib', 'extend 2.0'], function () {

        /*  Inverted version of _.extend, for humanized narration where it makes sense (not here,
            but see AOP impl for example of such one)
         */
        [(function () {
            var input   = { foo:1,  bar:1 }
            var plus    = { foo:42, qux:1 }
            var gives   = { foo:42, qux:1, bar: 1 }

            $assert (_.extendWith (plus, input), gives) }) (),

        /*  Higher-order version of _.extend, allows to use it as _.map operator, which cuts
            shit in typical arrays-of-objects crunching routines
         */
        (function () {
            var input   = [{ bar:1 }, {}]
            var plus    = _.extendsWith ({ foo:42 })
            var gives   = [{ bar:1, foo:42 }, { foo:42 }]

            $assert (_.map (input, _.arity1 (plus)), gives) }) (),

        /*  Deep version of _.extend, allowing to extend two levels deep (super useful one)
         */
        (function () {
            var input   = { foo:1,  bar: { qux:1 } }
            var plus    = { foo:42, bar: { baz:1 } }
            var gives   = { foo:42, bar: { baz:1, qux:1 }}

            $assert (_.extend2 (input, plus), gives) }) ()]  }, function () {

    _.extend = $restArg (_.extend) // Mark as having rest argument (to make _.flip work on that shit)

    _.extendWith = _.flip (_.extend)                                        
    _.extendsWith = _.flip (_.partial (_.partial, _.flip (_.extend)))   // higher order shit

    _.extend2 = $restArg (function (what) { 
                                return _.extend (what, _.reduceRight (arguments, function (right, left) {
                                    return _.object (_.map (_.union (_.keys (left), _.keys (right)),
                                                            function (key) {
                                                                var lvalue = left[key]
                                                                return [key, (key in right) ?
                                                                                (typeof lvalue === 'object' ?
                                                                                    _.extend (lvalue, right[key]) :
                                                                                    right[key]) :
                                                                                lvalue] }))}, {})) }) })


/*  removes empty contents from any kinds of objects
    ======================================================================== */

_.withTest (['stdlib', 'nonempty'], function () {

    var obj = { blank: {}, empty: [], one: 1, none: undefined, nil: null, clear: '', zero: 0, no: false }
    var arr = [{}, [], 1, undefined, null, '', 0, false]

    $assert (_.nonempty (obj), { one: 1, zero: 0, no: false })
    $assert (_.nonempty (arr), [1, 0, false])

    $assert (_.nonempty (null), undefined)
    $assert (_.nonempty (''),   undefined)

}, function () {

    _.nonempty = function (obj) { return _.filter2 (obj, _.isNonempty) } })


/*  deep cloning of objects (as _.clone is shallow)
    ======================================================================== */

_.deferTest (['stdlib', 'cloneDeep'], function () {
    var obj     = { a: [{ b: { c: 'd' } }], b: {} }
    var copy    = _.cloneDeep (obj)

    $assert (obj   !== copy)    // should be distinct references
    $assert (obj.a !== copy.a)  // should be distinct references
    $assert (obj.b !== copy.b)  // should be distinct references

    $assert (obj, copy)     // structure should not change

}, function () { _.extend (_, {

    cloneDeep: _.tails2 (_.mapMap, _.clone) }) })


/*  given objects A and B, _.diff subtracts A's structure from B,
    and returns difference in terms of B
    ======================================================================== */

_.deferTest (['stdlib', 'diff'], function () {

        $assert (_.diff ('foo', 'foo'), undefined)
        $assert (_.diff ('foo', 'bar'), 'bar')

        $assert (_.diff ({ a: 1, b: 2, c: 3 },
                         { a: 1, b: 3,      d: 4 }),
                         {       b: 3,      d: 4 })

        $assert (_.diff ([1,2,3], [1,2,3]), undefined)

        $assert (_.diff ([1,'foo',2], [1,2,3]), [2,3])

}, function () {

    _.hyperMatch = _.hyperOperator (_.binary, function (a, b, pred) {
                                        return _.coerceToUndefined (_.nonempty (_.zip2 (a, b, pred))) })

    _.diff = _.tails3 (_.hyperMatch, function (a, b) { 
                                        return  ((($atom.unwrap (a) === $atom.unwrap (b)) || (a === $any) || (b === $any)) ? undefined : b) }) })


/*  inverse of _.diff (returns similarities)
    ======================================================================== */

_.deferTest (['stdlib', 'undiff'], function () {

        $assert (_.undiff ('foo', 'foo'), 'foo')
        $assert (_.undiff ('foo', 'bar'), undefined)

        $assert (_.undiff ({ a: 1, b: 2, c: 3 },
                           { a: 1, b: 3,      d: 4 }),
                           { a: 1 })

        $assert (_.undiff ([1,2,3], [1,2,3]), [1,2,3])

        $assert (_.undiff ([1,2], [1,3]), [1,undefined])
        $assert (_.undiff ([1,2], [0,2]), [undefined,2])

}, function () {

    _.hyperMatch = _.hyperOperator (_.binary, function (a, b, pred) {
                                        return _.coerceToUndefined (_.zip2 (a, b, pred)) })

    _.undiff = _.tails3 (_.hyperMatch, function (a, b) {
                                            return (($atom.unwrap (a) === $atom.unwrap (b)) || (a === $any) || (b === $any))  ? b : undefined }) })


/*  Makes { foo: true, bar: true } from ['foo', 'bar']
    ======================================================================== */

_.withTest (['stdlib', 'index'], function () {
    
        $assert (_.index (['foo', 'bar']), { foo: true, bar: true }) }, function () { _.extend (_, {

    index: function (list) {
            var result = {}
            for (var i = 0, n = list.length; i < n; i++) {
                result[list[i]] = true }
            return result } }) })

/*  A shorthand to _.filter + _.map (map with filter behavior).
    ======================================================================== */

_.withTest (['stdlib', 'filterMap'], function () {

    var input     = ['foo', undefined, 'bar']
    var plusBar   = function (x) { return x && (x + 'bar') }
    var notFoobar = function (x) { return x !== 'foobar' }

    $assert (_.filterMap (input, plusBar),            ['foobar', 'barbar'])
    $assert (_.filterMap (input, plusBar, notFoobar), [undefined, 'barbar'])

    _.filterMap.call (42, ['foo'],
        function (x) { $assert (this, 42) },
        function (x) { $assert (this, 42) })

}, function () { _.extend (_, {

    filterMap: function (arr, map_, filter_) { // shit's for performance sake

                    for (var i = 0,
                             n = (arr && arr.length) || 0,
                             map = map_ || _.identity,
                             filter = filter_ || _.isNonempty,
                             result = []; i < n; i++) {
                        
                        var x = map.call (this, arr[i])

                        if (filter.call (this, x)) {
                            result.push (x) } }

                    return result } }) })

/*  For string wrapping
    ======================================================================== */

_.withTest (['stdlib', 'quote'], function () {

        $assert (_.quote      ('qux'),           '"qux"')
        $assert (_.quote      ('qux', '[]'),     '[qux]')
        $assert (_.quote      ('qux', '/'),      '/qux/')
        $assert (_.quote      ('qux', '{  }'),   '{ qux }')
        $assert (_.quoteWith  ('[]', 'qux'), '[qux]') }, function () {

    _.quote = function (s, pattern_) {
                    var pattern = pattern_ || '"'
                    var before  = pattern.slice (0, Math.floor (pattern.length / 2 + (pattern.length % 2)))
                    var after   = pattern.slice (pattern.length / 2) || before

                    return before + s + after }

    _.quoteWith  = _.flip2 (_.quote)
    _.quotesWith = _.higherOrder (_.quoteWith) })


/*  _.partition 2.0
    ======================================================================== */

_.withTest (['stdlib', 'partition2'], function () {

        $assert (_.partition2 (
                    [ 'a', 'b', 'c',   undefined, undefined,   'd'], _.isNonempty),
                    [['a', 'b', 'c'], [undefined, undefined], ['d']]) }, function () {

    _.partition2 = function (arr, pred) { var prevColor = undefined

            var result = []
            var group = []

            _.each (arr, function (x) { var color = pred (x)
                if (prevColor != color && group.length) {
                    result.push (group)
                    group = [] }
                group.push (x)
                prevColor = color })

            if (group.length) {
                result.push (group) }

            return result } })


/*  experimental shit (subject to removal)
    ======================================================================== */

_.key = function (fn) {
            return function (value, key) {
                return fn (key) } }

_.filterKeys = function (arr, predicate) {
                    return _.filter (arr, function (v, k) { return predicate (k) }) }

_.rejectKeys = function (arr, predicate) {
                    return _.reject (arr, function (v, k) { return predicate (k) }) }

_.pickKeys = function (obj, predicate) {
                    return _.pick (obj, function (v, k) { return predicate (k) }) }

_.omitKeys = function (obj, predicate) {
                    return _.omit (obj, function (v, k) { return predicate (k) }) }



/*  Properties
    ======================================================================== */

_.withTest ('properties', function () { var obj = {}

    _.defineProperty (obj, 'fourtyTwo',         42)
    _.defineProperty (obj, 'fourtyTwo_too',     function ()  { return 42 })
    _.defineProperty (obj, 'fourtyTwo_orDie',   function (x) { $assert (x == 42); return 42 })
    _.defineProperty (obj, 'fourtyTwo_eitherWay', {
        configurable: true,
        get: function () { return 42 },
        set: function (x) { $assert (x == 42) } })

    $assert (42,
        obj.fourtyTwo,
        obj.fourtyTwo_too,
        obj.fourtyTwo_orDie (42),
        obj.fourtyTwo_eitherWay = 42)

    delete obj.fourtyTwo_eitherWay                              // can be deleted if configurable:true
    $assert (obj.fourtyTwo_eitherWay === undefined)

    delete obj.fourtyTwo                                        // cannot be deleted (as default behavior)
    $assert (obj.fourtyTwo === 42)

    _.defineHiddenProperty (obj, 'hiddenAndDangerous', 42)      // shortut for enumerable:false
    $assert (_.keys (obj).indexOf ('hiddenAndDangerous') < 0)

    $assertCalls (1, function (mkay) {                          // memoized property
        _.defineMemoizedProperty (obj, '_42', function () {
                                                    mkay (); return 42 }) 
        $assert (                           
            obj._42,                                
            obj._42,
            obj._42, 42) }) }, function () { _.extend (_, {

    defineProperty: function (targetObject, name, def, defaultCfg) {
        if (Object.hasOwnProperty (targetObject, name)) {
            throw new Error ('_.defineProperty: targetObject already has property ' + name) }
        else {
            Object.defineProperty (targetObject, name,
                _.extend ({ enumerable: true }, defaultCfg, _.coerceToPropertyDefinition (def, name))) } },

    defineHiddenProperty: function (targetObject, name, def, defaultCfg) {
        return _.defineProperty (targetObject, name, def, _.extend ({ enumerable: false }, defaultCfg)) },

    defineMemoizedProperty: function (targetObject, name, def_, defaultCfg) {
        var def = _.coerceToPropertyDefinition (def_, name)
        return _.defineProperty (targetObject, name,
                    _.extend ({}, def, {
                        get: _.memoizeToThis ('_' + name, def.get) }), defaultCfg) },

    defineProperties: function (targetObject, properties) {
        _.each (properties, _.defineProperty.partial (targetObject).flip2) },

    memoizeToThis: function (name, fn) {
        return function () {
            var memo = this[name]
            return (memo !== undefined) ? memo : (this[name] = fn.call (this)) } },

    coerceToPropertyDefinition: function (value_, /* optional */ name) {
        var value = value_ || {}
        var actualValue = (typeof Tags === 'undefined') ? value_ : Tags.unwrap (value_)

                // property definition case (short circuit then)
        return  (!value.$constant && !value.$get && _.isPropertyDefinition (actualValue) && actualValue) ||

                // get-accessor-alone case
                ((value.$get || (!value.$constant && _.isFunction (actualValue) && _.noArgs (actualValue))) &&
                    {   get: actualValue,
                        set: _.throwsError ('cannot change ' + (name || 'property') + ' (as it\'s an accessor function)') }) ||

                // constant value case
                (!value.$get && {   get: _.constant (actualValue),
                                    set: _.throwsError ('cannot change ' + (name || 'property') + ' (as it\'s sealed to ' + actualValue + ')') }) ||

                // any other case (erroneous)
                _.throwsError ('coerceToPropertyDefinition: crazy input, unable to match') () },

    isPropertyDefinition: function (obj) {
        return _.isObject (obj) && (_.isFunction (obj.get) || _.isFunction (obj.set)) },

    ownProperties: function (obj) {
        return (obj && _.pickKeys (obj, obj.hasOwnProperty.bind (obj))) || {} }  }) })



/*  Keywords
    ======================================================================== */

_.withTest ('keywords', function () {

    if ($global['$fourtyTwo'] === undefined) { // coz this test called twice during startup

        _.defineKeyword ('fourtyTwo',       42)
        _.defineKeyword ('fourtyTwo_too',   function ()  { return 42 })
        _.defineKeyword ('fourtyTwo_orDie', function (x) { $assert (x == 42); return 42 })

        _.defineTagKeyword ('foo')
        _.defineTagKeyword ('bar')
        _.defineTagKeyword ('qux')

        $assert (_.isTagKeyword ('qux'))

        _.defineModifierKeyword ('plusOne', function (x) { return x + 1 }) }

    $assert (42,
        $fourtyTwo,
        $fourtyTwo_too,
        $fourtyTwo_orDie (42))

    /*  Tags produce objects containing them as boolean flags. You can tag anything.
        Order doesn't matter, redundancy is legal.
     */
    $assert ($foo (42).$foo,    true)
    $assert ($bar (null).$bar,  true)
    $assert ($foo (42).$bar,    undefined)
    $assert ($foo ($bar (42)),  $bar ($foo ($foo (42))))

    /*  Example of complex object containing tagged fields.
     */
    var test = {
        fourtyOne: $bar ($foo (41)),
        fourtyTwo: $foo ($bar (42)),
        notTagged: 40 }

    /*  This is how you coerce what-might-be-tagged to actual values:
     */
    $assert (Tags.unwrap (42), Tags.unwrap (test.fourtyTwo), 42)
    $assert (Tags.unwrapAll (test), { fourtyTwo: 42, fourtyOne: 41, notTagged: 40 })

    /*  Tags have .matches property, which is a predicate to test objects for those tags.
     */
    $assert ($foo.matches ($foo ()))
    $assert ($foo.matches (test.fourtyOne))
    $assert ($foo.matches (42) === false)

    /*  These predicates could be combined to produce complex test (a generic feature of Function provided by common.js)
     */
    $assert ({ fourtyOne: 41, fourtyTwo: 42 },  Tags.unwrapAll (_.pick (test, _.and ($foo.matches, $bar.matches))))
    $assert ({ notTagged: 40 },                 Tags.unwrapAll (_.omit (test, $foo.matches)))

    /*  You can replace value that might be tagged, i.e. $foo($bar(x)) → $foo($bar(y))
     */
    $assert (43,                Tags.modifySubject (42,         function (subject) { return subject + 1 })) // not tagged
    $assert ($foo (43),         Tags.modifySubject ($foo (42),  _.constant (43)))
    $assert ($foo ($bar (43)),  Tags.modifySubject ($foo (42),  function (subject) { return $bar (subject + 1) }))

    /*  Previous mechanism is essential to so-called 'modifier keywords'
     */
    $assert ($plusOne (            41),                 42)
    $assert ($plusOne ($foo ($bar (41))),   $foo ($bar (42)))

    /*  Low-level way of tags addition, for run-time shit.
     */
    $assert (Tags.add ('qux', 42).$qux)
    $assert (Tags.add ('qux', test.fourtyTwo).$qux)

    /*  Wrapping nothing is now legal
     */
    $assert (Tags.hasSubject ($foo ()),   false)
    $assert (Tags.hasSubject ($foo (42)), true)

    /*  Map over tagged values:
     */
    $assert (     $qux ([8, 9, $foo ($bar (10))]),
        Tags.map ($qux ([1, 2, $foo ($bar (3))]), _.sums (7)))

}, function () {

    Tags = _.extend2 (

        function (subject) { if (subject !== undefined) {
                                this.subject = subject } }, {

    $definition: {}, // to make it recognizeable by _.isPrototypeInstance

    prototype: {

        /* instance methods (internal impl)
         */
        add: function (name) {
                return this[_.keyword (name)] = true, this },

        clone: function () {
            return _.extend (new Tags (this.subject), _.pick (this, _.keyIsKeyword)) },

        modifySubject: function (changesFn) {
                            this.subject = changesFn (this.subject)
                            if (_.isTypeOf (Tags, this.subject)) {
                                return _.extend (this.subject, _.pick (this, _.keyIsKeyword)) }
                            else {
                                return this }} },

        /* static methods (actual API)
         */
        get: function (def) {
            return _.isTypeOf (Tags, def) ? _.pick (def, _.keyIsKeyword) : {} },

        hasSubject: function (def) {
                        return (_.isTypeOf (Tags, def) && ('subject' in def)) },

        matches: function (name) {
                    return _.matches (_.object ([[_.keyword (name), true]])) },

        unwrapAll: function (definition) {
                        return _.map2 (definition, Tags.unwrap) },

        unwrap: function (what) {
                    return _.isTypeOf (Tags, what) ? what.subject : what },

        wrap: function (what) {
            return _.isTypeOf (Tags, what) ? what : ((arguments.length === 0) ? new Tags () : new Tags (what)) },

        modifySubject: function (what, changesFn) {
                            return _.isTypeOf (Tags, what) ?
                                        what.clone ().modifySubject (changesFn) : changesFn (what) }, // short circuits if not wrapped

        map: function (obj, op) { return Tags.modifySubject (obj,
                                                function (obj) {
                                                    return _.map2 (obj, function (t, k) {
                                                        return Tags.modifySubject (t, function (v) {
                                                            return op (v, k, _.isTypeOf (Tags, t) ? t : undefined) }) }) }) },

        add: function (name, args) {
                return Tags.wrap.apply (null, _.rest (arguments, 1)).add (name) } })

    _.keyword = function (name) {
                    return '$' + name }

    _.isKeyword = function (key) {
                    return key[0] == '$' }

    _.keywordName = function (x) {
        return _.isKeyword (x) ? x.slice (1) : x }

    _.keywords = function (obj) { return _.pick (obj, _.keyIsKeyword) }

    _.tagKeywords = {}

    _.isTagKeyword = function (k) {
                        return _.keywordName (k) in _.tagKeywords }

    _.keyIsKeyword = function (value, key) {
                        return _.isKeyword (key[0]) }

    _.defineKeyword = function (name, value) {
                        _.defineProperty (_.global (), _.keyword (name), value) }

    _.defineKeyword ('global', _.global)

    _.defineTagKeyword = function (k) {
                            if (!(_.keyword (k) in $global)) { // tag keyword definitions may overlap
                                _.defineKeyword (k, Tags.add ('constant',
                                    _.extend (_.partial (Tags.add, k), { matches: Tags.matches (k) })))
                                _.tagKeywords[k] = true }

                                var kk = _.keyword (k)

                            return _.extend ($global[kk], {
                                        is: function (x) { return  (_.isTypeOf (Tags, x) && kk) || undefined },
                                     isNot: function (x) { return !(_.isTypeOf (Tags, x) && kk) || undefined },
                                    unwrap: function (x) { return  ($atom.matches (x) === true) ? Tags.unwrap (x) : x } }) }


    _(['constant', 'get'])
        .each (_.defineTagKeyword)

    _.defineModifierKeyword = function (name, fn) {
                                _.defineKeyword (name, function (val) {
                                                            return Tags.modifySubject (val, fn) }) }

    _.deleteKeyword = function (name) {
                        delete $global[_.keyword (name)] } } )


/*  Type matching for arbitrary complex structures (TODO: test)
    ======================================================================== */

_.defineTagKeyword ('required')

_.defineTagKeyword ('atom')

_.defineKeyword ('any', _.identity)

_.deferTest (['type', 'type matching'], function () {

    // TODO: test

    $assert (_.omitTypeMismatches ( { '*': $any, foo: $required ('number'), bar: $required ('number') },
                                    { baz: 'x', foo: 42,            bar: 'foo' }),
                                    { })

    $assert (_.omitTypeMismatches ( { foo: { '*': $any } },
                                    { foo: { bar: 42, baz: 'qux' } }),
                                    { foo: { bar: 42, baz: 'qux' } })

    $assert (_.omitTypeMismatches ( { foo: { bar: $required(42), '*': $any } },
                                    { foo: { bar: 'foo', baz: 'qux' } }),
                                    { })

    $assert (_.omitTypeMismatches ( [{ foo: $required ('number'), bar: 'number' }],
                                    [{ foo: 42,                   bar: 42 },
                                     { foo: 24,                           },
                                     {                            bar: 42 }]), [{ foo: 42, bar: 42 }, { foo: 24 }])

    $assert (_.omitTypeMismatches ({ '*': 'number' }, { foo: 42, bar: 42 }), { foo: 42, bar: 42 })

    $assert (_.decideType ([]), [])
    $assert (_.decideType (42),         'number')
    $assert (_.decideType (_.identity), 'function')
    $assert (_.decideType ([{ foo: 1 }, { foo: 2 }]), [{ foo: 'number' }])
    $assert (_.decideType ([{ foo: 1 }, { bar: 2 }]), [])

    $assert (_.decideType ( { foo: { bar: 1        }, foo: { baz: [] } }),
                            { foo: { bar: 'number' }, foo: { baz: [] } })

    $assert (_.decideType ( { foo: { bar: 1        }, foo: { bar: 2 } }),
                            { foo: { bar: 'number' } })

    $assert (_.decideType ( { foo:         { bar: 1        },
                              bar:         { bar: 2        } }),
                            { '*':         { bar: 'number' } })

}, function () {

    _.isMeta = function (x) { return (x === $any) || ($atom.is (x) === true) || ($required.is (x) === true)  }

    var zip = function (type, value, pred) {
        var required    = Tags.unwrapAll (_.filter2 (type, $required.matches))
        var match       = _.nonempty (_.zip2 (Tags.unwrapAll (type), value, pred))

        if (_.isEmpty (required)) {
                return match }
        
        else {  var requiredMatch = _.nonempty (_.zip2 (required, value, pred))
                var allSatisfied  = _.values2 (required).length === _.values2 (requiredMatch).length
                return allSatisfied ?
                            match : _.coerceToEmpty (value) } }

    var hyperMatch = _.hyperOperator (_.binary,
        function (type_, value, pred) { var type = Tags.unwrap (type_)

            if (_.isArray (type)) { // matches [ItemType] → [item, item, ..., N]
                if (_.isArray (value)) {
                    return zip (_.times (value.length, _.constant (type[0])), value, pred) }
                else {
                    return undefined } }

            else if (_.isStrictlyObject (type) && type['*']) { // matches { *: .. } → { a: .., b: .., c: .. }
                if (_.isStrictlyObject (value)) {
                    return zip (_.extend (  _.map2 (value, _.constant (type['*'])),
                                            _.omit (type, '*')), value, pred) }
                else {
                    return undefined } }

            else {
                return zip (type_, value, pred) } })

    var typeMatchesValue = function (c, v) { var contract = Tags.unwrap (c)

                                return  ((contract === undefined) && (v === undefined)) ||
                                        (_.isFunction (contract) && (
                                            contract.$definition ?
                                                _.isTypeOf (contract, v) :  // constructor type
                                                contract (v))) ||           // test predicate
                                        (typeof v === contract) ||          // plain JS type
                                        (v === contract) }                  // constant match

    _.mismatches = function (op, contract, value) {
                            return hyperMatch (contract, value,
                                        function (contract, v) {
                                            return op (contract, v) ? undefined : contract }) }

    _.omitMismatches = function (op, contract, value) {
                            return hyperMatch (contract, value,
                                        function (contract, v) {
                                            return op (contract, v) ? v : undefined }) }

    _.typeMismatches     = _.partial (_.mismatches,     typeMatchesValue)
    _.omitTypeMismatches = _.partial (_.omitMismatches, typeMatchesValue)

    _.valueMismatches = _.partial (_.mismatches, function (a, b) { return (a === $any) || (b === $any) || (a === b) })

    var unifyType = function (value) {
        if (_.isArray (value)) {
            return _.nonempty ([_.reduce (_.rest (value), function (a, b) { return _.undiff (a, b) }, _.first (value) || undefined)]) }
        
        else if (_.isStrictlyObject (value)) {
            var pairs = _.pairs (value)
            var unite = _.map ( _.reduce (_.rest (pairs), function (a, b) { return _.undiff (a, b) }, _.first (pairs) || [undefined, undefined]),
                                _.nonempty)

            return (_.isEmpty (unite) || _.isEmpty (unite[1])) ? value : _.object ([[unite[0] || '*', unite[1]]]) }
        
        else {
            return value } }

    _.decideType = function (value) {
        var operator = _.hyperOperator (_.unary,
                            function (value, pred) {
                                if (value && value.constructor && value.constructor.$definition) {
                                    return value.constructor }
                                return unifyType (_.map2 (value, pred)) })

        return operator (value, _.typeOf2) } })


/*  Delivers continuation-passing style notation to various common things
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/*  CPS primitives module
    ======================================================================== */

_.cps = function () {
    return _.cps.sequence.apply (null, arguments) }


/*  apply
    ======================================================================== */

_.withTest (['cps', 'apply'], function () {

    // TODO

}, function () {

    _.cps.apply = function (fn, this_, args_, then) { var args = _.asArray (args_)

        var lastArgN = _.numArgs (fn) - 1
        var thenArg = args[lastArgN]

        args[lastArgN] = function () {
            then.call (this, arguments, thenArg) }

        return fn.apply (this_, args) } })


/*  each
    ======================================================================== */

_.withTest (['cps', 'each'], function () {

    /*  Example array
     */
    var data = ['foo', 'bar', 'baz']
    var currentIndex = 0

    _.cps.each (data,

        /*  called for each item, in linear order
         */
        function (item, itemIndex, then, arrayWeTraverse) {
            $assert (item === data[itemIndex])
            $assert (itemIndex === currentIndex++)
            $assert (arrayWeTraverse === data)
            then () },

        /*  called when all items enumerated
         */
        function () {
            $assert (currentIndex === data.length) })

    /*  Iterating over dictionary is legal
     */
    $assertCalls (4, function (mkay) {
        var data2 = { 'foo': 1, 'bar': 2, 'baz': 3 }
        _.cps.each (
            data2,
            function (item, name, then) { $assert (item === data2[name]); mkay (); then () },
            function () { mkay () }) }) },

function () { _.extend (_.cps, {

    each: function (obj, elem, complete, index_, length_, keys_) {
                var self    = arguments.callee
                var index   = index_ || 0
                var keys    = index === 0 ? (obj.length === undefined ? _.keys(obj) : undefined) : keys_
                var length  = index === 0 ? (keys ? keys.length : obj.length) : length_

                if (!obj || (index >= (length || 0))) {
                    if (complete) {
                        complete () }}
                else {
                    var key = keys ? keys[index] : index
                    elem (
                        /* item */  obj[key],
                        /* index */ key,
                        /* next */  function () { self (obj, elem, complete, index + 1, length, keys) },
                        /* array */ obj) } } })} )


/*  map
    ======================================================================== */

_.withTest (['cps', 'map'], function () {

    _.cps.map ([7,6,5],
        function (x, i, then) { then (x + 1) },
        function (result)     { $assert (result, [8,7,6]) }) },

function () { _.extend (_.cps, {

    map: function (obj, iter, complete) { var result = _.isArray (obj) ? [] : {}
            _.cps.each (obj, function (x, i, next) {
                iter (x, i, function (y) {
                    result[i] = y; next () }) }, function () { complete (result) }) } }) })

/*  memoize
    ======================================================================== */

_.withTest (['cps', 'memoize'], function () {

    $assertCalls (1, function (noMoreThanOne) {
        var plusOne = _.cps.memoize (function (x, then) { noMoreThanOne (); then (x + 1) })

        plusOne (2, function (x) { $assert (x === 3) })
        plusOne (2, function (x) { $assert (x === 3) }) }) },

function () { _.extend (_.cps, {

    _poorMemoize: function (fn) { var cache = {}
        return function (value, then) {
            if (value in cache) {                   //  there's a flaw: cache updates after fetch completes, so while fetch is running,
                then (cache[value]) }               //  any subsequent call (until cache is ready) will trigger fetch (as it doesnt know that result is already fetching)
            else {
                fn.call (this, value, function (result) {
                    then (cache[value] = result) }) } } },

    _betterMemoize: function (fn) { var cache = {}  // barrier-enabled impl, eliminates redundant fetches
        return function (value, then) {             // in this version, any subsequent calls join at barrier (which opens when result is fetched)
            if (!(value in cache)) {
                fn.call (this, value, (cache[value] = _.barrier ())) }
            cache[value] (then) } },
    
    memoize: function (fn) {
        return _.barrier ? _.cps._betterMemoize (fn) : _.cps._poorMemoize (fn) } }) })


/*  reduce
    ======================================================================== */

_.withTest (['cps', 'reduce'], function () { $assertCalls (2, function (mkay) {

    var input   = [1,2,3]
    var sums    = function (a, b, then) { then (a + b) }
    var check   = function (result) { $assert (result === 6); mkay () }

    _.cps.reduce (input, sums, check)
    _.cps.reduce ([], sums, check, 6)

})}, function () {

    var reduce = function (array, op, then, memo, index) {  // internal impl
        if (!array || (index >= (array.length || 0))) {
            then (memo) }
        else {
            op (memo, array[index], function (result) { reduce (array, op, then, result, index + 1) }) } }

    _.cps.reduce = function (array, op, then, memo) {       // public API
        if (arguments.length < 4) {
            reduce (array, op, then, array[0], 1) }
        else {
            reduce (array, op, then, memo, 0) } } } )


/*  noop / identity / constant
    ======================================================================== */

_.withTest (['cps', 'noop, identity, constant'], function () { $assertCalls (4, function (mkay) {

    /*  Port of underscore's _.noop to CPS terms
     */
    _.cps.noop (1,2,3, function () { $assert (arguments.length === 0); mkay () })

    /*  Port of underscore's _.identity to CPS terms
     */
    _.cps.identity (1,2,3, function () { $assert ([1,2,3], _.asArray (arguments)); mkay () })

    /*  Port of underscore's _.constant to CPS terms
     */
    _.cps.constant (3)    (function (_3)     { $assert (_3 === 3); mkay () })
    _.cps.constant (1, 2) (function (_1, _2) { $assert (_1 === 1); $assert (_2 === 2); mkay () })

})}, function () { _.extend (_.cps, {

    noop: $restArg (function () {
        return _.last (arguments).call (this) }),

    identity: $restArg (function () {
        var args = _.initial (arguments),
            then = _.last (arguments)
        if (then) {
            return then.apply (this, args) } }),

    constant: $restArg (function () { var args = arguments
                    return function () {
                        return _.last (arguments).apply (this, args) } }) })} )


/*  arity
    ======================================================================== */

_.deferTest (['cps', 'arity / resultArity'], function () {

    var returnMyArgs = _.cps.identity

    var put123 = function (fn) {
        return _.partial (fn, 1,2,3) }

    $assertCPS (put123 (              returnMyArgs),  [1,2,3])
    $assertCPS (put123 (_.cps.arity2 (returnMyArgs)), [1,2])
    $assertCPS (put123 (_.cps.arity1 (returnMyArgs)), [1])
    $assertCPS (put123 (_.cps.arity0 (returnMyArgs)))

    var return123 = function (then) {
        then (1,2,3) }

    $assertCPS (                    return123,  [1,2,3])
    $assertCPS (_.cps.resultArity2 (return123), [1,2])
    $assertCPS (_.cps.resultArity1 (return123), [1])
    $assertCPS (_.cps.resultArity0 (return123))

}, function () {

    _.cps.arity0 = function (fn) {
                        return function () {
                            fn.call (this, _.last (arguments)) } }

    _.cps.arity1 = function (fn) {
                        return function () {
                            fn.call (this, arguments[0], _.last (arguments)) } }

    _.cps.arity2 = function (fn) {
                        return function () {
                            fn.call (this, arguments[0], arguments[1], _.last (arguments)) } }

    _.cps.transformResult = function (operator, fn) {
                                return function (args) {
                                    fn.apply (this, _.initial (arguments).concat (operator (_.last (arguments)))) } }

    _.cps.resultArity2 = _.partial (_.cps.transformResult, _.arity2)
    _.cps.resultArity1 = _.partial (_.cps.transformResult, _.arity1)
    _.cps.resultArity0 = _.partial (_.cps.transformResult, _.arity0) })


/*  sequence / compose
    ======================================================================== */

_.withTest (['cps', 'sequence / compose'], function () { $assertCalls (4, function (mkay) {

    /*  Basic example of asynchronous functions sequencing
     */
    var makeCookies = function (whatCookies, then)  { then ('cookies ' + whatCookies) }
    var eatCookies  = function (cookies, then)      { then ('nice ' + cookies) }
    var check       = function (result)             { $assert (result, 'nice cookies from shit'); mkay () }

    _.cps.sequence (makeCookies, eatCookies, check)   ('from shit')     // supports both ways (either argument list...
    _.cps.sequence ([makeCookies, eatCookies, check]) ('from shit')     // ..or array

    _.cps (makeCookies, eatCookies, check) ('from shit') // shorthand macro

    /*  A port of underscore's _.compose (simply flipped _.sequence)
     */
    _.cps.compose (check, eatCookies, makeCookies) ('from shit')

})}, function () {

    _.cps.sequence = $restArg (
                        function (arr) { var functions = (_.isArray (arr) && arr) || _.asArray (arguments)
                            return _.reduceRight (functions, function (a, b) {
                                return function () {
                                    return b.apply (this, _.asArray (arguments).concat (a)) }}, _.cps.identity) })

    _.cps.compose = $restArg (
                        function (arr) { var functions = (_.isArray (arr) && arr) || _.asArray (arguments)
                            return _.cps.sequence (functions.slice ().reverse ()) }) })





/*  OOP paradigm
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------

Hot-wires some common C++/Java/C# ways to OOP with JavaScript's ones.

------------------------------------------------------------------------
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

_.hasOOP = true

_.deferTest ('OOP', {

    '$prototype / $extends': function () {

    /*  Prototypes are defined via $prototype
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        var Foo = $prototype ({

        /*  If constructor is not defined (like here), it's default impl. will equal
            to the following:                                                               */

//          constructor: function (cfg) { _.extend (this, cfg) },

        /*  $static keyword is used to designate type-level members (context-free ones),
            effectively porting that shit from C++/C#/Java world.                           */

            method:                  function () { return 'foo.method' },
            staticMethod:   $static (function () { return 'Foo.staticMethod' }),

        /*  $property keyword is used to tag a value as an property definition.
            Property definitions expand itself within properties.js module, which
            is separate from OOP.js                                                         */

            property:                $property (function () { return 'foo.property' }),
            staticProperty: $static ($property (function () { return 'Foo.staticProperty' })),

        /*  Tags on members can be grouped like this, to reduce clutter if you have lots
            of members tagged with same keyword. Currently no more than one level is
            supported.                                                                      */

            $static: {
                one: function () { return 1 },
                two: function () { return 2 },
                three: $property (3) },

        /*  Demonstrates some semantics of property definitions, provided by properties.js
            See that module for further investigation.                                      */

            $property: {
                static42:       $static (42),
                just42:         42,
                just42_too:     function () { return 42 },
                fullBlown:  {
                    enumerable:     false,  // will be visible as object's own property (defaults to true)
                    configurable:   true,   // can be deleted by delete operator (defaults to false)
                    get:            function () { return 42 },
                    set:            function (x) { $stub } } } })


    /*  Inherited prototypes are defined via $extends
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        var Bar = $extends (Foo, $final ({

        /*  If constructor is not defined (like here), it's default impl.
            will be equal to the following one (calls base constructor):     */

//          constructor: function () { Foo.prototype.constructor.apply (this, arguments)) } 

            staticMethod: $static (function () {
                return 'Bar.staticMethod' }),

            method: function () {
                return 'bar.method' } }))


    /*  Instances of $prototype/$extends are created by the 'new' operator, as
        this pair of utility is just a thin wrapper over native JS prototypes.

        The 'new' operator calls 'constructor' member from a prototype
        definition. If no constructor is specified, default one takes first
        argument and extends constructed instance with it, overriding any member
        value that is specified at prototype definition (and this is a
        really common way to define prototype constructors in JavaScript)

        Such semantics could be treated as somewhat similar to the 'anonymous
        classed' feature in Java, which is a useful mechanism for ad-hoc
        specialization of constructed prototypes.   
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        var foo = new Foo ()
        var fuu = new Foo ({ method: function () { return 'fuu.method' }})
        var bar = new Bar ({ hi: 'there' })

        $assert (bar.hi         === 'there')
        $assert (fuu.method ()  === 'fuu.method')

        $assert ([foo.just42,   bar.just42],   [42, 42])        //  inheritance should work
        $assert ([Foo.static42, Bar.static42], [42, undefined]) //  (static members do not inherit)

    /*  Overriding should work
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        $assert ([foo.method (),        bar.method ()],         ['foo.method',       'bar.method'])
        $assert ([Foo.staticMethod (),  Bar.staticMethod ()],   ['Foo.staticMethod', 'Bar.staticMethod'])

    /*  Regular members shouln't be visible at type level
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        $assert ([foo.property,         foo.staticProperty], ['foo.property',       undefined])
        $assert ([Foo.staticProperty,   Foo.property],       ['Foo.staticProperty', undefined])

    /*  Until explicitly stated otherwise, properties are constant.
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        $assertThrows (function () { foo.just42 = 43 },
            _.matches ({ message: 'cannot change just42 (as it\'s sealed to 42)' })) },


/*  Use $final to tag a thing as non-overrideable (comes from Java)
    ======================================================================== */

    '$final': function () {

    /*  Tagging arbitrary member as $final
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        $assertThrows (function () {

            var A = $prototype ({
                        constructor: $final (function () {}) })

            var B = $extends (A, {
                        constructor: function () {} }) },   // will throw Error

            _.matches ({ message: 'Cannot override $final constructor' }))

    /*  Tagging whole prototype as $final
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        $assertThrows (function () {

            var A = $prototype ($final ({}))
            var B = $extends (A) }, // will throw Error

             _.matches ({ message: 'Cannot derive from $final-marked prototype' })) },


/*  Use $alias to make member aliases with correct semantics
    ======================================================================== */

    '$alias': function () {

        var foo = new $prototype ({
            failure: $alias ('error'),
            crash:   $alias ('error'),
            error:   function () { return 'foo.error' } })

        $assert (foo.crash, foo.failure, foo.error) }, // all point to same function


/*  Run-time type information APIs
    ======================================================================== */

    'RTTI': function () {

        var Foo = $prototype ({ $static: { noop: _.noop } }),
            Bar = $extends (Foo) // empty definition argument read as {}

        var foo = new Foo (),
            bar = new Bar ()

    /*  Basically, the simplest way to check a type, relying on some native JavaScript prototype semantics.
        But it does not account inheritance.
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        $assert (foo.constructor === Foo)
        $assert (bar.constructor === Bar)

    /*  A functional crossbrowser version of 'instanceof' (accounts inheritance):
     
            1.  Boils down to native 'instanceof' where available
            2.  In elder browsers, emulates with correct semantics
     
        Why use (instead of native syntax):
        
            -   cross-browser
            -   functional (can be partial'ed to yield a predicate)
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        $assert (_.isTypeOf (Function,  foo.constructor.noop))           
        $assert (_.isTypeOf (Tags,      foo.constructor.$definition.noop)) // note how $static group is collapsed to normal form

    /*  Infix version (a static member of every $prototype)
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        $assert ( Foo.isTypeOf (foo))
        $assert (!Bar.isTypeOf (foo))
        $assert (Bar.isTypeOf (bar))
        $assert (Foo.isTypeOf (bar))

    /*  Another infix version (a member of every $prototype)
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        $assert ( foo.isInstanceOf (Foo))
        $assert (!foo.isInstanceOf (Bar))
        $assert (bar.isInstanceOf (Bar))
        $assert (bar.isInstanceOf (Foo))

    /*  A private impl of isTypeOf (one shouldn't invoke these directly)
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        $assert (_.isTypeOf_ES5 (Bar, bar))     // isTypeOf impl. for ECMAScript level 5
        $assert (_.isTypeOf_ES5 (Foo, bar))     // (validate inheritance)

        $assert (_.isTypeOf_ES4 (Bar, bar))     // isTypeOf impl. for ECMAScript level 4 (IE8 and below)
        $assert (_.isTypeOf_ES4 (Foo, bar)) },  // (validate inheritance)


/*  This is how to decide whether a function is $prototype constructor
    ======================================================================== */

    'isConstructor': function () {

        var Proto = $prototype (),  // empty argument read as {}
            dummy = function () {}

        $assert ($prototype.isConstructor (Proto), true)
        $assert ($prototype.isConstructor (dummy), false)
        $assert ($prototype.isConstructor (null),  false) // regression

        $assert ([Proto, dummy].map ($prototype.isConstructor), [true, false]) },


/*  $trait  A combinatoric-style alternative to inheritance.
            (also known as "mixin" in some languages)
    ======================================================================== */

    '$trait / $traits': function () {

        var Closeable = $trait ({
            close: function () {} })

        var Movable = $trait ({
            move: function () {} })

        var Enumerable = $trait ({
            each: function (iter) {},
            length: $property (function () { return 0; }) })

        var JustCloseable     = $prototype ({ $trait:  Closeable })
        var MovableEnumerable = $prototype ({ $traits: [Movable, Enumerable], move: function () {} })

        var movableEnumerable = new MovableEnumerable ()

        $assert (movableEnumerable.move === MovableEnumerable.prototype.move)

        $assertThrows (function () { new Closeable () },
            _.matches ({ message: 'Traits are not instantiable (what for?)' }))

        $assertTypeof (movableEnumerable, {
            move: 'function',
            each: 'function',
            length: 'number' })

        $assert ([
            movableEnumerable.isInstanceOf (Movable),
            movableEnumerable.isInstanceOf (Enumerable),
            movableEnumerable.isInstanceOf (Closeable)], [true, true, false])

        $assert (Movable.isTypeOf (movableEnumerable))
        $assert (Movable.isTraitOf (movableEnumerable))

        $assert (MovableEnumerable.hasTrait (Enumerable))

        $assertMatches (MovableEnumerable,  { $traits: [Movable, Enumerable] })
        $assertMatches (JustCloseable,      { $traits: [Closeable],
                                              $trait:  undefined }) },


/*  $prototype.inheritanceChain for traversing inheritance chain
    ======================================================================== */

    'inheritanceChain': function () {

        var A = $prototype ()
        var B = $extends (A)
        var C = $extends (B)

        $assert ($prototype.inheritanceChain (C), [C,B,A]) },


/*  $prototype is really same as $extends, if passed two arguments
    ======================================================================== */

    'two-argument syntax of $prototype': function () {

        var A = $prototype ()
        var B = $prototype (A, {}) // same as $extends (Base, def)

        $assert (B.$base === A.prototype) },


/*  Adds value contracts to arguments for unit testing purposes
    ======================================================================== */

    'value contracts for arguments': function () {

        var Proto = $prototype ($test ({

            frobnicate:  function (_777, _foo_bar_baz, unaffected) {},
            noMistake:   function () {} }))

        var obj = new Proto ()

        $assertFails (function () {
            obj.frobnicate (999, 'not right') })

        obj.frobnicate (777, 'foo bar baz')
        obj.noMistake () },


/*  $const (xxx) as convenient alias for $static ($property (xxx))
    ======================================================================== */

    '$const': function () {

        var A = $prototype ({
            $const: {
                foo: 'foo',
                bar: 'bar' },
            qux: $const ('qux'),
            zap: $const ('zap') })

        $assert ([A.foo, A.bar, A.qux, A.zap], ['foo', 'bar', 'qux', 'zap'])
        $assertThrows (function () { A.foo = 'bar '}) },


/*  Tags on definition render to static properties
    ======================================================================== */

    'tags on definition': function () {

        $assertMatches ($prototype ($static ($final ({}))), { $static: true, $final: true }) } }, function () {


/*  PUBLIC API
    ======================================================================== */

    _(['property', 'static', 'final', 'alias', 'memoized', 'private', 'builtin', 'test'])
        .each (_.defineTagKeyword)

    $prototype = function (arg1, arg2) {
                    return $prototype.impl.compile.apply ($prototype.impl,
                                (arguments.length > 1)
                                    ? _.asArray (arguments).reverse ()
                                    : arguments) }

    $extends = function (base, def) {
                    return $prototype (base, def || {}) }

    _.extend ($prototype, {

        isConstructor: function (what) {
            return _.isPrototypeConstructor (what) },

        macro: function (arg, fn) {
            if (arguments.length === 1) {
                $prototype.impl.alwaysTriggeredMacros.push (arg) }
            else {
                $prototype.impl.memberNameTriggeredMacros[arg] = fn } },

        each: function (visitor) { var namespace = $global
            for (var k in namespace) {
                if (!_.isKeyword (k)) { var value = namespace[k]
                    if ($prototype.isConstructor (value)) {
                        visitor (value, k) } } } },

        inheritanceChain: function (def) { var chain = []
            while (def) {
                chain.push (def)
                def = def.$base && def.$base.constructor }
            return chain },

        mapMethods: function (def, op) {
                        return Tags.map (def, function (fn, k, t) {
                            return _.isFunction (fn) ? op (fn, k, t).wraps (fn) : fn }) },


    /*  INTERNALS
        ==================================================================== */

        impl: {

            alwaysTriggeredMacros: [],
            memberNameTriggeredMacros: {},

            compile: function (def, base) { return Tags.unwrap (_.sequence (
                this.extendWithTags,
                this.flatten,
                this.generateArgumentContractsIfTaggedAsTest,
                this.ensureFinalContracts (base),
                this.generateConstructor (base),
                this.evalAlwaysTriggeredMacros (base),
                this.evalMemberNameTriggeredMacros (base),
                this.contributeTraits,
                this.generateBuiltInMembers (base),
                this.expandAliases,
                this.defineStaticMembers,
                this.defineInstanceMembers).call (this, def || {}).constructor) },

            evalAlwaysTriggeredMacros: function (base) {
                return function (def) { var macros = $prototype.impl.alwaysTriggeredMacros
                    for (var i = 0, n = macros.length; i < n; i++) {
                        def = macros[i] (def, base) }
                    return def } },

            evalMemberNameTriggeredMacros: function (base) {
                return function (def) { var macros = $prototype.impl.memberNameTriggeredMacros
                    _.each (def, function (value, name) {
                        if (macros.hasOwnProperty (name)) {
                            def = macros[name] (def, value, name, base) } })
                    return def } },

            generateArgumentContractsIfTaggedAsTest: function (def) {
                return def.$test ? $prototype.mapMethods (def, function (fn, name) {
                                                                     return function () { var args = _.asArray (arguments)
                                                                        $assertArguments (args.copy, fn.original, name)
                                                                         return fn.apply (this, args) } }) : def },

            contributeTraits: function (def) {
                if (def.$trait) {
                    def.$traits = [def.$trait]
                    delete def.$trait }

                if (def.$traits) { var traits = def.$traits
                    _.each (traits,
                        function (constructor) {
                            _.defaults (def, _.omit (constructor.$definition,
                                _.or ($builtin.matches, _.key (_.equals ('constructor'))))) } ) 

                    def.$traits  = $static ($builtin ($property (traits)))
                    def.hasTrait = $static ($builtin (function (Constructor) {
                        return traits.indexOf (Constructor) >= 0 })) }

                return def },

            extendWithTags: function (def) {
                return _.extendWith (Tags.unwrap (def), _.objectMap (Tags.get (def), $static)) },

            generateConstructor: function (base) { return function (def) {
                return _.extend (def, { constructor:
                    Tags.modifySubject (def.hasOwnProperty ('constructor') ? def.constructor : this.defaultConstructor (base),
                        function (fn) {
                            if (base) { fn.prototype.__proto__ = base.prototype }
                            return fn }) }) } },

            generateBuiltInMembers: function (base) { return function (def) {
                return _.defaults (def, {
                    $base:          $builtin ($static ($property (_.constant (base && base.prototype)))),
                    $definition:    $builtin ($static ($property (_.constant (_.extend ({}, base && base.$definition, def))))),
                    isTypeOf:       $builtin ($static (_.partial (_.isTypeOf, Tags.unwrap (def.constructor)))),
                    isInstanceOf:   $builtin (function (constructor) { return _.isTypeOf (constructor, this) }),
                    $:              $builtin (function (fn)          { return _.$.apply (null, [this].concat (_.asArray (arguments))) }) }) }},

            defaultConstructor: function (base) {
                return (base ?
                    function ()    { base.prototype.constructor.apply (this, arguments) } :
                    function (cfg) { _.extend (this, cfg || {}) }) },

            defineStaticMembers: function (def) {
                this.defineMembers (Tags.unwrap (def.constructor), _.pick (def, $static.matches))
                return def },

            defineInstanceMembers: function (def) {
                this.defineMembers (Tags.unwrap (def.constructor).prototype, _.omit (def, $static.matches))
                return def },

            defineMembers: function (targetObject, def) {
                _.each (def, function (value, key) {
                    if (key !== 'constructor' && def.hasOwnProperty (key)) {
                        this.defineMember (targetObject, value, key) } }, this) },

            defineMember: function (targetObject, def, key) {
                if (def && def.$property) {
                    if (def.$memoized) {
                        _.defineMemoizedProperty (targetObject, key, def) }
                    else {
                        _.defineProperty (targetObject, key, def) } }
                else {
                    var what = Tags.unwrap (def)
                    targetObject[key] = what } },

            ensureFinalContracts: function (base) { return function (def) {
                if (base) {
                    if (base.$final) {
                        throw new Error ('Cannot derive from $final-marked prototype') }

                    if (base.$definition) {
                        var invalidMembers = _.intersection (
                            _.keys (_.pick (base.$definition, $final.matches)),
                            _.keys (def))
                        if (invalidMembers.length) {
                            throw new Error ('Cannot override $final ' + invalidMembers.join (', ')) } } }

                return def } },

            expandAliases: function (def) {
                return _.objectMap (def, function (v) { return ($alias.matches (v) ? def[Tags.unwrap (v)] : v) }) },

            flatten: function (def) {
                var tagKeywordGroups    = _.pick (def, this.isTagKeywordGroup)
                var mergedKeywordGroups = _.object (_.flatten (_.map (tagKeywordGroups, function (membersDef, keyword) {
                    return _.map (membersDef, function (member, memberName) {
                        return [memberName, $global[keyword] (member)] }) }), true))

                var memberDefinitions   = _.omit (def, this.isTagKeywordGroup)

                return _.extend (memberDefinitions, mergedKeywordGroups) },

            isTagKeywordGroup: function (value_, key) { var value = Tags.unwrap (value_)
                return _.isKeyword (key) && _.isFunction ($global[key]) && (typeof value === 'object') && !_.isArray (value) } } }) })


/*  $traits impl.
    ======================================================================== */

    _.isTraitOf = function (Trait, instance) {
        var constructor = instance && instance.constructor
        return (constructor &&
            constructor.hasTrait &&
            constructor.hasTrait (Trait)) || false }    //  indexOf is fast if has 1-2 traits,
                                                        //  no need to pre-index
    _.isTypeOf = _.or (_.isTypeOf, _.isTraitOf)

    $trait = function (arg1, arg2) {
        var constructor = undefined
        var def = _.extend (arguments.length > 1 ? arg2 : arg1, {
                        constructor: _.throwsError ('Traits are not instantiable (what for?)'),
                        isTraitOf: $static ($builtin (function (instance) {
                            return _.isTraitOf (constructor, instance) })) })

        return (constructor = $prototype.impl.compile (def, arguments.length > 1 ? arg1 : arg2)) }


/*  Context-free implementation of this.$
    ======================================================================== */

    _.$ = function (this_, fn) {
                return _.bind.apply (undefined, [fn, this_].concat (_.rest (arguments, 2))) }


/*  Adds this.$ to jQuery objects (to enforce code style consistency)
    ======================================================================== */

    if (typeof jQuery !== 'undefined') {
        jQuery.fn.extend ({ $: function (f) { return _.$ (this, f) } })}


/*  $const is alias for static property
    ======================================================================== */

    _.defineKeyword ('const', function (x) { return $static ($property (x)) })


/*  $singleton (a humanized macro to new ($prototype (definition)))
    ======================================================================== */

     _.withTest ('$singleton', function () { $assertCalls (2, function (mkay) {

            var Base    = $prototype ({
                            method:    _.constant (42) })

        /*  returns constructed instance of a definition passed as argument
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

            var Simple  = $singleton ({
                            constructor: function () { mkay () },
                            method:      function () { return 42 } })

        /*  can inherit from a prototype
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

            var Derived = $singleton (Base, {
                            constructor: function () { mkay (); Base.prototype.constructor.apply (this, arguments) } })

            $assert (Simple.method (), Derived.method (), 42) }) }, function () {

        /*  IMPLEMENTATION
            ==================================================================== */

            $singleton = function (arg1, arg2) {
                    return new ($prototype.apply (null, arguments)) () } })




        


/*  Ports platform.js to OOP terms 
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    Platform = $singleton ({ $property: {
        
        engine: _.platform ().engine,
        system: _.platform ().system,
        device: _.platform ().device,
        touch:  _.platform ().touch || false,

        NodeJS: _.platform ().engine === 'node',
        iPad:   _.platform ().device === 'iPad',
        iPhone: _.platform ().device === 'iPhone',
        iOS:    _.platform ().system === 'iOS' } })

/*  Provides infix notation for stdlib utility
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/*  Extensions methods
    ======================================================================== */

_(['method', 'property', 'flipped']) // keywords recognized by $extensionMethods
    .each (_.defineTagKeyword)

$extensionMethods = function (Type, methods) {
    _.each (methods, function (tags, name) {
        var fn = Tags.unwrap (tags)

        /*  define as _.method (this, ...)
         */
        if (!(name in _)) {
            _[name] = _[name] || fn }

        /*  define as property of Type
         */
        if (!tags.$method && (tags.$property || (_.oneArg (fn))) && !(name in Type.prototype)) {
            _.defineHiddenProperty (Type.prototype, name, function () {
                return fn (this) })}

        /*  define as method
         */
        else if (!tags.$property) {
            Type.prototype[name] = _.asMethod (tags.$flipped ? _.flip (fn) : fn) }

        else {
            throw new Error ('$extensionMethods: crazy input, unable to match') } })}
/*  Function extensions
    ======================================================================== */

_.tests.Function = {

    /*  Converts regular function (which returns result) to CPS function (which passes result to 'then')
     */
    'asContinuation': function () { $assertCalls (2, function (mkay) {

        var twoPlusTwo = function () { return 2 + 2 }
        var shouldBeFour = function (result) {
            $assert (result == 4)
            mkay () }

        twoPlusTwo.asContinuation (shouldBeFour)
        _.asContinuation (twoPlusTwo) (shouldBeFour) }) },

    /*  Returns function that executed after _.delay
     */
    'delayed': function (testDone) {
        var eat42           = function (_42, then) { $assert (_42, 42); then () }
        var eat42_after5ms  = eat42.delayed (5)

        $assertCalls (1, function (mkay, done) {
            eat42_after5ms (42, function () { mkay (); done (); testDone () }) }) } }

/*  Impl.
 */
$extensionMethods (Function, {

    bind:           _.bind,
    partial:        _.partial,
    tails:          _.tails,
    tails2:         _.tails2,
    tails3:         _.tails3,
    compose:        _.compose,
    then:           _.then,
    flip:           _.flip,
    flip2:          _.flip2,
    flip3:          _.flip3,
    asFreeFunction: _.asFreeFunction,
    asMethod:       _.asMethod,

    asContinuation: function (f) {
        return $restArg (function () { _.last (arguments) (f.apply (this, _.initial (arguments))) }) },

    wraps: function (f, w) { 
        f._wrapped = _.withSameArgs (f, w); return f },

    wrapped: function (f) {
        return f._wrapped || f },

    original: function (f) {
        while (f && f._wrapped) { f = f._wrapped } return f },

    arity0:         _.arity0,
    arity1:         _.arity1,
    arity2:         _.arity2,
    arity3:         _.arity3,

    or:     _.or,
    and:    _.and,
    not:    _.not,

    applies: _.applies,

    memoized: _.memoize,
    throttled: _.throttle,
    
    debounced: function (func, wait, immediate) {
        
        var timestamp, timeout, result, args, context
        var later = function () {
            var last = Date.now () - timestamp
            if (last < wait && last > 0) {
                timeout = setTimeout (later, wait - last) }
            else {
                timeout = null;
                if (!immediate) {
                    result = func.apply (context, args)
                    if (!timeout) {
                        context = args = null } } } }

        var debouncedFn = function() {
            context = this
            args = arguments
            timestamp = Date.now()
            var callNow = immediate && !timeout
            if (!timeout) {
                timeout = setTimeout(later, wait) }
            if (callNow) {
                result = func.apply(context, args)
                context = args = null }
            return result }

        debouncedFn.callImmediately = function () { // cancels timeout (set by fn.debounced/fn.throttled) and calls immediately
            if (timeout) {
                clearTimeout (timeout)
                timeout = null }
            func.apply (context, args) }

        return debouncedFn },

    delay: _.delay,
    delayed: function (fn, time) {
        return function () {
            var args = arguments, context = this
            _.delay (function () { fn.apply (context, args) }, time) } } })

/*  Array extensions
    ======================================================================== */

_.withTest ('Array extensions', function () {

    var excess = [3,1,2,3,3,4,3]

    $assert (excess.copy, excess)
    $assert (excess.copy !== excess)

    $assert (excess.remove (3), [1,2,4]) // it is fast
    $assert (excess,            [1,2,4]) // and mutates original (thats why fast)
                                         // for immutable version, use underscore's _.without

    $assert (excess.removeAll (),   [])
    $assert (excess,                [])

    $assert (['a','b','c'].removeAt (1),    ['a','c'])      // NOTE: mutates original
    $assert (['a','c'].insertAt ('b', 1),   ['a','b','c'])  // NOTE: mutates original

    $assert ([0,1,2].itemAtWrappedIndex (4) === 1)

         var arr =         [1,2,3]
    $assert (arr.reversed, [3,2,1])
    $assert (arr,          [1,2,3]) // does not mutate original (in contrary to .reverse)
                                        
    $assert ([[1], [[2], 3], 4].flat,         [1, [2], 3, 4])
    $assert ([[1,2,3], [4,5,6]].zip (_.sum),  [5,7,9])
    $assert (_.zap ([1,2,3], [4,5,6], _.sum), [5,7,9])

    $assert (['a','b','c'].swap (1,2), ['a','c','b']) // NOTE: mutates original

    $assert ([1].random === 1) // returns random item from array
    $assert ([].random === undefined)

}, function () {

    $extensionMethods (Array, {

        last: function (arr) { return _.last (arr) },
        
        random: function (arr) {
            return arr[_.random (0, arr.length - 1)] },

        copy: function (arr) {
            return arr.slice (0) },

        removeAll: $method (function (arr) {
                        return arr.splice (0, arr.length), arr }),

        remove: function (arr, item) {
            var i; while ((i = arr.indexOf (item)) !== -1) {
                arr.splice (i, 1) } return arr },

        removeAt: function (arr, index) {
            arr.splice (index, 1); return arr },

        insertAt: function (arr, item, index) {
            arr.splice (index, 0, item); return arr },

        itemAtWrappedIndex: function (arr, i) {
            return arr[i % arr.length] },

        reversed: function (arr) {
            return arr.slice ().reverse () },

        flat: function (arr) {
            return _.flatten (arr, true) },

        swap: $method (function (arr, indexA, indexB) {
            var a = arr[indexA], b = arr[indexB]
            arr[indexA] = b
            arr[indexB] = a
            return arr }),

        zip: _.zipWith })

    _.zap = function (firstArg) { /* (arg1..argN fn) syntax */
        var zippo = _.last (arguments)
        return _.reduce (_.rest (_.initial (arguments)), function (memo, row) {
                        return _.times (Math.max (memo.length, row.length), function (i) {
                            return zippo (memo[i], row[i]) }) }, firstArg) } })


/*  String extensions
    ======================================================================== */

_.deferTest ('String extensions', function () {

    /*  Convenient infix versions of string-crunching basics. The
        naming scheme of reversed/capitalized/trimmed is chosen to
        not cause conflicts with built-in methods/properties doing
        the same (which are implementation-dependent, e.g. str.trim
        method).
     */
    $assert ('ж'.repeats (0)    === '')
    $assert ('ж'.repeats (4)    === 'жжжж')
    $assert ('жопа'.first (2)   === 'жо')
    $assert ('жопа'.reversed    === 'апож')
    $assert ('жопа'.capitalized === 'Жопа') // capital Zhopa
    $assert ('  жопа  '.trimmed === 'жопа')
    $assert ('<жопа>'.escaped   === '&lt;жопа&gt;')
    $assert ('па'.prepend   ('жо'),
             'жо'.append    ('па'), 'жопа')

    /*  Higher order version of former utility
     */
    $assert ([  _.map ([1, 2, 3], _.prepends ('foo')), // higher order version
                _.map ([1, 2, 3], _.appends  ('bar'))].zip (_.append), ['foo11bar', 'foo22bar', 'foo33bar'])

    /*  This one is defined via unicode_regexp_hack and is super slow
     */
    $assert ('}|{О/7A с Py4K()Й ololo 321321'.latinAlphanumericValue,   '7APy4Kololo321321')
    $assert ('}|{О/7A с Py4K()Й ololo 321321'.alphanumericValue,        'О7AсPy4KЙololo321321')

    /*  This one is defined though regexps, and is kinda slow. Don't use
        in performance-critical code (like mass object rendering in UI)
     */
    $assert ('+7(965)412-63-21'.numericValue, '79654126321')
    $assert ('+7(965)412-63-21'.integerValue,   79654126321)
    $assert ('foo'.integerValue,                undefined)      // NOTE: returns undefined instead of NaN (for consistency reasons)
    $assert ('0'.integerValue,                  0)              // regression test (was resulting to undefined due to bug)

    /*  Use str.parsedInt instead of raw parseInt(), because latter requires
        base-10 argument, often mistakengly omited, thus resulting something
        like '010' to be parsed as octal number. I once spend hours of debugging
        to catch this kind of mistake, and now not want for someone's got
        trapped into the same shitty situation.
     */
    $assert ('123'.parsedInt,   123)
    $assert ('foo'.parsedInt,   undefined)      // NOTE: returns undefined instead of NaN (for consistency reasons)
    $assert ('0'.parsedInt,     0)              // regression test (was resulting to undefined due to bug)

    /*  This one is taken from Java's object hasher. Not to ever be used in
        some security-critical calculations, as it's not secure. It's fast.
     */
    $assert ('foo'.hash, 101574)

    /*  Use for filename/URL-part generation
     */
    $assert ('Пися Камушкинъ'.transliterate, 'pisyakamushkin')

    /*  This one is really convetient!
     */
    $assert  ('qux'.quote ('"'),    '"qux"')
    $assert  ('qux'.quote ('[]'),   '[qux]')
    $assert  ('qux'.quote ('/'),    '/qux/')
    $assert  ('qux'.quote ('{  }'), '{ qux }')

}, function () { $extensionMethods (String, {

    quote: _.quote,

    cut: function (s, from, len) {
        return s.substring (0, from - 1) + s.substring (from, s.length) },

    insert: function (s, position, what) {
        return s.substring (0, position) + what + s.substring (position, s.length) },

    lowercase: function (s) {
        return s.toLowerCase () },

    uppercase: function (s) {
        return s.toUpperCase () },

    trimmed: function (s) {
        return s.trim () },

    escaped: function (s) {
        return _.escape (s) },

    repeats: function (s, n) {                              // TODO: this should come in two versions: _.repeat (s, n) and _.repeats (n, s)
        return _.times (n, _.constant (s)).join ('') },

    prepend: function (s, other) {
        return other + s },

    append: function (s, other) {
        return s + other },

    first: function (s, n) {
        return _.first (s, n).join ('') },

    reversed: function (s) {
        return s.split ('').reverse ().join ('') },

    capitalized: function (s) {
        return s.charAt (0).toUpperCase () + s.slice (1) },

    decapitalized: function (s) {
        return s.charAt (0).toLowerCase () + s.slice (1) },

    latinAlphanumericValue: function (s) {
        return s.replace (/[^a-z0-9]/gi, '') },

    alphanumericValue: function (s) {
        return s.replace (unicode_hack (/[^0-9\p{L}|^0-9\p{N}|^0-9\p{Pc}|^0-9\p{M}]/g), '') }, // utilizes unicode regexp hack (defined at the end of file)

    numericValue: function (s) {
        return s.replace (/[^0-9]/g, '') },

    integerValue: function (s) {
        return s.numericValue.parsedInt },

    parsedInt: function (s) {
        var result = parseInt (s, 10)
        return _.isFinite (result) ? result : undefined },

    hash: function (s) { // unsecure, but fast, taken from Java's object hasher
        var hash = 0, i, chr, len
        if (s.length === 0) {
            return hash; }

        for (i = 0, len = s.length; i < len; i++) {
            chr   = s.charCodeAt (i)
            hash  = ((hash << 5) - hash) + chr
            hash |= 0 } // Convert to 32bit integer

        return hash },

    transliterate: (function () {
        var table = _.extend ({

            'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g',
            'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
            'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k',
            'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
            'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
            'у': 'u', 'ф': 'ph', 'х': 'h', 'ц': 'ts',
            'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ь': '',
            'ъ': '', 'ы': 'y', 'э': 'e', 'ю': 'yu', 'я': 'ya' },

            _.object (_.map ('_-1234567890qwertyuiopasdfghjklzxcvbnm', function (x) { return [x,x] })))
        
        return function (s) {
            var result = ''
            var source = (s || '').toLowerCase ()

            for (var i = 0, n = source.length; i < n; i++) {
                var c = source[i]
                var x = table[c] || ''
                result += x }

            return result }}) (),

    /*  a sub-routine for _.urlencode (not sure if we need this as stand-alone operation)
     */
    fixedEncodeURIComponent: function (s, constraint) {
        return encodeURIComponent (s).replace (constraint ? constraint : /[!'().,*-]/g, function (c) {
            return '%' + c.charCodeAt (0).toString (16) }) } }) })








/*  Dynamic code binding toolbox
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/*  Interceptable/observable methods
    ======================================================================== */

_.deferTest ('bindable', function () {

    /*  Test subject
     */
    var obj = {
        plusOne: function (x) {
            return x + 1 },

        innocentMethod: function (x) {
            return x } }

    $assertCalls (7, function (mkay) {

        /*  That's how you observe method calls
         */
        _.onBefore (obj, 'plusOne', function (x)            { mkay (); $assert (x === 7) })
        _.onAfter  (obj, 'plusOne', function (x, result)    { mkay (); $assert ([x, result], [7, 8]) })

        $assert (obj.plusOne (7), 8)

        /*  That's how you intercept method calls
         */
        _.intercept (obj, 'innocentMethod', function (x, method) {
            mkay ()
            return method (x + 1) * 2 })

        $assert (obj.innocentMethod (42), (42 + 1) * 2) 

        /*  Consequent interceptors wrap-up previous ones
         */
        _.intercept (obj, 'innocentMethod', function (x, method) {
            mkay ()
            $assert (method (x), (42 + 1) * 2) 
            return 'hard boiled shit' })

        $assert (obj.innocentMethod (42), 'hard boiled shit')

        /*  Test infix calls
         */
        var method = _.bindable (function (x) { mkay (); $assert (x === 42) })
            method.onBefore (function (x) { mkay (); $assert (x === 42) })
            method (42) })

    /*  Test 'once' semantics
     */
    var obj2 = { plusOne: function (x) { return x + 1 } }

    $assertCalls (1, function (beforeCalled) {
    $assertCalls (1, function (afterCalled) {

        _.onceBefore (obj, 'plusOne', function (x)         { beforeCalled (); $assert (x === 7) })
        _.onceAfter  (obj, 'plusOne', function (x, result) { afterCalled ();  $assert ([x, result], [7, 8]) })

        $assert (obj.plusOne (7), 8)
        $assert (obj.plusOne (7), 8) }) })

}, function () {

    /*  Internal impl
     */
    var hooks = ['onceBefore', 'onceAfter', 'onBefore', 'onAfter', 'intercept']

    var makeBindable = function (obj, targetMethod) { var method = obj[targetMethod]
                            return _.isBindable (method) ? method : (obj[targetMethod] = _.bindable (method)) }

    var hookProc = function (name) { return function (obj, targetMethod, delegate) {
                                        return makeBindable (obj, targetMethod)['_' + name].push (delegate) } }

    var mixin = function (method) {
                    return _.extend ({}, method, { _bindable: true, impl: method, _wrapped: method },

                                /*  .onBefore, .onAfter, .intercept (API methods)
                                 */
                                _.object (_.map (hooks, function (name) {
                                                            return [name, function (fn) {
                                                                            if (!_.isBindable (this)) {
                                                                                throw new Error ('wrong this') }
                                                                            return this['_' + name].push (fn), this }] })),

                                /*  ._onBefore, ._onAfter, ._intercept (queues)
                                 */
                                _.object (_.map (hooks, function (name) {
                                                            return ['_' + name, []] }))) }

    /*  Public API
     */
    _.extend (_, _.objectMap (_.invert (hooks), hookProc.flip2), {

        off: function (obj, targetMethod, delegate) {
                var method = obj[targetMethod]
                if (_.isBindable (method)) {
                    _.each (hooks, function (hook) {
                        method['_' + hook] = _.without (method['_' + hook], delegate) }) } },

        isBindable: function (fn) {
            return (fn && fn._bindable) ? true : false },

        bindable: function (method, context) {
            return _.withSameArgs (method, _.extendWith (mixin (method), function () {      

                var wrapper     = arguments.callee
                var onceBefore  = wrapper._onceBefore
                var onceAfter   = wrapper._onceAfter
                var before      = wrapper._onBefore
                var after       = wrapper._onAfter
                var intercept   = wrapper._intercept
                var this_       = context || this
                var i, ni       = undefined

                /*  Call onceBefore
                 */
                if (onceBefore.length) {
                    for (i = 0, ni = onceBefore.length; i < ni; i++) {
                        onceBefore[i].apply (this_, arguments) }
                    onceBefore.removeAll () }

                /*  Call before
                 */
                for (i = 0, ni = before.length; i < ni; i++) {
                    before[i].apply (this_, arguments) }

                /*  Call intercept
                 */
                var result = (intercept.length ? _.cps.compose ([method].concat (intercept)) : method).apply (this_, arguments)

                if (after.length || onceAfter.length) { var args = _.asArray (arguments).concat (result)

                    /*  Call after
                     */
                    for (i = 0, ni = after.length; i < ni; i++) {
                        after[i].apply (this_, args) }

                    /*  Call onceAfter
                     */
                    if (onceAfter.length) {
                        for (i = 0, ni = onceAfter.length; i < ni; i++) {
                            onceAfter[i].apply (this_, args) }
                        onceAfter.removeAll () } }

                return result } )) } }) })

/*  A generic functional primitives for dynamic code binding
    ======================================================================== */

_.tests.stream = {

    'triggerOnce': function () { $assertCalls (1, function (mkay) {
                                    var t = _.triggerOnce ()
                                    t (function (_321) {
                                        $assert (_321 === 321); mkay () })
                                    t (321)
                                    t (123) }) },

    'observable': function () {

        /*  Should accept value as constructor, it should be accessible by .value property
         */
        var initedWithValue = _.observable (555)
        $assert (initedWithValue.value, 555)

        /*  Should not call if something changed before callback is bound
         */
        $assertCalls (0, function (mkay) { var valueChanged = _.observable ()
            valueChanged (999)
            valueChanged (mkay) })

        /*  Should call previously bound callback if changed
         */
        $assertCalls (3, function (mkay) { var valueChanged = _.observable ()
            valueChanged (mkay)
            valueChanged (123)
            valueChanged (345)
            valueChanged (567) })

        /*  Should pass last distinct value as argument to callbacks, not calling if its not changed
         */
        $assertCalls (1, function (mkay) { var valueChanged = _.observable ()
            valueChanged (function (_111) {
                            $assert (111, _111)
                            mkay () })
            valueChanged (111)
            valueChanged (111) })

        /*  Should pass previous value as second argument
         */
        $assertCalls (1, function (mkay) { var valueChanged = _.observable ()
            valueChanged (444)
            valueChanged (function (_666, _444) {
                            $assert (_666, 666)
                            $assert (_444, 444)
                            mkay () })
            valueChanged (666) }) },

    'observable.when': function () {

        $assertCalls (1, function (mkay) {
            var value = _.observable (234)
                value.when (_.equals (234), function () { mkay () }) })

        $assertCalls (1, function (mkay) {
            var value = _.observable ()
                value.when (_.equals (432), function () { mkay () })
                value (432) })

        $assertCalls (0, function (mkay) {
            var value = _.observable ()
                value.when (_.equals (432), function () { mkay () })
                value (7) })

        $assertCalls (1, function (mkay) {
            var value = _.observable ()
                value.when (_.equals ('bar'), function () { mkay () })
                value ('bar')
                value ('foo')
                value ('bar') }) },

    '_.gatherChanges': function () {

        var valueA   = _.observable (),
            valueB   = _.observable (),
            changes  = []

        _.gatherChanges (valueA, valueB, function (a, b) {
            changes.push ([a, b]) })

        valueA (123)
        valueB (777)

        $assert (changes, [[123, undefined], [123, 777]])
    },

    'context': function () {
        var trigger = _.extend (_.trigger (), { context: 42 })

        trigger (function () { $assert (this, 42) })
        trigger () },

    '_.off (bound)': function () {  var react = function () { $fail }
                                    var act = _.trigger (react)
        _.off (react)
        act () },

    '_.off (stream)': function () { var fail = function () { $fail }
                                    var act = _.trigger (fail)
        _.off (act)
        act () },

    /*  Need to rewrite it for clariy
     */
    'all shit': function (testDone) {

        var obj = {
            somethingReady: _.barrier (),
            whenSomething:  _.trigger () }


        /*  Test conventional semantics (1:1 multicast)
         */
        $assertCalls (2, function (mkay1) {
        $assertCalls (2, function (mkay2) {

            obj.whenSomething (mkay1)                   // that's how you bind
            obj.whenSomething (mkay2)

            obj.whenSomething ()                        // that's how you trigger it
            obj.whenSomething ()     }) })                      


        /*  Test unbinding
         */
        $assertCalls (0, function (mkay) {

            var fn1 = function () { mkay () },
                fn2 = function () { mkay () }

            obj.whenSomething (fn1)
            obj.whenSomething (fn2)
            obj.whenSomething.off (fn1/*, fn2*/)            // that's how you unbind specific listeners
            //obj.whenSomething.off ([fn1, fn2])            // array argument is supported too
            obj.whenSomething.off (fn2)

            obj.whenSomething () })


        /*  Test 'barrier' semantics + test argument passing
         */
        $assertCalls (2, function (mkay) {

            obj.somethingReady (function (x) {
                $assert (x === 'foo')               // you may pass arguments to callbacks
                obj.somethingReady (x)              // should not call anything
                mkay () })

            obj.somethingReady (function (x) {
                $assert (x === 'foo')
                mkay () })

            obj.somethingReady ('foo') })   // that's how you trigger it (may pass arguments)
        obj.somethingReady ('bar')          // should not call anything


        /*  Test _.allTriggered
         */
        var t1 = _.triggerOnce (), t2 = _.triggerOnce (),       // test pair1
            t3 = _.triggerOnce (), t4 = _.triggerOnce ()        // test pair2

        _.allTriggered ([t1, t2], function () { $fail }); t1 ()     // pair1: should not cause _.allTriggered to trigger

        $assertCalls (1, function (mkay) {
            _.allTriggered ([t3, t4], mkay); t3 (); t4 () })        // pair2: should trigger _.allTriggered


        /*  Test .postpone
         */
        if (testDone) { $assertCalls (1, function (mkay, assertMkayCalledOnlyOnce) {

                var signal = _.trigger ()
                
                signal (function (x) {
                    $assert (x === 'foo')
                    mkay (); assertMkayCalledOnlyOnce ()
                    testDone () })
                
                signal.postpone ('foo')     // schedules postpone triggering
                signal.postpone ('foo')     // swallows immediate subsequent invocations
                signal          ('foo')     // and non-postponed ones too
            })
        }
    }
}

_.extend (_, {

    gatherChanges: function (observables_) {

        var observables = _.isArray (observables_) ? observables_ : _.initial (arguments)
        var accept      = _.last (arguments)
        var gather      =   function (value) {
                                accept.apply (this, _.pluck (observables, 'value')) }

        _.each (observables, function (read) {
            read (gather) }) },

    allTriggered: function (triggers, then) {
                        var triggered = []
                        if (triggers.length > 0) {
                            _.each (triggers, function (t) {
                                t (function () {
                                    triggered = _.union (triggered, [t])
                                    if (then && (triggered.length === triggers.length)) {
                                        then ()
                                        then = undefined } }) }) }
                        else {
                            then () } },

    observableRef: function (value) {
        return _.extend (_.observable.apply (this, arguments), { trackReference: true }) },

    observable: function (value) {
        var stream = _.stream ({
                        hasValue: false,
                        value: undefined,
                        read: _.identity,
                        write: function (returnResult) {
                                    return function (value) {

                                        if (stream.beforeWrite) {
                                            value = stream.beforeWrite (value) }

                                        if (!stream.hasValue ||
                                            !(stream.trackReference ?
                                                (stream.value === value) :
                                                _.isEqual (stream.value, value))) {

                                            var prevValue = stream.value
                                            var hadValue = stream.hasValue

                                            stream.hasValue = true
                                            stream.value = value

                                            if (hadValue) {
                                                returnResult.call (this, false /* flush */, stream.value, prevValue) }
                                            else {
                                                returnResult.call (this, false /* flush */, stream.value) } } } } })
        if (arguments.length) {
            stream.apply (this, arguments) }

        return _.extend (stream, {

            force: function (value) {
                stream.hasValue = false
                stream (value || stream.value) },
                
            when: function (matchFn, then) {
                stream.readWith (function (val) {
                    if (matchFn (val)) {
                        stream.off (arguments.callee)
                        then (val) } }) },

            readWith: function (fn) { // TODO: this is should be general read behavior, rather than special method
                if (this.hasValue) {
                    fn.call (this.context, this.value) }
                else {
                    fn.call (this.context) }
                this (fn) } }) },


    barrier: function () {
        var barrier = _.stream ({
                    already: false,
                    value: undefined,
                    write: function (returnResult) {
                                return function (value) {
                                    if (!barrier.already) {
                                        barrier.already = true
                                        barrier.value = value }
                                    
                                    returnResult.call (this, true /* flush schedule */, barrier.value) } },

                    read: function (schedule) {
                                return function (returnResult) {
                                    if (barrier.already) {
                                        returnResult.call (this, barrier.value) }
                                    else {
                                        schedule.call (this, returnResult) } } } })

        return barrier },


    triggerOnce: $restArg (function () {
                return _.stream ({
                    read: _.identity,
                    write: function (writes) {
                        return writes.partial (true) } }).apply (this, arguments) }),

    trigger: $restArg (function () {
                return _.stream ({
                    read: _.identity,
                    write: function (writes) {
                        return writes.partial (false) } }).apply (this, arguments) }),

    off: function (fn) {
        if (fn.queue) {
            fn.queue.off () }
        if (fn.queuedBy) {
            _.each (fn.queuedBy, function (queue) {
                queue.remove (fn) })
            delete fn.queuedBy } },

    stream: function (cfg_) {

                var cfg         = cfg_ || {}
                var postponed   = false
                var queue       = _.extend ([], { off: function (fn) { if (this.length) {
                                                    if (arguments.length === 0) {
                                                        _.each (this, function (fn) {
                                                            fn.queuedBy.remove (this) }, this)
                                                        this.removeAll () }
                                                    else {
                                                        fn.queuedBy.remove (this)
                                                        this.remove (fn) } } } })

                var self = undefined

                var scheduleRead = function (fn) {
                    if (queue.indexOf (fn) < 0) {
                        if (fn.queuedBy) {
                            fn.queuedBy.push (queue) }
                        else {
                            fn.queuedBy = [queue] }
                        queue.push (fn) } }

                var commitPendingReads = function (flush, __args__) {
                    var args        = _.rest (arguments),
                        schedule    = queue.copy,
                        context     = self.context

                    if (flush) {
                        queue.off () }  // resets queue
                    
                    _.each (schedule, function (fn) {
                        fn.apply (this, args) }, context || this) }

                var write = cfg.write (commitPendingReads)
                var read  = cfg.read (scheduleRead)

                /*  I/O API (two-way)
                 */
                var frontEnd  = function (fn) {
                                    if (_.isFunction (fn)) {
                                        read.call (this, fn) }

                                    else if (!postponed) {
                                        write.apply (this, arguments) }

                                    return arguments.callee }

                /*  Postpones
                 */
                var postpone = $restArg (function () { if (!postponed) {
                                                        postponed = true
                                                        _.delay (_.applies (write, self, arguments).arity0.then (
                                                                 function () {
                                                                    postponed = false })) }})


                /*  Constructor
                 */
                return (self = _.extend ($restArg (frontEnd), {
                    queue: queue,
                    off: _.off.asMethod,
                    postpone: postpone,
                    read: read,
                    write: write })) } })






/*  Otherwise basic utility (actually a bug-ridden clumsy legacy code)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/*  Context-free math functions
    ======================================================================== */

_.clamp = function (n, min, max) {
    return Math.max (min, Math.min (max, n)) }

_.lerp = function (t, min, max) {
    return min + (max - min) * t }

_.rescale = function (v, from, to, opts) { var unit = (v - from[0]) / (from[1] - from[0])
    return _.lerp (opts && opts.clamp ? _.clamp (unit, 0, 1) : unit, to[0], to[1]) }

_.sqr = function (x) { return x * x }

/*  2-dimensional vector
    ======================================================================== */

Vec2 = $prototype ({

    $static: {
        zero:        $property (function () { return new Vec2 (0, 0) }),
        unit:        $property (function () { return new Vec2 (1, 1) }),
        one:         $alias ('unit'),
        fromLT:      function (lt) { return new Vec2 (lt.left, lt.top) },
        fromWH:      function (wh) { return new Vec2 (wh.width, wh.height) },
        fromLeftTop:     $alias ('fromLT'),
        fromWidthHeight: $alias ('fromWH'),
        dot:         function (a, b) { return a.x * b.x + a.y * b.y },
        lerp:        function (t, a, b) { return new Vec2 (_.lerp (t, a.x, b.x), _.lerp (t, a.y, b.y)) },
        clamp:       function (n, a, b) { return new Vec2 (_.clamp (n.x, a.x, b.x), _.clamp (n.y, a.y, b.y)) } },

    constructor: function (x, y) {
        if (arguments.length === 1) {
            if (_.isNumber (x)) {
                this.x = this.y = x }
            else {
                this.x = x.x
                this.y = x.y } }
        else {
            this.x = x
            this.y = y } },

    length:        $property (function () { return Math.sqrt (this.lengthSquared) }),
    lengthSquared: $property (function () { return this.x * this.x + this.y * this.y }),

    add: function (a, b) {
        if (b === undefined) {
            return new Vec2 (this.x + a.x, this.y + a.y) }
        else {
            return new Vec2 (this.x + a, this.y + b) } },

    sub: function (other) {
        return new Vec2 (this.x - other.x, this.y - other.y) },

    scale: function (tx, ty) {
        return new Vec2 (this.x * tx, this.y * (ty === undefined ? tx : ty)) },

    mul: function (other) {
        return new Vec2 (this.x * other.x, this.y * other.y) },

    divide: function (other) {
        return new Vec2 (this.x / other.x, this.y / other.y) },

    normal: $property (function () {
        return this.scale (1.0 / this.length) }),

    perp: $property (function () {
        return new Vec2 (this.y, -this.x) }),

    half: $property (function () {
        return new Vec2 (this.x * 0.5, this.y * 0.5) }),

    inverse: $property (function () {
        return new Vec2 (-this.x, -this.y) }),

    asLeftTop: $property (function () {
        return { left: Math.floor (this.x), top: Math.floor (this.y) } }),

    asLeftTopMargin: $property (function () {
        return { marginLeft: Math.floor (this.x), marginTop: Math.floor (this.y) } }),

    asWidthHeight: $property (function () {
        return { width: Math.floor (this.x), height: Math.floor (this.y) } }),

    floor: $property (function () {
        return new Vec2 (Math.floor (this.x), Math.floor (this.y)) }),

    sum: $static (function (arr) {
        return _.reduce ((_.isArray (arr) && arr) || _.asArray (arguments),
            function (memo, v) { return memo.add (v || Vec2.zero) }, Vec2.zero) }),

    toString: function () {
        return '{' + this.x + ',' + this.y + '}' },

    projectOnCircle: function (center, r) {
        return center.add (this.sub (center).normal.scale (r)) },

    projectOnLineSegment: function (v, w) {
        var wv = w.sub (v)
        var l2 = wv.lengthSquared
        if (l2 == 0) return v
        var t = Vec2.dot (this.sub (v), wv) / l2
        if (t < 0) return v
        if (t > 1) return w
        return v.add (wv.scale (t)) } })


/*  Cubic bezier
    ======================================================================== */

Bezier = {

    cubic: function (t, p0, p1, p2, p3) {
        var cube = t * t * t
        var square = t * t
        var ax = 3.0 * (p1.x - p0.x);
        var ay = 3.0 * (p1.y - p0.y);
        var bx = 3.0 * (p2.x - p1.x) - ax;
        var by = 3.0 * (p2.y - p1.y) - ay;
        var cx = p3.x - p0.x - ax - bx;
        var cy = p3.y - p0.y - ay - by;
        var x = (cx * cube) + (bx * square) + (ax * t) + p0.x;
        var y = (cy * cube) + (by * square) + (ay * t) + p0.y;
        return new Vec2 (x, y) },
        
    cubic1D: function (t, a, b, c, d) {
        return Bezier.cubic (t, Vec2.zero, new Vec2 (a, b), new Vec2 (c, d), Vec2.one).y },

    make: {
        
        cubic:   function (a,b,c,d) { return function (t) { return Bezier.cubic   (t,a,b,c,d) } },
        cubic1D: function (a,b,c,d) { return function (t) { return Bezier.cubic1D (t,a,b,c,d) } } } }


/*  Bounding box (2D)
    ======================================================================== */

BBox = $prototype ({

    $static: {

        zero: $property (function () {
            return new BBox (0, 0, 0, 0) }),

        unit: $property (function () {
            return new BBox (0, 0, 1, 1) }),

        fromLeftTopAndSize: function (pt, size) {
            return BBox.fromLTWH ({ left: pt.x, top: pt.y, width: size.x, height: size.y }) },

        fromLTWH: function (r) {
            return new BBox (r.left + r.width / 2.0, r.top + r.height / 2.0, r.width, r.height) },

        fromLTRB: function (r) {
            return new BBox (_.lerp (0.5, r.left, r.right), _.lerp (0.5, r.top, r.bottom), r.right - r.left, r.bottom - r.top) },

        fromSizeAndCenter: function (size, center) {
            return new BBox (center.x - size.x / 2.0, center.y - size.y / 2.0, size.x, size.y) },

        fromSize: function (a, b) {
            if (b) {
                return new BBox (-a / 2.0, -b / 2.0, a, b) }
            else {
                return new BBox (-a.x / 2.0, -a.y / 2.0, a.x, a.y) } },
        
        fromPoints: function (pts) { var l = Number.MAX_VALUE, t = Number.MAX_VALUE, r = Number.MIN_VALUE, b = Number.MIN_VALUE
            _.each (pts, function (pt) {
                l = Math.min (pt.x, l)
                t = Math.min (pt.y, t)
                r = Math.max (pt.x, r)
                b = Math.max (pt.y, b) })
            return BBox.fromLTRB ({ left: l, top: t, right: r, bottom: b }) } },

    constructor: function (x, y, w, h) {
        if (arguments.length == 4) {
            this.x = x
            this.y = y
            this.width = w
            this.height = h }
        else {
            _.extend (this, x) } },

    classifyPoint: function (pt) {
        
        var sides = _.extend (

            (pt.x > this.right)   ? { right   : true } : {},
            (pt.x < this.left)    ? { left    : true } : {},
            (pt.y > this.bottom)  ? { bottom  : true } : {},
            (pt.y < this.top)     ? { top     : true } : {})
        
        return _.extend (sides,

            (!sides.left &&
             !sides.right &&
             !sides.bottom && !sides.top) ? { inside: true } : {}) },

    classifyRay: function (pos, delta, paddingX, paddingY) { paddingX = paddingX || 0; paddingY = paddingY || 0

        var half = this.size.half

        var farTime, farTimeX, farTimeY, hit, nearTime, nearTimeX, nearTimeY, scaleX, scaleY, signX, signY;

        scaleX = 1.0 / delta.x;
        scaleY = 1.0 / delta.y;
        signX = Math.sign(scaleX);
        signY = Math.sign(scaleY);
        nearTimeX = (this.x - signX * (half.x + paddingX) - pos.x) * scaleX;
        nearTimeY = (this.y - signY * (half.y + paddingY) - pos.y) * scaleY;
        farTimeX = (this.x + signX * (half.x + paddingX) - pos.x) * scaleX;
        farTimeY = (this.y + signY * (half.y + paddingY) - pos.y) * scaleY;
        if (nearTimeX > farTimeY || nearTimeY > farTimeX) {
            return undefined;
        }
        nearTime = nearTimeX > nearTimeY ? nearTimeX : nearTimeY;
        farTime = farTimeX < farTimeY ? farTimeX : farTimeY;
        if (nearTime >= 1 || farTime <= 0) {
            return undefined;
        }
        var hit = { time: _.clamp (nearTime, 0, 1) }
        if (nearTimeX > nearTimeY) {
            hit.normal = new Vec2 (-signX, 0)
        } else {
            hit.normal = new Vec2 (0, -signY)
        }
        hit.delta = delta.scale (hit.time)
        hit.where = pos.add (hit.delta)
        return hit;
    },

    nearestPointTo: function (pt, cornerRadius) { var r = cornerRadius || 0

        var a = new Vec2 (this.left,  this.top),
            b = new Vec2 (this.right, this.top),
            c = new Vec2 (this.right, this.bottom),
            d = new Vec2 (this.left,  this.bottom)

        var pts = [ pt.projectOnLineSegment (a.add (r, 0),  b.add (-r, 0)),  // top
                    pt.projectOnLineSegment (b.add (0, r),  c.add (0, -r)),  // right
                    pt.projectOnLineSegment (c.add (-r, 0), d.add (r, 0)),   // bottom
                    pt.projectOnLineSegment (d.add (0, -r), a.add (0, r)),   // left

                    pt.projectOnCircle (a.add ( r,  r), r),
                    pt.projectOnCircle (b.add (-r,  r), r),
                    pt.projectOnCircle (c.add (-r, -r), r),
                    pt.projectOnCircle (d.add ( r, -r), r) ]

        return _.min (pts, function (test) { return pt.sub (test).length }) },

    clone: $property (function () {
        return new BBox (this.x, this.y, this.width, this.height) }),
    
    floor: $property (function () {
        return new Vec2 (Math.floor (this.x), Math.floor (this.y)) }),

    css: $property (function () {
        return { left: this.left, top: this.top, width: this.width, height: this.height } }),

    leftTop: $property (function () {
        return new Vec2 (this.left, this.top) }),

    rightBottom: $property (function () {
        return new Vec2 (this.right, this.bottom) }),

    left: $property (function () {
        return this.x - this.width / 2.0 }),

    right: $property (function () {
        return this.x + this.width / 2.0 }),

    top: $property (function () {
        return this.y - this.height / 2.0 }),

    bottom: $property (function () {
        return this.y + this.height / 2.0 }),

    center: $property (function () {
        return new Vec2 (this.x, this.y) }),

    size: $property (function () {
        return new Vec2 (this.width, this.height) }),

    offset: function (amount) {
        return new BBox (this.x + amount.x, this.y + amount.y, this.width, this.height) },

    newWidth: function (width) {
        return new BBox (this.x - (width - this.width) / 2.0, this.y, width, this.height) },

    grow: function (amount) {
        return new BBox (this.x, this.y, this.width + amount, this.height + amount) },

    area: $property (function () {
        return Math.abs (this.width * this.height) }),

    toString: function () {
        return '{' + this.x + ',' + this.y + ':' + this.width + '×' + this.height + '}' } })


/*  3x3 affine transform matrix, encoding scale/offset/rotate/skew in 2D
    ======================================================================== */

Transform = $prototype ({

    svgMatrix: $static (function (m) {
                            return new Transform ([
                                [m.a, m.c, m.e],
                                [m.b, m.d, m.f],
                                [0.0, 0.0, 1.0] ]) }),

    constructor: function (components) {
                    this.components = components || [
                        [1.0, 0.0, 0.0],
                        [0.0, 1.0, 0.0],
                        [0.0, 0.0, 1.0]] },

    multiply: function (m) {
                    var result = [[0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]]
                    var i, j, k, a = this.components, b = m.components;
                    for (i = 0; i < 3; i++) {
                        for (j = 0; j < 3; j++) {
                            for (k = 0; k < 3; k++) {
                                   result[i][j] += a[i][k] * b[k][j] } } }

                    return new Transform (result) },

    translate: function (v) {
                    return this.multiply (new Transform ([
                        [1.0, 0.0, v.x],
                        [0.0, 1.0, v.y],
                        [0.0, 0.0, 1.0] ])) },

    scale: function (s) {
                return this.multiply (new Transform ([
                    [s,   0.0, 0.0],
                    [0.0, s,   0.0],
                    [0.0, 0.0, 1.0] ])) },

    inverse: $property ($memoized (function () { var m = this.components
                                        var id = (1.0 / 
                                                    (m[0][0] * (m[1][1] * m[2][2] - m[2][1] * m[1][2]) -
                                                     m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
                                                     m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])))

                                        return new Transform ([[

                                                 (m[1][1]*m[2][2]-m[2][1]*m[1][2])*id,          // 0 0
                                                -(m[0][1]*m[2][2]-m[0][2]*m[2][1])*id,          // 0 1
                                                 (m[0][1]*m[1][2]-m[0][2]*m[1][1])*id],         // 0 2

                                                [(m[1][0]*m[2][2]-m[1][2]*m[2][0])*id,          // 1 0
                                                 (m[0][0]*m[2][2]-m[0][2]*m[2][0])*id,          // 1 1
                                                -(m[0][0]*m[1][2]-m[1][0]*m[0][2])*id],         // 1 2

                                                [(m[1][0]*m[2][1]-m[2][0]*m[1][1])*id,          // 2 0
                                                -(m[0][0]*m[2][1]-m[2][0]*m[0][1])*id,          // 2 1
                                                 (m[0][0]*m[1][1]-m[1][0]*m[0][1])*id] ]) })),  // 2 2
        
    unproject: function (v) {
                    var m = this.components
                    return new Vec2 (
                        v.x * m[0][0] + v.y * m[0][1] + m[0][2],
                        v.x * m[1][0] + v.y * m[1][1] + m[1][2]) },

    project: function (v) {
                return this.inverse.unproject (v) } })


/*  Generates random number generator
    ======================================================================== */

_.rng = function (seed, from, to) {
    var m_w = seed;
    var m_z = 987654321;
    var mask = 0xffffffff;
    return function () {
        m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
        m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
        var result = ((m_z << 16) + m_w) & mask;
        result /= 4294967296;
        result += 0.5
        if (from === undefined && to === undefined) {
            return result }
        else {
            return Math.round (from + result * (to - from)) } } }


/*  Kind of Brezenham algorithm for 1D
    ======================================================================== */

_.equalDistribution = function (value, n) {
    var average = value / n
    var realLeft = 0.0
    return _.times (n, function () {
        var left = Math.round (realLeft)
        var right = Math.round (realLeft += average)
        var rough = Math.floor (right - left)
        return rough }) }


/*  DEPRECATED: use BBox utility
    ======================================================================== */

_.ptInRect = function (pt, rect) {
    return ((pt.x >= rect.left) && (pt.y >= rect.top) && (pt.x < rect.right) && (pt.y < rect.bottom)) }


/*  Color utility
    ======================================================================== */

_.hue2CSS = function (H, a)   { return _.RGB2CSS (_.hue2RGB (H), a)       }
_.HSL2CSS = function (hsl, a) { return _.RGB2CSS (_.HSL2RGB (hsl), a) }

_.HSL2RGB = function (hsl) { var h = hsl[0], s = hsl[1], l = hsl[2]
    var rgb = _.hue2RGB (h)
    var c = (1.0 - Math.abs (2.0 * l - 1.0)) * s
    return [(rgb[0] - 0.5) * c + l,
            (rgb[1] - 0.5) * c + l,
            (rgb[2] - 0.5) * c + l] }

_.hue2RGB = function (hue) {
    return [Math.max (0.0, Math.min (1.0, Math.abs (hue * 6.0 - 3.0) - 1.0)),
            Math.max (0.0, Math.min (1.0, 2.0 - Math.abs (hue * 6.0 - 2.0))),
            Math.max (0.0, Math.min (1.0, 2.0 - Math.abs (hue * 6.0 - 4.0)))] }

_.RGB2CSS = function (rgb, a) {
    return 'rgba(' +
        Math.round (rgb[0] * 255) + ',' +
        Math.round (rgb[1] * 255) + ',' +
        Math.round (rgb[2] * 255) + ',' + (a === undefined ? (rgb[3] === undefined ? 1.0 : rgb[3]) : a) + ')' }

_.RGB2HSL = function (rgb, a_) {
    var r = rgb[0], g = rgb[1], b = rgb[2], a = (a_ === undefined ? rgb[3] : a_)
    var max = Math.max (r, g, b), min = Math.min (r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0 }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break; }
        h /= 6 }
    return a === undefined ? [h, s, l] : [h, s, l, a] }
    

/*  Advanced rounding utility
    ======================================================================== */

_.extend (Math, (function (decimalAdjust) {
    return {
        roundTo: function (value, precision) {
            return value - (value % precision)
        },
        round10: function(value, exp) {
            return decimalAdjust ('round', value, exp);
        },
        floor10: function(value, exp) {
            return decimalAdjust ('floor', value, exp);
        },
        ceil10: function(value, exp) {
            return decimalAdjust ('ceil', value, exp);
        }
    }
}) (function /* decimalAdjust */ (type, value, exp) {

    /**
     * Decimal adjustment of a number.
     *
     * @param   {String}    type    The type of adjustment.
     * @param   {Number}    value   The number.
     * @param   {Integer}   exp     The exponent (the 10 logarithm of the adjustment base).
     * @returns {Number}            The adjusted value.
     */

    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
        return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}))
/*  Parsers (TODO: REFACTOR)
    ======================================================================== */

_.tests.parse = {
    fileName: function () {
        $assert (Parse.fileName ('блабла'), 'блабла')
        $assert (Parse.fileName ('блабла.jpg'), 'блабла')
        $assert (Parse.fileName ('c:\\блабла/path/path2/блабла.jpg'), 'блабла')
    }
}

Parse = {

    keyCodeAsString: function (key) {
        return String.fromCharCode ((96 <= key && key <= 105) ? key - 48 : key) },

    fileName: function (path) {
        return _.first (_.last (path.split (/\\|\//)).split ('.')) },

    phoneNumber: function (input) {
        var numeric = input.numericValue
        if (numeric.length && numeric[0] === '8') {
            return ('7' + numeric.slice (1)) }
        else {
            return numeric } },

    sqlDate: function (date) {
        if (!date) {
            return undefined }
        var dateTime = date.split (' ')
        var date = dateTime[0].split ('-')
        var time = dateTime.length > 1 ? dateTime[1].split (':') : ['0', '0', '0']
        var seconds = parseFloat (time[2])
        return new Date (
            parseInt (date[0], 10), parseInt (date[1], 10) - 1, parseInt (date[2], 10),
            parseInt (time[0], 10), parseInt (time[1], 10), Math.floor (seconds),
            (seconds - Math.floor (seconds)) * 1000) },

    timestampFromDateTimeString: function (date) {
        if (!date)
            return undefined

        var dateTime = date.split (' ')
        var date = dateTime[0].split ('.')
        var time = dateTime.length > 1 ? dateTime[1].split (':') : ['0', '0', '0']
        return (new Date (
            (date[2].length > 2 ? 0 : 2000) + parseInt (date[2], 10),   // year
            parseInt (date[1], 10) - 1,                                 // month
            parseInt (date[0], 10),                                     // day
            parseInt (time[0], 10),                                     // hour
            parseInt (time[1], 10))).getTime () }                       // minute
}

Format = {

    /*  Use this to print objects as JavaScript (supports functions and $-tags output)
     */
    javascript: function (obj) {
        return _.stringify (obj, {
                    pretty: true,
                    pure: true,
                    formatter: function (x) {
                                    if (_.isTypeOf (Tags, x)) {
                                        return _.reduce (
                                                    _.keys (_.pick (x, _.keyIsKeyword)),
                                                        function (memo, key) { return key + ' ' + _.quote (memo, '()') },
                                                            _.stringify (Tags.unwrap (x))) }

                                    else if (_.isFunction (x)) {
                                        return x.toString () }

                                    else {
                                        return undefined } } }) },

    randomHexString: function (length) {
        var string = '';
        for (var i = 0; i < length; i++) {
            string += Math.floor (Math.random () * 16).toString (16) }
        return string },

    leadingZero: function (x) {
        return x < 10 ? '0' + x : x.toString () },

    plural: function (n, a, b, c) /* ex.: plural (21, 'час', 'часа', 'часов') */ {
        if (_.isArray (a)) {
            c = a[2]
            b = a[1]
            a = a[0] }
        var cases = [c, a, b, b, b, c]
        return n + ' ' + ((n % 100 > 4) && (n % 100 < 20) ? c : cases[Math.min(n % 10, 5)]) }
}


/*  Sorting utilities (TODO: REFACTOR)
    ======================================================================== */

Sort = {
    Ascending: 1,
    Descending: -1,
    strings: function (a, b) {
        a = $.trim (a).toLowerCase ()
        b = $.trim (b).toLowerCase ()
        if (a.length == 0 && b.length > 0) {
            return 1;
        } else if (a.length > 0 && b.length == 0) {
            return -1;
        } else {
            return a == b ? 0 : (a < b ? -1 : 1)
        }
    },
    numbers: function (a, b) {
        if (isNaN (a) && isNaN (b)) {
            return 0
        } else if (isNaN (a)) {
            return -1
        } else if (isNaN (b)) {
            return 1
        } else {
            return a < b ? -1 : (a > b ? 1 : 0)
        }
    },
    generic: function (a, b) {
        if (!a && !b) {
            return 0
        } else if (!a) {
            return -1
        } else if (!b) {
            return 1
        } else {
            return a < b ? -1 : (a > b ? 1 : 0)
        }
    },
    inverse: function (sort) {
        return function (a, b) {
            return -(sort (a, b))
        }
    },
    field: function (name, sort, order) {
        return function (a, b) {
            return sort (a[name], b[name]) * order
        }
    }
}



/*  Self-awareness utils
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/*  Self-awareness module
    ======================================================================== */

_.tests.reflection = {

    'file paths': function () {
        $assert ($sourcePath .length > 0)
        $assert ($uselessPath.length > 0) },

    'readSource': function () {
        _.readSource ($uselessPath + 'useless.js', function (text) {
            $assert (text.length > 0) })

        _.readSourceLine ($uselessPath + 'useless.js', 0, function (line) {
            $assert (line.length > 0) }) },

    'CallStack from error': function () {
        try {
            throw new Error ('oh fock') }
        catch (e) {
            $assertTypeof (CallStack.fromError (e), CallStack) } },

    '$callStack': function () {

        /*  That's how you access call stack at current location
         */
        var stack = $callStack

        /*  It is an array of entries...
         */
        $assert (_.isArray (stack))

        /*  ...each having following members
         */
        $assertTypeof (stack[0], {
            callee:         'string',       // function name
            calleeShort:    'string',       // short function name (only the last part of dot-sequence)
            file:           'string',       // full path to source file at which call occurred
            fileName:       'string',       // name only (with extension)
            fileShort:      'string',       // path relative to $sourcePath
            thirdParty:     'boolean',      // denotes whether the call location occured at 3rd party library
            line:           'number',       // line number
            column:         'number',       // character number
            source:         'string',       // source code (may be not ready right away)
            sourceReady:    'function' })   // a barrier, opened when source is loaded (see dynamic/stream.js on how-to use)

        /*  $callStack is CallStack instance, providing some helpful utility:
         */
        $assert (_.isTypeOf (CallStack, stack))

        /*  1. clean CallStack (with 3rdparty calls stripped)
         */
        $assert (_.isTypeOf (CallStack, stack.clean))

        /*  2. shifted by some N (useful for error reporting, to strip error reporter calls)
         */
        $assert (_.isTypeOf (CallStack, stack.offset (2)))

        /*  3. filter and reject semantics supported, returning CallStack instances
         */
        $assert (_.isTypeOf (CallStack, stack.filter (_.identity)))
        $assert (_.isTypeOf (CallStack, stack.reject (_.identity)))

        /*  4. source code access, either per entry..
         */
        if (Platform.NodeJS) { // on client it's async so to test it properly, need to extract this test part to separate async routine
            $assertCalls (1, function (mkay) {
                stack[0].sourceReady (function (src) { mkay ()  // sourceReady is barrier, i.e. if ready, called immediately
                    $assert (typeof src, 'string') }) })

        /*  5. ..or for all stack
         */
            $assertCalls (1, function (mkay) {
                stack.sourcesReady (function () { mkay ()       // sourcesReady is barrier, i.e. if ready, called immediately
                    _.each (stack, function (entry) {
                        $assert (typeof entry.source, 'string') }) }) })

        /*  Safe location querying
         */
        $assertCPS (stack.safeLocation (777).sourceReady, '??? WRONG LOCATION ???') } },

    'Prototype.$sourceFile': function () {
        if (Platform.NodeJS) {
            var Proto = $prototype ()
            $assert (Proto.$sourceFile, 'base/reflection.js') } }
}


/*  Custom syntax (defined in a way that avoids cross-dependency loops)
 */
_.defineKeyword ('callStack',   function () {
    return CallStack.fromRawString (CallStack.currentAsRawString).offset (Platform.NodeJS ? 1 : 0) })

_.defineKeyword ('currentFile', function () {
    return (CallStack.rawStringToArray (CallStack.currentAsRawString)[Platform.NodeJS ? 3 : 1] || { file: '' }).file })

_.defineKeyword ('uselessPath', _.memoize (function () {
    return _.initial ($currentFile.split ('/'), Platform.NodeJS ? 2 : 1).join ('/') + '/' }) )

_.defineKeyword ('sourcePath', _.memoize (function () { var local = ($uselessPath.match (/(.+)\/node_modules\/(.+)/) || [])[1]
    return local ? (local + '/') : $uselessPath }))


/*  Source code access (cross-platform)
 */
_.readSourceLine = function (file, line, then) {
    _.readSource (file, function (data) {
        then ((data.split ('\n')[line] || '').trimmed) }) }


_.readSource = _.cps.memoize (function (file, then) {
                                if (!file || !file.match (/.+\.js/)) { // oh, dont waste my time.. are you even script?
                                    then ('') }
                                else {
                                    if (Platform.NodeJS) {
                                        try {
                                            then (require ('fs').readFileSync (file, { encoding: 'utf8' }) || '') }
                                        catch (e) {
                                            then ('') } }
                                    else {
                                        jQuery.get (file, then, 'text') } } })


/*  Callstack API
 */
CallStack = $extends (Array, {

    current: $static ($property (function () {
        return CallStack.fromRawString (CallStack.currentAsRawString).offset (1) })),

    fromError: $static (function (e) {
        if (e.parsedStack) {
            return CallStack.fromParsedArray (_.map (e.parsedStack, function (entry) {
                return _.extend (entry, { sourceReady: _.constant (entry.source) }) })) }
        else {
            return CallStack.fromRawString (e.stack) } }),

    locationEquals: $static (function (a, b) {
        return (a.file === b.file) && (a.line === b.line) && (a.column === b.column) }),

    safeLocation: function (n) {
        return this[n] || {
            callee: '', calleeShort: '', file: '',
            fileName: '', fileShort: '', thirdParty:    false,
            source: '??? WRONG LOCATION ???',
            sourceReady: _.cps.constant ('??? WRONG LOCATION ???') } },

    clean: $property (function () {
        return this.reject (_.property ('thirdParty')) }),

    asArray: $property (function () {
        return _.asArray (this) }),

    offset: function (N) {
        return CallStack.fromParsedArray (_.rest (this, N)) },

    filter: function (fn) {
        return CallStack.fromParsedArray (_.filter (this, fn)) },

    reject: function (fn) {
        return CallStack.fromParsedArray (_.reject (this, fn)) },

    reversed: $property (function () {
        return CallStack.fromParsedArray (_.reversed (this)) }),

    sourcesReady: function (then) {
        return _.allTriggered (_.pluck (this, 'sourceReady'), then) },

    /*  Internal impl.
     */
    constructor: function (arr) { Array.prototype.constructor.call (this)
        for (var i = 0, n = arr.length; i < n; i++) {
            this.push (arr[i]) } },

    fromParsedArray: $static (function (arr) {
        return new CallStack (arr) }),

    currentAsRawString: $static ($property (function () {
        var cut = _.platform ().engine === 'browser' ? 3 : 2
        return _.rest (((new Error ()).stack || '').split ('\n'), cut).join ('\n') })),

    shortenPath: $static (function (file) {
                    return file.replace ($uselessPath, '')
                               .replace ($sourcePath,  '') }),

    isThirdParty: $static (function (file) { var local = file.replace ($sourcePath, '')
                    return (local.indexOf ('/node_modules/') >= 0) ||
                           (file.indexOf  ('/node_modules/') >= 0 && !local) ||
                           (local.indexOf ('underscore') >= 0) ||
                           (local.indexOf ('jquery') >= 0) }),

    fromRawString: $static (_.sequence (
        function (rawString) {
            return CallStack.rawStringToArray (rawString) },

        function (array) {
            return _.map (array, function (entry) {
                return _.extend (entry, {
                            calleeShort:    _.last (entry.callee.split ('.')),
                            fileName:       _.last (entry.file.split ('/')),
                            fileShort:      CallStack.shortenPath (entry.file),
                            thirdParty:     CallStack.isThirdParty (entry.file) }) }) },

        function (parsedArray) {
            return _.map (parsedArray, function (entry) {
                    entry.source = ''
                    entry.sourceReady = _.barrier ()

                    _.readSourceLine (entry.file, entry.line - 1, function (src) {
                        entry.source = src
                        entry.sourceReady (src) })

                    return entry }) },

        function (parsedArrayWithSourceLines) { return CallStack.fromParsedArray (parsedArrayWithSourceLines) })),

    rawStringToArray: $static (function (rawString) {
        var lines = _.rest ((rawString || '').split ('\n'), _.platform ().engine === 'browser' ? 1 : 0)
        return _.map (lines, function (line_) {
            var line = line_.trimmed
            var callee, fileLineColumn = []
            var match = line.match (/at (.+) \((.+)\)/)
            if (match) {
                callee = match[1]
                fileLineColumn = _.rest (match[2].match (/(.*):(.+):(.+)/) || []) }
            else {
                var planB = line.match (/at (.+)/)
                if (planB && planB[1]) {
                    fileLineColumn = _.rest (planB[1].match (/(.*):(.+):(.+)/) || []) }}
            return {
                beforeParse: line,
                callee: callee || '',
                file: fileLineColumn[0] || '',
                line: (fileLineColumn[1] || '').integerValue,
                column: (fileLineColumn[2] || '').integerValue } }) }) })

/*  Prototype.$sourceFile
 */
$prototype.macro (function (def, base) {
    var stackEntry = $callStack[Platform.NodeJS ? 5 : 5]
    def.$sourceFile = $static ($property (stackEntry ? stackEntry.fileShort : 'unknown'))
    return def })






/*  Measures run time of a routine (either sync or async)
    ======================================================================== */

_.measure = function (routine, then) {
    if (then) {                             // async
        var now = _.now ()
        routine (function () {
            then (_.now () - now) }) }
    else {                                  // sync
        var now = _.now ()
        routine ()
        return _.now () - now } }


/*  Measures performance: perfTest (fn || { fn1: .., fn2: ... }, then)
    ======================================================================== */

_.perfTest = function (arg, then) {
    var rounds = 500
    var routines = _.isFunction (arg) ? { test: arg } : arg
    var timings = {}

    _.cps.each (routines, function (fn, name, then) {

        /*  Define test routine (we store and print result, to assure our routine
            won't be throwed away by optimizing JIT)
         */
        var result = []
        var run = function () {
            for (var i = 0; i < rounds; i++) {
                result.push (fn ()) }
            console.log (name, result) }

        /*  Warm-up run, to force JIT work its magic (not sure if 500 rounds is enough)
         */
        run ()

        /*  Measure (after some delay)
         */
        _.delay (function () {
            timings[name] = _.measure (run) / rounds
            then () }, 100) },

        /*  all done
         */
        function () {
            then (timings) }) }



/*  Otherwise basic utility
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

_.tests.log = function () {     //  Writes to test's log (as it's off-screen until needed)

    log.write   ('Hello')       //  Use for plain output.

    log.green   ('Green')       //  Use for plain colored output.
    log.blue    ('Blue')
    log.orange  ('Orange')
    log.red     ('Red')

    log.success ('Success')     //  Use for quality production logging (logging that lasts).
    log.ok      ('Success')
    log.info    ('Info')        //  Printed location greatly helps to find log cause in code.
    log.warn    ('Warning')                 
    log.warning ('Warning')     //  For those who cant remember which one, both are valid.
    log.error   ('Error')
    log.failure ('Error')       //  Allows 'log' to be transparently passed as stub handler,
                                //  to where {success:fn,failure:fn} config expected.

    $assert (log.write ('Identity'), 'Identity')    // Can be used for debugging of functional expressions
                                                    // (as it returns it first argument, like in _.identity)

    log.write   ('Default', log.config ({ location: true }))    //  Config is good as any argument.
    log.write   (log.config ({ location: true }), 'Default')    //  First, second or last, doesn't matter.

    log.info    ('You can tune callstack location if its wrong', log.config ({ stackOffset: 2 }))

    log.write   ('Consequent', 'arguments', 'joins', 'with', 'whitespace')

    log.write   (log.boldLine)  //  ASCII art <hr>
    log.write   (log.thinLine)
    log.write   (log.line)

    log.write   (log.color.green,
                    ['You can set indentation',
                     'that is nicely handled',
                     'in case of multiline text'].join ('\n'), log.config ({ indent: 1 }))

    log.orange  (log.indent (2), '\nCan print nice table layout view for arrays of objects:\n')
    log.orange  (log.indent (2), [
        { field: 'line',    matches: false, valueType: 'string', contractType: 'number' },
        { field: 'column',  matches: true,  valueType: 'string', contractType: 'number' }])

    log.write ('\nObject:', { foo: 1, bar: 2, qux: 3 })         //  Object printing is supported
    log.write ('Array:', [1, 2, 3])                             //  Arrays too
    log.write ('Function:', _.identity)                         //  Prints code of a function

    log.write ('Complex object:', { foo: 1, bar: { qux: [1,2,3], garply: _.identity }}, '\n\n') }




_.extend (
    log = function () {                         // For those who constantly mistypes, writing "log (output)" and oops no such API:
        log.write.apply (this, arguments) }, {  // now there's one. At last.


    Color: $prototype (),
    Config: $prototype (),

    /*  Returns arguments clean of config (non-value) parameters
     */
    cleanArgs: function (args) {
        return _.reject (args, _.or (log.Color.isTypeOf, log.Config.isTypeOf)) },

    /*  Monadic operators to help read and modify those control structures 
        in argument lists (internal impl.)
     */
    read: function (type, args) {
        return _.find (args, type.isTypeOf) || new type ({}) },

    modify: function (type, args, operator) {
                return _.reject (args, type.isTypeOf)
                            .concat (
                                operator (log.read (type, args))) } })


_.extend (log, {

    /*  Could be passed as any argument to any write function.
     */
    config: function (cfg) {
        return new log.Config (cfg) },


    /*  Shortcut for common case
     */
    indent: function (n) {
        return log.config ({ indent: n }) },


    /*  There could be many colors in log message (NOT YET), therefore it's a separate from config entity.
     */
    color: {
        red:    new log.Color ({ shell: '\u001b[31m', css: 'crimson' }),
        blue:   new log.Color ({ shell: '\u001b[36m', css: 'royalblue' }),
        orange: new log.Color ({ shell: '\u001b[33m', css: 'saddlebrown' }),
        green:  new log.Color ({ shell: '\u001b[32m', css: 'forestgreen' }) },


    /*  Actual arguments API
     */
    readColor:      log.read.partial (log.Color),
    readConfig:     log.read.partial (log.Config),
    modifyColor:    log.modify.partial (log.Color),
    modifyConfig:   log.modify.partial (log.Config),


    /*  Need one? Take! I have plenty of them!
     */
    boldLine:   '======================================',
    line:       '--------------------------------------',
    thinLine:   '......................................',


    /*  For hacking log output (contextFn should be conformant to CPS interface, e.g. have 'then' as last argument)
     */
    withCustomWriteBackend: function (backend, contextFn, then) {
        var previousBackend = log.impl.writeBackend
        log.impl.writeBackend = backend
        contextFn (function () {
            log.impl.writeBackend = previousBackend
            if (then) {
                then () } }) },

    /*  For writing with forced default backend
     */
    writeUsingDefaultBackend: function () { var args = arguments
        log.withCustomWriteBackend (
            log.impl.defaultWriteBackend,
            function (done) {
                log.write.apply (null, args); done () }) },
    
    /*  Internals
     */
    impl: {

        /*  Nuts & guts
         */
        write: function (defaultCfg) { return $restArg (function () {

            var args            = _.asArray (arguments)
            var cleanArgs       = log.cleanArgs (args)

            var config          = _.extend ({ indent: 0 }, defaultCfg, log.readConfig (args))
            var stackOffset     = Platform.NodeJS ? 3 : 2

            var indent          = (log.impl.writeBackend.indent || 0) + config.indent

            var text            = log.impl.stringifyArguments (cleanArgs)
            var indentation     = _.times (indent, _.constant ('\t')).join ('')
            var match           = text.reversed.match (/(\n*)([^]*)/) // dumb way to select trailing newlines (i'm no good at regex)

            var location = (
                config.location &&
                log.impl.location (config.where || $callStack[stackOffset + (config.stackOffset || 0)])) || ''

            var backendParams = {
                color: log.readColor (args),
                indentedText:  match[2].reversed.split ('\n').map (_.prepends (indentation)).join ('\n'),
                trailNewlines: match[1],
                codeLocation: location }

            log.impl.writeBackend (backendParams)

            return cleanArgs[0] }) },
        
        defaultWriteBackend: function (params) {
            var color           = params.color,
                indentedText    = params.indentedText,
                codeLocation    = params.codeLocation,
                trailNewlines   = params.trailNewlines

            var colorValue = color && (Platform.NodeJS ? color.shell : color.css)
                
            if (colorValue) {
                if (Platform.NodeJS) {
                    console.log (colorValue + indentedText + '\u001b[0m', codeLocation, trailNewlines) }
                else {
                    var lines = indentedText.split ('\n')
                    var allButFirstLinePaddedWithSpace = // god please, make them burn.. why???
                            [_.first (lines) || ''].concat (_.rest (lines).map (_.prepends (' ')))

                    console.log ('%c'      + allButFirstLinePaddedWithSpace.join ('\n'),
                                 'color: ' + colorValue, codeLocation, trailNewlines) }}
            else {
                console.log (indentedText, codeLocation, trailNewlines) } },


        /*  Formats that "function @ source.js:321" thing
         */
        location: function (where) {
            return _.quoteWith ('()', _.nonempty ([where.calleeShort, where.fileName + ':' + where.line]).join (' @ ')) },


        /*  This could be re-used by outer code for turning arbitrary argument lists into string
         */
        stringifyArguments: function (args) {
            return _.map (args, log.impl.stringify).join (' ') },

        /*  Smart object stringifier
         */
        stringify: function (what) {
            if (_.isTypeOf (Error, what)) {
                var str = log.impl.stringifyError (what)
                if (what.originalError) {
                    return str + '\n\n' + log.impl.stringify (what.originalError) }
                else {
                    return str } }

            else if (_.isTypeOf (CallStack, what)) {
                return log.impl.stringifyCallStack (what) }

            else if (typeof what === 'object') {
                /*if (_.isArray (what) && what.length > 1 && _.isObject (what[0])) {
                    return log.asTable (what) }
                else {*/
                    return _.stringify (what) /*}*/ }
                    
            else if (typeof what === 'string') {
                return what }

            else {
                return _.stringify (what) } },
        
        stringifyError: function (e) {
            try {       
                var stack   = CallStack.fromError (e).clean.offset (e.stackOffset || 0)
                var why     = (e.message || '').replace (/\r|\n/g, '').trimmed.first (120)

                return ('[EXCEPTION] ' + why + '\n\n') + log.impl.stringifyCallStack (stack) + '\n' }
            catch (sub) {
                return 'YO DAWG I HEARD YOU LIKE EXCEPTIONS... SO WE THREW EXCEPTION WHILE PRINTING YOUR EXCEPTION:\n\n' + sub.stack +
                    '\n\nORIGINAL EXCEPTION:\n\n' + e.stack + '\n\n' } },

        stringifyCallStack: function (stack) {
            return log.columns (stack.map (
                function (entry) { return [
                    '\t' + 'at ' + entry.calleeShort.first (30),
                    _.nonempty ([entry.fileShort, ':', entry.line]).join (''),
                    (entry.source || '').first (80)] })).join ('\n') }
} })


/*  Printing API
 */
_.extend (log, log.printAPI = {

    newline:    log.impl.write ().partial (''),
    write:      log.impl.write (),
    red:        log.impl.write ().partial (log.color.red),
    blue:       log.impl.write ().partial (log.color.blue),
    orange:     log.impl.write ().partial (log.color.orange),
    green:      log.impl.write ().partial (log.color.green),

    failure:    log.impl.write ({ location: true }).partial (log.color.red),
    error:      log.impl.write ({ location: true }).partial (log.color.red),
    e:          log.impl.write ({ location: true }).partial (log.color.red),
    info:       log.impl.write ({ location: true }).partial (log.color.blue),
    i:          log.impl.write ({ location: true }).partial (log.color.blue),
    w:          log.impl.write ({ location: true }).partial (log.color.orange),
    warn:       log.impl.write ({ location: true }).partial (log.color.orange),
    warning:    log.impl.write ({ location: true }).partial (log.color.orange),
    success:    log.impl.write ({ location: true }).partial (log.color.green),
    ok:         log.impl.write ({ location: true }).partial (log.color.green) }) 

log.writes = log.printAPI.writes = _.higherOrder (log.write) // generates write functions

log.impl.writeBackend = log.impl.defaultWriteBackend

/*  Experimental formatting shit.
 */
_.extend (log, {

    asTable: function (arrayOfObjects) {
        var columnsDef  = arrayOfObjects.map (_.keys.arity1).reduce (_.union.arity2, []) // makes ['col1', 'col2', 'col3'] by unifying objects keys
        var lines       = log.columns ( [columnsDef].concat (
                                            _.map (arrayOfObjects, function (object) {
                                                                        return columnsDef.map (_.propertyOf (object)) })), {
                                        maxTotalWidth: 120,
                                        minColumnWidths: columnsDef.map (_.property ('length')) })

        return [lines[0], log.thinLine[0].repeats (lines[0].length), _.rest (lines)].flat.join ('\n') },

    /*  Layout algorithm for ASCII sheets (v 2.0)
     */
    columns: function (rows, cfg_) {
        if (rows.length === 0) {
            return [] }
        else {
            
            /*  convert column data to string, taking first line
             */
            var rowsToStr       = rows.map (_.map.tails2 (function (col) { return (col + '').split ('\n')[0] }))

            /*  compute column widths (per row) and max widths (per column)
             */
            var columnWidths    = rowsToStr.map (_.map.tails2 (_.property ('length')))
            var maxWidths       = columnWidths.zip (_.largest)

            /*  default config
             */
            var cfg             = cfg_ || { minColumnWidths: maxWidths, maxTotalWidth: 0 }

            /*  project desired column widths, taking maxTotalWidth and minColumnWidths in account
             */
            var totalWidth      = _.reduce (maxWidths, _.sum, 0)
            var relativeWidths  = _.map (maxWidths, _.muls (1.0 / totalWidth))
            var excessWidth     = Math.max (0, totalWidth - cfg.maxTotalWidth)
            var computedWidths  = _.map (maxWidths, function (w, i) {
                                                        return Math.max (cfg.minColumnWidths[i], Math.floor (w - excessWidth * relativeWidths[i])) })

            /*  this is how many symbols we should pad or cut (per column)
             */
            var restWidths      = columnWidths.map (function (widths) { return [computedWidths, widths].zip (_.subtract) })

            /*  perform final composition
             */
            return [rowsToStr, restWidths].zip (
                 _.zap.tails (function (str, w) { return w >= 0 ? (str + ' '.repeats (w)) : (_.initial (str, -w).join ('')) })
                 .then (_.joinsWith ('  ')) ) } }
})


if (Platform.NodeJS) {
    module.exports = log }



/*  Concurrency primitives
 */

/*  Unit test / documentation / specification / how-to.
    ======================================================================== */

_.tests.concurrency = {

    'mapReduce': function (testDone) {

        var data = _.times (42, Format.randomHexString)
        var numItems = 0

        /*  Keep in mind that mapReduce is not linear! It does not guaranteee sequential order of execution,
            it allows out-of-order, and it happens. Of course, you can set maxConcurrency=1, but what's the
            point? For sequential processing, use _.enumerate, as it's way more simple.

            maxConcurrency forbids execution of more than N tasks at once (useful when you have depend on
            limited system resources, e.g. a number of simultaneously open connections / file system handles.

            By default it's equal to array's length, meaning *everything* will be triggered at once. This
            behavior was chosen to force utility user to make decision on it's value, cuz no 'common value'
            exists to be the default one.

            Also, it does not share standard 'reduce' semantics. Reduce operator from FP is known to be
            linear and referentially transparent, and that's neither feasible nor sensible if you need
            to parallelize your tasks. So it's memo is a shared state object/array that is kept until
            execution ends, which you can use as execution context (to not explicitly specify one externally).
         */
        _.mapReduce (data, {
            maxConcurrency: 10,
            memo: {                                 // memo is optional
                processedItems: [],
                skippedItems: [] },

            next: function (item, itemIndex, then, skip, memo) {
                numItems++
                $assert (!_.find (memo.processedItems, item))
                $assert (!_.find (memo.skippedItems, item))

                if (_.random (7) === 0) {
                    memo.skippedItems.push (item)
                    skip () }                       // for short circuiting (not delegating execution to some
                                                    // scheduled utility) use skip (otherwise, a call stack
                                                    // overrun may occur)
                else {
                    _.delay (function () {
                    memo.processedItems.push (item)
                    then () }, _.random (10)) }},   // simulate job

            complete: function (memo) {
                $assert ((memo.processedItems.length + memo.skippedItems.length), data.length)
                testDone () } }) },


    'asyncJoin': function (testDone) {
        var tasksDone = []

        _.asyncJoin ([
            function (done) { _.delay (function () { tasksDone[0] = true; done () }, _.random (20)) },
            function (done) { _.delay (function () { tasksDone[1] = true; done () }, _.random (20)) },
            function (done) { _.delay (function () { tasksDone[2] = true; done () }, _.random (20)) } ],
            function (/* complete */) {
                $assert (_.filter (tasksDone, _.identity).length === 3)
                testDone () }) },


    'interlocked': function (testDone) { var isNowRunning = false
        _.mapReduce (_.times (30, Format.randomHexString), {
                complete: testDone,
                maxConcurrency: 10,
                next: $interlocked (function (item, itemIndex, then, skip, memo, releaseLock) { $assert (!isNowRunning)
                                        isNowRunning = true
                                        _.delay (function () {
                                            then (); isNowRunning = false; releaseLock (); }, _.random (10)) }) }) } }


/*  Actual impl
    ======================================================================== */

_.enumerate = _.cps.each

_.mapReduce = function (array, cfg) {
    
    var cursor = 0
    var complete = false
    var length = (array && array.length) || 0
    var maxPoolSize = cfg.maxConcurrency || length
    var poolSize = 0
    var memo = cfg.memo

    if (length === 0) {
        cfg.complete (cfg.memo || array) }

    else { var fetch = function () {
            while ((cursor < length) && (poolSize < maxPoolSize)) {
                poolSize += 1
                cfg.next (
                    /* item */  array[cursor],
                    /* index */ cursor++,
                    /* done */  function () {
                                    poolSize--
                                    if (!complete) {
                                        if (cursor >= length) {
                                            if (poolSize === 0) {
                                                setTimeout (function () { cfg.complete (cfg.memo || array) }, 0)
                                                complete = true }}
                                            else {
                                                fetch () }} },

                    /* skip */  function () { poolSize-- },
                    /* memo */  memo) }

            if (!complete && (cursor >= length) && (poolSize == 0)) {
                cfg.complete (cfg.memo || array) }}

        fetch () }}


_.asyncJoin = function (functions, complete, context) {
    _.mapReduce (functions, {
        complete: complete.bind (context),
        next: function (fn, i, next, skip) {
            fn.call (context, next, skip) } }) }


/*  Mutex/lock (now supports stand-alone operation, and it's re-usable)
 */
Lock = $prototype ({
    acquire: function (then) {
        this.wait (this.$ (function () {
            if (!this.waitQueue) {
                this.waitQueue = [] }
            then () })) },

    acquired: function () {
        return this.waitQueue !== undefined },

    wait: function (then) {
        if (this.acquired ()) {     
            this.waitQueue.push (then) }
        else {
            then () }},

    release: function () {
        if (this.waitQueue.length) {
            var queueFirst = _.first (this.waitQueue)
            this.waitQueue = _.rest (this.waitQueue)
            queueFirst () }
        else
            delete this.waitQueue } })

   
/*  Adds $interlocked(fn) utility that wraps passed function into lock. Unfortunately,
    it cannot be released automagically © at the moment, because $interlocked does
    not know how to bind to your chains of continuations, and no general mechanism
    exist. Should look into Promise concept (as its now core JS feature)...

    'Release' trigger passed as last argument to your target function.
 */
_.defineKeyword ('interlocked', function (fn) { var lock = new Lock ()
    return _.wrapper (Tags.unwrap (fn), function (fn) {
        lock.acquire (function () {
            fn (lock.$ (lock.release)) }) }) })


if (Platform.NodeJS) {
    module.exports = _ }
/*  NOTE: WIP

    TODO: reference-counted Component

    Component model 2.0 (now exploiting superpowers provided by foundation.js).
    What for:

    -   Hierarchy management (parent-child relationship)
    -   Destructors ('destroy' method), propagating through hierarchy
    -   bindable on $prototypes, auto-disconnecting if involved component gets destroyed
    -   trigger/barrier on $prototypes, auto-disconnecting if involved component gets destroyed

    Component facility provides unified mechanics for deinitialization, thus allowing
    to freely combine distinct components into more complex structure with no need to
    know how to specifically deinitialize each of them.

    Use to define highly configurable/reusable objects having limited lifetime, holding
    system resources and organizing into hierarchies, e.g. UI components, like dialogs,
    menus, embeddable data views. They hold DOM references and bound events, so one needs
    to properly free those resources during deinitialization. Case studies:

    -   For example, a pop-up menu could render itself into top-level 'document' element, 
        so just by destroying its parent component's DOM, things created by this pop-up
        wont be destroyed, and that's why explicit 'destroy' method is needed. With
        Component, you call 'destroy' on parent component, and it propagates to child
        components automatically, triggering their 'destroy' methods.

    -   A component could dynamically bind to other components with help of $bindable and
        $trigger facilities. If such component gets destroyed, those links became invalid
        and should be removed, otherwise it's considered as 'memory leak'. Component handles
        such situation, removing those links if any involved component gets destroyed.

    Component could be considered as basic tool for dynamic code binding at macro level,
    promoting functional code binding tools (defined in dynamic/stream.js) to $prototypes.
 */

_.tests.component = {

    /*  - Passing config to constructor will extend constructed instance with that object
        - Component constructors exhibit CPS interface (last function argument interprets as continuation)
     */
    'constructor([cfg, ][then])': function () { $assertCalls (0, function (mkay) {

        var Compo = $component ({})

        /*  1. constructor (cfg)
         */
        $assertMatches (new Compo ({ foo: 42 }), { foo: 42 })

        /*  2. constructor (then)
         */
        //new Compo (mkay)

        /*  3. constructor (cfg, then)
         */
        /*$assertMatches (new Compo ({ foo: 42 }, mkay), { foo: 42 })*/ }) },


    /*  init() should be entry point to a component, calling at constructor by default
     */
    'init': function () { $assertCalls (1, function (mkay) {
                            $singleton (Component, {
                                init: function () {
                                    mkay () } }) }) },


    /*  init(then) means your initialization is defined in CPS style
     */
    /*'CPS init': function () { $assertCalls (2, function (mkay) {

                            var Compo = $prototype ({
                                init: function (then) { // you're required to call then, to complete init
                                    then () } })

                            var compo = new Compo (function () {
                                mkay () })

                            var compo2 = new Compo ({ _42: 42 }, function () {
                                $assert (this._42, 42)
                                mkay () }) }) },*/

    /*  constructor overriding is prohibited (by $final), use init() API for configuration means
     */
    'no constructor overriding': function () { $assertThrows (function () {
                                        $singleton (Component, {
                                            constructor: function () {} }) }) },


    /*  If you don't want init() to be called at constructor (to call it manually later),
        pass init:false to constructor's config
     */
    'manual init()': function () { $assertCalls (0, function (fail) {
                                        var Compo = $component ({ init: function () { fail () } })
                                        var compo = new Compo ({ init: false })
                                        $assert (typeof compo.init, 'function') }) }, // shouldn't be replaced by false


    /*  initialized is a _.barrier that opens after initialization
     */
    'initialized (barrier)': function () {
        var Compo = $component ({ init: function () {} })
        var compo = new Compo ({ init: false })

        $assert (!compo.initialized.already)
        $assertCalls (1, function (mkay) {
            compo.initialized (function () { mkay () })
            compo.init () }) },


    /*  Pluggable init/destroy with $traits (tests all combinations of CPS / sequential style method calling)
     */
    'pluggable init with $traits': function () {

        var Base = $component ({
            assertBeforeInitCalls: function () {
                $assertMatches (this, { foo: 'beforeInit called' }) } })

        var assertAfterInitCalls = function (Compo) {
            $assertCalls (1, function (mkay) {
                new Compo ().initialized (function () {
                    $assertMatches (this, { foo: 'afterInit called' }); mkay () }) }) }

        var assertTraitsInitCalls = function (trait) {

            //  CPS init()
            $assertCalls (1, function (mkay) {
                assertAfterInitCalls ($extends (Base, {
                    $trait: trait,
                    init: function (then) { this.assertBeforeInitCalls (); mkay (); then () } })) })

            //  Sequential init()
            $assertCalls (1, function (mkay) {
                assertAfterInitCalls ($extends (Base, {
                    $trait: trait,
                    init: function () { this.assertBeforeInitCalls (); mkay () } })) }) }

        //  Sequential afterInit/beforeInit
        assertTraitsInitCalls ($trait ({
            beforeInit: function () { this.foo = 'beforeInit called' },
            afterInit: function () { this.foo = 'afterInit called' } }))

        //  CPS afterInit/beforeInit
        assertTraitsInitCalls ($trait ({
            beforeInit: function (then) { this.foo = 'beforeInit called'; then () },
            afterInit: function (then) { this.foo = 'afterInit called'; then () } })) },


    /*  $defaults is convenient macro to extract _.defaults thing from init() to definition level
     */
    '$defaults': function () {
        var Trait = $trait ({ $defaults: { pff: 'pff' }})
        var Base = $component ({ $defaults: { foo: 12, qux: 'override me' } })
        var Derived = $extends (Base, {
            $trait: Trait,
            $defaults: { bar: 34, qux: 'overriden', obj: {} } })

        $assert (new Derived ().obj !== new Derived ().obj) // should clone $defaults at instance construction

        $assertMatches (new Derived (), { pff: 'pff', foo: 12, bar: 34, qux: 'overriden' }) },


    /*  Use $requires to specify required config params along with their type signatures
     */
    '$requires': function () {
        var SomeType = $prototype ()
        var CompoThatRequires = $component ({
                                    $requires: {
                                        foo: SomeType,                      // requires foo to be instance of SomeType
                                        ffu: { a: 'number', b: 'string' },  // breakdown test
                                        bar: 'number',
                                        qux: ['number'],
                                        baz: _.not (_.isEmpty) } })         // custom requirement predicate


        var DerivedCompoThatRequiresMore =
            $extends (CompoThatRequires, {
                $requires: { more: 'string' } })


        $assertFails (function () {
            new CompoThatRequires ({ baz: {} }) }) // $requires behaves like assertion in case of failure

        $assertFails (function () {
            new DerivedCompoThatRequiresMore ({ more: 'hey how about other requirements' }) })

        new DerivedCompoThatRequiresMore ({
            foo: new SomeType (),
            bar: 42,
            qux: [1,2,3],
            more: 'blah blah',
            ffu: { a: 1, b: '2' },
            baz: 'blahblah' }) },


    /*  $overrideThis is a macro that requires a method to be overriden
     */
    /*'overrideThis': function () {
        $assertThrows (function () { $singleton (Component, { foo: $overrideThis (function () {}) }) },
            _.matches ({ message: 'foo should be overriden' })) },*/


    /*  $bindable lifts _.bindable to Component level, opening new venues to hooking onto existing impl,
        in ad-hoc way, with no need to specify hard-coded callback structure beforehand.

        Use to implement common beforeXXX and afterXXX semantics.
     */
    '$bindable': function () { $assertCalls (3, function (mkay) {

        var compo = $singleton (Component, {
                        method: $bindable (function (x) { mkay ()
                            return 42 }) })

        compo.method.onBefore (function (_5) { mkay ()
            $assert (this === compo)
            $assert (_5, 5) })

        compo.method.onAfter (function (_5, _result) { mkay ()
            $assert (this === compo)
            $assert (_5, 5)
            $assert (_result, 42) })

        $assert (compo.method (5), 42) }) },


    /*  Trigger has many names in outer world, like Event, Signal (and legion of
        many other misleading buzzwords).

        In our implementation, Trigger is a partial case of 'stream' concept, which
        is a highly abstract functional I/O primitive for multicasting of data/events).
        See dynamic/stream.js for its amazingly simple implementation.

            1.  If called with some value arguments (or no argument), it performs
                multicast of these arguments to all bound listeners (readers).
                In terms of 'streams' that operation is called 'write'.

            2.  If called with function argument, it adds that function to the wait
                queue mentioned before. In terms of 'streams' it is called 'read'.

        Component manages those streams (defined by $-syntax at its prototype definition),
        auto-disconnecting bound methods, so that no method of Component bound
        to such streams will ever be called after destroy().
     */
    '$trigger': function () { $assertCalls (2, function (mkay) {
        
        var compo = $singleton (Component, {
                        mouseMoved: $trigger () })

        compo.mouseMoved (function (x, y) { $assert ([x, y], [7, 12]); mkay () })
        compo.mouseMoved (7, 12)
        compo.mouseMoved (7, 12) }) },


    /*  A variation of trigger. On 'write' operation, it flushes wait queue, so
        no callback bound previously gets called in future (until explicitly
        queued again by 'read' operation).
     */
    '$triggerOnce': function () {
        var compo = $singleton (Component, {
                        somthingHappened: $triggerOnce () })

        $assertCalls (2, function (mkay) {
            compo.somthingHappened (function (what) { $assert (what, 'somthin'); mkay () })
            compo.somthingHappened (function (what) { $assert (what, 'somthin'); mkay () })
            compo.somthingHappened ('somthin')  })

        $assertCalls (0, function (mkay) {
            compo.somthingHappened ('no one will receive that') }) },


    /*  Another variation of stream, having 'memory fence / memory barrier' semantics,
        widely known as synchronization primitive in concurrent programming.

            1.  At first, barrier is in closed state, putting any callback passed to it
                to a queue.

            2.  When barrier is called with value argument, it state changes to 'opened',
                triggering all queued callbacks with that value argument passed in.

            3.  After barrier had opened, any futher callback gets called immediately
                with that value argument passed before, i.e. short-circuits.
     */
    '$barrier': function () { $assertCalls (2, function (mkay) {
        
        var compo = $singleton (Component, {
                        hasMessage: $barrier () })

        compo.hasMessage (function (_msg) { $assert (_msg, 'mkay'); mkay () })
        compo.hasMessage ('mkay')
        compo.hasMessage (function (_msg) { $assert (_msg, 'mkay'); mkay () }) }) },


    /*  $observableProperty is a powerful compound mechanism for data-driven dynamic
        code binding, built around streams described previously.
     */
    '$observableProperty': function () { $assertCalls (2, function (mkay) {

        var Compo = $component ({
                        color: $observableProperty ('red'),
                        smell: $observableProperty (),
                        init: function () {
                            this.colorChange (function (now, prev) { mkay ()
                                $assert ([now, prev], ['blue', 'red']) }) } })

        var compo = new Compo ({
            color: 'blue' })

        compo.smellChange (function (now, was) { mkay ()
            $assert (compo.smell, now, 'bad')
            $assert (undefined,   was) })

        compo.smell = 'bad' }) },

    /*  $observableProperty automatically calls prototype constructor if supplied with non-prototype instance data
     */
    '$observableProperty (Prototype)': function () {
        var Compo = $component ({
                        position: $observableProperty (Vec2.zero),
                        init: function () {
                            this.positionChange (function (v) {
                                $assertTypeof (v, Vec2)
                                log.i (v)
                                $assert (v.y, 42) }) } })

        var compo = new Compo ({ position: { x: 10, y: 42 }}) // supply POD value from constructor
        compo.position = { x: 20, y: 42 } },                  // supply POD value from property accessor

    'hierarchy management': function () { $assertCalls (9, function (mkay) {
        
        var Compo = $extends (Component, {
            init:    function () { mkay () },
            destroy: function () { mkay () } })

        var parent = new Compo ().attach (
                        new Compo ().attach (
                            new Compo ()))

        var parrot = new Compo ()
                        .attachTo (parent)
                        .attachTo (parent)

        $assert (parrot.attachedTo === parent)
        $assert (parrot.detach ().attachedTo === undefined)

        var carrot = new Compo ()
        parent.attach (carrot)
        parent.attach (carrot)

        parent.destroy () })},


    'thiscall for streams': function () {
        
        var compo = $singleton (Component, {
            trig: $trigger () })

        compo.trig (function () {
            $assert (this === compo) })

        compo.trig.call ({}) },


    'observableProperty.force (regression)': function () { $assertCalls (1, function (mkay) {
        
        var compo = $singleton (Component, {
            prop: $observableProperty () })

        compo.prop = 42
        compo.propChange (function (value) {
            $assert (value, 42)
            $assert (this === compo)
            mkay () })

        compo.propChange.force () }) },


    'destroyAll()': function () { $assertCalls (2, function (mkay) {
        
        var Compo = $extends (Component, {
            destroy: function () { mkay () } })

        var parent = new Compo ()
                        .attach (new Compo ())
                        .attach (new Compo ())

        $assert (parent.attached.length === 2)

        parent.destroyAll ()
        parent.destroyAll ()

        $assert (parent.attached.length === 0) })},


    /*  Auto-unbinding
     */
    'unbinding (simple)': function () {
        var somethingHappened = _.trigger ()
        var compo = $singleton (Component, { fail: function () { $fail } })

        somethingHappened (compo.fail)
        compo.destroy ()
        somethingHappened () }, // should not invoke compo.fail


    /*  Regression tests
     */
    '(regression) was not able to define inner compos at singleton compos': function () {
        var Foo = $singleton (Component, {
            InnerCompo: $component ({
                foo: $observableProperty () }) })

        var Bar = $extends (Foo.InnerCompo, { bar: $observableProperty () })
        var bar = new Bar ()

        $assertTypeof (_.pick (bar, 'fooChange', 'barChange'), { fooChange: 'function', barChange: 'function' }) },

    '(regression) properties were evaluated before init': function () {
        $singleton (Component, { fail: $property (function () { $fail }) }) },

    '(regression) misinterpretation of definition': function () {
        $singleton (Component, { get: function () { $fail } }) },

    '(regression) alias incorrectly worked with destroy': function () {
            var test = $singleton (Component, {
                destroy: function () { mkay () },
                close: $alias ('destroy') })

            $assert (test.close, test.destroy) } }

/*  Syntax
 */
_([ 'bindable', 'trigger', 'triggerOnce', 'barrier', 'observable', 'observableProperty',
    'memoize', 'memoizeCPS', 'debounce', 'throttle', 'overrideThis'])
    .each (_.defineTagKeyword)

_.defineKeyword ('component', function (definition) {
    return $extends (Component, definition) })


/*  Make $defaults and $requires inherit base values
 */
$prototype.inheritsBaseValues = function (keyword) {
    $prototype.macro (keyword, function (def, value, name, Base) {
        _.defaults (value, Base && Base[keyword])

        if (def.$trait || def.$traits) {
            _.each ((def.$trait && [def.$trait]) || def.$traits, function (Trait) {
                _.defaults (value, Trait[keyword]) }) }

        def[keyword] = $static ($builtin ($property (_.constant (value))))
        return def }) } 

$prototype.inheritsBaseValues ('$defaults')
$prototype.inheritsBaseValues ('$requires')

/*  Impl
 */
Component = $prototype ({

    /*  Syntax helper
     */
    isStreamDefinition: $static (function (def) {
        return _.isObject (def) && (
            def.$trigger || def.$triggerOnce ||
            def.$barrier || def.$observable || def.$observableProperty) }),
    

    /*  Another helper (it was needed because _.methods actually evaluate $property values while enumerating keys,
        and it ruins most of application code, because it happens before Component is actually created).
     */
    enumMethods: function (iterator) {
        var methods = []
        for (var k in this) {
            var def = this.constructor.$definition[k]
            if (!(def && def.$property)) { var fn = this[k]
                if (_.isFunction (fn) && !$prototype.isConstructor (fn))  {
                    iterator.call (this, fn, k) } } } },

    /*  Thou shall not override this
     */
    constructor: $final (function (arg1, arg2) {

        var cfg                 = this.cfg = ((typeof arg1 === 'object') ? arg1 : {}),
            componentDefinition = this.constructor.$definition


        /*  Apply $defaults
         */
        if (this.constructor.$defaults) {
            _.defaults (this, _.cloneDeep (this.constructor.$defaults)) }


        /*  Add thiscall semantics to methods
            TODO: execute this substitution at $prototype code-gen level, not at instance level
         */
        this.enumMethods (function (fn, name) { if (name !== '$' && name !== 'init') { this[name] = this.$ (fn) } })


        /*  Listen self destroy method
         */
        _.onBefore  (this, 'destroy', this.beforeDestroy)
        _.onAfter   (this, 'destroy', this.afterDestroy)


        /*  Apply cfg thing (stream definitions, init and attach will be handled later)
         */
        _.extend (this, {
            parent_: undefined,
            children_: [] },
            _.omit (_.omit (cfg, 'init', 'attachTo', 'attach'), function (v, k) {
                    return Component.isStreamDefinition (componentDefinition[k]) }, this))

        /*  Expand macros
            TODO: execute this substitution at $prototype code-gen level, not at instance level
         */
        _.each (componentDefinition, function (def, name) {

            /*  Expand $observableProperty
             */
            if (def.$observableProperty) { var value = this[name]

                /*  xxxChange stream
                 */
                var observable  = this[name + 'Change'] = value ? _.observable (value) : _.observable ()
                    observable.context    = this

                /*  auto-coercion of incoming values to prototype instance
                 */
                if (_.isPrototypeInstance (value)) { var constructor = value.constructor
                    observable.beforeWrite = function (value) {
                        return constructor.isTypeOf (value) ? value : (new constructor (value)) } }

                /*  property
                 */
                _.defineProperty (this, name, {
                        get: function ()  { return observable.value },
                        set: function (x) { observable.call (this, x) } }) }

            /*  Expand streams
             */
            else if (Component.isStreamDefinition (def)) {
                var stream =    (def.$trigger       ? _.trigger :
                                (def.$triggerOnce   ? _.triggerOnce :
                                (def.$observable    ? _.observable :
                                (def.$barrier       ? _.barrier : undefined)))) (this[name])

                this[name] = _.extend (stream, { context: this }) }

            /*  Expand $bindable
             */
            if (def.$bindable) { $assert (_.isFunction (this[name]))
                this[name] = _.bindable (this[name], this) }

            /*  Expand $debounce
             */
            if (def.$debounce) { var fn = this[name]
                this[name] = _.debounce (fn, fn.wait || 500, fn.immediate) }

            /*  Expand $throttle
             */
            if (def.$throttle) { var fn = this[name]
                this[name] = _.throttle (fn, fn.wait || 500, _.pick (fn, 'leading', 'trailing')) }

            /*  Expand $memoize
             */
                 if (def.$memoize) {
                this[name] = _.memoize (this[name]) }
            else if (def.$memoizeCPS) {
                this[name] = _.cps.memoize (this[name]) } }, this)

        

        /*  Bind stuff to init (either in CPS, or in sequential flow control style)
         */
        _.intercept (this, 'init', function (init) {
            var evalChain = _.hasArgs (this.constructor.prototype.init) ? _.cps.sequence : _.sequence
                evalChain ([this._beforeInit, init.bind (this), this._afterInit]).call (this) })

        /*  Fixup aliases (they're now pointing to nothing probably, considering what we've done at this point)
         */
        _.each (componentDefinition, function (def, name) {
            if (def.$alias) {
                this[name] = this[Tags.unwrap (def)] } }, this)


        /*  Check $overrideThis
         */
        /*_.each (componentDefinition, function (def, name) {
            if (def.$overrideThis && this[name] === undefined) {
                throw new Error (name + ' should be overriden') } })*/


        /*  Check $requires (TODO: make human-readable error reporting)
         */
        if (_.hasAsserts) {
            _.each (this.constructor.$requires, function (contract, name) {
                $assertTypeof (this[name], contract) }, this) }


        /*  Call init (if not marked as deferred)
         */
        if (!(cfg.init === false || (this.constructor.$defaults && (this.constructor.$defaults.init === false)))) {
            this.init () } }),

    /*  Arranges methods defined in $traits in chains and evals them
     */
    callTraitsMethod: function (name, then) {

        //  Continuation-passing style chain
        if (_.isFunction (then)) {
            _.cps.sequence (_.filterMap.call (this, this.constructor.$traits, function (Trait) {
                var method = Trait.prototype[name]
                return method && _.cps.arity0 ((
                    _.noArgs (method) ?             // convert to CPS convention if needed
                        method.asContinuation :
                        method)).bind (this) }).concat (then.arity0)) () }

        //  Sequential style chain
        else {
            _.sequence (_.filterMap.call (this, this.constructor.$traits, function (Trait) {
                var method = Trait.prototype[name]
                return method && (_.hasArgs (method) ?
                                    method.bind (this, _.identity) : // if method is CPS, give identity function as (unused) 'then' argument,
                                    method.bind (this)) })) () } },  // (to prevent errors, as trait methods not required to support both calling styles)

    /*  Lifecycle
     */
    _beforeInit: function (then) {
        if (this.initialized.already) {
            throw new Error ('Component: I am already initialized. Probably you\'re doing it wrong.') }

        this.callTraitsMethod ('beforeInit', then) },

    init: function (/* then */) {},

    _afterInit: function (then) { var cfg = this.cfg

        if (cfg.attach && !_.isFunction (cfg.attach)) {
            this.attach (cfg.attach) }

        if (cfg.attachTo && !_.isFunction (cfg.attachTo)) {
            this.attachTo (cfg.attachTo) }

        /*  Push initial values from cfg to target streams
         */
        _.each (this.constructor.$definition, function (def, name) {
            if (def.$observableProperty) { var change = name + 'Change'
                if (cfg[change])
                    this[change] (cfg[change])
                if (cfg[name]) {
                    this[name] = cfg[name] } }
            else if (Component.isStreamDefinition (def) && cfg[name]) {
                this[name] (cfg[name]) } }, this)

        this.callTraitsMethod ('afterInit', then)

        this.initialized (true) },
    
    initialized: $barrier (),

    beforeDestroy: function () {
        if (this.destroyed_) {
            throw new Error ('Component: I am already destroyed. Probably you\'re doing it wrong.') }
        if (this.destroying_) {
            throw new Error ('Component: Recursive destroy() call detected. Probably you\'re doing it wrong.') }
            this.destroying_ = true

        /*  Unbind streams
         */
        this.enumMethods (_.off)

        /*  Destroy children
         */
        _.each (this.children_, _.method ('destroy'))
                this.children_ = [] },

    destroy: function () {},

    afterDestroy: function () {

        _.each (this.constructor.$traits, function (Trait) {
            if (Trait.prototype.destroy) {
                Trait.prototype.destroy.call (this) } }, this)

        delete this.destroying_
        this.parent_ = undefined
        this.destroyed_ = true },


    /*  Parent manip.
     */ 
    attachedTo: $property (function () {
                            return this.parent_ }),

    attachTo: function (p) {
                    if (p === this) {
                        throw new Error ('smells like time-travel paradox.. how else can I be parent of myself?') }

                    if (this.parent_ !== p) {
                        if ((this.parent_) !== undefined) {
                            this.parent_.children_.remove (this) }
                            
                        if ((this.parent_ = p) !== undefined) {
                            this.parent_.children_.push (this) }} return this },

    detach: function () {
                return this.attachTo (undefined) },

    /*  Child manip.
     */
    attached: $property (function () {
                            return this.children_ }),

    attach: function (c) {
                _.invoke (_.coerceToArray (c), 'attachTo', this); return this },

    detachAll: function () {
                    _.each (this.children_, function (c) { c.parent_ = undefined })
                            this.children_ = []
                            return this },

    destroyAll: function () {
                    _.each (this.children_, function (c) { c.parent_ = undefined; c.destroy () })
                            this.children_ = []
                            return this }

})


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------

Testosterone is a cross-platform unit test shell. Features:

    - asynchronous tests
    - asynchronous assertions
    - log handling (log.xxx calls are scheduled to current test log)
    - exception handling (uncaught exceptions are nicely handled)

------------------------------------------------------------------------
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*  A contract for test routines that says that test should fail and it's the behavior expected
 */
_.defineTagKeyword ('shouldFail')


/*  A contract for custom assertions, says that assertion is asynchronous. Such assertion
    should call Testosterone.
 */
_.defineTagKeyword ('async')


/*  This is test suite for tests framework itself.

    As you can see, tests are defined as _.tests.xxx. So, if you have module called 'foo',
    place tests for that module in _.tests.foo — it will be picked up by tests framework
    automagically ©
 */
_.tests.itself = {

    /*  For reference on basic syntax of assertions, see assert.js, here's only
        extra function provided by this module:
     */

     /* 1.  If an exception is thrown by JS interpreter, it should be handled correctly
            by tests framework, contributing nice error report to test's log.
     */
    'exceptions': $shouldFail (function () {
        someUndefinedShit + someOtherUndefinedShit }),


    /*  3.  To write asynchronous tests, define second argument in your test routine, which
            is 'done' callback. The framework will look into argument count of your routine,
            and if second argument is there, your routine will be considered as asynchronous,
            i.e. not completing until 'done' is explicitly triggered.
     */
    'async': function (done) {
        _.delay (function () {
            done () }) },


    /*  4.  Use $tests to define unit tests on prototypes (works only on stuff in global namespace)
     */
    /*'$tests': function (done) {
        DummyPrototypeWithTests = $prototype ({
            $tests: {
                dummyTest: function () { $assert (true) } } })

        _.delay (function () {
            $assertTypeof (_.tests.DummyPrototypeWithTests &&
                           _.tests.DummyPrototypeWithTests.dummyTest, 'function')

            done () }) }*/
 }


/*  For marking methods in internal impl that should publish themselves as global keywords (like $assert)
 */
_.defineTagKeyword ('assertion')


/*  The mighty framework
 */
Testosterone = $singleton ({

    isRunning: $property (function () {
        return this.currentTest !== undefined }),

    /*  Hook up to assertion syntax defined in common.js
     */
    constructor: function () {

        this.defineAssertion ('assertFails', $shouldFail (function (what) { what.call (this) }))

        _.each (_.omit (_.assertions, 'assertFails'), function (fn, name) {
            this.defineAssertion (name, name in _.asyncAssertions ? $async (fn) : fn) }, this)

        /*  For defining tests inside prototype definitions
         */
        $prototype.macro ('$tests', function (def, value, name) {
            var src = Tags.unwrap (def.$sourceFile)
            _.extend (_.tests[src] || (_.tests[src] = {}), value)

            //Testosterone.findAndPublishPrototypeTests.postpone (); 
            return _.extend (def, _.object ([[name, $static (value)]])) })

        this.run = this.$ (this.run) }, //  I wish I could simply derive from Component.js here for that purpose,
                                        //  but it's a chicken-egg class problem

    /*  $tests publisher
     */
    findAndPublishPrototypeTests: _.trigger (function () {
                                                $prototype.each (function (def, name) {
                                                    if (def.$tests) {
                                                        _.tests[name] = def.$tests } }) }),

    /*  Entry point
     */
    run: $interlocked (function (cfg_, optionalThen) {
        var releaseLock = _.last (arguments)
        var then = arguments.length === 3 ? optionalThen : _.identity
        
        /*  Configuration
         */
        var defaults = {
            silent: true,
            verbose: false,
            timeout: 2000,
            testStarted: function (test) {},
            testComplete: function (test) {} }

        var cfg = this.runConfig = _.extend (defaults, cfg_)

        /*  Read cfg.suites
         */
        var suites = _.map (cfg.suites || [], this.$ (function (suite) {
            return this.testSuite (suite.name, suite.tests, cfg.context) }))

        /*  Pick tests
         */
        var baseTests   = cfg.codebase === false ? [] : this.collectTests ()
        var allTests    = _.flatten (_.pluck (baseTests.concat (suites), 'tests'))
        var selectTests = _.filter (allTests, cfg.shouldRun || _.constant (true))

        /*  Reset context
         */
        this.runningTests = selectTests

        /*  Go
         */
        _.cps.each (selectTests,
                this.$ (this.runTest),
                this.$ (function () {
                            _.assert (cfg.done !== true)
                                      cfg.done   = true

                            this.printLog (cfg)
                            this.failedTests = _.filter (this.runningTests, _.property ('failed'))
                            this.failed = (this.failedTests.length > 0)
                            then (!this.failed)
                            releaseLock () }) ) }),


    /*  You may define custom assertions through this API
     */
    defineAssertions: function (assertions) {
        _.each (assertions, function (fn, name) {
            this.defineAssertion (name, fn) }, this) },

    /*  Internal impl
     */
    runTest: function (test, i, then) { var self = this, runConfig = this.runConfig
        this.currentTest = test
        
        runConfig.testStarted (test)
        
        test.verbose = runConfig.verbose
        test.timeout = runConfig.timeout

        test.run (function () {
            runConfig.testComplete (test)
            delete self.currentTest
            then () }) },

    collectTests: function () {
        return _.map (_.tests, this.$ (function (suite, name) {
            return this.testSuite (name, ((typeof suite === 'function') && _.object ([[name, suite]])) || suite) } )) },

    testSuite: function (name, tests, context) { return {
        name: name,
        tests: _(_.pairs (tests))
                .map (function (keyValue) {
                        return new Test ({ name: keyValue[0], routine: keyValue[1], suite: name, context: context }) }) } },

    defineAssertion: function (name, def) { var self = this

        _.deleteKeyword (name)
        _.defineKeyword (name, Tags.modifySubject (def,

                                    function (fn) { return _.withSameArgs (fn, function () {

                                        if (!self.currentTest) {
                                            return fn.apply (self, arguments) }
                                        else {
                                            return self.currentTest.runAssertion (name, def, fn, arguments) } }) })) },

    printLog: function (cfg) {
        var loggedTests = _.filter (this.runningTests, function (test) { return test.failed || (!cfg.silent && test.hasLog) })
        var failedTests = _.filter (this.runningTests, _.property ('failed'))

        _.invoke (cfg.verbose ? this.runningTests : loggedTests, 'printLog')

        if (failedTests.length) {
            log.orange ('\n' + log.boldLine + '\n' + 'SOME TESTS FAILED:', _.pluck (failedTests, 'name').join (', '), '\n\n') }

        else if (cfg.silent !== true) {
            log.green ('\n' + log.boldLine + '\n' + 'ALL TESTS PASS\n\n') } } })


/*  Encapsulates internals of test's I/O.
 */
Test = $prototype ({

    constructor: function (cfg) {
        _.extend (this, cfg, {
            assertionStack: _.observableRef ([]) })

        _.defaults (this, {
            name:       'youre so dumb you cannot even think of a name?',
            failed:     false,
            routine:    undefined,
            verbose:    false,
            depth:      1,
            context:    this }) },

    currentAssertion: $property (function () {
        return this.assertionStack.value[0] }),

    waitUntilPreviousAssertionComplete: function (then) {
        if (this.currentAssertion && this.currentAssertion.async) {
            this.assertionStack.when (_.isEmpty, function () {
                then () }) }
        else {
            then () } },

    runAssertion: function (name, def, fn, args) { var self = this

        var assertion = {
            name: name,
            async: def.$async,
            shouldFail: def.$shouldFail,
            depth: self.depth + self.assertionStack.value.length + 1,
            location: def.$async ? $callStack.safeLocation (2) : undefined }

        this.waitUntilPreviousAssertionComplete (function () {

            if (assertion.async) {
                assertion = new Test (_.extend (assertion, {
                    context: self.context,
                    timeout: self.timeout / 2,
                    routine: Tags.modifySubject (def, function (fn) {
                        return function (done) {
                            _.cps.apply (fn, self.context, args, function (args, then) {
                                if (!assertion.failed && then) {
                                    then.apply (self.context, args) }
                                done () }) } }) }))

                self.beginAssertion (assertion)

                assertion.run (function () {
                    if (assertion.failed && self.fail ()) {
                        assertion.location.sourceReady (function (src) {
                            log.red (src, log.config ({ location: assertion.location, where: assertion.location }))
                            assertion.evalLogCalls ()
                            self.endAssertion (assertion) }) }
                    else {
                        self.endAssertion (assertion) } }) }

            else {
                self.beginAssertion (assertion)

                try {
                    var result = fn.apply (self.context, args)
                    self.endAssertion (assertion)
                    return result }

                catch (e) {
                    self.onException (e)
                    self.endAssertion (assertion) } } }) },

    beginAssertion: function (a) {
        if (a.async) {
            Testosterone.currentTest = a }
        this.assertionStack ([a].concat (this.assertionStack.value)) },

    endAssertion: function (a) {
        if (Testosterone.currentTest === a) {
            Testosterone.currentTest = this }

        if (a.shouldFail && !a.failed) {
            this.onException (_.assertionError ({ notMatching: 'not failed (as should)' })) }

        this.assertionStack (_.without (this.assertionStack.value, a)) },

    fail: function () {
        var shouldFail = _.find (_.rest (this.assertionStack.value), _.matches ({ shouldFail: true }))

        if (shouldFail) {
            shouldFail.failed = true
            return false }

        else {
            this.failed = true
            return true } },

    mapStackLocations: function (error, then) {

        var assertionStack  = this.assertionStack.value.copy,
            callStack       = CallStack.fromError (error)
        
        callStack.sourcesReady (function () {

            then (_.map (assertionStack, function (assertion) {

                var found = _.find (callStack, function (loc, index) {
                    if ((assertion.location && CallStack.locationEquals (loc, assertion.location)) ||
                        (loc.source.indexOf ('$' + assertion.name) >= 0)) {
                            callStack = callStack.offset (index + 1)
                            return true } })

                return found || assertion.location || callStack.safeLocation (5) })) }) },

    onException: function (e, then) { var self = this

        if (this.done) {
            throw e } // not our exception, re-throw

        if (!this.fail ()) {
            if (then) {
                then.call (this) } }

        else {
            this.mapStackLocations (e, function (locations) {

                if (self.logCalls.length > 0) {
                    log.newline () }

                //  $assertMatches (blabla...
                _.each (locations.reversed, function (loc, i) {
                    if (loc) {
                        log.red (log.config ({ indent: i, location: true, where: loc }), loc.source) } })
                
                if (_.isAssertionError (e)) {
                    //  • a
                    //  • b
                    if ('notMatching' in e) { var notMatching = _.coerceToArray (e.notMatching)
                        if (e.asColumns) {
                            log.orange (log.indent (locations.length),
                                log.columns (_.map (notMatching, function (obj) {
                                    return ['• ' + _.keys (obj)[0], _.stringify (_.values (obj)[0])] })).join ('\n')) }
                        else {
                            _.each (notMatching, function (what, i) {
                                log.orange (log.indent (locations.length), '•', what) }) } } }
                        
                    // print exception
                else {
                    log.write (log.indent (locations.length), e) }

                log.newline ()

                if (then) {
                    then.call (self) } }) } },

    tryCatch: function (routine, then) { var self = this
                                                    self.afterUnhandledException = then
        routine.call (self.context, function () {   self.afterUnhandledException = undefined
            then () }) },

    onUnhandledException: function (e) {
        this.onException (e, function () {
            if (this.afterUnhandledException) {
                var fn =    this.afterUnhandledException
                            this.afterUnhandledException = undefined
                    fn () } }) },

    run: function (then) { var self = this
        this.failed = false
        this.hasLog = false
        this.logCalls = []
        this.assertionStack ([])
        this.failureLocations = {}

        var routine     = Tags.unwrap (this.routine)
        var doRoutine   = function (then) {
                                var done = function () {
                                                self.done = true
                                                then () }
                                try { 
                                    if (_.noArgs (routine)) {
                                        routine.call (self.context)
                                        done () }
                                    else {
                                        self.tryCatch (routine, done) } }

                                catch (e) {
                                    self.onException (e, then) } }

        var beforeComplete = function () {
            if (self.routine.$shouldFail) {
                self.failed = !self.failed }
            
            if (!(self.hasLog = (self.logCalls.length > 0))) {
                if (self.failed) {
                    log.red ('FAIL') }
                else if (self.verbose) {
                    log.green ('PASS') } } }

        var timeoutExpired = function (then) {
                                self.failed = true
                                log.error ('TIMEOUT EXPIRED')
                                then () }

        var waitUntilAssertionsComplete = function (then) {
                                                self.assertionStack.when (_.isEmpty, then) }

        var withTimeout     = _.withTimeout.partial ({ maxTime: self.timeout, expired: timeoutExpired })
        
        var withLogging     = log.withCustomWriteBackend.partial (
                                    _.extendWith ({ indent: self.depth }, function (args) {
                                        self.logCalls.push (args) }))

        var withExceptions  = _.withUncaughtExceptionHandler.partial (self.$ (self.onUnhandledException))

        
        withLogging (           function (doneWithLogging) {
            withExceptions (    function (doneWithExceptions) {
                withTimeout (   function (doneWithTimeout) {
                                    _.cps.sequence (
                                        doRoutine,
                                        waitUntilAssertionsComplete,
                                        doneWithTimeout) () },

                                function () {
                                    beforeComplete ()
                                    doneWithExceptions ()
                                    doneWithLogging ()

                                    then () }) }) }) },

    printLog: function () {
        var index = Testosterone.runningTests.indexOf (this) + 1
        var total = Testosterone.runningTests.length

        log.write (log.color.blue,
            '\n' + log.boldLine,
            '\n' + ((this.suite !== this.name && this.suite.quote ('[]')) || ''),
            this.name,
            (index + ' of ' + total).quote ('()') +
            (this.failed ? ' FAILED' : '') + ':',
            '\n')

        this.evalLogCalls () },

    evalLogCalls: function () {
        _.each (this.logCalls, function (args) { log.impl.writeBackend (args) }) } })


if (Platform.NodeJS) {
    module.exports = Testosterone }
/*  Context-free math functions
    ======================================================================== */

_.clamp = function (n, min, max) {
    return Math.max (min, Math.min (max, n)) }

_.lerp = function (t, min, max) {
    return min + (max - min) * t }

_.rescale = function (v, from, to, opts) { var unit = (v - from[0]) / (from[1] - from[0])
    return _.lerp (opts && opts.clamp ? _.clamp (unit, 0, 1) : unit, to[0], to[1]) }

_.sqr = function (x) { return x * x }

/*  2-dimensional vector
    ======================================================================== */

Vec2 = $prototype ({

    $static: {
        zero:        $property (function () { return new Vec2 (0, 0) }),
        unit:        $property (function () { return new Vec2 (1, 1) }),
        one:         $alias ('unit'),
        fromLT:      function (lt) { return new Vec2 (lt.left, lt.top) },
        fromWH:      function (wh) { return new Vec2 (wh.width, wh.height) },
        fromLeftTop:     $alias ('fromLT'),
        fromWidthHeight: $alias ('fromWH'),
        dot:         function (a, b) { return a.x * b.x + a.y * b.y },
        lerp:        function (t, a, b) { return new Vec2 (_.lerp (t, a.x, b.x), _.lerp (t, a.y, b.y)) },
        clamp:       function (n, a, b) { return new Vec2 (_.clamp (n.x, a.x, b.x), _.clamp (n.y, a.y, b.y)) } },

    constructor: function (x, y) {
        if (arguments.length === 1) {
            if (_.isNumber (x)) {
                this.x = this.y = x }
            else {
                this.x = x.x
                this.y = x.y } }
        else {
            this.x = x
            this.y = y } },

    length:        $property (function () { return Math.sqrt (this.lengthSquared) }),
    lengthSquared: $property (function () { return this.x * this.x + this.y * this.y }),

    add: function (a, b) {
        if (b === undefined) {
            return new Vec2 (this.x + a.x, this.y + a.y) }
        else {
            return new Vec2 (this.x + a, this.y + b) } },

    sub: function (other) {
        return new Vec2 (this.x - other.x, this.y - other.y) },

    scale: function (tx, ty) {
        return new Vec2 (this.x * tx, this.y * (ty === undefined ? tx : ty)) },

    mul: function (other) {
        return new Vec2 (this.x * other.x, this.y * other.y) },

    divide: function (other) {
        return new Vec2 (this.x / other.x, this.y / other.y) },

    normal: $property (function () {
        return this.scale (1.0 / this.length) }),

    perp: $property (function () {
        return new Vec2 (this.y, -this.x) }),

    half: $property (function () {
        return new Vec2 (this.x * 0.5, this.y * 0.5) }),

    inverse: $property (function () {
        return new Vec2 (-this.x, -this.y) }),

    asLeftTop: $property (function () {
        return { left: Math.floor (this.x), top: Math.floor (this.y) } }),

    asLeftTopMargin: $property (function () {
        return { marginLeft: Math.floor (this.x), marginTop: Math.floor (this.y) } }),

    asWidthHeight: $property (function () {
        return { width: Math.floor (this.x), height: Math.floor (this.y) } }),

    floor: $property (function () {
        return new Vec2 (Math.floor (this.x), Math.floor (this.y)) }),

    sum: $static (function (arr) {
        return _.reduce ((_.isArray (arr) && arr) || _.asArray (arguments),
            function (memo, v) { return memo.add (v || Vec2.zero) }, Vec2.zero) }),

    toString: function () {
        return '{' + this.x + ',' + this.y + '}' },

    projectOnCircle: function (center, r) {
        return center.add (this.sub (center).normal.scale (r)) },

    projectOnLineSegment: function (v, w) {
        var wv = w.sub (v)
        var l2 = wv.lengthSquared
        if (l2 == 0) return v
        var t = Vec2.dot (this.sub (v), wv) / l2
        if (t < 0) return v
        if (t > 1) return w
        return v.add (wv.scale (t)) } })


/*  Cubic bezier
    ======================================================================== */

Bezier = {

    cubic: function (t, p0, p1, p2, p3) {
        var cube = t * t * t
        var square = t * t
        var ax = 3.0 * (p1.x - p0.x);
        var ay = 3.0 * (p1.y - p0.y);
        var bx = 3.0 * (p2.x - p1.x) - ax;
        var by = 3.0 * (p2.y - p1.y) - ay;
        var cx = p3.x - p0.x - ax - bx;
        var cy = p3.y - p0.y - ay - by;
        var x = (cx * cube) + (bx * square) + (ax * t) + p0.x;
        var y = (cy * cube) + (by * square) + (ay * t) + p0.y;
        return new Vec2 (x, y) },
        
    cubic1D: function (t, a, b, c, d) {
        return Bezier.cubic (t, Vec2.zero, new Vec2 (a, b), new Vec2 (c, d), Vec2.one).y },

    make: {
        
        cubic:   function (a,b,c,d) { return function (t) { return Bezier.cubic   (t,a,b,c,d) } },
        cubic1D: function (a,b,c,d) { return function (t) { return Bezier.cubic1D (t,a,b,c,d) } } } }


/*  Bounding box (2D)
    ======================================================================== */

BBox = $prototype ({

    $static: {

        zero: $property (function () {
            return new BBox (0, 0, 0, 0) }),

        unit: $property (function () {
            return new BBox (0, 0, 1, 1) }),

        fromLeftTopAndSize: function (pt, size) {
            return BBox.fromLTWH ({ left: pt.x, top: pt.y, width: size.x, height: size.y }) },

        fromLTWH: function (r) {
            return new BBox (r.left + r.width / 2.0, r.top + r.height / 2.0, r.width, r.height) },

        fromLTRB: function (r) {
            return new BBox (_.lerp (0.5, r.left, r.right), _.lerp (0.5, r.top, r.bottom), r.right - r.left, r.bottom - r.top) },

        fromSizeAndCenter: function (size, center) {
            return new BBox (center.x - size.x / 2.0, center.y - size.y / 2.0, size.x, size.y) },

        fromSize: function (a, b) {
            if (b) {
                return new BBox (-a / 2.0, -b / 2.0, a, b) }
            else {
                return new BBox (-a.x / 2.0, -a.y / 2.0, a.x, a.y) } },
        
        fromPoints: function (pts) { var l = Number.MAX_VALUE, t = Number.MAX_VALUE, r = Number.MIN_VALUE, b = Number.MIN_VALUE
            _.each (pts, function (pt) {
                l = Math.min (pt.x, l)
                t = Math.min (pt.y, t)
                r = Math.max (pt.x, r)
                b = Math.max (pt.y, b) })
            return BBox.fromLTRB ({ left: l, top: t, right: r, bottom: b }) } },

    constructor: function (x, y, w, h) {
        if (arguments.length == 4) {
            this.x = x
            this.y = y
            this.width = w
            this.height = h }
        else {
            _.extend (this, x) } },

    classifyPoint: function (pt) {
        
        var sides = _.extend (

            (pt.x > this.right)   ? { right   : true } : {},
            (pt.x < this.left)    ? { left    : true } : {},
            (pt.y > this.bottom)  ? { bottom  : true } : {},
            (pt.y < this.top)     ? { top     : true } : {})
        
        return _.extend (sides,

            (!sides.left &&
             !sides.right &&
             !sides.bottom && !sides.top) ? { inside: true } : {}) },

    classifyRay: function (pos, delta, paddingX, paddingY) { paddingX = paddingX || 0; paddingY = paddingY || 0

        var half = this.size.half

        var farTime, farTimeX, farTimeY, hit, nearTime, nearTimeX, nearTimeY, scaleX, scaleY, signX, signY;

        scaleX = 1.0 / delta.x;
        scaleY = 1.0 / delta.y;
        signX = Math.sign(scaleX);
        signY = Math.sign(scaleY);
        nearTimeX = (this.x - signX * (half.x + paddingX) - pos.x) * scaleX;
        nearTimeY = (this.y - signY * (half.y + paddingY) - pos.y) * scaleY;
        farTimeX = (this.x + signX * (half.x + paddingX) - pos.x) * scaleX;
        farTimeY = (this.y + signY * (half.y + paddingY) - pos.y) * scaleY;
        if (nearTimeX > farTimeY || nearTimeY > farTimeX) {
            return undefined;
        }
        nearTime = nearTimeX > nearTimeY ? nearTimeX : nearTimeY;
        farTime = farTimeX < farTimeY ? farTimeX : farTimeY;
        if (nearTime >= 1 || farTime <= 0) {
            return undefined;
        }
        var hit = { time: _.clamp (nearTime, 0, 1) }
        if (nearTimeX > nearTimeY) {
            hit.normal = new Vec2 (-signX, 0)
        } else {
            hit.normal = new Vec2 (0, -signY)
        }
        hit.delta = delta.scale (hit.time)
        hit.where = pos.add (hit.delta)
        return hit;
    },

    nearestPointTo: function (pt, cornerRadius) { var r = cornerRadius || 0

        var a = new Vec2 (this.left,  this.top),
            b = new Vec2 (this.right, this.top),
            c = new Vec2 (this.right, this.bottom),
            d = new Vec2 (this.left,  this.bottom)

        var pts = [ pt.projectOnLineSegment (a.add (r, 0),  b.add (-r, 0)),  // top
                    pt.projectOnLineSegment (b.add (0, r),  c.add (0, -r)),  // right
                    pt.projectOnLineSegment (c.add (-r, 0), d.add (r, 0)),   // bottom
                    pt.projectOnLineSegment (d.add (0, -r), a.add (0, r)),   // left

                    pt.projectOnCircle (a.add ( r,  r), r),
                    pt.projectOnCircle (b.add (-r,  r), r),
                    pt.projectOnCircle (c.add (-r, -r), r),
                    pt.projectOnCircle (d.add ( r, -r), r) ]

        return _.min (pts, function (test) { return pt.sub (test).length }) },

    clone: $property (function () {
        return new BBox (this.x, this.y, this.width, this.height) }),
    
    floor: $property (function () {
        return new Vec2 (Math.floor (this.x), Math.floor (this.y)) }),

    css: $property (function () {
        return { left: this.left, top: this.top, width: this.width, height: this.height } }),

    leftTop: $property (function () {
        return new Vec2 (this.left, this.top) }),

    rightBottom: $property (function () {
        return new Vec2 (this.right, this.bottom) }),

    left: $property (function () {
        return this.x - this.width / 2.0 }),

    right: $property (function () {
        return this.x + this.width / 2.0 }),

    top: $property (function () {
        return this.y - this.height / 2.0 }),

    bottom: $property (function () {
        return this.y + this.height / 2.0 }),

    center: $property (function () {
        return new Vec2 (this.x, this.y) }),

    size: $property (function () {
        return new Vec2 (this.width, this.height) }),

    offset: function (amount) {
        return new BBox (this.x + amount.x, this.y + amount.y, this.width, this.height) },

    newWidth: function (width) {
        return new BBox (this.x - (width - this.width) / 2.0, this.y, width, this.height) },

    grow: function (amount) {
        return new BBox (this.x, this.y, this.width + amount, this.height + amount) },

    area: $property (function () {
        return Math.abs (this.width * this.height) }),

    toString: function () {
        return '{' + this.x + ',' + this.y + ':' + this.width + '×' + this.height + '}' } })


/*  3x3 affine transform matrix, encoding scale/offset/rotate/skew in 2D
    ======================================================================== */

Transform = $prototype ({

    svgMatrix: $static (function (m) {
                            return new Transform ([
                                [m.a, m.c, m.e],
                                [m.b, m.d, m.f],
                                [0.0, 0.0, 1.0] ]) }),

    constructor: function (components) {
                    this.components = components || [
                        [1.0, 0.0, 0.0],
                        [0.0, 1.0, 0.0],
                        [0.0, 0.0, 1.0]] },

    multiply: function (m) {
                    var result = [[0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]]
                    var i, j, k, a = this.components, b = m.components;
                    for (i = 0; i < 3; i++) {
                        for (j = 0; j < 3; j++) {
                            for (k = 0; k < 3; k++) {
                                   result[i][j] += a[i][k] * b[k][j] } } }

                    return new Transform (result) },

    translate: function (v) {
                    return this.multiply (new Transform ([
                        [1.0, 0.0, v.x],
                        [0.0, 1.0, v.y],
                        [0.0, 0.0, 1.0] ])) },

    scale: function (s) {
                return this.multiply (new Transform ([
                    [s,   0.0, 0.0],
                    [0.0, s,   0.0],
                    [0.0, 0.0, 1.0] ])) },

    inverse: $property ($memoized (function () { var m = this.components
                                        var id = (1.0 / 
                                                    (m[0][0] * (m[1][1] * m[2][2] - m[2][1] * m[1][2]) -
                                                     m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
                                                     m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])))

                                        return new Transform ([[

                                                 (m[1][1]*m[2][2]-m[2][1]*m[1][2])*id,          // 0 0
                                                -(m[0][1]*m[2][2]-m[0][2]*m[2][1])*id,          // 0 1
                                                 (m[0][1]*m[1][2]-m[0][2]*m[1][1])*id],         // 0 2

                                                [(m[1][0]*m[2][2]-m[1][2]*m[2][0])*id,          // 1 0
                                                 (m[0][0]*m[2][2]-m[0][2]*m[2][0])*id,          // 1 1
                                                -(m[0][0]*m[1][2]-m[1][0]*m[0][2])*id],         // 1 2

                                                [(m[1][0]*m[2][1]-m[2][0]*m[1][1])*id,          // 2 0
                                                -(m[0][0]*m[2][1]-m[2][0]*m[0][1])*id,          // 2 1
                                                 (m[0][0]*m[1][1]-m[1][0]*m[0][1])*id] ]) })),  // 2 2
        
    unproject: function (v) {
                    var m = this.components
                    return new Vec2 (
                        v.x * m[0][0] + v.y * m[0][1] + m[0][2],
                        v.x * m[1][0] + v.y * m[1][1] + m[1][2]) },

    project: function (v) {
                return this.inverse.unproject (v) } })


/*  Generates random number generator
    ======================================================================== */

_.rng = function (seed, from, to) {
    var m_w = seed;
    var m_z = 987654321;
    var mask = 0xffffffff;
    return function () {
        m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
        m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
        var result = ((m_z << 16) + m_w) & mask;
        result /= 4294967296;
        result += 0.5
        if (from === undefined && to === undefined) {
            return result }
        else {
            return Math.round (from + result * (to - from)) } } }


/*  Kind of Brezenham algorithm for 1D
    ======================================================================== */

_.equalDistribution = function (value, n) {
    var average = value / n
    var realLeft = 0.0
    return _.times (n, function () {
        var left = Math.round (realLeft)
        var right = Math.round (realLeft += average)
        var rough = Math.floor (right - left)
        return rough }) }


/*  DEPRECATED: use BBox utility
    ======================================================================== */

_.ptInRect = function (pt, rect) {
    return ((pt.x >= rect.left) && (pt.y >= rect.top) && (pt.x < rect.right) && (pt.y < rect.bottom)) }


/*  Color utility
    ======================================================================== */

_.hue2CSS = function (H, a)   { return _.RGB2CSS (_.hue2RGB (H), a)       }
_.HSL2CSS = function (hsl, a) { return _.RGB2CSS (_.HSL2RGB (hsl), a) }

_.HSL2RGB = function (hsl) { var h = hsl[0], s = hsl[1], l = hsl[2]
    var rgb = _.hue2RGB (h)
    var c = (1.0 - Math.abs (2.0 * l - 1.0)) * s
    return [(rgb[0] - 0.5) * c + l,
            (rgb[1] - 0.5) * c + l,
            (rgb[2] - 0.5) * c + l] }

_.hue2RGB = function (hue) {
    return [Math.max (0.0, Math.min (1.0, Math.abs (hue * 6.0 - 3.0) - 1.0)),
            Math.max (0.0, Math.min (1.0, 2.0 - Math.abs (hue * 6.0 - 2.0))),
            Math.max (0.0, Math.min (1.0, 2.0 - Math.abs (hue * 6.0 - 4.0)))] }

_.RGB2CSS = function (rgb, a) {
    return 'rgba(' +
        Math.round (rgb[0] * 255) + ',' +
        Math.round (rgb[1] * 255) + ',' +
        Math.round (rgb[2] * 255) + ',' + (a === undefined ? (rgb[3] === undefined ? 1.0 : rgb[3]) : a) + ')' }

_.RGB2HSL = function (rgb, a_) {
    var r = rgb[0], g = rgb[1], b = rgb[2], a = (a_ === undefined ? rgb[3] : a_)
    var max = Math.max (r, g, b), min = Math.min (r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0 }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break; }
        h /= 6 }
    return a === undefined ? [h, s, l] : [h, s, l, a] }
    

/*  Advanced rounding utility
    ======================================================================== */

_.extend (Math, (function (decimalAdjust) {
    return {
        roundTo: function (value, precision) {
            return value - (value % precision)
        },
        round10: function(value, exp) {
            return decimalAdjust ('round', value, exp);
        },
        floor10: function(value, exp) {
            return decimalAdjust ('floor', value, exp);
        },
        ceil10: function(value, exp) {
            return decimalAdjust ('ceil', value, exp);
        }
    }
}) (function /* decimalAdjust */ (type, value, exp) {

    /**
     * Decimal adjustment of a number.
     *
     * @param   {String}    type    The type of adjustment.
     * @param   {Number}    value   The number.
     * @param   {Integer}   exp     The exponent (the 10 logarithm of the adjustment base).
     * @returns {Number}            The adjusted value.
     */

    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
        return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}))
_.deferTest ('regexp helper', function () { var $assertExpr = function (a, b) { $assert (a, _.quote (b.str, '//')) }

    /*  R should be used for code clarity purposes when one needs to generate a
        complex regular expression that is hard to read and maintain.
     */
    $assertExpr ('/[^\\s]*/',        $r.anyOf.except.space.$)
    $assertExpr ('/\\[.*\\]|[\\s]/', $r.anything.inBrackets.or.oneOf.space.$)

    var expr = $r.expr ('before',    $r.anything.text ('$print').something).then (
               $r.expr ('argument',  $r.someOf.except.text (',(')).inParentheses.then (
               $r.expr ('tail',      $r.anything))).$

    /*  Above construction generates the following regular expression
     */
    $assertExpr ('/(.*\\$print.+)\\(([^,\\(]+)\\)(.*)/', expr)

    /*  Main feature: named groups, easily accessible as dictionary elements.
     */
    $assert (expr.parse ( ' var x = $print (blabla) // lalala '),

              {  before:  ' var x = $print ',
               argument:  'blabla',              
                   tail:  ' // lalala ',        })

    /*  Based on Lisp-like list based syntax, for easy programmatic generation and stuff
     */
    $assert ([['[^', '\\s', "\]"], '*'], R.anyOf (R.except (R.space))) },                       function () {

    /*  Implementation
     */
    R = $singleton ({

        constructor: function () {

            this.reduce = _.hyperOperator (_.binary, _.reduce2,
                                            _.goDeeperAlwaysIfPossible,
                                            _.isNonTrivial.and (_.not (this.isSubexpr)))

            this.initDSL () },

        expr: function (expr, subexprs) { subexprs = subexprs || []
                return new R.Expr (R.reduce (expr, '', function (s, memo) {
                                                            if (R.isSubexpr (s)) { subexprs.push (s)
                                                                return memo + R.expr (R.root (s.value), subexprs).str }
                                                            else {
                                                                return memo + s } }), subexprs) },

        Expr: $prototype ({

            constructor: function (str, subexprs) {
                            this.rx = new RegExp ()
                            this.rx.compile (str)
                            this.str = str
                            this.subexprs = subexprs },

            parse: function (str) {
                    var match = str.match (this.rx)
                return (match && _.extend.apply (null,
                                    _.zipWith ([_.rest (match), this.subexprs], function (match, subexpr) {
                                                                                    return _.object ([[ subexpr.name, match ]]) }))) || {} } }),

        metacharacters: $property (_.index ('\\^$.|?*+()[{')),

        escape:       function (s)    { return _.map (s, function (x) { return R.metacharacters[x] ? ('\\' + x) : x }).join ('') },

        text:         $alias ('escape'),

        subexpr:      function (name, s) { return { name: name, value: ['(', s, ')'] } },
     
        maybe:        function (s)    { return [s, '?'] },

        anyOf:        function (s)    { return [s, '*'] },
        someOf:       function (s)    { return [s, '+'] },

        oneOf:        function (s)    { return ['[',  s, ']'] },
        except:       function (s)    { return ['[^', s, ']'] },

        or:           function (a, b) { return [a, '|', b] },

        begin:       $property ('^'),
        end:         $property ('$'),
        space:       $property ('\\s'),
        maybeSpaces: $property ('\\s*'),
        spaces:      $property ('\\s+'),
        anything:    $property ('.*'),
        something:   $property ('.+'),
        comma:       $property (','),

        parentheses: function (s) { return ['\\(', s, '\\)'] },
        brackets:    function (s) { return ['\\[', s, '\\]'] },

        isSubexpr: function (s) { return (_.isStrictlyObject (s) && !_.isArray (s)) ? true : false },

        root: function (r) { return (r && r.$$) ? r.$$ : r },

        initDSL: function () {

            _.defineKeyword ( 'r', function ()       { return $$r ([]) })
            _.defineKeyword ('$r', function (cursor) {

                var shift = function (x) { cursor.push (x); return cursor.forward }

                _.defineHiddenProperty (cursor, 'then', function (x)    { cursor.push (R.root (x));                return cursor })
                _.defineHiddenProperty (cursor, 'text', function (x)    { cursor.push (R.text (x));                return cursor })
                _.defineHiddenProperty (cursor, 'expr', function (x, s) { cursor.push (R.subexpr (x, R.root (s))); return cursor })

                _.defineHiddenProperty (cursor, 'forward', function () {
                    return cursor.next || ((cursor.next = $r).prev = cursor).next })

                _.each (['maybe', 'anyOf', 'someOf', 'oneOf', 'except'], function (key) {
                    _.defineHiddenProperty (cursor, key, function () {
                        return shift (R[key] (cursor.forward)) }) })

                _.each (['parentheses', 'brackets'], function (key) {
                    _.defineHiddenProperty (cursor, 'in' + key.capitalized, function () {
                        return (cursor.$$.prev = $$r (R[key] (cursor.$$))) }) })

                _.each (['or'], function (key) {
                    _.defineHiddenProperty (cursor, key, function () { var next = $r
                        return (next.prev = (cursor.$$.prev = $$r (R[key] (cursor.$$, next)))).next = next }) })

                _.each (['begin', 'end', 'space', 'anything', 'something'], function (key) {
                    _.defineHiddenProperty (cursor, key, function () {
                        return shift ([R[key], cursor.forward]); }) })

                _.defineHiddenProperty (cursor, '$$', function () { var root = cursor
                    while (root.prev) { root = root.prev }
                    return root })

                _.defineHiddenProperty (cursor, '$', function () {
                    return R.expr (cursor.$$) })

                return cursor }) } }) })


/*  Experimental stuff
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/* 
    Aspects are units of behavior expressed in terms of ad-hoc
    patching of existing components' internals. They embody the
    powerful idea of a source code patches that are fully defined
    and maintained by sole terms of that source code itself, with
    no help of external tool to operate.

    To better understand why this is reasonable, here's overview
    of every stuff you can use to extend existing behavior of
    a component.

 1. Simply edit the original component, hardwiring desired behavior
    into it. And that's the actual way of how we manage things around,
    not surprisingly.

 2. Good old inheritance. Key difference is that inheritance produces
    new versions of a component. Instead, $aspect will change existing
    one - which is more often scenario.

 3. Traits. Comparing to inheritance, $trait looks similar to $aspect,
    but really they're opposite of each other. Here's why:

    Traits are reasonable when implementing new components. Being
    generic and abstract, $traits sum up inside of a component,
    producing it's final implementation, as seen by it's developer.

 4. Aspects do the exact opposite: they define and carry so-called
   "weak modifications", which are external / temporary / optional /
    situative by nature, as seen by the external user of a component.

    It's something you'd solve with plugins or extensions...
    if only you'd had enough time to pre-mind all possible scenarios
    of code customization. That's why $aspects here.

    They require none, and allow to drop complex pluggable
    architectures completely - to focus on _what_ we do, not how.
*/

_.tests.AOP = {

    'basics': function () {     var callLog = []

                                var Thing = $prototype ($test ({

                                    create:            function (_777)              { callLog.push ([this, 'Thing.create']) },
                                    display:           function (_foobar, _778)     { callLog.push ([this, 'Thing.display']) },
                                    destroy:           function ()                  { callLog.push ([this, 'Thing.destroy']); return 456 } }))

                                var NewFlavorOfThing = $aspect (Thing, $test ({

                                    beforeCreate:   function (_777)                        { callLog.push ([this, 'NewFlavorOfThing.beforeCreate']) },

                                    display:        function (_foo, _123, originalMethod)  { callLog.push ([this, 'NewFlavorOfThing.display']);
                                                                                             return originalMethod.call (this, _foo + 'bar', 778) },

                                    afterDestroy:   function (_456)                        { callLog.push ([this, 'NewFlavorOfThing.afterDestroy']) } }))

                                var demo = new Thing ()

                                demo.create   (777)
                                demo.display  ('foo', 123)
                                demo.destroy  ()

                                $assert (callLog, [[demo, 'NewFlavorOfThing.beforeCreate'],
                                                   [demo,            'Thing.create'      ],
                                                   [demo, 'NewFlavorOfThing.display'     ],
                                                   [demo,            'Thing.display'     ],
                                                   [demo,            'Thing.destroy'     ],
                                                   [demo, 'NewFlavorOfThing.afterDestroy']]) } };


(function () {

    var fnNameExpr = $r.expr ('how', $r.text ('before').or.text ('after')).expr ('name', $r.anything).$

    var tryBind = function (target, methodName, bind, boundMethod) {
        var method = target[methodName]
        if (method && _.isFunction (method)) {
            bind (target, methodName, boundMethod) } }

    _.defineKeyword ('aspect', function (ofWhat, cfg) {

        var aspectDef = Tags.unwrap (_.sequence (
                            $prototype.impl.extendWithTags,
                            $prototype.impl.flatten,
                            $prototype.impl.generateArgumentContractsIfTaggedAsTest,
                            $prototype.impl.contributeTraits,
                            $prototype.impl.expandAliases).call ($prototype.impl, cfg))
        
        var motherDef = ofWhat.constructor && ofWhat.constructor.$definition
        if (motherDef) {
                (motherDef.$aspects = motherDef.$aspects || []).push (aspectDef) }

        _.each (aspectDef, function (value, name) {
        
            if (aspectDef.hasOwnProperty (name) && _.isFunction (value)) {

                var parsed       = fnNameExpr.parse (name)
                var originalName = (parsed.name &&          parsed.name.decapitalized) || name
                var bindTool     = (parsed.how  && _['on' + parsed.how .capitalized])  || _.intercept

                if (bindTool) {

                    tryBind (ofWhat,           originalName, bindTool, value)
                    tryBind (ofWhat.prototype, originalName, bindTool, value) } } })

        if (ofWhat.aspectAdded) {
            ofWhat.aspectAdded (aspectDef) }

        return aspectDef })

}) ()


/*  ==================================================================== */

    if (Platform.NodeJS) { // Should strip it from client with conditional macro in future...
        module.exports = _ }

