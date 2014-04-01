/*!
 * Version: 1.0
 * Started: 30-04-2013
 * Updated: 16-02-2014
 * Author : paramana (hello AT paramana DOT com)
 *
 */
define("Util", [
    'Config'
], function(Config) {    
    // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
    "use strict";
    
    return {
        putCursorAtTheEnd: function($input){
            $input.focus();

            if ($input[0].setSelectionRange) {
                var len = $input.val().length;
                $input[0].setSelectionRange(len, len);
            } 
            else {
              $input.val($input.val());
            }
        },
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
                
        sanitizeInnerUrl: function(url, prefix){      
            //clean start and trailing slash
            url = url.replace(/^\//, '').replace(/\/$/, '');

            //clean router prefix
            if (!prefix)
                return url;
            
            url = url.replace(prefix, "").replace(/^\//, '');
            
            return prefix + (!url ? '' : '/' + url);
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
                
        queryParams: function(query){
            var decodeParam = function(str) {
                return decodeURIComponent(str.replace(/\+/g, ' '));
            };
            var re = /([^&=]+)=?([^&]*)/g;
            var params = {}, e;
            if (query) {
                if (query.substr(0, 1) == '?') {
                    query = query.substr(1);
                }

                while (e = re.exec(query)) {
                    var k = decodeParam(e[1]);
                    var v = decodeParam(e[2]);
                    if (params[k] !== undefined) {
                        if (!$.isArray(params[k])) {
                            params[k] = [params[k]];
                        }
                        params[k].push(v);
                    } 
                    else {
                        params[k] = v;
                    }
                }
            }
            return params;
        },
        arrayToObject: function (array, pad) {
            var obj    = [],
                _index = 1;

            for (var i = 0; i < array.length; i++) {
                obj.push({'index': !pad ? index : this.padDate(_index), 'value': array[i]});
                _index++;
            }

            return obj;
        },
        padDate: function(date){
            if (!date)
                return date;
            
            return ('0' + date).slice(-2);
        },
        dateSQLToJS: function(date){
            if (!date)
                return date;
            
            // Split timestamp into [ Y, M, D, h, m, s ]
            var t = date.split(/[- :]/);

            // Apply each element to the Date function
            return new Date(t[0], t[1]-1, t[2], t[3] || '', t[4] || '', t[5] || '');
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
        getAge: function (d1, d2, days, language){
            if (typeof d1 == 'string')
                d1 = new Date(d1);

            d2 = d2 || new Date();
            var diff    = d2.getTime() - d1.getTime(),
                divider = 1000 * 60 * 60 * 24,
                age     = '';

            if (!days)
                divider = divider * 365.25;

            if (!diff)
                return age;

            age = diff / divider;

            if (days) {
                if (age > 0 && age < 1) {
                    return language.today;
                }
                else if (language.tomorrow && age < 0 && age > -1) {
                    return language.tomorrow;
                }
                else if (language.yesterday && age > 1 && age < 2) {
                    return language.yesterday;
                }
            }

            return Math.ceil(Math.abs(age));
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
        formatDate: function(date, format, language){
            function parseFormat(format){
                // IE treats \0 as a string end in inputs (truncating the value),
                // so it's a bad format delimiter, anyway
                var separators = format.replace(validParts, '\0').split('\0'),
                    parts = format.match(validParts);
                if (!separators || !separators.length || !parts || parts.length === 0){
                    throw new Error("Invalid date format.");
                }
                return {separators: separators, parts: parts};
            }

            var validParts = /dd?|DD?|mm?|MM?|yy(?:yy)?/g;
            var val = {
                d: date.getUTCDate(),
                D: language.daysShort[date.getUTCDay()],
                DD: language.days[date.getUTCDay()],
                m: date.getUTCMonth() + 1,
                M: language.monthsShort[date.getUTCMonth()],
                MM: language.months[date.getUTCMonth()],
                yy: date.getUTCFullYear().toString().substring(2),
                yyyy: date.getUTCFullYear()
            };

            val.dd = (val.d < 10 ? '0' : '') + val.d;
            val.mm = (val.m < 10 ? '0' : '') + val.m;
            format = parseFormat(format);

            var newDate = [],
                seps    = $.extend([], format.separators);

            for (var i=0, cnt = format.parts.length; i < cnt; i++) {
                if (seps.length)
                    newDate.push(seps.shift());

                newDate.push(val[format.parts[i]]);
            }

            return newDate.join('');
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
        },
        
        /**
         * Sets a name/value pair which is stored in the browser and sent to the server
         * with every request. This is also known as a cookie. Be careful setting
         * cookies, because they can take up a lot of bandwidth, especially for Ajax
         * applications.
         *
         * @param {String}  name     cookie name
         * @param {String}  value    cookie value
         * @param {Date}    expire   expire date representing the number of milliseconds
         *                           since 1 January 1970 00:00:00 UTC.
         * @param {String}  path     path name
         * @param {String}  domain   domain name
         * @param {Boolean} secure   cookie may benefit all the documents and CGI programs
         *                           meet the requirements as to the path and domain
         *                           compatibility
         *     Possible values:
         *     true   may benefit
         *     false  can not benefit
         *
         * @return {String} Returns a cookie name.
         */
        setcookie: function(name, value, expire, path, domain, secure) {
            var ck = name + "=" + escape(value) + ";";
            if (expire) ck += "expires=" + new Date(expire +
                new Date().getTimezoneOffset() * 60).toGMTString() + ";";
            if (path)   ck += "path=" + path + ";";
            if (domain) ck += "domain=" + domain + ";";
            if (secure) ck += "secure";

            document.cookie = ck;
            return value;
        },

        /**
         * Gets the value of a stored name/value pair called a cookie.
         *
         * @param {String} name the name of the stored cookie.
         * @return {String} Returns a value of the cookie or the empty string if it isn't found
         */
        getcookie: function(name) {
          var aCookie = document.cookie.split("; ");
          for (var i = 0; i < aCookie.length; i++) {
              var aCrumb = aCookie[i].split("=");
              if (name == aCrumb[0])
                  return unescape(aCrumb[1]);
          }

          return "";
        },

        /**
         * Deletes a stored name/value pair called a cookie.
         *
         * @param {String} name     the name of the stored cookie
         * @param {String} domain   the name of the domain of stored cookie
         */
        delcookie: function (name, domain){
            document.cookie = name + "=blah; expires=Fri, 31 Dec 1999 23:59:59 GMT;" + (domain ? 'domain='+domain : '');
        }
    };
});