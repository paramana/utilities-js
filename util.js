/*!
 * Version: 1.0
 * Started: 30-04-2013
 * Updated: 22-07-2013
 * Author : paramana (hello AT paramana DOT com)
 *
 */
define("Util", [
    'Config',
    'jmd5',
    'plugins/ext.util/jquery.json-2.4',
    'plugins/ext.util/dropdown',
    'plugins/ext.util/bootstrap-datepicker'
], function(Config) {    
    // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
    "use strict";
    
    return {
        /*
         * Checks is an input field is truly empty
         * 
         * @param {type} $input the jQuery input element to check
         * @returns {Boolean} returns true if is empty
         * 
         */
        emptyInput: function($input){
            if (!$input.length)
                return false;
            
            var value = $input.val();
            if(!value 
                    || value == $input[0].defaultValue 
                    || value == $input[0].placeholder)
                return true;
            
            return false;
        },
        uriToObj: function(str){
            if (!str)
                return str;

            var param = {};

            str = str.split('?').pop().split('&');
            for(var i = 0, foo; i < str.length; i++) {
                foo = str[i].split('=');
                param[foo[0]] = foo[1];
            }

            return param;
        },

        /*
         * Vazei ta links se ena href
         *
         * @param  {string} str
         * @return {string}
         * @final
         */
        wrapLink: function(str) {
            return str.replace(/((?:mailto:|ftp:\/\/|http:\/\/|https:\/\/)[^ <>'"{}|\\\^`\[\]]*)/g, '<a target="_blank" href="$1">$1</a>');
        },

        /*
         * Check if an href includes a protocol
         *
         * @param string str The href string to manipulate
         * @return {string}
         * @final
         */
        includesProtocol: function(str) {
            return /((?:mailto:|ftp:\/\/|http:\/\/)[^ <>'"{}|\\\^`\[\]]*)/g.test(str);
        },

        /*
         * Removes special characters from a string
         *
         * @param  {string}  str the string to be converted
         * @return {string}  the seo string
         * @final
         */
        removeSpecialChar: function(str){
            if(!str)
                return '';
            return str.replace(/(\s|’|~|`|!|@|#|\$|\%|\^|\&|\*|\(|\)|\-|_|\+|\=|\[|\]|\{|\}|;|:|"|\'|<|>|\?|\\|\/|\.|,|…|΄)+/, '_');
        },

        /*
         * Converts a string to seo friendly format
         * px: ALIKARHS-~-OLA-STA-KARBOYNA -> ALIKARHS-OLA-STA-KARBOYNA
         *
         * @param  {string}  str the string to be converted
         * @return {string}  the seo string
         * @final
         */
        toSeoStr: function(str) {
            if (!str)
                return str;
            
            var lettersEN = ["u","i","u","i","a","b","ps","d","e","f","g","h","i","ks","k","l","m","n","o","p","r","s","t","8","u","w","x","z","q","v","a","b","ps","d","e","f","g","h","i","j","k","l","m","n","o","p","r","s","t","8","u","o","x","z","s","a","e","h","i","o","u","w","A","E","H","I","O","U","W"],
            lettersGR = ["ϋ","ϊ","Ϋ","Ϊ","Α","Β","Ψ","Δ","Ε","Φ","Γ","Η","Ι","Ξ","Κ","Λ","Μ","Ν","Ο","Π","Ρ","Σ","Τ","Θ","Υ","Ω","Χ","Ζ","Q","V","α","β","ψ","δ","ε","φ","γ","η","ι","ξ","κ","λ","μ","ν","ο","π","ρ","σ","τ","θ","υ","ω","χ","ζ","ς","ά","έ","ή","ί","ό","ύ","ώ","Ά","Έ","Ή","Ί","Ό","Ύ","Ώ"];
            for (var i = 0, len = lettersEN.length; i < len; i++) {
                str = str.replaceAll(lettersGR[i], lettersEN[i]);
            }
            return str.toLowerCase();
        },
        
        /**
         * Replaces all the occurencies of first array with the second
         * 
         * @param string str The string to manipulate
         * @param string strTarget The substring you want to replace
         * @param string strSubString The string you want to replace in.
         * 
         */
        replaceAll: function(str, strTarget, strSubString){
            if (!str)
                return str;
            
            var intIndexOfMatch = str.indexOf( strTarget );

            // Keep looping while an instance of the target string
            // still exists in the string.
            while (intIndexOfMatch != -1){
                // Relace out the current instance.
                str = str.replace( strTarget, strSubString );

                // Get the index of any next matching substring.
                intIndexOfMatch = str.indexOf( strTarget );
            }

            // Return the updated string with ALL the target strings
            // replaced out with the new substring.
            return( str );
        },
                
        /**
         * Casts the first character in a string to uppercase with greek σ support.
         *
         * @type {string}
         */
        uCaseFirst: function(str){
            if (!str)
                return str;
            
            return str.substr(0, 1).toUpperCase() + str.substr(1).toLowerCase().replace(/σ( +)|σ$/g, 'ς$1');
        },
        
        /**
         * Uppercase the first character of every word in a string with greek σ support.
         *
         * @type {string}
         */
        uCaseWords: function(str){
            if (!str)
                return str;
            
            return (str + '').toLowerCase().replace(/σ( +)|σ$/g, 'ς$1').replace(/^(.)|\s(.)/g, function ($1) {
                return $1.toUpperCase( );
            });
        },
                
        sanitizeInnerUrl: function(url){      
            //clean start and trailing slash
            url = url.replace(/^\//, '').replace(/\/$/, '');

            //clean router prefix
            if (!Config.router_prefix)
                return url;
            
            url = url.replace(Config.router_prefix, "").replace(/^\//, '');
            
            return Config.router_prefix + (!url ? '' : '/' + url);
        },
                
        /*
         * Gets the lenght of an object
         * 
         * @param {type} obj
         * @returns Number the length of the object
         * 
         */
        objSize: function(obj){
            if (typeof obj !== "object")
                return 0;
            
            if (typeof Object.keys == null) {
                var size = 0, key;
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) 
                        size++;
                }
                return size;
            }

            return Object.keys(obj).length;
        },
                
        queryParams: function(str){
            if (!str)
                return '';
            
            var query = str.replace(/^\?/, '').split('&'),
                params = {},
                ql = query.length;
            
            if (!ql)
                return '';
            
            for(var i = 0; i < ql; i++) {
                query[i] = query[i].split('=');
                params[query[i][0]] = query[i][1]
            }
            
            return params;
        },
        padDate: function(date){
            if (!date)
                return date;
            
            return ('0' + (date + 1)).slice(-2);
        },
        dateSQLToEu: function(date){
            if (!date)
                return date;
            
            return date.replace(/(\d\d\d\d)-*(\d\d)*-*(\d\d)*/, "$3/$2/$1").replace(/^\//, '').replace(/^\//, '');
        },
        parseDate: function(str){
            if (!str)
                return {};
            
            var str = str.match(/(\d+)*?\/*(\d+)*\/*(\d\d\d\d)/);
        
            if (!str)
                return {day:'', month:'', year:''};
            
            return {day: str[1], month: str[2], year: str[3]};
        },
        isItNow: function(date){
            date = date + '';
            var today = new Date(),
                year  = today.getFullYear(),
                month = this.padDate(today.getMonth()),
                day   = this.padDate(today.getDay());

            date = this.parseDate(date);
            
            if (!date.year)
                return false;

            if (date.year == year) {
                if (!date.month)
                    return true;
                
                if (date.month == month) {
                    if (!date.day || date.day == day) {
                        return true;
                    }
                }
            }
            
            return false;
        },
        /**
         * Determines whether a value should be considered false. This excludes, amongst
         * others, the number 0.
         * @param {Mixed} value The variable to check
         * @return {Boolean} Whether the variable is considered false.
         */
        isNot: function(c){
            // a var that is null, false, undefined, Infinity, NaN and c isn't a string
            return (!c && typeof c != "string" && c !== 0 || (typeof c == "number" && !isFinite(c)) || c == "undefined");
        }
    };
});