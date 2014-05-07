define(function() {
   return {
       tokenize: function (string) {
            return string.match(/\{(\w)\}/g);
       }
   }
});