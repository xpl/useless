/*    AUTO GENERATED from useless.js (stripped unit tests and comments) */

$uselessFile = 'useless.js';
if (typeof require !== 'undefined') {
    _ = require('underscore');
    $include = require;
}
_ = function () {
    _.mixin({
        zipWith: function (rows, zippo) {
            return _.reduce(_.rest(rows), function (memo, row) {
                return _.times(Math.max(memo && memo.length || 0, row && row.length || 0), function (i) {
                    return zippo(memo && memo[i], row && row[i]);
                });
            }, _.first(rows));
        }
    });
    if ('a1 b2 c3' !== _.zipWith([
            [
                'a',
                'b',
                'c'
            ],
            [
                1,
                2,
                3
            ]
        ], function (a, b) {
            return a + b;
        }).join(' ')) {
        throw new Error('_.zipWith broken');
    }
    return _;
}();
unicode_hack = function () {
    var unicodeCategories = {
        Cn: '[\u0378\u0379Ϳ-\u0383\u038B\u038D\u03A2Ԩ-\u0530\u0557\u0558\u0560\u0588\u058B-\u0590\u05C8-\u05CF\u05EB-\u05EF\u05F5-\u05FF\u0604\u0605\u061C\u061D\u070E\u074B\u074C\u07B2-\u07BF\u07FB-\u07FF\u082E\u082F\u083F\u085C\u085D\u085F-ࣿॸঀ\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09FC-\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF0\u0AF2-\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B55\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B78-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BFB-ఀ\u0C04\u0C0D\u0C11\u0C29ఴ\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5A-\u0C5F\u0C64\u0C65\u0C70-\u0C77\u0C80ಁ\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-ഁ\u0D04\u0D0D\u0D11\u0D3B\u0D3C\u0D45\u0D49\u0D4F-\u0D56\u0D58-\u0D5F\u0D64\u0D65\u0D76-\u0D78\u0D80\u0D81\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DF1\u0DF5-\u0E00\u0E3B-\u0E3E\u0E5C-\u0E80\u0E83\u0E85\u0E86\u0E89\u0E8B\u0E8C\u0E8E-\u0E93\u0E98\u0EA0\u0EA4\u0EA6\u0EA8\u0EA9\u0EAC\u0EBA\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDBໞ-\u0EFF\u0F48\u0F6D-\u0F70\u0F98\u0FBD\u0FCD\u0FDB-\u0FFF\u10C6-\u10CFჽ-ჿ\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u137D-\u137F\u139A-\u139F\u13F5-\u13FF\u169D-\u169Fᛱ-\u16FF\u170D\u1715-\u171F\u1737-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17DE\u17DF\u17EA-\u17EF\u17FA-\u17FF\u180F\u181A-\u181F\u1878-\u187F\u18AB-\u18AF\u18F6-\u18FFᤝ-\u191F\u192C-\u192F\u193C-\u193F\u1941-\u1943\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DB-\u19DD\u1A1C\u1A1D\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1A9F\u1AAE-\u1AFF\u1B4C-\u1B4F\u1B7D-\u1B7F᮫-ᮭᮺ-ᮿ\u1BF4-\u1BFB\u1C38-\u1C3A\u1C4A-\u1C4C\u1C80-\u1CCFᳳ-\u1CFFᷧ-\u1DFB\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FC5\u1FD4\u1FD5\u1FDC\u1FF0\u1FF1\u1FF5\u1FFF\u2065-\u2069\u2072\u2073\u208F\u209D-\u209F\u20BA-\u20CF\u20F1-\u20FF\u218A-\u218F\u23F4-\u23FF\u2427-\u243F\u244B-\u245F\u2700\u27CB\u27CD\u2B4D-\u2B4F\u2B5A-\u2BFF\u2C2F\u2C5FⳲ-\u2CF8\u2D26-\u2D2Fⵦ-\u2D6E\u2D71-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E32-\u2E7F\u2E9A\u2EF4-\u2EFF\u2FD6-\u2FEF\u2FFC-\u2FFF\u3040\u3097\u3098\u3100-\u3104\u312E-\u3130\u318F\u31BB-\u31BF\u31E4-\u31EF\u321F\u32FF\u4DB6-\u4DBF鿌-\u9FFF\uA48D-\uA48F\uA4C7-\uA4CF\uA62C-\uA63Fꙴ-ꙻꚘ-ꚟ\uA6F8-\uA6FF\uA78FꞒ-ꞟꞪ-ꟹ\uA82C-\uA82F\uA83A-\uA83F\uA878-\uA87F\uA8C5-\uA8CD\uA8DA-\uA8DF\uA8FC-\uA8FF\uA954-\uA95E\uA97D-\uA97F\uA9CE\uA9DA-\uA9DDꧠ-\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A\uAA5Bꩼ-ꩿ\uAAC3-\uAADAꫠ-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F-\uABBF\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uD7FF郞隷\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBC2-\uFBD2\uFD40-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFE\uFDFF\uFE1A-\uFE1F︧-\uFE2F\uFE53\uFE67\uFE6C-\uFE6F\uFE75\uFEFD\uFEFE\uFF00\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFDF\uFFE7\uFFEF-\uFFF8\uFFFE\uFFFF]',
        Lu: '[A-ZÀ-ÖØ-ÞĀĂĄĆĈĊČĎĐĒĔĖĘĚĜĞĠĢĤĦĨĪĬĮİĲĴĶĹĻĽĿŁŃŅŇŊŌŎŐŒŔŖŘŚŜŞŠŢŤŦŨŪŬŮŰŲŴŶŸŹŻŽƁƂƄƆƇƉ-ƋƎ-ƑƓƔƖ-ƘƜƝƟƠƢƤƦƧƩƬƮƯƱ-ƳƵƷƸƼǄǇǊǍǏǑǓǕǗǙǛǞǠǢǤǦǨǪǬǮǱǴǶ-ǸǺǼǾȀȂȄȆȈȊȌȎȐȒȔȖȘȚȜȞȠȢȤȦȨȪȬȮȰȲȺȻȽȾɁɃ-ɆɈɊɌɎͰͲͶΆΈ-ΊΌΎΏΑ-ΡΣ-ΫϏϒ-ϔϘϚϜϞϠϢϤϦϨϪϬϮϴϷϹϺϽ-ЯѠѢѤѦѨѪѬѮѰѲѴѶѸѺѼѾҀҊҌҎҐҒҔҖҘҚҜҞҠҢҤҦҨҪҬҮҰҲҴҶҸҺҼҾӀӁӃӅӇӉӋӍӐӒӔӖӘӚӜӞӠӢӤӦӨӪӬӮӰӲӴӶӸӺӼӾԀԂԄԆԈԊԌԎԐԒԔԖԘԚԜԞԠԢԤԦԱ-ՖႠ-ჅḀḂḄḆḈḊḌḎḐḒḔḖḘḚḜḞḠḢḤḦḨḪḬḮḰḲḴḶḸḺḼḾṀṂṄṆṈṊṌṎṐṒṔṖṘṚṜṞṠṢṤṦṨṪṬṮṰṲṴṶṸṺṼṾẀẂẄẆẈẊẌẎẐẒẔẞẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼẾỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴỶỸỺỼỾἈ-ἏἘ-ἝἨ-ἯἸ-ἿὈ-ὍὙὛὝὟὨ-ὯᾸ-ΆῈ-ΉῘ-ΊῨ-ῬῸ-Ώℂℇℋ-ℍℐ-ℒℕℙ-ℝℤΩℨK-ℭℰ-ℳℾℿⅅↃⰀ-ⰮⱠⱢ-ⱤⱧⱩⱫⱭ-ⱰⱲⱵⱾ-ⲀⲂⲄⲆⲈⲊⲌⲎⲐⲒⲔⲖⲘⲚⲜⲞⲠⲢⲤⲦⲨⲪⲬⲮⲰⲲⲴⲶⲸⲺⲼⲾⳀⳂⳄⳆⳈⳊⳌⳎⳐⳒⳔⳖⳘⳚⳜⳞⳠⳢⳫⳭꙀꙂꙄꙆꙈꙊꙌꙎꙐꙒꙔꙖꙘꙚꙜꙞꙠꙢꙤꙦꙨꙪꙬꚀꚂꚄꚆꚈꚊꚌꚎꚐꚒꚔꚖꜢꜤꜦꜨꜪꜬꜮꜲꜴꜶꜸꜺꜼꜾꝀꝂꝄꝆꝈꝊꝌꝎꝐꝒꝔꝖꝘꝚꝜꝞꝠꝢꝤꝦꝨꝪꝬꝮꝹꝻꝽꝾꞀꞂꞄꞆꞋꞍꞐꞠꞢꞤꞦꞨＡ-Ｚ]',
        Ll: '[a-zªµºß-öø-ÿāăąćĉċčďđēĕėęěĝğġģĥħĩīĭįıĳĵķĸĺļľŀłńņňŉŋōŏőœŕŗřśŝşšţťŧũūŭůűųŵŷźżž-ƀƃƅƈƌƍƒƕƙ-ƛƞơƣƥƨƪƫƭưƴƶƹƺƽ-ƿǆǉǌǎǐǒǔǖǘǚǜǝǟǡǣǥǧǩǫǭǯǰǳǵǹǻǽǿȁȃȅȇȉȋȍȏȑȓȕȗșțȝȟȡȣȥȧȩȫȭȯȱȳ-ȹȼȿɀɂɇɉɋɍɏ-ʓʕ-ʯͱͳͷͻ-ͽΐά-ώϐϑϕ-ϗϙϛϝϟϡϣϥϧϩϫϭϯ-ϳϵϸϻϼа-џѡѣѥѧѩѫѭѯѱѳѵѷѹѻѽѿҁҋҍҏґғҕҗҙқҝҟҡңҥҧҩҫҭүұҳҵҷҹһҽҿӂӄӆӈӊӌӎӏӑӓӕӗәӛӝӟӡӣӥӧөӫӭӯӱӳӵӷӹӻӽӿԁԃԅԇԉԋԍԏԑԓԕԗԙԛԝԟԡԣԥԧա-ևᴀ-ᴫᵢ-ᵷᵹ-ᶚḁḃḅḇḉḋḍḏḑḓḕḗḙḛḝḟḡḣḥḧḩḫḭḯḱḳḵḷḹḻḽḿṁṃṅṇṉṋṍṏṑṓṕṗṙṛṝṟṡṣṥṧṩṫṭṯṱṳṵṷṹṻṽṿẁẃẅẇẉẋẍẏẑẓẕ-ẝẟạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹỻỽỿ-ἇἐ-ἕἠ-ἧἰ-ἷὀ-ὅὐ-ὗὠ-ὧὰ-ώᾀ-ᾇᾐ-ᾗᾠ-ᾧᾰ-ᾴᾶᾷιῂ-ῄῆῇῐ-ΐῖῗῠ-ῧῲ-ῴῶῷℊℎℏℓℯℴℹℼℽⅆ-ⅉⅎↄⰰ-ⱞⱡⱥⱦⱨⱪⱬⱱⱳⱴⱶ-ⱼⲁⲃⲅⲇⲉⲋⲍⲏⲑⲓⲕⲗⲙⲛⲝⲟⲡⲣⲥⲧⲩⲫⲭⲯⲱⲳⲵⲷⲹⲻⲽⲿⳁⳃⳅⳇⳉⳋⳍⳏⳑⳓⳕⳗⳙⳛⳝⳟⳡⳣⳤⳬⳮⴀ-ⴥꙁꙃꙅꙇꙉꙋꙍꙏꙑꙓꙕꙗꙙꙛꙝꙟꙡꙣꙥꙧꙩꙫꙭꚁꚃꚅꚇꚉꚋꚍꚏꚑꚓꚕꚗꜣꜥꜧꜩꜫꜭꜯ-ꜱꜳꜵꜷꜹꜻꜽꜿꝁꝃꝅꝇꝉꝋꝍꝏꝑꝓꝕꝗꝙꝛꝝꝟꝡꝣꝥꝧꝩꝫꝭꝯꝱ-ꝸꝺꝼꝿꞁꞃꞅꞇꞌꞎꞑꞡꞣꞥꞧꞩꟺﬀ-ﬆﬓ-ﬗａ-ｚ]',
        Lt: '[ǅǈǋǲᾈ-ᾏᾘ-ᾟᾨ-ᾯᾼῌῼ]',
        Lm: '[ʰ-ˁˆ-ˑˠ-ˤˬˮʹͺՙـۥۦߴߵߺࠚࠤࠨॱๆໆჼៗᡃᪧᱸ-ᱽᴬ-ᵡᵸᶛ-ᶿⁱⁿₐ-ₜⱽⵯⸯ々〱-〵〻ゝゞー-ヾꀕꓸ-ꓽꘌꙿꜗ-ꜟꝰꞈꧏꩰꫝｰﾞﾟ]',
        Lo: '[ƻǀ-ǃʔא-תװ-ײؠ-ؿف-يٮٯٱ-ۓەۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪࠀ-ࠕࡀ-ࡘऄ-हऽॐक़-ॡॲ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๅກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໜໝༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎა-ჺᄀ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៜᠠ-ᡂᡄ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᯀ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱷᳩ-ᳬᳮ-ᳱℵ-ℸⴰ-ⵥⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ〆〼ぁ-ゖゟァ-ヺヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿋ꀀ-ꀔꀖ-ꒌꓐ-ꓷꔀ-ꘋꘐ-ꘟꘪꘫꙮꚠ-ꛥꟻ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩯꩱ-ꩶꩺꪀ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛꫜꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-鶴侮-舘並-龎יִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼｦ-ｯｱ-ﾝﾠ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]',
        Mn: '[̀-ͯ҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-ٰٟۖ-ۜ۟-۪ۤۧۨ-ܑۭܰ-݊ަ-ް߫-߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛ऀ-ंऺ़ु-ै्॑-ॗॢॣঁ়ু-ৄ্ৢৣਁਂ਼ੁੂੇੈੋ-੍ੑੰੱੵઁં઼ુ-ૅેૈ્ૢૣଁ଼ିୁ-ୄ୍ୖୢୣஂீ்ా-ీె-ైొ-్ౕౖౢౣ಼ಿೆೌ್ೢೣു-ൄ്ൢൣ්ි-ුූัิ-ฺ็-๎ັິ-ູົຼ່-ໍཱ༹༘༙༵༷-ཾྀ-྄྆྇ྍ-ྗྙ-ྼ࿆ိ-ူဲ-့္်ွှၘၙၞ-ၠၱ-ၴႂႅႆႍႝ፝-፟ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳិ-ួំ៉-៓៝᠋-᠍ᢩᤠ-ᤢᤧᤨᤲ᤹-᤻ᨘᨗᩖᩘ-ᩞ᩠ᩢᩥ-ᩬᩳ-᩿᩼ᬀ-ᬃ᬴ᬶ-ᬺᬼᭂ᭫-᭳ᮀᮁᮢ-ᮥᮨᮩ᯦ᯨᯩᯭᯯ-ᯱᰬ-ᰳᰶ᰷᳐-᳔᳒-᳢᳠-᳨᳭᷀-ᷦ᷼-᷿⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꙯꙼꙽꛰꛱ꠂ꠆ꠋꠥꠦ꣄꣠-꣱ꤦ-꤭ꥇ-ꥑꦀ-ꦂ꦳ꦶ-ꦹꦼꨩ-ꨮꨱꨲꨵꨶꩃꩌꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꯥꯨ꯭ﬞ︀-️︠-︦]',
        Me: '[\u0488\u0489\u20DD-\u20E0\u20E2-\u20E4\uA670-\uA672]',
        Mc: '[ःऻा-ीॉ-ौॎॏংঃা-ীেৈোৌৗਃਾ-ੀઃા-ીૉોૌଂଃାୀେୈୋୌୗாிுூெ-ைொ-ௌௗఁ-ఃు-ౄಂಃಾೀ-ೄೇೈೊೋೕೖംഃാ-ീെ-ൈൊ-ൌൗංඃා-ෑෘ-ෟෲෳ༾༿ཿါာေးျြၖၗၢ-ၤၧ-ၭႃႄႇ-ႌႏႚ-ႜាើ-ៅះៈᤣ-ᤦᤩ-ᤫᤰᤱᤳ-ᤸᦰ-ᧀᧈᧉᨙ-ᨛᩕᩗᩡᩣᩤᩭ-ᩲᬄᬵᬻᬽ-ᭁᭃ᭄ᮂᮡᮦᮧ᮪ᯧᯪ-ᯬᯮ᯲᯳ᰤ-ᰫᰴᰵ᳡ᳲꠣꠤꠧꢀꢁꢴ-ꣃꥒ꥓ꦃꦴꦵꦺꦻꦽ-꧀ꨯꨰꨳꨴꩍꩻꯣꯤꯦꯧꯩꯪ꯬]',
        Nd: '[0-9٠-٩۰-۹߀-߉०-९০-৯੦-੯૦-૯୦-୯௦-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩၀-၉႐-႙០-៩᠐-᠙᥆-᥏᧐-᧙᪀-᪉᪐-᪙᭐-᭙᮰-᮹᱀-᱉᱐-᱙꘠-꘩꣐-꣙꤀-꤉꧐-꧙꩐-꩙꯰-꯹０-９]',
        Nl: '[ᛮ-ᛰⅠ-ↂↅ-ↈ〇〡-〩〸-〺ꛦ-ꛯ]',
        No: '[\xB2\xB3\xB9\xBC-\xBE\u09F4-\u09F9\u0B72-\u0B77\u0BF0-\u0BF2\u0C78-\u0C7E\u0D70-\u0D75\u0F2A-\u0F33\u1369-\u137C\u17F0-\u17F9\u19DA\u2070\u2074-\u2079\u2080-\u2089\u2150-\u215F\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3192-\u3195\u3220-\u3229\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA830-\uA835]',
        Zs: '[ \xA0\u1680\u180E\u2000-\u200A\u202F\u205F\u3000]',
        Zl: '[\u2028]',
        Zp: '[\u2029]',
        Cc: '[\0-\x1F\x7F-\x9F]',
        Cf: '[\xAD\u0600-\u0603\u06DD\u070F឴឵\u200B-\u200F\u202A-\u202E\u2060-\u2064\u206A-\u206F\uFEFF\uFFF9-\uFFFB]',
        Cs: '[\uD800-\uDFFF]',
        Co: '[\uE000-\uF8FF]',
        Ps: '[([{\u0F3A\u0F3C\u169B\u201A\u201E\u2045\u207D\u208D\u2329\u2768\u276A\u276C\u276E\u2770\u2772\u2774\u27C5\u27E6\u27E8\u27EA\u27EC\u27EE\u2983\u2985\u2987\u2989\u298B\u298D\u298F\u2991\u2993\u2995\u2997\u29D8\u29DA\u29FC\u2E22\u2E24\u2E26\u2E28\u3008\u300A\u300C\u300E\u3010\u3014\u3016\u3018\u301A\u301D\uFD3E\uFE17\uFE35\uFE37\uFE39\uFE3B\uFE3D\uFE3F\uFE41\uFE43\uFE47\uFE59\uFE5B\uFE5D\uFF08\uFF3B\uFF5B\uFF5F\uFF62]',
        Pd: '[-\u058A\u05BE\u1400\u1806\u2010-\u2015\u2E17\u2E1A\u301C\u3030\u30A0\uFE31\uFE32\uFE58\uFE63\uFF0D]',
        Pc: '[_‿⁀⁔︳︴﹍-﹏＿]',
        Pe: '[)]}\u0F3B\u0F3D\u169C\u2046\u207E\u208E\u232A\u2769\u276B\u276D\u276F\u2771\u2773\u2775\u27C6\u27E7\u27E9\u27EB\u27ED\u27EF\u2984\u2986\u2988\u298A\u298C\u298E\u2990\u2992\u2994\u2996\u2998\u29D9\u29DB\u29FD\u2E23\u2E25\u2E27\u2E29\u3009\u300B\u300D\u300F\u3011\u3015\u3017\u3019\u301B\u301E\u301F\uFD3F\uFE18\uFE36\uFE38\uFE3A\uFE3C\uFE3E\uFE40\uFE42\uFE44\uFE48\uFE5A\uFE5C\uFE5E\uFF09\uFF3D\uFF5D\uFF60\uFF63]',
        Sm: '[+<->|~\xAC\xB1\xD7\xF7\u03F6\u0606-\u0608\u2044\u2052\u207A-\u207C\u208A-\u208C\u2118\u2140-\u2144\u214B\u2190-\u2194\u219A\u219B\u21A0\u21A3\u21A6\u21AE\u21CE\u21CF\u21D2\u21D4\u21F4-\u22FF\u2308-\u230B\u2320\u2321\u237C\u239B-\u23B3\u23DC-\u23E1\u25B7\u25C1\u25F8-\u25FF\u266F\u27C0-\u27C4\u27C7-\u27CA\u27CC\u27CE-\u27E5\u27F0-\u27FF\u2900-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2AFF\u2B30-\u2B44\u2B47-\u2B4C\uFB29\uFE62\uFE64-\uFE66\uFF0B\uFF1C-\uFF1E\uFF5C\uFF5E\uFFE2\uFFE9-\uFFEC]',
        Po: '[!-#%-\'*,./:;?@\\\xA1\xB7\xBF\u037E\u0387\u055A-\u055F\u0589\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1361-\u1368\u166D\u166E\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u1805\u1807-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CD3\u2016\u2017\u2020-\u2027\u2030-\u2038\u203B-\u203E\u2041-\u2043\u2047-\u2051\u2053\u2055-\u205E\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00\u2E01\u2E06-\u2E08\u2E0B\u2E0E-\u2E16\u2E18\u2E19\u2E1B\u2E1E\u2E1F\u2E2A-\u2E2E\u2E30\u2E31\u3001-\u3003\u303D\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uABEB\uFE10-\uFE16\uFE19\uFE30\uFE45\uFE46\uFE49-\uFE4C\uFE50-\uFE52\uFE54-\uFE57\uFE5F-\uFE61\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF07\uFF0A\uFF0C\uFF0E\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3C\uFF61\uFF64\uFF65]',
        Sk: '[^`\xA8\xAF\xB4\xB8\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u309B\u309C\uA700-\uA716\uA720\uA721\uA789\uA78A\uFBB2-\uFBC1\uFF3E\uFF40\uFFE3]',
        Sc: '[$\xA2-\xA5\u060B\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20B9\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6]',
        Pi: '[\xAB\u2018\u201B\u201C\u201F\u2039\u2E02\u2E04\u2E09\u2E0C\u2E1C\u2E20]',
        So: '[\xA6\xA7\xA9\xAE\xB0\xB6\u0482\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u09FA\u0B70\u0BF3-\u0BF8\u0BFA\u0C7F\u0D79\u0F01-\u0F03\u0F13-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1360\u1390-\u1399\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116\u2117\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u214A\u214C\u214D\u214F\u2195-\u2199\u219C-\u219F\u21A1\u21A2\u21A4\u21A5\u21A7-\u21AD\u21AF-\u21CD\u21D0\u21D1\u21D3\u21D5-\u21F3\u2300-\u2307\u230C-\u231F\u2322-\u2328\u232B-\u237B\u237D-\u239A\u23B4-\u23DB\u23E2-\u23F3\u2400-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u25B6\u25B8-\u25C0\u25C2-\u25F7\u2600-\u266E\u2670-\u26FF\u2701-\u2767\u2794-\u27BF\u2800-\u28FF\u2B00-\u2B2F\u2B45\u2B46\u2B50-\u2B59\u2CE5-\u2CEA\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u3200-\u321E\u322A-\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u32FE\u3300-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA828-\uA82B\uA836\uA837\uA839\uAA77-\uAA79\uFDFD\uFFE4\uFFE8\uFFED\uFFEE\uFFFC\uFFFD]',
        Pf: '[\xBB\u2019\u201D\u203A\u2E03\u2E05\u2E0A\u2E0D\u2E1D\u2E21]'
    };
    var firstLetters = {};
    for (var p in unicodeCategories) {
        if (firstLetters[p[0]])
            firstLetters[p[0]] = unicodeCategories[p].substring(0, unicodeCategories[p].length - 1) + firstLetters[p[0]].substring(1);
        else
            firstLetters[p[0]] = unicodeCategories[p];
    }
    for (var p in firstLetters)
        unicodeCategories[p] = firstLetters[p];
    return function (regexpString) {
        var modifiers = '';
        if (regexpString instanceof RegExp) {
            modifiers = (regexpString.global ? 'g' : '') + (regexpString.ignoreCase ? 'i' : '') + (regexpString.multiline ? 'm' : '');
            regexpString = regexpString.source;
        }
        regexpString = regexpString.replace(/\\p\{(..?)\}/g, function (match, group) {
            return unicodeCategories[group] || match;
        });
        return new RegExp(regexpString, modifiers);
    };
}();
;
Base64 = {
    _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
    encode: function (input) {
        var output = '';
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = Base64._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = (chr1 & 3) << 4 | chr2 >> 4;
            enc3 = (chr2 & 15) << 2 | chr3 >> 6;
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output + Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) + Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);
        }
        return output;
    },
    decode: function (input) {
        var output = '';
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
        while (i < input.length) {
            enc1 = Base64._keyStr.indexOf(input.charAt(i++));
            enc2 = Base64._keyStr.indexOf(input.charAt(i++));
            enc3 = Base64._keyStr.indexOf(input.charAt(i++));
            enc4 = Base64._keyStr.indexOf(input.charAt(i++));
            chr1 = enc1 << 2 | enc2 >> 4;
            chr2 = (enc2 & 15) << 4 | enc3 >> 2;
            chr3 = (enc3 & 3) << 6 | enc4;
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
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, '\n');
        var utftext = '';
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if (c > 127 && c < 2048) {
                utftext += String.fromCharCode(c >> 6 | 192);
                utftext += String.fromCharCode(c & 63 | 128);
            } else {
                utftext += String.fromCharCode(c >> 12 | 224);
                utftext += String.fromCharCode(c >> 6 & 63 | 128);
                utftext += String.fromCharCode(c & 63 | 128);
            }
        }
        return utftext;
    },
    _utf8_decode: function (utftext) {
        var string = '';
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if (c > 191 && c < 224) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode((c & 31) << 6 | c2 & 63);
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode((c & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                i += 3;
            }
        }
        return string;
    }
};
_.platform = function () {
    return arguments.callee.__value || (arguments.callee.__value = function () {
        if (typeof window !== 'undefined' && window._ && window._.platform === _.platform && typeof navigator !== 'undefined' && navigator.platform && navigator.platform.indexOf) {
            return _.extend({
                engine: 'browser',
                browser: navigator.userAgent.indexOf('Firefox') >= 0 ? 'Firefox' : navigator.userAgent.indexOf('Trident') >= 0 ? 'IE' : undefined
            }, navigator.platform.indexOf('Linux arm') >= 0 || navigator.platform.indexOf('Android') >= 0 || navigator.userAgent.indexOf('Android') >= 0 ? {
                touch: true,
                system: 'Android'
            } : navigator.platform.indexOf('iPad') >= 0 ? {
                touch: true,
                system: 'iOS',
                device: 'iPad'
            } : navigator.platform.indexOf('iPhone') >= 0 || navigator.platform.indexOf('iPod') >= 0 ? {
                touch: true,
                system: 'iOS',
                device: 'iPhone'
            } : {});
        } else if (typeof global !== 'undefined' && global._ && global._.platform === _.platform) {
            return { engine: 'node' };
        } else {
            return {};
        }
    }());
};
_.global = function () {
    return _.platform().engine === 'browser' ? window : _.platform().engine === 'node' ? global : undefined;
};
_.defineGlobalProperty = function (name, value, cfg) {
    if (_.global()[name] !== undefined) {
        throw new Error('cannot defineGlobalProperty: ' + name + ' is already there');
    }
    Object.defineProperty(_.global(), name, _.extend({
        enumerable: true,
        get: _.isFunction(value) && value.length === 0 ? value : _.constant(value)
    }, cfg));
    return value;
};
$overrideUnderscore = function (name, genImpl) {
    return _[name] = genImpl(_[name]);
};
if (_.platform().engine !== 'browser') {
    _.defineGlobalProperty('alert', function (args) {
        var print = _.global()['log'] && _.partial(log.warn, log.config({ stackOffset: 2 })) || console.log;
        print.apply(print, ['ALERT:'].concat(_.asArray(arguments)));
    });
}
_.defineGlobalProperty('alert2', function (args) {
    alert(_.map(arguments, _.stringify).join(', '));
    return arguments[0];
});
_.global().log = function () {
    console.log.call(console.log, arguments);
};
_.hasAsserts = true;
_.extend(_, {
    tests: {},
    withTest: function (name, test, defineSubject) {
        defineSubject();
        _.runTest(test);
        _.publishToTestsNamespace(name, test);
    },
    deferTest: function (name, test, defineSubject) {
        defineSubject();
        _.publishToTestsNamespace(name, test);
    },
    runTest: function (test) {
        if (_.isFunction(test)) {
            test();
        } else {
            _.each(test, function (fn) {
                fn();
            });
        }
    },
    publishToTestsNamespace: function (name, test) {
        if (_.isArray(name)) {
            (_.tests[name[0]] || (_.tests[name[0]] = {}))[name[1]] = test;
        } else {
            _.tests[name] = test;
        }
    }
});
$overrideUnderscore('matches', function (matches) {
    return function (a) {
        return _.isObject(a) ? matches(a) : function (b) {
            return a === b;
        };
    };
});
_.extend(_, _.assertions = {
    assert: function (__) {
        var args = [].splice.call(arguments, 0);
        if (args.length === 1) {
            if (args[0] !== true) {
                _.assertionFailed({ notMatching: args });
            }
        } else if (!_.allEqual(args)) {
            _.assertionFailed({ notMatching: args });
        }
        return true;
    },
    assertCPS: function (fn, args, then) {
        var requiredResult = args && (_.isArray(args) ? args : [args]) || [];
        fn(function () {
            $assert([].splice.call(arguments, 0), requiredResult);
            if (then) {
                then();
                return true;
            }
        });
    },
    assertNotCalled: function (context) {
        var inContext = true;
        context(function () {
            if (inContext) {
                $fail;
            }
        });
        inContext = false;
    },
    assertEveryCalledOnce: function (fn, then) {
        return _.assertEveryCalled(_.hasTags ? $once(fn) : (fn.once = true, fn), then);
    },
    assertEveryCalled: function (fn_, then) {
        var fn = _.hasTags ? $untag(fn_) : fn_, async = _.hasTags ? $async.is(fn_) : fn_.async;
        once = _.hasTags ? $once.is(fn_) : fn_.once;
        var match = once ? null : fn.toString().match(/.*function[^\(]\(([^\)]+)\)/);
        var contracts = once ? _.times(fn.length, _.constant(1)) : _.map(match[1].split(','), function (arg) {
            var parts = arg.trim().match(/^(.+)__(.+)$/);
            return parts && parseInt(parts[2], 10) || true;
        });
        var status = _.times(fn.length, _.constant(false));
        var callbacks = _.times(fn.length, function (i) {
            return function () {
                status[i] = _.isNumber(contracts[i]) ? (status[i] || 0) + 1 : true;
                if (async && _.isEqual(status, contracts))
                    then();
            };
        });
        fn.apply(null, callbacks);
        if (!async) {
            _.assert(status, contracts);
            if (then) {
                then();
            }
        }
    },
    assertCallOrder: function (fn) {
        var callIndex = 0;
        var callbacks = _.times(fn.length, function (i) {
            return function () {
                arguments.callee.callIndex = callIndex++;
            };
        });
        fn.apply(null, callbacks);
        return _.assert(_.pluck(callbacks, 'callIndex'), _.times(callbacks.length, _.identity.arity1));
    },
    assertMatches: function (value, pattern) {
        try {
            return _.assert(_.matches.apply(null, _.rest(arguments))(value));
        } catch (e) {
            throw _.isAssertionError(e) ? _.extend(e, {
                notMatching: [
                    value,
                    pattern
                ]
            }) : e;
        }
    },
    assertNotMatches: function (value, pattern) {
        try {
            return _.assert(!_.matches.apply(null, _.rest(arguments))(value));
        } catch (e) {
            throw _.isAssertionError(e) ? _.extend(e, {
                notMatching: [
                    value,
                    pattern
                ]
            }) : e;
        }
    },
    assertType: function (value, contract) {
        return _.assert(_.decideType(value), contract);
    },
    assertTypeMatches: function (value, contract) {
        return _.isEmpty(mismatches = _.typeMismatches(contract, value)) ? true : _.assertionFailed({
            message: 'provided value type not matches required contract',
            asColumns: true,
            notMatching: [
                { provided: value },
                { required: contract },
                { mismatches: mismatches }
            ]
        });
    },
    assertFails: function (what) {
        return _.assertThrows.call(this, what, _.isAssertionError);
    },
    assertThrows: function (what, errorPattern) {
        var e = undefined, thrown = false;
        try {
            what.call(this);
        } catch (__) {
            e = __;
            thrown = true;
        }
        _.assert.call(this, thrown);
        if (arguments.length > 1) {
            _.assertMatches.call(this, e, errorPattern);
        }
    },
    assertNotThrows: function (what) {
        return _.assertEveryCalled(function (ok) {
            what();
            ok();
        });
    },
    assertArguments: function (args, callee, name) {
        var fn = (callee || args.callee).toString();
        var match = fn.match(/.*function[^\(]\(([^\)]+)\)/);
        if (match) {
            var valuesPassed = _.asArray(args);
            var valuesNeeded = _.map(match[1].split(','), function (_s) {
                var s = _s.trim()[0] === '_' ? _s.replace(/_/g, ' ').trim() : undefined;
                var n = parseInt(s, 10);
                return _.isFinite(n) ? n : s;
            });
            var zap = _.zipWith([
                valuesNeeded,
                valuesPassed
            ], function (a, b) {
                return a === undefined ? true : a === b;
            });
            if (!_.every(zap)) {
                _.assertionFailed({
                    notMatching: _.nonempty([
                        [
                            name,
                            fn
                        ].join(': '),
                        valuesNeeded,
                        valuesPassed
                    ])
                });
            }
        }
    },
    fail: function () {
        _.assertionFailed();
    },
    fails: _.constant(function () {
        _.assertionFailed();
    }),
    stub: function () {
        _.assertionFailed();
    }
});
_.extend(_, {
    assertionError: function (additionalInfo) {
        return _.extend(new Error(additionalInfo && additionalInfo.message || 'assertion failed'), additionalInfo, { assertion: true });
    },
    assertionFailed: function (additionalInfo) {
        throw _.extend(_.assertionError(additionalInfo), { stack: _.rest(new Error().stack.split('\n'), 3).join('\n') });
    },
    isAssertionError: function (e) {
        return e.assertion === true;
    }
});
_.extend(_, {
    allEqual: function (values) {
        return _.reduce(values, function (prevEqual, x) {
            return prevEqual && _.isEqual(values[0], x);
        }, true);
    }
});
_.each(_.keys(_.assertions), function (name) {
    _.defineGlobalProperty('$' + name, _[name], { configurable: true });
});
_.extend(_, {
    asArray: function (x) {
        return x.length !== undefined ? [].slice.call(x, 0) : [x];
    }
});
_.extend(_, {
    numArgs: function (fn) {
        return fn._ac === undefined ? fn.length : fn._ac;
    },
    restArg: function (fn) {
        return fn._ra || false;
    },
    noArgs: function (fn) {
        return _.numArgs(fn) === 0 && !fn._ra;
    },
    hasArgs: function (fn) {
        return _.numArgs(fn) > 0 && !fn._ra;
    },
    oneArg: function (fn) {
        return _.numArgs(fn) === 1 && !fn._ra;
    },
    withRestArg: _.defineGlobalProperty('$restArg', function (fn) {
        Object.defineProperty(fn, '_ra', {
            enumerable: false,
            writable: true,
            value: true
        });
        return fn;
    }),
    withArgs: function (numArgs, restArg, fn) {
        if (numArgs !== undefined) {
            Object.defineProperty(fn, '_ac', {
                enumerable: false,
                writable: true,
                value: numArgs
            });
        }
        if (restArg !== undefined) {
            Object.defineProperty(fn, '_ra', {
                enumerable: false,
                writable: true,
                value: restArg
            });
        }
        return fn;
    },
    withSameArgs: function (other, fn) {
        return _.withArgs(_.numArgs(other), _.restArg(other), fn);
    }
});
$overrideUnderscore('memoize', function (memoize) {
    return function (fn) {
        return _.withSameArgs(fn, memoize(fn));
    };
});
$overrideUnderscore('partial', function (partial) {
    return $restArg(function (fn) {
        return _.withArgs(Math.max(0, _.numArgs(fn) - (arguments.length - 1)), fn._ra, partial.apply(this, arguments));
    });
});
$overrideUnderscore('bind', function (bind) {
    return $restArg(function (fn, this_) {
        return _.withArgs(Math.max(0, _.numArgs(fn) - (arguments.length - 2)), fn._ra, bind.apply(this, arguments));
    });
});
_.arity = function (N, fn) {
    return function () {
        return fn.apply(this, _.first(arguments, N));
    };
};
_.arity0 = function (fn) {
    return function () {
        return fn.call(this);
    };
};
_.arity1 = function (fn) {
    return function (a) {
        return fn.call(this, a);
    };
};
_.arity2 = function (fn) {
    return function (a, b) {
        return fn.call(this, a, b);
    };
};
_.arity3 = function (fn) {
    return function (a, b, c) {
        return fn.call(this, a, b, c);
    };
};
_.arityFn = function (N) {
    return _['arity' + N];
};
_.tails = $restArg(function (fn) {
    var tailArgs = _.rest(arguments);
    return function () {
        return fn.apply(this, _.asArray(arguments).concat(tailArgs));
    };
});
_.tails2 = $restArg(function (fn) {
    var tailArgs = _.rest(arguments);
    return function (a) {
        return fn.apply(this, [a].concat(tailArgs));
    };
});
_.tails3 = $restArg(function (fn) {
    var tailArgs = _.rest(arguments);
    return function (a, b) {
        return fn.apply(this, [
            a,
            b
        ].concat(tailArgs));
    };
});
_.flipN = function (fn) {
    return $restArg(function () {
        return fn.apply(this, _.asArray(arguments).reverse());
    });
};
_.flip = function (fn) {
    if (_.restArg(fn)) {
        return _.flipN(fn);
    } else {
        switch (_.numArgs(fn)) {
        case 0:
        case 1:
            return fn;
        case 2:
            return _.flip2(fn);
        case 3:
            return _.flip3(fn);
        default:
            throw new Error('flip: unsupported arity');
        }
    }
};
_.flip2 = function (fn) {
    return function (a, b) {
        return fn.call(this, b, a);
    };
};
_.flip3 = function (fn) {
    return function (a, b, c) {
        return fn.call(this, c, b, a);
    };
};
_.or = function (a, b) {
    return function () {
        return a.apply(this, arguments) || b.apply(this, arguments);
    };
}, _.and = function (a, b) {
    return function () {
        return a.apply(this, arguments) && b.apply(this, arguments);
    };
}, _.not = function (x) {
    return function () {
        return !x.apply(this, arguments);
    };
};
_.extend(_, {
    Y: function (eatSelf) {
        var self = eatSelf(function () {
            return self.apply(this, arguments);
        });
        return self;
    }
});
(function () {
    _.hyperOperator = function (N, operator, diCaprioPredicate, nonTrivial) {
        var arity = _.arityFn(N) || _.identity;
        var weNeedToGoDeeper = (diCaprioPredicate || _.goDeeperWhenFirstArgumentIsGood)(N, nonTrivial || _.isNonTrivial);
        return function () {
            var subOperator = _.last(arguments);
            return _.Y(function (hyperOperator_) {
                var hyperOperator = _.tails(operator, arity(hyperOperator_));
                return function () {
                    return (weNeedToGoDeeper(arguments) ? hyperOperator : subOperator).apply(this, arguments);
                };
            }).apply(this, _.initial(arguments));
        };
    };
    _.goDeeperWhenFirstArgumentIsGood = function (N, canGoDeeper) {
        return function (args) {
            return args.length > 0 ? canGoDeeper(args[0]) : false;
        };
    };
    _.goDeeperAlwaysIfPossible = function (N, canGoDeeper) {
        if (N === 0) {
            return _.constant(false);
        } else if (N === 1) {
            return function (args) {
                return canGoDeeper(args[0]);
            };
        } else if (N === 2) {
            return function (args) {
                return canGoDeeper(args[0]) || canGoDeeper(args[1]);
            };
        } else {
            return function (args) {
                return _.some(_.asArray(args), canGoDeeper);
            };
        }
    };
    _.goDeeperOnlyWhenNessesary = function (N, canGoDeeper) {
        if (N === 0) {
            return _.constant(false);
        } else if (N === 1) {
            return function (args) {
                return canGoDeeper(args[0]);
            };
        } else if (N === 2) {
            return function (args) {
                return canGoDeeper(args[0]) && canGoDeeper(args[1]);
            };
        } else {
            return function (args) {
                return _.every(_.asArray(args), canGoDeeper);
            };
        }
    };
    _.isTrivial = function (x) {
        return _.isEmpty(x) || _.isString(x) || _.isNumber(x) || !(_.isStrictlyObject(x) || _.isArray(x)) || _.isPrototypeInstance(x) || _.isMeta(x);
    };
    _.isMeta = _.constant(false);
    _.isNonTrivial = _.not(_.isTrivial);
    _.binary = 2;
    _.unary = 1;
}());
_.higherOrder = function (fn) {
    return _.partial(_.partial, fn);
};
_.eval = function (x) {
    return _.isFunction(x) ? x.call(this) : x;
};
_.evals = function (__args__) {
    var arguments_ = arguments;
    return function (x) {
        return _.isFunction(x) ? x.apply(this, arguments_) : x;
    };
};
_.method = function (name) {
    var args = _.rest(arguments);
    return function (obj) {
        return obj[name].apply(obj, args);
    };
};
_.asFreeFunction = function (fn) {
    return function (this_, restArg) {
        return fn.apply(this_, _.rest(arguments));
    };
};
_.asMethod = function (fn) {
    return function () {
        return fn.apply(undefined, [this].concat(_.asArray(arguments)));
    };
};
_.appendsArguments = function (fn, wrapper) {
    return _.withSameArgs(fn, function () {
        var this_ = this;
        var args = _.asArray(arguments);
        return wrapper(function () {
            fn.apply(this_, args.concat(_.asArray(arguments)));
        });
    });
};
_.prependsArguments = function (fn, wrapper) {
    return _.withSameArgs(fn, function () {
        var this_ = this;
        var args = _.asArray(arguments);
        return wrapper(function () {
            fn.apply(this_, _.asArray(arguments).concat(args));
        });
    });
};
_.once = function (fn) {
    var called = false;
    return function () {
        if (!called) {
            called = true;
            return fn.apply(this, arguments);
        }
    };
};
_.withTimeout = function (cfg, what, then) {
    var expired = false;
    var timeout = setTimeout(function () {
        expired = true;
        if (cfg.expired) {
            cfg.expired(then);
        }
    }, cfg.maxTime);
    what(function () {
        if (!expired) {
            clearTimeout(timeout);
            if (then) {
                then.apply(this, arguments);
            }
        }
    });
};
_.sequence = function (arg) {
    var chain = _.isArray(arg) ? arg : _.asArray(arguments);
    var length = chain.length;
    return length === 0 ? _.identity : function (x) {
        for (var i = 0; i < length; i++) {
            x = chain[i].call(this, x);
        }
        return x;
    };
};
_.seq = _.sequence;
_.then = function (fn1, fn2) {
    return function (args) {
        return fn2.call(this, fn1.apply(this, arguments));
    };
};
_.makes = function (constructor) {
    return function () {
        switch (arguments.length) {
        case 0:
            return new constructor();
        case 1:
            return new constructor(arguments[0]);
        case 2:
            return new constructor(arguments[0], arguments[1]);
        default:
            throw new Error('not supported');
        }
    };
};
_.asString = function (what) {
    return what + '';
};
_.typeOf = function (what) {
    return typeof what;
};
_.instanceOf = function (what) {
    return function (x) {
        return x instanceof what;
    };
};
_.count = function (what) {
    return what.length;
};
_.array = _.tuple = function () {
    return _.asArray(arguments);
};
_.cons = function (head, tail) {
    return [head].concat(tail || []);
};
_.atIndex = function (n) {
    return function (arr) {
        return arr[n];
    };
};
_.takesFirst = _.higherOrder(_.first);
_.takesLast = _.higherOrder(_.last);
_.call = function (fn) {
    return fn();
};
_.applies = function (fn, this_, args) {
    return function () {
        return fn.apply(this_, args);
    };
};
_.prepends = function (what) {
    return function (to) {
        return what + to;
    };
};
_.appends = function (what) {
    return function (to) {
        return to + what;
    };
};
_.join = function (arr, s) {
    return arr.join(s);
};
_.joinWith = _.flip2(_.join);
_.joinsWith = _.higherOrder(_.joinWith);
_.split = function (s, del) {
    return s.split(del);
};
_.splitWith = _.flip2(_.split);
_.splitsWith = _.higherOrder(_.splitWith);
_.sum = function (a, b) {
    return (a || 0) + (b || 0);
};
_.subtract = function (a, b) {
    return (a || 0) - (b || 0);
};
_.mul = function (a, b) {
    return (a || 0) * (b || 0);
};
_.equal = function (a, b) {
    return a === b;
};
_.sums = _.plus = _.higherOrder(_.sum);
_.subtracts = _.minus = _.higherOrder(_.subtract);
_.muls = _.higherOrder(_.mul);
_.equals = _.higherOrder(_.equal);
_.less = function (a, b) {
    return a < b;
};
_.lessOrEqual = function (a, b) {
    return a <= b;
};
_.greater = function (a, b) {
    return a > b;
};
_.greaterOrEqual = function (a, b) {
    return a >= b;
};
_.isNegative = function (a) {
    return a < 0;
};
_.largest = function (a, b) {
    if (isNaN(a) && isNaN(b)) {
        return NaN;
    } else if (isNaN(a)) {
        return b;
    } else if (isNaN(b)) {
        return a;
    } else {
        return Math.max(a, b);
    }
};
_.notZero = function (x) {
    return x !== 0;
};
_.propertyOf = function (obj) {
    return function (prop) {
        return obj[prop];
    };
};
_.oneOf = $restArg(function () {
    return _.propertyOf(_.index(_.asArray(arguments)));
});
_.isInstanceofSyntaxAvailable = function () {
    var e = new Error();
    try {
        return e instanceof Error;
    } catch (e) {
        return false;
    }
};
_.isTypeOf_ES4 = function (constructor, what) {
    while (what) {
        if (what.constructor === constructor) {
            return true;
        }
        what = what.constructor.$base;
    }
    return false;
};
_.isTypeOf_ES5 = function (constructor, what) {
    return what instanceof constructor;
};
_.isTypeOf = _.isInstanceofSyntaxAvailable() ? _.isTypeOf_ES5 : _.isTypeOf_ES4;
_.isPrototypeInstance = function (x) {
    return x && x.constructor && _.isPrototypeConstructor(x.constructor);
};
_.isPrototypeConstructor = function (x) {
    return x && x.$definition !== undefined || false;
};
_.coerceToArray = function (x) {
    return x === undefined ? [] : _.isArray(x) ? x : [x];
};
_.coerceToFunction = function (x) {
    return _.isFunction(x) ? x : _.constant(x);
};
$overrideUnderscore('isArray', function (isArray) {
    return function (x) {
        return _.isTypeOf(Array, x) || isArray(x);
    };
});
_.mixin({
    matches: function (pattern) {
        return arguments.length === 0 && _.constant(true) || _.tails2(_.match, pattern);
    },
    match: function (a, ptrn) {
        return a === ptrn || _.isArray(a) && _.isArray(ptrn) && _.arrayMatch(a, ptrn) || _.isObject(a) && _.isObject(ptrn) && _.objectMatch(a, ptrn) || _.isTypeOf(RegExp, ptrn) && _.isString(a) && a.match(ptrn) !== null;
    },
    arrayMatch: function (a, pattern) {
        return _.every(pattern, _.propertyOf(_.index(a)));
    },
    objectMatch: function (a, pattern) {
        return _.reduce(_.pairs(pattern), function (result, kv) {
            return result && _.match(a[kv[0]], kv[1]);
        }, true);
    }
});
_.extend(_, {
    isNonPOD: function (v) {
        return v && v.constructor && v.constructor !== Object && v.constructor !== Array && v.constructor !== String && v.constructor !== Number && v.constructor !== Boolean;
    },
    isPOD: function (v) {
        return !_.isNonPOD(v);
    }
});
if (typeof Number.EPSILON === 'undefined') {
    Object.defineProperty(Number, 'EPSILON', {
        enumerable: true,
        get: _.constant(2.220446049250313e-16)
    });
}
_.extend(_, {
    isDecimal: function (x, tolerance) {
        if (!_.isNumber(x) || _.isNaN(x)) {
            return false;
        } else {
            return Math.abs(Math.floor(x) - x) > (tolerance || Number.EPSILON);
        }
    }
});
_.extend(_, {
    isEmpty: function (obj) {
        return _.coerceToUndefined(obj) === undefined;
    },
    isNonempty: function (obj) {
        return _.coerceToUndefined(obj) !== undefined;
    },
    isEmptyObject: function (v) {
        return !_.isArray(v) && !_.isFunction(v) && _.isObject(v) && _.keys(v).length === 0;
    },
    isStrictlyObject: function (v) {
        return v && typeof v === 'object' ? true : false;
    },
    isEmptyArray: function (v) {
        return _.isArray(v) && v.length === 0;
    },
    isNonemptyString: function (v) {
        return typeof v === 'string' && v.length > 0;
    },
    coerceToObject: function (x) {
        return _.isStrictlyObject(x) ? x : {};
    },
    coerceToEmpty: function (x) {
        if (_.isArray(x)) {
            return [];
        } else if (_.isStrictlyObject(x)) {
            return {};
        } else {
            return undefined;
        }
    },
    coerceToUndefined: function (v) {
        return v === undefined || v === null || v === Math.NaN || v === '' || _.isPOD(v) && (_.isEmptyObject(v) || v.length === 0) ? undefined : v;
    }
});
_.json = function (arg) {
    if (typeof arg === 'string') {
        try {
            return JSON.parse(arg);
        } catch (e) {
            return {};
        }
    } else {
        return JSON.stringify(arg);
    }
};
_.alignStringsRight = function (strings) {
    var lengths = strings.map(_.count);
    var max = _.max(lengths);
    return [
        lengths,
        strings
    ].zip(function (ln, str) {
        return ' '.repeats(max - ln) + str;
    });
};
_.bullet = function (bullet, str) {
    var indent = ' '.repeats(bullet.length);
    return _.joinWith('\n', _.splitWith('\n', str).map(function (line, i) {
        return i === 0 ? bullet + line : indent + line;
    }));
};
_.stringifyOneLine = function (x, cfg) {
    return _.stringify(x, _.extend(cfg || {}, { pretty: false }));
};
_.pretty = function (x, cfg) {
    return _.stringify(x, _.extend(cfg || {}, { pretty: true }));
};
_.stringify = function (x, cfg) {
    cfg = cfg || {};
    var measured = _.stringifyImpl(x, [], [], 0, cfg);
    return measured.length < 80 || 'pretty' in cfg ? measured : _.pretty(x, cfg);
};
_.stringifyPrototype = function (x) {
    if (Platform.NodeJS && x.$meta) {
        var name = '';
        x.$meta(function (values) {
            name = values.name;
        });
        return name && name + ' ()';
    } else
        return '<prototype>';
};
_.stringifyImpl = function (x, parents, siblings, depth, cfg) {
    var customFormat = cfg.formatter && cfg.formatter(x);
    if (customFormat) {
        return customFormat;
    }
    if (typeof jQuery !== 'undefined' && _.isTypeOf(jQuery, x)) {
        x = _.asArray(x);
    }
    if (x === $global) {
        return '$global';
    } else if (parents.indexOf(x) >= 0) {
        return cfg.pure ? undefined : '<cyclic>';
    } else if (siblings.indexOf(x) >= 0) {
        return cfg.pure ? undefined : '<ref:' + siblings.indexOf(x) + '>';
    } else if (x === undefined) {
        return 'undefined';
    } else if (x === null) {
        return 'null';
    } else if (_.isFunction(x)) {
        return cfg.pure ? x.toString() : _.isPrototypeConstructor(x) && _.stringifyPrototype(x) || '<function>';
    } else if (typeof x === 'string') {
        return _.quoteWith('"', x);
    } else if (_.isTypeOf(Tags, x)) {
        return _.reduce(Tags.get(x), function (memo, value, tag) {
            return _.isBoolean(value) ? tag + ' ' + memo.quote('()') : tag + ' (' + _.stringifyImpl(value, parents, siblings, 0, { pretty: false }) + ', ' + memo + ')';
        }, _.stringifyImpl($untag(x), parents, siblings, depth + 1, cfg));
    } else if (!cfg.pure && _.hasOOP && _.isPrototypeInstance(x) && $prototype.defines(x.constructor, 'toString')) {
        return x.toString();
    } else if (_.isObject(x) && !(typeof $atom !== 'undefined' && $atom.is(x))) {
        var isArray = _.isArray(x);
        var pretty = cfg.pretty || false;
        if (_.platform().engine === 'browser') {
            if (_.isTypeOf(Element, x)) {
                return '<' + x.tagName.lowercase + '>';
            } else if (_.isTypeOf(Text, x)) {
                return '@' + x.wholeText;
            }
        }
        if (x.toJSON) {
            return _.quoteWith('"', x.toJSON());
        }
        if (!cfg.pure && (depth > (cfg.maxDepth || 5) || isArray && x.length > (cfg.maxArrayLength || 30))) {
            return isArray ? '<array[' + x.length + ']>' : '<object>';
        }
        var parentsPlusX = parents.concat([x]);
        siblings.push(x);
        var values = _.pairs(x);
        var oneLine = !pretty || values.length < 2;
        var impl = _.stringifyImpl.tails2(parentsPlusX, siblings, depth + 1, cfg);
        if (pretty) {
            values = _.values(x);
            var printedKeys = _.alignStringsRight(_.keys(x).map(_.appends(': ')));
            var printedValues = values.map(impl);
            var leftPaddings = printedValues.map(function (x, i) {
                return x[0] === '[' || x[0] === '{' ? 3 : _.isString(values[i]) ? 1 : 0;
            });
            var maxLeftPadding = _.max(leftPaddings);
            var indentedValues = [
                leftPaddings,
                printedValues
            ].zip(function (padding, x) {
                return ' '.repeats(maxLeftPadding - padding) + x;
            });
            var internals = isArray ? indentedValues : [
                printedKeys,
                indentedValues
            ].zip(_.bullet);
            var printed = _.bullet(isArray ? '[ ' : '{ ', internals.join(',\n'));
            var lines = printed.split('\n');
            return printed + (' '.repeats(_.max(lines.map(_.count)) - _.count(lines.last)) + (isArray ? ' ]' : ' }'));
        }
        return _.quoteWith(isArray ? '[]' : '{  }', _.joinWith(', ', _.map(values, function (kv) {
            return (isArray ? '' : kv[0] + ': ') + impl(kv[1]);
        })));
    } else if (_.isDecimal(x) && cfg.precision > 0) {
        return _.toFixed(x, cfg.precision);
    } else {
        return x + '';
    }
};
_.toFixed = function (x, precision) {
    return x && x.toFixed && x.toFixed(precision) || undefined;
};
_.toFixed2 = function (x) {
    return _.toFixed(x, 2);
};
_.toFixed3 = function (x) {
    return _.toFixed(x, 3);
};
_.hasStdlib = true;
_.throwsError = _.higherOrder(_.throwError = function (msg) {
    throw new Error(msg);
});
_.overrideThis = _.throwsError('override this');
_.notImplemented = _.throwsError('not implemented');
_.mixin({
    values2: function (x) {
        if (_.isArray(x)) {
            return x;
        } else if (_.isStrictlyObject(x)) {
            return _.values(x);
        } else if (_.isEmpty(x)) {
            return [];
        } else {
            return [x];
        }
    }
});
_.mixin({
    map2: function (value, fn, context) {
        return _.isArray(value) ? _.map(value, fn, context) : _.isStrictlyObject(value) ? _.mapObject(value, fn, context) : fn.call(context, value);
    }
});
_.mapsWith = _.higherOrder(_.mapWith = _.flip2(_.map));
_.mapKeys = function (x, fn) {
    if (_.isArray(x)) {
        return _.map(x, _.tails2(_.mapKeys, fn));
    } else if (_.isStrictlyObject(x)) {
        return _.object(_.map(_.pairs(x), function (kv) {
            return [
                fn(kv[0]),
                _.mapKeys(kv[1], fn)
            ];
        }));
    } else {
        return x;
    }
};
_.mixin({ mapMap: _.hyperOperator(_.unary, _.map2) });
_.mixin({
    reject2: function (value, op) {
        return _.filter2(value, _.not(op));
    },
    filter2: function (value, op) {
        if (_.isArray(value)) {
            var result = [];
            for (var i = 0, n = value.length; i < n; i++) {
                var v = value[i], opSays = op(v, i);
                if (opSays === true) {
                    result.push(v);
                } else if (opSays !== false) {
                    result.push(opSays);
                }
            }
            return result;
        } else if (_.isStrictlyObject(value)) {
            var result = {};
            _.each(Object.keys(value), function (key) {
                var v = value[key], opSays = op(v, key);
                if (opSays === true) {
                    result[key] = v;
                } else if (opSays !== false) {
                    result[key] = opSays;
                }
            });
            return result;
        } else {
            var opSays = op(value);
            if (opSays === true) {
                return value;
            } else if (opSays !== false) {
                return opSays;
            } else {
                return undefined;
            }
        }
    }
});
_.mixin({ filterFilter: _.hyperOperator(_.unary, _.filter2) });
_.each2 = function (x, f) {
    if (_.isArray(x)) {
        for (var i = 0, n = x.length; i < n; i++)
            f(x[i], i, n);
    } else if (_.isStrictlyObject(x)) {
        var k = Object.keys(x);
        for (var ki, i = 0, n = k.length; i < n; i++)
            f(x[ki = k[i]], ki, n);
    } else {
        f(x, undefined, 1);
    }
};
_.reduce2 = function (_1, _2, _3) {
    var no_left = arguments.length < 3;
    var left = _1, rights = _2, op = _3;
    if (no_left) {
        left = undefined;
        rights = _1;
        op = _2;
    }
    _.each2(rights, function (right) {
        left = no_left ? right : op(left, right);
        no_left = false;
    });
    return left;
};
_.reduceReduce = function (_1, _2, _3) {
    var initial = _1, value = _2, op = _3;
    if (arguments.length < 3) {
        initial = {};
        value = _1;
        op = _2;
    }
    return _.hyperOperator(_.binary, _.reduce2, _.goDeeperAlwaysIfPossible)(initial, value, op);
};
_.concat = function (a, b) {
    var first, rest;
    if (arguments.length === 1) {
        first = a[0];
        rest = _.rest(a);
    } else {
        first = a;
        rest = _.rest(arguments);
    }
    return _.isArray(first) ? first.concat.apply(first, rest) : _.reduce2(first, rest, function (a, b) {
        if (_.isObject(a) && _.isObject(b)) {
            return _.extend({}, a, b);
        } else {
            return a + b;
        }
    });
};
_.mixin({
    zipObjectsWith: function (objects, fn) {
        return _.reduce(_.rest(objects), function (memo, obj) {
            _.each(_.union(_.keys(obj), _.keys(memo)), function (k) {
                var zipped = fn(memo && memo[k], obj && obj[k]);
                if (zipped === undefined) {
                    delete memo[k];
                } else {
                    memo[k] = zipped;
                }
            });
            return memo;
        }, _.clone(objects[0]));
    },
    zip2: function (rows_, fn_) {
        var rows = arguments.length === 2 ? rows_ : _.initial(arguments);
        var fn = arguments.length === 2 ? fn_ : _.last(arguments);
        if (!_.isArray(rows) || rows.length === 0) {
            return rows;
        } else {
            if (_.isArray(rows[0])) {
                return _.zipWith(rows, fn);
            } else if (_.isStrictlyObject(rows[0])) {
                return _.zipObjectsWith(rows, fn);
            } else {
                return _.reduce2(rows, fn);
            }
        }
    }
});
_.mixin({ zipZip: _.hyperOperator(_.binary, _.zip2) });
_.extend = $restArg(_.extend);
_.extended = _.partial(_.extend, {});
_.extendWith = _.flip(_.extend);
_.extendsWith = _.flip(_.partial(_.partial, _.flip(_.extend)));
_.extendedDeep = _.tails3(_.zipZip, function (a, b) {
    return b === undefined ? a : b;
});
_.extend2 = $restArg(function (what) {
    return _.extend(what, _.reduceRight(arguments, function (right, left) {
        return _.object(_.map(_.union(_.keys(left), _.keys(right)), function (key) {
            var lvalue = left[key];
            return [
                key,
                key in right ? typeof lvalue === 'object' ? _.extend(lvalue, right[key]) : right[key] : lvalue
            ];
        }));
    }, {}));
});
_.find2 = function (value, pred) {
    for (var i = 0, n = value.length; i < n; i++) {
        var x = pred(value[i], i, value);
        if (typeof x !== 'boolean') {
            return x;
        } else if (x === true) {
            return value[i];
        }
    }
};
_.findFind = function (obj, pred_) {
    return _.hyperOperator(_.unary, function (value, pred) {
        if (_.isArray(value)) {
            for (var i = 0, n = value.length; i < n; i++) {
                var x = pred(value[i]);
                if (typeof x !== 'boolean') {
                    return x;
                } else if (x === true) {
                    return value[i];
                }
            }
        } else if (_.isStrictlyObject(value)) {
            for (var i = 0, ks = Object.keys(value), n = ks.length; i < n; i++) {
                var k = ks[i];
                var x = pred(value[k]);
                if (typeof x !== 'boolean') {
                    return x;
                } else if (x === true) {
                    return value[k];
                }
            }
        }
        var x = pred_(value);
        if (typeof x !== 'boolean') {
            return x;
        } else if (x === true) {
            return value;
        }
        return false;
    })(obj, pred_);
};
_.nonempty = function (obj) {
    return _.filter2(obj, _.isNonempty);
};
_.extend(_, {
    cloneDeep: _.tails2(_.mapMap, function (value) {
        return _.isStrictlyObject(value) && !_.isPrototypeInstance(value) ? _.clone(value) : value;
    })
});
_.hyperMatch = _.hyperOperator(_.binary, function (a, b, pred) {
    return _.coerceToUndefined(_.nonempty(_.zip2(a, b, pred)));
});
_.diff = _.tails3(_.hyperMatch, function (a, b) {
    return $atom.unwrap(a) === $atom.unwrap(b) || a === $any || b === $any ? undefined : b;
});
_.hyperMatch = _.hyperOperator(_.binary, function (a, b, pred) {
    return _.coerceToUndefined(_.zip2(a, b, pred));
});
_.undiff = _.tails3(_.hyperMatch, function (a, b) {
    return $atom.unwrap(a) === $atom.unwrap(b) || a === $any || b === $any ? b : undefined;
});
_.extend(_, {
    index: function (list) {
        var result = {};
        for (var i = 0, n = list.length; i < n; i++) {
            result[list[i]] = true;
        }
        return result;
    }
});
_.quote = function (s, pattern_) {
    var pattern = pattern_ || '"';
    var splitAt = Math.floor(pattern.length / 2 + pattern.length % 2);
    var before = pattern.slice(0, splitAt);
    var after = pattern.slice(splitAt) || before;
    return before + s + after;
};
_.quoteWith = _.flip2(_.quote);
_.quotesWith = _.higherOrder(_.quoteWith);
_.partition2 = function (arr, pred) {
    var prevColor = undefined;
    var result = [];
    var group = [];
    _.each(arr, function (x) {
        var color = pred(x);
        if (prevColor != color && group.length) {
            result.push(group);
            group = [];
        }
        group.push(x);
        prevColor = color;
    });
    if (group.length) {
        result.push(group);
    }
    return result;
};
_.linearMerge = function (arrays, cfg) {
    cfg = cfg || { key: _.identity };
    var head = {
        key: null,
        next: {}
    };
    var nodes = {};
    _.each(arrays, function (arr) {
        for (var i = 0, n = arr.length, prev = head, node = undefined; i < n; i++, prev = node) {
            var item = arr[i];
            var key = cfg.key(item);
            node = nodes[key] || (nodes[key] = {
                key: key,
                item: item,
                next: {}
            });
            if (prev) {
                prev.next[key] = node;
            }
        }
    });
    var decyclize = function (visited, node) {
        visited[node.key] = true;
        node.next = _.chain(_.values(node.next)).filter(function (node) {
            return !(node.key in visited);
        }).map(_.partial(decyclize, visited)).value();
        delete visited[node.key];
        return node;
    };
    var ordered = function (a, b) {
        return a === b || _.some(a.next, function (aa) {
            return ordered(aa, b);
        });
    };
    var flatten = function (node) {
        if (!node)
            return [];
        var next = cfg.sort ? _.sortBy(node.next || [], cfg.sort) : node.next || [];
        return [node].concat(flatten(_.reduce(next, function (a, b) {
            if (a === b) {
                return a;
            } else if (ordered(b, a)) {
                b.next.push(a);
                return b;
            } else {
                a.next.push(b);
                return a;
            }
        })));
    };
    return _.rest(_.pluck(flatten(decyclize({}, head)), 'item'));
};
_.key = function (fn) {
    return function (value, key) {
        return fn(key);
    };
};
_.filterKeys = function (arr, predicate) {
    return _.filter(arr, function (v, k) {
        return predicate(k);
    });
};
_.rejectKeys = function (arr, predicate) {
    return _.reject(arr, function (v, k) {
        return predicate(k);
    });
};
_.pickKeys = function (obj, predicate) {
    return _.pick(obj, function (v, k) {
        return predicate(k);
    });
};
_.omitKeys = function (obj, predicate) {
    return _.omit(obj, function (v, k) {
        return predicate(k);
    });
};
_.extend(_, {
    defineProperty: function (targetObject, name, def, defaultCfg) {
        if (Object.hasOwnProperty(targetObject, name)) {
            throw new Error('_.defineProperty: targetObject already has property ' + name);
        } else {
            Object.defineProperty(targetObject, name, _.extend({ enumerable: true }, defaultCfg, _.coerceToPropertyDefinition(def, name)));
        }
    },
    defineHiddenProperty: function (targetObject, name, def, defaultCfg) {
        return _.defineProperty(targetObject, name, def, _.extend({ enumerable: false }, defaultCfg));
    },
    defineMemoizedProperty: function (targetObject, name, def_, defaultCfg) {
        var def = _.coerceToPropertyDefinition(def_, name);
        return _.defineProperty(targetObject, name, _.extend({}, def, { get: _.memoizeToThis('_' + name, def.get) }), defaultCfg);
    },
    defineProperties: function (targetObject, properties) {
        _.each(properties, _.defineProperty.partial(targetObject).flip2);
    },
    memoizeToThis: function (name, fn) {
        return function () {
            var memo = this[name];
            return memo !== undefined ? memo : this[name] = fn.call(this);
        };
    },
    coerceToPropertyDefinition: function (value_, name) {
        var value = value_ || {};
        var actualValue = typeof Tags === 'undefined' ? value_ : Tags.unwrap(value_);
        return !value.$constant && !value.$get && _.isPropertyDefinition(actualValue) && actualValue || (value.$get || !value.$constant && _.isFunction(actualValue) && _.noArgs(actualValue)) && {
            get: actualValue,
            set: _.throwsError('cannot change ' + (name || 'property') + ' (as it\'s an accessor function)')
        } || !value.$get && {
            get: _.constant(actualValue),
            set: _.throwsError('cannot change ' + (name || 'property') + ' (as it\'s sealed to ' + actualValue + ')')
        } || _.throwsError('coerceToPropertyDefinition: crazy input, unable to match')();
    },
    isPropertyDefinition: function (obj) {
        return _.isObject(obj) && (_.isFunction(obj.get) || _.isFunction(obj.set));
    },
    ownProperties: function (obj) {
        return obj && _.pickKeys(obj, obj.hasOwnProperty.bind(obj)) || {};
    }
});
_.hasTags = true;
Tags = _.extend2(function (subject) {
    if (subject !== undefined) {
        this.subject = subject;
    }
}, {
    $definition: {},
    prototype: {
        add: function (name, additionalData) {
            return this[_.keyword(name)] = additionalData || true, this;
        },
        clone: function (newSubject) {
            return _.extend(new Tags(newSubject || this.subject), _.pick(this, _.keyIsKeyword));
        },
        modify: function (changesFn) {
            this.subject = changesFn(this.subject);
            if (_.isTypeOf(Tags, this.subject)) {
                return _.extend(this.subject, _.pick(this, _.keyIsKeyword));
            } else {
                return this;
            }
        }
    },
    clone: function (what, newSubject) {
        return _.isTypeOf(Tags, what) ? what.clone(newSubject) : newSubject || what;
    },
    get: function (def) {
        return _.isTypeOf(Tags, def) ? _.pick(def, _.keyIsKeyword) : {};
    },
    hasSubject: function (def) {
        return _.isTypeOf(Tags, def) && 'subject' in def;
    },
    matches: function (name) {
        return function (obj) {
            return obj && obj[_.keyword(name)] !== undefined;
        };
    },
    unwrapAll: function (definition) {
        return _.map2(definition, Tags.unwrap);
    },
    unwrap: function (what) {
        return _.isTypeOf(Tags, what) ? what.subject : what;
    },
    wrap: function (what) {
        return _.isTypeOf(Tags, what) ? what : arguments.length === 0 ? new Tags() : new Tags(what);
    },
    modify: function (what, changesFn) {
        return _.isTypeOf(Tags, what) ? what.clone().modify(changesFn) : changesFn(what);
    },
    map: function (obj, op) {
        return Tags.modify(obj, function (obj) {
            return _.map2(obj, function (t, k) {
                return Tags.modify(t, function (v) {
                    return op(v, k, _.isTypeOf(Tags, t) ? t : undefined);
                });
            });
        });
    },
    add: function (name, toWhat, additionalData) {
        return Tags.wrap.apply(null, _.rest(arguments, 1)).add(name, additionalData);
    }
});
_.keyword = function (name) {
    return '$' + name;
};
_.isKeyword = function (key) {
    return key[0] == '$';
};
_.keywordName = function (x) {
    return _.isKeyword(x) ? x.slice(1) : x;
};
_.keywords = function (obj) {
    return _.pick(obj, _.keyIsKeyword);
};
_.tagKeywords = {};
_.isTagKeyword = function (k) {
    return _.keywordName(k) in _.tagKeywords;
};
_.keyIsKeyword = function (value, key) {
    return _.isKeyword(key[0]);
};
_.defineKeyword = function (name, value) {
    _.defineProperty(_.global(), _.keyword(name), value);
};
_.defineKeyword('global', _.global);
_.defineKeyword('platform', _.platform);
_.defineKeyword('untag', Tags.unwrap);
_.defineTagKeyword = function (k, fn) {
    fn = _.isFunction(fn) && fn || _.identity;
    if (!(_.keyword(k) in $global)) {
        _.defineKeyword(k, Tags.add('constant', _.extendWith({ matches: Tags.matches(k) }, fn(function (a, b) {
            if (arguments.length < 2) {
                return Tags.add(k, a);
            } else {
                return Tags.add(k, b, a);
            }
        }))));
        _.tagKeywords[k] = true;
    }
    var kk = _.keyword(k);
    return _.extend($global[kk], {
        is: function (x) {
            return _.isTypeOf(Tags, x) && kk in x || false;
        },
        isNot: function (x) {
            return !(_.isTypeOf(Tags, x) && kk in x) || false;
        },
        unwrap: function (x) {
            return $atom.matches(x) === true ? Tags.unwrap(x) : x;
        }
    });
};
_([
    'constant',
    'get',
    'once',
    'async'
]).each(_.defineTagKeyword);
_.defineModifierKeyword = function (name, fn) {
    _.defineKeyword(name, function (val) {
        return Tags.modify(val, fn);
    });
};
_.deleteKeyword = function (name) {
    delete $global[_.keyword(name)];
};
_.defineTagKeyword('required');
_.defineTagKeyword('atom');
_.defineKeyword('any', _.identity);
(function () {
    _.isMeta = function (x) {
        return x === $any || $atom.is(x) === true || $required.is(x) === true;
    };
    var zip = function (type, value, pred) {
        var required = Tags.unwrapAll(_.filter2(type, $required.matches));
        var match = _.nonempty(_.zip2(Tags.unwrapAll(type), value, pred));
        if (_.isEmpty(required)) {
            return match;
        } else {
            var requiredMatch = _.nonempty(_.zip2(required, value, pred));
            var allSatisfied = _.values2(required).length === _.values2(requiredMatch).length;
            return allSatisfied ? match : _.coerceToEmpty(value);
        }
    };
    var hyperMatch = _.hyperOperator(_.binary, function (type_, value, pred) {
        var type = Tags.unwrap(type_);
        if (_.isArray(type)) {
            if (_.isArray(value)) {
                return zip(_.times(value.length, _.constant(type[0])), value, pred);
            } else {
                return undefined;
            }
        } else if (_.isStrictlyObject(type) && type['*']) {
            if (_.isStrictlyObject(value)) {
                return zip(_.extend(_.map2(value, _.constant(type['*'])), _.omit(type, '*')), value, pred);
            } else {
                return undefined;
            }
        } else {
            return zip(type_, value, pred);
        }
    });
    var typeMatchesValue = function (c, v) {
        var contract = Tags.unwrap(c);
        return contract === undefined && v === undefined || _.isFunction(contract) && (_.isPrototypeConstructor(contract) ? _.isTypeOf(contract, v) : contract(v)) || typeof v === contract || v === contract;
    };
    _.mismatches = function (op, contract, value) {
        return hyperMatch(contract, value, function (contract, v) {
            return op(contract, v) ? undefined : contract;
        });
    };
    _.omitMismatches = function (op, contract, value) {
        return hyperMatch(contract, value, function (contract, v) {
            return op(contract, v) ? v : undefined;
        });
    };
    _.typeMismatches = _.partial(_.mismatches, typeMatchesValue);
    _.omitTypeMismatches = _.partial(_.omitMismatches, typeMatchesValue);
    _.valueMismatches = _.partial(_.mismatches, function (a, b) {
        return a === $any || b === $any || a === b;
    });
    var unifyType = function (value) {
        if (_.isArray(value)) {
            return _.nonempty([_.reduce(_.rest(value), function (a, b) {
                    return _.undiff(a, b);
                }, _.first(value) || undefined)]);
        } else if (_.isStrictlyObject(value)) {
            var pairs = _.pairs(value);
            var unite = _.map(_.reduce(_.rest(pairs), function (a, b) {
                return _.undiff(a, b);
            }, _.first(pairs) || [
                undefined,
                undefined
            ]), _.nonempty);
            return _.isEmpty(unite) || _.isEmpty(unite[1]) ? value : _.object([[
                    unite[0] || '*',
                    unite[1]
                ]]);
        } else {
            return value;
        }
    };
    _.decideType = function (value) {
        var operator = _.hyperOperator(_.unary, function (value, pred) {
            if (value && value.constructor && value.constructor.$definition) {
                return value.constructor;
            }
            return unifyType(_.map2(value, pred));
        });
        return operator(value, function (value) {
            if (_.isPrototypeInstance(value)) {
                return value.constructor;
            } else {
                return _.isEmptyArray(value) ? value : typeof value;
            }
        });
    };
}());
_.cps = function () {
    return _.cps.sequence.apply(null, arguments);
};
_.cps.apply = function (fn, this_, args_, then) {
    var args = _.asArray(args_);
    var lastArgN = _.numArgs(fn) - 1;
    var thenArg = args[lastArgN];
    args[lastArgN] = function () {
        then.call(this, arguments, thenArg);
    };
    return fn.apply(this_, args);
};
_.extend(_.cps, {
    each: function (obj, elem, complete, index_, length_, keys_) {
        var self = arguments.callee;
        var index = index_ || 0;
        var keys = index === 0 ? obj.length === undefined ? _.keys(obj) : undefined : keys_;
        var length = index === 0 ? keys ? keys.length : obj.length : length_;
        var passKey = _.numArgs(elem) !== 2;
        if (!obj || index >= (length || 0)) {
            if (complete) {
                complete();
            }
        } else {
            var key = keys ? keys[index] : index;
            var next = function () {
                self(obj, elem, complete, index + 1, length, keys);
            };
            if (passKey) {
                elem(obj[key], key, next, complete, obj);
            } else {
                elem(obj[key], next, complete, obj);
            }
        }
    }
});
_.extend(_.cps, {
    map: function (obj, iter, complete) {
        var result = _.isArray(obj) ? [] : {};
        _.cps.each(obj, _.numArgs(iter) == 2 ? function (x, i, next) {
            iter(x, function (y) {
                result[i] = y;
                next();
            });
        } : function (x, i, next) {
            iter(x, i, function (y) {
                result[i] = y;
                next();
            });
        }, function () {
            complete(result);
        });
    }
});
_.extend(_.cps, {
    find: function (obj, pred, complete) {
        var passKey = _.numArgs(pred) !== 2;
        _.cps.each(obj, function (x, key, next, complete) {
            var take = function (match) {
                if (match === false) {
                    next();
                } else {
                    complete(match === true ? x : match, key);
                }
            };
            if (passKey) {
                pred(x, key, take);
            } else {
                pred(x, take);
            }
        }, complete);
    }
});
_.extend(_.cps, {
    memoize: function (fn) {
        return _.barrier ? _.cps._betterMemoize(fn) : _.cps._poorMemoize(fn);
    },
    _poorMemoize: function (fn) {
        var cache = {};
        return function (value, then) {
            if (value in cache) {
                then(cache[value]);
            } else {
                fn.call(this, value, function (result) {
                    then(cache[value] = result);
                });
            }
        };
    },
    _betterMemoize: function (fn) {
        var cache = {};
        switch (_.numArgs(fn)) {
        case 1:
            return function (then) {
                if (!cache.already) {
                    fn.call(this, cache = _.barrier());
                }
                cache(then);
            };
        case 2:
            cache = {};
            return function (value, then) {
                if (!(value in cache)) {
                    fn.call(this, value, cache[value] = _.barrier());
                }
                cache[value](then);
            };
        default:
            throw new Error('_.cps.memoize: unsupported number of arguments');
        }
    }
});
(function () {
    var reduce = function (array, op, then, memo, index) {
        if (!array || index >= (array.length || 0)) {
            then(memo);
        } else {
            op(memo, array[index], function (result) {
                reduce(array, op, then, result, index + 1);
            });
        }
    };
    _.cps.reduce = function (array, op, then, memo) {
        if (arguments.length < 4) {
            reduce(array, op, then, array[0], 1);
        } else {
            reduce(array, op, then, memo, 0);
        }
    };
}());
_.extend(_.cps, {
    noop: $restArg(function () {
        return _.last(arguments).call(this);
    }),
    identity: $restArg(function () {
        var args = _.initial(arguments), then = _.last(arguments);
        if (then) {
            return then.apply(this, args);
        }
    }),
    constant: $restArg(function () {
        var args = arguments;
        return function () {
            return _.last(arguments).apply(this, args);
        };
    })
});
_.cps.arity0 = function (fn) {
    return function () {
        fn.call(this, _.last(arguments));
    };
};
_.cps.arity1 = function (fn) {
    return function () {
        fn.call(this, arguments[0], _.last(arguments));
    };
};
_.cps.arity2 = function (fn) {
    return function () {
        fn.call(this, arguments[0], arguments[1], _.last(arguments));
    };
};
_.cps.transformResult = function (operator, fn) {
    return function (args) {
        fn.apply(this, _.initial(arguments).concat(operator(_.last(arguments))));
    };
};
_.cps.resultArity2 = _.partial(_.cps.transformResult, _.arity2);
_.cps.resultArity1 = _.partial(_.cps.transformResult, _.arity1);
_.cps.resultArity0 = _.partial(_.cps.transformResult, _.arity0);
_.cps.sequence = $restArg(function (arr) {
    var functions = _.isArray(arr) && arr || _.asArray(arguments);
    return _.reduceRight(functions, function (a, b) {
        return function () {
            return b.apply(this, _.asArray(arguments).concat(a));
        };
    }, _.cps.identity);
});
_.cps.compose = $restArg(function (arr) {
    var functions = _.isArray(arr) && arr || _.asArray(arguments);
    return _.cps.sequence(functions.slice().reverse());
});
_.cps.trySequence = function (functions, then, err) {
    _.reduceRight(functions, function (a, b) {
        return function (e) {
            if (_.isTypeOf(Error, e)) {
                return (err || then)(e);
            } else {
                try {
                    return b.apply(this, _.asArray(arguments).concat(a));
                } catch (e) {
                    return (err || then)(e);
                }
            }
        };
    }, then)();
};
_([
    'method',
    'property',
    'flipped'
]).each(_.defineTagKeyword);
$extensionMethods = function (Type, methods) {
    _.each(methods, function (tags, name) {
        var fn = Tags.unwrap(tags);
        if (!(name in _)) {
            _[name] = _[name] || fn;
        }
        if (!tags.$method && (tags.$property || _.oneArg(fn))) {
            if (!(name in Type.prototype)) {
                _.defineHiddenProperty(Type.prototype, name, function () {
                    return fn(this);
                });
            }
        } else if (!tags.$property) {
            if (!(name in Type.prototype)) {
                Type.prototype[name] = _.asMethod(tags.$flipped ? _.flip(fn) : fn);
            }
        } else {
            throw new Error('$extensionMethods: crazy input, unable to match');
        }
    });
};
$extensionMethods(Function, {
    $: $method(_.partial),
    bind: _.bind,
    partial: _.partial,
    tails: _.tails,
    tails2: _.tails2,
    tails3: _.tails3,
    compose: _.compose,
    then: _.then,
    flip: _.flip,
    flip2: _.flip2,
    flip3: _.flip3,
    asFreeFunction: _.asFreeFunction,
    asMethod: _.asMethod,
    calls: function (fn) {
        return _.higherOrder(fn);
    },
    returns: function (fn, returns) {
        return function () {
            fn.apply(this, arguments);
            return returns;
        };
    },
    asPromise: function (f) {
        return new Promise(f);
    },
    asContinuation: function (f) {
        return $restArg(function () {
            _.last(arguments)(f.apply(this, _.initial(arguments)));
        });
    },
    wraps: function (f, w) {
        f._wrapped = _.withSameArgs(f, w);
        return f;
    },
    wrapped: function (f) {
        return f._wrapped || f;
    },
    original: function (f) {
        while (f && f._wrapped) {
            f = f._wrapped;
        }
        return f;
    },
    arity0: _.arity0,
    arity1: _.arity1,
    arity2: _.arity2,
    arity3: _.arity3,
    or: _.or,
    and: _.and,
    not: _.not,
    applies: _.applies,
    oneShot: function (fn) {
        var called = false;
        return function () {
            if (!called) {
                called = true;
                return fn.apply(this, arguments);
            }
        };
    },
    memoized: _.memoize,
    throttled: _.throttle,
    debounced: function (func, wait, immediate) {
        var timestamp, timeout, result, args, context;
        var later = function () {
            var last = Date.now() - timestamp;
            if (last < wait && last > 0) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    if (!timeout) {
                        context = args = null;
                    }
                }
            }
        };
        var debouncedFn = function () {
            context = this;
            args = arguments;
            timestamp = Date.now();
            var callNow = immediate && !timeout;
            if (!timeout) {
                timeout = setTimeout(later, wait);
            }
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }
            return result;
        };
        debouncedFn.cancel = function () {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
        };
        debouncedFn.callImmediately = function () {
            debouncedFn.cancel();
            func.apply(context, args);
        };
        return debouncedFn;
    },
    postpone: $method(function (fn) {
        fn.postponed.apply(null, arguments);
    }),
    postponed: function (fn) {
        return function () {
            var args = arguments, this_ = this;
            if (!fn._postponed) {
                fn._postponed = true;
                _.delay(function () {
                    fn._postponed = false;
                    fn.apply(this, args);
                });
            }
        };
    },
    delay: _.delay,
    delayed: function (fn, time) {
        return function () {
            var args = arguments, context = this;
            _.delay(function () {
                fn.apply(context, args);
            }, time);
        };
    }
});
_.tests.Function.catches = function () {
    $assert('yo', _.constant('yo').catches($fails)(), _.identity.catches($fails)('yo'), _.throwsError('xx').catches('yo')());
    $assertThrows(function () {
        _.constant('yo').catches(function () {
            $assert('catch handler shoudnt work on passed continuations');
        }, _.throwsError('xx'))();
    });
    $assert(function (x) {
        throw x;
    }.catches(_.appends('+error_case'), _.appends('+no_error_case'), _.appends('+finally'))('foo'), 'foo+error_case+finally');
    $assertMatches(_.throwError.catches()('yo'), { message: 'yo' });
    $assert(_.catches(_.throwsError(42), $assertMatches.$({ message: 42 }).returns('yo'))(), 'yo');
    $assertCPS(_.constant('yo').catches($fails), 'yo');
};
$extensionMethods(Function, {
    catch_: function (fn, catch_, then, finally_) {
        return fn.catches(catch_, then)();
    },
    catches: function (fn, catch_, then, finally_) {
        var args = arguments.length;
        catch_ = args > 1 ? _.coerceToFunction(catch_) : _.identity;
        then = args > 2 ? _.coerceToFunction(then) : _.identity;
        finally_ = args > 3 ? _.coerceToFunction(finally_) : _.identity;
        return function () {
            var result = undefined, catched = false;
            try {
                result = fn.apply(this, arguments);
            } catch (e) {
                result = catch_(e);
                catched = true;
            }
            if (!catched) {
                result = then(result);
            }
            return finally_(result);
        };
    }
});
if (typeof Promise !== 'undefined') {
    Promise.prototype.done = function (resolve, reject) {
        return this.then(resolve, reject).catch(_.globalUncaughtExceptionHandler || _.throws);
    };
}
;
$extensionMethods(Array, {
    each: _.each,
    map: _.map,
    reduce: _.reduce,
    reduceRight: _.reduceRight,
    zip: _.zipWith,
    groupBy: _.groupBy,
    indexBy: _.indexBy,
    filter: _.filter,
    flat: _.flatten.tails2(true),
    object: _.object,
    contains: function (arr, item) {
        return arr.indexOf(item) >= 0;
    },
    top: function (arr) {
        return arr[arr.length - 1];
    },
    first: function (arr) {
        return arr[0];
    },
    last: function (arr) {
        return arr[arr.length - 1];
    },
    take: function (arr, n) {
        return arr.slice(0, n);
    },
    before: function (arr, x) {
        var i = arr.indexOf(x);
        return i < 0 ? arr : arr.slice(0, i - 1);
    },
    after: function (arr, x) {
        var i = arr.indexOf(x);
        return i < 0 ? arr : arr.slice(i + 1);
    },
    isEmpty: function (arr) {
        return arr.length === 0;
    },
    notEmpty: function (arr) {
        return arr.length > 0;
    },
    lastIndex: function (arr) {
        return arr.length - 1;
    },
    random: function (arr) {
        return arr[_.random(0, arr.lastIndex)];
    },
    copy: function (arr) {
        return arr.slice(0);
    },
    removeAll: $method(function (arr) {
        return arr.splice(0, arr.length), arr;
    }),
    remove: function (arr, item) {
        var i;
        while ((i = arr.indexOf(item)) !== -1) {
            arr.splice(i, 1);
        }
        return arr;
    },
    removeAt: function (arr, index) {
        arr.splice(index, 1);
        return arr;
    },
    insertAt: function (arr, item, index) {
        arr.splice(index, 0, item);
        return arr;
    },
    itemAtWrappedIndex: function (arr, i) {
        return arr[i % arr.length];
    },
    reversed: function (arr) {
        return arr.slice().reverse();
    },
    swap: $method(function (arr, indexA, indexB) {
        var a = arr[indexA], b = arr[indexB];
        arr[indexA] = b;
        arr[indexB] = a;
        return arr;
    })
});
_.zap = function (firstArg) {
    var zippo = _.last(arguments);
    return _.reduce(_.rest(_.initial(arguments)), function (memo, row) {
        return _.times(Math.max(memo.length, row.length), function (i) {
            return zippo(memo[i], row[i]);
        });
    }, firstArg);
};
$extensionMethods(String, {
    quote: _.quote,
    contains: function (s, other) {
        return s.indexOf(other) >= 0;
    },
    cut: function (s, from) {
        return s.substring(0, from - 1) + s.substring(from, s.length);
    },
    insert: function (s, position, what) {
        return s.substring(0, position) + what + s.substring(position, s.length);
    },
    lowercase: function (s) {
        return s.toLowerCase();
    },
    uppercase: function (s) {
        return s.toUpperCase();
    },
    trimmed: function (s) {
        return s.trim();
    },
    escaped: function (s) {
        return _.escape(s);
    },
    repeats: function (s, n) {
        return _.times(n, _.constant(s)).join('');
    },
    prepend: function (s, other) {
        return other + s;
    },
    append: function (s, other) {
        return s + other;
    },
    first: function (s, n) {
        return _.first(s, n).join('');
    },
    last: function (s, n) {
        return _.last(s, n).join('');
    },
    reversed: function (s) {
        return s.split('').reverse().join('');
    },
    capitalized: function (s) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    },
    decapitalized: function (s) {
        return s.charAt(0).toLowerCase() + s.slice(1);
    },
    latinAlphanumericValue: function (s) {
        return s.replace(/[^a-z0-9]/gi, '');
    },
    alphanumericValue: function (s) {
        return s.replace(unicode_hack(/[^0-9\p{L}|^0-9\p{N}|^0-9\p{Pc}|^0-9\p{M}]/g), '');
    },
    numericValue: function (s) {
        return s.replace(/[^0-9]/g, '');
    },
    integerValue: function (s) {
        return s.numericValue.parsedInt;
    },
    parsedInt: function (s) {
        var result = parseInt(s, 10);
        return _.isFinite(result) ? result : undefined;
    },
    bytes: function (s) {
        var bytes = new Uint8Array(s.length);
        for (var i = 0; i < s.length; ++i) {
            bytes[i] = s.charCodeAt(i);
        }
        return bytes;
    },
    hash: function (s) {
        var hash = 0, i, chr, len;
        if (s.length === 0) {
            return hash;
        }
        for (i = 0, len = s.length; i < len; i++) {
            chr = s.charCodeAt(i);
            hash = (hash << 5) - hash + chr;
            hash |= 0;
        }
        return hash;
    },
    transliterate: function () {
        var table = _.extend({
            'а': 'a',
            'б': 'b',
            'в': 'v',
            'г': 'g',
            'д': 'd',
            'е': 'e',
            'ё': 'yo',
            'ж': 'zh',
            'з': 'z',
            'и': 'i',
            'й': 'y',
            'к': 'k',
            'л': 'l',
            'м': 'm',
            'н': 'n',
            'о': 'o',
            'п': 'p',
            'р': 'r',
            'с': 's',
            'т': 't',
            'у': 'u',
            'ф': 'ph',
            'х': 'h',
            'ц': 'ts',
            'ч': 'ch',
            'ш': 'sh',
            'щ': 'sch',
            'ь': '',
            'ъ': '',
            'ы': 'y',
            'э': 'e',
            'ю': 'yu',
            'я': 'ya'
        }, _.object(_.map('_-1234567890qwertyuiopasdfghjklzxcvbnm', function (x) {
            return [
                x,
                x
            ];
        })));
        return function (s) {
            var result = '';
            var source = (s || '').toLowerCase();
            for (var i = 0, n = source.length; i < n; i++) {
                var c = source[i];
                var x = table[c] || '';
                result += x;
            }
            return result;
        };
    }(),
    fixedEncodeURIComponent: function (s, constraint) {
        return encodeURIComponent(s).replace(constraint ? constraint : /[!'().,*-]/g, function (c) {
            return '%' + c.charCodeAt(0).toString(16);
        });
    }
});
(function () {
    var hooks = [
        'onceBefore',
        'onceAfter',
        'onBefore',
        'onAfter',
        'intercept'
    ];
    var hooksShort = [
        'onceBefore',
        'onceAfter',
        'before',
        'after',
        'intercept'
    ];
    var copyHooks = function (from, to) {
        _.extend(to, _.map2(_.pick(from, hooks), _.clone));
    };
    var makeBindable = function (obj, targetMethod) {
        var method = obj[targetMethod];
        return _.isBindable(method) ? method : obj[targetMethod] = _.bindable(method);
    };
    var hookProc = function (name) {
        return function (obj, targetMethod, delegate) {
            var bindable = makeBindable(obj, targetMethod);
            return bindable[name].call(bindable, delegate);
        };
    };
    var mixin = function (method, context) {
        if (typeof method !== 'function') {
            throw new Error('method should be a function');
        }
        return _.extend({}, method, {
            _bindable: true,
            impl: method,
            _wrapped: method,
            context: context
        }, _.object(_.map(hooks, function (name) {
            var queueName = '_' + name;
            var once = name.indexOf('once') >= 0;
            return [
                name,
                function (fn) {
                    if (!_.isBindable(this)) {
                        throw new Error('wrong this');
                    }
                    var queue = this[queueName];
                    if (!once || queue.indexOf(fn) < 0) {
                        this[queueName].push(fn);
                    }
                    return this;
                }
            ];
        })), _.object(_.map(hooks, function (name) {
            return [
                '_' + name,
                []
            ];
        })));
    };
    _.extend(_, _.mapObject(_.invert(hooks), hookProc.flip2), {
        unbind: function (obj, targetMethod, delegate) {
            var method = obj[targetMethod];
            if (_.isBindable(method)) {
                _.each(hooks, function (hook) {
                    method['_' + hook] = _.without(method['_' + hook], delegate);
                });
            }
        },
        isBindable: function (fn) {
            return fn && fn._bindable ? true : false;
        },
        bindable: _.extendWith({
            hooks: hooks,
            hooksShort: hooksShort
        }, function (method, context) {
            return _.withSameArgs(method, _.extendWith(mixin(method, context), function () {
                var wrapper = arguments.callee;
                var onceBefore = wrapper._onceBefore;
                var onceAfter = wrapper._onceAfter;
                var before = wrapper._onBefore;
                var after = wrapper._onAfter;
                var intercept = wrapper._intercept;
                var this_ = context || this;
                var i, ni = undefined;
                if (onceBefore.length) {
                    for (i = 0, ni = onceBefore.length; i < ni; i++) {
                        onceBefore[i].apply(this_, arguments);
                    }
                    onceBefore.removeAll();
                }
                for (i = 0, ni = before.length; i < ni; i++) {
                    before[i].apply(this_, arguments);
                }
                var result = (intercept.length ? _.cps.compose([method].concat(intercept)) : method).apply(this_, arguments);
                if (after.length || onceAfter.length) {
                    var args = _.asArray(arguments).concat(result);
                    for (i = 0, ni = after.length; i < ni; i++) {
                        after[i].apply(this_, args);
                    }
                    if (onceAfter.length) {
                        for (i = 0, ni = onceAfter.length; i < ni; i++) {
                            onceAfter[i].apply(this_, args);
                        }
                        onceAfter.removeAll();
                    }
                }
                return result;
            }));
        })
    });
}());
_.extend(_, {
    gatherChanges: function (observables_) {
        var observables = _.isArray(observables_) ? observables_ : _.initial(arguments);
        var accept = _.last(arguments);
        var gather = function (value) {
            accept.apply(this, _.pluck(observables, 'value'));
        };
        _.each(observables, function (read) {
            read(gather);
        });
    },
    allTriggered: function (triggers, then) {
        var triggered = [];
        if (triggers.length > 0) {
            _.each(triggers, function (t) {
                t(function () {
                    triggered = _.union(triggered, [t]);
                    if (then && triggered.length === triggers.length) {
                        then();
                        then = undefined;
                    }
                });
            });
        } else {
            then();
        }
    },
    observableRef: function (value) {
        return _.extend(_.observable.apply(this, arguments), { trackReference: true });
    },
    observable: function (value) {
        var stream = _.stream({
            hasValue: arguments.length > 0,
            value: value,
            read: _.identity,
            read: function (schedule) {
                return function (returnResult) {
                    if (stream.hasValue) {
                        returnResult.call(this, stream.value);
                    }
                    schedule.call(this, returnResult);
                };
            },
            write: function (returnResult) {
                return function (value) {
                    if (stream.beforeWrite) {
                        value = stream.beforeWrite(value);
                    }
                    if (!stream.hasValue || !(stream.trackReference ? stream.value === value : _.isEqual(stream.value, value))) {
                        var prevValue = stream.value;
                        var hadValue = stream.hasValue;
                        stream.hasValue = true;
                        stream.value = value;
                        if (hadValue) {
                            returnResult.call(this, false, stream.value, prevValue);
                        } else {
                            returnResult.call(this, false, stream.value);
                        }
                    }
                };
            }
        });
        if (arguments.length) {
            stream.apply(this, arguments);
        }
        return _.extend(stream, {
            force: function (value) {
                stream.hasValue = false;
                stream(value || stream.value);
            },
            when: function (match, then) {
                var matchFn = _.isFunction(match) ? match : _.equals(match);
                stream(function (val) {
                    if (matchFn(val)) {
                        stream.off(arguments.callee);
                        then(val);
                    }
                });
            }
        });
    },
    barrier: function (defaultValue) {
        var defaultListener = undefined;
        if (_.isFunction(defaultValue)) {
            defaultListener = defaultValue;
            defaultValue = undefined;
        }
        var barrier = _.stream({
            already: defaultValue !== undefined,
            value: defaultValue,
            reset: function () {
                barrier.already = false;
                delete barrier.value;
            },
            write: function (returnResult) {
                return function (value) {
                    if (!barrier.already) {
                        barrier.already = true;
                        barrier.value = value;
                    }
                    returnResult.call(this, true, barrier.value);
                };
            },
            read: function (schedule) {
                return function (returnResult) {
                    if (barrier.already) {
                        returnResult.call(this, barrier.value);
                    } else {
                        schedule.call(this, returnResult);
                    }
                };
            }
        });
        if (defaultListener) {
            barrier(defaultListener);
        }
        return barrier;
    },
    triggerOnce: $restArg(function () {
        var stream = _.stream({
            read: function (schedule) {
                return function (listener) {
                    if (stream.queue.indexOf(listener) < 0) {
                        schedule.call(this, listener);
                    }
                };
            },
            write: function (writes) {
                return writes.partial(true);
            }
        }).apply(this, arguments);
        return stream;
    }),
    trigger: $restArg(function () {
        return _.stream({
            read: _.identity,
            write: function (writes) {
                return writes.partial(false);
            }
        }).apply(this, arguments);
    }),
    off: function (fn, what) {
        if (fn.queue) {
            if (arguments.length === 1) {
                fn.queue.off();
            } else {
                fn.queue.off(what);
            }
        }
        if (fn.queuedBy) {
            _.each(fn.queuedBy, function (queue) {
                queue.remove(fn);
            });
            delete fn.queuedBy;
        }
    },
    stream: function (cfg_) {
        var cfg = cfg_ || {};
        var queue = _.extend([], {
            off: function (fn) {
                if (this.length) {
                    if (arguments.length === 0) {
                        _.each(this, function (fn) {
                            fn.queuedBy.remove(this);
                        }, this);
                        this.removeAll();
                    } else {
                        if (fn.queuedBy) {
                            fn.queuedBy.remove(this);
                            this.remove(fn);
                        }
                    }
                }
            }
        });
        var self = undefined;
        var scheduleRead = function (fn) {
            if (queue.indexOf(fn) < 0) {
                if (fn.queuedBy) {
                    fn.queuedBy.push(queue);
                } else {
                    fn.queuedBy = [queue];
                }
                queue.push(fn);
            }
        };
        var commitPendingReads = function (flush, __args__) {
            var args = _.rest(arguments), schedule = queue.copy, context = self.context;
            if (flush) {
                queue.off();
            }
            _.each(schedule, function (fn) {
                if (self.postpones) {
                    fn.postponed.apply(this, args);
                } else {
                    fn.apply(this, args);
                }
            }, context || this);
        };
        var write = cfg.write(commitPendingReads);
        var read = cfg.read(scheduleRead);
        var frontEnd = function (fn) {
            if (_.isFunction(fn)) {
                read.call(this, fn);
            } else {
                write.apply(this, arguments);
            }
            return arguments.callee;
        };
        var once = function (then) {
            if (!_.find(queue, function (f) {
                    return f.onceWrapped_ === then;
                })) {
                read(_.extend(function (v) {
                    _.off(self, arguments.callee);
                    then(v);
                }, { onceWrapped_: then }));
            }
        };
        return self = _.extend($restArg(frontEnd), cfg, {
            queue: queue,
            once: once,
            off: _.off.asMethod,
            read: read,
            write: write,
            postpone: function () {
                this.postponed.apply(self.context, arguments);
            }
        });
    }
});
_.hasOOP = true;
_([
    'property',
    'static',
    'final',
    'alias',
    'memoized',
    'private',
    'builtin',
    'testArguments'
]).each(_.defineTagKeyword);
$prototype = function (arg1, arg2) {
    return $prototype.impl.compile.apply($prototype.impl, arguments.length > 1 ? _.asArray(arguments).reverse() : arguments);
};
$extends = function (base, def) {
    return $prototype(base, def || {});
};
$mixin = function (constructor, def) {
    return $prototype.impl.compileMixin(_.extend(def, { constructor: constructor }));
};
_.extend($prototype, {
    isConstructor: function (what) {
        return _.isPrototypeConstructor(what);
    },
    macro: function (arg, fn) {
        if (arguments.length === 1) {
            $prototype.impl.alwaysTriggeredMacros.push(arg);
        } else {
            $prototype.impl.memberNameTriggeredMacros[arg] = fn;
        }
    },
    macroTag: function (name, fn) {
        _.defineTagKeyword(name);
        $prototype.impl.tagTriggeredMacros[_.keyword(name)] = fn;
    },
    each: function (visitor) {
        var namespace = $global;
        for (var k in namespace) {
            if (!_.isKeyword(k)) {
                var value = namespace[k];
                if ($prototype.isConstructor(value)) {
                    visitor(value, k);
                }
            }
        }
    },
    defines: function (constructor, member) {
        return _.find($prototype.inheritanceChain(constructor), function (supa) {
            return supa.$definition && supa.$definition.hasOwnProperty(member) || false;
        }) ? true : false;
    },
    inheritanceChain: function (def) {
        var chain = [];
        while (def) {
            chain.push(def);
            def = def.$base && def.$base.constructor;
        }
        return chain;
    },
    wrapMethods: function (def, op) {
        return Tags.map(def, function (fn, k, t) {
            return _.isFunction(fn) ? op(fn, k, t).wraps(fn) : fn;
        });
    },
    impl: {
        alwaysTriggeredMacros: [],
        memberNameTriggeredMacros: {},
        tagTriggeredMacros: {},
        compile: function (def, base) {
            var impl = base && base.$impl || this;
            return $untag(impl.sequence(def, base).call(impl, def || {}).constructor);
        },
        sequence: function (def, base) {
            return _.sequence(this.extendWithTags, this.flatten, this.generateCustomCompilerImpl(base), this.generateArgumentContractsIfNeeded, this.ensureFinalContracts(base), this.generateConstructor(base), this.evalAlwaysTriggeredMacros(base), this.evalMemberTriggeredMacros(base), this.contributeTraits(base), this.evalPrototypeSpecificMacros(base), this.generateBuiltInMembers(base), this.callStaticConstructor, this.expandAliases, this.defineStaticMembers, this.defineInstanceMembers);
        },
        compileMixin: function (def) {
            return _.sequence(this.flatten, this.contributeTraits(), this.expandAliases, this.evalMemberTriggeredMacros(), this.defineStaticMembers, this.defineInstanceMembers).call(this, def || {}).constructor;
        },
        evalAlwaysTriggeredMacros: function (base) {
            return function (def) {
                var macros = $prototype.impl.alwaysTriggeredMacros;
                for (var i = 0, n = macros.length; i < n; i++) {
                    def = macros[i](def, base) || def;
                }
                return def;
            };
        },
        evalMemberTriggeredMacros: function (base) {
            return function (def) {
                var names = $prototype.impl.memberNameTriggeredMacros, tags = $prototype.impl.tagTriggeredMacros;
                _.each(def, function (value, name) {
                    if (names.hasOwnProperty(name)) {
                        def = names[name](def, value, name, base) || def;
                    }
                    _.each(_.keys(value), function (tag) {
                        if (tags.hasOwnProperty(tag)) {
                            def = tags[tag](def, value, name, base) || def;
                        }
                    });
                });
                return def;
            };
        },
        evalPrototypeSpecificMacros: function (base) {
            return function (def) {
                if (!def.isTraitOf) {
                    var macroTags = $untag(def.$macroTags || base && base.$definition && base.$definition.$macroTags);
                    if (macroTags) {
                        _.each(def, function (memberDef, memberName) {
                            _.each(macroTags, function (macroFn, tagName) {
                                memberDef = def[memberName];
                                if (_.keyword(tagName) in memberDef) {
                                    def[memberName] = macroFn(def, memberDef, memberName) || memberDef;
                                }
                            });
                        });
                    }
                }
                return def;
            };
        },
        generateCustomCompilerImpl: function (base) {
            return function (def) {
                if (def.$impl) {
                    def.$impl.__proto__ = base && base.$impl || this;
                    def.$impl = $static($builtin($property(def.$impl)));
                } else if (base && base.$impl) {
                    def.$impl = $static($builtin($property(base.$impl)));
                }
                return def;
            };
        },
        generateArgumentContractsIfNeeded: function (def) {
            return def.$testArguments ? $prototype.wrapMethods(def, function (fn, name) {
                return function () {
                    var args = _.asArray(arguments);
                    $assertArguments(args.copy, fn.original, name);
                    return fn.apply(this, args);
                };
            }) : def;
        },
        contributeTraits: function (base) {
            return function (def) {
                if (def.$traits) {
                    var traits = def.$traits;
                    this.mergeTraitsMembers(def, traits, base);
                    def.$traits = $static($builtin($property(traits)));
                    def.hasTrait = $static($builtin(function (Constructor) {
                        return traits.indexOf(Constructor) >= 0;
                    }));
                }
                return def;
            };
        },
        mergeTraitsMembers: function (def, traits, base) {
            _.each(traits, function (trait) {
                _.defaults(def, _.omit(trait.$definition, _.or($builtin.matches, _.key(_.equals('constructor')))));
            });
        },
        extendWithTags: function (def) {
            return _.extendWith(Tags.unwrap(def), _.mapObject(Tags.get(def), $static.arity1));
        },
        callStaticConstructor: function (def) {
            if (!def.isTraitOf) {
                _.each($untag(def.$traits), function (T) {
                    if (T.$definition.$constructor) {
                        $untag(T.$definition.$constructor).call(def);
                    }
                });
                if (def.$constructor) {
                    $untag(def.$constructor).call(def);
                }
            }
            return def;
        },
        generateConstructor: function (base) {
            return function (def) {
                return _.extend(def, {
                    constructor: Tags.modify(def.hasOwnProperty('constructor') ? def.constructor : this.defaultConstructor(base), function (fn) {
                        if (base) {
                            fn.prototype.__proto__ = base.prototype;
                        }
                        return fn;
                    })
                });
            };
        },
        generateBuiltInMembers: function (base) {
            return function (def) {
                if (def.$constructor) {
                    def.$constructor = $builtin($static(def.$constructor));
                }
                return _.defaults(def, {
                    $base: $builtin($static($property(_.constant(base && base.prototype)))),
                    $definition: $builtin($static($property(_.constant(_.extend({}, base && base.$definition, def))))),
                    isTypeOf: $builtin($static(_.partial(_.isTypeOf, Tags.unwrap(def.constructor)))),
                    isInstanceOf: $builtin(function (constructor) {
                        return _.isTypeOf(constructor, this);
                    }),
                    $: $builtin(function (fn) {
                        return _.$.apply(null, [this].concat(_.asArray(arguments)));
                    })
                });
            };
        },
        defaultConstructor: function (base) {
            return base ? function () {
                base.prototype.constructor.apply(this, arguments);
            } : function (cfg) {
                _.extend(this, cfg || {});
            };
        },
        defineStaticMembers: function (def) {
            this.defineMembers(Tags.unwrap(def.constructor), _.pick(def, $static.matches));
            return def;
        },
        defineInstanceMembers: function (def) {
            this.defineMembers(Tags.unwrap(def.constructor).prototype, _.omit(def, $static.matches));
            return def;
        },
        defineMembers: function (targetObject, def) {
            _.each(def, function (value, key) {
                if (key !== 'constructor' && def.hasOwnProperty(key)) {
                    this.defineMember(targetObject, value, key);
                }
            }, this);
        },
        defineMember: function (targetObject, def, key) {
            if (def && def.$property) {
                if (def.$memoized) {
                    _.defineMemoizedProperty(targetObject, key, def);
                } else {
                    _.defineProperty(targetObject, key, def);
                }
            } else {
                var what = Tags.unwrap(def);
                targetObject[key] = what;
            }
        },
        ensureFinalContracts: function (base) {
            return function (def) {
                if (base) {
                    if (base.$final) {
                        throw new Error('Cannot derive from $final-marked prototype');
                    }
                    if (base.$definition) {
                        var invalidMembers = _.intersection(_.keys(_.pick(base.$definition, $final.matches)), _.keys(def));
                        if (invalidMembers.length) {
                            throw new Error('Cannot override $final ' + invalidMembers.join(', '));
                        }
                    }
                }
                return def;
            };
        },
        expandAliases: function (def) {
            return _.mapObject(def, function (v) {
                var name = Tags.unwrap(v);
                return $alias.is(v) ? $property.is(v) ? $property({
                    get: function () {
                        return this[name];
                    },
                    set: function (x) {
                        this[name] = x;
                    }
                }) : def[name] : v;
            });
        },
        flatten: function (def) {
            var tagKeywordGroups = _.pick(def, this.isTagKeywordGroup);
            var mergedKeywordGroups = _.object(_.flatten(_.map(tagKeywordGroups, function (membersDef, keyword) {
                return _.map(membersDef, function (member, memberName) {
                    return [
                        memberName,
                        $global[keyword](member)
                    ];
                });
            }), true));
            var memberDefinitions = _.omit(def, this.isTagKeywordGroup);
            return _.extend(memberDefinitions, mergedKeywordGroups);
        },
        isTagKeywordGroup: function (value_, key) {
            var value = Tags.unwrap(value_);
            return _.isKeyword(key) && _.isFunction($global[key]) && typeof value === 'object' && !_.isArray(value);
        }
    }
});
_.isTraitOf = function (Trait, instance) {
    var constructor = instance && instance.constructor;
    return constructor && constructor.hasTrait && constructor.hasTrait(Trait) || false;
};
_.isTypeOf = _.or(_.isTypeOf, _.isTraitOf);
$trait = function (arg1, arg2) {
    var constructor = undefined;
    var def = _.extend(arguments.length > 1 ? arg2 : arg1, {
        constructor: _.throwsError('Traits are not instantiable (what for?)'),
        isTraitOf: $static($builtin(function (instance) {
            return _.isTraitOf(constructor, instance);
        }))
    });
    return constructor = $prototype.impl.compile(def, arguments.length > 1 ? arg1 : arg2);
};
$prototype.macro('$macroTags', function (def, value, name) {
    _.each($untag(value), function (v, k) {
        _.defineTagKeyword(k);
    });
});
_.$ = function (this_, fn) {
    var arguments_ = _.rest(arguments, 2);
    var result = arguments_.length ? _.bind.apply(undefined, [
        fn,
        this_
    ].concat(_.rest(arguments, 2))) : _.withSameArgs(fn, function () {
        return fn.apply(this_, arguments);
    });
    return result;
};
if (typeof jQuery !== 'undefined') {
    jQuery.fn.extend({
        $: function () {
            return _.$.apply(null, [this].concat(_.asArray(arguments)));
        }
    });
}
_.defineKeyword('const', function (x) {
    return $static($property(x));
});
_.defineTagKeyword('callableAsFreeFunction');
$prototype.macroTag('callableAsFreeFunction', function (def, value, name) {
    def.constructor[name] = Tags.unwrap(value).asFreeFunction;
    return def;
});
$singleton = function (arg1, arg2) {
    return new ($prototype.apply(null, arguments))();
};
Platform = $singleton({
    $property: {
        engine: _.platform().engine,
        system: _.platform().system,
        device: _.platform().device,
        touch: _.platform().touch || false,
        IE: _.platform().browser === 'IE',
        Firefox: _.platform().browser === 'Firefox',
        Browser: _.platform().engine === 'browser',
        NodeJS: _.platform().engine === 'node',
        iPad: _.platform().device === 'iPad',
        iPhone: _.platform().device === 'iPhone',
        iOS: _.platform().system === 'iOS'
    }
});
Parse = {
    keyCodeAsString: function (key) {
        return String.fromCharCode(96 <= key && key <= 105 ? key - 48 : key);
    },
    fileName: function (path) {
        return _.first(_.last(path.split(/\\|\//)).split('.'));
    },
    phoneNumber: function (input) {
        var numeric = input.numericValue;
        if (numeric.length && numeric[0] === '8') {
            return '7' + numeric.slice(1);
        } else {
            return numeric;
        }
    },
    sqlDate: function (date) {
        if (!date) {
            return undefined;
        }
        var dateTime = date.split(' ');
        var date = dateTime[0].split('-');
        var time = dateTime.length > 1 ? dateTime[1].split(':') : [
            '0',
            '0',
            '0'
        ];
        var seconds = parseFloat(time[2]);
        return new Date(parseInt(date[0], 10), parseInt(date[1], 10) - 1, parseInt(date[2], 10), parseInt(time[0], 10), parseInt(time[1], 10), Math.floor(seconds), (seconds - Math.floor(seconds)) * 1000);
    },
    timestampFromDateTimeString: function (date) {
        if (!date)
            return undefined;
        var dateTime = date.split(' ');
        var date = dateTime[0].split('.');
        var time = dateTime.length > 1 ? dateTime[1].split(':') : [
            '0',
            '0',
            '0'
        ];
        return new Date((date[2].length > 2 ? 0 : 2000) + parseInt(date[2], 10), parseInt(date[1], 10) - 1, parseInt(date[0], 10), parseInt(time[0], 10), parseInt(time[1], 10)).getTime();
    }
};
_.camelCaseToDashes = function (x) {
    return x.replace(/[a-z][A-Z]/g, function (x) {
        return x[0] + '-' + x[1].lowercase;
    });
};
_.camelCaseToLoDashes = function (x) {
    return x.replace(/[a-z][A-Z]/g, function (x) {
        return x[0] + '_' + x[1].lowercase;
    });
};
_.dashesToCamelCase = function (x) {
    return x.replace(/(-.)/g, function (x) {
        return x[1].uppercase;
    });
};
_.loDashesToCamelCase = function (x) {
    return x.replace(/(_.)/g, function (x) {
        return x[1].uppercase;
    });
};
Format = {
    javascript: function (obj) {
        return _.stringify(obj, {
            pretty: true,
            pure: true,
            formatter: function (x) {
                if (_.isTypeOf(Tags, x)) {
                    return _.reduce(_.keys(_.pick(x, _.keyIsKeyword)), function (memo, key) {
                        return key + ' ' + _.quote(memo, '()');
                    }, _.stringify(Tags.unwrap(x)));
                } else if (_.isFunction(x)) {
                    return x.toString();
                } else {
                    return undefined;
                }
            }
        });
    },
    progressPercents: function (value, max) {
        return Math.floor(value / max * 100) + '%';
    },
    randomHexString: function (length) {
        var string = '';
        for (var i = 0; i < length; i++) {
            string += Math.floor(Math.random() * 16).toString(16);
        }
        return string;
    },
    leadingZero: function (x) {
        return x < 10 ? '0' + x : x.toString();
    },
    plural: function (n, a, b, c) {
        if (_.isArray(a)) {
            c = a[2];
            b = a[1];
            a = a[0];
        }
        var cases = [
            c,
            a,
            b,
            b,
            b,
            c
        ];
        return n + ' ' + (n % 100 > 4 && n % 100 < 20 ? c : cases[Math.min(n % 10, 5)]);
    }
};
Sort = {
    Ascending: 1,
    Descending: -1,
    strings: function (a, b) {
        a = $.trim(a).toLowerCase();
        b = $.trim(b).toLowerCase();
        if (a.length == 0 && b.length > 0) {
            return 1;
        } else if (a.length > 0 && b.length == 0) {
            return -1;
        } else {
            return a == b ? 0 : a < b ? -1 : 1;
        }
    },
    numbers: function (a, b) {
        if (isNaN(a) && isNaN(b)) {
            return 0;
        } else if (isNaN(a)) {
            return -1;
        } else if (isNaN(b)) {
            return 1;
        } else {
            return a < b ? -1 : a > b ? 1 : 0;
        }
    },
    generic: function (a, b) {
        if (!a && !b) {
            return 0;
        } else if (!a) {
            return -1;
        } else if (!b) {
            return 1;
        } else {
            return a < b ? -1 : a > b ? 1 : 0;
        }
    },
    inverse: function (sort) {
        return function (a, b) {
            return -sort(a, b);
        };
    },
    field: function (name, sort, order) {
        return function (a, b) {
            return sort(a[name], b[name]) * order;
        };
    }
};
_.enumerate = _.cps.each;
_.mapReduce = function (array, cfg) {
    var cursor = 0;
    var complete = false;
    var length = array && array.length || 0;
    var maxPoolSize = cfg.maxConcurrency || length;
    var poolSize = 0;
    var memo = cfg.memo;
    if (length === 0) {
        cfg.complete(cfg.memo || array);
    } else {
        var fetch = function () {
            while (cursor < length && poolSize < maxPoolSize) {
                poolSize += 1;
                cfg.next(array[cursor], cursor++, function () {
                    poolSize--;
                    if (!complete) {
                        if (cursor >= length) {
                            if (poolSize === 0) {
                                setTimeout(function () {
                                    cfg.complete(cfg.memo || array);
                                }, 0);
                                complete = true;
                            }
                        } else {
                            fetch();
                        }
                    }
                }, function () {
                    poolSize--;
                }, memo);
            }
            if (!complete && cursor >= length && poolSize == 0) {
                cfg.complete(cfg.memo || array);
            }
        };
        fetch();
    }
};
_.asyncJoin = function (functions, complete, context) {
    _.mapReduce(functions, {
        complete: complete.bind(context),
        next: function (fn, i, next, skip) {
            fn.call(context, next, skip);
        }
    });
};
Lock = $prototype({
    acquire: function (then) {
        this.wait(this.$(function () {
            if (!this.waitQueue) {
                this.waitQueue = [];
            }
            then();
        }));
    },
    acquired: function () {
        return this.waitQueue !== undefined;
    },
    wait: function (then) {
        if (this.acquired()) {
            this.waitQueue.push(then);
        } else {
            then();
        }
    },
    release: function () {
        if (this.waitQueue.length) {
            var queueFirst = _.first(this.waitQueue);
            this.waitQueue = _.rest(this.waitQueue);
            queueFirst();
        } else
            delete this.waitQueue;
    }
});
_.interlocked = function (fn) {
    var lock = new Lock();
    return _.extendWith({ wait: lock.$(lock.wait) }, _.prependsArguments(Tags.unwrap(fn), function (context) {
        lock.acquire(function () {
            context(lock.$(lock.release));
        });
    }));
};
_.defineKeyword('scope', function (fn) {
    var releaseStack = undefined;
    return _.prependsArguments(Tags.unwrap(fn), function (context) {
        var released = { when: undefined };
        (releaseStack = releaseStack || []).push(released);
        context(function (then) {
            if (released.when)
                throw new Error('$scope: release called twice');
            released.when = then;
            while (releaseStack && releaseStack.last && releaseStack.last.when) {
                var trigger = releaseStack.last.when;
                if ((releaseStack = _.initial(releaseStack)).isEmpty) {
                    releaseStack = undefined;
                }
                trigger();
            }
        });
    });
});
if (Platform.NodeJS) {
    module.exports = _;
}
;
_.clamp = function (n, min, max) {
    return Math.max(min, Math.min(max, n));
};
_.lerp = function (t, min, max) {
    return min + (max - min) * t;
};
_.rescale = function (v, from, to, opts) {
    var unit = (v - from[0]) / (from[1] - from[0]);
    return _.lerp(opts && opts.clamp ? _.clamp(unit, 0, 1) : unit, to[0], to[1]);
};
_.sqr = function (x) {
    return x * x;
};
if (!Math.sign) {
    Math.sign = function (x) {
        return x < 0 ? -1 : x > 0 ? 1 : 0;
    };
}
Intersect = {
    rayCircle: function (origin, d, center, r) {
        var f = origin.sub(center);
        var a = d.dot(d);
        var b = 2 * f.dot(d);
        var c = f.dot(f) - r * r;
        var discriminant = b * b - 4 * a * c;
        if (discriminant < 0) {
            return undefined;
        } else {
            discriminant = Math.sqrt(discriminant);
            var t1 = (-b - discriminant) / (2 * a);
            var t2 = (-b + discriminant) / (2 * a);
            if (t1 >= 0 && t1 <= 1) {
                return {
                    time: t1,
                    where: origin.add(d.scale(t1))
                };
            }
            if (t2 >= 0 && t2 <= 1) {
                return {
                    time: t2,
                    where: origin.add(d.scale(t2)),
                    insideOut: true
                };
            }
            return undefined;
        }
    }
};
Vec2 = $prototype({
    $static: {
        xx: function (x) {
            return new Vec2(x, x);
        },
        xy: function (x, y) {
            return new Vec2(x, y);
        },
        x: function (x) {
            return new Vec2(x, 0);
        },
        y: function (y) {
            return new Vec2(0, y);
        },
        zero: $property(function () {
            return new Vec2(0, 0);
        }),
        unit: $property(function () {
            return new Vec2(1, 1);
        }),
        one: $alias('unit'),
        lt: $alias('fromLT'),
        wh: $alias('fromWH'),
        fromLT: function (lt) {
            return new Vec2(lt.left, lt.top);
        },
        fromWH: function (wh) {
            return new Vec2(wh.width, wh.height);
        },
        fromLeftTop: $alias('fromLT'),
        fromWidthHeight: $alias('fromWH'),
        lerp: function (t, a, b) {
            return new Vec2(_.lerp(t, a.x, b.x), _.lerp(t, a.y, b.y));
        },
        clamp: function (n, a, b) {
            return new Vec2(_.clamp(n.x, a.x, b.x), _.clamp(n.y, a.y, b.y));
        }
    },
    constructor: function (x, y) {
        if (arguments.length === 1) {
            if (_.isNumber(x)) {
                this.x = this.y = x;
            } else {
                this.x = x.x;
                this.y = x.y;
            }
        } else {
            this.x = x;
            this.y = y;
        }
    },
    w: $alias($property('x')),
    h: $alias($property('y')),
    length: $property(function () {
        return Math.sqrt(this.lengthSquared);
    }),
    lengthSquared: $property(function () {
        return this.x * this.x + this.y * this.y;
    }),
    distance: function (pt) {
        return this.sub(pt).length;
    },
    aspect: $property(function () {
        return this.x / this.y;
    }),
    add: function (a, b) {
        if (b === undefined) {
            return typeof a === 'number' ? new Vec2(this.x + a, this.y + a) : new Vec2(this.x + a.x, this.y + a.y);
        } else {
            return new Vec2(this.x + a, this.y + b);
        }
    },
    dot: function (other) {
        return this.x * other.x + this.y * other.y;
    },
    sub: function (other) {
        return new Vec2(this.x - other.x, this.y - other.y);
    },
    scale: function (tx, ty) {
        return new Vec2(this.x * tx, this.y * (ty === undefined ? tx : ty));
    },
    mul: function (other) {
        return new Vec2(this.x * other.x, this.y * other.y);
    },
    divide: function (other) {
        return new Vec2(this.x / other.x, this.y / other.y);
    },
    normal: $property(function () {
        return this.scale(1 / this.length);
    }),
    perp: $property(function () {
        return new Vec2(this.y, -this.x);
    }),
    half: $property(function () {
        return new Vec2(this.x * 0.5, this.y * 0.5);
    }),
    inverse: $property(function () {
        return new Vec2(-this.x, -this.y);
    }),
    asArray: $property(function () {
        return [
            this.x,
            this.y
        ];
    }),
    asLeftTop: $property(function () {
        return {
            left: this.x,
            top: this.y
        };
    }),
    asLeftTopMargin: $property(function () {
        return {
            marginLeft: this.x,
            marginTop: this.y
        };
    }),
    asWidthHeight: $property(function () {
        return {
            width: this.x,
            height: this.y
        };
    }),
    asTranslate: $property(function () {
        return 'translate(' + this.x + ' ' + this.y + ')';
    }),
    separatedWith: function (sep) {
        return this.x + sep + this.y;
    },
    floor: $property(function () {
        return new Vec2(Math.floor(this.x), Math.floor(this.y));
    }),
    sum: $static(function (arr) {
        return _.reduce(_.isArray(arr) && arr || _.asArray(arguments), function (memo, v) {
            return memo.add(v || Vec2.zero);
        }, Vec2.zero);
    }),
    toString: function () {
        return '{' + this.x + ',' + this.y + '}';
    },
    projectOnCircle: function (center, r) {
        return center.add(this.sub(center).normal.scale(r));
    },
    projectOnLineSegment: function (v, w) {
        var wv = w.sub(v);
        var l2 = wv.lengthSquared;
        if (l2 == 0)
            return v;
        var t = this.sub(v).dot(wv) / l2;
        if (t < 0)
            return v;
        if (t > 1)
            return w;
        return v.add(wv.scale(t));
    },
    projectOnRay: function (origin, dir) {
        var l2 = dir.lengthSquared;
        if (l2 == 0)
            return 0;
        return this.sub(origin).dot(dir) / l2;
    }
});
Bezier = {
    cubic: function (t, p0, p1, p2, p3) {
        var cube = t * t * t;
        var square = t * t;
        var ax = 3 * (p1.x - p0.x);
        var ay = 3 * (p1.y - p0.y);
        var bx = 3 * (p2.x - p1.x) - ax;
        var by = 3 * (p2.y - p1.y) - ay;
        var cx = p3.x - p0.x - ax - bx;
        var cy = p3.y - p0.y - ay - by;
        var x = cx * cube + bx * square + ax * t + p0.x;
        var y = cy * cube + by * square + ay * t + p0.y;
        return new Vec2(x, y);
    },
    cubic1D: function (t, a, b, c, d) {
        return Bezier.cubic(t, Vec2.zero, new Vec2(a, b), new Vec2(c, d), Vec2.one).y;
    },
    make: {
        cubic: function (a, b, c, d) {
            return function (t) {
                return Bezier.cubic(t, a, b, c, d);
            };
        },
        cubic1D: function (a, b, c, d) {
            return function (t) {
                return Bezier.cubic1D(t, a, b, c, d);
            };
        }
    }
};
BBox = $prototype({
    $static: {
        zero: $property(function () {
            return new BBox(0, 0, 0, 0);
        }),
        unit: $property(function () {
            return new BBox(0, 0, 1, 1);
        }),
        fromLeftTopAndSize: function (pt, size) {
            return BBox.fromLTWH({
                left: pt.x,
                top: pt.y,
                width: size.x,
                height: size.y
            });
        },
        fromLTWH: function (l, t, w, h) {
            if (arguments.length === 1) {
                return BBox.fromLTWH(l.left, l.top, l.width, l.height);
            } else {
                return new BBox(l + w / 2, t + h / 2, w, h);
            }
        },
        fromLTRB: function (l, t, r, b) {
            if (arguments.length === 1) {
                return BBox.fromLTRB(l.left, l.top, l.right, l.bottom);
            } else {
                return new BBox(_.lerp(0.5, l, r), _.lerp(0.5, t, b), r - l, b - t);
            }
        },
        fromSizeAndCenter: function (size, center) {
            return new BBox(center.x - size.x / 2, center.y - size.y / 2, size.x, size.y);
        },
        fromSize: function (a, b) {
            if (b) {
                return new BBox(-a / 2, -b / 2, a, b);
            } else {
                return new BBox(-a.x / 2, -a.y / 2, a.x, a.y);
            }
        },
        fromPoints: function (pts) {
            var l = Number.MAX_VALUE, t = Number.MAX_VALUE, r = Number.MIN_VALUE, b = Number.MIN_VALUE;
            _.each(pts, function (pt) {
                l = Math.min(pt.x, l);
                t = Math.min(pt.y, t);
                r = Math.max(pt.x, r);
                b = Math.max(pt.y, b);
            });
            return BBox.fromLTRB(l, t, r, b);
        }
    },
    constructor: function (x, y, w, h) {
        if (arguments.length == 4) {
            this.x = x;
            this.y = y;
            this.width = w;
            this.height = h;
        } else {
            _.extend(this, x);
        }
    },
    classifyPoint: function (pt) {
        var sides = _.extend(pt.x > this.right ? { right: true } : {}, pt.x < this.left ? { left: true } : {}, pt.y > this.bottom ? { bottom: true } : {}, pt.y < this.top ? { top: true } : {});
        return _.extend(sides, !sides.left && !sides.right && !sides.bottom && !sides.top ? { inside: true } : {});
    },
    classifyRay: function (origin, delta, cornerRadius) {
        var half = this.size.half;
        var farTime, farTimeX, farTimeY, nearTime, nearTimeX, nearTimeY, scaleX, scaleY, signX, signY;
        scaleX = 1 / delta.x;
        scaleY = 1 / delta.y;
        signX = Math.sign(scaleX);
        signY = Math.sign(scaleY);
        nearTimeX = (this.x - signX * half.x - origin.x) * scaleX;
        nearTimeY = (this.y - signY * half.y - origin.y) * scaleY;
        farTimeX = (this.x + signX * half.x - origin.x) * scaleX;
        farTimeY = (this.y + signY * half.y - origin.y) * scaleY;
        if (nearTimeX > farTimeY || nearTimeY > farTimeX) {
            return undefined;
        }
        nearTime = nearTimeX > nearTimeY ? nearTimeX : nearTimeY;
        farTime = farTimeX < farTimeY ? farTimeX : farTimeY;
        if (nearTime >= 1 || farTime <= 0) {
            return undefined;
        }
        var hit = { time: _.clamp(nearTime, 0, 1) };
        if (nearTimeX > nearTimeY) {
            hit.normal = new Vec2(-signX, 0);
        } else {
            hit.normal = new Vec2(0, -signY);
        }
        hit.delta = delta.scale(hit.time);
        hit.where = origin.add(hit.delta);
        if (cornerRadius) {
            var inner = this.grow(-cornerRadius);
            if (hit.where.x > inner.right) {
                if (hit.where.y < inner.top) {
                    hit = Intersect.rayCircle(origin, delta, inner.rightTop, cornerRadius);
                } else if (hit.where.y > inner.bottom) {
                    hit = Intersect.rayCircle(origin, delta, inner.rightBottom, cornerRadius);
                }
            } else if (hit.where.x < inner.left) {
                if (hit.where.y < inner.top) {
                    hit = Intersect.rayCircle(origin, delta, inner.leftTop, cornerRadius);
                } else if (hit.where.y > inner.bottom) {
                    hit = Intersect.rayCircle(origin, delta, inner.leftBottom, cornerRadius);
                }
            }
            if (hit && hit.insideOut) {
                hit.where = origin;
            }
        }
        return hit;
    },
    nearestPointTo: function (pt, cornerRadius) {
        var r = cornerRadius || 0;
        var a = new Vec2(this.left, this.top), b = new Vec2(this.right, this.top), c = new Vec2(this.right, this.bottom), d = new Vec2(this.left, this.bottom);
        var pts = [
            pt.projectOnLineSegment(a.add(r, 0), b.add(-r, 0)),
            pt.projectOnLineSegment(b.add(0, r), c.add(0, -r)),
            pt.projectOnLineSegment(c.add(-r, 0), d.add(r, 0)),
            pt.projectOnLineSegment(d.add(0, -r), a.add(0, r)),
            pt.projectOnCircle(a.add(r, r), r),
            pt.projectOnCircle(b.add(-r, r), r),
            pt.projectOnCircle(c.add(-r, -r), r),
            pt.projectOnCircle(d.add(r, -r), r)
        ];
        return _.min(pts, function (test) {
            return pt.sub(test).length;
        });
    },
    xywh: $property(function () {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }),
    ltwh: $alias('css'),
    union: function (other) {
        return BBox.fromLTRB(Math.min(this.left, other.left), Math.min(this.top, other.top), Math.max(this.right, other.right), Math.max(this.bottom, other.bottom));
    },
    clone: $property(function () {
        return new BBox(this.x, this.y, this.width, this.height);
    }),
    floor: $property(function () {
        return new BBox.fromLTRB(Math.floor(this.left), Math.floor(this.top), Math.floor(this.right), Math.floor(this.bottom));
    }),
    css: $property(function () {
        return {
            left: this.left,
            top: this.top,
            width: this.width,
            height: this.height
        };
    }),
    leftTop: $property(function () {
        return new Vec2(this.left, this.top);
    }),
    leftBottom: $property(function () {
        return new Vec2(this.left, this.bottom);
    }),
    rightBottom: $property(function () {
        return new Vec2(this.right, this.bottom);
    }),
    rightTop: $property(function () {
        return new Vec2(this.right, this.top);
    }),
    left: $property(function () {
        return this.x - this.width / 2;
    }),
    right: $property(function () {
        return this.x + this.width / 2;
    }),
    top: $property(function () {
        return this.y - this.height / 2;
    }),
    bottom: $property(function () {
        return this.y + this.height / 2;
    }),
    center: $property(function () {
        return new Vec2(this.x, this.y);
    }),
    size: $property(function () {
        return new Vec2(this.width, this.height);
    }),
    offset: function (amount) {
        return new BBox(this.x + amount.x, this.y + amount.y, this.width, this.height);
    },
    newWidth: function (width) {
        return new BBox(this.x - (width - this.width) / 2, this.y, width, this.height);
    },
    grow: function (amount) {
        return new BBox(this.x, this.y, this.width + amount * 2, this.height + amount * 2);
    },
    shrink: function (amount) {
        return this.grow(-amount);
    },
    area: $property(function () {
        return Math.abs(this.width * this.height);
    }),
    toString: function () {
        return '{ ' + this.left + ',' + this.top + ' \u2190\u2192 ' + this.right + ',' + this.bottom + ' }';
    }
});
Transform = $prototype({
    $static: {
        identity: $property(function () {
            return new Transform();
        }),
        svgMatrix: function (m) {
            return new Transform([
                [
                    m.a,
                    m.c,
                    m.e
                ],
                [
                    m.b,
                    m.d,
                    m.f
                ],
                [
                    0,
                    0,
                    1
                ]
            ]);
        },
        translation: function (v) {
            return new Transform([
                [
                    1,
                    0,
                    v.x
                ],
                [
                    0,
                    1,
                    v.y
                ],
                [
                    0,
                    0,
                    1
                ]
            ]);
        }
    },
    constructor: function (components) {
        this.components = components || [
            [
                1,
                0,
                0
            ],
            [
                0,
                1,
                0
            ],
            [
                0,
                0,
                1
            ]
        ];
    },
    multiply: function (m) {
        var result = [
            [
                0,
                0,
                0
            ],
            [
                0,
                0,
                0
            ],
            [
                0,
                0,
                0
            ]
        ];
        var i, j, k, a = this.components, b = m.components;
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                for (k = 0; k < 3; k++) {
                    result[i][j] += a[i][k] * b[k][j];
                }
            }
        }
        return new Transform(result);
    },
    translate: function (v) {
        return this.multiply(Transform.translation(v));
    },
    scale: function (s) {
        return this.multiply(new Transform([
            [
                s,
                0,
                0
            ],
            [
                0,
                s,
                0
            ],
            [
                0,
                0,
                1
            ]
        ]));
    },
    inverse: $property($memoized(function () {
        var m = this.components;
        var id = 1 / (m[0][0] * (m[1][1] * m[2][2] - m[2][1] * m[1][2]) - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]));
        return new Transform([
            [
                (m[1][1] * m[2][2] - m[2][1] * m[1][2]) * id,
                -(m[0][1] * m[2][2] - m[0][2] * m[2][1]) * id,
                (m[0][1] * m[1][2] - m[0][2] * m[1][1]) * id
            ],
            [
                (m[1][0] * m[2][2] - m[1][2] * m[2][0]) * id,
                (m[0][0] * m[2][2] - m[0][2] * m[2][0]) * id,
                -(m[0][0] * m[1][2] - m[1][0] * m[0][2]) * id
            ],
            [
                (m[1][0] * m[2][1] - m[2][0] * m[1][1]) * id,
                -(m[0][0] * m[2][1] - m[2][0] * m[0][1]) * id,
                (m[0][0] * m[1][1] - m[1][0] * m[0][1]) * id
            ]
        ]);
    })),
    unproject: function (v) {
        var m = this.components;
        return new Vec2(v.x * m[0][0] + v.y * m[0][1] + m[0][2], v.x * m[1][0] + v.y * m[1][1] + m[1][2]);
    },
    project: function (v) {
        return this.inverse.unproject(v);
    }
});
_.rng = function (seed, from, to) {
    var m_w = seed;
    var m_z = 987654321;
    var mask = 4294967295;
    return function () {
        m_z = 36969 * (m_z & 65535) + (m_z >> 16) & mask;
        m_w = 18000 * (m_w & 65535) + (m_w >> 16) & mask;
        var result = (m_z << 16) + m_w & mask;
        result /= 4294967296;
        result += 0.5;
        if (from === undefined && to === undefined) {
            return result;
        } else {
            return Math.round(from + result * (to - from));
        }
    };
};
_.equalDistribution = function (value, n) {
    var average = value / n;
    var realLeft = 0;
    return _.times(n, function () {
        var left = Math.round(realLeft);
        var right = Math.round(realLeft += average);
        var rough = Math.floor(right - left);
        return rough;
    });
};
_.ptInRect = function (pt, rect) {
    return pt.x >= rect.left && pt.y >= rect.top && pt.x < rect.right && pt.y < rect.bottom;
};
_.hue2CSS = function (H, a) {
    return _.RGB2CSS(_.hue2RGB(H), a);
};
_.HSL2CSS = function (hsl, a) {
    return _.RGB2CSS(_.HSL2RGB(hsl), a);
};
_.HSL2RGB = function (hsl) {
    var h = hsl[0], s = hsl[1], l = hsl[2];
    var rgb = _.hue2RGB(h);
    var c = (1 - Math.abs(2 * l - 1)) * s;
    return [
        (rgb[0] - 0.5) * c + l,
        (rgb[1] - 0.5) * c + l,
        (rgb[2] - 0.5) * c + l
    ];
};
_.hue2RGB = function (hue) {
    return [
        Math.max(0, Math.min(1, Math.abs(hue * 6 - 3) - 1)),
        Math.max(0, Math.min(1, 2 - Math.abs(hue * 6 - 2))),
        Math.max(0, Math.min(1, 2 - Math.abs(hue * 6 - 4)))
    ];
};
_.RGB2CSS = function (rgb, a) {
    return 'rgba(' + Math.round(rgb[0] * 255) + ',' + Math.round(rgb[1] * 255) + ',' + Math.round(rgb[2] * 255) + ',' + (a === undefined ? rgb[3] === undefined ? 1 : rgb[3] : a) + ')';
};
_.RGB2HSL = function (rgb, a_) {
    var r = rgb[0], g = rgb[1], b = rgb[2], a = a_ === undefined ? rgb[3] : a_;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    if (max == min) {
        h = s = 0;
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
        case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
        case g:
            h = (b - r) / d + 2;
            break;
        case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
    }
    return a === undefined ? [
        h,
        s,
        l
    ] : [
        h,
        s,
        l,
        a
    ];
};
_.extend(Math, function (decimalAdjust) {
    return {
        roundTo: function (value, precision) {
            return value - value % precision;
        },
        round10: function (value, exp) {
            return decimalAdjust('round', value, exp);
        },
        floor10: function (value, exp) {
            return decimalAdjust('floor', value, exp);
        },
        ceil10: function (value, exp) {
            return decimalAdjust('ceil', value, exp);
        }
    };
}(function (type, value, exp) {
    if (typeof exp === 'undefined' || +exp === 0) {
        return Math[type](value);
    }
    value = +value;
    exp = +exp;
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
    }
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp)));
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? +value[1] + exp : exp));
}));
_.defineKeyword('component', function (definition) {
    return $extends(Component, definition);
});
_([
    'extendable',
    'trigger',
    'triggerOnce',
    'barrier',
    'observable',
    'bindable',
    'memoize',
    'interlocked',
    'memoizeCPS',
    'debounce',
    'throttle',
    'overrideThis',
    'listener',
    'postpones',
    'reference'
]).each(_.defineTagKeyword);
_.defineTagKeyword('observableProperty', _.flip);
_.defineKeyword('observableRef', function (x) {
    return $observableProperty($reference(x));
});
$prototype.macro('$depends', function (def, value, name) {
    def.$depends = $builtin($const(_.coerceToArray(value)));
    return def;
});
$prototype.macroTag('extendable', function (def, value, name) {
    def[name] = $builtin($const(value));
    return def;
});
Component = $prototype({
    $defaults: $extendable({}),
    $requires: $extendable({}),
    $macroTags: $extendable({}),
    $impl: {
        sequence: function (def, base) {
            return _.sequence(this.extendWithTags, this.flatten, this.generateCustomCompilerImpl(base), this.generateArgumentContractsIfNeeded, this.ensureFinalContracts(base), this.generateConstructor(base), this.evalAlwaysTriggeredMacros(base), this.evalMemberTriggeredMacros(base), this.expandTraitsDependencies, this.mergeExtendables(base), this.contributeTraits(base), this.evalPrototypeSpecificMacros(base), this.mergeBindables, this.generateBuiltInMembers(base), this.callStaticConstructor, this.expandAliases, this.defineStaticMembers, this.defineInstanceMembers);
        },
        expandTraitsDependencies: function (def) {
            if (def.$depends) {
                var edges = [];
                var lastId = 0;
                var drill = function (depends, T) {
                    if (!T.__tempId) {
                        T.__tempId = lastId++;
                    }
                    _.each(depends, function (TSuper) {
                        edges.push([
                            T,
                            TSuper
                        ]);
                        drill(TSuper.$depends || [], TSuper);
                    });
                };
                drill($untag(def.$depends), {});
                _.each(def.$traits = _.reversed(_.rest(_.linearMerge(edges, { key: _.property('__tempId') }))), function (obj) {
                    delete obj.__tempId;
                });
            }
            return def;
        },
        mergeExtendables: function (base) {
            return function (def) {
                _.each(_.pick(base.$definition, $extendable.is), function (value, name) {
                    def[name] = Tags.modify(value, function (value) {
                        value = _.extendedDeep(value, $untag(def[name] || {}));
                        _.each($untag(def.$traits), function (trait) {
                            if (!trait) {
                                log.e(def.$traits);
                                throw new Error('invalid $traits value');
                            }
                            var traitVal = trait.$definition[name];
                            if (traitVal) {
                                value = _.extendedDeep($untag(traitVal), value);
                            }
                        });
                        return value;
                    });
                });
                return def;
            };
        },
        mergeTraitsMembers: function (def, traits) {
            var pool = {}, bindables = {};
            _.each([def].concat(_.pluck(traits, '$definition')), function (def) {
                _.each(_.omit(def, _.or($builtin.matches, _.key(_.equals('constructor')))), function (member, name) {
                    if ($bindable.is(member)) {
                        bindables[name] = member;
                    }
                    (pool[name] || (pool[name] = [])).push(member);
                });
            });
            _.each(pool, function (members, name) {
                var stream = _.find(members, Component.isStreamDefinition);
                if (stream) {
                    var clonedStream = def[name] = Tags.clone(stream);
                    clonedStream.listeners = [];
                    _.each(members, function (member) {
                        if (member !== stream) {
                            clonedStream.listeners.push(member);
                        }
                    });
                } else {
                    if (!def[name]) {
                        def[name] = pool[name][0];
                    }
                }
            });
            def.__bindables = bindables;
            def.__members = pool;
        },
        mergeBindables: function (def) {
            var pool = def.__members;
            _.each(def.__bindables, function (member, name) {
                var bound = _.filter2(_.bindable.hooks, function (hook, i) {
                    var bound = pool[_.bindable.hooksShort[i] + name.capitalized];
                    return bound ? [
                        hook,
                        bound
                    ] : false;
                });
                if (bound.length) {
                    var hooks = {};
                    _.each(bound, function (kv) {
                        _.each(kv[1], function (fn) {
                            fn = $untag(fn);
                            if (_.isFunction(fn)) {
                                var k = '_' + kv[0];
                                (hooks[k] || (hooks[k] = [])).push(fn);
                            }
                        });
                    });
                    def[name] = $bindable({ hooks: hooks }, Tags.clone(def[name]));
                }
            });
            return def;
        }
    },
    isStreamDefinition: $static(function (def) {
        return _.isObject(def) && (def.$trigger || def.$triggerOnce || def.$barrier || def.$observable || def.$observableProperty);
    }),
    mapMethods: function () {
        var iterator = _.last(arguments), predicate = arguments.length === 1 ? _.constant(true) : arguments[0];
        var methods = [];
        for (var k in this) {
            var def = this.constructor.$definition[k];
            if (!(def && def.$property)) {
                var fn = this[k];
                if (_.isFunction(fn) && !_.isPrototypeConstructor(fn) && predicate(def)) {
                    this[k] = iterator.call(this, fn, k, def) || fn;
                }
            }
        }
    },
    enumMethods: function (_1, _2) {
        if (arguments.length === 2) {
            this.mapMethods(_1, _2.returns(undefined));
        } else {
            this.mapMethods(_1.returns(undefined));
        }
    },
    constructor: $final(function (arg1, arg2) {
        this.parent_ = undefined;
        this.children_ = [];
        var cfg = this.cfg = typeof arg1 === 'object' ? arg1 : {}, componentDefinition = this.constructor.$definition;
        if (this.constructor.$defaults) {
            cfg = this.cfg = _.extend(_.cloneDeep(this.constructor.$defaults), cfg);
        }
        this.mapMethods(function (fn, name) {
            if (name !== '$' && name !== 'init') {
                return this.$(fn);
            }
        });
        _.onBefore(this, 'destroy', this.beforeDestroy);
        _.onAfter(this, 'destroy', this.afterDestroy);
        var initialStreamListeners = [];
        var excludeFromCfg = { init: true };
        _.each(componentDefinition, function (def, name) {
            if (def !== undefined) {
                if (def.$observableProperty) {
                    var definitionValue = def.subject;
                    var defaultValue = name in cfg ? cfg[name] : definitionValue;
                    var streamName = name + 'Change';
                    var observable = excludeFromCfg[streamName] = this[streamName] = _.observable();
                    observable.context = this;
                    observable.postpones = def.$postpones;
                    if (_.isPrototypeInstance(definitionValue)) {
                        var constructor = definitionValue.constructor;
                        observable.beforeWrite = function (value) {
                            return constructor.isTypeOf(value) ? value : new constructor(value);
                        };
                    }
                    if (def.$reference) {
                        observable.trackReference = true;
                    }
                    _.defineProperty(this, name, {
                        get: function () {
                            return observable.value;
                        },
                        set: function (x) {
                            observable.call(this, x);
                        }
                    });
                    if (def.listeners) {
                        _.each(def.listeners, function (value) {
                            initialStreamListeners.push([
                                observable,
                                value
                            ]);
                        });
                    }
                    if (_.isFunction(def.$observableProperty)) {
                        initialStreamListeners.push([
                            observable,
                            def.$observableProperty
                        ]);
                    }
                    if (defaultValue !== undefined) {
                        observable(defaultValue);
                    }
                } else if (Component.isStreamDefinition(def)) {
                    var stream = excludeFromCfg[name] = this[name] = _.extend((def.$trigger ? _.trigger : def.$triggerOnce ? _.triggerOnce : def.$observable ? _.observable : def.$barrier ? _.barrier : undefined)(def.subject), {
                        context: this,
                        postpones: def.$postpones
                    });
                    if (def.listeners) {
                        _.each(def.listeners, function (value) {
                            initialStreamListeners.push([
                                stream,
                                value
                            ]);
                        });
                    }
                    var defaultListener = cfg[name];
                    if (defaultListener) {
                        initialStreamListeners.push([
                            stream,
                            defaultListener
                        ]);
                    }
                }
                if (def.$listener) {
                    this[name].queuedBy = [];
                }
                if (def.$interlocked) {
                    this[name] = _.interlocked(this[name]);
                }
                if (def.$bindable) {
                    this[name] = _.extend(_.bindable(this[name], this), _.map2(def.$bindable.hooks || {}, _.mapsWith(this.$.bind(this).arity1)));
                }
                if (def.$debounce) {
                    var fn = this[name], opts = _.coerceToObject(def.$debounce);
                    this[name] = fn.debounced(opts.wait || 500, opts.immediate);
                }
                if (def.$throttle) {
                    var fn = this[name], opts = _.coerceToObject(def.$throttle);
                    this[name] = _.throttle(fn, opts.wait || 500, opts);
                }
                if (def.$memoize) {
                    this[name] = _.memoize(this[name]);
                } else if (def.$memoizeCPS) {
                    this[name] = _.cps.memoize(this[name]);
                }
            }
        }, this);
        _.intercept(this, 'init', function (init) {
            var evalChain = _.hasArgs(this.constructor.prototype.init) ? _.cps.sequence : _.sequence;
            evalChain([
                this._beforeInit,
                init.bind(this),
                this._afterInit
            ]).call(this);
        });
        _.each(cfg, function (value, name) {
            if (!(name in excludeFromCfg)) {
                this[name] = _.isFunction(value) ? this.$(value) : value;
            }
        }, this);
        _.each(componentDefinition, function (def, name) {
            if (def && def.$alias) {
                this[name] = this[Tags.unwrap(def)];
            }
        }, this);
        if (_.hasAsserts) {
            _.each(this.constructor.$requires, function (contract, name) {
                $assertTypeMatches(_.object([[
                        name,
                        this[name]
                    ]]), _.object([[
                        name,
                        contract
                    ]]));
            }, this);
        }
        _.each(initialStreamListeners, function (v) {
            v[0].call(this, v[1]);
        }, this);
        if (!(cfg.init === false || this.constructor.$defaults && this.constructor.$defaults.init === false)) {
            this.init();
        }
    }),
    callTraitsMethod: function (name, then) {
        if (_.isFunction(then)) {
            _.cps.sequence(_.filter2(this.constructor.$traits || [], this.$(function (Trait) {
                var method = Trait.prototype[name];
                return method && _.cps.arity0(_.noArgs(method) ? method.asContinuation : method).bind(this) || false;
            })).concat(then.arity0))();
        } else {
            _.sequence(_.filter2(this.constructor.$traits || [], this.$(function (Trait) {
                var method = Trait.prototype[name];
                return method && (_.hasArgs(method) ? method.bind(this, _.identity) : method.bind(this)) || false;
            })))();
        }
    },
    _beforeInit: function (then) {
        if (this.initialized.already) {
            throw new Error('Component: I am already initialized. Probably you\'re doing it wrong.');
        }
        this.callTraitsMethod('beforeInit', then);
    },
    init: function () {
    },
    _afterInit: function (then) {
        var cfg = this.cfg;
        this.callTraitsMethod('afterInit', then);
        this.initialized(true);
        _.each(this.constructor.$definition, function (def, name) {
            if (def && def.$observableProperty) {
                name += 'Change';
                var defaultListener = cfg[name];
                if (defaultListener) {
                    this[name](defaultListener);
                }
            }
        }, this);
    },
    initialized: $barrier(),
    beforeDestroy: function () {
        if (this.destroyed_) {
            throw new Error('Component: I am already destroyed. Probably you\'re doing it wrong.');
        }
        if (this.destroying_) {
            throw new Error('Component: Recursive destroy() call detected. Probably you\'re doing it wrong.');
        }
        this.destroying_ = true;
        this.enumMethods(_.off);
        _.each(this.children_, _.method('destroy'));
        this.children_ = [];
    },
    destroy: function () {
    },
    afterDestroy: function () {
        _.each(this.constructor.$traits, function (Trait) {
            if (Trait.prototype.destroy) {
                Trait.prototype.destroy.call(this);
            }
        }, this);
        delete this.destroying_;
        this.parent_ = undefined;
        this.destroyed_ = true;
    },
    attachedTo: $property(function () {
        return this.parent_;
    }),
    attachTo: function (p) {
        if (p === this) {
            throw new Error('smells like time-travel paradox.. how else can I be parent of myself?');
        }
        if (this.parent_ !== p) {
            if (this.parent_ !== undefined) {
                this.parent_.children_.remove(this);
            }
            if ((this.parent_ = p) !== undefined) {
                this.parent_.children_.push(this);
            }
        }
        return this;
    },
    detach: function () {
        return this.attachTo(undefined);
    },
    attached: $property(function () {
        return this.children_;
    }),
    attach: function (c) {
        _.invoke(_.coerceToArray(c), 'attachTo', this);
        return this;
    },
    detachAll: function () {
        _.each(this.children_, function (c) {
            c.parent_ = undefined;
        });
        this.children_ = [];
        return this;
    },
    destroyAll: function () {
        _.each(this.children_, function (c) {
            c.parent_ = undefined;
            c.destroy();
        });
        this.children_ = [];
        return this;
    }
});
R = $singleton({
    $test: function () {
        var $assertExpr = function (a, b) {
            $assert(a, _.quote(b.str, '//'));
        };
        $assertExpr('/[^\\s]*/', $r.anyOf.except.space.$);
        $assertExpr('/\\[.*\\]|[\\s]/', $r.anything.inBrackets.or.oneOf.space.$);
        var expr = $r.expr('before', $r.anything.text('$print').something).then($r.expr('argument', $r.someOf.except.text(',)')).inParentheses.then($r.expr('tail', $r.anything))).$;
        $assertExpr('/(.*\\$print.+)\\(([^,\\)]+)\\)(.*)/', expr);
        $assert(expr.parse(' var x = $print (blabla) // lalala '), {
            before: ' var x = $print ',
            argument: 'blabla',
            tail: ' // lalala '
        });
        $assert([
            [
                '[^',
                '\\s',
                ']'
            ],
            '*'
        ], R.anyOf(R.except(R.space)));
    },
    constructor: function () {
        this.reduce = _.hyperOperator(_.binary, _.reduce2, _.goDeeperAlwaysIfPossible, _.isNonTrivial.and(_.not(this.isSubexpr)));
        this.initDSL();
    },
    expr: function (expr, subexprs) {
        subexprs = subexprs || [];
        return new R.Expr(R.reduce('', expr, function (memo, s) {
            if (R.isSubexpr(s)) {
                subexprs.push(s);
                return memo + R.expr(R.root(s.value), subexprs).str;
            } else {
                return memo + s;
            }
        }), subexprs);
    },
    Expr: $prototype({
        constructor: function (str, subexprs) {
            this.rx = new RegExp();
            this.rx.compile(str);
            this.str = str;
            this.subexprs = subexprs;
        },
        parse: function (str) {
            var match = str.match(this.rx);
            return match && _.extend.apply(null, _.zipWith([
                _.rest(match),
                this.subexprs
            ], function (match, subexpr) {
                return _.object([[
                        subexpr.name,
                        match
                    ]]);
            })) || {};
        }
    }),
    metacharacters: $property(_.index('\\^$.|?*+()[{')),
    escape: function (s) {
        return _.map(s, function (x) {
            return R.metacharacters[x] ? '\\' + x : x;
        }).join('');
    },
    text: $alias('escape'),
    subexpr: function (name, s) {
        return {
            name: name,
            value: [
                '(',
                s,
                ')'
            ]
        };
    },
    maybe: function (s) {
        return [
            s,
            '?'
        ];
    },
    anyOf: function (s) {
        return [
            s,
            '*'
        ];
    },
    someOf: function (s) {
        return [
            s,
            '+'
        ];
    },
    oneOf: function (s) {
        return [
            '[',
            s,
            ']'
        ];
    },
    except: function (s) {
        return [
            '[^',
            s,
            ']'
        ];
    },
    or: function (a, b) {
        return [
            a,
            '|',
            b
        ];
    },
    begin: $property('^'),
    end: $property('$'),
    space: $property('\\s'),
    maybeSpaces: $property('\\s*'),
    spaces: $property('\\s+'),
    anything: $property('.*'),
    something: $property('.+'),
    comma: $property(','),
    parentheses: function (s) {
        return [
            '\\(',
            s,
            '\\)'
        ];
    },
    brackets: function (s) {
        return [
            '\\[',
            s,
            '\\]'
        ];
    },
    isSubexpr: function (s) {
        return _.isStrictlyObject(s) && !_.isArray(s) ? true : false;
    },
    root: function (r) {
        return r && r.$$ ? r.$$ : r;
    },
    initDSL: function () {
        _.defineKeyword('r', function () {
            return $$r([]);
        });
        _.defineKeyword('$r', function (cursor) {
            var shift = function (x) {
                cursor.push(x);
                return cursor.forward;
            };
            _.defineHiddenProperty(cursor, 'then', function (x) {
                cursor.push(R.root(x));
                return cursor;
            });
            _.defineHiddenProperty(cursor, 'text', function (x) {
                cursor.push(R.text(x));
                return cursor;
            });
            _.defineHiddenProperty(cursor, 'expr', function (x, s) {
                cursor.push(R.subexpr(x, R.root(s)));
                return cursor;
            });
            _.defineHiddenProperty(cursor, 'forward', function () {
                return cursor.next || ((cursor.next = $r).prev = cursor).next;
            });
            _.each([
                'maybe',
                'anyOf',
                'someOf',
                'oneOf',
                'except'
            ], function (key) {
                _.defineHiddenProperty(cursor, key, function () {
                    return shift(R[key](cursor.forward));
                });
            });
            _.each([
                'parentheses',
                'brackets'
            ], function (key) {
                _.defineHiddenProperty(cursor, 'in' + key.capitalized, function () {
                    return cursor.$$.prev = $$r(R[key](cursor.$$));
                });
            });
            _.each(['or'], function (key) {
                _.defineHiddenProperty(cursor, key, function () {
                    var next = $r;
                    return (next.prev = cursor.$$.prev = $$r(R[key](cursor.$$, next))).next = next;
                });
            });
            _.each([
                'begin',
                'end',
                'space',
                'anything',
                'something'
            ], function (key) {
                _.defineHiddenProperty(cursor, key, function () {
                    return shift([
                        R[key],
                        cursor.forward
                    ]);
                });
            });
            _.defineHiddenProperty(cursor, '$$', function () {
                var root = cursor;
                while (root.prev) {
                    root = root.prev;
                }
                return root;
            });
            _.defineHiddenProperty(cursor, '$', function () {
                return R.expr(cursor.$$);
            });
            return cursor;
        });
    }
});
(function () {
    _.hasUncaught = true;
    var reThrownTag = ' [re-thrown by a hook]';
    var globalUncaughtExceptionHandler = _.globalUncaughtExceptionHandler = function (e) {
        var chain = arguments.callee.chain;
        arguments.callee.chain = _.reject(chain, _.property('catchesOnce'));
        if (chain.length) {
            for (var i = 0, n = chain.length; i < n; i++) {
                try {
                    chain[i](e);
                    break;
                } catch (newE) {
                    console.log(newE);
                    if (i === n - 1) {
                        newE.message += reThrownTag;
                        throw newE;
                    } else {
                        if (newE && typeof newE === 'object') {
                            newE.originalError = e;
                        }
                        e = newE;
                    }
                }
            }
        } else {
            e.message += reThrownTag;
            throw e;
        }
    };
    _.withUncaughtExceptionHandler = function (handler, context_) {
        var context = context_ || _.identity;
        if (context_) {
            handler.catchesOnce = true;
        }
        globalUncaughtExceptionHandler.chain.unshift(handler);
        context(function () {
            globalUncaughtExceptionHandler.chain.remove(handler);
        });
    };
    globalUncaughtExceptionHandler.chain = [];
    switch (Platform.engine) {
    case 'node':
        require('process').on('uncaughtException', globalUncaughtExceptionHandler);
        break;
    case 'browser':
        window.addEventListener('error', function (e) {
            if (e.message.indexOf(reThrownTag) < 0) {
                if (e.error) {
                    globalUncaughtExceptionHandler(e.error);
                } else {
                    globalUncaughtExceptionHandler(_.extend(new Error(e.message), {
                        stub: true,
                        stack: 'at ' + e.filename + ':' + e.lineno + ':' + e.colno
                    }));
                }
            }
        });
    }
}());
_.hasReflection = true;
_.defineKeyword('callStack', function () {
    return CallStack.fromRawString(CallStack.currentAsRawString).offset(Platform.NodeJS ? 1 : 0);
});
_.defineKeyword('currentFile', function () {
    return (CallStack.rawStringToArray(CallStack.currentAsRawString)[Platform.NodeJS ? 3 : 1] || { file: '' }).file;
});
_.defineKeyword('uselessPath', _.memoize(function () {
    return _.initial($currentFile.split('/'), Platform.NodeJS ? 2 : 1).join('/') + '/';
}));
_.defineKeyword('sourcePath', _.memoize(function () {
    var local = ($uselessPath.match(/(.+)\/node_modules\/(.+)/) || [])[1];
    return local ? local + '/' : $uselessPath;
}));
SourceFiles = $singleton(Component, {
    apiConfig: {},
    line: function (file, line, then) {
        SourceFiles.read(file, function (data) {
            then((data.split('\n')[line] || '').trimmed);
        });
    },
    read: $memoizeCPS(function (file, then) {
        if (file.indexOf('<') < 0) {
            try {
                if (Platform.NodeJS) {
                    then(require('fs').readFileSync(file, { encoding: 'utf8' }) || '');
                } else {
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', file, true);
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4) {
                            then(xhr.responseText);
                        }
                    };
                    xhr.send(null);
                }
            } catch (e) {
                then('');
            }
        } else {
            then('');
        }
    }),
    write: function (file, text, then) {
        if (Platform.NodeJS) {
            this.read(file, function (prevText) {
                var fs = require('fs'), opts = { encoding: 'utf8' };
                try {
                    fs.mkdirSync(file + '.backups');
                } catch (e) {
                }
                fs.writeFileSync(file + '.backups/' + Date.now(), prevText, opts);
                fs.writeFileSync(file, text, opts);
                then();
            });
        } else {
            API.post('source/' + file, _.extend2({}, this.apiConfig, {
                what: { text: text },
                failure: Panic,
                success: function () {
                    log.ok(file, '\u2014 successfully saved');
                    if (then) {
                        then();
                    }
                }
            }));
        }
    }
});
_.readSourceLine = SourceFiles.line;
_.readSource = SourceFiles.read;
_.writeSource = SourceFiles.write;
CallStack = $extends(Array, {
    current: $static($property(function () {
        return CallStack.fromRawString(CallStack.currentAsRawString).offset(1);
    })),
    fromError: $static(function (e) {
        if (e && e.parsedStack) {
            return CallStack.fromParsedArray(e.parsedStack).offset(e.stackOffset || 0);
        } else if (e && e.stack) {
            return CallStack.fromRawString(e.stack).offset(e.stackOffset || 0);
        } else {
            return CallStack.fromParsedArray([]);
        }
    }),
    fromErrorWithAsync: $static(function (e) {
        var stackEntries = CallStack.fromError(e), asyncContext = e.asyncContext;
        while (asyncContext) {
            stackEntries = stackEntries.concat(CallStack.fromRawString(asyncContext.stack));
            asyncContext = asyncContext.asyncContext;
        }
        return stackEntries.mergeDuplicateLines;
    }),
    locationEquals: $static(function (a, b) {
        return a.file === b.file && a.line === b.line && a.column === b.column;
    }),
    safeLocation: function (n) {
        return this[n] || {
            callee: '',
            calleeShort: '',
            file: '',
            fileName: '',
            fileShort: '',
            thirdParty: false,
            source: '??? WRONG LOCATION ???',
            sourceReady: _.barrier('??? WRONG LOCATION ???')
        };
    },
    mergeDuplicateLines: $property(function () {
        return CallStack.fromParsedArray(_.map(_.partition2(this, function (e) {
            return e.file + e.line;
        }), function (group) {
            return _.reduce(_.rest(group), function (memo, entry) {
                memo.callee = (memo.callee || '<anonymous>') + ' \u2192 ' + (entry.callee || '<anonymous>');
                memo.calleeShort = (memo.calleeShort || '<anonymous>') + ' \u2192 ' + (entry.calleeShort || '<anonymous>');
                return memo;
            }, _.clone(group[0]));
        }));
    }),
    clean: $property(function () {
        return this.mergeDuplicateLines.reject(_.property('thirdParty'));
    }),
    asArray: $property(function () {
        return _.asArray(this);
    }),
    offset: function (N) {
        return N && CallStack.fromParsedArray(_.rest(this, N)) || this;
    },
    initial: function (N) {
        return N && CallStack.fromParsedArray(_.initial(this, N)) || this;
    },
    concat: function (stack) {
        return CallStack.fromParsedArray(this.asArray.concat(stack.asArray));
    },
    filter: function (fn) {
        return CallStack.fromParsedArray(_.filter(this, fn));
    },
    reject: function (fn) {
        return CallStack.fromParsedArray(_.reject(this, fn));
    },
    reversed: $property(function () {
        return CallStack.fromParsedArray(_.reversed(this));
    }),
    sourcesReady: function (then) {
        return _.allTriggered(_.pluck(this, 'sourceReady'), then);
    },
    constructor: function (arr) {
        Array.prototype.constructor.call(this);
        _.each(arr, function (entry) {
            if (!entry.sourceReady) {
                entry.sourceReady = _.barrier();
                SourceFiles.line((entry.remote ? 'api/source/' : '') + entry.file, entry.line - 1, function (src) {
                    entry.sourceReady(entry.source = src);
                });
            }
            this.push(entry);
        }, this);
    },
    fromParsedArray: $static(function (arr) {
        return new CallStack(arr);
    }),
    currentAsRawString: $static($property(function () {
        var cut = Platform.Browser ? 3 : 2;
        return _.rest((new Error().stack || '').split('\n'), cut).join('\n');
    })),
    shortenPath: $static(function (path) {
        var relative = path.replace($uselessPath, '').replace($sourcePath, '');
        return relative !== path ? relative : path.split('/').last;
    }),
    isThirdParty: $static(_.bindable(function (file) {
        var local = file.replace($sourcePath, '');
        return Platform.NodeJS && file[0] !== '/' || local.indexOf('/node_modules/') >= 0 || file.indexOf('/node_modules/') >= 0 && !local || local.indexOf('underscore') >= 0 || local.indexOf('jquery') >= 0;
    })),
    fromRawString: $static(_.sequence(function (rawString) {
        return CallStack.rawStringToArray(rawString);
    }, function (array) {
        return _.map(array, function (entry) {
            return _.extend(entry, {
                calleeShort: _.last(entry.callee.split('.')),
                fileName: _.last(entry.file.split('/')),
                fileShort: CallStack.shortenPath(entry.file),
                thirdParty: CallStack.isThirdParty(entry.file) && !entry.index
            });
        });
    }, function (parsedArrayWithSourceLines) {
        return CallStack.fromParsedArray(parsedArrayWithSourceLines);
    })),
    rawStringToArray: $static(function (rawString) {
        var lines = (rawString || '').split('\n');
        return _.filter2(lines, function (line) {
            line = line.trimmed;
            var callee, fileLineColumn = [], native_ = false;
            var planA = undefined, planB = undefined;
            if ((planA = line.match(/at (.+) \((.+)\)/)) || (planA = line.match(/(.*)@(.*)/))) {
                callee = planA[1];
                native_ = planA[2] === 'native';
                fileLineColumn = _.rest(planA[2].match(/(.*):(.+):(.+)/) || []);
            } else if (planB = line.match(/^(at\s+)*(.+):([0-9]+):([0-9]+)/)) {
                fileLineColumn = _.rest(planB, 2);
            } else {
                return false;
            }
            if ((callee || '').indexOf('__supressErrorReporting') >= 0) {
                return false;
            }
            return {
                beforeParse: line,
                callee: callee || '',
                index: Platform.Browser && fileLineColumn[0] === window.location.href,
                'native': native_,
                file: fileLineColumn[0] || '',
                line: (fileLineColumn[1] || '').integerValue,
                column: (fileLineColumn[2] || '').integerValue
            };
        });
    })
});
$prototype.macro(function (def, base) {
    var stack = CallStack.currentAsRawString;
    if (!def.$meta) {
        def.$meta = $static(_.cps.memoize(function (then) {
            _.cps.find(CallStack.fromRawString(stack).reversed, function (entry, found) {
                entry.sourceReady(function (text) {
                    var match = (text || '').match(/([A-z]+)\s*=\s*\$(prototype|singleton|component|extends|trait|aspect)/);
                    found(match && {
                        name: match[1],
                        type: match[2],
                        file: entry.fileShort
                    } || false);
                });
            }, function (found) {
                then(found || {});
            });
        }));
    }
    return def;
});
_.hasLog = true;
_.extend(log = function () {
    return log.write.apply(this, [log.config({
            location: true,
            stackOffset: 1
        })].concat(_.asArray(arguments)));
}, {
    Color: $prototype(),
    Config: $prototype(),
    cleanArgs: function (args) {
        return _.reject(args, _.or(log.Color.isTypeOf, log.Config.isTypeOf));
    },
    read: function (type, args) {
        return _.find(args, type.isTypeOf) || new type({});
    },
    modify: function (type, args, operator) {
        return _.reject(args, type.isTypeOf).concat(operator(log.read(type, args)));
    }
});
_.extend(log, {
    config: function (cfg) {
        return new log.Config(cfg);
    },
    indent: function (n) {
        return log.config({ indent: n });
    },
    color: {
        red: new log.Color({
            shell: '\x1B[31m',
            css: 'crimson'
        }),
        blue: new log.Color({
            shell: '\x1B[36m',
            css: 'royalblue'
        }),
        orange: new log.Color({
            shell: '\x1B[33m',
            css: 'saddlebrown'
        }),
        green: new log.Color({
            shell: '\x1B[32m',
            css: 'forestgreen'
        })
    },
    readColor: log.read.partial(log.Color),
    readConfig: log.read.partial(log.Config),
    modifyColor: log.modify.partial(log.Color),
    modifyConfig: log.modify.partial(log.Config),
    boldLine: '======================================',
    line: '--------------------------------------',
    thinLine: '......................................',
    withWriteBackend: $scope(function (release, backend, contextFn, done) {
        var prev = log.writeBackend.value;
        log.writeBackend.value = backend;
        contextFn(function (then) {
            release(function () {
                log.writeBackend.value = prev;
                if (then)
                    then();
                if (done)
                    done();
            });
        });
    }),
    writeUsingDefaultBackend: function () {
        var args = arguments;
        log.withWriteBackend(log.impl.defaultWriteBackend, function (done) {
            log.write.apply(null, args);
            done();
        });
    },
    writeBackend: function () {
        return arguments.callee.value || log.impl.defaultWriteBackend;
    },
    withConfig: function (config, what) {
        log.impl.configStack.push(log.impl.configure([
            { stackOffset: -1 },
            config
        ]));
        var result = what();
        log.impl.configStack.pop();
        return result;
    },
    currentConfig: function () {
        return log.impl.configure(log.impl.configStack);
    },
    impl: {
        configStack: [],
        configure: function (configs) {
            return _.reduce2({
                stackOffset: 0,
                indent: 0
            }, _.nonempty(configs), function (memo, cfg) {
                return _.extend(memo, _.nonempty(cfg), {
                    indent: memo.indent + (cfg.indent || 0),
                    stackOffset: memo.stackOffset + (cfg.stackOffset || 0)
                });
            });
        },
        write: $restArg(function () {
            var writeBackend = log.writeBackend();
            var args = _.asArray(arguments);
            var cleanArgs = log.cleanArgs(args);
            var config = log.impl.configure(_.concat([{ stackOffset: Platform.NodeJS ? 1 : 3 }], log.impl.configStack, _.filter(args, log.Config.isTypeOf)));
            var indent = (writeBackend.indent || 0) + (config.indent || 0);
            var text = log.impl.stringifyArguments(cleanArgs, config);
            var indentation = _.times(indent, _.constant('\t')).join('');
            var match = text.reversed.match(/(\n*)([^]*)/);
            var where = config.where || $callStack[config.stackOffset] || {};
            var backendParams = {
                color: config.color || log.readColor(args),
                indentation: indentation,
                indentedText: match[2].reversed.split('\n').map(_.prepends(indentation)).join('\n'),
                trailNewlines: match[1],
                codeLocation: config.location && log.impl.location(where) || '',
                where: config.location && where || undefined,
                args: args,
                config: config
            };
            writeBackend(backendParams);
            return cleanArgs[0];
        }),
        defaultWriteBackend: function (params) {
            var color = params.color, indentedText = params.indentedText, codeLocation = params.codeLocation, trailNewlines = params.trailNewlines;
            var colorValue = color && (Platform.NodeJS ? color.shell : color.css);
            if (Platform.NodeJS) {
                if (colorValue) {
                    console.log(colorValue + indentedText + '\x1B[0m', codeLocation, trailNewlines);
                } else {
                    console.log(indentedText, codeLocation, trailNewlines);
                }
            } else {
                var lines = indentedText.split('\n');
                var allButFirstLinePaddedWithSpace = [_.first(lines) || ''].concat(_.rest(lines).map(_.prepends(' ')));
                console.log((colorValue ? '%c' : '') + allButFirstLinePaddedWithSpace.join('\n'), colorValue ? 'color: ' + colorValue : '', codeLocation, trailNewlines);
            }
        },
        location: function (where) {
            return _.quoteWith('()', _.nonempty([
                where.calleeShort,
                where.fileName + ':' + where.line
            ]).join(' @ '));
        },
        stringifyArguments: function (args, cfg) {
            return _.map(args, log.impl.stringify.tails2(cfg)).join(' ');
        },
        stringify: function (what, cfg) {
            cfg = cfg || {};
            if (_.isTypeOf(Error, what)) {
                var str = log.impl.stringifyError(what);
                if (what.originalError) {
                    return str + '\n\n' + log.impl.stringify(what.originalError);
                } else {
                    return str;
                }
            } else if (_.isTypeOf(CallStack, what)) {
                return log.impl.stringifyCallStack(what);
            } else if (typeof what === 'object') {
                if (_.isArray(what) && what.length > 1 && _.isObject(what[0]) && cfg.table) {
                    return log.asTable(what);
                } else {
                    return _.stringify(what, cfg);
                }
            } else if (typeof what === 'string') {
                return what;
            } else {
                return _.stringify(what);
            }
        },
        stringifyError: function (e) {
            try {
                var stack = CallStack.fromErrorWithAsync(e).clean.offset(e.stackOffset || 0);
                var why = (e.message || '').replace(/\r|\n/g, '').trimmed.first(120);
                return '[EXCEPTION] ' + why + '\n\n' + (e.notMatching && _.map(_.coerceToArray(e.notMatching || []), log.impl.stringify.then(_.prepends('\t'))).join('\n') + '\n\n' || '') + log.impl.stringifyCallStack(stack) + '\n';
            } catch (sub) {
                return 'YO DAWG I HEARD YOU LIKE EXCEPTIONS... SO WE THREW EXCEPTION WHILE PRINTING YOUR EXCEPTION:\n\n' + sub.stack + '\n\nORIGINAL EXCEPTION:\n\n' + e.stack + '\n\n';
            }
        },
        stringifyCallStack: function (stack) {
            return log.columns(stack.map(function (entry) {
                return [
                    '\t' + 'at ' + entry.calleeShort.first(30),
                    _.nonempty([
                        entry.fileShort,
                        ':',
                        entry.line
                    ]).join(''),
                    (entry.source || '').first(80)
                ];
            })).join('\n');
        }
    }
});
(function () {
    var write = log.impl.write;
    _.extend(log, log.printAPI = _.object(_.concat([
        [
            'newline',
            write.$('', log.config({ location: false }))
        ],
        [
            'write',
            write
        ]
    ], _.flat(_.map([
        'red failure error e',
        'blue info i',
        'orange warning warn w',
        'green success ok g'
    ], _.splitsWith(' ').then(_.mapsWith(function (name, i, names) {
        return [
            name,
            write.$(log.config({
                location: i !== 0,
                color: log.color[names.first]
            }))
        ];
    })))))));
}());
log.writes = _.higherOrder(log.write);
logs = _.mapWith(_.higherOrder, log.printAPI);
log.pretty = _.map2(log.printAPI, _.partial.tails2(log.config({ pretty: true })));
_.extend(log, {
    asTable: function (arrayOfObjects) {
        var columnsDef = arrayOfObjects.map(_.keys.arity1).reduce(_.union.arity2, []);
        var lines = log.columns([columnsDef].concat(_.map(arrayOfObjects, function (object) {
            return columnsDef.map(_.propertyOf(object));
        })), {
            maxTotalWidth: 120,
            minColumnWidths: columnsDef.map(_.property('length'))
        });
        return [
            lines[0],
            log.thinLine[0].repeats(lines[0].length),
            _.rest(lines)
        ].flat.join('\n');
    },
    columns: function (rows, cfg_) {
        if (rows.length === 0) {
            return [];
        } else {
            var rowsToStr = rows.map(_.map.tails2(function (col) {
                return _.asString(col).split('\n')[0];
            }));
            var columnWidths = rowsToStr.map(_.map.tails2(_.property('length')));
            var maxWidths = columnWidths.zip(_.largest);
            var cfg = cfg_ || {
                minColumnWidths: maxWidths,
                maxTotalWidth: 0
            };
            var totalWidth = _.reduce(maxWidths, _.sum, 0);
            var relativeWidths = _.map(maxWidths, _.muls(1 / totalWidth));
            var excessWidth = Math.max(0, totalWidth - cfg.maxTotalWidth);
            var computedWidths = _.map(maxWidths, function (w, i) {
                return Math.max(cfg.minColumnWidths[i], Math.floor(w - excessWidth * relativeWidths[i]));
            });
            var restWidths = columnWidths.map(function (widths) {
                return [
                    computedWidths,
                    widths
                ].zip(_.subtract);
            });
            return [
                rowsToStr,
                restWidths
            ].zip(_.zap.tails(function (str, w) {
                return w >= 0 ? str + ' '.repeats(w) : _.initial(str, -w).join('');
            }).then(_.joinsWith('  ')));
        }
    }
});
if (Platform.NodeJS) {
    module.exports = log;
}
;
_.defineTagKeyword('shouldFail');
_.defineTagKeyword('async');
_.defineTagKeyword('assertion');
Testosterone = $singleton({
    prototypeTests: [],
    isRunning: $property(function () {
        return this.currentAssertion !== undefined;
    }),
    constructor: function () {
        _.each(_.assertions, function (fn, name) {
            this.defineAssertion(name, name === 'assertFails' ? $shouldFail(function (what) {
                what.call(this);
            }) : fn);
        }, this);
        (function (register) {
            $prototype.macro('$test', register);
            $prototype.macro('$tests', register);
        }(this.$(function (def, value, name) {
            this.prototypeTests.push({
                proto: def.constructor,
                tests: value
            });
            def.$tests = $static($property($constant(_.isStrictlyObject(value) && value || _.object([[
                    'test',
                    value
                ]]))));
            return def;
        })));
        this.run = this.$(this.run);
    },
    run: _.interlocked(function (releaseLock, cfg_, optionalThen) {
        var then = arguments.length === 3 ? optionalThen : _.identity;
        var defaults = {
            suites: [],
            silent: true,
            verbose: false,
            timeout: 2000,
            filter: _.identity,
            testStarted: function (test) {
            },
            testComplete: function (test) {
            }
        };
        var cfg = this.runConfig = _.extend(defaults, cfg_);
        var suitesIsArray = _.isArray(cfg.suites);
        var suites = _.map(cfg.suites, this.$(function (suite, name) {
            return this.testSuite(suitesIsArray ? suite.name : name, suitesIsArray ? suite.tests : suite, cfg.context);
        }));
        var collectPrototypeTests = cfg.codebase === false ? _.cps.constant([]) : this.$(this.collectPrototypeTests);
        collectPrototypeTests(this.$(function (prototypeTests) {
            var baseTests = cfg.codebase === false ? [] : this.collectTests();
            var allTests = _.flatten(_.pluck(baseTests.concat(suites).concat(prototypeTests), 'tests'));
            var selectTests = _.filter(allTests, cfg.shouldRun || _.constant(true));
            this.runningTests = _.map(selectTests, function (test, i) {
                return _.extend(test, {
                    indent: cfg.indent,
                    index: i
                });
            });
            _.assertTypeMatches(_.map(_.pluck(this.runningTests, 'routine'), $untag), ['function']);
            this.runningTests = _.filter(this.runningTests, cfg.filter || _.identity);
            _.cps.each(this.runningTests, this.$(this.runTest), this.$(function () {
                _.assert(cfg.done !== true);
                cfg.done = true;
                this.printLog(cfg);
                this.failedTests = _.filter(this.runningTests, _.property('failed'));
                this.failed = this.failedTests.length > 0;
                then(!this.failed);
                releaseLock();
            }));
        }));
    }),
    onException: function (e) {
        if (this.currentAssertion)
            this.currentAssertion.onException(e);
        else
            throw e;
    },
    defineAssertions: function (assertions) {
        _.each(assertions, function (fn, name) {
            this.defineAssertion(name, fn);
        }, this);
    },
    runTest: function (test, i, then) {
        var self = this, runConfig = this.runConfig;
        runConfig.testStarted(test);
        test.verbose = runConfig.verbose;
        test.timeout = runConfig.timeout;
        test.startTime = Date.now();
        test.run(function () {
            runConfig.testComplete(test);
            test.time = Date.now() - test.startTime;
            then();
        });
    },
    collectTests: function () {
        return _.map(_.tests, this.$(function (suite, name) {
            return this.testSuite(name, suite);
        }));
    },
    collectPrototypeTests: function (then) {
        _.cps.map(this.prototypeTests, this.$(function (def, then) {
            def.proto.$meta(this.$(function (meta) {
                then(this.testSuite(meta.name, def.tests, undefined, def.proto));
            }));
        }), then);
    },
    testSuite: function (name, tests, context, proto) {
        return {
            name: name || '',
            tests: _(_.pairs(typeof tests === 'function' && _.object([[
                    name,
                    tests
                ]]) || tests)).map(function (keyValue) {
                var test = new Test({
                    proto: proto,
                    name: keyValue[0],
                    routine: keyValue[1],
                    suite: name,
                    context: context
                });
                test.complete(function () {
                    if (!(test.hasLog = test.logCalls.length > 0)) {
                        if (test.failed) {
                            log.red('FAIL');
                        } else if (test.verbose) {
                            log.green('PASS');
                        }
                    }
                });
                return test;
            })
        };
    },
    defineAssertion: function (name, def) {
        var self = this;
        _.deleteKeyword(name);
        _.defineKeyword(name, Tags.modify(def, function (fn) {
            return _.withSameArgs(fn, function () {
                var loc = $callStack.safeLocation(1);
                if (!self.currentAssertion) {
                    return fn.apply(self, arguments);
                } else {
                    return self.currentAssertion.babyAssertion(name, def, fn, arguments, loc);
                }
            });
        }));
    },
    printLog: function (cfg) {
        if (!cfg.supressLog) {
            var loggedTests = _.filter(this.runningTests, function (test) {
                return test.failed || !cfg.silent && test.hasLog;
            });
            var failedTests = _.filter(this.runningTests, _.property('failed'));
            _.invoke(cfg.verbose ? this.runningTests : loggedTests, 'printLog');
            if (failedTests.length) {
                log.orange('\n' + log.boldLine + '\n' + 'SOME TESTS FAILED:', _.pluck(failedTests, 'name').join(', '), '\n\n');
            } else if (cfg.silent !== true) {
                log.green('\n' + log.boldLine + '\n' + 'ALL TESTS PASS\n\n');
            }
        }
    }
});
Test = $prototype({
    constructor: function (cfg) {
        _.defaults(this, cfg, {
            name: '<< UNNAMED FOR UNKNOWN REASON >>',
            failed: false,
            routine: undefined,
            verbose: false,
            depth: 1,
            indent: 0,
            failedAssertions: [],
            context: this,
            complete: _.extend(_.barrier(), { context: this })
        });
        this.babyAssertion = _.interlocked(this.babyAssertion);
    },
    finalize: function () {
        this.babyAssertion.wait(this.$(function () {
            if (this.canFail && this.failedAssertions.length) {
                this.failed = true;
            }
            this.complete(true);
        }));
    },
    babyAssertion: function (releaseLock, name, def, fn, args, loc) {
        var self = this;
        var assertion = new Test({
            mother: this,
            name: name,
            shouldFail: def.$shouldFail || this.shouldFail,
            depth: this.depth + 1,
            location: loc,
            context: this.context,
            timeout: this.timeout / 2,
            verbose: this.verbose,
            silent: this.silent,
            routine: Tags.modify(def, function (fn) {
                return function (done) {
                    if ($async.is(args[0])) {
                        _.cps.apply(fn, self.context, args, function (args, then) {
                            if (then)
                                then();
                            done();
                        });
                    } else {
                        try {
                            fn.apply(self.context, args);
                            done();
                        } catch (e) {
                            assertion.onException(e);
                        }
                    }
                };
            })
        });
        var doneWithAssertion = function () {
            if (assertion.failed && self.canFail) {
                self.failedAssertions.push(assertion);
            }
            releaseLock();
        };
        assertion.run(function () {
            Testosterone.currentAssertion = self;
            if (assertion.failed || assertion.verbose && assertion.logCalls.notEmpty) {
                assertion.location.sourceReady(function (src) {
                    log.red(src, log.config({
                        location: assertion.location,
                        where: assertion.location
                    }));
                    assertion.evalLogCalls();
                    doneWithAssertion();
                });
            } else {
                doneWithAssertion();
            }
        });
    },
    canFail: $property(function () {
        return !this.failed && !this.shouldFail;
    }),
    fail: function () {
        this.failed = true;
        this.finalize();
    },
    assertionStack: $property(function () {
        var result = [], a = this;
        do {
            result.push(a);
            a = a.mother;
        } while (a);
        return result;
    }),
    onException: function (e) {
        if (this.canFail || this.verbose) {
            if (_.isAssertionError(e)) {
                if ('notMatching' in e) {
                    var notMatching = _.coerceToArray(e.notMatching);
                    if (e.asColumns) {
                        log.orange(log.columns(_.map(notMatching, function (obj) {
                            return [
                                '\u2022 ' + _.keys(obj)[0],
                                _.stringify(_.values(obj)[0])
                            ];
                        })).join('\n'));
                    } else {
                        _.each(notMatching, function (what, i) {
                            log.orange(_.bullet('\u2022 ', log.impl.stringify(what)));
                        });
                    }
                }
            } else {
                if (this.depth > 1) {
                    log.newline();
                }
                log.write(e);
            }
            log.newline();
        }
        if (this.canFail) {
            this.fail();
        } else {
            this.finalize();
        }
    },
    run: function (then) {
        var self = Testosterone.currentAssertion = this, routine = Tags.unwrap(this.routine);
        this.shouldFail = $shouldFail.is(this.routine);
        this.failed = false;
        this.hasLog = false;
        this.logCalls = [];
        this.failureLocations = {};
        _.withTimeout({
            maxTime: self.timeout,
            expired: function () {
                if (self.canFail) {
                    log.error('TIMEOUT EXPIRED');
                    self.fail();
                }
            }
        }, self.complete);
        _.withUncaughtExceptionHandler(self.$(self.onException), self.complete);
        log.withWriteBackend(_.extendWith({ indent: self.depth + (self.indent || 0) }, function (x) {
            self.logCalls.push(x);
        }), function (doneWithLogging) {
            self.complete(doneWithLogging.arity0);
            if (then) {
                self.complete(then);
            }
            if (routine.length > 0)
                routine.call(self.context, self.$(self.finalize));
            else
                routine.call(self.context), self.finalize();
        });
    },
    printLog: function () {
        var suiteName = this.suite && this.suite !== this.name && (this.suite || '').quote('[]') || '';
        log.write(log.color.blue, '\n' + log.boldLine, '\n' + _.nonempty([
            suiteName,
            this.name
        ]).join(' '), (this.index + ' of ' + Testosterone.runningTests.length).quote('()') + (this.failed ? ' FAILED' : '') + ':', '\n');
        this.evalLogCalls();
    },
    evalLogCalls: function () {
        _.each(this.logCalls, log.writeBackend().arity1);
    }
});
_.defineTagKeyword('recursive');
_.limitRecursion = function (max, fn, name) {
    if (!fn) {
        fn = max;
        max = 0;
    }
    var depth = -1;
    var reported = false;
    return function () {
        if (!reported) {
            if (depth > max) {
                reported = true;
                throw _.extendWith({
                    notMatching: _.map(arguments, function (arg, i) {
                        return 'arg' + (i + 1) + ': ' + _.stringify(arg);
                    })
                }, new Error(name + ': max recursion depth reached (' + max + ')'));
            } else {
                var result = (++depth, fn.apply(this, arguments));
                depth--;
                return result;
            }
        }
    };
};
Testosterone.ValidatesRecursion = $trait({
    $test: function () {
        var test = new ($component({
            $traits: [Testosterone.ValidatesRecursion],
            foo: function () {
            },
            bar: function () {
                this.bar();
            },
            baz: $recursive({ max: 2 }, function () {
                this.baz();
            }),
            qux: $recursive(function () {
                if (!this.quxCalled) {
                    this.quxCalled = true;
                    this.qux();
                }
            })
        }))();
        test.foo();
        $assertThrows(test.bar, { message: 'bar: max recursion depth reached (0)' });
        test.bar();
        $assertThrows(test.baz, { message: 'baz: max recursion depth reached (2)' });
        test.qux();
    },
    $constructor: function () {
        _.each(this, function (member, name) {
            if (_.isFunction($untag(member)) && name !== 'constructor' && (!member.$recursive || member.$recursive.max !== undefined)) {
                this[name] = Tags.modify(member, function (fn) {
                    return _.limitRecursion(member && member.$recursive && member.$recursive.max || 0, fn, name);
                });
            }
        }, this);
    }
});
Testosterone.LogsMethodCalls = $trait({
    $test: function () {
        var Proto = $prototype({ $traits: [Testosterone.LogsMethodCalls] });
        var compo = new ($extends(Proto, {
            foo: $log(function (_42) {
                $assert(_42, 42);
                return 24;
            })
        }))();
        $assert(compo.foo(42), 24);
        $assert(_.pluck(this.logCalls, 'indentedText'), [
            '\tfoo',
            '\t\t\u2192 24',
            '\t\t'
        ]);
    },
    $macroTags: {
        log: function (def, value, name) {
            var color = _.isBoolean(value.$log) ? undefined : log.color[value.$log];
            var protoName = '';
            $untag(def.$meta)(function (meta) {
                protoName = meta.name;
            });
            return Tags.modify(value, function (fn) {
                return function () {
                    var this_ = this, arguments_ = arguments;
                    var isProtoNameRedundant = log.currentConfig().protoName === protoName;
                    log.write(isProtoNameRedundant ? name : _.nonempty([
                        protoName,
                        name
                    ]).join('.') + _.map(arguments, _.stringifyOneLine).join(', ').quote(' ()'), log.config({ location: true }));
                    return log.withConfig({
                        indent: 1,
                        color: color,
                        protoName: protoName
                    }, function () {
                        var result = fn.apply(this_, arguments_);
                        if (result !== undefined) {
                            log.write('\u2192', _.stringifyOneLine(result), log.config({ color: color }));
                        }
                        if (log.currentConfig().indent < 2) {
                            log.newline();
                        }
                        return result;
                    });
                };
            });
        }
    }
});
if (Platform.NodeJS) {
    module.exports = Testosterone;
}
;
_.measure = function (routine, then) {
    if (then) {
        var now = _.now();
        routine(function () {
            then(_.now() - now);
        });
    } else {
        var now = _.now();
        routine();
        return _.now() - now;
    }
};
_.perfTest = function (arg, then) {
    var rounds = 500;
    var routines = _.isFunction(arg) ? { test: arg } : arg;
    var timings = {};
    _.cps.each(routines, function (fn, name, then) {
        var result = [];
        var run = function () {
            for (var i = 0; i < rounds; i++) {
                result.push(fn());
            }
            console.log(name, result);
        };
        run();
        _.delay(function () {
            timings[name] = _.measure(run) / rounds;
            then();
        }, 100);
    }, function () {
        then(timings);
    });
};
(function () {
    var fnNameExpr = $r.expr('how', $r.text('before').or.text('after')).expr('name', $r.anything).$;
    var tryBind = function (target, methodName, bind, boundMethod) {
        var method = target[methodName];
        if (method && _.isFunction(method)) {
            bind(target, methodName, boundMethod);
        }
    };
    _.defineKeyword('aspect', function (ofWhat, cfg) {
        var aspectDef = Tags.unwrap(_.sequence($prototype.impl.extendWithTags, $prototype.impl.flatten, $prototype.impl.generateArgumentContractsIfNeeded, $prototype.impl.contributeTraits({}), $prototype.impl.expandAliases).call($prototype.impl, cfg));
        var motherDef = ofWhat.constructor && ofWhat.constructor.$definition;
        if (motherDef) {
            (motherDef.$aspects = motherDef.$aspects || []).push(aspectDef);
        }
        _.each(aspectDef, function (value, name) {
            if (aspectDef.hasOwnProperty(name) && _.isFunction(value)) {
                var parsed = fnNameExpr.parse(name);
                var originalName = parsed.name && parsed.name.decapitalized || name;
                var bindTool = parsed.how && _['on' + parsed.how.capitalized] || _.intercept;
                if (bindTool) {
                    tryBind(ofWhat, originalName, bindTool, value);
                    tryBind(ofWhat.prototype, originalName, bindTool, value);
                }
            }
        });
        if (ofWhat.aspectAdded) {
            ofWhat.aspectAdded(aspectDef);
        }
        return aspectDef;
    });
}());
if (Platform.Browser) {
    if (jQuery) {
        (function ($) {
            var __previousMethods__ = _.clone($.fn);
            _.extend($, {
                svg: function (tag) {
                    var node = document.createElementNS('http://www.w3.org/2000/svg', tag);
                    if (tag === 'svg' && !Platform.IE) {
                        node.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                    }
                    return $(node);
                }
            }).fn.extend({
                on: function (what, method) {
                    var el = this, method = _.find(arguments, _.isFunction);
                    if (method.queuedBy) {
                        method.queuedBy.push({
                            remove: function () {
                                el.off(what, method);
                            }
                        });
                    }
                    return __previousMethods__.on.apply(this, arguments);
                },
                item: function (value) {
                    if (value) {
                        if (this.length) {
                            this[0]._item = value;
                        }
                        return this;
                    } else {
                        return this.length ? this[0]._item : undefined;
                    }
                },
                props: function (what) {
                    _.extend.apply(null, [this[0]].concat(arguments));
                    return this;
                },
                props2: function (what) {
                    _.extend2.apply(null, [this[0]].concat(arguments));
                    return this;
                },
                hasWait: function () {
                    return this.hasClass('i-am-busy');
                },
                waitUntil: function (fn, then) {
                    this.addClass('i-am-busy').attr('disabled', true);
                    fn(this.$(function () {
                        this.removeClass('i-am-busy').removeAttr('disabled');
                        if (then) {
                            then.apply(null, arguments);
                        }
                    }));
                    return this;
                },
                hasParent: function (el) {
                    var parent = this;
                    while (parent.length > 0) {
                        if (parent[0] == (el[0] || el)) {
                            return true;
                        }
                        parent = parent.parent();
                    }
                    return false;
                },
                nonemptyValue: function () {
                    var value = $.trim(this.val());
                    return value.length == 0 ? undefined : value;
                },
                intValue: function () {
                    var value = parseInt(this.nonemptyValue(), 10);
                    return isNaN(value) ? undefined : value;
                },
                hitTest: function (event) {
                    var offset = this.offset();
                    var pt = {
                        x: event.clientX - offset.left,
                        y: event.clientY - offset.top
                    };
                    return pt.x >= 0 && pt.y >= 0 && pt.x < $(this).width() && pt.y < $(this).height();
                },
                attrs: function () {
                    return _.object(_.map(arguments, function (name) {
                        return [
                            name,
                            this.attr(name)
                        ];
                    }, this));
                },
                belongsTo: function (selector) {
                    return this.is(selector) || this.parents(selector).length;
                },
                selectClass: function (key, classes) {
                    return this.removeClass(_.values(classes).join(' ')).addClass(classes[key]);
                },
                attrInt: function (name) {
                    return (this.attr(name) || '').integerValue;
                },
                cssInt: function (name) {
                    return (this.css(name) || '').integerValue;
                },
                eachChild: function (selector, fn) {
                    _.each(this.find(selector), function (el) {
                        fn($(el));
                    });
                    return this;
                },
                transitionend: function (fn) {
                    return this.one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', fn.oneShot);
                },
                animationend: function (fn) {
                    return this.one('animationend webkitAnimationEnd oAnimationEnd oanimation MSAnimationEnd', fn.oneShot);
                },
                animateWith: function (cls, done) {
                    if (cls) {
                        this.addClass(cls);
                        this.animationend(this.$(function () {
                            this.removeClass(cls);
                            if (done) {
                                done.call(this);
                            }
                        }));
                    }
                    return this;
                },
                transitionWith: function (cls, done) {
                    if (cls) {
                        this.addClass(cls);
                        this.transitionend(this.$(function () {
                            this.removeClass(cls);
                            if (done) {
                                done.call(this);
                            }
                        }));
                    }
                    return this;
                },
                drag: function () {
                    var translateTouchEvent = function (e, desiredTarget) {
                        return e.originalEvent.touches && _.find(e.originalEvent.touches, function (touch) {
                            return $(touch.target).hasParent(desiredTarget);
                        }) || e;
                    };
                    return function (cfg) {
                        if (!Platform.touch && !window.__globalDragOverlay) {
                            window.__globalDragOverlay = $('<div>').css({
                                display: 'none',
                                position: 'fixed',
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: 0,
                                zIndex: 999999
                            }).appendTo(document.body);
                        }
                        var overlay = window.__globalDragOverlay;
                        var button = cfg.button || 1;
                        var begin = this.$(function (initialEvent) {
                            var relativeTo = cfg.relativeTo || this;
                            this.addClass(cfg.cls || '');
                            if (Platform.touch || initialEvent.which === button) {
                                var offset = relativeTo.offset(), memo = undefined;
                                if (!cfg.start || (memo = cfg.start.call(cfg.context || this, new Vec2(initialEvent.pageX - offset.left, initialEvent.pageY - offset.top), initialEvent)) !== false) {
                                    var abort = undefined, unbind = undefined, end = undefined;
                                    memo = _.clone(memo);
                                    var move = this.$(function (e) {
                                        if (Platform.touch || e.which === button) {
                                            e.preventDefault();
                                            var translatedEvent = translateTouchEvent(e, this[0]);
                                            var offset = relativeTo.offset();
                                            memo = cfg.move.call(cfg.context || this, memo, new Vec2(translatedEvent.pageX - initialEvent.pageX, translatedEvent.pageY - initialEvent.pageY), new Vec2(translatedEvent.pageX - offset.left, translatedEvent.pageY - offset.top), translatedEvent) || memo;
                                        } else {
                                            abort(e);
                                        }
                                    });
                                    unbind = function () {
                                        $(overlay || document.body).css(overlay ? { display: 'none' } : {}).off('mouseup touchend', end).off('mousemove touchmove', move);
                                    };
                                    end = this.$(function (e) {
                                        unbind();
                                        if (cfg.end) {
                                            var translatedEvent = translateTouchEvent(e, this[0]);
                                            cfg.end.call(cfg.context || this, memo, new Vec2(translatedEvent.pageX - initialEvent.pageX, translatedEvent.pageY - initialEvent.pageY), translatedEvent);
                                        }
                                        this.removeClass(cfg.cls || '');
                                    });
                                    abort = this.$(function (e) {
                                        unbind();
                                        end(e);
                                    });
                                    $(overlay || document.body).css(overlay ? {
                                        display: '',
                                        cursor: cfg.cursor || ''
                                    } : {}).on('mousemove touchmove', move).one('mouseup touchend', end);
                                    if (cfg.callMoveAtStart) {
                                        cfg.move.call(cfg.context || this, memo, Vec2.zero, new Vec2(initialEvent.pageX - offset.left, initialEvent.pageY - offset.top), initialEvent);
                                    }
                                }
                            }
                        });
                        var touchstartListener = _.$(this, function (e) {
                            var where = _.extend({}, translateTouchEvent(e, this[0]));
                            if (Platform.touch && cfg.longPress) {
                                var cancel = undefined;
                                var timeout = window.setTimeout(_.$(this, function () {
                                    this.off('touchmove touchend', cancel);
                                    begin(where);
                                }), 300);
                                cancel = this.$(function () {
                                    window.clearTimeout(timeout);
                                    this.off('touchmove touchend', cancel);
                                });
                                this.one('touchmove touchend', cancel);
                            } else {
                                begin(where);
                                e.preventDefault();
                                e.stopPropagation();
                            }
                        });
                        this.on(Platform.touch ? 'touchstart' : 'mousedown', touchstartListener);
                        return _.extend(this, {
                            cancel: this.$(function () {
                                this.off(Platform.touch ? 'touchstart' : 'mousedown', touchstartListener);
                            })
                        });
                    };
                }(),
                transform: function (cfg) {
                    if (arguments.length === 0) {
                        var components = (this.css('transform') || '').match(/^matrix\((.+\))$/);
                        if (components) {
                            var m = components[1].split(',').map(parseFloat);
                            return new Transform({
                                a: m[0],
                                b: m[1],
                                c: m[2],
                                d: m[3],
                                e: m[4],
                                f: m[5]
                            });
                        } else {
                            return Transform.identity;
                        }
                    } else {
                        return this.css('transform', _.isStrictlyObject(cfg) && (cfg.translate ? 'translate(' + cfg.translate.x + 'px,' + cfg.translate.y + 'px) ' : '') + (cfg.rotate ? 'rotate(' + cfg.rotate + 'rad) ' : '') + (cfg.scale ? 'scale(' + new Vec2(cfg.scale).separatedWith(',') + ')' : '') || '');
                    }
                },
                svgTranslate: function (pt) {
                    return this.attr('transform', 'translate(' + pt.x + ',' + pt.y + ')');
                },
                svgTransformMatrix: function (t) {
                    var m = t.components;
                    return this.attr('transform', 'matrix(' + m[0][0] + ',' + m[1][0] + ',' + m[0][1] + ',' + m[1][1] + ',' + m[0][2] + ',' + m[1][2] + ')');
                },
                svgTransformToElement: function (el) {
                    return Transform.svgMatrix(this[0].getTransformToElement(el[0]));
                },
                svgBBox: function (bbox) {
                    if (arguments.length === 0) {
                        return new BBox(this[0].getBBox());
                    } else {
                        return this.attr(bbox.xywh);
                    }
                },
                outerExtent: function () {
                    return new Vec2(this.outerWidth(), this.outerHeight());
                },
                extent: function () {
                    return new Vec2(this.width(), this.height());
                },
                innerExtent: function () {
                    return new Vec2(this.innerWidth(), this.innerHeight());
                },
                outerBBox: function () {
                    return BBox.fromLTWH(_.extend(this.offset(), this.outerExtent().asWidthHeight));
                },
                clientBBox: function () {
                    return BBox.fromLTWH(this[0].getBoundingClientRect());
                },
                leftTop: function () {
                    return new Vec2.fromLT(this.offset());
                },
                offsetInParent: function () {
                    return Vec2.fromLeftTop(this.offset()).sub(Vec2.fromLeftTop(this.parent().offset()));
                },
                monitorInput: function (cfg) {
                    var change = function () {
                        if ($.trim($(this).val()) === '') {
                            cfg.empty(true);
                        } else {
                            cfg.empty(false);
                        }
                    };
                    return this.keyup(change).change(change).focus(_.bind(cfg.focus || _.noop, cfg, true)).blur(_.bind(cfg.focus || _.noop, cfg, false));
                },
                touchClick: function (fn, cfg) {
                    var self = this;
                    cfg = cfg || {};
                    if (!cfg.disableTouch && Platform.touch) {
                        var touchstartHandler = function (e) {
                            fn.apply(this, arguments);
                            e.preventDefault();
                            return false;
                        };
                        var clickHandler = function (e) {
                            e.preventDefault();
                            return false;
                        };
                        if (cfg.handler) {
                            cfg.handler({
                                unbind: function () {
                                    self.off('touchstart', touchstartHandler).off('click', clickHandler);
                                }
                            });
                        }
                        return this.on('touchstart', touchstartHandler).on('click', clickHandler);
                    } else {
                        if (cfg.handler) {
                            cfg.handler({
                                unbind: function () {
                                    self.off('click', fn);
                                }
                            });
                        }
                        return this.click(fn);
                    }
                },
                touchDoubleclick: function (fn) {
                    if (Platform.touch) {
                        var lastTime = Date.now();
                        return this.on('touchend', function () {
                            var now = Date.now();
                            if (now - lastTime < 200) {
                                fn.apply(this, arguments);
                            }
                            lastTime = now;
                        });
                    } else {
                        return this.dblclick(fn);
                    }
                },
                nodoubletapzoom: function () {
                    return $(this).bind('touchstart', function preventZoom(e) {
                        var t2 = e.timeStamp;
                        var t1 = $(this).data('lastTouch') || t2;
                        var dt = t2 - t1;
                        var fingers = e.originalEvent.touches.length;
                        $(this).data('lastTouch', t2);
                        if (!dt || dt > 500 || fingers > 1) {
                            return;
                        }
                        e.preventDefault();
                        $(e.target).trigger('click');
                    });
                }
            });
        }(jQuery));
    }
    ;
}
if (Platform.NodeJS) {
    module.exports = _;
}