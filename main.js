
var HttpClient = function() {
    this.get = function(arg, callback) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() { 
            if (request.readyState == 4 && request.status == 200)
                callback(request.responseText);
        }
        request.open( "GET", arg, true );            
        request.send( null );
    }
}

function findLyrics(song, fname) {
    var url = 'https://api.lyrics.ovh/v1/' + fname + '/' + song;
    var client = new HttpClient();
    client.get(url, function(response) {
      var obj = JSON.parse(response);
      var str = obj.lyrics;
      translateLyrics(str);
      var str = str.replace(/\n/g, "<br />");
      document.getElementById("lyrics").innerHTML = str;
      document.getElementById("lyrics").classList.add('lyrics');
    });
}
  
function translateLyrics(song_lyrics){
    var language = document.getElementById("lang").value;
    var code = getCode(language);
    var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=" + code + "&dt=t&q=" + encodeURI(song_lyrics);
    var client = new HttpClient();
    client.get(url, function(response) {
        var obj = JSON.parse(response);
        var translated = "";
        var i;
        for (i = 0; i < obj[0].length; i++)  
        { 
        translated = translated + obj[0][i][0]
        }
        translated = translated.replace(/\n/g, "<br />");
        document.getElementById("t_lyrics").innerHTML = translated;
        document.getElementById("t_lyrics").classList.add('t_lyrics');
    });
}

var langs = {
    'af': 'Afrikaans',
    'sq': 'Albanian',
    'am': 'Amharic',
    'ar': 'Arabic',
    'hy': 'Armenian',
    'az': 'Azerbaijani',
    'eu': 'Basque',
    'be': 'Belarusian',
    'bn': 'Bengali',
    'bs': 'Bosnian',
    'bg': 'Bulgarian',
    'ca': 'Catalan',
    'ceb': 'Cebuano',
    'ny': 'Chichewa',
    'zh-cn': 'Chinese Simplified',
    'zh-tw': 'Chinese Traditional',
    'co': 'Corsican',
    'hr': 'Croatian',
    'cs': 'Czech',
    'da': 'Danish',
    'nl': 'Dutch',
    'en': 'English',
    'eo': 'Esperanto',
    'et': 'Estonian',
    'tl': 'Filipino',
    'fi': 'Finnish',
    'fr': 'French',
    'fy': 'Frisian',
    'gl': 'Galician',
    'ka': 'Georgian',
    'de': 'German',
    'el': 'Greek',
    'gu': 'Gujarati',
    'ht': 'Haitian Creole',
    'ha': 'Hausa',
    'haw': 'Hawaiian',
    'iw': 'Hebrew',
    'hi': 'Hindi',
    'hmn': 'Hmong',
    'hu': 'Hungarian',
    'is': 'Icelandic',
    'ig': 'Igbo',
    'id': 'Indonesian',
    'ga': 'Irish',
    'it': 'Italian',
    'ja': 'Japanese',
    'jw': 'Javanese',
    'kn': 'Kannada',
    'kk': 'Kazakh',
    'km': 'Khmer',
    'ko': 'Korean',
    'ku': 'Kurdish (Kurmanji)',
    'ky': 'Kyrgyz',
    'lo': 'Lao',
    'la': 'Latin',
    'lv': 'Latvian',
    'lt': 'Lithuanian',
    'lb': 'Luxembourgish',
    'mk': 'Macedonian',
    'mg': 'Malagasy',
    'ms': 'Malay',
    'ml': 'Malayalam',
    'mt': 'Maltese',
    'mi': 'Maori',
    'mr': 'Marathi',
    'mn': 'Mongolian',
    'my': 'Myanmar (Burmese)',
    'ne': 'Nepali',
    'no': 'Norwegian',
    'ps': 'Pashto',
    'fa': 'Persian',
    'pl': 'Polish',
    'pt': 'Portuguese',
    'ma': 'Punjabi',
    'ro': 'Romanian',
    'ru': 'Russian',
    'sm': 'Samoan',
    'gd': 'Scots Gaelic',
    'sr': 'Serbian',
    'st': 'Sesotho',
    'sn': 'Shona',
    'sd': 'Sindhi',
    'si': 'Sinhala',
    'sk': 'Slovak',
    'sl': 'Slovenian',
    'so': 'Somali',
    'es': 'Spanish',
    'su': 'Sundanese',
    'sw': 'Swahili',
    'sv': 'Swedish',
    'tg': 'Tajik',
    'ta': 'Tamil',
    'te': 'Telugu',
    'th': 'Thai',
    'tr': 'Turkish',
    'uk': 'Ukrainian',
    'ur': 'Urdu',
    'uz': 'Uzbek',
    'vi': 'Vietnamese',
    'cy': 'Welsh',
    'xh': 'Xhosa',
    'yi': 'Yiddish',
    'yo': 'Yoruba',
    'zu': 'Zulu'
  };

function createDropDown() {    
    var sel = document.getElementById('lang');
    for(key in langs) {
        var opt = document.createElement('option');
        opt.innerHTML = langs[key];
        opt.value = langs[key];
        sel.appendChild(opt);
    }
  }

function getCode(desiredLang) {
    if (!desiredLang) {
        return false;
    }
  
    var keys = Object.keys(langs).filter(function (key) {
        if (typeof langs[key] !== 'string') {
            return false;
        }
        return langs[key] === desiredLang;
    });

    return keys[0] || false;
}