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
    ['crd', 'application/x-mscardf�����   B�B�B �B(�A0�A8�D��
8A0A(B BBBEe�B�g�A�             ��# H���              ��# 0���              ��# 8���     H�S          Ԟ# ���B              �# @���S              �# ����,              �# ����              4�# �����           4   L�# ����   B�A�D �G0W
 AABG    <   ��# ����G   B�A�D �G@JHEP]HA@u
 AABD<   ğ# �����    B�A�D �J@}
 AABF~HEPjHA@  L   �# h���.   B�B�B �B(�D0�A8�M��
8A0A(B BBBJ   \   T�# H���w   B�B�B �B(�D0�A8�G�
8A0A(B BBBB@�B�]�A�     ��# h����    qr<   ̠#  ���H   N�A�D 
G�A�JDA�A�       d   �# ����   B�B�B �B(�A0�A8�D��
8A0A(B BBBEe�B�g�A�          $   t�# ����"    A�A�J IGA    ��# ����B              ��# ؾ��s    D T
H     4   ԡ# 8����   B�A�D �G0W
 AABG    <   �# ����G   B�A�D �G@MHEP`HA@u
 AABF<   L�# �����    B�A�D �J@}
 AABF~HEPjHA@  L   ��# �ª�.   B�B�B �B(�D0�A8�M��
8A0A(B BBBJ   \   ܢ# pŪ�w   B�B�B �B(�D0�A8�G�
8A0A(B BBBB@�B�]�A�     <�# �Ǫ��    qr        $   \�#  Ȫ�"    A�A�J IGA    ��# (Ȫ�              ��#  Ȫ��    �R   ��# �Ȫ��    �R   ̣# Pɪ��    �R   �# �ɪ��    �O   ��# �ʪ��    �O   �# ˪��    �O   ,�# �˪��    �O   D�# H̪��    �O   \�# �̪��    �O   t�# xͪ��    �O   ��# Ϊ��    �O   ��# �Ϊ��    �O   ��# @Ϫ��    �O   Ԥ# �Ϫ��    �O   �# pЪ��    �O   �# Ѫ��    �O   �# �Ѫ��    �O   4�# 8Ҫ��    �O   L�# �Ҫ��    �O   d�# hӪ��    �O   |�#  Ԫ��    �O   ��# �Ԫ��    �O   ��# 0ժ��    �O   ĥ# �ժ��    �O   ܥ# `֪��    �O   ��# �֪��    �O   �# �ת��    �O   $�# (ت��    �O   <�# �ت��    �O   T�# X٪��    �O   l�# �٪��    �R   ��# �ڪ��    �cTR  <   ��# X۪��    A�A�T �
AAKR
PAEWAA<   �# ܪ��    A�A�T �
AAKR
PAEWAA,   $�# �ܪ��    A�A�G0�
AAD     ,   T�# xݪ��    A�A�G0�
AAD     ,   ��# 8ު��    A�A�G0�
AAD     ,   ��# �ު��    A�A�G0�
AAD     ,   �# �ߪ��    A�A�G0�
AAD     ,   �# x���    A�A�G0�
AAD     ,   D�# 8��4   A�A�G@�
AAK     ,   t�# H��4   A�A�G@�
AAK     D   ��# X���   B�A�K �G0�
 AABE�
 KABN     ,   �# ���4   A�A�G@�
AAK     ,   �# ���4   A�A�G@�
AAK     ,   L�#  ��4   A�A�G@�
AAK     ,   |�# ��4   A�A�G@�
AAK     ,   ��#  ��G   A�A�G@�
AAD     ,   ܩ# @��4   A�A�G@�
AAK     ,   �# P��G   A�A�G@�
AAD     ,   <�# p��4   A�A�G@�
AAK     ,   l�# ���O   A�A�G@�
AAE        ��# ӫ�R    \ N
FR   ,   ��# ���   A�A�G@�
AAB     ,   �# p��/   A�A�G0�
AAA     ,   �# p���    A�A�G0�
AAD     ,   L�# 0��   A�A�G@�
AAB     ,   |�#  ��   A�A�G@�
AAB     ,   ��# ���    A�A�G0�
AAC     $   ܫ# 0ҫ�   A�G �
AG     t   �# ����   B�B�E �B(�D0�A8�D�N�A�K�A�l
8A0A(B BBBA��J�j�A�          |�# ���s    D T
H     <   ��# @��G   B�A�D �G@MHEP`HA@u
 AABF<   ܬ# P���    B�A�D �J@}
 AABF~HEPjHA@     �# ҫ�|           <   4�# ���}   B�B�A �A(�G@�
(A ABBD    <   t�# 8���   B�B�A �A(�GPj
(A ABBC    <   ��# ����   B�B�A �A(�GPj
(A ABBC    <   ��# X���   B�B�A �A(�GPj
(A ABBC    <   4�# ����   B�B�A �A(�GPj
(A ABBC    4   t�# x���   B�A�A �G@{
 AABF    4   ��# @��*   B�A�A �G@�
 AABH     4   �# 8��*   B�A�A �G@�
 AABH     L   �# 0���   B�B�B �B(�A0�A8�G�a
8A0A(B BBBD   4   l�# ����   B�A�A �G@{
 AABF    4   ��# ���O   B�A�A �G0�
 AABD     \   ܯ# ���]   B�B�B �B(�A0�A8�Gp#xU�E�E�Op]
8A0A(B BBBG  \   <�# �!��M   B�B�B �B(�A0�A8�G`hTpExE�N`]
8A0A(B BBBA    D   ��# �$��   B�A�A ��
ABGR
AB[R
ABK   D   �# h%��   B�A�A ��
ABGR
AB[R
ABK   D   ,�# 0&��   B�A�A ��
ABGR
AB[R
ABK   D   t�# �&��   B�A�A ��
ABGR
AB[R
ABK   D   ��# �'��   B�A�A ��
ABGR
AB[R
ABK   D   �# �(��   B�A�A ��
ABGR
AB[R
ABK   ,   L�# P)���   A�A�G@
AAB    <   |�# +��e   B�B�A �A(�G@�
(A ABBI    D   ��# @-���   B�B�B �A(�A0�GP1
0A(A BBBH    L   �# �.���   B�B�B �B(�A0�A8�Gph
8A0A(B BBBE    L   T�# 80���   B�B�B �B(�A0�A8�G�~
8A0A(B BBBG   \   ��# �2��   B�B�B �B(�A0�A8�G�{�U�W�A�]
8A0A(B BBBH   4   �# H5��z   B�A�A �G@
 AABF    4   <�# �6��*   B�A�A �G@�
 AABF     D   t�# �7��   B�A�A ��
ABGR
AB[R
ABK   D   ��# P8��   B�A�A ��
ABGR
AB[R
ABK   D   �# 9��   B�A�A ��
ABGR
AB[R
ABK   D   L�# �9��   B�A�A ��
ABGR
AB[R
ABK   D   ��# �:��   B�A�A ��
ABGR
AB[R
ABK   D   ܵ# p;��   B�A�A ��
ABGR
AB[R
ABK   4   $�# 8<��O   B�A�A �G0�
 AABD     4   \�# P=��*   B�A�A �G0�
 AABH     ,   ��# H>���   A�A�G@
AAB    L   Ķ# @���   B�B�B �B(�A0�A8�G`F
8A0A(B BBBG    d   �# �A���   B�B�B �B(�A0�A8�G@ 
8A0A(B BBBEt
8K0A(B BBBP    <   |�# �B���   B�B�A �A(�GP#
(A ABBJ    L   ��#  D���   B�B�B �B(�A0�A8�GpY
8A0A(B BBBD    4   �# �E��*   B�A�A �G@�
 AABH     <   D�# �F���   B�B�A �A(�G`+
(A ABBB    L   ��# �G���   B�B�B �B(�A0�A8�G�a
8A0A(B BBBD   <   Ը# �I���   B�B�A �A(�G`(
(A ABBE    <   �# �J���   B�B�A �A(�GP#
(A ABBJ    4   T�# 8L���   B�A�A �GPA
 AABH    <   ��# �M���   B�B�A �A(�G@<
(A ABBA    <   ̹# @O��5   B�B�A �A(�G`�
(A ABBF    D   �# @Q��   B�B�B �A(�A0�G@{
0A(A BBBF    <   T�# S���   B�B�A �A(�G`�
(A ABBE    L   ��# xU���   B�B�B �B(�A0�A8�GP�
8A0A(B BBBG    <   �# �W��   B�B�A �A(�G`7
(A ABBF    T   $�# �Z���   B�B�B �B(�A0�A8�G`�hUpWhA`]
8A0A(B BBBH4   |�#  ]��O   B�A�A �G0�
 AABD     4   ��# 8^��O   B�A�A �G0�
 AABD     4   �# P_��}   B�A�A �GP�
 AABD     <   $�# �`���   B�B�A �A(�G`5
(A ABBH    <   d�# �a���   B�B�A �A(�G`y
(A ABBD    <   ��# �c��U   B�B�A �A(�G`�
(A ABBB    d   �# �e���   B�B�B �B(�A0�A8�G@ 
8A0A(B BBBEt
8K0A(B BBBP    <   L�#  g���   B�B�A �A(�G��
(A ABBD   4   ��# �i���   B�A�A �GP�
 AABE    <   Ľ# l���   B�B�A �A(�GP
(A ABBC    <   �# �m���   B�B�A �A(�GP
(A ABBC    <   D�# o���   B�B�A �A(�GP
(A ABBC    4   ��# �p��a   B�A�A �G`�
 AABB    L   ��# �r���   B�B�B �B(�A0�A8�G`�
8A0A(B BBBF     ,   �# 0v��W   A�A�G@
AAH    \   <�# `x���   B�B�B �B(�A0�A8�G���D�W�A�]
8A0A(B BBBK   D   ��# �z��   B�B�B �A(�A0�G�L
0A(A BBBE    L   �# ����   B�B�B �B(�A0�A8�GpL
8A0A(B BBBI     \   4�# ���%   B�B�B �B(�A0�A8�G���Q�P�A�A
8A0A(B BBBE  d   ��# 腫��   B�B�B �B(�A0�A8�G�)�H�K�E�S�D
8A0A(B BBBE      d   ��# ���M   B�B�B �B(�A0�A8�G���R�B�E�S�R
8A0A(B BBBE      �   d�# �����   B�B�B �B(�A0�A8�J��
8A0A(B BBBH��D�Z�A���U�B�E�E�E�S���D�Z�A��
�D�S�
�D�S�   �#  ���   B�B�B �B(�A0�A8�J��
8A0A(B BBBH�V�D�H�R���S�B�H�E�E�W���V�D�H�R�
�V�D�H�\
�V�D�H�\4   ��# p���T   B�A�A �GP�
 AABF     D   �# ����   B�B�B �A(�A0�G`�
0A(A BBBA    D   L�# в��   B�B�B �A(�A0�G`�
0A(A BBBA    <   ��# ����   B�B�A �A(�Gp\
(A ABBA    <   ��# ����A   B�B�A �A(�Gp
(A ABBI       �# ����              ,�# �̫�              D�# �̫�     H�S          d�# X���B              |�# ����S              ��# ػ��,              ��# ��              ��# 軫��           4   ��# `����   B�A�D �G0W
 AABG    <   �# 轫�G   B�A�D �G@JHEP]HA@u
 AABD<   T�# �����    B�A�D �J@}
 AABF~HEPjHA@  L   ��# ����.   B�B�B �B(�D0�A8�M��
8A0A(B BBBJ   \   ��# �«�w   B�B�B �B(�D0�A8�G�
8A0A(B BBBB@�B�]�A�     D�# �ī��    qr<   \�# Pū�H   N�A�D 
G�A�JDA�A�       d   ��# `ƫ��   B�B�B �B(�A0�A8�D��
8A0A(B BBBEe�B�g�A�             �# �ɫ�              �# �ګ�              4�# �ګ�     H�S          T�# �ɫ�B              l�# �ɫ�S              ��# (ʫ�,              ��# @ʫ�              ��# 8ʫ��           4   ��# �ʫ��   B�A�D �G0W
 AABG    <   �# 8̫�G   B�A�D �G@JHEP]HA@u
 AABD<   D�# Hͫ��    B�A�D �J@}
 AABF~HEPjHA@  L   ��# Ϋ�.   B�B�B �B(�D0�A8�M��
8A0A(B BBBJ   \   ��# �Ы�w   B�B�B �B(�D0�A8�G�
8A0A(B BBBB@�B�]�A�     4�# ӫ��    qr<   L�# �ӫ�H   N�A�D 
G�A�JDA�A�       d   ��# �ԫ��   B�B�B �B(�A0�A8�D��
8A0A(B BBBEe�B�g�A�             ��# 8ث�              �# @��              $�# H��     H�S          D�# �׫�8   �Y   \�#  ٫�8   �Y   t�# Hګ�8   �Y   ��# p۫�B              ��# �۫�S              ��# �۫�(              ��# ܫ�              ��#  ܫ��           \   �# xܫ�1   B�B�B �B(�A0�A8�J��
8A0A(B BBBF��D�F�A� <   d�# X��G   B�A�D �G@JHEP]HA@u
 AABD<   ��# h���    B�A�D �J@}
 AABF~HEPjHA@  L   ��# (��.   B�B�B �B(�D0�A8�M��
8A0A(B BBBJ   \   4�# ��w   B�B�B �B(�D0�A8�G�
8A0A(B BBBB@�B�]�A�     ��# (���    qr<   ��# ���H   N�A�D 
G�A�JDA�A�       \   ��# ����   B�B�B �B(�A0�A8�D�5
8A0A(B BBBC��B�g�A�     L�# @��              d�# (���              |�# 0���     H�S          ��#  ��B              ��# 8��S              ��# ���,              ��# ���              ��# ����           4   �# ���   B�A�D �G0W
 AABG    <   L�# ���G   B�A�D �G@JHEP]HA@u
 AABD<   ��# ����    B�A�D �J@}
 AABF~HEPjHA@  L   ��# `��.   B�B�B �B(�D0�A8�M��
8A0A(B BBBJ   \   �# @��w   B�B�B �B(�D0�A8�G�
8A0A(B BBBB@�B�]�A�     |�# `����    qr<   ��# ����H   N�A�D 
G�A�JDA�A�       d   ��# ����   B�B�B �B(�A0�A8�D��
8A0A(B BBBEe�B�g�A�             <�# ����              T�# x��              l�# ���     H�S          ��# P���B              ��# ����S              ��# ����,              ��# ����              ��# �����           4   �# X����   B�A�D �G0W
 AABG    <   <�# ����G   B�A�D �G@JHEP]HA@u
 AABD<   |�# �����    B�A�D �J@}
 AABF~HEPjHA@  L   ��# ����.   B�B�B �B(�D0�A8�M��
8A0A(B BBBJ   \   �# ���w   B�B�B �B(�D0�A8�G�
8A0A(B BBBB@�B�]�A�     l�# ����    qr<   ��# H��H   N�A�D 
G�A�JDA�A�       d   ��# X���   B�B�B �B(�A0�A8�D��
8A0A(B BBBEe�B�g�A�             ,�# ���              D�# ���              \�# ���     H�S          |�# ���B              ��# ���S              ��#  	��,              ��# 8	��              ��# 0	���           4   ��# �	���   B�A�D �G0W
 AABG    <   ,�# 0��G   B�A�D �G@JHEP]HA@u
 AABD<   l�# @���    B�A�D �J@}
 AABF~HEPjHA@  L   ��#  ��.   B�B�B �B(�D0�A8�M��
8A0A(B BBBJ   \   ��# ���w   B�B�B �B(�D0�A8�G�
8A0A(B BBBB@�B�]�A�     \�#  ���    qr<   t�# ���H   N�A�D 
G�A�JDA�A�       d   ��# ����   B�B�B �B(�A0�A8�D��
8A0A(B BBBEe�B�g�A�             �# 0��              4�# X(��              L�# `(��     H�S          l�# ���B              ��# (��S           $   ��# p��\    A�V
Ic
MG      ��# ���              ��# ����           4   ��# ���   B�A�D �G0W
 AABG    <   ,�# ���G   B�A�D �G@JHEP]HA@u
 AABD<   l�# ����    B�A�D �J@}
 AABF~HEPjHA@  L   ��# p��.   B�B�B �B(�D0�A8�M��
8A0A(B BBBJ   \   ��# P��w   B�B�B �B(�D0�A8�G�
8A0A(B BBBB@�B�]�A�     \�# p ���    qr<   t�# !��H   N�A�D 
G�A�JDA�A�       \   ��# "���   B�B�B �B(�A0�A8�D�Y
8A0A(B BBBG��B�g�A�     �# �%��              ,�# �.��              D�# �.��     H�S          d�# x%��S              |�# �%��,              ��# �%��              ��# �%���           4   ��# H&��|    A�A�J L
AAFRDA    <   ��# �&��G   B�A�D �G@JHEP]HA@u
 AABD<   <�# �'���    B�A�D �J@}
 AABF~HEPjHA@  <   |�# `(��H   N�A�D 
G�A�JDA�A�       \   ��# p)���   B�B�B �B(�A0�A8�D��
8A0A(B BBBEe�B�g�A�     �#  -��    GR    4�# -��    GR $   L�# -��"    A�A�J IGA    t�# XJ��              ��# `J��     H�S       4   ��# �,���    A�D B
AHD
AKLA    4   ��# �-���    A�D B
AHD
AKLA    $   �# P.��_   A�
EK
A   <   D�# �/���   ��D BA�c �u
A�Bv�] �]�     ��# H1��             ��# P2��b          $   ��# �4���   A�G0r
AE    |   ��# 7��   B�B�E �B(�D0�A8�GP�
8A0A(B BBBC_
8A0A(B BBBG�
8D0F(B BBBH     \�# �;��S              t�# �;��,              ��# <��              ��# <���           \   ��# �<��1   B�B�B �B(�A0�A8�J��
8A0A(B BBBF��D�F�A� <   �# `@��G   B�A�D �G@JHEP]HA@u
 AABD<   \�# pA���    B�A�D �J@}
 AABF~HEPjHA@  <   ��# 0B��H   N�A�D 
G�A�JDA�A�       \   ��# @C���   B�B�B �B(�A0�A8�D��
8A0A(B BBBEe�B�g�A�     <�# �F��    A�]          \�# �F��    A�Z          |�# �F��    A�]       ,   ��# �F��4    B�A�D �iAB       ,   ��# �F��1    B�A�D �fAB       ,   ��# �F��4    B�A�D �iAB          ,�#  q��              D�# q��     H�S       L   d�# �F���    B�B�D �A(�M0V
(M ABBJ_(A ABB      4   ��# (G���    B�A�D �G@�
 AABA        ��# �G��M    Dg
E      <   �# �G���   A�A�G 9
AADl
CAA       <   L�# PI���   B�B�A �A(�G��
(A ABBB    D   ��# �L��]   B�B�B �A(�A0�Gp�
0A(A BBBH     4   ��# �O���   B�A�D �D@M
 AABD    ,   �# PQ���   A�A�G@K
AAJ    D   <�# �R���   B�B�B �A(�D0�DP�
0A(A BBBD    |   ��# XU���   B�B�E �B(�D0�A8�G`�
8A0A(B BBBD�
8A0A(B BBBA�
8D0F(B BBBH    �# �[��S              �# \��,              4�# (\��              L�#  \���           \   d�# �\��   B�B�B �B(�A0�A8�J��
8A0A(B BBBF��D�F�A�  <   ��# H`��G   B�A�D �G@JHEP]HA@u
 AABD<   �# Xa���    B�A�D �J@}
 AABF~HEPjHA@  L   D�# b���   B�B�E �B(�D0�A8�D�C
8A0A(B BBBG   <   ��# �g��H   N�A�D 
G�A�JDA�A�       d   ��# �h���   B�B�B �B(�A0�A8�D��
8A0A(B BBBEe�B�g�A�             <�# 0l��           $   T�# (l��#   A�G �
AB       |�# 0n��B              ��# hn��j    D Q
K     \   ��# �n��   B�B�B �B(�A0�A8�J��
8A0A(B BBBH6�D�F�A� <   �# xr��G   B�A�D �G@MHEP`HA@u
 AABF<   T�# �s���    B�A�D �J@}
 AABF~HEPjHA@  L   ��# Ht��.   B�B�B �B(�D0�A8�M��
8A0A(B BBBJ   \   ��# (w��w   B�B�B �B(�D0�A8�G�
8A0A(B BBBB@�B�]�A�     D�# Hy���    qrT   \�# �y��S   B�B�B �B(�D0�A8�D�)
8A0A(B BBBD              ��# �~��    GR    ��# �~��    GR    ��# 蹬�              ��# ��     H�S       4   �# �~���    B�A�D �G@�
 AABA     <   T�# 8���   A�A�G 9
AADt
CAA       4   ��# Ȁ���    A�D B
AHD
AKLA    4   ��# �����    A�D B
AHD
AKLA    ,   �# 8����   A�A�G@L
AAI    D   4�# ȃ��]   B�B�B �A(�A0�Gp�
0A(A BBBH     ,   |�# ����f   A�A�G0
AAD    <   ��#  ���[   B�B�D �A(�D`�
(A ABBA    <   ��# @����   B�B�A �A(�G��
(A ABBB    ,   ,�# �����   A�A�G@A
AAD    ,   \�# ���U   �A�D �m�A�B�  ,   ��# @���l   ��A�J zA�A�      ,   ��# ����l   ��A�J zA�A�         ��# ����8   ��a�     |   �# ����   B�B�E �B(�D0�A8�GP�
8A0A(B BBBC_
8A0A(B BBBG�
8D0F(B BBBH  <   ��# �����   ��D BA�c �u
A�Bv�] �]�  $   ��# @����   A�G0r
AE    <   ��# �����   ��D EA�` �u
A�Bv�] �]�  $   4�# h����   A�G0�
AD       \�# ���B              t�# H���S              ��# ����,              ��# ����              ��# �����           \   ��# ���3   B�B�B �B(�A0�A8�J�=
8A0A(B BBBE��D�F�A�  <   4�# ����G   B�A�D �G@JHEP]HA@u
 AABD<   t�# ����    B�A�D �J@}
 AABF~HEPjHA@  L   ��# Ȩ��.   B�B�B �B(�D0�A8�M��
8A0A(B BBBJ   \   �# ����w   B�B�B �B(�D0�A8�G�
8A0A(B BBBB@�B�]�A�     d�# ȭ���    qr<   |�# `���H   N�A�D 
G�A�JDA�A�       \   ��# p����   B�B�B �B(�A0�A8�D�9
8A0A(B BBBG��B�g�A�     �# ��           4   4�# 責��    B�A�D �G@�
 AABA     <   l�# P����   B�B�A �A(�Gp�
(A ABBH    <   ��# �����   B�B�A �A(�G��
(A ABBB    ,   ��#  ���R   A�A�GP�
AAJ    ,   �# P����   A�A�G@K
AAJ    D   L�# ཬ�]   B�B�B �A(�A0�Gp�
0A(A BBBH     ,   ��# ����Q   �A�D �i�A�B�  ,   ��# (¬�Q   �A�D �i�A�B�     ��# Xì�           ,   �# `Ĭ�l   ��A�J zA�A�         <�# �Ŭ�8   ��]�        \�# �Ƭ�8   ��]�     $   |�# �Ǭ��   A�D@N
AD    $   ��# �ɬ��   A�D@N
AD       ��# Pˬ�b          ,   ��# �ͬ��   A�A�GP�
AAI    ,   �# hϬ��   A�A�GP�
AAI       D�# (Ѭ��             \�# �Ҭ�B              t�# �Ҭ�S              ��# 0Ӭ�,              ��# HӬ�              ��# @Ӭ��           \   ��# �Ӭ�!   B�B�B �B(�A0�A8�J�G
8A0A(B BBBK��D�F�A�  <   4�# �׬�G   B�A�D �G@JHEP]HA@u
 AABD<   t�# �ج��    B�A�D �J@}
 AABF~HEPjHA@  L   ��# X٬�.   B�B�B �B(�D0�A8�M��
8A0A(B BBBJ   \   �# 8ܬ�w   B�B�B �B(�D0�A8�G�
8A0A(B BBBB@�B�]�A�     d�# Xެ��    qr<   |�# �ެ�H   N�A�D 
G�A�JDA�A�          ��#  ��              ��# ���              ��# ���     H�S       L   �# �߬��    B�B�D �A(�M0U
(M ABBK_(A ABB         \�#  ���    Dh
Da
G4   |�# ����   B�A�D �D@M
 AABD    4   ��# ��   B�A�D �DPu
 AABD    |   ��#  ���   B�B�E �B(�D0�A8�G`�
8A0A(B BBBD�
8A0A(B BBBA�
8D0F(B BBBH    l�# p��B              ��# ���S              ��# ����           \   ��# h��   B�B�B �B(�A0�A8�J��
8A0A(B BBBH6�D�F�A� <   �# (��G   B�A�D �G@JHEP]HA@u
 AABD<   T�# 8���    B�A�D �J@}
 AABF~HEPjHA@  L   ��# ���.   B�B�B �B(�D0�A8�M��
8A0A(B BBBJ   d   ��# ���A   B�B�B �B(�A0�A8�D`[
8A0A(B BBBEI
8D0A(B BBBJ        L�# ����           L   d�# �����   B�B�E �B(�D0�A8�G�F
8A0A(B BBBI   \   ��# H���w   B�B�B �B(�D0�A8�G�
8A0A(B BBBB@�B�]�A�     �# h���    tx<   ,�#  ��H   N�A�D 
G�A�JDA�A�       \   l�# 0���	   B�B�B �B(�A0�A8�G��
8A0A(B BBBA��B�g�A�    ��# ���    A�Z          ��# ���    A�]          �# ���    A�]       ,   ,�# ���1    B�A�D �fAB       ,   \�# ���4    B�A�D �iAB       ,   ��# ���4    B�A�D �iAB          ��# �=��              ��# �=��     H�S       4   ��# ����    B�A�D �G@�
 AABA     <   ,�# 0���   A�A�G 9
AADl
CAA       <   l�# ����   B�B�A �A(�G��
(A ABBB    D   ��#  ��]   B�B�B �A(�A0�Gp�
0A(A BBBH     4   ��# 8���   B�A�D �D@M
 AABD    ,   ,�# ����   A�A�G@K
AAJ    D   \�# P���   B�B�B �A(�D0�DP�
0A(A BBBD       ��# ���B              ��#  ��S              ��# H��,              ��# `��              �# X���           \   �# ���   B�B�B �B(�A0�A8�J��
8A0A(B BBBF��D�F�A�  <   |�# ���G   B�A�D �G@JHEP]HA@u
 AABD<   ��# � ���    B�A�D �J@}
 AABF~HEPjHA@  L   ��# P!��.   B�B�B �B(�D0�A8�M��
8A0A(B BBBJ   \   L�# 0$��w   B�B�B �B(�D0�A8�G�
8A0A(B BBBB@�B�]�A�     ��# P&���    tx<   ��# '��H   N�A�D 
G�A�JDA�A�       \   �# (���   B�B�B �B(�A0�A8�D��
8A0A(B BBBEe�B�g�A�  |   d�# h+���   B�B�E �B(�D0�A8�G`�
8A0A(B BBBD�
8A0A(B BBBA�
8D0F(B BBBH L   ��# �1���    B�B�D �A(�M0R
(M ABBF_(A ABB         4 $ 82��M    Dc
I      L   T $ h2���   B�B�B �B(�D0�A8�D�E
8A0A(B BBBH      � $ 8��           |   � $  8��\   B�B�E �B(�D0�A8�GP�
8A0A(B BBBEW
8A0A(B BBBG`
8A0A(B BBBF        <$ �8��    GO 4   T$ �8��~   B�A�D �G@u
 AABI      L   �$ 0:��@   B�B�B �B(�A0�A8�J�
8A0A(B BBBK      �$  @��B              �$ X@��j    D Q
K     4   $ �@���   B�A�D �G0W
 AABG    <   L$ 0B��G   B�A�D �G@MHEP`HA@u
 AABF<   �$ @C���    B�A�D �J@}
 AABF~HEPjHA@  L   �$  D��.   B�B�B �B(�D0�A8�M��
8A0A(B BBBJ   \   $ �F��w   B�B�B �B(�D0�A8�G�
8A0A(B BBBB@�B�]�A�     |$  I���    qr   �$ �I��           ,   �$ �I���   A�A�G@B
AAC    ,   �$ 0K��b   A�A�G`�
AAA       $ pM��              $$ xN��              <$ �O��q             T$ �P��q             l$ PR��b             �$ �T���          ,   �$ 0V���   A�A�GP�
AAD    ,   �$ �W���   A�A�GP�
AAD    ,   �$ �Y��    A�A�GP�
AAD    ,   ,$ �[���   ��H
�JH�`�d�    ,   \$  ]���   ��H
�JH�`�d�    ,   �$ �^��R   A�A�GP�
AAJ    ,   �$ �`��b   A�A�G`�
AAA       �$ �b��B              $ (c��j    D Q
K        $$ xc���           \   <$ �c��   B�B�B �B(�A0�A8�J�G
8A0A(B BBBK?�D�F�A� <   �$ �g��G   B�A�D �G@MHEP`HA@u
 AABF<   �$ �h���    B�A�D �J@}
 AABF~HEPjHA@  L   $ �i��.   B�B�B �B(�D0�A8�M��
8A0A(B BBBJ   \   l$ `l��w   B�B�B �B(�D0�A8�G�
8A0A(B BBBB@�B�]�A�     �$ �n���    qr\   �$ o���   B�B�B �B(�A0�A8�D��
8A0A(B BBBEe�B�g�A�  L   D$ hr���   B�B�B �B(�A0�A8�G�1
8A0A(B BBBD      �$ v��    GR    �$ v��    GR $   �$ v��"    A�A�J IGA    �$ `���              	$ h���     H�S       4   $	$ �u���    A�D B
AHD
AKLA    4   \	$ �v���    A�D B
AHD
AKLA    $   �	$ Xw��_   A�
EK
A   <   �	$ �x���   ��D BA�c �u
A�Bv�] �]�     �	$ Pz��          $   
$ X{���   A�G0r
AE    |   <
$ �}��   B�B�E �B(�D0�A8�GP�
8A0A(B BBBC_
8A0A(B BBBG�
8D0F(B BBBH     �
$ `���S              �
$ ����,              �
$ ����              $ �����           \   $ 0���1   B�B�B �B(�A0�A8�J��
8A0A(B BBBF��D�F�A� <   |$ ���G   B�A�D �G@JHEP]HA@u
 AABD<   �$  ����    B�A�D �J@}
 AABF~HEPjHA@  <   �$ ����H   N�A�D 
G�A�JDA�A�       \   <$ �����   B�B�B �B(�A0�A8�D��
8A0A(B BBBEe�B�g�A�     �$ @���b             �$ ؏��    A�]          �$ ؏��    A�Z          �$ ؏��    A�]       ,   $ ؏��4    B�A�D �iAB       ,   D$ 菭�1    B�A�D �fAB       ,   t$ ����4    B�A�D �iAB          �$ X���              �$ `���     H�S       L   �$ Џ���    B�B�D �A(�M0V
(M ABBJ_(A ABB      4   ,$ 0����    B�A�D �G@�
 AABA        d$ ����M    Dg
E         �$ Ȑ��H    DC<   �$  ����   A�A�G 9
AADl
CAA       <   �$ �����   B�B�A �A(�G��
(A ABBB    D   $ ��]   B�B�B �A(�A0�Gp�
0A(A BBBH     4   d$ ����   B�A�D �D@M
 AABD    ,   �$ �����   A�A�G@K
AAJ    D   �$  ����   B�B�B �A(�D0�DP�
0A(A BBBD    |   $ �����   B�B�E �B(�D0�A8�G`�
8A0A(B BBBD�
8A0A(B BBBA�
8D0F(B BBBH    �$ ���S              �$ P���,              �$ h���              �$ `����           \   �$ إ��   B�B�B �B(�A0�A8�J��
8A0A(B BBBF��D�F�A�  <   T$ ����G   B�A�D �G@JHEP]HA@u
 AABD<   �$ �����    B�A�D �J@}
 AABF~HEPjHA@  L   �$ X����   B�B�E �B(�D0�A8�D�C
8A0A(B BBBG   <   $$ ذ��H   N�A�D 
G�A�JDA�A�       d   d$ 豭��   B�B�B �B(�A0�A8�D��
8A0A(B BBBEe�B�g�A�             �$ p���              �$ ȭ�              �$ ȭ�     H�S       ,   $ 0����   A�A�GPG
AAF       L$ ж���    �R   d$ h����    �O   |$  ����    �O   �$ �����    �O   �$ 0����    �O   �$ ȹ���    �O   �$ `���S              �$ ����1    A�V
IL    $ Ⱥ��              ,$ �����           \   D$ 8���)   B�B�B �B(�A0�A8�J�3
8A0A(B BBBGf�D�F�A� <   �$ ���G   B�A�D �G@JHEP]HA@u
 AABD<   �$ ����    B�A�D �J@}
 AABF~HEPjHA@  <   $$ ����H   N�A�D 
G�A�JDA�A�       d   d$ �����   B�B�B �B(�A0�A8�D�A
8A0A(B BBBG��B�g�A�             �$ `ŭ�              �$ ����              �$ ����     H�S       ,   $  ŭ��   A�A�G`4
AAA       L$ �ɭ��    �R   d$ �ʭ��    �R   |$  ˭��    �R   �$ �˭��    �R   �$ P̭��    �R   �$ �̭��    �O   �$ �ͭ��    �O   �$ έ��    �O   $ �έ��    �R   $$ Hϭ��    �R   <$ �ϭ��    �R   T$ xЭ��    �R4   l$ ѭ�   ��A�G CA�A�X ��      ,   �$ �ѭ��   A�A�G@
AAF    ,   �$ Xӭ��   A�A�G@"
AAC    ,   $ �ԭ��   A�A�G@
AAF    ,   4$ 8֭��   A�A�G@'
AAF    $   d$ �׭��   A�G0
AD    $   �$ P٭��   A�G0
AD    ,   �$ �ڭ�|   A�A�G@�
AAD    ,   �$ 8ݭ��   A�A�GPG
AAF    ,   $ �ޭ��   A�A�GPG
AAF    ,   D$ x���   A�A�GPG
AAF    ,   t$ ���   A�A�GPG
AAF    ,   �$ ����   A�A�GPG
AAF    ,   �$ X���   A�A�GPG
AAF    ,   $ ����   A�A�GPG
AAF    ,   4$ ����   A�A�G`�
AAH       d$ X��S              |$ ���1    A�V
IL    �$ ���              �$ ����           \   �$ 0��3   B�B�B �B(�A0�A8�J�=
8A0A(B BBBE��D�F�A�  <   ,$ ��G   B�A�D �G@JHEP]HA@u
 AABD<   l$  ���    B�A�D �J@}
 AABF~HEPjHA@  <   �$ ���H   N�A�D 
G�A�JDA�A�       d   �$ ����   B�B�B �B(�A0�A8�D�A
8A0A(B BBBG��B�g�A�             T$ h���              l$ `��              �$ h��     H�S          �$ (����             �$ ����\   �s   �$ ����H             �$ 0���S              $ x���,              $ ����              4$ �����           \   L$  ���1   B�B�B �B(�A0�A8�J��
8A0A(B BBBF��D�F�A� <   �$ ����G   B�A�D �G@JHEP]HA@u
 AABD<   �$ �����    B�A�D �J@}
 AABF~HEPjHA@  <   ,$ � ��H   N�A�D 
G�A�JDA�A�       d   l$ ����   B�B�B �B(�A0�A8�D�9
8A0A(B BBBG��B�g�A�             �$ 8��              �$ ���              $ ���     H�S          $$ ����             <$ ���H             T$ ���H          4   l$ ���d   A�D0�
OG�
AGs
OE    �$ (���             �$ ���S              �$ ����           \   �$ p��   B�B�B �B(�A0�A8�J�/
8A0A(B BBBCv�D�F�A�  <   L $ 0��G   B�A�D �G@JHEP]HA@u
 AABD<   � $ @���    B�A�D �J@}
 AABF~HEPjHA@  <   � $  ��   B�A�A �V
ABC�
ABO          !$ ���           <   $!$ ���H   N�A�D 
G�A�JDA�A�       \   d!$ ����   B�B�B �B(�A0�A8�D��
8A0A(B BBBE?�E�X�D� L   �!$ H���   B�B�B �B(�A0�A8�M�
8A0A(B BBBG      "$ ����    �r           4"$ �R��              L"$ �R��     H�S       ,   l"$ p ���    A�A�J@p
AAA     ,   �"$ � ��Z   A�D !
AID
CI   <   �"$  "���   B�B�A �A(�G��
(A ABBB       #$ `%���    �R$   $#$ �%��    A�G �
AG     $   L#$ �&��    A�G �
AG        t#$ �'��8   ��]�     ,   �#$ �(���   A�A�G@K
AAJ    D   �#$ X*��]   B�B�B �A(�A0�Gp�
0A(A BBBH     ,   $$ p-��Q   �A�D �i�A�B�  ,   <$$ �.��Q   �A�D �i�A�B�  ,   l$$ �/��Q   �A�D �i�A�B�  ,   �$$  1��Q   �A�D �i�A�B�  ,   �$$ 02��Q   �A�D �i�A�B�  ,   �$$ `3��Q   �A�D �i�A�B�  ,   ,%$ �4��Q   �A�D �i�A�B�  ,   \%$ �5��Q   �A�D �i�A�B�     �%$ �6��8   �Z   �%$ 8��8   ��]�        �%$ 89��8   ��]�        �%$ X:��8   ��]�        &$ x;��8   ��]�        $&$ �<��8   ��]�        D&$ �=��8   ��]�        d&$ �>��8   ��]�        �&$ �?��S              �&$ @@��y    A�X
GT   �&$ �@��              �&$ �@���           \   �&$ A��3   B�B�B �B(�A0�A8�J�=
8A0A(B BBBE��D�F�A�  <   L'$ �D��G   B�A�D �G@JHEP]HA@u
 AABD<   �'$  F���    B�A�D �J@}
 AABF~HEPjHA@  <   �'$ �F���   D�E�K 
G�A�QDA�A�      \   ($  H���   B�B�B �B(�A0�A8�D��
8A0A(B BBBAJ�E�m�A�    l($ �L��              �($ �X��              �($ �X��     H�S       ,   �($ pL���   A�A�G0^
AAG    ,   �($ N��l   ��A�J zA�A�         )$ PO��S              4)$ �O���           \   L)$ P��   B�B�B �B(�A0�A8�J��
8A0A(B BBBH6�D�F�A� <   �)$ �S��G   B�A�D �G@JHEP]HA@u
 AABD<   �)$ �T���    B�A�D �J@}
 AABF~HEPjHA@  <   ,*$ �U��H   N�A�D 
G�A�JDA�A�          l*$ �V��(              �*$ �V��              �*$ �m��              �*$ �m��     H�S          �*$ �V��8   �R   �*$ �W���              +$ �X��B              +$ Y��S              4+$ XY��,              L+$ pY��              d+$ hY���           \   |+$ �Y��   B�B�B �B(�A0�A8�J��
8A0A(B BBBH6�D�F�A� <   �+$ �]��G   B�A�D �G@JHEP]HA@u
 AABD<   ,$ �^���    B�A�D �J@}
 AABF~HEPjHA@  L   \,$ p_��.   B�B�B �B(�D0�A8�M��
8A0A(B BBBJ   \   �,$ Pb��w   B�B�B �B(�D0�A8�G�
8A0A(B BBBB@�B�]�A�     -$ pd���    qr<   $-$ e���   D�E�K 
G�A�QDA�A�      \   d-$ hf��R   B�B�B �B(�A0�A8�D��
8A0A(B BBBD��E�m�A�     �-$ �x��              �-$  y��     H�S          �-$ pj���    �O   .$ k���    A��
EC   4.$ �k��S              L.$ 0l��,              d.$ Hl��              |.$ @l���           \   �.$ �l��   B�B�B �B(�A0�A8�J��
8A0A(B BBBH6�D�F�A� <   �.$ xp��G   B�A�D �G@JHEP]HA@u
 AABD<   4/$ �q���    B�A�D �J@}
 AABF~HEPjHA@  <   t/$ Hr��H   N�A�D 
G�A�JDA�A�       \   �/$ Xs���   B�B�B �B(�A0�A8�D��
8A0A(B BBBEe�B�g�A�     0$ 8���              ,0$ @���     H�S          L0$ �v���              d0$ �w���    �R   |0$ 0x���    �R   �0$ �x���    �R$   �0$ `y��    A�G �
AG     $   �0$ 8z��    A�G �
AG     ,   �0$ {���   A�A�Gpb
AAC    ,   ,1$ �~���    ��A�I BF�A�     ,   \1$ `��?   A�A�G0
AAH    <   �1$ p����   ��A�I0���X0��j
A�A�D      4   �1$  ����   B�A�A �GPA
 AABH    4   2$ �����   B�A�A �GPA
 AABH    4   <2$ P����   B�A�A �GPA
 AABH    4   t2$ 膮�
   B�A�D �D`|
 AABE    $   �2$ �����   A�G0
AD    $   �2$ X���F   A�G0S
AD    D   �2$ �����   B�B�B �A(�A0�Gp�
0A(A BBBI       D3$ ���8   �Y   \3$ @���8   �Y   t3$ h���8   �Y   �3$ ����8   �Y   �3$ ����8   �YL   �3$ �����   ��A�J0YA�A�\0��LA�A�^0��c��       L   4$ P����   ��A�J0YA�A�\0��LA�A�^0��c��       L   \4$ �����   ��A�J0YA�A�\0��LA�A�^0��c��       L   �4$ 0����   ��A�J0YA�A�\0��LA�A�^0��c��          �4$ ����8   �R   5$ ț��B              ,5$  ���S              D5$ H���,              \5$ `���              t5$ X����           \   �5$ М��3   B�B�B �B(�A0�A8�J�=
8A0A(B BBBE��D�F�A�  <   �5$ ����G   B�A�D �G@JHEP]HA@u
 AABD<   ,6$ �����    B�A�D �J@}
 AABF~HEPjHA@  L   l6$ ����.   B�B�B �B(�D0�A8�M��
8A0A(B BBBJ   \   �6$ `���w   B�B�B �B(�D0�A8�G�
8A0A(B BBBB@�B�]�A�     7$ �����    qr<   47$ ���H   N�A�D 
G�A�JDA�A�       d   t7$ (����   B�B�B �B(�A0�A8�D��
8A0A(B BBBEe�B�g�A�          4   �7$ ����g    A�A�J i
DAF^GA     $   8$ 謮�5    A�A�J fAA 4   <8$  ���g    A�A�J i
DAF^GA     4   t8$ 8���g    A�A�J i
DAF^GA     4   �8$ p���g    A�A�J i
DAF^GA     4   �8$ ����g    A�A�J i
DAF^GA     4   9$ ୮�g    A�A�J i
DAF^GA     4   T9$ ���g    A�A�J i
DAF^GA     4   �9$ P���g    A�A�J i
DAF^GA     4   �9$ ����g    A�A�J i
DAF^GA     $   �9$ ����5    A�A�J fAA 4   $:$ خ��X    A�A�J i
DAFOGA     <   \:$  ����    B�B�D �A(�L@d
(D ABBF      4   �:$ ����a    A�A�J i
DAFWHA     4   �:$ ȯ��e    A�A�J i
DAF\GA     4   ;$  ���e    A�A�J i
DAF\GA     4   D;$ 8���e    A�A�J i
DAF\GA     4   |;$ p���e    A�A�J i
DAF\GA     4   �;$ ����e    A�A�J i
DAF\GA     4   �;$ మ�e    A�A�J i
DAF\GA     4   $<$ ���e    A�A�J i
DAF\GA     4   \<$ P���e    A�A�J i
DAF\GA        �<$ ����)    D]    �<$ ����U    Gk
F      $   �<$ ౮�5    A�A�J fAA $   �<$ ����5    A�A�J fAA $   =$ ���5    A�A�J fAA $   D=$ (���5    A�A�J fAA 4   l=$ @���g    A�A�J i
DAF^GA     4   �=$ x���g    A�A�J i
DAF^GA     ,   �=$ �����    A�A�J0T
AAF     ,   >$  ����    A�A�J0T
AAF     4   <>$ ����g    A�A�J i
DAF^GA     4   t>$ ȳ��g    A�A�J i
DAF^GA     4   �>$  ���X    A�A�J i
DAFOGA     4   �>$ (���i    A�A�J i
DAF`GA     4   ?$ `���f    A�A�J i
DAF]GA     4   T?$ ����f    A�A�J i
DAF]GA     4   �?$ д��i    A�A�J i
DAF`GA     4   �?$ ���i    A�A�J i
DAF`GA     4   �?$ @���i    A�A�J i
DAF`GA     4   4@$ x���i    A�A�J i
DAF`GA     4   l@$ ����i    A�A�J i
DAF`GA     4   �@$ 赮�i    A�A�J i
DAF`GA     4   �@$  ���f    A�A�J i
DAF]GA     4   A$ X���i    A�A�J i
DAF`GA     4   LA$ ����i    A�A�J i
DAF`GA     4   �A$ ȶ��i    A�A�J i
DAF`GA     4   �A$  ���i    A�A�J i
DAF`GA     4   �A$ 8���i    A�A�J i
DAF`GA     4   ,B$ p���i    A�A�J i
DAF`GA     4   dB$ ����i    A�A�J i
DAF`GA     4   �B$ ෮�i    A�A�J i
DAF`GA     4   �B$ ���i    A�A�J i
DAF`GA     4   C$ P���i    A�A�J i
DAF`GA     4   DC$ ����i    A�A�J i
DAF`GA     4   |C$ ����i    A�A�J i
DAF`GA     4   �C$ ����i    A�A�J i
DAF`GA     4   �C$ 0���i    A�A�J i
DA