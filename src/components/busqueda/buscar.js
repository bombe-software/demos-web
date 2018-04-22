export function validadoAcentos (s) {
    var mapaAcentos = {
        'á':'a', 'é':'e', 'í':'i','ó':'o','ú':'u'
        };
    if (!s) { return ''; }
    var ret = '';
    for (var i = 0; i < s.length; i++) {
        ret += mapaAcentos[s.charAt(i)] || s.charAt(i);
    }
    return ret;
};