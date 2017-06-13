/* eslint quote-props: 0 */

'use strict';

const path = require('path');

const defaultMimeType = 'application/octet-stream';
const defaultExtension = 'bin';

const mimeTypes = new Map([
    ['application/acad', 'dwg'],
    ['application/applixware', 'aw'],
    ['application/arj', 'arj'],
    ['application/atom+xml', 'xml'],
    ['application/atomcat+xml', 'atomcat'],
    ['application/atomsvc+xml', 'atomsvc'],
    ['application/base64', ['mm', 'mme']],
    ['application/binhex', 'hqx'],
    ['application/binhex4', 'hqx'],
    ['application/book', ['book', 'boo']],
    ['application/ccxml+xml,', 'ccxml'],
    ['application/cdf', 'cdf'],
    ['application/cdmi-capability', 'cdmia'],
    ['application/cdmi-container', 'cdmic'],
    ['application/cdmi-domain', 'cdmid'],
    ['application/cdmi-object', 'cdmio'],
    ['application/cdmi-queue', 'cdmiq'],
    ['application/clariscad', 'ccad'],
    ['application/commonground', 'dp'],
    ['application/cu-seeme', 'cu'],
    ['application/davmount+xml', 'davmount'],
    ['application/drafting', 'drw'],
    ['application/dsptype', 'tsp'],
    ['application/dssc+der', 'dssc'],
    ['application/dssc+xml', 'xdssc'],
    ['application/dxf', 'dxf'],
    ['application/ecmascript', ['js', 'es']],
    ['application/emma+xml', 'emma'],
    ['application/envoy', 'evy'],
    ['application/epub+zip', 'epub'],
    ['application/excel', ['xls',
        'xl',
        'xla',
        'xlb',
        'xlc',
        'xld',
        'xlk',
        'xll',
        'xlm',
        'xlt',
        'xlv',
        'xlw'
    ]],
    ['application/exi', 'exi'],
    ['application/font-tdpfr', 'pfr'],
    ['application/fractals', 'fif'],
    ['application/freeloader', 'frl'],
    ['application/futuresplash', 'spl'],
    ['application/gnutar', 'tgz'],
    ['application/groupwise', 'vew'],
    ['application/hlp', 'hlp'],
    ['application/hta', 'hta'],
    ['application/hyperstudio', 'stk'],
    ['application/i-deas', 'unv'],
    ['application/iges', ['iges', 'igs']],
    ['application/inf', 'inf'],
    ['application/internet-property-stream', 'acx'],
    ['application/ipfix', 'ipfix'],
    ['application/java', 'class'],
    ['application/java-archive', 'jar'],
    ['application/java-byte-code', 'class'],
    ['application/java-serialized-object', 'ser'],
    ['application/java-vm', 'class'],
    ['application/javascript', 'js'],
    ['application/json', 'json'],
    ['application/lha', 'lha'],
    ['application/lzx', 'lzx'],
    ['application/mac-binary', 'bin'],
    ['application/mac-binhex', 'hqx'],
    ['application/mac-binhex40', 'hqx'],
    ['application/mac-compactpro', 'cpt'],
    ['application/macbinary', 'bin'],
    ['application/mads+xml', 'mads'],
    ['application/marc', 'mrc'],
    ['application/marcxml+xml', 'mrcx'],
    ['application/mathematica', 'ma'],
    ['application/mathml+xml', 'mathml'],
    ['application/mbedlet', 'mbd'],
    ['application/mbox', 'mbox'],
    ['application/mcad', 'mcd'],
    ['application/mediaservercontrol+xml', 'mscml'],
    ['application/metalink4+xml', 'meta4'],
    ['application/mets+xml', 'mets'],
    ['application/mime', 'aps'],
    ['application/mods+xml', 'mods'],
    ['application/mp21', 'm21'],
    ['application/mp4', 'mp4'],
    ['application/mspowerpoint', ['ppt', 'pot', 'pps', 'ppz']],
    ['application/msword', ['doc', 'dot', 'w6w', 'wiz', 'word']],
    ['application/mswrite', 'wri'],
    ['application/mxf', 'mxf'],
    ['application/netmc', 'mcp'],
    ['application/octet-stream', ['*']],
    ['application/oda', 'oda'],
    ['application/oebps-package+xml', 'opf'],
    ['application/ogg', 'ogx'],
    ['application/olescript', 'axs'],
    ['application/onenote', 'onetoc'],
    ['application/patch-ops-error+xml', 'xer'],
    ['application/pdf', 'pdf'],
    ['application/pgp-encrypted', 'asc'],
    ['application/pgp-signature', 'pgp'],
    ['application/pics-rules', 'prf'],
    ['application/pkcs-12', 'p12'],
    ['application/pkcs-crl', 'crl'],
    ['application/pkcs10', 'p10'],
    ['application/pkcs7-mime', ['p7c', 'p7m']],
    ['application/pkcs7-signature', 'p7s'],
    ['application/pkcs8', 'p8'],
    ['application/pkix-attr-cert', 'ac'],
    ['application/pkix-cert', ['cer', 'crt']],
    ['application/pkix-crl', 'crl'],
    ['application/pkix-pkipath', 'pkipath'],
    ['application/pkixcmp', 'pki'],
    ['application/plain', 'text'],
    ['application/pls+xml', 'pls'],
    ['application/postscript', ['ps', 'ai', 'eps']],
    ['application/powerpoint', 'ppt'],
    ['application/pro_eng', ['part', 'prt']],
    ['application/prs.cww', 'cww'],
    ['application/pskc+xml', 'pskcxml'],
    ['application/rdf+xml', 'rdf'],
    ['application/reginfo+xml', 'rif'],
    ['application/relax-ng-compact-syntax', 'rnc'],
    ['application/resource-lists+xml', 'rl'],
    ['application/resource-lists-diff+xml', 'rld'],
    ['application/ringing-tones', 'rng'],
    ['application/rls-services+xml', 'rs'],
    ['application/rsd+xml', 'rsd'],
    ['application/rss+xml', 'xml'],
    ['application/rtf', ['rtf', 'rtx']],
    ['application/sbml+xml', 'sbml'],
    ['application/scvp-cv-request', 'scq'],
    ['application/scvp-cv-response', 'scs'],
    ['application/scvp-vp-request', 'spq'],
    ['application/scvp-vp-response', 'spp'],
    ['application/sdp', 'sdp'],
    ['application/sea', 'sea'],
    ['application/set', 'set'],
    ['application/set-payment-initiation', 'setpay'],
    ['application/set-registration-initiation', 'setreg'],
    ['application/shf+xml', 'shf'],
    ['application/sla', 'stl'],
    ['application/smil', ['smi', 'smil']],
    ['application/smil+xml', 'smi'],
    ['application/solids', 'sol'],
    ['application/sounder', 'sdr'],
    ['application/sparql-query', 'rq'],
    ['application/sparql-results+xml', 'srx'],
    ['application/srgs', 'gram'],
    ['application/srgs+xml', 'grxml'],
    ['application/sru+xml', 'sru'],
    ['application/ssml+xml', 'ssml'],
    ['application/step', ['step', 'stp']],
    ['application/streamingmedia', 'ssm'],
    ['application/tei+xml', 'tei'],
    ['application/thraud+xml', 'tfi'],
    ['application/timestamped-data', 'tsd'],
    ['application/toolbook', 'tbk'],
    ['application/vda', 'vda'],
    ['application/vnd.3gpp.pic-bw-large', 'plb'],
    ['application/vnd.3gpp.pic-bw-small', 'psb'],
    ['application/vnd.3gpp.pic-bw-var', 'pvb'],
    ['application/vnd.3gpp2.tcap', 'tcap'],
    ['application/vnd.3m.post-it-notes', 'pwn'],
    ['application/vnd.accpac.simply.aso', 'aso'],
    ['application/vnd.accpac.simply.imp', 'imp'],
    ['application/vnd.acucobol', 'acu'],
    ['application/vnd.acucorp', 'atc'],
    ['application/vnd.adobe.air-application-installer-package+zip',
        'air'
    ],
    ['application/vnd.adobe.fxp', 'fxp'],
    ['application/vnd.adobe.xdp+xml', 'xdp'],
    ['application/vnd.adobe.xfdf', 'xfdf'],
    ['application/vnd.ahead.space', 'ahead'],
    ['application/vnd.airzip.filesecure.azf', 'azf'],
    ['application/vnd.airzip.filesecure.azs', 'azs'],
    ['application/vnd.amazon.ebook', 'azw'],
    ['application/vnd.americandynamics.acc', 'acc'],
    ['application/vnd.amiga.ami', 'ami'],
    ['application/vnd.android.package-archive', 'apk'],
    ['application/vnd.anser-web-certificate-issue-initiation',
        'cii'
    ],
    ['application/vnd.anser-web-funds-transfer-initiation', 'fti'],
    ['application/vnd.antix.game-component', 'atx'],
    ['application/vnd.apple.installer+xml', 'mpkg'],
    ['application/vnd.apple.mpegurl', 'm3u8'],
    ['application/vnd.aristanetworks.swi', 'swi'],
    ['application/vnd.audiograph', 'aep'],
    ['application/vnd.blueice.multipass', 'mpm'],
    ['application/vnd.bmi', 'bmi'],
    ['application/vnd.businessobjects', 'rep'],
    ['application/vnd.chemdraw+xml', 'cdxml'],
    ['application/vnd.chipnuts.karaoke-mmd', 'mmd'],
    ['application/vnd.cinderella', 'cdy'],
    ['application/vnd.claymore', 'cla'],
    ['application/vnd.cloanto.rp9', 'rp9'],
    ['application/vnd.clonk.c4group', 'c4g'],
    ['application/vnd.cluetrust.cartomobile-config', 'c11amc'],
    ['application/vnd.cluetrust.cartomobile-config-pkg', 'c11amz'],
    ['application/vnd.commonspace', 'csp'],
    ['application/vnd.contact.cmsg', 'cdbcmsg'],
    ['application/vnd.cosmocaller', 'cmc'],
    ['application/vnd.crick.clicker', 'clkx'],
    ['application/vnd.crick.clicker.keyboard', 'clkk'],
    ['application/vnd.crick.clicker.palette', 'clkp'],
    ['application/vnd.crick.clicker.template', 'clkt'],
    ['application/vnd.crick.clicker.wordbank', 'clkw'],
    ['application/vnd.criticaltools.wbs+xml', 'wbs'],
    ['application/vnd.ctc-posml', 'pml'],
    ['application/vnd.cups-ppd', 'ppd'],
    ['application/vnd.curl.car', 'car'],
    ['application/vnd.curl.pcurl', 'pcurl'],
    ['application/vnd.data-vision.rdz', 'rdz'],
    ['application/vnd.denovo.fcselayout-link', 'fe_launch'],
    ['application/vnd.dna', 'dna'],
    ['application/vnd.dolby.mlp', 'mlp'],
    ['application/vnd.dpgraph', 'dpg'],
    ['application/vnd.dreamfactory', 'dfac'],
    ['application/vnd.dvb.ait', 'ait'],
    ['application/vnd.dvb.service', 'svc'],
    ['application/vnd.dynageo', 'geo'],
    ['application/vnd.ecowin.chart', 'mag'],
    ['application/vnd.enliven', 'nml'],
    ['application/vnd.epson.esf', 'esf'],
    ['application/vnd.epson.msf', 'msf'],
    ['application/vnd.epson.quickanime', 'qam'],
    ['application/vnd.epson.salt', 'slt'],
    ['application/vnd.epson.ssf', 'ssf'],
    ['application/vnd.eszigno3+xml', 'es3'],
    ['application/vnd.ezpix-album', 'ez2'],
    ['application/vnd.ezpix-package', 'ez3'],
    ['application/vnd.fdf', 'fdf'],
    ['application/vnd.fdsn.seed', 'seed'],
    ['application/vnd.flographit', 'gph'],
    ['application/vnd.fluxtime.clip', 'ftc'],
    ['application/vnd.framemaker', 'fm'],
    ['application/vnd.frogans.fnc', 'fnc'],
    ['application/vnd.frogans.ltf', 'ltf'],
    ['application/vnd.fsc.weblaunch', 'fsc'],
    ['application/vnd.fujitsu.oasys', 'oas'],
    ['application/vnd.fujitsu.oasys2', 'oa2'],
    ['application/vnd.fujitsu.oasys3', 'oa3'],
    ['application/vnd.fujitsu.oasysgp', 'fg5'],
    ['application/vnd.fujitsu.oasysprs', 'bh2'],
    ['application/vnd.fujixerox.ddd', 'ddd'],
    ['application/vnd.fujixerox.docuworks', 'xdw'],
    ['application/vnd.fujixerox.docuworks.binder', 'xbd'],
    ['application/vnd.fuzzysheet', 'fzs'],
    ['application/vnd.genomatix.tuxedo', 'txd'],
    ['application/vnd.geogebra.file', 'ggb'],
    ['application/vnd.geogebra.tool', 'ggt'],
    ['application/vnd.geometry-explorer', 'gex'],
    ['application/vnd.geonext', 'gxt'],
    ['application/vnd.geoplan', 'g2w'],
    ['application/vnd.geospace', 'g3w'],
    ['application/vnd.gmx', 'gmx'],
    ['application/vnd.google-earth.kml+xml', 'kml'],
    ['application/vnd.google-earth.kmz', 'kmz'],
    ['application/vnd.grafeq', 'gqf'],
    ['application/vnd.groove-account', 'gac'],
    ['application/vnd.groove-help', 'ghf'],
    ['application/vnd.groove-identity-message', 'gim'],
    ['application/vnd.groove-injector', 'grv'],
    ['application/vnd.groove-tool-message', 'gtm'],
    ['application/vnd.groove-tool-template', 'tpl'],
    ['application/vnd.groove-vcard', 'vcg'],
    ['application/vnd.hal+xml', 'hal'],
    ['application/vnd.handheld-entertainment+xml', 'zmm'],
    ['application/vnd.hbci', 'hbci'],
    ['application/vnd.hhe.lesson-player', 'les'],
    ['application/vnd.hp-hpgl', ['hgl', 'hpg', 'hpgl']],
    ['application/vnd.hp-hpid', 'hpid'],
    ['application/vnd.hp-hps', 'hps'],
    ['application/vnd.hp-jlyt', 'jlt'],
    ['application/vnd.hp-pcl', 'pcl'],
    ['application/vnd.hp-pclxl', 'pclxl'],
    ['application/vnd.hydrostatix.sof-data', 'sfd-hdstx'],
    ['application/vnd.hzn-3d-crossword', 'x3d'],
    ['application/vnd.ibm.minipay', 'mpy'],
    ['application/vnd.ibm.modcap', 'afp'],
    ['application/vnd.ibm.rights-management', 'irm'],
    ['application/vnd.ibm.secure-container', 'sc'],
    ['application/vnd.iccprofile', 'icc'],
    ['application/vnd.igloader', 'igl'],
    ['application/vnd.immervision-ivp', 'ivp'],
    ['application/vnd.immervision-ivu', 'ivu'],
    ['application/vnd.insors.igm', 'igm'],
    ['application/vnd.intercon.formnet', 'xpw'],
    ['application/vnd.intergeo', 'i2g'],
    ['application/vnd.intu.qbo', 'qbo'],
    ['application/vnd.intu.qfx', 'qfx'],
    ['application/vnd.ipunplugged.rcprofile', 'rcprofile'],
    ['application/vnd.irepository.package+xml', 'irp'],
    ['application/vnd.is-xpr', 'xpr'],
    ['application/vnd.isac.fcs', 'fcs'],
    ['application/vnd.jam', 'jam'],
    ['application/vnd.jcp.javame.midlet-rms', 'rms'],
    ['application/vnd.jisp', 'jisp'],
    ['application/vnd.joost.joda-archive', 'joda'],
    ['application/vnd.kahootz', 'ktz'],
    ['application/vnd.kde.karbon', 'karbon'],
    ['application/vnd.kde.kchart', 'chrt'],
    ['application/vnd.kde.kformula', 'kfo'],
    ['application/vnd.kde.kivio', 'flw'],
    ['application/vnd.kde.kontour', 'kon'],
    ['application/vnd.kde.kpresenter', 'kpr'],
    ['application/vnd.kde.kspread', 'ksp'],
    ['application/vnd.kde.kword', 'kwd'],
    ['application/vnd.kenameaapp', 'htke'],
    ['application/vnd.kidspiration', 'kia'],
    ['application/vnd.kinar', 'kne'],
    ['application/vnd.koan', 'skp'],
    ['application/vnd.kodak-descriptor', 'sse'],
    ['application/vnd.las.las+xml', 'lasxml'],
    ['application/vnd.llamagraphics.life-balance.desktop', 'lbd'],
    ['application/vnd.llamagraphics.life-balance.exchange+xml',
        'lbe'
    ],
    ['application/vnd.lotus-1-2-3', '123'],
    ['application/vnd.lotus-approach', 'apr'],
    ['application/vnd.lotus-freelance', 'pre'],
    ['application/vnd.lotus-notes', 'nsf'],
    ['application/vnd.lotus-organizer', 'org'],
    ['application/vnd.lotus-screencam', 'scm'],
    ['application/vnd.lotus-wordpro', 'lwp'],
    ['application/vnd.macports.portpkg', 'portpkg'],
    ['application/vnd.mcd', 'mcd'],
    ['application/vnd.medcalcdata', 'mc1'],
    ['application/vnd.mediastation.cdkey', 'cdkey'],
    ['application/vnd.mfer', 'mwf'],
    ['application/vnd.mfmp', 'mfm'],
    ['application/vnd.micrografx.flo', 'flo'],
    ['application/vnd.micrografx.igx', 'igx'],
    ['application/vnd.mif', 'mif'],
    ['application/vnd.mobius.daf', 'daf'],
    ['application/vnd.mobius.dis', 'dis'],
    ['application/vnd.mobius.mbk', 'mbk'],
    ['application/vnd.mobius.mqy', 'mqy'],
    ['application/vnd.mobius.msl', 'msl'],
    ['application/vnd.mobius.plc', 'plc'],
    ['application/vnd.mobius.txf', 'txf'],
    ['application/vnd.mophun.application', 'mpn'],
    ['application/vnd.mophun.certificate', 'mpc'],
    ['application/vnd.mozilla.xul+xml', 'xul'],
    ['application/vnd.ms-artgalry', 'cil'],
    ['application/vnd.ms-cab-compressed', 'cab'],
    ['application/vnd.ms-excel', ['xls', 'xla', 'xlc', 'xlm', 'xlt', 'xlw', 'xlb', 'xll']],
    ['application/vnd.ms-excel.addin.macroenabled.12', 'xlam'],
    ['application/vnd.ms-excel.sheet.binary.macroenabled.12',
        'xlsb'
    ],
    ['application/vnd.ms-excel.sheet.macroenabled.12', 'xlsm'],
    ['application/vnd.ms-excel.template.macroenabled.12', 'xltm'],
    ['application/vnd.ms-fontobject', 'eot'],
    ['application/vnd.ms-htmlhelp', 'chm'],
    ['application/vnd.ms-ims', 'ims'],
    ['application/vnd.ms-lrm', 'lrm'],
    ['application/vnd.ms-officetheme', 'thmx'],
    ['application/vnd.ms-outlook', 'msg'],
    ['application/vnd.ms-pki.certstore', 'sst'],
    ['application/vnd.ms-pki.pko', 'pko'],
    ['application/vnd.ms-pki.seccat', 'cat'],
    ['application/vnd.ms-pki.stl', 'stl'],
    ['application/vnd.ms-pkicertstore', 'sst'],
    ['application/vnd.ms-pkiseccat', 'cat'],
    ['application/vnd.ms-pkistl', 'stl'],
    ['application/vnd.ms-powerpoint', ['ppt', 'pot', 'pps', 'ppa', 'pwz']],
    ['application/vnd.ms-powerpoint.addin.macroenabled.12',
        'ppam'
    ],
    ['application/vnd.ms-powerpoint.presentation.macroenabled.12',
        'pptm'
    ],
    ['application/vnd.ms-powerpoint.slide.macroenabled.12',
        'sldm'
    ],
    ['application/vnd.ms-powerpoint.slideshow.macroenabled.12',
        'ppsm'
    ],
    ['application/vnd.ms-powerpoint.template.macroenabled.12',
        'potm'
    ],
    ['application/vnd.ms-project', 'mpp'],
    ['application/vnd.ms-word.document.macroenabled.12', 'docm'],
    ['application/vnd.ms-word.template.macroenabled.12', 'dotm'],
    ['application/vnd.ms-works', ['wks', 'wcm', 'wdb', 'wps']],
    ['application/vnd.ms-wpl', 'wpl'],
    ['application/vnd.ms-xpsdocument', 'xps'],
    ['application/vnd.mseq', 'mseq'],
    ['application/vnd.musician', 'mus'],
    ['application/vnd.muvee.style', 'msty'],
    ['application/vnd.neurolanguage.nlu', 'nlu'],
    ['application/vnd.noblenet-directory', 'nnd'],
    ['application/vnd.noblenet-sealer', 'nns'],
    ['application/vnd.noblenet-web', 'nnw'],
    ['application/vnd.nokia.configuration-message', 'ncm'],
    ['application/vnd.nokia.n-gage.data', 'ngdat'],
    ['application/vnd.nokia.n-gage.symbian.install', 'n-gage'],
    ['application/vnd.nokia.radio-preset', 'rpst'],
    ['application/vnd.nokia.radio-presets', 'rpss'],
    ['application/vnd.nokia.ringing-tone', 'rng'],
    ['application/vnd.novadigm.edm', 'edm'],
    ['application/vnd.novadigm.edx', 'edx'],
    ['application/vnd.novadigm.ext', 'ext'],
    ['application/vnd.oasis.opendocument.chart', 'odc'],
    ['application/vnd.oasis.opendocument.chart-template', 'otc'],
    ['application/vnd.oasis.opendocument.database', 'odb'],
    ['application/vnd.oasis.opendocument.formula', 'odf'],
    ['application/vnd.oasis.opendocument.formula-template',
        'odft'
    ],
    ['application/vnd.oasis.opendocument.graphics', 'odg'],
    ['application/vnd.oasis.opendocument.graphics-template',
        'otg'
    ],
    ['application/vnd.oasis.opendocument.image', 'odi'],
    ['application/vnd.oasis.opendocument.image-template', 'oti'],
    ['application/vnd.oasis.opendocument.presentation', 'odp'],
    ['application/vnd.oasis.opendocument.presentation-template',
        'otp'
    ],
    ['application/vnd.oasis.opendocument.spreadsheet', 'ods'],
    ['application/vnd.oasis.opendocument.spreadsheet-template',
        'ots'
    ],
    ['application/vnd.oasis.opendocument.text', 'odt'],
    ['application/vnd.oasis.opendocument.text-master', 'odm'],
    ['application/vnd.oasis.opendocument.text-template', 'ott'],
    ['application/vnd.oasis.opendocument.text-web', 'oth'],
    ['application/vnd.olpc-sugar', 'xo'],
    ['application/vnd.oma.dd2+xml', 'dd2'],
    ['application/vnd.openofficeorg.extension', 'oxt'],
    ['application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'pptx'
    ],
    ['application/vnd.openxmlformats-officedocument.presentationml.slide',
        'sldx'
    ],
    ['application/vnd.openxmlformats-officedocument.presentationml.slideshow',
        'ppsx'
    ],
    ['application/vnd.openxmlformats-officedocument.presentationml.template',
        'potx'
    ],
    ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'xlsx'
    ],
    ['application/vnd.openxmlformats-officedocument.spreadsheetml.template',
        'xltx'
    ],
    ['application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'docx'
    ],
    ['application/vnd.openxmlformats-officedocument.wordprocessingml.template',
        'dotx'
    ],
    ['application/vnd.osgeo.mapguide.package', 'mgp'],
    ['application/vnd.osgi.dp', 'dp'],
    ['application/vnd.palm', 'pdb'],
    ['application/vnd.pawaafile', 'paw'],
    ['application/vnd.pg.format', 'str'],
    ['application/vnd.pg.osasli', 'ei6'],
    ['application/vnd.picsel', 'efif'],
    ['application/vnd.pmi.widget', 'wg'],
    ['application/vnd.pocketlearn', 'plf'],
    ['application/vnd.powerbuilder6', 'pbd'],
    ['application/vnd.previewsystems.box', 'box'],
    ['application/vnd.proteus.magazine', 'mgz'],
    ['application/vnd.publishare-delta-tree', 'qps'],
    ['application/vnd.pvi.ptid1', 'ptid'],
    ['application/vnd.quark.quarkxpress', 'qxd'],
    ['application/vnd.realvnc.bed', 'bed'],
    ['application/vnd.recordare.musicxml', 'mxl'],
    ['application/vnd.recordare.musicxml+xml', 'musicxml'],
    ['application/vnd.rig.cryptonote', 'cryptonote'],
    ['application/vnd.rim.cod', 'cod'],
    ['application/vnd.rn-realmedia', 'rm'],
    ['application/vnd.rn-realplayer', 'rnx'],
    ['application/vnd.route66.link66+xml', 'link66'],
    ['application/vnd.sailingtracker.track', 'st'],
    ['application/vnd.seemail', 'see'],
    ['application/vnd.sema', 'sema'],
    ['application/vnd.semd', 'semd'],
    ['application/vnd.semf', 'semf'],
    ['application/vnd.shana.informed.formdata', 'ifm'],
    ['application/vnd.shana.informed.formtemplate', 'itp'],
    ['application/vnd.shana.informed.interchange', 'iif'],
    ['application/vnd.shana.informed.package', 'ipk'],
    ['application/vnd.simtech-mindmapper', 'twd'],
    ['application/vnd.smaf', 'mmf'],
    ['application/vnd.smart.teacher', 'teacher'],
    ['application/vnd.solent.sdkm+xml', 'sdkm'],
    ['application/vnd.spotfire.dxp', 'dxp'],
    ['application/vnd.spotfire.sfs', 'sfs'],
    ['application/vnd.stardivision.calc', 'sdc'],
    ['application/vnd.stardivision.draw', 'sda'],
    ['application/vnd.stardivision.impress', 'sdd'],
    ['application/vnd.stardivision.math', 'smf'],
    ['application/vnd.stardivision.writer', 'sdw'],
    ['application/vnd.stardivision.writer-global', 'sgl'],
    ['application/vnd.stepmania.stepchart', 'sm'],
    ['application/vnd.sun.xml.calc', 'sxc'],
    ['application/vnd.sun.xml.calc.template', 'stc'],
    ['application/vnd.sun.xml.draw', 'sxd'],
    ['application/vnd.sun.xml.draw.template', 'std'],
    ['application/vnd.sun.xml.impress', 'sxi'],
    ['application/vnd.sun.xml.impress.template', 'sti'],
    ['application/vnd.sun.xml.math', 'sxm'],
    ['application/vnd.sun.xml.writer', 'sxw'],
    ['application/vnd.sun.xml.writer.global', 'sxg'],
    ['application/vnd.sun.xml.writer.template', 'stw'],
    ['application/vnd.sus-calendar', 'sus'],
    ['application/vnd.svd', 'svd'],
    ['application/vnd.symbian.install', 'sis'],
    ['application/vnd.syncml+xml', 'xsm'],
    ['application/vnd.syncml.dm+wbxml', 'bdm'],
    ['application/vnd.syncml.dm+xml', 'xdm'],
    ['application/vnd.tao.intent-module-archive', 'tao'],
    ['application/vnd.tmobile-livetv', 'tmo'],
    ['application/vnd.trid.tpt', 'tpt'],
    ['application/vnd.triscape.mxs', 'mxs'],
    ['application/vnd.trueapp', 'tra'],
    ['application/vnd.ufdl', 'ufd'],
    ['application/vnd.uiq.theme', 'utz'],
    ['application/vnd.umajin', 'umj'],
    ['application/vnd.unity', 'unityweb'],
    ['application/vnd.uoml+xml', 'uoml'],
    ['application/vnd.vcx', 'vcx'],
    ['application/vnd.visio', 'vsd'],
    ['application/vnd.visionary', 'vis'],
    ['application/vnd.vsf', 'vsf'],
    ['application/vnd.wap.wbxml', 'wbxml'],
    ['application/vnd.wap.wmlc', 'wmlc'],
    ['application/vnd.wap.wmlscriptc', 'wmlsc'],
    ['application/vnd.webturbo', 'wtb'],
    ['application/vnd.wolfram.player', 'nbp'],
    ['application/vnd.wordperfect', 'wpd'],
    ['application/vnd.wqd', 'wqd'],
    ['application/vnd.wt.stf', 'stf'],
    ['application/vnd.xara', ['web', 'xar']],
    ['application/vnd.xfdl', 'xfdl'],
    ['application/vnd.yamaha.hv-dic', 'hvd'],
    ['application/vnd.yamaha.hv-script', 'hvs'],
    ['application/vnd.yamaha.hv-voice', 'hvp'],
    ['application/vnd.yamaha.openscoreformat', 'osf'],
    ['application/vnd.yamaha.openscoreformat.osfpvg+xml',
        'osfpvg'
    ],
    ['application/vnd.yamaha.smaf-audio', 'saf'],
    ['application/vnd.yamaha.smaf-phrase', 'spf'],
    ['application/vnd.yellowriver-custom-menu', 'cmp'],
    ['application/vnd.zul', 'zir'],
    ['application/vnd.zzazz.deck+xml', 'zaz'],
    ['application/vocaltec-media-desc', 'vmd'],
    ['application/vocaltec-media-file', 'vmf'],
    ['application/voicexml+xml', 'vxml'],
    ['application/widget', 'wgt'],
    ['application/winhlp', 'hlp'],
    ['application/wordperfect', ['wp', 'wp5', 'wp6', 'wpd']],
    ['application/wordperfect6.0', ['w60', 'wp5']],
    ['application/wordperfect6.1', 'w61'],
    ['application/wsdl+xml', 'wsdl'],
    ['application/wspolicy+xml', 'wspolicy'],
    ['application/x-123', 'wk1'],
    ['application/x-7z-compressed', '7z'],
    ['application/x-abiword', 'abw'],
    ['application/x-ace-compressed', 'ace'],
    ['application/x-aim', 'aim'],
    ['application/x-authorware-bin', 'aab'],
    ['application/x-authorware-map', 'aam'],
    ['application/x-authorware-seg', 'aas'],
    ['application/x-bcpio', 'bcpio'],
    ['application/x-binary', 'bin'],
    ['application/x-binhex40', 'hqx'],
    ['application/x-bittorrent', 'torrent'],
    ['application/x-bsh', ['bsh', 'sh', 'shar']],
    ['application/x-bytecode.elisp', 'elc'],
    ['applicaiton/x-bytecode.python', 'pyc'],
    ['application/x-bzip', 'bz'],
    ['application/x-bzip2', ['boz', 'bz2']],
    ['application/x-cdf', 'cdf'],
    ['application/x-cdlink', 'vcd'],
    ['application/x-chat', ['cha', 'chat']],
    ['application/x-chess-pgn', 'pgn'],
    ['application/x-cmu-raster', 'ras'],
    ['application/x-cocoa', 'cco'],
    ['application/x-compactpro', 'cpt'],
    ['application/x-compress', 'z'],
    ['application/x-compressed', ['tgz', 'gz', 'z', 'zip']],
    ['application/x-conference', 'nsc'],
    ['application/x-cpio', 'cpio'],
    ['application/x-cpt', 'cpt'],
    ['application/x-csh', 'csh'],
    ['application/x-debian-package', 'deb'],
    ['application/x-deepv', 'deepv'],
    ['application/x-director', ['dir', 'dcr', 'dxr']],
    ['application/x-doom', 'wad'],
    ['application/x-dtbncx+xml', 'ncx'],
    ['application/x-dtbook+xml', 'dtb'],
    ['application/x-dtbresource+xml', 'res'],
    ['application/x-dvi', 'dvi'],
    ['application/x-elc', 'elc'],
    ['application/x-envoy', ['env', 'evy']],
    ['application/x-esrehber', 'es'],
    ['application/x-excel', ['xls',
        'xla',
        'xlb',
        'xlc',
        'xld',
        'xlk',
        'xll',
        'xlm',
        'xlt',
        'xlv',
        'xlw'
    ]],
    ['application/x-font-bdf', 'bdf'],
    ['application/x-font-ghostscript', 'gsf'],
    ['application/x-font-linux-psf', 'psf'],
    ['application/x-font-otf', 'otf'],
    ['application/x-font-pcf', 'pcf'],
    ['application/x-font-snf', 'snf'],
    ['application/x-font-ttf', 'ttf'],
    ['application/x-font-type1', 'pfa'],
    ['application/x-font-woff', 'woff'],
    ['application/x-frame', 'mif'],
    ['application/x-freelance', 'pre'],
    ['application/x-futuresplash', 'spl'],
    ['application/x-gnumeric', 'gnumeric'],
    ['application/x-gsp', 'gsp'],
    ['application/x-gss', 'gss'],
    ['application/x-gtar', 'gtar'],
    ['application/x-gzip', ['gz', 'gzip']],
    ['application/x-hdf', 'hdf'],
    ['application/x-helpfile', ['help', 'hlp']],
    ['application/x-httpd-imap', 'imap'],
    ['application/x-ima', 'ima'],
    ['application/x-internet-signup', ['ins', 'isp']],
    ['application/x-internett-signup', 'ins'],
    ['application/x-inventor', 'iv'],
    ['application/x-ip2', 'ip'],
    ['application/x-iphone', 'iii'],
    ['application/x-java-class', 'class'],
    ['application/x-java-commerce', 'jcm'],
    ['application/x-java-jnlp-file', 'jnlp'],
    ['application/x-javascript', 'js'],
    ['application/x-koan', ['skd', 'skm', 'skp', 'skt']],
    ['application/x-ksh', 'ksh'],
    ['application/x-latex', ['latex', 'ltx']],
    ['application/x-lha', 'lha'],
    ['application/x-lisp', 'lsp'],
    ['application/x-livescreen', 'ivy'],
    ['application/x-lotus', 'wq1'],
    ['application/x-lotusscreencam', 'scm'],
    ['application/x-lzh', 'lzh'],
    ['application/x-lzx', 'lzx'],
    ['application/x-mac-binhex40', 'hqx'],
    ['application/x-macbinary', 'bin'],
    ['application/x-magic-cap-package-1.0', 'mc$'],
    ['application/x-mathcad', 'mcd'],
    ['application/x-meme', 'mm'],
    ['application/x-midi', ['mid', 'midi']],
    ['application/x-mif', 'mif'],
    ['application/x-mix-transfer', 'nix'],
    ['application/x-mobipocket-ebook', 'prc'],
    ['application/x-mplayer2', 'asx'],
    ['application/x-ms-application', 'application'],
    ['application/x-ms-wmd', 'wmd'],
    ['application/x-ms-wmz', 'wmz'],
    ['application/x-ms-xbap', 'xbap'],
    ['application/x-msaccess', 'mdb'],
    ['application/x-msbinder', 'obd'],
    ['application/x-mscardfile', 'crd'],
    ['application/x-msclip', 'clp'],
    ['application/x-msdownload', ['exe', 'dll']],
    ['application/x-msexcel', ['xls', 'xla', 'xlw']],
    ['application/x-msmediaview', ['mvb', 'm13', 'm14']],
    ['application/x-msmetafile', 'wmf'],
    ['application/x-msmoney', 'mny'],
    ['application/x-mspowerpoint', 'ppt'],
    ['application/x-mspublisher', 'pub'],
    ['application/x-msschedule', 'scd'],
    ['application/x-msterminal', 'trm'],
    ['application/x-mswrite', 'wri'],
    ['application/x-navi-animation', 'ani'],
    ['application/x-navidoc', 'nvd'],
    ['application/x-navimap', 'map'],
    ['application/x-navistyle', 'stl'],
    ['application/x-netcdf', ['cdf', 'nc']],
    ['application/x-newton-compatible-pkg', 'pkg'],
    ['application/x-nokia-9000-communicator-add-on-software',
        'aos'
    ],
    ['application/x-omc', 'omc'],
    ['application/x-omcdatamaker', 'omcd'],
    ['application/x-omcregerator', 'omcr'],
    ['application/x-pagemaker', ['pm4', 'pm5']],
    ['application/x-pcl', 'pcl'],
    ['application/x-perfmon', ['pma', 'pmc', 'pml', 'pmr', 'pmw']],
    ['application/x-pixclscript', 'plx'],
    ['application/x-pkcs10', 'p10'],
    ['application/x-pkcs12', ['p12', 'pfx']],
    ['application/x-pkcs7-certificates', ['p7b', 'spc']],
    ['application/x-pkcs7-certreqresp', 'p7r'],
    ['application/x-pkcs7-mime', ['p7m', 'p7c']],
    ['application/x-pkcs7-signature', ['p7s', 'p7a']],
    ['application/x-pointplus', 'css'],
    ['application/x-portable-anymap', 'pnm'],
    ['application/x-project', ['mpc', 'mpt', 'mpv', 'mpx']],
    ['application/x-qpro', 'wb1'],
    ['application/x-rar-compressed', 'rar'],
    ['application/x-rtf', 'rtf'],
    ['application/x-sdp', 'sdp'],
    ['application/x-sea', 'sea'],
    ['application/x-seelogo', 'sl'],
    ['application/x-sh', 'sh'],
    ['application/x-shar', ['shar', 'sh']],
    ['application/x-shockwave-flash', 'swf'],
    ['application/x-silverlight-app', 'xap'],
    ['application/x-sit', 'sit'],
    ['application/x-sprite', ['spr', 'sprite']],
    ['application/x-stuffit', 'sit'],
    ['application/x-stuffitx', 'sitx'],
    ['application/x-sv4cpio', 'sv4cpio'],
    ['application/x-sv4crc', 'sv4crc'],
    ['application/x-tar', 'tar'],
    ['application/x-tbook', ['sbk', 'tbk']],
    ['application/x-tcl', 'tcl'],
    ['application/x-tex', 'tex'],
    ['application/x-tex-tfm', 'tfm'],
    ['application/x-texinfo', ['texi', 'texinfo']],
    ['application/x-troff', ['roff', 't', 'tr']],
    ['application/x-troff-man', 'man'],
    ['application/x-troff-me', 'me'],
    ['application/x-troff-ms', 'ms'],
    ['application/x-troff-msvideo', 'avi'],
    ['application/x-ustar', 'ustar'],
    ['application/x-visio', ['vsd', 'vst', 'vsw']],
    ['application/x-vnd.audioexplosion.mzz', 'mzz'],
    ['application/x-vnd.ls-xpix', 'xpix'],
    ['application/x-vrml', 'vrml'],
    ['application/x-wais-source', ['src', 'wsrc']],
    ['application/x-winhelp', 'hlp'],
    ['application/x-wintalk', 'wtk'],
    ['application/x-world', ['wrl', 'svr']],
    ['application/x-wpwin', 'wpd'],
    ['application/x-wri', 'wri'],
    ['application/x-x509-ca-cert', ['cer', 'crt', 'der']],
    ['application/x-x509-user-cert', 'crt'],
    ['application/x-xfig', 'fig'],
    ['application/x-xpinstall', 'xpi'],
    ['application/x-zip-compressed', 'zip'],
    ['application/xcap-diff+xml', 'xdf'],
    ['application/xenc+xml', 'xenc'],
    ['application/xhtml+xml', 'xhtml'],
    ['application/xml', 'xml'],
    ['application/xml-dtd', 'dtd'],
    ['application/xop+xml', 'xop'],
    ['application/xslt+xml', 'xslt'],
    ['application/xspf+xml', 'xspf'],
    ['application/xv+xml', 'mxml'],
    ['application/yang', 'yang'],
    ['application/yin+xml', 'yin'],
    ['application/ynd.ms-pkipko', 'pko'],
    ['application/zip', 'zip'],
    ['audio/adpcm', 'adp'],
    ['audio/aiff', ['aiff', 'aif', 'aifc']],
    ['audio/basic', ['snd', 'au']],
    ['audio/it', 'it'],
    ['audio/make', ['funk', 'my', 'pfunk']],
    ['audio/make.my.funk', 'pfunk'],
    ['audio/mid', ['mid', 'rmi']],
    ['audio/midi', ['midi', 'kar', 'mid']],
    ['audio/mod', 'mod'],
    ['audio/mp4', 'mp4a'],
    ['audio/mpeg', ['mpga', 'mp3', 'm2a', 'mp2', 'mpa', 'mpg']],
    ['audio/mpeg3', 'mp3'],
    ['audio/nspaudio', ['la', 'lma']],
    ['audio/ogg', 'oga'],
    ['audio/s3m', 's3m'],
    ['audio/tsp-audio', 'tsi'],
    ['audio/tsplayer', 'tsp'],
    ['audio/vnd.dece.audio', 'uva'],
    ['audio/vnd.digital-winds', 'eol'],
    ['audio/vnd.dra', 'dra'],
    ['audio/vnd.dts', 'dts'],
    ['audio/vnd.dts.hd', 'dtshd'],
    ['audio/vnd.lucent.voice', 'lvp'],
    ['audio/vnd.ms-playready.media.pya', 'pya'],
    ['audio/vnd.nuera.ecelp4800', 'ecelp4800'],
    ['audio/vnd.nuera.ecelp7470', 'ecelp7470'],
    ['audio/vnd.nuera.ecelp9600', 'ecelp9600'],
    ['audio/vnd.qcelp', 'qcp'],
    ['audio/vnd.rip', 'rip'],
    ['audio/voc', 'voc'],
    ['audio/voxware', 'vox'],
    ['audio/wav', 'wav'],
    ['audio/webm', 'weba'],
    ['audio/x-aac', 'aac'],
    ['audio/x-adpcm', 'snd'],
    ['audio/x-aiff', ['aiff', 'aif', 'aifc']],
    ['audio/x-au', 'au'],
    ['audio/x-gsm', ['gsd', 'gsm']],
    ['audio/x-jam', 'jam'],
    ['audio/x-liveaudio', 'lam'],
    ['audio/x-mid', ['mid', 'midi']],
    ['audio/x-midi', ['midi', 'mid']],
    ['audio/x-mod', 'mod'],
    ['audio/x-mpeg', 'mp2'],
    ['audio/x-mpeg-3', 'mp3'],
    ['audio/x-mpegurl', 'm3u'],
    ['audio/x-mpequrl', 'm3u'],
    ['audio/x-ms-wax', 'wax'],
    ['audio/x-ms-wma', 'wma'],
    ['audio/x-nspaudio', ['la', 'lma']],
    ['audio/x-pn-realaudio', ['ra', 'ram', 'rm', 'rmm', 'rmp']],
    ['audio/x-pn-realaudio-plugin', ['ra', 'rmp', 'rpm']],
    ['audio/x-psid', 'sid'],
    ['audio/x-realaudio', 'ra'],
    ['audio/x-twinvq', 'vqf'],
    ['audio/x-twinvq-plugin', ['vqe', 'vql']],
    ['audio/x-vnd.audioexplosion.mjuicemediafile', 'mjf'],
    ['audio/x-voc', 'voc'],
    ['audio/x-wav', 'wav'],
    ['audio/xm', 'xm'],
    ['chemical/x-cdx', 'cdx'],
    ['chemical/x-cif', 'cif'],
    ['chemical/x-cmdf', 'cmdf'],
    ['chemical/x-cml', 'cml'],
    ['chemical/x-csml', 'csml'],
    ['chemical/x-pdb', ['pdb', 'xyz']],
    ['chemical/x-xyz', 'xyz'],
    ['drawing/x-dwf', 'dwf'],
    ['i-world/i-vrml', 'ivr'],
    ['image/bmp', ['bmp', 'bm']],
    ['image/cgm', 'cgm'],
    ['image/cis-cod', 'cod'],
    ['image/cmu-raster', ['ras', 'rast']],
    ['image/fif', 'fif'],
    ['image/florian', ['flo', 'turbot']],
    ['image/g3fax', 'g3'],
    ['image/gif', 'gif'],
    ['image/ief', ['ief', 'iefs']],
    ['image/jpeg', ['jpeg', 'jpe', 'jpg', 'jfif', 'jfif-tbnl']],
    ['image/jutvision', 'jut'],
    ['image/ktx', 'ktx'],
    ['image/naplps', ['nap', 'naplps']],
    ['image/pict', ['pic', 'pict']],
    ['image/pipeg', 'jfif'],
    ['image/pjpeg', ['jfif', 'jpe', 'jpeg', 'jpg']],
    ['image/png', ['png', 'x-png']],
    ['image/prs.btif', 'btif'],
    ['image/svg+xml', 'svg'],
    ['image/tiff', ['tif', 'tiff']],
    ['image/vasa', 'mcf'],
    ['image/vnd.adobe.photoshop', 'psd'],
    ['image/vnd.dece.graphic', 'uvi'],
    ['image/vnd.djvu', 'djvu'],
    ['image/vnd.dvb.subtitle', 'sub'],
    ['image/vnd.dwg', ['dwg', 'dxf', 'svf']],
    ['image/vnd.dxf', 'dxf'],
    ['image/vnd.fastbidsheet', 'fbs'],
    ['image/vnd.fpx', 'fpx'],
    ['image/vnd.fst', 'fst'],
    ['image/vnd.fujixerox.edmics-mmr', 'mmr'],
    ['image/vnd.fujixerox.edmics-rlc', 'rlc'],
    ['image/vnd.ms-modi', 'mdi'],
    ['image/vnd.net-fpx', ['fpx', 'npx']],
    ['image/vnd.rn-realflash', 'rf'],
    ['image/vnd.rn-realpix', 'rp'],
    ['image/vnd.wap.wbmp', 'wbmp'],
    ['image/vnd.xiff', 'xif'],
    ['image/webp', 'webp'],
    ['image/x-cmu-raster', 'ras'],
    ['image/x-cmx', 'cmx'],
    ['image/x-dwg', ['dwg', 'dxf', 'svf']],
    ['image/x-freehand', 'fh'],
    ['image/x-icon', 'ico'],
    ['image/x-jg', 'art'],
    ['image/x-jps', 'jps'],
    ['image/x-niff', ['niff', 'nif']],
    ['image/x-pcx', 'pcx'],
    ['image/x-pict', ['pct', 'pic']],
    ['image/x-portable-anymap', 'pnm'],
    ['image/x-portable-bitmap', 'pbm'],
    ['image/x-portable-graymap', 'pgm'],
    ['image/x-portable-greymap', 'pgm'],
    ['image/x-portable-pixmap', 'ppm'],
    ['image/x-quicktime', ['qif', 'qti', 'qtif']],
    ['image/x-rgb', 'rgb'],
    ['image/x-tiff', ['tif', 'tiff']],
    ['image/x-windows-bmp', 'bmp'],
    ['image/x-xbitmap', 'xbm'],
    ['image/x-xbm', 'xbm'],
    ['image/x-xpixmap', ['xpm', 'pm']],
    ['image/x-xwd', 'xwd'],
    ['image/x-xwindowdump', 'xwd'],
    ['image/xbm', 'xbm'],
    ['image/xpm', 'xpm'],
    ['message/rfc822', ['eml', 'mht', 'mhtml', 'nws', 'mime']],
    ['model/iges', ['iges', 'igs']],
    ['model/mesh', 'msh'],
    ['model/vnd.collada+xml', 'dae'],
    ['model/vnd.dwf', 'dwf'],
    ['model/vnd.gdl', 'gdl'],
    ['model/vnd.gtw', 'gtw'],
    ['model/vnd.mts', 'mts'],
    ['model/vnd.vtu', 'vtu'],
    ['model/vrml', ['vrml', 'wrl', 'wrz']],
    ['model/x-pov', 'pov'],
    ['multipart/x-gzip', 'gzip'],
    ['multipart/x-ustar', 'ustar'],
    ['multipart/x-zip', 'zip'],
    ['music/crescendo', ['mid', 'midi']],
    ['music/x-karaoke', 'kar'],
    ['paleovu/x-pv', 'pvu'],
    ['text/asp', 'asp'],
    ['text/calendar', 'ics'],
    ['text/css', 'css'],
    ['text/csv', 'csv'],
    ['text/ecmascript', 'js'],
    ['text/h323', '323'],
    ['text/html', ['html', 'htm', 'stm', 'acgi', 'htmls', 'htx', 'shtml']],
    ['text/iuls', 'uls'],
    ['text/javascript', 'js'],
    ['text/mcf', 'mcf'],
    ['text/n3', 'n3'],
    ['text/pascal', 'pas'],
    ['text/plain', ['txt',
        'bas',
        'c',
        'h',
        'c++',
        'cc',
        'com',
        'conf',
        'cxx',
        'def',
        'f',
        'f90',
        'for',
        'g',
        'hh',
        'idc',
        'jav',
        'java',
        'list',
        'log',
        'lst',
        'm',
        'mar',
        'pl',
        'sdml',
        'text'
    ]],
    ['text/plain-bas', 'par'],
    ['text/prs.lines.tag', 'dsc'],
    ['text/richtext', ['rtx', 'rt', 'rtf']],
    ['text/scriplet', 'wsc'],
    ['text/scriptlet', 'sct'],
    ['text/sgml', ['sgm', 'sgml']],
    ['text/tab-separated-values', 'tsv'],
    ['text/troff', 't'],
    ['text/turtle', 'ttl'],
    ['text/uri-list', ['uni', 'unis', 'uri', 'uris']],
    ['text/vnd.abc', 'abc'],
    ['text/vnd.curl', 'curl'],
    ['text/vnd.curl.dcurl', 'dcurl'],
    ['text/vnd.curl.mcurl', 'mcurl'],
    ['text/vnd.curl.scurl', 'scurl'],
    ['text/vnd.fly', 'fly'],
    ['text/vnd.fmi.flexstor', 'flx'],
    ['text/vnd.graphviz', 'gv'],
    ['text/vnd.in3d.3dml', '3dml'],
    ['text/vnd.in3d.spot', 'spot'],
    ['text/vnd.rn-realtext', 'rt'],
    ['text/vnd.sun.j2me.app-descriptor', 'jad'],
    ['text/vnd.wap.wml', 'wml'],
    ['text/vnd.wap.wmlscript', 'wmls'],
    ['text/webviewhtml', 'htt'],
    ['text/x-asm', ['asm', 's']],
    ['text/x-audiosoft-intra', 'aip'],
    ['text/x-c', ['c', 'cc', 'cpp']],
    ['text/x-component', 'htc'],
    ['text/x-fortran', ['for', 'f', 'f77', 'f90']],
    ['text/x-h', ['h', 'hh']],
    ['text/x-java-source', ['java', 'jav']],
    ['text/x-java-source,java', 'java'],
    ['text/x-la-asf', 'lsx'],
    ['text/x-m', 'm'],
    ['text/x-pascal', 'p'],
    ['text/x-script', 'hlb'],
    ['text/x-script.csh', 'csh'],
    ['text/x-script.elisp', 'el'],
    ['text/x-script.guile', 'scm'],
    ['text/x-script.ksh', 'ksh'],
    ['text/x-script.lisp', 'lsp'],
    ['text/x-script.perl', 'pl'],
    ['text/x-script.perl-module', 'pm'],
    ['text/x-script.phyton', 'py'],
    ['text/x-script.rexx', 'rexx'],
    ['text/x-script.scheme', 'scm'],
    ['text/x-script.sh', 'sh'],
    ['text/x-script.tcl', 'tcl'],
    ['text/x-script.tcsh', 'tcsh'],
    ['text/x-script.zsh', 'zsh'],
    ['text/x-server-parsed-html', ['shtml', 'ssi']],
    ['text/x-setext', 'etx'],
    ['text/x-sgml', ['sgm', 'sgml']],
    ['text/x-speech', ['spc', 'talk']],
    ['text/x-uil', 'uil'],
    ['text/x-uuencode', ['uu', 'uue']],
    ['text/x-vcalendar', 'vcs'],
    ['text/x-vcard', 'vcf'],
    ['text/xml', 'xml'],
    ['video/3gpp', '3gp'],
    ['video/3gpp2', '3g2'],
    ['video/animaflex', 'afl'],
    ['video/avi', 'avi'],
    ['video/avs-video', 'avs'],
    ['video/dl', 'dl'],
    ['video/fli', 'fli'],
    ['video/gl', 'gl'],
    ['video/h261', 'h261'],
    ['video/h263', 'h263'],
    ['video/h264', 'h264'],
    ['video/jpeg', 'jpgv'],
    ['video/jpm', 'jpm'],
    ['video/mj2', 'mj2'],
    ['video/mp4', 'mp4'],
    ['video/mpeg', ['mpeg', 'mp2', 'mpa', 'mpe', 'mpg', 'mpv2', 'm1v', 'm2v', 'mp3']],
    ['video/msvideo', 'avi'],
    ['video/ogg', 'ogv'],
    ['video/quicktime', ['mov', 'qt', 'moov']],
    ['video/vdo', 'vdo'],
    ['video/vivo', ['viv', 'vivo']],
    ['video/vnd.dece.hd', 'uvh'],
    ['video/vnd.dece.mobile', 'uvm'],
    ['video/vnd.dece.pd', 'uvp'],
    ['video/vnd.dece.sd', 'uvs'],
    ['video/vnd.dece.video', 'uvv'],
    ['video/vnd.fvt', 'fvt'],
    ['video/vnd.mpegurl', 'mxu'],
    ['video/vnd.ms-playready.media.pyv', 'pyv'],
    ['video/vnd.rn-realvideo', 'rv'],
    ['video/vnd.uvvu.mp4', 'uvu'],
    ['video/vnd.vivo', ['viv', 'vivo']],
    ['video/vosaic', 'vos'],
    ['video/webm', 'webm'],
    ['video/x-amt-demorun', 'xdr'],
    ['video/x-amt-showrun', 'xsr'],
    ['video/x-atomic3d-feature', 'fmf'],
    ['video/x-dl', 'dl'],
    ['video/x-dv', ['dif', 'dv']],
    ['video/x-f4v', 'f4v'],
    ['video/x-fli', 'fli'],
    ['video/x-flv', 'flv'],
    ['video/x-gl', 'gl'],
    ['video/x-isvideo', 'isu'],
    ['video/x-la-asf', ['lsf', 'lsx']],
    ['video/x-m4v', 'm4v'],
    ['video/x-motion-jpeg', 'mjpg'],
    ['video/x-mpeg', ['mp3', 'mp2']],
    ['video/x-mpeq2a', 'mp2'],
    ['video/x-ms-asf', ['asf', 'asr', 'asx']],
    ['video/x-ms-asf-plugin', 'asx'],
    ['video/x-ms-wm', 'wm'],
    ['video/x-ms-wmv', 'wmv'],
    ['video/x-ms-wmx', 'wmx'],
    ['video/x-ms-wvx', 'wvx'],
    ['video/x-msvideo', 'avi'],
    ['video/x-qtc', 'qtc'],
    ['video/x-scm', 'scm'],
    ['video/x-sgi-movie', ['movie', 'mv']],
    ['windows/metafile', 'wmf'],
    ['www/mime', 'mime'],
    ['x-conference/x-cooltalk', 'ice'],
    ['x-music/x-midi', ['mid', 'midi']],
    ['x-world/x-3dmf', ['3dm', '3dmf', 'qd3', 'qd3d']],
    ['x-world/x-svr', 'svr'],
    ['x-world/x-vrml', ['flr', 'vrml', 'wrl', 'wrz', 'xaf', 'xof']],
    ['x-world/x-vrt', 'vrt'],
    ['xgl/drawing', 'xgz'],
    ['xgl/movie', 'xmz']
]);
const extensions = new Map([
    ['123', 'application/vnd.lotus-1-2-3'],
    ['323', 'text/h323'],
    ['*', 'application/octet-stream'],
    ['3dm', 'x-world/x-3dmf'],
    ['3dmf', 'x-world/x-3dmf'],
    ['3dml', 'text/vnd.in3d.3dml'],
    ['3g2', 'video/3gpp2'],
    ['3gp', 'video/3gpp'],
    ['7z', 'application/x-7z-compressed'],
    ['a', 'application/octet-stream'],
    ['aab', 'application/x-authorware-bin'],
    ['aac', 'audio/x-aac'],
    ['aam', 'application/x-authorware-map'],
    ['aas', 'application/x-authorware-seg'],
    ['abc', 'text/vnd.abc'],
    ['abw', 'application/x-abiword'],
    ['ac', 'application/pkix-attr-cert'],
    ['acc', 'application/vnd.americandynamics.acc'],
    ['ace', 'application/x-ace-compressed'],
    ['acgi', 'text/html'],
    ['acu', 'application/vnd.acucobol'],
    ['acx', 'application/internet-property-stream'],
    ['adp', 'audio/adpcm'],
    ['aep', 'application/vnd.audiograph'],
    ['afl', 'video/animaflex'],
    ['afp', 'application/vnd.ibm.modcap'],
    ['ahead', 'application/vnd.ahead.space'],
    ['ai', 'application/postscript'],
    ['aif', ['audio/aiff', 'audio/x-aiff']],
    ['aifc', ['audio/aiff', 'audio/x-aiff']],
    ['aiff', ['audio/aiff', 'audio/x-aiff']],
    ['aim', 'application/x-aim'],
    ['aip', 'text/x-audiosoft-intra'],
    ['air',
        'application/vnd.adobe.air-application-installer-package+zip'
    ],
    ['ait', 'application/vnd.dvb.ait'],
    ['ami', 'application/vnd.amiga.ami'],
    ['ani', 'application/x-navi-animation'],
    ['aos',
        'application/x-nokia-9000-communicator-add-on-software'
    ],
    ['apk', 'application/vnd.android.package-archive'],
    ['application', 'application/x-ms-application'],
    ['apr', 'application/vnd.lotus-approach'],
    ['aps', 'application/mime'],
    ['arc', 'application/octet-stream'],
    ['arj', ['application/arj', 'application/octet-stream']],
    ['art', 'image/x-jg'],
    ['asf', 'video/x-ms-asf'],
    ['asm', 'text/x-asm'],
    ['aso', 'application/vnd.accpac.simply.aso'],
    ['asp', 'text/asp'],
    ['asr', 'video/x-ms-asf'],
    ['asx', ['video/x-ms-asf',
        'application/x-mplayer2',
        'video/x-ms-asf-plugin'
    ]],
    ['atc', 'application/vnd.acucorp'],
    ['atomcat', 'application/atomcat+xml'],
    ['atomsvc', 'application/atomsvc+xml'],
    ['atx', 'application/vnd.antix.game-component'],
    ['au', ['audio/basic', 'audio/x-au']],
    ['avi', ['video/avi',
        'video/msvideo',
        'application/x-troff-msvideo',
        'video/x-msvideo'
    ]],
    ['avs', 'video/avs-video'],
    ['aw', 'application/applixware'],
    ['axs', 'application/olescript'],
    ['azf', 'application/vnd.airzip.filesecure.azf'],
    ['azs', 'application/vnd.airzip.filesecure.azs'],
    ['azw', 'application/vnd.amazon.ebook'],
    ['bas', 'text/plain'],
    ['bcpio', 'application/x-bcpio'],
    ['bdf', 'application/x-font-bdf'],
    ['bdm', 'application/vnd.syncml.dm+wbxml'],
    ['bed', 'application/vnd.realvnc.bed'],
    ['bh2', 'application/vnd.fujitsu.oasysprs'],
    ['bin', ['application/octet-stream',
        'application/mac-binary',
        'application/macbinary',
        'application/x-macbinary',
        'application/x-binary'
    ]],
    ['bm', 'image/bmp'],
    ['bmi', 'application/vnd.bmi'],
    ['bmp', ['image/bmp', 'image/x-windows-bmp']],
    ['boo', 'application/book'],
    ['book', 'application/book'],
    ['box', 'application/vnd.previewsystems.box'],
    ['boz', 'application/x-bzip2'],
    ['bsh', 'application/x-bsh'],
    ['btif', 'image/prs.btif'],
    ['bz', 'application/x-bzip'],
    ['bz2', 'application/x-bzip2'],
    ['c', ['text/plain', 'text/x-c']],
    ['c++', 'text/plain'],
    ['c11amc', 'application/vnd.cluetrust.cartomobile-config'],
    ['c11amz', 'application/vnd.cluetrust.cartomobile-config-pkg'],
    ['c4g', 'application/vnd.clonk.c4group'],
    ['cab', 'application/vnd.ms-cab-compressed'],
    ['car', 'application/vnd.curl.car'],
    ['cat', ['application/vnd.ms-pkiseccat',
        'application/vnd.ms-pki.seccat'
    ]],
    ['cc', ['text/plain', 'text/x-c']],
    ['ccad', 'application/clariscad'],
    ['cco', 'application/x-cocoa'],
    ['ccxml', 'application/ccxml+xml,'],
    ['cdbcmsg', 'application/vnd.contact.cmsg'],
    ['cdf', ['application/cdf',
        'application/x-cdf',
        'application/x-netcdf'
    ]],
    ['cdkey', 'application/vnd.mediastation.cdkey'],
    ['cdmia', 'application/cdmi-capability'],
    ['cdmic', 'application/cdmi-container'],
    ['cdmid', 'application/cdmi-domain'],
    ['cdmio', 'application/cdmi-object'],
    ['cdmiq', 'application/cdmi-queue'],
    ['cdx', 'chemical/x-cdx'],
    ['cdxml', 'application/vnd.chemdraw+xml'],
    ['cdy', 'application/vnd.cinderella'],
    ['cer', ['application/pkix-cert', 'application/x-x509-ca-cert']],
    ['cgm', 'image/cgm'],
    ['cha', 'application/x-chat'],
    ['chat', 'application/x-chat'],
    ['chm', 'application/vnd.ms-htmlhelp'],
    ['chrt', 'application/vnd.kde.kchart'],
    ['cif', 'chemical/x-cif'],
    ['cii',
        'application/vnd.anser-web-certificate-issue-initiation'
    ],
    ['cil', 'application/vnd.ms-artgalry'],
    ['cla', 'application/vnd.claymore'],
    ['class', ['application/octet-stream',
        'application/java',
        'application/java-byte-code',
        'application/java-vm',
        'application/x-java-class'
    ]],
    ['clkk', 'application/vnd.crick.clicker.keyboard'],
    ['clkp', 'application/vnd.crick.clicker.palette'],
    ['clkt', 'application/vnd.crick.clicker.template'],
    ['clkw', 'application/vnd.crick.clicker.wordbank'],
    ['clkx', 'application/vnd.crick.clicker'],
    ['clp', 'application/x-msclip'],
    ['cmc', 'application/vnd.cosmocaller'],
    ['cmdf', 'chemical/x-cmdf'],
    ['cml', 'chemical/x-cml'],
    ['cmp', 'application/vnd.yellowriver-custom-menu'],
    ['cmx', 'image/x-cmx'],
    ['cod', ['image/cis-cod', 'application/vnd.rim.cod']],
    ['com', ['application/octet-stream', 'text/plain']],
    ['conf', 'text/plain'],
    ['cpio', 'application/x-cpio'],
    ['cpp', 'text/x-c'],
    ['cpt', ['application/mac-compactpro',
        'application/x-compactpro',
        'application/x-cpt'
    ]],
    ['crd', 'application/x-mscardf¿¨™ˇ°   BèBéB çB(åA0ÜA8ÉDêì
8A0A(B BBBEeòB†gòAê             Ñû# H∞™ˇ              úû# 0¡™ˇ              ¥û# 8¡™ˇ     HÉS          ‘û# ∞™ˇB              Ïû# @∞™ˇS              ü# à∞™ˇ,              ü# †∞™ˇ              4ü# ò∞™ˇÑ           4   Lü# ±™ˇæ   BåAÜD ÉG0W
 AABG    <   Ñü# ò≤™ˇG   BåAÜD ÉG@JHEP]HA@u
 AABD<   ƒü# ®≥™ˇı    BåAÜD ÉJ@}
 AABF~HEPjHA@  L   †# h¥™ˇ.   BèBéB çB(åD0ÜA8ÉMêÇ
8A0A(B BBBJ   \   T†# H∑™ˇw   BèBéB çB(åD0ÜA8ÉGÄ
8A0A(B BBBB@àBê]àAÄ     ¥†# hπ™ˇ§    qr<   Ã†#  ∫™ˇH   NÜAÉD 
G√A∆JDA√A∆       d   °# ª™ˇ°   BèBéB çB(åA0ÜA8ÉDêì
8A0A(B BBBEeòB†gòAê          $   t°# òæ™ˇ"    AÜAÉJ IGA    ú°# †æ™ˇB              ¥°# ÿæ™ˇs    D T
H     4   ‘°# 8ø™ˇæ   BåAÜD ÉG0W
 AABG    <   ¢# ¿¿™ˇG   BåAÜD ÉG@MHEP`HA@u
 AABF<   L¢# –¡™ˇı    BåAÜD ÉJ@}
 AABF~HEPjHA@  L   å¢# ê¬™ˇ.   BèBéB çB(åD0ÜA8ÉMêÇ
8A0A(B BBBJ   \   ‹¢# p≈™ˇw   BèBéB çB(åD0ÜA8ÉGÄ
8A0A(B BBBB@àBê]àAÄ     <£# ê«™ˇ§    qr        $   \£#  »™ˇ"    AÜAÉJ IGA    Ñ£# (»™ˇ              ú£#  »™ˇ§    ÅR   ¥£# ∏»™ˇ§    ÅR   Ã£# P…™ˇ§    ÅR   ‰£# Ë…™ˇ§    ÅO   ¸£# Ä ™ˇ§    ÅO   §# À™ˇ§    ÅO   ,§# ∞À™ˇ§    ÅO   D§# HÃ™ˇ§    ÅO   \§# ‡Ã™ˇ§    ÅO   t§# xÕ™ˇ§    ÅO   å§# Œ™ˇ§    ÅO   §§# ®Œ™ˇ§    ÅO   º§# @œ™ˇ§    ÅO   ‘§# ÿœ™ˇ§    ÅO   Ï§# p–™ˇ§    ÅO   •# —™ˇ§    ÅO   •# †—™ˇ§    ÅO   4•# 8“™ˇ§    ÅO   L•# –“™ˇ§    ÅO   d•# h”™ˇ§    ÅO   |•#  ‘™ˇ§    ÅO   î•# ò‘™ˇ§    ÅO   ¨•# 0’™ˇ§    ÅO   ƒ•# »’™ˇ§    ÅO   ‹•# `÷™ˇ§    ÅO   Ù•# ¯÷™ˇ§    ÅO   ¶# ê◊™ˇ§    ÅO   $¶# (ÿ™ˇ§    ÅO   <¶# ¿ÿ™ˇ§    ÅO   T¶# XŸ™ˇ§    ÅO   l¶# Ÿ™ˇ∞    ÅR   Ñ¶# à⁄™ˇ‰    âcTR  <   §¶# X€™ˇÓ    AÜAÉT Ö
AAKR
PAEWAA<   ‰¶# ‹™ˇÓ    AÜAÉT Ö
AAKR
PAEWAA,   $ß# ∏‹™ˇÌ    AÜAÉG0π
AAD     ,   Tß# x›™ˇÌ    AÜAÉG0π
AAD     ,   Ñß# 8ﬁ™ˇÌ    AÜAÉG0π
AAD     ,   ¥ß# ¯ﬁ™ˇÌ    AÜAÉG0π
AAD     ,   ‰ß# ∏ﬂ™ˇÌ    AÜAÉG0π
AAD     ,   ®# x‡™ˇÌ    AÜAÉG0π
AAD     ,   D®# 8·™ˇ4   AÜAÉG@ 
AAK     ,   t®# H‚™ˇ4   AÜAÉG@ 
AAK     D   §®# X„™ˇ    BåAÜK ÉG0™
 AABEº
 KABN     ,   Ï®# ‡‰™ˇ4   AÜAÉG@ 
AAK     ,   ©# Â™ˇ4   AÜAÉG@ 
AAK     ,   L©#  Á™ˇ4   AÜAÉG@ 
AAK     ,   |©# Ë™ˇ4   AÜAÉG@ 
AAK     ,   ¨©#  È™ˇG   AÜAÉG@…
AAD     ,   ‹©# @Í™ˇ4   AÜAÉG@ 
AAK     ,   ™# PÎ™ˇG   AÜAÉG@…
AAD     ,   <™# pÏ™ˇ4   AÜAÉG@ 
AAK     ,   l™# ÄÌ™ˇO   AÜAÉG@∏
AAE        ú™# ”´ˇR    \ N
FR   ,   º™# ÄÓ™ˇ   AÜAÉG@√
AAB     ,   Ï™# pÔ™ˇ/   AÜAÉG0¥
AAA     ,   ´# p™ˇ‰    AÜAÉG0ô
AAD     ,   L´# 0Ò™ˇ   AÜAÉG@√
AAB     ,   |´#  Ú™ˇ   AÜAÉG@√
AAB     ,   ¨´# Û™ˇÙ    AÜAÉG0¢
AAC     $   ‹´# 0“´ˇ   AÉG Ë
AG     t   ¨# ∏Û™ˇñ   BèBéE çB(åD0ÜA8ÉD∞N∏A¿K∏A∞l
8A0A(B BBBAº∏J¿j∏A∞          |¨# ‡´ˇs    D T
H     <   ú¨# @´ˇG   BåAÜD ÉG@MHEP`HA@u
 AABF<   ‹¨# P´ˇı    BåAÜD ÉJ@}
 AABF~HEPjHA@     ≠# “´ˇ|           <   4≠# ¯´ˇ}   BçBåA ÜA(ÉG@±
(A ABBD    <   t≠# 8´ˇ    BçBåA ÜA(ÉGPj
(A ABBC    <   ¥≠# »´ˇ    BçBåA ÜA(ÉGPj
(A ABBC    <   Ù≠# X´ˇ    BçBåA ÜA(ÉGPj
(A ABBC    <   4Æ# Ë´ˇ    BçBåA ÜA(ÉGPj
(A ABBC    4   tÆ# x´ˇ˝   BåAÜA ÉG@{
 AABF    4   ¨Æ# @´ˇ*   BåAÜA ÉG@·
 AABH     4   ‰Æ# 8´ˇ*   BåAÜA ÉG@·
 AABH     L   Ø# 0´ˇÌ   BèBéB çB(åA0ÜA8ÉGÄa
8A0A(B BBBD   4   lØ# –´ˇ˝   BåAÜA ÉG@{
 AABF    4   §Ø# ò´ˇO   BåAÜA ÉG0≈
 AABD     \   ‹Ø# ∞´ˇ]   BèBéB çB(åA0ÜA8ÉGp#xUÄEàEêOp]
8A0A(B BBBG  \   <∞# ∞!´ˇM   BèBéB çB(åA0ÜA8ÉG`hTpExEÄN`]
8A0A(B BBBA    D   ú∞# †$´ˇ   BåAÜA Éí
ABGR
AB[R
ABK   D   ‰∞# h%´ˇ   BåAÜA Éí
ABGR
AB[R
ABK   D   ,±# 0&´ˇ   BåAÜA Éí
ABGR
AB[R
ABK   D   t±# ¯&´ˇ   BåAÜA Éí
ABGR
AB[R
ABK   D   º±# ¿'´ˇ   BåAÜA Éí
ABGR
AB[R
ABK   D   ≤# à(´ˇ   BåAÜA Éí
ABGR
AB[R
ABK   ,   L≤# P)´ˇÌ   AÜAÉG@
AAB    <   |≤# +´ˇe   BçBåA ÜA(ÉG@î
(A ABBI    D   º≤# @-´ˇö   BéBçB åA(ÜA0ÉGP1
0A(A BBBH    L   ≥# ò.´ˇÌ   BèBéB çB(åA0ÜA8ÉGph
8A0A(B BBBE    L   T≥# 80´ˇØ   BèBéB çB(åA0ÜA8ÉGÄ~
8A0A(B BBBG   \   §≥# ò2´ˇ   BèBéB çB(åA0ÜA8ÉGê{òU†WòAê]
8A0A(B BBBH   4   ¥# H5´ˇz   BåAÜA ÉG@
 AABF    4   <¥# ê6´ˇ*   BåAÜA ÉG@„
 AABF     D   t¥# à7´ˇ   BåAÜA Éí
ABGR
AB[R
ABK   D   º¥# P8´ˇ   BåAÜA Éí
ABGR
AB[R
ABK   D   µ# 9´ˇ   BåAÜA Éí
ABGR
AB[R
ABK   D   Lµ# ‡9´ˇ   BåAÜA Éí
ABGR
AB[R
ABK   D   îµ# ®:´ˇ   BåAÜA Éí
ABGR
AB[R
ABK   D   ‹µ# p;´ˇ   BåAÜA Éí
ABGR
AB[R
ABK   4   $∂# 8<´ˇO   BåAÜA ÉG0≈
 AABD     4   \∂# P=´ˇ*   BåAÜA ÉG0Ÿ
 AABH     ,   î∂# H>´ˇÌ   AÜAÉG@
AAB    L   ƒ∂# @´ˇÕ   BèBéB çB(åA0ÜA8ÉG`F
8A0A(B BBBG    d   ∑# àA´ˇ∞   BèBéB çB(åA0ÜA8ÉG@ 
8A0A(B BBBEt
8K0A(B BBBP    <   |∑# –B´ˇä   BçBåA ÜA(ÉGP#
(A ABBJ    L   º∑#  D´ˇ›   BèBéB çB(åA0ÜA8ÉGpY
8A0A(B BBBD    4   ∏# ∞E´ˇ*   BåAÜA ÉG@·
 AABH     <   D∏# ®F´ˇä   BçBåA ÜA(ÉG`+
(A ABBB    L   Ñ∏# ¯G´ˇÌ   BèBéB çB(åA0ÜA8ÉGÄa
8A0A(B BBBD   <   ‘∏# òI´ˇä   BçBåA ÜA(ÉG`(
(A ABBE    <   π# ËJ´ˇä   BçBåA ÜA(ÉGP#
(A ABBJ    4   Tπ# 8L´ˇΩ   BåAÜA ÉGPA
 AABH    <   åπ# ¿M´ˇΩ   BçBåA ÜA(ÉG@<
(A ABBA    <   Ãπ# @O´ˇ5   BçBåA ÜA(ÉG`ó
(A ABBF    D   ∫# @Q´ˇ   BéBçB åA(ÜA0ÉG@{
0A(A BBBF    <   T∫# S´ˇù   BçBåA ÜA(ÉG`
(A ABBE    L   î∫# xU´ˇç   BèBéB çB(åA0ÜA8ÉGPŒ
8A0A(B BBBG    <   ‰∫# ∏W´ˇ   BçBåA ÜA(ÉG`7
(A ABBF    T   $ª# àZ´ˇÂ   BèBéB çB(åA0ÜA8ÉG`ÀhUpWhA`]
8A0A(B BBBH4   |ª#  ]´ˇO   BåAÜA ÉG0≈
 AABD     4   ¥ª# 8^´ˇO   BåAÜA ÉG0≈
 AABD     4   Ïª# P_´ˇ}   BåAÜA ÉGPÂ
 AABD     <   $º# ò`´ˇö   BçBåA ÜA(ÉG`5
(A ABBH    <   dº# ¯a´ˇ˝   BçBåA ÜA(ÉG`y
(A ABBD    <   §º# ∏c´ˇU   BçBåA ÜA(ÉG`ª
(A ABBB    d   ‰º# ÿe´ˇ∞   BèBéB çB(åA0ÜA8ÉG@ 
8A0A(B BBBEt
8K0A(B BBBP    <   LΩ#  g´ˇ¡   BçBåA ÜA(ÉGÄ—
(A ABBD   4   åΩ# ∞i´ˇÅ   BåAÜA ÉGPÑ
 AABE    <   ƒΩ# l´ˇø   BçBåA ÜA(ÉGP
(A ABBC    <   æ# àm´ˇø   BçBåA ÜA(ÉGP
(A ABBC    <   Dæ# o´ˇø   BçBåA ÜA(ÉGP
(A ABBC    4   Ñæ# àp´ˇa   BåAÜA ÉG`è
 AABB    L   ºæ# ¿r´ˇµ   BèBéB çB(åA0ÜA8ÉG`«
8A0A(B BBBF     ,   ø# 0v´ˇW   AÜAÉG@
AAH    \   <ø# `x´ˇÕ   BèBéB çB(åA0ÜA8ÉGê—òD†WòAê]
8A0A(B BBBK   D   úø# –z´ˇ   BéBçB åA(ÜA0ÉGêL
0A(A BBBE    L   ‰ø# ò´ˇ¡   BèBéB çB(åA0ÜA8ÉGpL
8A0A(B BBBI     \   4¿# É´ˇ%   BèBéB çB(åA0ÜA8ÉGÄÌàQêPàAÄA
8A0A(B BBBE  d   î¿# ËÖ´ˇÖ   BèBéB çB(åA0ÜA8ÉGÄ)àHêKòE†SÄD
8A0A(B BBBE      d   ¸¿# â´ˇM   BèBéB çB(åA0ÜA8ÉGê˙òR†B®E∞SêR
8A0A(B BBBE      §   d¡# ¯ã´ˇŒ   BèBéB çB(åA0ÜA8ÉJ†¬
8A0A(B BBBH˚®D∞Z®A†Ä®U∞B∏E¿E»E–S†ä®D∞Z®A†ı
®D∞SÈ
®D∞Sº   ¬#  ù´ˇ   BèBéB çB(åA0ÜA8ÉJ–¬
8A0A(B BBBHÿV‡DËHR–àÿS‡BËHE¯EÄW–∂ÿV‡DËHR–
ÿV‡DËH\
ÿV‡DËH\4   Ã¬# pØ´ˇT   BåAÜA ÉGP˚
 AABF     D   √# ò∞´ˇ   BéBçB åA(ÜA0ÉG`®
0A(A BBBA    D   L√# –≤´ˇ   BéBçB åA(ÜA0ÉG`®
0A(A BBBA    <   î√# µ´ˇ∫   BçBåA ÜA(ÉGp\
(A ABBA    <   ‘√# à∂´ˇA   BçBåA ÜA(ÉGp
(A ABBI       ƒ# òª´ˇ              ,ƒ# ÄÃ´ˇ              Dƒ# àÃ´ˇ     HÉS          dƒ# Xª´ˇB              |ƒ# êª´ˇS              îƒ# ÿª´ˇ,              ¨ƒ# ª´ˇ              ƒƒ# Ëª´ˇÑ           4   ‹ƒ# `º´ˇæ   BåAÜD ÉG0W
 AABG    <   ≈# ËΩ´ˇG   BåAÜD ÉG@JHEP]HA@u
 AABD<   T≈# ¯æ´ˇı    BåAÜD ÉJ@}
 AABF~HEPjHA@  L   î≈# ∏ø´ˇ.   BèBéB çB(åD0ÜA8ÉMêÇ
8A0A(B BBBJ   \   ‰≈# ò¬´ˇw   BèBéB çB(åD0ÜA8ÉGÄ
8A0A(B BBBB@àBê]àAÄ     D∆# ∏ƒ´ˇ§    qr<   \∆# P≈´ˇH   NÜAÉD 
G√A∆JDA√A∆       d   ú∆# `∆´ˇ°   BèBéB çB(åA0ÜA8ÉDêì
8A0A(B BBBEeòB†gòAê             «# Ë…´ˇ              «# –⁄´ˇ              4«# ÿ⁄´ˇ     HÉS          T«# ®…´ˇB              l«# ‡…´ˇS              Ñ«# ( ´ˇ,              ú«# @ ´ˇ              ¥«# 8 ´ˇÑ           4   Ã«# ∞ ´ˇæ   BåAÜD ÉG0W
 AABG    <   »# 8Ã´ˇG   BåAÜD ÉG@JHEP]HA@u
 AABD<   D»# HÕ´ˇı    BåAÜD ÉJ@}
 AABF~HEPjHA@  L   Ñ»# Œ´ˇ.   BèBéB çB(åD0ÜA8ÉMêÇ
8A0A(B BBBJ   \   ‘»# Ë–´ˇw   BèBéB çB(åD0ÜA8ÉGÄ
8A0A(B BBBB@àBê]àAÄ     4…# ”´ˇ§    qr<   L…# †”´ˇH   NÜAÉD 
G√A∆JDA√A∆       d   å…# ∞‘´ˇ°   BèBéB çB(åA0ÜA8ÉDêì
8A0A(B BBBEeòB†gòAê             Ù…# 8ÿ´ˇ               # @Ô´ˇ              $ # HÔ´ˇ     HÉS          D # ¯◊´ˇ8   —Y   \ #  Ÿ´ˇ8   —Y   t # H⁄´ˇ8   —Y   å # p€´ˇB              § # ®€´ˇS              º # €´ˇ(              ‘ # ‹´ˇ              Ï #  ‹´ˇÑ           \   À# x‹´ˇ1   BèBéB çB(åA0ÜA8ÉJ†º
8A0A(B BBBFñ®D∞F®A† <   dÀ# X‡´ˇG   BåAÜD ÉG@JHEP]HA@u
 AABD<   §À# h·´ˇı    BåAÜD ÉJ@}
 AABF~HEPjHA@  L   ‰À# (‚´ˇ.   BèBéB çB(åD0ÜA8ÉMêÇ
8A0A(B BBBJ   \   4Ã# Â´ˇw   BèBéB çB(åD0ÜA8ÉGÄ
8A0A(B BBBB@àBê]àAÄ     îÃ# (Á´ˇ§    qr<   ¨Ã# ¿Á´ˇH   NÜAÉD 
G√A∆JDA√A∆       \   ÏÃ# –Ë´ˇã   BèBéB çB(åA0ÜA8ÉDê5
8A0A(B BBBCÊòB†gòAê     LÕ# @Ï´ˇ              dÕ# (˝´ˇ              |Õ# 0˝´ˇ     HÉS          úÕ#  Ï´ˇB              ¥Õ# 8Ï´ˇS              ÃÕ# ÄÏ´ˇ,              ‰Õ# òÏ´ˇ              ¸Õ# êÏ´ˇÑ           4   Œ# Ì´ˇæ   BåAÜD ÉG0W
 AABG    <   LŒ# êÓ´ˇG   BåAÜD ÉG@JHEP]HA@u
 AABD<   åŒ# †Ô´ˇı    BåAÜD ÉJ@}
 AABF~HEPjHA@  L   ÃŒ# `´ˇ.   BèBéB çB(åD0ÜA8ÉMêÇ
8A0A(B BBBJ   \   œ# @Û´ˇw   BèBéB çB(åD0ÜA8ÉGÄ
8A0A(B BBBB@àBê]àAÄ     |œ# `ı´ˇ§    qr<   îœ# ¯ı´ˇH   NÜAÉD 
G√A∆JDA√A∆       d   ‘œ# ˜´ˇ°   BèBéB çB(åA0ÜA8ÉDêì
8A0A(B BBBEeòB†gòAê             <–# ê˙´ˇ              T–# x¨ˇ              l–# Ä¨ˇ     HÉS          å–# P˙´ˇB              §–# à˙´ˇS              º–# –˙´ˇ,              ‘–# Ë˙´ˇ              Ï–# ‡˙´ˇÑ           4   —# X˚´ˇæ   BåAÜD ÉG0W
 AABG    <   <—# ‡¸´ˇG   BåAÜD ÉG@JHEP]HA@u
 AABD<   |—# ˝´ˇı    BåAÜD ÉJ@}
 AABF~HEPjHA@  L   º—# ∞˛´ˇ.   BèBéB çB(åD0ÜA8ÉMêÇ
8A0A(B BBBJ   \   “# ê¨ˇw   BèBéB çB(åD0ÜA8ÉGÄ
8A0A(B BBBB@àBê]àAÄ     l“# ∞¨ˇ§    qr<   Ñ“# H¨ˇH   NÜAÉD 
G√A∆JDA√A∆       d   ƒ“# X¨ˇ°   BèBéB çB(åA0ÜA8ÉDêì
8A0A(B BBBEeòB†gòAê             ,”# ‡¨ˇ              D”# »¨ˇ              \”# –¨ˇ     HÉS          |”# †¨ˇB              î”# ÿ¨ˇS              ¨”#  	¨ˇ,              ƒ”# 8	¨ˇ              ‹”# 0	¨ˇÑ           4   Ù”# ®	¨ˇæ   BåAÜD ÉG0W
 AABG    <   ,‘# 0¨ˇG   BåAÜD ÉG@JHEP]HA@u
 AABD<   l‘# @¨ˇı    BåAÜD ÉJ@}
 AABF~HEPjHA@  L   ¨‘#  ¨ˇ.   BèBéB çB(åD0ÜA8ÉMêÇ
8A0A(B BBBJ   \   ¸‘# ‡¨ˇw   BèBéB çB(åD0ÜA8ÉGÄ
8A0A(B BBBB@àBê]àAÄ     \’#  ¨ˇ§    qr<   t’# ò¨ˇH   NÜAÉD 
G√A∆JDA√A∆       d   ¥’# ®¨ˇ°   BèBéB çB(åA0ÜA8ÉDêì
8A0A(B BBBEeòB†gòAê             ÷# 0¨ˇ              4÷# X(¨ˇ              L÷# `(¨ˇ     HÉS          l÷# ¨ˇB              Ñ÷# (¨ˇS           $   ú÷# p¨ˇ\    AÉV
Ic
MG      ƒ÷# ®¨ˇ              ‹÷# †¨ˇÑ           4   Ù÷# ¨ˇæ   BåAÜD ÉG0W
 AABG    <   ,◊# †¨ˇG   BåAÜD ÉG@JHEP]HA@u
 AABD<   l◊# ∞¨ˇı    BåAÜD ÉJ@}
 AABF~HEPjHA@  L   ¨◊# p¨ˇ.   BèBéB çB(åD0ÜA8ÉMêÇ
8A0A(B BBBJ   \   ¸◊# P¨ˇw   BèBéB çB(åD0ÜA8ÉGÄ
8A0A(B BBBB@àBê]àAÄ     \ÿ# p ¨ˇ§    qr<   tÿ# !¨ˇH   NÜAÉD 
G√A∆JDA√A∆       \   ¥ÿ# "¨ˇø   BèBéB çB(åA0ÜA8ÉDêY
8A0A(B BBBGÚòB†gòAê     Ÿ# ∏%¨ˇ              ,Ÿ# ∞.¨ˇ              DŸ# ∏.¨ˇ     HÉS          dŸ# x%¨ˇS              |Ÿ# ¿%¨ˇ,              îŸ# ÿ%¨ˇ              ¨Ÿ# –%¨ˇÑ           4   ƒŸ# H&¨ˇ|    AÜAÉJ L
AAFRDA    <   ¸Ÿ# ê&¨ˇG   BåAÜD ÉG@JHEP]HA@u
 AABD<   <⁄# †'¨ˇı    BåAÜD ÉJ@}
 AABF~HEPjHA@  <   |⁄# `(¨ˇH   NÜAÉD 
G√A∆JDA√A∆       \   º⁄# p)¨ˇ°   BèBéB çB(åA0ÜA8ÉDêì
8A0A(B BBBEeòB†gòAê     €#  -¨ˇ    GR    4€# -¨ˇ    GR $   L€# -¨ˇ"    AÜAÉJ IGA    t€# XJ¨ˇ              å€# `J¨ˇ     HÉS       4   ¨€# ‡,¨ˇÓ    AÉD B
AHD
AKLA    4   ‰€# ò-¨ˇÓ    AÉD B
AHD
AKLA    $   ‹# P.¨ˇ_   AÉ
EK
A   <   D‹# à/¨ˇ¸   ŒÉD BA√c Éu
A√Bv√] É]√     Ñ‹# H1¨ˇ             ú‹# P2¨ˇb          $   ¥‹# ®4¨ˇâ   AÉG0r
AE    |   ‹‹# 7¨ˇ   BèBéE çB(åD0ÜA8ÉGPÃ
8A0A(B BBBC_
8A0A(B BBBG÷
8D0F(B BBBH     \›# ∞;¨ˇS              t›# ¯;¨ˇ,              å›# <¨ˇ              §›# <¨ˇÑ           \   º›# Ä<¨ˇ1   BèBéB çB(åA0ÜA8ÉJ†º
8A0A(B BBBFñ®D∞F®A† <   ﬁ# `@¨ˇG   BåAÜD ÉG@JHEP]HA@u
 AABD<   \ﬁ# pA¨ˇı    BåAÜD ÉJ@}
 AABF~HEPjHA@  <   úﬁ# 0B¨ˇH   NÜAÉD 
G√A∆JDA√A∆       \   ‹ﬁ# @C¨ˇ°   BèBéB çB(åA0ÜA8ÉDêì
8A0A(B BBBEeòB†gòAê     <ﬂ# –F¨ˇ    AÉ]          \ﬂ# –F¨ˇ    AÉZ          |ﬂ# –F¨ˇ    AÉ]       ,   úﬂ# –F¨ˇ4    BåAÜD ÉiAB       ,   Ãﬂ# ‡F¨ˇ1    BåAÜD ÉfAB       ,   ¸ﬂ# F¨ˇ4    BåAÜD ÉiAB          ,‡#  q¨ˇ              D‡# q¨ˇ     HÉS       L   d‡# »F¨ˇÆ    BçBåD ÜA(ÉM0V
(M ABBJ_(A ABB      4   ¥‡# (G¨ˇô    BåAÜD ÉG@Å
 AABA        Ï‡# êG¨ˇM    Dg
E      <   ·# ¿G¨ˇƒ   AÜAÉG 9
AADl
CAA       <   L·# PI¨ˇù   BçBåA ÜA(ÉGÄ´
(A ABBB    D   å·# ∞L¨ˇ]   BéBçB åA(ÜA0ÉGp©
0A(A BBBH     4   ‘·# »O¨ˇΩ   BåAÜD ÉD@M
 AABD    ,   ‚# PQ¨ˇ≥   AÜAÉG@K
AAJ    D   <‚# ‡R¨ˇ≤   BéBçB åA(ÜD0ÉDP≠
0A(A BBBD    |   Ñ‚# XU¨ˇÌ   BèBéE çB(åD0ÜA8ÉG`õ
8A0A(B BBBD¥
8A0A(B BBBAß
8D0F(B BBBH    „# »[¨ˇS              „# \¨ˇ,              4„# (\¨ˇ              L„#  \¨ˇÑ           \   d„# ò\¨ˇ   BèBéB çB(åA0ÜA8ÉJ†Ã
8A0A(B BBBFŒ®D∞F®A†  <   ƒ„# H`¨ˇG   BåAÜD ÉG@JHEP]HA@u
 AABD<   ‰# Xa¨ˇı    BåAÜD ÉJ@}
 AABF~HEPjHA@  L   D‰# b¨ˇ–   BèBéE çB(åD0ÜA8ÉD†C
8A0A(B BBBG   <   î‰# òg¨ˇH   NÜAÉD 
G√A∆JDA√A∆       d   ‘‰# ®h¨ˇ°   BèBéB çB(åA0ÜA8ÉDêì
8A0A(B BBBEeòB†gòAê             <Â# 0l¨ˇ           $   TÂ# (l¨ˇ#   AÉG ≈
AB       |Â# 0n¨ˇB              îÂ# hn¨ˇj    D Q
K     \   ¥Â# ∏n¨ˇ   BèBéB çB(åA0ÜA8ÉJ†˙
8A0A(B BBBH6®D∞F®A† <   Ê# xr¨ˇG   BåAÜD ÉG@MHEP`HA@u
 AABF<   TÊ# às¨ˇı    BåAÜD ÉJ@}
 AABF~HEPjHA@  L   îÊ# Ht¨ˇ.   BèBéB çB(åD0ÜA8ÉMêÇ
8A0A(B BBBJ   \   ‰Ê# (w¨ˇw   BèBéB çB(åD0ÜA8ÉGÄ
8A0A(B BBBB@àBê]àAÄ     DÁ# Hy¨ˇ§    qrT   \Á# ‡y¨ˇS   BèBéB çB(åD0ÜA8ÉDê)
8A0A(B BBBD              ¥Á# Ë~¨ˇ    GR    ÃÁ# ~¨ˇ    GR    ‰Á# Ëπ¨ˇ              ¸Á# π¨ˇ     HÉS       4   Ë# ¿~¨ˇ°    BåAÜD ÉG@â
 AABA     <   TË# 8¨ˇÃ   AÜAÉG 9
AADt
CAA       4   îË# »Ä¨ˇÓ    AÉD B
AHD
AKLA    4   ÃË# ÄÅ¨ˇÓ    AÉD B
AHD
AKLA    ,   È# 8Ç¨ˇ≥   AÜAÉG@L
AAI    D   4È# »É¨ˇ]   BéBçB åA(ÜA0ÉGp©
0A(A BBBH     ,   |È# ‡Ü¨ˇf   AÜAÉG0
AAD    <   ¨È#  à¨ˇ[   BçBåD ÜA(ÉD`¸
(A ABBA    <   ÏÈ# @ã¨ˇù   BçBåA ÜA(ÉGÄ´
(A ABBB    ,   ,Í# †é¨ˇ†   AÜAÉG@A
AAD    ,   \Í# ê¨ˇU   åAÜD Ém√A∆BÃ  ,   åÍ# @ë¨ˇl   ŒÜAÉJ zA√A∆      ,   ºÍ# Äí¨ˇl   ŒÜAÉJ zA√A∆         ÏÍ# ¿ì¨ˇ8   ŒÉa√     |   Î# ‡î¨ˇ   BèBéE çB(åD0ÜA8ÉGPÃ
8A0A(B BBBC_
8A0A(B BBBG÷
8D0F(B BBBH  <   åÎ# Äô¨ˇ¸   ŒÉD BA√c Éu
A√Bv√] É]√  $   ÃÎ# @õ¨ˇâ   AÉG0r
AE    <   ÙÎ# ®ù¨ˇ¸   ŒÉD EA√` Éu
A√Bv√] É]√  $   4Ï# hü¨ˇ…   AÉG0ª
AD       \Ï# ¢¨ˇB              tÏ# H¢¨ˇS              åÏ# ê¢¨ˇ,              §Ï# ®¢¨ˇ              ºÏ# †¢¨ˇÑ           \   ‘Ï# £¨ˇ3   BèBéB çB(åA0ÜA8ÉJ†=
8A0A(B BBBE˜®D∞F®A†  <   4Ì# ¯¶¨ˇG   BåAÜD ÉG@JHEP]HA@u
 AABD<   tÌ# ®¨ˇı    BåAÜD ÉJ@}
 AABF~HEPjHA@  L   ¥Ì# »®¨ˇ.   BèBéB çB(åD0ÜA8ÉMêÇ
8A0A(B BBBJ   \   Ó# ®´¨ˇw   BèBéB çB(åD0ÜA8ÉGÄ
8A0A(B BBBB@àBê]àAÄ     dÓ# »≠¨ˇ§    qr<   |Ó# `Æ¨ˇH   NÜAÉD 
G√A∆JDA√A∆       \   ºÓ# pØ¨ˇû   BèBéB çB(åA0ÜA8ÉDê9
8A0A(B BBBG∫òB†gòAê     Ô# ≤¨ˇ           4   4Ô# Ë≤¨ˇô    BåAÜD ÉG@Å
 AABA     <   lÔ# P≥¨ˇ©   BçBåA ÜA(ÉGpÂ
(A ABBH    <   ¨Ô# ¿∂¨ˇù   BçBåA ÜA(ÉGÄ´
(A ABBB    ,   ÏÔ#  ∫¨ˇR   AÜAÉGPª
AAJ    ,   # Pº¨ˇ≥   AÜAÉG@K
AAJ    D   L# ‡Ω¨ˇ]   BéBçB åA(ÜA0ÉGp©
0A(A BBBH     ,   î# ¯¿¨ˇQ   åAÜD Éi√A∆BÃ  ,   ƒ# (¬¨ˇQ   åAÜD Éi√A∆BÃ     Ù# X√¨ˇ           ,   Ò# `ƒ¨ˇl   ŒÜAÉJ zA√A∆         <Ò# †≈¨ˇ8   ŒÉ]√        \Ò# ¿∆¨ˇ8   ŒÉ]√     $   |Ò# ‡«¨ˇ—   AÉD@N
AD    $   §Ò# ò…¨ˇ—   AÉD@N
AD       ÃÒ# PÀ¨ˇb          ,   ‰Ò# ®Õ¨ˇ   AÜAÉGPú
AAI    ,   Ú# hœ¨ˇ   AÜAÉGPú
AAI       DÚ# (—¨ˇõ             \Ú# ∞“¨ˇB              tÚ# Ë“¨ˇS              åÚ# 0”¨ˇ,              §Ú# H”¨ˇ              ºÚ# @”¨ˇÑ           \   ‘Ú# ∏”¨ˇ!   BèBéB çB(åA0ÜA8ÉJ†G
8A0A(B BBBK˜®D∞F®A†  <   4Û# à◊¨ˇG   BåAÜD ÉG@JHEP]HA@u
 AABD<   tÛ# òÿ¨ˇı    BåAÜD ÉJ@}
 AABF~HEPjHA@  L   ¥Û# XŸ¨ˇ.   BèBéB çB(åD0ÜA8ÉMêÇ
8A0A(B BBBJ   \   Ù# 8‹¨ˇw   BèBéB çB(åD0ÜA8ÉGÄ
8A0A(B BBBB@àBê]àAÄ     dÙ# Xﬁ¨ˇ§    qr<   |Ù# ﬁ¨ˇH   NÜAÉD 
G√A∆JDA√A∆          ºÙ#  ‡¨ˇ              ‘Ù# à≠ˇ              ÏÙ# ê≠ˇ     HÉS       L   ı# ¿ﬂ¨ˇÆ    BçBåD ÜA(ÉM0U
(M ABBK_(A ABB         \ı#  ‡¨ˇê    Dh
Da
G4   |ı# ê‡¨ˇΩ   BåAÜD ÉD@M
 AABD    4   ¥ı# ‚¨ˇ   BåAÜD ÉDPu
 AABD    |   Ïı#  ‰¨ˇÌ   BèBéE çB(åD0ÜA8ÉG`õ
8A0A(B BBBD¥
8A0A(B BBBAß
8D0F(B BBBH    lˆ# pÍ¨ˇB              Ñˆ# ®Í¨ˇS              úˆ# Í¨ˇÑ           \   ¥ˆ# hÎ¨ˇ   BèBéB çB(åA0ÜA8ÉJ†˙
8A0A(B BBBH6®D∞F®A† <   ˜# (Ô¨ˇG   BåAÜD ÉG@JHEP]HA@u
 AABD<   T˜# 8¨ˇı    BåAÜD ÉJ@}
 AABF~HEPjHA@  L   î˜# ¯¨ˇ.   BèBéB çB(åD0ÜA8ÉMêÇ
8A0A(B BBBJ   d   ‰˜# ÿÛ¨ˇA   BèBéB çB(åA0ÜA8ÉD`[
8A0A(B BBBEI
8D0A(B BBBJ        L¯# ¿˘¨ˇ           L   d¯# ∏˘¨ˇ‡   BèBéE çB(åD0ÜA8ÉG†F
8A0A(B BBBI   \   ¥¯# Hˇ¨ˇw   BèBéB çB(åD0ÜA8ÉGÄ
8A0A(B BBBB@àBê]àAÄ     ˘# h≠ˇ√    tx<   ,˘#  ≠ˇH   NÜAÉD 
G√A∆JDA√A∆       \   l˘# 0≠ˇ±	   BèBéB çB(åA0ÜA8ÉG¿Ñ
8A0A(B BBBA±»B–g»A¿    Ã˘# –≠ˇ    AÉZ          Ï˘# –≠ˇ    AÉ]          ˙# –≠ˇ    AÉ]       ,   ,˙# –≠ˇ1    BåAÜD ÉfAB       ,   \˙# ‡≠ˇ4    BåAÜD ÉiAB       ,   å˙# ≠ˇ4    BåAÜD ÉiAB          º˙# ∞=≠ˇ              ‘˙# ∏=≠ˇ     HÉS       4   Ù˙# »≠ˇô    BåAÜD ÉG@Å
 AABA     <   ,˚# 0≠ˇƒ   AÜAÉG 9
AADl
CAA       <   l˚# ¿≠ˇù   BçBåA ÜA(ÉGÄ´
(A ABBB    D   ¨˚#  ≠ˇ]   BéBçB åA(ÜA0ÉGp©
0A(A BBBH     4   Ù˚# 8≠ˇΩ   BåAÜD ÉD@M
 AABD    ,   ,¸# ¿≠ˇ≥   AÜAÉG@K
AAJ    D   \¸# P≠ˇ≤   BéBçB åA(ÜD0ÉDP≠
0A(A BBBD       §¸# »≠ˇB              º¸#  ≠ˇS              ‘¸# H≠ˇ,              Ï¸# `≠ˇ              ˝# X≠ˇÑ           \   ˝# –≠ˇ   BèBéB çB(åA0ÜA8ÉJ†Ã
8A0A(B BBBFŒ®D∞F®A†  <   |˝# Ä≠ˇG   BåAÜD ÉG@JHEP]HA@u
 AABD<   º˝# ê ≠ˇı    BåAÜD ÉJ@}
 AABF~HEPjHA@  L   ¸˝# P!≠ˇ.   BèBéB çB(åD0ÜA8ÉMêÇ
8A0A(B BBBJ   \   L˛# 0$≠ˇw   BèBéB çB(åD0ÜA8ÉGÄ
8A0A(B BBBB@àBê]àAÄ     ¨˛# P&≠ˇ√    tx<   ƒ˛# '≠ˇH   NÜAÉD 
G√A∆JDA√A∆       \   ˇ# (≠ˇ°   BèBéB çB(åA0ÜA8ÉDêì
8A0A(B BBBEeòB†gòAê  |   dˇ# h+≠ˇÌ   BèBéE çB(åD0ÜA8ÉG`õ
8A0A(B BBBD¥
8A0A(B BBBAß
8D0F(B BBBH L   ‰ˇ# ÿ1≠ˇ¶    BçBåD ÜA(ÉM0R
(M ABBF_(A ABB         4 $ 82≠ˇM    Dc
I      L   T $ h2≠ˇ®   BèBéB çB(åD0ÜA8ÉD†E
8A0A(B BBBH      § $ 8≠ˇ           |   º $  8≠ˇ\   BèBéE çB(åD0ÜA8ÉGP 
8A0A(B BBBEW
8A0A(B BBBG`
8A0A(B BBBF        <$ ‡8≠ˇ    GO 4   T$ Ë8≠ˇ~   BåAÜD ÉG@u
 AABI      L   å$ 0:≠ˇ@   BèBéB çB(åA0ÜA8ÉJ¿
8A0A(B BBBK      ‹$  @≠ˇB              Ù$ X@≠ˇj    D Q
K     4   $ ®@≠ˇæ   BåAÜD ÉG0W
 AABG    <   L$ 0B≠ˇG   BåAÜD ÉG@MHEP`HA@u
 AABF<   å$ @C≠ˇı    BåAÜD ÉJ@}
 AABF~HEPjHA@  L   Ã$  D≠ˇ.   BèBéB çB(åD0ÜA8ÉMêÇ
8A0A(B BBBJ   \   $ ‡F≠ˇw   BèBéB çB(åD0ÜA8ÉGÄ
8A0A(B BBBB@àBê]àAÄ     |$  I≠ˇ§    qr   î$ òI≠ˇ           ,   ¨$ êI≠ˇ…   AÜAÉG@B
AAC    ,   ‹$ 0K≠ˇb   AÜAÉG`‘
AAA       $ pM≠ˇ              $$ xN≠ˇ              <$ ÄO≠ˇq             T$ ËP≠ˇq             l$ PR≠ˇb             Ñ$ ®T≠ˇõ          ,   ú$ 0V≠ˇ   AÜAÉGP°
AAD    ,   Ã$ W≠ˇ   AÜAÉGP°
AAD    ,   ¸$ ∞Y≠ˇ    AÜAÉGP©
AAD    ,   ,$ Ä[≠ˇ™   ŒÉH
√JH√`Éd√    ,   \$  ]≠ˇ™   ŒÉH
√JH√`Éd√    ,   å$ Ä^≠ˇR   AÜAÉGPª
AAJ    ,   º$ ∞`≠ˇb   AÜAÉG`‘
AAA       Ï$ b≠ˇB              $ (c≠ˇj    D Q
K        $$ xc≠ˇÑ           \   <$ c≠ˇ   BèBéB çB(åA0ÜA8ÉJ†G
8A0A(B BBBK?®D∞F®A† <   ú$ ∞g≠ˇG   BåAÜD ÉG@MHEP`HA@u
 AABF<   ‹$ ¿h≠ˇı    BåAÜD ÉJ@}
 AABF~HEPjHA@  L   $ Äi≠ˇ.   BèBéB çB(åD0ÜA8ÉMêÇ
8A0A(B BBBJ   \   l$ `l≠ˇw   BèBéB çB(åD0ÜA8ÉGÄ
8A0A(B BBBB@àBê]àAÄ     Ã$ Än≠ˇ§    qr\   ‰$ o≠ˇ°   BèBéB çB(åA0ÜA8ÉDêì
8A0A(B BBBEeòB†gòAê  L   D$ hr≠ˇÈ   BèBéB çB(åA0ÜA8ÉG†1
8A0A(B BBBD      î$ v≠ˇ    GR    ¨$ v≠ˇ    GR $   ƒ$ v≠ˇ"    AÜAÉJ IGA    Ï$ `ì≠ˇ              	$ hì≠ˇ     HÉS       4   $	$ Ëu≠ˇÓ    AÉD B
AHD
AKLA    4   \	$ †v≠ˇÓ    AÉD B
AHD
AKLA    $   î	$ Xw≠ˇ_   AÉ
EK
A   <   º	$ êx≠ˇ¸   ŒÉD BA√c Éu
A√Bv√] É]√     ¸	$ Pz≠ˇ          $   
$ X{≠ˇâ   AÉG0r
AE    |   <
$ ¿}≠ˇ   BèBéE çB(åD0ÜA8ÉGPÃ
8A0A(B BBBC_
8A0A(B BBBG÷
8D0F(B BBBH     º
$ `Ç≠ˇS              ‘
$ ®Ç≠ˇ,              Ï
$ ¿Ç≠ˇ              $ ∏Ç≠ˇÑ           \   $ 0É≠ˇ1   BèBéB çB(åA0ÜA8ÉJ†º
8A0A(B BBBFñ®D∞F®A† <   |$ á≠ˇG   BåAÜD ÉG@JHEP]HA@u
 AABD<   º$  à≠ˇı    BåAÜD ÉJ@}
 AABF~HEPjHA@  <   ¸$ ‡à≠ˇH   NÜAÉD 
G√A∆JDA√A∆       \   <$ â≠ˇ°   BèBéB çB(åA0ÜA8ÉDêì
8A0A(B BBBEeòB†gòAê     ú$ @ç≠ˇb             ¥$ ÿè≠ˇ    AÉ]          ‘$ ÿè≠ˇ    AÉZ          Ù$ ÿè≠ˇ    AÉ]       ,   $ ÿè≠ˇ4    BåAÜD ÉiAB       ,   D$ Ëè≠ˇ1    BåAÜD ÉfAB       ,   t$ ¯è≠ˇ4    BåAÜD ÉiAB          §$ X∫≠ˇ              º$ `∫≠ˇ     HÉS       L   ‹$ –è≠ˇÆ    BçBåD ÜA(ÉM0V
(M ABBJ_(A ABB      4   ,$ 0ê≠ˇô    BåAÜD ÉG@Å
 AABA        d$ òê≠ˇM    Dg
E         Ñ$ »ê≠ˇH    DC<   ú$  ë≠ˇƒ   AÜAÉG 9
AADl
CAA       <   ‹$ êí≠ˇù   BçBåA ÜA(ÉGÄ´
(A ABBB    D   $ ï≠ˇ]   BéBçB åA(ÜA0ÉGp©
0A(A BBBH     4   d$ ô≠ˇΩ   BåAÜD ÉD@M
 AABD    ,   ú$ êö≠ˇ≥   AÜAÉG@K
AAJ    D   Ã$  ú≠ˇ≤   BéBçB åA(ÜD0ÉDP≠
0A(A BBBD    |   $ òû≠ˇÌ   BèBéE çB(åD0ÜA8ÉG`õ
8A0A(B BBBD¥
8A0A(B BBBAß
8D0F(B BBBH    î$ •≠ˇS              ¨$ P•≠ˇ,              ƒ$ h•≠ˇ              ‹$ `•≠ˇÑ           \   Ù$ ÿ•≠ˇ   BèBéB çB(åA0ÜA8ÉJ†Ã
8A0A(B BBBFŒ®D∞F®A†  <   T$ à©≠ˇG   BåAÜD ÉG@JHEP]HA@u
 AABD<   î$ ò™≠ˇı    BåAÜD ÉJ@}
 AABF~HEPjHA@  L   ‘$ X´≠ˇ–   BèBéE çB(åD0ÜA8ÉD†C
8A0A(B BBBG   <   $$ ÿ∞≠ˇH   NÜAÉD 
G√A∆JDA√A∆       d   d$ Ë±≠ˇ°   BèBéB çB(åA0ÜA8ÉDêì
8A0A(B BBBEeòB†gòAê             Ã$ pµ≠ˇ              ‰$ »≠ˇ              ¸$ »≠ˇ     HÉS       ,   $ 0µ≠ˇœ   AÜAÉGPG
AAF       L$ –∂≠ˇ§    ÅR   d$ h∑≠ˇ§    ÅO   |$  ∏≠ˇ§    ÅO   î$ ò∏≠ˇ§    ÅO   ¨$ 0π≠ˇ§    ÅO   ƒ$ »π≠ˇ§    ÅO   ‹$ `∫≠ˇS              Ù$ ®∫≠ˇ1    AÉV
IL    $ »∫≠ˇ              ,$ ¿∫≠ˇÑ           \   D$ 8ª≠ˇ)   BèBéB çB(åA0ÜA8ÉJ†3
8A0A(B BBBGf®D∞F®A† <   §$ ø≠ˇG   BåAÜD ÉG@JHEP]HA@u
 AABD<   ‰$ ¿≠ˇı    BåAÜD ÉJ@}
 AABF~HEPjHA@  <   $$ ÿ¿≠ˇH   NÜAÉD 
G√A∆JDA√A∆       d   d$ Ë¡≠ˇú   BèBéB çB(åA0ÜA8ÉDêA
8A0A(B BBBGÁòB†gòAê             Ã$ `≈≠ˇ              ‰$ ò¸≠ˇ              ¸$ †¸≠ˇ     HÉS       ,   $  ≈≠ˇı   AÜAÉG`4
AAA       L$ …≠ˇ§    ÅR   d$ à ≠ˇ§    ÅR   |$  À≠ˇ§    ÅR   î$ ∏À≠ˇ§    ÅR   ¨$ PÃ≠ˇ§    ÅR   ƒ$ ËÃ≠ˇ§    ÅO   ‹$ ÄÕ≠ˇ§    ÅO   Ù$ Œ≠ˇ§    ÅO   $ ∞Œ≠ˇ∞    ÅR   $$ Hœ≠ˇ∞    ÅR   <$ ‡œ≠ˇ∞    ÅR   T$ x–≠ˇ∞    ÅR4   l$ —≠ˇ   ÜÜAÉG CA√A∆X ÉÜ      ,   §$ ¯—≠ˇä   AÜAÉG@
AAF    ,   ‘$ X”≠ˇ¶   AÜAÉG@"
AAC    ,   $ ÿ‘≠ˇä   AÜAÉG@
AAF    ,   4$ 8÷≠ˇ¶   AÜAÉG@'
AAF    $   d$ ∏◊≠ˇµ   AÉG0
AD    $   å$ PŸ≠ˇµ   AÉG0
AD    ,   ¥$ Ë⁄≠ˇ|   AÜAÉG@ë
AAD    ,   ‰$ 8›≠ˇœ   AÜAÉGPG
AAF    ,   $ ÿﬁ≠ˇœ   AÜAÉGPG
AAF    ,   D$ x‡≠ˇœ   AÜAÉGPG
AAF    ,   t$ ‚≠ˇœ   AÜAÉGPG
AAF    ,   §$ ∏„≠ˇœ   AÜAÉGPG
AAF    ,   ‘$ XÂ≠ˇœ   AÜAÉGPG
AAF    ,   $ ¯Ê≠ˇœ   AÜAÉGPG
AAF    ,   4$ òË≠ˇ·   AÜAÉG`ı
AAH       d$ XÎ≠ˇS              |$ †Î≠ˇ1    AÉV
IL    ú$ ¿Î≠ˇ              ¥$ ∏Î≠ˇÑ           \   Ã$ 0Ï≠ˇ3   BèBéB çB(åA0ÜA8ÉJ†=
8A0A(B BBBE˜®D∞F®A†  <   ,$ ≠ˇG   BåAÜD ÉG@JHEP]HA@u
 AABD<   l$  Ò≠ˇı    BåAÜD ÉJ@}
 AABF~HEPjHA@  <   ¨$ ‡Ò≠ˇH   NÜAÉD 
G√A∆JDA√A∆       d   Ï$ Ú≠ˇú   BèBéB çB(åA0ÜA8ÉDêA
8A0A(B BBBGÁòB†gòAê             T$ hˆ≠ˇ              l$ `Æˇ              Ñ$ hÆˇ     HÉS          §$ (ˆ≠ˇõ             º$ ∞˜≠ˇ\   ‘s   ‘$ ¯¯≠ˇH             Ï$ 0˙≠ˇS              $ x˙≠ˇ,              $ ê˙≠ˇ              4$ à˙≠ˇÑ           \   L$  ˚≠ˇ1   BèBéB çB(åA0ÜA8ÉJ†º
8A0A(B BBBFñ®D∞F®A† <   ¨$ ‡˛≠ˇG   BåAÜD ÉG@JHEP]HA@u
 AABD<   Ï$ ˇ≠ˇı    BåAÜD ÉJ@}
 AABF~HEPjHA@  <   ,$ ∞ ÆˇH   NÜAÉD 
G√A∆JDA√A∆       d   l$ ¿Æˇû   BèBéB çB(åA0ÜA8ÉDê9
8A0A(B BBBG∫òB†gòAê             ‘$ 8Æˇ              Ï$ ‡Æˇ              $ ËÆˇ     HÉS          $$ ¯Æˇõ             <$ ÄÆˇH             T$ ∏ÆˇH          4   l$ Æˇd   AÉD0Â
OG–
AGs
OE    §$ (Æˇõ             º$ ∞ÆˇS              ‘$ ¯ÆˇÑ           \   Ï$ pÆˇ   BèBéB çB(åA0ÜA8ÉJ†/
8A0A(B BBBCv®D∞F®A†  <   L $ 0ÆˇG   BåAÜD ÉG@JHEP]HA@u
 AABD<   å $ @Æˇı    BåAÜD ÉJ@}
 AABF~HEPjHA@  <   Ã $  Æˇ   BåAÜA ÉV
ABCé
ABO          !$ ‡Æˇ           <   $!$ ÿÆˇH   NÜAÉD 
G√A∆JDA√A∆       \   d!$ ËÆˇù   BèBéB çB(åA0ÜA8ÉDê„
8A0A(B BBBE?òE†XòDê L   ƒ!$ HÆˇÕ   BèBéB çB(åA0ÜA8ÉM–
8A0A(B BBBG      "$ ÿÆˇ”    âr           4"$ ®RÆˇ              L"$ ∞RÆˇ     HÉS       ,   l"$ p ÆˇÑ    AÜAÉJ@p
AAA     ,   ú"$ – ÆˇZ   AÉD !
AID
CI   <   Ã"$  "Æˇù   BçBåA ÜA(ÉGÄ´
(A ABBB       #$ `%Æˇ§    ÅR$   $#$ ¯%Æˇ    AÉG ÿ
AG     $   L#$ –&Æˇ    AÉG ÿ
AG        t#$ ®'Æˇ8   ŒÉ]√     ,   î#$ »(Æˇ≥   AÜAÉG@K
AAJ    D   ƒ#$ X*Æˇ]   BéBçB åA(ÜA0ÉGp©
0A(A BBBH     ,   $$ p-ÆˇQ   åAÜD Éi√A∆BÃ  ,   <$$ †.ÆˇQ   åAÜD Éi√A∆BÃ  ,   l$$ –/ÆˇQ   åAÜD Éi√A∆BÃ  ,   ú$$  1ÆˇQ   åAÜD Éi√A∆BÃ  ,   Ã$$ 02ÆˇQ   åAÜD Éi√A∆BÃ  ,   ¸$$ `3ÆˇQ   åAÜD Éi√A∆BÃ  ,   ,%$ ê4ÆˇQ   åAÜD Éi√A∆BÃ  ,   \%$ ¿5ÆˇQ   åAÜD Éi√A∆BÃ     å%$ 6Æˇ8   —Z   §%$ 8Æˇ8   ŒÉ]√        ƒ%$ 89Æˇ8   ŒÉ]√        ‰%$ X:Æˇ8   ŒÉ]√        &$ x;Æˇ8   ŒÉ]√        $&$ ò<Æˇ8   ŒÉ]√        D&$ ∏=Æˇ8   ŒÉ]√        d&$ ÿ>Æˇ8   ŒÉ]√        Ñ&$ ¯?ÆˇS              ú&$ @@Æˇy    AÉX
GT   º&$ †@Æˇ              ‘&$ ò@ÆˇÑ           \   Ï&$ AÆˇ3   BèBéB çB(åA0ÜA8ÉJ†=
8A0A(B BBBE˜®D∞F®A†  <   L'$ DÆˇG   BåAÜD ÉG@JHEP]HA@u
 AABD<   å'$  FÆˇı    BåAÜD ÉJ@}
 AABF~HEPjHA@  <   Ã'$ ¿FÆˇí   DÜEÉK 
G√A∆QDA√A∆      \   ($  HÆˇ¢   BèBéB çB(åA0ÜA8ÉDêó
8A0A(B BBBAJòE†mòAê    l($ ∞LÆˇ              Ñ($ ÿXÆˇ              ú($ ‡XÆˇ     HÉS       ,   º($ pLÆˇ–   AÜAÉG0^
AAG    ,   Ï($ NÆˇl   ŒÜAÉJ zA√A∆         )$ POÆˇS              4)$ òOÆˇÑ           \   L)$ PÆˇ   BèBéB çB(åA0ÜA8ÉJ†˙
8A0A(B BBBH6®D∞F®A† <   ¨)$ –SÆˇG   BåAÜD ÉG@JHEP]HA@u
 AABD<   Ï)$ ‡TÆˇı    BåAÜD ÉJ@}
 AABF~HEPjHA@  <   ,*$ †UÆˇH   NÜAÉD 
G√A∆JDA√A∆          l*$ ∞VÆˇ(              Ñ*$ »VÆˇ              ú*$ êmÆˇ              ¥*$ òmÆˇ     HÉS          ‘*$ »VÆˇ8   —R   Ï*$ WÆˇˆ              +$ ÿXÆˇB              +$ YÆˇS              4+$ XYÆˇ,              L+$ pYÆˇ              d+$ hYÆˇÑ           \   |+$ ‡YÆˇ   BèBéB çB(åA0ÜA8ÉJ†˙
8A0A(B BBBH6®D∞F®A† <   ‹+$ †]ÆˇG   BåAÜD ÉG@JHEP]HA@u
 AABD<   ,$ ∞^Æˇı    BåAÜD ÉJ@}
 AABF~HEPjHA@  L   \,$ p_Æˇ.   BèBéB çB(åD0ÜA8ÉMêÇ
8A0A(B BBBJ   \   ¨,$ PbÆˇw   BèBéB çB(åD0ÜA8ÉGÄ
8A0A(B BBBB@àBê]àAÄ     -$ pdÆˇ§    qr<   $-$ eÆˇí   DÜEÉK 
G√A∆QDA√A∆      \   d-$ hfÆˇR   BèBéB çB(åA0ÜA8ÉDêî
8A0A(B BBBD˙òE†mòAê     ƒ-$ ¯xÆˇ              ‹-$  yÆˇ     HÉS          ¸-$ pjÆˇ§    ÅO   .$ kÆˇÙ    AÉÍ
EC   4.$ ËkÆˇS              L.$ 0lÆˇ,              d.$ HlÆˇ              |.$ @lÆˇÑ           \   î.$ ∏lÆˇ   BèBéB çB(åA0ÜA8ÉJ†˙
8A0A(B BBBH6®D∞F®A† <   Ù.$ xpÆˇG   BåAÜD ÉG@JHEP]HA@u
 AABD<   4/$ àqÆˇı    BåAÜD ÉJ@}
 AABF~HEPjHA@  <   t/$ HrÆˇH   NÜAÉD 
G√A∆JDA√A∆       \   ¥/$ XsÆˇ°   BèBéB çB(åA0ÜA8ÉDêì
8A0A(B BBBEeòB†gòAê     0$ 8¥Æˇ              ,0$ @¥Æˇ     HÉS          L0$ ∞vÆˇˆ              d0$ òwÆˇ§    ÅR   |0$ 0xÆˇ§    ÅR   î0$ »xÆˇ§    ÅR$   ¨0$ `yÆˇ    AÉG ÿ
AG     $   ‘0$ 8zÆˇ    AÉG ÿ
AG     ,   ¸0$ {Æˇ°   AÜAÉGpb
AAC    ,   ,1$ ê~Æˇ˚    éÜAÉI BF√A∆     ,   \1$ `Æˇ?   AÜAÉG0
AAH    <   å1$ pÄÆˇ   éÜAÉI0ò√∆X0ÉÜj
A√A∆D      4   Ã1$  ÇÆˇ    BåAÜA ÉGPA
 AABH    4   2$ ∏ÉÆˇ    BåAÜA ÉGPA
 AABH    4   <2$ PÖÆˇ    BåAÜA ÉGPA
 AABH    4   t2$ ËÜÆˇ
   BåAÜD ÉD`|
 AABE    $   ¨2$ ¿àÆˇµ   AÉG0
AD    $   ‘2$ XäÆˇF   AÉG0S
AD    D   ¸2$ ÄåÆˇ—   BéBçB åA(ÜA0ÉGp–
0A(A BBBI       D3$ èÆˇ8   —Y   \3$ @êÆˇ8   —Y   t3$ hëÆˇ8   —Y   å3$ êíÆˇ8   —Y   §3$ ∏ìÆˇ8   —YL   º3$ ‡îÆˇª   ŒÜAÉJ0YA√A∆\0ÉÜLA√A∆^0ÉÜc√∆       L   4$ PñÆˇª   ŒÜAÉJ0YA√A∆\0ÉÜLA√A∆^0ÉÜc√∆       L   \4$ ¿óÆˇª   ŒÜAÉJ0YA√A∆\0ÉÜLA√A∆^0ÉÜc√∆       L   ¨4$ 0ôÆˇª   ŒÜAÉJ0YA√A∆\0ÉÜLA√A∆^0ÉÜc√∆          ¸4$ †öÆˇ8   —R   5$ »õÆˇB              ,5$  úÆˇS              D5$ HúÆˇ,              \5$ `úÆˇ              t5$ XúÆˇÑ           \   å5$ –úÆˇ3   BèBéB çB(åA0ÜA8ÉJ†=
8A0A(B BBBE˜®D∞F®A†  <   Ï5$ ∞†ÆˇG   BåAÜD ÉG@JHEP]HA@u
 AABD<   ,6$ ¿°Æˇı    BåAÜD ÉJ@}
 AABF~HEPjHA@  L   l6$ Ä¢Æˇ.   BèBéB çB(åD0ÜA8ÉMêÇ
8A0A(B BBBJ   \   º6$ `•Æˇw   BèBéB çB(åD0ÜA8ÉGÄ
8A0A(B BBBB@àBê]àAÄ     7$ ÄßÆˇ§    qr<   47$ ®ÆˇH   NÜAÉD 
G√A∆JDA√A∆       d   t7$ (©Æˇ°   BèBéB çB(åA0ÜA8ÉDêì
8A0A(B BBBEeòB†gòAê          4   ‹7$ ∞¨Æˇg    AÜAÉJ i
DAF^GA     $   8$ Ë¨Æˇ5    AÜAÉJ fAA 4   <8$  ≠Æˇg    AÜAÉJ i
DAF^GA     4   t8$ 8≠Æˇg    AÜAÉJ i
DAF^GA     4   ¨8$ p≠Æˇg    AÜAÉJ i
DAF^GA     4   ‰8$ ®≠Æˇg    AÜAÉJ i
DAF^GA     4   9$ ‡≠Æˇg    AÜAÉJ i
DAF^GA     4   T9$ ÆÆˇg    AÜAÉJ i
DAF^GA     4   å9$ PÆÆˇg    AÜAÉJ i
DAF^GA     4   ƒ9$ àÆÆˇg    AÜAÉJ i
DAF^GA     $   ¸9$ ¿ÆÆˇ5    AÜAÉJ fAA 4   $:$ ÿÆÆˇX    AÜAÉJ i
DAFOGA     <   \:$  ØÆˇÃ    BçBåD ÜA(ÉL@d
(D ABBF      4   ú:$ êØÆˇa    AÜAÉJ i
DAFWHA     4   ‘:$ »ØÆˇe    AÜAÉJ i
DAF\GA     4   ;$  ∞Æˇe    AÜAÉJ i
DAF\GA     4   D;$ 8∞Æˇe    AÜAÉJ i
DAF\GA     4   |;$ p∞Æˇe    AÜAÉJ i
DAF\GA     4   ¥;$ ®∞Æˇe    AÜAÉJ i
DAF\GA     4   Ï;$ ‡∞Æˇe    AÜAÉJ i
DAF\GA     4   $<$ ±Æˇe    AÜAÉJ i
DAF\GA     4   \<$ P±Æˇe    AÜAÉJ i
DAF\GA        î<$ à±Æˇ)    D]    ¨<$ †±ÆˇU    Gk
F      $   Ã<$ ‡±Æˇ5    AÜAÉJ fAA $   Ù<$ ¯±Æˇ5    AÜAÉJ fAA $   =$ ≤Æˇ5    AÜAÉJ fAA $   D=$ (≤Æˇ5    AÜAÉJ fAA 4   l=$ @≤Æˇg    AÜAÉJ i
DAF^GA     4   §=$ x≤Æˇg    AÜAÉJ i
DAF^GA     ,   ‹=$ ∞≤Æˇ†    AÜAÉJ0T
AAF     ,   >$  ≥Æˇ†    AÜAÉJ0T
AAF     4   <>$ ê≥Æˇg    AÜAÉJ i
DAF^GA     4   t>$ »≥Æˇg    AÜAÉJ i
DAF^GA     4   ¨>$  ¥ÆˇX    AÜAÉJ i
DAFOGA     4   ‰>$ (¥Æˇi    AÜAÉJ i
DAF`GA     4   ?$ `¥Æˇf    AÜAÉJ i
DAF]GA     4   T?$ ò¥Æˇf    AÜAÉJ i
DAF]GA     4   å?$ –¥Æˇi    AÜAÉJ i
DAF`GA     4   ƒ?$ µÆˇi    AÜAÉJ i
DAF`GA     4   ¸?$ @µÆˇi    AÜAÉJ i
DAF`GA     4   4@$ xµÆˇi    AÜAÉJ i
DAF`GA     4   l@$ ∞µÆˇi    AÜAÉJ i
DAF`GA     4   §@$ ËµÆˇi    AÜAÉJ i
DAF`GA     4   ‹@$  ∂Æˇf    AÜAÉJ i
DAF]GA     4   A$ X∂Æˇi    AÜAÉJ i
DAF`GA     4   LA$ ê∂Æˇi    AÜAÉJ i
DAF`GA     4   ÑA$ »∂Æˇi    AÜAÉJ i
DAF`GA     4   ºA$  ∑Æˇi    AÜAÉJ i
DAF`GA     4   ÙA$ 8∑Æˇi    AÜAÉJ i
DAF`GA     4   ,B$ p∑Æˇi    AÜAÉJ i
DAF`GA     4   dB$ ®∑Æˇi    AÜAÉJ i
DAF`GA     4   úB$ ‡∑Æˇi    AÜAÉJ i
DAF`GA     4   ‘B$ ∏Æˇi    AÜAÉJ i
DAF`GA     4   C$ P∏Æˇi    AÜAÉJ i
DAF`GA     4   DC$ à∏Æˇi    AÜAÉJ i
DAF`GA     4   |C$ ¿∏Æˇi    AÜAÉJ i
DAF`GA     4   ¥C$ ¯∏Æˇi    AÜAÉJ i
DAF`GA     4   ÏC$ 0πÆˇi    AÜAÉJ i
DA